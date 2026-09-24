# Reporte de Investigación: Diseño UI, Silo Piramidal, Breadcrumbs y Esquemas Schema.org para los 20 Country Hubs de Alma Holística

**Investigador:** `teamwork_preview_explorer_survey_2`  
**Fecha:** 2026-09-24  
**Área de Trabajo:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_2/`  
**Misión:** Levantamiento forense y diseño arquitectónico para la integración de 20 Páginas Hub de País (Silos Geográficos), migas de pan jerárquicas, invariantes de Schema.org y normativa de diseño Swiss Bio-Tech Sólido Mate.

---

## 1. Observación (Observation)

A través de la inspección directa del código fuente, configuración y suites de pruebas adversariales del repositorio `almaholistica.com`, se registraron los siguientes hechos empíricos:

### 1.1 Estado de `src/pages/index.astro` y Enlazado a Países
- **Declaración de Países:** En `src/pages/index.astro` (líneas 52-73), existe una constante estática `countriesList` con los 20 países aprobados (`España`, `Estados Unidos`, `Colombia`, `México`, `Argentina`, `Chile`, `Perú`, `Ecuador`, `Bolivia`, `Uruguay`, `Paraguay`, `Venezuela`, `Costa Rica`, `Panamá`, `República Dominicana`, `Guatemala`, `El Salvador`, `Honduras`, `Nicaragua`, `Brasil`).
- **Directorio Hiperlocal Actual:** En la sección `#ciudades` (líneas 957-1052):
  - El encabezado del bloque (líneas 961-971) proclama: `RED INTERNACIONAL // COBERTURA EN 20 PAÍSES`.
  - Existe un buscador en tiempo real `<input id="home-city-search" ...>` (líneas 976-986).
  - Existe una retícula de ciudades prioritarias (líneas 995-1010) que enlaza directamente a 16 ciudades (`/${city.slug}`).
  - En el contenedor `#full-cities-list` (líneas 1024-1049), se itera sobre `countriesList`. Dentro del mapeo (líneas 1030-1032), el nombre del país se imprime como un elemento estático no clickable:
    ```astro
    <h4 class="text-xs font-sans font-bold uppercase tracking-wider text-[#779DD1] border-b border-slate-800/40 pb-2">
      {countryName}
    </h4>
    ```
  - **Falta de Silo Jerárquico:** No existe en toda la página de inicio ningún enlace a los 20 Country Hubs (`/biodescodificacion-{pais}/`). La arquitectura actual es 100% plana: la Home salta directamente a las 113 páginas de ciudades.

### 1.2 Estado de Breadcrumbs en `src/pages/[slug].astro`
- **Renderizado Visual HTML:** En `src/pages/[slug].astro` (líneas 118-124), las migas de pan se construyen de forma inline:
  ```html
  <nav class="flex items-center gap-2 text-xs font-sans tracking-wide text-slate-400 mb-8" aria-label="Breadcrumb">
    <a href="/" class="hover:text-[#779DD1] transition-colors">INICIO</a>
    <span class="text-slate-600">/</span>
    <a href="/#ciudades" class="hover:text-[#779DD1] transition-colors">CIUDADES</a>
    <span class="text-slate-600">/</span>
    <span class="text-[#779DD1] font-semibold uppercase">{cityName}</span>
  </nav>
  ```
- **Esquema JSON-LD de Breadcrumbs:** En `src/pages/[slug].astro` (líneas 78-91), el esquema estructurado se alimenta con:
  ```typescript
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: 'https://almaholistica.com/' },
    { name: 'Ciudades', url: 'https://almaholistica.com/#ciudades' },
    { name: cityName, url: canonicalUrl },
  ]);
  ```
