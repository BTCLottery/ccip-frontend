// LeftDrawer.tsx
import React, { useEffect, useRef } from 'react';
import { RiWechatChannelsLine } from 'react-icons/ri';
import Link from 'next/link';
import {
  FaTelegramPlane,
  FaDiscord,
  FaGithub,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa';
import useGlobalState from '@/store/globalState';
import RotatingArrow from './RotatingArrow';

export default function LeftDrawer() {
  const [sideNavMenuOpen, setSideNavMenuOpen] =
    useGlobalState('sideNavMenuOpen');

  // Render function to display networks
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      // Directly accessing the button via its ID
      const button = document.getElementById('menu-toggle-button');

      // The actual element that was clicked
      const targetElement = event.target as Node; // This gets the actual element clicked

      // Check if the clicked element is the button or a descendant of the button
      if (
        button &&
        (button === targetElement || button.contains(targetElement))
      ) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(targetElement)) {
        setSideNavMenuOpen(false);
      }
    }

    // If the modal is open, listen for clicks outside it
    if (sideNavMenuOpen) {
      // Add event listener when the drawer is open
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      // Remove event listener when the drawer is closed
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Clean up the event listener on unmount or when the modal closes
    return () => {
      if (!sideNavMenuOpen) {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    };
  }, [sideNavMenuOpen, setSideNavMenuOpen]);

  // if (!activeModal) return null;

  return (
    <>
      <aside
        ref={modalRef}
        className={`w-60 fixed delay-75 duration-300 z-20 top-16 flex justify-center text-lg ${
          sideNavMenuOpen ? 'translate-x-0' : 'translate-x-[-260px]'
        }`}
        aria-label="Sidebar"
        id="leftSideBar"
      >
        <div className="min-h-screen overflow-y-auto">
          <div className="flex flex-col items-center mt-4 mx-2">
            <Link
              href="/"
              className="w-56 text-white bg-primaryHighlightTone font-medium rounded-lg text-lg py-2.5 text-center flex justify-around items-center"
            >
              <div className="flex flex-row items-center w-full">
                <div className="mx-2 w-1/6 flex">
                  <RiWechatChannelsLine className="w-6" size={'18px'} />
                </div>
                <div className="mx-2 w-full flex justify-center items-center">
                  CCIP Bridge
                </div>
                <div className="mx-2 w-1/6 flex flex-end justify-end">
                  <div className="w-6 flex flex-end">
                    <RotatingArrow active={false} pixels={18} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center mt-4 mx-2">
            <Link
              href="https://docs.btclottery.io/bitcoin-lottery-protocol"
              target="_blank"
              className="w-56 text-lg text-white bg-primaryHighlightTone font-medium rounded-lg py-2.5 text-center flex justify-around items-center"
            >
              Documentation
            </Link>
          </div>

          <div className="flex flex-col items-center mt-4 mx-2">
            <div className="mb-4">Social Media</div>

            <div className="flex mt-5 sm:mt-0 space-x-6 sm:justify-centerjustify-center m-auto md:m-0">
              <Link
                href="https://www.facebook.com/btclottery.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-white-300 hover:text-white-900 dark:hover:text-white">
                  <FaFacebook />
                  <span className="sr-only">Facebook page</span>
                </div>
              </Link>
              <Link
                href="https://twitter.com/BTCLProtocol"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-white-300 hover:text-white-900 dark:hover:text-white">
                  <FaTwitter />
                  <span className="sr-only">Twitter page</span>
                </div>
              </Link>

              <div className="flex flex-col justify-center">
                <Link
                  href="https://discord.com/channels/806829532081815552/806829532081815555"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-white-300 hover:text-white-900 dark:hover:text-white">
                    <FaDiscord />
                    <span className="sr-only">Discord account</span>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col justify-center">
                <Link
                  href="https://t.me/BitcoinLotteryProtocol"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-white-300 hover:text-white-900 dark:hover:text-white">
                    <FaTelegramPlane />
                    <span className="sr-only">Telegram account</span>
                  </div>
                </Link>
              </div>
              <Link
                href="https://github.com/btclottery"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-white-300 hover:text-white-900 dark:hover:text-white">
                  <FaGithub />
                  <span className="sr-only">GitHub account</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
