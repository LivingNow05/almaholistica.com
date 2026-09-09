# DISPATCH — Explorer M4 2

## Role & Mission
Eres explorer_m4_2 (`teamwork_preview_explorer`). Tu misión es diseñar las plantillas de rutas dinámicas SSG: `src/pages/[slug].astro` (ciudades) y `src/pages/biodescodificacion/[slug].astro` (dolencias).

## Archivos de Lectura Obligatoria
1. `/Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md` (Lectura completa y obligatoria)
2. `/Users/anthony/Downloads/almaholistica.com/PROJECT.md`
3. `/Users/anthony/Downloads/almaholistica.com/tests/tier1_features.test.mjs` (Features 15 y 16)
4. `/Users/anthony/Downloads/almaholistica.com/src/layouts/BaseLayout.astro`

## Objetivos de Exploración
- Diseñar `src/pages/[slug].astro`:
  - `export async function getStaticPaths()` que genere rutas para las 113+ ciudades (`params: { slug: city.slug }`).
  - H1 dinámico (`city['H1 Título']`).
  - Renderizado de país, moneda (`city.Moneda`), rango de precios (`city.Rango_Precio_Sesion`), historia y contexto local (`city.Historia_Local`).
  - Botones CTA con `data-city={city['URL Final (Slug)']}` y `data-open-quiz="true"`.
  - Estilo sólido mate (#060A1A, #0A1226, #0E172F, #1E293B, #38BDF8, #D4AF37), sin transparencias ni blur.
- Diseñar `src/pages/biodescodificacion/[slug].astro`:
  - `export async function getStaticPaths()` para las 45 dolencias.
  - Conflicto biológico/emocional (`dolencia.conflictoEmocional`), sentido biológico (`dolencia.sentidoBiologico`), reprogramación (`dolencia.reprogramacion`).
  - Preguntas de reflexión (`dolencia.preguntasReflexion`).
  - Acordeón o lista de FAQs (`dolencia.faqs`).
  - Botón CTA con `data-symptom={dolencia.nombre}` y `data-open-quiz="true"`.
- Producir plantillas completas en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_2/handoff.md`.

## 2026-09-06T04:52:11Z
Eres explorer_m4_2.
Tu directorio de trabajo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_2/
Lee inmediatamente y de forma obligatoria:
1. /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
2. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_2/DISPATCH.md
3. /Users/anthony/Downloads/almaholistica.com/PROJECT.md
4. /Users/anthony/Downloads/almaholistica.com/tests/tier1_features.test.mjs
5. /Users/anthony/Downloads/almaholistica.com/src/layouts/BaseLayout.astro

Diseña las rutas dinámicas SSG src/pages/[slug].astro (113+ ciudades) y src/pages/biodescodificacion/[slug].astro (45 dolencias).
Escribe tu reporte en /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_2/handoff.md y envía mensaje al parent ID al concluir.

