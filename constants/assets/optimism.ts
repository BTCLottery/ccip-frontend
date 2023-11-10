export type WalletTokenAddressess = {
  [key: string]: string;
};

const OPTIMISM_MAINNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0x4200000000000000000000000000000000000006',
  link: '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
  dai: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  usdt: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
  usdc: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const OPTIMISM_TESTNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0x4200000000000000000000000000000000000006',
  link: '0xdc2CC710e42857672E7907CF474a69B63B93089f',
  dai: '0x1ffB23bcDb711DB7356FEe9eE0F32cd93Dfd1943',
  usdt: '0xebc0815689fa529be40ef218c1ea798720c45301',
  usdc: '0xf3a9c4dd7fb14e4995da0828b2367888fe8d1de0',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const isProduction = process.env.NODE_ENV === 'production';
export const optimismTokens = isProduction
  ? OPTIMISM_MAINNET_TOKENS
  : OPTIMISM_TESTNET_TOKENS;
