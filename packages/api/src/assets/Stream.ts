export interface IStream<T> {
  errored: boolean;
  ended: boolean;

  on(e: 'data', cb: (data: T) => any): void;
  on(e: 'end', cb: () => any): void;
  on(e: 'error', cb: (e: any) => void): any;

  read(): Promise<T>;
}

type ReadEvt = 'data' | 'end' | 'error';
type WriteEvt = 'read';

export default class Stream<T> implements IStream<T> {
  listeners: {
    [K in ReadEvt | WriteEvt]?: (...args: any[]) => any;
  };
  errored: boolean;
  ended: boolean;
  reading: boolean;

  constructor() {
    this.reading = false;
    this.errored = false;
    this.ended = false;
    this.listeners = {};
  }

  on(e: ReadEvt | WriteEvt, cb: (...args: any[]) => void) {
    this.listeners[e] = cb;

    if (e === 'data') {
      this.reading = true;
      this.listeners.read?.();
    }
  }

  read() {
    return new Promise<T>((res, rej) => {
      if (this.listeners.data) {
        return rej(
          new Error(
            'stream is automatically reading as there is a data listener'
          )
        );
      }
      if (this.ended) {
        return rej(new Error('stream has ended'));
      }
      if (this.reading) {
        return rej(new Error('stream is already reading'));
      }

      const onEnd = this.listeners.end;
      const onError = this.listeners.error;

      const revert = () => {
        this.reading = false;
        this.listeners.data = null;
        this.listeners.error = onError;
        this.listeners.end = onEnd;
      };

      this.listeners.data = (data) => {
        revert();
        res(data);
      };
      this.listeners.error = (e) => {
        revert();
        onError?.(e);
        rej(e);
      };
      this.listeners.end = () => {
        revert();
        onEnd?.();
      };

      this.reading = true;
      this.listeners.read?.();
    });
  }

  write(data: T) {
    if (this.ended) {
      return;
    }

    this.listeners.data?.(data);

    if (this.listeners.data) {
      this.listeners.read?.();
    }
  }

  error(e: any) {
    if (!this.ended) {
      this.errored = true;
      this.ended = true;
      this.listeners.error?.(e);
    }
  }

  end() {
    if (!this.ended) {
      this.ended = true;
      this.reading = false;
      this.listeners.end?.();
    }
  }
}
