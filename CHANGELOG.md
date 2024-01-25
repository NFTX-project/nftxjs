# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.13.1](https://github.com/NFTX-project/nftxjs/compare/v1.13.0...v1.13.1) (2024-01-25)


### Bug Fixes

* undo index-twap-vaults signal ([9d79677](https://github.com/NFTX-project/nftxjs/commit/9d79677ba6fa93b329f9f76cc39714c5713ea491))





# [1.13.0](https://github.com/NFTX-project/nftxjs/compare/v1.12.0...v1.13.0) (2024-01-25)


### Features

* start-twap-watch signal ([21d1820](https://github.com/NFTX-project/nftxjs/commit/21d1820956972dcf779c7203db5eee01da0fd3ec))





# [1.12.0](https://github.com/NFTX-project/nftxjs/compare/v1.11.2...v1.12.0) (2024-01-25)


### Bug Fixes

* add missing activity types ([61c0d10](https://github.com/NFTX-project/nftxjs/commit/61c0d10746c995732b348f485492d93f6e9f3c92))


### Features

* new queue signals ([0698950](https://github.com/NFTX-project/nftxjs/commit/0698950191e9edb6a37e0e6f07a60a146246ffe6))





## [1.11.2](https://github.com/NFTX-project/nftxjs/compare/v1.11.1...v1.11.2) (2024-01-24)


### Bug Fixes

* allow signal and message queues to be closed ([e8b12af](https://github.com/NFTX-project/nftxjs/commit/e8b12af7d2ea3048fcde1891654a4302637ea42c))
* amm quotes should pass slippage tolerance as 0-100 not 0-1 scales ([6ad58f5](https://github.com/NFTX-project/nftxjs/commit/6ad58f5aa7dcdf39ec6af90165e1703866701038))





## [1.11.1](https://github.com/NFTX-project/nftxjs/compare/v1.11.0...v1.11.1) (2024-01-19)


### Bug Fixes

* update goerli subgraph endpoints ([4ed83b0](https://github.com/NFTX-project/nftxjs/commit/4ed83b04e1abd1b3f472c72c65d9912308676f89))





# [1.11.0](https://github.com/NFTX-project/nftxjs/compare/v1.10.4...v1.11.0) (2024-01-19)


### Bug Fixes

* imageUrl should fallback to media property ([042a707](https://github.com/NFTX-project/nftxjs/commit/042a707cc8a2de33d8f129e5e7294eca11aa0fae))
* update goerli contract addresses ([4bdee3c](https://github.com/NFTX-project/nftxjs/commit/4bdee3cd1102491f4ffc31855515eb4217fc110c))


### Features

* support ERC1155 assets ([98c716f](https://github.com/NFTX-project/nftxjs/commit/98c716fa79520d0ce778e6c673e2ea15e44ea932))





## [1.10.4](https://github.com/NFTX-project/nftxjs/compare/v1.10.3...v1.10.4) (2024-01-16)


### Bug Fixes

* support artblocks ([8313c69](https://github.com/NFTX-project/nftxjs/commit/8313c693ad63faf7ec85743f0e6a351acde30070))





## [1.10.3](https://github.com/NFTX-project/nftxjs/compare/v1.10.2...v1.10.3) (2024-01-11)


### Bug Fixes

* missing nfpmAddress field in gql query ([2d36333](https://github.com/NFTX-project/nftxjs/commit/2d3633300492c767e2d368fbc79e31bbf59fec62))





## [1.10.2](https://github.com/NFTX-project/nftxjs/compare/v1.10.1...v1.10.2) (2024-01-11)


### Bug Fixes

* get position manager address directly from subgraph ([6bdf681](https://github.com/NFTX-project/nftxjs/commit/6bdf6817f4e0ce204c3c2aa0ae3d30d883f81679))
* return contract address in quotes ([a819085](https://github.com/NFTX-project/nftxjs/commit/a8190850b98c189d8ab05905c239a1364e44c80b))
* store pool router used to create position ([83fb739](https://github.com/NFTX-project/nftxjs/commit/83fb739be5e38ce72dceadc59a2a2254a570a21f))





## [1.10.1](https://github.com/NFTX-project/nftxjs/compare/v1.10.0...v1.10.1) (2024-01-09)

**Note:** Version bump only for package nftxjs





# [1.10.0](https://github.com/NFTX-project/nftxjs/compare/v1.9.1...v1.10.0) (2024-01-08)


### Bug Fixes

* only store animation urls for mp4 files ([1aefb1a](https://github.com/NFTX-project/nftxjs/commit/1aefb1acbd1829fbb8f3f73723b014427df23b4f))


### Features

* store nonfngable manager against position ([4d69dff](https://github.com/NFTX-project/nftxjs/commit/4d69dff15d23ef8de61eca05105247cb6ec50ce6))





## [1.9.1](https://github.com/NFTX-project/nftxjs/compare/v1.9.0...v1.9.1) (2024-01-03)


### Bug Fixes

* update latest contract addresses ([9b6cde0](https://github.com/NFTX-project/nftxjs/commit/9b6cde06529fe8456df07d4c4fe9b6cbe5d4b28a))





# [1.9.0](https://github.com/NFTX-project/nftxjs/compare/v1.8.2...v1.9.0) (2023-12-19)


### Features

* create inventory position with vToken ([#15](https://github.com/NFTX-project/nftxjs/issues/15)) ([8d9a9df](https://github.com/NFTX-project/nftxjs/commit/8d9a9df6cde41e98a1dddd727eb22e55af9a04c2))





## [1.8.2](https://github.com/NFTX-project/nftxjs/compare/v1.8.1...v1.8.2) (2023-12-16)


### Bug Fixes

* rewrite apr calculation logic ([add35e1](https://github.com/NFTX-project/nftxjs/commit/add35e17958b37106962116dad74d9fbffe66c39))





## [1.8.1](https://github.com/NFTX-project/nftxjs/compare/v1.8.0...v1.8.1) (2023-12-14)


### Bug Fixes

* dailyTotalRevenueETH should be parsed as a decimal number, not wei ([5d8e027](https://github.com/NFTX-project/nftxjs/commit/5d8e027989c253288d9e37f82ebee3e87178af91))





# [1.8.0](https://github.com/NFTX-project/nftxjs/compare/v1.7.0...v1.8.0) (2023-12-13)


### Features

* include token count in collection metadata ([0656ef9](https://github.com/NFTX-project/nftxjs/commit/0656ef9b06f27744520c623e1e5c4eac12a21b66))
* vault state property ([327f15e](https://github.com/NFTX-project/nftxjs/commit/327f15ef9b59a898ecc1709d4c599acf503cf148))





# [1.7.0](https://github.com/NFTX-project/nftxjs/compare/v1.6.1...v1.7.0) (2023-12-12)


### Bug Fixes

* recover from unclaimable positions ([7c0250c](https://github.com/NFTX-project/nftxjs/commit/7c0250c9ca0bff44d163a1bc21dfda6b926afc5d))


### Features

* support mainnet ([cd5fdf8](https://github.com/NFTX-project/nftxjs/commit/cd5fdf80bffff1db8d0359fa80722a524403fb49))





## [1.6.1](https://github.com/NFTX-project/nftxjs/compare/v1.6.0...v1.6.1) (2023-12-11)


### Bug Fixes

* number error when calculating prices from edge ticks ([cca31ee](https://github.com/NFTX-project/nftxjs/commit/cca31eeac1a1e08f6eab71ecf3d4743ecd86e6d4))





# [1.6.0](https://github.com/NFTX-project/nftxjs/compare/v1.5.0...v1.6.0) (2023-12-05)


### Features

* add a new MintFeeExceedsValueError ([0f81258](https://github.com/NFTX-project/nftxjs/commit/0f81258d3eea9c1c51195ec2a80c89c975e29fa3))





# [1.5.0](https://github.com/NFTX-project/nftxjs/compare/v1.4.0...v1.5.0) (2023-12-04)


### Features

* debug config flag ([2e38a81](https://github.com/NFTX-project/nftxjs/commit/2e38a819f4367999dc293b302fd7156b5bb9984d))
* estimate gas for trading quotes ([ca25955](https://github.com/NFTX-project/nftxjs/commit/ca25955c5cab79d8d8f8236555ed106542adc89c))
* include swap intent in AMM quote requests ([0156dcb](https://github.com/NFTX-project/nftxjs/commit/0156dcbf4b93a439ea82579ceb948ce46c4466cc))
* update marketplace zap address ([6a0e77c](https://github.com/NFTX-project/nftxjs/commit/6a0e77cf38268c2fb96c005427b36a351e2b5cec))
* update nftx-v3 subgraph schema ([f8f1887](https://github.com/NFTX-project/nftxjs/commit/f8f18879c890044e3feb4e7d610eb8913ea9520e))





# [1.4.0](https://github.com/NFTX-project/nftxjs/compare/v1.3.0...v1.4.0) (2023-11-28)


### Bug Fixes

* calculate pool revenue ([1f43a47](https://github.com/NFTX-project/nftxjs/commit/1f43a472ee084a066c959a50d22bed5eb3c5cc9c))


### Features

* **@nftx/core:** fetchPremiumPaids method to get all premium fees paid out ([6168a0d](https://github.com/NFTX-project/nftxjs/commit/6168a0de6043bc3efd8f58acff14ad7c683dc239))





# [1.3.0](https://github.com/NFTX-project/nftxjs/compare/v1.2.4...v1.3.0) (2023-11-26)


### Features

* fetchAssets ([f6f775a](https://github.com/NFTX-project/nftxjs/commit/f6f775a65ba6bebd5843e7525bc535c59967b577))





## [1.2.4](https://github.com/NFTX-project/nftxjs/compare/v1.2.3...v1.2.4) (2023-11-26)


### Bug Fixes

* store separate block numbers for each chain ([07a4d33](https://github.com/NFTX-project/nftxjs/commit/07a4d335ff0f530147149e5224e9640b75635e90))





## [1.2.3](https://github.com/NFTX-project/nftxjs/compare/v1.2.2...v1.2.3) (2023-11-24)


### Bug Fixes

* expose apr calculations ([35ed043](https://github.com/NFTX-project/nftxjs/commit/35ed04317bec18fa2fbaf37b9c3cd4293bcc18e4))





## [1.2.2](https://github.com/NFTX-project/nftxjs/compare/v1.2.1...v1.2.2) (2023-11-24)


### Bug Fixes

* store inventory position tokenId ([371a38f](https://github.com/NFTX-project/nftxjs/commit/371a38f93b5ebc41503433727f142e9965efb7ac))





## [1.2.1](https://github.com/NFTX-project/nftxjs/compare/v1.2.0...v1.2.1) (2023-11-23)


### Bug Fixes

* provide current pool price when creating lp ([77c727d](https://github.com/NFTX-project/nftxjs/commit/77c727d2582e18f74c90c765ce3cdafb2bae8fed))





# [1.2.0](https://github.com/NFTX-project/nftxjs/compare/v1.1.2...v1.2.0) (2023-11-23)


### Bug Fixes

* contract logging ([34e5edf](https://github.com/NFTX-project/nftxjs/commit/34e5edf70634d9cedf133edaf4edacec55886694))


### Features

* support permit2 ([39621bc](https://github.com/NFTX-project/nftxjs/commit/39621bc78e99398f990c45effcd2ef0471990153))





## [1.1.2](https://github.com/NFTX-project/nftxjs/compare/v1.1.1...v1.1.2) (2023-11-22)


### Bug Fixes

* **@nftx/abi:** incorrect publish access ([2102527](https://github.com/NFTX-project/nftxjs/commit/21025274a790714104314c3b9c1ce5a48ea5431d))





## [1.1.1](https://github.com/NFTX-project/nftxjs/compare/v1.1.0...v1.1.1) (2023-11-22)


### Bug Fixes

* **@nftx/abi:** force release ([dcf4f02](https://github.com/NFTX-project/nftxjs/commit/dcf4f02343d210184d5b330897ff2e8fcb7b9a27))





# [1.1.0](https://github.com/NFTX-project/nftxjs/compare/v1.0.0...v1.1.0) (2023-11-22)


### Features

* aprs and liquidity splits ([6abff1c](https://github.com/NFTX-project/nftxjs/commit/6abff1c198135a9bb5f50f1da0c5bce7647fdd95))
* better error handlers ([7674e25](https://github.com/NFTX-project/nftxjs/commit/7674e25c80b2e9548924838eb6e000395580f496))
* create vault ([1b54b6a](https://github.com/NFTX-project/nftxjs/commit/1b54b6ac5f0a9ef29fa5399bb0147deb45bfefce))
* implement @nftx/queue for indexer communication ([4b41585](https://github.com/NFTX-project/nftxjs/commit/4b4158572c46eb0f465abcef44469033bc16baa9))
* implement vtoken balances ([a05f723](https://github.com/NFTX-project/nftxjs/commit/a05f723c89a3e065dae3b77b8eaf5787a595dc36))
* integrate nftx router api ([534d18c](https://github.com/NFTX-project/nftxjs/commit/534d18cc8014b4aafdb213e7fa40fbe099244f5f))
* move to reservoir ([7f40484](https://github.com/NFTX-project/nftxjs/commit/7f404847fe2b282dd9733a39db53ea1aa29d0db1))
* new create query method ([0704f6e](https://github.com/NFTX-project/nftxjs/commit/0704f6e00e408a42b33381e96eff54764c259dfd))
* new quote and price calculations ([cd94765](https://github.com/NFTX-project/nftxjs/commit/cd947658de0ef93b1f5eca820bfd4467c9c3e0e6))
* permit2 signatures ([2be0197](https://github.com/NFTX-project/nftxjs/commit/2be0197f7c84d9da589234e2413d77c48c1f3739))
* replace ethers with viem ([38e05ea](https://github.com/NFTX-project/nftxjs/commit/38e05ea2da229c35d2aebc50344301eb4923e226))
* slippage tolerance in all trades ([12e9f6d](https://github.com/NFTX-project/nftxjs/commit/12e9f6d835fc4fbfa9e85ee6f02e97a1e55b747b))
* support infinite range ([f0df1e7](https://github.com/NFTX-project/nftxjs/commit/f0df1e7f4308ef3b1d624fd5fe0091ebf34e888c))
* support sepolia network ([#12](https://github.com/NFTX-project/nftxjs/issues/12)) ([3f0ddfe](https://github.com/NFTX-project/nftxjs/commit/3f0ddfe6969f6da40c495fdb6a431e9f89187db6))





## [0.9.5](https://github.com/NFTX-project/nftxjs/compare/v0.9.4...v0.9.5) (2023-10-02)


### Bug Fixes

* update NFTX Subgraph endpoint ([#11](https://github.com/NFTX-project/nftxjs/issues/11)) ([b84029c](https://github.com/NFTX-project/nftxjs/commit/b84029c1039457d2fec986524c6b4ff7c5c03ef1))





## [0.9.4](https://github.com/NFTX-project/nftxjs/compare/v0.9.3...v0.9.4) (2023-08-04)


### Bug Fixes

* remove zero api key for goerli ([c20d758](https://github.com/NFTX-project/nftxjs/commit/c20d7582296c0e368dbe9a90bce85b03b70f2c33))





## [0.9.3](https://github.com/NFTX-project/nftxjs/compare/v0.9.2...v0.9.3) (2023-08-04)


### Bug Fixes

* remove zero api key for goerli ([bb5ba3a](https://github.com/NFTX-project/nftxjs/commit/bb5ba3a222b4a5453b6e44e58627a8949b2701cb))





## [0.9.2](https://github.com/NFTX-project/nftxjs/compare/v0.9.1...v0.9.2) (2023-08-04)


### Bug Fixes

* remove zero api key for goerli ([64c1013](https://github.com/NFTX-project/nftxjs/commit/64c10137b1528e36a804df17e47c2f2a8fb10b53))





## [0.9.1](https://github.com/NFTX-project/nftxjs/compare/v0.9.0...v0.9.1) (2023-07-10)


### Bug Fixes

* different 0x api key per chain ([cb242ef](https://github.com/NFTX-project/nftxjs/commit/cb242ef5c9e06fa4d7c2f9ffe9697a3c8424d221))





# [0.9.0](https://github.com/NFTX-project/nftxjs/compare/v0.8.1...v0.9.0) (2023-05-26)


### Features

* add 0x headers ([6546ac6](https://github.com/NFTX-project/nftxjs/commit/6546ac6c19afdf53416480ae7de7cb8bf148d4f1))





## [0.8.1](https://github.com/NFTX-project/nftxjs/compare/v0.8.0...v0.8.1) (2023-04-24)


### Bug Fixes

* **@nftx/core:** tokenId parsing was failing for ENS assets ([e679187](https://github.com/NFTX-project/nftxjs/commit/e679187ea786a3212b3b840aea87a116240a438f))





# [0.8.0](https://github.com/NFTX-project/nftxjs/compare/v0.7.0...v0.8.0) (2023-02-13)


### Features

* add source to activity ([a75f76c](https://github.com/NFTX-project/nftxjs/commit/a75f76c80487308a0ee65044aab5892d6d45a983))





# [0.7.0](https://github.com/NFTX-project/nftxjs/compare/v0.6.0...v0.7.0) (2023-02-08)


### Features

* **@nftx/core:** vault buyPrice property ([13598c7](https://github.com/NFTX-project/nftxjs/commit/13598c790f013c29856414df13d56f56c3812707))
* **@nftx/types:** vault buyPrice property ([1013ae0](https://github.com/NFTX-project/nftxjs/commit/1013ae0bbf6c0a14837e6bac88da06820b1990ae))





# [0.6.0](https://github.com/NFTX-project/nftxjs/compare/v0.5.0...v0.6.0) (2023-02-03)


### Features

* createPool method ([c04f5ff](https://github.com/NFTX-project/nftxjs/commit/c04f5ff5a747f064f5742a399461a2794fa27a0a))





# [0.5.0](https://github.com/NFTX-project/nftxjs/compare/v0.4.5...v0.5.0) (2023-02-02)


### Features

* **@nftx/utils:** fetch collection metadata method ([acf4c1c](https://github.com/NFTX-project/nftxjs/commit/acf4c1cef76520421fae3e332f72507245528567))





## [0.4.5](https://github.com/NFTX-project/nftxjs/compare/v0.4.4...v0.4.5) (2023-02-02)


### Bug Fixes

* update token balance subgraph url ([7bd6748](https://github.com/NFTX-project/nftxjs/commit/7bd674825b97a15b6d32b71b0a66c1e87b3ac9ed))





## [0.4.4](https://github.com/NFTX-project/nftxjs/compare/v0.4.3...v0.4.4) (2023-01-30)


### Bug Fixes

* add totalFees and shutdownDate properties to vaults ([e1ae349](https://github.com/NFTX-project/nftxjs/commit/e1ae3493a146ff7e54bc307029d037e302e74244))
* add totalFees and shutdownDate properties to vaults ([82fb6cb](https://github.com/NFTX-project/nftxjs/commit/82fb6cb57aa91d93a2015548a1711b427b4eda94))





## [0.4.3](https://github.com/NFTX-project/nftxjs/compare/v0.4.2...v0.4.3) (2023-01-20)


### Bug Fixes

* **@nftx/trade:** pass given slippage to 0x ([14cfc0c](https://github.com/NFTX-project/nftxjs/commit/14cfc0cb5ddf1ca1e8d3e815045602d657a54b31))





## [0.4.2](https://github.com/NFTX-project/nftxjs/compare/v0.4.1...v0.4.2) (2023-01-16)


### Bug Fixes

* new unstaking zap ([22590bc](https://github.com/NFTX-project/nftxjs/commit/22590bc2a324343b527bf771521bbca14ced8f29))





## [0.4.1](https://github.com/NFTX-project/nftxjs/compare/v0.4.0...v0.4.1) (2023-01-13)


### Bug Fixes

* add arbitrum 0x endpoints ([353c6dc](https://github.com/NFTX-project/nftxjs/commit/353c6dc66bf89f41d8cc5099fc10243d16d68aa2))





# [0.4.0](https://github.com/NFTX-project/nftxjs/compare/v0.3.3...v0.4.0) (2023-01-12)


### Features

* add subgraphs for 0x ([#8](https://github.com/NFTX-project/nftxjs/issues/8)) ([1e65a74](https://github.com/NFTX-project/nftxjs/commit/1e65a741bb6052d63a5a5296c4954ec0c67dcd16))





## [0.3.3](https://github.com/NFTX-project/nftxjs/compare/v0.3.2...v0.3.3) (2023-01-12)


### Bug Fixes

* parse 0x error responses ([9be7faf](https://github.com/NFTX-project/nftxjs/commit/9be7fafcb058d28ac1288a16f7c66ca6b5fa084b))





## [0.3.2](https://github.com/NFTX-project/nftxjs/compare/v0.3.1...v0.3.2) (2023-01-12)


### Bug Fixes

* remove buy liquidity check ([1309d07](https://github.com/NFTX-project/nftxjs/commit/1309d07d999090879f4e707affc9e641b6ac3300))





## [0.3.1](https://github.com/NFTX-project/nftxjs/compare/v0.3.0...v0.3.1) (2023-01-11)


### Bug Fixes

* added explicit dependencies between nftx packages ([3e0dd33](https://github.com/NFTX-project/nftxjs/commit/3e0dd33bd0677a9a1c5c2298bcbc55d59bbd6aa3))





# [0.3.0](https://github.com/NFTX-project/nftxjs/compare/v0.2.3...v0.3.0) (2023-01-10)


### Features

* add new marketplace 0x zap ([91dfc86](https://github.com/NFTX-project/nftxjs/commit/91dfc8647dc33ec79e430b481cbafb80647ba91e))





## [0.2.3](https://github.com/NFTX-project/nftxjs/compare/v0.2.2...v0.2.3) (2023-01-10)


### Bug Fixes

* bump gas by 7% ([d5541c1](https://github.com/NFTX-project/nftxjs/commit/d5541c103ce252dcc290692c5031889ba68a9be3))





## [0.2.2](https://github.com/NFTX-project/nftxjs/compare/v0.2.1...v0.2.2) (2023-01-10)


### Bug Fixes

* add logs and new zap address ([c518143](https://github.com/NFTX-project/nftxjs/commit/c518143fe18050b73d890871abed3712cd273983))





## [0.2.1](https://github.com/NFTX-project/nftxjs/compare/v0.2.0...v0.2.1) (2023-01-10)


### Bug Fixes

* new 0x zap address ([f816af6](https://github.com/NFTX-project/nftxjs/commit/f816af670da0a6afd769a73d9da22b44798bb141))





# [0.2.0](https://github.com/NFTX-project/nftxjs/compare/v0.1.10...v0.2.0) (2023-01-09)


### Features

* increase gas limit for 0x zap ([aa62903](https://github.com/NFTX-project/nftxjs/commit/aa62903809abee94a8f6cbeb59ef0c99bc67ed26))





## [0.1.10](https://github.com/NFTX-project/nftxjs/compare/v0.1.9...v0.1.10) (2023-01-04)

**Note:** Version bump only for package nftxjs





## [0.1.9](https://github.com/NFTX-project/nftxjs/compare/v0.1.8...v0.1.9) (2022-12-21)


### Bug Fixes

* **@nftx/react:** handle ACTION_REJECTED error ([4a39673](https://github.com/NFTX-project/nftxjs/commit/4a39673f04eb54bfc7c395a6ba7429726e71795e))





## [0.1.8](https://github.com/NFTX-project/nftxjs/compare/v0.1.7...v0.1.8) (2022-12-21)


### Bug Fixes

* **@nftx/types:** not pushing dist folder to npm ([bb3f562](https://github.com/NFTX-project/nftxjs/commit/bb3f5627df38cf91838fac61f817ecccc0bca7dd))





## [0.1.7](https://github.com/NFTX-project/nftxjs/compare/v0.1.6...v0.1.7) (2022-12-20)


### Bug Fixes

* **@nftx/types:** force release ([ab34793](https://github.com/NFTX-project/nftxjs/commit/ab34793fccd6e36da469c48154af686b8456027f))





## [0.1.6](https://github.com/NFTX-project/nftxjs/compare/v0.1.5...v0.1.6) (2022-12-20)


### Bug Fixes

* **@nftx/types:** entrypoint was removed from package json so imports were failing ([2fd351c](https://github.com/NFTX-project/nftxjs/commit/2fd351ce0a20b6a31fb6d713dcf1d6026a0b9574))





## [0.1.5](https://github.com/NFTX-project/nftxjs/compare/v0.1.4...v0.1.5) (2022-12-20)


### Bug Fixes

* new 0x zap address ([32ba4ea](https://github.com/NFTX-project/nftxjs/commit/32ba4eab4fce04c86a45bfd2b34234964d4c83ad))





## [0.1.4](https://github.com/NFTX-project/nftxjs/compare/v0.1.3...v0.1.4) (2022-12-20)


### Bug Fixes

* **@nftx/constants:** test release commit ([0560788](https://github.com/NFTX-project/nftxjs/commit/05607888cf249066d02987469a0567edb0b75725))





## 0.1.3 (2022-12-19)

**Note:** Version bump only for package nftxjs





## 0.1.2 (2022-12-19)

**Note:** Version bump only for package nftxjs





## 0.1.1 (2022-12-16)

**Note:** Version bump only for package nftxjs





# 0.1.0 (2022-12-16)


### Features

* **@nftx/api:** api package ([154e4cb](https://github.com/NFTX-project/nftxjs/commit/154e4cbd0f54280ce0cb678cd77ab09c47986edb))
* **@nftx/config:** new package ([9c28a19](https://github.com/NFTX-project/nftxjs/commit/9c28a196ccaabe7860c54048f908de7443bb295e))
* **@nftx/constants:** new package ([baac254](https://github.com/NFTX-project/nftxjs/commit/baac2544d10d7290a8325d1ed595cb2892ac97e1))
* **@nftx/core:** new package ([155bdb5](https://github.com/NFTX-project/nftxjs/commit/155bdb50aca0e798fb9ea9316939e40045975d0b))
* **@nftx/react:** new package ([2300d27](https://github.com/NFTX-project/nftxjs/commit/2300d27012a55f4828935192872ea628aea328a8))
* **@nftx/subgraph:** new package ([ff522eb](https://github.com/NFTX-project/nftxjs/commit/ff522ebc08cdef496fccf99f5477445e83def55a))
* **@nftx/trade:** new package ([a92d058](https://github.com/NFTX-project/nftxjs/commit/a92d0583690b3c44910e6a4350257f171263f5cb))
* **@nftx/types:** new package ([2255d80](https://github.com/NFTX-project/nftxjs/commit/2255d807cc47448b3ae3099cfd0136908f95212c))
* **@nftx/utils:** new packages ([21be313](https://github.com/NFTX-project/nftxjs/commit/21be31388127fca827fc6c3cf4ec98e535cd812d))
* **nftx.js:** new package ([45079e7](https://github.com/NFTX-project/nftxjs/commit/45079e7df59563978583186fa20b07fb4959fad8))
