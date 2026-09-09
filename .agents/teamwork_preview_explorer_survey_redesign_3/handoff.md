# Reporte de Handoff — Fase 0 (Survey Redesign 3)
**Investigador:** `teamwork_preview_explorer_survey_redesign_3`  
**Fecha:** 2026-09-06T17:20:00Z  
**Misión:** Auditoría y Mapeo de Rutas Dinámicas, Componente WhatsApp Quiz Modal, Suite de Pruebas Existente y Preservación Integral de Arquitectura SEO / E-E-A-T (R4) para el Rediseño de Alta Gama.

---

## 1. Observation

A través de herramientas de inspección de código (`view_file`, `grep_search`, `find_by_name`) y ejecución directa en terminal (`run_command`), se obtuvieron las siguientes observaciones empíricas verbatim y cuantitativas sobre la base de código de Alma Holística (`almaholistica.com`):

### 1.1. Estado Actual de Rutas Dinámicas y Modal de WhatsApp
1. **`src/pages/[slug].astro` (Ruta Dinámica SSG de Ciudades — 113 páginas):**
   - Importa `BaseLayout`, `getCities` (`src/lib/cities.ts`), `buildLocalServiceSchema` y `buildBreadcrumbSchema` (`src/lib/schema.ts`), `SITE_CONFIG` y `buildWhatsAppUrl` (`src/config/site.ts`).
   - Implementa `getStaticPaths()` retornando 113 rutas generadas a partir de `dataset_almaholistica_ciudades.csv` (Líneas 18-24).
   - Utiliza actualmente tokens de color dorado/amarillo (`#D4AF37`) en 11 ubicaciones explícitas del archivo:
     - Línea 86: `<span class="text-[#D4AF37] font-medium">{cityName}</span>` (Breadcrumb activo).
     - Línea 93: `<div class="badge-gold mb-4">` (Badge geográfico).
     - Línea 125: `<span class="text-base sm:text-lg font-bold text-[#D4AF37]">Biodescodificación</span>` (Tarjeta enfoque).
     - Línea 161: `<span class="w-2 h-2 rounded-full bg-[#D4AF37]"></span>` (Punto decorativo).
     - Línea 162: `<span class="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Contexto Urbano y Salud Emocional</span>`.
     - Línea 203: `<div class="w-10 h-10 rounded-full bg-[#0E172F] border border-[#D4AF37] text-[#D4AF37] font-bold text-base flex items-center justify-center mb-4">` (Paso 2).
     - Líneas 245, 251, 257, 263, 269, 275: `<span class="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">` (Etiquetas de sistema biológico en 6 tarjetas).
     - Línea 285: `<span class="badge-gold mb-3">Tarifas Transparentes</span>`.
     - Línea 293: `<div class="card-matte p-5 border-l-4 border-[#D4AF37] mb-6">` (Borde izquierdo medios de pago).
     - Línea 344: `<footer class="card-matte-elevated border-[#D4AF37] p-8 sm:p-12 text-center rounded-xl relative overflow-hidden">` (Borde del banner de conversión).
     - Línea 346: `<span class="badge-gold mb-4">Agenda Abierta en {cityName}</span>`.
   - Botones primarios de conversión:
     - Hero (Líneas 132-143): `<a href={fallbackWhatsAppUrl} class="btn-action-primary text-base font-bold shadow-matte-sm" data-open-quiz="true" data-city={rawSlug}>`.
     - Banner Final (Líneas 354-365): Idéntica clase `btn-action-primary` con `data-open-quiz="true"` y `data-city={rawSlug}`.
   - Tarjetas y contenedores: Usa clases CSS `.card-matte` y `.card-matte-elevated` con `border-radius: 0.75rem` (`rounded-xl` en banners), requiriendo migración a `rounded-[2.5rem]`.

