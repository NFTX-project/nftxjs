import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useClaimRewards = (opts?: UseTransactionOptions) => {
  const {
    signer,
    network,
    core: { claimRewards },
  } = useNftx();

  type Args = TxnArgsOnly<typeof claimRewards>;

  return useTransaction(
    (args: Args) => claimRewards({ network, signer, ...args }),
    { description: 'Claim Rewards', ...opts }
  );
};

export default useClaimRewards;
