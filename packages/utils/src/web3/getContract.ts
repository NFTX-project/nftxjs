import { ContractInterface, Contract } from '@ethersproject/contracts';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Signer } from 'ethers';
import MulticallContract from './MulticallContract';

/** Returns an ethers.js contract
 * For "read" if multicall is supported and enabled it will return a multicall contract
 */
const getContract = <T>({
  network = config.network,
  provider,
  signer,
  address,
  abi,
  multicall = true,
}: {
  network?: number;
  provider?: Provider;
  signer?: Signer;
  address: string;
  abi: ContractInterface;
  multicall?: boolean;
}): Contract & T => {
  if (signer) {
    return new Contract(address, abi, signer) as Contract & T;
  }
  if (multicall && config.contracts.multicall) {
    return new MulticallContract<T>(network, address, abi, provider);
  }
  return new Contract(address, abi, provider) as Contract & T;
};

export default getContract;