2. **`src/pages/biodescodificacion/[slug].astro` (Ruta Dinámica SSG de Dolencias — 45 páginas):**
   - Importa `getDolencias` (`src/lib/dolencias.ts`), `buildMedicalWebPageSchema`, `buildFAQSchema`, `buildBreadcrumbSchema` (`src/lib/schema.ts`), `buildWhatsAppUrl` y `SITE_CONFIG`.
   - Implementa `getStaticPaths()` retornando exactamente 45 rutas basadas en `dataset_biodescodificacion_dolencias.json` (Líneas 22-28).
   - Utiliza `#D4AF37` en 12 ubicaciones explícitas:
     - Línea 93: `<span class="text-[#D4AF37] font-medium truncate max-w-[200px] sm:max-w-none">{nombre}</span>`.
     - Línea 100: `<div class="badge-gold mb-4">`.
     - Línea 173-174: `<span class="w-2 h-2 rounded-full bg-[#D4AF37]"></span>` y `<span class="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Fisiología y Adaptación</span>`.
     - Línea 192: `<section class="card-matte-elevated border border-[#D4AF37] p-8 sm:p-10 md:p-12 mb-10 text-center rounded-xl relative overflow-hidden" aria-labelledby="reprogramacion-heading">`.
     - Línea 194: `<span class="badge-gold mb-4">Integración y Liberación</span>`.
     - Línea 199: `<blockquote class="font-serif text-xl sm:text-2xl text-[#D4AF37] italic my-6 leading-relaxed font-normal">`.
     - Línea 226: `<span class="w-8 h-8 rounded-full bg-[#0A1226] border border-[#D4AF37] text-[#D4AF37] font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">`.
     - Línea 269-270: `<span class="w-2 h-2 rounded-full bg-[#D4AF37]"></span>` y `<span class="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Claridad y Fundamentos</span>`.
     - Línea 307: `<footer class="card-matte-elevated border-[#D4AF37] p-8 sm:p-12 text-center rounded-xl relative overflow-hidden">`.
     - Línea 309: `<span class="badge-gold mb-4">Diagnóstico Emocional en Vivo</span>`.
   - Contratos que alimentan tests: sección con `id="conflicto"` (Línea 144, requerida por `T1.16.3`), preguntas de reflexión (Línea 210, `T1.16.4`), FAQs (Línea 266, `T1.16.4`), descargo médico (`aside`, Línea 293), y botones con `data-open-quiz="true"` y `data-symptom={nombre}` (Líneas 121, 254, 320).

3. **`src/pages/biodescodificacion/index.astro` (Directorio y Catálogo de 45 Dolencias):**
   - Agrupa dolencias por 7 sistemas corporales (`Digestivo`, `Nervioso / Emocional`, `Osteoarticular`, `Dermatológico`, `Respiratorio`, `Endocrino / Metabólico`, `Inmunológico / Circulatorio`).
   - Posee buscador interactivo (`id="symptom-filter-input"`) y filtro de pestañas (`id="system-filter-tabs"`).
   - Renderiza cuadrícula (`id="catalog-grid"`) con 45 tarjetas (`class="dolencia-item-card"`), cada una con atributos `data-sistema` y `data-search-text`.
   - Utiliza `#D4AF37` en 8 ubicaciones: Líneas 68, 137, 153, 245, 270, 290, 310, 330.
   - Enlace canónico declarado: `https://almaholistica.com/biodescodificacion`.

