import { CreateVaultZap } from '@nftx/abi';
import type {
  CreateVaultArgs,
  CreateVaultParams,
  Provider,
  Signer,
  Transaction,
} from '@nftx/types';
import { getChainConstant, query, getContract } from '@nftx/utils';
import { CREATE_VAULT_ZAP } from '@nftx/constants';
import config from '@nftx/config';

type GetContract = typeof getContract;

// TODO: need to pass in the infinite range parameter from UI and pass it to the api
type Args = CreateVaultArgs & {
  network: number;
  signer: Signer;
  provider: Provider;
};

const makeCreateVault = ({
  getContract,
}: {
  getContract: GetContract;
}): ((args: Args) => Promise<Transaction>) =>
  async function createVault({ network, signer, provider, ...args }: Args) {
    const url = `${config.urls.NFTX_API_URL}/${network}/vaults/create`;
    const data: CreateVaultArgs = args;
    const headers = {
      Authorization: config.keys.NFTX_API,
      'Content-Type': 'application/json',
    };
    const { value, ...params } = await query<CreateVaultParams>({
      url,
      method: 'POST',
      query: data,
      headers,
    });

    const address = getChainConstant(CREATE_VAULT_ZAP, network);

    const contract = getContract({
      abi: CreateVaultZap,
      address,
      provider,
      signer,
    });

    console.debug({
      method: 'createVault',
      address,
      value,
      params,
    });

    return contract.write.createVault({
      args: [params],
      value,
    });
  };

const createVault = makeCreateVault({ getContract });

export default createVault;
