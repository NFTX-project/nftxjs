import type { buyFromVault } from '@nftx/core';
import { useNftx } from '../NftxProvider';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

type Args = Omit<Parameters<typeof buyFromVault>[0], 'network' | 'provider'>;

const useBuyFromVault = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    web3: { buyFromVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => buyFromVault({ ...args, network, signer }),
    opts
  );
};

export default useBuyFromVault;
