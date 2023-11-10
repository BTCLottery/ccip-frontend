export type WalletTokenAddressess = {
  [key: string]: string;
};

const AVALANCHE_MAINNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  link: '0x5947BB275c521040051D82396192181b413227A3',
  dai: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
  usdt: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
  usdc: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const AVALANCHE_TESTNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  link: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
  dai: '0x1ffB23bcDb711DB7356FEe9eE0F32cd93Dfd1943',
  usdt: '0xebc0815689fa529be40ef218c1ea798720c45301',
  usdc: '0xf3a9c4dd7fb14e4995da0828b2367888fe8d1de0',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const isProduction = process.env.NODE_ENV === 'production';
export const avalancheTokens = isProduction
  ? AVALANCHE_MAINNET_TOKENS
  : AVALANCHE_TESTNET_TOKENS;
