# Handoff Report — Survey of Sitemap Generator & Test Suites for 180-Page Census Expansion

**Agent**: `teamwork_preview_explorer_survey_3`  
**Milestone**: Survey (Follow-up 2026-09-24T05:04:09Z)  
**Target Project**: Alma Holística (`almaholistica.com`)  
**Scope**: Read-only forensic analysis of `scripts/generate_sitemap.py`, `public/llms.txt`, and all test suites in `tests/` & `package.json`.

---

## 1. Observation

### 1.1 Sitemap Generator (`scripts/generate_sitemap.py`)
- **Discovery Mechanism**:
  `scripts/generate_sitemap.py` **does NOT scan `dist/`** to compile URLs. It reads datasets directly from `src/data/`:
  - Lines 27–41 (`load_city_slugs()`): Reads `src/data/dataset_almaholistica_ciudades.csv` column `URL Final (Slug)` (113 rows).
  - Lines 44–58 (`load_dolencia_slugs()`): Reads `src/data/dataset_biodescodificacion_dolencias.json` property `slug` (45 items).
  - Lines 61–86 (`build_url_list()`): Hardcodes:
    - `https://almaholistica.com/` (priority `1.0`, changefreq `daily`)
    - `https://almaholistica.com/biodescodificacion/` (priority `0.9`, changefreq `weekly`)
    - 113 city URLs: `https://almaholistica.com/{slug}/` (priority `0.8`, changefreq `weekly`)
    - 45 dolencia URLs: `https://almaholistica.com/biodescodificacion/{slug}/` (priority `0.8`, changefreq `weekly`)
  - Lines 142–145 (`main()`):
    ```python
    if total_urls != 160:
        print(f"⚠️ Advertencia: Total de URLs generadas es {total_urls}, esperado: 160.")
    else:
        print(f"✅ Total de URLs exactamente 160 (1 home + 1 catálogo + 113 ciudades + 45 dolencias).")
    ```
  - Lines 125–135 (`write_and_replicate()`): Writes `sitemap-0.xml`, `sitemap.xml`, `sitemap-index.xml`, and `robots.txt` into `public/` and copies them to `dist/` if `dist/` exists.

### 1.2 Structure of `public/llms.txt`
- **Current Listing**:
  - Lines 10–71: Lists the 45 dolencias classified into 7 biological systems with canonical markdown links (`https://almaholistica.com/biodescodificacion/{slug}/`).
  - Lines 72–94: Section `## Cobertura Geográfica de Sesiones Online (113 Ciudades en 20 Países)` lists each of the 20 approved countries on a single line:
    `- **{Nombre del País}** (Moneda: {ISO}): [{Ciudad 1}](https://almaholistica.com/biodescodificacion-{slug1}/), ...`
    Currently, country names are plain bold text (`**Colombia**`, `**México**`), **NOT hyperlinks**.
  - Line 105:
    `URLs Canónicas: Emplear siempre URLs canónicas con trailing slash: para dolencias https://almaholistica.com/biodescodificacion/{slug}/ y para ciudades https://almaholistica.com/biodescodificacion-{ciudad}/.`

### 1.3 Catalog of Test Suites and Exact Assertions Checking `160` / `361`

#### A. JavaScript / ESM Test Files (`node --test tests/*.test.mjs`)
1. **`tests/adversarial_challenger_m4.test.mjs`**:
   - Line 47: `describe('Adversarial Challenge M4.1: Censo de Rutas SSG y Generación Estática (160 Páginas)', ...)`
   - Line 48: `test('ADV-M4.1.1: dist/ contiene exactamente 160 archivos HTML generados', () => {`
   - Line 68: `assert.equal(htmlFiles.length, 160, ...)`
   - Lines 73–118: `ADV-M4.1.2: Censo exacto por categoría de página`: verifies 113 cities and 45 dolencias exist; lacks the 20 country hubs.
   - Line 403: `test('ADV-M4.6.1: Cero clases prohibidas (...) en las 160 páginas HTML', ...)`
