import { InventoryStaking } from '@nftx/abi';
import config from '@nftx/config';
import { INVENTORY_STAKING } from '@nftx/constants';
import { Provider, Signer, WithdrawInventoryQuote } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

const withdrawInventory = ({
  provider,
  quote: {
    methodParameters: {
      nftIds,
      positionId,
      vTokenPremiumLimit,
      vTokenShares,
      value,
    },
  },
  signer,
  network = config.network,
}: {
  network?: number;
  quote: WithdrawInventoryQuote;
  provider: Provider;
  signer: Signer;
}) => {
  console.log({
    method: 'withdraw',
    positionId,
    vTokenShares,
    nftIds,
    vTokenPremiumLimit,
  });

  const contract = getContract({
    abi: InventoryStaking,
    address: getChainConstant(INVENTORY_STAKING, network),
    provider,
    signer,
  });

  return contract.write.withdraw({
    args: [positionId, vTokenShares, nftIds, vTokenPremiumLimit],
    value,
  });
};

export default withdrawInventory;
