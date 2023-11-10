export type WalletTokenAddressess = {
  [key: string]: string;
};

const ARBITRUM_MAINNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  link: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
  dai: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  usdt: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  usdc: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const ARBITRUM_TESTNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0x32d5D5978905d9c6c2D4C417F0E06Fe768a4FB5a',
  link: '0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28',
  dai: '0x1ffB23bcDb711DB7356FEe9eE0F32cd93Dfd1943',
  usdt: '0xebc0815689fa529be40ef218c1ea798720c45301',
  usdc: '0xf3a9c4dd7fb14e4995da0828b2367888fe8d1de0',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const isProduction = process.env.NODE_ENV === 'production';
export const arbitrumTokens = isProduction
  ? ARBITRUM_MAINNET_TOKENS
  : ARBITRUM_TESTNET_TOKENS;
