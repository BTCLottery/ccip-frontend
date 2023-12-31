import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import { Web3OnboardProvider } from '@web3-onboard/react/dist/context';
import { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { AppAuthProps } from '@/utils/types/next';
import Analytics from '@/components/header/Analytics';
import blockNativeProvider from '@/utils/providers/blockNativeProvider';
import ServicesBalances from '@/components/partials/services/ServicesBalances';
import Layout from '@/components/Layout';
import '@total-typescript/ts-reset';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let VConsole: any;

function MyApp({ Component, pageProps }: AppAuthProps): ReactElement {
  return (
    <>
      <Script
        src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
        onLoad={() => {
          (() => new VConsole())();
        }}
      ></Script>
      <Web3OnboardProvider web3Onboard={blockNativeProvider}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            draggable={true}
            closeOnClick={true}
            pauseOnHover={true}
          />
        </Layout>
        <ServicesBalances />
        <Analytics />
        <VercelAnalytics />
      </Web3OnboardProvider>
    </>
  );
}

export default MyApp;
