const getProviderRpcUrl = (network: string) => {
  let rpcUrl;

  switch (network) {
    case 'ethereumMainnet':
      rpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_RPC_URL;
      break;
    case 'ethereumSepolia':
      rpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_RPC_URL;
      break;
    case 'ethereumGoerli':
      rpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_GOERLI_RPC_URL;
      break;
    case 'baseMainnet':
      rpcUrl = process.env.NEXT_PUBLIC_BASE_MAINNET_RPC_URL;
      break;
    case 'baseGoerli':
      rpcUrl = process.env.NEXT_PUBLIC_BASE_TESTNET_RPC_URL;
      break;
    case 'optimismMainnet':
      rpcUrl = process.env.NEXT_PUBLIC_OPTIMISM_MAINNET_RPC_URL;
      break;
    case 'optimismGoerli':
      rpcUrl = process.env.NEXT_PUBLIC_OPTIMISM_GOERLI_RPC_URL;
      break;
    case 'arbitrumGoerli':
      rpcUrl = process.env.NEXT_PUBLIC_ARBITRUM_TESTNET_RPC_URL;
      break;
    case 'avalancheMainnet':
      rpcUrl = process.env.NEXT_PUBLIC_AVALANCHE_MAINNET_RPC_URL;
      break;
    case 'avalancheFuji':
      rpcUrl = process.env.NEXT_PUBLIC_AVALANCHE_FUJI_RPC_URL;
      break;
    case 'polygonMainnet':
      rpcUrl = process.env.NEXT_PUBLIC_POLYGON_MAINNET_RPC_URL;
      break;
    case 'polygonMumbai':
      rpcUrl = process.env.NEXT_PUBLIC_POLYGON_MUMBAI_RPC_URL;
      break;
    case 'binanceMainnet':
      rpcUrl = process.env.NEXT_PUBLIC_BINANCE_MAINNET_RPC_URL;
      break;
    case 'binanceTestnet':
      rpcUrl = process.env.NEXT_PUBLIC_BINANCE_TESTNET_RPC_URL;
      break;
    default:
      console.log(`Unknown network: ${network}`);
  }

  if (!rpcUrl)
    console.log(
      `rpcUrl empty for network ${network} - check your environment variables`
    );
  return rpcUrl;
};

const getPrivateKey = () => {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey)
    console.log('private key not provided - check your environment variables');
  return privateKey;
};

const env = {
  getPrivateKey,
  getProviderRpcUrl,
};

export default env;
