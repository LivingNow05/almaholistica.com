# Reporte de Investigación Fase 0 (Survey) — R2: Animaciones Profesionales Suaves con GSAP

- **Agente**: `teamwork_preview_explorer_survey_redesign_2`
- **Fecha**: 2026-09-06T17:16:30Z
- **Alcance**: Investigación read-only de dependencias, ciclo de vida en Astro 5, arquitectura de animaciones GSAP (Hero, Scroll Indicator, Floating Aura, Cards), prevención de CLS (`CLS = 0`) y accesibilidad (`prefers-reduced-motion`).

---

## 1. Observation (Observaciones Directas)

### 1.1 Estado de Dependencias en `package.json`
- Archivo inspeccionado: `/Users/anthony/Downloads/almaholistica.com/package.json`, líneas 15-30:
  ```json
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/react": "^4.2.1",
    "@astrojs/tailwind": "^5.1.5",
    "astro": "^5.4.2",
    "csv-parse": "^5.6.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  },
  "devDependencies": {
    "@types/node": "^22.13.5",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4"
  }
  ```
- **Hallazgo**: `gsap` no está instalado en ninguna sección de dependencias.
- Comando `npm view gsap version` ejecutado en el sistema arrojó:
  ```
  3.15.0
  ```

### 1.2 Configuración y Pipeline de Astro 5
- Archivo inspeccionado: `/Users/anthony/Downloads/almaholistica.com/astro.config.mjs`, líneas 6-14:
  ```javascript
  export default defineConfig({
    site: 'https://almaholistica.com',
    output: 'static',
    trailingSlash: 'always',
    integrations: [
      react(),
      tailwind()
    ]
  });
  ```
- **Hallazgo**: La plataforma compila bajo el modelo **SSG Puro (`output: 'static'`)**. Las páginas `.astro` generan HTML estático en tiempo de compilación. No hay hidratación de componentes Astro (no hay Virtual DOM de Astro en el cliente), a excepción del componente React aislado `WhatsAppQuizModal.tsx` que utiliza la directiva `client:load` en `BaseLayout.astro` (línea 116).
- Los bloques `<script>` estándar en componentes `.astro` son procesados y empaquetados por Vite como módulos ES para el navegador (`<script type="module">`), por lo que se ejecutan **únicamente en el cliente**. El frontmatter (servidor) no se mezcla con ellos.

### 1.3 Estructura del Hero y Activo Gráfico de la Mariposa
- Archivo inspeccionado: `/Users/anthony/Downloads/almaholistica.com/src/pages/index.astro`, líneas 108-188:
  - Contenedor Hero: `<section class="relative w-full bg-[#060A1A] py-12 sm:py-20 lg:py-24 border-b border-[#1E293B]">` (línea 108).
  - Badge: `<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E172F] border border-[#D4AF37] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">` (línea 116).
  - Título H1: `<h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">` (línea 122).
  - Párrafo de apoyo: `<p class="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">` (línea 127).
  - Botones CTA: Primario (líneas 133-145) y Secundario (líneas 147-154).
  - Métricas de Confianza: `<div class="pt-6 grid grid-cols-3 gap-4 border-t border-[#1E293B] ...">` (línea 157).
  - Columna Gráfica:
    ```html
    <!-- Columna Derecha: Logo Mariposa SVG Oficial Animado e Interactivo -->
    <div class="lg:col-span-5 flex justify-center items-center">
      <div class="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl bg-[#0A1226] border border-[#1E293B] p-6 flex items-center justify-center shrink-0">
        <img
          src="/logo-mariposa-con-fondo-completo.svg"
          alt="Alma Holística — Logo Oficial de la Mariposa Sagrada"
          width="320"
          height="320"
          loading="eager"
          class="w-full h-full object-contain shrink-0"
        />
      </div>
    </div>
    ```
