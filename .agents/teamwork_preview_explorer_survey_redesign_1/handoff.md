# Reporte de Investigación de Fase 0 (Survey): Rediseño de Alta Gama (R1 y R3)

**Proyecto:** Alma Holística (`almaholistica.com`)  
**Agente:** `teamwork_preview_explorer_survey_redesign_1`  
**Directorio de trabajo:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_redesign_1/`  
**Fecha:** 2026-09-06T17:18:00Z  
**Alcance:** Fase 0 — Survey & Discovery: R1 (Estilo Visual Minimalista Editorial) y R3 (Tipografía Editorial Serena)  

---

## 1. Observation (Observaciones Directas y Evidencia Empírica)

A través de inspección directa del código fuente, búsquedas con patrones regex y análisis de configuración, se registraron las siguientes observaciones empíricas exactas:

### 1.1. Inventario Exhaustivo de Tonos Amarillos y Dorados (`#F59E0B`, `#D4AF37`, `amber`, `gold`, `yellow`)

El comando `grep -rnIE "#F59E0B|#D4AF37|amber|gold|yellow" src/ public/ tailwind.config.mjs` identificó las siguientes ubicaciones exactas:

1. **`tailwind.config.mjs`** (Líneas 46-60):
   - Línea 47-51: Bloque `gold: { DEFAULT: '#D4AF37', satin: '#D4AF37', hover: '#F59E0B' }`
   - Línea 52-55: Bloque `amber: { DEFAULT: '#F59E0B', accent: '#F59E0B' }`
   - Línea 56-60: Bloque `accent: { DEFAULT: '#D4AF37', gold: '#D4AF37', amber: '#F59E0B' }`

2. **`src/styles/global.css`** (Líneas 30-31, 163-166, 169-182, 191-196):
   - Línea 30: `--color-accent-gold: #D4AF37;`
   - Línea 31: `--color-accent-amber: #F59E0B;`
   - Línea 164: `border-color: #D4AF37;` (en `.btn-action-secondary:hover`)
   - Línea 165: `color: #D4AF37;` (en `.btn-action-secondary:hover`)
   - Línea 169-182: Definición de clase `.badge-gold` con `color: #D4AF37;` y `border: 1px solid #D4AF37;`
   - Línea 192-196: Definición de clase `.subheading-gold` con `color: #D4AF37;`

3. **`src/components/Navbar.astro`** (Líneas 39, 42):
   - Línea 39: `group-hover:text-[#D4AF37]` en el nombre de la marca.
   - Línea 42: `text-[#D4AF37]` en el subtítulo "Biodescodificación & Sanación".
   - Línea 83: Botón CTA desktop `rounded-lg bg-[#38BDF8]` (formato rectangular en vez de píldora blanca).
   - Línea 144: Botón CTA mobile `rounded-lg bg-[#38BDF8]` (formato rectangular en vez de píldora blanca).

4. **`src/components/Footer.astro`** (Líneas 91, 113, 136, 160):
   - Línea 91: `text-[#D4AF37]` en enlace "Ver las 45 Dolencias y Síntomas &rarr;".
   - Línea 113: `text-[#D4AF37]` en badge "+8 países más".
   - Línea 136: `text-[#D4AF37]` en estado "Atención terapéutica activa".
   - Línea 160: `text-[#D4AF37]` en título `Descargo de Responsabilidad Médica y Terapéutica`.
   - Línea 145: Botón `rounded-md bg-[#38BDF8]` (no píldora).

5. **`src/components/react/WhatsAppQuizModal.tsx`** (Líneas 5, 255, 278, 643):
   - Línea 5: Comentario de encabezado citando `#D4AF37`.
   - Línea 255: `text-[#D4AF37]` en subtítulo "Evaluación & Agendamiento".
   - Línea 278: `text-[#D4AF37]` en indicador de paso "Paso {step} de 4".
   - Línea 643: `bg-[#0E172F] text-[#D4AF37] border border-[#D4AF37]` en badge "Evaluación Preliminar Completada".
   - Línea 237: Contenedor exterior con `rounded-2xl` (en vez de `rounded-[2.5rem]`).
   - Línea 697: Botón final de agendamiento con `rounded-xl bg-[#38BDF8]` (en vez de píldora blanca `rounded-full bg-white`).

