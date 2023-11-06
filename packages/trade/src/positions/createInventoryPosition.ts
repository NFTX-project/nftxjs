import { InventoryStaking } from '@nftx/abi';
import config from '@nftx/config';
import { INVENTORY_STAKING } from '@nftx/constants';
import { CreateInventoryPositionQuote, Provider, Signer } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

const createInventoryPosition = ({
  provider,
  quote: {
    methodParameters: { nftAmounts, nftIds, userAddress, vaultId },
  },
  signer,
  network = config.network,
}: {
  network?: number;
  quote: CreateInventoryPositionQuote;
  provider: Provider;
  signer: Signer;
}) => {
  const contract = getContract({
    address: getChainConstant(INVENTORY_STAKING, network),
    provider,
    abi: InventoryStaking,
    signer,
  });

  console.debug({
    method: 'depositWithNFT',
    vaultId,
    nftIds,
    nftAmounts,
    userAddress,
  });

  return contract.write.depositWithNFT({
    args: [BigInt(vaultId), nftIds, nftAmounts, userAddress],
  });
};

export default createInventoryPosition;
