import { InventoryStaking } from '@nftx/abi';
import { Provider, Signer, WithdrawInventoryQuote } from '@nftx/types';
import { getContract } from '@nftx/utils';

const withdrawInventory = ({
  provider,
  quote: {
    methodParameters: {
      nftIds,
      positionId,
      vTokenPremiumLimit,
      vTokenShares,
      value,
      contractAddress,
    },
  },
  signer,
}: {
  network?: number;
  quote: WithdrawInventoryQuote;
  provider: Provider;
  signer: Signer;
}) => {
  const contract = getContract({
    abi: InventoryStaking,
    address: contractAddress,
    provider,
    signer,
  });

  return contract.write.withdraw({
    args: [positionId, vTokenShares, nftIds, vTokenPremiumLimit],
    value,
  });
};

export default withdrawInventory;
