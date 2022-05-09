import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import * as web3 from '@nftx/web3';
import { Network } from '@nftx/constants';
import { getDefaultProvider } from '@ethersproject/providers';
import type { Provider } from '@ethersproject/providers';
import { EventsProvider } from './EventsProvider';
import type { Signer } from 'ethers';

type INftxContext = {
  web3: typeof web3;
  network: number;
  provider: Provider;
  signer: Signer;
};

const defaultContext = {
  web3,
  network: Network.Mainnet,
  provider: getDefaultProvider(Network.Mainnet),
  signer: null,
};

export const NftxContext = createContext<INftxContext>(defaultContext);

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
    () => ({ network, provider, signer, web3 }),
    [network, provider]
  );
  return (
    <NftxContext.Provider value={value}>
      <EventsProvider>{children}</EventsProvider>
    </NftxContext.Provider>
  );
};

export const useNftx = () => {
  return useContext(NftxContext);
};
