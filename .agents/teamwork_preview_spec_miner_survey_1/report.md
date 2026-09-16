# Reporte de Especificación y Minería Técnica: SEO-GEO, llms.txt y Blindaje Adversarial

**Autor:** `teamwork_preview_spec_miner_survey_1`  
**Destinatario:** `teamwork_preview_orchestrator_8`  
**Fecha:** 2026-09-16T00:21:00Z  
**Fuentes Autoritativas:**  
1. `ORIGINAL_REQUEST.md` (específicamente sección `## Follow-up — 2026-09-16T00:16:05Z`)  
2. `tests/adversarial_mr3_challenger_2.test.mjs`  
3. `tests/adversarial_mr3_challenger.test.mjs`  
4. `tests/adversarial_m5_sitemaps_schema.py`  
5. `tests/adversarial_jsonld_robots_m5_2.test.mjs`  
6. `tests/adversarial_assets_config_m2_2.py`  
7. `tests/adversarial_m6_stress_harness.py`  
8. `tests/adversarial_m6_final_qa.test.mjs`  
9. `tests/tier1_features.test.mjs` a `tier4_user_journeys.test.mjs`  
10. `src/data/dataset_almaholistica_ciudades_eeat_geo.json`  
11. `src/data/dataset_biodescodificacion_dolencias.json`  
12. `src/data/dataset_almaholistica_ciudades.csv`  

---

## 1. Resumen Ejecutivo de la Misión

Se ha realizado una auditoría exhaustiva de la especificación técnica y de todas las suites de prueba existentes (150 tests unitarios/integración, 244 tests adversariales en JS/MJS y arneses de estrés en Python) para el seguimiento `2026-09-16T00:16:05Z`.

El propósito es guiar la implementación y validación de las optimizaciones recomendadas por el Consejo de IA para posicionamiento GEO (Generative Engine Optimization en ChatGPT, Perplexity y Google AI Overviews) sin romper ninguna de las estrictas invariantes del sistema (160 páginas SSG, 361 esquemas JSON-LD, Cero CLS, estética sólido mate, número de WhatsApp verificado `573151206985` y trailing slashes canónicos).

---

## 2. Matriz de Requerimientos y Restricciones Técnicas

### 2.1. Sanitización Crítica y Sincronización de `public/llms.txt` (R1)
- **Teléfono Oficial Verificado:** Sustituir indefectiblemente el número provisional `+57 300 000 0000` por el número oficial del portal: `+57 315 1206985`.
- **Eradicación de Placeholders:** Cero apariciones de cadenas `300 000 0000`, `3000000000` o `573000000000` en `public/llms.txt` ni en `dist/llms.txt`.
- **Prefijo Canónico de Ciudades y Trailing Slashes:** Corregir las URLs de ciudades que carecían del prefijo `biodescodificacion-`. Cada ciudad debe enlazar exactamente a su ruta canónica con trailing slash:
  - Ej: `https://almaholistica.com/biodescodificacion-bogota/` (no `/bogota/`)
  - Ej: `https://almaholistica.com/biodescodificacion-madrid/` (no `/madrid/`)
  - Ej: `https://almaholistica.com/biodescodificacion-cdmx/` (no `/cdmx/`)
- **Directrices de Rastreo de IA:** Reflejar la cobertura en 20 países, el catálogo completo de 45 patologías y la metodología clínica basada en Psiconeuroinmunología, Hamer, Flèche y Lipton.
- **Réplica en `dist/`:** `dist/llms.txt` debe replicar de forma exacta e idéntica el archivo tras `npm run build`.

### 2.2. Anclaje de Entidad en el Primer Párrafo de la Home (`src/pages/index.astro`) (R2)
- **Declaración Temprana:** El primer párrafo de texto visible en `src/pages/index.astro` (en el Hero) debe contener la frase explícita `"Alma Holística es"` dentro de sus primeros 50 caracteres.
- **Sujeto Gramatical en < 200 caracteres:** Declarar inequívocamente la entidad en los primeros 200 caracteres:
  > *"Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países..."*
