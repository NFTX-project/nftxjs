import config from '@nftx/config';
import { Zero } from '@nftx/constants';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { Address, VaultActivity, VaultActivityType } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

type Type =
  | 'MINT'
  | 'REDEEM'
  | 'SWAP'
  | 'WITHDRAWAL'
  | 'DEPOSIT'
  | 'VAULT_CREATED'
  | 'VAULT_PUBLISHED'
  | 'VAULT_NAME_CHANGE'
  | 'VAULT_SHUTDOWN'
  | 'VAULT_FEE_UPDATE';

type Response = {
  activityEvents: {
    id: `${Type}-${Address}`;
    source: Address;
    type: VaultActivity['eventType'];
    date: string;
    vault: {
      id: Address;
      vaultId: string;
    };
    mintIds: `${number}`[];
    mintAmounts: `${number}`[];
    swapMintIds: `${number}`[];
    swapMintAmounts: `${number}`[];
    swapRedeemIds: `${number}`[];
    targetCount: string;
    randomCount: string;
    redeemIds: `${number}`[];
    deposit: `${number}`;
    withdrawal: `${number}`;
    feeReceipt: {
      transfers: {
        amount: `${number}`;
      }[];
    };
  }[];
};

const calculateFee = (
  feeReceipt: Response['activityEvents'][0]['feeReceipt']
) => {
  return (feeReceipt ?? Zero).transfers.reduce(
    (acc, r) => acc + BigInt(r.amount),
    Zero
  );
};

const parseId = (id: Response['activityEvents'][0]['id']) => {
  const [type, txId] = id.split('-') as [Type, Address];

  return { type, txId };
};

const getActivityType = (
  type: Type,
  eventType: VaultActivity['eventType'],
  includeAllActivity: boolean
): VaultActivityType | undefined => {
  switch (type) {
    case 'MINT':
      switch (eventType) {
        case 'Mint':
          return 'mint';
        case 'ZapSell':
          return 'sell';
        default:
          return;
      }
    case 'REDEEM':
      switch (eventType) {
        case 'Redeem':
        case 'UnstakeInventory':
          return 'redeem';
        case 'ZapBuy':
          return 'buy';
        default:
          return;
      }
    case 'SWAP':
      return 'swap';
    case 'DEPOSIT':
      switch (eventType) {
        case 'Deposit':
        case 'LPDeposit':
          return 'stake';
        default:
          return;
      }
    case 'WITHDRAWAL':
      switch (eventType) {
        case 'UnstakeInventory':
          return 'unstake';
        case 'LPWithdrawal':
        case 'Withdrawal':
          return 'unstake';
        default:
          return;
      }
    case 'VAULT_CREATED':
      if (!includeAllActivity) {
        return;
      }
      return 'create';
    case 'VAULT_FEE_UPDATE':
    case 'VAULT_NAME_CHANGE':
    case 'VAULT_PUBLISHED':
      if (!includeAllActivity) {
        return;
      }
      return 'update';
    case 'VAULT_SHUTDOWN':
      if (!includeAllActivity) {
        return;
      }
      return 'shutdown';
    default:
      return;
  }
};

const getStakeType = (
  eventType: VaultActivity['eventType']
): 'inventory' | 'liquidity' => {
  switch (eventType) {
    case 'UnstakeInventory':
      return 'inventory';
    case 'Deposit':
    case 'LPDeposit':
    case 'LPWithdrawal':
    case 'Withdrawal':
    default:
      return 'liquidity';
  }
};

