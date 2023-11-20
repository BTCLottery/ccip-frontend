import { ReactElement } from 'react';
import MenuOpenButton from '@/components/partials/buttons/MenuOpenButton';
import MenuLogo from '@/components/partials/links/MenuLogo';

export default function LeftNavBar(): ReactElement {
  return (
    <div className="flex flex-wrap items-center pl-1">
      <MenuOpenButton />
      <MenuLogo />
    </div>
  );
}
