import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useComponentVisible from '@/hooks/useComponentVisible';
import useWallet from '@/hooks/useWallet';
import NetworkIcon from '../network/NetworkIcon';
import RotatingArrow from '@/components/header/partials/RotatingArrow';

export default function MenuNetworkButton() {
  const { wallet, chains, connectedChain, setChain } = useWallet();

  const { refs, active, setActive, handleButtonClick } = useComponentVisible<
    HTMLButtonElement,
    HTMLDivElement
  >();

  const [activeChainLabel, setActiveChainLabel] = useState('');

  useEffect(() => {
    try {
      let counter = 0;
      for (let i = 0; i < chains.length; i += 1) {
        if (connectedChain?.id === chains[i].id) {
          setActiveChainLabel(chains[i].label ?? '');
        } else {
          counter += 1;
          if (counter === chains.length) {
            setActiveChainLabel('Unsupported Network');
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [wallet, connectedChain, chains]);

  const switchChainID = async (chainId: string) => {
    await setChain({ chainId });
    setActive(false);
  };

  return (
    <>
      {connectedChain && (
        <button
          ref={refs[0]}
          onClick={handleButtonClick}
          className="select-none hover:bg-opacity-80 h-10 mx-1 flex pointer border text-white bg-chainlinkBlue border-nftEpic font-medium rounded-lg text-sm px-2 text-center"
        >
          <div className="flex color-white h-full items-center">
            <div className="ml-1 mr-2">
              <NetworkIcon chainId={connectedChain?.id ?? ''} size={21} />
            </div>
            <div className="hidden md:flex font-medium tracking-[1px]">
              {activeChainLabel}
            </div>
            <RotatingArrow active={active} pixels={18} />
          </div>
        </button>
      )}
      {wallet && active && (
        <div
          ref={refs[1]}
          className="fixed w-9/12 sm:w-64 mt-14 ml-2 right-0 bg-chainlinkBiscay rounded-lg"
        >
          {chains.length > 1 && (
            <div className="px-2 py-1 bg-chainlinkBlue rounded-t-lg border-b border-chainlinkZircon">
              Networks:{' '}
            </div>
          )}
          {chains &&
            chains.map(chain => {
              return (
                <button
                  onClick={() => switchChainID(chain.id)}
                  key={uuidv4()}
                  className="w-full py-1 rounded-lg hover:bg-chainlinkBlue"
                >
                  <div className="flex">
                    <div className="flex pt-2 pb-1 mx-2">
                      <NetworkIcon chainId={chain.id} size={21} />
                      <div className="ml-2 font-medium tracking-[1px] flex justify-center items-center">
                        {chain.label}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </>
  );
}
