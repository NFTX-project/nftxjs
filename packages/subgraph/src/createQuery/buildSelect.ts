import ws from '../ws';

const buildNestedQuery = (value: any, tab: number) => {
  const valueStr = `${ws(tab)}${value}`;
  const valueParts = valueStr.split('\n');
  valueParts.shift();
  valueParts.pop();
  const final = valueParts.join(`\n${ws(tab)}`);
  return `${ws(tab)}${final}`;
};

const buildSelectObj = (obj: any, tab: number) => {
  const output: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === 'object' && '__isG' in value) {
      output.push(buildNestedQuery(value, tab));
      return;
    }

    output.push(ws(tab), key, '\n');

    if (value === true) {
      // all good
    } else if (Array.isArray(value)) {
      output.push(ws(tab), '{\n');
      output.push(buildSelectArr(value, tab + 1));
      output.push(ws(tab), '}\n');
    } else if (value && typeof value === 'object') {
      output.push(ws(tab), '{\n');
      output.push(buildSelectObj(value, tab + 1));
      output.push(ws(tab), '}\n');
    }
  });
  return output.join('');
};
const buildSelectArr = (arr: any[], tab: number) => {
  const output: string[] = [];

  arr.forEach((selectEl) => {
    if (typeof selectEl === 'string') {
      output.push(ws(tab), selectEl, '\n');
    } else if (typeof selectEl === 'object') {
      output.push(buildSelectObj(selectEl, tab));
    }
  });

  return output.join('');
};
const buildSelect = (obj: any, tab: number) => {
  if (obj == null) {
    throw new Error(
      'You must specify your "select" fields before making a query'
    );
  }
  if (Array.isArray(obj)) {
    return buildSelectArr(obj, tab);
  } else {
    return buildSelectObj(obj, tab);
  }
};

export default buildSelect;
