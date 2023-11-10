import { BigNumber } from 'ethers';
import { TokenBalances } from './balances';

export type CCIPMessage = {
  destinationAccount: string;
  tokenAddress: string;
  amount: BigNumber;
  feeTokenAddress: string;
};

export type GlobalTypes = {
  isLoading: boolean;
  sideNavMenuOpen: boolean;
  updateBalances: boolean;
  balances: TokenBalances;
  fromNetwork: string;
  toNetwork: string;
  ccipStore: CCIPMessage;
};
