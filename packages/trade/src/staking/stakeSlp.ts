import config from '@nftx/config';
import { NFTX_LP_STAKING } from '@nftx/constants';
import { NFTXLpStaking } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Provider, Signer } from '@nftx/types';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /**
   * Takes SLP (vToken paired with ETH on Sushi) and stakes it in NFTX, returning xSLP tokens
   */
  function stakeSlp(args: {
    vaultId: string;
    amount: bigint;
    network?: number;
    provider: Provider;
    signer: Signer;
  }) {
    const {
      vaultId,
      amount,
      network = config.network,
      provider,
      signer,
    } = args;

    const contract = getContract({
      provider,
      signer,
      address: getChainConstant(NFTX_LP_STAKING, network),
      abi: NFTXLpStaking,
    });

    return contract.write.deposit({ args: [BigInt(vaultId), amount] });
  };