4. **`src/components/react/WhatsAppQuizModal.tsx` (Quiz Funnel React 19):**
   - Contenedor exterior (Línea 237): `className="relative w-full max-w-xl bg-[#0A1226] border border-[#1E293B] rounded-2xl p-6 sm:p-8 z-10 my-auto text-slate-100 shadow-none"`. Tiene esquinas `rounded-2xl` (debe pasar a `rounded-[2.5rem]`).
   - Uso de `#D4AF37` en 3 puntos:
     - Línea 255: `<span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-medium block">Evaluación & Agendamiento</span>`.
     - Línea 278: `<span className="font-semibold uppercase tracking-wider text-[#D4AF37]">{step <= 4 ? ...}</span>`.
     - Línea 643: `<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0E172F] text-[#D4AF37] border border-[#D4AF37]">`.
   - Botones primarios (Líneas 372, 459, 546, 628): Utilizan `rounded-xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#060A1A] font-bold text-sm`.
   - Botón final de WhatsApp (Líneas 697-703):
     `className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#060A1A] font-bold text-base transition-colors shadow-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"` con `data-quiz-final="true"`.
   - Contratos funcionales inviolables verificados en tests:
     - Atributos `data-quiz-modal="true"` y `data-quiz-final="true"`.
     - Fórmula exacta en Paso 5: `data-diagnosis={`Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`}` sobre `<p id="quiz-modal-description">`.
     - Eventos: delegación global de clics en `a[href*="wa.me"]`, `[data-open-quiz]`, escucha de `window.addEventListener('alma:open-quiz', ...)` con `setStep(2)` si hay síntoma precargado.

### 1.2. Inventario y Ejecución de la Suite de Pruebas Existente
Se ejecutaron directamente las herramientas de testing en el entorno:
- **`npm test`**: Ejecuta `node --test tests/tier1_features.test.mjs tests/tier2_edge_cases.test.mjs tests/tier3_cross_feature.test.mjs tests/tier4_user_journeys.test.mjs`.
  - **Resultado:** 150 tests, 40 suites, **150 passed, 0 failed, 0 skipped** (duración: 133 ms).
- **`node --test tests/adversarial_*.test.mjs`**: Ejecuta 11 archivos de tests adversariales en Node.
  - **Resultado:** 172 tests, 52 suites, **172 passed, 0 failed** (duración: 531 ms).
- **Suites en Python (`adversarial_*.py`)**:
  - `python3 tests/adversarial_assets_config_m2_2.py`: **0 errors, PASS**.
  - `python3 tests/adversarial_cities_m1_2.py`: **0 errors, PASS** (113 ciudades, 20 países).
  - `python3 tests/adversarial_m5_sitemaps_schema.py`: **0 errors, PASS** (160 URLs, 361 schemas JSON-LD).
  - `python3 tests/adversarial_m6_stress_harness.py`: **0 errors, PASS** (160 páginas HTML en `dist/`, 0 broken links).

### 1.3. Puntos de Fricción Críticos Detectados en Tests de Estilo
1. **`tests/helpers/contracts.mjs` (Líneas 53-62):**
   Define `COLOR_PALETTE` con:
   ```javascript
   export const COLOR_PALETTE = {
     abyssalBackground: '#060A1A',
     midnightCard1: '#0A1226',
     midnightCard2: '#0E172F',
     border1: '#1E293B',
     border2: '#1E3A5F',
     primaryAction: '#38BDF8',
     secondaryAccentGold: '#D4AF37',
     secondaryAccentAmber: '#F59E0B'
   };
   ```
2. **`tests/tier1_features.test.mjs` (Líneas 283-286):**
   ```javascript
   test('T1.6.4: Botón de acción Cyan #38BDF8 y acento Oro #D4AF37', () => {
     assert.equal(COLOR_PALETTE.primaryAction, '#38BDF8');
     assert.equal(COLOR_PALETTE.secondaryAccentGold, '#D4AF37');
   });
   ```
   *Fallo inminente:* Si `#D4AF37` se elimina de `COLOR_PALETTE`, `T1.6.4` falla inmediatamente.
3. **`tests/adversarial_matte_cls_m2_1.test.mjs` (Líneas 138-161):**
   - Línea 154: `assert.ok(twContent.includes('#D4AF37'), 'Must configure Gold Accent #D4AF37');`
   - Línea 157: `assert.ok(!twContent.includes('rgba('), 'Tailwind config shadows must not use rgba');`
   *Fallo inminente:* Si `tailwind.config.mjs` elimina `#D4AF37` o define sombras con `rgba`, `ADV-M2.1.4` falla.