6. **`src/pages/index.astro`** (Líneas 6, 116, 117, 149, 163, 199, 229, 316, 383, 401, 426, 444, 499, 519, 554, 616):
   - Línea 116-117: Badge hero `border border-[#D4AF37] text-[#D4AF37]` y punto `bg-[#D4AF37]`.
   - Línea 149: Botón secundario hero `hover:border-[#D4AF37] hover:text-[#D4AF37]`.
   - Línea 163: Métrica `text-[#D4AF37]` en "20 Países atendidos".
   - Línea 199: Eyebrow `text-[#D4AF37]` en "Fundamento Terapéutico".
   - Línea 229: Icono `text-[#D4AF37]` en pilar 2 "El Sentido Biológico".
   - Línea 316: Badge de sistema `text-[#D4AF37]` en tarjetas de dolencias.
   - Línea 383: Eyebrow `text-[#D4AF37]` en "Atención Hiperlocal en Español".
   - Línea 401: Input buscador de ciudades `focus:border-[#D4AF37]`.
   - Línea 426: Moneda de ciudad `text-[#D4AF37]`.
   - Línea 444: Título de país en directorio `text-[#D4AF37]`.
   - Línea 499: Burbuja paso 2 `border border-[#D4AF37] text-[#D4AF37]`.
   - Línea 519: Burbuja paso 4 `border border-[#D4AF37] text-[#D4AF37]`.
   - Línea 554: Eyebrow `text-[#D4AF37]` en "Respuestas Claras" (FAQs).
   - Línea 616: Badge CTA final `border border-[#D4AF37] text-[#D4AF37]`.

7. **`src/pages/[slug].astro`** (Líneas 7, 86, 93, 125, 161, 162, 203, 245, 251, 257, 263, 269, 275, 285, 293, 344, 346):
   - Línea 86: Breadcrumb `text-[#D4AF37]` en `{cityName}`.
   - Línea 93: `badge-gold` en hero geográfico.
   - Línea 125: Indicador `text-[#D4AF37]` en "Biodescodificación".
   - Líneas 161-162: Punto `bg-[#D4AF37]` y texto `text-[#D4AF37]` en "Contexto Urbano y Salud Emocional".
   - Línea 203: Burbuja paso 2 `border border-[#D4AF37] text-[#D4AF37]`.
   - Líneas 245, 251, 257, 263, 269, 275: Etiquetas de sistemas `text-[#D4AF37]`.
   - Línea 285: `badge-gold mb-3` en "Tarifas Transparentes".
   - Línea 293: Borde de tarjeta `border-l-4 border-[#D4AF37]`.
   - Línea 344: Borde de tarjeta footer `border-[#D4AF37]`.
   - Línea 346: `badge-gold mb-4` en "Agenda Abierta en {cityName}".

8. **`src/pages/biodescodificacion/index.astro`** (Líneas 6, 68, 137, 153, 245, 270, 290, 310, 330):
   - Línea 68: Badge hero `border border-[#D4AF37] text-[#D4AF37]`.
   - Línea 137: Contador `text-[#D4AF37]` en "7 Sistemas Biológicos Cubiertos".
   - Línea 153: Badge sistema `text-[#D4AF37]` en tarjetas de dolencias.
   - Línea 245: Eyebrow `text-[#D4AF37]` en "Mapa Somático".
   - Líneas 270, 290, 310: Puntos `bg-[#D4AF37]` en pilares de sistemas corporales.
   - Línea 330: Badge CTA final `border border-[#D4AF37] text-[#D4AF37]`.

9. **`src/pages/biodescodificacion/[slug].astro`** (Líneas 7, 93, 100, 173, 174, 192, 194, 199, 226, 269, 270, 307, 309):
   - Línea 93: Breadcrumb `text-[#D4AF37]` en `{nombre}`.
   - Línea 100: `badge-gold` en hero de dolencia.
   - Líneas 173-174: Punto `bg-[#D4AF37]` y texto `text-[#D4AF37]` en "Fisiología y Adaptación".
   - Línea 192: Borde de tarjeta `border border-[#D4AF37]`.
   - Línea 194: `badge-gold mb-4` en "Integración y Liberación".
   - Línea 199: Cita decretal `text-[#D4AF37]` en `<blockquote>`.
   - Línea 226: Burbujas numéricas de preguntas `border border-[#D4AF37] text-[#D4AF37]`.
   - Líneas 269-270: Punto `bg-[#D4AF37]` y texto `text-[#D4AF37]` en "Claridad y Fundamentos".
   - Línea 307: Borde de tarjeta footer `border-[#D4AF37]`.
   - Línea 309: `badge-gold mb-4` en "Diagnóstico Emocional en Vivo".

