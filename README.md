# nftxjs

## Development

1. do your changes in the nftx.js repo
2. run `yarn yalc`
   > this will publish each package in the repo (@nftx/core @nftx/react etc.) to the local yalc repository on your machine
3. head to <insert-app>
4. run `yalc add @nftx/<specific-nftxjs-package>` for each package you've changed
5. run `rm -rf node_modules .next && yarn install`
   > because of how yalc does its symlinking, yarn/npm doesn't realise that node_modules needs rebuilding so we have to manually wipe it
6. profit
