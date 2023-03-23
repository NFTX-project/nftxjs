import { NFTXRewardDistributionTokenUpgradeable } from '@nftx/abi';
import type { LiquidityPool } from '../pools';
import type { getContract } from '@nftx/utils';
import type { Address, Provider } from '@nftx/types';
import { Zero } from '@nftx/constants';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /** Returns the amount of tokens the user is able to claim for a liquidity pool */
  async function fetchClaimableTokens({
    pool,
    provider,
    userAddress,
  }: {
    pool: { dividendToken?: { id: LiquidityPool['dividendToken']['id'] } };
    provider: Provider;
    userAddress: Address;
  }) {
    const address = pool?.dividendToken?.id;
    if (!address) {
      return Zero;
    }

    const contract = getContract({
      provider,
      abi: NFTXRewardDistributionTokenUpgradeable,
      address,
    });

    const tokens = await contract.read.dividendOf({ args: [userAddress] });

    return tokens;
  };