10. **Activos Gráficos SVG en `public/` y raíz** (`public/logo-mariposa-con-fondo-completo.svg` y `public/favicon.svg`):
    - Inspección directa reveló que la **Capa 4 (Destello de Luz Radiante)** en ambos archivos SVG contiene elementos vectoriales amarillos y dorados explícitos:
      - Líneas 4-13:
        - `<radialGradient id="star-aura">` con paradas: `#FFFEE6`, `#FFE58F`, `#E5B33A`, `#C89620`.
        - `<radialGradient id="core-glow">` con paradas: `#FFFFFF`, `#FFF6B5`, `#E2B755`.
      - Líneas finales (117-133):
        - Rayos vectoriales con `fill="#FFFDF0"` y `stroke="#FFEFA8"`.
        - Estrella de diamante central con `fill="url(#core-glow)"`.
    - **Falsos positivos analizados**:
      - `src/data/dataset_almaholistica_ciudades.csv` (línea 102) y su homólogo JSON: la cadena "Chamberí" (barrio de Madrid) contiene la subcadena "amber", pero es contenido semántico del dataset geográfico, no un color.

---

### 1.2. Configuración Actual de Tipografías

1. **Carga en `src/layouts/BaseLayout.astro`** (Líneas 58-64):
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link
     href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
     rel="stylesheet"
   />
   ```
2. **Definición en `tailwind.config.mjs`** (Líneas 69-74):
   ```javascript
   fontFamily: {
     serif: ['Cinzel', 'Playfair Display', 'serif'],
     sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
     cinzel: ['Cinzel', 'Playfair Display', 'serif'],
     body: ['"Plus Jakarta Sans"', 'sans-serif'],
   }
   ```
3. **Definición en `src/styles/global.css`** (Líneas 39-40):
   ```css
   --font-serif: 'Cinzel', 'Playfair Display', serif;
   --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
   ```

---

### 1.3. Estado Actual de Pruebas y Tipos

1. `npm test` ejecuta 150 tests a través de 40 suites (Tiers 1 a 4):
   - **Resultado actual:** 150 passed, 0 failed (139 ms).
   - **Dependencia de tokens en tests:** Existen aserciones directas que verifican `#D4AF37` en `tests/tier1_features.test.mjs:283-285` (`COLOR_PALETTE.secondaryAccentGold = '#D4AF37'`) y `tests/adversarial_matte_cls_m2_1.test.mjs:154` (`twContent.includes('#D4AF37')`).
2. `npx astro check` reporta:
   - **Resultado actual:** 0 errors, 0 warnings (35 archivos verificados).

---

## 2. Logic Chain (Cadena de Razonamiento Lógico)

1. **Premisa 1 (Requisito de Rediseño R1):** El nuevo estándar visual exige la eliminación absoluta de tonos amarillos y dorados (`#F59E0B`, `#D4AF37`) y la unificación de la paleta a 2 colores maestros: Fondo Abisal (`#060A1A`) y Luz Cyan (`#38BDF8`), complementados con Blanco Puro (`#FFFFFF`) y Slate (`#94A3B8`, `#64748B`, `#1E293B`, `#0A1226`).
   - *Inferencia 1.1:* Toda clase utilitaria en Tailwind (`text-[#D4AF37]`, `border-[#D4AF37]`, `bg-[#D4AF37]`) debe ser reemplazada sistemáticamente.
   - *Inferencia 1.2:* Las variables `--color-accent-gold` y `--color-accent-amber` en `global.css` y las familias `gold` y `amber` en `tailwind.config.mjs` deben eliminarse o redirigirse.
   - *Inferencia 1.3:* Los activos SVG oficiales (`public/logo-mariposa-con-fondo-completo.svg` y `public/favicon.svg`) deben transicionar sus gradientes `star-aura` y `core-glow` de tonos dorados a tonos Cyan/Blanco para que el destello central de la mariposa sea armónico con el Fondo Abisal y la Luz Cyan `#38BDF8`.

