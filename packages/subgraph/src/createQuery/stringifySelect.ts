import { SelectFieldPrimitive } from './selectTypes';

const stringifySelect = (element: SelectFieldPrimitive): string => {
  if ((element as any).$type === 'query') {
    return (element as any).stringify();
  }
  const output: string[] = [];
  const { $alias, $fields, $name, $on } = element;
  if ($name) {
    if ($alias) {
      output.push($alias, ': ');
    }
    output.push($name);
  }
  if ($on) {
    output.push('... on ', $on, ' ');
  }
  if ($fields) {
    output.push('{\n', $fields.map(stringifySelect).join('\n'), '\n}');
  }
  return output.join('');
};

export default stringifySelect;
