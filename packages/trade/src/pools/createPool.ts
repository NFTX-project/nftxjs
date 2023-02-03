import abi from '@nftx/constants/abis/VaultCreationZap.json';
import type { CreatePoolFeatures, CreatePoolFees } from '@nftx/types';
import type { Signer } from 'ethers';
import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import getCreatePoolArgs from './getCreatePoolArgs';
import { VAULT_CREATION_ZAP } from '@nftx/constants';
import type { getContract } from '@nftx/utils';
import { getChainConstant } from '@nftx/utils';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  async function createPool({
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
  }: {
    name: string;
    symbol: string;
    assetAddress: string;
    standard: 'ERC1155' | 'ERC721';
    fees: CreatePoolFees;
    features: CreatePoolFeatures;
    network: number;
    signer: Signer;
    eligibilityModule: 'list' | 'range' | false;
    eligibilityRange: [BigNumberish, BigNumberish];
    eligibilityList: BigNumberish[];
    tokenIds: Array<[string, number]>;
    spotPrice: BigNumber;
    liquiditySplit: number;
  }) {
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

    const contract = getContract({
      network,
      abi,
      address: getChainConstant(VAULT_CREATION_ZAP, network),
      signer,
    });

    // amount of eth required
    const value = mintAndStake?.wethIn;

    console.debug(
      getChainConstant(VAULT_CREATION_ZAP, network),
      'createVault',
      [
        vaultDetails,
        vaultFeatures,
        vaultFees,
        eligibility,
        mintAndStake,
        { value },
      ]
    );

    return contract.createVault(
      vaultDetails,
      vaultFeatures,
      vaultFees,
      eligibility,
      mintAndStake,
      {
        value,
      }
    );
  };
