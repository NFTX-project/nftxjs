import { Network } from './networks';

type Address = `0x${string}`;

const a = (s: Address) => s;

/**
 * The Cryptokitty contract (Doesn't implement 721 properly)
 */
export const CRYPTOKITTIES = a('0x06012c8cf97bead5deae237070f9587f8e7a266d');

/**
 * The Punk contract (doesn't implement 721)
 */
export const CRYPTOPUNKS = a('0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb');

/** The address for WETH across networks */
export const WETH_TOKEN = {
  [Network.Mainnet]: a('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'),
  [Network.Arbitrum]: a('0x82af49447d8a07e3bd95bd0d56f35241523fbab1'),
  [Network.Goerli]: a('0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'),
};

/** The address for USDC across networks */
export const USDC = {
  [Network.Mainnet]: a('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'),
  [Network.Arbitrum]: a('0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'),
  [Network.Goerli]: a('0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557'),
};

export const OPENSEA_COLLECTION = a(
  '0x495f947276749ce646f68ac8c248420045cb7b5e'
);

/** Zap specifically for creating new vaults */
export const CREATE_VAULT_ZAP = {
  [Network.Goerli]: a('0x3045AeD8a3206a98e7f54a9B6b88F078b2ddfa71'),
};

/** Perform buy/sell/swaps */
export const MARKETPLACE_ZAP = {
  [Network.Goerli]: a('0x11F9ce2C92ed333115D1cB1078a1F7bbfa7De0D5'),
};

/** Stake NFTs or vTokens for xNFTs */
export const INVENTORY_STAKING = {
  [Network.Goerli]: a('0x2d5c9C71B3D97A030d8E84a5cd1d1b778e1b26c5'),
};

/** Add/remove liquidity */
export const NFTX_ROUTER = {
  [Network.Goerli]: a('0x423c4EF234c4321F44613f0D33E45727A95286aF'),
};

export const NONFUNGIBLE_POSITION_MANAGER = {
  [Network.Goerli]: a('0xdC69Df04C9D9026bAF9205460995F517e3b13F88'),
};

/** The permit2 contract, needs an approval signature because the UniversalRouter only transfers tokens from user via Permit2 */
export const PERMIT2 = {
  [Network.Goerli]: a('0x000000000022d473030f116ddee9f6b43ac78ba3'),
};

/** Swap tokens using the NFT AMM router */
export const UNIVERSAL_ROUTER = {
  [Network.Goerli]: a('0x9a9ac6e79E7750d6cFb847971370574Ca3CcB8e9'),
};

/** ENS Address */
export const ENS_REGISTRAR = {
  [Network.Mainnet]: a('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'),
  [Network.Arbitrum]: a('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'),
  [Network.Goerli]: a('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'),
};
