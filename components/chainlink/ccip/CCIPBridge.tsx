// CCIPBridge.tsx
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import { useDebounce } from 'use-debounce';
import Lottie from 'lottie-react';
import Image from 'next/image';
import useWallet from '@/hooks/useWallet';
import ccipRouterConfig, {
  FeeTokens,
} from '@/utils/providers/chainlink/ccip/config/router';
import ccipConfig from '@/utils/providers/chainlink/ccip/config';
import CCIPBridgeTokensButton from './ui/CCIPBridgeTokensButton';
import CCIPNetworkButton from '@/components/chainlink/ccip/ui/CCIPNetworkButton';
import getChainlinkCCIPFee from './utils/getChainlinkCCIPFee';
import { Message, TransferDetails } from '@/utils/types/ccip';
import CCIPBridgeFeeTokens from './ui/CCIPBridgeFeeTokens';
import useGlobalState from '@/store/globalState';
import getChainsByID from '@/utils/providers/chainlink/ccip/config/chainsByID';
import CCIPAnimation from '@/public/lottie/ccip.json';
import getChainID from '@/utils/providers/chainlink/ccip/config/chains';
import erc20Abi from '@/utils/providers/chainlink/ccip/abi/IERC20Metadata.json';
import formatEtherToLocaleString from '@/utils/formatters/formatEther';

// TODO CCIP UI
// [x] 1. FEE TOKENS MINI-MODAL
// [X] 2. BTCLP IS IN FACT BnM ON TESTNETS ON EVERY CHAIN WITH CORRECT ADDRESS AND BALANCE
// [X] 3. BTCLP BALANCE
// [X] 4. BTCLP CCIP MAX AMOUNT AND CHECK BALANCE AMOUNT
// [] 5. Approve:
//    [] 5.1. MAX APPROVAL 1 TIME FOR ROUTER TO SPEND FOR BTCLP
//    [] 5.2. AMOUNT SELECTED
// [] 6. Notifications
// [] 7. Add CCIP Error handling when the lanes are overused
// [x] 8. Chain multiple calls toghether with MultiCallV3
// [] 9. Prepare for Goerli Sunset and moving to Sepolia Testnet
// [] 10. BTCLP TOKEN DEPLOYMENT ON MAINNET! like you said Polygon will be the primary one since I think that now with CCIP it does not matter anymore if it's on Ethereum or Polygon first.
// [] 11. Understanding all requirements for CCIP Sender Whitelisting before deployment on mainnet.
// [] 12. Testnets seems to work, need to start testing on mainnet but need to deploy token first

// TODO BTCLP UI
// [X] 1. MULTICHAIN TOKENS:
//    [X] 1.1. get balances for both NATIVE COIN & WERC20
//    [X] 1.2. get symbol keeys from FEE TOKENS LIST
//    [X] 1.3. get logos for NATIVE and WERC20
// [x] 2. add debounce for token value input
// [] 3. create a modal where players can swap any token and purchase tickets directly on a single chain or crosschain with CCIP.
// [] 4. prepare frontend for Daily CCIP Raffles

// TODO BTCLP TOKEN
// [] 1. deploy BTCLP ERC677 Token on all 7 Whitelisted blockchains with MINT/BURN methods and add ACCESS_ROLE to Pool of Tokens as MINTER. Wondering if there would be any gas advantage if we used ERC677 transferAndCall method and do the tranfer in 1 tx instead of 2 with approve -> transferFrom. I think i'm basically asking if we can use IERC677 or just stick to IERC20?
// [] 2. wondering how we could renounce ownership later? how should we think of this situation?

// TODO BTCLP SMART CONTRACTS
// [] 2. create and automate liquidity generated from fees with Automation Keepers
// [] 1. optimize BTCLP CORE for Daily Draws
// [] 3. optimize CCIP Daily LINK Raffle
// [] 4. deploy CCIP Daily LINK Raffle
// [] 5. deploy CCIP Daily BTCLP Raffle
// [] 6. deploy CCIP Daily WBTC Raffle

// TODO PROTOCOL DASHBOARD
// Configure and Deploy your own Custom Raffle

