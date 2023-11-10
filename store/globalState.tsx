import { createGlobalState } from 'react-hooks-global-state';
import { BigNumber } from 'ethers';
import { IS_LOCAL } from '@/constants/networks';
import { GlobalTypes } from '@/utils/types/store';

const { useGlobalState } = createGlobalState<GlobalTypes>({
  isLoading: true,
  sideNavMenuOpen: false,
  updateBalances: false,
  balances: {
    nativeCoin: '0',
    wrappedCoin: '0',
    usdt: '0',
    usdc: '0',
    dai: '0',
    link: '0',
    btclp: '0',
  },
  // CCIP ROUTES
  fromNetwork: IS_LOCAL ? 'ethereumSepolia' : 'ethereumMainnet',
  toNetwork: IS_LOCAL ? 'polygonMumbai' : 'polygonMainnet',
  // CCIP MESSAGE
  ccipStore: {
    destinationAccount: '',
    tokenAddress: '',
    amount: BigNumber.from(0),
    feeTokenAddress: '',
  },
});

export default useGlobalState;
