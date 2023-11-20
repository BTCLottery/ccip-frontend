import { ReactElement } from 'react';
import MenuWalletButton from '@/components/partials/buttons/MenuWalletButton';
import MenuNetworkButton from '@/components/partials/buttons/MenuNetworkButton';

export default function RightNavBar(): ReactElement {
  return (
    <div className="flex order-2 sm:pr-2">
      <MenuNetworkButton />
      <MenuWalletButton />
    </div>
  );
}
