import { useEffect } from 'react';
import { getAddress } from '@ethersproject/address';
import useWallet from '@/hooks/useWallet';
import useGlobalState from '@/store/globalState';

export default function ServicesBalances() {
  const { connectedChain, ethersProvider, wallet } = useWallet();
  const [globalSocket] = useGlobalState('globalSocket');
  const [, setBalances] = useGlobalState('balances');
  const [updateBalances] = useGlobalState('updateBalances');

  useEffect(() => {
    if(!connectedChain) return
    if (
      wallet &&
      globalSocket &&
      updateBalances &&
      getAddress(wallet.accounts[0].address)
    ) {
      // console.log('ruleaza in ServicesBalances');
      globalSocket.emit('getBalances', wallet.accounts[0].address, connectedChain.id);
      globalSocket.on('balances', setBalances);
    }
  }, [
    setBalances,
    updateBalances,
    connectedChain,
    wallet,
    ethersProvider,
    globalSocket,
  ]);

  return null;
}
