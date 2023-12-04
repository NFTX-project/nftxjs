import config from '@nftx/config';
import type { Address, Contract, Provider, Signer } from '@nftx/types';
import type { Abi } from 'abitype';

function getContract<T extends Abi>(args: {
  address: Address;
  abi: T;
  provider: Provider;
}): Pick<Contract<T>, 'read' | 'estimate'>;
function getContract<T extends Abi>(args: {
  address: Address;
  abi: T;
  provider: Provider;
  signer: Signer;
}): Contract<T>;
function getContract<T extends Abi>({
  abi,
  address,
  provider,
  signer,
}: {
  address: Address;
  abi: T;
  provider: Provider;
  signer?: Signer;
}) {
  const read = new Proxy({} as Contract<T>['read'], {
    get(_target, functionName: any) {
      return ({ args = [] }: { args?: any[] }) => {
        return provider.readContract({
          abi,
          address,
          functionName,
          args,
        } as any);
      };
    },
  });
  const write = new Proxy({} as Contract<T>['write'], {
    get(_target: any, functionName: any) {
      return async (args: any) => {
        if (!signer) {
          throw new Error('Cannot perform a write operation without a signer');
        }
        const [userAddress] = await signer.getAddresses();
        const account = userAddress;

        if (config.debug) {
          console.debug({
            method: functionName,
            contractAddress: address,
            account,
            ...args,
          });
        }

        const { request } = await provider.simulateContract({
          address,
          abi,
          functionName,
          account,
          ...args,
        } as any);
        const hash = await signer.writeContract(request as any);

        return {
          hash,
          wait: () => provider.waitForTransactionReceipt({ hash }),
        };
      };
    },
  });

  const estimate = new Proxy({} as Contract<T>['estimate'], {
    get(_target, functionName: any) {
      return async (args: any) => {
        try {
          if (config.debug) {
            const method = [
              'estimate',
              functionName[0].toUpperCase(),
              functionName.slice(1),
            ].join('');
            console.debug({
              method,
              contractAddress: address,
              ...args,
            });
          }

          const gasEstimate = await provider.estimateContractGas({
            address,
            abi,
            functionName,
            ...args,
          } as any);

          return { gasEstimate };
        } catch (e) {
          console.error(e);
          return { gasEstimate: null };
        }
      };
    },
  });

  const contract = { read, write, estimate };

  return contract;
}

export default getContract;