- Archivo inspeccionado: `/Users/anthony/Downloads/almaholistica.com/public/logo-mariposa-con-fondo-completo.svg` (1.6 MB, 1254x1254 viewBox):
  - Contiene reglas CSS internas nativas en `<style>`:
    - `.rings-layer`: Rotación suave (`spinRings 16s linear infinite`) al hacer `svg:hover` (línea 30).
    - `.wing-left` y `.wing-right`: Aleteo tridimensional en perspectiva (`perspective(800px) rotateY(...)`) al hacer `svg:hover` (líneas 45-80).
    - `.star-light`: Pulsación y escalado (`pulseStar 2.2s ease-in-out infinite`) al hacer `svg:hover` (línea 87).
  - En navegadores modernos, al renderizarse mediante etiqueta `<img>`, las pseudo-clases `:hover` y animaciones CSS internas del SVG se ejecutan correctamente sin necesidad de JavaScript adicional.

### 1.4 Estado de la Suite de Pruebas
- Ejecución del comando `npm test`:
  - 150 pruebas en 40 suites (Tier 1 a Tier 4).
  - Resultado: **150 passed, 0 failed, duration ~169ms**.
  - No existen regresiones de código base actualmente.

---

## 2. Logic Chain (Cadena de Razonamiento Lógico)

### 2.1 Instalación e Integración de GSAP en Astro 5
1. **Instalación de Dependencia**:
   - Al no existir en `package.json`, se debe instalar `gsap` mediante:
     ```bash
     npm install gsap@^3.15.0
     ```
   - No se requiere `@types/gsap` separado porque `gsap` incluye internamente sus definiciones de tipos oficiales (`gsap/types/index.d.ts`), garantizando compatibilidad inmediata con TypeScript 5.7 configurado en el proyecto.
2. **Prevención de Errores SSR (`window is not defined`)**:
   - Astro 5 compila los componentes en Node.js. Para garantizar que GSAP nunca se ejecute durante el build estático:
     - Todo código GSAP debe residir dentro de etiquetas `<script>` en los componentes `.astro` (los cuales Vite aísla para el cliente).
     - Se debe incluir una guarda explícita: `if (typeof window === 'undefined' || typeof document === 'undefined') return;`.
3. **Inexistencia de Hydration Mismatch en Componentes Astro**:
   - Dado que el Hero, el Navbar, el Footer y las secciones de contenido son componentes `.astro` nativos y no componentes React, el servidor emite HTML estático sin Virtual DOM. Al manipular el DOM con GSAP en el navegador, no existe ningún motor de hidratación que pueda arrojar error de discrepancia de markup.
4. **Ciclo de Vida y Astro Page Load**:
   - Para asegurar que los elementos del DOM existan antes de que GSAP intente seleccionarlos, el script debe engancharse a:
     ```javascript
     if (document.readyState === 'loading') {
       document.addEventListener('DOMContentLoaded', initAnimations);
     } else {
       initAnimations();
     }
     document.addEventListener('astro:page-load', initAnimations);
     ```

---

### 2.2 Diseño de Arquitectura de Animaciones

#### A. Hero Entrance (Revelación Escalonada de Alta Gama)
- **Concepto Visual**: Entrada serena, pausada y de lujo editorial, inspirada en Talora Wellness Group.
- **Curva de Easing**: Curva cúbica editorial `power3.out` (equivalente en aceleración/desaceleración a `cubic-bezier(0.16, 1, 0.3, 1)`), logrando una respuesta inicial enérgica que se asienta suavemente sin rebotes infantiles.
- **Secuencia y Stagger**:
  1. `hero-badge`: `y: 20 -> 0`, `opacity: 0 -> 1`, duración 0.8s.
  2. `hero-title` (H1): `y: 32 -> 0`, `opacity: 0 -> 1`, duración 1.0s (inicia 0.65s antes de que termine el badge).
  3. `hero-description`: `y: 24 -> 0`, `opacity: 0 -> 1`, duración 0.9s.
  4. `hero-cta-group` (Botones de píldora): `y: 20 -> 0`, `opacity: 0 -> 1`, duración 0.8s, stagger 0.1s entre botón principal y secundario.
  5. `hero-metrics`: `y: 16 -> 0`, `opacity: 0 -> 1`, duración 0.7s, stagger 0.08s.
  6. `hero-graphic-container`: `scale: 0.95 -> 1.0`, `y: 24 -> 0`, `opacity: 0 -> 1`, duración 1.2s.
