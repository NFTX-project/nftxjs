import {
  TransactionCancelledError,
  TransactionExceptionError,
  TransactionFailedError,
} from '@nftx/errors';
import { Dispatch, useCallback, useContext, useReducer, useRef } from 'react';
import type { TransactionState } from '../types';
import { nsync, type Transaction, type TransactionReceipt } from 'nftx.js';
import { NftxContext, useAddEvent } from '../contexts';
import { t, toPromise } from '../utils';

type Fn = (args: any) => Promise<Transaction>;

export type UseTransactionOptions<A = Record<string, any>> = {
  description?: string;
  onSuccess?: (
    data: { transaction: Transaction; receipt: TransactionReceipt },
    args: A
  ) => void | Promise<any>;
  onError?: (error: any) => void;
};

export type UseTransactionMeta = {
  status: TransactionState;
  error: any;
  reset: () => void;
  data: {
    transaction?: Transaction;
    receipt?: TransactionReceipt;
  };
  isIdle: boolean;
  isPending: boolean;
  isException: boolean;
  isFail: boolean;
  isMining: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
};

type State = {
  status: TransactionState;
  error: any;
  data: {
    transaction?: Transaction;
    receipt?: TransactionReceipt;
  };
};

type Action =
  | { status: 'None' }
  | { status: 'PendingSignature' }
  | { status: 'Mining'; transaction: Transaction }
  | { status: 'Success'; receipt: TransactionReceipt; transaction: Transaction }
  | { status: 'Exception' | 'Fail'; error: any };

type AddEvent = ReturnType<typeof useAddEvent>;

