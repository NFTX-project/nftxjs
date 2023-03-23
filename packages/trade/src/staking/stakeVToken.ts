import { NFTXInventoryStaking } from '@nftx/abi';
import { NFTX_INVENTORY_STAKING } from '@nftx/constants';
import config from '@nftx/config';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Provider, Signer } from '@nftx/types';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /**
   * Takes vTokens and stakes them in NFTX, returning xToken
   */
  function stakeVToken(args: {
    network?: number;
    provider: Provider;
    signer: Signer;
    vaultId: string;
    amount: bigint;
  }) {
    const {
      network = config.network,
      provider,
      signer,
      vaultId,
      amount,
    } = args;

    const contract = getContract({
      abi: NFTXInventoryStaking,
      address: getChainConstant(NFTX_INVENTORY_STAKING, network),
      provider,
      signer,
    });

    return contract.write.deposit({ args: [BigInt(vaultId), amount] });
  };
