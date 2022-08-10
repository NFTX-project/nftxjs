import { ENS_REGISTRAR } from '@nftx/constants';
import EnsRegistrarAbi from '@nftx/constants/abis/BaseRegistrarImplementation.json';
import type { Provider } from '@ethersproject/providers';
import type { Asset } from '../assets';
import { getChainConstant, getContract } from '../web3';
import type { BigNumber } from '@ethersproject/bignumber';
import { Rules } from './constants';

type Props = {
  asset: Asset;
  provider: Provider;
  network: number;
  leaves: string[];
};

const merkleTests = {
  DEFAULT: async ({ asset, leaves }: Props) => {
    return leaves.includes(asset.tokenId);
  },
  [Rules.Merkle__10kClubENS]: async ({
    asset,
    leaves,
    network,
    provider,
  }: Props) => {
    const isValidLeaf = leaves.includes(asset.tokenId);

    if (!isValidLeaf) {
      return false;
    }

    try {
      const contract = getContract({
        network,
        provider,
        address: getChainConstant(ENS_REGISTRAR, network),
        abi: EnsRegistrarAbi,
      });

      const expires: BigNumber = await contract.nameExpires(asset.tokenId);
      const inOneYear = Math.floor(Date.now() / 1000 + 31536000);

      return expires.gt(inOneYear);
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};

export default merkleTests;
