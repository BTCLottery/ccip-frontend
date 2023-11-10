import Image from 'next/image';
import Head from 'next/head';
import { ReactElement } from 'react';
import blocknativeIcon from '@/public/icons/BitcoinLotteryProtocolPurpleLogo.svg';
import NoPageButton from '@/components/partials/buttons/NoPageButton';

function FourOhFour(): ReactElement {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <Head>
        <title>404 - Page not found</title>
        <meta name="description" content="Page not found" />
      </Head>
      <Image
        src={blocknativeIcon}
        alt="BTC LOTTERY LOGO"
        width={100}
        height={100}
      />
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#FF9900] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <NoPageButton />
    </div>
  );
}

export default FourOhFour;
