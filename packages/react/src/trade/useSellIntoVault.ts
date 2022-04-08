import type { sellIntoVault } from '@nftx/web3';
import { useNftx } from '../NftxProvider';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

type Args = Omit<Parameters<typeof sellIntoVault>[0], 'network' | 'provider'>;

const useSellIntoVault = (opts: UseTransactionOptions) => {
  const {
    network,
    provider,
    web3: { sellIntoVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => sellIntoVault({ ...args, network, provider }),
    opts
  );
};

export default useSellIntoVault;
