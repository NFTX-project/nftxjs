import { CRYPTOKITTIES, CRYPTOPUNKS } from '@nftx/constants';
import { addressEqual } from '../web3';

/** Returns whether a given address is for the CryptoPunk collection */
export const isCryptoPunk = (address: string) => {
  return addressEqual(address, CRYPTOPUNKS);
};

/** Returns whether a given address is for the CryptoKitty collection */
export const isCryptoKitty = (address: string) => {
  return addressEqual(address, CRYPTOKITTIES);
};

/** Returns whether a given address is for a non-standard collection (CryptoPunks or CryptoKitties) */
export const isNonstandard721 = (address: string) => {
  return isCryptoPunk(address) || isCryptoKitty(address);
};
