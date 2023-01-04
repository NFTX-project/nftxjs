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

/**
 * Attempts to estimate the amount of gas you will pay for a contract interaction.
 * If possible, it will use the EIP-1559 standard to estimate, otherwise it will attempt a fallback estimation.
 * If the estimation entirely fails (for example, the contract call is invalid) it will return null values, so ensure you null-check the responses.
 */
const estimateGasAndFees = async (_args: {
  contract: Contract;
  method: string;
  args: any[];
  overrides?: Record<string, any>;
}) => {
  const { contract, method, args, overrides } = _args;

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