- **Preservación Visual y Animaciones:** Mantener las clases `.gsap-hero-el`, la animación orgánica de `.hero-floating-aura`, el selector `prefers-reduced-motion` y los tokens de color abisal (`#060A1A`, `#0A1226`, `#0E172F`, `#1E293B`, `#38BDF8`).
- **Restricción Adversarial Crítica MR3-CH2-4.5 / MR3-ADV-4.1:**  
  **`dist/index.html` DEBE CONTENER EXACTAMENTE 0 BLOQUES `<script type="application/ld+json">`**.  
  *Justificación forense:* Los tests `tests/adversarial_mr3_challenger_2.test.mjs` (Línea 247), `tests/adversarial_mr3_challenger.test.mjs` (Línea 195), `tests/adversarial_m5_sitemaps_schema.py` (Línea 191) y `tests/adversarial_jsonld_robots_m5_2.test.mjs` (Línea 87) fallarán catastróficamente si se inserta cualquier script JSON-LD en la home o en el índice general de biodescodificación.

### 2.3. Bloque Canónico de Citabilidad RAG en las 45 Dolencias (`src/pages/biodescodificacion/[slug].astro`) (R3)
- **Extensión Estricta:** Entre 134 y 167 palabras (el criterio de aceptación define una tolerancia de entre 130 y 170 palabras).
- **Ubicación:** Ubicado antes del desglose detallado (estratégicamente entre el Hero de la dolencia y el módulo didáctico `#en-palabras-simples`).
- **Estructura Interna en 2 Segmentos:**
  1. *Segmento 1 (Primeras 40-50 palabras):* Respuesta directa y quirúrgica definiendo:
     `[Nombre de la Patología] + [Sistema Biológico Afectado] + [Conflicto Emocional Raíz Inconsciente] + [Sentido Biológico Adaptativo]`.
  2. *Segmento 2 (Siguientes 80-100 palabras):* Explicación concisa de las fases biológicas del síntoma (fase de estrés activo / simpaticotonía vs. fase de vagotonía / reparación y curación tisular), protocolo de reprogramación bioemocional y descargo ético de que la biodescodificación complementa sin sustituir el tratamiento médico alopático facultativo.
