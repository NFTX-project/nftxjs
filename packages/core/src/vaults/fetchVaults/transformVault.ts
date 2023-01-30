import { BigNumber } from '@ethersproject/bignumber';
import { mapObj } from '../../utils';
import type { Response } from '../fetchSubgraphVaults';
import transformVaultReserves from './transformVaultReserves';
import transformVaultHolding from '../fetchVaultHoldings/transformVaultHolding';
import type { TokenReserve, Vault, VaultHolding } from '@nftx/types';

const transformVault = ({
  reserves,
  vault: x,
  globalFees,
  merkleReference,
  moreHoldings = [],
}: {
  reserves: TokenReserve[];
  vault: Response['vaults'][0];
  globalFees: Response['globals'][0]['fees'];
  merkleReference: string;
  moreHoldings?: VaultHolding[];
}) => {
  const reserve = reserves.find(({ tokenId }) => tokenId === x.id);

  const holdings = x.holdings
    .map((holding) => transformVaultHolding(holding))
    .concat(moreHoldings);

  const rawFees = (x.usesFactoryFees && globalFees ? globalFees : x.fees) ?? {};
  const fees: Vault['fees'] = mapObj(rawFees, (key, value) => {
    return [key, BigNumber.from(value)];
  });

  const { derivedETH, rawPrice, reserveVtoken, reserveWeth } =
    transformVaultReserves(reserve);

  const vault: Vault = {
    ...x,
    createdAt: Number(x.createdAt),
    totalHoldings: Number(x.totalHoldings),
    totalMints: Number(x.totalMints),
    totalRedeems: Number(x.totalRedeems),
    totalFees: BigNumber.from(x.totalFees),
    shutdownDate: Number(x.shutdownDate || '0'),
    holdings,
    fees,
    derivedETH,
    rawPrice,
    reserveVtoken,
    reserveWeth,
    eligibilityModule: x.eligibilityModule
      ? {
          ...x.eligibilityModule,
          merkleReference,
        }
      : undefined,
  };

  return vault;
};

export default transformVault;
