import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useMintIntoVault = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { mintIntoVault },
  } = useNftx();

  type Args = TxnArgsOnly<typeof mintIntoVault>;

  return useTransaction(
    (args: Args) => mintIntoVault({ ...args, network, signer }),
    { description: 'Mint', ...opts }
  );
};

export default useMintIntoVault;
