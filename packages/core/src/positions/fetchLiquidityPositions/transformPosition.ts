import type { Address, LiquidityPosition, Vault } from '@nftx/types';
import type { PositionsResponse } from './types';
import { WeiPerEther, Zero } from '@nftx/constants';
import calculateVTokenEth from './calculateVTokenEth';

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
}: {
  position: Position;
  vault: Pick<Vault, 'vTokenToEth' | 'id' | 'vaultId'>;
  network: number;
}): LiquidityPosition => {
  const tick = BigInt(position.pool.tick ?? '0');
  const tickLower = BigInt(position.tickLower?.index ?? '0');
  const tickUpper = BigInt(position.tickUpper?.index ?? '0');
  const inRange = tick >= tickLower && tick <= tickUpper;
  const liquidity = BigInt(position.liquidity);

  const { eth, vToken, tickLowerPrice, tickUpperPrice } = calculateVTokenEth({
    inputTokens: position.pool.inputTokens.map((t) => t.id as Address),
    liquidity,
    network,
    tickLower,
    tickUpper,
    vTokenToEth: vault.vTokenToEth,
    currentTick: tick,
  });

  // This is ETH price at the upper and lower tick boundaries
  const tickUpperValue = normalizeTickPrice(tickUpperPrice);
  const tickLowerValue = normalizeTickPrice(tickLowerPrice);

  // TODO: all of the pricing/value stuff in this function is completely wrong
  // https://www.notion.so/nftx/Remove-partial-liquidity-from-pool-5bf28f4ed98d48079b0b78fb91bdd1aa
  const price = vault.vTokenToEth;

  // TODO: surely it's not that simple?
  const vTokenValue = (price * vToken) / WeiPerEther;
  const value = vTokenValue + eth;

  // TODO: get these from... somwhere?
  const claimableRewards = Zero;
  const lifetimeRewards = Zero;

  return {
    id: position.id,
    poolId: position.pool.id,
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
    claimableRewards,
    lifetimeRewards,
    poolShare: Zero,
    initialValue: value,
  };
};

export default transformPosition;
