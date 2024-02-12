import { useNftx } from '../contexts/nftx';
import { t } from '../utils';
import { useAddEvent } from '../contexts/events';
import {
  Transaction,
  TransactionExceptionError,
  TransactionFailedError,
  nsync,
} from 'nftx.js';

type Fn = (...args: any) => Promise<Transaction>;

function isDroppedAndReplaced(e: any) {
  return (
    e?.code === 'TRANSACTION_REPLACED' &&
    e?.replacement &&
    (e?.reason === 'repriced' || e?.cancelled === false)
  );
}

/**
 * Wraps a transaction function and inserts transaction/notification events
 * @param fn an async function that returns a ContractTransaction
 * @returns ContractTransaction
 */
export default function useWrapTransaction<F extends Fn>(
  fn: F,
  description = ''
) {
  const { network } = useNftx();
  const addEvent = useAddEvent();

  // wrap the original function, we take the same args and return the transaction
  const wrapper = async (args: any) => {
    addEvent({
      type: 'PendingSignature',
      network,
      createdAt: Date.now(),
      description,
    });
    // call the original fn and intercept the result
    const [txErr, tx] = await t(fn(args));
    if (txErr) {
      const e = txErr.cause ?? txErr;
      // Exception - we couldn't even trigger the transaction
      throw new TransactionExceptionError(e, network);
    }

    addEvent({
      type: 'Mining',
      network,
      createdAt: Date.now(),
      transaction: tx,
      description,
    });

    const transaction: Transaction = {
      ...tx,
      // we also want to wrap the wait behaviour
      wait: async () => {
        const [receiptErr, receipt] = await t(tx.wait());

        if (receiptErr) {
          if (isDroppedAndReplaced(receiptErr)) {
            const type =
              receiptErr.receipt.status === 0
                ? 'transactionFailed'
                : 'transactionSucceed';

            addEvent({
              type: type === 'transactionSucceed' ? 'Success' : 'Fail',
              createdAt: Date.now(),
              network,
              receipt: receiptErr.receipt,
              transaction: receiptErr.replacement,
              error: receiptErr,
              description,
            });

            if (type === 'transactionSucceed') {
              return receiptErr.receipt;
            }
          } else {
            addEvent({
              type: 'Fail',
              createdAt: Date.now(),
              network,
              receipt: receiptErr.receipt,
              transaction,
              error: receiptErr,
              description,
            });
          }

          // Fail
          throw new TransactionFailedError(
            receiptErr,
            network,
            tx,
            receiptErr.receipt
          );
        }

        if (receipt.status === 'reverted') {
          throw new TransactionFailedError(network, {}, tx, receipt);
        }

        addEvent({
          type: 'Success',
          createdAt: Date.now(),
          network,
          receipt,
          transaction,
          description,
        });

        // We ideally want data to be up to the block for this transaction
        // So we store the block number and any subsequent api calls will
        // be made with "live mode" enabled until the api has caught up
        const txnBlock = Number(receipt.blockNumber);
        // For a bit of leeway we add a buffer to the required block number
        // so the api must be at least this far ahead before we switch back to "api mode"
        const buffer = nsync.getBlockBuffer();
        nsync.setRequiredBlockNumber(txnBlock + buffer);

        return receipt;
      },
    };

    return transaction;
  };

  return wrapper as F;
}
