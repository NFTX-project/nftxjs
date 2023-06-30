import { CreateVaultZap } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import type createPool from './createPool';
import getCreatePoolArgs from './getCreatePoolArgs';
import { CREATE_VAULT_ZAP } from '@nftx/constants';
import { parseEther } from 'viem';

type GetContract = typeof getContract;
type Args = Parameters<ReturnType<typeof createPool>>[0];

export default ({ getContract }: { getContract: GetContract }) =>
  async function estimatePoolGas({
    assetAddress,
    eligibilityList,
    eligibilityModule,
    eligibilityRange,
    features,
    fees,
    name,
    network,
    signer,
    provider,
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
  }: Args) {
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

    // TODO: this needs to be uniswap magic fn
    // https://github.com/NFTX-project/uni-v3-helpers
    const value = parseEther('0.1');

    const contract = getContract({
      abi: CreateVaultZap,
      address: getChainConstant(CREATE_VAULT_ZAP, network),
      provider,
      signer,
    });

    return contract.estimate.createVault({
      args: [args],
      value,
    });
  };
