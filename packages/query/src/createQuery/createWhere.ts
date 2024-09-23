import type { Where, WhereStatements, WhereStatement } from './whereTypes';

const createWhereField = (fieldName: string) => {
  const createOperator =
    (operator: string) =>
    (v: any): WhereStatement => {
      if (typeof v === 'function') {
        v = v(createWhere());
      }
      return [fieldName, operator, v];
    };
  const whereField: any = createOperator('is');
  whereField.is = whereField;
  whereField.ne = createOperator('ne');
  whereField.not = createOperator('not');
  whereField.gt = createOperator('gt');
  whereField.gte = createOperator('gte');
  whereField.lt = createOperator('lt');
  whereField.lte = createOperator('lte');
  whereField.in = createOperator('in');
  whereField.nin = createOperator('nin');
  whereField.notIn = createOperator('notIn');
  whereField.contains = createOperator('contains');

  return whereField;
};

export const createConjuctionField = (conjunction: string) => {
  return (...statements: WhereStatements): WhereStatement => {
    return [conjunction, 'conj', statements];
  };
};

const createWhere = <Def>(): Where<Def> => {
  const proxy: any = new Proxy(
    {},
    {
      get(_, fieldName: string) {
        switch (fieldName) {
          case '$type':
            return 'where';
          case 'and':
          case 'or':
            return createConjuctionField(fieldName);
          default:
            return createWhereField(fieldName);
        }
      },
    }
  );

  return proxy;
};

export default createWhere;
