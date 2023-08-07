import { MARKETPLACE_ZAP } from '@nftx/constants';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import { MarketplaceZap } from '@nftx/abi';
import config from '@nftx/config';

const buy = ({
  network = config.network,
  provider,
  quote,
  signer,
}: {
  quote: Pick<MarketplaceQuote, 'methodParameters'>;
  network?: number;
  provider: Provider;
  signer: Signer;
}) => {
  const contract = getContract({
    address: getChainConstant(MARKETPLACE_ZAP, network),
    abi: MarketplaceZap,
    provider,
    signer,
  });

  // TODO: how to handle 1155s?
  return contract.write.buyNFTsWithETH({
    args: [
      BigInt(quote.methodParameters.vaultId),
      quote.methodParameters.tokenIdsOut.map((x) => BigInt(x)),
      quote.methodParameters.executeCalldata,
      quote.methodParameters.to,
      false,
    ],
    value: BigInt(quote.methodParameters.value),
  });
};

export default buy;
