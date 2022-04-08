import type { mintIntoVault } from '@nftx/web3';
import { useNftx } from '../context';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

type Args = Omit<Parameters<typeof mintIntoVault>[0], 'network' | 'provider'>;

const useMintIntoVault = (opts?: UseTransactionOptions) => {
  const {
    network,
    provider,
    web3: { mintIntoVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => mintIntoVault({ ...args, network, provider }),
    opts
  );
};

export default useMintIntoVault;
