import { Network } from './networks';

/**
 * The Cryptokitty contract (Doesn't implement 721 properly)
 */
export const CRYPTOKITTIES = '0x06012c8cf97bead5deae237070f9587f8e7a266d';

/**
 * The Punk contract (doesn't implement 721)
 */
export const CRYPTOPUNKS = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';

/** The address for WETH across networks */
export const WETH_TOKEN = {
  [Network.Mainnet]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [Network.Arbitrum]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  [Network.Rinkeby]: '0xc778417e063141139fce010982780140aa0cd5ab',
  [Network.Goerli]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
};

/** The address for USDC across networks */
export const USDC = {
  [Network.Mainnet]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [Network.Arbitrum]: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  [Network.Rinkeby]: '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
  [Network.Goerli]: '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557',
};

export const OPENSEA_COLLECTION = '0x495f947276749ce646f68ac8c248420045cb7b5e';

export const MULTICALL = {
  [Network.Rinkeby]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [Network.Mainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [Network.Arbitrum]: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
  [Network.Goerli]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
};

export const NFTX_LP_STAKING = {
  [Network.Mainnet]: '0x688c3E4658B5367da06fd629E41879beaB538E37',
  [Network.Arbitrum]: '0x5326A720f76CFbDfE9e18fA618C3a3f7AbDF3934',
  [Network.Rinkeby]: '0xcd0dfb870A60C30D957b0DF1D180a236a55b5740',
  [Network.Goerli]: '0xAfC303423580239653aFB6fb06d37D666ea0f5cA',
};

export const NFTX_INVENTORY_STAKING = {
  [Network.Mainnet]: '0x3E135c3E981fAe3383A5aE0d323860a34CfAB893',
  [Network.Arbitrum]: '0x1A2C03ABD4Af7C87d8b4d5aD39b56fa98E8C4Cc6',
  [Network.Rinkeby]: '0x05aD54B40e3be8252CB257f77d9301E9CB1A9470',
  [Network.Goerli]: '0x6e91A3f27cE6753f47C66B76B03E6A7bFdDB605B',
};

export const NFTX_STAKING_ZAP = {
  [Network.Mainnet]: '0xdc774d5260ec66e5dd4627e1dd800eff3911345c',
  [Network.Arbitrum]: '0xfb8664E4EB4d2F8B0220d358d0d9C4896DC84959',
  [Network.Rinkeby]: '0xeF5F5491EF04Df94638162Cb8f7CBAd64760e797',
  [Network.Goerli]: '0x775e23b64610dA2806dc5ed3b0862955e122DDc6',
};

export const NFTX_UNSTAKING_INVENTORY_ZAP = {
  [Network.Mainnet]: '0x51d660Ba5c218b2Cf33FBAcA5e3aBb8aEff3543B',
  [Network.Arbitrum]: '0x009e4110Fd68c603DD1F9189C4BaC3D12Cde8c70',
  [Network.Rinkeby]: '0x608F0D84657BB876DDEDD8d8d5aB9D12639d5798',
  [Network.Goerli]: '0x8B9D81fF1845375379865c0997bcFf538513Eae1',
};

export const NFTX_MARKETPLACE_ZAP = {
  [Network.Mainnet]: '0x0fc584529a2AEfA997697FAfAcbA5831faC0c22d',
  [Network.Arbitrum]: '0x66f26E38bD50FD52A50da8E87E435f04f98001B7',
  [Network.Rinkeby]: '0xF83d27657a6474cB2Ae09a5b39177BBB80E63d81',
  [Network.Goerli]: '0x528bDBe1DB8452bD4643F85695eE0628D900C195',
};

export const NFTX_MARKETPLACE_0X_ZAP = {
  [Network.Mainnet]: '0xbbc53022Af15Bb973AD906577c84784c47C14371',
  [Network.Goerli]: '0xe10ccc09561c9429501E602ac60E30cA8643bf99',
};

export const NFTX_VAULT_FACTORY = {
  [Network.Mainnet]: '0xBE86f647b167567525cCAAfcd6f881F1Ee558216',
  [Network.Arbitrum]: '0xE77b89FEc41A7b7dC74eb33602e82F0672FbB33C',
  [Network.Rinkeby]: '0xbbc53022Af15Bb973AD906577c84784c47C14371',
  [Network.Goerli]: '0x1478bEB5D18B23d2bA90FcEe91d66460AC585e6b',
};

export const SUSHISWAP_ROUTER = {
  [Network.Mainnet]: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
  [Network.Arbitrum]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [Network.Rinkeby]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  [Network.Goerli]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
};

export const UNISWAP_QUOTER = {
  [Network.Mainnet]: '0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6',
  [Network.Rinkeby]: '0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6',
  [Network.Goerli]: '0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6',
};

/** ENS Address */
export const ENS_REGISTRAR = {
  [Network.Mainnet]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
  [Network.Arbitrum]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
  [Network.Rinkeby]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
  [Network.Goerli]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
};
