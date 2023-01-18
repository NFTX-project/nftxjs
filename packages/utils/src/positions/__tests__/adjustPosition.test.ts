import { WeiPerEther, Zero } from '@nftx/constants';
import type { Position } from '@nftx/types';
import { parseEther } from 'viem';
import adjustPosition from '../adjustPosition';
import testPosition from './test-position';

let position: Position;
let vToken: bigint;
let slp: bigint;
let lpNft: bigint;
let lpEth: bigint;
let run: () => Position;

beforeEach(() => {
  vToken = null as any;
  slp = null as any;
  lpNft = null as any;
  lpEth = null as any;
  position = testPosition as any;
  run = () => adjustPosition(position, { lpEth, lpNft, slp, vToken });
});

describe('add inventory (vToken)', () => {
  let result: Position;
  beforeEach(() => {
    vToken = parseEther('1');
    result = run();
  });

  it('adds the vToken to the vToken balance', () => {
    expect(`${position.inventoryTokens}`).toBe('370830868609868634');
    expect(`${result.inventoryTokens}`).toBe(`${1370830868609868634n}`);
  });
  it('adjusts the inventory share', () => {
    expect(`${position.inventoryShare}`).toBe('40738233836317630');
    expect(`${result.inventoryShare}`).toBe('151755161256182218');
  });
  it('adjusts the inventory split', () => {
    expect(Math.floor(position.inventorySplit * 10000) / 10000).toBe(0.0872);
    expect(Math.floor(result.inventorySplit * 10000) / 10000).toBe(0.1501);
  });
  it('adjusts the inventory tokens', () => {
    expect(`${position.inventoryTokens}`).toBe('370830868609868634');
    expect(`${result.inventoryTokens}`).toBe('1370830868609868634');
  });
  it('adjusts the inventory eth value', () => {
    expect(`${position.inventoryValue}`).toBe('1733078193961315');
    expect(`${result.inventoryValue}`).toBe('6406578543212429');
  });
  it('adjusts the total value', () => {
    expect(`${position.totalValue}`).toBe('39442784740050594');
    expect(`${result.totalValue}`).toBe('44116285089301708');
  });
  it('adjusts the value staked', () => {
    expect(`${position.valueStaked}`).toBe('38000618670827965');
    expect(`${result.valueStaked}`).toBe('42674119020079079');
  });
  it('adjusts the xtokenBalance', () => {
    expect(`${position.xTokenBalance}`).toBe('339746544880983538');
    expect(`${result.xTokenBalance}`).toBe('1431239230229039785');
  });
  it('adjusts the xTokensupply', () => {
    expect(`${position.xTokenSupply}`).toBe('8339746544880983538');
    expect(`${result.xTokenSupply}`).toBe('9431239230229039785');
  });
  it('adjusts the APRs', () => {
    expect(Math.floor(position.inventoryApr * 10000) / 10000).toBe(0.079);
    expect(Math.floor(position.liquidityApr * 10000) / 10000).toBe(0.0967);
    expect(Math.floor(result.inventoryApr * 10000) / 10000).toBe(0.0699);
    expect(Math.floor(result.liquidityApr * 10000) / 10000).toBe(0.0967);
  });

  describe('when there is no inventory', () => {
    beforeEach(() => {
      position = {
        ...position,
        inventoryShare: Zero,
        inventorySplit: 0,
        inventoryStaked: Zero,
        inventoryTokens: Zero,
        inventoryValue: Zero,
        liquiditySplit: 1,
        totalValue: position.liquidityValue + position.claimableValue,
        totalValueStaked: position.liquidityValue,
        xTokenBalance: Zero,
      };
      // const vToken =
      //   Zero -
      //   (position.xTokenBalance * WeiPerEther) / position.xTokenShare -
      //   1n;

      // position = adjustPosition(position, {
      //   vToken,
      // });
    });

    it('adjusts the inventory share', () => {
      expect(`${position.inventoryShare}`).toBe('0');
      expect(`${result.inventoryShare}`).toBe('151755161256182218');
    });
    it('adjusts the inventory split', () => {
      expect(Math.floor(position.inventorySplit * 10000) / 10000).toBe(0);
      expect(Math.floor(result.inventorySplit * 10000) / 10000).toBe(0.1501);
    });
    it('adjusts the inventory tokens', () => {
      expect(`${position.inventoryTokens}`).toBe('0');
      expect(`${result.inventoryTokens}`).toBe('1370830868609868634');
    });
    it('adjusts the inventory eth value', () => {
      expect(`${position.inventoryValue}`).toBe('0');
      expect(`${result.inventoryValue}`).toBe('6406578543212429');
    });
    it('adjusts the total value', () => {
      expect(`${position.totalValue}`).toBe('37709706546089279');
      expect(`${result.totalValue}`).toBe('44116285089301708');
    });
    it('adjusts the value staked', () => {
      expect(`${position.valueStaked}`).toBe('38000618670827965');
      expect(`${result.valueStaked}`).toBe('42674119020079079');
    });
    it('adjusts the xtokenBalance', () => {
      expect(`${position.xTokenBalance}`).toBe('0');
      expect(`${result.xTokenBalance}`).toBe('1431239230229039785');
    });
    it('adjusts the xTokensupply', () => {
      expect(`${position.xTokenSupply}`).toBe('8339746544880983538');
      expect(`${result.xTokenSupply}`).toBe('9431239230229039785');
    });
    it('adjusts the APRs', () => {
      expect(Math.floor(position.inventoryApr * 10000) / 10000).toBe(0.079);
      expect(Math.floor(position.liquidityApr * 10000) / 10000).toBe(0.0967);
      expect(Math.floor(result.inventoryApr * 10000) / 10000).toBe(0.0699);
      expect(Math.floor(result.liquidityApr * 10000) / 10000).toBe(0.0967);
    });
  });
});