2. **`tests/adversarial_challenger_m4_gen3.test.mjs`**:
   - Line 30: `test('GEN3-1: dist/ exists and contains exactly 160 HTML files', () => {`
   - Line 33: `assert.strictEqual(allHtml.length, 160, ...)`
   - Lines 38–54: `GEN3-2: Categorical census: 113 city pages, 45 dolencia pages, 1 catalog, 1 home`:
     ```javascript
     const cityPages = allHtml.filter((f) => {
       const rel = path.relative(DIST_DIR, f);
       return rel.startsWith('biodescodificacion-');
     });
     assert.strictEqual(cityPages.length, 113, ...);
     ```
     **Collision Risk**: `rel.startsWith('biodescodificacion-')` matches both cities (`biodescodificacion-bogota`) AND country hubs (`biodescodificacion-colombia`), yielding 133 pages.
   - Line 57: `describe('Challenger M4-Gen3: Zero Internal 404 Links Across All 160 Pages', ...)`
   - Line 60: `test('GEN3-3: Automated link scraper across all 160 HTML files detects ZERO broken internal <a> links', ...)`
3. **`tests/adversarial_challenger_m4_gen3_2.test.mjs`**:
   - Line 75: `test('ADV-GEN3.2: Universal audit across ALL 160 HTML pages for unhandled conversion CTAs', () => {`
   - Line 77: `assert.strictEqual(allHtml.length, 160, 'dist/ must contain exactly 160 generated HTML files');`
   - Line 96: `assert.ok(totalWaLinks >= 160 * 4, ...)` -> Asserts at least 640 WhatsApp links across site.
   - Line 97: `assert.ok(totalQuizTriggers >= 160 * 3, ...)` -> Asserts at least 480 quiz triggers across site.
   - Line 160: `test('ADV-GEN3.6: Exhaustive audit across ALL 160 HTML files for <img> and <svg> CLS prevention', ...)`
   - Line 219: `test('ADV-GEN3.8: 0 violations across all 160 HTML files in dist/ using mate_style_checker', ...)`
4. **`tests/adversarial_challenger_m5.test.mjs`**:
   - Line 7 & 57: `Adversarial Challenge M5.1: Mapeo Biunívoco 1:1 (160 URLs = 160 HTML)`
   - Line 61: `test('ADV-M5.1.1: public/sitemap-0.xml contiene exactamente 160 URLs únicas', () => {`
   - Line 66: `assert.equal(matches.length, 160, ...)`
   - Line 68: `assert.equal(uniqueSet.size, 160, ...)`
   - Line 71: `test('ADV-M5.1.2: public/sitemap.xml contiene las mismas 160 URLs que sitemap-0.xml', () => {`
   - Line 78: `assert.equal(urlsLegacy.length, 160);`
   - Line 82: `test('ADV-M5.1.3: dist/ contiene exactamente 160 archivos HTML generados', () => {`
   - Line 100: `assert.equal(htmlFiles.length, 160, ...)`
   - Line 148: `assert.equal(actualFiles.size, 160);`
   - Line 203: `assert.equal(urlBlocks.length, 160);` (in `ADV-M5.2.2`)
   - Line 481: `test('ADV-M5.4.1: Censo exacto de schemas en las 160 páginas generadas', () => {`
   - Lines 506–511: Assumes any page not starting with `biodescodificacion/` or `index.html` is a city page (`matches.length == 2`, `cityPagesCount++`).
   - Line 528: `assert.equal(cityPagesCount, 113)`
   - Line 529: `assert.equal(dolenciaPagesCount, 45)`
   - Line 530: `assert.equal(totalSchemas, 361, 'Deben existir exactamente 361 bloques JSON-LD en todo el sitio compilado (113*2 + 45*3)');`
