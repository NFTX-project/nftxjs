import type { mintIntoVault } from '@nftx/core';
import { useNftx } from '../NftxProvider';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

type Args = Omit<Parameters<typeof mintIntoVault>[0], 'network' | 'provider'>;

const useMintIntoVault = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    web3: { mintIntoVault },
  } = useNftx();

  return useTransaction(
    (args: Args) => mintIntoVault({ ...args, network, signer }),
    opts
  );
};

export default useMintIntoVault;
