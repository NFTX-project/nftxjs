import type { swapWithVault } from '@nftx/web3';
import { useNftx } from '../NftxProvider';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

type Args = Omit<Parameters<typeof swapWithVault>[0], 'network' | 'provider'>;

const useSwapWithVault = (opts: UseTransactionOptions) => {
  const {
    network,
    provider,
    web3: { swapWithVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => swapWithVault({ ...args, network, provider }),
    opts
  );
};

export default useSwapWithVault;
