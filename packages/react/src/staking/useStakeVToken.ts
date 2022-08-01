import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useStakeVToken = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { stakeVToken },
  } = useNftx();

  type Args = TxnArgsOnly<typeof stakeVToken>;

  return useTransaction(
    (args: Args) => stakeVToken({ network, signer, ...args }),
    { description: 'Stake vTokens', ...opts }
  );
};

export default useStakeVToken;
