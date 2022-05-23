import type { swapWithVault } from '@nftx/core';
import { useNftx } from '../NftxProvider';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

type Args = Omit<Parameters<typeof swapWithVault>[0], 'network' | 'provider'>;

const useSwapWithVault = (opts: UseTransactionOptions) => {
  const {
    network,
    signer,
    web3: { swapWithVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => swapWithVault({ ...args, network, signer }),
    opts
  );
};

export default useSwapWithVault;