4. **`tests/adversarial_assets_config_m2_2.py` (Líneas 197-201):**
   Verifica en `expected_colors` que `"D4AF37": "Oro Satinado"` esté presente en `tailwind.config.mjs`.
5. **`tests/helpers/mate_style_checker.mjs` — INCOMPATIBILIDAD CRÍTICA:**
   - Línea 10:
     `{ pattern: /rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\s*\)/i, description: 'Colores RGBA transparentes prohibidos en superficies' }`
   - Línea 21: `MANDATORY_COLOR_TOKENS` incluye `'#D4AF37'`.
   - Este auditor es ejecutado de forma exhaustiva por:
     - `tests/adversarial_challenger_m4_gen3_2.test.mjs`: `ADV-GEN3.7` (audita TODOS los archivos de `src/`) y `ADV-GEN3.8` (audita los 160 HTML de `dist/`).
     - `tests/adversarial_challenger_m4_2.test.mjs`: `ADV-M4.2.17`.
     - `tests/adversarial_m3_quiz_challenger.test.mjs`: `ADV-M3.2.16`.
     - `tests/adversarial_m3_challenger.test.mjs`: `ADV-M3.1.11`.
     - `tests/tier2_edge_cases.test.mjs`: `T2.3.1` a `T2.3.4`.
   - **Prueba empírica realizada:** La expresión regular `/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\s*\)/i` evalúa como `true` ante la clase del nuevo botón píldora blanco exigida en `ORIGINAL_REQUEST.md`: `shadow-[0_8px_24px_rgba(255,255,255,0.08)]`.
   - Por tanto, cualquier archivo que incluya dicha clase fallará las pruebas de estilo mate si no se actualiza la regla del checker para distinguir entre superficies transparentes y sombras sutiles.

### 1.4. Artefactos SEO y E-E-A-T Intactos
1. **Sitemaps y Robots (`scripts/generate_sitemap.py`):**
   - Genera: `public/sitemap-index.xml`, `public/sitemap-0.xml`, `public/sitemap.xml`, `public/robots.txt` y los replica en `dist/`.
   - Censo exacto: 160 URLs (1 home + 1 catálogo + 113 ciudades + 45 dolencias) con trailing slash exacto.
2. **Esquemas JSON-LD (`src/lib/schema.ts`):**
   - 4 generadores puros: `buildMedicalWebPageSchema`, `buildFAQSchema`, `buildBreadcrumbSchema`, `buildLocalServiceSchema`.
   - Censo verificado en `dist/`: exactamente 361 esquemas JSON-LD sintácticamente válidos (113 páginas de ciudad * 2 + 45 páginas de dolencia * 3 = 361).
3. **GEO & E-E-A-T (`public/llms.txt`):**
   - Archivo existente de 40 líneas y 4,895 bytes con autoridad de entidad, catálogo de dolencias, cobertura geográfica y directrices para modelos de lenguaje.

---

## 2. Logic Chain

A partir de las observaciones directas, se deduce el siguiente encadenamiento lógico:

