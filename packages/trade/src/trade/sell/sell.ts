import { MARKETPLACE_ZAP } from '@nftx/constants';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import { MarketplaceZap } from '@nftx/abi';
import config from '@nftx/config';

const sell = ({
  network = config.network,
  provider,
  quote,
  signer,
}: {
  network?: number;
  provider: Provider;
  signer: Signer;
  quote: Pick<MarketplaceQuote, 'methodParameters'>;
}) => {
  const contract = getContract({
    address: getChainConstant(MARKETPLACE_ZAP, network),
    abi: MarketplaceZap,
    provider,
    signer,
  });

  return contract.write.sell721({
    args: [
      BigInt(quote.methodParameters.vaultId),
      quote.methodParameters.tokenIdsIn.map((x) => BigInt(x)),
      quote.methodParameters.executeCalldata,
      quote.methodParameters.to,
      // TODO: handle royalties?
      false,
    ],
  });
};

export default sell;
