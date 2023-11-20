import React from 'react';
import CCIPBridge from '@/components/chainlink/ccip/CCIPBridge';
import Lottie from 'lottie-react';
import CCIPAnimation from '@/public/lottie/ccip.json';

export default function ChainlinkCCIPBridge() {
  return (
    <>
      <main
        id="dynamicGame"
        className={`subpixel-antialiased font-kanit overflow-x-hidden h-screen w-full`}
      >
        <div className="flex flex-col justify-start mt-32 items-center text-white h-full">
            <CCIPBridge />
        </div>
      </main>
    </>
  );
}
