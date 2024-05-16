import React from 'react';
import {
  Transaction,
  TransactionCancelledError,
  TransactionExceptionError,
  TransactionFailedError,
  TransactionReceipt,
  nsync,
} from 'nftx.js';
import useTransaction, {
  UseTransactionMeta,
  UseTransactionOptions,
} from '../useTransaction';
import { renderHook, act, RenderHookResult } from '@testing-library/react';
import { EventsContext, NftxContext } from '../../contexts';

let transaction: Transaction & { wait: jest.Mock };
let receipt: TransactionReceipt;
let addEvent: jest.Mock;
let callback: jest.Mock;
let opts: UseTransactionOptions<any>;
let globalOnError: jest.Mock;
/** Renders the hook and returns the result */
let render: () => RenderHookResult<
  readonly [(args: any) => Promise<TransactionReceipt>, UseTransactionMeta],
  unknown
>;
/** Renders the hook and also triggers a mutate */
let run: () => Promise<{
  result: { current: ReturnType<typeof useTransaction> };
}>;

beforeEach(() => {
  nsync.setRequiredBlockNumber(0);
  receipt = { blockNumber: 1234n, status: 'success' } as TransactionReceipt;
  transaction = {
    hash: '0x1',
    wait: jest.fn().mockResolvedValue(receipt),
  };
  addEvent = jest.fn();
  callback = jest.fn().mockResolvedValue(transaction);
  globalOnError = jest.fn();
  opts = {};
  render = () => {
    return renderHook(() => useTransaction(callback, opts), {
      wrapper: ({ children }) => (
        <>
          <NftxContext.Provider
            value={{
              core: {} as any,
              network: 1,
              onError: globalOnError,
              provider: {} as any,
              signer: {} as any,
            }}
          >
            <EventsContext.Provider value={{ pushEvent: addEvent, events: [] }}>
              {children}
            </EventsContext.Provider>
          </NftxContext.Provider>
        </>
      ),
    });
  };
  run = async () => {
    const x = render();

    await act(async () => {
      await x.result.current[0]({ foo: 'bar' });
    });

    return x;
  };
});

it('returns a mutate method and metadata', async () => {
  const {
    result: {
      current: [mutate, meta],
    },
  } = render();

  expect(mutate).toBeInstanceOf(Function);
  expect(meta).toMatchObject({
    status: expect.any(String),
    reset: expect.any(Function),
    isIdle: expect.any(Boolean),
    isPending: expect.any(Boolean),
    isException: expect.any(Boolean),
    isFail: expect.any(Boolean),
    isMining: expect.any(Boolean),
    isSuccess: expect.any(Boolean),
    isLoading: expect.any(Boolean),
    isError: expect.any(Boolean),
  });
});

it('has an initial status of idle', async () => {
  const {
    result: {
      current: [, meta],
    },
  } = render();

  expect(meta.status).toBe('None');
});