2. **Premisa 2 (Requisito de Rediseño R1 — Botones y Tarjetas):**
   - Los botones de acción primarios deben ser redondeados tipo píldora (`rounded-full`) en blanco puro: `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`.
   - Los botones secundarios deben ser enlaces minimalistas con flecha interactiva: `group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8]`.
   - Las tarjetas deben abandonar el radio pequeño (`rounded-xl` / `rounded-2xl`) y adoptar contenedores amplios `rounded-[2.5rem]`, padding generoso `p-10 lg:p-14`, bordes ultra-finos `border border-slate-800/40` y burbujas de iconos circulares `w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60 flex items-center justify-center`.
   - *Inferencia 2.1:* En `Navbar.astro`, `Footer.astro`, `index.astro`, `[slug].astro`, `biodescodificacion/[slug].astro`, `biodescodificacion/index.astro` y `WhatsAppQuizModal.tsx`, se deben sustituir las clases rectangulares `rounded-lg` / `rounded-xl` / `rounded-2xl` y los colores cyan directos por la especificación píldora blanca en los CTAs de conversión.

3. **Premisa 3 (Requisito de Rediseño R3 — Tipografía Editorial Serena):**
   - Títulos principales en Serif elegante (*Cormorant Garamond* o *Cinzel* refinado) a gran escala (`text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-normal`).
   - Subtítulos superiores (eyebrows) con línea divisoria minimalista de 1px: `<span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>TEXTO</span>`.
   - Párrafos de lectura en fuente sans-serif ligera (*Inter* / *Plus Jakarta Sans*), peso light (`font-light`), interlineado aireado (`leading-relaxed`) y ancho máximo controlado (`max-w-xl`).
   - *Inferencia 3.1:* En `BaseLayout.astro`, se debe enriquecer la solicitud a Google Fonts para precargar *Cormorant Garamond* (pesos 300, 400, 500, 600, 700) e *Inter* (pesos 300, 400, 500, 600), conservando *Cinzel* y *Plus Jakarta Sans* como respaldo para no generar regresiones de carga ni FOUT/CLS.
   - *Inferencia 3.2:* En `tailwind.config.mjs`, se deben actualizar los arrays de `fontFamily` para que `serif` coloque en primer orden `'Cormorant Garamond'` y `sans` incorpore `'Inter'`.

