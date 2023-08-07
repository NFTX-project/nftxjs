import fetchQuote from '../../price/fetchQuote';
import type { BigIntish, Provider, Signer } from '@nftx/types';
import type { QuoteToken } from '../../price';
import { getAccount } from 'viem';
import config from '@nftx/config';

const tradeNftx = async ({
  buyAmount,
  buyToken,
  network,
  provider,
  sellAmount,
  sellToken,
  signer,
}: {
  provider: Provider;
  signer: Signer;
  network: number;
  buyToken: QuoteToken;
  sellToken: QuoteToken;
  buyAmount: BigIntish;
  sellAmount: BigIntish;
}) => {
  const [address] = await signer.getAddresses();
  const account = getAccount(address);

  const {
    methodParameters: { calldata, to, value },
  } = await fetchQuote({
    network,
    userAddress: address,
    buyToken,
    sellToken,
    buyAmount,
    sellAmount,
  });

  const hash = await signer.sendTransaction({
    to,
    data: calldata,
    value: BigInt(value),
    account,
  });

  return { hash, wait: () => provider.waitForTransactionReceipt({ hash }) };
};

const tradeErc20 = ({
  buyAmount,
  buyToken,
  network = config.network,
  provider,
  sellAmount,
  sellToken,
  signer,
}: {
  provider: Provider;
  signer: Signer;
  network?: number;
  buyToken: QuoteToken;
  sellToken: QuoteToken;
  buyAmount: BigIntish;
  sellAmount: BigIntish;
}) => {
  return tradeNftx({
    buyAmount,
    buyToken,
    network,
    provider,
    sellAmount,
    sellToken,
    signer,
  });
};

export default tradeErc20;
