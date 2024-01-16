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

/**
 * The Artblocks contract
 */
export const ARTBLOCK_COLLECTIONS = [
  a('0x059edd72cd353df5106d2b9cc5ab83a52287ac3a'), // Squiggles
  a('0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270'), // GenArt721Core
  a('0x99a9b7c1116f9ceeb1652de04d5969cce509b069'), // GenArt721CoreV3
];

/** The address for WETH across networks */
export const WETH_TOKEN = {
  [Network.Mainnet]: a('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'),
  [Network.Arbitrum]: a('0x82af49447d8a07e3bd95bd0d56f35241523fbab1'),
  [Network.Goerli]: a('0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'),
  [Network.Sepolia]: a('0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14'),
};

/** The address for USDC across networks */
export const USDC = {
  [Network.Mainnet]: a('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'),
  [Network.Arbitrum]: a('0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'),
  [Network.Goerli]: a('0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557'),
  [Network.Sepolia]: a('0x2C032Aa43D119D7bf4Adc42583F1f94f3bf3023a'),
};

export const OPENSEA_COLLECTION = a(
  '0x495f947276749ce646f68ac8c248420045cb7b5e'
);

/** Zap specifically for creating new vaults - CreateVaultZap */
export const CREATE_VAULT_ZAP = {
  [Network.Mainnet]: a('0x56dab32697B4A313f353DA0CE42B5113eD8E6f74'),
  [Network.Goerli]: a('0xd58A1627bF1C2F8C724A9493A979C0369ab17AaB'),
  [Network.Sepolia]: a('0xD80b916470F8e79FD8d09874cb159CbB8D13d8da'),
};

/** Perform buy/sell/swaps - MarketplaceUniversalRouterZap */
export const MARKETPLACE_ZAP = {
  [Network.Mainnet]: a('0x293A0c49c85F1D8851C665Ac3cE1f1DC2a79bE3d'),
  [Network.Goerli]: a('0x0be2D766Eef4b6a72F1fAe2e49619F013d647B8A'),
  [Network.Sepolia]: a('0xd88a3B9D0Fb2d39ec8394CfFD983aFBB2D4a6410'),
};

/** Stake NFTs or vTokens for xNFTs - NFTXInventoryStakingV3Upgradable */
export const INVENTORY_STAKING = {
  [Network.Mainnet]: a('0x889f313e2a3FDC1c9a45bC6020A8a18749CD6152'),
  [Network.Goerli]: a('0xEf771a17e6970d8B4b208a76e94F175277554230'),
  [Network.Sepolia]: a('0xfBFf0635f7c5327FD138E1EBa72BD9877A6a7C1C'),
};

/** AMM Router - nftxUniversalRouter */
export const NFTX_ROUTER = {
  [Network.Mainnet]: a('0x250d62a67254A46c0De472d2c9215E1d890cC90f'),
  [Network.Goerli]: a('0xF7c4FC5C2e30258e1E4d1197fc63aeDE371508f3'),
  [Network.Sepolia]: a('0x12156cCA1958B6591CC49EaE03a5553458a4b424'),
};

/** Staking  / Liquidity / Pools - NftxRouter */
export const POOL_ROUTER = {
  [Network.Mainnet]: a('0x70A741A12262d4b5Ff45C0179c783a380EebE42a'),
  [Network.Goerli]: a('0xb95e2Fb1eDA32BbFbDaE2463BB3E64bb3E1E41D5'),
  [Network.Sepolia]: a('0x441b7DE4340AAa5aA86dB4DA43d9Badf7B2DAA66'),
};

/** NonfungiblePositionManager */
export const NONFUNGIBLE_POSITION_MANAGER = {
  [Network.Mainnet]: a('0x26387fcA3692FCac1C1e8E4E2B22A6CF0d4b71bF'),
  [Network.Goerli]: a('0xaEC6537206e8e590603399c714c39947680f1181'),
  [Network.Sepolia]: a('0xA9bCC1e29d3460177875f68fDCC0264D22c40BF0'),
};

/** The permit2 contract, needs an approval signature because the UniversalRouter only transfers tokens from user via Permit2 */
export const PERMIT2 = {
  [Network.Mainnet]: a('0x000000000022d473030f116ddee9f6b43ac78ba3'),
  [Network.Goerli]: a('0x000000000022d473030f116ddee9f6b43ac78ba3'),
  [Network.Sepolia]: a('0x000000000022d473030f116ddee9f6b43ac78ba3'),
};

/** ENS Address */
export const ENS_REGISTRAR = {
  [Network.Mainnet]: a('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'),
  [Network.Arbitrum]: a('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'),
  [Network.Goerli]: a('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'),
  [Network.Sepolia]: a('0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'),
};

/** UniswapV3FactoryUpgradeable */
export const AMM_FACTORY = {
  [Network.Mainnet]: a('0xa70e10beB02fF9a44007D9D3695d4b96003db101'),
  [Network.Goerli]: a('0xf25081B098c5929A26F562aa2502795fE89BC73f'),
  [Network.Sepolia]: a('0xDD2dce9C403f93c10af1846543870D065419E70b'),
};

/** NFTXVaultFactoryUpgradableV2 */
export const VAULT_FACTORY = {
  [Network.Mainnet]: a('0xC255335bc5aBd6928063F5788a5E420554858f01'),
  [Network.Goerli]: a('0x1d552A0e6c2f680872C4a88b1e7def05F1858dF0'),
  [Network.Sepolia]: a('0x31C56CaF49125043e80B4d3C7f8734f949d8178C'),
};
