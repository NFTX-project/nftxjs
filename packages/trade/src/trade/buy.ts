import { MARKETPLACE_ZAP } from '@nftx/constants';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import {
  getChainConstant,
  getContract,
  getExactTokenIds,
  zipTokenIds,
} from '@nftx/utils';
import { MarketplaceZap } from '@nftx/abi';
import config from '@nftx/config';

const buy = ({
  network = config.network,
  provider,
  quote: { methodParameters: params },
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

  const vaultId = BigInt(params.vaultId);
  const idsOut = getExactTokenIds(
    zipTokenIds(params.tokenIdsOut, params.amountsOut)
  ).map(BigInt);
  const calldata = params.executeCalldata;
  const to = params.to;
  const vTokenPremiumLimit = BigInt(params.premiumLimit);
  const deductRoyalty = false;

  return contract.write.buyNFTsWithETH({
    args: [vaultId, idsOut, calldata, to, vTokenPremiumLimit, deductRoyalty],
    value: BigInt(params.value),
  });
};

export default buy;
