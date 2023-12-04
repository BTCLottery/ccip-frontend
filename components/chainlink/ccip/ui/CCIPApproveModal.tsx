// CCIPApproveModal.tsx
// import { formatEther } from '@ethersproject/units';
// import { BigNumber } from 'ethers';
import React, { useEffect, useRef } from 'react';
import useComponentVisibleSingleRef from '@/hooks/useComponentVisibleSingleRef';

interface CCIPApproveModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalApprovalSelection: React.Dispatch<React.SetStateAction<boolean>>;
  tokenKey: string;
  tokenAmount: string;
}

const CCIPApproveModal = ({
  setIsModalOpen,
  setModalApprovalSelection,
  tokenKey,
  tokenAmount,
}: CCIPApproveModalProps) => {
  const modalRef = useRef(null);
  const { active, setActive } =
    useComponentVisibleSingleRef<HTMLDivElement>(modalRef);

  const handleApproveOnce = () => {
    // Logic for one-time approval
    setModalApprovalSelection(true);
    setIsModalOpen(false);
  };

  const handleApproveUnlimited = () => {
    // Logic for unlimited approval
    setModalApprovalSelection(false);
    setIsModalOpen(false);
  };

  // Close modal logic
  useEffect(() => {
    if (!active) {
      setIsModalOpen(false);
    }
  }, [active, setIsModalOpen]);

  return (
    <div ref={modalRef} className="relative">
      <div className="absolute right-0 w-80 rounded-lg bg-chainlinkMirage p-1">
        <button
          className="w-full rounded-lg pl-2 h-20 flex flex-col flex-start bg-chainlinkBlue hover:bg-chainlinkBlue"
          onClick={handleApproveOnce}
        >
          <span className="text-left text-xl">Approve one-time only</span>
          <span className="text-left">
            You&apos;ll give your approval to spend {tokenAmount} {tokenKey}.
          </span>
        </button>
        <button
          className="w-full rounded-lg pl-2 h-20 flex flex-col flex-start hover:bg-chainlinkBlue"
          onClick={handleApproveUnlimited}
        >
          <span className="text-left text-xl">Approve unlimited amount</span>
          <span className="text-left">
            You won&apos;t need to approve again next time you want to spend{' '}
            {tokenKey}.
          </span>
        </button>
        {/* <button className="absolute bg-chainlinkMirage" onClick={closeModal}>Close</button> */}
      </div>
    </div>
  );
};

export default CCIPApproveModal;
