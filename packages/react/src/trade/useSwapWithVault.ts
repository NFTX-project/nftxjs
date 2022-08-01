import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useSwapWithVault = (opts: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { swapWithVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof swapWithVault>;

  return useTransaction(
    (args: Args) => swapWithVault({ ...args, network, signer }),
    { description: 'Swap', ...opts }
  );
};

export default useSwapWithVault;
