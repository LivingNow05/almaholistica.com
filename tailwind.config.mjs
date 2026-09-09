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

        // Luz de Acento Única Azul Pizarra Mate (#779DD1)
        slateBlue: {
          DEFAULT: '#779DD1',
          hover: '#526E97',
          active: '#425A7D',
        },
        cyan: {
          DEFAULT: '#779DD1',
          soft: '#779DD1',
          hover: '#526E97',
          active: '#425A7D',
          legacy: '#38BDF8', // 38BDF8: Token de compatibilidad
        },

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

        // Botón de Acción Primario Mate (#779DD1)
        primary: {
          DEFAULT: '#779DD1',
          hover: '#526E97',
          active: '#425A7D',
          contrast: '#060A1A',
          legacy: '#38BDF8',
        },
        action: {
          DEFAULT: '#779DD1',
          cyan: '#779DD1',
          hover: '#526E97',
          active: '#425A7D',
        },

        // Textos de alto contraste sobre fondo abisal
        text: {
          primary: '#FFFFFF',
          heading: '#F8FAFC',
          body: '#94A3B8',
          muted: '#64748B',
          secondary: '#94A3B8',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Playfair Display', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['Cinzel', 'Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
        body: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        'card-editorial': '2.5rem',
      },
      boxShadow: {
        none: 'none',
        // Sombra suave para botones píldora blancos
        'pill-white': '0 8px 24px rgba(255, 255, 255, 0.08)',
        // Sombras mates sólidas sin resplandor bioluminiscente ni neón
        'matte-sm': '0 1px 2px 0 #000000',
        'matte-md': '0 4px 6px -1px #000000, 0 2px 4px -2px #000000',
        'matte-lg': '0 10px 15px -3px #000000, 0 4px 6px -4px #000000',
      },
    },
  },
  plugins: [],
};
