import { CreateVaultZap } from '@nftx/abi';
import type {
  CreateVaultQuote,
  Provider,
  Signer,
  Transaction,
} from '@nftx/types';
import { getContract } from '@nftx/utils';

type GetContract = typeof getContract;

type Args = {
  network: number;
  signer: Signer;
  provider: Provider;
  quote: Pick<CreateVaultQuote, 'methodParameters'>;
};

const makeCreateVault = ({
  getContract,
}: {
  getContract: GetContract;
}): ((args: Args) => Promise<Transaction>) =>
  async function createVault({
    signer,
    provider,
    quote: {
      methodParameters: { params, value, contractAddress },
    },
  }: Args) {
    const contract = getContract({
      abi: CreateVaultZap,
      address: contractAddress,
      provider,
      signer,
    });

    return contract.write.createVault({
      args: [params],
      value,
    });
  };

const createVault = makeCreateVault({ getContract });

export default createVault;
