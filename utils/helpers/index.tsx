import { ReactElement } from 'react';
import { WalletState } from '@web3-onboard/core/dist/types';
import { getAddress } from '@ethersproject/address';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import RotatingArrow from '@/components/header/partials/RotatingArrow';
import Image from 'next/image';

function showTemporaryButtonText(
  connecting: boolean,
  wallet: WalletState | null,
  walletOpen: boolean
): string | ReactElement {
  if (connecting) {
    return (
      <div className="font-kanit font-medium tracking-[1px]">Connecting</div>
    );
  }

  if (wallet) {
    const address = getAddress(wallet.accounts[0].address.toString());
    const ensName = wallet.accounts[0].ens?.name;
    const ensAvatar = wallet.accounts[0].ens?.avatar?.url;
    //                  ^?
    return (
      <div className="flex">
        {ensAvatar && (
          <>
            <span className="ml-1 mr-2 flex flex-col justify-center">
              <Image src={ensAvatar} width={21} height={21} alt="ENS Icons" />
            </span>
            <span className="font-kanit font-medium tracking-[1px] hidden md:flex flex-col justify-center text-xs">
              {ensName}
            </span>
          </>
        )}
        {!ensAvatar && (
          <>
            <span className="ml-1 mr-2 flex flex-col justify-center">
              <Jazzicon diameter={21} seed={jsNumberForAddress(address)} />{' '}
            </span>
            <span className="font-kanit font-medium tracking-[1px] hidden md:flex flex-col justify-center text-xs">
              {address.slice(0, 6)}...{address.slice(address.length - 4)}
            </span>
          </>
        )}
        <div className="flex items-center">
          <RotatingArrow active={walletOpen} pixels={18} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <span className="text-base font-kanit sm:font-medium sm:tracking-[1px] sm:mx-2">
        Connect Wallet
      </span>
    </div>
  );
}

const getActualYear = (): number => {
  return new Date().getFullYear();
};

const helpers = {
  showTemporaryButtonText,
  getActualYear,
};

export default helpers;