```
[Observación: R1 del rediseño prohíbe #D4AF37 y #F59E0B]
           ↓
[Observación: 65 ocurrencias de #D4AF37 en src/ (ciudades, dolencias, modal, navbar, footer, global.css)]
           ↓
[Deducción 1: Todas las instancias de #D4AF37 en templates deben migrar a Cyan #38BDF8 o Slate/White]
           ↓
[Observación: T1.6.4, ADV-M2.1.4 y adversarial_assets_config_m2_2.py validan positivamente la presencia de #D4AF37]
           ↓
[Deducción 2: Si el rediseño elimina #D4AF37 del código pero no actualiza las suites de test, la suite romperá inmediatamente]
           ↓
[Observación: R1 exige botón píldora blanco con shadow-[0_8px_24px_rgba(255,255,255,0.08)]]
           ↓
[Observación: FORBIDDEN_STYLE_PATTERNS en mate_style_checker.mjs contiene /rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\s*\)/i]
           ↓
[Observación: ADV-GEN3.7 y ADV-GEN3.8 auditan exhaustivamente todos los archivos de src/ y dist/ con ese checker]
           ↓
[Deducción 3: Aplicar la sombra oficial rgba(255,255,255,0.08) provocará falsos positivos masivos en las pruebas de estilo mate a menos que mate_style_checker.mjs sea ajustado para excluir sombras o clasificar fondos separadamente]
           ↓
[Observación: 15 suites de pruebas verifican 160 páginas HTML, 361 schemas JSON-LD, 0 broken links, ids de anclas e interfaces de Quiz]
           ↓
[Deducción 4: El rediseño visual debe preservar al 100% las URLs canónicas, slots de BaseLayout, ids (#conflicto, #quiz-modal-container), data-attributes (data-open-quiz, data-symptom, data-city) y la fórmula del diagnóstico en WhatsAppQuizModal]
```

---

## 3. Caveats

1. **Dependencia de GSAP aún no instalada:** `package.json` no tiene declarada la dependencia `gsap`. Se debe instalar vía `npm install gsap` o importar como bundle en los scripts de Astro.
2. **Alcance de los Tests Existentes:** Los tests actuales (`tier1-4` y `adversarial`) fueron diseñados en torno a los requerimientos de la Fase 1 (modo sólido mate estricto con oro satinado). No existen tests que certifiquen los nuevos criterios del rediseño (cero amarillo, `rounded-[2.5rem]`, botones píldora blancos, GSAP e indicador de scroll).
3. **Censo de Ciudades:** Aunque el requerimiento R4 menciona "114 páginas dinámicas de ciudades", el censo real de datos en `dataset_almaholistica_ciudades.csv` es de 113 filas (ciudades), totalizando con Home, Catálogo y las 45 dolencias exactamente 160 páginas HTML en `dist/`. No se deben alterar los datasets para no romper la correspondencia 1:1 con los sitemaps.
4. **Modo Read-Only Respetado:** En estricto cumplimiento del rol de Explorer, no se modificó ningún archivo de código fuente del proyecto ni de tests fuera de la carpeta `.agents/teamwork_preview_explorer_survey_redesign_3/`.

---

## 4. Conclusion

El rediseño de alta gama de Alma Holística requiere una intervención coordinada en tres frentes:

### 4.1. Auditoría de Impacto en Rutas Dinámicas y Modal WhatsApp
- **`src/pages/[slug].astro`:**
  - Migrar los 11 puntos con `#D4AF37` a `#38BDF8` o paleta Slate/Blanco.
  - Reemplazar botones primarios por `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`.
  - Transformar tarjetas a `rounded-[2.5rem]`, padding `p-10 lg:p-14` y bordes `border border-slate-800/40`.
  - **Inviolable:** Mantener `getStaticPaths()`, `canonicalUrl`, schemas inyectados y `data-open-quiz="true"` con `data-city={rawSlug}`.
- **`src/pages/biodescodificacion/[slug].astro`:**
  - Migrar los 12 puntos con `#D4AF37` a `#38BDF8`/Slate.
  - Aplicar botones píldora blancos en Hero, sección intermedia y banner final.
  - Aplicar `rounded-[2.5rem]` a las tarjetas de sección y cita de reprogramación.
  - **Inviolable:** Mantener `getStaticPaths()`, `id="conflicto"`, preguntas de reflexión, FAQs, aviso médico y `data-symptom={nombre}`.
- **`src/pages/biodescodificacion/index.astro`:**
  - Migrar los 8 puntos con `#D4AF37` en filtros y tarjetas.
  - Adaptar las 45 `.dolencia-item-card` a `rounded-[2.5rem]`.
  - **Inviolable:** Mantener `data-sistema`, `data-search-text`, buscador por JS y enlaces a las 45 fichas temáticas.