- **Regla Crítica de Limpieza (`clearProps: 'transform,opacity'`)**:
  - Al culminar la animación de entrada, GSAP debe limpiar las propiedades en línea (`clearProps: 'transform,opacity'`). Esto evita que los estilos `transform` en línea creen un contexto de apilamiento (*stacking context*) indeseado que pueda interferir con tooltips, ventanas modales o transformaciones hover posteriores.

#### B. Indicador de Scroll Minimalista (1px)
- **Ubicación Arquitectónica**:
  - Centrado en la parte inferior de la sección Hero:
    ```html
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 pointer-events-none z-20">
      <span class="text-[10px] uppercase font-sans tracking-[0.25em] text-slate-500 font-medium select-none">
        Scroll
      </span>
      <div class="w-[1px] h-16 bg-slate-800/80 relative overflow-hidden rounded-full" aria-hidden="true">
        <div class="scroll-runner absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-[#38BDF8] to-transparent"></div>
      </div>
    </div>
    ```
- **Mecanismo de Animación**:
  - El runner interior desciende de forma cíclica infinita:
    ```javascript
    gsap.fromTo('.scroll-runner',
      { yPercent: -100 },
      {
        yPercent: 200,
        duration: 2.2,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.4
      }
    );
    ```
- **Optimización de Recursos con IntersectionObserver**:
  - Cuando el usuario se desplaza más allá del Hero, un `IntersectionObserver` pausa la animación infinita de GSAP, evitando el consumo innecesario de GPU/batería en dispositivos portátiles.

#### C. Floating Aura (Detrás del Logo Mariposa)
- **Análisis de Integración**:
  - El SVG oficial `logo-mariposa-con-fondo-completo.svg` ya posee interactividad interna (aleteo 3D y anillos que giran al pasar el mouse sobre él). No debe sobreescribirse ni alterarse internamente dicha interactividad para no corromper el activo SVG base.
  - El Aura Flotante debe implementarse como una **capa independiente en segundo plano**, colocada detrás de la tarjeta del logo (`rounded-[2.5rem]`).
- **Estructura HTML & CSS**:
  ```html
  <div class="relative group/butterfly w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
    <!-- Capa de Aura Flotante Orgánica (Aura Cyan Suave) -->
    <div
      class="floating-aura absolute -inset-8 sm:-inset-12 rounded-full pointer-events-none"
      style="
        background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.16) 0%, rgba(14, 23, 47, 0.35) 50%, transparent 72%);
        filter: blur(48px);
        opacity: 0.5;
        will-change: transform, opacity;
      "
      aria-hidden="true"
    ></div>

    <!-- Contenedor Principal de Tarjeta Editorial (rounded-[2.5rem]) -->
    <div class="relative z-10 w-full h-full rounded-[2.5rem] bg-[#0A1226] border border-slate-800/60 p-8 sm:p-10 flex items-center justify-center shrink-0 shadow-[0_24px_60px_-20px_rgba(6,10,26,0.9)] overflow-hidden transition-colors duration-500 group-hover/butterfly:border-[#38BDF8]/40">
      <img
        src="/logo-mariposa-con-fondo-completo.svg"
        alt="Alma Holística — Logo Oficial de la Mariposa Sagrada"
        width="320"
        height="320"
        loading="eager"
        class="w-full h-full object-contain shrink-0 transition-transform duration-700 ease-out group-hover/butterfly:scale-[1.03]"
      />
    </div>
  </div>
  ```
- **Animación GSAP de Respiración Orgánica**:
  - Mediante oscilación sinusoidal suave (`sine.inOut`), la escala varía entre 0.95 y 1.15 con leves traslaciones espaciales en X e Y (`duration: 5.5s`, `repeat: -1`, `yoyo: true`), evocando el ritmo biológico de una respiración consciente.

