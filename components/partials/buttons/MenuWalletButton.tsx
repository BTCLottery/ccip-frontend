import { ReactElement, useEffect } from 'react';
import { useAppState } from '@web3-onboard/react';
import { useWindowSize, useCopyToClipboard } from 'usehooks-ts';
import { IS_LOCAL } from '@/constants/networks';
import Image from 'next/image';
import helpers from '@/utils/helpers';
import useWallet from '@/hooks/useWallet';
import CopyIcon from '@/public/icons/copy.svg';
import ExploreIcon from '@/public/icons/explore.svg';
import DisconnectIcon from '@/public/icons/disconnect.svg';
import useComponentVisible from '@/hooks/useComponentVisible';
import WalletIconButtons from './WalletIconButtons';
import WalletTokenBalance from './WalletTokenBalance';
import useGlobalState from '@/store/globalState';

export default function MenuWalletButton(): ReactElement {
  const [, setUpdateBalances] = useGlobalState('updateBalances');
  const [, copy] = useCopyToClipboard();

  const { width } = useWindowSize();
  const { connecting, wallet, connect, disconnect, updateAccountCenter } = useWallet();

  const { refs, active, handleButtonClick } = useComponentVisible<
    HTMLButtonElement,
    HTMLDivElement
  >();

  const appState = useAppState();

  const openWalletModal = (): void => {
    if (!wallet) {
      updateAccountCenter({ enabled: false, minimal: false, expanded: false });
    }

    handleButtonClick();

    if (!active) setUpdateBalances(true);
    if (active) setUpdateBalances(false);
  };

  // ugly blocknative hack to center to top on mobile maybe we can find a better way
  useEffect(() => {
    const onboardRoot: HTMLElement | null | undefined = document
      ?.querySelector('onboard-v2')
      ?.shadowRoot?.querySelector('div.container');
    if (onboardRoot) {
      onboardRoot.style.padding = '10px';
      if (width < 600) {
        onboardRoot.style.marginTop = '0px';
      } else onboardRoot.style.marginTop = '0px';
    }
  }, [appState, width]);

  const switchWallet = () => {
    if (wallet != null) connect();
  };

  return (
    <>
      {(!appState.accountCenter.enabled || width < 600) && (
        <>
          <div className="flex">
            <button
              ref={refs[0]}
              type="button"
              className="hover:bg-opacity-90 h-10 border text-white bg-primaryPurple border-nftEpic font-medium rounded-lg text-sm px-2 text-center"
              disabled={connecting}
              onClick={() => (wallet ? openWalletModal() : connect())}
            >
              {helpers.showTemporaryButtonText(connecting, wallet, active)}
            </button>
          </div>
          {wallet && active && (
            <div
              ref={refs[1]}
              className="fixed w-9/12 sm:w-64 mt-14 right-0 bg-coolPurple rounded-lg"
            >
              <div className="flex fle-col mt-3 px-3 text-white justify-between">
                <div className="flex flex-row flex-start p-1">
                  <button onClick={() => switchWallet()}>
                    <Image
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(
                        wallet.icon
                      )}`}
                      height={25}
                      width={25}
                      alt="wallet icon"
                      priority={true}
                    />
                  </button>
                  {/* {!wallet.accounts[0].ens?.avatar && <span className="flex flex-col justify-center"> <Jazzicon diameter={20} seed={jsNumberForAddress(wallet.accounts[0].address)} /> </span>} */}
                  <button onClick={() => copy(wallet.accounts[0].address)}>
                    <div className="ml-2 flex flex-col justify-center text-md">
                      {wallet.accounts[0].address.slice(0, 4)}...
                      {wallet.accounts[0].address.slice(
                        wallet.accounts[0].address.length - 4
                      )}
                    </div>
                  </button>
                </div>
                <div className="flex flex-row flex-end right-0">
                  <WalletIconButtons
                    img={CopyIcon}
                    alt="Copy"
                    altText="Copied"
                    isLast={false}
                    onClick={() => copy(wallet.accounts[0].address)}
                  />
                  <WalletIconButtons
                    img={ExploreIcon}
                    alt="Explore"
                    altText="Exploring"
                    isLast={false}
                    onClick={() =>
                      window.open(
                        `https://${
                          IS_LOCAL ? 'mumbai.' : ''
                        }polygonscan.com/address/${wallet.accounts[0].address}`,
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  />
                  <WalletIconButtons
                    img={DisconnectIcon}
                    alt="Disconnect"
                    altText="Disconnecting"
                    isLast={true}
                    onClick={() => disconnect(wallet)}
                  />
                </div>
              </div>
              <div className="flex mt-5 pr-8 text-center w-full justify-center text-white">
                <WalletTokenBalance />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