- **`src/components/react/WhatsAppQuizModal.tsx`:**
  - Cambiar contenedor exterior a `rounded-[2.5rem]`.
  - Eliminar `#D4AF37` en los 3 puntos identificados (subtítulo, contador de pasos, badge de diagnóstico).
  - Transformar botones de avance ("Continuar", "Generar Diagnóstico") y CTA final de WhatsApp a estilo píldora blanco.
  - **Inviolable:** Atributos WAI-ARIA, `data-quiz-modal="true"`, `data-quiz-final="true"`, fórmula exacta de diagnóstico (`Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`), y auto-avance a paso 2 (`setStep(2)`) ante síntoma precargado.

### 4.2. Mapeo de Tests Existentes que Requieren Actualización de Aserciones
| Archivo de Prueba | Línea / Test | Aserción Antigua | Adaptación Requerida para Rediseño |
|---|---|---|---|
| `tests/helpers/contracts.mjs` | 53-62 (`COLOR_PALETTE`) | `secondaryAccentGold: '#D4AF37'`, `secondaryAccentAmber: '#F59E0B'` | Actualizar a paleta bicolor depurada (`abyssalBackground: '#060A1A'`, `primaryAction: '#38BDF8'`, `textLight: '#FFFFFF'`, `slate: '#94A3B8'`). Eliminar acentos oro/ámbar. |
| `tests/tier1_features.test.mjs` | 283-286 (`T1.6.4`) | `assert.equal(COLOR_PALETTE.secondaryAccentGold, '#D4AF37')` | Reemplazar por validación de ausencia de oro/ámbar y presencia de paleta bicolor con botón píldora blanco. |
| `tests/helpers/mate_style_checker.mjs` | 10 (`FORBIDDEN_STYLE_PATTERNS`) | Regex prohíbe cualquier `rgba(..., 0.x)` | Refinar regex para prohibir fondos (`bg-` o `background:` con rgba) pero permitir sombras sutiles como `shadow-[...rgba(255,255,255,0.08)]`. |
| `tests/helpers/mate_style_checker.mjs` | 21 (`MANDATORY_COLOR_TOKENS`) | `'#D4AF37'` en tokens obligatorios | Remover `'#D4AF37'` de la lista obligatoria y añadir validación de ausencia de amarillo. |
| `tests/adversarial_matte_cls_m2_1.test.mjs` | 154 (`ADV-M2.1.4`) | `assert.ok(twContent.includes('#D4AF37'))` | Invertir la aserción: `assert.ok(!twContent.includes('#D4AF37'))` y certificar paleta bicolor. |
| `tests/adversarial_matte_cls_m2_1.test.mjs` | 157 (`ADV-M2.1.4`) | `assert.ok(!twContent.includes('rgba('))` | Ajustar aserción para que permita la sombra de alta gama del botón píldora. |
| `tests/adversarial_assets_config_m2_2.py` | 197 (`Test 4`) | `"D4AF37": "Oro Satinado"` en `expected_colors` | Remover `"D4AF37"` de `expected_colors` de `tailwind.config.mjs` y validar que no exista en el archivo. |

### 4.3. Especificación de Nuevos Casos de Prueba Requeridos
Se deben crear suites de prueba complementarias (ej: `tests/redesign_compliance.test.mjs`) que verifiquen:
1. **Certificación de Cero Amarillo / Dorado:**
   - Escanear todo `src/` y `dist/` asegurando 0 coincidencias de `#D4AF37`, `#F59E0B`, `badge-gold`, `subheading-gold` o clases `text-amber-`, `bg-amber-`, `text-yellow-`, `bg-yellow-`.
