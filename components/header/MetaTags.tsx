import React from 'react';
import Head from 'next/head';

export default function MetaTags() {
  return (
    <Head>
      <title>{`Bitcoin Lottery - Trustless Chainlink Raffle`}</title>
      <meta
        name="description"
        content="Bitcoin Lottery bridges the gap between players and game creators using the Blockchain to guarantee independent trustless drawings!"
      />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://btclottery.io/" />
      <meta
        property="og:title"
        content="Bitcoin Lottery - BECOME THE LOTTERY"
      />
      <meta
        property="og:description"
        content="Bitcoin Lottery bridges the gap between players and game creators using the Blockchain to guarantee independent trustless drawings!"
      />
      <meta
        property="og:image"
        content="https://btclottery.io/images/games/duelV2.png"
      />

      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://btclottery.io/" />
      <meta
        property="twitter:title"
        content="Bitcoin Lottery - BECOME THE LOTTERY"
      />
      <meta
        property="twitter:description"
        content="Bitcoin Lottery bridges the gap between players and game creators using the Blockchain to guarantee independent trustless drawings!"
      />
      <meta
        property="twitter:image"
        content="https://btclottery.io/images/games/duelV2.png"
      />
    </Head>
  );
}
