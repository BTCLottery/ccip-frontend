import { Contract, ethers } from 'ethers';
import erc20Abi from '@/utils/providers/chainlink/ccip/abi/IERC20Metadata.json';
import routerAbi from '@/utils/providers/chainlink/ccip/abi/Router.json';
import ccipConfig from '@/utils/providers/chainlink/ccip/config';
import { TransferDetails } from '@/utils/types/ccip';

type WhitelistedTokens = {
  symbol: string;
  address: string;
};

const getChainlinkCCIPSupportedToken = async (
  details: TransferDetails
): Promise<WhitelistedTokens[]> => {
  const { sourceChain, destinationChain, tokenAddress } = details;

  const sourceRouterAddress = ccipConfig.getRouterConfig(sourceChain).address;
  // Get the chain selector for the target chain
  const destinationChainSelector =
    ccipConfig.getRouterConfig(destinationChain).chainSelector;

  const provider = new ethers.providers.JsonRpcProvider(
    ccipConfig.getProviderRpcUrl(sourceChain)
  );

  // Create a contract instance for the router using its ABI and address
  const sourceRouter = new ethers.Contract(
    sourceRouterAddress,
    routerAbi,
    provider
  );

  const whitelistedTokens: WhitelistedTokens[] = [];

  try {
    // Fetch the list of supported tokens
    const supportedTokens = await sourceRouter.getSupportedTokens(
      destinationChainSelector
    );
    console.log('supportedTokens', supportedTokens);

    // Check token validity
    if (!supportedTokens.includes(tokenAddress)) {
      console.log(
        `Token address ${tokenAddress} not in the list of supportedTokens ${supportedTokens}`
      );
    }

    // GET ALL WHITELISTED TOKEN SYMBOLS
    // for (let i = 0; i < supportedTokens.length; i++) {
    //   const address = supportedTokens[i];
    //   const token: Contract = new ethers.Contract(address, erc20Abi, provider);
    //   const symbol: string = await token.symbol();
    //   whitelistedTokens.push({ symbol, address });
    // }

    const eventsPromises = supportedTokens.map((address: string, i: number) => {
      const token: Contract = new ethers.Contract(address, erc20Abi, provider);
      const symbol: string = token.symbol();
      whitelistedTokens.push({ symbol, address });
      return { symbol, address };
    });
    await Promise.all(eventsPromises);

    return whitelistedTokens;
  } catch (error) {
    console.log('error', error);
    return whitelistedTokens;
  }
};
export default getChainlinkCCIPSupportedToken;
