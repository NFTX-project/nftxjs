import { NFTXVaultUpgradeable } from '@nftx/abi';
import { getContract, getExactTokenIds, zipTokenIds } from '@nftx/utils';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import { Zero } from '@nftx/constants';

const redeem = async ({
  provider,
  signer,
  quote: { premiumPrice, methodParameters: params },
}: {
  provider: Provider;
  signer: Signer;
  quote: Pick<MarketplaceQuote, 'methodParameters' | 'premiumPrice'>;
}) => {
  const contract = getContract({
    provider,
    signer,
    abi: NFTXVaultUpgradeable,
    address: params.vaultAddress,
  });

  const tokenIds = getExactTokenIds(
    zipTokenIds(params.tokenIdsOut, params.amountsOut)
  ).map(BigInt);
  const to = params.to;
  const wethAmount = Zero;
  const forceFees = true;
  const value = BigInt(params.value);
  const vTokenPremiumLimit = premiumPrice;

  console.debug({
    method: 'redeem',
    tokenIds,
    to,
    wethAmount,
    vTokenPremiumLimit,
    forceFees,
    value,
  });

  return contract.write.redeem({
    args: [tokenIds, to, wethAmount, vTokenPremiumLimit, forceFees],
    value,
  });
};

export default redeem;