- **Restricción Adversarial Existente:** En `tests/adversarial_jsonld_robots_m5_2.test.mjs` (líneas 134-137), la suite de pruebas valida explícitamente:
  ```javascript
  assert.equal(breadcrumbSchema.itemListElement[0].name, 'Inicio');
  assert.equal(breadcrumbSchema.itemListElement[0].item, 'https://almaholistica.com/');
  assert.equal(breadcrumbSchema.itemListElement[1].name, 'Ciudades');
  assert.equal(breadcrumbSchema.itemListElement[1].item, 'https://almaholistica.com/#ciudades');
  ```
  Esto confirma que el nivel intermedio actual es la ancla genérica `Ciudades` en vez del País.

### 1.3 Esquemas JSON-LD en `src/lib/schema.ts` y Censos Globales
- **Generadores Existentes en `src/lib/schema.ts`:**
  - `buildMedicalWebPageSchema(dolencia, canonicalUrl)`: genera `MedicalWebPage` con `about` (de tipo `MedicalCondition`, `associatedPathophysiology` y `possibleTreatment`).
  - `buildFAQSchema(faqs)`: genera `FAQPage` con array `mainEntity`.
  - `buildBreadcrumbSchema(items)`: genera `BreadcrumbList` con `itemListElement`.
  - `buildLocalServiceSchema(city, canonicalUrl)`: genera `HealthAndBeautyBusiness` para ciudades.
- **Distribución de Esquemas Actual (Total = 361 Invariante):**
  - Ciudades (113 páginas): 2 esquemas por página (`HealthAndBeautyBusiness` + `BreadcrumbList`) = 226 esquemas.
  - Dolencias (45 páginas): 3 esquemas por página (`MedicalWebPage` + `FAQPage` + `BreadcrumbList`) = 135 esquemas.
  - Home (`dist/index.html`) y Catálogo (`dist/biodescodificacion/index.html`): Exactamente 0 esquemas.
  - Total global: 226 + 135 = 361 esquemas JSON-LD validados por `tests/adversarial_m6_final_qa.test.mjs` (líneas 338-343) y `tests/adversarial_r1_r2_challenger.py` (líneas 364-391).
- **Invariante `MR3-CH2-4.5` / `MR3-ADV-4.1`:** La Home (`dist/index.html`) no debe contener scripts `<script type="application/ld+json">`. `src/pages/index.astro` no define `<slot="schema">`.

### 1.4 Reglas Estilísticas Swiss Bio-Tech Sólido Mate
- **Auditor `tests/helpers/mate_style_checker.mjs`:**
  - Patrones prohibidos:
    - `/backdrop-blur/i` (Glassmorphism / desenfoque de fondo).
    - `/backdrop-filter/i` (Propiedad CSS).
    - `/bg-opacity-(?:10|20|30|40|50|60|70|80|90)/i` (Transparencias parciales en fondos).
    - `/(?:bg-|background(?:-color)?\s*:\s*)[^;}"'>]*rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\s*\)/i` (Fondos RGBA transparentes).
    - `/shadow-(?:neon|glow|cyan-500\/|blue-500\/)/i` (Sombras con resplandores fluorescentes).
    - `/box-shadow\s*:[^;]*0\s+0\s+\d+px\s+#[0-9a-fA-F]+/i` (Resplandor bioluminiscente neón).
  - Tokens de color obligatorios:
    - `#060A1A` (Fondo Abisal).
    - `#0A1226` (Midnight Navy Card Nivel 1).
    - `#0E172F` (Midnight Navy Card Nivel 2).
    - `#1E293B` (Borde Mate 1).
    - `#38BDF8` / `#779DD1` (Acento Cyan / SlateBlue).
- **Erradicación Absoluta de Amarillo/Dorado (`tests/adversarial_mr3_challenger.test.mjs` líneas 209-216):**
  - Prohibidos: `/#f59e0b/i`, `/#d4af37/i`, `/#ffe58f/i`, `/#e5b33a/i`, `rgb(245, 158, 11)`, `rgb(212, 175, 55)`, `bg-amber-*`, `text-amber-*`, `border-amber-*`, `bg-yellow-*`, `text-yellow-*`, `border-yellow-*`.
