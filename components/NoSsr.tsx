import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { LayoutProps } from '@/utils/types/next';

const NoSsr = ({ children }: LayoutProps): ReactElement => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false });
