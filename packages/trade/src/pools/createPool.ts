import { VaultCreationZap } from '@nftx/abi';
import type {
  Address,
  CreatePoolFeatures,
  CreatePoolFees,
  Provider,
  Signer,
  TokenId,
} from '@nftx/types';
import getCreatePoolArgs from './getCreatePoolArgs';
import { VAULT_CREATION_ZAP } from '@nftx/constants';
import { getChainConstant, type getContract } from '@nftx/utils';

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
    provider,
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
    spotPrice: bigint;
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
      abi: VaultCreationZap,
      address: getChainConstant(VAULT_CREATION_ZAP, network),
      provider,
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

    return contract.write.createVault({
      args: [vaultDetails, vaultFeatures, vaultFees, eligibility, mintAndStake],
      value,
    });
  };
