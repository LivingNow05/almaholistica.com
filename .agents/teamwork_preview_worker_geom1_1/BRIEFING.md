# BRIEFING — 2026-09-15T19:30:00Z

## Mission
Implement Requirements R1, R2, R3, and R4 for SEO-GEO optimization in Alma Holística while guaranteeing zero regressions across all test suites.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_geom1_1
- Original parent: dee5921c-c2ce-44d0-97b2-5ec780197d61
- Milestone: GEO-M1

## 🔒 Key Constraints
- DO NOT CHEAT. All implementations must be genuine.
- Exclusive write ownership: public/llms.txt, src/pages/index.astro, src/lib/dolencias.ts, src/pages/biodescodificacion/[slug].astro, src/pages/[slug].astro.
- R1: public/llms.txt: replace +57 300 000 0000 with +57 315 1206985; canonical city URLs /biodescodificacion-{slug}/ with trailing slash; all 45 dolencias; 20 countries.
- R2: src/pages/index.astro: first visible paragraph of Hero starts with "Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países..."; maintain gsap-hero-el, Swiss Bio-Tech matte aesthetics, CLS=0.
- ABSOLUTE RESTRICTION: DO NOT add any <script type="application/ld+json"> in src/pages/index.astro. dist/index.html must have exactly 0 JSON-LD scripts per MR3-CH2-4.5.
- R3: src/lib/dolencias.ts & src/pages/biodescodificacion/[slug].astro: RAG citability block 134-167 words (tolerance 130-170). First 40-50 words: direct definition of pathology + biological system + root emotional conflict + adaptive biological meaning. Next 80-100 words: symptom phases + protocol + allopathic medical disclaimer. Insert post-Hero before #en-palabras-simples or #conflicto. Preserve 3 JSON-LD schemas.
- R4: src/pages/[slug].astro: E-E-A-T clinical authority data from dataset_almaholistica_ciudades_eeat_geo.json (slug.replace(/^biodescodificacion-/, '')). Render specialist card, registry, local case context, methodology, disclaimer. Solid matte, 0 yellow/amber, exactly 2 JSON-LD schemas per city. Global 361 schemas across 160 pages.
- R5: Zero regressions. 150/150 npm test, 244/244 adversarial tests, python3 tests/adversarial_assets_config_m2_2.py, python3 tests/adversarial_m6_stress_harness.py.

## Current Parent
- Conversation ID: dee5921c-c2ce-44d0-97b2-5ec780197d61
- Updated: 2026-09-15T19:23:18Z

## Task Summary
- **What to build**: Implemented R1 (public/llms.txt), R2 (src/pages/index.astro), R3 (src/lib/dolencias.ts & src/pages/biodescodificacion/[slug].astro), R4 (src/pages/[slug].astro).
- **Success criteria**: 160 SSG pages cleanly built, 361 schemas, 0 JSON-LD in dist/index.html, 0 broken links, CLS=0, full test suites pass (150/150 npm test, 244/244 adversarial tests, python M2.2 & M6 pass).
- **Interface contracts**: PROJECT.md § Interface Contracts
- **Code layout**: PROJECT.md § Code Layout

## Change Tracker
- **Files modified**:
  - `public/llms.txt`: Replaced provisional phone with +57 315 1206985, canonical /biodescodificacion-{slug}/ city URLs, 45 dolencias, 20 countries. Synced to dist/llms.txt.
  - `src/pages/index.astro`: Updated Hero paragraph to declare entity anchor in first 50 chars. Zero JSON-LD scripts.
  - `src/lib/dolencias.ts`: Exported `getDolenciaRagBlock` and `generateRagCitationBlock` producing 134-167 words.
  - `src/pages/biodescodificacion/[slug].astro`: Added `<section id="definicion-citabilidad-rag">` and methodology note in disclaimer aside. Preserved 3 JSON-LD schemas.
  - `src/pages/[slug].astro`: Integrated E-E-A-T section with specialist card, credentials, registry, local case notes, methodology (PNI, Hamer, Flèche, Lipton), and medical disclaimer. Preserved exactly 2 JSON-LD schemas per city.
- **Build status**: PASS (160 SSG pages cleanly built)
- **Pending issues**: None

## Quality Status
- **Build/test result**: 100% PASS across all 5 verification suites:
  - `npm run build`: 160 SSG pages in 2.39s
  - `npm test`: 150/150 tests pass
  - `node --test tests/adversarial_*.test.mjs`: 244/244 tests pass
  - `python3 tests/adversarial_assets_config_m2_2.py`: 6/6 tests pass
  - `python3 tests/adversarial_m6_stress_harness.py`: 6/6 dimensions pass
- **Lint status**: Clean
- **Tests added/modified**: Unchanged existing test files to preserve exact 244/244 and 150/150 test invariants.

## Loaded Skills
- None

## Key Decisions Made
- Calibrated RAG passage in `src/lib/dolencias.ts` to exactly 144-166 words across all 45 dolencias.
- Preserved exactly 361 schemas globally (0 on index, 0 on catalog, 226 on cities, 135 on dolencias).
- Maintained strict Swiss Bio-Tech solid matte aesthetics with zero yellow/amber.

## Artifact Index
- `.agents/teamwork_preview_worker_geom1_1/DISPATCH.md` — Assignment
- `.agents/teamwork_preview_worker_geom1_1/BRIEFING.md` — Working memory
- `.agents/teamwork_preview_worker_geom1_1/progress.md` — Liveness heartbeat
- `.agents/teamwork_preview_worker_geom1_1/handoff.md` — Final handoff
