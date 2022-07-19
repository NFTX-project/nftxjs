import type { ContractReceipt, ContractTransaction } from 'ethers';
import { useCallback, useState } from 'react';
import type { TransactionState } from '../types';
import {
  TransactionCancelledError,
  TransactionExceptionError,
  TransactionFailedError,
} from '../errors';
import useWrapTransaction from './useWrapTransaction';

type Fn = (args: any) => Promise<ContractTransaction>;

export type UseTransactionOptions<A = Record<string, any>> = {
  description?: string;
  onSuccess?: (
    data: { transaction: ContractTransaction; receipt: ContractReceipt },
    args: A
  ) => void;
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
  const wrappedFn = useWrapTransaction(fn, opts?.description);
  const [status, setStatus] = useState<TransactionState>('None');
  const [error, setError] = useState<any>(undefined);
  const [data, setData] = useState<{
    transaction?: ContractTransaction;
    receipt?: ContractReceipt;
  }>({});
  const mutate = async (args: Parameters<F>[0]) => {
    try {
      setError(undefined);
      setData({});
      setStatus('PendingSignature');
      const transaction = await wrappedFn(args);
      setStatus('Mining');
      setData((data) => ({ ...data, transaction }));

      const receipt = await transaction.wait();

      setStatus('Success');
      setData((data) => ({ ...data, receipt }));
      opts?.onSuccess?.({ transaction, receipt }, args);
      return receipt;
    } catch (e) {
      let error = e;
      opts?.onError?.(e);
      if (e instanceof TransactionExceptionError) {
        setStatus('Exception');
        error = e.error;
      } else if (e instanceof TransactionFailedError) {
        setStatus('Fail');
      } else if (e instanceof TransactionCancelledError) {
        setStatus('None');
      }
      if (opts?.onError) {
        try {
          opts.onError(error);
        } catch (newError) {
          error = newError;
        }
      }

      setError(error);
    }
  };

  const reset = useCallback(() => {
    setStatus('None');
    setError(undefined);
    setData({});
  }, []);

  const meta = {
    status,
    error,
    reset,
    data,
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
