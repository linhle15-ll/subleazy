/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      montserrat: ['var(--font-montserrat)', 'sans-serif'],
    },
    extend: {
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '600',
        semibold: '800',
        bold: '900',
      },
      colors: {
        dark: '#000000',
        light: '#ffffff',
        yellow: '#F6D02F',
        darkerOrange: '#ff6f00',
        primaryOrange: '#ff7b00' /** main */,
        lightOrange: '#ffa652',
        veryLightOrange: '#ffcd90',
        lightestOrange: '#fff4df',
        lightGray: '#f5f5f5',
      },

      spacing: {
        10: '0.5em',
        15: '60px',
        20: '80px',
        25: '100px',
        30: '120px',
        40: '160px',
        50: '200px',
        60: '240px',
      },
    },
  },
  plugins: [],
};
