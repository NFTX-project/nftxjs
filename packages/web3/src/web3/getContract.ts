import { ContractInterface, Contract } from '@ethersproject/contracts';
import type { BaseProvider } from '@ethersproject/providers';
import type { Signer } from 'ethers';
import MulticallContract from './MulticallContract';
import type { Address } from './types';

const MULTICALL_ENABLED =
  [false, 'false'].includes(process.env.NFTX_MULTICALL) === false;

/** Returns an ethers.js contract
 * For "read" if multicall is supported and enabled it will return a multicall contract
 */
const getContract = <T>({
  network,
  provider,
  signer,
  address,
  abi,
  multicall = true,
}: {
  network: number;
  provider?: BaseProvider;
  signer?: Signer;
  address: Address;
  abi: ContractInterface;
  multicall?: boolean;
}): Contract & T => {
  if (signer) {
    return new Contract(address, abi, signer) as Contract & T;
  }
  if (multicall && MULTICALL_ENABLED) {
    return new MulticallContract<T>(network, address, abi, provider);
  }
  return new Contract(address, abi, provider) as Contract & T;
};

export default getContract;
