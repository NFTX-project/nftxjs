import stakeLiquidity from '../stakeLiquidity';

describe('when staking a 721 NFT', () => {
  it.todo('estimates gas and fees');
  describe('when 1559 is available', () => {
    describe('when staking into a new pool', () => {
      it.todo('adds liquidity to the pool using gasLimit');
    });
    describe('when staking into an existing pool', () => {
      it.todo('adds liquidity to the pool using EIP-1559 fees');
    });
  });
  describe('when 1559 is not available', () => {
    describe('when staking into a new pool', () => {
      it.todo('adds liquidity to the pool');
    });
    describe('when staking into an existing pool', () => {
      it.todo('adds liquidity to the pool');
      it.todo('increases the gas price by 25%');
    });
  });
});

describe('when staking an 1155 NFT', () => {
  it.todo('estimates gas and fees');
  describe('when 1559 is available', () => {
    describe('when staking into a new pool', () => {
      it.todo('adds liquidity to the pool without EIP-1559 fees');
    });
    describe('when staking into an existing pool', () => {
      it.todo('adds liquidity to the pool with EIP-1559 fees');
    });
  });
  describe('when 1559 is not available', () => {
    it.todo('adds liquidity to the pool without EIP-1559 fees');
  });
});
