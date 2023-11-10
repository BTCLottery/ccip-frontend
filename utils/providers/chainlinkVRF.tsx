export type KeyHashes = { [price: string]: string };

export type VRFWrapper = {
  address: string;
  maxRandomNumbers: number;
  premium: string | number;
};

interface VRFSubscription extends VRFWrapper {
  maxGasLimit: number;
  keyHashes: KeyHashes;
}

export type ChainlinkVRFConfig = {
  [id: string]: {
    name: string;
    LINK_Token: string;
    VRF_Wrapper: VRFWrapper;
    VRF_Coordinator: VRFSubscription;
    minConfirmations: number;
    maxConfirmations: number;
    wrapperGasOverhead: number;
    coordinatorGasOverhead: number;
  };
};

export const CHAINLINK_CONFIG: ChainlinkVRFConfig = {
  '1': {
    name: 'Ethereum Mainnet',
    LINK_Token: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    VRF_Wrapper: {
      address: '0x5A861794B927983406fCE1D062e00b9368d97Df6',
      maxRandomNumbers: 10,
      premium: 0.25,
    },
    VRF_Coordinator: {
      address: '0x271682DEB8C4E0901D1a1550aD2e64D568E69909',
      maxRandomNumbers: 500,
      premium: 0.25,
      maxGasLimit: 2500000,
      keyHashes: {
        '200':
          '0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef',
        '500':
          '0xff8dedfbfa60af186cf3c830acbc32c05aae823045ae5ea7da1e45fbfaba4f92',
        '1000':
          '0x9fe0eebf5e446e3c998ec9bb19951541aee00bb90ea201ae456421a2ded86805',
      },
    },
    minConfirmations: 3,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '11155111': {
    name: 'Sepolia testnet',
    LINK_Token: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
    VRF_Wrapper: {
      address: '0xab18414CD93297B0d12ac29E63Ca20f515b3DB46',
      maxRandomNumbers: 10,
      premium: 0.25,
    },
    VRF_Coordinator: {
      address: '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625',
      maxRandomNumbers: 500,
      premium: 0.25,
      keyHashes: {
        '30': '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 3,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '56': {
    name: 'BNB Chain',
    LINK_Token: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
    VRF_Wrapper: {
      address: '0x721DFbc5Cfe53d32ab00A9bdFa605d3b8E1f3f42',
      maxRandomNumbers: 10,
      premium: 0.005, // LINK
    },
    VRF_Coordinator: {
      address: '0xc587d9053cd1118f25F645F9E08BB98c9712A4EE',
      maxRandomNumbers: 500,
      premium: 0.005, // LINK
      keyHashes: {
        '200':
          '0x114f3da0a805b6a67d6e9cd2ec746f7028f1b7376365af575cfea3550dd1aa04',
        '500':
          '0xba6e730de88d94a5510ae6613898bfb0c3de5d16e609c5b7da808747125506f7',
        '1000':
          '0x17cd473250a9a479dc7f234c64332ed4bc8af9e8ded7556aa6e66d83da49f470',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 3,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '97': {
    name: 'BNB Chain Testnet',
    LINK_Token: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
    VRF_Wrapper: {
      address: '0x699d428ee890d55D56d5FC6e26290f3247A762bd',
      maxRandomNumbers: 10,
      premium: 0.005, // LINK
    },
    VRF_Coordinator: {
      address: '0x6A2AAd07396B36Fe02a22b33cf443582f682c82f',
      maxRandomNumbers: 500,
      premium: 0.005, // LINK
      keyHashes: {
        '50': '0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 3,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '137': {
    name: 'Polygon Mainnet',
    LINK_Token: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
    VRF_Wrapper: {
      address: '0x4e42f0adEB69203ef7AaA4B7c414e5b1331c14dc',
      maxRandomNumbers: 10,
      premium: 0.0005, // LINK
    },
    VRF_Coordinator: {
      address: '0xAE975071Be8F8eE67addBC1A82488F1C24858067',
      maxRandomNumbers: 500,
      premium: 0.0005, // LINK
      keyHashes: {
        '200':
          '0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93',
        '500':
          '0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd',
        '1000':
          '0xd729dc84e21ae57ffb6be0053bf2b0668aa2aaf300a2a7b2ddf7dc0bb6e875a8',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 3,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '80001': {
    name: 'Polygon Mumbai Testnet',
    LINK_Token: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    VRF_Wrapper: {
      address: '0x99aFAf084eBA697E584501b8Ed2c0B37Dd136693',
      maxRandomNumbers: 10,
      premium: 0.0005, // LINK
    },
    VRF_Coordinator: {
      address: '0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed',
      maxRandomNumbers: 500,
      premium: 0.0005, // LINK
      keyHashes: {
        '500':
          '0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 3,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '43114': {
    name: 'Avalanche Mainnet',
    LINK_Token: '0x5947BB275c521040051D82396192181b413227A3',
    VRF_Wrapper: {
      address: '0x721DFbc5Cfe53d32ab00A9bdFa605d3b8E1f3f42',
      maxRandomNumbers: 10,
      premium: 0.005, // LINK
    },
    VRF_Coordinator: {
      address: '0xd5D517aBE5cF79B7e95eC98dB0f0277788aFF634',
      maxRandomNumbers: 500,
      premium: 0.005, // LINK
      keyHashes: {
        '200':
          '0x83250c5584ffa93feb6ee082981c5ebe484c865196750b39835ad4f13780435d',
        '500':
          '0x89630569c9567e43c4fe7b1633258df9f2531b62f2352fa721cf3162ee4ecb46',
        '1000':
          '0x06eb0e2ea7cca202fc7c8258397a36f33d88568d2522b37aaa3b14ff6ee1b696',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 1,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '43113': {
    name: 'Avalanche FUJI Testnet',
    LINK_Token: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
    VRF_Wrapper: {
      address: '0x9345AC54dA4D0B5Cda8CB749d8ef37e5F02BBb21',
      maxRandomNumbers: 10,
      premium: 0.005, // LINK
    },
    VRF_Coordinator: {
      address: '0x2eD832Ba664535e5886b75D64C46EB9a228C2610',
      maxRandomNumbers: 500,
      premium: 0.005, // LINK
      keyHashes: {
        '300':
          '0x354d2f95da55398f44b7cff77da56283d9c6c829a4bdf1bbcaf2ad6a4d081f61',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 1,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '250': {
    name: 'Fantom Mainnet',
    LINK_Token: '0x6F43FF82CCA38001B6699a8AC47A2d0E66939407',
    VRF_Wrapper: {
      address: '0xeDA5B00fB33B13c730D004Cf5D1aDa1ac191Ddc2',
      maxRandomNumbers: 10,
      premium: 0.0005, // LINK
    },
    VRF_Coordinator: {
      address: '0xd5D517aBE5cF79B7e95eC98dB0f0277788aFF634',
      maxRandomNumbers: 500,
      premium: 0.0005, // LINK
      keyHashes: {
        '4000':
          '0xb4797e686f9a1548b9a2e8c68988d74788e0c4af5899020fb0c47784af76ddfa',
        '10000':
          '0x5881eea62f9876043df723cf89f0c2bb6f950da25e9dfe66995c24f919c8f8ab',
        '20000':
          '0x64ae04e5dba58bc08ba2d53eb33fe95bf71f5002789692fe78fb3778f16121c9',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 1,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '4002': {
    name: 'Fantom Testnet',
    LINK_Token: '0xfaFedb041c0DD4fA2Dc0d87a6B0979Ee6FA7af5F',
    VRF_Wrapper: {
      address: '0x38336BDaE79747a1d2c4e6C67BBF382244287ca6',
      maxRandomNumbers: 10,
      premium: 0.0005, // LINK
    },
    VRF_Coordinator: {
      address: '0xbd13f08b8352A3635218ab9418E340c60d6Eb418',
      maxRandomNumbers: 500,
      premium: 0.0005, // LINK
      keyHashes: {
        '3000':
          '0x121a143066e0f2f08b620784af77cccb35c6242460b4a8ee251b4b416abaebd4',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 1,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '42161': {
    name: 'Arbitrum One Mainnet',
    LINK_Token: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
    VRF_Wrapper: {
      address: '0x2D159AE3bFf04a10A355B608D22BDEC092e934fa',
      maxRandomNumbers: 10,
      premium: 0.005, // LINK
    },
    VRF_Coordinator: {
      address: '0x41034678D6C633D8a95c75e1138A360a28bA15d1',
      maxRandomNumbers: 500,
      premium: 0.005, // LINK
      keyHashes: {
        '2': '0x08ba8f62ff6c40a58877a106147661db43bc58dabfb814793847a839aa03367f',
        '30': '0x72d2b016bb5b62912afea355ebf33b91319f828738b111b723b78696b9847b63',
        '150':
          '0x68d24f9a037a649944964c2a1ebd0b2918f4a243d2a99701cc22b548cf2daff0',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 1,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
  '421613': {
    name: 'Arbitrum Goerli Testnet',
    LINK_Token: '0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28',
    VRF_Wrapper: {
      address: '0x674Cda1Fef7b3aA28c535693D658B42424bb7dBD',
      maxRandomNumbers: 10,
      premium: 0.005, // LINK
    },
    VRF_Coordinator: {
      address: '0x6D80646bEAdd07cE68cab36c27c626790bBcf17f',
      maxRandomNumbers: 500,
      premium: 0.005, // LINK
      keyHashes: {
        '50': '0x83d1b6e3388bed3d76426974512bb0d270e9542a765cd667242ea26c0cc0b730',
      },
      maxGasLimit: 2500000,
    },
    minConfirmations: 1,
    maxConfirmations: 200,
    wrapperGasOverhead: 40000,
    coordinatorGasOverhead: 90000,
  },
};

export function getConfigByNetworkID(chainID: number) {
  return CHAINLINK_CONFIG[chainID];
}

export function getKeyHashesByNetworkID(
  chainID: number
): { [price: string]: string } | null {
  const config = CHAINLINK_CONFIG[chainID];
  if (config && config.VRF_Coordinator.keyHashes) {
    return config.VRF_Coordinator.keyHashes;
  }
  return null;
}

export function getKeyHashesByChainID(
  chainID: number,
  price?: string
): KeyHashes | string | null {
  const config = CHAINLINK_CONFIG[chainID];

  if (!config) {
    console.error(`No configuration found for chainID: ${chainID}`);
    return null;
  }

  if (price) {
    return config.VRF_Coordinator.keyHashes[price] || null;
  }

  return config.VRF_Coordinator.keyHashes;
}