import { CRYPTOKITTIES, CRYPTOPUNKS } from '@nftx/constants';
import { addressEqual } from '../web3';

export { default as fetchAssetMetadata } from './fetchAssetMetadata';

export const isCryptoPunk = (address: string) => {
  return addressEqual(address, CRYPTOPUNKS);
};

export const isCryptoKitty = (address: string) => {
  return addressEqual(address, CRYPTOKITTIES);
};

export const isNonstandard721 = (address: string) => {
  return isCryptoPunk(address) || isCryptoKitty(address);
};
