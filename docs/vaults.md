# Vaults & Pools

[Vault](api/types/nftx_js.Vault)
[Pool](api/types/nftx_js.Pool)

Vaults are the underlying foundations of nftx. There are a tonne of methods and utilities for working with vaults. Some of the highlights:

## fetchVault

[api](api/functions/nftx_js.fetchVault)

This fetches all of the basic information about a vault - ids and addresses, name, symbol, reserves, features, fees.

For convenience it also contains a single holding that you can use for a preview image.

## fetchVaults

[api](api/functions/nftx_js.fetchVaults)

## fetchVaultHoldings

[api](api/functions/nftx_js.fetchVaultHoldings)

Returns all of the tokenIds in a vault. Includes the `amount` (if the collection supports ERC1155) and the date they were added to the vault.

## fetchPool

[api](api/functions/nftx_js.fetchPool)

A pool contains all the information about a vault's liquidity and inventory - addresses, total inventory, total liquidity, liquidity pairing (how much eth vs vToken), APR rates, the % split between inventory and liquidity.

## fetchPools

[api](api/functions/nftx_js.fetchPools)
