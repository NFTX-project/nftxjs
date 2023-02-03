import { parseEther, parseUnits } from '@ethersproject/units';
import { defaultAbiCoder } from '@ethersproject/abi';
import { WeiPerEther } from '@ethersproject/constants';
import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import type { CreatePoolFeatures, CreatePoolFees } from '@nftx/types';
import {
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '../trade';

const getEligibilityArgs = ({
  eligibilityList,
  eligibilityModule,
  eligibilityRange,
}: {
  eligibilityModule: 'list' | 'range' | false;
  eligibilityRange: [BigNumberish, BigNumberish];
  eligibilityList: BigNumberish[];
}): { allowAllItems: boolean; moduleIndex: number; initData: unknown } => {
  switch (eligibilityModule) {
    case 'list':
      return {
        allowAllItems: false,
        moduleIndex: 0,
        initData: defaultAbiCoder.encode(['uint256[]'], [eligibilityList]),
      };
    case 'range':
      return {
        allowAllItems: false,
        moduleIndex: 1,
        initData: defaultAbiCoder.encode(
          ['uint256', 'uint256'],
          [eligibilityRange[0], eligibilityRange[1]]
        ),
      };
    default:
      return {
        allowAllItems: true,
        moduleIndex: -1,
        initData: 0,
      };
  }
};

const getVaultFeatures = (features: CreatePoolFeatures) => {
  // Features are sent as a binary digit
  // i.e. [true, false, true, false, true] = 10101 = 21
  const vaultFeatures = parseInt(
    features.map((enabled) => (enabled ? '1' : '0')).join(''),
    2
  );

  return vaultFeatures;
};

const getVaultFees = (fees: CreatePoolFees) => {
  const feeKeys = [
    'mintFee',
    'randomRedeemFee',
    'targetRedeemFee',
    'randomSwapFee',
    'targetSwapFee',
  ];

  const vaultFees = feeKeys.reduce((acc, key, i) => {
    const value = parseUnits(`${fees[i]}`, '8');

    return { ...acc, [key]: value };
  }, {});

  return vaultFees;
};

const getMintAndStake = (
  liquiditySplit: number,
  tokenIds: Array<[string, number]>,
  spotPrice: BigNumber
) => {
  if (!tokenIds.length || !spotPrice) {
    return {
      assetTokenIds: [],
      assetTokenAmounts: [],
      minTokenIn: 0,
      minWethIn: 0,
      wethIn: 0,
    };
  }
  // The amount of token we're going to be adding as liquidity
  // (so remove the inventory % of the selected assets)
  const split = parseEther(`${liquiditySplit / 100}`);
  const minTokenIn = split.mul(getTotalTokenIds(tokenIds));
  // The amount of weth we're going to be pairing with the liquidity
  // So spot price * # of tokens
  // const slippage = 0.05;
  const minWethIn = spotPrice.mul(minTokenIn).div(WeiPerEther);
  const wethIn = minWethIn;
  // const wethIn = parseEther(`${1 + slippage}`)
  //   .mul(minWethIn)
  //   .div(WeiPerEther);

  const mintAndStake = {
    assetTokenIds: getUniqueTokenIds(tokenIds),
    assetTokenAmounts: getTokenIdAmounts(tokenIds),
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
  assetAddress: string;
  standard: 'ERC1155' | 'ERC721';
  fees: CreatePoolFees;
  features: CreatePoolFeatures;
  eligibilityModule: 'list' | 'range' | false;
  eligibilityRange: [BigNumberish, BigNumberish];
  eligibilityList: BigNumberish[];
  tokenIds: Array<[string, number]>;
  spotPrice: BigNumber;
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
