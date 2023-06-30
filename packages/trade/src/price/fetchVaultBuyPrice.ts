import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Price, Vault } from '@nftx/types';
import { parseEther } from 'viem';
import calculateBuyFee from './calculateBuyFee';
import fetchBuyPrice from './fetchBuyPrice';

/** Fetches the buy price for a vault.
 * Unlike fetchBuyPrice, this method accounts for vault fees and buying multiple targets
 */
const fetchVaultBuyPrice = async (args: {
  vault: Pick<Vault, 'id'> & {
    fees: Pick<Vault['fees'], 'redeemFee'>;
    features: Pick<Vault['features'], 'enableRedeem'>;
  };
  network?: number;
  /** The number of target buys we are doing */
  targetBuys?: number;
}): Promise<Price> => {
  const { vault, network = config.network, targetBuys } = args;

  const fee = calculateBuyFee({ vault, targetBuys });

  let amount = fee;

  if (targetBuys) {
    amount = amount + parseEther(`${targetBuys}`);
  } else {
    amount = amount + WeiPerEther;
  }

  return fetchBuyPrice({
    network,
    tokenAddress: vault.id,
    quote: 'ETH',
    amount,
  });
};

export default fetchVaultBuyPrice;
