import { BigNumber, ethers } from 'ethers';

export interface TransferDetails {
  ethersProvider: ethers.providers.Web3Provider | null | undefined;
  sourceChain: string;
  destinationChain: string;
  destinationAccount: string;
  tokenAddress: string;
  amount: BigNumber;
  feeTokenAddress?: string; // Making it optional with '?' as per the provided node commands
}

export type Message = {
  receiver: string;
  data: string;
  tokenAmounts: {
    token: string;
    amount: string;
  }[];
  feeToken: string;
  extraArgs: string;
};

export interface ICCIPFee {
  fees: string;
  message: Message;
}
