import type { approve } from '@nftx/web3';
import { useNftx } from '../NftxProvider';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

type Args = Omit<Parameters<typeof approve>[0], 'network' | 'provider'>;

const useApprove = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    web3: { approve },
  } = useNftx();

  return useTransaction(
    (args: Args) => approve({ ...args, network, provider }),
    opts
  );
};

export default useApprove;
