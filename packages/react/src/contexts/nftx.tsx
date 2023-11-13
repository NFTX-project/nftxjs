import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import * as core from 'nftx.js';
import { EventsProvider } from './events';
import { Network, Provider, Signer } from 'nftx.js';
import { createPublicClient, http } from 'viem';
import { arbitrum, mainnet, goerli, sepolia } from 'viem/chains';

const getDefaultProvider = (network: number) => {
  const chain = (() => {
    switch (network) {
      case Network.Arbitrum:
        return arbitrum;
      case Network.Goerli:
        return goerli;
      case Network.Sepolia:
        return sepolia;
      case Network.Mainnet:
      default:
        return mainnet;
    }
  })();

  return createPublicClient({ chain, transport: http() });
};

type Core = typeof core;

export type INftxContext = {
  core: Core;
  network: number;
  provider: Provider;
  signer: Signer;
};

const { config } = core;

const defaultContext: INftxContext = {
  core,
  network: 1,
  provider: null as any,
  signer: null as any,
};

export const nftxContext = createContext<INftxContext>(defaultContext);

export const NftxProvider = ({
  children,
  network,
  provider,
  signer,
}: {
  children: ReactNode;
  network: number;
  provider: Provider;
  signer: Signer;
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

export const useNftx = (): INftxContext => {
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
