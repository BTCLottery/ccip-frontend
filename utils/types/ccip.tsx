import { BigNumber, ethers } from 'ethers';

export interface TransferDetails {
  ethersProvider: ethers.providers.Web3Provider | null | undefined;
  fromNetworkProvider: ethers.providers.JsonRpcProvider | undefined;
  sourceChain: string;
  destinationChain: string;
  destinationAccount: string;
  tokenAddress: string;
  tokenKey: string;
  amount: BigNumber;
  senderAddress: string;
  feeTokenSymbol: string;
  feeTokenAddress: string; // Making it optional with '?' as per the provided node commands
  ccipFees: string;
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
