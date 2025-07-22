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
  [Network.Sepolia]: a('0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14'),
  [Network.Base]: a('0x4200000000000000000000000000000000000006'),
};

/** The address for USDC across networks */
export const USDC = {
  [Network.Mainnet]: a('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'),
  [Network.Arbitrum]: a('0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'),
  [Network.Sepolia]: a('0x2C032Aa43D119D7bf4Adc42583F1f94f3bf3023a'),
  [Network.Base]: a('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'),
};

export const OPENSEA_COLLECTION = a(
  '0x495f947276749ce646f68ac8c248420045cb7b5e'
);

/** Zap specifically for creating new vaults - CreateVaultZap */
export const CREATE_VAULT_ZAP = {
  [Network.Mainnet]: a('0x56dab32697B4A313f353DA0CE42B5113eD8E6f74'),
  [Network.Sepolia]: a('0xD80b916470F8e79FD8d09874cb159CbB8D13d8da'),
  [Network.Arbitrum]: a('0xF9E891AB1ECa89B7A4B3cBD45aEBFDF3Ec38946F'),
  [Network.Base]: a('0x2D77756C139ed3c25472Daf233F332E8F605Dd8E'),
};

/** Perform buy/sell/swaps - MarketplaceUniversalRouterZap */
export const MARKETPLACE_ZAP = {
  [Network.Mainnet]: a('0x293A0c49c85F1D8851C665Ac3cE1f1DC2a79bE3d'),
  [Network.Sepolia]: a('0xd88a3B9D0Fb2d39ec8394CfFD983aFBB2D4a6410'),
  [Network.Arbitrum]: a('0xf56296B3010a59Ef7F0915569DD44E1302b9Ca40'),
  [Network.Base]: a('0x31cB832F661Cd90fc9Fca6fB70A39cA811a02aEd'),
};

/** Stake NFTs or vTokens for xNFTs - NFTXInventoryStakingV3Upgradable */
export const INVENTORY_STAKING = {
  [Network.Mainnet]: a('0x889f313e2a3FDC1c9a45bC6020A8a18749CD6152'),
  [Network.Sepolia]: a('0xfBFf0635f7c5327FD138E1EBa72BD9877A6a7C1C'),
  [Network.Arbitrum]: a('0xe39a7E67d3E3b6eAF58BC02C4E80C3688847d155'),
  [Network.Base]: a('0x47D9ACEE6aa260C36F4368091bE92F0824876C72'),
};

/** AMM Router - nftxUniversalRouter */
export const NFTX_ROUTER = {
  [Network.Mainnet]: a('0x250d62a67254A46c0De472d2c9215E1d890cC90f'),
  [Network.Sepolia]: a('0x12156cCA1958B6591CC49EaE03a5553458a4b424'),
  [Network.Arbitrum]: a('0x0DA69287B4C1B28181E5d155dDDda7Fa5C32E5Ad'),
  [Network.Base]: a('0x7c656F0691Db983ee78f68189c55C36d1862c901'),
};

/** Staking  / Liquidity / Pools - NftxRouter */
export const POOL_ROUTER = {
  [Network.Mainnet]: a('0x3b3e4e76cac64eb29c399dcad1f3c401d2254f5f'),
  [Network.Sepolia]: a('0x441b7DE4340AAa5aA86dB4DA43d9Badf7B2DAA66'),
  [Network.Arbitrum]: a('0x52731751Dede22827ad47109f5e9697d75a3ef4d'),
  [Network.Base]: a('0x590F8679964D4dEfB54DCD307b2941B053eb1821'),
};

/** NonfungiblePositionManager */
export const NONFUNGIBLE_POSITION_MANAGER = {
  [Network.Mainnet]: a('0x26387fcA3692FCac1C1e8E4E2B22A6CF0d4b71bF'),
  [Network.Sepolia]: a('0xA9bCC1e29d3460177875f68fDCC0264D22c40BF0'),
  [Network.Arbitrum]: a('0x8AD238377531547838370B9C4aC346b9Ed5466Ea'),
  [Network.Base]: a('0x4f566a711901168804A74F252680d85C9246188e'),
};

/** The permit2 contract, needs an approval signature because the UniversalRouter only transfers tokens from user via Permit2 */
export const PERMIT2 = {
  [Network.Mainnet]: a('0x000000000022d473030f116ddee9f6b43ac78ba3'),
  [Network.Sepolia]: a('0x000000000022d473030f116ddee9f6b43ac78ba3'),
  [Network.Arbitrum]: a('0x000000000022d473030f116ddee9f6b43ac78ba3'),
  [Network.Base]: a('0x000000000022d473030f116ddee9f6b43ac78ba3'),
};

/** ENS Address */
export const ENS_REGISTRAR = {
  [Network.Mainnet]: a('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'),
  [Network.Arbitrum]: a('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'),
  [Network.Sepolia]: a('0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'),
  [Network.Base]: a('0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'),
};

/** UniswapV3FactoryUpgradeable */
export const AMM_FACTORY = {
  [Network.Mainnet]: a('0xa70e10beB02fF9a44007D9D3695d4b96003db101'),
  [Network.Sepolia]: a('0xDD2dce9C403f93c10af1846543870D065419E70b'),
  [Network.Arbitrum]: a('0xF4D0512FB47319B0CE9144EF582862e2921CaBF8'),
  [Network.Base]: '0x5FD88cD0034A0B2FC77E75Ea09b6e512511b0Eb9',
};

/** NFTXVaultFactoryUpgradableV3 */
export const VAULT_FACTORY = {
  [Network.Mainnet]: a('0xC255335bc5aBd6928063F5788a5E420554858f01'),
  [Network.Sepolia]: a('0x31C56CaF49125043e80B4d3C7f8734f949d8178C'),
  [Network.Arbitrum]: a('0x4dEeb9D2Bff2e9C35ce1f013DcC4582F891cb711'),
  [Network.Base]: a('0x0D74B761eAB5cC7Cc0E4e625A2e2B8251A4915c6'),
};

/** NftxFeeDistributorV3 */
export const NFTX_FEE_DISTRIBUTOR = {
  [Network.Mainnet]: a('0xF4d96C5094FCD9eC24E612585e723b58F89e21fe'),
  [Network.Sepolia]: a('0x66EF5B4b6ee05639194844CE4867515665F14fED'),
  [Network.Arbitrum]: a('0x0d50970C7848ebbE52661e70057D7D063B7de886'),
  [Network.Base]: a('0xA64c2F3f965f055E51482bF0960Ebb5f2904BF68'),
};

/** A list of old fee distributors that are no longer active (but useful for historical data) */
export const NFTX_FEE_DISTRIBUTOR_LEGACY = {
  [Network.Mainnet]: [a('0x6845fF5f102bEF9D785468F0bEb535b4687406E7')],
};

/** A list of old pool routers that are no longer active but are still used to compute older positions based on the nfpm address */
export const POOL_ROUTER_LEGACY: Record<number, Record<string, Address>> = {
  [Network.Sepolia]: {
    '0x55bdc76262b1e6e791d0636a0bc61cee23cdfa87':
      '0xd36ece08f76c50ec3f01db65bbc5ef5aa5fbe849',
  },
};
