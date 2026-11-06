/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F2FF',
          100: '#EAE6FF',
          200: '#D5CCFF',
          500: '#6C5CE7',
          600: '#5F46E8',
          700: '#4C28D6',
        },
        slate: {
          850: '#151E2E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(37, 50, 75, 0.05), 0 2px 6px rgba(37, 50, 75, 0.02)',
        'card-hover': '0 20px 40px -10px rgba(37, 50, 75, 0.09), 0 4px 10px rgba(37, 50, 75, 0.04)',
        'glow-purple': '0 0 25px rgba(108, 92, 231, 0.35)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'scan': 'scan 4s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-20%)', opacity: '0.4' },
          '100%': { transform: 'translateY(120%)', opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
};
