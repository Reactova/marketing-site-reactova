import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0F1A',
        surface:    '#1A1A2E',
        primary:    '#7C6AF7',
        accent:     '#F97316',
        success:    '#22C55E',
        error:      '#EF4444',
        border:     '#1E1E2E',
        text: {
          primary: '#E8E8F0',
          muted:   '#6B6B80',
        },
      },
      fontFamily: {
        syne:   ['Syne', 'sans-serif'],
        dm:     ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg:      '12px',
        xl:      '16px',
        full:    '9999px',
      },
      animation: {
        'pulse-dot':   'pulseDot 2s ease-in-out infinite',
        'drift-1':     'drift1 12s ease-in-out infinite alternate',
        'drift-2':     'drift2 15s ease-in-out infinite alternate',
        'drift-3':     'drift3 10s ease-in-out infinite alternate',
        'fade-up':     'fadeUp 0.7s ease both',
        'blink':       'blink 1s step-end infinite',
        'underline-in':'underlineIn 0.8s ease 0.9s both',
      },
      keyframes: {
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.5', transform: 'scale(0.7)' },
        },
        drift1: { to: { transform: 'translate(60px, 80px)' } },
        drift2: { to: { transform: 'translate(-50px, -70px)' } },
        drift3: { to: { transform: 'translate(30px, -50px)' } },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.2' },
        },
        underlineIn: {
          to: { transform: 'scaleX(1)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