- **Botones y Sombras Autorizadas:**
  - Botón principal de píldora: `btn-action-pill-white` (`bg-white text-[#060A1A] rounded-full shadow-pill-white` con `shadow-[0_8px_24px_rgba(255,255,255,0.08)]`).
  - Botón de WhatsApp: `btn-whatsapp-primary` (`#25D366` sólido).

---

## 2. Cadena Lógica (Logic Chain)

1. **Resolución de la Fragmentación de Enlazado (Silo Piramidal):**
   - Actualmente Google debe rastrear 113 URLs de ciudades de manera desestructurada desde una lista en la Home.
   - La arquitectura silo exige un flujo de PageRank piramidal:
     `Home (Nivel 1) → 20 Country Hubs (Nivel 2) → 113 Ciudades (Nivel 3)`.
   - Para que la Home transfiera autoridad de manera eficiente:
     - Se debe agregar en `src/pages/index.astro` un bloque destacado de "Silos por País / Cobertura Internacional" con tarjetas para cada uno de los 20 países antes o junto al directorio de ciudades.
     - En el directorio inferior `#full-cities-list`, cada encabezado `{countryName}` debe dejar de ser texto plano y convertirse en un hipervínculo activo a `/biodescodificacion-{countrySlug}/`.

2. **Reestructuración de Breadcrumbs en Ciudades (`[slug].astro`):**
   - Cada ciudad en `dataset_almaholistica_ciudades.csv` posee la propiedad `País` (`city.pais`).
   - Normalizando el nombre del país a slug canónico (ej. `Colombia` → `colombia`, `México` → `mexico`, `España` → `espana`, `Estados Unidos` → `estados-unidos`), la URL del Country Hub es estrictamente `https://almaholistica.com/biodescodificacion-${countrySlug}/`.
   - Sustituir el nivel 2 de las migas de pan tanto en HTML como en el esquema `BreadcrumbList`:
     - Nivel 1: `Inicio` (`https://almaholistica.com/`)
     - Nivel 2: `{city.pais}` (`https://almaholistica.com/biodescodificacion-${countrySlug}/`)
     - Nivel 3: `{cityName}` (`https://almaholistica.com/${city.slug}/`)
   - Esto consolida el silo ascendente y descendente (el hub enlaza a la ciudad y la ciudad enlaza de vuelta a su hub matriz).

3. **Invariantes de Esquemas JSON-LD para los 20 Country Hubs:**
   - Según el requerimiento R2 y R3, cada Country Hub debe contener exactamente 3 esquemas:
     1. `MedicalWebPage`: Describe el servicio clínico de biodescodificación adaptado a la región. Debe incluir obligatoriamente la propiedad `about` con `associatedPathophysiology` para satisfacer las validaciones de `tests/adversarial_m6_final_qa.test.mjs` (línea 325) y `tests/adversarial_m6_stress_harness.py`.
     2. `FAQPage`: Al menos 3 preguntas y respuestas frecuentes contextualizadas para el país (moneda local, modalidad virtual y compatibilidad médica alopática).
     3. `BreadcrumbList`: Estructura de 2 niveles: `Inicio` → `Biodescodificación en [País]`.
   - **Nuevo Censo Global:**
     - 113 ciudades x 2 esquemas = 226
     - 45 dolencias x 3 esquemas = 135
     - 20 country hubs x 3 esquemas = 60
     - Total nuevo invariante: **421 esquemas JSON-LD** en todo el sitio.
   - **Invariante Home:** La Home permanece con 0 esquemas (`MR3-CH2-4.5` intacto).

