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

        // Paleta Semántica Biológica (Hito M1) — 100% Sólido Mate (WCAG AAA)
        bio: {
          digestivo: {
            DEFAULT: '#2E854B',
            light: '#2E854B',
            dark: '#3E9B67',
            badge: '#E8F5EC',
            badgeDark: '#0C1F16',
            badgeBorder: '#A8D8B6',
            badgeBorderDark: '#1A3D2C',
            text: '#13522E',
            textDark: '#6AC894',
            surface: '#F3FAF5',
            surfaceDark: '#0E241A',
          },
          osteoarticular: {
            DEFAULT: '#C25E3E',
            light: '#C25E3E',
            dark: '#C86241',
            badge: '#FDF0EA',
            badgeDark: '#24120D',
            badgeBorder: '#ECC3B2',
            badgeBorderDark: '#4A2419',
            text: '#8A3618',
            textDark: '#E88F71',
            surface: '#FAF2EE',
            surfaceDark: '#28150F',
          },
          respiratorio: {
            DEFAULT: '#2B74AA',
            light: '#2B74AA',
            dark: '#3688C7',
            badge: '#EAF2F9',
            badgeDark: '#0B1A28',
            badgeBorder: '#AECBE5',
            badgeBorderDark: '#19354E',
            text: '#124B73',
            textDark: '#6BAEE3',
            surface: '#F1F6FB',
            surfaceDark: '#0E2032',
          },
          nervioso: {
            DEFAULT: '#7C4499',
            light: '#7C4499',
            dark: '#8E55B0',
            badge: '#F4EFF9',
            badgeDark: '#1B0F28',
            badgeBorder: '#D0BEE0',
            badgeBorderDark: '#392051',
            text: '#532A78',
            textDark: '#BC91DF',
            surface: '#F7F3FA',
            surfaceDark: '#211332',
          },
        },

        // Paleta Térmica Biológica (Estrés Activo vs. Reparación Celular)
        thermal: {
          stress: '#F97316',
          stressLight: '#FB923C',
          stressDark: '#C2410C',
          healing: '#38BDF8',
          healingDark: '#0284C7',
          healingSurface: '#0E2032',
          stressSurface: '#28150F',
        },
      },
      fontFamily: {
        serif: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['Cinzel', 'Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        grotesk: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
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
