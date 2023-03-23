import type { Address } from 'nftx.js';
import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useClaimRewards = (opts?: UseTransactionOptions) => {
  const {
    provider,
    signer,
    network,
    core: { claimRewards, invalidateUser },
  } = useNftx();

  type Args = TxnArgsOnly<typeof claimRewards> & { userAddress: Address };

  return useTransaction(
    (args: Args) => claimRewards({ network, provider, signer, ...args }),
    {
      description: 'Claim Rewards',
      ...opts,
      async onSuccess(data, args) {
        await invalidateUser({ network, userAddress: args.userAddress });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useClaimRewards;