describe('when calling mutate', () => {
  it('calls the callback function', async () => {
    await run();

    expect(callback).toHaveBeenCalledWith({ foo: 'bar' });
  });
  it('sets status to PendingSignature', async () => {
    await run();

    expect(addEvent).toHaveBeenCalled();
    expect(addEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'PendingSignature' })
    );
  });

  describe('after starting the transaction', () => {
    it('sets data.transaction', async () => {
      const { result } = await run();

      const meta = result.current[1];

      expect(meta.data.transaction).toBe(transaction);
    });
    it('sets the status to mining', async () => {
      await run();

      expect(addEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'Mining' })
      );
    });

    describe('when mining fails', () => {
      beforeEach(() => {
        transaction.wait.mockRejectedValue(new Error('Transaction failed'));
      });

      it('sets the status to failed', async () => {
        const { result } = await run();

        const [, meta] = result.current;

        expect(meta.status).toBe('Fail');
        expect(meta.isFail).toBe(true);
      });
      it('sets error to the thrown error', async () => {
        const { result } = await run();

        const [, meta] = result.current;

        expect(meta.error).toBeInstanceOf(TransactionFailedError);
        expect(meta.error.error).toBeInstanceOf(Error);
      });

      describe('when an onError option is passed in', () => {
        let onError: jest.Mock;

        beforeEach(() => {
          opts.onError = onError = jest.fn();
        });

        it('calls the onError callback', async () => {
          const { result } = await run();

          expect(onError).toHaveBeenCalledWith(
            expect.any(TransactionFailedError)
          );
          expect(result.current[1].error).toBeInstanceOf(
            TransactionFailedError
          );
        });
        describe('when onError throws an error', () => {
          beforeEach(() => {
            onError.mockRejectedValue(new Error('A new error'));
          });

          it('sets error to the newly-thrown error', async () => {
            const { result } = await run();

            expect(onError).toHaveBeenCalledWith(
              expect.any(TransactionFailedError)
            );
            expect(result.current[1].error).not.toBeInstanceOf(
              TransactionFailedError
            );
            expect(result.current[1].error).toBeInstanceOf(Error);
          });
        });
      });

      it('calls the global onError callback', async () => {
        await run();

        expect(globalOnError).toHaveBeenCalledWith(
          expect.any(TransactionFailedError)
        );
      });

      describe('when the transaction was dropped and replaced', () => {
        let newTransaction: Transaction;
        let newReceipt: TransactionReceipt;

        beforeEach(() => {
          newReceipt = { ...receipt };
          newTransaction = {
            hash: '0x2',
            wait: transaction.wait,
          };

          const e = {
            code: 'TRANSACTION_REPLACED',
            replacement: newTransaction,
            receipt: newReceipt,
            reason: 'repriced',
          };
          transaction.wait.mockRejectedValue(e);
        });

        it('sets the status to success', async () => {
          const { result } = await run();

          expect(result.current[1].status).toBe('Success');
        });
        it('sets data.transaction to the replaced transaction', async () => {
          const { result } = await run();

          expect(result.current[1].data.transaction).toBe(newTransaction);
        });
        it('sets data.receipt to the replaced receipt', async () => {
          const { result } = await run();

          expect(result.current[1].data.receipt).toBe(newReceipt);
        });
        it('does not call the global onError callback', async () => {
          await run();

          expect(globalOnError).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the transaction is flagged as reverted', () => {
      beforeEach(() => {
        receipt.status = 'reverted';
      });

      it('sets the status to failed', async () => {
        const { result } = await run();

        const [, meta] = result.current;

        expect(meta.status).toBe('Fail');
        expect(meta.isFail).toBe(true);
      });
      it('sets error to the thrown error', async () => {
        const { result } = await run();

        const [, meta] = result.current;

        expect(meta.error).toBeInstanceOf(TransactionFailedError);
      });
    });

    describe('when mining is successful', () => {
      it('updates the internal required block number', async () => {
        expect(nsync.getRequiredBlockNumber()).toBe(0);
        await run();
        expect(nsync.getRequiredBlockNumber()).toBeGreaterThan(0);
      });

      describe('when an onSuccess option is passed in', () => {
        let onSuccess: jest.Mock;

        beforeEach(() => {
          onSuccess = opts.onSuccess = jest.fn();
        });

        it('calls onSuccess', async () => {
          await run();

          expect(onSuccess).toHaveBeenCalledWith(
            {
              transaction,
              receipt,
            },
            { foo: 'bar' }
          );
        });
        describe('when onSuccess is a promise', () => {
          let called: boolean;
          beforeEach(() => {
            called = false;

            onSuccess.mockImplementation(async () => {
              await new Promise((r) => setTimeout(r, 500));
              called = true;
            });
          });

          it('waits for the callback to resolve', async () => {
            await run();

            expect(called).toBe(true);
          });
        });
      });

      it('sets the status to success', async () => {
        const { result } = await run();

        const [, meta] = result.current;

        expect(meta.status).toBe('Success');
      });
      it('sets data.receipt to the receipt', async () => {
        const { result } = await run();

        const [, meta] = result.current;

        expect(meta.data.receipt).toBe(receipt);
      });
    });
  });

  describe('when the callback function errors', () => {
    let error: Error;

    beforeEach(() => {
      error = new Error('Callback error');
      callback.mockRejectedValue(error);
    });

    it('sets the status to exception', async () => {
      const { result } = await run();

      const [, meta] = result.current;

      expect(meta.status).toBe('Exception');
    });
    it('sets error to the thrown error', async () => {
      const { result } = await run();

      const [, meta] = result.current;

      expect(meta.error).toBeInstanceOf(TransactionExceptionError);
      expect(meta.error.error).toBe(error);
    });

    describe('when an onError option is passed in', () => {
      let onError: jest.Mock;

      beforeEach(() => {
        opts.onError = onError = jest.fn();
      });

      it('calls the onError callback', async () => {
        await run();

        expect(onError).toHaveBeenCalledWith(
          expect.any(TransactionExceptionError)
        );
      });
      describe('when onError throws an error', () => {
        let error: Error;

        beforeEach(() => {
          error = new Error('New error');
          onError.mockRejectedValue(error);
        });

        it('sets error to the newly-thrown error', async () => {
          const { result } = await run();
          expect(onError).toHaveBeenCalledWith(
            expect.any(TransactionExceptionError)
          );
          expect(result.current[1].error).not.toBeInstanceOf(
            TransactionExceptionError
          );
          expect(result.current[1].error).toBeInstanceOf(Error);
          expect(result.current[1].error).toBe(error);
        });
      });
    });

    it('calls the global onError callback', async () => {
      await run();

      expect(globalOnError).toHaveBeenCalledWith(
        expect.any(TransactionExceptionError)
      );
    });
  });

  describe('when the transaction is cancelled by the user', () => {
    beforeEach(() => {
      const error = {
        code: 'ACTION_REJECTED',
      };
      callback.mockRejectedValue(error);
    });

    it('sets the status back to idle', async () => {
      const { result } = await run();

      const [, meta] = result.current;

      expect(meta.status).toBe('None');
    });
    it('sets the error to the TransactionCancelledError', async () => {
      const { result } = await run();

      const [, meta] = result.current;

      expect(meta.error).toBeInstanceOf(TransactionCancelledError);
    });
  });
});
