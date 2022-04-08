import type { ContractTransaction } from 'ethers';
import { useCallback, useState } from 'react';
import type { TransactionState } from '../constants';
import {
  TransactionCancelledError,
  TransactionExceptionError,
  TransactionFailedError,
} from '../errors';
import useWrapTransaction from './useWrapTransaction';

type Fn = (args: any) => Promise<ContractTransaction>;

export type UseTransactionOptions<A = Record<string, any>> = {
  onSuccess?: (data: ContractTransaction, args: A) => void;
  onError?: (error: any) => void;
};

/**
 * Wraps a function with some common Contract transaction logic
 * The function is wrapped in useWrapTransaction which applies notification logic
 * The returned status is only set to loading once the transaction is being mined
 * aka after confirming via metamask.
 * The transaction's .wait() method is automatically called
 * The return value is the transaction receipt
 * */
const useTransaction = <F extends Fn>(
  fn: F,
  opts?: UseTransactionOptions<Parameters<F>[0]>
) => {
  const wrappedFn = useWrapTransaction(fn);
  const [status, setStatus] = useState<TransactionState>('None');
  const mutate = async (args: Parameters<F>[0]) => {
    try {
      setStatus('PendingSignature');
      const transaction = await wrappedFn(args);
      setStatus('Mining');

      const receipt = await transaction.wait();

      setStatus('Success');
      opts?.onSuccess?.(transaction, args);
      return receipt;
    } catch (e) {
      opts?.onError?.(e);
      if (e instanceof TransactionExceptionError) {
        setStatus('Exception');
        throw e.error;
      } else if (e instanceof TransactionFailedError) {
        setStatus('Fail');
        throw e;
      } else if (e instanceof TransactionCancelledError) {
        setStatus('None');
        throw e;
      }
    }
  };

  const reset = useCallback(() => {
    setStatus('None');
  }, []);

  const meta = {
    status,
    reset,
    isIdle: status === 'None',
    isPending: status === 'PendingSignature',
    isException: status === 'Exception',
    isFail: status === 'Fail',
    isMining: status === 'Mining',
    isSuccess: status === 'Success',
    // shorthand catch alls for regular QueryStatus terms
    isLoading: status === 'Mining' || status === 'PendingSignature',
    isError: status === 'Fail' || status === 'Exception',
  };

  return [mutate, meta] as const;
};

export default useTransaction;
