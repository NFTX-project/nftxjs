import { Zero } from '@nftx/constants';
import { mapObj } from '../../utils';
import type { Response } from '../fetchSubgraphVaults';
import type { Address, Vault, VaultState } from '@nftx/types';

const transformVault = ({
  vault: x,
  globalFees,
  merkleReference,
  vTokenToEth,
  collection,
}: {
  vault: Response['vaults'][0];
  globalFees: Response['globals'][0]['fees'];
  merkleReference?: string;
  vTokenToEth: bigint;
  collection: { slug: string };
}) => {
  const state: VaultState = (() => {
    if (x.shutdownDate && x.shutdownDate !== '0') {
      return 'shutdown';
    }
    if (!x.isFinalized) {
      return 'unfinalized';
    }
    if (x.totalHoldings === '0') {
      return 'empty';
    }
    return 'active';
  })();

  const rawFees = (x.usesFactoryFees && globalFees ? globalFees : x.fees) ?? {};
  const fees: Vault['fees'] = mapObj(rawFees, (key, value) => {
    return [key, BigInt(value as string)];
  });
  const getDefaultPrice = (): Vault['prices'][0]['mint'] => {
    return {
      feePrice: Zero,
      premiumPrice: Zero,
      price: Zero,
      vTokenPrice: Zero,
      type: 'buy',
    };
  };
  const getDefaultPrices = (): Vault['prices'][0] => {
    return {
      mint: getDefaultPrice(),
      redeem: getDefaultPrice(),
      swap: getDefaultPrice(),
    };
  };

  const prices = new Array(5)
    .fill(null)
    .map(() => getDefaultPrices()) as Vault['prices'];

  const vault: Vault = {
    ...x,
    id: x.id as Address,
    vaultId: `${x.vaultId}`,
    slug: `${x.token.symbol}-${x.vaultId}`.toLowerCase(),
    collectionSlug: (collection?.slug || x.asset.symbol).toLowerCase(),
    state,
    asset: {
      ...x.asset,
      id: x.asset.id as Address,
    },
    token: {
      ...x.token,
      id: x.token.id as Address,
    },
    createdBy: {
      id: x.createdBy?.id as Address,
    },
    is1155: !!x.is1155,
    isFinalized: !!x.isFinalized,
    manager: { id: x.manager?.id as Address },
    createdAt: Number(x.createdAt),
    totalHoldings: Number(x.totalHoldings),
    tokenId: x.holdings?.[0]?.tokenId as `${number}`,
    totalMints: Number(x.totalMints),
    totalRedeems: Number(x.totalRedeems),
    totalFees: BigInt(x.totalFees),
    shutdownDate: Number(x.shutdownDate || '0'),
    fees,
    // We'll be calculating the price further down the line
    // prices: [] as unknown as Vault['prices'],
    prices,
    eligibilityModule: x.eligibilityModule
      ? {
          ...x.eligibilityModule,
          merkleReference,
        }
      : (undefined as any),
    vTokenToEth,
  };

  return vault;
};

export default transformVault;
