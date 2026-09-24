# BRIEFING — 2026-09-24T05:13:50Z

## Mission
Investigar diseño UI, pirámide de enlazado silo, breadcrumbs, invariantes Schema.org y reglas Swiss Bio-Tech para los 20 Country Hubs y páginas de ciudades.

## 🔒 My Identity
- Archetype: explorer
- Roles: survey, ui design, pyramid silo linking, breadcrumbs, schema investigation
- Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_2
- Original parent: d7cc0e4e-ca72-4f92-8cc3-fe1d13741ae2
- Milestone: Survey phase for 20 Country Hubs (UI/Silo/Schema/Style)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Hablar siempre en español
- Follow Handoff Protocol (Observation, Logic Chain, Caveats, Conclusion, Verification Method)
- Solid matte Swiss Bio-Tech design standards (#060A1A, #0A1226, no transparencies, no backdrop-blur)

## Current Parent
- Conversation ID: d7cc0e4e-ca72-4f92-8cc3-fe1d13741ae2
- Updated: 2026-09-24T05:13:50Z

## Investigation State
- **Explored paths**:
  - `src/pages/index.astro`: analizada sección `#ciudades`, `countriesList` y renderizado estático de cabeceras sin enlace.
  - `src/pages/[slug].astro`: analizado renderizado de breadcrumbs (inline HTML y JSON-LD).
  - `src/lib/schema.ts`: auditados generadores de Schema (`HealthAndBeautyBusiness`, `MedicalWebPage`, `FAQPage`, `BreadcrumbList`).
  - `tests/helpers/mate_style_checker.mjs`, `tailwind.config.mjs`, `tests/adversarial_mr3_challenger.test.mjs`: catalogadas reglas y tokens prohibidos/obligatorios.
  - `src/styles/global.css`: validadas clases `card-matte`, `btn-action-pill-white`, `btn-whatsapp-primary`.
  - `src/data/dataset_almaholistica_ciudades_eeat_geo.json`: analizada estructura de especialistas, autoridades y casos locales.
  - `scripts/generate_sitemap.py`: analizada lógica de generación de 160 -> 180 URLs.
- **Key findings**:
  - Home carece de enlaces a los 20 hubs y mantiene títulos `<h4>` de países planos.
  - Las ciudades usan migas `Inicio > Ciudades > Ciudad` en lugar de `Inicio > País > Ciudad`.
  - La invariante de schemas pasa de 361 a 421 (60 nuevos esquemas: 20 * 3).
  - La Home debe mantener CERO scripts JSON-LD (MR3-CH2-4.5).
  - `tests/adversarial_jsonld_robots_m5_2.test.mjs` y `tests/adversarial_m6_final_qa.test.mjs` tienen aserciones hardcodeadas que requerirán sincronización.
- **Unexplored areas**: Implementación (reservada para fases posteriores).

## Key Decisions Made
- Concluido el análisis forense de los 5 puntos requeridos y redactando `handoff.md` estructurado.

## Artifact Index
- DISPATCH.md — Registro de instrucciones
- BRIEFING.md — Memoria de trabajo
- progress.md — Liveness heartbeat
- handoff.md — Reporte final estructurado de survey
