import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RotatingArrow from '@/components/header/partials/RotatingArrow';
import CCIPNetworkFeeTokenIcon from './CCIPNetworkFeeTokenIcon';
import { FeeTokens } from '@/utils/providers/chainlink/ccip/config/router';

type ICCIPBridgeFeeTokens = {
  ccipFees: string;
  feeTokens: FeeTokens | undefined;
  openFeeTokenModal: boolean;
  selectedFeeSymbol: string;
  setOpenFeeTokenModal: Dispatch<SetStateAction<boolean>>;
  setSelectedFeeToken: Dispatch<SetStateAction<string>>;
  setSelectedFeeSymbol: Dispatch<SetStateAction<string>>;
};

export default function CCIPBridgeFeeTokens({
  ccipFees,
  feeTokens,
  openFeeTokenModal,
  selectedFeeSymbol,
  setOpenFeeTokenModal,
  setSelectedFeeToken,
  setSelectedFeeSymbol,
}: ICCIPBridgeFeeTokens) {
  // const [activeModal, setActiveModal] = useState()
  // Render function to display networks
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      // If the modal is open and the clicked target is not within the modal content, close the modal
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenFeeTokenModal(false);
      }
    }

    // If the modal is open, listen for clicks outside it
    if (openFeeTokenModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Clean up the event listener on unmount or when the modal closes
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openFeeTokenModal, setOpenFeeTokenModal]);

  return (
    <section ref={modalRef}>
      <div className="flex justify-between mt-4 text-lg">
        <div className="flex justify-center items-center text-gray-200">
          Fee
        </div>
        {/* <div>Estimated Fee</div> */}
        {/* <div>0 BTCLP</div> */}
        <div className="flex flex-row justify-center items-center">
          <div className="font-thin mr-2">{ccipFees}</div>
          <button
            onClick={() => setOpenFeeTokenModal(!openFeeTokenModal)}
            className="pr-2 flex flex-row justify-center items-center bg-chainlinkBlue hover:bg-opacity-80 rounded-lg"
          >
            <div className="bg-chainlinkMirage rounded-l-lg py-1 px-2">
              <CCIPNetworkFeeTokenIcon
                logoKey={selectedFeeSymbol}
                widthSize={24}
                heightSize={24}
              />
            </div>
            <div className="ml-2">{selectedFeeSymbol} </div>
            <RotatingArrow active={openFeeTokenModal} pixels={18} />
          </button>
        </div>
      </div>

      <div className={`w-full mx-auto flex-end`}>
        <div className="absolute flex justify-end w-full max-w-[400px] h-auto rounded-lg">
          {openFeeTokenModal &&
            feeTokens &&
            Object.entries(feeTokens).map(([key, value]) => {
              return (
                <button
                  key={uuidv4()}
                  onClick={() => {
                    setSelectedFeeToken(value);
                    setSelectedFeeSymbol(key);
                    setOpenFeeTokenModal(false);
                  }}
                  className="flex flex-row justify-start items-center h-auto bg-chainlinkMirage hover:bg-chainlinkMirage p-3"
                >
                  <CCIPNetworkFeeTokenIcon
                    logoKey={key}
                    widthSize={21}
                    heightSize={21}
                  />
                  <div className="ml-1">{key} </div>
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
}
