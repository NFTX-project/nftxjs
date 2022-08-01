import type withdrawVToken from './withdrawVToken';
import type withdrawNfts from './withdrawNfts';
import type { Signer } from 'ethers';
import type { VaultId } from '../../vaults';
import type { BigNumber } from '@ethersproject/bignumber';

type WithdrawVToken = ReturnType<typeof withdrawVToken>;
type WithdrawNfts = ReturnType<typeof withdrawNfts>;

export default ({
  withdrawVToken,
  withdrawNfts,
}: {
  withdrawVToken: WithdrawVToken;
  withdrawNfts: WithdrawNfts;
}) =>
  /** Unstake an IP position
   * Will either return vTokens or will random-redeem NFTs
   */
  function unstakeInventory({
    network,
    signer,
    vaultId,
    nftsToRedeem,
    xTokenAmount,
    overrides,
  }: {
    network: number;
    signer: Signer;
    vaultId: VaultId;
    /** The number of NFTs you want to redeem.
     * This must be a whole number and must not be greater than your inventory balance
     */
    nftsToRedeem?: number;
    /** The amount of xToken to unstake into vToken
     * This must not be more than your balance but can be a fractional amount.
     * If you're also redeeming NFTs, this value should be no more than the remaining amount
     * e.g. if you have 4.5 PUNK, and you're redeeming 3 NFTs, xTokenAmount can be between 0 and 1.5
     */
    xTokenAmount?: BigNumber;
    overrides?: Record<string, any>;
  }) {
    if (nftsToRedeem) {
      return withdrawNfts({
        network,
        signer,
        vaultId,
        xTokenAmount,
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
