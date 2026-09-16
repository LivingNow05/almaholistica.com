# Project: Alma Holística Programmatic SEO & Conversion Platform

## Architecture & Design Standard
- **Framework & Core**: Astro 5 (SSG Static Site Generation, `output: 'static'`) + Tailwind CSS + React 19 / TypeScript + GSAP (GreenSock).
- **Design Aesthetic**: Contemporary Minimalist Editorial (Inspiración Talora Wellness Group) / Swiss Bio-Tech Solid Matte.
  - Fondo Abisal Principal: `#060A1A` (Lienzo sereno, mate, ultra-limpio).
  - Superficies y Tarjetas Editoriales: `#060A1A`, `#0A1226` y `#0E172F` con esquinas amplias `rounded-[2.5rem]`, padding generoso (`p-10 lg:p-14`) y bordes ultra-finos (`border border-slate-800/40`).
  - Luz de Acento Única: `#38BDF8` (Cyan suave para líneas de 1px, badges de estado y micro-detalles).
  - Botones de Acción de Alta Gama en Píldora: Blanco puro `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`.
  - Botones Secundarios: Enlace minimalista con flecha interactiva (`group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8]`).
  - Erradicación Total de Amarillo/Dorado: Cero rastros de `#F59E0B`, `#D4AF37` en CSS, componentes, páginas y SVGs vectoriales.
  - Tipografía Editorial Serena: Títulos principales en Serif elegante (*Cormorant Garamond* prioritario y *Cinzel* refinado) a gran escala. Párrafos en sans-serif (*Inter* / *Plus Jakarta Sans*), peso light (`font-light`), interlineado aireado.
  - Animaciones GSAP Profesionales: Hero entrance escalonado (`power3.out`), indicador de scroll vertical de 1px, floating aura, garantía estricta de `CLS = 0` y `prefers-reduced-motion`.
- **Data Architecture**:
  - `src/data/dataset_almaholistica_ciudades.csv`: 113 ciudades en 20 países (18 Latam + España + EE.UU. hispanos).
  - `src/data/dataset_biodescodificacion_dolencias.json`: 45 patologías completas con sentido biológico, conflicto emocional, reprogramación, preguntas de reflexión y FAQs.
  - `src/data/dataset_almaholistica_ciudades_eeat_geo.json`: 113 registros de ciudades con especialistas certificados, aval metodológico (PNI, Hamer, Flèche, Lipton) y casos clínicos locales.
- **Conversion Funnel**:
  - WhatsApp Quiz Modal interactivo (`src/components/react/WhatsAppQuizModal.tsx`) adaptado con contenedor `rounded-[2.5rem]`, botones píldora blancos y cero amarillo.
  - Enrutamiento oficial a WhatsApp (`https://wa.me/573151206985?text=...`) con mensaje estructurado.
- **SEO, GEO & Schema.org**:
  - Total Schema Invariant: Exactamente 361 esquemas JSON-LD (113 ciudades x 2 + 45 dolencias x 3 + 0 en Home y catálogo).
  - Restricción Adversarial `MR3-CH2-4.5`: Cero scripts `application/ld+json` en `dist/index.html`.
  - Arquitectura SitemapFast con script `scripts/generate_sitemap.py`.
  - `public/llms.txt` sincronizado para AI Crawlers (teléfono oficial `+57 315 1206985`, URLs canónicas `/biodescodificacion-{slug}/`, 45 dolencias y 20 países).

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | R1: Sanitización public/llms.txt | Actualizar teléfono oficial `+57 315 1206985`, corregir URLs de ciudades con `/biodescodificacion-{ciudad}/` y trailing slash, sincronizar catálogo completo de 45 dolencias y 20 países con monedas | GEO-M1 | ORIGINAL_REQUEST §R1 |
| 2 | R2: Anclaje de Entidad en Home | Reformular primer párrafo visible del Hero en `src/pages/index.astro` ("Alma Holística es una plataforma clínica..."), mantener GSAP y Swiss Bio-Tech, respetar 0 JSON-LD en `dist/index.html` (MR3-CH2-4.5) | GEO-M1 | ORIGINAL_REQUEST §R2 |
| 3 | R3: Bloque Canónico RAG en Dolencias | Bloque modular de 134-167 palabras en `src/pages/biodescodificacion/[slug].astro` post-Hero, definición directa primeras 40-50 palabras, fases y protocolo en siguientes 80-100 palabras | GEO-M1 | ORIGINAL_REQUEST §R3 |
| 4 | R4: Visibilidad E-E-A-T Clínico | Integrar especialistas clínicos (Lic. Sofía Alarcón, Dr. Mateo Benavides, Dra. Elena Monsalve) y aval metodológico (PNI, Hamer, Flèche, Lipton) de `dataset_almaholistica_ciudades_eeat_geo.json` en páginas de ciudad y home sin alterar schemas | GEO-M1 | ORIGINAL_REQUEST §R4 |
| 5 | R5: Blindaje Técnico y Cero Regresiones | 150/150 npm test, 244/244 adversarial tests, suites Python M2.2 y M6, 160 páginas SSG limpias en npm run build, CLS = 0 | GEO-M1 | ORIGINAL_REQUEST §R5 |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| GEO-M0 | Survey & Specification Mining | Levantamiento técnico exhaustivo de R1-R5, pruebas y restricciones adversariales | none | DONE |
| GEO-M1 | Implementation of SEO-GEO Optimizations (R1 - R4) | `public/llms.txt`, `src/pages/index.astro`, `src/lib/dolencias.ts`, `src/pages/biodescodificacion/[slug].astro`, `src/pages/[slug].astro` | GEO-M0 | DONE |
| GEO-M2 | Multi-Agent Review, Challenger & Forensic Audit (R5) | Reviewers (2), Challengers (2), Forensic Auditor, Gate Evaluation | GEO-M1 | DONE |

