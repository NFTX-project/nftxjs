import { NFTXVaultUpgradeable } from '@nftx/abi';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import { getContract } from '@nftx/utils';

const mint = async ({
  provider,
  signer,
  quote: { methodParameters: params },
}: {
  provider: Provider;
  signer: Signer;
  quote: Pick<MarketplaceQuote, 'methodParameters'>;
}) => {
  const contract = getContract({
    provider,
    signer,
    abi: NFTXVaultUpgradeable,
    address: params.vaultAddress,
  });

  const tokenIds = params.tokenIdsIn.map(BigInt);
  const amounts = params.amountsIn.map(BigInt);
  const depositor = params.to;
  const to = params.to;
  const value = BigInt(params.value);

  // Not sure if vaultAddress is correct
  return contract.write.mint({
    args: [tokenIds, amounts, depositor, to],
    value,
  });
};

export default mint;
