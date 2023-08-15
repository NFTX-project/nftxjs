import { buildWhere } from '..';

it('returns a string where clause for the given values', () => {
  const actual = buildWhere({
    date_gt: 0,
    alive: true,
  });

  const expected = `{ date_gt: 0, alive: true }`;

  expect(actual).toBe(expected);
});

it('removes null and undefined values', () => {
  const actual = buildWhere({
    date_gt: 0,
    alive: null,
    dead: undefined,
    operators: {
      in: null,
      is: null,
      gt: null,
    },
    deep: {
      child: null,
      childOperator: {
        in: undefined,
      },
    },
  });

  const expected = `{ date_gt: 0 }`;

  expect(actual).toBe(expected);
});

it('stringifies the values', () => {
  const actual = buildWhere({
    firstName: 'jimmy',
    lastName: 'mcgill',
  });

  const expected = `{ firstName: "jimmy", lastName: "mcgill" }`;

  expect(actual).toBe(expected);
});

it('stringifies bigints', () => {
  const actual = buildWhere({
    value: 100n,
  });

  const expected = `{ value: 100 }`;

  expect(actual).toBe(expected);
});

it('normalizes any address values', () => {
  const actual = buildWhere({
    id: '0xAB123FWeRG0f',
  });

  const expected = `{ id: "0xab123fwerg0f" }`;

  expect(actual).toBe(expected);
});

it('handles nested filters', () => {
  const actual = buildWhere({
    inputTokens: {
      id: '0x6F4D',
    },
    alreadySuffixed_: {
      id: '0x000',
    },
  });

  const expected = `{ inputTokens_: { id: "0x6f4d" }, alreadySuffixed_: { id: "0x000" } }`;

  expect(actual).toBe(expected);
});

it('handles arrays', () => {
  const actual = buildWhere({
    first_in: ['1', '2'],
    second: [3, 4],
    third: {
      nested: ['5'],
    },
  });

  const expected = `{ first_in: ["1","2"], second_in: [3,4], third_: { nested_in: ["5"] } }`;

  expect(actual).toBe(expected);
});
