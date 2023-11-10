import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSetChain } from '@web3-onboard/react';
import useWallet from '@/hooks/useWallet';
import getChainID from '@/utils/providers/chainlink/ccip/config/chains';
import ccipRouterConfig from '@/utils/providers/chainlink/ccip/config/router';
import CCIPTransferTokens from '../utils/CCIPTransferTokens';
import { Message, TransferDetails } from '@/utils/types/ccip';

interface IBridgeButton {
  fromNetwork: string;
  toNetwork: string;
  setToNetwork: Dispatch<SetStateAction<string>>;
  details: TransferDetails;
  amount: string;
  fees: string;
  message: Message | undefined;
}

export default function CCIPBridgeTokensButton({
  fromNetwork,
  toNetwork,
  setToNetwork,
  details,
  amount,
  fees,
  message,
}: IBridgeButton) {
  const { ethersProvider, account } = useWallet();
  const [{ connectedChain }, setChain] = useSetChain();

  const handleBridgeCall = async () => {
    try {
      if (amount === '0') return;
      if (!account?.address || !ethersProvider || !message) return;
      if (connectedChain && connectedChain.id !== getChainID(fromNetwork)) {
        setChain({ chainId: getChainID(fromNetwork) });
      }
      const testCCIPTransferTokens = await CCIPTransferTokens(
        details,
        fees,
        message
      );
      console.log('testCCIPTransferTokens', testCCIPTransferTokens);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    setToNetwork(ccipRouterConfig.getRouterConfig(fromNetwork).lanes[0]);
  }, [fromNetwork, setToNetwork]);

  return (
    <button
      onClick={() => handleBridgeCall()}
      type="button"
      className="border-[#F8AE38] border-2 flex text-center items-center justify-center bg-primaryPurple rounded-lg hover:bg-opacity-80 mt-4 w-full h-20 text-xl"
    >
      Bridge from {ccipRouterConfig.getRouterConfig(fromNetwork).networkName} to{' '}
      {ccipRouterConfig.getRouterConfig(toNetwork).networkName}
    </button>
  );
}
