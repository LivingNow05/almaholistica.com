# BRIEFING — 2026-09-06T04:52:11Z

## Mission
Diseñar src/pages/index.astro y src/pages/biodescodificacion/index.astro bajo estética sólida mate estricta, arquitectura Astro sin CLS, alineada a los tests de Tier 1 y requerimientos del proyecto.

## 🔒 My Identity
- Archetype: explorer
- Roles: [investigator, architect, UI/UX designer]
- Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_3
- Original parent: ec56c22f-c2e2-4cb7-b566-7fc263c92882
- Milestone: M4 - Páginas Core y Navegación

## 🔒 Key Constraints
- Read-only investigation — do NOT implement directly in src/ (Explorer proposes designs and code in handoff.md / patch files)
- Estética sólida mate estricta (sin transparencias tipo glassmorphism, sin gradientes descontrolados, sin neones)
- Responsive, accesible, cero Cumulative Layout Shift (CLS)
- Integración obligatoria con `data-open-quiz="true"` para abrir el modal del quiz
- Uso del logo mariposa SVG `/logo-mariposa-con-fondo-completo.svg` con dimensiones explícitas
- Compatibilidad estricta con los tests Tier 1 (features 14 y 17)

## Current Parent
- Conversation ID: ec56c22f-c2e2-4cb7-b566-7fc263c92882
- Updated: 2026-09-06T04:52:11Z

## Investigation State
- **Explored paths**:
  - `ORIGINAL_REQUEST.md`: Requisitos de estilo mate estricto, 20 países, 45 dolencias, SVG de mariposa y Quiz Modal.
  - `PROJECT.md`: Feat 14 (`index.astro`), Feat 17 (`biodescodificacion/index.astro`), contratos M4 ↔ M1/M2/M3.
  - `tests/tier1_features.test.mjs`: Tests T1.14.1-5 y T1.17.1-5.
  - `tests/adversarial_matte_cls_m2_1.test.mjs`: Reglas estrictas contra blur, transparencias parciales, neón y requisitos anti-CLS.
  - `src/styles/global.css`: Tokens (#060A1A, #0A1226, #0E172F, #1E293B, #1E3A5F, #38BDF8, #D4AF37).
  - `src/layouts/BaseLayout.astro`: Integración de BaseLayout, Navbar, Footer y WhatsAppQuizModal (client:load).
  - `src/data/dataset_biodescodificacion_dolencias.json` y `dataset_almaholistica_ciudades.csv`: 45 dolencias en 7 sistemas y 113+ ciudades.
  - `teamwork_preview_explorer_m4_1/proposed_cities.ts` y `proposed_dolencias.ts`: APIs de lectura `getCities()` y `getDolencias()`.
- **Key findings**:
  - Ambas páginas deben cumplir rigurosamente con `auditMateStyleContent` (0 violaciones de opacidad, blur o neón).
  - El logo oficial `/logo-mariposa-con-fondo-completo.svg` debe tener dimensiones explícitas (320x320) y `shrink-0` para evitar cualquier CLS.
  - Todos los botones de conversión deben tener `data-open-quiz="true"`, y en las fichas de dolencia deben precargar `data-symptom={item.nombre}`.
  - En `index.astro` se debe incluir el enlace canónico a `/biodescodificacion`, selector/buscador de dolencias y selector/buscador de ciudades conectando a las 113+ localidades.
  - En `biodescodificacion/index.astro` se deben listar las 45 patologías agrupadas en los 7 sistemas biológicos con buscador reactivo y filtros por sistema.
- **Unexplored areas**: Implementación final en `src/pages/` (asignada a trabajadores de implementación M4).

## Key Decisions Made
- Diseñadas y creadas las plantillas completas de producción:
  - `proposed_index.astro` (Landing Page Principal)
  - `proposed_biodescodificacion_index.astro` (Catálogo General de Dolencias)
- Ambas plantillas verificadas con `auditMateStyleContent` y verificadores adversariales: 100% aprobadas con 0 violaciones.

## Artifact Index
- `DISPATCH.md` — Instrucciones recibidas y registradas con timestamp.
- `BRIEFING.md` — Memoria persistente y estado actualizado.
- `progress.md` — Heartbeat de actividad.
- `proposed_index.astro` — Plantilla lista para producción de `src/pages/index.astro`.
- `proposed_biodescodificacion_index.astro` — Plantilla lista para producción de `src/pages/biodescodificacion/index.astro`.
- `handoff.md` — Reporte final de entrega según el protocolo de 5 componentes.
