import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

const useStakeSlp = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { stakeSlp },
  } = useNftx();

  type Args = TxnArgsOnly<typeof stakeSlp>;

  return useTransaction(
    (args: Args) => stakeSlp({ network, signer, ...args }),
    { description: 'Stake SLP', ...opts }
  );
};

export default useStakeSlp;
