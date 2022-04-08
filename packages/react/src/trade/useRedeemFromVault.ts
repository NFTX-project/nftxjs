import type { redeemFromVault } from '@nftx/web3';
import { useNftx } from '../NftxProvider';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

type Args = Omit<Parameters<typeof redeemFromVault>[0], 'network' | 'provider'>;

const useRedeemFromVault = (opts: UseTransactionOptions) => {
  const {
    network,
    provider,
    web3: { redeemFromVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => redeemFromVault({ ...args, network, provider }),
    opts
  );
};

export default useRedeemFromVault;
