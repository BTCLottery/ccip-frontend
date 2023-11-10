import Image, { StaticImageData } from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { FC } from 'react';

type TokenBalancesType = {
  logo: StaticImageData;
  label: string;
  balance: string;
  isLast: boolean;
  spaceTop?: boolean;
};

const BalancesRow: FC<TokenBalancesType> = ({
  logo,
  label,
  balance,
  isLast,
  spaceTop,
}) => {
  return (
    <li
      key={uuidv4()}
      className={`flex w-full mx-4 justify-between
      ${spaceTop ? '' : 'mt-2'}
      ${isLast ? '' : 'pb-2'}`}
    >
      <div className="flex">
        <div className="w-[25px] h-[25px] mr-2">
          <Image
            src={logo}
            width={25}
            height={25}
            alt={label}
            priority={true}
            className="h-[25px] w-[25px]"
          />
        </div>
        <span className="ml-2 text-sm flex items-center">{label}</span>
      </div>
      <span className="flex text-sm items-center">{balance}</span>
    </li>
  );
};

export default BalancesRow;
