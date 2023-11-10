import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import { IS_LOCAL } from '@/utils/constants/networks';
import { useDebounce } from 'use-debounce';
import useWallet from '@/hooks/useWallet';
import ccipRouterConfig, {
  FeeTokens,
} from '@/utils/providers/chainlink/ccip/config/router';
import CCIPBridgeTokensButton from './ui/CCIPBridgeTokensButton';
import CCIPNetworkButton from '@/components/chainlink/ccip/ui/CCIPNetworkButton';
import getChainlinkCCIPFee from './utils/getChainlinkCCIPFee';
import { Message, TransferDetails } from '@/utils/types/ccip';
import CCIPBridgeFeeTokens from './ui/CCIPBridgeFeeTokens';
import useGlobalState from '@/store/globalState';
import getChainsByID from '@/utils/providers/chainlink/ccip/config/chainsByID';

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
//    [] 11.1. Would love to see a Solidity example for both the scenario of BTCLP Token Minting/Burning
//    [] 11.2. for the purchasing tickets in raffle events crosschain I think I get it! the CCIPSender will be whitelisted in every raffle and users pay fee tokens to the CCIPSender contract and then the contract pays on their behalf and transfers BTCLP Tokens or any other Blockchain.
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

export default function CCIPBridge() {
  const { ethersProvider, account, connectedChain } = useWallet();
  const [updateBalances, setUpdateBalances] = useGlobalState('updateBalances');

  const [balances] = useGlobalState('balances');
  const [generatedMessage, setMessage] = useState<Message>();
  const [feeTokens, setFeeTokens] = useState<FeeTokens>();
  const [selectedFeeToken, setSelectedFeeToken] = useState<string>('');
  const [selectedFeeSymbol, setSelectedFeeSymbol] = useState<string>('ETH');
  const [openFeeTokenModal, setOpenFeeTokenModal] = useState<boolean>(false);
  const [ccipFees, setCcipFees] = useState<string>('0');
  const [amount, setAmount] = useState<string>('0');

  const [debouncedAmount] = useDebounce(amount, 500); // 500ms delay

  const [fromNetwork, setFromNetwork] = useState<string>(
    IS_LOCAL ? 'ethereumSepolia' : 'ethereumMainnet'
  );
  const [toNetwork, setToNetwork] = useState<string>(
    IS_LOCAL ? 'polygonMumbai' : 'polygonMainnet'
  );

  useEffect(() => {
    if(connectedChain) {
      setFromNetwork(getChainsByID(connectedChain.id))
    }
  }, [connectedChain])

  const details: TransferDetails = useMemo(() => {
    return {
      ethersProvider,
      sourceChain: fromNetwork,
      destinationChain: toNetwork,
      destinationAccount: (account && account.address) ?? '',
      tokenAddress: ccipRouterConfig.getRouterConfig(fromNetwork).whitelistedTokens.BTCLP,
      amount: ethers.utils.parseEther(debouncedAmount.replace(',', '.')),
      feeTokenAddress: selectedFeeToken,
    };
  }, [
    ethersProvider,
    fromNetwork,
    toNetwork,
    account,
    amount,
    selectedFeeToken,
    feeTokens
  ]);

  // get balances
  useEffect(() => {
    setUpdateBalances(true)
    return () => {
      setUpdateBalances(false);
    }
  }, [details])

  const updateAmount = (value: string) => {
      // Allow numbers, comma, and dot, but ensure there is at least one digit before or after the decimal point
      const regex = /^(\d+[.,]?\d*|[.,]\d+)$/;
      if (value === '' || value === '.' || value === ',') {
        setAmount('0');
      } else if (value === '0') {
        // Allow explicitly setting the value to '0'
        setAmount(value);
      } else if (regex.test(value)) {
        // Replace commas with dots and remove leading zeros
        const cleanedValue = value.replace(',', '.').replace(/^0*(?=\d)/, '');
        if(cleanedValue >= balances.btclp){
          setAmount(balances.btclp);
        } else {
          setAmount(cleanedValue);
        }
      }
  };

  useEffect(() => {
    const getBTCLPFee = async () => {
      const availableFeeTokens = ccipRouterConfig.getRouterConfig(fromNetwork).feeTokens;
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

      // const whitelistedTokens = await getChainlinkCCIPSupportedToken(details);
      // console.log('whitelistedTokens', whitelistedTokens);
    };
    getBTCLPFee();
  }, [fromNetwork, toNetwork, account, debouncedAmount, connectedChain]);

  useEffect(() => {
    const getBTCLPFee = async () => {
      if(!details.destinationAccount) return
      if(fromNetwork === toNetwork) return
  
      const fromNetworkConfigLanes = ccipRouterConfig.getRouterConfig(fromNetwork).lanes;
  
      if (!fromNetworkConfigLanes) {
        console.error(`Configuration for ${fromNetwork} not found.`);
        return;
      }
  
      if (!fromNetworkConfigLanes.includes(toNetwork)) {
        // If toNetwork is not in lanes of fromNetwork, exit the function.
        console.log(`${toNetwork} is not in lanes of ${fromNetwork}`);
        return;
      }
  
      const updatedDetails = { ...details, amount: ethers.utils.parseEther(debouncedAmount.replace(',', '.')) };

      // TODO GRANT APPROVAL - SUPPORT ALL WHITELISTED TOKENS ON BOTH MAINNET AND TESTNET
      const { fees, message } = await getChainlinkCCIPFee(updatedDetails);
      console.log('fees', fees);
      console.log('message', message);
      setCcipFees(fees);
      setMessage(message);
  
    };
    getBTCLPFee();
  }, [details, debouncedAmount, connectedChain]);
  
  // GET ALL BALANCES
  // GET ALL FEE TOKENS
  // SELECT TOKEN TO TRANSFER
  // SELECT TOKEN FEE TO PAY FEE IN
  // MAX TOKENS FORM BALANCE

  return (
    <section className={`w-full mx-auto`}>
      <h1 className="flex w-full items-center justify-center z-80 text-4xl my-1">
        CHAINLINK CCIP
      </h1>
      <h2 className="flex w-full items-center justify-center z-80 text-3xl my-1 text-primaryColor">
        BTCLP BRIDGE
      </h2>
      <div className={`flex w-full max-w-[430px] h-[400px] mx-auto my-4`}>
        <div className="bg-primaryHighlightTone w-full rounded-lg px-4">
          <div className="flex justify-around mt-4">
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
            <div className="w-auto flex items-center mt-4">{'<->'}</div>
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
              networkLanes={ccipRouterConfig.getRouterConfig(fromNetwork).lanes}
            />
          </div>

          <div className="flex justify-between items-end mt-4 text-lg">
              <div>Amount</div>
              <div>{balances.btclp} BTCLP</div>
          </div>

          <div className="flex justify-between text-lg mt-1 bg-primaryPurpleBgDarkest">
            <input
              className="w-10/12 bg-primaryPurpleBgDarkest pl-2 placeholder-white"
              name="tokenAmount"
              // placeholder="0"
              value={amount}
              onChange={e => updateAmount(e.target.value)}
            />
            <button className="w-1/3">BTCLP</button>
            <button
              className="w-1/4 bg-primaryPurple hover:bg-opacity-80 border-r-lg"
              onClick={() => setAmount(balances.btclp)}
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
            fees={ccipFees}
            message={generatedMessage}
          />

          <div className="flex justify-center items-center mt-4 w-full text-lg">
            <Link
              target="_blank"
              href={`https://ccip.chain.link/address/${account?.address ?? ''}`}
              rel="noopener noreferrer"
              className="underline"
            >
              My transactions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
