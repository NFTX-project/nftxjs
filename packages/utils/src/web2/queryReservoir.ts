import query from './query';

type Args = Omit<Parameters<typeof query>[0], 'url'> & {
  network?: number;
  path: string;
};

const queryReservoir = <T>(_args: Args): Promise<T> => {
  throw new Error("Reservoir has been decommissioned. Please use an alternative provider.")
};

export default queryReservoir;
