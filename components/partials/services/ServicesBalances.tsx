import { useEffect } from 'react';
import { getAddress } from '@ethersproject/address';
import multicallBalanceProvider from '@/utils/helpers/multicall';
import useWallet from '@/hooks/useWallet';
import useGlobalState from '@/store/globalState';

export default function ServicesBalances() {
  const { connectedChain, ethersProvider, wallet } = useWallet();
  const [updateBalances] = useGlobalState('updateBalances');
  const [, setBalances] = useGlobalState('balances');

  useEffect(() => {
    if (!connectedChain) return;
    if (wallet && updateBalances && getAddress(wallet.accounts[0].address)) {
      // Define an async function inside the useEffect
      const fetchMultisigBalances = async () => {
        try {
          // Process balances
          if (!connectedChain || !ethersProvider) return;
          const balances = await multicallBalanceProvider(
            wallet.accounts[0].address,
            ethersProvider
          );
          setBalances(balances);
        } catch (error) {
          console.error('Error fetching balances:', error);
        }
      };

      fetchMultisigBalances();
    }
  }, [setBalances, updateBalances, connectedChain, wallet, ethersProvider]);

  return null;
}
