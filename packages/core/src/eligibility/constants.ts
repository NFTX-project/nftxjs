import { BigNumber } from '@ethersproject/bignumber';
import { id } from '@ethersproject/hash';

export enum Rules {
  Merkle__5LetterWordENS = 'Merkle__5LetterWordENS',
}

export const TRANSFORMERS = {
  [Rules.Merkle__5LetterWordENS]: (leaf: string) =>
    BigNumber.from(id(leaf.toLowerCase())).toString(),
};

export const LEAVES = {
  [Rules.Merkle__5LetterWordENS]: [
    'robot',
    'sugar',
    'light',
    'cabin',
    'alarm',
    'adult',
    'thank',
    'fever',
    'allow',
    'place',
    'shine',
    'start',
    'brand',
    'union',
    'paper',
    'color',
    'black',
    'haunt',
    'grace',
    'range',
    'delay',
    'beard',
    'glove',
    'petty',
    'arrow',
    'close',
    'route',
    'catch',
    'plant',
    'world',
    'stamp',
    'shout',
    'glory',
    'class',
    'pupil',
    'stain',
    'tease',
    'seize',
    'favor',
    'shaft',
    'smoke',
    'rebel',
    'coast',
    'swarm',
    'grind',
    'tower',
    'spite',
    'trail',
    'theft',
    'deter',
  ],
};
