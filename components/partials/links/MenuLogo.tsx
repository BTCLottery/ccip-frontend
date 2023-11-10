import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useWindowSize } from 'usehooks-ts';

export default function MenuLogo(): ReactElement {
  const { width } = useWindowSize();
  return (
    <Link href="/" className="flex">
      <div className="relative">
        <Image
          src="/icons/BTCLottery-Logo.svg"
          className="pointer-events-none border-coolBackgroundShade1"
          alt="Bitcoin Lottery Logo"
          width={238}
          height={40}
          // sizes={ width < 580 ? '150px' : '238px' }
          // fill={true}
          // objectFit="cover"
          style={{ width: width < 580 ? '115px' : '140px' }}
          priority={true}
        />
      </div>
    </Link>
  );
}
