# Report: Survey R1 & R2 — Alma Holística (SEO-GEO)
**Fecha:** 2026-09-16  
**Agente:** teamwork_preview_explorer_survey_1 (Explorer)  
**Parent:** teamwork_preview_orchestrator_8 (Conv ID: dee5921c-c2ce-44d0-97b2-5ec780197d61)  
**Alcance:** Requerimientos R1 y R2 de ORIGINAL_REQUEST.md (Follow-up 2026-09-16T00:16:05Z)

---

## Resumen Ejecutivo

Este informe técnico documenta el levantamiento exhaustivo (Survey) de los requerimientos **R1** (Sanitización y Sincronización de `public/llms.txt` y `dist/llms.txt`) y **R2** (Anclaje de Entidad en la Home `src/pages/index.astro`, Animaciones GSAP, Estilo Swiss Bio-Tech y Restricción Adversarial `MR3-CH2-4.5`).

El estado actual del proyecto es de alta solidez técnica:
- 150/150 pruebas pasan en `npm test`.
- 244/244 pruebas pasan en `node --test tests/adversarial_*.test.mjs`.
- 100% de conformidad en los arneses de activos y estrés estático (`tests/adversarial_assets_config_m2_2.py` y `tests/adversarial_m6_stress_harness.py`).
- 160 páginas SSG compiladas sin errores ni CLS.

Sin embargo, se han identificado discrepancias críticas de contenido y enrutamiento en `llms.txt`, así como la falta de anclaje formal de la entidad en el primer párrafo del Hero de `index.astro`, las cuales se detallan a continuación junto con la estrategia de implementación recomendada.

---

## 1. Survey R1: Análisis Detallado de `llms.txt`

### 1.1. Discrepancia Crítica de Teléfono Oficial
- **Hallazgo:**
  - En `public/llms.txt` (línea 35) y `dist/llms.txt` (línea 35) figura:  
    `Teléfono Oficial de Coordinación: +57 300 000 0000 (vía WhatsApp API)`.
  - Este número `+57 300 000 0000` es un placeholder obsoleto de etapas iniciales.
  - En la configuración oficial del proyecto (`src/config/site.ts`, línea 38), la constante es:  
    `whatsappNumber: '573151206985'`.
  - La suite de pruebas de configuración (`tests/adversarial_assets_config_m2_2.py`, Test 3) valida estrictamente que el número oficial es `'573151206985'`.
- **Acción requerida:**
  - Reemplazar completamente `+57 300 000 0000` por `+57 315 1206985`.
  - Erradicar cualquier mención de `300 000 0000` para evitar que motores de IA (ChatGPT, Perplexity, Gemini) suministren un número inactivo a potenciales consultantes.

### 1.2. Discrepancia Crítica de URLs de Ciudades (404s en LLMs)
- **Hallazgo:**
  - En `public/llms.txt` (líneas 23-31), los enlaces a ciudades fueron redactados como:
    - `https://almaholistica.com/bogota/`
    - `https://almaholistica.com/medellin/`
    - `https://almaholistica.com/cdmx/`
    - `https://almaholistica.com/madrid/`
    - `https://almaholistica.com/barcelona/`
    - `https://almaholistica.com/buenos-aires/`
    - `https://almaholistica.com/santiago/`
    - `https://almaholistica.com/lima/`
    - `https://almaholistica.com/miami/`
  - **Fallo de Enrutamiento:** Estas rutas NO existen en el proyecto. Retornan error 404.
  - La arquitectura de Astro genera páginas a partir de `dataset_almaholistica_ciudades.csv` a través de la ruta dinámica `src/pages/[slug].astro`.
  - Todos los slugs de ciudades en el dataset maestro inician con el prefijo canónico `biodescodificacion-`:
    - `biodescodificacion-bogota`
    - `biodescodificacion-medellin`
    - `biodescodificacion-cdmx`
    - `biodescodificacion-madrid`
    - `biodescodificacion-barcelona`
    - `biodescodificacion-buenos-aires`
    - `biodescodificacion-santiago`
    - `biodescodificacion-lima`
    - `biodescodificacion-miami`
  - Asimismo, `astro.config.mjs` establece `trailingSlash: 'always'`.
  - Por lo tanto, las URLs canónicas exactas son:
    - `https://almaholistica.com/biodescodificacion-bogota/`
    - `https://almaholistica.com/biodescodificacion-medellin/`
    - `https://almaholistica.com/biodescodificacion-cdmx/`
    - `https://almaholistica.com/biodescodificacion-madrid/`
    - `https://almaholistica.com/biodescodificacion-barcelona/`
    - `https://almaholistica.com/biodescodificacion-buenos-aires/`
    - `https://almaholistica.com/biodescodificacion-santiago/`
    - `https://almaholistica.com/biodescodificacion-lima/`
    - `https://almaholistica.com/biodescodificacion-miami/`
