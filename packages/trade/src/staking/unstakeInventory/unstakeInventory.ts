import type withdrawVToken from './withdrawVToken';
import type withdrawNfts from './withdrawNfts';
import type { Signer } from 'ethers';
import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';

type WithdrawVToken = ReturnType<typeof withdrawVToken>;
type WithdrawNfts = ReturnType<typeof withdrawNfts>;

export default ({
  withdrawVToken,
  withdrawNfts,
}: {
  withdrawVToken: WithdrawVToken;
  withdrawNfts: WithdrawNfts;
}) =>
  /**
   * Unstake an Inventory Position (IP).
   * Will either return vTokens or will random-redeem NFTs
   */
  function unstakeInventory(args: {
    network: number;
    signer: Signer;
    vaultId: string;
    /** The number of NFTs you want to redeem.
     * This must be a whole number and must not be greater than your IP balance
     */
    nftsToRedeem?: number;
    /** If there is any remaining balance after redeeming NFTs, withdraw it as vToken */
    withdrawRemaining?: boolean;
    /** The amount of xToken to unstake into vToken
     * This must not be more than your balance but can be a fractional amount.
     */
    xTokenAmount?: BigNumber;
    overrides?: Record<string, any>;
  }): Promise<ContractTransaction> {
    const {
      network,
      signer,
      vaultId,
      nftsToRedeem,
      withdrawRemaining,
      xTokenAmount,
      overrides,
    } = args;

    if (nftsToRedeem) {
      return withdrawNfts({
        network,
        signer,
        vaultId,
        withdrawRemaining,
        nftsToRedeem,
        overrides,
      });
    }
    if (xTokenAmount) {
      return withdrawVToken({
        network,
        signer,
        vaultId,
        xTokenAmount,
        overrides,
      });
    }
    throw new Error(
      'To unstake inventory you must provide xTokenAmount, nftsToRedeem, or both'
    );
  };
