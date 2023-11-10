import type { Platform, CustomNetwork, Chain } from '@web3-onboard/common';
import {
  AccountCenter,
  ConnectedChain,
  ConnectOptions,
  WalletState,
  DisconnectOptions,
  Account,
} from '@web3-onboard/core/dist/types';
import { StaticImageData } from 'next/image';
import { ContractInterface } from '@ethersproject/contracts';
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

// blocknative types
export type CoinbaseWalletOptions = {
  darkMode: boolean; // default = false
};

export type WalletConnectOptions = {
  bridge?: string; // default = 'https://bridge.walletconnect.org'
  qrcodeModalOptions?: {
    mobileLinks: string[]; // set the order and list of mobile linking wallets
  };
  connectFirstChainId?: boolean; // if true, connects to the first network chain provided
};

export type GnosisOptions = {
  whitelistedDomains: RegExp[];
};

export type PortisOptions = {
  apiKey: string; // required
};

export type FortmaticOptions = {
  apiKey: string;
};

// LEDGER
export type LedgerOptions = {
  customNetwork?: CustomNetwork;
};

// TREZOR
export type TrezorOptions = {
  email: string;
  appUrl: string;
  customNetwork?: CustomNetwork;
  filter?: Platform[];
};

// SEQUENCE
export type SequenceOptions = {
  appName?: string;
  network?: number | string;
};

declare type SetChainOptions = {
  chainId: string;
  chainNamespace?: string;
  wallet?: WalletState['label'];
};

export type WalletInterface = {
  wallet: WalletState | null;
  ethersProvider: Web3Provider | null | undefined;
  account: Account | null;
  connect: (options?: ConnectOptions | undefined) => Promise<WalletState[]>;
  connecting: boolean;
  disconnect: (wallet: DisconnectOptions) => Promise<WalletState[]>;
  updateAccountCenter: (update: AccountCenter | Partial<AccountCenter>) => void;
  chains: Chain[];
  connectedChain: ConnectedChain | null;
  setChain: (options: SetChainOptions) => Promise<boolean>;
};

export type ContractInstantiation = {
  address: string;
  abi: ContractInterface;
  provider: Web3Provider;
};

export type WalletButtonProps = {
  img: StaticImageData;
  alt: string;
  altText: string;
  isLast: boolean;
  onClick: () => void;
};

export type WalletTokenAddressess = {
  [key: string]: string;
};

export const bnFrom = (number: BigNumber) => BigNumber.from(number).toString();
export const bnToNumber = (number: BigNumberish) =>
  BigNumber.from(number).toNumber();
export const toBN = (number: BigNumberish) => BigNumber.from(number);

export type CoinIconType = {
  size: number;
  svg: string;
  name: string;
  alt: string;
  extraClass?: string;
};
