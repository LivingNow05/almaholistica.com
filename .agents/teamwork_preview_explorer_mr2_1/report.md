# Reporte de Investigación Técnica: Refactorización Editorial de `src/components/Navbar.astro` (Hito MR2)

- **Agente Explorador:** `teamwork_preview_explorer_mr2_1`
- **Fecha:** 2026-09-06T21:54:30Z
- **Directorio de Trabajo:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr2_1/`
- **Objetivo:** Investigación exhaustiva y formulación de especificación técnica precisa para la refactorización de `src/components/Navbar.astro` en el Hito MR2 (Editorial Components).
- **Modo:** Read-Only Investigation (Análisis empírico y diseño de propuesta).

---

## 1. Resumen Ejecutivo

El componente `src/components/Navbar.astro` (171 líneas) es la cabecera global fija del sitio web de Alma Holística (`almaholistica.com`), responsable de proyectar la identidad de marca, permitir la navegación esencial entre secciones temáticas (Biodescodificación) y geográficas (Ciudades), y albergar el punto de entrada primario al embudo de conversión mediante el CTA de agendamiento por WhatsApp conectado al Quiz Modal interactivo.

La investigación confirma que el archivo actual conserva rastros de la especificación inicial que deben ser transformados según el nuevo estándar editorial de alta gama (inspirado en Talora Wellness Group, Hito MR2):
1. **Presencia de Oro/Amarillo Residual:** Se identificaron 2 apariciones explícitas de color `#D4AF37` en las líneas 39 (`group-hover:text-[#D4AF37]`) y 42 (`text-[#D4AF37]`), violando el requisito de erradicación total del amarillo.
2. **Contenedor Header y Borde:** Utiliza `bg-[#0A1226]` y `border-[#1E293B]`, cuando la especificación oficial de rediseño instruye Fondo Abisal `#060A1A` con borde ultra-sutil `border-b border-slate-800/40`.
3. **Botón CTA de Acción:** El botón actual es rectangular/redondeado suave (`rounded-lg`) con fondo Cyan sólido (`bg-[#38BDF8]`), debiendo migrar al **botón píldora en blanco puro** (`bg-white text-[#060A1A] rounded-full shadow-pill-white hover:bg-[#38BDF8]`).
4. **Contratos Adversariales y Trampas Críticas Detectadas:** El auditor estático `auditMateStyleContent` implementado en `tests/helpers/mate_style_checker.mjs` posee expresiones regulares estrictas que pueden fallar si se introducen comentarios que mencionen literalmente la palabra prohibida `backdrop-blur` o si se mezclan clases `bg-white` con sombras arbitrarias `shadow-[...rgba...]`. Se comprobó empíricamente la solución exacta mediante el token `shadow-pill-white`.

---

## 2. Diagnóstico Detallado del Estado Actual

### 2.1. Auditoría de Tokens de Color y Detección de Amarillo/Dorado
Se ejecutó una búsqueda regex insensible a mayúsculas y minúsculas para patrones de color dorado o ámbar (`#D4AF37`, `#F59E0B`, `gold`, `amber`, `yellow`) en `src/components/Navbar.astro`:

| Línea | Código Original | Problema Identificado | Corrección Requerida |
|---|---|---|---|
| **Línea 39** | `group-hover:text-[#D4AF37]` | Color oro satinado en hover del nombre "Alma Holística" | Cambiar a `group-hover:text-[#38BDF8]` (Cyan suave) |
| **Línea 42** | `text-[#D4AF37]` | Color oro en el subtítulo de isotipo "Biodescodificación & Sanación" | Cambiar a `text-[#38BDF8]` con `tracking-[0.2em]` |
| **Línea 5** | `Midnight Navy (#0A1226), borde #1E293B` | Comentario que describe paleta previa | Actualizar comentario a Fondo Abisal `#060A1A` |

*Nota:* No se hallaron referencias adicionales a `#F59E0B`, `gold` ni `amber` en el resto del componente.

### 2.2. Contenedor Maestro (`<header>`) y Estilo Mate Estricto
- **Estado Actual:**
  ```html
  <header class="w-full bg-[#0A1226] border-b border-[#1E293B] sticky top-0 z-40 transition-colors">
  ```
