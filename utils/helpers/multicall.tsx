import { utils, providers } from 'ethers';
import {
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from 'ethereum-multicall';
import { balanceMulticall, balanceOfABI } from 'utils/abi/erc20';
import { filterNativeAssets } from 'constants/assets';
import formatEtherToLocaleString from 'utils/formatters/formatEther';
import formatUnits from 'utils/formatters/formatUnits';

const multicallBalanceProvider = async (
  activeAccount: string,
  ethersProvider: providers.JsonRpcProvider | providers.WebSocketProvider
) => {
  try {
    const { chainId } = await ethersProvider.getNetwork();
    console.log('hexValueChainID', chainId);
    let hexValue = utils.hexlify(chainId);

    // Remove leading zero if present
    if (hexValue.length === 8 && hexValue.startsWith('0x0')) {
      hexValue = `0x${hexValue.slice(3)}`;
    }

    console.log('hexValue', hexValue);
    const filteredNativeAssets = filterNativeAssets(hexValue);
    console.log('filteredNativeAssets', filteredNativeAssets);
    const multicall = new Multicall({ tryAggregate: true, ethersProvider });
    const contractCallContext: ContractCallContext[] = [
      // PUBLIC VARIABLES
      {
        reference: 'MulticallV2',
        contractAddress: filteredNativeAssets.nativeCoin,
        abi: balanceMulticall,
        calls: [
          {
            reference: 'getEthBalance',
            methodName: 'getEthBalance',
            methodParameters: [activeAccount],
          },
        ],
      },
      {
        reference: 'wrappedCoin',
        contractAddress: filteredNativeAssets.wrappedCoin,
        abi: balanceOfABI,
        calls: [
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [activeAccount],
          },
        ],
      },
      {
        reference: 'daiContract',
        contractAddress: filteredNativeAssets.dai,
        abi: balanceOfABI,
        calls: [
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [activeAccount],
          },
        ],
      },
      {
        reference: 'usdtContract',
        contractAddress: filteredNativeAssets.usdt,
        abi: balanceOfABI,
        calls: [
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [activeAccount],
          },
        ],
      },
      {
        reference: 'usdcContract',
        contractAddress: filteredNativeAssets.usdc,
        abi: balanceOfABI,
        calls: [
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [activeAccount],
          },
        ],
      },
      {
        reference: 'linkContract',
        contractAddress: filteredNativeAssets.link,
        abi: balanceOfABI,
        calls: [
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [activeAccount],
          },
        ],
      },
      {
        reference: 'btclpContract',
        contractAddress: filteredNativeAssets.btclp,
        abi: balanceOfABI,
        calls: [
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [activeAccount],
          },
        ],
      },
    ];

    // console.log('contractCallContextt', contractCallContext);
    const results: ContractCallResults =
      await multicall.call(contractCallContext);

    // console.log('results', results)

    const balances = {
      nativeCoin: formatEtherToLocaleString(
        results?.results?.MulticallV2.callsReturnContext[0].returnValues[0]
      ),
      wrappedCoin: formatEtherToLocaleString(
        results?.results?.wrappedCoin.callsReturnContext[0].returnValues[0]
      ),
      link: formatEtherToLocaleString(
        results?.results?.linkContract.callsReturnContext[0].returnValues[0]
      ),
      btclp: formatEtherToLocaleString(
        results?.results?.btclpContract.callsReturnContext[0].returnValues[0]
      ),
      dai: formatEtherToLocaleString(
        results?.results?.daiContract.callsReturnContext[0].returnValues[0]
      ),
      usdt: formatUnits(
        results?.results?.usdtContract.callsReturnContext[0].returnValues[0],
        6
      ),
      usdc: formatUnits(
        results?.results?.usdcContract.callsReturnContext[0].returnValues[0],
        6
      ),
    };
    return balances;
  } catch (error) {
    console.log('error', error);
    return {
      nativeCoin: '0',
      wrappedCoin: '0',
      usdt: '0',
      usdc: '0',
      dai: '0',
      link: '0',
      btclp: '0',
    };
  }
};

export default multicallBalanceProvider;
