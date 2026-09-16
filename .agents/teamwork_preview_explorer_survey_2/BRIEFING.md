# BRIEFING — 2026-09-16T00:23:00Z

## Mission
Investigar y relevar a fondo R3 (citabilidad RAG modular en 45 dolencias, `src/pages/biodescodificacion/[slug].astro`) y R4 (autoridad E-E-A-T clínico, especialistas y validación metodológica en `src/data/dataset_almaholistica_ciudades_eeat_geo.json`), preservando esquemas JSON-LD (MedicalWebPage, FAQPage, BreadcrumbList) y garantizando cero regresiones.

## 🔒 My Identity
- Archetype: explorer
- Roles: investigation, synthesis
- Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_2
- Original parent: dee5921c-c2ce-44d0-97b2-5ec780197d61 (teamwork_preview_orchestrator_8)
- Milestone: preview_explorer_survey_2_followup

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Hablar siempre en español
- No modificar ni crear archivos fuera de .agents/teamwork_preview_explorer_survey_2/
- Entregar report.md y handoff.md de 5 componentes

## Current Parent
- Conversation ID: dee5921c-c2ce-44d0-97b2-5ec780197d61
- Updated: 2026-09-16T00:23:00Z

## Investigation State
- **Explored paths**:
  - `src/pages/biodescodificacion/[slug].astro`
  - `src/data/dataset_biodescodificacion_dolencias.json`
  - `src/lib/dolencias.ts` & `src/types/dolencia.ts`
  - `src/data/dataset_almaholistica_ciudades_eeat_geo.json` & CSV
  - `src/pages/[slug].astro` & `src/lib/cities.ts`
  - `src/pages/index.astro`, `src/components/Footer.astro`, `src/lib/schema.ts`
  - `tests/` (150 regression, 244 adversarial, Python harnesses)
- **Key findings**:
  1. R3: Fórmula de pasaje RAG validada empíricamente en las 45 dolencias con rango estricto de 143 a 165 palabras (cumple 134-167). Inserción recomendada post-Hero antes de desgloses.
  2. R4: Mapeo completo de los 3 especialistas certificados, aval metodológico (PNI, Hamer, Flèche, Lipton) y descargo médico.
  3. Slug normalization: CSV usa `biodescodificacion-bogota` y JSON usa `bogota`; normalización logra 100% de match (113/113).
  4. Preservación estricta de esquemas: `MedicalWebPage`, `FAQPage`, `BreadcrumbList` intactos en dolencias; cumplimiento de `MR3-CH2-4.5` (CERO JSON-LD en `index.html`).
- **Unexplored areas**: Ninguna. Relevamiento completo de R3 y R4.

## Key Decisions Made
- Estructurar el pasaje RAG en 2 partes complementarias (definición directa de ~45-55 palabras + fases y protocolo clínico de 97 palabras fijas).
- Recomendar despliegue de E-E-A-T en 3 niveles: páginas de ciudad (terapeuta asignado y casos locales), Home (equipo clínico general sin JSON-LD), y dolencias (complementariedad médica).
- Documentar reporte técnico exhaustivo en `report.md` y handoff formal en `handoff.md`.

## Artifact Index
- DISPATCH.md — Registro de instrucciones de despacho
- BRIEFING.md — Memoria de trabajo situacional
- progress.md — Heartbeat de liveness
- report.md — Reporte técnico exhaustivo sobre R3 y R4
- handoff.md — Reporte final de entrega (5 componentes)
