import type { BigNumber } from '@ethersproject/bignumber';
import type { Contract } from '@ethersproject/contracts';
import type { Provider } from '@ethersproject/providers';

const get1559GasFees = async ({ provider }: { provider: Provider }) => {
  try {
    const feeData = await provider.getFeeData();
    const { maxFeePerGas, maxPriorityFeePerGas } = feeData;
    return { maxFeePerGas, maxPriorityFeePerGas };
  } catch {
    return {
      maxFeePerGas: null,
      maxPriorityFeePerGas: null,
    };
  }
};

const estimateGasAndFees = async ({
  contract,
  method,
  args,
  overrides,
}: {
  contract: Contract;
  method: string;
  args: any[];
  overrides?: Record<string, any>;
}) => {
  let maxFeePerGas: BigNumber = null;
  let maxPriorityFeePerGas: BigNumber = null;
  let gasEstimate: BigNumber = null;

  try {
    const fees = await get1559GasFees({
      provider: contract.provider as Provider,
    });
    maxFeePerGas = fees.maxFeePerGas;
    maxPriorityFeePerGas = fees.maxPriorityFeePerGas;
    gasEstimate = await contract.estimateGas[method](...args, {
      ...overrides,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
  } catch {
    // EIP-1559 not supported/failed
    try {
      maxFeePerGas = null;
      maxPriorityFeePerGas = null;
      gasEstimate = await contract.estimateGas[method](...args, overrides);
    } catch {
      // Failed to estimate gas
    }
  }

  return { gasEstimate, maxFeePerGas, maxPriorityFeePerGas };
};

export default estimateGasAndFees;