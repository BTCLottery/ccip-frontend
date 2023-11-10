const getChainID = (network: string) => {
  let chainID;

  switch (network) {
    case 'ethereumMainnet':
      chainID = '0x1';
      break;
    case 'ethereumSepolia':
      chainID = '0xaa36a7';
      break;
    case 'ethereumGoerli':
      chainID = '0x5';
      break;
    case 'baseMainnet':
      chainID = '0x2105';
      break;
    case 'baseGoerli':
      chainID = '0x14a33';
      break;
    case 'optimismMainnet':
      chainID = '0xa';
      break;
    case 'optimismGoerli':
      chainID = '0x1a4';
      break;
    case 'arbitrumMainnet':
      chainID = '0xa4b1';
      break;
    case 'arbitrumGoerli':
      chainID = '0x66eed';
      break;
    case 'avalancheMainnet':
      chainID = '0xa86a';
      break;
    case 'avalancheFuji':
      chainID = '0xa869';
      break;
    case 'polygonMainnet':
      chainID = '0x89';
      break;
    case 'polygonMumbai':
      chainID = '0x13881';
      break;
    case 'binanceMainnet':
      chainID = '0x38';
      break;
    case 'binanceTestnet':
      chainID = '0x61';
      break;
    default:
      console.log(`Unknown network: ${network}`);
      chainID = '0x00';
  }

  if (!chainID)
    console.log(
      `chainID empty for network ${network} - check your environment variables`
    );
  return chainID;
};

export default getChainID;
