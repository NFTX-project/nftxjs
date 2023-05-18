import fetchNftxQuote from '../../price/fetchNftxQuote';
import type { BigIntish, Provider, Signer, Transaction } from '@nftx/types';
import {
  QuoteToken,
  doesNetworkSupport0x,
  doesNetworkSupportNftxRouter,
  fetch0xQuote,
} from '../../price';
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
  } = await fetchNftxQuote({
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

const trade0x = async ({
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
}): Promise<Transaction> => {
  const { data, to, value } = await fetch0xQuote({
    network,
    buyToken,
    sellToken,
    buyAmount,
    critical: true,
    sellAmount,
    type: 'quote',
  });
  const [address] = await signer.getAddresses();
  const account = getAccount(address);

  const hash = await signer.sendTransaction({
    to,
    data,
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
  if (doesNetworkSupportNftxRouter(network)) {
    return tradeNftx({
      buyAmount,
      buyToken,
      network,
      provider,
      sellAmount,
      sellToken,
      signer,
    });
  }
  if (doesNetworkSupport0x(network)) {
    return trade0x({
      buyAmount,
      buyToken,
      network,
      provider,
      sellAmount,
      sellToken,
      signer,
    });
  }

  throw new Error(`tradeErc20 is not supported for network ${network}`);
};

export default tradeErc20;
