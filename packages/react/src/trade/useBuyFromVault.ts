import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

const useBuyFromVault = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { buyFromVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof buyFromVault>;

  return useTransaction(
    (args: Args) => buyFromVault({ ...args, network, signer }),
    { description: 'Buy', ...opts }
  );
};

export default useBuyFromVault;
