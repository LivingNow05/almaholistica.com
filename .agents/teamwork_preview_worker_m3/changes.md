# Changes Report — Hito M3

**Agente**: `teamwork_preview_worker_m3` (Implementer / QA / Specialist)  
**Parent**: `6726af5a-d5c1-4a22-89aa-ecd41de70482`  
**Fecha**: 2026-09-10  
**Hito**: M3 — Integración de Tablas Comparativas, Ilustraciones Vectoriales y Paleta Biológica en Home

---

## 1. Archivos Creados

### `src/components/ClinicalApproachTable.astro`
- **Propósito**: Cuadro comparativo entre Medicina Convencional y Biodescodificación Integrativa para aliviar la densidad de texto y potenciar la indexación GEO.
- **Estructura**:
  - 5 dimensiones clínicas: *Paradigma de origen*, *Enfoque diagnóstico*, *Nivel de intervención*, *Objetivo del síntoma*, *Papel del consultante*.
  - Marcado semántico HTML5: `<table itemscope itemtype="https://schema.org/Table">`, `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`, `<th scope="row">`, `<td>`.
  - Contenedor con `w-full max-w-full overflow-x-auto` sin desbordamiento en viewports de 320px, scrollbar estilizada con paleta de marca y micro-indicador visual de desplazamiento horizontal en móvil.
  - Cero inyección de etiquetas `<script type="application/ld+json">` preservando la regla MR3-ADV-4.1 (0 scripts en `dist/index.html`).
  - Estilo sólido mate: fondos 100% opacos (`#0A1226`, `#0E172F`, `#060A1A`), sin transparencias ni efectos de vidrio.

### `src/components/BiologicalMatrixTable.astro`
- **Propósito**: Matriz sinóptica de dolencias y sentido biológico adaptativo con una muestra representativa de 8 patologías clave.
- **Estructura**:
  - 8 afecciones analizadas: *Gastritis*, *Lumbalgia*, *Rinitis*, *Ansiedad*, *Sobrepeso*, *Eczema*, *Hipotiroidismo*, *Hipertensión*.
  - Cubre la ontogenia de las capas embrionarias: *Endodermo*, *Mesodermo Nuevo*, *Ectodermo*.
  - 4 columnas clínicas: *Síntoma Físico*, *Capa Embrionaria*, *Emoción Atrapada*, *Sentido Biológico Adaptativo*.
  - Badges semánticos biológicos sólidos mates usando las clases CSS de M1: `.bio-badge-digestivo`, `.bio-badge-osteoarticular`, `.bio-badge-respiratorio`, `.bio-badge-nervioso`.
  - Microdatos Schema.org/Table mediante atributos HTML5 nativos.

### `src/components/AccompanimentStagesTable.astro`
- **Propósito**: Hoja de ruta estructurada del acompañamiento terapéutico en 4 fases clínicas.
- **Estructura**:
  - 4 fases: *01 Diagnóstico & Cartografía Biológica*, *02 Desanclaje Emocional & Catarsis*, *03 Reprogramación Mental & Límites*, *04 Consolidación & Autorregulación*.
  - 4 columnas: *Fase Clínica*, *Sesiones Estimadas*, *Metodología Aplicada*, *Resultado Terapéutico Esperado*.
  - Marcado semántico HTML5 y microdatos Schema.org/Table.
  - Diseño responsivo con contención de ancho y scrollbar sobria.

---

## 2. Archivos Modificados

### `src/pages/index.astro`
- **Importaciones**:
  - Incorporación de `ClinicalApproachTable`, `BiologicalMatrixTable`, `AccompanimentStagesTable`.
  - Incorporación de `getBiologicalBorderClass` y `getBiologicalBadgeClass` desde `../lib/dolencias`.
- **Sección 2 (Manifiesto y Enfoque Clínico)**:
  - Inserción de la Ilustración 1: `/images/eje-mente-cuerpo-neurovegetativo.svg` con atributos explícitos `width="800"` y `height="600"`, `loading="lazy"`, `decoding="async"` y bordes redondeados sobrios `rounded-[2rem] border border-slate-800/40`.
  - Inserción del componente `<ClinicalApproachTable />` aliviando el texto corrido.
- **Sección 3 (Fundamento Terapéutico)**:
  - Inserción de la Ilustración 2: `/images/pilares-choque-biologico.svg` con atributos explícitos `width="800"` y `height="500"`, `loading="lazy"`, `decoding="async"`.
  - Inserción del componente `<BiologicalMatrixTable />` complementando los pilares conceptuales con datos clínicos tangibles.
- **Sección 4 (Catálogo de Dolencias `#dolencias`)**:
  - Aplicación de acentos de borde superior de 3px (`.bio-border-*`) a las 12 tarjetas `.home-dolencia-card` mediante `${getBiologicalBorderClass(item.sistema)}`.
  - Actualización de los badges de sistema en cada tarjeta mediante `.bio-badge ${getBiologicalBadgeClass(item.sistema)}`.
  - Preservación estricta de las 12 tarjetas, atributos `data-search`, `data-open-quiz="true"`, y slugs canónicos `migrana` y `sobrepeso-retencion`.
- **Sección 6 (El Proceso Terapéutico)**:
  - Inserción de la Ilustración 3: `/images/fases-proceso-terapeutico.svg` con atributos explícitos `width="900"` y `height="450"`, `loading="lazy"`, `decoding="async"`.
  - Inserción del componente `<AccompanimentStagesTable />` posterior a los 4 pasos interactivos.
- **Preservación Inviolable**:
  - 0 scripts `<script type="application/ld+json">` en `dist/index.html`.
  - 113 enlaces `.city-search-item`.
  - 7 enlaces de WhatsApp hacia `573000000000` (mínimo requerido 4).
  - Anclas `#dolencias` y `#ciudades`.
  - Cero clases prohibidas (`bg-amber-*`, `text-amber-*`, `yellow`, `gold`, `backdrop-blur`, `bg-opacity-*`).

### `src/pages/biodescodificacion/index.astro`
- **Importaciones**:
  - Incorporación de `getBiologicalBorderClass` y `getBiologicalBadgeClass` desde `../../lib/dolencias`.
- **Cuadrícula de Catálogo**:
  - Aplicación de borde superior de 3px a las tarjetas `.dolencia-item-card` mediante `${getBiologicalBorderClass(item.sistema)}`.
  - Actualización de badges de sistema con `.bio-badge ${getBiologicalBadgeClass(item.sistema)}`.

---

## 3. Verificación Automatizada

| Herramienta / Suite | Comando | Resultado |
|---|---|---|
| Astro Check | `npm run check` | **0 errors, 0 warnings** (42 archivos evaluados) |
| SSG Build | `npm run build` | **160 páginas generadas** en 2.16s |
| Regression Unit Tests | `npm test` | **150/150 pass**, 40 suites (100% verde) |
| Adversarial Suites | `node --test tests/adversarial_*.test.mjs` | **244/244 pass**, 70 suites (100% verde) |
| Stress QA Harness | `python3 tests/adversarial_m6_stress_harness.py` | **160 páginas, 0 rotos, 0 errores CLS** |
| Sitemaps & Schemas | `python3 tests/adversarial_m5_sitemaps_schema.py` | **361 schemas JSON-LD, 160 URLs 1:1** |
| Assets & Config | `python3 tests/adversarial_assets_config_m2_2.py` | **0 errores, CONFIRM_CORRECTNESS** |
