# DISPATCH — Worker M4 (Milestone M4: Dynamic SSG Routes & Pages)

## Role & Mission
Eres `teamwork_preview_worker_m4` (`teamwork_preview_worker`). Tu misión es implementar los módulos de datos SSG en `src/lib/` y todas las páginas dinámicas y estáticas en `src/pages/` para Alma Holística.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Archivos de Lectura Obligatoria
1. `/Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md` (Lectura completa y obligatoria)
2. `/Users/anthony/Downloads/almaholistica.com/PROJECT.md`
3. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/handoff.md`
4. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_2/handoff.md`
5. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_3/handoff.md`

## Propiedad Exclusiva de Escritura (Write Ownership)
- Posees exclusivamente:
  - `src/lib/cities.ts`
  - `src/lib/dolencias.ts`
  - `src/pages/[slug].astro`
  - `src/pages/biodescodificacion/[slug].astro`
  - `src/pages/index.astro`
  - `src/pages/biodescodificacion/index.astro`

## Tareas de Implementación
1. Desplegar los módulos de lectura de datos:
   - Copiar `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/proposed_cities.ts` a `src/lib/cities.ts`.
   - Copiar `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/proposed_dolencias.ts` a `src/lib/dolencias.ts`.
2. Desplegar las rutas dinámicas SSG:
   - Copiar `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_2/proposed_city_slug.astro` a `src/pages/[slug].astro`.
   - Copiar `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_2/proposed_dolencia_slug.astro` a `src/pages/biodescodificacion/[slug].astro`.
3. Desplegar la Home y el Directorio de Dolencias:
   - Copiar `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_3/proposed_index.astro` a `src/pages/index.astro`.
   - Copiar `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_3/proposed_biodescodificacion_index.astro` a `src/pages/biodescodificacion/index.astro`.
4. Ejecutar y verificar:
   - `npx astro check`: debe dar 0 errores y 0 warnings.
   - `npm run build`: debe compilar limpiamente en modo estático (`output: 'static'`) generando más de 160 páginas HTML estáticas en `dist/`.
   - `node --test tests/*.test.mjs`: verificar que todas las pruebas activas de M1, M2, M3 y M4 pasen al 100%.
   - Ejecutar el auditor de estilo sólido mate sobre todos los archivos nuevos.

## Entrega
Generar reporte en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m4/handoff.md` con las 5 secciones estándar.
Enviar mensaje al parent ID al concluir.

## 2026-09-06T04:57:23Z
Eres worker_m4 (teamwork_preview_worker).
Tu directorio de trabajo exclusivo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m4/
Lee inmediatamente y de forma obligatoria:
1. /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
2. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m4/DISPATCH.md
3. /Users/anthony/Downloads/almaholistica.com/PROJECT.md
4. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/handoff.md
5. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_2/handoff.md
6. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_3/handoff.md

Implementa:
1. Despliega src/lib/cities.ts (desde .agents/teamwork_preview_explorer_m4_1/proposed_cities.ts) y src/lib/dolencias.ts (desde .agents/teamwork_preview_explorer_m4_1/proposed_dolencias.ts).
2. Despliega src/pages/[slug].astro (desde .agents/teamwork_preview_explorer_m4_2/proposed_city_slug.astro) y src/pages/biodescodificacion/[slug].astro (desde .agents/teamwork_preview_explorer_m4_2/proposed_dolencia_slug.astro).
3. Despliega src/pages/index.astro (desde .agents/teamwork_preview_explorer_m4_3/proposed_index.astro) y src/pages/biodescodificacion/index.astro (desde .agents/teamwork_preview_explorer_m4_3/proposed_biodescodificacion_index.astro).
4. Ejecuta npx astro check, npm run build (verifica que se generen estáticamente las 160+ páginas HTML) y node --test tests/*.test.mjs.
5. Verifica el estilo sólido mate con auditMateStyleContent.
6. Escribe tu handoff en /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m4/handoff.md y envía mensaje al parent ID al concluir.

