# Plan: SEO-GEO Optimization & Hardening (R1 - R5)

## Phase 0: Survey & Exploration
- Dispatch 3 Explorers (or 2 Explorers + 1 Spec Miner) to investigate:
  - Existing `public/llms.txt`, tests covering llms.txt, phone numbers, and city links.
  - `src/pages/index.astro`, Hero section, first paragraph, GSAP animations, JSON-LD restriction (`MR3-CH2-4.5`).
  - `src/pages/biodescodificacion/[slug].astro`, data source `dataset_biodescodificacion_dolencias.json`, RAG citation block requirements (134-167 words, structure).
  - `src/data/dataset_almaholistica_ciudades_eeat_geo.json`, specialists & methodological validation (Psiconeuroinmunología, Hamer, Flèche, Lipton), and medical disclaimer.
  - Test suites: `npm test` (150 tests), `node --test tests/adversarial_*.test.mjs` (244 tests), `adversarial_assets_config_m2_2.py`, `adversarial_m6_stress_harness.py`.

## Phase 1: Implementation Milestones
- **Milestone 1**: R1 Sanitization of `public/llms.txt` (+57 315 1206985, canonical city URLs with trailing slash, synchronized crawler directives).
- **Milestone 2**: R2 Entity anchoring in `src/pages/index.astro` Hero ("Alma Holística es una plataforma clínica...", preserving Swiss Bio-Tech style and GSAP, no JSON-LD in dist/index.html).
- **Milestone 3**: R3 Canonical RAG Citability block in `src/pages/biodescodificacion/[slug].astro` (134-167 words, 40-50 words direct definition, 80-100 words phase explanation & protocol).
- **Milestone 4**: R4 E-E-A-T clinical authority visibility & methodological endorsement using `src/data/dataset_almaholistica_ciudades_eeat_geo.json`.

## Phase 2: Verification & Hardening (R5)
- Worker runs:
  - `npm test` (150/150)
  - `node --test tests/adversarial_*.test.mjs` (244/244)
  - `python3 tests/adversarial_assets_config_m2_2.py`
  - `python3 tests/adversarial_m6_stress_harness.py`
  - `npm run build` (160 pages cleanly generated, CLS=0)
- Reviewers (2) verify code, design, constraints, and test outputs.
- Challengers (2) stress test RAG word counts, links, entity phrasing, and schema preservation.
- Forensic Auditor checks integrity.

## Phase 3: Gate & Completion
- Review gate status. If all pass, complete handoff and report to Sentinel.
