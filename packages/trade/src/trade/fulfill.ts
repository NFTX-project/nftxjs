import { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import tradeErc20 from './tradeErc20';
import swap from './swap';
import redeem from './redeem';
import mint from './mint';
import sell from './sell';
import buy from './buy';
import { UnknownError } from '@nftx/errors';

/** Fulfills any quote returned by @nftx/api's fetchQuote method */
const fulfill = ({
  network,
  quote,
  signer,
  provider,
}: {
  quote: Pick<MarketplaceQuote, 'type' | 'methodParameters'>;
  network: number;
  signer: Signer;
  provider: Provider;
}) => {
  switch (quote.type) {
    case 'buy':
      return buy({ provider, quote, signer, network });
    case 'sell':
      return sell({ provider, quote, signer, network });
    case 'mint':
      return mint({ provider, quote, signer });
    case 'redeem':
      return redeem({ quote, provider, signer });
    case 'swap':
      return swap({ quote, provider, signer, network });
    case 'erc20':
      return tradeErc20({ provider, quote, signer, network });
    default:
      throw new UnknownError(`Unknown quote type: ${quote.type}`);
  }
};

export default fulfill;
