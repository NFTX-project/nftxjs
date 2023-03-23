const fs = require('fs');
const { Interface, FormatTypes } = require('ethers/lib/utils');

const files = fs.readdirSync('./src/abis');

const output = files.map((file) => {
  const name = file.split('.')[0];
  const abi = require(`./src/abis/${file}`);
  const iface = new Interface(abi);
  const json = JSON.parse(iface.format(FormatTypes.json));
  json.forEach((item) => {
    if (!item.stateMutability) {
      switch (item.type) {
        case 'function':
        case 'constructor':
          item.stateMutability = item.constant
            ? 'view'
            : item.payable
            ? 'payable'
            : 'nonpayable';
          break;
        default:
          item.stateMutability = 'view';
          break;
      }
    }
  });
  const result = `export const ${name} = ${JSON.stringify(json)} as const`;

  return result;
});

fs.writeFileSync(`./src/index.ts`, output.join('\n\n'), 'utf8');
