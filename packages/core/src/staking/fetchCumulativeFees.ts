import type { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import config from '@nftx/config';
import { NFTX_FEE_TRACKER_SUBGRAPH } from '@nftx/constants';
import { gql, type querySubgraph } from '@nftx/subgraph';
import type { VaultId } from '../vaults';
import {
  Address,
  type fetchBlockNumberByTimestamp,
  getChainConstant,
} from '../web3';
import {
  createHexVaultId,
  createId,
  parseAggregatedFee,
} from './fetchLifetimeFees';
import type { CumulativeFee } from './types';

type QuerySubgraph = typeof querySubgraph;
type FetchBlockNumberByTimestamp = typeof fetchBlockNumberByTimestamp;

type Response = {
  userVaultFeeAggregates: Array<{
    vault: {
      id: string;
      vaultId: string;
    };
    aggregatedVaultFees: string;
  }>;
  user: {
    earnings: Array<{
      vault: {
        id: string;
        vaultId: string;
        ticker: string;
        address: string;
      };
      action: { id: string; label: string };
      timestamp: string;
      amount: string;
    }>;
  };
};

type GroupedFees = Record<
  string,
  {
    id: string;
    vaultId: string;
    ticker: string;
    initial: BigNumber;
    toDate: BigNumber;
    earnings: Record<
      string,
      Record<
        string,
        {
          txnId: string;
          type: string;
          timestamp: number;
          amount: BigNumber;
          toDate: BigNumber;
        }
      >
    >;
  }
>;

const createQuery = () => {
  type Variables = {
    blockFrom: number;
    ids: string[];
    vaultHexIds: string[];
    timestampFrom: number;
    userAddress: string;
  };

  return gql<Response, Variables>`
    {
      userVaultFeeAggregates(
        block: { number: $blockFrom }
        where: { id_in: $ids }
        first: 1000
      ) {
        vault {
          id
          vaultId
        }
        aggregatedVaultFees
      }

      user(id: $userAddress) {
        earnings(
          where: { vault_in: $vaultHexIds, timestamp_gt: $timestampFrom }
          first: 1000
          orderBy: timestamp
          orderDirection: asc
        ) {
          vault {
            id
            vaultId
            ticker
            address
          }
          action {
            id
            label
          }
          timestamp
          amount
        }
      }
    }
  `;
};

const groupFeesByVaultTimeType = (
  earnings: Response['user']['earnings'],
  userVaultFeeAggregates: Response['userVaultFeeAggregates']
) => {
  const groups: GroupedFees = {};

  earnings.forEach((x) => {
    const vaultId = x.vault.vaultId;
    const timestamp = Math.floor(Number(x.timestamp) / 60) * 60;
    // const amount = BigNumber.from(Math.floor(Number(x.amount)).toString());
    const amount = parseAggregatedFee(x.amount);
    let vaultGroup = groups[vaultId];

    if (!vaultGroup) {
      const initial = parseAggregatedFee(
        userVaultFeeAggregates.find((x) => x.vault.vaultId === vaultId)
          ?.aggregatedVaultFees
      );

      vaultGroup = groups[vaultId] = {
        id: x.vault.address,
        vaultId,
        initial,
        toDate: initial,
        ticker: x.vault.ticker,
        earnings: {},
      };
    }

    let txns = vaultGroup.earnings[timestamp];

    if (!txns) {
      txns = vaultGroup.earnings[timestamp] = {};
    }

    let earning = txns[x.action.id];

    if (!earning) {
      earning = txns[x.action.id] = {
        txnId: x.action.id,
        type: x.action.label.toLowerCase(),
        amount: Zero,
        timestamp,
        toDate: vaultGroup.toDate,
      };
    }

    earning.amount = earning.amount.add(amount);
    earning.toDate = earning.toDate.add(amount);
    vaultGroup.toDate = vaultGroup.toDate.add(amount);
  });

  return groups;
};

const flattenGroupedFees = (groups: GroupedFees) => {
  return Object.values(groups)
    .flatMap(({ earnings, ticker, vaultId, id }) => {
      return Object.values(earnings).flatMap((types) => {
        return Object.values(types).map(
          ({ amount, timestamp, toDate, type, txnId }) => {
            const fee: CumulativeFee = {
              vaultId,
              vaultAddress: id,
              symbol: ticker,
              amount,
              timestamp,
              toDate,
              type,
              txnId,
            };
            return fee;
          }
        );
      });
    })
    .sort((a, b) => b.timestamp - a.timestamp);
};

export default ({
  fetchBlockNumberByTimestamp,
  querySubgraph,
}: {
  fetchBlockNumberByTimestamp: FetchBlockNumberByTimestamp;
  querySubgraph: QuerySubgraph;
}) =>
  async function fetchCumulativeFees({
    network = config.network,
    timestampFrom,
    userAddress,
    vaultIds,
  }: {
    network?: number;
    timestampFrom: number;
    userAddress: Address;
    vaultIds: VaultId[];
  }) {
    const blockFrom = await fetchBlockNumberByTimestamp({
      timestamp: timestampFrom,
    });
    const vaultHexIds = vaultIds.map((vaultId) => createHexVaultId(vaultId));
    const ids = vaultHexIds.flatMap((vaultId) => [
      createId(vaultId, userAddress, 'ip'),
      createId(vaultId, userAddress, 'lp'),
    ]);

    const query = createQuery();
    const response = await querySubgraph({
      url: getChainConstant(NFTX_FEE_TRACKER_SUBGRAPH, network),
      query,
      variables: {
        blockFrom: Math.floor(blockFrom),
        ids,
        timestampFrom: Math.floor(timestampFrom),
        vaultHexIds,
        userAddress,
      },
    });

    const groups = groupFeesByVaultTimeType(
      response.user.earnings,
      response.userVaultFeeAggregates
    );
    const fees = flattenGroupedFees(groups);

    return fees;
  };