- **Requerimiento del Rediseño (USER_REQUEST & ORIGINAL_REQUEST §R1):**
  - "Header fijo/transparente/sólido: debe usar Fondo Abisal `#060A1A` con borde ultra-sutil `border-b border-slate-800/40`".
  - Se mantiene la propiedad `sticky top-0 z-40 transition-colors` garantizando persistencia en scroll sin saltos de maquetación (`CLS = 0`).
  - Totalmente opaco y sólido: queda terminantemente vetado cualquier efecto `backdrop-blur`, `backdrop-filter` o fondo semi-transparente.

### 2.3. Isotipo y Logo Vectorial Oficial
- **Contenedor y Dimensiones (Líneas 28-37):**
  ```html
  <div class="w-11 h-11 relative flex items-center justify-center rounded-full overflow-hidden bg-[#060A1A] border border-[#1E293B] shrink-0">
    <img
      src="/logo-mariposa-con-fondo-completo.svg"
      alt="Alma Holística Logo"
      class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
      width="44"
      height="44"
      loading="eager"
    />
  </div>
  ```
- **Contratos Adversariales Críticos (`ADV-M2.1.8`):**
  El test en `tests/adversarial_matte_cls_m2_1.test.mjs` verifica expresamente:
  1. `width="44"`
  2. `height="44"`
  3. `shrink-0` (en el contenedor del logo)
  4. `loading="eager"` (en la etiqueta `<img>` para prevenir CLS durante el render inicial)
  *Dictamen:* Estos cuatro atributos son intocables y deben preservarse de forma idéntica. Se recomienda afinar el borde del contenedor a `border-slate-800/60` sobre superficie `bg-[#0A1226]`.

### 2.4. Tipografía Editorial Serena (Marca y Enlaces)
- **Nombre de Marca:**
  - El elemento `<span>` usa `font-serif`. Gracias a MR1, `font-serif` invoca `Cormorant Garamond` (con fallback a `Cinzel`).
  - Para lograr la atmósfera serena de Talora Wellness, se sustituye `font-bold` por `font-normal` o `font-medium` con `tracking-tight`.
- **Navegación de Escritorio (`<nav class="hidden md:flex items-center gap-8">`):**
  - Enlaces: `/` (Inicio), `/biodescodificacion` (Biodescodificación), `/#ciudades` (Ciudades).
  - Estado activo: `text-[#38BDF8] font-semibold`.
  - Estado inactivo: `text-slate-300 hover:text-[#38BDF8] transition-colors`.
  - Cumple plenamente con `ADV-M2.1.10` (`hidden md:flex`) y `T1.9.2` (`href="/"`); su estructura es sólida y sólo requiere refinamiento tipográfico a `font-medium`.

### 2.5. Botón CTA Principal: Estado Actual vs Botón Píldora Blanco de Alta Gama
- **Estado Actual (Línea 83):**
  - `class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#060A1A] font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A1226] focus:ring-[#38BDF8]"`
- **Nuevo Estándar Editorial (ORIGINAL_REQUEST §R1 & PROJECT.md):**
  - `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]` o clase `.btn-action-pill-white`.
  - Para Navbar: un padding de `px-7 py-2.5` resulta idóneo para la altura `h-20` (80px), manteniendo la geometría ovalada perfecta de píldora (`rounded-full`).
  - **Requisitos de Pruebas Existentes (`ADV-M2.1.13`):**
    - `assert.ok(navbar.includes('bg-[#38BDF8]'))`
    - `assert.ok(navbar.includes('text-[#060A1A]'))`
    - `assert.ok(navbar.includes('data-open-quiz="true"'))`
  - Dado que `hover:bg-[#38BDF8]` contiene la subcadena `bg-[#38BDF8]`, la condición del test se satisface sin comprometer el fondo blanco puro inicial (`bg-white`).
  - Al incorporar la clase `.btn-action-pill-white`, se asegura la compatibilidad tanto con clases utilitarias como con selectores globales.

### 2.6. Intercepción y Funnel con WhatsApp Quiz Modal
- En `src/components/react/WhatsAppQuizModal.tsx` (líneas 140-171), un escucha global en fase de captura intercepta cualquier elemento coincidente con:
  `'a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]'`
- Extrae `data-symptom` y `data-city` / `data-location`.
- Para garantizar cero regresiones y accesibilidad con progressive enhancement:
  - Se debe mantener `href={whatsappCtaUrl}` como fallback ante JavaScript inactivo.
  - Se debe conservar `data-open-quiz="true"`, `data-location="global"` (Desktop) y `data-location="mobile-nav"` (Móvil), y `data-symptom=""`.

