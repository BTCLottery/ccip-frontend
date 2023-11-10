import Image from 'next/image';
import logoETH from '@/public/images/networks/eth-diamond-equal-width-height.svg';
import maticLogo from '@/public/images/tokens/polygon-matic.svg';
import daiLogo from '@/public/images/tokens/multi-collateral-dai-logo.svg';
import usdtLogo from '@/public/images/tokens/tether-usdt-logo.svg';
import usdcLogo from '@/public/images/tokens/usd-coin-usdc-logo.svg';
import linkLogo from '@/public/images/tokens/chainlink-equal-width-height.svg';
import logoBNB from '@/public/images/networks/bnb-bnb-logo.svg';
import logoAVAX from '@/public/images/networks/avalanche-avax-logo.svg';

type ICCINetworkFeeTokenIcon = {
  logoKey: string;
  widthSize: number;
  heightSize: number;
};

const CCIPNetworkFeeTokenIcon = ({
  logoKey,
  widthSize,
  heightSize,
}: ICCINetworkFeeTokenIcon) => {
  // console.log('CCIPProviderIcon logoKey', logoKey);
  switch (logoKey) {
    case 'ETH':
      return (
        <Image
          src={logoETH}
          width={widthSize}
          height={heightSize}
          alt="Ethereum Logo"
        />
      );
    case 'WETH':
      return (
        <Image
          src={logoETH}
          width={widthSize}
          height={heightSize}
          alt="Ethereum Logo"
        />
      );
    case 'LINK':
      return (
        <Image
          src={linkLogo}
          width={widthSize}
          height={heightSize}
          alt="Link Token Logo"
        />
      );
    case 'AVAX':
      return (
        <Image
          src={logoAVAX}
          width={widthSize}
          height={heightSize}
          alt="AVAX Token Logo"
        />
      );
    case 'WAVAX':
      return (
        <Image
          src={logoAVAX}
          width={widthSize}
          height={heightSize}
          alt="WAVAX Token Logo"
        />
      );
    case 'BNB':
      return (
        <Image
          src={logoBNB}
          width={widthSize}
          height={heightSize}
          alt="BNB Token Logo"
        />
      );
    case 'WBNB':
      return (
        <Image
          src={logoBNB}
          width={widthSize}
          height={heightSize}
          alt="WBNB Token Logo"
        />
      );
    case 'MATIC':
      return (
        <Image
          src={maticLogo}
          width={widthSize}
          height={heightSize}
          alt="MATIC Token Logo"
        />
      );
    case 'WMATIC':
      return (
        <Image
          src={maticLogo}
          width={widthSize}
          height={heightSize}
          alt="WMATIC Token Logo"
        />
      );
    default:
      console.log(`Unknown Token Logo Symbol Key: ${logoKey}`);
      return null;
  }
};

export default CCIPNetworkFeeTokenIcon