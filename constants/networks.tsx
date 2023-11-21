import ethereum from '@/public/images/networks/ethereum-eth-logo-diamond-purple.svg';
import polygon from '@/public/images/networks/polygon-matic-logo.svg';
import avalanche from '@/public/images/networks/avalanche-avax-logo.svg';
import binance from '@/public/images/networks/bnb-bnb-logo.svg';
import base from '@/public/images/networks/base-logo-in-blue.svg';
import optimism from '@/public/images/networks/optimism-logo.svg';
import arbitrum from '@/public/images/networks/arbitrum-arb-logo.svg';

export const IS_LOCAL =
  process.env.NEXT_PUBLIC_DEVELOPMENT_NODE_ENV === 'development';

const LOCAL_TESTNET_TOKENS = {
  dai: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  usdt: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  usdc: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
};

const POLYGON_MAINNET_TOKENS = {
  matic: '0x275617327c958bD06b5D6b871E7f491D76113dd8',
  dai: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  usdt: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  usdc: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
};

const POLYGON_TESTNET_TOKENS = {
  matic: '0xe9939e7Ea7D7fb619Ac57f648Da7B1D425832631',
  dai: '0x1ffB23bcDb711DB7356FEe9eE0F32cd93Dfd1943',
  usdt: '0xebc0815689fa529be40ef218c1ea798720c45301',
  usdc: '0xf3a9c4dd7fb14e4995da0828b2367888fe8d1de0',
};

const BINANCE_MAINNET_TOKENS = {
  dai: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
  usdt: '0x55d398326f99059fF775485246999027B3197955',
  usdc: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
};

const FANTOM_MAINNET_TOKENS = {
  dai: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
  usdt: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
  usdc: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
};
const AVALANCHE_MAINNET_TOKENS = {
  dai: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  usdt: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  usdc: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
};
const ETHEREUM_MAINNET_TOKENS = {
  dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
  usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  usdc: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
};

