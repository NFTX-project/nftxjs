import { getChainConstant, getContract } from '../web3';
import { NFTX_UNSTAKING_INVENTORY_ZAP } from '@nftx/constants';
import { NFTXUnstakingInventoryZap } from '@nftx/abi';
import type { Address, Provider } from '@nftx/types';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /** Returns the maximum number of NFTs you can redeem for a vault
   * Rather than just taking your xToken balance and rounding it down,
   * this calculates the exact amount you can withdraw and whether there is a fractional remainder amount
   */
  async function fetchMaxInventoryWithdraw(args: {
    network: number;
    provider: Provider;
    vaultId: string;
    userAddress: Address;
    xToken: Address;
  }) {
    const { network, provider, xToken, userAddress, vaultId } = args;
    const contract = getContract({
      provider,
      abi: NFTXUnstakingInventoryZap,
      address: getChainConstant(NFTX_UNSTAKING_INVENTORY_ZAP, network),
    });

    const response = await contract.read.maxNftsUsingXToken({
      args: [BigInt(vaultId), userAddress, xToken],
    });

    const numNfts = response[0];
    const shortByTinyAmount: boolean = response[1];

    return { numNfts, shortByTinyAmount };
  };
