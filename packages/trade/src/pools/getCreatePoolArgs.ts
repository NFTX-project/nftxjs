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

const getVaultDetails = ({
  assetAddress,
  name,
  standard,
  symbol,
  allowAllItems,
}: {
  assetAddress: Address;
  standard: 'ERC721' | 'ERC1155';
  name: string;
  symbol: string;
  allowAllItems: boolean;
}): {
  assetAddress: Address;
  is1155: boolean;
  allowAllItems: boolean;
  name: string;
  symbol: string;
} => {
  return {
    assetAddress,
    is1155: standard === 'ERC1155',
    allowAllItems,
    name,
    symbol,
  };
};

const getEligibilityArgs = ({
  eligibilityList,
  eligibilityModule,
  eligibilityRange,
}: {
  eligibilityModule: 'list' | 'range' | false;
  eligibilityRange: [bigint, bigint];
  eligibilityList: bigint[];
}): {
  allowAllItems: boolean;
  args: { moduleIndex: bigint; initData: Address };
} => {
  switch (eligibilityModule) {
    case 'list':
      return {
        allowAllItems: false,
        args: {
          moduleIndex: 0n,
          initData: encodeAbiParameters(parseAbiParameters('uint256[]'), [
            eligibilityList,
          ]),
        },
      };
    case 'range':
      return {
        allowAllItems: false,
        args: {
          moduleIndex: 1n,
          initData: encodeAbiParameters(
            parseAbiParameters('uint256, uint256'),
            [eligibilityRange[0], eligibilityRange[1]]
          ),
        },
      };
    default:
      return {
        allowAllItems: true,
        args: { moduleIndex: -1n, initData: 0 as unknown as Address },
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
  type Key = 'mintFee' | 'redeemFee' | 'swapFee';

  const feeKeys: Key[] = ['mintFee', 'redeemFee', 'swapFee'];

  const vaultFees = feeKeys.reduce((acc, key, i) => {
    const value = parseUnits(`${fees[i]}`, 8);

    return { ...acc, [key]: value };
  }, {} as Record<Key, bigint>);

  return vaultFees;
};

const getLiquidityParams = ({
  currentNftPriceInEth,
  deadline,
  fee,
  lowerNftPriceInEth,
  upperNftPriceInEth,
  vTokenMin,
  wethMin,
}: {
  lowerNftPriceInEth: bigint;
  upperNftPriceInEth: bigint;
  fee: number;
  currentNftPriceInEth: bigint;
  vTokenMin: bigint;
  wethMin: bigint;
  deadline: bigint;
}): {
  lowerNFTPriceInETH: bigint;
  upperNFTPriceInETH: bigint;
  fee: number;
  currentNFTPriceInETH: bigint;
  vTokenMin: bigint;
  wethMin: bigint;
  deadline: bigint;
} => {
  return {
    lowerNFTPriceInETH: lowerNftPriceInEth,
    upperNFTPriceInETH: upperNftPriceInEth,
    fee,
    currentNFTPriceInETH: currentNftPriceInEth,
    vTokenMin,
    wethMin,
    deadline,
  };
};

export default function getCreatePoolArgs({
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
  currentNftPriceInEth: bigint;
  deadline: bigint;
  fee: number;
  lowerNftPriceInEth: bigint;
  upperNftPriceInEth: bigint;
  vTokenMin: bigint;
  wethMin: bigint;
}) {
  const { allowAllItems, args: eligibilityStorage } = getEligibilityArgs({
    eligibilityList,
    eligibilityModule,
    eligibilityRange,
  });

  const vaultInfo = getVaultDetails({
    allowAllItems,
    assetAddress,
    name,
    standard,
    symbol,
  });

  const vaultFeaturesFlag = getVaultFeatures(features);

  const vaultFees = getVaultFees(fees);

  const liquidityParams = getLiquidityParams({
    currentNftPriceInEth,
    deadline,
    fee,
    lowerNftPriceInEth,
    upperNftPriceInEth,
    vTokenMin,
    wethMin,
  });

  const nftIds = getUniqueTokenIds(tokenIds).map((tokenId) => BigInt(tokenId));
  const nftAmounts = getTokenIdAmounts(tokenIds).map((amount) =>
    BigInt(amount)
  );

  const args = {
    vaultInfo,
    eligibilityStorage,
    nftIds,
    nftAmounts,
    vaultFeaturesFlag,
    vaultFees,
    liquidityParams,
  };

  return args;
}
