# `@nftx/ queue`

This package is written specifically to allow communication and job running between NFTX-API and NFTX-API-INDEXER

Signals and Messages can be sent and received using this library. Signals are used to trigger an intended action whereas Messages are used to notify of events. They act very differently behind the scenes:

A signal is passed to bullmq which then passes it on to a single worker to process. You can have multiple listeners for a signal, but only 1 listener will be given the signal.

Messages, on the other hand, are broadcast to all listeners.

## Usage

```ts
// Create a listener for the signal
onSignal(async (type, data) => {
  // Dispatch to the network-specific listener
  sendNetworkSignal(data.network, type, data);
});

// Create a listener for mainnet signals
onNetworkSignal(1, (type, data) => {
  switch (type) {
    case 'index-vault':
      // Handle indexing a vault here
      // Broadcast a message when the job is complete
      sendMessage('vault-indexed', {});
      break;
  }
});

// Create multiple listeners for messages
onMessage((type, data) => {
  switch (type) {
    case 'vault-indexed':
      // Do something
      breka;
  }
});

// Emit a signal
sendSignal('index-vault', { vaultId: '0' });
```
