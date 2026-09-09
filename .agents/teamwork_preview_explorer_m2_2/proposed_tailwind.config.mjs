/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Fondo Abisal Oficial (#060A1A)
        abisal: '#060A1A',
        abyssal: '#060A1A',

        // Superficies y Tarjetas Midnight Navy (100% sólidas mates)
        midnight: {
          DEFAULT: '#0A1226',
          surface: '#0A1226',
          card: '#0A1226',
          elevated: '#0E172F',
          surface2: '#0E172F',
        },

        // Bordes y Separadores Mates Discretos
        border: {
          DEFAULT: '#1E293B',
          slate: '#1E293B',
          abyssal: '#1E3A5F',
          muted: '#1E293B',
          elevated: '#1E3A5F',
        },

        // Botón de Acción Primario Cyan (#38BDF8)
        primary: {
          DEFAULT: '#38BDF8',
          hover: '#0EA5E9',
          active: '#0284C7',
          contrast: '#060A1A',
        },
        action: {
          DEFAULT: '#38BDF8',
          cyan: '#38BDF8',
          hover: '#0EA5E9',
          active: '#0284C7',
        },

        // Acentos Secundarios Oro Satinado / Ámbar
        gold: {
          DEFAULT: '#D4AF37',
          satin: '#D4AF37',
          hover: '#F59E0B',
        },
        amber: {
          DEFAULT: '#F59E0B',
          accent: '#F59E0B',
        },
        accent: {
          DEFAULT: '#D4AF37',
          gold: '#D4AF37',
          amber: '#F59E0B',
        },

        // Textos de alto contraste sobre fondo abisal
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        cinzel: ['Cinzel', 'Playfair Display', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        none: 'none',
        // Sombras mates sólidas sin resplandor bioluminiscente ni neón
        'matte-sm': '0 1px 2px 0 #000000',
        'matte-md': '0 4px 6px -1px #000000, 0 2px 4px -2px #000000',
        'matte-lg': '0 10px 15px -3px #000000, 0 4px 6px -4px #000000',
      },
    },
  },
  plugins: [],
};
