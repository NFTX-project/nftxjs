import { ContractInterface, Contract } from '@ethersproject/contracts';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Signer } from 'ethers';
import MulticallContract from './MulticallContract';

/**
 * Returns an ethers.js contract
 * For "read" calls: if multicall is supported and enabled it will return a MulticallContract
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
  /** An ethers provider - only required for contract reads */
  provider?: Provider;
  /** An ethers signer - only required for contract writes */
  signer?: Signer;
  /** The contract address */
  address: string;
  /** The JSON-formatted ABI interface */
  abi: ContractInterface;
  /** Whether or not to enable multicall contracts */
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
