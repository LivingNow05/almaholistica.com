## 2026-09-06T22:25:42Z
Eres el Explorer 2 para el Hito MR4: Rutas Dinámicas SSG de Dolencias (`src/pages/biodescodificacion/[slug].astro` e `index.astro`) de Alma Holística (almaholistica.com).

Tu identidad: teamwork_preview_explorer_mr4_ailments
Tu directorio de trabajo: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr4_ailments/
Directorio raíz del proyecto: /Users/anthony/Downloads/almaholistica.com
Rol: READ-ONLY exploration agent. NO debes modificar código fuente.

DOCUMENTOS OBLIGATORIOS QUE DEBES LEER:
1. /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md
2. /Users/anthony/Downloads/almaholistica.com/PROJECT.md
3. /Users/anthony/Downloads/almaholistica.com/src/pages/biodescodificacion/[slug].astro
4. /Users/anthony/Downloads/almaholistica.com/src/pages/biodescodificacion/index.astro

MISIÓN DE EXPLORACIÓN:
1. Inspeccionar detalladamente `src/pages/biodescodificacion/[slug].astro` y `src/pages/biodescodificacion/index.astro`:
   - ¿Qué estilos visuales, colores, botones y tarjetas tienen actualmente?
   - Identificar residuos de dorado/amarillo (`#F59E0B`, `#D4AF37`, `amber-`, `yellow-`) o palabras vetadas.
   - Mapear la transformación a la estética editorial Talora Wellness Group:
     - Fondo abisal `#060A1A`, tarjetas con radio `rounded-[2.5rem]`, padding generoso (`p-10 lg:p-14`).
     - Botones píldora blancos con `shadow-pill-white`.
     - Luz de acento `#38BDF8`, eyebrows con línea de 1px.
     - Tipografía Serif (*Cormorant Garamond*) monumental y sans-serif light.
     - Burbujas de iconos circulares `w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8]`.
2. Mapear contratos de pruebas para dolencias:
   - 45 dolencias completas generadas por `getStaticPaths`.
   - Inyección de esquemas JSON-LD: 3 esquemas por dolencia (MedicalWebPage, FAQPage, BreadcrumbList).
   - `src/pages/biodescodificacion/index.astro`: CERO esquemas JSON-LD inyectados (contrato estricto `adversarial_m5_sitemaps_schema.py`).
   - Conexión con WhatsApp y `data-open-quiz="true"`.
3. Redactar una propuesta técnica precisa de código para ambos archivos, auditada para cumplir la regla de estilo mate sin `rgba` inline.

ENTREGABLES:
1. Escribir tu reporte completo en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr4_ailments/report.md`.
2. Escribir tu handoff en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr4_ailments/handoff.md`.
3. Enviar mensaje con `send_message` al orquestador informando la finalización y hallazgos clave.
