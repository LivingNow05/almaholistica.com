## 2026-09-06T17:04:07Z
Tu identidad: teamwork_preview_explorer_mr3_3
Tu directorio de trabajo exclusivo: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_3/

Archivos obligatorios a leer antes de iniciar:
1. /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (Requerimiento original autoritativo, sección ## 2026-09-06T17:12:38Z)
2. /Users/anthony/Downloads/almaholistica.com/PROJECT.md (Arquitectura y definición de hitos MR1-MR5)
3. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_mr1/handoff.md (Tokens, GSAP, SVGs)
4. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_mr2/handoff.md (Navbar, Footer, Modal)

MISIÓN:
Investigar exhaustivamente los contratos de pruebas y requerimientos de integración de `src/pages/index.astro`:
1. Identificar todos los tests que evalúan directa o indirectamente `index.astro`:
   - `tests/adversarial_matte_cls_m2_1.test.mjs` (`auditMateStyleContent`, no glassmorphism, no transparecias, dimensiones de imágenes, loading="eager").
   - `tests/tier1_features.test.mjs` y demás tiers (enlaces a `/biodescodificacion`, `/bogota`, `/madrid`, triggers `data-open-quiz`, etc.).
   - Suites de Python (`adversarial_assets_config_m2_2.py`, `adversarial_m6_stress_harness.py`).
2. Verificar compatibilidad con la trampa descubierta en `mate_style_checker.mjs`:
   - Uso obligatorio del token `shadow-pill-white` para evitar que `rgba(...)` inline en el class sea detectado falsamente como superficie transparente.
   - Evitar palabras clave prohibidas como `backdrop-blur` en comentarios del código.
3. Verificar que los esquemas JSON-LD (Schema.org) inyectados en BaseLayout desde `index.astro` permanezcan intactos.
4. Integrar las propuestas de `explorer_mr3_1` (Hero GSAP) y `explorer_mr3_2` (Content Cards) en una estructura armónica y limpia lista para el Worker.

ENTREGABLES:
Escribe tu reporte en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_3/report.md` y tu handoff en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_3/handoff.md`.
Al terminar, envía un mensaje notificando la finalización.
