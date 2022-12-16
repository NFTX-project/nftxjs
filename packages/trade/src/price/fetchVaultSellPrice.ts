import { WeiPerEther } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import calculateSellFee from './calculateSellFee';
import fetchSellPrice from './fetchSellPrice';

/** Fetches the sell price for a given vault */
const fetchVaultSellPrice = async ({
  vault,
  network = config.network,
  provider,
  amount: sells = 1,
  critical,
}: {
  vault: Pick<Vault, 'id'> & { fees: Pick<Vault['fees'], 'mintFee'> };
  network?: number;
  provider: Provider;
  amount?: number;
  critical?: boolean;
}) => {
  /** When you sell an NFT there's a mint fee that's deducted from the final price
   * so if you sell one punk NFT, we mint 1 PUNK, give 0.05 PUNKs to the stakers
   * and trade 0.95 PUNKs for ETH
   */
  const fee = calculateSellFee({ vault, amount: sells });
  const amount = WeiPerEther.mul(sells).sub(fee);

  return fetchSellPrice({
    network,
    provider,
    tokenAddress: vault.id,
    quote: 'ETH',
    amount,
    critical,
  });
};

export default fetchVaultSellPrice;
