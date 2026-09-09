# DISPATCH — teamwork_preview_spec_miner_survey_1

## Objective
Read ORIGINAL_REQUEST.md and extract the exhaustive specification of all requirements (R1 datasets, R2 design and routes, R3 WhatsApp funnel, R4 SEO and SitemapFast).

## Working Directory
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/

## Output
Write your findings and specification inventory to `handoff.md` in your working directory.

## 2026-09-06T01:32:31Z
Tu identidad es teamwork_preview_spec_miner_survey_1.
Tu directorio de trabajo exclusivo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/
Tu tarea asignada está en: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/DISPATCH.md

Debes leer OBLIGATORIAMENTE antes de empezar:
/Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md

Extrae minuciosamente todas las especificaciones y requisitos:
1. Requisitos R1: Datasets programáticos:
   - dataset_almaholistica_ciudades.csv (>100 ciudades, 20 países aprobados, columnas exactas, nombres, formatos).
   - dataset_biodescodificacion_dolencias.json / .csv (45 patologías validadas, campos exactos: slug, nombre, conflicto_emocional, sentido_biologico, reprogramacion, preguntas_reflexion, faqs).
2. Requisitos R2: Arquitectura web y diseño:
   - Astro + Tailwind CSS + React/TSX.
   - Diseño mate sólido estricto: CERO glassmorphism, CERO backdrop-blur, CERO resplandores neón/glow.
   - Paleta de colores exacta: #060A1A, #0A1226, #0E172F, #1E293B/#1E3A5F, #38BDF8, #D4AF37/#F59E0B.
   - Tipografías: Cinzel/Playfair Display (títulos) + Plus Jakarta Sans (cuerpo).
   - Integración del logo SVG oficial: logo-mariposa-con-fondo-completo.svg.
   - Rutas dinámicas: /[slug] (ciudades), /biodescodificacion/[slug] (dolencias), home /, listings.
3. Requisitos R3: Embudo de conversión:
   - WhatsApp Quiz Modal (3-4 pasos interactivos: síntoma, duración, intentos previos, ubicación).
   - Teléfono genérico provisional 573000000000 configurado en src/config/site.ts.
   - Generación de enlace de WhatsApp con mensaje estructurado dinámico.
4. Requisitos R4: SEO y SitemapFast:
   - Meta tags, OpenGraph, Twitter Cards, canonical URL.
   - JSON-LD schemas: MedicalWebPage, FAQPage, BreadcrumbList.
   - Arquitectura SitemapFast: scripts/generate_sitemap.py generando sitemap-index.xml, sitemap-0.xml y robots.txt.
5. Criterios de aceptación y calidad (npm run build limpio, cero errores TS/Astro, layout responsive y cero CLS).

Escribe tu informe completo en /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_spec_miner_survey_1/handoff.md y envía un mensaje al orquestador al terminar.
