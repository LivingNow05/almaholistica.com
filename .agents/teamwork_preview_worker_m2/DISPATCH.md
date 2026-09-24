## 2026-09-24T05:28:07Z

You are teamwork_preview_worker_m2, the Sitemaps & Testing Specialist for Milestone M2 of Alma Holística.
Your working directory is: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m2/
You must read ORIGINAL_REQUEST.md at: /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (specifically the section "## Follow-up — 2026-09-24T05:04:09Z").
Also read the scope document: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_orchestrator_9/SCOPE.md.
Also read the detailed Explorer 3 report:
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_3/handoff.md
And Worker M1's handoff:
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m1/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

EXCLUSIVELY OWNED FILES FOR THIS MILESTONE:
- scripts/generate_sitemap.py
- public/llms.txt
- tests/adversarial_challenger_m4.test.mjs
- tests/adversarial_challenger_m4_gen3.test.mjs
- tests/adversarial_challenger_m4_gen3_2.test.mjs
- tests/adversarial_challenger_m5.test.mjs
- tests/adversarial_jsonld_robots_m5_2.test.mjs
- tests/adversarial_m6_final_qa.test.mjs
- tests/adversarial_mr3_challenger_2.test.mjs
- tests/adversarial_m5_sitemaps_schema.py
- tests/adversarial_m6_stress_harness.py
- tests/adversarial_r1_r2_challenger.py
- tests/adversarial_r3_r4_challenger.py

YOUR TASKS:
1. Update `scripts/generate_sitemap.py`:
   - Load the 20 approved country slugs (e.g. from `src/data/dataset_almaholistica_paises.json` or approved countries array).
   - Add all 20 Country Hub URLs (`https://almaholistica.com/biodescodificacion-{pais}/`, priority `'0.8'`, changefreq `'weekly'`).
   - Update total_urls check from 160 to 180.
   - Execute `python3 scripts/generate_sitemap.py` and ensure `public/sitemap-0.xml`, `public/sitemap.xml`, `public/sitemap-index.xml`, and `public/robots.txt` are created with 180 URLs.

2. Update `public/llms.txt`:
   - Incorporate the 20 Country Hub links in section `## Cobertura Geográfica de Sesiones Online (113 Ciudades en 20 Países)` (e.g., `**[Colombia](https://almaholistica.com/biodescodificacion-colombia/)**` or structured line) and update line 105 to mention Country Hubs. Keep compatibility with `tests/adversarial_r1_r2_challenger.py`.

3. Synchronize All 8 Adversarial Test Files (as meticulously detailed in Explorer 3's handoff.md):
   - In all files, update 160 -> 180 HTML files / URLs.
   - Update total schema census from 361 -> 421 schemas:
     (113 cities * 2 = 226) + (45 dolencias * 3 = 135) + (20 country hubs * 3 = 60) = 421 schemas.
     Type breakdown: `MedicalWebPage`: 65 (45 dolencias + 20 hubs), `FAQPage`: 65 (45 dolencias + 20 hubs), `BreadcrumbList`: 178 (113 cities + 45 dolencias + 20 hubs), `HealthAndBeautyBusiness`: 113 (cities).
   - Fix Filter Collisions on `biodescodificacion-`:
     Whenever tests filter city pages using `rel.startsWith('biodescodificacion-')` or `!rel.startsWith('biodescodificacion/')`, differentiate the 20 country hub slugs (or check against the cities dataset) so that 113 cities and 20 country hubs are counted accurately without colliding into 133!
   - In `tests/adversarial_jsonld_robots_m5_2.test.mjs`:
     Update breadcrumb expectation for cities to `Inicio > [País] > [Ciudad]` (item 2 is country name and link to country hub).
   - In `tests/adversarial_challenger_m4_gen3_2.test.mjs`:
     Update `totalWaLinks >= 180 * 4` and `totalQuizTriggers >= 180 * 3`.
   - In `tests/adversarial_m5_sitemaps_schema.py`:
     Update URLs/HTML check to 180, schemas check to 421, and add country hubs branch in dimension 5.
   - In `tests/adversarial_m6_stress_harness.py`:
     Update HTML and URL count checks from 160 to 180.
   - In `tests/adversarial_r1_r2_challenger.py`:
     Update llms.txt regex checks, HTML census check to 180, and schema checks to 421.
   - In `tests/adversarial_r3_r4_challenger.py`:
     Update HTML count to 180 and schemas to 421.

4. Build and Full Test Suite Execution:
   - Run `python3 scripts/generate_sitemap.py`.
   - Run `npm run build` (ensuring 180 pages built and sitemaps copied into `dist/`).
   - Run `npm test` -> must pass 150/150 with 0 failures!
   - Run `node --test tests/adversarial_*.test.mjs` -> all must pass with 0 failures!
   - Run Python test harnesses:
     - `python3 tests/adversarial_assets_config_m2_2.py`
     - `python3 tests/adversarial_m5_sitemaps_schema.py`
     - `python3 tests/adversarial_m6_stress_harness.py`
     - `python3 tests/adversarial_r1_r2_challenger.py`
     - `python3 tests/adversarial_r3_r4_challenger.py`
     All must pass with 0 failures!

Write your handoff report to:
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m2/handoff.md
Report back via send_message when done.
