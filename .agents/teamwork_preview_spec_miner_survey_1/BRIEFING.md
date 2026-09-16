# BRIEFING — 2026-09-16T00:17:37Z

## Mission
Investigate the authoritative specification sources (ORIGINAL_REQUEST.md follow-up 2026-09-16T00:16:05Z, tests/, package.json, adversarial test suites) to extract and document all feature requirements, constraints, test assertions, and edge cases for SEO-GEO optimizations, llms.txt, phone numbers, trailing slashes, index.html JSON-LD restrictions (MR3-CH2-4.5), RAG citability blocks, and E-E-A-T data.

## 🔒 My Identity
- Archetype: teamwork_preview_spec_miner
- Roles: specification_miner, requirements_analyst
- Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/
- Original parent: f77d1a94-c021-4fed-9bbe-9a2cc5b5d8bc
- Milestone: Survey & Scope Specification
- Current Milestone: SEO-GEO Specification Mining (Follow-up 2026-09-16T00:16:05Z)

## 🔒 Key Constraints
- Read-only on implementation: do NOT implement code or create application files; focus on exhaustive specification mining and documentation.
- Authoritative sources: ORIGINAL_REQUEST.md, DISPATCH.md, dataset_fluffy_stories.csv, official SVG assets.
- Language: Spanish for all communications and documentation.
- Design: Strict solid matte (#060A1A, #0A1226, #0E172F, #1E293B, #38BDF8, #D4AF37), ZERO glassmorphism, ZERO neon/glow.
- Write only to own directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/
- Authoritative test suites must be inspected for exact assertions and edge cases.

## Current Parent
- Conversation ID: dee5921c-c2ce-44d0-97b2-5ec780197d61 (teamwork_preview_orchestrator_8)
- Updated: 2026-09-16T00:17:37Z

## Task Summary
- **What to build**: Specification report (`report.md`) and handoff report (`handoff.md`) covering the follow-up requirements (2026-09-16T00:16:05Z) and existing test suite expectations.
- **Key focus areas**:
  1. `public/llms.txt` and `dist/llms.txt`: phone number replacement (+57 315 1206985 vs +57 300 000 0000), city URLs with trailing slash (`/biodescodificacion-{ciudad}/`).
  2. First paragraph of `src/pages/index.astro`: entity anchoring within first 50 chars / 200 chars ("Alma Holística es...").
  3. `dist/index.html` JSON-LD restriction: MR3-CH2-4.5 forbids `<script type="application/ld+json">` on index.html.
  4. RAG citability blocks on 45 ailment pages (`src/pages/biodescodificacion/[slug].astro`): 134-167 words (or 130-170 words), structure, direct answer in first 40-50 words.
  5. E-E-A-T clinical authority data (`src/data/dataset_almaholistica_ciudades_eeat_geo.json`).
  6. Existing test expectations in `tests/`, `package.json`, adversarial tests (`tests/adversarial_*.test.mjs`, `tests/adversarial_assets_config_m2_2.py`, `tests/adversarial_m6_stress_harness.py`).
- **Success criteria**: Exhaustive report.md and handoff.md containing Features Discovered table, Edge Cases table, exact assertion constraints, and verification steps.
- **Interface contracts**: ORIGINAL_REQUEST.md & DISPATCH.md.
- **Code layout**: Read-only investigation across `src/`, `tests/`, `public/`, `dist/`, `package.json`.

## Key Decisions Made
- Fully probe all test files in `tests/` using ripgrep and file viewing to find exact regexes and assertions.
- Check build and test commands in package.json.

## Artifact Index
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/report.md — Comprehensive specification report
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/handoff.md — 5-component handoff report
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/progress.md — Liveness heartbeat