4. **Premisa 4 (Compatibilidad y Cero Regresiones — R4):**
   - El proyecto cuenta con una suite E2E de 150 tests que validan contratos de tokens sólidos mates.
   - *Inferencia 4.1:* Al eliminar `#D4AF37` de `tailwind.config.mjs` y del código, los tests que comprueban específicamente la existencia de `#D4AF37` (`tier1_features.test.mjs` y `adversarial_matte_cls_m2_1.test.mjs`) fallarán si no se armonizan coordinadamente para validar la nueva paleta bi-color oficial (#060A1A y #38BDF8).

---

## 3. Caveats (Advertencias y Supuestos)

1. **Aserciones en Suite de Tests Existente:**
   - La suite de pruebas de Milestone 2 (`tests/tier1_features.test.mjs` y `tests/adversarial_matte_cls_m2_1.test.mjs`) fue diseñada con la especificación original previa al rediseño, por lo que incluye aserciones explícitas que exigen la presencia de `#D4AF37` en `tailwind.config.mjs` y en el objeto `contracts.mjs`. El equipo de implementación de Fase 1 deberá actualizar estas aserciones para evitar que un test desactualizado bloquee la suite de pruebas cuando se erradique `#D4AF37`.
2. **Textos en Datasets:**
   - El nombre del distrito madrileño "Chamberí" presente en `dataset_almaholistica_ciudades.csv` y sus derivados contiene la secuencia de letras "amber". No debe ser modificado por reemplazos automáticos de búsqueda global para no corromper la precisión geográfica y narrativa local.
3. **Escalabilidad de los Títulos a Gran Escala (`lg:text-[5.5rem]`):**
   - La tipografía Cormorant Garamond a tamaño `5.5rem` requiere contención cuidadosa (`leading-[1.05]` y `break-words` o `tracking-tight`) para evitar desbordamientos horizontales en anchos de pantalla intermedios entre 1024px y 1280px.
4. **Capa Bitmap de los Archivos SVG:**
   - En `public/logo-mariposa-con-fondo-completo.svg`, las capas 1 a 3 son imágenes PNG incrustadas en base64 (acuarela y alas). Solo la Capa 4 es código vectorial editable (gradientes `star-aura` y `core-glow`, estrellas y rayos). El cambio de color dorado a cyan/blanco en la Capa 4 es completamente seguro y limpio sin necesidad de recomprimir el raster base.

---

## 4. Conclusion (Propuesta Técnica y Matriz de Cambios Requeridos)

### 4.1. Propuesta Técnica de Configuración de Tailwind CSS

Archivo: `tailwind.config.mjs`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Bi-Color Maestra de Alta Gama
        abisal: '#060A1A',
        abyssal: '#060A1A',

        // Luz de Acento Única
        cyan: {
          DEFAULT: '#38BDF8',
          soft: '#38BDF8',
          hover: '#0EA5E9',
          active: '#0284C7',
          glow: 'rgba(56, 189, 248, 0.15)',
        },
        primary: {
          DEFAULT: '#38BDF8',
          hover: '#0EA5E9',
          active: '#0284C7',
          contrast: '#060A1A',
        },

        // Superficies de Respiración Editorial (Sólidas Mates)
        midnight: {
          DEFAULT: '#0A1226',
          surface: '#0A1226',
          card: '#0A1226',
          elevated: '#0E172F',
          surface2: '#0E172F',
        },

        // Bordes Ultra-Finos Discretos
        border: {
          DEFAULT: 'rgba(30, 41, 59, 0.4)',
          slate: '#1E293B',
          subtle: 'rgba(30, 41, 59, 0.6)',
          cyan: 'rgba(56, 189, 248, 0.3)',
        },

        // Textos Editoriales de Alta Legibilidad
        text: {
          primary: '#FFFFFF',
          heading: '#F8FAFC',
          body: '#94A3B8',
          muted: '#64748B',
        },
      },
      fontFamily: {
        // Títulos en Serif Elegante (Cormorant Garamond prioritario + Cinzel)
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Playfair Display', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        // Cuerpo en Sans Neutra y Ligera (Inter prioritario + Plus Jakarta Sans)
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        body: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        none: 'none',
        // Sombra suave exclusiva para botones píldora blancos
        'pill-white': '0 8px 24px rgba(255, 255, 255, 0.08)',
        'pill-cyan': '0 8px 24px rgba(56, 189, 248, 0.12)',
        'matte-sm': '0 1px 2px 0 #000000',
        'matte-md': '0 4px 6px -1px #000000',
      },
      borderRadius: {
        'card-editorial': '2.5rem',
      },
    },
  },
  plugins: [],
};
```

---

### 4.2. Propuesta Técnica de Carga de Fuentes en `src/layouts/BaseLayout.astro`

Reemplazo en `<head>`:
```html
<!-- Google Fonts: Cormorant Garamond & Cinzel (títulos) + Inter & Plus Jakarta Sans (lectura) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
  rel="stylesheet"
