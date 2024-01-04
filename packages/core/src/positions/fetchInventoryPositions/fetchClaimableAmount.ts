import { InventoryStaking } from '@nftx/abi';
import config from '@nftx/config';
import { INVENTORY_STAKING } from '@nftx/constants';
import { Provider } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

type GetContract = typeof getContract;

export const makeFetchClaimableAmount =
  ({ getContract }: { getContract: GetContract }) =>
  ({
    network = config.network,
    positionId,
    provider,
  }: {
    network?: number;
    provider: Provider;
    positionId: string;
  }) => {
    const contract = getContract({
      abi: InventoryStaking,
      address: getChainConstant(INVENTORY_STAKING, network),
      provider,
    });

    return contract.read.wethBalance({ args: [BigInt(positionId)] });
  };

const fetchClaimableAmount = makeFetchClaimableAmount({ getContract });

export default fetchClaimableAmount;
