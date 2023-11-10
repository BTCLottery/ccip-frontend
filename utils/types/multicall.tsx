import { providers } from 'ethers';

export type MulticallAddress = {
  [key: string]: [key: string];
};

export type MulticallRound = {
  roundNr?: number;
};

export type MulticallType = {
  ethersProvider: providers.JsonRpcProvider | providers.WebSocketProvider;
  contractAddress: string;
  roundNr?: number;
  activeRound?: number;
  totalBets?: number;
  totalTickets?: string;
  decimals?: number;
};

export type MulticallWinnersClaimedResponse = {
  winnersClaimed: boolean[];
};
