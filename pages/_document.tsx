import { Html, Head, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

const referrer = 'strict-origin';

export default function Document(): ReactElement {
  return (
    <Html prefix="og: http://ogp.me/ns#" lang="en">
      <Head>
        {/* <title>Chainlink CCIP</title> */}
        <meta property="og:title" content="Chainlink CCIP" key="title" />
        <meta
          name="description"
          content="The era of secure blockchain interoperability has arrived."
        />
        <meta name="referrer" content={referrer} />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="fortmatic-site-verification" content="O24M5eQGcCrroriY" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" />
        <style>
          {`
            html {
              scroll-behavior: smooth;
              -webkit-user-select:none;
              -khtml-user-select:none;
              -moz-user-select:none;
              -ms-user-select:none;
              -o-user-select:none;
              user-select:none;
            }
            :root {
              --account-center-z-index: 50;
            }
        `}
        </style>
      </Head>
      <body className="bg-chainlinkZircon text-white">
        <Main />
        <div id="modal-root" />
        <NextScript />
      </body>
    </Html>
  );
}
