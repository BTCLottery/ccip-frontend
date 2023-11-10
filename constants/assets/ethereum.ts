export type WalletTokenAddressess = {
  [key: string]: string;
};

const ETHEREUM_MAINNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  link: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
  usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const ETHEREUM_TESTNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534',
  link: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
  dai: '0x1ffB23bcDb711DB7356FEe9eE0F32cd93Dfd1943',
  usdt: '0xebc0815689fa529be40ef218c1ea798720c45301',
  usdc: '0xf3a9c4dd7fb14e4995da0828b2367888fe8d1de0',
  btclp: '0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05',
};

const isProduction = process.env.NODE_ENV === 'production';
export const ethereumTokens = isProduction
  ? ETHEREUM_MAINNET_TOKENS
  : ETHEREUM_TESTNET_TOKENS;
