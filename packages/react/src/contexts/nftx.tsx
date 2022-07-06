import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import * as core from '@nftx/core';
import { Network } from '@nftx/constants';
import { getDefaultProvider } from '@ethersproject/providers';
import type { Provider } from '@ethersproject/providers';
import { EventsProvider } from './events';
import type { Signer } from 'ethers';

type Core = typeof core;

type INftxContext = {
  core: Core;
  network: number;
  provider: Provider;
  signer: Signer;
};

const defaultContext: INftxContext = {
  core,
  network: Network.Mainnet,
  provider: getDefaultProvider(Network.Mainnet),
  signer: null,
};

export const nftxContext = createContext<INftxContext>(defaultContext);

export const NftxProvider = ({
  children,
  network = defaultContext.network,
  provider = defaultContext.provider,
  signer = defaultContext.signer,
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
  return (
    <nftxContext.Provider value={value}>
      <EventsProvider>{children}</EventsProvider>
    </nftxContext.Provider>
  );
};

export const useNftx = () => {
  return useContext(nftxContext);
};

export const useNetwork = () => useNftx().network;
export const useProvider = () => useNftx().provider;
export const useSigner = () => useNftx().signer;
export const useNftxCore = () => useNftx().core;
