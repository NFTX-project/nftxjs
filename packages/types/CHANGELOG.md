# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.4.2](https://github.com/NFTX-project/nftxjs/compare/v3.4.1...v3.4.2) (2024-06-20)

**Note:** Version bump only for package @nftx/types





## [3.4.1](https://github.com/NFTX-project/nftxjs/compare/v3.4.0...v3.4.1) (2024-06-13)

**Note:** Version bump only for package @nftx/types





# [3.4.0](https://github.com/NFTX-project/nftxjs/compare/v3.3.0...v3.4.0) (2024-06-13)

**Note:** Version bump only for package @nftx/types





# [3.3.0](https://github.com/NFTX-project/nftxjs/compare/v3.2.1...v3.3.0) (2024-06-13)


### Features

* include owned token count for collections ([f8ac973](https://github.com/NFTX-project/nftxjs/commit/f8ac97381cdf076baa43196f504d40a80f6d20bb))





# [3.0.0](https://github.com/NFTX-project/nftxjs/compare/v2.4.0...v3.0.0) (2024-05-23)


### Features

* **@nftx/trade:** add fulfill function ([7ec4899](https://github.com/NFTX-project/nftxjs/commit/7ec4899d630cfc0e3141b7231d6b669ce1b52d04))
* ERC20 quotes can now be obtained via the nftx api ([cbd2bc1](https://github.com/NFTX-project/nftxjs/commit/cbd2bc1875de5a5666eda536a9b06b02900a9f92))


### BREAKING CHANGES

* price methods have been removed in favour of fetchPrice and fetchQuote
* tradeErc20 method now takes a quote object (obtained from fetchQuote) instead of a price object (from fetchTokenBuyPrice)
* fetchTokenBuyPrice has been replaced with fetchAmmQuote - though fetchQuote/fetchPrice should be preferred





# [2.3.0](https://github.com/NFTX-project/nftxjs/compare/v2.2.1...v2.3.0) (2024-05-13)


### Features

* **@nftx/types:** update subgraph schema types ([2c87c8f](https://github.com/NFTX-project/nftxjs/commit/2c87c8fbaf346dd95cd844b23233f8bce7e96ffe))





## [2.2.1](https://github.com/NFTX-project/nftxjs/compare/v2.2.0...v2.2.1) (2024-04-22)

**Note:** Version bump only for package @nftx/types





# [2.1.0](https://github.com/NFTX-project/nftxjs/compare/v2.0.2...v2.1.0) (2024-04-18)


### Features

* upgrade nftx amm subgraph to the new uniswap subgraph ([a9912b3](https://github.com/NFTX-project/nftxjs/commit/a9912b3ab61b317f0162838da5b86f01be26107d))





## [2.0.2](https://github.com/NFTX-project/nftxjs/compare/v2.0.1...v2.0.2) (2024-03-20)

**Note:** Version bump only for package @nftx/types





## [2.0.1](https://github.com/NFTX-project/nftxjs/compare/v2.0.0...v2.0.1) (2024-03-20)

**Note:** Version bump only for package @nftx/types





# [2.0.0](https://github.com/NFTX-project/nftxjs/compare/v1.15.6...v2.0.0) (2024-03-20)


### Code Refactoring

* combine cross-chain types for the 721 and 1155 subgraphs ([1bfad43](https://github.com/NFTX-project/nftxjs/commit/1bfad43deb72a7776392d420abf5026c70311c10))


### BREAKING CHANGES

* any imports of the 721 or 1155 subgraph schemas will need to be updated





## [1.15.6](https://github.com/NFTX-project/nftxjs/compare/v1.15.5...v1.15.6) (2024-03-18)


### Bug Fixes

* **@nftx/core:** AMM apr logic requires all historical snapshots to work ([860a9aa](https://github.com/NFTX-project/nftxjs/commit/860a9aa9186b61d14911be1ab0f44a05e788b54b))





## [1.15.5](https://github.com/NFTX-project/nftxjs/compare/v1.15.4...v1.15.5) (2024-03-08)

**Note:** Version bump only for package @nftx/types





## [1.15.4](https://github.com/NFTX-project/nftxjs/compare/v1.15.3...v1.15.4) (2024-03-06)

**Note:** Version bump only for package @nftx/types





# [1.14.0](https://github.com/NFTX-project/nftxjs/compare/v1.13.2...v1.14.0) (2024-02-01)


### Features

* add full range flag to positions ([c4e7fef](https://github.com/NFTX-project/nftxjs/commit/c4e7fef35607624a2fa6bfde6ddc918b08f511e6))
* include poolName, tick, and tickValue in liquidity position ([ba6814c](https://github.com/NFTX-project/nftxjs/commit/ba6814c38dccffa7085c2ca8541671b9604da7bb))
* include tickValue in liquidity pool - this is the eth price for the current tick ([0d44ee8](https://github.com/NFTX-project/nftxjs/commit/0d44ee8875f6ced71cd019c9ada7b0a914ffc60a))





## [1.11.1](https://github.com/NFTX-project/nftxjs/compare/v1.11.0...v1.11.1) (2024-01-19)

**Note:** Version bump only for package @nftx/types





# [1.11.0](https://github.com/NFTX-project/nftxjs/compare/v1.10.4...v1.11.0) (2024-01-19)


### Features

* support ERC1155 assets ([98c716f](https://github.com/NFTX-project/nftxjs/commit/98c716fa79520d0ce778e6c673e2ea15e44ea932))





## [1.10.4](https://github.com/NFTX-project/nftxjs/compare/v1.10.3...v1.10.4) (2024-01-16)

**Note:** Version bump only for package @nftx/types





## [1.10.2](https://github.com/NFTX-project/nftxjs/compare/v1.10.1...v1.10.2) (2024-01-11)


### Bug Fixes

* get position manager address directly from subgraph ([6bdf681](https://github.com/NFTX-project/nftxjs/commit/6bdf6817f4e0ce204c3c2aa0ae3d30d883f81679))
* return contract address in quotes ([a819085](https://github.com/NFTX-project/nftxjs/commit/a8190850b98c189d8ab05905c239a1364e44c80b))
* store pool router used to create position ([83fb739](https://github.com/NFTX-project/nftxjs/commit/83fb739be5e38ce72dceadc59a2a2254a570a21f))





# [1.10.0](https://github.com/NFTX-project/nftxjs/compare/v1.9.1...v1.10.0) (2024-01-08)


### Features

* store nonfngable manager against position ([4d69dff](https://github.com/NFTX-project/nftxjs/commit/4d69dff15d23ef8de61eca05105247cb6ec50ce6))





## [1.9.1](https://github.com/NFTX-project/nftxjs/compare/v1.9.0...v1.9.1) (2024-01-03)

**Note:** Version bump only for package @nftx/types





# [1.9.0](https://github.com/NFTX-project/nftxjs/compare/v1.8.2...v1.9.0) (2023-12-19)


### Features

* create inventory position with vToken ([#15](https://github.com/NFTX-project/nftxjs/issues/15)) ([8d9a9df](https://github.com/NFTX-project/nftxjs/commit/8d9a9df6cde41e98a1dddd727eb22e55af9a04c2))





## [1.8.2](https://github.com/NFTX-project/nftxjs/compare/v1.8.1...v1.8.2) (2023-12-16)


### Bug Fixes

* rewrite apr calculation logic ([add35e1](https://github.com/NFTX-project/nftxjs/commit/add35e17958b37106962116dad74d9fbffe66c39))





# [1.8.0](https://github.com/NFTX-project/nftxjs/compare/v1.7.0...v1.8.0) (2023-12-13)


### Features

* include token count in collection metadata ([0656ef9](https://github.com/NFTX-project/nftxjs/commit/0656ef9b06f27744520c623e1e5c4eac12a21b66))
* vault state property ([327f15e](https://github.com/NFTX-project/nftxjs/commit/327f15ef9b59a898ecc1709d4c599acf503cf148))





# [1.7.0](https://github.com/NFTX-project/nftxjs/compare/v1.6.1...v1.7.0) (2023-12-12)


### Features

* support mainnet ([cd5fdf8](https://github.com/NFTX-project/nftxjs/commit/cd5fdf80bffff1db8d0359fa80722a524403fb49))





# [1.6.0](https://github.com/NFTX-project/nftxjs/compare/v1.5.0...v1.6.0) (2023-12-05)

**Note:** Version bump only for package @nftx/types





# [1.5.0](https://github.com/NFTX-project/nftxjs/compare/v1.4.0...v1.5.0) (2023-12-04)


### Features

* estimate gas for trading quotes ([ca25955](https://github.com/NFTX-project/nftxjs/commit/ca25955c5cab79d8d8f8236555ed106542adc89c))
* update nftx-v3 subgraph schema ([f8f1887](https://github.com/NFTX-project/nftxjs/commit/f8f18879c890044e3feb4e7d610eb8913ea9520e))





## [1.2.2](https://github.com/NFTX-project/nftxjs/compare/v1.2.1...v1.2.2) (2023-11-24)


### Bug Fixes

* store inventory position tokenId ([371a38f](https://github.com/NFTX-project/nftxjs/commit/371a38f93b5ebc41503433727f142e9965efb7ac))





## [1.2.1](https://github.com/NFTX-project/nftxjs/compare/v1.2.0...v1.2.1) (2023-11-23)


### Bug Fixes

* provide current pool price when creating lp ([77c727d](https://github.com/NFTX-project/nftxjs/commit/77c727d2582e18f74c90c765ce3cdafb2bae8fed))





# [1.2.0](https://github.com/NFTX-project/nftxjs/compare/v1.1.2...v1.2.0) (2023-11-23)


### Features

* support permit2 ([39621bc](https://github.com/NFTX-project/nftxjs/commit/39621bc78e99398f990c45effcd2ef0471990153))





# [1.1.0](https://github.com/NFTX-project/nftxjs/compare/v1.0.0...v1.1.0) (2023-11-22)


### Features

* aprs and liquidity splits ([6abff1c](https://github.com/NFTX-project/nftxjs/commit/6abff1c198135a9bb5f50f1da0c5bce7647fdd95))
* better error handlers ([7674e25](https://github.com/NFTX-project/nftxjs/commit/7674e25c80b2e9548924838eb6e000395580f496))
* create vault ([1b54b6a](https://github.com/NFTX-project/nftxjs/commit/1b54b6ac5f0a9ef29fa5399bb0147deb45bfefce))
* implement @nftx/queue for indexer communication ([4b41585](https://github.com/NFTX-project/nftxjs/commit/4b4158572c46eb0f465abcef44469033bc16baa9))
* implement vtoken balances ([a05f723](https://github.com/NFTX-project/nftxjs/commit/a05f723c89a3e065dae3b77b8eaf5787a595dc36))
* integrate nftx router api ([534d18c](https://github.com/NFTX-project/nftxjs/commit/534d18cc8014b4aafdb213e7fa40fbe099244f5f))
* move to reservoir ([7f40484](https://github.com/NFTX-project/nftxjs/commit/7f404847fe2b282dd9733a39db53ea1aa29d0db1))
* new quote and price calculations ([cd94765](https://github.com/NFTX-project/nftxjs/commit/cd947658de0ef93b1f5eca820bfd4467c9c3e0e6))
* permit2 signatures ([2be0197](https://github.com/NFTX-project/nftxjs/commit/2be0197f7c84d9da589234e2413d77c48c1f3739))
* replace ethers with viem ([38e05ea](https://github.com/NFTX-project/nftxjs/commit/38e05ea2da229c35d2aebc50344301eb4923e226))
* slippage tolerance in all trades ([12e9f6d](https://github.com/NFTX-project/nftxjs/commit/12e9f6d835fc4fbfa9e85ee6f02e97a1e55b747b))
* support infinite range ([f0df1e7](https://github.com/NFTX-project/nftxjs/commit/f0df1e7f4308ef3b1d624fd5fe0091ebf34e888c))
* support sepolia network ([#12](https://github.com/NFTX-project/nftxjs/issues/12)) ([3f0ddfe](https://github.com/NFTX-project/nftxjs/commit/3f0ddfe6969f6da40c495fdb6a431e9f89187db6))





# [0.9.0](https://github.com/NFTX-project/nftxjs/compare/v0.8.1...v0.9.0) (2023-05-26)

**Note:** Version bump only for package @nftx/types





# [0.8.0](https://github.com/NFTX-project/nftxjs/compare/v0.7.0...v0.8.0) (2023-02-13)


### Features

* add source to activity ([a75f76c](https://github.com/NFTX-project/nftxjs/commit/a75f76c80487308a0ee65044aab5892d6d45a983))





# [0.7.0](https://github.com/NFTX-project/nftxjs/compare/v0.6.0...v0.7.0) (2023-02-08)


### Features

* **@nftx/types:** vault buyPrice property ([1013ae0](https://github.com/NFTX-project/nftxjs/commit/1013ae0bbf6c0a14837e6bac88da06820b1990ae))





# [0.6.0](https://github.com/NFTX-project/nftxjs/compare/v0.5.0...v0.6.0) (2023-02-03)


### Features

* createPool method ([c04f5ff](https://github.com/NFTX-project/nftxjs/commit/c04f5ff5a747f064f5742a399461a2794fa27a0a))





# [0.5.0](https://github.com/NFTX-project/nftxjs/compare/v0.4.5...v0.5.0) (2023-02-02)

**Note:** Version bump only for package @nftx/types





## [0.4.4](https://github.com/NFTX-project/nftxjs/compare/v0.4.3...v0.4.4) (2023-01-30)


### Bug Fixes

* add totalFees and shutdownDate properties to vaults ([82fb6cb](https://github.com/NFTX-project/nftxjs/commit/82fb6cb57aa91d93a2015548a1711b427b4eda94))





# [0.4.0](https://github.com/NFTX-project/nftxjs/compare/v0.3.3...v0.4.0) (2023-01-12)

**Note:** Version bump only for package @nftx/types





# [0.3.0](https://github.com/NFTX-project/nftxjs/compare/v0.2.3...v0.3.0) (2023-01-10)

**Note:** Version bump only for package @nftx/types





# [0.2.0](https://github.com/NFTX-project/nftxjs/compare/v0.1.10...v0.2.0) (2023-01-09)

**Note:** Version bump only for package @nftx/types





## [0.1.8](https://github.com/NFTX-project/nftxjs/compare/v0.1.7...v0.1.8) (2022-12-21)


### Bug Fixes

* **@nftx/types:** not pushing dist folder to npm ([bb3f562](https://github.com/NFTX-project/nftxjs/commit/bb3f5627df38cf91838fac61f817ecccc0bca7dd))





## [0.1.7](https://github.com/NFTX-project/nftxjs/compare/v0.1.6...v0.1.7) (2022-12-20)


### Bug Fixes

* **@nftx/types:** force release ([ab34793](https://github.com/NFTX-project/nftxjs/commit/ab34793fccd6e36da469c48154af686b8456027f))





## [0.1.6](https://github.com/NFTX-project/nftxjs/compare/v0.1.5...v0.1.6) (2022-12-20)


### Bug Fixes

* **@nftx/types:** entrypoint was removed from package json so imports were failing ([2fd351c](https://github.com/NFTX-project/nftxjs/commit/2fd351ce0a20b6a31fb6d713dcf1d6026a0b9574))





## [0.1.4](https://github.com/NFTX-project/nftxjs/compare/v0.1.3...v0.1.4) (2022-12-20)

**Note:** Version bump only for package @nftx/types





## 0.1.3 (2022-12-19)

**Note:** Version bump only for package @nftx/types





## 0.1.2 (2022-12-19)

**Note:** Version bump only for package @nftx/types





## 0.1.1 (2022-12-16)

**Note:** Version bump only for package @nftx/types





# 0.1.0 (2022-12-16)


### Features

* **nftx.js:** new package ([45079e7](https://github.com/NFTX-project/nftxjs/commit/45079e7df59563978583186fa20b07fb4959fad8))
