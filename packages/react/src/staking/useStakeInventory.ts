import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useStakeInventory = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { stakeInventory },
  } = useNftx();

  type Args = TxnArgsOnly<typeof stakeInventory>;

  return useTransaction(
    (args: Args) => stakeInventory({ network, signer, ...args }),
    { description: 'Stake Inventory', ...opts }
  );
};

export default useStakeInventory;
