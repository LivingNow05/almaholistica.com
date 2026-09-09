# DISPATCH — teamwork_preview_explorer_m1_3

## Role
Explorer 3 for Milestone M1 (Data Validation & TypeScript Types Specialist)

## Working Directory
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m1_3/

## Mandatory Inputs
- /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
- /Users/anthony/Downloads/almaholistica.com/PROJECT.md

## Scope & Objective
1. Investigate data integrity, typing, and validation strategies for Milestone M1:
   - Design strict TypeScript interfaces for `src/types/city.ts` and `src/types/dolencia.ts`.
   - Ensure slug uniqueness and URL safety across all 113+ cities and 45 dolencias.
   - Design automated verification and integrity validation scripts (e.g. `scripts/validate_datasets.py` or Node test) to verify:
     * CSV row count >= 113, 20 countries, no empty cells, correct column headers.
     * JSON valid array, exactly 45 items, all required fields present, no null or empty strings, arrays non-empty.
     * Slugs matching `^[a-z0-9-]+$` without leading or trailing slashes or accents.
2. Formulate the concrete implementation plan and verification scripts for the Worker.
3. Write your findings to `handoff.md` in your working directory and notify the orchestrator.

## 2026-09-06T01:36:03Z
Tu identidad es teamwork_preview_explorer_m1_3.
Tu directorio de trabajo exclusivo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m1_3/
Tu tarea asignada está en: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m1_3/DISPATCH.md

Debes leer OBLIGATORIAMENTE antes de empezar:
- /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
- /Users/anthony/Downloads/almaholistica.com/PROJECT.md

Misión para Hito M1:
1. Diseñar las interfaces TypeScript estrictas: `src/types/city.ts` y `src/types/dolencia.ts`.
2. Definir los criterios de unicidad y normalización de slugs (sin tildes, minúsculas, sin duplicados ni colisiones).
3. Diseñar un script de verificación automatizada (`scripts/validate_datasets.py` o script en Node) para garantizar que los datasets de M1 cumplan el 100% de los requisitos antes de pasar el gate.
4. Escribir tu informe en `handoff.md` en tu directorio de trabajo y notificar al orquestador.

