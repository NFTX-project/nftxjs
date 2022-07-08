import { compareByAlpha, toLowerCase } from '../utils';
import { gql, querySubgraph } from '@nftx/subgraph';
import { transformFeeReceipt } from './fetchVaultActivity/common';
import type { VaultAddress, VaultFeeReceipt } from './types';
import { getChainConstant } from '../web3';
import config from '@nftx/config';

const fetchSingleVaultFees = async ({
  vaultAddress,
  fromTimestamp,
  network,
  retryCount = 0,
}: {
  vaultAddress: string;
  fromTimestamp: number;
  network: number;
  retryCount?: number;
}): Promise<VaultFeeReceipt[]> => {
  const query = gql`
    {
      vault(id: $vaultAddress) {
        feeReceipts(
          first: 1000
          where: { date_gt: $fromTimestamp }
          orderBy: date
          orderDirection: asc
        ) {
          transfers {
            amount
            to
          }
          date
        }
      }
    }
  `;

  try {
    const data = await querySubgraph<{
      vault: {
        feeReceipts: Array<{
          transfers: Array<{ amount: string; to: string }>;
          date: string;
        }>;
      };
    }>({
      url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
      query,
      variables: { vaultAddress, fromTimestamp },
    });

    let receipts =
      data?.vault?.feeReceipts?.map((receipt) => {
        return transformFeeReceipt(receipt, vaultAddress);
      }) ?? [];

    if (receipts.length === 1000) {
      const moreReceipts = await fetchVaultFees({
        network,
        vaultAddress,
        retryCount: 0,
        fromTimestamp: receipts[receipts.length - 1].date,
      });
      receipts = [...receipts, ...moreReceipts];
    }

    return receipts;
  } catch (e) {
    if (retryCount < 3) {
      return fetchSingleVaultFees({
        fromTimestamp,
        network,
        vaultAddress,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }
};

const fetchMultiVaultFees = async ({
  network,
  vaultAddresses,
  fromTimestamp,
  lastId = 0,
  retryCount = 0,
}: {
  network: number;
  vaultAddresses: VaultAddress[];
  fromTimestamp: number;
  lastId?: number;
  retryCount?: number;
}): Promise<VaultFeeReceipt[]> => {
  const query = gql`
    {
      vaults(
        first: 1000
        where: { id_in: $vaultAddresses, vaultId_gte: $lastId }
      ) {
        id
        vaultId
        feeReceipts(
          first: 1000
          where: { date_gt: $fromTimestamp }
          orderBy: date
          orderDirection: asc
        ) {
          transfers {
            amount
            to
          }
          date
        }
      }
    }
  `;

  try {
    const data = await querySubgraph<{
      vaults: Array<{
        id: string;
        vaultId: string;
        feeReceipts: Array<{
          transfers: Array<{ amount: string; to: string }>;
          date: string;
        }>;
      }>;
    }>({
      url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
      query,
      variables: {
        vaultAddresses: vaultAddresses
          .map(toLowerCase)
          .sort((a, b) => compareByAlpha(a, b)),
        lastId,
        fromTimestamp,
      },
    });

    const feeReceipts = await Promise.all(
      data?.vaults?.map(async (vault) => {
        let receipts = vault.feeReceipts.map((receipt) => {
          return transformFeeReceipt(receipt, vault.id);
        });
        if (receipts.length === 1000) {
          const moreReceipts = await fetchSingleVaultFees({
            network,
            vaultAddress: vault.id,
            fromTimestamp: receipts[receipts.length - 1].date,
          });
          receipts = [...receipts, ...moreReceipts];
        }
        return receipts;
      }) ?? []
    ).then((x) => x.flat());

    return feeReceipts;
  } catch (e) {
    if (retryCount < 3) {
      return fetchMultiVaultFees({
        fromTimestamp,
        network,
        vaultAddresses,
        lastId,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }
};

function fetchVaultFees(args: {
  network?: number;
  vaultAddress: VaultAddress;
  fromTimestamp?: number;
  retryCount?: number;
}): Promise<VaultFeeReceipt[]>;
function fetchVaultFees(args: {
  network?: number;
  vaultAddresses: VaultAddress[];
  fromTimestamp?: number;
  retryCount?: number;
}): Promise<VaultFeeReceipt[]>;
async function fetchVaultFees({
  network = config.network,
  vaultAddress,
  vaultAddresses,
  fromTimestamp = 0,
}: {
  network?: number;
  vaultAddress?: VaultAddress;
  vaultAddresses?: VaultAddress[];
  fromTimestamp?: number;
}) {
  const roundedTimestamp = fromTimestamp
    ? Math.floor(Math.round(fromTimestamp / 30) * 30)
    : undefined;

  if (vaultAddress) {
    return fetchSingleVaultFees({
      vaultAddress,
      fromTimestamp: roundedTimestamp,
      network,
    });
  }
  if (vaultAddresses?.length === 1) {
    return fetchSingleVaultFees({
      vaultAddress: vaultAddresses[0],
      fromTimestamp: roundedTimestamp,
      network,
    });
  }
  if (vaultAddresses?.length > 1) {
    return fetchMultiVaultFees({
      vaultAddresses,
      fromTimestamp: roundedTimestamp,
      network,
    });
  }
  return [];
}

export default fetchVaultFees;