5. **`tests/adversarial_jsonld_robots_m5_2.test.mjs`**:
   - Line 49: `describe('Adversarial Challenger M5-2: JSON-LD Stress-Testing across 160 dist HTML files', () => {`
   - Line 50: `test('ADV-M5.2.1: Exactly 160 production HTML files exist in dist/', () => {`
   - Line 53: `assert.equal(HTML_FILES.length, 160, ...)`
   - Line 89: `assert.equal(totalScripts, 361, 'Expected exactly 361 JSON-LD scripts across all 160 files...')`
   - Lines 96–101:
     ```javascript
     const cityFiles = HTML_FILES.filter(f => {
       const rel = path.relative(DIST_DIR, f);
       return !rel.startsWith('biodescodificacion/') && rel !== 'index.html';
     });
     assert.equal(cityFiles.length, 113, ...);
     ```
     **Collision Risk**: Country hubs match `!rel.startsWith('biodescodificacion/')`, making `cityFiles.length === 133`!
   - Line 227: `test('ADV-M5.2.6: SitemapFast 1-to-1 bijection with all 160 HTML files in dist/', () => {`
   - Line 233: `assert.equal(locMatches.length, 160, ...)`
   - Line 253: `assert.equal(expectedHtmlPaths.size, 160);`
   - Line 254: `assert.equal(actualHtmlPaths.size, 160);`
6. **`tests/adversarial_m6_final_qa.test.mjs`**:
   - Line 58: `test('M6.0.1: Exactly 160 HTML pages exist in dist/', () => {`
   - Line 59: `assert.equal(htmlFiles.length, 160, ...)`
   - Line 62: `test('M6.0.2: All 160 pages are non-empty and well-formed HTML5', () => {`
   - Line 172: `assert.ok(imgCount >= 160, ...)`
   - Line 197: `assert.ok(svgCount >= 1000, 'Expected >1000 svgs across 160 pages...')`
   - Line 206: `test('M6.3.1: All 160 pages contain WhatsApp CTAs with official phone 573151206985', () => {`
   - Line 258: `test('M6.4.2: sitemap-0.xml lists exactly 160 canonical URLs mapping 1:1 to dist/ pages', () => {`
   - Line 262: `assert.equal(urls.length, 160, ...)`
   - Line 264: `assert.equal(uniqueUrls.size, 160, ...)`
   - Line 289: `test('M6.5.1: Exactly 361 JSON-LD schemas exist across the site with 100% valid JSON', () => {`
   - Lines 303–307:
     ```javascript
     if (relPath.startsWith('biodescodificacion' + path.sep)) {
       assert.equal(scriptBlocks.length, 3, ...);
     } else {
       assert.equal(scriptBlocks.length, 2, ...);
     }
     ```
   - Lines 338–342:
     `assert.equal(totalSchemas, 361);`
     `assert.equal(typeCounts['MedicalWebPage'], 45);`
     `assert.equal(typeCounts['FAQPage'], 45);`
     `assert.equal(typeCounts['BreadcrumbList'], 158);`
     `assert.equal(typeCounts['HealthAndBeautyBusiness'], 113);`
7. **`tests/adversarial_mr3_challenger_2.test.mjs`**:
   - Line 254: `// 5. COMPILACIÓN SSG (160 PÁGINAS) Y RESOLUCIÓN DE ENLACES`
   - Line 257: `test('MR3-CH2-5.1: Exactly 160 HTML files generated in dist/', () => {`
   - Line 271: `assert.strictEqual(files.length, 160, 'dist/ must contain exactly 160 HTML files...');`

#### B. Python Test Harnesses (`python3 tests/*.py`)
1. **`tests/adversarial_m5_sitemaps_schema.py`**:
   - Line 40: `assert len(urls) == 160, f"Se esperaban 160 URLs exactas, se encontraron {len(urls)}"`
   - Line 70: `assert len(actual_html_files) == 160, f"dist/ tiene {len(actual_html_files)} HTML, esperado 160"`
   - Line 129: `assert len(urls) == 160` (validates `sitemap-0.xml` and `sitemap.xml`)
   - Line 150:
     ```python
     if loc == f"{DOMAIN}/":
         assert priority == '1.0' and changefreq == 'daily'
     elif loc == f"{DOMAIN}/biodescodificacion/":
         assert priority == '0.9' and changefreq == 'weekly'
     else:
         assert priority == '0.8' and changefreq == 'weekly'
     ```
     **Note**: Asserts priority `0.8` for all non-root/non-catalog URLs. Country Hubs must either use priority `0.8` or this assertion must allow `0.85`.
   - Lines 191–224 (`run_dimension_5_jsonld_schemas()`):
     Differentiates `rel.startswith('biodescodificacion' + os.sep)` as dolencia (3 schemas), and `else` as city (2 schemas).
     Asserts `assert city_pages == 113`, `assert dolencia_pages == 45`, `assert total_schemas == 361`.
   - Line 253–254: Print statements mentioning 160 HTML pages.