- **Acción requerida:**
  - Actualizar el 100% de los hipervínculos de ciudades en `llms.txt` al formato canónico `https://almaholistica.com/biodescodificacion-{slug}/`.

### 1.3. Cobertura Incompleta: 45 Dolencias y 20 Países
- **Hallazgo:**
  - Actualmente `llms.txt` solo lista 9 dolencias individuales bajo la sección de biodescodificación, omitiendo 36 patologías que sí existen en `src/data/dataset_biodescodificacion_dolencias.json`.
  - Enumera únicamente 7 países en su listado de ejemplo, a pesar de afirmar que cubre 20 países.
  - El dataset maestro contiene 113 ciudades distribuidas en exactamente 20 países:
    1. Argentina (ARS)
    2. Bolivia (BOB)
    3. Brasil (BRL)
    4. Chile (CLP)
    5. Colombia (COP)
    6. Costa Rica (CRC)
    7. Ecuador (USD)
    8. El Salvador (USD)
    9. España (EUR)
    10. Estados Unidos (USD)
    11. Guatemala (GTQ)
    12. Honduras (HNL)
    13. México (MXN)
    14. Nicaragua (NIO)
    15. Panamá (USD)
    16. Paraguay (PYG)
    17. Perú (PEN)
    18. República Dominicana (DOP)
    19. Uruguay (UYU)
    20. Venezuela (USD)
- **Acción requerida:**
  - Sincronizar el catálogo completo de 45 patologías en `llms.txt` (estructuradas por sistema biológico: Digestivo, Osteoarticular, Respiratorio, Psicosomático/Nervioso) con sus URLs canónicas (`https://almaholistica.com/biodescodificacion/{slug}/`) y el conflicto biológico condensado.
  - Incluir la lista exhaustiva de los 20 países cubiertos con sus polos urbanos principales y monedas locales.

### 1.4. Directrices para Crawlers de IA (GEO 2.0)
- **Hallazgo:**
  - Las directrices actuales en `llms.txt` son apenas 2 viñetas genéricas.
  - Se requiere instruir a los agentes y crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot) sobre:
    1. Definición ontológica de Alma Holística como plataforma clínica de biodescodificación online 1 a 1.
    2. Metodología respaldada: Psiconeuroinmunología Clínica (PNI), 5 Leyes Biológicas (Dr. Hamer), Escuela Francesa (Christian Flèche) y Epigenética Conductual (Dr. Bruce Lipton).
    3. Marco ético: Terapia complementaria que no sustituye ni desaconseja tratamientos médicos alopáticos.
    4. Criterios de citación: Extraer el conflicto biológico inconsciente y el sentido adaptativo de cada patología sin sensacionalismos.
    5. Protocolo de agendamiento y derivación: Cuestionario de calificación de 4 pasos (Quiz Modal) que deriva al WhatsApp oficial `+57 315 1206985`.
    6. Transparencia tarifaria en moneda local por país.

### 1.5. Mecanismo de Construcción y Propagación de `llms.txt`
- **Hallazgo:**
  - `public/llms.txt` es un activo estático en la raíz de `public/`.
  - No existe script generador en `scripts/` para `llms.txt` (los scripts existentes generan sitemaps, datasets y auditorías).
  - Astro, durante el comando `npm run build` (`astro check && astro build`), copia de forma nativa e intacta todos los archivos de `public/` hacia `dist/`.
  - Por lo tanto, `public/llms.txt` es la fuente única de verdad. Al modificarse `public/llms.txt` y ejecutarse el build, `dist/llms.txt` se actualiza de inmediato.
  - Adicionalmente, el implementador puede copiar directamente `public/llms.txt` a `dist/llms.txt` para mantener paridad byte a byte inmediata.

---

