import Image from 'next/image';
import logoETH from '@/public/images/networks/ethereum-eth-logo-diamond-purple.svg';
import logoBASE from '@/public/images/networks/base-logo-in-blue.svg';
import logoBNB from '@/public/images/networks/bnb-bnb-logo.svg';
import logoOP from '@/public/images/networks/optimism-logo.svg';
import logoAVAX from '@/public/images/networks/avalanche-avax-logo.svg';
import logoARB from '@/public/images/networks/arbitrum-arb-logo.svg';
import logoPOL from '@/public/images/networks/polygon-matic-logo.svg';

type ICCIPProviderIcon = {
  network: string;
  widthSize: number;
  heightSize: number;
};

const CCIPProviderIcon = ({
  network,
  widthSize,
  heightSize,
}: ICCIPProviderIcon) => {
  // console.log('CCIPProviderIcon network', network);
  switch (network) {
    case 'ethereumMainnet':
      return (
        <Image
          src={logoETH}
          width={widthSize}
          height={heightSize}
          alt="Ethereum Logo"
        />
      );
    case 'ethereumSepolia':
      return (
        <Image
          src={logoETH}
          width={widthSize}
          height={heightSize}
          alt="Ethereum Logo"
        />
      );
    case 'ethereumGoerli':
      return (
        <Image
          src={logoETH}
          width={widthSize}
          height={heightSize}
          alt="Ethereum Logo"
        />
      );
    case 'baseMainnet':
      return (
        <Image
          src={logoBASE}
          width={widthSize}
          height={heightSize}
          alt="Base Logo"
        />
      );
    case 'baseGoerli':
      return (
        <Image
          src={logoBASE}
          width={widthSize}
          height={heightSize}
          alt="Base Logo"
        />
      );
    case 'optimismMainnet':
      return (
        <Image
          src={logoOP}
          width={widthSize}
          height={heightSize}
          alt="Optimism Logo"
        />
      );
    case 'optimismGoerli':
      return (
        <Image
          src={logoOP}
          width={widthSize}
          height={heightSize}
          alt="Optimism Logo"
        />
      );
    case 'arbitrumMainnet':
      return (
        <Image
          src={logoARB}
          width={widthSize}
          height={heightSize}
          alt="Arbitrum Logo"
        />
      );
    case 'arbitrumGoerli':
      return (
        <Image
          src={logoARB}
          width={widthSize}
          height={heightSize}
          alt="Arbitrum Logo"
        />
      );
    case 'avalancheMainnet':
      return (
        <Image
          src={logoAVAX}
          width={widthSize}
          height={heightSize}
          alt="Avalanche Logo"
        />
      );
    case 'avalancheFuji':
      return (
        <Image
          src={logoAVAX}
          width={widthSize}
          height={heightSize}
          alt="Avalanche Logo"
        />
      );
    case 'polygonMainnet':
      return (
        <Image
          src={logoPOL}
          width={widthSize}
          height={heightSize}
          alt="Polygon Logo"
        />
      );
    case 'polygonMumbai':
      return (
        <Image
          src={logoPOL}
          width={widthSize}
          height={heightSize}
          alt="Polygon Logo"
        />
      );
    case 'binanceMainnet':
      return (
        <Image
          src={logoBNB}
          width={widthSize}
          height={heightSize}
          alt="Binance Logo"
        />
      );
    case 'binanceTestnet':
      return (
        <Image
          src={logoBNB}
          width={widthSize}
          height={heightSize}
          alt="Binance Logo"
        />
      );
    default:
      console.log(`Unknown network: ${network}`);
      return null;
  }
};

export default CCIPProviderIcon;
