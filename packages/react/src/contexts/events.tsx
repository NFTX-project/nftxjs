import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import type { TransactionEvent, TransactionState } from '../types';

export type IEventsContext = {
  events: TransactionEvent[];
  pushEvent: (e: Omit<TransactionEvent, 'id'>) => void;
};

export const EventsContext = createContext<IEventsContext>({
  events: [],
  pushEvent: () => null,
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, dispatch] = useReducer(
    (
      state: TransactionEvent[],
      action: { type: string; event: TransactionEvent }
    ) => {
      switch (action?.type) {
        case 'push':
          return [...state, action.event];
        default:
          return state;
      }
    },
    []
  );

  const pushEvent = useCallback((e: Omit<TransactionEvent, 'id'>) => {
    dispatch({
      type: 'push',
      event: {
        id: [e.type, e.createdAt, e.transaction?.hash].join('-'),
        ...e,
      },
    });
  }, []);

  const value = useMemo(() => ({ events, pushEvent }), [events, pushEvent]);
  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

export const useEvents = () => {
  const { events } = useContext(EventsContext);
  return events;
};

export const useLatestEvent = () => {
  const events = useEvents();
  return events[events.length - 1];
};

export const useAddEvent = () => {
  const { pushEvent } = useContext(EventsContext);
  return pushEvent;
};

function useOnEvent(
  /** Filter a specific type */
  type: TransactionState,
  callback: (e: TransactionEvent) => any
): void;
function useOnEvent(
  /** Filter by specific types */
  types: TransactionState[],
  callback: (e: TransactionEvent) => any
): void;
function useOnEvent(callback: (e: TransactionEvent) => any): void;
function useOnEvent(...args: any[]) {
  const callback: (e: TransactionEvent) => any = args.pop();
  const type: string | string[] = args.pop();
  const types = type == null ? null : Array.isArray(type) ? type : [type];

  const event = useLatestEvent();

  useEffect(() => {
    if (event) {
      if (types == null || types.includes(event.type)) {
        callback(event);
      }
    }
  }, [event]);
}

export { useOnEvent };
