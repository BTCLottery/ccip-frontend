import {ethereumTokens} from "constants/assets/ethereum"
import {polygonTokens} from "constants/assets/polygon"
import {arbitrumTokens} from "constants/assets/arbitrum"
import {avalancheTokens} from "constants/assets/avalanche"
import {binanceTokens} from "constants/assets/binance"
import {baseTokens} from "constants/assets/base"
import {optimismTokens} from "constants/assets/optimism"
import { TokenBalances } from "@/utils/types/balances"
// import { constants } from "ethers";

export const assets = {
    ethereumTokens,
    polygonTokens,
    arbitrumTokens,
    avalancheTokens,
    binanceTokens,
    baseTokens,
    optimismTokens
}

export const filterNativeAssets = (chainId: string): TokenBalances => {
    // console.log('chainId', chainId)
    let nativeAssets;
    switch (chainId) {
        case '0x01': // 'ethereumMainnet'
            nativeAssets = {nativeCoin: ethereumTokens.nativeCoin, wrappedCoin: ethereumTokens.wrappedCoin, dai: ethereumTokens.dai, usdt: ethereumTokens.usdt, usdc: ethereumTokens.usdc, link: ethereumTokens.link, btclp: ethereumTokens.btclp}
            break;
        case '0xaa36a7': // 'ethereumSepolia'
            nativeAssets = {nativeCoin: ethereumTokens.nativeCoin, wrappedCoin: ethereumTokens.wrappedCoin, dai: ethereumTokens.dai, usdt: ethereumTokens.usdt, usdc: ethereumTokens.usdc, link: ethereumTokens.link, btclp: ethereumTokens.btclp}
            break;
        case '0x2105': // 'baseMainnet'
            nativeAssets = {nativeCoin: baseTokens.nativeCoin, wrappedCoin: baseTokens.wrappedCoin, dai: baseTokens.dai, usdt: baseTokens.usdt, usdc: baseTokens.usdc, link: baseTokens.link, btclp: baseTokens.btclp}
            break;
        case '0x14a33': // 'baseGoerli'
            nativeAssets = {nativeCoin: baseTokens.nativeCoin, wrappedCoin: baseTokens.wrappedCoin, dai: baseTokens.dai, usdt: baseTokens.usdt, usdc: baseTokens.usdc, link: baseTokens.link, btclp: baseTokens.btclp}
            break;
        case '0xa': // 'optimismMainnet'
            nativeAssets = {nativeCoin: optimismTokens.nativeCoin, wrappedCoin: optimismTokens.wrappedCoin, dai: optimismTokens.dai, usdt: optimismTokens.usdt, usdc: optimismTokens.usdc, link: optimismTokens.link, btclp: optimismTokens.btclp}
            break;
        case '0x1a4': // 'optimismGoerli'
            nativeAssets = {nativeCoin: optimismTokens.nativeCoin, wrappedCoin: optimismTokens.wrappedCoin, dai: optimismTokens.dai, usdt: optimismTokens.usdt, usdc: optimismTokens.usdc, link: optimismTokens.link, btclp: optimismTokens.btclp}
            break;
        case '0xa4b1': // 'arbitrumMainnet'
            nativeAssets = {nativeCoin: arbitrumTokens.nativeCoin, wrappedCoin: arbitrumTokens.wrappedCoin, dai: arbitrumTokens.dai, usdt: arbitrumTokens.usdt, usdc: arbitrumTokens.usdc, link: arbitrumTokens.link, btclp: arbitrumTokens.btclp}
            break;
        case '0x66eed': // 'arbitrumGoerli'
            nativeAssets = {nativeCoin: arbitrumTokens.nativeCoin, wrappedCoin: arbitrumTokens.wrappedCoin, dai: arbitrumTokens.dai, usdt: arbitrumTokens.usdt, usdc: arbitrumTokens.usdc, link: arbitrumTokens.link, btclp: arbitrumTokens.btclp}
            break;
        case '0xa86a': // 'avalancheMainnet'
            nativeAssets = {nativeCoin: avalancheTokens.nativeCoin, wrappedCoin: avalancheTokens.wrappedCoin, dai: avalancheTokens.dai, usdt: avalancheTokens.usdt, usdc: avalancheTokens.usdc, link: avalancheTokens.link, btclp: avalancheTokens.btclp}
            break;
        case '0xa869': // 'avalancheFuji'
            nativeAssets = {nativeCoin: avalancheTokens.nativeCoin, wrappedCoin: avalancheTokens.wrappedCoin, dai: avalancheTokens.dai, usdt: avalancheTokens.usdt, usdc: avalancheTokens.usdc, link: avalancheTokens.link, btclp: avalancheTokens.btclp}
            break;
        case '0x89': // 'polygonMainnet'
            nativeAssets = {nativeCoin: polygonTokens.nativeCoin, wrappedCoin: polygonTokens.wrappedCoin, dai: polygonTokens.dai, usdt: polygonTokens.usdt, usdc: polygonTokens.usdc, link: polygonTokens.link, btclp: polygonTokens.btclp}
            break;
        case '0x13881': // 'polygonMumbai'
            nativeAssets = {nativeCoin: polygonTokens.nativeCoin, wrappedCoin: polygonTokens.wrappedCoin, dai: polygonTokens.dai, usdt: polygonTokens.usdt, usdc: polygonTokens.usdc, link: polygonTokens.link, btclp: polygonTokens.btclp}
            break;
        case '0x38': // 'binanceMainnet'
            nativeAssets = {nativeCoin: binanceTokens.nativeCoin, wrappedCoin: binanceTokens.wrappedCoin, dai: binanceTokens.dai, usdt: binanceTokens.usdt, usdc: binanceTokens.usdc, link: binanceTokens.link, btclp: binanceTokens.btclp}
            break;
        case '0x61': // 'binanceTestnet'
            nativeAssets = {nativeCoin: binanceTokens.nativeCoin, wrappedCoin: binanceTokens.wrappedCoin, dai: binanceTokens.dai, usdt: binanceTokens.usdt, usdc: binanceTokens.usdc, link: binanceTokens.link, btclp: binanceTokens.btclp}
            break;
        default:
            console.log(`Unknown chainID: ${chainId}`);
            nativeAssets = {nativeCoin: polygonTokens.wrappedCoin, wrappedCoin: polygonTokens.wrappedCoin, dai: polygonTokens.dai, usdt: polygonTokens.usdt, usdc: polygonTokens.usdc, link: polygonTokens.link, btclp: polygonTokens.btclp}
            break;
    }

    if (!nativeAssets){
        console.log(
          `nativeAssets empty for chainID ${chainId} - check your environment variables`
        );
        nativeAssets = {nativeCoin: polygonTokens.wrappedCoin, wrappedCoin: polygonTokens.wrappedCoin, dai: polygonTokens.dai, usdt: polygonTokens.usdt, usdc: polygonTokens.usdc, link: polygonTokens.link, btclp: polygonTokens.btclp}
    }

    return nativeAssets;
}