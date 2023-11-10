export type AutomationKeeper = {
  registryAddress: string; // "0x02777053d6764996e594c3E88AF1D58D5363a2e6"
  registrarAddress: string; // "0xDb8e8e2ccb5C033938736aa89Fe4fa1eDfD15a1d"
  paymentPremiumPercentage: number; // 20
  blockCountPerTurn: number; // 10
  checkGasLimit: number; // 6500000
  performGasLimit: number; // 5000000
  gasCeilingMultipler: number; // 2
  minimumUpkeepSpend: number; // 0.1 LINK
};

export type ChainlinkAutomationConfig = {
  [id: string]: AutomationKeeper;
};

export const CHAINLINK_CONFIG: ChainlinkAutomationConfig = {
  '1': {
    registryAddress: '0x02777053d6764996e594c3E88AF1D58D5363a2e6',
    registrarAddress: '0xDb8e8e2ccb5C033938736aa89Fe4fa1eDfD15a1d',
    paymentPremiumPercentage: 20,
    blockCountPerTurn: 10,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 2,
    minimumUpkeepSpend: 0.1, // LINK
  },
  '11155111': {
    registryAddress: '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
    registrarAddress: '0x9a811502d843E5a03913d5A2cfb646c11463467A',
    paymentPremiumPercentage: 20,
    blockCountPerTurn: 100,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 3,
    minimumUpkeepSpend: 0.0, // LINK
  },
  '56': {
    registryAddress: '0x02777053d6764996e594c3E88AF1D58D5363a2e6',
    registrarAddress: '0xDb8e8e2ccb5C033938736aa89Fe4fa1eDfD15a1d',
    paymentPremiumPercentage: 30,
    blockCountPerTurn: 20,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 3,
    minimumUpkeepSpend: 0.1, // LINK
  },
  '97': {
    registryAddress: '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
    registrarAddress: '0x57A4a13b35d25EE78e084168aBaC5ad360252467',
    paymentPremiumPercentage: 30,
    blockCountPerTurn: 200,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 3,
    minimumUpkeepSpend: 0.0, // LINK
  },
  '137': {
    registryAddress: '0x02777053d6764996e594c3E88AF1D58D5363a2e6',
    registrarAddress: '0xDb8e8e2ccb5C033938736aa89Fe4fa1eDfD15a1d',
    paymentPremiumPercentage: 70,
    blockCountPerTurn: 40,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 3,
    minimumUpkeepSpend: 0.1, // LINK
  },
  '80001': {
    registryAddress: '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
    registrarAddress: '0x57A4a13b35d25EE78e084168aBaC5ad360252467',
    paymentPremiumPercentage: 429,
    blockCountPerTurn: 200,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 3,
    minimumUpkeepSpend: 0, // LINK
  },
  '43114': {
    registryAddress: '0x02777053d6764996e594c3E88AF1D58D5363a2e6',
    registrarAddress: '0xDb8e8e2ccb5C033938736aa89Fe4fa1eDfD15a1d',
    paymentPremiumPercentage: 40,
    blockCountPerTurn: 50,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 2,
    minimumUpkeepSpend: 0.1, // LINK
  },
  '43113': {
    registryAddress: '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
    registrarAddress: '0x57A4a13b35d25EE78e084168aBaC5ad360252467',
    paymentPremiumPercentage: 40,
    blockCountPerTurn: 200,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 2,
    minimumUpkeepSpend: 0, // LINK
  },
  '250': {
    registryAddress: '0x02777053d6764996e594c3E88AF1D58D5363a2e6',
    registrarAddress: '0xDb8e8e2ccb5C033938736aa89Fe4fa1eDfD15a1d',
    paymentPremiumPercentage: 50,
    blockCountPerTurn: 50,
    checkGasLimit: 6500000,
    performGasLimit: 3500000,
    gasCeilingMultipler: 4,
    minimumUpkeepSpend: 0.1, // LINK
  },
  '4002': {
    registryAddress: '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
    registrarAddress: '0x57A4a13b35d25EE78e084168aBaC5ad360252467',
    paymentPremiumPercentage: 50,
    blockCountPerTurn: 200,
    checkGasLimit: 6500000,
    performGasLimit: 3500000,
    gasCeilingMultipler: 2,
    minimumUpkeepSpend: 0, // LINK
  },
  '42161': {
    registryAddress: '0x75c0530885F385721fddA23C539AF3701d6183D4',
    registrarAddress: '0x4F3AF332A30973106Fe146Af0B4220bBBeA748eC',
    paymentPremiumPercentage: 50,
    blockCountPerTurn: 200,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 5,
    minimumUpkeepSpend: 0.1, // LINK
  },
  '421613': {
    registryAddress: '0x291093864bafc9aA517eF90ce954dD7D95D68C80',
    registrarAddress: '0x263ae9E522707D5A2B317026358d7f33ceC4ccc5',
    paymentPremiumPercentage: 50,
    blockCountPerTurn: 200,
    checkGasLimit: 6500000,
    performGasLimit: 5000000,
    gasCeilingMultipler: 5,
    minimumUpkeepSpend: 0.1, // LINK
  },
};
