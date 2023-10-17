import calculateVTokenEth from '../calculateVTokenEth';

it('calculate the vToken / ETH split', () => {
  const token0 = '0x795ce1dafd048b8c226024071bd0cdca9f39dbb7';
  const token1 = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
  const tickLower = '-36960';
  const tickUpper = '-23160';
  const liquidity = '5431575616225859850';
  const vTokenToEth = '88179692777707444';

  const result = calculateVTokenEth({
    inputTokens: [token0, token1],
    liquidity: BigInt(liquidity),
    network: 5,
    tickLower: BigInt(tickLower),
    tickUpper: BigInt(tickUpper),
    vTokenToEth: BigInt(vTokenToEth),
    currentTick: BigInt('-24285'),
  });

  expect(result.eth.toString()).toBe('757075519522767863');
  expect(result.vToken.toString()).toBe('1000427633166982924');
});
