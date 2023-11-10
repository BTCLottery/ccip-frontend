import { createGlobalState } from 'react-hooks-global-state';
import { Socket } from 'socket.io-client';
import { BigNumber } from 'ethers';
import { TokenBalances } from '@/utils/types/balances';
import { IS_LOCAL } from '@/utils/constants/networks';

export type CCIPConfig = {
  fromNetwork: string;
  toNetwork: string;
  destinationAccount: string;
  tokenAddress: string;
  amount: BigNumber;
  feeTokenAddress: string;
};

export type GlobalTypes = {
  isLoading: boolean;
  sideNavMenuOpen: boolean;
  updateBalances: boolean;
  globalSocket: Socket | null;
  balances: TokenBalances;
  ccipConfig: CCIPConfig;
};

const { useGlobalState } = createGlobalState<GlobalTypes>({
  isLoading: true,
  globalSocket: null,
  updateBalances: false,
  balances: {
    nativeCoin: '0',
    wrappedCoin: '0',
    usdt: '0',
    usdc: '0',
    dai: '0',
    link: '0',
    btclp: '0'
  },
  sideNavMenuOpen: false,
  ccipConfig: {
    fromNetwork: IS_LOCAL ? 'ethereumSepolia' : 'ethereumMainnet',
    toNetwork: IS_LOCAL ? 'polygonMumbai' : 'polygonMainnet',
    destinationAccount: '',
    tokenAddress: '',
    amount: BigNumber.from(0),
    feeTokenAddress: '',
  },
});

export default useGlobalState;
