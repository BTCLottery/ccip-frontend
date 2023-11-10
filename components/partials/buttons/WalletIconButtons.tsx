import { useState } from 'react';
import Image from 'next/image';
import { WalletButtonProps } from '@/utils/types/wallet';

const WalletIconButtons = ({
  img,
  alt,
  altText,
  isLast,
  onClick,
}: WalletButtonProps) => {
  const [onHover, setOnHover] = useState(false);
  const [newText, setNewText] = useState(alt);

  const changeCopy = (txt: string) => {
    setNewText(txt);
    const timer = setTimeout(() => {
      setNewText(alt);
    }, 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="flex flex-wrap justify-center place-content-center self-center">
      <button
        className="p-1 mx-1 bg-secondaryColor rounded-lg"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        onClick={() => {
          onClick();
          changeCopy(altText);
        }}
      >
        <Image src={img} width={15} height={15} alt={alt} />
      </button>
      {onHover && (
        <span
          className={`text-xs absolute mt-7 ${isLast ? '-translate-x-5' : ''}`}
        >
          {newText}
        </span>
      )}
    </div>
  );
};

export default WalletIconButtons;
