# Plan — teamwork_preview_explorer_mr4_ailments

Exploración técnica e investigación de `src/pages/biodescodificacion/[slug].astro` y `src/pages/biodescodificacion/index.astro`:
- Analizar estructura actual de la página de dolencia individual (45 patologías) y del catálogo índice.
- Mapear datasets, props, parámetros getStaticPaths.
- Mapear contratos de pruebas que evalúan dolencias.
- Identificar elementos visuales a transformar a la estética Talora (paleta #060A1A, #38BDF8, botones píldora blancos con `shadow-pill-white`, tarjetas `rounded-[2.5rem]`, eyebrows con línea de 1px, cero dorado).
- Asegurar preservación de esquemas JSON-LD (3 esquemas por dolencia, 0 en índice).
