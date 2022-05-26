import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useStakeInventory = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { stakeInventory, invalidateVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof stakeInventory>;

  return useTransaction(
    (args: Args) => stakeInventory({ network, signer, ...args }),
    {
      description: 'Stake Inventory',
      ...opts,
      async onSuccess(data, args) {
        await invalidateVault({ vaultId: args.vaultId, network });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useStakeInventory;
