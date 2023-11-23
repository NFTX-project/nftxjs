import { CreateVaultZap } from '@nftx/abi';
import type {
  CreateVaultQuote,
  Provider,
  Signer,
  Transaction,
} from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import { CREATE_VAULT_ZAP } from '@nftx/constants';

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
    network,
    signer,
    provider,
    quote: {
      methodParameters: { params, value },
    },
  }: Args) {
    const address = getChainConstant(CREATE_VAULT_ZAP, network);

    const contract = getContract({
      abi: CreateVaultZap,
      address,
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
