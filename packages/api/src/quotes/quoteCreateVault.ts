import config from '@nftx/config';
import { CreateVaultQuote, CreateVaultQuoteParams } from '@nftx/types';
import { queryApi } from '../utils';

const quoteCreateVault = ({
  network = config.network,
  ...query
}: CreateVaultQuoteParams & { network?: number }) => {
  return queryApi<CreateVaultQuote>({
    url: `/${network}/quote/create-vault`,
    method: 'POST',
    query,
  });
};

export default quoteCreateVault;
