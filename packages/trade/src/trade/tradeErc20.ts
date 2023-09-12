import type { Price, Provider, Signer } from '@nftx/types';
import { getAccount } from 'viem';

const tradeErc20 = async ({
  provider,
  signer,
  quote,
}: {
  provider: Provider;
  signer: Signer;
  network?: number;
  quote: Pick<Price, 'methodParameters'>;
}) => {
  const [address] = await signer.getAddresses();
  const account = getAccount(address);

  const {
    methodParameters: { calldata, to, value },
  } = quote;

  console.debug({
    method: 'tradeErc20',
    to,
    data: calldata,
    value: BigInt(value),
    account,
  });

  const hash = await signer.sendTransaction({
    to,
    data: calldata,
    value: BigInt(value),
    account,
  });

  return { hash, wait: () => provider.waitForTransactionReceipt({ hash }) };
};

export default tradeErc20;
