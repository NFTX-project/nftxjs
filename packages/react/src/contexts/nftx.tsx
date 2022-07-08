import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import * as core from '@nftx/core';
import { getDefaultProvider } from '@ethersproject/providers';
import type { Provider } from '@ethersproject/providers';
import { EventsProvider } from './events';
import type { Signer } from 'ethers';
import config from '@nftx/config';

type Core = typeof core;

type INftxContext = {
  core: Core;
  network: number;
  provider: Provider;
  signer: Signer;
};

const defaultContext: INftxContext = {
  core,
  network: null,
  provider: null,
  signer: null,
};

export const nftxContext = createContext<INftxContext>(defaultContext);

export const NftxProvider = ({
  children,
  network,
  provider,
  signer,
}: {
  children: ReactNode;
  network?: number;
  provider?: Provider;
  signer?: Signer;
}) => {
  const value = useMemo(
    () => ({ network, provider, signer, core }),
    [network, provider, signer]
  );

  useEffect(() => {
    if (network != null && network != config.network) {
      config.configure({ network });
    }
  }, [network]);

  return (
    <nftxContext.Provider value={value}>
      <EventsProvider>{children}</EventsProvider>
    </nftxContext.Provider>
  );
};

export const useNftx = () => {
  const ctx = useContext(nftxContext);

  const network = ctx.network ?? config.network;
  const provider = ctx.provider ?? getDefaultProvider(network);
  const signer = ctx.signer;
  const core = ctx.core;

  return { network, provider, signer, core };
};

export const useNetwork = () => useNftx().network;
export const useProvider = () => useNftx().provider;
export const useSigner = () => useNftx().signer;
export const useNftxCore = () => useNftx().core;
