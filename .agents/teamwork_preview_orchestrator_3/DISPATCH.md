# DISPATCH — teamwork_preview_orchestrator_3 (Generation 3)

## Role & Mission
Eres `teamwork_preview_orchestrator_3` (Generación 3), el Orquestador del Proyecto para Alma Holística. Tu misión es culminar la plataforma completando los Hitos M4, M5 y M6, ejecutando sus compuertas de verificación y entregando el reporte final al Sentinel.

## Dedicated Working Directory
`/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_orchestrator_3/`

## Parent Hierarchy
Tu Parent Conversation ID es: `4b183d27-25b4-4d11-a3f3-42c0397fb23f`.
Usa este ID para toda comunicación de escalación, estado y reporte final mediante `send_message`.

## Archivos de Lectura Obligatoria Inmediata
1. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_orchestrator_2/handoff.md` (Lectura fundamental con instrucciones directas)
2. `/Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md`
3. `/Users/anthony/Downloads/almaholistica.com/PROJECT.md`
4. `/Users/anthony/Downloads/almaholistica.com/TEST_READY.md`
5. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_orchestrator_2/GATE_STATUS.md`

## Estado Actual de los Hitos
- **M1**: DONE (Datasets programáticos).
- **M2**: DONE (Astro 5 + Tailwind Matte Core Layout).
- **M3**: DONE (WhatsApp Quiz Funnel Modal interactivo con client:load).
- **M4**: IN_PROGRESS (Fase de exploración 100% lista; prototipos probados listos en `.agents/teamwork_preview_explorer_m4_*`).
- **M5**: PLANNED (SEO Schemas & SitemapFast).
- **M6**: PLANNED (Verificación E2E final, build 100% limpio y entrega al Sentinel).

## Acciones Inmediatas a Ejecutar
1. Iniciar tu `BRIEFING.md`, `progress.md` y `GATE_STATUS.md` en tu directorio de trabajo. Iniciar tu cron de latido con `schedule`.
2. Despachar `teamwork_preview_worker_m4` para desplegar los 6 prototipos validados en `src/lib/` y `src/pages/`:
   - `src/lib/cities.ts` (de `.agents/teamwork_preview_explorer_m4_1/proposed_cities.ts`)
   - `src/lib/dolencias.ts` (de `.agents/teamwork_preview_explorer_m4_1/proposed_dolencias.ts`)
   - `src/pages/[slug].astro` (de `.agents/teamwork_preview_explorer_m4_2/proposed_city_slug.astro`)
   - `src/pages/biodescodificacion/[slug].astro` (de `.agents/teamwork_preview_explorer_m4_2/proposed_dolencia_slug.astro`)
   - `src/pages/index.astro` (de `.agents/teamwork_preview_explorer_m4_3/proposed_index.astro`)
   - `src/pages/biodescodificacion/index.astro` (de `.agents/teamwork_preview_explorer_m4_3/proposed_biodescodificacion_index.astro`)
3. Verificar con Worker M4: `npx astro check`, `npm run build` y `node --test tests/*.test.mjs`.
4. Ejecutar la compuerta de M4 (Reviewers, Challengers, Auditor Forense).
5. Proceder con M5 (`src/lib/schema.ts` y `scripts/generate_sitemap.py`).
6. Proceder con M6 (100% de la suite E2E verde, build completo y reporte de cierre al Sentinel vía `send_message`).
