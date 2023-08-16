import { mapObj } from '../../utils';
import type { Response } from '../fetchSubgraphVaults';
import type { Address, Vault } from '@nftx/types';

const transformVault = ({
  vault: x,
  globalFees,
  merkleReference,
  vTokenToEth,
}: {
  vault: Response['vaults'][0];
  globalFees: Response['globals'][0]['fees'];
  merkleReference?: string;
  vTokenToEth: bigint;
}) => {
  const rawFees = (x.usesFactoryFees && globalFees ? globalFees : x.fees) ?? {};
  const fees: Vault['fees'] = mapObj(rawFees, (key, value) => {
    return [key, BigInt(value as string)];
  });

  const vault: Vault = {
    ...x,
    id: x.id as Address,
    vaultId: `${x.vaultId}`,
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
    totalMints: Number(x.totalMints),
    totalRedeems: Number(x.totalRedeems),
    totalFees: BigInt(x.totalFees),
    shutdownDate: Number(x.shutdownDate || '0'),
    fees,
    // We'll be calculating the price further down the line
    prices: [] as unknown as Vault['prices'],
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
