import { BigNumber, EventFilter, Signer, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Message, TransferDetails } from '@/utils/types/ccip';
import ccipConfig from '@/utils/providers/chainlink/ccip/config';
import routerAbi from '@/utils/providers/chainlink/ccip/abi/Router.json';
import offRampAbi from '@/utils/providers/chainlink/ccip/abi/OffRamp.json';
import erc20Abi from '@/utils/providers/chainlink/ccip/abi/IERC20Metadata.json';
import useWallet from '@/hooks/useWallet';

const CCIPTransferTokens = async (
  details: TransferDetails,
  fees: string,
  message: Message
): Promise<string> => {
  const {
    ethersProvider,
    sourceChain,
    destinationChain,
    destinationAccount,
    tokenAddress,
    amount,
    feeTokenAddress,
  } = details;
  const amountBN: BigNumber = ethers.BigNumber.from(amount);
  const parsedFee = ethers.utils.parseEther(fees);

  if (!ethersProvider) return '';
  const signer = ethersProvider.getSigner();
  if (!signer) return '';

  // Get the router's address for the specified chain
  const sourceRouterAddress = ccipConfig.getRouterConfig(sourceChain).address;
  const sourceChainSelector =
    ccipConfig.getRouterConfig(sourceChain).chainSelector;
  // Get the chain selector for the target chain
  const destinationChainSelector =
    ccipConfig.getRouterConfig(destinationChain).chainSelector;

  // const provider = new ethers.providers.JsonRpcProvider(ccipConfig.getProviderRpcUrl(sourceChain));

  // Create a contract instance for the router using its ABI and address
  const sourceRouter = new ethers.Contract(
    sourceRouterAddress,
    routerAbi,
    signer
  );

  /*
    ==================================================
        Section: SEND tokens
        This code block initializes an ERC20 token contract for token transfer across chains. It handles three cases:
        1. If the fee token is the native blockchain token, it makes one approval for the transfer amount. The fees are included in the msg.value field.
        2. If the fee token is different from both the native blockchain token and the transfer token, it makes two approvals: one for the transfer amount and another for the fees. The fees are part of the message.
        3. If the fee token is the same as the transfer token but not the native blockchain token, it makes a single approval for the sum of the transfer amount and fees. The fees are part of the message.
        The code waits for the transaction to be mined and stores the transaction receipt.
    ==================================================
    */

  // Create a contract instance for the token using its ABI and address
  const erc20 = new ethers.Contract(tokenAddress, erc20Abi, signer);
  let sendTx;
  let approvalTx;

  if (!feeTokenAddress) {
    // Pay native
    // First approve the router to spend tokens
    approvalTx = await erc20.approve(sourceRouterAddress, amountBN);
    await approvalTx.wait(); // wait for the transaction to be mined
    console.log(
      `1 approved router ${sourceRouterAddress} to spend ${amountBN.toString()} of token ${tokenAddress}. Transaction: ${
        approvalTx.hash
      }`
    );

    sendTx = await sourceRouter.ccipSend(destinationChainSelector, message, {
      value: parsedFee.toString(),
    }); // fees are send as value since we are paying the fees in native
  } else {
    if (tokenAddress.toUpperCase() === feeTokenAddress.toUpperCase()) {
      // fee token is the same as the token to transfer
      // Amount tokens to approve are transfer amount + fees
      approvalTx = await erc20.approve(
        sourceRouterAddress,
        amountBN.add(parsedFee)
      );
      await approvalTx.wait(); // wait for the transaction to be mined
      console.log(
        `2 approved router ${sourceRouterAddress} to spend ${amountBN.toString()} and fees ${parsedFee} of token ${tokenAddress}. Transaction: ${
          approvalTx.hash
        }`
      );
    } else {
      // fee token is different than the token to transfer
      // 2 approvals
      approvalTx = await erc20.approve(sourceRouterAddress, amountBN); // 1 approval for the tokens to transfer
      await approvalTx.wait(); // wait for the transaction to be mined
      console.log(
        `3 approved router ${sourceRouterAddress} to spend ${amountBN.toString()} of token ${tokenAddress}. Transaction: ${
          approvalTx.hash
        }`
      );
      const erc20Fees = new ethers.Contract(feeTokenAddress, erc20Abi, signer);
      approvalTx = await erc20Fees.approve(sourceRouterAddress, parsedFee); // 1 approval for the fees token
      await approvalTx.wait();
      console.log(
        `4 approved router ${sourceRouterAddress} to spend  fees ${parsedFee} of token ${feeTokenAddress}. Transaction: ${approvalTx.hash}`
      );
    }
    sendTx = await sourceRouter.ccipSend(destinationChainSelector, message);
  }

  const receipt = await sendTx.wait(); // wait for the transaction to be mined

  console.log('receipt', receipt);
  /*
    ==================================================
        Section: Fetch message ID
        The Router ccipSend function returns the messageId.
        This section makes a call (simulation) to the blockchain
        to fetch the messageId that was returned by the Router.
    ==================================================
    */

  // Simulate a call to the router to fetch the messageID
  const call = {
    from: sendTx.from,
    to: sendTx.to,
    data: sendTx.data,
    gasLimit: sendTx.gasLimit,
    gasPrice: sendTx.gasPrice,
    value: sendTx.value,
  };

  // Simulate a contract call with the transaction data at the block before the transaction
  const messageId = await ethersProvider.call(call, receipt.blockNumber - 1);

  console.log(
    `\n✅ ${amountBN.toString()} of Tokens(${tokenAddress}) Sent to account ${destinationAccount} on destination chain ${destinationChain} using CCIP. Transaction hash ${
      sendTx.hash
    } -  Message id is ${messageId}`
  );

  /*
    ==================================================
        Section: Check status of the destination chain
        Poll the off-ramps contracts of the destination chain
        to wait for the message to be executed then return
        the status.
    ==================================================
    */

  // Fetch status on destination chain
  const destinationRpcUrl = ccipConfig.getProviderRpcUrl(destinationChain);

  // Initialize providers for interacting with the blockchains
  const destinationProvider = new ethers.providers.JsonRpcProvider(
    destinationRpcUrl
  );
  const destinationRouterAddress =
    ccipConfig.getRouterConfig(destinationChain).address;

  // Instantiate the router contract on the destination chain
  const destinationRouterContract = new ethers.Contract(
    destinationRouterAddress,
    routerAbi,
    destinationProvider
  );

  // CHECK DESTINATION CHAIN - POLL UNTIL the messageID is found or timeout

  const POLLING_INTERVAL = 60000; // Poll every 60 seconds
  const TIMEOUT = 40 * 60 * 1000; // 40 minutes in milliseconds

  let pollingId: ReturnType<typeof setInterval>;
  let timeoutId: ReturnType<typeof setTimeout>;

  const pollStatus = async () => {
    const offRamps = await destinationRouterContract.getOffRamps();
    const promises = offRamps.map(
      async (offRamp: { sourceChainSelector: string; offRamp: string }) => {
        if (offRamp.sourceChainSelector.toString() === sourceChainSelector) {
          const offRampContract = new ethers.Contract(
            offRamp.offRamp,
            offRampAbi,
            destinationProvider
          );
          const events = await offRampContract.queryFilter(
            'ExecutionStateChanged' as string | EventFilter
          );
          return events.find(
            event => event.args && event.args.messageId === messageId
          );
        }
        return null;
      }
    );

    const foundEvents = await Promise.all(promises);
    const event = foundEvents.find(e => e);
    if (event) {
      const { state } = event.args;
      const status = ccipConfig.getMessageState(state);
      console.log(
        `✅Status of message ${messageId} is ${status} - Check the explorer https://ccip.chain.link/msg/${messageId}`
      );
      clearInterval(pollingId);
      clearTimeout(timeoutId);
    } else {
      console.log(
        `Message ${messageId} has not been processed yet on the destination chain.Try again in 60sec - Check the explorer https://ccip.chain.link/msg/${messageId}`
      );
    }
    // If no event found, the message has not yet been processed on the destination chain
    console.log(
      `Message ${messageId} has not been processed yet on the destination chain.Try again in 60sec - Check the explorer https://ccip.chain.link/msg/${messageId}`
    );
  };

  // const pollStatus = async () => {
  //   // Fetch the OffRamp contract addresses on the destination chain
  //   const offRamps = await destinationRouterContract.getOffRamps();

  //   // Iterate through OffRamps to find the one linked to the source chain and check message status
  //   for (const offRamp of offRamps) {
  //     if (offRamp.sourceChainSelector.toString() === sourceChainSelector) {
  //       const offRampContract = new ethers.Contract(
  //         offRamp.offRamp,
  //         offRampAbi,
  //         destinationProvider
  //       );
  //       const events = await offRampContract.queryFilter('ExecutionStateChanged');

  //       // Check if an event with the specific messageId exists and log its status
  //       for (const event of events) {
  //         if (event.args && event.args.messageId === messageId) {
  //           const { state } = event.args;
  //           const status = ccipConfig.getMessageState(state);
  //           console.log(
  //             `✅Status of message ${messageId} is ${status} - Check the explorer https://ccip.chain.link/msg/${messageId}`
  //           );

  //           // Clear the polling and the timeout
  //           clearInterval(pollingId);
  //           clearTimeout(timeoutId);
  //           return;
  //         }
  //       }
  //     }
  //   }
  //   // If no event found, the message has not yet been processed on the destination chain
  //   console.log(
  //     `Message ${messageId} has not been processed yet on the destination chain.Try again in 60sec - Check the explorer https://ccip.chain.link/msg/${messageId}`
  //   );
  // };

  // Start polling
  console.log(
    `Wait for message ${messageId} to be executed on the destination chain - Check the explorer https://ccip.chain.link/msg/${messageId}`
  );
  pollingId = setInterval(pollStatus, POLLING_INTERVAL);

  // Set timeout to stop polling after 40 minutes
  timeoutId = setTimeout(() => {
    console.log(
      `Timeout reached. Stopping polling - check again later (Run 'get-status' script) Or check the explorer https://ccip.chain.link/msg/${messageId}`
    );
    clearInterval(pollingId);
  }, TIMEOUT);

  return '';
};
export default CCIPTransferTokens;
