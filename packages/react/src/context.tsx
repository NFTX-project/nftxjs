import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import * as web3 from '@nftx/web3';
import { Network } from '@nftx/constants';
import { JsonRpcProvider, getDefaultProvider } from '@ethersproject/providers';

export const NftxContext = createContext<{
  web3: typeof web3;
  network: number;
  provider: JsonRpcProvider;
}>({
  web3,
  network: Network.Mainnet,
  provider: getDefaultProvider(Network.Mainnet) as JsonRpcProvider,
});

export const NftxProvider = ({
  children,
  network,
  provider,
}: {
  children: ReactNode;
  network: number;
  provider: JsonRpcProvider;
}) => {
  const value = useMemo(
    () => ({ network, provider, web3 }),
    [network, provider]
  );
  return <NftxContext.Provider value={value}>{children}</NftxContext.Provider>;
};

export const useNftx = () => useContext(NftxContext);
