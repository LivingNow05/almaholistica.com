# DISPATCH — Worker GEO-M1

## Identity
You are `teamwork_preview_worker_geom1_1`.
Working directory: `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_geom1_1`
Parent: `teamwork_preview_orchestrator_8` (`dee5921c-c2ce-44d0-97b2-5ec780197d61`)

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Authoritative Requirements & Inputs
Read the following files before making changes:
- `/Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md` (specifically lines 178-237, '## Follow-up — 2026-09-16T00:16:05Z')
- `/Users/anthony/Downloads/almaholistica.com/PROJECT.md`
- Survey and Mining Reports:
  - `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/report.md`
  - `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_1/report.md`
  - `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_2/report.md`

## Write Ownership
You have exclusive write ownership of:
- `public/llms.txt`
- `src/pages/index.astro`
- `src/lib/dolencias.ts`
- `src/pages/biodescodificacion/[slug].astro`
- `src/pages/[slug].astro`

## Objectives
1. **R1 (public/llms.txt)**:
   - Replace provisional phone `+57 300 000 0000` with official phone `+57 315 1206985`.
   - Update city links to use canonical prefix `/biodescodificacion-{slug}/` with trailing slash (e.g. `https://almaholistica.com/biodescodificacion-bogota/`).
   - Sincronize crawler directives, list all 45 dolencias and 20 countries with their currencies.
2. **R2 (src/pages/index.astro)**:
   - Update the first visible paragraph of the Hero (around lines 138-140) to start with:
     `Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países...`
     (ensuring "Alma Holística es" is in the first 50 characters, and entity is declared in first 200 characters).
   - Maintain `gsap-hero-el` class, Swiss Bio-Tech solid matte aesthetics, no yellow/amber, CLS=0.
   - ABSOLUTE RESTRICTION: DO NOT add any `<script type="application/ld+json">` in `src/pages/index.astro`. `dist/index.html` must have exactly 0 JSON-LD scripts per `MR3-CH2-4.5`.
3. **R3 (src/lib/dolencias.ts & src/pages/biodescodificacion/[slug].astro)**:
   - Build a helper or function in `src/lib/dolencias.ts` to construct the canonical RAG citability block for each dolencia.
   - Word count MUST be between 134 and 167 words (tolerance 130-170 words).
   - First 40-50 words: direct definition of pathology + biological system + root emotional conflict + adaptive biological meaning.
   - Next 80-100 words: symptom phases (active stress vs vagotonía/reparación) + Alma Holística 1-on-1 bioemotional reprogramming protocol + allopathic medical disclaimer.
   - Insert this block modularly after `<header>` (post-Hero) and before `#en-palabras-simples` or `#conflicto`.
   - Preserve all 3 existing JSON-LD schemas (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`).
4. **R4 (src/pages/[slug].astro)**:
   - Integrate E-E-A-T clinical authority data from `src/data/dataset_almaholistica_ciudades_eeat_geo.json`.
   - Map `slug` using `slug.replace(/^biodescodificacion-/, '')`.
   - Render specialist card (Lic. Sofía Alarcón, Dr. Mateo Benavides, or Dra. Elena Monsalve) with professional registry, local case context, methodological backing (PNI, Hamer, Flèche, Lipton), and medical disclaimer.
   - Keep solid matte aesthetics, zero yellow/amber, and preserve exactly 2 JSON-LD schemas per city page (`HealthAndBeautyBusiness` + `BreadcrumbList`). Total schemas across 160 pages must remain 361.
5. **R5 (Verification & Zero Regressions)**:
   - Run `npm run build` -> 160 SSG pages generated cleanly, `dist/llms.txt` populated.
   - Run `npm test` -> 150/150 pass.
   - Run `node --test tests/adversarial_*.test.mjs` -> 244/244 pass.
   - Run `python3 tests/adversarial_assets_config_m2_2.py` -> pass.
   - Run `python3 tests/adversarial_m6_stress_harness.py` -> pass.

Write your findings, code diffs, verification outputs, and 5-component handoff in:
`/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_geom1_1/handoff.md`.
Send a message when completed.

## 2026-09-15T19:23:18Z
You are teamwork_preview_worker_geom1_1.
Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_geom1_1.
Your parent is teamwork_preview_orchestrator_8 (Conv ID: dee5921c-c2ce-44d0-97b2-5ec780197d61).

Implement Requirements R1, R2, R3, R4 as specified in DISPATCH.md.
Then run full verification:
1. npm run build
2. npm test
3. node --test tests/adversarial_*.test.mjs
4. python3 tests/adversarial_assets_config_m2_2.py
5. python3 tests/adversarial_m6_stress_harness.py

Document everything in /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_geom1_1/handoff.md and report back via send_message.
