import config from '@nftx/config';
import { Zero } from '@nftx/constants';
import { querySubgraph, createQuery } from '@nftx/subgraph';
import type {
  NftxV3,
  Address,
  VaultActivity,
  VaultActivityType,
} from '@nftx/types';
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

type Response = NftxV3.Query & {
  activityEvents: NftxV3.ActivityEvent &
    {
      mintIds: `${number}`[];
      redeemIds: `${number}`[];
      swapMintIds: `${number}`[];
      swapRedeemIds: `${number}`[];
      feeReceipt: NftxV3.FeeReceipt;
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
  eventType: NftxV3.ActivityEventType,
  includeAllActivity: boolean
): VaultActivityType | undefined => {
  switch (type) {
    case 'MINT':
      switch (eventType) {
        case 'Mint':
          return 'mint';
        case 'ZapSell':
        case 'SellNFTS':
          return 'sell';
        default:
          return;
      }
    case 'REDEEM':
      switch (eventType) {
        case 'Redeem':
          return 'redeem';
        case 'ZapBuy':
        case 'BuyNFTS':
          return 'buy';
        default:
          return;
      }
    case 'SWAP':
      return 'swap';
    case 'DEPOSIT':
      switch (eventType) {
        case 'IncreaseLiquidity':
        case 'AddLiquidity':
        case 'InventoryDeposit':
        case 'InventoryDepositWithNFT':
        case 'InventoryIncreasePosition':
          return 'stake';
        default:
          return;
      }
    case 'WITHDRAWAL':
      switch (eventType) {
        case 'RemoveLiquidity':
        case 'InventoryWithdraw':
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
  eventType: NftxV3.ActivityEventType
): 'inventory' | 'liquidity' => {
  switch (eventType) {
    case 'InventoryDeposit':
    case 'InventoryDepositWithNFT':
    case 'InventoryIncreasePosition':
    case 'InventoryWithdraw':
      return 'inventory';
    case 'AddLiquidity':
    case 'IncreaseLiquidity':
    case 'RemoveLiquidity':
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
  }: Response['activityEvents'][0],
  includeAllActivity: boolean
): VaultActivity | undefined => {
  const { txId, type } = parseId(id);
  const activityType = getActivityType(type, eventType, includeAllActivity);
  const common = {
    vaultId,
    vaultAddress: vaultAddress as Address,
    date: Number(date),
    txId,
    source: source as string,
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
        amount: 0n,
        // amount: BigInt(deposit),
        stakeType: getStakeType(eventType),
      };
    case 'unstake':
      return {
        ...common,
        type: 'unstake',
        amount: 0n,
        // amount: BigInt(withdrawal),
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
  const query = createQuery<Response>()
    .activityEvents.first(1000)
    .orderBy('id')
    .where((w) => [
      w.id.gt(lastId),
      w.date.gt(fromTimestamp == null ? null : `${fromTimestamp}`),
      w.date.lte(toTimestamp == null ? null : `${toTimestamp}`),
      w.vault.in(vaultAddresses),
      w.vault((v) => [v.vaultId.in(vaultIds)]),
    ])
    .select((s) => [
      s.id,
      s.source,
      s.type,
      s.date,
      s.vault((v) => [v.id, v.vaultId]),
      s.on<NftxV3.Mint>('Mint', (s) => [
        s.nftIds.as('mintIds'),
        s.feeReceipt((r) => [r.transfers((t) => [t.amount])]),
      ]),
      s.on<NftxV3.Redeem>('Redeem', (s) => [
        s.targetCount,
        s.nftIds.as('redeemIds'),
        s.feeReceipt((r) => [r.transfers((t) => [t.amount])]),
      ]),
      s.on<NftxV3.Swap>('Swap', (s) => [
        s.mintedIds.as('swapMintIds'),
        s.specificIds.as('swapRedeemIds'),
        s.feeReceipt((r) => [r.transfers((t) => [t.amount])]),
      ]),
    ]);

  const response = await querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });

  const allActivity = response.activityEvents.map((e) =>
    activityEventToActivity(e as any, includeAllActivity)
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
