import React, { useState, useEffect, useRef } from 'react';

function useComponentVisibleSingleRef<T extends HTMLElement>(
  modalRef: React.RefObject<T>
) {
  const [active, setActive] = useState(true);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return { active, setActive };
}

export default useComponentVisibleSingleRef;
