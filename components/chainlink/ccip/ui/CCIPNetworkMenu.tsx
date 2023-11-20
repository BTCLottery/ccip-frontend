import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { IS_LOCAL } from '@/constants/networks';
import CCIPProviderIcon from './CCIPProviderIcon';
import ccipRouterConfig from '@/utils/providers/chainlink/ccip/config/router';

interface ICCIPNetworkMenuProps {
  fromTo: string;
  activeModal: boolean;
  networkReferenceFrom: string;
  networkReference: string;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  setFromToNetwork: Dispatch<SetStateAction<string>>;
  networkLanes: string[];
}

const CCIPNetworkMenu: React.FC<ICCIPNetworkMenuProps> = ({
  fromTo,
  activeModal,
  networkReferenceFrom,
  networkReference,
  setFromToNetwork,
  setActiveModal,
  networkLanes,
}) => {
  // Render function to display networks
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      // If the modal is open and the clicked target is not within the modal content, close the modal
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setActiveModal(false);
      }
    }

    // If the modal is open, listen for clicks outside it
    if (activeModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Clean up the event listener on unmount or when the modal closes
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [activeModal, setActiveModal]);

  if (!activeModal) return null;

  const renderNetworks = (networkArray: string[]) => {
    // console.log('networkLanes', networkLanes)
    // console.log('fromTo', fromTo)
    // console.log('networkArray', networkArray)
    const filteredArray: string[] =
      fromTo === 'To' ? networkLanes : networkArray;
    // console.log('filteredArray', filteredArray)
    return filteredArray.map((network, i) => (
      <div
        key={i}
        onClick={() => setFromToNetwork(network)}
        className={`flex flex-row justify-start items-center h-auto hover:bg-chainlinkBlue rounded-lg`}
      >
        <div className="flex flex-row justify-start items-center mx-4 p-3">
          <CCIPProviderIcon network={network} widthSize={20} heightSize={32} />
          <div className="flex flex-row text-white ml-4 justify-start">
            <div className="h-8 flex justify-center items-center text-xl ">
              {ccipRouterConfig.getRouterConfig(network).networkName}{' '}
            </div>
            <div
              className={`
                w-20 h-8 ml-6 rounded-lg text-md flex items-center justify-center
                ${
                  network === networkReference
                    ? 'bg-chainlinkBlue rounded border-2'
                    : ''
                } 
            `}
            >
              {network === networkReference ? 'Current' : ''}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      ref={modalRef}
      className={`${
        activeModal ? '' : 'hidden'
      } absolute bg-chainlinkMirage max-w-[400px] h-auto rounded-lg border-blue-50 border-2 z-10`}
    >
      <div className="flex flex-col justify-center">
        <div className="flex flex-col">
          {IS_LOCAL
            ? renderNetworks(ccipRouterConfig.supportedTestnets)
            : renderNetworks(ccipRouterConfig.supportedMainnet)}
        </div>
      </div>
    </div>
  );
};
export default CCIPNetworkMenu;
