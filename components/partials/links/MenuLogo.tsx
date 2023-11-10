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
          // could use chainlink svg here, but png has transparency
          src="/images/chainlink-png/Chainlink-Logo-White.png"
          className="pointer-events-none border-coolBackgroundShade1"
          alt="Chainlink Logo"
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
