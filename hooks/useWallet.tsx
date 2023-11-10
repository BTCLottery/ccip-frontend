import {
  useAccountCenter,
  useConnectWallet,
  useWallets,
  useSetChain,
} from '@web3-onboard/react';
import { useState, useEffect } from 'react';
import { Account } from '@web3-onboard/core/dist/types';
import { Web3Provider } from '@ethersproject/providers';
import { WalletInterface } from '@/utils/types/wallet';

export default function useWallet(): WalletInterface {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();

  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();

  const [ethersProvider, setProvider] = useState<Web3Provider | null>();
  const [account, setAccount] = useState<Account | null>(null);

  const updateAccountCenter = useAccountCenter();

  useEffect(() => {
    try {
      if (wallet?.provider) {
        setAccount({
          address: wallet.accounts[0].address,
          balance: wallet.accounts[0].balance,
          ens: wallet.accounts[0].ens,
          uns: {
            name: 'test',
          },
        });
      }
      // If the wallet has a provider than the wallet is connected
      if (wallet?.provider) {
        setProvider(new Web3Provider(wallet.provider, 'any'));
      }

      if (wallet) return;

      updateAccountCenter({
        enabled: false,
        position: 'topRight',
        minimal: true,
        expanded: true,
      });
    } catch (error) {
      console.log('error setAccount', error);
    }
  }, [wallet, updateAccountCenter]);

  useEffect(() => {
    try {
      if (!connectedWallets.length) return;

      const connectedWalletsLabelArray = connectedWallets.map(
        ({ label }) => label
      );

      window.localStorage.setItem(
        'connectedWallets',
        JSON.stringify(connectedWalletsLabelArray)
      );
    } catch (error) {
      console.log('error connectedWallets', error);
    }
  }, [connectedWallets, wallet]);

  useEffect(() => {
    if (wallet) return;
    if (!Object.keys(connectedWallets).length) {
      window.localStorage.removeItem('connectedWallets');
    }
    try {
      const previouslyConnectedWallets = JSON.parse(
        window.localStorage.getItem('connectedWallets') as string
      ) as string[];
      if (previouslyConnectedWallets?.length && !wallet) {
        (async () => {
          await connect({
            autoSelect: {
              label: previouslyConnectedWallets[0],
              disableModals: true,
            },
          });
        })();
      }
    } catch (error: unknown) {
      console.log('error connectedWallets', error);
    }
  }, [connect, wallet, connectedWallets]);

  return {
    wallet,
    ethersProvider,
    account,
    connect,
    connecting,
    disconnect,
    updateAccountCenter,
    chains,
    connectedChain,
    setChain,
  };
}