const useTransactionReducer = () => {
  return useReducer(
    (state: State, action: Action) => {
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
              transaction: action.transaction,
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
              error: action.error,
            };
          } else if (action.error instanceof TransactionFailedError) {
            return {
              status: 'Fail' as TransactionState,
              data: state.data,
              error: action.error,
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
};

// This is a special case where a transaction has been replaced by another transaction
const isDroppedAndReplaced = (e: any) => {
  return (
    e?.code === 'TRANSACTION_REPLACED' &&
    e?.replacement &&
    (e?.reason === 'repriced' || e?.cancelled === false)
  );
};

const emitPendingSignature = ({
  addEvent,
  description,
  dispatch,
  network,
}: {
  dispatch: Dispatch<Action>;
  addEvent: AddEvent;
  network: number;
  description: string;
}) => {
  dispatch({ status: 'PendingSignature' });

  addEvent({
    type: 'PendingSignature',
    network,
    createdAt: Date.now(),
    description,
  });
};

const emitMining = ({
  addEvent,
  description,
  dispatch,
  network,
  transaction,
}: {
  addEvent: AddEvent;
  dispatch: Dispatch<Action>;
  network: number;
  description: string;
  transaction: Transaction;
}) => {
  dispatch({ status: 'Mining', transaction });
  addEvent({
    type: 'Mining',
    network,
    createdAt: Date.now(),
    transaction,
    description,
  });
};

const emitSuccess = ({
  addEvent,
  description,
  network,
  receipt,
  transaction,
  dispatch,
}: {
  addEvent: AddEvent;
  network: number;
  receipt: TransactionReceipt;
  transaction: Transaction;
  description: string;
  dispatch: Dispatch<Action>;
}) => {
  dispatch({ status: 'Success', receipt, transaction });
  addEvent({
    type: 'Success',
    createdAt: Date.now(),
    network,
    receipt,
    transaction,
    description,
  });
};

const emitFail = ({
  addEvent,
  description,
  error,
  network,
  receipt,
  transaction,
  dispatch,
}: {
  addEvent: AddEvent;
  dispatch: Dispatch<Action>;
  network: number;
  receipt: TransactionReceipt;
  transaction: Transaction;
  error: any;
  description: string;
}) => {
  dispatch({ status: 'Fail', error });
  addEvent({
    type: 'Fail',
    createdAt: Date.now(),
    network,
    receipt,
    transaction,
    error,
    description,
  });
};

const emitException = ({
  addEvent,
  description,
  error,
  network,
  receipt,
  transaction,
  dispatch,
}: {
  addEvent: AddEvent;
  network: number;
  receipt: TransactionReceipt;
  transaction: Transaction;
  error: any;
  description: string;
  dispatch: Dispatch<Action>;
}) => {
  dispatch({ status: 'Exception', error });
  addEvent({
    type: 'Exception',
    createdAt: Date.now(),
    network,
    receipt,
    transaction,
    error,
    description,
  });
};

const createTransaction = async <F extends Fn>({
  args,
  fn,
  network,
}: {
  fn: F;
  args: Parameters<F>[0];
  network: number;
}) => {
  const [txErr, transaction] = await t(fn(args));
  if (txErr) {
    const e = txErr.cause ?? txErr;
    // Exception - preflight - we couldn't even trigger the transaction
    throw new TransactionExceptionError(e, network);
  }

  return transaction;
};

const handleReceiptError = ({
  network,
  receiptErr,
  transaction,
}: {
  receiptErr: any;
  network: number;
  transaction: Transaction;
}): [Transaction, TransactionReceipt] => {
  // Check if the transaction has been replaced by another
  if (isDroppedAndReplaced(receiptErr)) {
    // If status is 0 it means that the replacement transaction has failed
    if (receiptErr.receipt.status === 0) {
      throw new TransactionFailedError(
        network,
        receiptErr,
        receiptErr.replacement,
        receiptErr.receipt
      );
    }
    // The entire transaction has been replaced by another (successful) transaction
    return [receiptErr.replacement, receiptErr.receipt];
  }

  // Fail
  throw new TransactionFailedError(
    network,
    receiptErr,
    transaction,
    receiptErr.receipt
  );
};

const waitForTransactionReceipt = async ({
  network,
  transaction: _transaction,
}: {
  transaction: Transaction;
  addEvent: AddEvent;
  network: number;
  description: string;
}): Promise<[Transaction, TransactionReceipt]> => {
  let transaction = _transaction;
  const [receiptErr, _receipt] = await t(transaction.wait());
  let receipt = _receipt;

  if (receiptErr) {
    [transaction, receipt] = handleReceiptError({
      network,
      receiptErr,
      transaction,
    });
  }

  if (receipt.status === 'reverted') {
    throw new TransactionFailedError(network, {}, transaction, receipt);
  }

  return [transaction, receipt];
};

const updateRequiredBlock = (receipt: TransactionReceipt) => {
  // We ideally want data to be up to the block for this transaction
  // So we store the block number and any subsequent api calls will
  // be made with "live mode" enabled until the api has caught up
  const txnBlock = Number(receipt.blockNumber);
  // For a bit of leeway we add a buffer to the required block number
  // so the api must be at least this far ahead before we switch back to "api mode"
  const buffer = nsync.getBlockBuffer();
  nsync.setRequiredBlockNumber(txnBlock + buffer);
};

const handleSuccess = async ({
  args,
  opts,
  receipt,
  transaction,
  addEvent,
  network,
  description,
  dispatch,
}: {
  transaction: Transaction;
  receipt: TransactionReceipt;
  opts: UseTransactionOptions | undefined;
  args: any[];
  addEvent: AddEvent;
  network: number;
  description: string;
  dispatch: Dispatch<Action>;
}) => {
  updateRequiredBlock(receipt);

  emitSuccess({
    addEvent,
    network,
    receipt,
    transaction,
    description,
    dispatch,
  });

  // Handle onSuccess hook
  await toPromise(
    opts?.onSuccess?.({ transaction: transaction, receipt }, args)
  );
};

const mutate = async <F extends Fn>({
  addEvent,
  args,
  dispatch,
  fn,
  network,
  opts,
}: {
  opts: UseTransactionOptions<any> | undefined;
  addEvent: AddEvent;
  dispatch: Dispatch<Action>;
  network: number;
  fn: F;
  args: Parameters<F>[0];
}) => {
  const description = opts?.description || '';
  emitPendingSignature({ addEvent, description, dispatch, network });

  let transaction = await createTransaction({ args, fn, network });
  let receipt: TransactionReceipt;

  emitMining({ addEvent, description, dispatch, network, transaction });

  // The transaction receipt may be dropped and replaced so make sure we have the latest transaction
  // eslint-disable-next-line prefer-const
  [transaction, receipt] = await waitForTransactionReceipt({
    addEvent,
    description,
    network,
    transaction,
  });

  await handleSuccess({
    args,
    opts,
    receipt,
    transaction,
    addEvent,
    description,
    network,
    dispatch,
  });

  return receipt;
};

const handleError = async ({
  dispatch,
  e,
  globalOnError,
  opts,
  addEvent,
  description,
  network,
}: {
  e: any;
  opts: UseTransactionOptions<any> | undefined;
  dispatch: Dispatch<Action>;
  globalOnError: (e: any) => any;
  addEvent: AddEvent;
  description: string;
  network: number;
}) => {
  let error = e;

  const [newError] = await t(toPromise(opts?.onError?.(error)));
  if (newError) {
    error = newError;
  }
  await t(toPromise(globalOnError(error)));

  const emit =
    error instanceof TransactionFailedError ? emitFail : emitException;

  emit({
    addEvent,
    description,
    error,
    network,
    receipt: error.receipt,
    transaction: error.transaction,
    dispatch,
  });
};

const useMutate = <F extends Fn>({
  fn: _fn,
  opts: _opts,
  addEvent,
  dispatch,
  network,
  globalOnError,
}: {
  fn: F;
  opts: UseTransactionOptions<any> | undefined;
  dispatch: Dispatch<Action>;
  addEvent: AddEvent;
  network: number;
  globalOnError: (e: any) => any;
}) => {
  // We use refs to keep the latest function and options without recomputing the callback on every render
  const fnRef = useRef(_fn);
  const optsRef = useRef(_opts);
  fnRef.current = _fn;
  optsRef.current = _opts;

  return useCallback(
    async (args: Parameters<F>[0]) => {
      const fn = fnRef.current;
      const opts = optsRef.current;

      const [e, receipt] = await t(
        mutate({ addEvent, args, dispatch, fn, network, opts })
      );

      if (e) {
        await handleError({
          e,
          opts,
          dispatch,
          globalOnError,
          addEvent,
          description: opts?.description || '',
          network,
        });
      }

      return receipt;
    },
    [addEvent, dispatch, network]
  );
};

const useReset = (dispatch: Dispatch<Action>) => {
  return useCallback(() => {
    dispatch({ status: 'None' });
  }, []);
};

/**
 * Wraps a function with some common Contract transaction logic
 * The function is wrapped in notification logic
 * The returned status is only set to loading once the transaction is being mined
 * aka after confirming via metamask.
 * The transaction's .wait() method is automatically called
 * The return value is the transaction receipt
 * */
const useTransaction = <F extends Fn>(
  fn: F,
  opts?: UseTransactionOptions<Parameters<F>[0]>
) => {
  const addEvent = useAddEvent();
  const { onError: globalOnError, network } = useContext(NftxContext);

  const [{ status, data, error }, dispatch] = useTransactionReducer();
  const mutate = useMutate({
    fn,
    opts,
    dispatch,
    addEvent,
    network,
    globalOnError,
  });
  const reset = useReset(dispatch);

  const meta: UseTransactionMeta = {
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
    isLoading: status === 'Mining' || status === 'PendingSignature',
    isError: status === 'Fail' || status === 'Exception',
  };

  return [mutate, meta] as const;
};

export default useTransaction;
