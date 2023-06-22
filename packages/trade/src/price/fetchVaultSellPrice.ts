import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Vault } from '@nftx/types';
import calculateSellFee from './calculateSellFee';
import fetchSellPrice from './fetchSellPrice';

/** Fetches the sell price for a vault.
 * Unlike fetchSellPrice, this method accounts for vault fees
 */
const fetchVaultSellPrice = async (args: {
  vault: { id: Vault['id']; fees: Pick<Vault['fees'], 'mintFee'> };
  network?: number;
  amount?: number;
}) => {
  const { vault, network = config.network, amount: sells = 1 } = args;

  /** When you sell an NFT there's a mint fee that's deducted from the final price
   * so if you sell one punk NFT, we mint 1 PUNK, give 0.05 PUNKs to the stakers
   * and trade 0.95 PUNKs for ETH
   */
  const fee = calculateSellFee({ vault, amount: sells });
  const amount = WeiPerEther * BigInt(sells) - fee;

  return fetchSellPrice({
    network,
    tokenAddress: vault.id,
    quote: 'ETH',
    amount,
  });
};

export default fetchVaultSellPrice;
