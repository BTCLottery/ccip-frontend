import { ReactElement } from 'react';
import LeftNavBar from '@/components/header/partials/LeftNavBar';
import RightNavBar from '@/components/header/partials/RightNavBar';
import LeftDrawer from './partials/LeftDrawer';

export default function NavBar(): ReactElement {
  return (
    <nav className="fixed w-full z-50 bg-chainlinkBiscay py-3">
      <div className="flex flex-wrap justify-between items-center">
        <LeftNavBar />
        <LeftDrawer />
        <RightNavBar />
      </div>
    </nav>
  );
}
