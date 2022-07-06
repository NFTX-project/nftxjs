import { Zero } from '@ethersproject/constants';
import NftxRewardDistributionTokenAbi from '@nftx/constants/abis/NFTXRewardDistributionTokenUpgradeable.json';
import type { Provider } from '@ethersproject/providers';
import type { BigNumber } from '@ethersproject/bignumber';
import type { getContract } from '../web3';
import type { LiquidityPool } from '../pools';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /** Returns the amount of tokens the user is able to claim for a liquidity pool */
  async function fetchClaimableTokens({
    pool,
    network,
    provider,
    userAddress,
  }: {
    pool: { dividendToken?: { id: LiquidityPool['dividendToken']['id'] } };
    network: number;
    provider: Provider;
    userAddress: string;
  }) {
    const address = pool?.dividendToken?.id;
    if (!address) {
      return Zero;
    }

    const contract = getContract({
      network,
      provider,
      abi: NftxRewardDistributionTokenAbi,
      address: pool.dividendToken.id,
    });

    const tokens: BigNumber = await contract.dividendOf(userAddress);

    return tokens;
  };
