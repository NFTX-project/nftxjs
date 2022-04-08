import { BigNumber } from '@ethersproject/bignumber';
import type { TokenReserve } from '../../tokens';
import { mapObj } from '../../utils';
import type { Vault, VaultHolding } from '../types';
import type { Response } from '../fetchSubgraphVaults';
import transformVaultReserves from './transformVaultReserves';
import transformVaultHolding from '../fetchVaultHoldings/transformVaultHolding';

const transformVault = ({
  reserves,
  vault: x,
  globalFees,
  moreHoldings = [],
}: {
  reserves: TokenReserve[];
  vault: Response['vaults'][0];
  globalFees: Response['globals'][0]['fees'];
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
    holdings,
    fees,
    derivedETH,
    rawPrice,
    reserveVtoken,
    reserveWeth,
  };

  return vault;
};

export default transformVault;
