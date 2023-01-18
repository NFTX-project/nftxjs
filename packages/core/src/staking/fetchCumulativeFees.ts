import config from '@nftx/config';
import { NFTX_FEE_TRACKER_SUBGRAPH, Zero } from '@nftx/constants';
import { gql, type querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { fetchBlockNumberByTimestamp, getChainConstant } from '@nftx/utils';
import {
  createHexVaultId,
  createId,
  parseAggregatedFee,
} from './fetchLifetimeFees';
import type { CumulativeFee } from './types';

type QuerySubgraph = typeof querySubgraph;
type FetchBlockNumberByTimestamp = typeof fetchBlockNumberByTimestamp;

export type Response = {
  userVaultFeeAggregates: Array<{
    vault: {
      id: Address;
      vaultId: string;
    };
    aggregatedVaultFees: `${number}`;
  }>;
  user: {
    earnings: Array<{
      vault: {
        id: Address;
        vaultId: string;
        ticker: string;
        address: Address;
      };
      action: { id: string; label: string };
      timestamp: string;
      amount: `${number}`;
    }>;
  };
};

type GroupedFees = Record<
  string,
  {
    id: Address;
    vaultId: string;
    ticker: string;
    initial: bigint;
    toDate: bigint;
    earnings: Record<
      string,
      Record<
        string,
        {
          txnId: string;
          type: string;
          timestamp: number;
          amount: bigint;
          toDate: bigint;
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
    userAddress: Address;
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

// We want to group all of the fees by vaultId / timestamp / type
const groupFeesByVaultTimeType = (
  earnings: Response['user']['earnings'],
  userVaultFeeAggregates: Response['userVaultFeeAggregates']
) => {
  const groups: GroupedFees = {};

  earnings.forEach((x) => {
    const vaultId = x.vault.vaultId;
    // Round to the nearest minute
    const timestamp = Math.floor(Number(x.timestamp) / 60) * 60;
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

    earning.amount = earning.amount + amount;
    earning.toDate = earning.toDate + amount;
    vaultGroup.toDate = vaultGroup.toDate + amount;
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
    vaultIds: string[];
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
