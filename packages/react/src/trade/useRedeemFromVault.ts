import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useRedeemFromVault = (opts: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { redeemFromVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof redeemFromVault>;

  return useTransaction(
    (args: Args) => redeemFromVault({ ...args, network, signer }),
    { description: 'Redeem', ...opts }
  );
};

export default useRedeemFromVault;
