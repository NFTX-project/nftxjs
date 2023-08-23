import { MarketplaceZap } from '@nftx/abi';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import { getContract, getExactTokenIds, zipTokenIds } from '@nftx/utils';

const swap = ({
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
    address: params.vaultAddress,
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
  const to = params.to;
  const value = BigInt(params.value);

  if (params.standard === 'ERC721') {
    return contract.write.swap1155({
      args: [vaultId, idsIn, amounts, idsOut, to],
      value,
    });
  }

  return contract.write.swap721({
    args: [vaultId, idsIn, idsOut, to],
    value,
  });
};

export default swap;
