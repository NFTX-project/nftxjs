import { CreateVaultZap } from '@nftx/abi';
import type {
  CreateVaultArgs,
  CreateVaultParams,
  Provider,
  Signer,
} from '@nftx/types';
import { getChainConstant, query, type getContract } from '@nftx/utils';
import { CREATE_VAULT_ZAP } from '@nftx/constants';
import config from '@nftx/config';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  async function createVault({
    network,
    signer,
    provider,
    ...args
  }: CreateVaultArgs & {
    network: number;
    signer: Signer;
    provider: Provider;
  }) {
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
