import { MarketplaceZap } from '@nftx/abi';
import config from '@nftx/config';
import { MARKETPLACE_ZAP } from '@nftx/constants';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import {
  getChainConstant,
  getContract,
  getExactTokenIds,
  zipTokenIds,
} from '@nftx/utils';

const swap = ({
  network = config.network,
  provider,
  quote: { methodParameters: params },
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

  const vaultId = BigInt(params.vaultId);
  const idsIn = params.tokenIdsIn.map(BigInt);
  const amounts = params.amountsIn.map(BigInt);
  const idsOut = getExactTokenIds(
    zipTokenIds(params.tokenIdsOut, params.amountsOut)
  ).map(BigInt);
  const vTokenPremiumLimit = BigInt(params.premiumLimit);
  const to = params.to;
  const value = BigInt(params.value);

  if (params.standard === 'ERC1155') {
    return contract.write.swap1155({
      args: [vaultId, idsIn, amounts, idsOut, vTokenPremiumLimit, to],
      value,
    });
  }

  return contract.write.swap721({
    args: [vaultId, idsIn, idsOut, vTokenPremiumLimit, to],
    value,
  });
};

export default swap;