#### D. Micro-animaciones de Tarjetas (Hover y Elevación)
- **CSS vs GSAP para Hover**:
  - Para los efectos hover de las tarjetas (pilares, 45 dolencias, más de 113 ciudades, testimonios), el uso de **CSS acelerado por hardware con Tailwind** es técnicamente superior a añadir cientos de listeners `mouseenter`/`mouseleave` en JavaScript:
    - *Clase Tailwind recomendada*:
      ```css
      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#38BDF8]/50 hover:shadow-[0_24px_48px_-12px_rgba(6,10,26,0.85)]
      ```
    - *Ventajas*: Se ejecuta íntegramente en el hilo compositor del navegador a 60/120 fps, no consume memoria JS ni arriesga fugas de eventos en el DOM.
- **Scroll Entrance de Tarjetas**:
  - Para la revelación escalonada cuando las secciones entran en el viewport, se puede coordinar un `IntersectionObserver` ligero que dispare un tween GSAP batch (`y: 28 -> 0`, `opacity: 0 -> 1`, `stagger: 0.1`, `duration: 0.8`), garantizando una transición impecable a medida que el visitante explora la página.

---

### 2.3 Estrategia Integral Anti-CLS (`CLS = 0`) y Accesibilidad
1. **Propiedades Composite-Only**:
   - Toda animación GSAP debe restringirse estrictamente a `transform` (`x`, `y`, `scale`, `rotation`) y `opacity`.
   - Estas propiedades no modifican las dimensiones geométricas de la caja (box model) ni desencadenan recálculos de flujo en el layout (*reflow*). La geometría está 100% pre-reservada en el HTML emitido por el servidor.
2. **Dimensiones de Medios Fijas**:
   - Todo elemento gráfico (imágenes, logos y contenedores) cuenta con `width`, `height` y `aspect-ratio` predeterminados en el HTML y CSS (`width="320" height="320" class="w-full h-full object-contain"`).