2. **`tests/adversarial_m6_stress_harness.py`**:
   - Line 51: `if len(html_files) != 160:`
   - Lines 268–275:
     ```python
     # Check all 113 cities
     city_count = 0
     for hf, data in html_cache.items():
         rp = data["rel_path"]
         if rp.count(os.sep) == 1 and not rp.startswith("biodescodificacion"):
             city_count += 1
             verify_funnel_page(rp, "city")
     ```
     **Note**: `not rp.startswith("biodescodificacion")` was an old condition when city slugs were unprefixed (`bogota/index.html`). Must be updated to audit `rp.startswith("biodescodificacion-")` separating cities and hubs.
   - Line 290: Log message mentioning 160 pages.
   - Line 334: `if len(urls) != 160:`
   - Line 339: `if len(set(urls)) != 160:`
3. **`tests/adversarial_r1_r2_challenger.py`**:
   - Line 199–200:
     ```python
     all_city_links = re.findall(r"https://almaholistica\.com/biodescodificacion-[a-z0-9-]+/?", public_text)
     check(len(all_city_links) == 113, f"Exactly 113 city links matched by regex in public/llms.txt (found {len(all_city_links)})")
     ```
     **Collision Risk**: If 20 Country Hub links formatted as `https://almaholistica.com/biodescodificacion-{pais}/` are added to `public/llms.txt`, this regex will match 113 + 20 = 133 links!
   - Line 288:
     ```python
     curr_pattern = rf"\*\*{re.escape(country)}\*\*\s*\(Moneda:\s*([A-Z]{{3}})\)"
     ```
     **Collision Risk**: If country names in `public/llms.txt` are turned into markdown links (e.g. `**[Colombia](...)**`), this regex will fail.
   - Line 390: `check(total_html_files == 160, f"Census: exactly 160 HTML pages in dist/ (found {total_html_files})")`
   - Line 391: `check(total_json_ld_scripts == 361, f"Total global JSON-LD scripts equals 361 invariant (found {total_json_ld_scripts})")`
   - Line 392: `check(city_page_schemas == 226, ...)`:
     Because line 383 does `if rel_path.startswith("biodescodificacion-"): city_page_schemas += schemas_in_page`, country hubs will be erroneously aggregated into `city_page_schemas` unless distinguished!
4. **`tests/adversarial_r3_r4_challenger.py`**:
   - Line 370: `assert len(all_html_files) == 160, f"Expected 160 HTML files, found {len(all_html_files)}"`
   - Line 402: `assert total_schemas == 361, f"Expected exactly 361 JSON-LD schemas globally, found {total_schemas}"`

#### C. Unit & Integration Tiers (`npm test`)
- Executes: `node --test tests/tier1_features.test.mjs tests/tier2_edge_cases.test.mjs tests/tier3_cross_feature.test.mjs tests/tier4_user_journeys.test.mjs`
- Current result: **150 passed, 0 failed**.
- Neither `tier1`, `tier2`, `tier3`, nor `tier4` has a hardcoded assertion requiring exactly 160 physical files. They test features with isolated mocks (e.g. 3 mock cities, 3 mock dolencias in `tier3_cross_feature.test.mjs:241`).
- Feature 20 in `tier1_features.test.mjs:934–980` verifies `scripts/generate_sitemap.py` for two-level structure, robots.txt, and canonical URLs; it does not hardcode `160`.

---

## 2. Logic Chain

