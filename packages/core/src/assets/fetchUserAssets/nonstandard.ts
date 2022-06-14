import { BigNumber } from '@ethersproject/bignumber';
import { NON_STANDARD_SUBGRAPH } from '@nftx/constants';
import { compareByAlpha, toLowerCase } from '../../utils';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '../../web3/types';
import type { Asset } from '../types';
import { getChainConstant } from '../../web3';

const LIMIT = 1000;

type Response = {
  account: {
    tokens: Array<{
      id: string;
      identifier: string;
    }>;
  };
};

const transformNonStandardAssetResponse =
  (network: number) =>
  (response: Response['account']['tokens'][0]): Asset => {
    const [assetAddress] = response.id.split('-');
    const tokenId = BigNumber.from(response.identifier).toString();

    const asset: Asset = {
      id: response.id,
      tokenId: tokenId,
      assetAddress: assetAddress as Address,
      metaUrl: `https://api.nftx.xyz/asset/${assetAddress}/${tokenId}?chainId=${network}`,
    };

    return asset;
  };

const nonstandard = async ({
  network,
  userAddress,
  assetAddresses,
  lastId = -1,
  retryCount = 0,
}: {
  network: number;
  userAddress: Address;
  assetAddresses: Address[];
  lastId?: number;
  retryCount?: number;
}): Promise<Asset[]> => {
  if (!assetAddresses.length) {
    return [];
  }

  const query = gql`{
    account(id: $userAddress) {
      id
      tokens(
        first: ${LIMIT},
        where: {
          identifier_gt: $lastId,
          registry_in: $assetAddresses
        },
        orderBy: identifier,
        orderDirection: asc
      ) {
        id
        identifier
      }
    }
  }`;

  const url = getChainConstant(NON_STANDARD_SUBGRAPH, network);
  let data: Response;

  try {
    data = await querySubgraph<Response>({
      url,
      query,
      variables: {
        userAddress,
        lastId,
        assetAddresses: assetAddresses
          .map(toLowerCase)
          .sort((a, b) => compareByAlpha(a, b)),
      },
    });
  } catch (e) {
    if (retryCount < 3) {
      return nonstandard({
        network,
        assetAddresses,
        userAddress,
        lastId,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }

  const assets =
    data?.account?.tokens?.map(transformNonStandardAssetResponse(network)) ??
    [];

  if (assets?.length === LIMIT) {
    const moreAssets = await nonstandard({
      network,
      assetAddresses,
      userAddress,
      retryCount: 0,
      lastId: Number(assets[assets.length - 1].tokenId),
    });
    return [...assets, ...moreAssets];
  }

  return assets;
};

export default nonstandard;