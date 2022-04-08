import { ContractInterface, Contract } from '@ethersproject/contracts';
import type { JsonRpcProvider } from '@ethersproject/providers';
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
  address,
  abi,
  type = 'read',
  multicall = true,
}: {
  network: number;
  provider: JsonRpcProvider;
  address: Address;
  abi: ContractInterface;
  type?: 'read' | 'write';
  multicall?: boolean;
}): Contract & T => {
  if (type === 'write') {
    return new Contract(address, abi, provider.getSigner()) as Contract & T;
  }
  if (multicall && MULTICALL_ENABLED) {
    return new MulticallContract<T>(network, address, abi, provider);
  }
  return new Contract(address, abi, provider) as Contract & T;
};

export default getContract;