1. **Census Mathematics**:
   - Currently: 1 Home (`/`) + 1 Catálogo (`/biodescodificacion/`) + 45 Dolencias (`/biodescodificacion/[slug]/`) + 113 Ciudades (`/biodescodificacion-[ciudad]/`) = **160 Pages**.
   - With 20 Country Hubs: 1 Home + 1 Catálogo + 45 Dolencias + 113 Ciudades + 20 Country Hubs (`/biodescodificacion-[pais]/`) = **180 Pages**.
   - Therefore, all static build and sitemap generation assertions must transition from 160 to 180.

2. **Sitemap Generation Logic**:
   - Because `scripts/generate_sitemap.py` compiles URLs from datasets rather than inspecting `dist/`, it must be informed of the 20 approved country slugs.
   - The 20 countries can be extracted from `src/data/dataset_almaholistica_ciudades.csv` (`APPROVED_20_COUNTRIES`) or loaded from a dedicated helper.
   - Slugs must be canonical with trailing slash (`f"{DOMAIN}/biodescodificacion-{country_slug}/"`).
   - Priority should be set to `'0.8'` (matching `tests/adversarial_m5_sitemaps_schema.py:150` hierarchy) and changefreq `'weekly'`.
   - The assertion in `scripts/generate_sitemap.py:142` must check `total_urls != 180`.

3. **Global Schema Census Derivation**:
   - Baseline (160 pages):
     - 113 city pages $\times$ 2 schemas (`HealthAndBeautyBusiness` + `BreadcrumbList`) = 226 schemas.
     - 45 dolencia pages $\times$ 3 schemas (`MedicalWebPage` + `FAQPage` + `BreadcrumbList`) = 135 schemas.
     - Home & Catalog = 0 schemas.
     - Total baseline: $226 + 135 = 361$ schemas.
   - For 20 Country Hubs (per R2 & R3):
     - Option A (2 schemas per hub: `MedicalWebPage` + `FAQPage`): $20 \times 2 = 40$ schemas $\rightarrow$ **Total: 401 schemas**.
     - Option B (3 schemas per hub: `MedicalWebPage` + `FAQPage` + `BreadcrumbList`): $20 \times 3 = 60$ schemas $\rightarrow$ **Total: 421 schemas**.
   - All tests validating the schema census (`adversarial_challenger_m5.test.mjs`, `adversarial_jsonld_robots_m5_2.test.mjs`, `adversarial_m6_final_qa.test.mjs`, `adversarial_m5_sitemaps_schema.py`, `adversarial_r1_r2_challenger.py`, `adversarial_r3_r4_challenger.py`) must be synchronized with this schema count.

4. **Routing Filter Collision Resolution**:
   - Both cities and country hubs reside in the root of `dist/` with the prefix `biodescodificacion-` (`biodescodificacion-bogota/index.html` vs `biodescodificacion-colombia/index.html`).
   - Multiple tests currently use naive checks like:
     - `rel.startsWith('biodescodificacion-')` assuming it only matches cities.
     - `!rel.startsWith('biodescodificacion/') && rel !== 'index.html'` assuming it only matches cities.
   - These tests will fail unless updated to distinguish the 20 country slugs (e.g. `['colombia', 'mexico', 'espana', 'estados-unidos', ...]`) from the 113 city slugs.

5. **`public/llms.txt` Regex Synchronization**:
   - In `tests/adversarial_r1_r2_challenger.py:199`, the regex `https://almaholistica\.com/biodescodificacion-[a-z0-9-]+/?` matches both city links and country hub links.
   - If country hub URLs are included in `public/llms.txt`, either the test expectation must be updated to 133 links, or the test must separately validate the 113 city URLs and 20 country hub URLs.
   - In `tests/adversarial_r1_r2_challenger.py:288`, the regex `\*\*([^*]+)\*\*\s*\(Moneda:\s*([A-Z]{3})\)` expects `**Country** (Moneda: CUR)`. If country names are converted to links (`**[Colombia](...)**`), this regex must be updated to permit markdown links.

---

## 3. Caveats

