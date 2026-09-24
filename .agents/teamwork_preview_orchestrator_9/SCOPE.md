# Scope: 20 Country Hubs & Silo Linking (180 Static Pages)

## Architecture & Design Standard
- **Framework & Core**: Astro 5 (SSG Static Site Generation, `output: 'static'`, `trailingSlash: 'always'`) + Tailwind CSS + React 19 / TypeScript + GSAP.
- **Design Aesthetic**: Swiss Bio-Tech Solid Matte.
  - Fondo Abisal: `#060A1A`.
  - Superficies y Tarjetas Editoriales: `#060A1A`, `#0A1226` y `#0E172F` con esquinas amplias `rounded-[2.5rem]`, padding generoso, bordes `#1E293B`.
  - Luz de Acento: `#38BDF8` (Cyan suave).
  - Prohibición Absoluta: Cero `backdrop-blur`, cero `bg-opacity-*`, cero resplandores neón, cero amarillo/dorado (`#F59E0B`, `#D4AF37`).
- **Data Architecture**:
  - `src/data/dataset_almaholistica_paises.json`: 20 países con moneda ISO, huso horario, pasarelas de pago locales, marco regulatorio sanitario YMYL, descargo ético, definición clínica, especialista asignado y 3 FAQs localizadas.
  - `src/lib/countries.ts`: Módulo lector (`getCountries`, `getCountryBySlug`, `getCountryByName`, `getCountrySlugs`).
  - `src/data/dataset_almaholistica_ciudades.csv`: 113 ciudades. Slug de Ciudad de Panamá ajustado a `biodescodificacion-ciudad-de-panama` para evitar colisión con el hub de país `biodescodificacion-panama`.
  - `src/data/dataset_almaholistica_ciudades_eeat_geo.json`: 113 registros de ciudades con E-E-A-T.
- **SSG Routing in Astro**:
  - `src/pages/[slug].astro`: Genera 113 rutas de ciudades (`type: 'city'`) y 20 rutas de hubs de países (`type: 'country'`).
  - Total de rutas dinámicas en `[slug].astro`: 133.
  - Renderizado condicional o delegación en `<CountryHubView country={country} />` y `<CityView city={city} />`.
- **Pyramid Silo Internal Linking**:
  - Home (`src/pages/index.astro`):
    - Bloque de Cobertura Internacional / Silos de País con 20 tarjetas hacia `/biodescodificacion-{pais}/`.
    - En el directorio `#full-cities-list`, cada encabezado `<h4>` se convierte en enlace a `/biodescodificacion-{countrySlug}/`.
    - CERO scripts `application/ld+json` en la Home (MR3-CH2-4.5).
  - Country Hubs (`/biodescodificacion-{pais}/`):
    - Enlazan a todas las ciudades pertenecientes al país según el dataset.
    - Breadcrumbs: `Inicio > Biodescodificación en {País}`.
  - Ciudades (`src/pages/[slug].astro`):
    - Breadcrumbs visuales y Schema `BreadcrumbList`: `Inicio` (`/`) > `{Nombre del País}` (`/biodescodificacion-{countrySlug}/`) > `{Nombre de la Ciudad}` (`canonicalUrl`).
- **Schema.org Invariants (421 Schemas Globales)**:
  - 113 Ciudades $\times$ 2 schemas (`HealthAndBeautyBusiness`, `BreadcrumbList`) = 226
  - 45 Dolencias $\times$ 3 schemas (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`) = 135
  - 20 Country Hubs $\times$ 3 schemas (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`) = 60
  - Home y Catálogo = 0 schemas.
  - Total exacto = 421 schemas JSON-LD.
- **Sitemaps & Testing Census (180 Páginas)**:
  - `scripts/generate_sitemap.py`: incorpora los 20 URLs de hubs de país con prioridad 0.8 y periodicidad weekly. Genera 180 URLs únicas coincidentes con `dist/`.
  - `public/llms.txt`: enlaces canónicos para los 20 hubs de país.
  - Suites de pruebas: actualización de aserciones de 160 a 180 páginas HTML, 421 schemas y prevención de colisiones en filtros `biodescodificacion-`.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | R1: Rutas Dinámicas SSG para 20 Hubs de País | Crear `src/data/dataset_almaholistica_paises.json`, `src/lib/countries.ts`, unificar en `src/pages/[slug].astro` con `trailingSlash: 'always'`, resolver slug de Panamá a `biodescodificacion-ciudad-de-panama` | M1 | ORIGINAL_REQUEST §R1 |
| 2 | R2: Diseño Swiss Bio-Tech y Contenido E-E-A-T | 7 secciones en Country Hubs (Hero, Enfoque Clínico, Especialista Senior E-E-A-T, Datos Operativos/Pagos, Retícula de Ciudades, Acordeón FAQ, Descargo Ético/CTA). Esquemas `MedicalWebPage`, `FAQPage`, `BreadcrumbList` | M1 | ORIGINAL_REQUEST §R2 |
| 3 | R3: Arquitectura Silo Piramidal y Breadcrumbs | Home enlaza a 20 hubs (sección destacada + encabezados de países linkificados). Hubs enlazan a todas sus ciudades. Ciudades con breadcrumbs jerárquicos `Inicio > País > Ciudad` en HTML y `BreadcrumbList` | M1 | ORIGINAL_REQUEST §R3 |
| 4 | R4: Sitemaps, llms.txt y Sincronización de Suites de Pruebas | Actualizar `scripts/generate_sitemap.py` a 180 URLs, `public/llms.txt`, y actualizar las aserciones de censo (180 páginas, 421 schemas) en los 8 archivos de test adversariales (`.test.mjs` y `.py`) | M2 | ORIGINAL_REQUEST §R4 |
| 5 | R5: Verificación Multi-Agente y Forensic Audit | Ejecución de build (`npm run build`), verificación 180 HTMLs, 150/150 `npm test`, suites adversariales, cero CLS, estilo sólido mate, verificación forense anti-trampas | M3 | System Prompt & AC |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M0 | Survey & Specification Mining | Levantamiento técnico con 3 Exploradores (rutas/datasets, UI/schemas, sitemaps/tests) | none | DONE |
| M1 | Country Hubs SSG Routes, Datasets, Swiss Bio-Tech Design & Silo Linking (R1, R2, R3) | `dataset_almaholistica_paises.json`, `src/lib/countries.ts`, `src/pages/[slug].astro`, `src/components/country/CountryHubView.astro`, `src/lib/schema.ts`, Panamá slug adjustment, Home links | M0 | DONE |
| M2 | Sitemap Generator, llms.txt & Test Census Synchronization (R4) | `scripts/generate_sitemap.py` (180 URLs), `public/llms.txt`, actualizar aserciones a 180 páginas / 421 schemas en suites `.test.mjs` y `.py` | M1 | DONE |
| M3 | Gate Verification: Reviewers, Challengers & Forensic Audit | 2 Reviewers (APPROVE), 2 Challengers (APPROVE), 1 Forensic Auditor (CLEAN), build & test pass | M2 | DONE |
