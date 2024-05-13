const prettyFormat = (str: string) => {
  let indent = 0;
  const lines = str.split('\n').filter(Boolean);

  const text = lines
    .map((line) => {
      if (line.includes('}')) {
        indent -= 2;
      }
      if (line.includes(')')) {
        indent -= 2;
      }
      if (line.includes(']')) {
        indent -= 2;
      }

      const newline = ' '.repeat(indent) + line;

      if (line.includes('{')) {
        indent += 2;
      }
      if (line.includes('(')) {
        indent += 2;
      }
      if (line.includes('[')) {
        indent += 2;
      }

      return newline;
    })
    .join('\n');

  return text;
};

export default prettyFormat;