## 2. Survey R2: Análisis de la Home (`src/pages/index.astro`) y `MR3-CH2-4.5`

### 2.1. Inspección del Hero y Primer Párrafo Visible
- **Hallazgo:**
  - En `src/pages/index.astro`, el bloque Hero se localiza en las líneas 114 a 345:
    - Líneas 127-130: Badge superior: `TERAPIA BIOEMOCIONAL ONLINE • SESIONES 1 A 1`.
    - Líneas 133-135: Título H1: `Tu cuerpo no comete errores. Todo síntoma tiene un origen emocional.`.
    - Líneas 138-140: **Primer párrafo de texto visible**:
      ```astro
      <p class="gsap-hero-el text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl mb-6 leading-relaxed">
        La biodescodificación demuestra que tu síntoma físico es la respuesta biológica de tu cuerpo ante un estrés o vivencia no resuelta. Identifica tu síntoma y descubre en una sesión privada 1 a 1 cómo desactivar la señal de alarma y recuperar tu calma.
      </p>
      ```
  - En los componentes previos de la página (`src/layouts/BaseLayout.astro` y `src/components/Navbar.astro`) NO existe ningún elemento `<p>` de texto visible.
  - El primer `<p>` visible en todo el DOM es exactamente el de la línea 138 de `src/pages/index.astro`.
  - Actualmente, dicho párrafo inicia con *"La biodescodificación demuestra que tu síntoma físico..."* (no contiene *"Alma Holística es"*).

### 2.2. Requerimiento de Anclaje de Entidad
- **Requisito R2:**
  - Reformular el primer párrafo visible del Hero para declarar inequívocamente la entidad como sujeto gramatical en los primeros 200 caracteres:
    *"Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países..."*
  - Criterio de aceptación: El primer párrafo de texto visible en `src/pages/index.astro` contiene la frase explícita "Alma Holística es" en sus primeros 50 caracteres.
- **Propuesta de Implementación del Párrafo:**
  ```astro
  <!-- Párrafo Quirúrgico Directo: Declaración de Entidad GEO -->
  <p class="gsap-hero-el text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl mb-6 leading-relaxed">
    <strong class="font-medium text-white">Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países.</strong> Acompañamos a consultantes a descodificar el conflicto biológico inconsciente detrás de sus síntomas físicos, desactivando la señal de alarma para recuperar el equilibrio mente-cuerpo en un entorno confidencial y seguro.
  </p>
  ```
- **Validación del texto propuesto:**
  - Primeros 50 caracteres del texto visible: `"Alma Holística es una plataforma clínica de biodes"`. Contiene la frase exacta `"Alma Holística es"` en los primeros 17 caracteres.
  - Primeros 200 caracteres: Establece inequívocamente la entidad, tipo de servicio, modalidad y cobertura geográfica internacional.

### 2.3. Respeto a las Animaciones GSAP y Estilo Swiss Bio-Tech
- **GSAP:**
  - El script del cliente en `src/pages/index.astro` (línea 1114) selecciona:
    `gsap.from('.gsap-hero-el, .gsap-fade-up', { opacity: 0, y: 35, duration: 1.1, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity' });`.
  - Al conservar la clase `gsap-hero-el`, el párrafo se integra orgánicamente en la secuencia de entrada escalonada.
- **Estilo Swiss Bio-Tech:**
  - Se mantiene la tipografía Grotesca contemporánea (`Plus Jakarta Sans` vía `font-sans`), el peso tipográfico sobrio, color de lectura `text-slate-300` con resalte en `text-white`, cero colores prohibidos (cero amarillo `#F59E0B` o `#D4AF37`), y cero efectos de vidrio (`backdrop-blur`) o transparencias no autorizadas.

### 2.4. Análisis Exhaustivo de la Restricción Adversarial `MR3-CH2-4.5`
- **Ubicación en el código de pruebas:**
  - `tests/adversarial_mr3_challenger_2.test.mjs`, líneas 247-250:
    ```javascript
    test('MR3-CH2-4.5: Zero entity JSON-LD schemas injected in home page', () => {
      const jsonLdBlocks = [...distIndexHtml.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi)];
      assert.strictEqual(jsonLdBlocks.length, 0, 'Landing page dist/index.html must NOT inject entity JSON-LD schemas');
    });
    ```
  - `tests/adversarial_m5_sitemaps_schema.py`, línea 191:
    ```python
    if rel in ['index.html', os.path.join('biodescodificacion', 'index.html')]:
        assert len(matches) == 0, f"Índice {rel} no debería contener schemas de entidad"
    ```
  - `tests/adversarial_jsonld_robots_m5_2.test.mjs`, líneas 86-91:
    ```javascript
    // 113 city pages * 2 + 45 dolencia pages * 3 = 361 schemas
    assert.equal(totalScripts, 361, `Expected exactly 361 JSON-LD scripts across all 160 files, found ${totalScripts}`);
    ```
