'use client';

// Import necessary modules and data
import { BigNumber, constants, providers, Contract, utils } from 'ethers';
import { useEffect, useState } from 'react';
import ccipConfig from '@/utils/providers/chainlink/ccip/config';
import routerAbi from '@/utils/providers/chainlink/ccip/abi/Router.json';
import offRampAbi from '@/utils/providers/chainlink/ccip/abi/OffRamp.json';
import erc20Abi from '@/utils/providers/chainlink/ccip/abi/IERC20Metadata.json';
import useWallet from '@/hooks/useWallet';
import { ICCIPFee, Message, TransferDetails } from '@/utils/types/ccip';

// Command: node src/transfer-tokens.js sourceChain destinationChain destinationAccount tokenAddress amount feeTokenAddress(optional)
// Examples(sepolia):

// pay fees with native token: node src/transfer-tokens.js ethereumSepolia avalancheFuji 0x9d087fC03ae39b088326b67fA3C788236645b717 0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05 100
// pay fees with transferToken: node src/transfer-tokens.js ethereumSepolia avalancheFuji 0x9d087fC03ae39b088326b67fA3C788236645b717 0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05 100 0x779877A7B0D9E8603169DdbD7836e478b4624789
// pay fees with a wrapped native token: node src/transfer-tokens.js ethereumSepolia avalancheFuji 0x9d087fC03ae39b088326b67fA3C788236645b717 0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05 100 0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534
const CCIPFeeFallback = {
  fees: '0',
  message: {
    receiver: '',
    data: '',
    tokenAmounts: [{ token: '', amount: '0' }],
    feeToken: '',
    extraArgs: '',
  },
};

const getChainlinkCCIPFee = async (
  details: TransferDetails
): Promise<ICCIPFee> => {
  const retry = async (retries: number): Promise<ICCIPFee> => {
    try {
      const {
        ethersProvider,
        sourceChain,
        destinationChain,
        destinationAccount,
        tokenAddress,
        amount,
        feeTokenAddress,
      } = details;
      console.log(`Transferring tokens...`);
      console.log(`Source Chain: ${sourceChain}`);
      console.log(`Destination Chain: ${destinationChain}`);
      console.log(`Destination Account: ${destinationAccount}`);
      console.log(`Token Address: ${tokenAddress}`);
      console.log(`Amount: ${amount.toString()}`);
      console.log(`Fee Token Address: ${feeTokenAddress}`);

      const fees: string = '0';
      let message: Message = {
        receiver: '',
        data: '',
        tokenAmounts: [{ token: '', amount: '0' }],
        feeToken: '',
        extraArgs: '',
      };

      // if (!ethersProvider) return { fees, message };
      // const signer = ethersProvider.getSigner();
      // if (!signer) return { fees, message };

      // Get the router's address for the specified chain
      const sourceRouterAddress =
        ccipConfig.getRouterConfig(sourceChain).address;
      // const sourceChainSelector =
      //   ccipConfig.getRouterConfig(sourceChain).chainSelector;
      // Get the chain selector for the target chain
      const destinationChainSelector =
        ccipConfig.getRouterConfig(destinationChain).chainSelector;

      const provider = new providers.JsonRpcProvider(
        ccipConfig.getProviderRpcUrl(sourceChain)
      );

      // Create a contract instance for the router using its ABI and address
      const sourceRouter = new Contract(
        sourceRouterAddress,
        routerAbi,
        provider
      );

      // console.log('destinationChainSelector', destinationChainSelector);
      // console.log('sourceRouter', sourceRouter);

      /*
      ==================================================
          Section: BUILD CCIP MESSAGE
          build CCIP message that you will send to the
          Router contract.
      ==================================================
      */

      // build message
      const tokenAmounts = [
        {
          token: tokenAddress,
          amount: amount.toString(),
        },
      ];

      // Encoding the data

      const functionSelector = utils.id('CCIP EVMExtraArgsV1').slice(0, 10);
      //  "extraArgs" is a structure that can be represented as [ 'uint256', 'bool' ]
      // extraArgs are { gasLimit: 0, strict: false }
      // we set gasLimit specifically to 0 because we are not sending any data so we are not expecting a receiving contract to handle data

      const extraArgs = utils.defaultAbiCoder.encode(
        ['uint256', 'bool'],
        [0, false]
      );

      const encodedExtraArgs = functionSelector + extraArgs.slice(2);

      message = {
        receiver: utils.defaultAbiCoder.encode(
          ['address'],
          [destinationAccount]
        ),
        data: '0x', // no data
        tokenAmounts,
        feeToken: feeTokenAddress || constants.AddressZero, // If fee token address is provided then fees must be paid in fee token.
        extraArgs: encodedExtraArgs,
      };

      /*
      ==================================================
          Section: CALCULATE THE FEES
          Call the Router to estimate the fees for sending tokens.
      ==================================================
    */

      const fetchFee = async () => {
        try {
          // console.log('🎉 sourceChain', sourceChain)
          // console.log('🎉 sourceChainSelector', sourceChainSelector)
          // console.log('🎉 destinationChainSelector', destinationChainSelector)
          // console.log('🎉 destinationChain', destinationChain)
          // console.log('🎉 message', message)
          const fetchedFee: string = await sourceRouter.getFee(
            destinationChainSelector,
            message
          );
          console.log(`Estimated fees (wei): ${fetchedFee}`);
          return {
            fees: utils.formatEther(BigNumber.from(fetchedFee).toString()),
            message,
          };
        } catch (error) {
          console.log('error fetchFee', error);
          return { fees, message };
        }
      };

      const fee = await fetchFee();
      // Trigger the async function within the effect
      return fee;
    } catch (error) {
      console.error('An error occurred:', error);
      if (retries > 0) {
        console.log('Retrying after 1 second...');
        await new Promise(resolve => {
          setTimeout(resolve, 2000); // Wait for 2 second
        });
        return retry(retries - 1); // Retry the function
      }
      console.log('Max retries reached. Exiting.');
      // You can return a default value or throw an error here, depending on your needs
      return CCIPFeeFallback;
    }
  };

  // Call the retry function with the number of retries you want
  // For example, if you want to retry once, you would pass 1
  return retry(5);
};

export default getChainlinkCCIPFee;
