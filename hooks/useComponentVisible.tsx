import {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react';

export default function useComponentVisible<
  T1 extends HTMLElement,
  T2 extends HTMLElement,
>(): {
  refs: [MutableRefObject<T1 | null>, MutableRefObject<T2 | null>];
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  handleButtonClick: () => void;
} {
  const [active, setActive] = useState(false);
  const ref1 = useRef<T1 | null>(null);
  const ref2 = useRef<T2 | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref1.current &&
      !ref1.current.contains(event.target as Node) &&
      ref2.current &&
      !ref2.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleButtonClick = () => {
    setActive(prevActive => !prevActive);
  };

  return { refs: [ref1, ref2], active, setActive, handleButtonClick };
}
