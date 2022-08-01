import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useSellIntoVault = (opts: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { sellIntoVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof sellIntoVault>;

  return useTransaction(
    (args: Args) => sellIntoVault({ ...args, network, signer }),
    { description: 'Sell', ...opts }
  );
};

export default useSellIntoVault;