---

## Interface Contracts

### llms.txt ↔ AI Crawlers
- **Teléfono**: `+57 315 1206985` (vía WhatsApp API).
- **Formato URLs de ciudades**: `https://almaholistica.com/biodescodificacion-{slug}/` (ej: `https://almaholistica.com/biodescodificacion-bogota/`).
- **Catálogo**: 45 dolencias mapeadas a sus URLs `/biodescodificacion/{slug}/`.
- **Cobertura**: 20 países con monedas locales oficiales.

### Home Entity Anchoring ↔ Schema Invariant
- **`src/pages/index.astro`**:
  - Primer párrafo visible del Hero contiene `"Alma Holística es"` en los primeros 50 caracteres (índice 0, caracteres 1-17).
  - CERO scripts `type="application/ld+json"` en `dist/index.html` (MR3-CH2-4.5 / MR3-ADV-4.1).

### Dolencias ↔ Bloque RAG
- **`src/lib/dolencias.ts` & `src/pages/biodescodificacion/[slug].astro`**:
  - `generateRagCitationBlock(dolencia: DolenciaData)` / `getDolenciaRagBlock(dolencia: DolenciaData)`
  - Total palabras: entre 134 y 167 palabras (tolerancia 130-170; empírico 144-166 palabras).
  - Parte 1: 40-50 palabras (Patología + Sistema Biológico + Conflicto Emocional Raíz + Sentido Biológico Adaptativo).
  - Parte 2: 80-100 palabras (Fase activa vs vagotonía/reparación + protocolo de reprogramación bioemocional 1 a 1 de Alma Holística + no sustitución alopática).
  - Ubicación: inmediatamente posterior al Hero (`<header>`) y antes del desglose detallado (`#conflicto` / `#en-palabras-simples`).
  - Preservación exacta de 3 esquemas JSON-LD (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`).

### Ciudades & Home ↔ E-E-A-T
- **`src/data/dataset_almaholistica_ciudades_eeat_geo.json`**:
  - Mapeo slug: `slug.replace(/^biodescodificacion-/, '')` resuelve 100% (113/113).
  - Ficha especialista con nombre, matrícula/registro, experiencia local, aval metodológico PNI/Hamer/Flèche/Lipton y descargo ético.
  - Exactamente 2 esquemas JSON-LD por página de ciudad (`HealthAndBeautyBusiness` + `BreadcrumbList`).

---

## Code Layout
```
almaholistica.com/
├── public/
│   ├── llms.txt                              # Sincronizado: +57 315 1206985, /biodescodificacion-{slug}/, 45 dolencias, 20 países
│   ├── robots.txt
│   ├── sitemap-index.xml
│   ├── sitemap-0.xml
│   └── sitemap.xml
├── src/
│   ├── config/
│   │   └── site.ts                           # SITE_CONFIG.whatsappNumber = '573151206985'
│   ├── data/
│   │   ├── dataset_almaholistica_ciudades.csv           # 113 ciudades
│   │   ├── dataset_almaholistica_ciudades_eeat_geo.json # 113 ciudades con E-E-A-T
│   │   └── dataset_biodescodificacion_dolencias.json    # 45 dolencias
│   ├── lib/
│   │   ├── cities.ts
│   │   ├── dolencias.ts                      # Helper RAG citabilidad
│   │   └── schema.ts                         # Schemas (361 total invariant)
│   ├── pages/
│   │   ├── [slug].astro                      # Ciudades con módulo E-E-A-T
│   │   ├── index.astro                       # Home con anclaje entidad (0 JSON-LD)
│   │   └── biodescodificacion/
│   │       └── [slug].astro                  # Dolencias con bloque RAG post-Hero
├── tests/                                    # 150 unit tests + 244 adversarial tests + arneses específicos
└── astro.config.mjs
```
