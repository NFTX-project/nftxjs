import { MARKETPLACE_ZAP } from '@nftx/constants';
import type { MarketplaceQuote, Provider, Signer } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import { MarketplaceZap } from '@nftx/abi';
import config from '@nftx/config';

const sell = ({
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
  const calldata = params.executeCalldata;
  const to = params.to;
  // TODO: handle royalties?
  const deductRoyalty = false;

  if (params.standard === 'ERC1155') {
    return contract.write.sell1155({
      args: [vaultId, idsIn, amounts, calldata, to, deductRoyalty],
      // value,
    });
  }

  return contract.write.sell721({
    args: [vaultId, idsIn, calldata, to, deductRoyalty],
    // value,
  });
};

export default sell;
