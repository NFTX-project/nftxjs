import { WeiPerEther } from '@ethersproject/constants';
import type { BaseProvider } from '@ethersproject/providers';
import type { Vault } from '../vaults';
import fetchSellPrice from './FetchSellPrice';

/** Fetches the sell price for a given vault */
const fetchVaultSellPrice = async ({
  vault,
  network,
  provider,
  sells = 1,
}: {
  vault: Pick<Vault, 'id' | 'fees'>;
  network: number;
  provider: BaseProvider;
  sells?: number;
}) => {
  /** When you sell an NFT there's a mint fee that's deducted from the final price
   * so if you sell one punk NFT, we mint 1 PUNK, give 0.5 PUNKs to the stakers
   * and trade 0.95 PUNKs for ETH
   */
  const fee = vault.fees.mintFee.mul(sells);
  const amount = WeiPerEther.mul(sells).sub(fee);

  return fetchSellPrice({
    network,
    provider,
    tokenAddress: vault.id,
    quote: 'ETH',
    amount,
  });
};

export default fetchVaultSellPrice;
