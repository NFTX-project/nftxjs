import type { Provider } from '@ethersproject/providers';
import { NFTX_STAKING_ZAP } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXStakingZap.json';
import type { BigNumber } from 'ethers';
import { getChainConstant, getContract } from '../web3';

/** Returns the standard time that a position is locked in when you stake inventory or liquidity */
const fetchLockTime = async ({
  network,
  provider,
}: {
  network: number;
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
