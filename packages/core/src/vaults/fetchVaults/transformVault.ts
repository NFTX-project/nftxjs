import { Zero } from '@nftx/constants';
import { mapObj } from '../../utils';
import type { Response } from '../fetchSubgraphVaults';
import transformVaultHolding from '../fetchVaultHoldings/transformVaultHolding';
import type { Vault, VaultHolding } from '@nftx/types';

const transformVault = ({
  vault: x,
  globalFees,
  merkleReference,
  moreHoldings = [],
  vTokenToEth,
}: {
  vault: Response['vaults'][0];
  globalFees: Response['globals'][0]['fees'];
  merkleReference?: string;
  moreHoldings?: VaultHolding[];
  vTokenToEth: bigint;
}) => {
  const holdings = x.holdings
    .map((holding) => transformVaultHolding(holding))
    .concat(moreHoldings);

  const rawFees = (x.usesFactoryFees && globalFees ? globalFees : x.fees) ?? {};
  const fees: Vault['fees'] = mapObj(rawFees, (key, value) => {
    return [key, BigInt(value)];
  });

  const defaultPrice = { mint: Zero, redeem: Zero, swap: Zero };

  const vault: Vault = {
    ...x,
    createdAt: Number(x.createdAt),
    totalHoldings: Number(x.totalHoldings),
    totalMints: Number(x.totalMints),
    totalRedeems: Number(x.totalRedeems),
    totalFees: BigInt(x.totalFees),
    shutdownDate: Number(x.shutdownDate || '0'),
    tokenIds: holdings.map((x) => x.tokenId),
    fees,
    // We'll be calculating the price further down the line
    prices: [
      defaultPrice,
      defaultPrice,
      defaultPrice,
      defaultPrice,
      defaultPrice,
    ],
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