/>
```

---

### 4.3. Propuesta Técnica para los Archivos SVG del Logo (`public/`)

En `public/logo-mariposa-con-fondo-completo.svg` y `public/favicon.svg`:
- **Definiciones (`<defs>`)**: Reemplazar gradientes dorados por gradientes celestes/cyan y blanco puro:
  ```xml
  <radialGradient id="star-aura" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
    <stop offset="25%" stop-color="#E0F2FE" stop-opacity="0.85"/>
    <stop offset="55%" stop-color="#7DD3FC" stop-opacity="0.4"/>
    <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
    <stop offset="40%" stop-color="#BAE6FD" stop-opacity="0.9"/>
    <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
  </radialGradient>
  ```
- **Trazos vectoriales de la Capa 4**: Reemplazar `stroke="#FFEFA8"` por `stroke="#BAE6FD"` y `fill="#FFFDF0"` por `fill="#F0F9FF"`.

---

### 4.4. Matriz de Componentes y Páginas con Cambios Visuales Requeridos

| Componente / Archivo | Elemento Actual | Cambio Visual Requerido (R1 & R3) |
|---|---|---|
| **`Navbar.astro`** | Marca hover en `#D4AF37` (L39); Subtítulo en `#D4AF37` (L42); Botón CTA rectangular `rounded-lg bg-[#38BDF8]` (L83, L144) | - Marca hover: `group-hover:text-[#38BDF8]`.<br>- Subtítulo: `text-[#38BDF8] tracking-widest text-[10px]`.<br>- Botón CTA: `bg-white text-[#060A1A] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`. |
| **`Footer.astro`** | Enlace a 45 dolencias `#D4AF37` (L91); Badge países `#D4AF37` (L113); Estado activo `#D4AF37` (L136); Encabezado descargo médico `#D4AF37` (L160); Botón CTA rectangular `rounded-md bg-[#38BDF8]` (L145) | - Enlaces y badges: cambiar a `text-[#38BDF8]` y `border-slate-800/60`.<br>- Encabezado descargo médico: `text-slate-300 font-medium`.<br>- Botón CTA: `rounded-full bg-white text-[#060A1A] px-6 py-2.5 hover:bg-[#38BDF8]`.<br>- Contenedor descargo: bordes ultra-finos `border border-slate-800/40`. |
| **`WhatsAppQuizModal.tsx`** | Subtítulo `#D4AF37` (L255); Paso `#D4AF37` (L278); Badge final `#D4AF37` (L643); Contenedor `rounded-2xl` (L237); Botones pasos `rounded-xl bg-[#38BDF8]` (L372, L628); Botón final `rounded-xl bg-[#38BDF8]` (L697) | - Textos y badges dorados: sustituir por `text-[#38BDF8]` y `bg-[#0A1226] border border-[#38BDF8]/40`.<br>- Contenedor exterior: `rounded-[2.5rem] border border-slate-800/40 p-8 sm:p-12`.<br>- Botones de avanzar: `rounded-full px-6 py-3 font-medium`.<br>- Botón final de WhatsApp: `w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[#060A1A] font-medium text-base hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`. |
| **`index.astro` (Hero)** | Badge dorado `border border-[#D4AF37] text-[#D4AF37]` (L116); Título `text-3xl sm:text-5xl lg:text-6xl font-bold` (L122); Párrafo `text-slate-300` (L127); Botón principal `rounded-xl bg-[#38BDF8]` (L138); Botón secundario `hover:border-[#D4AF37]` (L149); Métrica dorada `text-[#D4AF37]` (L163) | - Eyebrow con línea divisoria minimalista: `<span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>CENTRO INTERNACIONAL DE BIODESCODIFICACIÓN</span>`.<br>- Título H1: tipografía *Cormorant Garamond* a gran escala (`text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-normal`).<br>- Párrafo: fuente *Inter*, peso ligero (`font-light`), interlineado aireado (`leading-relaxed`), `max-w-xl text-slate-300`.<br>- Botón principal: píldora blanca `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`.<br>- Botón secundario: enlace con flecha interactiva `group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8]`.<br>- Métricas: números en blanco nítido y `#38BDF8`, sin oro. |
| **`index.astro` (Secciones)** | Eyebrows en `#D4AF37` (L199, L383, L554); Icono pilar 2 `#D4AF37` (L229); Badges dolencias `#D4AF37` (L316); Buscador input `#D4AF37` (L401); Moneda ciudad `#D4AF37` (L426); Burbujas de pasos `#D4AF37` (L499, L519); Badge CTA final `#D4AF37` (L616); Tarjetas `rounded-2xl` y botones `rounded-xl` | - Reemplazar todos los eyebrows por la línea minimalista de 1px en `#38BDF8`.<br>- Badges de sistemas y monedas en `#38BDF8` o `text-slate-300`.<br>- Tarjetas de pilares y dolencias: `rounded-[2.5rem] border border-slate-800/40 p-8 sm:p-10`.<br>- Burbujas de iconos en pasos: `w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60 flex items-center justify-center text-[#38BDF8]`.<br>- Botón CTA de pasos y CTA final: píldora blanca `rounded-full bg-white text-[#060A1A]`. |
| **`[slug].astro` (Ciudades)** | Breadcrumb `#D4AF37` (L86); Badge gold (L93, L285, L346); Enfoque `#D4AF37` (L125); Viñeta historia local `#D4AF37` (L161); Burbuja paso 2 `#D4AF37` (L203); Etiquetas dolencias `#D4AF37` (L245-L275); Borde tarjeta precios `#D4AF37` (L293); Borde tarjeta footer `#D4AF37` (L344) | - Breadcrumb en `text-slate-400` y `text-slate-200`.<br>- Reemplazar `badge-gold` por subtítulo con línea divisoria minimalista en `#38BDF8`.<br>- Eliminar borde lateral `#D4AF37` pasando a `border border-slate-800/40`.<br>- Burbujas numéricas: `w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60 text-[#38BDF8]`.<br>- Etiquetas de dolencias en `#38BDF8`.<br>- Botones primarios (L134, L356): píldora blanca `bg-white text-[#060A1A] rounded-full ...`.<br>- Contenedores de secciones: `rounded-[2.5rem] border border-slate-800/40 p-10 lg:p-14`. |
| **`biodescodificacion/index.astro`** | Badge hero `#D4AF37` (L68); Contador `#D4AF37` (L137); Etiquetas de dolencias `#D4AF37` (L153); Eyebrow `#D4AF37` (L245); Viñetas mapa somático `#D4AF37` (L270, L290, L310); Badge CTA final `#D4AF37` (L330); Botón final `rounded-xl bg-[#38BDF8]` (L348) | - Reemplazar badges y eyebrows por subtítulos con línea de 1px en `#38BDF8`.<br>- Etiquetas y contadores en `#38BDF8` y `text-slate-300`.<br>- Viñetas de mapa somático en `bg-[#38BDF8]`.<br>- Tarjetas de dolencias y sistemas: `rounded-[2.5rem] border border-slate-800/40 p-8 sm:p-10`.<br>- Botón final CTA: píldora blanca `rounded-full bg-white text-[#060A1A]`. |
| **`biodescodificacion/[slug].astro`** | Breadcrumb `#D4AF37` (L93); Badge gold (L100, L194, L309); Viñeta `#D4AF37` (L173); Borde sección reprogramación `#D4AF37` (L192); Cita de reprogramación `#D4AF37` (L199); Burbujas preguntas introspección `#D4AF37` (L226); Viñeta FAQs `#D4AF37` (L269); Borde footer `#D4AF37` (L307) | - Breadcrumb en `text-slate-200`.<br>- Reemplazar `badge-gold` por subtítulo minimalista con línea divisoria.<br>- Cita de reprogramación en `text-white font-serif` con comillas sutiles en `#38BDF8`.<br>- Burbujas de preguntas: `w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60 text-[#38BDF8]`.<br>- Secciones y footer card: `rounded-[2.5rem] border border-slate-800/40 p-10 lg:p-14`.<br>- Botones primarios (L120, L252, L319): píldora blanca `bg-white text-[#060A1A] rounded-full ...`. |

