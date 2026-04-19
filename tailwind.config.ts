import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '640px',
          md: '960px',
          lg: '1080px',
          xl: '1280px',
        },
      },
      colors: {
        /* Light theme brand palette */
        background:    '#FFFFFF',
        surface:       '#F7F7FB',
        'surface-2':   '#EFEFF8',
        primary:       '#4F46E5',
        'primary-d':   '#3730A3',
        'primary-l':   '#6366F1',
        accent:        '#7C3AED',
        cta:           '#4F46E5',
        success:       '#059669',
        error:         '#DC2626',
        border:        '#E2E2EE',
        'border-d':    '#CBCBDF',
        text: {
          DEFAULT: '#0E0E18',
          '2':     '#3D3D5C',
          muted:   '#6D6D8A',
          faint:   '#A0A0BC',
        },
      },
      fontFamily: {
        syne:  ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sans:  ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg:      '10px',
        xl:      '14px',
        '2xl':   '18px',
        full:    '9999px',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease both',
        'pulse-dot':  'pulseDot 2.2s ease-in-out infinite',
        'blink':      'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.3', transform: 'scale(0.6)' },
        },
        blink: {
          '0%,50%':   { opacity: '1' },
          '51%,100%': { opacity: '0' },
        },
      },
      boxShadow: {
        card:       '0 1px 3px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.04)',
        'card-hover':'0 4px 16px rgba(79,70,229,0.08)',
        btn:        '0 1px 3px rgba(79,70,229,0.18), 0 6px 20px rgba(79,70,229,0.12)',
        'btn-hover': '0 2px 6px rgba(79,70,229,0.22), 0 10px 28px rgba(79,70,229,0.16)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
