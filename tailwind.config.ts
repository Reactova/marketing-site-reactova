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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-ring': 'var(--sidebar-ring)',
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
