# @nftx/react

[api](api/modules/_nftx_react)

We provide a simple React integration for nftx.js that provides react hooks for all mutative actions (buy/sell/swap/stake/unstake/approve).

These hooks handle additional logic like getting the network, provider/signer, mining transactions, api invalidation, and dropped & replaced transactions.

Currently there are no hooks for reading data. There are so many methods of state management in the React ecosystem so use whatever pattern or library that you prefer. (Internally we like to use [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/))

## NftxProvider

[api](api/functions/_nftx_react.NftxProvider)

The NftxProvider component wraps your application and provides the network and provider to the library's hooks.

```tsx
<NftxProvider
  network={1}
  provider={myJsonRpcProvider}
  signer={myProviderSigner}
>
  {children}
</NftxProvider>
```

To get context info yourself you can use the following methods:

```ts
const network = useNetwork();
const provider = useProvider();
const signer = useSigner();
```

or

```ts
const { network, provider, signer } = useNftx();
```

## useTransaction

[api](api/functions/_nftx_react.useTransaction)

All of our hooks are built upon this hook. It is a hook that wraps a transaction callback function and returns a function and status metadata.

The api is similar to React Query's [useMutation](https://tanstack.com/query/v4/docs/react/guides/mutations) except that it returns a tuple. Rather than a `'loading'` state, there are `'PendingSignature'` and `'Mining'` statuses.

```ts
const [
  transact,
  {
    status,
    error,
    reset,
    data: { transaction, receipt },
  },
] = useTransaction(() => contract.someInteraction(), {
  onSuccess() {
    // Called after mining is complete
  },
  onError(e) {
    // Handle errors
  },
});
```

## events

Part of `useTransaction`'s utility is that it pushes events to the NftxProvider. An even is pushed for each `status` a hook goes through.

### useEvents

[api](api/functions/_nftx_react.useEvents)

Returns all events that have been pushed since app-start.

### useLatestEvent

[api](api/functions/_nftx_react.useLatestEvent)

Returns the most recent event.

### useAddEvent

[api]([api](api/functions/_nftx_react.useAddEvent)

Manually push an event to the queue

### useOnEvent

[api](api/functions/_nftx_react.useOnEvent)

Subscribes and triggers a callback function whenver a new event it pushed.

### Example of showing event notifications in the UI

```tsx
// Store some queue items at component-level
const [queue, setQueue] = useState < TransactionEvent > []([]);

// Add an item to our queue
function addItem(item: TransactionEvent) {
  setQueue((queue) => [...queue, item]);
  // Remove from our queue after 5s
  setTimeout(() => {
    setQueue((queue) => queue.filter((x) => x !== item));
  }, 5000);
}

// Listen for events and add them to the queue
useOnEvent(addItem);

// Render queue items
return (
  <ul>
    {queue.map((item) => (
      <li key={item.id}>{`${item.type} ${item.description}`}</li>
    ))}
  </ul>
);
```

### Example of integrating with rainbowkit

```tsx
// Rainbowkit's own transaction log
const addTransaction = useAddRecentTransaction();

// When an event comes through for a new transaction, pass it to rainbowkit
// We only need to pass the initial mining event as rainbowkit will then track that transaction itself
useOnEvent('Mining', (e) => {
  addRecentTransaction({
    hash: e.transaction.hash,
    description: e.description,
  });
});
```

## Testing

A useful feature of `@nftx/react` is that it actually _provides_ all of nftx.js's methods as injectables:

```ts
const { buy } = useNftxCore();

buy({ ... });
```

and all of the hooks provided by the library use these injected methods.

What this means if you can actually (and easily) provide mocked or stubbed contract calls by wrapping your tests in the `nftxContext` provider:

```tsx
import { nftxContext } from '@nftx/react';

const TestApp = ({ children }) => (
  <nftxContext.Provider
    value={{
      core: {
        buy: myMockContractInteraction,
      },
    }}
  >
    {children}
  </nftxContext.Provider>
);
```

You can also write your own hooks using the injected methods if you want:

```ts
const { fetchVaults } = useNftxCore();

const [vaults, setVaults] = useState();

useEffect(() => {
  fetchVaults().then(setVaults);
}, []);
```
