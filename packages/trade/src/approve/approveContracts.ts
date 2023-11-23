import { MaxUint256, PERMIT2 } from '@nftx/constants';
import { ApproveContract, TokenId } from '@nftx/types';
import { getChainConstant, getUniqueTokenIds, isCryptoPunk } from '@nftx/utils';

type GetApproveContract = Pick<
  ApproveContract,
  'label' | 'spenderAddress' | 'tokenAddress'
> &
  Partial<Pick<ApproveContract, 'amount' | 'standard' | 'tokenIds'>> & {
    network: number;
    usePermit2?: boolean;
  };

export const getApproveContracts = ({
  label,
  network,
  spenderAddress,
  tokenAddress,
  amount,
  standard,
  tokenIds,
  usePermit2,
}: GetApproveContract): ApproveContract[] => {
  if (isCryptoPunk(tokenAddress)) {
    return (
      tokenIds?.map((tokenIdOrTuple) => {
        const tokenIds = getUniqueTokenIds([tokenIdOrTuple as TokenId]);

        return {
          type: 'on-chain',
          label: `${label} [${tokenIds}]`,
          tokenIds,
          spenderAddress,
          tokenAddress,
          standard,
        };
      }) || []
    );
    // Permit2 is only available for ERC20 tokens
  } else if (usePermit2 && (standard === 'ERC20' || standard == null)) {
    return [
      {
        label: 'Approve Permit2',
        type: 'on-chain',
        spenderAddress: getChainConstant(PERMIT2, network),
        tokenAddress,
        standard: 'ERC20',
        amount: MaxUint256,
      },
      {
        type: 'permit2',
        label,
        spenderAddress,
        tokenAddress,
        amount,
        standard,
        tokenIds,
      },
    ];
  } else {
    return [
      {
        type: 'on-chain',
        label,
        spenderAddress,
        tokenAddress,
        amount,
        standard,
        tokenIds,
      },
    ];
  }
};
