import type { Provider } from '@ethersproject/providers';
import type { BigNumber } from '@ethersproject/bignumber';
import abi from '@nftx/constants/abis/NFTXInventoryStaking.json';
import { NFTX_INVENTORY_STAKING } from '@nftx/constants';
import getContract from '../web3/getContract';
import { getChainConstant } from '../web3';
import config from '@nftx/config';

const fetchXTokenShare = async ({
  network = config.network,
  provider,
  vaultId,
}: {
  network?: number;
  provider: Provider;
  vaultId: string;
}) => {
  const address = getChainConstant(NFTX_INVENTORY_STAKING, network);
  const contract = getContract({
    network,
    provider,
    abi,
    address,
  });
  const share: BigNumber = await contract.xTokenShareValue(vaultId);

  return share;
};

export default fetchXTokenShare;
