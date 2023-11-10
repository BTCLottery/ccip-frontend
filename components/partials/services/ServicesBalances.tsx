import { useEffect } from 'react';
import { getAddress } from '@ethersproject/address';
import { useSetChain } from '@web3-onboard/react';
import { multicallBalanceProvider } from '@/utils/helpers/multicall';
import useWallet from '@/hooks/useWallet';
import useGlobalState from '@/store/globalState';
import getChainID from '@/utils/providers/chainlink/ccip/config/chains';
import ccipConfig from '@/utils/providers/chainlink/ccip/config';

export default function ServicesBalances() {
  const { connectedChain, ethersProvider, wallet, account } = useWallet();
  const [, setChain] = useSetChain();
  const [, setBalances] = useGlobalState('balances');
  const [updateBalances] = useGlobalState('updateBalances');
  const [fromNetwork] = useGlobalState('fromNetwork');

  useEffect(() => {
    if(!connectedChain) return
    if (
      wallet &&
      updateBalances &&
      getAddress(wallet.accounts[0].address)
    ) {
        // Define an async function inside the useEffect
        const fetchMultisigBalances = async () => {
          console.log('serviceBalances')
            try {
              // Process balances
              if (!connectedChain || !account?.address || !ethersProvider) return;
              // if (connectedChain && connectedChain.id !== getChainID(fromNetwork)) {
              //   setChain({ chainId: getChainID(fromNetwork) });
              // }
              // const provider = new providers.WebSocketProvider(gamesConfig.RPC);
              const balances = await multicallBalanceProvider(
                account.address,
                ethersProvider
              );
              console.log('serviceBalancessss', balances)
              setBalances(balances);
            } catch (error) {
                console.error('Error fetching balances:', error);
                return
            }
        };
  
        fetchMultisigBalances();
    }
  }, [
    setBalances,
    updateBalances,
    connectedChain,
    wallet,
    ethersProvider
  ]);

  return null;
}