// TODO
// [] 1. General Access Single Token
// [] 2. General Access Multi Token
// [] 3. Private Beta Single Token
// [] 4. Private Beta Multi Token
// [] 5. Private Beta NFT Bridge
// [] 6. Private Beta DeFi Bridge

export default function CCIPBridge() {
  const { ethersProvider, account, connectedChain } = useWallet();
  const [updateBalances, setUpdateBalances] = useGlobalState('updateBalances');
  const [balances] = useGlobalState('balances');
  const [fromNetwork, setFromNetwork] = useGlobalState('fromNetwork');
  const [toNetwork, setToNetwork] = useGlobalState('toNetwork');

  const [generatedMessage, setMessage] = useState<Message>();
  const [feeTokens, setFeeTokens] = useState<FeeTokens>();
  const [selectedFeeToken, setSelectedFeeToken] = useState<string>('');
  const [selectedTokenBalance, setSelectedTokenBalance] =
    useState<string>('0.00');
  const [selectedFeeSymbol, setSelectedFeeSymbol] = useState<string>('ETH');
  const [openFeeTokenModal, setOpenFeeTokenModal] = useState<boolean>(false);
  const [ccipFees, setCcipFees] = useState<string>('0');
  const [amount, setAmount] = useState<string>('0');

  const [debouncedAmount] = useDebounce(amount, 500); // 500ms delay

  useEffect(() => {
    if (connectedChain) {
      setFromNetwork(getChainsByID(connectedChain.id));
    }
  }, [connectedChain, setFromNetwork]);

  const details: TransferDetails = useMemo(() => {
    const fromNetworkProvider = new ethers.providers.JsonRpcProvider(
      ccipConfig.getProviderRpcUrl(fromNetwork)
    );
    return {
      fromNetworkProvider,
      ethersProvider,
      sourceChain: fromNetwork,
      destinationChain: toNetwork,
      destinationAccount: (account && account.address) ?? '',
      tokenAddress:
        ccipRouterConfig.getRouterConfig(fromNetwork).whitelistedTokens.BTCLP,
      tokenKey: Object.keys(
        ccipRouterConfig.getRouterConfig(fromNetwork).whitelistedTokens
      )[0],
      amount: ethers.utils.parseEther(debouncedAmount.replace(',', '.')),
      senderAddress: (account && account.address) ?? '',
      feeTokenAddress: selectedFeeToken,
      feeTokenSymbol: selectedFeeSymbol,
      ccipFees,
    };
  }, [
    ethersProvider,
    fromNetwork,
    toNetwork,
    account,
    selectedFeeToken,
    debouncedAmount,
    ccipFees,
    selectedFeeSymbol,
  ]);

  // get balances
  useEffect(() => {
    try {
      setUpdateBalances(true);
      const fetchBalance = async () => {
        const fromNetworkProvider = new ethers.providers.JsonRpcProvider(
          ccipConfig.getProviderRpcUrl(fromNetwork)
        );
        const erc20Token = new ethers.Contract(
          details.tokenAddress,
          erc20Abi,
          fromNetworkProvider
        );
        if (!details.senderAddress) return;
        try {
          console.log('details.senderAddress', details.senderAddress);
          const erc20Balance = await erc20Token.balanceOf(
            details.senderAddress
          );
          setSelectedTokenBalance(formatEtherToLocaleString(erc20Balance));
        } catch (error) {
          console.log('fromNetwork balance error inside', error);
        }
      };
      fetchBalance();
    } catch (error) {
      console.log('fromNetwork balance error', error);
    }
    return () => {
      setUpdateBalances(false);
    };
  }, [details, fromNetwork, setUpdateBalances]);

  const updateAmount = (value: string) => {
    // Allow numbers, comma, and dot, but ensure there is at least one digit before or after the decimal point
    const regex = /^(\d+[.,]?\d*|[.,]\d+)$/;
    // if (selectedTokenBalance === '0' || selectedTokenBalance === '0.0' || selectedTokenBalance === '0.00') {
    //   setAmount('0');
    // }
    if (value === '' || value === '.' || value === ',') {
      setAmount('0');
    } else if (value === '0') {
      // Allow explicitly setting the value to '0'
      setAmount(value);
    } else if (regex.test(value)) {
      // Replace commas with dots and remove leading zeros
      const cleanedValue = value.replace(',', '.').replace(/^0*(?=\d)/, '');
      if (cleanedValue >= selectedTokenBalance) {
        setAmount(selectedTokenBalance);
      } else {
        setAmount(cleanedValue);
      }
    }
  };

  useEffect(() => {
    const getBTCLPFeeTokens = async () => {
      const availableFeeTokens =
        ccipRouterConfig.getRouterConfig(fromNetwork).feeTokens;
      // console.log('availableFeeTokens', availableFeeTokens);
      setFeeTokens(availableFeeTokens);
      if ('ETH' in availableFeeTokens) {
        // console.log('aici 1');
        setSelectedFeeToken(availableFeeTokens.ETH);
        setSelectedFeeSymbol('ETH');
      }
      if ('MATIC' in availableFeeTokens) {
        // console.log('aici 2');
        setSelectedFeeToken(availableFeeTokens.MATIC);
        setSelectedFeeSymbol('MATIC');
      }
      if ('AVAX' in availableFeeTokens) {
        // console.log('aici 3');
        setSelectedFeeToken(availableFeeTokens.AVAX);
        setSelectedFeeSymbol('AVAX');
      }
      if ('BNB' in availableFeeTokens) {
        // console.log('aici 4');
        setSelectedFeeToken(availableFeeTokens.BNB);
        setSelectedFeeSymbol('BNB');
      }

      // console.log('Object.keys(ccipRouterConfig.getRouterConfig(fromNetwork).whitelistedTokens)', Object.keys(ccipRouterConfig.getRouterConfig(fromNetwork).whitelistedTokens))
      // setSelectedTokenSymbol(Object.keys(ccipRouterConfig.getRouterConfig(fromNetwork).whitelistedTokens)[0])
      // const whitelistedTokens = await getChainlinkCCIPSupportedToken(details);
      // console.log('whitelistedTokens', whitelistedTokens);
    };
    getBTCLPFeeTokens();
  }, [fromNetwork, toNetwork, account, connectedChain]);

  useEffect(() => {
    const getBTCLPFee = async () => {
      try {
        if (!details.destinationAccount) return;
        if (fromNetwork === toNetwork) return;

        const fromNetworkConfigLanes =
          ccipRouterConfig.getRouterConfig(fromNetwork).lanes;

        if (!fromNetworkConfigLanes) {
          console.error(`Configuration for ${fromNetwork} not found.`);
          return;
        }

        if (!fromNetworkConfigLanes.includes(toNetwork)) {
          // If toNetwork is not in lanes of fromNetwork, exit the function.
          console.log(`${toNetwork} is not in lanes of ${fromNetwork}`);
          return;
        }

        console.log('updatedDetailsBefore', {
          details,
          amount: ethers.utils.parseEther(debouncedAmount.replace(',', '.')),
        });

        const updatedDetails = {
          ...details,
          amount: ethers.utils.parseEther(debouncedAmount.replace(',', '.')),
        };

        console.log('updatedDetails', updatedDetails);

        // TODO GRANT APPROVAL - SUPPORT ALL WHITELISTED TOKENS ON BOTH MAINNET AND TESTNET
        const { fees, message } = await getChainlinkCCIPFee(updatedDetails);
        console.log('fees', fees);
        console.log('message', message);
        setCcipFees(fees);
        setMessage(message);
      } catch (error) {
        console.log('error getBTCLPFee', error);
      }
    };
    getBTCLPFee();
  }, [
    fromNetwork,
    toNetwork,
    account,
    details,
    debouncedAmount,
    connectedChain,
  ]);

  return (
    <section className={`w-full mx-auto`}>
      <Lottie
        animationData={CCIPAnimation}
        loop={true}
        style={{
          position: 'absolute',
          height: '1111px',
          width: '100%',
          margin: '0 auto',
        }}
      />
      <div className="absolute mx-auto w-full">
        <div className="product-header_tag-wrapper">
          <Link
            target="_blank"
            href={`https://chain.link/cross-chain`}
            rel="noopener noreferrer"
            className="flex flex-row justify-center items-center gap-2 bg-zir rounded-lg my-2 py-1 w-28 mx-auto bg-chainlinkLavender"
          >
            <div className="flex">
              <Image
                src="https://assets-global.website-files.com/5f6b7190899f41fb70882d08/648c8655667959beb00b4a76_icon-product_ccip.svg"
                loading="lazy"
                alt="Chainlink CCIP logo"
                width={23}
                height={23}
                className="mx-auto"
              />
            </div>
            <h1 className="text-chainlinkMirage flex justify-center text-xl">
              CCIP
            </h1>
          </Link>
        </div>
        <h2 className="flex w-full items-center justify-center text-center z-80 text-4xl my-2 text-chainlinkBlue">
          Cross-chain by Chainlink
        </h2>
        <h3 className="flex w-full items-center justify-center text-center z-80 text-2xl my-2 text-chainlinkBiscay">
          The era of secure blockchain interoperability has arrived.
        </h3>
        <div className={`flex w-full max-w-[480px] h-auto mx-auto my-4`}>
          <div
            className="bg-chainlinkBiscay w-full rounded-lg p-4"
            style={{
              boxShadow: '0px 9px 18px 2px rgba(0,0,0,0.71)',
            }}
          >
            <div className="flex justify-between">
              <CCIPNetworkButton
                setFromToNetwork={setFromNetwork}
                fromTo="From"
                networkReferenceFrom={fromNetwork}
                networkReferenceTo={toNetwork}
                networkName={
                  ccipRouterConfig.getRouterConfig(fromNetwork).networkName
                }
                networkStage={
                  ccipRouterConfig.getRouterConfig(fromNetwork).networkStage
                }
                networkLanes={[]}
              />
              <div className="flex items-center justify-center w-12 md:text-xl">
                {'<->'}
              </div>
              <CCIPNetworkButton
                setFromToNetwork={setToNetwork}
                fromTo="To"
                networkReferenceFrom={fromNetwork}
                networkReferenceTo={toNetwork}
                networkName={
                  ccipRouterConfig.getRouterConfig(toNetwork).networkName
                }
                networkStage={
                  ccipRouterConfig.getRouterConfig(toNetwork).networkStage
                }
                networkLanes={
                  ccipRouterConfig.getRouterConfig(fromNetwork).lanes
                }
              />
            </div>

            <div className="flex justify-between items-end mt-4 text-lg">
              <div>Amount</div>
              <div>{selectedTokenBalance} BTCLP</div>
            </div>

            <div className="flex justify-between text-lg mt-1 bg-chainlinkMirage">
              <input
                className="w-10/12 bg-chainlinkMirage pl-2 placeholder-white"
                name="tokenAmount"
                // placeholder="0"
                value={amount}
                onChange={e => updateAmount(e.target.value)}
              />
              <button className="w-1/3">BTCLP</button>
              <button
                className="w-1/4 bg-chainlinkBlue hover:bg-opacity-80 border-r-lg"
                onClick={() => setAmount(selectedTokenBalance)}
              >
                MAX
              </button>
            </div>

            <CCIPBridgeFeeTokens
              ccipFees={ccipFees}
              feeTokens={feeTokens}
              openFeeTokenModal={openFeeTokenModal}
              selectedFeeSymbol={selectedFeeSymbol}
              setOpenFeeTokenModal={setOpenFeeTokenModal}
              setSelectedFeeToken={setSelectedFeeToken}
              setSelectedFeeSymbol={setSelectedFeeSymbol}
            />

            <CCIPBridgeTokensButton
              fromNetwork={fromNetwork}
              toNetwork={toNetwork}
              setToNetwork={setToNetwork}
              amount={debouncedAmount}
              details={details}
              ccipFees={details.ccipFees}
              message={generatedMessage}
            />

            <div className="flex justify-center items-center mt-4 w-full text-lg">
              <Link
                target="_blank"
                href={`https://ccip.chain.link/address/${
                  account?.address ?? ''
                }`}
                rel="noopener noreferrer"
                className="underline"
              >
                My transactions
              </Link>
            </div>
          </div>
        </div>

        <h4 className="flex justify-center w-full text-chainlinkMirage">
          Built with 💜 by{' '}
          <div className="ml-1">
            <Link target="_blank" href="https://www.btclottery.io/">
              {' '}
              btclottery.io{' '}
            </Link>
          </div>
        </h4>
      </div>
    </section>
  );
}
