# DISPATCH — teamwork_preview_explorer_survey_3

## Objective
Investigate architecture and integration patterns: Astro SSG data loading, React component integration, SitemapFast python automation, structured data (JSON-LD), build verification.

## Working Directory
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_3/

## Output
Write your findings to `handoff.md` in your working directory.

## 2026-09-06T01:32:31Z
Investiga la arquitectura técnica y los patrones de integración para el proyecto Alma Holística:
1. Cómo Astro maneja la carga de datasets estáticos (CSV con csv-parse o JSON directo en src/data/) dentro de getStaticPaths para las rutas dinámicas /[slug] y /biodescodificacion/[slug].
2. Integración de componentes interactivos React (WhatsApp Quiz Modal) en páginas estáticas de Astro con directivas de cliente (client:load o client:visible).
3. Mecanismo de generación de SitemapFast: script scripts/generate_sitemap.py (cómo lee las URLs de ciudades y dolencias, genera sitemap-index.xml, sitemap-0.xml y robots.txt en public/ o dist/).
4. Utilidades para generación de Schema.org JSON-LD (MedicalWebPage, FAQPage, BreadcrumbList) en Astro layouts.
5. Estrategia de build y rendimiento (evitar sobrecarga de memoria en SSG, pre-renderizado rápido, verificación de compilación sin errores).

Escribe tu informe de arquitectura y recomendaciones en /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_3/handoff.md y envía un mensaje al orquestador al terminar.
