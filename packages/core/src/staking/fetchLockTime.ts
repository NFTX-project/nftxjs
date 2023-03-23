import config from '@nftx/config';
import { NFTX_STAKING_ZAP } from '@nftx/constants';
import { NFTXStakingZap } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Provider } from '@nftx/types';

/** Returns the standard time that a position is locked in when you stake inventory or liquidity */
const fetchLockTime = async ({
  network = config.network,
  provider,
}: {
  network?: number;
  provider: Provider;
}) => {
  const address = getChainConstant(NFTX_STAKING_ZAP, network);
  const contract = getContract({ abi: NFTXStakingZap, address, provider });

  const ipLockTime = await contract.read.inventoryLockTime({});
  const lpLockTime = await contract.read.lpLockTime({});

  const inventoryLockTime = Number(ipLockTime);
  const liquidityLockTime = Number(lpLockTime);

  return { inventoryLockTime, liquidityLockTime };
};

export default fetchLockTime;
