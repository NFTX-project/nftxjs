const fs = require('fs');
const { Interface, FormatTypes } = require('ethers/lib/utils');

const files = fs.readdirSync('./src/json');

files.forEach((file) => {
  const json = require(`./src/json/${file}`);
  const iface = new Interface(json);
  const abi = iface.format(FormatTypes.full);
  fs.writeFileSync(`./src/abis/${file}`, JSON.stringify(abi, null, 2), 'utf-8');
});