- **Razón y consecuencias técnicas:**
  - **ADVERTENCIA CRÍTICA:** No se debe inyectar NINGÚN esquema JSON-LD (`<script type="application/ld+json">`) en `src/pages/index.astro`.
  - Si un desarrollador intentara inyectar un esquema `Organization`, `WebSite` o `MedicalOrganization` en la Home:
    1. Fallaría inmediatamente el test `MR3-CH2-4.5` (espera 0 bloques, encontraría >= 1).
    2. Fallaría la dimensión 5 del harness Python M5 (`tests/adversarial_m5_sitemaps_schema.py`).
    3. Fallaría el conteo global cerrado de 361 schemas en `tests/adversarial_jsonld_robots_m5_2.test.mjs` (encontraría 362 en lugar de 361).
  - La arquitectura del portal asigna intencionalmente la indexación de entidad en la Home a:
    1. Metadatos OpenGraph y meta-tags estándar en `<head>`.
    2. El anclaje textual directo del primer párrafo visible en el DOM.
    3. El archivo semántico estandarizado `/llms.txt`.
    4. Los esquemas enriquecidos distribuidos en las 113 páginas de ciudades y 45 de dolencias.

---

## 3. Matriz Comparativa y Estrategia de Implementación

| Elemento | Estado Actual | Estado Requerido | Riesgo de Regresión |
|---|---|---|---|
| Teléfono en `public/llms.txt` | `+57 300 000 0000` | `+57 315 1206985` | Nulo (resuelve discrepancia) |
| URLs ciudades en `llms.txt` | `https://almaholistica.com/{ciudad}/` (404) | `https://almaholistica.com/biodescodificacion-{ciudad}/` | Nulo (corrige enlaces rotos) |
| Dolencias en `llms.txt` | 9 dolencias | 45 dolencias completas por sistema | Nulo |
| Países en `llms.txt` | 7 países mencionados | 20 países aprobados con monedas | Nulo |
| Directrices crawlers en `llms.txt` | 2 viñetas básicas | Directivas completas E-E-A-T, metodología, ética, WhatsApp | Nulo |
| Primer párrafo en `index.astro` | "La biodescodificación demuestra..." | "Alma Holística es una plataforma clínica..." (frase en primeros 50 caracteres) | Nulo (preserva clases y GSAP) |
| JSON-LD en `index.astro` | Cero scripts | Mantener rigurosamente CERO scripts | ALTO si se agregan schemas (violaría `MR3-CH2-4.5` y causaría fallos en cascada) |

---

## 4. Plan de Verificación Post-Implementación

Una vez implementados los cambios:
1. Comprobar que `public/llms.txt` no contiene `300 000 0000` ni URLs de ciudades sin `biodescodificacion-`:
   `grep -n "300 000 0000" public/llms.txt` -> vacío.
   `grep -n "almaholistica.com/bogota" public/llms.txt` -> vacío.
2. Ejecutar compilación de producción:
   `npm run build`
3. Verificar paridad en `dist/llms.txt`:
   `diff public/llms.txt dist/llms.txt` -> 0 diferencias.
4. Verificar que el primer párrafo de `src/pages/index.astro` contiene "Alma Holística es":
   `head -n 145 src/pages/index.astro | grep -C 2 "Alma Holística es"`
5. Verificar ausencia de JSON-LD en `dist/index.html` (`MR3-CH2-4.5`):
   `grep -c "application/ld+json" dist/index.html` -> debe ser 0.
6. Ejecutar la suite completa de pruebas:
   - `npm test` (150 pruebas)
   - `node --test tests/adversarial_*.test.mjs` (244 pruebas)
   - `python3 tests/adversarial_assets_config_m2_2.py`
   - `python3 tests/adversarial_m6_stress_harness.py`