describe('add liquidity (NFT + ETH)', () => {
  let result: Position;
  beforeEach(() => {
    lpNft = parseEther('2');
    lpEth = parseEther('0.009278350515464');
    result = run();
  });

  it('adjusts the liquidity share', () => {
    expect(position.liquidityShare.toString()).toBe('212337346198680636');
    expect(result.liquidityShare.toString()).toBe('348192036883254955');
  });
  it('adjusts the liquidity split', () => {
    expect(Math.floor(position.liquiditySplit * 10000) / 10000).toBe(0.9127);
    expect(Math.floor(result.liquiditySplit * 10000) / 10000).toBe(0.9694);
  });
  it('adjusts the liquidity tokens', () => {
    expect(position.liquidityTokens.toString()).toBe('3880126004770513556');
    expect(result.liquidityTokens.toString()).toBe('5880126004770513556');
  });
  it('adjusts the liquidity eth', () => {
    expect(position.liquidityEth.toString()).toBe('18133770238433325');
    expect(result.liquidityEth.toString()).toBe('27412120753897325');
  });
  it('adjusts the liquidity eth value', () => {
    expect(position.liquidityValue.toString()).toBe('36267540476866650');
    expect(result.liquidityValue.toString()).toBe('54824241507794650');
  });
  it('adjusts the total value', () => {
    expect(position.totalValue.toString()).toBe('39442784740050594');
    expect(result.totalValue.toString()).toBe('57999485770978594');
  });
  it('adjusts the value staked', () => {
    expect(position.valueStaked.toString()).toBe('38000618670827965');
    expect(result.valueStaked.toString()).toBe('56557319701755965');
  });
  it('adjusts the xSlpBalance', () => {
    expect(position.xSlpBalance.toString()).toBe('198809686783688845');
    expect(result.xSlpBalance.toString()).toBe('301285578823925439');
  });
  it('adjusts the slpBalance', () => {
    expect(position.slpBalance.toString()).toBe('762809774802693685');
    expect(result.slpBalance.toString()).toBe('865285666842930279');
  });
  it('adjusts the slpSupply', () => {
    expect(position.slpSupply.toString()).toBe('936291662031349969');
    expect(result.slpSupply.toString()).toBe('1038767554071586563');
  });
  it('adjusts the APRs', () => {
    expect(Math.floor(position.inventoryApr * 10000) / 10000).toBe(0.079);
    expect(Math.floor(position.liquidityApr * 10000) / 10000).toBe(0.0967);
    expect(Math.floor(result.inventoryApr * 10000) / 10000).toBe(0.079);
    expect(Math.floor(result.liquidityApr * 10000) / 10000).toBe(0.0833);
  });

  describe('when there is no liquidity', () => {
    let result: Position;
    beforeEach(() => {
      position = adjustPosition(position, {
        lpEth: Zero - position.liquidityEth,
        lpNft: Zero - position.liquidityTokens,
      });
      result = run();
    });

    it('adjusts the liquidity share', () => {
      expect(position.liquidityShare.toString()).toBe('0');
      expect(result.liquidityShare.toString()).toBe('95053302762792044');
    });
    it('adjusts the liquidity split', () => {
      expect(Math.floor(position.liquiditySplit * 10000) / 10000).toBe(0);
      expect(Math.floor(result.liquiditySplit * 10000) / 10000).toBe(0.9151);
    });
    it('adjusts the liquidity tokens', () => {
      expect(position.liquidityTokens.toString()).toBe('0');
      expect(result.liquidityTokens.toString()).toBe('2000000000000000000');
    });
    it('adjusts the liquidity eth', () => {
      expect(position.liquidityEth.toString()).toBe('0');
      expect(result.liquidityEth.toString()).toBe('9278350515464000');
    });
    it('adjusts the liquidity eth value', () => {
      expect(position.liquidityValue.toString()).toBe('0');
      expect(result.liquidityValue.toString()).toBe('18556701030928000');
    });
    it('adjusts the total value', () => {
      expect(position.totalValue.toString()).toBe('3175244263183944');
      expect(result.totalValue.toString()).toBe('21731945294111944');
    });
    it('adjusts the value staked', () => {
      expect(position.valueStaked.toString()).toBe('1733078193961315');
      expect(result.valueStaked.toString()).toBe('20289779224889315');
    });
    it('adjusts the xSlpBalance', () => {
      expect(position.xSlpBalance.toString()).toBe('0');
      expect(result.xSlpBalance.toString()).toBe('80123601418848767');
    });
    it('adjusts the slpBalance', () => {
      expect(position.slpBalance.toString()).toBe('564000088019004840');
      expect(result.slpBalance.toString()).toBe('644123689437853607');
    });
    it('adjusts the slpSupply', () => {
      expect(position.slpSupply.toString()).toBe('737481975247661124');
      expect(result.slpSupply.toString()).toBe('817605576666509891');
    });
    it('adjusts the APRs', () => {
      expect(Math.floor(position.inventoryApr * 10000) / 10000).toBe(0.079);
      expect(Math.floor(position.liquidityApr * 10000) / 10000).toBe(0.1393);
      expect(Math.floor(result.inventoryApr * 10000) / 10000).toBe(0.079);
      expect(Math.floor(result.liquidityApr * 10000) / 10000).toBe(0.0905);
    });
  });
});