4. **Diseño Visual Swiss Bio-Tech del Country Hub:**
   - Para mantener coherencia con `BaseLayout.astro` y las páginas de ciudades, el Country Hub debe estructurarse en 7 secciones sólidas mates:
     1. *Hero Geográfico*: Título monumental en Plus Jakarta Sans, badge pulsante `SESIONES ONLINE EN VIVO • [PAÍS]`, métricas clave en 3 tarjetas con bordes coloreados (Moneda local, Modalidad 100% online, Huso horario de atención) y botón píldora blanco para agendamiento.
     2. *Enfoque Clínico y E-E-A-T Regional*: Tríptico de tarjetas `#0E172F` explicando la desactivación del choque biológico (DHS), la comodidad del formato virtual y el carácter integrativo.
     3. *Ficha del Especialista Senior Asignado*: Integrando datos de `dataset_almaholistica_ciudades_eeat_geo.json` (Lic. Sofía Alarcón, Dr. Mateo Benavides o Dra. Elena Monsalve) con avatar de iniciales, titulación, registro internacional y los 4 pilares metodológicos (PNI, Dr. Hamer, Christian Flèche, Dr. Bruce Lipton).
     4. *Información Operativa y Medios de Pago*: Detalle de tarifas en moneda local oficial (COP, EUR, MXN, USD, etc.), zona horaria de atención (COT, CET, CST, etc.) y pasarelas locales (Bancolombia, Bizum, SPEI, PayPal, tarjetas).
     5. *Retícula de Enlaces a Ciudades Pertenecientes*: Silo descendente que muestra todas las ciudades del país registradas en el dataset con sus precios locales.
     6. *Acordeón de Preguntas Frecuentes*: Componentes `<details class="card-matte ...">` con marcado `FAQPage`.
     7. *Descargo Ético YMYL y CTA de Cierre*: Banner de cierre con botón de evaluación que abre el WhatsApp Quiz Modal.

---

## 3. Advertencias y Limitaciones (Caveats)

1. **Impacto en Pruebas Adversariales Existentes:**
   - La suite `tests/adversarial_jsonld_robots_m5_2.test.mjs` (línea 136-137) actualmente comprueba de forma rígida que el segundo ítem del breadcrumb de ciudades sea `'Ciudades'` y apunte a `'https://almaholistica.com/#ciudades'`. Si se actualiza a `[Nombre del País]` y `/biodescodificacion-{pais}/`, esa aserción fallará a menos que el test se sincronice con el nuevo contrato piramidal.
   - El test `tests/adversarial_m6_final_qa.test.mjs` (líneas 303-307 y 338-343) asume que cualquier ruta que no empiece por `biodescodificacion/` es una ciudad y exige exactamente 2 schemas, además de verificar el censo rígido de 361 schemas y 160 páginas HTML. Los Country Hubs generan 20 páginas HTML en `dist/biodescodificacion-{pais}/index.html` con 3 schemas cada una. La suite deberá ser actualizada al nuevo censo de 180 páginas y 421 schemas.
   - Los scripts `tests/adversarial_r1_r2_challenger.py`, `tests/adversarial_r3_r4_challenger.py` y `tests/adversarial_m5_sitemaps_schema.py` tienen aserciones estrictas `assert total_schemas == 361` y `assert len(html_files) == 160`.
2. **Generación de Rutas en Astro 5:**
   - Si se utiliza una ruta dinámica en `src/pages/biodescodificacion-[pais].astro` o `src/pages/biodescodificacion-[pais]/index.astro`, se debe asegurar que Astro no presente colisiones de patrones con `src/pages/[slug].astro`. Dado que Astro prioriza rutas con prefijo estático (`biodescodificacion-[pais]`) sobre comodines puros (`[slug]`), la coexistencia es válida, o bien pueden definirse a través de `src/pages/[slug].astro` o archivos específicos según el diseño del implementador.
3. **Mapeo de Países y Slugs:**
   - Se debe utilizar una función canónica de slugificación uniforme para los 20 países que remueva diacríticos y normalice a minúsculas con guiones:
     `Colombia` → `colombia`
     `México` → `mexico`
     `España` → `espana`
     `Perú` → `peru`
     `Panamá` → `panama`
     `República Dominicana` → `republica-dominicana`
     `Estados Unidos` → `estados-unidos`
     `Costa Rica` → `costa-rica`
     `El Salvador` → `el-salvador`
   - Cualquier divergencia en un solo slug romperá el trailing slash canónico o provocará un 404 en sitemaps.

