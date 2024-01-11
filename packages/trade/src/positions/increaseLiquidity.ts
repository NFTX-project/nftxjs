import { PoolRouter } from '@nftx/abi';
import {
  IncreaseLiquidityQuote,
  Permit2Quote,
  Provider,
  Signer,
} from '@nftx/types';
import { getContract } from '@nftx/utils';

const increaseLiquidity = ({
  provider,
  quote: {
    methodParameters: { params, value, usePermit2, contractAddress },
  },
  signer,
  permit2,
}: {
  network?: number;
  provider: Provider;
  signer: Signer;
  quote: IncreaseLiquidityQuote;
  permit2?: Permit2Quote;
}) => {
  const contract = getContract({
    address: contractAddress,
    abi: PoolRouter,
    provider,
    signer,
  });

  if (permit2 && usePermit2) {
    return contract.write.increaseLiquidityWithPermit2({
      args: [params, permit2.permit2encoded],
      value,
    });
  }

  return contract.write.increaseLiquidity({
    args: [params],
    value,
  });
};

export default increaseLiquidity;
