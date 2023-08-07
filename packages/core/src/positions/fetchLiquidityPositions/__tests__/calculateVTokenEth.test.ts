import calculateVTokenEth from '../calculateVTokenEth';

it('calculate the vToken / ETH split', () => {
  const token0 = '0x6f4d645d1645e65db2E7f9Aa11Eb5Fc45a65592A';
  const token1 = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
  const tickLower = '-29800';
  const tickUpper = '-6800';
  const liquidity = '2845186648108644386';
  const vTokenToEth = '100050032043916100';

  const result = calculateVTokenEth({
    inputTokens: [token0, token1],
    liquidity: BigInt(liquidity),
    network: 1,
    tickLower: BigInt(tickLower),
    tickUpper: BigInt(tickUpper),
    vTokenToEth: BigInt(vTokenToEth),
  });

  expect(result.eth.toString()).toBe('0');
  expect(result.vToken.toString()).toBe('0');
});
