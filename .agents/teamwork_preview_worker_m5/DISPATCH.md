## 2026-09-06T16:36:08Z
You are teamwork_preview_worker_m5.
Your dedicated working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m5/
Workspace root: /Users/anthony/Downloads/almaholistica.com/

MANDATORY FIRST STEP:
Read these files:
1. /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
2. /Users/anthony/Downloads/almaholistica.com/PROJECT.md
3. /Users/anthony/Downloads/almaholistica.com/TEST_READY.md
4. /Users/anthony/.gemini/config/skills/sitemapfast/SKILL.md
5. /Users/anthony/Downloads/almaholistica.com/tests/tier1_features.test.mjs (specifically Features 18, 19, 20, 21)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Write Ownership:
You own exclusively:
- `src/lib/schema.ts` (create)
- `scripts/generate_sitemap.py` (create)
- `public/sitemap-index.xml`, `public/sitemap-0.xml`, `public/sitemap.xml`, `public/robots.txt` (create / generate)
- `PROJECT.md` (update milestone table status for M4 and M5)
- You may also refactor `src/pages/[slug].astro` and `src/pages/biodescodificacion/[slug].astro` to import from `src/lib/schema.ts` if beneficial, keeping 0 regressions.

Requirements:
1. `src/lib/schema.ts`:
   - Pure generator functions:
     - `buildMedicalWebPageSchema(dolencia: DolenciaData, canonicalUrl: string): object`
       - Must include `@context`: 'https://schema.org', `@type`: 'MedicalWebPage', name, url, description (conflictoEmocional), about: MedicalCondition with associatedPathophysiology (sentidoBiologico), possibleTreatment: MedicalTherapy ('Biodescodificación y Reprogramación Bioemocional').
     - `buildFAQSchema(faqs: FAQItem[]): object | null`
       - If `!faqs || faqs.length === 0`, return `null`.
       - Generates `@context`: 'https://schema.org', `@type`: 'FAQPage', mainEntity: Question and Answer objects.
     - `buildBreadcrumbSchema(items: { name: string; url: string }[]): object`
       - Generates `@context`: 'https://schema.org', `@type`: 'BreadcrumbList', itemListElement with ListItem hierarchy.
     - `buildLocalServiceSchema(city: CityData, canonicalUrl: string): object`
       - Generates `@context`: 'https://schema.org', `@type`: 'HealthAndBeautyBusiness' (also satisfying LocalBusiness/priceRange), name, url, priceRange, currenciesAccepted, address, telephone, areaServed: City.
   - Clean, typed, valid JSON serializable without circular references.
   - Satisfies T1.18.1 through T1.18.5 in `tests/tier1_features.test.mjs`.

2. `scripts/generate_sitemap.py`:
   - Follow the 4 pillars of the SitemapFast architecture (see `/Users/anthony/.gemini/config/skills/sitemapfast/SKILL.md`).
   - Domain: `https://almaholistica.com`
   - Dynamic loading: read `src/data/dataset_almaholistica_ciudades.csv` (113 cities) and `src/data/dataset_biodescodificacion_dolencias.json` (45 dolencias).
   - Generate exact URLs (all with trailing slash as per `astro.config.mjs` trailingSlash: 'always'):
     - `https://almaholistica.com/` (priority 1.0, changefreq daily)
     - `https://almaholistica.com/biodescodificacion/` (priority 0.9, changefreq weekly)
     - `https://almaholistica.com/{slug}/` (for 113 cities, priority 0.8, changefreq weekly)
     - `https://almaholistica.com/biodescodificacion/{slug}/` (for 45 dolencias, priority 0.8, changefreq weekly)
     - Total: exactly 160 URLs.
   - Generate:
     - `public/sitemap-0.xml` and `public/sitemap.xml` with standard `<urlset>`
     - `public/sitemap-index.xml` with standard `<sitemapindex>` pointing to `https://almaholistica.com/sitemap-0.xml`
     - `public/robots.txt` with:
       ```
       User-agent: *
       Allow: /

       Sitemap: https://almaholistica.com/sitemap-index.xml
       Sitemap: https://almaholistica.com/sitemap.xml
       ```
     - Replicate all these generated files into `dist/` if `dist/` exists!
   - Satisfies T1.20.1 through T1.20.5 and T3.4.1, T3.4.2, T3.4.3.

3. Update `PROJECT.md`:
   - Set M4 Status -> DONE
   - Set M5 Status -> DONE (upon successful implementation)

4. Verification & Testing:
   - Run `python3 scripts/generate_sitemap.py`
   - Run `npx astro check`
   - Run `npm run build`
   - Run `node --test tests/*.test.mjs` (All tests must pass! Notice the 9 skipped tests in tier1 should now PASS!)