describe('add liquidity (SLP)', () => {
  let result: Position;
  beforeEach(() => {
    slp = parseEther('0.5');
    result = run();
  });

  it('adjusts the liquidity share', () => {
    expect(position.liquidityShare.toString()).toBe('212337346198680636');
    expect(result.liquidityShare.toString()).toBe('553376843232682128');
  });
  it('adjusts the liquidity split', () => {
    expect(Math.floor(position.liquiditySplit * 10000) / 10000).toBe(0.9127);
    expect(Math.floor(result.liquiditySplit * 10000) / 10000).toBe(0.9865);
  });
  it('adjusts the liquidity tokens', () => {
    expect(position.liquidityTokens.toString()).toBe('3880126004770513556');
    expect(result.liquidityTokens.toString()).toBe('13638518735885803628');
  });
  it('adjusts the liquidity eth', () => {
    expect(position.liquidityEth.toString()).toBe('18133770238433325');
    expect(result.liquidityEth.toString()).toBe('63739622075430166');
  });
  it('adjusts the liquidity eth value', () => {
    expect(position.liquidityValue.toString()).toBe('36267540476866650');
    expect(result.liquidityValue.toString()).toBe('127479244150860332');
  });
  it('adjusts the total value', () => {
    expect(position.totalValue.toString()).toBe('39442784740050594');
    expect(result.totalValue.toString()).toBe('130654488414044276');
  });
  it('adjusts the value staked', () => {
    expect(position.valueStaked.toString()).toBe('38000618670827965');
    expect(result.valueStaked.toString()).toBe('129212322344821647');
  });
  it('adjusts the xSlpBalance', () => {
    expect(position.xSlpBalance.toString()).toBe('198809686783688845');
    expect(result.xSlpBalance.toString()).toBe('698809686783688845');
  });
  it('adjusts the slpBalance', () => {
    expect(position.slpBalance.toString()).toBe('762809774802693685');
    expect(result.slpBalance.toString()).toBe('1262809774802693685');
  });
  it('adjusts the slpSupply', () => {
    expect(position.slpSupply.toString()).toBe('936291662031349969');
    expect(result.slpSupply.toString()).toBe('1436291662031349969');
  });
  it('adjusts the APRs', () => {
    expect(Math.floor(position.inventoryApr * 10000) / 10000).toBe(0.079);
    expect(Math.floor(position.liquidityApr * 10000) / 10000).toBe(0.0967);
    expect(Math.floor(result.inventoryApr * 10000) / 10000).toBe(0.079);
    expect(Math.floor(result.liquidityApr * 10000) / 10000).toBe(0.0541);
  });
});

describe('do nothing', () => {
  let result: Position;
  beforeEach(() => {
    result = run();
  });

  it('returns the original position values', () => {
    expect(result).toEqual(position);
    expect(result).not.toBe(position);
  });
});
