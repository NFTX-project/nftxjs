import priceVaultSell from './priceVaultSell';

type Args = Parameters<typeof priceVaultSell>[0];

const priceVaultMint = async (args: Args) => {
  const quote = await priceVaultSell(args);
  quote.type = 'mint';
  return quote;
};

export default priceVaultMint;
