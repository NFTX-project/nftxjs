import type { Address, LiquidityPosition, TokenId, Vault } from '@nftx/types';
import type { PositionsResponse } from './types';
import { WETH_TOKEN, WeiPerEther, Zero } from '@nftx/constants';
import calculateVTokenEth from './calculateVTokenEth';
import { addressEqual, getChainConstant } from '@nftx/utils';

type Position = PositionsResponse['positions'][0];

// If a tick is less than 0 that means it's a fractional amount
const normalizeTickPrice = (tickPrice: bigint) => {
  if (tickPrice >= Zero) {
    return tickPrice;
  }
  return (WeiPerEther * WeiPerEther) / tickPrice;
};

const transformPosition = ({
  network,
  position,
  vault,
  claimable0,
  claimable1,
  tokenId,
}: {
  position: Position;
  vault: Pick<Vault, 'vTokenToEth' | 'id' | 'vaultId'>;
  network: number;
  claimable0: bigint;
  claimable1: bigint;
  tokenId: TokenId;
}): LiquidityPosition => {
  const tick = BigInt(position.pool.tick ?? '0');
  const tickLower = BigInt(position.tickLower?.index ?? '0');
  const tickUpper = BigInt(position.tickUpper?.index ?? '0');
  const inRange = tick >= tickLower && tick <= tickUpper;
  const liquidity = BigInt(position.liquidity);
  const lockedUntil = Number(position.lockedUntil);
  const isWeth0 = addressEqual(
    position.pool.inputTokens[0].id,
    getChainConstant(WETH_TOKEN, network)
  );

  const { eth, vToken, tickLowerPrice, tickUpperPrice } = calculateVTokenEth({
    inputTokens: position.pool.inputTokens.map((t) => t.id as Address),
    liquidity,
    network,
    tickLower,
    tickUpper,
    vTokenToEth: vault.vTokenToEth,
    currentTick: tick,
  });

  const claimableEth = isWeth0 ? claimable0 : claimable1;
  const claimableVToken = isWeth0 ? claimable1 : claimable0;
  const claimableValue =
    claimableEth + (claimableVToken * vault.vTokenToEth) / WeiPerEther;

  // This is ETH price at the upper and lower tick boundaries
  const tickUpperValue = normalizeTickPrice(tickUpperPrice);
  const tickLowerValue = normalizeTickPrice(tickLowerPrice);

  const price = vault.vTokenToEth;

  const vTokenValue = (price * vToken) / WeiPerEther;
  const value = vTokenValue + eth;

  // TODO: get this from... somwhere?
  const lifetimeRewards = Zero;

  return {
    id: position.id as Address,
    poolId: position.pool.id,
    tokenId,
    liquidity,
    tickLower,
    tickUpper,
    userAddress: position.account.id as Address,
    inRange,
    eth,
    tickLowerValue,
    tickUpperValue,
    value,
    vToken,
    vTokenValue,
    vaultAddress: vault.id,
    vaultId: vault.vaultId,
    claimableEth,
    claimableValue,
    claimableVToken,
    lifetimeRewards,
    poolShare: Zero,
    initialValue: value,
    lockedUntil,
  };
};

export default transformPosition;
