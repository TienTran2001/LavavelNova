import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito Sans', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      width: {
        sideBar: '240px',
      },
      margin: {
        sideBar: '240px',
        50: '50px',
      },
      colors: {
        'gray/600': '#475569',
        'gray/500': '#64748B',
        'gray/400': '#94A3B8',
        'gray/300': '#CBD5E1',
        'gray/100': '#F1F5F9',
        'primary/500': '#0EA5E9',
        'green/500': '#22C55E',
        'red/500': '#EF4444',
      },
      fontSize: {
        36: '2.25rem',
        32: '2rem',
        16: '1rem',
        14: '0.875rem',
        12: '0.74rem',
      },
      fontWeight: {
        800: '800',
        700: '700',
        600: '600',
        500: '500',
        400: '400',
      },
      borderRadius: {
        16: '1rem',
      },
    },
  },
  plugins: [],
};
export default config;
