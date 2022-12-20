import abi from '@nftx/constants/abis/NFTXUnstakingInventoryZap.json';
import { parseEther } from '@ethersproject/units';
import { getChainConstant, getContract } from '../web3';
import type { Provider } from '@ethersproject/providers';
import { NFTX_UNSTAKING_INVENTORY_ZAP } from '@nftx/constants';
import type { BigNumber } from '@ethersproject/bignumber';

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
    userAddress: string;
    xToken: string;
  }) {
    const { network, provider, xToken, userAddress, vaultId } = args;
    const contract = getContract({
      network,
      provider,
      abi,
      address: getChainConstant(NFTX_UNSTAKING_INVENTORY_ZAP, network),
    });

    const response = await contract.maxNftsUsingXToken(
      vaultId,
      userAddress,
      xToken
    );

    const numNfts: BigNumber = parseEther(`${response.numNfts}`);
    const shortByTinyAmount: boolean = response.shortByTinyAmount;

    return { numNfts, shortByTinyAmount };
  };
