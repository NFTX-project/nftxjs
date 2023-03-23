import {
  encodeAbiParameters,
  parseAbiParameters,
  parseEther,
  parseUnits,
} from 'viem';
import type {
  Address,
  CreatePoolFeatures,
  CreatePoolFees,
  TokenId,
} from '@nftx/types';
import {
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '../trade';
import { WeiPerEther, Zero } from '@nftx/constants';

const getEligibilityArgs = ({
  eligibilityList,
  eligibilityModule,
  eligibilityRange,
}: {
  eligibilityModule: 'list' | 'range' | false;
  eligibilityRange: [bigint, bigint];
  eligibilityList: bigint[];
}): { allowAllItems: boolean; moduleIndex: bigint; initData: Address } => {
  switch (eligibilityModule) {
    case 'list':
      return {
        allowAllItems: false,
        moduleIndex: 0n,
        initData: encodeAbiParameters(parseAbiParameters('uint256[]'), [
          eligibilityList,
        ]),
      };
    case 'range':
      return {
        allowAllItems: false,
        moduleIndex: 1n,
        initData: encodeAbiParameters(parseAbiParameters('uint256, uint256'), [
          eligibilityRange[0],
          eligibilityRange[1],
        ]),
      };
    default:
      return {
        allowAllItems: true,
        moduleIndex: -1n,
        initData: 0 as unknown as Address,
      };
  }
};

const getVaultFeatures = (features: CreatePoolFeatures) => {
  // Features are sent as a binary digit
  // i.e. [true, false, true, false, true] = 10101 = 21
  const vaultFeatures = BigInt(
    parseInt(features.map((enabled) => (enabled ? '1' : '0')).join(''), 2)
  );

  return vaultFeatures;
};

const getVaultFees = (fees: CreatePoolFees) => {
  type Key =
    | 'mintFee'
    | 'randomRedeemFee'
    | 'targetRedeemFee'
    | 'randomSwapFee'
    | 'targetSwapFee';

  const feeKeys: Key[] = [
    'mintFee',
    'randomRedeemFee',
    'targetRedeemFee',
    'randomSwapFee',
    'targetSwapFee',
  ];

  const vaultFees = feeKeys.reduce((acc, key, i) => {
    const value = parseUnits(`${fees[i]}`, 8);

    return { ...acc, [key]: value };
  }, {} as Record<Key, number>);

  return vaultFees;
};

const getMintAndStake = (
  liquiditySplit: number,
  tokenIds: Array<[TokenId, number]>,
  spotPrice: bigint
): {
  assetTokenIds: bigint[];
  assetTokenAmounts: bigint[];
  minTokenIn: bigint;
  minWethIn: bigint;
  wethIn: bigint;
} => {
  if (!tokenIds.length || !spotPrice) {
    return {
      assetTokenIds: [],
      assetTokenAmounts: [],
      minTokenIn: Zero,
      minWethIn: Zero,
      wethIn: Zero,
    };
  }
  // The amount of token we're going to be adding as liquidity
  // (so remove the inventory % of the selected assets)
  const split = parseEther(`${liquiditySplit / 100}`);
  const minTokenIn = split * BigInt(getTotalTokenIds(tokenIds));
  // The amount of weth we're going to be pairing with the liquidity
  // So spot price * # of tokens
  const minWethIn = (spotPrice * minTokenIn) / WeiPerEther;
  const wethIn = minWethIn;

  const mintAndStake = {
    assetTokenIds: getUniqueTokenIds(tokenIds).map(BigInt),
    assetTokenAmounts: getTokenIdAmounts(tokenIds).map(BigInt),
    minTokenIn,
    minWethIn,
    wethIn,
  };

  return mintAndStake;
};

export default function getCreatePoolArgs({
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
}: {
  name: string;
  symbol: string;
  assetAddress: Address;
  standard: 'ERC1155' | 'ERC721';
  fees: CreatePoolFees;
  features: CreatePoolFeatures;
  eligibilityModule: 'list' | 'range' | false;
  eligibilityRange: [bigint, bigint];
  eligibilityList: bigint[];
  tokenIds: Array<[TokenId, number]>;
  spotPrice: bigint;
  liquiditySplit: number;
}) {
  const { allowAllItems, initData, moduleIndex } = getEligibilityArgs({
    eligibilityList,
    eligibilityModule,
    eligibilityRange,
  });

  const vaultDetails = {
    name,
    symbol,
    assetAddress,
    is1155: standard === 'ERC1155',
    allowAllItems,
  };

  const vaultFeatures = getVaultFeatures(features);

  const vaultFees = getVaultFees(fees);

  const eligibility = {
    moduleIndex,
    initData,
  };

  const mintAndStake = getMintAndStake(liquiditySplit, tokenIds, spotPrice);

  return {
    vaultDetails,
    vaultFeatures,
    vaultFees,
    eligibility,
    mintAndStake,
  };
}