---

## 4. Conclusión (Conclusion)

1. **Home (`src/pages/index.astro`):**
   - Debe incorporar un componente/sección de "Centros Clínicos Internacionales por País" que enlace a los 20 hubs con tarjetas Swiss Bio-Tech (`#0A1226`, bordes `#1E293B`, sin amarillo).
   - Debe convertir los títulos `<h4>{countryName}</h4>` del directorio `#full-cities-list` en hipervínculos `<a>` hacia `/biodescodificacion-{countrySlug}/`.
   - Debe mantener 0 scripts `application/ld+json` para cumplir con `MR3-CH2-4.5`.

2. **Páginas de Ciudades (`src/pages/[slug].astro`):**
   - La navegación visual y el esquema `BreadcrumbList` deben actualizarse de `Inicio > Ciudades > [Ciudad]` a `Inicio > [Nombre del País] > [Ciudad]`, con enlace en el nivel intermedio a `https://almaholistica.com/biodescodificacion-{countrySlug}/`.

3. **Esquemas de Country Hubs (`src/lib/schema.ts`):**
   - Cada Country Hub debe renderizar 3 esquemas:
     - `MedicalWebPage` (con `about` y `associatedPathophysiology`).
     - `FAQPage` (mínimo 3 preguntas localizadas).
     - `BreadcrumbList` (2 niveles: Inicio > País).
   - El censo global de esquemas pasa de 361 a 421.

4. **Estilo Sólido Mate:**
   - Cumplimiento incondicional de los tokens `#060A1A`, `#0A1226`, `#0E172F`, `#1E293B`, `#38BDF8`.
   - Prohibición estricta de `backdrop-blur`, transparencias `bg-opacity-*`, sombras glow/neón y colores amarillos/dorados (`#F59E0B`, `#D4AF37`, etc.).
   - Estricto respeto a `CLS = 0` con dimensiones fijas en medios.

5. **Estructura del Country Hub:**
   - Las 7 secciones detalladas (Hero, Enfoque Clínico, Especialista Senior E-E-A-T, Info Operativa/Tarifas, Retícula de Ciudades Asociadas, Acordeón de FAQs, Descargo Ético/CTA) proveen una experiencia de usuario de alta gama que cumple tanto con las expectativas de los motores de búsqueda (GEO/AIO/YMYL) como con los consultantes que buscan atención online personalizada.

---

## 5. Método de Verificación (Verification Method)

Para verificar independientemente los hallazgos y validar cualquier implementación posterior:

1. **Verificación de Estilo Sólido Mate:**
   ```bash
   node -e "
     import('./tests/helpers/mate_style_checker.mjs').then(({ auditMateStyleContent }) => {
       const fs = require('fs');
       const content = fs.readFileSync('src/pages/index.astro', 'utf8');
       console.log('Audit index.astro:', auditMateStyleContent(content));
     });
   "
   ```

2. **Ejecución de Pruebas Unitarias de Regresión:**
   ```bash
   npm test
   ```
   *(Verifica los 150 tests de las Features 1 a 23).*

3. **Ejecución de Pruebas Adversariales:**
   ```bash
   node --test tests/adversarial_*.test.mjs
   ```

4. **Verificación del Censo de Esquemas y Páginas Estáticas:**
   ```bash
   npm run build
   python3 tests/adversarial_r1_r2_challenger.py
   python3 tests/adversarial_r3_r4_challenger.py
   python3 tests/adversarial_m6_stress_harness.py
   ```

5. **Comprobación de Rutas en `dist/` tras el build:**
   Verificar que existan los 20 directorios:
   `dist/biodescodificacion-{pais}/index.html` para los 20 países aprobados y que cada uno contenga los 3 bloques `<script type="application/ld+json">`.
