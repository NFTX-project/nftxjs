import { ContractTransaction, errors } from 'ethers';
import { useNftx } from '../context';
import {
  TransactionCancelledError,
  TransactionExceptionError,
  TransactionFailedError,
} from '../errors';
import { t } from '../utils';

type Fn = (...args: any) => Promise<ContractTransaction>;

function isDroppedAndReplaced(e: any) {
  return (
    e?.code === errors.TRANSACTION_REPLACED &&
    e?.replacement &&
    (e?.reason === 'repriced' || e?.cancelled === false)
  );
}

/**
 * Wraps a transaction function and inserts transaction/notification events
 * @param fn an async function that returns a ContractTransaction
 * @returns ContractTransaction
 */
export default function useWrapTransaction<F extends Fn>(fn: F) {
  const { network } = useNftx();
  // TODO: implement a notification and transaction tracking system (or integrate an existing system)
  // const { addTransaction } = useTransactionsContext();
  // const { addNotification } = useNotificationsContext();

  // wrap the original function, we take the same args and return the transaction
  const wrapper = async (...args: any[]) => {
    // call the original fn and intercept the result
    const [txErr, tx] = await t(fn(...args));
    if (txErr) {
      if (txErr.code === 4001) {
        throw new TransactionCancelledError(txErr, network);
      }
      // Exception - we couldn't even trigger the transaction
      throw new TransactionExceptionError(txErr, network);
    }

    // addTransaction({
    //   transaction: {
    //     ...tx,
    //     chainId: network,
    //   },
    //   submittedAt: Date.now(),
    // });

    const transaction: ContractTransaction = {
      ...tx,
      chainId: network,
      // we also want to wrap the wait behaviour
      wait: async (confirmations?: number) => {
        const [receiptErr, receipt] = await t(tx.wait(confirmations));

        if (receiptErr) {
          if (isDroppedAndReplaced(receiptErr)) {
            const type =
              receiptErr.receipt.status === 0
                ? 'transactionFailed'
                : 'transactionSucceed';

            // addNotification({
            //   notification: {
            //     type,
            //     submittedAt: Date.now(),
            //     transaction: receiptErr.replacement,
            //     receipt: receiptErr.receipt,
            //     transactionName: receiptErr.replacement?.transactionName,
            //     originalTransaction: transaction,
            //   },
            //   chainId: network,
            // });

            if (type === 'transactionSucceed') {
              return receiptErr.receipt;
            }
          }

          // Fail
          throw new TransactionFailedError(
            receiptErr,
            network,
            tx,
            receiptErr.receipt
          );
        }

        return receipt;
      },
    };

    return transaction;
  };

  return wrapper as F;
}
