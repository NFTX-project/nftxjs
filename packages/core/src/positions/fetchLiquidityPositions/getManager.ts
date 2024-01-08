import { NONFUNGIBLE_POSITION_MANAGER, Network } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';

const getManager = (network: number, timestampOpened: string) => {
  const lastTimeOldContractUsed = 1704206700;
  const timestamp = Number(timestampOpened);
  // If older than this, it's the old contract
  if (timestamp <= lastTimeOldContractUsed && network === Network.Sepolia) {
    return '0x55bdc76262b1e6e791d0636a0bc61cee23cdfa87';
  }
  return getChainConstant(NONFUNGIBLE_POSITION_MANAGER, network);
};

export default getManager;