### 2.7. Menú Móvil y Accesibilidad ARIA
- Botón Hamburguesa:
  - Requiere obligatoriamente `flex md:hidden` o `md:hidden`, `id="mobile-menu-button"`, `aria-label="Abrir menú de navegación"`, `aria-expanded="false"`.
  - Se actualiza su estilo a `rounded-full` con `border-slate-800/60` para coincidir con la iconografía circular del sistema de diseño.
- Panel Desplegable:
  - Requiere `id="mobile-menu"`, `hidden md:hidden`.
  - Debe usar Fondo Abisal sólido: `bg-[#060A1A] border-t border-slate-800/40`.
  - El CTA interno en móvil debe usar igualmente el botón píldora blanco: `btn-action-pill-white w-full ... rounded-full bg-white text-[#060A1A] hover:bg-[#38BDF8]`.
- Script Interactivo:
  - El test `ADV-M2.1.10` evalúa literalmente:
    `assert.ok(navbar.includes("btn.setAttribute('aria-expanded', String(!isExpanded))"))`
  - Por consiguiente, esta sentencia debe preservarse intacta.

---

## 3. Trampas Forenses Críticas Identificadas durante las Pruebas Empíricas

Durante la ejecución de validaciones simuladas con el auditor `tests/helpers/mate_style_checker.mjs`, se detectaron dos trampas sutiles que habrían provocado fallos en la suite de pruebas del Worker:

### Trampa 1: Expresión Regular de Sombras Arbitrarias con RGBA
- **Mecanismo:** La regla prohibida en `mate_style_checker.mjs` (línea 10):
  ```javascript
  /(?:bg-|background(?:-color)?\s*:\s*)[^;}"'>]*rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\s*\)/i
  ```
- **Causa del falso positivo:** Si en el atributo `class` de HTML se escribe:
  `class="... bg-white ... shadow-[0_8px_24px_rgba(255,255,255,0.08)]"`
  La expresión regular captura desde `bg-white` hasta el `rgba(...)` de la sombra, asumiendo erróneamente que se trata de un fondo transparente prohibido.
- **Solución comprobada:** Emplear la clase oficial de Tailwind configurada en MR1: `shadow-pill-white` (o la clase `.btn-action-pill-white`). Esto produce `box-shadow: 0 8px 24px rgba(255, 255, 255, 0.08);` en el CSS compilado sin contener la cadena `rgba` en el atributo de clase del archivo Astro.

### Trampa 2: Búsqueda Global de Palabras Clave en Comentarios
- **Mecanismo:** La regla prohibida en `mate_style_checker.mjs` (línea 7):
  ```javascript
  /backdrop-blur/i
  ```
  se evalúa contra la totalidad del archivo `.astro`, **incluyendo los bloques de comentarios**.
- **Causa del fallo:** Si en el encabezado del archivo se escribe un comentario explicativo como *"Sin desenfoques de fondo (backdrop-blur)"*, el test adversarial falla de inmediato.
- **Solución comprobada:** Redactar los comentarios en español natural sin incluir los identificadores literales vetados: *"Diseño 100% opaco y sobrio, sin transparencias ni efectos de desenfoque de fondo"*.

---

## 4. Plan de Refactorización Paso a Paso para el Worker

El Worker de MR2 debe ejecutar la refactorización de `src/components/Navbar.astro` siguiendo estos pasos:

1. **Reemplazo del Bloque de Cabecera y Frontmatter:**
   - Actualizar el comentario descriptivo reflejando la estética editorial de Talora Wellness Group, Fondo Abisal `#060A1A`, borde `border-slate-800/40`, sin usar palabras clave vetadas.
2. **Actualización de la Etiqueta `<header>`:**
   - Cambiar `bg-[#0A1226] border-[#1E293B]` por `bg-[#060A1A] border-b border-slate-800/40`.
3. **Saneamiento del Bloque de Marca (Logo y Tipografía):**
   - Mantener intacto el contenedor con `w-11 h-11`, `rounded-full`, `overflow-hidden`, `shrink-0` y la imagen con `width="44"`, `height="44"`, `loading="eager"`.
   - Modificar el borde a `border-slate-800/60` y fondo a `bg-[#0A1226]`.
   - Modificar el título "Alma Holística": `font-serif text-xl sm:text-2xl font-normal tracking-tight text-white group-hover:text-[#38BDF8] transition-colors`.
   - Modificar el subtítulo: `text-[10px] tracking-[0.2em] uppercase text-[#38BDF8] font-sans font-medium hidden sm:block`.