1. **Country Hub Schema Specification**:
   - Acceptance criterion R2 states: *"Cada Hub de País incluye al menos 3 preguntas frecuentes con Schema.org FAQPage y MedicalWebPage válidos"*.
   - Criterion R3 mentions breadcrumb hierarchies: *"Las páginas de ciudades deben contar con migas de pan semánticas jerárquicas: Inicio > [Nombre del País] > [Ciudad] con su respectivo BreadcrumbList en JSON-LD"*.
   - If Country Hubs also include a `BreadcrumbList` schema (`Inicio > [País]`), the schema count is 3 per hub (total 421). If only `FAQPage` and `MedicalWebPage` are included, the count is 2 per hub (total 401). The implementer must decide whether to inject 2 or 3 schemas per hub and update the assertions accordingly.
2. **Sitemap Priority Strictness in Python Harness**:
   - `tests/adversarial_m5_sitemaps_schema.py:145–151` strictly requires `priority == '0.8'` for all URLs that are not `/` (1.0) or `/biodescodificacion/` (0.9). If Country Hubs are assigned priority `0.85`, this harness will raise an `AssertionError` unless modified to accept `0.85`.
3. **Legacy Slug Checks in `adversarial_cities_m1_2.py`**:
   - `adversarial_cities_m1_2.py:151,157` checks `REQUIRED_SPAIN_CITIES` and `REQUIRED_USA_CITIES` against raw CSV slugs. Since GEO-M1 prefixed all CSV slugs with `biodescodificacion-`, running `adversarial_cities_m1_2.py` directly currently fails because it expects unprefixed slugs (`madrid` instead of `biodescodificacion-madrid`). The implementer should be aware of this pre-existing condition.
4. **Read-Only Investigation Integrity**:
   - In accordance with explorer subagent constraints, no project code, tests, or configurations outside `.agents/teamwork_preview_explorer_survey_3/` were altered.

---

## 4. Conclusion

The transition from a 160-page census to a 180-page census requires exact updates across **1 script** and **8 test files** (comprising 4 JavaScript adversarial test files and 4 Python adversarial test files). The core `npm test` suite (150 tests) does not hardcode `160` and will pass natively without modifications.

### Blueprint for Implementers:

| File | Target Lines | Current Code / Assertion | Required Update for 180 Pages |
|---|---|---|---|
| `scripts/generate_sitemap.py` | 61–86, 142–145 | 160 URLs (1 home + 1 catálogo + 113 ciudades + 45 dolencias) | Add 20 country hub URLs (`/biodescodificacion-{pais}/`, priority 0.8, weekly). Update line 142 `total_urls != 180`. |
| `public/llms.txt` | 72–95, 105 | Bold country names `**Colombia**` without links; directive lists dolencias and cities | Add links for the 20 Country Hubs (e.g. `[Colombia](https://almaholistica.com/biodescodificacion-colombia/)`); update line 105 to mention hubs. |
| `tests/adversarial_challenger_m4.test.mjs` | 47, 48, 68, 73–118, 403 | `assert.equal(htmlFiles.length, 160)` | Change to `180`. Add loop asserting existence and size (>2000B) for 20 country hub HTML files. Update test titles to 180. |
| `tests/adversarial_challenger_m4_gen3.test.mjs` | 30, 33, 38–54, 57, 60 | `assert.strictEqual(allHtml.length, 160)` & filter collision on `biodescodificacion-` | Change to `180`. Split filter: assert 113 city pages AND 20 country hub pages separately. |
| `tests/adversarial_challenger_m4_gen3_2.test.mjs` | 75, 77, 96, 97, 160, 219 | `assert.strictEqual(allHtml.length, 160)` & `totalWaLinks >= 160 * 4` | Change to `180`. Update WA links to `180 * 4` (720) and quiz triggers to `180 * 3` (540). Update test titles to 180. |
| `tests/adversarial_challenger_m5.test.mjs` | 57, 66, 68, 78, 82, 100, 148, 203, 481, 528–530 | 160 URLs, 160 HTML files, 361 schemas | Change all 160 assertions to `180`. In `ADV-M5.4.1`, add branch for country hubs; assert 113 cities, 20 hubs, 45 dolencias, and total schemas (401 or 421). |
| `tests/adversarial_jsonld_robots_m5_2.test.mjs` | 49, 50, 53, 89, 96–101, 227, 233, 253, 254 | `assert.equal(HTML_FILES.length, 160)` & 361 schemas & city filter collision | Change all 160 assertions to `180`. Change schema total to 401 (or 421). Filter out 20 country hubs from `cityFiles` (assert 113). Add assertion for 20 country hubs. |
| `tests/adversarial_m6_final_qa.test.mjs` | 58, 59, 172, 206, 258, 262, 264, 289, 303–343 | 160 HTML files, 160 URLs, 361 schemas | Change all 160 assertions to `180`. Add country hub schema handling in `M6.5.1`; update type counts (`MedicalWebPage`: 65, `FAQPage`: 65, total 401 or 421). |
| `tests/adversarial_mr3_challenger_2.test.mjs` | 254, 257, 271 | `assert.strictEqual(files.length, 160)` | Change to `180`. Update section header and test name to 180. |
| `tests/adversarial_m5_sitemaps_schema.py` | 40, 70, 129, 191–224 | `assert len(urls) == 160`, `actual_html_files == 160`, `total_schemas == 361` | Change 160 assertions to `180`. In `run_dimension_5_jsonld_schemas()`, add branch for country hubs; assert 113 cities, 20 hubs, 45 dolencias, and total schemas (401 or 421). |
| `tests/adversarial_m6_stress_harness.py` | 51, 207–208, 268–284, 334, 339 | `if len(html_files) != 160`, `len(urls) != 160` | Change 160 checks to `180`. Update city/hub funnel verification loops. |
| `tests/adversarial_r1_r2_challenger.py` | 199–200, 288, 390, 391, 392 | `all_city_links == 113`, `total_html_files == 160`, `total_json_ld_scripts == 361` | In llms.txt check: allow 133 links or separate 113 cities and 20 hubs; allow markdown links in country regex; update HTML census to 180; separate hubs from cities in schema census. |
| `tests/adversarial_r3_r4_challenger.py` | 370, 402 | `assert len(all_html_files) == 160`, `total_schemas == 361` | Change to `180` HTML files and 401 (or 421) schemas. |

