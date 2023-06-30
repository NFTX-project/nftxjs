import { CreateVaultZap } from '@nftx/abi';
import type {
  Address,
  CreatePoolFeatures,
  CreatePoolFees,
  Provider,
  Signer,
  TokenId,
} from '@nftx/types';
import getCreatePoolArgs from './getCreatePoolArgs';
import { getChainConstant, type getContract } from '@nftx/utils';
import { CREATE_VAULT_ZAP } from '@nftx/constants';
import { parseEther } from 'viem';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  async function createPool({
    assetAddress,
    eligibilityList,
    eligibilityModule,
    eligibilityRange,
    features,
    fees,
    name,
    network,
    signer,
    standard,
    symbol,
    tokenIds,
    provider,
    currentNftPriceInEth,
    deadline,
    fee,
    lowerNftPriceInEth,
    upperNftPriceInEth,
    vTokenMin,
    wethMin,
  }: {
    name: string;
    symbol: string;
    assetAddress: Address;
    standard: 'ERC1155' | 'ERC721';
    fees: CreatePoolFees;
    features: CreatePoolFeatures;
    network: number;
    signer: Signer;
    provider: Provider;
    eligibilityModule: 'list' | 'range' | false;
    eligibilityRange: [bigint, bigint];
    eligibilityList: bigint[];
    tokenIds: Array<[TokenId, number]>;
    currentNftPriceInEth: bigint;
    deadline: bigint;
    fee: number;
    lowerNftPriceInEth: bigint;
    upperNftPriceInEth: bigint;
    vTokenMin: bigint;
    wethMin: bigint;
  }) {
    const args = getCreatePoolArgs({
      assetAddress,
      eligibilityList,
      eligibilityModule,
      eligibilityRange,
      features,
      fees,
      name,
      standard,
      symbol,
      tokenIds,
      currentNftPriceInEth,
      deadline,
      fee,
      lowerNftPriceInEth,
      upperNftPriceInEth,
      vTokenMin,
      wethMin,
    });

    const address = getChainConstant(CREATE_VAULT_ZAP, network);

    const contract = getContract({
      abi: CreateVaultZap,
      address,
      provider,
      signer,
    });

    // amount of eth required
    // TODO: this needs to be uniswap magic fn
    // https://github.com/NFTX-project/uni-v3-helpers
    const value = parseEther('0.1');

    console.debug(getChainConstant(CREATE_VAULT_ZAP, network), 'createVault', [
      args,
      { value },
    ]);

    return contract.write.createVault({
      args: [args],
      value,
    });
  };
