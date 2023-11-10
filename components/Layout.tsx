import { ReactElement } from 'react';
import { LayoutProps } from '@/utils/types/next';
import NavBar from '@/components/header/NavBar';

export default function Layout(props: LayoutProps): ReactElement {
  return (
    <div className="subpixel-antialiased font-kanit">
      <NavBar />
      <div className={`w-full delay-75 duration-300`}>{props?.children}</div>
    </div>
  );
}
