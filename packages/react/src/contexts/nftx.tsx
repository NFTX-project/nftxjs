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
import { arbitrum, mainnet, sepolia, base } from 'viem/chains';

const getDefaultProvider = (network: number) => {
  const chain = (() => {
    switch (network) {
      case Network.Arbitrum:
        return arbitrum;
      case Network.Sepolia:
        return sepolia;
      case Network.Base:
        return base;
      case Network.Mainnet:
      default:
        return mainnet;
    }
  })();

  return createPublicClient({ chain, transport: http() });
};

type Core = typeof core;

type PublicContext = {
  core: Core;
  network: number;
  provider: Provider;
  signer: Signer;
};
type InternalContext = { onError: (e: any) => any };

type Context = PublicContext & InternalContext;

const { config } = core;

const defaultContext: Context = {
  core,
  network: 1,
  provider: null as any,
  signer: null as any,
  onError: () => void 0,
};

export const NftxContext = createContext<Context>(defaultContext);

export const NftxProvider = ({
  children,
  network,
  provider,
  signer = defaultContext.signer,
  onError = defaultContext.onError,
}: {
  children: ReactNode;
  network: number;
  provider: Provider;
  signer?: Signer;
  onError?: (e: any) => any;
}) => {
  const value = useMemo(() => {
    return { network, provider, signer, core, onError };
  }, [network, provider, signer, onError]);

  useEffect(() => {
    if (network != null && network != config.network) {
      config.configure({ network });
    }
  }, [network]);

  return (
    <NftxContext.Provider value={value}>
      <EventsProvider>{children}</EventsProvider>
    </NftxContext.Provider>
  );
};

export const useNftx = (): PublicContext => {
  const ctx = useContext(NftxContext);

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
