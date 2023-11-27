import { ReactElement } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import NoPageButton from '@/components/partials/buttons/NoPageButton';
import linkLogo from '@/public/images/chainlink-svg/Chainlink Logo White.svg';

function FourOhFour(): ReactElement {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <Head>
        <title>404 - Page not found</title>
        <meta name="description" content="Page not found" />
      </Head>
      <Image src={linkLogo} alt="Chainlink" width={200} height={200} />
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-chainlinkMirage px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <NoPageButton />
    </div>
  );
}

export default FourOhFour;
