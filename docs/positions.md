# Positions

[Position](api/types/nftx_js.Position)

A position is a user's staked balances in a pool. This is made up of 3 main factors:

1. total amount of liquidity staked (xSlp)
2. total amount of inventory staked (xToken)
3. total amount of claimable rewards (vToken)

## fetchPosition

[api](api/functions/nftx_js.fetchPosition)

This returns detailed information about a user's position for a specific pool. It includes details like amount of liquidity/inventory staked, total eth value of the position, the amount of claimable rewards, and the % split between inventory/liquidity. It also contains all of the properties of the [pool](./api/types/nftx_js.Pool).

If a user does not have a position (they've never staked in that pool before, or they've withdrawn their position in the past) this method will return a zero-balance position object.

## fetchUserPositions

[api](api/functions/nftx_js.fetchUserPositions)

Gets a user's positions across all pools.

## fetchVaultPositions

[api](api/functions/nftx_js.fetchVaultPositions)

Gets all positions for a single pool.

## adjustPosition

[api](api/functions/nftx_js.adjustPosition)

This method allows you to roughly predict the impact of increasing or decreasing a position.

Set an amount of liquidity or inventory to add to the position (or set a negative amount to remove it) and it will return a new position object with adjusted values, including the pool reserves, APY, % split, and pool share.
