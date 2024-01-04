import { Address, TokenId } from '@nftx/types';
import fetchClaimableAmount from '../fetchClaimableAmount';
import { formatEther, parseEther } from 'viem';

let tokenId: TokenId;
let provider: any;
let manager: Address;
let run: () => ReturnType<typeof fetchClaimableAmount>;

beforeEach(() => {
  const simulateResponse = {
    result: [parseEther('1'), parseEther('0.5')],
  };
  provider = {
    readContract: jest.fn().mockResolvedValue('0x1234'),
    simulateContract: jest.fn().mockResolvedValue(simulateResponse),
  };
  tokenId = '1';
  manager = '0x1234';

  run = () => fetchClaimableAmount({ tokenId, provider, manager });
});

it('returns the claimable amount for a given position', async () => {
  const [amount0, amount1] = await run();

  expect(formatEther(amount0)).toBe('1');
  expect(formatEther(amount1)).toBe('0.5');
});

it('returns [0, 0] if the position is not claimable', async () => {
  provider.simulateContract = jest.fn().mockRejectedValue('error');

  const [amount0, amount1] = await run();

  expect(formatEther(amount0)).toBe('0');
  expect(formatEther(amount1)).toBe('0');
});

it('passes in the maximum possible claim range into the contract', async () => {
  await run();

  expect(provider.simulateContract).toHaveBeenCalledWith({
    abi: expect.anything(),
    address: expect.anything(),
    functionName: 'collect',
    args: [
      {
        amount0Max: 340282366920938463463374607431768211455n,
        amount1Max: 340282366920938463463374607431768211455n,
        recipient: '0x1234',
        tokenId: 1n,
      },
    ],
  });
});
