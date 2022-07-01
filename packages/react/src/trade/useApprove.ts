import type { approve } from '@nftx/core';
import { useNftx } from '../NftxProvider';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

type Args = Omit<Parameters<typeof approve>[0], 'network' | 'signer'>;

const useApprove = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    web3: { approve },
  } = useNftx();

  return useTransaction((args: Args) => approve({ ...args, network, signer }), {
    description: 'Approve',
    ...opts,
  });
};

export default useApprove;
