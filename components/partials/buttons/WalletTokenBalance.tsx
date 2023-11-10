import daiLogo from '@/public/images/tokens/multi-collateral-dai-logo.svg';
import usdtLogo from '@/public/images/tokens/tether-usdt-logo.svg';
import usdcLogo from '@/public/images/tokens/usd-coin-usdc-logo.svg';
import linkLogo from '@/public/images/tokens/chainlink-equal-width-height.svg';
import btclpLogo from '@/public/images/tokens/Bitcoin-Lottery-Protocol-Logo.svg';
import BalancesRow from '../network/BalanceRow';
import useGlobalState from '@/store/globalState';
import useWallet from '@/hooks/useWallet';
import getChainTokens from '@/utils/providers/chainlink/ccip/config/chainTokens';

export default function WalletTokenBalance() {
  const [balances] = useGlobalState('balances');
  const { connectedChain } = useWallet();
  if(!balances) return null
  if(!connectedChain) return null
  const chainTokens = getChainTokens(connectedChain.id)
  return (
    <div className="w-full mb-5">
      <ul className="w-full flex items-start flex-col">
        <BalancesRow
          logo={chainTokens.symbolLogo}
          label={chainTokens.nativeToken}
          balance={balances.nativeCoin}
          isLast={false}
        />
        <BalancesRow
          logo={chainTokens.symbolLogo}
          label={chainTokens.nativeWrappedToken}
          balance={balances.wrappedCoin}
          isLast={false}
        />
        <BalancesRow
          logo={linkLogo}
          label="LINK"
          balance={balances.link}
          isLast={false}
        />
        <BalancesRow
          logo={usdcLogo}
          label="USDC"
          balance={balances.usdc}
          isLast={false}
        />
        {connectedChain.id !== '0x2105' && connectedChain.id !== '0x14a33' && 
          <BalancesRow
            logo={usdtLogo}
            label="USDT"
            balance={balances.usdt}
            isLast={false}
          />
        }
        <BalancesRow
          logo={daiLogo}
          label="DAI"
          balance={balances.dai}
          isLast={false}
        />
        <BalancesRow
          logo={btclpLogo}
          label="BTCLP"
          balance={balances.btclp}
          isLast={true}
        />
      </ul>
    </div>
  );
}
