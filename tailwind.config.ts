import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        // Deep Ink Navy 
        primary: {
          50: '#F3F4F6',
          100: '#E2E5EA',
          200: '#C6CCD5',
          300: '#96A0B0',
          400: '#5C677D',
          500: '#232F3E',
          600: '#1B2430',
          700: '#131921', // Main Background/Headers
          800: '#0E121A',
          900: '#0A0D13',
        },
        // Signal Orange
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Primary CTA
          600: '#EA580C',
          700: '#C2410C',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
        },
        error: { 500: '#EF4444', 600: '#DC2626', 700: '#B91C1C' },
        success: { 50: '#F0FDF4', 500: '#22C55E' },
        warning: { 500: '#F59E0B' },
        link: { 50: '#EFF6FF', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8' },
        
        // Semantic Tokens mapping
        surface: {
          page: '#FFFFFF',
          card: '#FFFFFF',
          sunken: '#FAFAFA',
        },
        text: {
          primary: '#131921',
          secondary: '#5C677D',
          tertiary: '#96A0B0',
        },
        border: {
          default: '#E2E5EA',
          subtle: '#F3F4F6',
          strong: '#C6CCD5',
        }
      },
      boxShadow: {
        '1': '0 1px 2px 0 rgba(19, 25, 33, 0.05)',
        '8': '0 8px 16px -4px rgba(19, 25, 33, 0.1), 0 4px 6px -2px rgba(19, 25, 33, 0.05)',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth, professional easing
      }
    },
  },
  plugins: [],
};

export default config;