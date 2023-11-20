import { ReactElement } from 'react';
import LeftNavBar from '@/components/header/partials/LeftNavBar';
import RightNavBar from '@/components/header/partials/RightNavBar';
import LeftDrawer from './partials/LeftDrawer';

export default function NavBar(): ReactElement {
  return (
    <nav
      className="fixed w-full z-50 bg-chainlinkBiscay py-3"
      style={{
        boxShadow: '0px 9px 18px 2px rgba(0,0,0,0.71)',
      }}
    >
      <div className="flex flex-wrap justify-between items-center">
        <LeftNavBar />
        <LeftDrawer />
        <RightNavBar />
      </div>
    </nav>
  );
}
