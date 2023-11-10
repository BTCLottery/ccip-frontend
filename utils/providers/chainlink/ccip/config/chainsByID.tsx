const getChainsByID = (network: string) => {
  let chainID;

  switch (network) {
    case '0x1':
      chainID ='ethereumMainnet'
      break;
    case '0xaa36a7':
      chainID = 'ethereumSepolia'
      break;
    case '0x5':
      chainID ='ethereumGoerli'
      break;
    case '0x2105':
      chainID = 'baseMainnet'
      break;
    case '0x14a33':
      chainID = 'baseGoerli'
      break;
    case '0xa':
      chainID = 'optimismMainnet'
      break;
    case '0x1a4':
      chainID = 'optimismGoerli'
      break;
    case '0xa4b1':
      chainID = 'arbitrumMainnet'
      break;
    case '0x66eed':
      chainID = 'arbitrumGoerli'
      break;
    case '0xa86a':
      chainID = 'avalancheMainnet'
      break;
    case '0xa869':
      chainID = 'avalancheFuji'
      break;
    case '0x89':
      chainID = 'polygonMainnet'
      break;
    case '0x13881':
      chainID = 'polygonMumbai'
      break;
    case '0x38':
      chainID = 'binanceMainnet'
      break;
    case '0x61':
      chainID = 'binanceTestnet'
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

export default getChainsByID;