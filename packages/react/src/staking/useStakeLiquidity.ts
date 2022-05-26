import { useNftx } from '../contexts/nftx';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useStakeLiquidity = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    provider,
    core: { stakeLiquidity, fetchPool, invalidateVault },
  } = useNftx();

  type Args = Omit<
    TxnArgsOnly<typeof stakeLiquidity>,
    'gasPrice' | 'isNewPool'
  > & { vaultId: string };

  return useTransaction(
    async ({ vaultId, ...args }: Args) => {
      const { gasPrice } = await provider.getFeeData();
      const pool = await fetchPool({
        network,
        vaultId,
      });
      const isNewPool = pool == null;

      return stakeLiquidity({
        network,
        signer,
        gasPrice,
        isNewPool,
        vaultId,
        ...args,
      });
    },
    {
      description: 'Stake Liquidity',
      ...opts,
      async onSuccess(data, args) {
        await invalidateVault({ network, vaultId: args.vaultId });
        return opts?.onSuccess?.(data, args);
      },
    }
  );
};

export default useStakeLiquidity;