2. **Certificación de Botones Píldora Blancos:**
   - Verificar que en `index.html`, `Navbar.astro`, `[slug].html`, `biodescodificacion/[slug].html` y `WhatsAppQuizModal.tsx`, los botones principales de acción tengan clases `rounded-full` y fondo blanco `bg-white text-[#060A1A]`.
3. **Certificación de Tarjetas `rounded-[2.5rem]`:**
   - Verificar la presencia de `rounded-[2.5rem]` en las tarjetas principales de dolencias, servicios y en el contenedor del modal de WhatsApp.
4. **Certificación de Animaciones GSAP:**
   - Verificar que `gsap` esté instalado en `package.json`.
   - Verificar en `src/pages/index.astro` o componentes la presencia de inicialización de GSAP (Hero entrance staggered fade-in).
5. **Certificación de Indicador de Scroll:**
   - Verificar en `src/pages/index.astro` la presencia del indicador de scroll vertical de 1px (`w-[1px] h-16 bg-slate-800`).
6. **Certificación de Carga Tipográfica Editorial:**
   - Verificar en `BaseLayout.astro` la carga de fuentes editoriales (*Cormorant Garamond* / *Cinzel* e *Inter* / *Plus Jakarta Sans*) con `preconnect` y sin saltos de maquetación (`CLS = 0`).

### 4.4. Artefactos SEO y E-E-A-T que se Mantienen 100% Intactos
- Generador `scripts/generate_sitemap.py` y archivos resultantes `public/sitemap-index.xml`, `public/sitemap-0.xml`, `public/sitemap.xml`, `public/robots.txt`.
- Esquemas JSON-LD en `src/lib/schema.ts` (361 esquemas en las 160 páginas).
- Archivo de autoridad y GEO `public/llms.txt`.
- Datasets maestros `src/data/dataset_almaholistica_ciudades.csv` y `src/data/dataset_biodescodificacion_dolencias.json`.

---

## 5. Verification Method

Para verificar independientemente este reporte:

1. **Inspección de ocurrencias de color dorado/amarillo en templates:**
   ```bash
   grep -rn "D4AF37" src/pages/ src/components/ src/styles/
   ```
   *Condición de éxito:* Se listarán las 65 ocurrencias identificadas que deben ser saneadas durante la fase de implementación.

2. **Verificación de aserciones de estilo en tests:**
   ```bash
   grep -rn "D4AF37" tests/
   ```
   *Condición de éxito:* Confirma las 5 referencias en `contracts.mjs`, `tier1_features.test.mjs`, `adversarial_matte_cls_m2_1.test.mjs`, `mate_style_checker.mjs` y `adversarial_assets_config_m2_2.py`.

3. **Demostración de falso positivo de `mate_style_checker.mjs` ante el botón píldora:**
   ```bash
   node -e "import('./tests/helpers/mate_style_checker.mjs').then(m => { console.log(m.auditMateStyleContent('shadow-[0_8px_24px_rgba(255,255,255,0.08)]')); });"
   ```
   *Condición de éxito:* El resultado mostrará `passed: false` con la violación `"Colores RGBA transparentes prohibidos en superficies"`, probando concluyentemente que el checker debe ser adaptado.

4. **Verificación de paso actual de la suite completa antes del rediseño:**
   ```bash
   npm test
   node --test tests/adversarial_*.test.mjs
   python3 tests/adversarial_assets_config_m2_2.py
   python3 tests/adversarial_cities_m1_2.py
   python3 tests/adversarial_m5_sitemaps_schema.py
   python3 tests/adversarial_m6_stress_harness.py
   ```
   *Condición de éxito:* 100% de paso (150 tests unitarios, 172 adversariales Node, 4 suites Python).

5. **Condición de Invalidación:**
   Este reporte quedaría invalidado si se demuestra que `shadow-[0_8px_24px_rgba(255,255,255,0.08)]` no activa la regla de `rgba` en `mate_style_checker.mjs`, o si se demuestra que existe alguna dolencia o ciudad fuera del censo de 160 páginas.
