import config from '@nftx/config';
import { gql, type querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';

type QuerySubgraph = typeof querySubgraph;

/**
 * The aggregated fee value is a weird big number + decimal string
 * BigNumber can't parse decimal strings (the whole point is that you pass it a big number instead of a decimal number)
 * So we need to massage it first...
 */
export const parseAggregatedFee = (value: `${number}` | undefined) => {
  return BigInt(Math.floor(Number(value || '0')).toString());
};

/** Creates the HEX equivalent of a vault id as some subgraphs store the vault id as a hex number instead */
export const createHexVaultId = (vaultId: string) => {
  return ['0x', Number(vaultId).toString(16)].join('');
};

// The ID is made up of hex-encoded vault id + user address + isInventory flag
export const createId = (
  vaultId: string,
  userAddress: string,
  type: 'lp' | 'ip'
) => {
  const vault = createHexVaultId(vaultId);
  const suffix = type === 'ip' ? '0x1' : '0x0';

  return [vault, userAddress, suffix].join('-');
};

export default ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  /** Fetch the lifetime fees a user has earned for a given vault */
  async function fetchLifetimeFees({
    vaultId,
    userAddress,
    network = config.network,
  }: {
    vaultId: string;
    userAddress: string;
    network?: number;
  }) {
    type Response = {
      inventory: {
        aggregatedVaultFees: `${number}`;
      };
      liquidity: {
        aggregatedVaultFees: `${number}`;
      };
    };

    const query = gql<Response>`
      {
        inventory: userVaultFeeAggregate(id: $ipId) {
          aggregatedVaultFees
        }
        liquidity: userVaultFeeAggregate(id: $lpId) {
          aggregatedVaultFees
        }
      }
    `;

    const response = await querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_FEE_TRACKER_SUBGRAPH, network),
      query,
      variables: {
        ipId: createId(vaultId, userAddress, 'ip'),
        lpId: createId(vaultId, userAddress, 'lp'),
      },
    });

    const lifetimeInventory = parseAggregatedFee(
      response?.inventory?.aggregatedVaultFees
    );
    const lifetimeLiquidity = parseAggregatedFee(
      response?.liquidity?.aggregatedVaultFees
    );

    return { lifetimeInventory, lifetimeLiquidity };
  };
