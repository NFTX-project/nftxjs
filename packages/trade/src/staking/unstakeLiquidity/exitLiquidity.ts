import { NFTX_LP_STAKING } from '@nftx/constants';
import { NFTXLpStaking } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Provider, Signer } from '@nftx/types';
import config from '@nftx/config';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function exitLiquidity({
    network = config.network,
    provider,
    signer,
    vaultId,
  }: {
    network?: number;
    provider: Provider;
    signer: Signer;
    vaultId: string;
  }) {
    const contract = getContract({
      provider,
      signer,
      abi: NFTXLpStaking,
      address: getChainConstant(NFTX_LP_STAKING, network),
    });

    return contract.write.exit({ args: [BigInt(vaultId)] });
  };
