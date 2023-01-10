# Trading

## Buying

### fetchVaultBuyPrice

[api](api/functions/nftx_js.fetchVaultBuyPrice)

### buy

[api](api/functions/nftx_js.buy)

## Selling

### fetchVaultSellPrice

[api](api/functions/nftx_js.fetchVaultSellPrice)

### approveSell

[api](api/functions/nftx_js.approveSell)

In order to sell NFTs into the vault, the zap contract first requires approval. There is a catchall [approve](api/functions/nftx_js.approve) method that can be used for any contract approval, but it's advisable to use the action-specific methods when possible, as they account for additional factors (such as which contract to use - which may differ depending on the interaction)

### isSellApproved

[api](api/functions/nftx_js.isSellApproved)

### sell

[api](api/functions/nftx_js.sell)

## Swapping

### fetchVaultSwapPrice

[api](api/functions/nftx_js.fetchVaultSwapPrice)

Note that some vaults have no fees for swapping, in which case this method will return `0`.

### approveSwap

[api](api/functions/nftx_js.approveSwap)

### isSwapApproved

[api](api/functions/nftx_js.isSwapApproved)

### swap

[api](api/functions/nftx_js.swap)

## Staking

### stakeInventory

[api](api/functions/nftx_js.stakeInventory)

### stakeLiquidity

[api](api/functions/nftx_js.stakeLiquidity)

### fetchUserTimelock

[api](api/functions/nftx_js.fetchUserTimelock)

After staking NFTs into a pool, there is a standard lock time that the user must wait before they can unstake their position. This method returns timestamps for when the user is able to unstake.

### unstakeInventory

[api](api/functions/nftx_js.unstakeInventory)

### unstakeLiquidity

[api](api/functions/nftx_js.unstakeLiquidity)
