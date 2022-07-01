import type { redeemFromVault } from '@nftx/core';
import { useNftx } from '../NftxProvider';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

type Args = Omit<Parameters<typeof redeemFromVault>[0], 'network' | 'provider'>;

const useRedeemFromVault = (opts: UseTransactionOptions) => {
  const {
    network,
    signer,
    web3: { redeemFromVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => redeemFromVault({ ...args, network, signer }),
    { description: 'Redeem', ...opts }
  );
};

export default useRedeemFromVault;
