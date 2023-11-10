/* eslint @typescript-eslint/no-var-requires: "off" */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    // './node_modules/flowbite/**/*.js',
    // './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    // typography: theme => ({}),
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      // Chainlink Brand Colors
      chainlinkBlue: '#375bd2',
      chainlinkMirage: '#0c162c',
      chainlinkBiscay: '#1a2b6b',
      chainlinkPerano: '#a0b3f2',
      chainlinkLavender: '#dfe7fb',
      chainlinkZircon: '#f5f7fd',
      // dynamic
      transparent: 'transparent',
      white: '#FFFFFF',
      primaryActions: '#F6C860',
      primaryTextTone: '#DBAEFF',
      primaryStroke: '#8000FF',
      primaryPurple: '#8021DF',
      primaryHighlight: '#501A87',
      primaryHighlightTone: '#551794',
      primaryPurpleBgLighter: '#410979',
      primaryPurpleBgDarker: '#1F103D',
      primaryPurpleBgDarkest: '#1D0435',
      primaryPurpleBgBorder: '#4E207B',
      primaryPurpleNavbar: '#4d269d',
      secondaryPurpleNavbar: '#7300E5',
      secondaryPurpleHistory: '#A64EFF',
      secondaryDarkPurple: '#380967',
      secondaryTicketPurple: '#411b79',
      secondaryPurpleStroke: '#49287D',
      secondaryDarkerTicketSection: '#201731',
      secondaryPurpleTicketSection: '#291E3F',
      secondaryTextTicketSection: '#7853BF',
      secondaryGameSection: '#6316B2',
      secondaryBlackPurple: '#1E0536',
      secondaryBlackText: '#161616',
      secondaryBlackPurpleBg: '#1E1133',
      secondaryBlackBg: '#141318',
      secondaryBlackBg1: '#202020',
      secondaryBlackButton: '#2C1B47',
      // dynamic
      coolOrange: '#ffaf3f',
      primaryColor: '#FF9900',
      secondaryColor: '#9023e0',
      alternativeColor: '#7917c0',
      nftRare: '#2a1d5c',
      nftEpic: '#360e4c',
      nftLegendary: '#a48a20',
      coolPurple: '#491d7f',
      coolSpinner: '#53268a',
      coolBackground: '#1d0733',
      coolBackgroundShade1: '#3C0F69',
      coolBackgroundShade2: '#8420E8',
      prizeBgSection: '#3B1B78',
      gray: colors.gray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      kanit: ['Kanit', 'sans-serif'],
      sans: ['Josefin Sans', 'sans-serif'],
      sansExt:
        'Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif',
      serif: ['Merriweather', 'serif'],
      longText: ['Roboto', 'Arial', 'sans-serif'],
    },
    extend: {
      animation: {
        'fade-in-out': 'fadeInOut 1.5s infinite',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        'accent-1': '#FFF',
        dark: '#1d0733',
      },
      cursor: {
        pointer: 'url(/icons/edit-icon.svg), pointer',
      },
    },
  },
  variants: {
    extend: {},
  },
};
