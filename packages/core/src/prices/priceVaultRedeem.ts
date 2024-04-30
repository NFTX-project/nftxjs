import priceVaultBuy from './priceVaultBuy';

type Args = Parameters<typeof priceVaultBuy>[0];

const priceVaultRedeem = async (args: Args) => {
  const quote = await priceVaultBuy(args);
  quote.type = 'redeem';
  return quote;
};

export default priceVaultRedeem;
