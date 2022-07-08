import type { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther, Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { NFTX_LP_STAKING } from '@nftx/constants';
import ERC20Interface from '@nftx/constants/abis/ERC20.json';
import { fetchReservesForToken, TokenReserve } from '../tokens';
import type { Vault } from '../vaults';
import { getChainConstant, getContract } from '../web3';
import type { LiquidityPool } from './types';

const calculatePercentageStaked = (
  stakingTokenPoolBalance: BigNumber,
  stakingTokenTotalSupply: BigNumber
) => {
  if (stakingTokenPoolBalance && stakingTokenTotalSupply) {
    return stakingTokenPoolBalance
      .mul(WeiPerEther)
      .div(stakingTokenTotalSupply);
  }

  return Zero;
};

const calculateVToken = (
  reserveSizeVToken: BigNumber,
  percentageStaked: BigNumber
) => {
  if (reserveSizeVToken?.gt(0) && percentageStaked?.gt(0)) {
    return reserveSizeVToken.mul(percentageStaked).div(WeiPerEther);
  }

  return Zero;
};

const calculateWeth = (
  reserveSizeWeth: BigNumber,
  percentageStaked: BigNumber
) => {
  if (reserveSizeWeth?.gt(0) && percentageStaked?.gt(0)) {
    return reserveSizeWeth.mul(percentageStaked).div(WeiPerEther);
  }

  return Zero;
};

export const calculatePoolSize = ({
  poolReserves,
  stakingTokenPoolBalance,
  stakingTokenTotalSupply,
}: {
  poolReserves: TokenReserve;
  stakingTokenPoolBalance: BigNumber;
  stakingTokenTotalSupply: BigNumber;
}) => {
  const percentageStaked = calculatePercentageStaked(
    stakingTokenPoolBalance,
    stakingTokenTotalSupply
  );

  const vToken = calculateVToken(poolReserves?.reserveVtoken, percentageStaked);

  const weth = calculateWeth(poolReserves?.reserveWeth, percentageStaked);

  return {
    vToken,
    weth,
  };
};

const fetchRewardPoolReserves = async ({
  stakingToken,
  vault,
  network = config.network,
  provider,
}: {
  stakingToken: LiquidityPool['stakingToken'];
  vault: Pick<Vault, 'id'>;
  network?: number;
  provider: Provider;
}): Promise<TokenReserve> => {
  const stakingAddress = stakingToken.id;
  const stakingZap = getChainConstant(NFTX_LP_STAKING, network);
  const contract = getContract({
    abi: ERC20Interface,
    address: stakingAddress,
    network,
    provider,
  });

  const [poolReserves, stakingTokenPoolBalance, stakingTokenTotalSupply] =
    await Promise.all([
      fetchReservesForToken({ network, tokenAddress: vault.id }).catch(
        () => null
      ),
      contract.balanceOf(stakingZap).catch(() => null),
      contract.totalSupply().catch(() => null),
    ]);

  const { vToken, weth } = calculatePoolSize({
    poolReserves,
    stakingTokenPoolBalance,
    stakingTokenTotalSupply,
  });

  return {
    derivedEth: null,
    midPrice: null,
    tokenId: vault.id,
    reserveVtoken: vToken,
    reserveWeth: weth,
  };
};

export default fetchRewardPoolReserves;
