# DISPATCH — teamwork_preview_test_writer_e2e_1

## Role
E2E Test Architecture & Suite Writer (E2E Testing Track)

## Working Directory
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_test_writer_e2e_1/

## Mandatory Inputs
Read before starting:
- /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
- /Users/anthony/Downloads/almaholistica.com/PROJECT.md

## Scope & Objective
1. Design and establish the E2E testing infrastructure for Alma Holística.
2. Create `TEST_INFRA.md` at project root (`/Users/anthony/Downloads/almaholistica.com/TEST_INFRA.md`) detailing the 4-tier methodology (Category-Partition, BVA, Pairwise, Workload) and feature coverage for all 23 features in `PROJECT.md § Feature Inventory`.
3. Implement the executable opaque-box test suite in `tests/`:
   - Tier 1: Feature coverage (>=5 per feature across datasets, layouts, routes, quiz, schemas, sitemaps).
   - Tier 2: Boundary & Corner cases (empty fields, unicode, slug formatting, extreme prices, 404s, mobile CLS, etc.).
   - Tier 3: Cross-feature combinations (city + price + schema; ailment + quiz + WhatsApp message encoding).
   - Tier 4: Real-world application scenarios (end-to-end patient journey from search/landing to quiz completion and WhatsApp link generation).
   - Recommended runner: Node.js native test runner (`node --test tests/*.test.mjs` or similar lightweight script) or standalone verification scripts.
4. When the test suite is complete and executable, publish `/Users/anthony/Downloads/almaholistica.com/TEST_READY.md` containing runner commands, coverage summary, and feature checklist.
5. Write your handoff report to `handoff.md` in your working directory and notify the orchestrator.

## 2026-09-06T01:36:03Z
Tu identidad es teamwork_preview_test_writer_e2e_1.
Tu directorio de trabajo exclusivo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_test_writer_e2e_1/
Tu tarea asignada está en: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_test_writer_e2e_1/DISPATCH.md

Debes leer OBLIGATORIAMENTE antes de empezar:
- /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
- /Users/anthony/Downloads/almaholistica.com/PROJECT.md

Misión:
1. Diseñar la arquitectura E2E y crear `/Users/anthony/Downloads/almaholistica.com/TEST_INFRA.md` según el template oficial de PROJECT.md: filosofía de prueba opaque-box basada en requerimientos, matriz de cobertura de las 23 características de `PROJECT.md § Feature Inventory`, metodología de 4 niveles (Tier 1 a Tier 4).
2. Desarrollar la suite ejecutable de pruebas en `tests/` (por ejemplo con `node --test` o scripts de validación integral en Node/Python):
   - Tier 1: Cobertura por característica (>=5 por feature).
   - Tier 2: Casos de borde y valores extremos (caracteres especiales, monedas locales, slugs, 404, CLS = 0, estilo mate libre de glassmorphism/glow).
   - Tier 3: Interacciones cruzadas (ciudad + precio + schema; dolencia + preguntas + FAQs + Quiz + mensaje WhatsApp).
   - Tier 4: Escenarios de usuario real (flujo completo de paciente desde landing local o de biodescodificación hasta el modal de WhatsApp).
3. Publicar `/Users/anthony/Downloads/almaholistica.com/TEST_READY.md` con el comando exacto para ejecutar los tests, resumen de cobertura por tier y checklist de features.
4. Escribir tu informe en `handoff.md` en tu directorio de trabajo y notificar al orquestador.
