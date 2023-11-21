import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import trezorModule from '@web3-onboard/trezor';
import ledgerModule from '@web3-onboard/ledger';
import walletConnectModule from '@web3-onboard/walletconnect';
import coinbaseModule from '@web3-onboard/coinbase';
import portisModule from '@web3-onboard/portis';
import fortmaticModule from '@web3-onboard/fortmatic';
import torusModule from '@web3-onboard/torus';
import keepkeyModule from '@web3-onboard/keepkey';
import gnosisModule from '@web3-onboard/gnosis';
import trustModule from '@web3-onboard/trust';
import keystoneModule from '@web3-onboard/keystone';
import magicModule from '@web3-onboard/magic';
import dcentModule from '@web3-onboard/dcent';
import infinityWalletModule from '@web3-onboard/infinity-wallet';
// import frontierModule from '@web3-onboard/frontier';
// import web3authModule from '@web3-onboard/web3auth';
// import { Web3AuthCore } from "@web3auth/core";
// import sequenceModule from '@web3-onboard/sequence';
import tallyModule from '@web3-onboard/tallyho';
import { Chain } from '@web3-onboard/common/dist/types';
import {
  CoinbaseWalletOptions,
  WalletConnectOptions,
  GnosisOptions,
  PortisOptions,
  FortmaticOptions,
  LedgerOptions,
  SequenceOptions,
  TrezorOptions,
} from '@/utils/types/wallet';
import blocknativeIcon from '@/public/icons/BTCLP-White-Logo';
import { IS_LOCAL } from '@/constants/networks';

const coinbase = coinbaseModule({ darkMode: true } as CoinbaseWalletOptions);

const walletConnect = walletConnectModule({
  dappUrl: 'https://btclottery.io',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT!,
  version: 2,
});

// a22327f639737c619f1447456c230678 project ID

// const walletConnectV2 = walletConnectModule({
//   connectFirstChainId: true,
//   version: 2,
//   projectId: 'c6bd41e4f2e0066a85cb7df1c4723929',
//   qrcodeModalOptions: {
//   mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
//   // mobileLinks: ['metamask', 'argent', 'trust',]
//   }
// })

// const portis = portisModule({
//   apiKey: process.env.NEXT_PUBLIC_PORTIS_ID || '',
// } as PortisOptions);

// const fortmatic = fortmaticModule({
//   apiKey: process.env.NEXT_PUBLIC_FORMATIC_ID || '',
// } as FortmaticOptions);

// const magic = magicModule({
//   apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY || '',
// });

// const ledger = ledgerModule();
// const gnosis = gnosisModule({} as GnosisOptions);
// const sequence = sequenceModule({} as SequenceOptions);
const trezor = trezorModule({
  email: 'support@btclottery.io',
  appUrl: 'https://www.btclottery.io',
} as TrezorOptions);

const injected = injectedModule();
const torus = torusModule();
const keepkey = keepkeyModule();
const tally = tallyModule();
// const web3auth = new Web3AuthCore({
//   chainConfig: {
//     chainNamespace: CHAIN_NAMESPACES.OTHER,
//     chainId: '0x1'
//   },
//   clientId: process.env.NEXT_PUBLIC_WEB3AUTH_ID || '',
// });

const infinityWallet = infinityWalletModule();
const trust = trustModule();
const keystone = keystoneModule();
const dcent = dcentModule();
// const frontier = frontierModule();

const wallets = [
  infinityWallet,
  injected,
  trust,
  walletConnect,
  // ledger,
  trezor,
  // web3auth,
  tally,
  coinbase,
  // gnosis,
  keepkey,
  torus,
  keystone,
  // fortmatic,
  // portis,
  // magic,
  dcent,
  // sequence,
  // frontier,
];

const mainnetChains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum',
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env
      .NEXT_PUBLIC_ALCHEMY_ETHEREUM_MAINNET!}`,
  },
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Polygon',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
  },
  {
    id: '0xa86a',
    token: 'AVAX',
    label: 'Avalanche',
    rpcUrl: 'https://snowtrace.io/',
  },
  {
    id: '0xa',
    token: 'OP',
    label: 'Optimism',
    rpcUrl: 'https://optimism.meowrpc.com',
  },
  {
    id: '0xa4b1',
    token: 'ARB',
    label: 'Arbitum Mainnet',
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_MAINNET_RPC_URL!,
  },
  {
    id: '0x2105',
    token: 'BASE',
    label: 'Base',
    rpcUrl: 'https://base.meowrpc.com',
  },
];

const testnetChains = [
  {
    id: '0xaa36a7',
    token: 'ETH',
    label: 'Sepolia Testnet',
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env
      .NEXT_PUBLIC_ALCHEMY_ETHEREUM_SEPOLIA!}`,
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Polygon Mumbai',
    rpcUrl: 'https://polygon-mumbai-pokt.nodies.app',
  },
  {
    id: '0x61',
    token: 'BNB',
    label: 'Binance Testnet',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
  },
  {
    id: '0xa869',
    token: 'AVAX',
    label: 'Avalanche Testnet',
    rpcUrl: 'https://snowtrace.io/',
  },
  {
    id: '0x1a4',
    token: 'OP',
    label: 'Optimism Testnet',
    rpcUrl: 'https://optimism-goerli.publicnode.com',
  },
  {
    id: '0x66eed',
    token: 'ARB',
    label: 'Arbitrum Testnet',
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_TESTNET_RPC_URL!,
  },
  {
    id: '0x14a33',
    token: 'BASE',
    label: 'Base Testnet',
    rpcUrl: 'https://base-goerli.publicnode.com',
  },
  // {
  //   id: 31337,
  //   token: 'LOCAL',
  //   label: 'Mainnet Fork',
  //   rpcUrl: 'http://127.0.0.1:8545',
  // },
];

const liveChains = IS_LOCAL ? testnetChains : mainnetChains;

const chains = [
  ...liveChains,
  // ...mainnetChains,
  // ...testnetChains
] as Chain[];

const blockNativeProvider = init({
  connect: {
    autoConnectAllPreviousWallet: true,
  },
  wallets,
  chains,
  appMetadata: {
    name: 'Bitcoin Lottery Protocol',
    icon: blocknativeIcon,
    logo: blocknativeIcon,
    description:
      'Bitcoin Lottery bridges the gap between players and game creators with trustless randomization games and generators.',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    ],
    agreement: {
      version: '1.0.0',
      termsUrl: 'https://www.btclottery.io/terms-and-conditions',
      privacyUrl: 'https://www.btclottery.io/privacy-policy',
    },
    gettingStartedGuide: 'https://docs.btclottery.io',
    explore: 'https://btclottery.io',
  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: false,
    },
    mobile: {
      position: 'topRight',
      enabled: true,
      minimal: false,
    },
  },
  theme: 'dark',
});

export default blockNativeProvider;