- **Preservación de Esquemas:** Las 45 páginas de dolencias deben mantener exactamente sus 3 esquemas JSON-LD (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`).

### 2.4. Visibilidad de Autoridad y E-E-A-T Clínico (R4)
- **Fuente de Datos:** `src/data/dataset_almaholistica_ciudades_eeat_geo.json`.
- **Especialistas Certificados:**
  - Lic. Sofía Alarcón Valdés (Reg. ITH-8492, +9 años exp, 1.400+ sesiones).
  - Dr. Mateo Benavides Rivas (Reg. AIE-5120, +11 años exp, 1.800+ pacientes).
  - Dra. Elena Monsalve Duarte (Reg. CIT-6311, +8 años exp, 1.200+ casos).
- **Pilares Metodológicos:** Psiconeuroinmunología Clínica (PNI), 5 Leyes Biológicas de la Nueva Medicina Germánica (Dr. Ryke Geerd Hamer), Descodificación Biológica (Christian Flèche), Epigenética y Biología Celular (Dr. Bruce Lipton), SBS (Programa Biológico Especial con Pleno Sentido).
- **Descargo Médico Explícito:** Acompañamiento complementario que no sustituye ni interrumpe la medicina alopática tradicional.
- **Restricción de Schemas en Páginas de Ciudades:** Las 113 páginas de ciudades deben conservar EXACTAMENTE 2 esquemas (`HealthAndBeautyBusiness` y `BreadcrumbList`). No añadir esquemas adicionales en el código HTML de las ciudades, ya que el censo global exige exactamente 361 esquemas en el sitio.

### 2.5. Trailing Slashes y Censo Biyectivo de URLs (R5)
- **`astro.config.mjs`:** `trailingSlash: 'always'`.
- **Formato Canónico:** Toda URL generada o enlazada internamente debe finalizar en `/`.
- **Censo de Páginas SSG en `dist/`:** Exactamente 160 archivos HTML:
  - 1 `dist/index.html`
  - 1 `dist/biodescodificacion/index.html`
  - 113 `dist/biodescodificacion-{ciudad}/index.html`
  - 45 `dist/biodescodificacion/{slug}/index.html`
- **Censo de Esquemas JSON-LD:** Exactamente 361 scripts `application/ld+json`:
  - 0 en Home (`dist/index.html`)
  - 0 en Catálogo (`dist/biodescodificacion/index.html`)
  - 226 en Ciudades (113 páginas × 2 esquemas)
  - 135 en Dolencias (45 páginas × 3 esquemas)
  - Total: 0 + 0 + 226 + 135 = 361.

---

## 3. Características Descubiertas (Features Discovered)

| # | Categoría | Feature | Descripción | Inputs | Outputs | Error Behavior | Discovered Via |
|---|-----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | GEO / Crawlers | Sincronización `llms.txt` | Archivo estático que comunica a crawlers de LLM la identidad, autoridad, catálogo de 45 dolencias, enlaces canónicos de ciudades y WhatsApp oficial. | Petición HTTP GET `/llms.txt` | Texto plano Markdown con secciones E-E-A-T, URLs con prefijo canónico y WhatsApp `+57 315 1206985`. | Si contiene `+57 300 000 0000` o URLs sin `biodescodificacion-`, falla criterio de aceptación R1. | `public/llms.txt`, `ORIGINAL_REQUEST.md` R1 |
| 2 | SEO On-Page | Anclaje de Entidad en Home | Primer párrafo del Hero en `index.astro` declara la entidad como sujeto sintáctico en los primeros 50 y 200 caracteres. | Visita a `/` | Texto renderizado: "Alma Holística es una plataforma clínica de biodescodificación..." | Si el primer párrafo omite "Alma Holística es" o excede 50 caracteres antes de la declaración, viola R2. | `src/pages/index.astro`, `ORIGINAL_REQUEST.md` R2 |
| 3 | Restricción SEO | Invariante Cero JSON-LD en Home | Prohibición estricta de scripts `<script type="application/ld+json">` en `dist/index.html`. | Compilación SSG de `index.astro` | `dist/index.html` sin etiquetas JSON-LD. | Si se inyecta algún JSON-LD en la home, fallan los tests MR3-CH2-4.5 y ADV-M5.2.2. | `tests/adversarial_mr3_challenger_2.test.mjs:247`, `tests/adversarial_mr3_challenger.test.mjs:195` |
| 4 | Citabilidad RAG | Bloque RAG Modular en Dolencias | Sección destacada en cada una de las 45 dolencias de 134 a 167 palabras, estructurada para ser extraída por retrievers de IA. | Datos de dolencia (`nombre`, `sistema`, `conflictoEmocional`, `sentidoBiologico`, etc.) | Bloque HTML visible con definición en primeras 40-50 palabras y fases/reprogramación en 80-100 palabras. | Si el conteo de palabras es <130 o >170 palabras, falla el criterio de aceptación R3. | `src/pages/biodescodificacion/[slug].astro`, `ORIGINAL_REQUEST.md` R3 |
| 5 | E-E-A-T | Presentación de Autoridad Clínica | Módulo de respaldo profesional con especialistas registrados (ITH-8492, AIE-5120, CIT-6311) y metodologías científicas (PNI, Hamer, Flèche, Lipton). | `dataset_almaholistica_ciudades_eeat_geo.json` | Ficha técnica visible en UI con credenciales y descargo médico. | No debe alterar la cantidad de esquemas JSON-LD en páginas de ciudades (mantener en 2). | `src/data/dataset_almaholistica_ciudades_eeat_geo.json`, `ORIGINAL_REQUEST.md` R4 |
| 6 | Integridad URLs | Trailing Slash Estricto | Todas las URLs en sitemaps, canonical tags y enlaces internos terminan en `/`. | Rutas generadas por Astro | URLs con formato `https://almaholistica.com/{slug}/`. | Si alguna URL omite la barra final, fallan `adversarial_m5_sitemaps_schema.py` y `adversarial_challenger_m5.test.mjs`. | `astro.config.mjs`, `tests/adversarial_m5_sitemaps_schema.py:50` |
| 7 | Conversión | WhatsApp CTA y Quiz Interception | Todos los enlaces directos a WhatsApp y botones de evaluación apuntan al teléfono oficial `573151206985` y disparan el Quiz Modal. | Clic en CTA o enlace `wa.me` | Apertura de modal interactivo de 4 pasos o fallback con URL formateada `https://wa.me/573151206985?text=...`. | Si el número difiere de `573151206985` o falta parámetro `text=`, fallan M6.3.1 y M6.3.2. | `tests/adversarial_m6_final_qa.test.mjs:206`, `tests/adversarial_m6_stress_harness.py:253` |
| 8 | Rendimiento | Prevención de CLS (CLS = 0) | Todas las imágenes `<img>` tienen `width` y `height` explícitos; todos los SVGs tienen `viewBox` o dimensiones. | Carga de página en navegador | Renderizado sin saltos de layout durante la carga de recursos visuales. | Si una imagen o SVG carece de atributos dimensionales, falla `adversarial_m6_stress_harness.py` Dimensión 2. | `tests/adversarial_m6_stress_harness.py:200`, `tests/adversarial_mr3_challenger_2.test.mjs:98` |
| 9 | Diseño Visual | Paleta Sólido Mate Bicolor | Erradicación total de tonos amarillos/dorados (`#F59E0B`, `#D4AF37`) y efectos de transparencia (`backdrop-blur`, neón). | Clases CSS y estilos inline | Fondos 100% opacos en `#060A1A`, `#0A1226`, `#0E172F`, bordes `#1E293B`, botones `#38BDF8` o píldora blanca. | Si se detecta hex amarillo o clase translúcida, fallan los tests MR3-ADV-5.1 y ADV-M2.1.1. | `tests/helpers/mate_style_checker.mjs`, `tests/adversarial_mr3_challenger.test.mjs:209` |
| 10 | Sitemaps | Arquitectura SitemapFast | Generación de `sitemap-index.xml`, `sitemap-0.xml`, `sitemap.xml` y `robots.txt` con réplica idéntica en `dist/`. | Ejecución de `scripts/generate_sitemap.py` | Archivos XML y TXT con 160 URLs únicas biyectivas a los archivos HTML de `dist/`. | Si hay desajuste en bytes o número de URLs diferente de 160, fallan las dimensiones 1 a 4 de M5. | `scripts/generate_sitemap.py`, `tests/adversarial_m5_sitemaps_schema.py` |

---

## 4. Casos de Borde (Edge Cases)

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | `public/llms.txt` | Consulta de crawler IA a `https://almaholistica.com/llms.txt` | Debe devolver el teléfono verificado `+57 315 1206985` y URLs con `/biodescodificacion-{ciudad}/`. Anteriormente devolvía `+57 300 000 0000` y URLs rotas como `/bogota/`. |
| 2 | Home Hero Entity Anchor | Análisis semántico de los primeros 50 y 200 caracteres de `src/pages/index.astro` | El texto actual comenzaba con *"La biodescodificación demuestra..."*. Debe comenzar con *"Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países..."*. |
| 3 | Home JSON-LD Isolation | Verificación de scripts `application/ld+json` en `dist/index.html` | Debe contener exactamente 0 scripts JSON-LD. Si un desarrollador intenta inyectar `Organization` o `WebSite` en `index.astro`, romperá de inmediato `MR3-CH2-4.5`, `MR3-ADV-4.1`, `adversarial_m5_sitemaps_schema.py` (Dim 5) y `adversarial_jsonld_robots_m5_2.test.mjs`. |
| 4 | Conteo de Palabras Bloque RAG | Renderizado del bloque RAG en dolencias con nombres muy largos (ej. `Colon Irritable (Síndrome de Intestino Irritable)` o `Angustia, Opresión en el Pecho y Disnea Funcional`) | La plantilla o función de interpolación debe calibrar el texto para mantenerse estrictamente entre 134 y 167 palabras (o dentro del rango 130-170), evitando truncamientos que dejen oraciones incompletas o palabras flotantes. |
| 5 | Respuestas directas RAG | Motores de búsqueda RAG extrayendo los primeros 250 caracteres del bloque | Las primeras 40-50 palabras deben responder de forma autosuficiente sin pronombres ambiguos: *"La biodescodificación de [Patología] aborda este síntoma del sistema [Sistema] como la manifestación somática de un conflicto biológico de [Conflicto]..."*. |
| 6 | Integración E-E-A-T en Ciudades | Carga de `dataset_almaholistica_ciudades_eeat_geo.json` en `src/pages/[slug].astro` | El dataset contiene 113 registros de ciudades con `EEAT_Especialista_Nombre`, `EEAT_Autoridad_Cientifica` y `EEAT_Confiabilidad_Descargo`. Deben renderizarse como componentes HTML visuales sin inyectar nuevos scripts JSON-LD en la cabecera, preservando los 2 esquemas existentes por ciudad. |
| 7 | Trailing Slashes en Enlaces Internos | Enlaces de ciudad en footer, buscador dinámico o breadcrumbs | Cualquier enlace hacia una ciudad debe formularse como `/${slug}/` (ej. `/biodescodificacion-bogota/`). Omitir la barra final causaría redirecciones o fallos en los tests de enlaces estáticos. |
| 8 | Generación de WhatsApp URL con caracteres especiales | Síntomas con comillas, tildes, signos `&`, `?`, `=`, emojis | La función `buildWhatsAppUrl()` en `src/config/site.ts` sanitiza y codifica correctamente con `encodeURIComponent`, manteniendo el prefijo `https://wa.me/573151206985?text=...` sin fragmentar la URL ni permitir inyecciones XSS. |
| 9 | Preservación de Animaciones GSAP | Carga de `index.astro` en dispositivos con `prefers-reduced-motion: reduce` | Las animaciones GSAP no deben ejecutarse o deben aplicar `clearProps: 'transform,opacity'` inmediatamente para evitar elementos invisibles o bloqueos de renderizado. |
| 10 | Conteo Global de Esquemas JSON-LD | Auditoría forense en `dist/` tras `npm run build` | El total global debe ser exactamente 361: 113 ciudades × 2 = 226; 45 dolencias × 3 = 135; Home = 0; Catálogo = 0. Total: 361. Cualquier desviación fallará `ADV-M5.2.2`. |

---

## 5. Resumen de Suites de Prueba Existentes y Comandos de Verificación

1. **Compilación SSG:**
   ```bash
   npm run build
   # Debe ejecutar astro check && astro build
   # Genera exactamente 160 archivos HTML en dist/
   ```

2. **Suite Unitaria e Integración (Tier 1 a Tier 4):**
   ```bash
   npm test
   # Ejecuta: node --test tests/tier1_features.test.mjs tests/tier2_edge_cases.test.mjs tests/tier3_cross_feature.test.mjs tests/tier4_user_journeys.test.mjs
   # Estado verificado: 150/150 pasados, 0 fallos.
   ```

3. **Suite Adversarial Completa (14 archivos .test.mjs):**
   ```bash
   node --test tests/adversarial_*.test.mjs
   # Estado verificado: 244/244 pasados, 0 fallos.
   ```

4. **Suite Adversarial de Activos y Configuración (Python):**
   ```bash
   python3 tests/adversarial_assets_config_m2_2.py
   # Estado verificado: 6 pruebas pasadas, 0 errores, 0 warnings.
   ```

5. **Arnés de Estrés Estático Forense M6 (Python):**
   ```bash
   python3 tests/adversarial_m6_stress_harness.py
   # Estado verificado: 6 dimensiones pasadas sobre las 160 páginas, 0 errores.
   ```

6. **Auditoría Forense de Schemas y Sitemaps M5 (Python):**
   ```bash
   python3 tests/adversarial_m5_sitemaps_schema.py
   # Estado verificado: 6 dimensiones pasadas, 361 esquemas JSON-LD confirmados.
   ```

---

## 6. Conclusión y Recomendaciones para la Fase de Implementación

1. **`public/llms.txt`**: Modificar el archivo en `public/llms.txt` sustituyendo `+57 300 000 0000` por `+57 315 1206985` y agregando el prefijo `/biodescodificacion-` a las ciudades mencionadas. Al ejecutar el build, se sincronizará automáticamente en `dist/llms.txt`.
2. **Hero de `src/pages/index.astro`**: Sustituir el primer `<p class="gsap-hero-el...">` por el texto que ancla formalmente la entidad: *"Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países..."*. **Bajo ninguna circunstancia añadir etiquetas `<script type="application/ld+json">` a `index.astro`**.
3. **Bloque RAG en `src/pages/biodescodificacion/[slug].astro`**: Añadir un componente o bloque modular estilizado con la estética sólido mate antes del desglose didáctico. Diseñar el texto para que genere dinámicamente entre 134 y 167 palabras, cumpliendo la estructura de respuesta directa en las primeras 40-50 palabras y fases biológicas / reprogramación en las siguientes 80-100 palabras.
4. **E-E-A-T en `src/pages/[slug].astro`**: Importar los datos de `dataset_almaholistica_ciudades_eeat_geo.json` y renderizar la ficha del terapeuta asignado y el bloque metodológico (PNI, Hamer, Flèche, Lipton) con el descargo de responsabilidad médica. Asegurar que no se alteren los 2 esquemas JSON-LD preexistentes.
5. **Comprobación de Calidad**: Reejecutar `npm run build`, `npm test`, `node --test tests/adversarial_*.test.mjs`, `python3 tests/adversarial_assets_config_m2_2.py` y `python3 tests/adversarial_m6_stress_harness.py` para asegurar que el pase del 100% de las pruebas se mantenga inalterado.
