import { InventoryStaking } from '@nftx/abi';
import {
  CreateInventoryPositionQuote,
  Permit2Quote,
  Provider,
  Signer,
} from '@nftx/types';
import { getContract } from '@nftx/utils';

const createInventoryPosition = ({
  provider,
  quote: {
    methodParameters: {
      nftAmounts,
      nftIds,
      userAddress,
      vaultId,
      vToken,
      usePermit2,
      contractAddress,
    },
  },
  signer,
  permit2,
}: {
  network?: number;
  quote: Pick<CreateInventoryPositionQuote, 'methodParameters'>;
  provider: Provider;
  signer: Signer;
  permit2?: Permit2Quote;
}) => {
  const contract = getContract({
    address: contractAddress,
    provider,
    abi: InventoryStaking,
    signer,
  });

  // You can either dpeosit with vToken, or with NFTs
  if (vToken) {
    return contract.write.deposit({
      args: [
        BigInt(vaultId),
        vToken,
        userAddress,
        (usePermit2 ? permit2?.permit2encoded : undefined) || '0x',
        !!(usePermit2 && permit2),
        true,
      ],
    });
  }

  return contract.write.depositWithNFT({
    args: [BigInt(vaultId), nftIds, nftAmounts, userAddress],
  });
};

export default createInventoryPosition;
