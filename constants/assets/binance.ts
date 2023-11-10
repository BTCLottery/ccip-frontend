export type WalletTokenAddressess = {
  [key: string]: string;
};

const BINANCE_MAINNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  link: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
  dai: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  usdt: '0x55d398326f99059ff775485246999027b3197955',
  usdc: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const BINANCE_TESTNET_TOKENS: WalletTokenAddressess = {
  nativeCoin: '0xcA11bde05977b3631167028862bE2a173976CA11',
  wrappedCoin: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  link: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
  dai: '0x1ffB23bcDb711DB7356FEe9eE0F32cd93Dfd1943',
  usdt: '0xebc0815689fa529be40ef218c1ea798720c45301',
  usdc: '0xf3a9c4dd7fb14e4995da0828b2367888fe8d1de0',
  btclp: '0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
};

const isProduction = process.env.NODE_ENV === 'production';
export const binanceTokens = isProduction
  ? BINANCE_MAINNET_TOKENS
  : BINANCE_TESTNET_TOKENS;
