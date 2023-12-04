import { useEffect } from 'react';
import { getAddress } from '@ethersproject/address';
import multicallBalanceProvider from '@/utils/helpers/multicall';
import useWallet from '@/hooks/useWallet';
import useGlobalState from '@/store/globalState';

export default function ServicesBalances() {
  const { connectedChain, ethersProvider, account } = useWallet();
  const [updateBalances] = useGlobalState('updateBalances');
  const [, setBalances] = useGlobalState('balances');

  useEffect(() => {
    if (!connectedChain) return;
    if (!ethersProvider) return;
    if (!account || !account.address) return;

    if (updateBalances && getAddress(account.address)) {
      // Define an async function inside the useEffect
      const fetchMultisigBalances = async () => {
        try {
          // Process balances
          const balances = await multicallBalanceProvider(
            account.address,
            ethersProvider
          );
          setBalances(balances);
        } catch (error) {
          console.error('Error fetching balances:', error);
        }
      };

      fetchMultisigBalances();
    }
  }, [setBalances, updateBalances, connectedChain, account, ethersProvider]);

  return null;
}
