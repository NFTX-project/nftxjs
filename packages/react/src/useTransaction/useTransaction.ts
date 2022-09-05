import type { ContractReceipt, ContractTransaction } from 'ethers';
import { useCallback, useReducer } from 'react';
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
  type State = {
    status: TransactionState;
    error: any;
    data: {
      transaction?: ContractTransaction;
      receipt?: ContractReceipt;
    };
  };
  const [{ status, data, error }, dispatch] = useReducer(
    (
      state: State,
      action:
        | { status: 'None' }
        | { status: 'PendingSignature' }
        | { status: 'Mining'; transaction: ContractTransaction }
        | { status: 'Success'; receipt: ContractReceipt }
        | { status: 'Exception' | 'Fail'; error: any }
    ) => {
      switch (action?.status) {
        case 'None':
          return {
            status: 'None' as TransactionState,
            data: {},
            error: undefined,
          };
        case 'PendingSignature':
          return {
            status: 'PendingSignature' as TransactionState,
            data: {},
            error: undefined,
          };
        case 'Mining':
          return {
            status: 'Mining' as TransactionState,
            data: {
              transaction: action.transaction,
            },
            error: undefined,
          };
        case 'Success':
          return {
            status: 'Success' as TransactionState,
            data: {
              transaction: state.data.transaction,
              receipt: action.receipt,
            },
            error: undefined,
          };
        case 'Exception':
        case 'Fail':
          if (action.error instanceof TransactionExceptionError) {
            return {
              status: 'Exception' as TransactionState,
              data: state.data,
              error: action.error.error,
            };
          } else if (action.error instanceof TransactionFailedError) {
            return {
              status: 'Fail' as TransactionState,
              data: state.data,
              error: action.error.error,
            };
          } else if (action.error instanceof TransactionCancelledError) {
            return {
              status: 'None' as TransactionState,
              data: state.data,
              error: action.error,
            };
          } else {
            return {
              status: action.status,
              data: state.data,
              error: action.error,
            };
          }
        default:
          return state;
      }
    },
    {
      status: 'None',
      error: undefined,
      data: {},
    } as State
  );

  const mutate = async (args: Parameters<F>[0]) => {
    try {
      dispatch({ status: 'PendingSignature' });
      const transaction = await wrappedFn(args);
      dispatch({ status: 'Mining', transaction });

      const receipt = await transaction.wait();

      dispatch({ status: 'Success', receipt });
      opts?.onSuccess?.({ transaction, receipt }, args);
      return receipt;
    } catch (e) {
      let error = e;

      if (opts?.onError) {
        try {
          opts.onError(error);
        } catch (newError) {
          error = newError;
        }
      }

      dispatch({ status: 'Exception', error });
    }
  };

  const reset = useCallback(() => {
    dispatch({ status: 'None' });
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
