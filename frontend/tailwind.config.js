/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          secondary: 'var(--accent-secondary)',
          foreground: 'var(--accent-foreground)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)'
        },
        card: {
          DEFAULT: 'var(--card)',
        },
        ring: 'var(--ring)'
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(26,26,26,0.04)',
        md: '0 4px 12px rgba(26,26,26,0.06)',
        lg: '0 8px 24px rgba(26,26,26,0.08)',
        accent: '0 4px 12px rgba(184,134,11,0.2)',
      },
      maxWidth: {
        '5xl': '64rem',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      }
    },
  },
  plugins: [],
}
