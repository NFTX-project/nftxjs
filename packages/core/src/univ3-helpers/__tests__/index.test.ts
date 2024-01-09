import Decimal from 'decimal.js';
import {
  bigintToDecimal,
  bigintToJsbi,
  calculatePriceFromTick,
  decimalToBigint,
  decimalToEthers,
  ethersToDecimal,
  getNearestValidTick,
  getSqrtRatioAtTick,
  getSqrtRatioX96,
  getTickAtSqrtRatio,
  sqrtX96,
} from '..';
import { FeeTier, WeiPerEther, feeTierToTickSpacing } from '@nftx/constants';
import JSBI from 'jsbi';
import { formatEther, parseEther } from 'viem';

describe('bigintToDecimal', () => {
  it('converts a bigint to a decimal', () => {
    expect(bigintToDecimal(100n)).toEqual(new Decimal(100));
  });
});

describe('ethersToDecimal', () => {
  it('converts a ETHER bigint to a decimal', () => {
    expect(ethersToDecimal(WeiPerEther * 100n)).toEqual(new Decimal(100));
  });
});

describe('decimalToEthers', () => {
  it('converts a decimal to a ETHER bigint', () => {
    expect(decimalToEthers(new Decimal(100))).toEqual(WeiPerEther * 100n);
  });
});

describe('decimalToBigint', () => {
  it('converts a decimal to a bigint', () => {
    expect(decimalToBigint(new Decimal(100))).toEqual(100n);
  });
});

describe('bigintToJsbi', () => {
  it('converts a bigint to a JSBI', () => {
    expect(bigintToJsbi(100n)).toEqual(JSBI.BigInt(100));
  });
});

describe('sqrtX96', () => {
  it('calculates the X96 square root', () => {
    expect(formatEther(sqrtX96(WeiPerEther))).toEqual(
      '79228162514264337594000000000'
    );
  });
});

describe('getSqrtRatioX96', () => {
  it('calculates the X96 square root ratio', () => {
    expect(
      formatEther(getSqrtRatioX96(WeiPerEther, WeiPerEther * 20n))
    ).toEqual('17715955711.42957103');
  });
});

describe('getTickAtSqrtRatio', () => {
  it('calculates the tick at the sqrt ratio', () => {
    const feetier: FeeTier = 3000;
    const tickSpacing = feeTierToTickSpacing(feetier);

    expect(
      getTickAtSqrtRatio(
        parseEther('17732633948.828052598660473723'),
        tickSpacing
      )
    ).toEqual(-29940);
  });
});

describe('getSqrtRatioAtTick', () => {
  it('calculates the sqrt ratio at the tick', () => {
    expect(formatEther(getSqrtRatioAtTick(-29940))).toEqual(
      '17732633948.828052598660473723'
    );
  });
});

describe('calculatePriceFromTick', () => {
  it('calculates the price from the tick', () => {
    expect(formatEther(calculatePriceFromTick(-29940))).toEqual(
      '0.050094186778981481'
    );
  });
  describe('when the tick is below the minimum tick', () => {
    it('returns the minimum price', () => {
      expect(formatEther(calculatePriceFromTick(-887220))).toEqual('0');
    });
  });
  describe('when the tick is above the maximum tick', () => {
    it('returns the maximum price', () => {
      expect(formatEther(calculatePriceFromTick(887220))).toEqual(
        '338492131855223783700000000000000000000'
      );
    });
  });
});

describe('getNearestValidTick', () => {
  it('returns the nearest valid tick', () => {
    const feetier: FeeTier = 3000;
    const tickSpacing = feeTierToTickSpacing(feetier);
    const tick = Math.floor(-29940 - tickSpacing / 3);

    expect(getNearestValidTick(tick, tickSpacing)).toEqual(-29940);
  });
});
