import config from '@nftx/config';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';

const tradeErc20 = async ({
  provider,
  signer,
  quote,
}: {
  provider: Provider;
  signer: Signer;
  network?: number;
  quote: Pick<MarketplaceQuote, 'methodParameters'>;
}) => {
  const [address] = await signer.getAddresses();
  const account = address;

  const {
    methodParameters: { executeCalldata, to, value },
  } = quote;

  if (config.debug) {
    console.debug({
      method: 'tradeErc20',
      to,
      data: executeCalldata,
      value: BigInt(value),
      account,
    });
  }

  const hash = await signer.sendTransaction({
    to,
    data: executeCalldata,
    value: BigInt(value),
    account,
    chain: provider.chain,
  });

  return { hash, wait: () => provider.waitForTransactionReceipt({ hash }) };
};

export default tradeErc20;