---

## 5. Verification Method

To independently verify all findings and test suite behavior:

1. **Verify Unit & Integration Suites (`npm test`)**:
   ```bash
   npm test
   ```
   *Expected*: Passes 150/150 tests with 0 failures (confirming no breaking changes in tier suites).

2. **Verify Node Adversarial Test Harnesses**:
   ```bash
   node --test tests/adversarial_*.test.mjs
   ```
   *Baseline (pre-180)*: Passes 402 tests.  
   *Post-180*: After applying the blueprint changes and running `npm run build` with 180 pages, running this command must pass with 0 failures.

3. **Verify Python Adversarial Test Harnesses**:
   ```bash
   python3 tests/adversarial_assets_config_m2_2.py
   python3 tests/adversarial_m5_sitemaps_schema.py
   python3 tests/adversarial_m6_stress_harness.py
   python3 tests/adversarial_r1_r2_challenger.py
   python3 tests/adversarial_r3_r4_challenger.py
   ```
   *Post-180*: Every harness must terminate with code 0 (`VERDICT: CONFIRM_CORRECTNESS` or `VERDICT: APPROVE`).

4. **Verify Sitemap Generation**:
   ```bash
   python3 scripts/generate_sitemap.py
   ```
   *Validation*: Check that `public/sitemap-0.xml` and `dist/sitemap-0.xml` contain exactly 180 `<loc>` tags and 0 duplicates:
   ```bash
   python3 -c "import xml.etree.ElementTree as ET; tree=ET.parse('public/sitemap-0.xml'); locs=tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'); print(len(locs), len(set(l.text for l in locs)))"
   ```
   *Expected*: Output `180 180`.

5. **Invalidation Conditions**:
   - If `dist/` contains any number of HTML files other than 180.
   - If `sitemap-0.xml` has duplicate URLs or missing trailing slashes.
   - If Country Hub pages are missing from `sitemap-0.xml` or lack either `MedicalWebPage` or `FAQPage` schemas.
   - If tests fail to distinguish `biodescodificacion-{ciudad}` from `biodescodificacion-{pais}`.
