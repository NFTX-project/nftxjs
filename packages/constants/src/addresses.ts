import { Network } from './networks';

type Address = `0x${string}`;

/**
 * The Cryptokitty contract (Doesn't implement 721 properly)
 */
export const CRYPTOKITTIES =
  '0x06012c8cf97bead5deae237070f9587f8e7a266d' as Address;

/**
 * The Punk contract (doesn't implement 721)
 */
export const CRYPTOPUNKS =
  '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb' as Address;

/** The address for WETH across networks */
export const WETH_TOKEN = {
  [Network.Mainnet]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' as Address,
  [Network.Arbitrum]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1' as Address,
  [Network.Goerli]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6' as Address,
};

/** The address for USDC across networks */
export const USDC = {
  [Network.Mainnet]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as Address,
  [Network.Arbitrum]: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8' as Address,
  [Network.Goerli]: '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557' as Address,
};

export const OPENSEA_COLLECTION =
  '0x495f947276749ce646f68ac8c248420045cb7b5e' as Address;

export const MULTICALL = {
  [Network.Mainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441' as Address,
  [Network.Arbitrum]: '0x8a0bd1773139C6609e861B9ab68082587a3cD581' as Address,
  [Network.Goerli]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e' as Address,
};

export const NFTX_LP_STAKING = {
  [Network.Mainnet]: '0x688c3E4658B5367da06fd629E41879beaB538E37' as Address,
  [Network.Arbitrum]: '0x5326A720f76CFbDfE9e18fA618C3a3f7AbDF3934' as Address,
  [Network.Goerli]: '0xAfC303423580239653aFB6fb06d37D666ea0f5cA' as Address,
};

export const NFTX_INVENTORY_STAKING = {
  [Network.Mainnet]: '0x3E135c3E981fAe3383A5aE0d323860a34CfAB893' as Address,
  [Network.Arbitrum]: '0x1A2C03ABD4Af7C87d8b4d5aD39b56fa98E8C4Cc6' as Address,
  [Network.Goerli]: '0x6e91A3f27cE6753f47C66B76B03E6A7bFdDB605B' as Address,
};

export const NFTX_STAKING_ZAP = {
  [Network.Mainnet]: '0xdc774d5260ec66e5dd4627e1dd800eff3911345c' as Address,
  [Network.Arbitrum]: '0xfb8664E4EB4d2F8B0220d358d0d9C4896DC84959' as Address,
  [Network.Goerli]: '0x775e23b64610dA2806dc5ed3b0862955e122DDc6' as Address,
};

export const NFTX_UNSTAKING_INVENTORY_ZAP = {
  [Network.Mainnet]: '0x2374a32ab7b4f7BE058A69EA99cb214BFF4868d3' as Address,
  [Network.Arbitrum]: '0xB25Ea886FcE4bfDC8750Cb2D4464FE3F7A67bc07' as Address,
  [Network.Goerli]: '0x8B9D81fF1845375379865c0997bcFf538513Eae1' as Address,
};

export const NFTX_MARKETPLACE_ZAP = {
  [Network.Mainnet]: '0x0fc584529a2AEfA997697FAfAcbA5831faC0c22d' as Address,
  [Network.Arbitrum]: '0x66f26E38bD50FD52A50da8E87E435f04f98001B7' as Address,
  [Network.Goerli]: '0x528bDBe1DB8452bD4643F85695eE0628D900C195' as Address,
};

export const NFTX_VAULT_FACTORY = {
  [Network.Mainnet]: '0xBE86f647b167567525cCAAfcd6f881F1Ee558216' as Address,
  [Network.Arbitrum]: '0xE77b89FEc41A7b7dC74eb33602e82F0672FbB33C' as Address,
  [Network.Goerli]: '0x1478bEB5D18B23d2bA90FcEe91d66460AC585e6b' as Address,
};

export const SUSHISWAP_ROUTER = {
  [Network.Mainnet]: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F' as Address,
  [Network.Arbitrum]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506' as Address,
  [Network.Goerli]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506' as Address,
};

export const UNISWAP_QUOTER = {
  [Network.Mainnet]: '0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6' as Address,
  [Network.Goerli]: '0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6' as Address,
};

/** ENS Address */
export const ENS_REGISTRAR = {
  [Network.Mainnet]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85' as Address,
  [Network.Arbitrum]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85' as Address,
  [Network.Goerli]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85' as Address,
};

export const VAULT_CREATION_ZAP = {
  [Network.Mainnet]: '0xA42ecABB4ADEd01600d6e84A3Ee7785e3A506D37' as Address,
  [Network.Arbitrum]: '0x4164C90589E596239a31579417775C980f446103' as Address,
  [Network.Goerli]: '0x4Af99Db0DF1cb904933C6622C01b93496a567823' as Address,
};

export const NFTX_ROUTER = {
  [Network.Goerli]: '0x9a9ac6e79E7750d6cFb847971370574Ca3CcB8e9' as Address,
};
