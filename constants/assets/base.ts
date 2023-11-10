export type WalletTokenAddressess = {
  [key: string]: string;
};

const BASE_MAINNET_TOKENS: WalletTokenAddressess = {
  nativeCoin:  "0xcA11bde05977b3631167028862bE2a173976CA11",
  wrappedCoin: "0x4200000000000000000000000000000000000006",
  link: "0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196",
  dai: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
  usdt: "0x0000000000000000000000000000000000000000",
  usdc: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  btclp: "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40"
};

const BASE_TESTNET_TOKENS: WalletTokenAddressess = {
  nativeCoin:  "0xcA11bde05977b3631167028862bE2a173976CA11",
  wrappedCoin: "0x4200000000000000000000000000000000000006",
  link: "0xd886e2286fd1073df82462ea1822119600af80b6",
  dai: "0x1ffB23bcDb711DB7356FEe9eE0F32cd93Dfd1943",
  usdt: "0x0000000000000000000000000000000000000000",
  usdc: "0xf3a9c4dd7fb14e4995da0828b2367888fe8d1de0",
  btclp: "0xbf9036529123de264bfa0fc7362fe25b650d4b16"
};

const isProduction = process.env.NODE_ENV === "production";
export const baseTokens = isProduction
  ? BASE_MAINNET_TOKENS
  : BASE_TESTNET_TOKENS;
