module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    // ...(process.env.NODE_ENV === 'production'
    //   ? {
    //       '@fullhuman/postcss-purgecss': {
    //         content: [
    //           './components/**/*.{js,ts,jsx,tsx}',
    //           './pages/**/*.{js,ts,jsx,tsx}',
    //         ],
    //         defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    //       },
    //       cssnano: {},
    //     }
    //   : {}),
  },
};