3. **Respeto a la Accesibilidad (`prefers-reduced-motion`)**:
   - Comprobación nativa: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
   - Si el usuario tiene habilitada la reducción de movimiento en su sistema operativo:
     - GSAP aplica inmediatamente el estado final visible sin interpolación: `gsap.set('.hero-anim-item', { opacity: 1, y: 0, clearProps: 'all' });`.
     - Las animaciones infinitas (scroll runner, floating aura) no inician su loop.
   - Respaldo CSS global en `src/styles/global.css`:
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, *::before, *::after {
         animation-duration: 0.01ms !important;
         animation-iteration-count: 1 !important;
         transition-duration: 0.01ms !important;
         scroll-behavior: auto !important;
       }
     }
     ```
4. **Mejora Progresiva (Fallback sin JavaScript)**:
   - Los elementos en el HTML **no** deben tener clases estáticas como `opacity-0` que dependan exclusivamente de JavaScript para volverse visibles.
   - Si el script no carga o tarda en ejecutarse, el contenido es plenamente legible por defecto.

---

## 3. Caveats (Advertencias y Supuestos)

1. **Plugins Pro de GSAP**:
   - Se asume el uso exclusivo del núcleo público gratuito de GSAP (`gsap` core) y sus facilidades nativas (`power3.out`, `sine.inOut`, `matchMedia`). No se requieren plugins pagos (Club GreenSock como MorphSVG o SplitText), manteniendo el proyecto 100% libre de licencias restringidas y dependencias externas pesadas.
2. **Uso de `ScrollTrigger`**:
   - Para las revelaciones al hacer scroll, el plugin libre `ScrollTrigger` de GSAP puede importarse (`import { ScrollTrigger } from 'gsap/ScrollTrigger'; gsap.registerPlugin(ScrollTrigger);`). No obstante, para mantener el bundle ultra-ligero y prevenir cualquier conflicto con renderizado SSR, un simple `IntersectionObserver` que ejecute `gsap.to()` resulta más que suficiente para la mayoría de secciones.
3. **Alcance de Solo-Lectura de esta Fase**:
   - Como agente explorer en Fase 0 (Survey), este reporte no modifica archivos del proyecto; expone el diseño exacto y los snippets listos para ser implementados por los trabajadores en las siguientes fases.

---

## 4. Conclusion (Evaluación Final y Snippets Listos)

### 4.1 Plan de Instalación
Ejecutar en la fase de implementación:
```bash
npm install gsap@^3.15.0
```

### 4.2 Arquitectura del Script de Animación para `index.astro`
Snippet completo, seguro para SSR y compatible con Astro 5:

```html
<!-- En src/pages/index.astro -->
<script>
  import { gsap } from 'gsap';

  function setupHeroAnimations() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const heroSection = document.querySelector<HTMLElement>('section.hero-section');
    if (!heroSection) return;

    // 1. Verificación de Accesibilidad (prefers-reduced-motion)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.set(['.hero-badge', '.hero-title', '.hero-description', '.hero-cta-group', '.hero-metrics', '.hero-graphic-container', '.floating-aura'], {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: 'all'
      });
      return;
    }

    // 2. Contexto GSAP para aislamiento y limpieza de memoria
    const ctx = gsap.context(() => {
      // Timeline de Entrada Escalonada (Hero Entrance)
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.6'
      )
      .fromTo(
        '.hero-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(
        '.hero-cta-group > *',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        '-=0.65'
      )
      .fromTo(
        '.hero-metrics > div',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        '-=0.55'
      )
      .fromTo(
        '.hero-graphic-container',
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.85'
      )
      .add(() => {
        // Limpieza de transformaciones en línea para evitar interferencias
        gsap.set('.hero-anim-item', { clearProps: 'transform,opacity' });
      });

      // 3. Floating Aura Orgánica en Loop Sinusoidal
      const aura = document.querySelector('.floating-aura');
      if (aura) {
        gsap.to(aura, {
          scale: 1.15,
          x: 8,
          y: -10,
          opacity: 0.65,
          duration: 5.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }

      // 4. Indicador de Scroll Continuo (Línea de 1px)
      const scrollRunner = document.querySelector('.scroll-runner');
      if (scrollRunner) {
        const scrollTween = gsap.fromTo(
          scrollRunner,
          { yPercent: -100 },
          {
            yPercent: 200,
            duration: 2.2,
            ease: 'power2.inOut',
            repeat: -1,
            repeatDelay: 0.4
          }
        );

        // Pausa cuando el Hero no está visible en el viewport
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                scrollTween.resume();
              } else {
                scrollTween.pause();
              }
            });
          },
          { threshold: 0.05 }
        );
        observer.observe(heroSection);
      }
    }, heroSection);

    return () => ctx.revert();
  }

  // Inicialización multi-evento compatible con navegación Astro
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeroAnimations);
  } else {
    setupHeroAnimations();
  }
  document.addEventListener('astro:page-load', setupHeroAnimations);
</script>
```

---

## 5. Verification Method (Método de Verificación Independiente)

1. **Verificación de Instalación y Dependencias**:
   - Inspeccionar `package.json` para comprobar la presencia de `"gsap": "^3.15.0"`.
   - Ejecutar `npm run check` para verificar que TypeScript resuelva correctamente los tipos de `gsap`.
2. **Verificación de Compilación SSG**:
   - Ejecutar:
     ```bash
     npm run build
     ```
   - Debe finalizar con código de salida 0 sin ningún error de `ReferenceError: window is not defined` ni advertencias de compilación.
3. **Verificación de Prevención de CLS (`CLS = 0`)**:
   - Inspeccionar que todas las animaciones operen únicamente sobre `transform` y `opacity`.
   - Ejecutar `npm test` para validar que las pruebas de viewport y contención móvil (Tier 2 subtest 6: `T2.6.1` y `T2.6.2`) continúen pasando con 100% de éxito.
4. **Condiciones de Invalidación**:
   - Si se animan propiedades de geometría (`top`, `margin`, `height`, `width`), el test o auditoría de CLS arrojará un valor mayor a 0.
   - Si se añade código GSAP fuera de bloques `<script>` en el frontmatter de Astro, el comando `npm run build` fallará inmediatamente en Node.js.
