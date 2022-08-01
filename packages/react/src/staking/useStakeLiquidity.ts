import type { VaultAddress } from '@nftx/core';
import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useStakeLiquidity = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    provider,
    core: { stakeLiquidity, fetchPool },
  } = useNftx();

  type Args = Omit<
    TxnArgsOnly<typeof stakeLiquidity>,
    'gasPrice' | 'isNewPool'
  > & { vaultAddress: VaultAddress };

  return useTransaction(
    async ({ vaultAddress, ...args }: Args) => {
      const { gasPrice } = await provider.getFeeData();
      const pool = await fetchPool({
        network,
        vaultAddress,
      });
      const isNewPool = pool == null;

      return stakeLiquidity({ network, signer, gasPrice, isNewPool, ...args });
    },
    { description: 'Stake Liquidity', ...opts }
  );
};

export default useStakeLiquidity;