---

## 5. Verification Method (Método de Verificación Independiente)

Para verificar independientemente que las observaciones son exactas y que la implementación posterior cumple con los criterios de aceptación:

1. **Auditoría Estricta de Cero Rastros de Amarillo/Dorado:**
   Ejecutar en la raíz del proyecto:
   ```bash
   grep -rnIE "#F59E0B|#D4AF37|#FFE58F|#E5B33A|#C89620|#FFF6B5|#E2B755|#FFEFA8" src/ public/ tailwind.config.mjs
   ```
   *Condición de éxito:* 0 coincidencias en código CSS, componentes, páginas y archivos SVG.

2. **Auditoría de Botones Píldora de Alta Gama:**
   Ejecutar:
   ```bash
   grep -rn "rounded-full" src/components/Navbar.astro src/pages/index.astro src/components/react/WhatsAppQuizModal.tsx
   ```
   *Condición de éxito:* Los botones principales de acción poseen las clases `rounded-full bg-white text-[#060A1A]` y sombra `shadow-[0_8px_24px_rgba(255,255,255,0.08)]`.

3. **Auditoría de Tarjetas Modernas (`rounded-[2.5rem]`):**
   Ejecutar:
   ```bash
   grep -rn "rounded-\[2.5rem\]" src/pages/index.astro src/pages/[slug].astro src/pages/biodescodificacion/
   ```
   *Condición de éxito:* Las tarjetas y contenedores principales aplican `rounded-[2.5rem]` y `border-slate-800/40`.

4. **Verificación de Tipografías en Google Fonts:**
   Inspeccionar `src/layouts/BaseLayout.astro`:
   ```bash
   grep -n "Cormorant+Garamond" src/layouts/BaseLayout.astro
   ```
   *Condición de éxito:* La URL de Google Fonts incluye `family=Cormorant+Garamond` e `family=Inter`.

5. **Verificación de Compilación y Tipos:**
   ```bash
   npx astro check
   npm run build
   ```
   *Condición de éxito:* Compilación estática al 100% (160+ páginas generadas) sin errores de Astro ni TypeScript.

6. **Verificación de Suite de Tests Automatizada:**
   ```bash
   npm test
   ```
   *Condición de éxito:* 150 tests pasando al 100% tras la actualización coordinada de las aserciones de tokens de color.
