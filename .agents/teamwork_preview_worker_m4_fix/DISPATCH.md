# DISPATCH — Worker M4 Fix (Milestone M4 Remediation Iteration)

## Role & Mission
Eres `teamwork_preview_worker_m4_fix` (`teamwork_preview_worker`). Tu misión es aplicar las 3 correcciones identificadas en la compuerta de M4 por `reviewer_m4_2` y `challenger_m4_2`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Archivos de Lectura Obligatoria
1. `/Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md` (Lectura completa y obligatoria)
2. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_m4_2/handoff.md`
3. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_challenger_m4_2/handoff.md`
4. `/Users/anthony/Downloads/almaholistica.com/src/pages/[slug].astro`
5. `/Users/anthony/Downloads/almaholistica.com/src/pages/index.astro`
6. `/Users/anthony/Downloads/almaholistica.com/src/components/Footer.astro`

## Propiedad Exclusiva de Escritura (Write Ownership)
- Posees exclusivamente:
  - `src/pages/[slug].astro`
  - `src/pages/index.astro`
  - `src/components/Footer.astro`

## Tareas Específicas de Corrección
1. En `src/pages/[slug].astro`:
   - Corregir en la línea ~300 el enlace hacia `/biodescodificacion/migranas` para que apunte exactamente al slug oficial `/biodescodificacion/migrana` (singular).
2. En `src/pages/index.astro`:
   - En la lista `featuredSlugs`, corregir los slugs:
     - `'migranas'` -> `'migrana'`
     - `'sobrepeso'` -> `'sobrepeso-retencion'`
   - Verificar que ahora se rendericen las 12 tarjetas completas en el grid de dolencias destacadas.
3. En `src/components/Footer.astro`:
   - En el enlace de WhatsApp / Contacto (línea ~178), añadir el atributo `data-open-quiz="true"` para que sea consistente con todos los demás CTAs de WhatsApp y pase la prueba `ADV-M4.2.16`.

## Verificación a Ejecutar
- `npx astro check`: 0 errores, 0 warnings.
- `npm run build`: compilación limpia de 160 páginas estáticas.
- `node --test tests/*.test.mjs`: verificar que todas las pruebas pasen al 100% con 0 fallos.
- `node -e 'import fs from "fs"; import { auditMateStyleContent } from "./tests/helpers/mate_style_checker.mjs"; ...'` (0 violaciones).

## Entrega
Generar reporte en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m4_fix/handoff.md` y enviar mensaje al parent ID al concluir.

## 2026-09-06T05:08:26Z
Eres worker_m4_fix (teamwork_preview_worker).
Tu directorio de trabajo exclusivo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m4_fix/
Lee inmediatamente y de forma obligatoria:
1. /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
2. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m4_fix/DISPATCH.md
3. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_m4_2/handoff.md
4. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_challenger_m4_2/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Aplica las 3 correcciones:
1. En src/pages/[slug].astro: cambiar /biodescodificacion/migranas a /biodescodificacion/migrana.
2. En src/pages/index.astro: en featuredSlugs, cambiar 'migranas' por 'migrana' y 'sobrepeso' por 'sobrepeso-retencion' (12 tarjetas en el grid).
3. En src/components/Footer.astro: agregar data-open-quiz="true" al enlace de WhatsApp/Contacto (línea ~178).

Ejecuta npx astro check, npm run build y node --test tests/*.test.mjs.
Escribe tu handoff en /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m4_fix/handoff.md y envía mensaje al parent ID al concluir.
