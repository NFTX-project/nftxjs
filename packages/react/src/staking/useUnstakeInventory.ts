import { useNftx } from '../contexts';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useUnstakeInventory = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { unstakeInventory },
  } = useNftx();

  type Args = TxnArgsOnly<typeof unstakeInventory>;

  return useTransaction(
    (args: Args) => unstakeInventory({ network, signer, ...args }),
    { description: 'Unstake Inventory', ...opts }
  );
};

export default useUnstakeInventory;
