// eslint-disable-next-line
require('dotenv').config();
// eslint-disable-next-line
// const withVideos = require('next-videos');

// eslint-disable-next-line
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // swcMinify: process.env.NEXT_PUBLIC_DEVELOPMENT === 'true',
  swcMinify: false,
  // async redirects() {
  //   return [
  //     {
  //       source: '/index.html',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
// module.exports = withVideos(nextConfig);
