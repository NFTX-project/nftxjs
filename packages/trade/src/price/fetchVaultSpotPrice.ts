import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import calculateBuyFee from './calculateBuyFee';
import { parseEther } from 'viem';
import { WeiPerEther } from '@nftx/constants';
import fetchSpotPrice from './fetchSpotPrice';

const fetchVaultSpotPrice = (args: {
  vault: Pick<Vault, 'fees' | 'features' | 'id'>;
  network?: number;
  targetBuys?: number;
}) => {
  const { vault, network = config.network, targetBuys } = args;

  const fee = calculateBuyFee({ vault, targetBuys });
  let amount = fee;

  if (targetBuys) {
    amount = amount + parseEther(`${targetBuys}`);
  } else {
    amount = amount + WeiPerEther;
  }

  return fetchSpotPrice({
    network,
    tokenAddress: vault.id,
    quote: 'ETH',
    amount,
  });
};

export default fetchVaultSpotPrice;
