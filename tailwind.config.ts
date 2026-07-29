import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
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
        // Lift used on hover for cards and feature tiles
        'lift': '0 18px 32px -12px rgba(19, 25, 33, 0.16), 0 6px 12px -6px rgba(19, 25, 33, 0.08)',
        // Warm halo for accent-coloured CTAs
        'accent': '0 8px 24px -8px rgba(249, 115, 22, 0.55)',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth, professional easing
        'soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Slight overshoot
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(19,25,33,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(19,25,33,0.045) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '48px 48px',
        'grid-sm': '24px 24px',
      },
      keyframes: {
        'aurora': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '0.55' },
          '33%': { transform: 'translate3d(6%, -8%, 0) scale(1.12)', opacity: '0.8' },
          '66%': { transform: 'translate3d(-5%, 6%, 0) scale(0.95)', opacity: '0.45' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ping-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.45' },
          '80%, 100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        'caret': {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
        },
        // Travelling dash — reads as a signal firing along a network edge
        'signal': {
          '0%': { strokeDashoffset: '240' },
          '100%': { strokeDashoffset: '0' },
        },
        'node-pulse': {
          '0%, 100%': { r: '4', opacity: '0.55' },
          '50%': { r: '6', opacity: '1' },
        },
        'sheen': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        // Route entrance. Opacity only — a transform here would make the
        // wrapper the containing block for the fixed navbar.
        'page-enter': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        // On-mount entrance for above-the-fold content
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'aurora': 'aurora 18s ease-in-out infinite',
        'aurora-slow': 'aurora 26s ease-in-out infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.6s linear infinite',
        'orbit': 'orbit 34s linear infinite',
        'orbit-reverse': 'orbit 46s linear infinite reverse',
        'marquee': 'marquee 32s linear infinite',
        'ping-ring': 'ping-ring 2.6s cubic-bezier(0, 0, 0.2, 1) infinite',
        'caret': 'caret 1.15s step-end infinite',
        'signal': 'signal 3.2s linear infinite',
        'node-pulse': 'node-pulse 3.4s ease-in-out infinite',
        'sheen': 'sheen 2.4s ease-in-out infinite',
        'page-enter': 'page-enter 280ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;