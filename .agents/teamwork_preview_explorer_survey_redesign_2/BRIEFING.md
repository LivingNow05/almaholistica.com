# BRIEFING — 2026-09-06T17:16:00Z

## Mission
Investigación exhaustiva read-only de Fase 0 (Survey) para el rediseño de alta gama de Alma Holística, enfocado en R2: Animaciones Profesionales Suaves con GSAP, prevención de CLS, compatibilidad con Astro 5, Scroll Indicator, Floating Aura y Cards.

## 🔒 My Identity
- Archetype: explorer
- Roles: survey, animation architecture, performance & a11y analyst
- Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_redesign_2
- Original parent: 93e8f0a5-1682-4c66-b0a7-8c1e4772afcf
- Milestone: Phase 0 - Survey (R2 GSAP Animations)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement or modify project source code
- Files for content delivery, Messages for coordination
- All communications in Spanish
- Output path discipline: only write in own folder `.agents/teamwork_preview_explorer_survey_redesign_2/`
- Zero CLS impact (`CLS = 0`)
- Respect `prefers-reduced-motion`

## Current Parent
- Conversation ID: 93e8f0a5-1682-4c66-b0a7-8c1e4772afcf
- Updated: 2026-09-06T17:14:32Z

## Investigation State
- **Explored paths**:
  - `package.json`: validación de dependencias actuales y ausencia de GSAP.
  - `astro.config.mjs`: configuración estática (`output: 'static'`) y pipeline Vite.
  - `tailwind.config.mjs`: tokens de colores, sombras y familias tipográficas.
  - `src/pages/index.astro`: estructura del Hero, columnas, métricas y cards actuales.
  - `src/layouts/BaseLayout.astro`: layout maestro, fuentes, scripts y contenedor de modal.
  - `src/styles/global.css`: tokens CSS, contención anti-CLS y componentes base.
  - `public/logo-mariposa-con-fondo-completo.svg`: análisis estructural de capas internas y CSS hover.
  - `tests/tier1_features.test.mjs` a `tier4_user_journeys.test.mjs`: ejecución completa (150/150 tests pass).
- **Key findings**:
  - `gsap` no está instalado en `package.json`. La versión estable disponible en npm es `3.15.0`.
  - Astro 5 compila páginas como SSG (HTML estático puro). Los scripts dentro de `<script>` en `.astro` se ejecutan exclusivamente en el cliente (navegador) vía Vite bundling, sin riesgo de SSR crash ni hydration mismatch en componentes Astro.
  - Para garantizar `CLS = 0`, solo se deben animar propiedades compuestas por GPU (`opacity` y `transform: translate/scale`).
  - El logo mariposa ya cuenta con animaciones SVG en hover; el Floating Aura se debe posicionar en un elemento de fondo independiente (`absolute -inset-8`) con blur y gradiente cyan suave.
  - El indicador de scroll de 1px debe ubicarse en la base central del Hero (`bottom-6 left-1/2 -translate-x-1/2`).
  - Las micro-animaciones de hover de tarjetas deben gestionarse con CSS/Tailwind (`duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`) para evitar memory leaks por cientos de event listeners JS, mientras que la entrada al viewport puede coordinarse con GSAP.
- **Unexplored areas**:
  - Ninguna dentro del alcance de Fase 0 R2.

## Key Decisions Made
- Definir arquitectura de animación con fallback de mejora progresiva (contenido visible si JS está desactivado).
- Emplear `gsap.context()` y `clearProps: 'all'` para evitar efectos secundarios de apilamiento en CSS.
- Documentar estrategia de accesibilidad estricta con `window.matchMedia('(prefers-reduced-motion: reduce)')`.

## Artifact Index
- `.agents/teamwork_preview_explorer_survey_redesign_2/DISPATCH.md` — Log de despachos
- `.agents/teamwork_preview_explorer_survey_redesign_2/BRIEFING.md` — Memoria operativa
- `.agents/teamwork_preview_explorer_survey_redesign_2/progress.md` — Liveness heartbeat
- `.agents/teamwork_preview_explorer_survey_redesign_2/handoff.md` — Reporte final estructurado de 5 componentes
