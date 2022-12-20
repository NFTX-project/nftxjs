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
  pushEvent: (e: TransactionEvent) => void;
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

  const pushEvent = useCallback((e: TransactionEvent) => {
    dispatch({ type: 'push', event: e });
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
  type: TransactionState,
  callback: (e: TransactionEvent) => any
): void;
function useOnEvent(callback: (e: TransactionEvent) => any): void;
function useOnEvent(...args: any[]) {
  const type = typeof args[0] === 'string' ? args[0] : null;
  const callback: (e: TransactionEvent) => any = args[args.length - 1];

  const event = useLatestEvent();

  useEffect(() => {
    if (event) {
      if (type == null || type === event.type) {
        callback(event);
      }
    }
  }, [event]);
}

export { useOnEvent };
