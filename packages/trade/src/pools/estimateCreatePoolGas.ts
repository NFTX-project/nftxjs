import { VAULT_CREATION_ZAP } from '@nftx/constants';
import abi from '@nftx/constants/abis/VaultCreationZap.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { estimateGasAndFees } from '../trade';
import type createPool from './createPool';
import getCreatePoolArgs from './getCreatePoolArgs';

type GetContract = typeof getContract;
type EstimateGasAndFees = typeof estimateGasAndFees;
type Args = Parameters<ReturnType<typeof createPool>>[0];

export default ({
  estimateGasAndFees,
  getContract,
}: {
  estimateGasAndFees: EstimateGasAndFees;
  getContract: GetContract;
}) =>
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
      network,
      abi,
      address: getChainConstant(VAULT_CREATION_ZAP, network),
      signer,
    });

    return estimateGasAndFees({
      method: 'createVault',
      contract,
      args: [vaultDetails, vaultFeatures, vaultFees, eligibility, mintAndStake],
      overrides: {
        value,
      },
    });
  };