export const MATIC_MAINNET = {
  token: 'MATIC',
  label: 'Polygon',
  namespace: 'evm',
  id: '0x89',
  // rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
  rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET}`,
  wsUrl: `wss://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET}`,
  img: polygon,
  tokens: POLYGON_MAINNET_TOKENS,
  explorer: 'https://polygonscan.com/',
};
export const MATIC_TESTNET = {
  token: 'MATIC',
  label: 'Polygon - Mumbai',
  namespace: 'evm',
  id: '0x13881',
  // rpcUrl: `https://polygon-mumbai.blockpi.network/v1/rpc/public`,
  rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET}`,
  wsUrl: `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET}`,
  img: polygon,
  tokens: POLYGON_TESTNET_TOKENS,
  explorer: 'https://testnet.polygonscan.com/',
};
export const BINANCE_MAINNET = {
  token: 'BNB',
  label: 'Binance',
  namespace: 'evm',
  id: '0x38',
  rpcUrl: 'https://bsc-dataseed.binance.org/',
  img: binance,
  tokens: BINANCE_MAINNET_TOKENS,
  explorer: 'https://bscscan.com/',
};
export const BINANCE_TESTNET = {
  token: 'BNB',
  label: 'Binance Testnet',
  namespace: 'evm',
  id: '0x61',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  img: binance,
  tokens: LOCAL_TESTNET_TOKENS,
  explorer: 'https://testnet.bscscan.com/',
};
export const AVALANCHE_MAINNET = {
  token: 'AVAX',
  label: 'Avalanche Network',
  namespace: 'evm',
  id: '0xa86a',
  rpcUrl: 'https://snowtrace.io/',
  img: avalanche,
  tokens: AVALANCHE_MAINNET_TOKENS,
  explorer: 'https://snowtrace.io/',
};
export const AVALANCHE_TESTNET = {
  token: 'AVAX',
  label: 'Avalanche Testnet',
  namespace: 'evm',
  id: '0xa869',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
  img: avalanche,
  tokens: LOCAL_TESTNET_TOKENS,
  explorer: 'https://testnet.snowtrace.io/',
};
export const ETHEREUM_MAINNET = {
  token: 'ETH',
  label: 'Ethereum',
  namespace: 'evm',
  id: '0x1',
  rpcUrl:
    'https://eth-mainnet.g.alchemy.com/v2/Npzil9ZFOljBg0rfI5mjkCaj6Pwf5IWj',
  img: ethereum,
  tokens: ETHEREUM_MAINNET_TOKENS,
  explorer: 'https://etherscan.io/',
};
export const ETHEREUM_SEPOLIA = {
  token: 'ETH',
  label: 'Sepolia',
  namespace: 'evm',
  id: '0xaa36a7',
  rpcUrl:
    'https://eth-goerli.g.alchemy.com/v2/oQBY8Oxl5W-8UoX2CP7OtyokBNUB4PH_',
  img: ethereum,
  tokens: LOCAL_TESTNET_TOKENS,
  explorer: 'https://goerli.etherscan.io/',
};
// export const LOCAL_FORK = {
//   token: 'LOCAL',
//   label: 'Local Fork',
//   namespace: 'evm',
//   id: '0x7a69',
//   rpcUrl: 'http://127.0.0.1:8545',
//   img: ethereum,
//   tokens: LOCAL_TESTNET_TOKENS,
//   explorer: '',
// };
export const BASE_MAINNET = {
  token: 'BASE',
  label: 'Base',
  namespace: 'evm',
  id: '0x2105',
  rpcUrl: 'https://base.llamarpc.com',
  img: base,
  tokens: FANTOM_MAINNET_TOKENS, // TODO BEFORE PRODUCTION FOR BASE AND ADD AVALANCHE AND ARBITRUM + OPTIMISM
  explorer: 'https://basescan.org/',
};
export const BASE_TESTNET = {
  token: 'BASE',
  label: 'Base Testnet',
  namespace: 'evm',
  id: '0x14a33',
  rpcUrl: 'https://base-goerli.publicnode.com',
  img: base,
  tokens: LOCAL_TESTNET_TOKENS, // TODO BEFORE PRODUCTION FOR BASE AND ADD AVALANCHE AND ARBITRUM + OPTIMISM
  explorer: 'https://goerli.basescan.org/',
};
export const OPTIMISM_MAINNET = {
  token: 'OP',
  label: 'Optimism Mainnet',
  namespace: 'evm',
  id: '0xa',
  rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_MAINNET_RPC_URL!,
  img: optimism,
  tokens: FANTOM_MAINNET_TOKENS, // TODO BEFORE PRODUCTION FOR BASE AND ADD AVALANCHE AND ARBITRUM + OPTIMISM
  explorer: 'https://optimistic.etherscan.io/',
};
export const OPTIMISM_TESTNET = {
  token: 'OP',
  label: 'Optimism Testnet',
  namespace: 'evm',
  id: '0x1a4',
  rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_GOERLI_RPC_URL!,
  img: optimism,
  tokens: LOCAL_TESTNET_TOKENS, // TODO BEFORE PRODUCTION FOR BASE AND ADD AVALANCHE AND ARBITRUM + OPTIMISM
  explorer: 'https://sepolia-optimism.etherscan.io/',
};
export const ARBITRUM_MAINNET = {
  token: 'ARB',
  label: 'Arbitrum Mainnet',
  namespace: 'evm',
  id: '0xa4b1',
  rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_MAINNET_RPC_URL!,
  img: arbitrum,
  tokens: FANTOM_MAINNET_TOKENS, // TODO BEFORE PRODUCTION FOR BASE AND ADD AVALANCHE AND ARBITRUM + OPTIMISM
  explorer: 'https://arbiscan.io/',
};
export const ARBITRUM_TESTNET = {
  token: 'ARB',
  label: 'Arbitrum Testnet',
  namespace: 'evm',
  id: '0x66eed',
  rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_TESTNET_RPC_URL!,
  img: arbitrum,
  tokens: LOCAL_TESTNET_TOKENS, // TODO BEFORE PRODUCTION FOR BASE AND ADD AVALANCHE AND ARBITRUM + OPTIMISM
  explorer: 'https://nova.arbiscan.io/',
};

export const ALL_NETWORKS = [
  MATIC_MAINNET,
  MATIC_TESTNET,
  OPTIMISM_MAINNET,
  OPTIMISM_TESTNET,
  BINANCE_MAINNET,
  BINANCE_TESTNET,
  BASE_MAINNET,
  BASE_TESTNET,
  AVALANCHE_MAINNET,
  AVALANCHE_TESTNET,
  ARBITRUM_MAINNET,
  ARBITRUM_TESTNET,
  ETHEREUM_MAINNET,
  ETHEREUM_SEPOLIA,
  // LOCAL_FORK,
];

export const getNetworkImage = (chainId: string) => {
  let image;
  let label;
  try {
    for (let i = 0; i < ALL_NETWORKS.length; i += 1) {
      if (ALL_NETWORKS[i].id === chainId) {
        image = ALL_NETWORKS[i].img;
        label = ALL_NETWORKS[i].label;
      }
    }
    return { image, label };
  } catch (error) {
    console.log('error', error);
  }
  return { image, label };
};
