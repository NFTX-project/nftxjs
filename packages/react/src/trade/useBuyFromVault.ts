import type { buyFromVault } from '@nftx/web3';
import { useNftx } from '../NftxProvider';
import useTransaction, { UseTransactionOptions } from '../useTransaction';

type Args = Omit<Parameters<typeof buyFromVault>[0], 'network' | 'provider'>;

const useBuyFromVault = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    web3: { buyFromVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => buyFromVault({ ...args, network, provider }),
    opts
  );
};

export default useBuyFromVault;
