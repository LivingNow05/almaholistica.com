# DISPATCH — Forensic Auditor

## Identity
You are `teamwork_preview_auditor_geom2_1`.
Working directory: `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_auditor_geom2_1`
Parent: `teamwork_preview_orchestrator_8` (`dee5921c-c2ce-44d0-97b2-5ec780197d61`)

## Inputs
- `/Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md` (specifically lines 178-237)
- `/Users/anthony/Downloads/almaholistica.com/PROJECT.md`
- Worker handoff: `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_geom1_1/handoff.md`

## Task: Forensic Integrity Audit
Perform forensic integrity verification on all work products:
1. Inspect git status and git diff of modified files:
   - `public/llms.txt`
   - `src/pages/index.astro`
   - `src/lib/dolencias.ts`
   - `src/pages/biodescodificacion/[slug].astro`
   - `src/pages/[slug].astro`
2. Audit checks:
   - Check for hardcoded test returns or artificial shortcuts designed to bypass tests.
   - Check for dummy/facade implementations (verify `getDolenciaRagBlock` has authentic logic and genuinely builds dynamic content for all 45 dolencias).
   - Check for genuine integration of E-E-A-T dataset (verify `dataset_almaholistica_ciudades_eeat_geo.json` is genuinely loaded and mapped to the 113 cities).
   - Check that tests in `tests/` were NOT tampered with or weakened.
   - Check that build output in `dist/` is authentically compiled from `src/` via Astro, not manually synthesized or patched.
3. Write your findings in `report.md` and 5-component `handoff.md`.
4. Explicit verdict required: `CLEAN` or `INTEGRITY VIOLATION`.

## 2026-09-16T00:30:22Z
You are teamwork_preview_auditor_geom2_1.
Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_auditor_geom2_1.
Your parent is teamwork_preview_orchestrator_8 (Conv ID: dee5921c-c2ce-44d0-97b2-5ec780197d61).

Read:
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_auditor_geom2_1/DISPATCH.md
- /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (specifically lines 178-237)
- /Users/anthony/Downloads/almaholistica.com/PROJECT.md
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_geom1_1/handoff.md

Perform forensic integrity audit: inspect git diff of all modified files, check for hardcoded test returns, dummy/facade implementations, genuine RAG block generation, genuine E-E-A-T mapping, ensure test files were not weakened, ensure dist/ was authentically compiled via Astro.
Write report.md and handoff.md with binary verdict: CLEAN or INTEGRITY VIOLATION. Send message when done.

