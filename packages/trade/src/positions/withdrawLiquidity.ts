import { PoolRouter } from '@nftx/abi';
import { Provider, Signer, WithdrawLiquidityQuote } from '@nftx/types';
import { getContract } from '@nftx/utils';

const withdrawLiquidity = ({
  provider,
  quote: {
    methodParameters: { params, value, contractAddress },
  },
  signer,
}: {
  network?: number;
  quote: Pick<WithdrawLiquidityQuote, 'methodParameters'>;
  provider: Provider;
  signer: Signer;
}) => {
  const contract = getContract({
    abi: PoolRouter,
    address: contractAddress,
    provider,
    signer,
  });

  return contract.write.removeLiquidity({
    args: [params],
    value,
  });
};

export default withdrawLiquidity;
