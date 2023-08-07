import { MarketplaceZap } from '@nftx/abi';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import { getContract } from '@nftx/utils';

const swap = ({
  provider,
  quote,
  signer,
}: {
  network?: number;
  provider: Provider;
  signer: Signer;
  quote: MarketplaceQuote;
}) => {
  const contract = getContract({
    address: quote.methodParameters.vaultAddress,
    abi: MarketplaceZap,
    provider,
    signer,
  });

  // TODO: handle 1155s
  return contract.write.swap721({
    args: [
      BigInt(quote.methodParameters.vaultId),
      quote.methodParameters.tokenIdsIn.map((x) => BigInt(x)),
      quote.methodParameters.tokenIdsOut.map((x) => BigInt(x)),
      quote.methodParameters.to,
    ],
    value: BigInt(quote.methodParameters.value),
  });
};

export default swap;
