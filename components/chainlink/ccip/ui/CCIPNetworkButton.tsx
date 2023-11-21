import React, { Dispatch, SetStateAction, useState } from 'react';
import CCIPProviderIcon from '@/components/chainlink/ccip/ui/CCIPProviderIcon';
import CCIPNetworkMenu from '@/components/chainlink/ccip/ui/CCIPNetworkMenu';

interface ICCIPButtonProps {
  setFromToNetwork: Dispatch<SetStateAction<string>>;
  fromTo: string;
  networkReferenceFrom: string;
  networkReferenceTo: string;
  networkName: string;
  networkStage: string;
  networkLanes: string[];
  leftOrRight: string;
}

const CCIPNetworkButton: React.FC<ICCIPButtonProps> = ({
  setFromToNetwork,
  fromTo,
  networkReferenceFrom,
  networkReferenceTo,
  networkName,
  networkStage,
  networkLanes,
  leftOrRight
}) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  // This function will be invoked when the button is clicked
  const handleClick = () => {
    // Handle your logic for button click here.
    console.log(`${fromTo} button clicked for network ${networkName}`);
    setActiveModal(!activeModal);
    // setFromToNetwork(networkReference)
    // You may want to call some function like initiating a transaction or changing the network.
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center justify-center bg-chainlinkBlue hover:bg-opacity-80 rounded-lg mt-4 w-40 h-20"
    >
      {/* <Image src={networkImages("ethereumMainnet")} width={40} height={40} alt="chain" /> */}
      <CCIPProviderIcon
        network={fromTo === 'From' ? networkReferenceFrom : networkReferenceTo}
        widthSize={36}
        heightSize={36}
      />
      <div className="flex flex-col items-start ml-3">
        <div className="text-gray-200 text-md"> {fromTo} </div>
        <div className="text-white text-lg"> {networkName}</div>
        <div className="text-gray-100 text-sm"> {networkStage}</div>
      </div>
      <CCIPNetworkMenu
        fromTo={fromTo}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        networkReferenceFrom={networkReferenceFrom}
        networkReference={
          fromTo === 'From' ? networkReferenceFrom : networkReferenceTo
        }
        leftOrRight={leftOrRight}
        setFromToNetwork={setFromToNetwork}
        networkLanes={networkLanes}
      />
    </button>
  );
};
export default CCIPNetworkButton;
