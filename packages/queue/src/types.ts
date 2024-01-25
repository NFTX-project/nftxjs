import { Address } from '@nftx/types';

export type Signals = {
  'index-collection': { collectionAddress: Address; network: number };
  'index-vault': { network: number; vaultId: string };
  'index-inactive-vaults': { network: number };
  'index-new-vaults': { network: number };
  'index-twap-vaults': { network: number };
  'start-twap-watch': { network: number; vaultId: string };
};

type ListenerFn<T, S extends keyof T> = (signal: {
  type: S;
  payload: T[S];
}) => any;

export type SignalCallback = ListenerFn<Signals, 'index-vault'> &
  ListenerFn<Signals, 'index-collection'> &
  ListenerFn<Signals, 'index-inactive-vaults'> &
  ListenerFn<Signals, 'index-new-vaults'> &
  ListenerFn<Signals, 'index-twap-vaults'>;

export type Messages = {
  'collection-indexed': { collectionAddress: Address; network: number };
  'vault-indexed': { network: number; vaultId: string };
};

export type MessageCallback = ListenerFn<Messages, 'vault-indexed'> &
  ListenerFn<Messages, 'collection-indexed'>;
