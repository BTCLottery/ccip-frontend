import Link from 'next/link';
import { ReactElement } from 'react';

export default function NoPageButton(): ReactElement {
  return (
    <button className="mt-5">
      <Link
        href="/"
        className="relative inline-block text-sm font-medium text-chainlinkZircon group active:text-orange-500 focus:outline-none focus:ring"
        prefetch={false}
      >
        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-text-chainlinkZircon group-hover:translate-y-0 group-hover:translate-x-0"></span>

        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
          Go home
        </span>
      </Link>
    </button>
  );
}
