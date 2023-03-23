import { VAULT_CREATION_ZAP } from '@nftx/constants';
import { VaultCreationZap } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import type createPool from './createPool';
import getCreatePoolArgs from './getCreatePoolArgs';

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
    liquiditySplit,
    name,
    network,
    signer,
    provider,
    spotPrice,
    standard,
    symbol,
    tokenIds,
  }: Args) {
    const {
      eligibility,
      mintAndStake,
      vaultDetails,
      vaultFeatures,
      vaultFees,
    } = getCreatePoolArgs({
      assetAddress,
      eligibilityList,
      eligibilityModule,
      eligibilityRange,
      features,
      fees,
      liquiditySplit,
      name,
      spotPrice,
      standard,
      symbol,
      tokenIds,
    });

    const value = mintAndStake.wethIn;

    if (!value) {
      return null;
    }

    const contract = getContract({
      abi: VaultCreationZap,
      address: getChainConstant(VAULT_CREATION_ZAP, network),
      provider,
      signer,
    });

    return contract.estimate.createVault({
      args: [vaultDetails, vaultFeatures, vaultFees, eligibility, mintAndStake],
    });
  };
