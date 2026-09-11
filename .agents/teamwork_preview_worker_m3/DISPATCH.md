# DISPATCH

## 2026-09-10T20:01:12Z

Eres teamwork_preview_worker_m3, el Worker especializado en la integración de Tablas Comparativas, Ilustraciones Vectoriales y Paleta Biológica en las páginas de Alma Holística (Hito M3).

Tu directorio de trabajo exclusivo es:
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m3

El archivo con los requerimientos originales del usuario es:
/Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md
(DEBES leer este archivo antes de comenzar tu trabajo).

El documento maestro del proyecto es:
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_orchestrator_7/PROJECT.md

Información clave previa que debes consultar:
- Explorer 1 (Paleta y CSS): /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_1/handoff.md
- Explorer 2 (Activos y CLS): /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_2/handoff.md
- Explorer 3 (Tablas, SEO y Tests): /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_3/handoff.md y analysis.md
- Worker M1 (Tokens y CSS listos): /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m1/handoff.md
- Worker M2 (3 SVGs listos en public/images/): /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m2/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

PROPIEDAD EXCLUSIVA DE ESCRITURA:
Archivos que tienes autorización para crear o modificar:
- src/components/ClinicalApproachTable.astro (nuevo)
- src/components/BiologicalMatrixTable.astro (nuevo)
- src/components/AccompanimentStagesTable.astro (nuevo)
- src/pages/index.astro (modificación e integración)
- src/pages/biodescodificacion/index.astro (modificación de badges biológicos si aplica)
NO modifiques archivos fuera de tu alcance asignado.

TU MISIÓN EN M3:
1. **Crear los componentes de tablas comparativas (R3 y R4)**:
   - `src/components/ClinicalApproachTable.astro`:
     - Tabla: Medicina Convencional vs Biodescodificación Integrativa.
     - 5 dimensiones: Paradigma de origen, Enfoque diagnóstico, Nivel de intervención, Objetivo del síntoma, Papel del consultante.
     - Marcado semántico HTML5: `<table itemscope itemtype="https://schema.org/Table">`, `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`, `<th scope="row">`.
     - Contenedor responsivo con `overflow-x-auto`, sin desbordamiento en viewport de 320px, scrollbar estilizada con paleta de marca y micro-indicador visual de desplazamiento para móvil.
   - `src/components/BiologicalMatrixTable.astro`:
     - Matriz de Dolencias y Sentido Biológico con muestra representativa (8 patologías clave: Gastritis, Lumbalgia, Rinitis, Ansiedad, Sobrepeso, Eczema, Hipotiroidismo, Hipertensión).
     - Columnas: Síntoma Físico, Capa Embrionaria (Endodermo/Mesodermo/Ectodermo), Emoción Atrapada, Sentido Biológico Adaptativo.
     - Badges semánticos biológicos usando las clases creadas en M1 (`.bio-badge-digestivo`, `.bio-badge-osteoarticular`, etc.).
   - `src/components/AccompanimentStagesTable.astro`:
     - Etapas del Acompañamiento en 4 fases clínicas.
     - Columnas: Fase, Sesiones Estimadas, Metodología Aplicada, Resultado Terapéutico Esperado.

2. **Integrar las 3 ilustraciones vectoriales en `src/pages/index.astro` (R2)**:
   - En la sección correspondiente de enfoque clínico:
     `<img src="/images/eje-mente-cuerpo-neurovegetativo.svg" alt="Diagrama médico del eje mente-cuerpo y correlación neurovegetativa en biodescodificación" width="800" height="600" loading="lazy" decoding="async" class="w-full max-w-2xl h-auto mx-auto rounded-[2rem] border border-slate-800/40" />`
   - En la sección de pilares metodológicos:
     `<img src="/images/pilares-choque-biologico.svg" alt="Los 3 pilares del choque biológico y respuesta adaptativa celular" width="800" height="500" loading="lazy" decoding="async" class="w-full max-w-2xl h-auto mx-auto rounded-[2rem] border border-slate-800/40" />`
   - En la sección del proceso terapéutico:
     `<img src="/images/fases-proceso-terapeutico.svg" alt="Rango de etapas terapéuticas desde diagnóstico preliminar hasta autorregulación" width="900" height="450" loading="lazy" decoding="async" class="w-full max-w-3xl h-auto mx-auto rounded-[2rem] border border-slate-800/40" />`
   - GARANTIZAR: Atributos `width` y `height` numéricos literales obligatorios (requisito anti-CLS auditado por tests), `loading="lazy"`.

3. **Integrar las tablas en `src/pages/index.astro` para aliviar el texto denso (R3)**:
   - Reemplazar o complementar los bloques continuos de texto de las Secciones 3 y 6 con `ClinicalApproachTable`, `BiologicalMatrixTable` y `AccompanimentStagesTable`.
   - Aplicar los acentos de borde superior de 3px (`.bio-border-*`) y badges biológicos en las tarjetas de dolencias (`.home-dolencia-card`) mediante `getBiologicalTheme(d.sistema)`.

4. **INVARIANTES TÉCNICOS CRÍTICOS (¡ATENCIÓN ESTRICTA!)**:
   - `dist/index.html` NO debe contener etiquetas `<script type="application/ld+json">`. Si agregas un `<script>` JSON-LD en `index.astro`, fallarán `MR3-ADV-4.1` y `MR3-CH2-4.5`. Por eso se usan microdatos semánticos HTML5 (`itemscope itemtype="https://schema.org/Table"`).
   - Mantener exactamente 12 tarjetas con clase `.home-dolencia-card` y slugs `migrana` y `sobrepeso-retencion`.
   - Mantener al menos 100 enlaces `.city-search-item`.
   - Mantener al menos 4 enlaces de WhatsApp hacia `573000000000`.
   - Preservar los IDs/anclas `#dolencias` y `#ciudades`.
   - Cero clases prohibidas (`bg-amber-*`, `text-amber-*`, `yellow`, `gold`, `backdrop-blur`, `bg-opacity-*`).
   - Cero desbordamiento horizontal: Todas las tablas deben ir dentro de contenedores `w-full max-w-full overflow-x-auto`.

5. **VERIFICACIÓN Y PRUEBAS**:
   - `npm run check` (0 errores TypeScript/Astro)
   - `npm run build` (160 páginas SSG)
   - `npm test` (150/150 pass)
   - `node --test tests/adversarial_*.test.mjs` (244/244 pass)
   - `python3 tests/adversarial_m6_stress_harness.py` (0 enlaces rotos, CLS=0)

ENTREGABLES:
- Registrar progreso en `.agents/teamwork_preview_worker_m3/progress.md`.
- Detallar cambios en `.agents/teamwork_preview_worker_m3/changes.md`.
- Redactar reporte de handoff en `.agents/teamwork_preview_worker_m3/handoff.md`.
- Notificar al parent vía `send_message` cuando termines.
