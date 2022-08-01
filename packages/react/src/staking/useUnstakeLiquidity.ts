import { useNftx } from '../contexts';
import type { TxnArgsOnly } from '../types';
import type { UseTransactionOptions } from '../useTransaction';
import useTransaction from '../useTransaction';

const useUnstakeLiquidity = (opts?: UseTransactionOptions) => {
  const {
    network,
    signer,
    core: { unstakeLiquidity },
  } = useNftx();

  type Args = TxnArgsOnly<typeof unstakeLiquidity>;

  return useTransaction(
    (args: Args) => unstakeLiquidity({ network, signer, ...args }),
    { description: 'Unstake Liquidity', ...opts }
  );
};

export default useUnstakeLiquidity;