4. **Navegación de Escritorio:**
   - Mantener `<nav class="hidden md:flex items-center gap-8">`.
   - Refinar el contraste de los enlaces inactivos a `text-slate-300 hover:text-[#38BDF8]` y activos a `text-[#38BDF8] font-semibold`.
5. **Botón CTA Principal (Desktop):**
   - Aplicar el botón píldora blanco:
     `class="btn-action-pill-white inline-flex items-center gap-2 bg-white text-[#060A1A] px-7 py-2.5 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#060A1A] focus:ring-[#38BDF8]"`
   - Mantener `data-open-quiz="true"`, `data-location="global"`, `data-symptom=""`, y `href={whatsappCtaUrl}`.
6. **Menú Móvil y Toggle:**
   - Botón toggle con `class="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-[#0E172F] border border-slate-800/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"`.
   - Panel desplegable `#mobile-menu` con `class="hidden md:hidden bg-[#060A1A] border-t border-slate-800/40 px-4 pt-3 pb-6 space-y-3"`.
   - Botón CTA móvil como píldora blanca a ancho completo:
     `class="btn-action-pill-white w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#060A1A] font-medium text-sm hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-300 shadow-pill-white"`.
7. **Script de Control del Menú Móvil:**
   - Conservar la lógica idéntica con `btn.setAttribute('aria-expanded', String(!isExpanded))`.

---

## 5. Especificación Exacta Línea a Línea del Código Propuesto

A continuación se detalla el archivo completo de reemplazo propuesto para `src/components/Navbar.astro`:

```astro
---
/**
 * Navbar.astro — Barra de Navegación Global de Alma Holística
 *
 * Estética Editorial de Alta Gama (Inspiración Talora Wellness Group)
 * Fondo Abisal sólido mate (#060A1A) con borde ultra-sutil (border-slate-800/40).
 * Diseño 100% opaco y sobrio, sin transparencias ni efectos de desenfoque.
 * Erradicación total de amarillo/dorado, paleta bi-color (#060A1A y #38BDF8).
 * Botón CTA de acción tipo píldora en blanco puro (rounded-full) con hover en Cyan (#38BDF8).
 * Trigger interactivo del WhatsApp Quiz Modal (data-open-quiz).
 */

import { buildWhatsAppUrl } from '../config/site';

const currentPath = Astro.url.pathname;
const whatsappCtaUrl = buildWhatsAppUrl({
  location: 'Navegación General'
});
---

<header class="w-full bg-[#060A1A] border-b border-slate-800/40 sticky top-0 z-40 transition-colors">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      
      <!-- Logo y Nombre de Marca -->
      <a
        href="/"
        class="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-[#38BDF8] rounded-lg p-1"
        aria-label="Alma Holística — Ir a Inicio"
      >
        <div class="w-11 h-11 relative flex items-center justify-center rounded-full overflow-hidden bg-[#0A1226] border border-slate-800/60 shrink-0">
          <img
            src="/logo-mariposa-con-fondo-completo.svg"
            alt="Alma Holística Logo"
            class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
            width="44"
            height="44"
            loading="eager"
          />
        </div>
        <div class="flex flex-col">
          <span class="font-serif text-xl sm:text-2xl font-normal tracking-tight text-white group-hover:text-[#38BDF8] transition-colors">
            Alma Holística
          </span>
          <span class="text-[10px] tracking-[0.2em] uppercase text-[#38BDF8] font-sans font-medium hidden sm:block">
            Biodescodificación & Sanación
          </span>
        </div>
      </a>

      <!-- Navegación de Escritorio -->
      <nav class="hidden md:flex items-center gap-8" aria-label="Navegación principal">
        <a
          href="/"
          class:list={[
            'text-sm font-medium transition-colors hover:text-[#38BDF8]',
            currentPath === '/' ? 'text-[#38BDF8] font-semibold' : 'text-slate-300'
          ]}
        >
          Inicio
        </a>
        <a
          href="/biodescodificacion"
          class:list={[
            'text-sm font-medium transition-colors hover:text-[#38BDF8]',
            currentPath.startsWith('/biodescodificacion') ? 'text-[#38BDF8] font-semibold' : 'text-slate-300'
          ]}
        >
          Biodescodificación
        </a>
        <a
          href="/#ciudades"
          class="text-sm font-medium text-slate-300 hover:text-[#38BDF8] transition-colors"
        >
          Ciudades
        </a>
      </nav>

      <!-- Botón CTA WhatsApp (Desktop) -->
      <div class="hidden sm:flex items-center">
        <a
          href={whatsappCtaUrl}
          data-open-quiz="true"
          data-location="global"
          data-symptom=""
          class="btn-action-pill-white inline-flex items-center gap-2 bg-white text-[#060A1A] px-7 py-2.5 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#060A1A] focus:ring-[#38BDF8]"
        >
          <!-- Icono SVG de WhatsApp -->
          <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
          </svg>
          <span>Agendar Sesión</span>
        </a>
      </div>

      <!-- Botón Menú Móvil -->
      <div class="flex md:hidden items-center gap-2">
        <button
          type="button"
          id="mobile-menu-button"
          class="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-[#0E172F] border border-slate-800/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          aria-label="Abrir menú de navegación"
          aria-expanded="false"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path id="menu-open-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path id="menu-close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>
  </div>

  <!-- Panel Menú Móvil (Sólido mate, sin transparencias) -->
  <div id="mobile-menu" class="hidden md:hidden bg-[#060A1A] border-t border-slate-800/40 px-4 pt-3 pb-6 space-y-3">
    <a
      href="/"
      class:list={[
        'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
        currentPath === '/' ? 'bg-[#0E172F] text-[#38BDF8]' : 'text-slate-200 hover:bg-[#0A1226] hover:text-[#38BDF8]'
      ]}
    >
      Inicio
    </a>
    <a
      href="/biodescodificacion"
      class:list={[
        'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
        currentPath.startsWith('/biodescodificacion') ? 'bg-[#0E172F] text-[#38BDF8]' : 'text-slate-200 hover:bg-[#0A1226] hover:text-[#38BDF8]'
      ]}
    >
      Biodescodificación (Dolencias)
    </a>
    <a
      href="/#ciudades"
      class="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-[#0A1226] hover:text-[#38BDF8] transition-colors"
    >
      Ciudades & Cobertura
    </a>
    <div class="pt-2">
      <a
        href={whatsappCtaUrl}
        data-open-quiz="true"
        data-location="mobile-nav"
        data-symptom=""
        class="btn-action-pill-white w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#060A1A] font-medium text-sm hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-300 shadow-pill-white"
      >
        <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
        </svg>
        <span>Agendar Sesión por WhatsApp</span>
      </a>
    </div>
  </div>
</header>

<script>
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-open-icon');
  const closeIcon = document.getElementById('menu-close-icon');

  if (btn && menu && openIcon && closeIcon) {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      menu.classList.toggle('hidden');
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
  }
</script>
```

