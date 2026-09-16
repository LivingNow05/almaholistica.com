# Handoff Report — Specification Mining for SEO-GEO, llms.txt & Adversarial Test Safeguards

**Agent:** `teamwork_preview_spec_miner_survey_1`  
**Parent:** `teamwork_preview_orchestrator_8` (`dee5921c-c2ce-44d0-97b2-5ec780197d61`)  
**Date:** 2026-09-16T00:22:00Z  
**Working Directory:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/`  
**Handoff Type:** Hard (Task Complete)

---

## 1. Observation

Direct observations extracted from the codebase, configuration, and test suites:

1. **`ORIGINAL_REQUEST.md` (Lines 178-237, Follow-up 2026-09-16T00:16:05Z):**
   - R1 specifies sanitizing `public/llms.txt`: replace provisional WhatsApp number `+57 300 000 0000` with official number `+57 315 1206985`, and correct city URLs to canonical trailing slashes and prefix `/biodescodificacion-{ciudad}/`.
   - R2 specifies entity anchoring in `src/pages/index.astro`: first visible paragraph in Hero must state *"Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países..."* with "Alma Holística es" in first 50 characters, while strictly respecting `MR3-CH2-4.5` (zero JSON-LD in `dist/index.html`).
   - R3 specifies a canonical RAG citability block in the 45 ailment pages (`src/pages/biodescodificacion/[slug].astro`): 134-167 words (acceptance criteria: 130-170 words), direct answer in first 40-50 words (Pathology + Biological System + Root Emotional Conflict + Adaptive Meaning), subsequent 80-100 words covering phases (active stress vs repair) and bioemotional reprogramming without substituting allopathic medicine.
   - R4 specifies E-E-A-T clinical authority data integration from `src/data/dataset_almaholistica_ciudades_eeat_geo.json` (specialists, PNI, Hamer, Flèche, Lipton).
   - R5 specifies maintaining 100% test pass rate across unit (150/150), adversarial (244/244), and python harnesses.

2. **`public/llms.txt` and `dist/llms.txt` (Observed State):**
   - Line 23 to 31:
     ```markdown
     23: - [Bogotá, Colombia](https://almaholistica.com/bogota/): Terapia holística...
     24: - [Medellín, Colombia](https://almaholistica.com/medellin/): Sesiones online...
     25: - [Ciudad de México (CDMX)](https://almaholistica.com/cdmx/): Consulta virtual...
     26: - [Madrid, España](https://almaholistica.com/madrid/): Acompañamiento...
     ```
     Observed: City links omit the required `/biodescodificacion-` prefix (e.g. `/bogota/` instead of `/biodescodificacion-bogota/`).
   - Line 35:
     ```markdown
     35: - Teléfono Oficial de Coordinación: +57 300 000 0000 (vía WhatsApp API).
     ```
     Observed: Contains the obsolete provisional placeholder `+57 300 000 0000`.

3. **Invariable Constraint: Zero JSON-LD on Home Page:**
   - In `tests/adversarial_mr3_challenger_2.test.mjs` (Line 247):
     ```javascript
     test('MR3-CH2-4.5: Zero entity JSON-LD schemas injected in home page', () => {
       const jsonLdBlocks = [...distIndexHtml.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi)];
       assert.strictEqual(jsonLdBlocks.length, 0, 'Landing page dist/index.html must NOT inject entity JSON-LD schemas');
     });
     ```
   - In `tests/adversarial_mr3_challenger.test.mjs` (Line 195):
     ```javascript
     test('MR3-ADV-4.1: dist/index.html NO contiene bloques <script type="application/ld+json">', () => {
       const jsonLdBlocks = [...distIndexContent.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
       assert.strictEqual(jsonLdBlocks.length, 0, 'dist/index.html must have exactly 0 JSON-LD blocks...');
     });
     ```
   - In `tests/adversarial_m5_sitemaps_schema.py` (Lines 191-192):
     ```python
     if rel in ['index.html', os.path.join('biodescodificacion', 'index.html')]:
         assert len(matches) == 0, f"Índice {rel} no debería contener schemas de entidad"
     ```
   - In `tests/adversarial_jsonld_robots_m5_2.test.mjs` (Lines 87-91):
     ```javascript
     // 113 city pages * 2 + 45 dolencia pages * 3 = 361 schemas
     assert.equal(totalScripts, 361, 'Expected exactly 361 JSON-LD scripts across all 160 files, found ${totalScripts}');
     ```

4. **Home Page Hero Paragraph (`src/pages/index.astro`, Lines 138-140):**
   ```html
   <!-- Párrafo Quirúrgico Directo -->
   <p class="gsap-hero-el text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl mb-6 leading-relaxed">
     La biodescodificación demuestra que tu síntoma físico es la respuesta biológica de tu cuerpo ante un estrés o vivencia no resuelta. Identifica tu síntoma y descubre en una sesión privada 1 a 1 cómo desactivar la señal de alarma y recuperar tu calma.
   </p>
   ```
   Observed: Currently starts with "La biodescodificación demuestra...", missing the required entity anchoring "Alma Holística es..." in the first 50 characters.

5. **Ailment Page (`src/pages/biodescodificacion/[slug].astro`):**
   - Lines 80-84 inject exactly 3 schemas: `medicalSchema` (`MedicalWebPage`), `faqSchema` (`FAQPage`), `breadcrumbSchema` (`BreadcrumbList`).
   - Lines 97-140 contain the Header and Hero. Between Line 140 and Line 142 is the transition to `#en-palabras-simples`.
   - Observed: Currently lacks the 134-167 words canonical RAG citability block.

6. **Current Test Baseline Execution Results:**
   - `npm test`: 150/150 passed (duration ~145ms, exit code 0).
   - `node --test tests/adversarial_*.test.mjs`: 244/244 passed across 14 test files (duration ~590ms, exit code 0).
   - `python3 tests/adversarial_assets_config_m2_2.py`: 6/6 tests passed (exit code 0).
   - `python3 tests/adversarial_m6_stress_harness.py`: 6/6 dimensions passed on all 160 HTML files (exit code 0).
   - `python3 tests/adversarial_m5_sitemaps_schema.py`: 6/6 dimensions passed, 361 schemas confirmed (exit code 0).
   - `npm run build`: built 160 pages cleanly in 2.59s (exit code 0).

---

## 2. Logic Chain

1. **R1 Logic Chain:**
   - Observation 2 proves `public/llms.txt` and `dist/llms.txt` contain `+57 300 000 0000` and city URLs like `https://almaholistica.com/bogota/`.
   - Observation 1 (R1 & Acceptance Criteria) mandates `+57 315 1206985` and canonical prefixes `https://almaholistica.com/biodescodificacion-{ciudad}/`.
   - Therefore, editing `public/llms.txt` to replace the phone number and add `/biodescodificacion-` to city paths will satisfy R1. During build, Astro copies `public/llms.txt` to `dist/llms.txt`, satisfying replication.

2. **R2 Logic Chain:**
   - Observation 4 shows the current first paragraph begins with "La biodescodificación demuestra...".
   - Observation 1 (R2) mandates starting with "Alma Holística es" within 50 characters and formulating the first 200 characters as: *"Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países..."*.
   - Observation 3 strictly proves that `dist/index.html` must NOT have any `<script type="application/ld+json">`. Tests `MR3-CH2-4.5`, `MR3-ADV-4.1`, and `ADV-M5.2.2` will immediately fail if any schema is injected in `src/pages/index.astro`.
   - Therefore, the hero paragraph text can and must be updated in `src/pages/index.astro` without adding any JSON-LD script tag.

3. **R3 Logic Chain:**
   - Observation 1 (R3) requires a modular RAG citability block of 134-167 words (130-170 words in acceptance criteria) before the detailed breakdown in `src/pages/biodescodificacion/[slug].astro`.
   - Observation 5 shows the current structure: Hero ends at Line 140, before `#en-palabras-simples`.
   - The block must define: (1) Pathology + Biological System + Root Emotional Conflict + Adaptive Biological Meaning in the first 40-50 words; (2) Symptom phases (active stress vs repair/healing) + bioemotional reprogramming protocol + allopathic medical disclaimer in the next 80-100 words.
   - Observation 3 proves the 3 schemas (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`) must be preserved without adding or removing any schema block so the total schema census remains 361.

4. **R4 Logic Chain:**
   - `src/data/dataset_almaholistica_ciudades_eeat_geo.json` contains 113 city records with specialists, scientific authority (PNI, Hamer, Flèche, Lipton), and medical disclaimers.
   - Integrating this into `src/pages/[slug].astro` as visible UI components reinforces E-E-A-T.
   - Observation 3 proves city pages must maintain exactly 2 JSON-LD schemas (`HealthAndBeautyBusiness` and `BreadcrumbList`). No extra JSON-LD should be added to city pages.

5. **R5 Logic Chain:**
   - Observation 6 establishes the green test baseline: 150 unit tests, 244 adversarial tests, and python stress harnesses all pass.
   - All changes must strictly maintain CLS = 0 (explicit width/height on img/svg), zero yellow/amber colors, solid matte styling, and trailing slashes on all canonical URLs.

---

## 3. Caveats

1. **Schema Count Sensitivity:** The test suites enforce an exact integer census of 361 JSON-LD scripts across `dist/`. No agent should attempt to add JSON-LD schemas to `index.astro` or add additional schemas to `[slug].astro`.
2. **Word Count Strictness:** The RAG block has a tight range (134-167 words, acceptance tolerance 130-170). If generating dynamically via Astro template expressions, ensure string interpolation accounts for varying ailment name lengths.
3. **`tests/adversarial_cities_m1_2.py`:** This legacy test from milestone M1 checked for slugs without the `biodescodificacion-` prefix (e.g. `madrid`). It is not part of the active required test commands specified in `ORIGINAL_REQUEST.md` lines 233-236 (`npm test`, `node --test tests/adversarial_*.test.mjs`, `python3 tests/adversarial_assets_config_m2_2.py`, `python3 tests/adversarial_m6_stress_harness.py`).

---

## 4. Conclusion

All requirements for the SEO-GEO optimization milestone have been mined, analyzed against the authoritative test suites, and fully documented in `report.md`.
The implementation steps are clear, safe, and constrained by well-defined invariants:
- Update `public/llms.txt` with phone `+57 315 1206985` and city prefixes `/biodescodificacion-{ciudad}/`.
- Update the Hero copy in `src/pages/index.astro` with entity anchoring "Alma Holística es..." (0 JSON-LD scripts).
- Add the 134-167 words RAG citability block in `src/pages/biodescodificacion/[slug].astro` before `#en-palabras-simples`.
- Integrate E-E-A-T specialist and methodology UI blocks into `src/pages/[slug].astro` while preserving the 2 schemas per page.
- Build and run the complete test suite to confirm 100% pass rate.

---

## 5. Verification Method

To independently verify all findings and constraints:

1. **Verify Current Test Suite Pass Rate:**
   ```bash
   npm test
   # Expected: 150 passed, 0 failed.

   node --test tests/adversarial_*.test.mjs
   # Expected: 244 passed, 0 failed across 14 test suites.

   python3 tests/adversarial_assets_config_m2_2.py
   # Expected: VERDICT: CONFIRM_CORRECTNESS (6 passed).

   python3 tests/adversarial_m6_stress_harness.py
   # Expected: VERDICT: CONFIRM_CORRECTNESS (160 pages, 361 schemas).
   ```

2. **Verify JSON-LD Invariant on Home:**
   ```bash
   node -e 'const html = fs.readFileSync("dist/index.html", "utf8"); assert.equal((html.match(/<script\b[^>]*type=["\x27]application\/ld\+json["\x27][^>]*>/gi) || []).length, 0); console.log("OK: 0 JSON-LD in dist/index.html");'
   ```

3. **Verify Official Phone in Config:**
   ```bash
   node -e 'import("./src/config/site.ts").then(m => { assert.equal(m.SITE_CONFIG.whatsappNumber, "573151206985"); console.log("OK: 573151206985 in site.ts"); })'
   ```

4. **Verify Report Artifact:**
   Inspect `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/report.md`.