const activityEventToActivity = (
  {
    id,
    type: eventType,
    vault: { vaultId, id: vaultAddress },
    date,
    source,
    mintIds,
    feeReceipt,
    redeemIds,
    swapMintIds,
    swapRedeemIds,
    deposit,
    withdrawal,
  }: Response['activityEvents'][0],
  includeAllActivity: boolean
): VaultActivity | undefined => {
  const { txId, type } = parseId(id);
  const activityType = getActivityType(type, eventType, includeAllActivity);
  const common = {
    vaultId,
    vaultAddress,
    date: Number(date),
    txId,
    source,
    eventType,
  };

  switch (activityType) {
    case 'mint':
      return {
        ...common,
        type: 'mint',
        tokenIds: mintIds,
        feeAmount: 0n,
      };
    case 'sell':
      return {
        ...common,
        type: 'sell',
        tokenIds: mintIds,
        feeAmount: calculateFee(feeReceipt),
      };
    case 'redeem':
      return {
        ...common,
        type: 'redeem',
        feeAmount: calculateFee(feeReceipt),
        tokenIds: redeemIds,
      };
    case 'buy':
      return {
        ...common,
        type: 'buy',
        feeAmount: calculateFee(feeReceipt),
        tokenIds: redeemIds,
      };
    case 'swap':
      return {
        ...common,
        type: 'swap',
        feeAmount: calculateFee(feeReceipt),
        tokenIds: swapMintIds,
        swapTokenIds: swapRedeemIds,
      };
    case 'stake':
      return {
        ...common,
        type: 'stake',
        amount: BigInt(deposit),
        stakeType: getStakeType(eventType),
      };
    case 'unstake':
      return {
        ...common,
        type: 'unstake',
        amount: BigInt(withdrawal),
        stakeType: getStakeType(eventType),
      };
    case 'create':
    case 'update':
    case 'shutdown':
      return {
        ...common,
        type: activityType,
      };
    default:
      return;
  }
};

const isDefined = <T>(x: T | undefined): x is T => x != null;

const fetchVaultActivity = async ({
  fromTimestamp,
  includeAllActivity = false,
  lastId,
  network = config.network,
  toTimestamp,
  vaultAddresses,
  vaultIds,
}: {
  network?: number;
  fromTimestamp?: number;
  toTimestamp?: number;
  vaultAddresses?: Address[];
  vaultIds?: string[];
  includeAllActivity?: boolean;
  lastId?: string;
}): Promise<VaultActivity[]> => {
  const where = buildWhere({
    id_gt: lastId,
    date_gt: fromTimestamp,
    date_lte: toTimestamp,
    vault_in: vaultAddresses,
    vault_: vaultIds ? { vaultId_in: vaultIds } : undefined,
  });
  const query = gql<Response>`{
    activityEvents(
      where: ${where}
      first: 1000
      orderBy: id
      orderDirection: asc
    ) {
      id
      source
      type
      date
      vault {
        id
        vaultId
      }
      ... on Mint {
        mintIds: nftIds
        mintAmounts: amounts
        feeReceipt {
          transfers {
            amount
          }
        }
      }
      ... on Redeem {
        targetCount
        randomCount
        redeemIds: nftIds
        feeReceipt {
          transfers {
            amount
          }
        }
      }
      ... on Swap {
        swapMintIds: mintedIds
        swapMintAmounts: mintedAmounts
        swapRedeemIds: redeemedIds
        feeReceipt {
          transfers {
            amount
          }
        }
      }
      ... on Deposit {
      deposit
    }
    ... on Withdrawal {
      withdrawal
    }
    }
  }`;

  const response = await querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });

  const allActivity = response.activityEvents.map((e) =>
    activityEventToActivity(e, includeAllActivity)
  );

  let activity = allActivity.filter(isDefined);

  if (response.activityEvents.length === 1000) {
    const lastId =
      response.activityEvents[response.activityEvents.length - 1].id;
    const moreActivity = await fetchVaultActivity({
      fromTimestamp,
      includeAllActivity,
      network,
      toTimestamp,
      vaultAddresses,
      vaultIds,
      lastId,
    });
    activity = [...activity, ...moreActivity];
  }

  return activity.sort((a, b) => a.date - b.date);
};

export default fetchVaultActivity;
