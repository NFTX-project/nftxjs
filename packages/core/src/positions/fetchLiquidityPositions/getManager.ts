import {
  NONFUNGIBLE_POSITION_MANAGER,
  Network,
  POOL_ROUTER,
} from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';

const getManager = (network: number, timestampOpened: string) => {
  const lastTimeOldContractUsed = 1704206700;
  const timestamp = Number(timestampOpened);

  let manager = getChainConstant(NONFUNGIBLE_POSITION_MANAGER, network);
  let poolRouter = getChainConstant(POOL_ROUTER, network);

  // If older than this, it's the old contract
  if (timestamp <= lastTimeOldContractUsed && network === Network.Sepolia) {
    manager = '0x55bdc76262b1e6e791d0636a0bc61cee23cdfa87';
    poolRouter = '0xD36ece08F76c50EC3F01db65BBc5Ef5Aa5fbE849';
  }
  return { manager, poolRouter };
};

export default getManager;
