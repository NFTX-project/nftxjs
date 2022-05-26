import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { NFTX_STAKING_ZAP } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXStakingZap.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { BigNumber } from '@ethersproject/bignumber';

/** Returns the standard time that a position is locked in when you stake inventory or liquidity */
const fetchLockTime = async ({
  network = config.network,
  provider,
}: {
  network?: number;
  provider: Provider;
}) => {
  const address = getChainConstant(NFTX_STAKING_ZAP, network);
  const contract = getContract({ abi, address, network, provider });

  const ipLockTime: BigNumber = await contract.inventoryLockTime();
  const lpLockTime: BigNumber = await contract.lpLockTime();

  const inventoryLockTime = Number(ipLockTime);
  const liquidityLockTime = Number(lpLockTime);

  return { inventoryLockTime, liquidityLockTime };
};

export default fetchLockTime;
