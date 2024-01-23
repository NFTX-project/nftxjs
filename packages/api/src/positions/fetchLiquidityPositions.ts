import type { Address, LiquidityPosition, TokenId } from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';

const fetchLiquidityPositions = ({
  network = config.network,
  userAddress,
  vaultId,
  poolId,
  tokenId,
}: {
  network?: number;
  userAddress?: Address | Address[];
  vaultId?: string | string[];
  poolId?: Address | Address[];
  tokenId?: TokenId | TokenId[];
}) => {
  const url = `/${network}/positions/liquidity`;
  const query = { userAddress, vaultId, poolId, tokenId };

  return queryApi<LiquidityPosition[]>({ url, query });
};

export default fetchLiquidityPositions;
