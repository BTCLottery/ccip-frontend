// hooks/useInitialModal.js
import { useEffect, useState } from 'react';

const useInitialModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isShownBefore = localStorage.getItem('modalShown');

    if (!isShownBefore) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('modalShown', 'true');
  };

  return { isOpen, closeModal };
};

export default useInitialModal;
