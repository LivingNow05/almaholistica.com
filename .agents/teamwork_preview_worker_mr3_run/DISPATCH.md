## 2026-09-06T22:18:07Z
Eres el agente implementador para el Hito MR3: Rediseño Editorial de la Landing Page (`src/pages/index.astro`) y Animaciones GSAP de Alma Holística (almaholistica.com).

Tu identidad: teamwork_preview_worker_mr3_run
Tu directorio de trabajo: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_mr3_run/
Directorio raíz del proyecto: /Users/anthony/Downloads/almaholistica.com
Propiedad de escritura exclusiva: Eres el ÚNICO agente autorizado para escribir y modificar `src/pages/index.astro`. NO toques archivos de otros componentes sin necesidad.

DOCUMENTOS OBLIGATORIOS QUE DEBES LEER ANTES DE EMPEZAR:
1. /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (Léelo completo, especialmente bajo ## 2026-09-06T17:12:38Z).
2. /Users/anthony/Downloads/almaholistica.com/PROJECT.md.
3. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_3/handoff.md y /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_3/report.md (Especialmente la Sección 6 que contiene el código completo unificado y probado para `src/pages/index.astro`).
4. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_1/report.md (Hero GSAP y animaciones).
5. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_2/report.md (Secciones editoriales y tarjetas).

AVISO OBLIGATORIO DE INTEGRIDAD:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

OBJETIVO TÉCNICO:
Implementar el rediseño completo de `src/pages/index.astro` siguiendo la estética de Talora Wellness Group y cumpliendo TODOS los contratos preexistentes:
1. Estética bi-color (#060A1A y #38BDF8), botones píldora blancos con token `shadow-pill-white` (¡NUNCA inline `shadow-[...rgba...]` en elementos con `bg-white` para evitar falsos positivos de mate_style_checker!).
2. Cero dorado / amarillo (#F59E0B, #D4AF37, #FFE58F, #E5B33A). Cero palabras vetadas en código o comentarios ("neon", "glow", "backdrop-blur", "glassmorphism").
3. Tarjetas con `rounded-[2.5rem]`, padding generoso (`p-10 lg:p-14`), ultra-fine borders (`border border-slate-800/40`), icon bubbles (`w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60`).
4. Hero con animaciones GSAP de entrada (fade-in-up escalonado con curva cubic-bezier), scroll indicator vertical de 1px (h-16), aura flotante sutil y micro-interacciones hover sin layout shift (CLS = 0).
5. Tipografía editorial serena: títulos en Serif (Cormorant Garamond) a gran escala, eyebrows con línea minimalista `<span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>`, párrafos en sans-serif font-light.
6. Preservación estricta de contratos de pruebas:
   - Clases `home-dolencia-card` para exactamente las 12 dolencias canónicas (incluyendo `'migrana'` y `'sobrepeso-retencion'`).
   - Mínimo 100 enlaces a ciudades hiperlocales válidas que apunten a rutas SSG existentes.
   - Botones WhatsApp con atributo `data-open-quiz="true"`.
   - Cero schemas JSON-LD en `index.astro` (respetar `assert len(matches) == 0` de adversarial_m5_sitemaps_schema).
   - Mantener `<section id="dolencias">` y `<section id="ciudades">`.
   - Mantener inputs de búsqueda con IDs `#home-symptom-search` y `#home-city-search`.

VERIFICACIÓN REQUERIDA (DEBES EJECUTAR ESTOS COMANDOS Y REGISTRAR EL RESULTADO):
1. Auditoría mate style:
   `node --input-type=module -e 'import { auditMateStyleContent } from "./tests/helpers/mate_style_checker.mjs"; import fs from "fs"; const code = fs.readFileSync("src/pages/index.astro", "utf8"); const audit = auditMateStyleContent(code, "index.astro"); console.log("Passed:", audit.passed, "Violations:", audit.violations); if (!audit.passed) process.exit(1);'`
2. Verificación de build:
   `npm run build`
3. Verificación de tests:
   `npm test`
   `node --test tests/adversarial_*.test.mjs`
   `python3 tests/adversarial_assets_config_m2_2.py`
   `python3 tests/adversarial_cities_m1_2.py`
   `python3 tests/adversarial_m5_sitemaps_schema.py`
   `python3 tests/adversarial_m6_stress_harness.py`

ENTREGABLES:
1. Actualizar `src/pages/index.astro`.
2. Actualizar tu `progress.md` conforme avanzas.
3. Escribir tu reporte final de handoff en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_mr3_run/handoff.md` con las secciones: Observation, Logic Chain, Caveats, Conclusion, Verification Method y comandos ejecutados con sus salidas.
4. Enviar un mensaje con `send_message` al orquestador informando la finalización y la ruta de tu handoff.md.
