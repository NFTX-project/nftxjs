import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import type { TransactionEvent } from './types';

type IEventsContext = {
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

export const useLatesEvent = () => {
  const events = useEvents();
  return events[events.length - 1];
};

export const useAddEvent = () => {
  const { pushEvent } = useContext(EventsContext);
  return pushEvent;
};