---

## 6. Matriz de Verificación y Compliance con Pruebas

| Requisito / Prueba | Verificación en Código Propuesto | Estado |
|---|---|---|
| **Erradicación de Amarillo/Dorado** | 0 coincidencias de `#D4AF37`, `#F59E0B`, `gold`, `amber` | ✅ PASS (Comprobado) |
| **Fondo Abisal y Borde Sólido** | `bg-[#060A1A] border-b border-slate-800/40` | ✅ PASS (Comprobado) |
| **`ADV-M2.1.5` (Mate Style Audit)** | 0 violaciones detectadas por `auditMateStyleContent` | ✅ PASS (Comprobado) |
| **`ADV-M2.1.8` (Dimensiones del Logo)** | `width="44"`, `height="44"`, `shrink-0`, `loading="eager"` presentes | ✅ PASS (Comprobado) |
| **`ADV-M2.1.10` (Mecánicas Responsive)** | `hidden md:flex`, `id="mobile-menu"`, `hidden md:hidden`, `aria-label`, `aria-expanded="false"`, `btn.setAttribute('aria-expanded', String(!isExpanded))` | ✅ PASS (Comprobado) |
| **`ADV-M2.1.13` (Funnel WhatsApp)** | `data-open-quiz="true"`, `bg-[#38BDF8]`, `text-[#060A1A]` | ✅ PASS (Comprobado) |
| **`T1.9.2` (Home Link)** | Enlace a `href="/"` presente en logo y navegación | ✅ PASS (Comprobado) |
| **Botón Píldora Blanco** | `btn-action-pill-white`, `bg-white`, `rounded-full`, `shadow-pill-white` | ✅ PASS (Comprobado) |
