import { TokenId } from '@nftx/types';
import { zipTokenIds } from '../tokenIdUtils';

describe('zipTokenIds', () => {
  it('zips token ids and amounts', () => {
    const tokenIds: `${number}`[] = ['1', '2', '3'];
    const amounts = [1, 2, 3];

    const actual = zipTokenIds(tokenIds, amounts);
    const expected = [
      ['1', 1],
      ['2', 2],
      ['3', 3],
    ];

    expect(actual).toEqual(expected);
  });

  it('normalizes token ids if no amounts', () => {
    const tokenIds: TokenId[] = ['1', '2', '3'];

    const actual = zipTokenIds(tokenIds);
    const expected = [
      ['1', 1],
      ['2', 1],
      ['3', 1],
    ];

    expect(actual).toEqual(expected);
  });

  it('zips up duplicate token ids', () => {
    const tokenIds: TokenId[] = ['1', '2', '3', '2', '1'];

    const actual = zipTokenIds(tokenIds);
    const expected = [
      ['1', 2],
      ['2', 2],
      ['3', 1],
    ];

    expect(actual).toEqual(expected);
  });

  it('zips up duplicate token ids with amounts', () => {
    const tokenIds: TokenId[] = ['1', '2', '3', '2', '1'];
    const amounts = [1, 2, 3, 4, 5];

    const actual = zipTokenIds(tokenIds, amounts);
    const expected = [
      ['1', 6],
      ['2', 6],
      ['3', 3],
    ];

    expect(actual).toEqual(expected);
  });
});
