# Handoff Report — Reviewer M4 2: Dynamic SSG Routes, Matte Styling, CLS & WhatsApp CTAs

- **Agente**: `reviewer_m4_2` (`teamwork_preview_reviewer_m4_2`)
- **Roles**: `reviewer`, `critic` (`teamwork_preview_reviewer`)
- **Directorio de trabajo**: `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_m4_2/`
- **Fecha**: 2026-09-06T00:07:00-05:00
- **Milestone**: M4 (Dynamic SSG Routes & Pages)
- **Veredicto**: `REQUEST_CHANGES`

---

## 1. Observation

Durante la auditoría técnica, visual y adversaria sobre los entregables de Milestone M4 se registraron las siguientes observaciones directas, comandos y salidas de consola:

### 1.1. Diagnósticos Astro (`npx astro check`)
```bash
npx astro check
```
Salida exacta:
```
00:03:20 [content] Syncing content
00:03:20 [content] Synced content
00:03:20 [types] Generated 34ms
00:03:20 [check] Getting diagnostics for Astro files in /Users/anthony/Downloads/almaholistica.com...
tests/tier2_edge_cases.test.mjs:70:15 - warning ts(6133): 'check' is declared but its value is never read.
tests/tier2_edge_cases.test.mjs:10:3 - warning ts(6133): 'APPROVED_COUNTRIES' is declared but its value is never read.
tests/tier4_user_journeys.test.mjs:12:3 - warning ts(6133): 'SAMPLE_DOLENCIA_FIXTURE' is declared but its value is never read.

Result (27 files): 
- 0 errors
- 0 warnings
- 3 hints
```
Exit code: `0`. Los 6 archivos de código fuente de M4 no presentan errores ni advertencias de TypeScript/Astro.

### 1.2. Compilación Estática SSG (`npm run build`)
```bash
npm run build
```
Salida exacta:
```
[build] 160 page(s) built in 3.47s
[build] Complete!
```
Exit code: `0`. Se generaron exactamente 160 archivos HTML en `dist/`:
- 113 páginas de ciudades (`dist/<slug>/index.html`)
- 45 páginas temáticas de dolencias (`dist/biodescodificacion/<slug>/index.html`)
- 1 catálogo general de dolencias (`dist/biodescodificacion/index.html`)
- 1 landing page principal (`dist/index.html`)

### 1.3. Ejecución de la Suite Completa de Pruebas (`node --test tests/*.test.mjs`)
```bash
node --test tests/*.test.mjs
```
Salida exacta:
```
# tests 261
# suites 68
# pass 251
# fail 1
# cancelled 0
# skipped 9
# duration_ms 363.691791
```
Exit code: `1` (**FALLO**).
Subtest fallido verbatim:
```
# Subtest: ADV-M4.2.16: Conversion CTAs in Home page are connected to Quiz Modal with WhatsApp fallback
not ok 5 - ADV-M4.2.16: Conversion CTAs in Home page are connected to Quiz Modal with WhatsApp fallback
  ---
  duration_ms: 0.593458
  type: 'test'
  location: '/Users/anthony/Downloads/almaholistica.com/tests/adversarial_challenger_m4_2.test.mjs:335:3'
  failureType: 'testCodeFailure'
  error: 'CTA link missing data-open-quiz="true": <a href="https://wa.me/573000000000?text=Hola%20Alma%20Hol%C3%ADstica%2C%20deseo%20agendar%20una%20sesi%C3%B3n%20inicial%20de%20diagn%C3%B3stico.%0A%E2%80%A2%20Ubicaci%C3%B3n%3A%20Pie%20de%20P%C3%A1gina%0AAgradezco%20su%20orientaci%C3%B3n%20para%20abordar%20la%20ra%C3%ADz%20emocional%20de%20mi%20caso." class="hover:text-[#38BDF8] transition-colors">'
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: true
  actual: false
  ...
```

### 1.4. Rastreo Forense de Enlaces Internos Rotos en `dist/`
Se ejecutó un rastreo automatizado de todas las etiquetas `<a href="/...">` en los 160 archivos HTML generados.
Resultado verbatim:
```
Total broken links found: 273
Broken link targets and occurrence count: { '/sitemap-index.xml': 160, '/biodescodificacion/migranas': 113 }
```
- `/sitemap-index.xml`: 160 ocurrencias (metaetiqueta de auto-descubrimiento en `<head>`, a ser generado en M5).
- `/biodescodificacion/migranas`: **113 ocurrencias** en todas las 113 páginas de ciudades (`dist/<ciudad>/index.html`).
- Archivo fuente responsable: `/Users/anthony/Downloads/almaholistica.com/src/pages/[slug].astro`, línea 300:
  ```astro
  <a href="/biodescodificacion/migranas" class="card-matte-elevated p-5 hover:border-[#38BDF8] transition-colors group">
  ```
- Comprobación en `dist/`: `dist/biodescodificacion/migranas/index.html` **NO EXISTE**. La ruta correcta generada desde el dataset es `dist/biodescodificacion/migrana/index.html`. Al hacer clic, el usuario recibe un error 404.

### 1.5. Discrepancia de Slugs y Tarjetas Faltantes en `src/pages/index.astro`
En `/Users/anthony/Downloads/almaholistica.com/src/pages/index.astro`, líneas 28-41:
```typescript
const featuredSlugs = [
  'gastritis',
  'colon-irritable',
  'ansiedad',
  'lumbalgia',
  'ciatica',
  'hipotiroidismo',
  'dermatitis',
  'migranas',    // <-- ERROR: en dataset es 'migrana'
  'insomnio',
  'sobrepeso',   // <-- ERROR: en dataset es 'sobrepeso-retencion'
  'fibromialgia',
  'bruxismo'
];
```
- Como consecuencia, `allDolencias.filter((d) => featuredSlugs.includes(d.slug))` sólo encuentra 10 dolencias en lugar de las 12 previstas en el Hero Grid de la página de inicio. Las fichas de "Migrañas" y "Sobrepeso" desaparecen silenciosamente de la vista del usuario.

### 1.6. Auditoría de Estilo Sólido Mate y Prevención de CLS
1. **Estilo Sólido Mate**:
   - Escaneo de 160 archivos HTML en `dist/`: 0 violaciones de `backdrop-blur`, `backdrop-filter`, `rgba(..., 0.x)`, `bg-opacity`, `shadow-neon` o `shadow-glow`.
   - Código CSS compilado en `dist/_astro/_slug_.BWsNoilK.css`: Cero reglas de desenfoque de fondo aplicadas a clases o componentes (la mención de `--tw-backdrop-blur` es únicamente la inicialización de variables en el reset de Tailwind).
2. **Prevención de CLS**:
   - Total de etiquetas `<img>` analizadas: **321**. Etiquetas sin dimensiones explícitas (`width` y `height`): **0**.
   - Total de etiquetas `<svg>` analizadas: **1484**. Etiquetas sin `viewBox` o dimensiones: **0**.
   - Contención horizontal en `html`, `body` y `main`: `overflow-x: hidden` y `max-width: 100vw` activos.

---

## 2. Logic Chain

1. **Afectación de Experiencia de Usuario y SEO por Enlaces 404 (Observación 1.4)**:
   - A partir de la observación 1.4, `src/pages/[slug].astro` genera 113 páginas de ciudades donde cada una contiene un enlace estático hacia `/biodescodificacion/migranas`.
   - Dado que el slug oficial en `dataset_biodescodificacion_dolencias.json` es `migrana` (singular), Astro compila la página en `/biodescodificacion/migrana/index.html`.
   - En consecuencia, los bots de rastreo (Googlebot) y los consultantes reales que pulsen en la tarjeta de "Migrañas y Cefaleas" desde cualquier ciudad obtienen un código de estado 404 Not Found. Esto degrada gravemente el ranking SEO interno y frustra la navegación.

2. **Pérdida Silenciosa de Contenido en la Landing Page Principal (Observación 1.5)**:
   - A partir de la observación 1.5, en `src/pages/index.astro` se definieron 12 dolencias destacadas para el Hero Grid.
   - Sin embargo, debido a los nombres de slug incorrectos `'migranas'` (plural) y `'sobrepeso'` (incompleto, el slug real es `'sobrepeso-retencion'`), la función `filter` los descarta.
   - Por tanto, la página principal solo renderiza 10 tarjetas en el grid de dolencias, omitiendo dos de las patologías más buscadas y monetizables.

3. **Inconsistencia de Atributos de Funnel en el Enlace de Contacto (Observación 1.3)**:
   - A partir de la observación 1.3, la prueba `ADV-M4.2.16` en `tests/adversarial_challenger_m4_2.test.mjs` valida que todos los enlaces que apunten a `https://wa.me/573000000000` en la página principal cuenten con el atributo `data-open-quiz="true"` para asegurar la activación interactiva del modal.
   - En `src/components/Footer.astro` (línea 178), el enlace inferior de navegación dice: `<a href={whatsappFooterUrl} class="hover:text-[#38BDF8] transition-colors">Contacto</a>` sin `data-open-quiz="true"`.
   - Esto provoca que `node --test tests/*.test.mjs` falle con código 1, impidiendo certificar la suite de pruebas como aprobada al 100%.

4. **Conclusión Lógica**:
   - A pesar de que la compilación de Astro es limpia (0 errores), el estilo mate es impecable (0 violaciones) y la prevención de CLS es perfecta, **no es admisible aprobar un hito que introduce 113 enlaces 404 en producción, omite contenido clave en la home y hace fallar la suite de pruebas automatizadas**.
   - Por ende, el veredicto mandatorio es **`REQUEST_CHANGES`**.

---

## 3. Caveats

- **Integridad del Código Base**: No se detectaron violaciones de integridad maliciosas, trampas, ni facades artificiales en `src/lib/cities.ts` ni `src/lib/dolencias.ts`. La lógica de carga, normalización y memoización es 100% genuina y de alto rendimiento.
- **Write Ownership**: El archivo `src/components/Footer.astro` pertenece al Milestone M2 según `PROJECT.md`, mientras que `src/pages/[slug].astro` y `src/pages/index.astro` pertenecen a M4. Los defectos 1 y 2 deben ser corregidos por el agente que modifique M4, y el defecto 3 requiere una adición puntual de `data-open-quiz="true"` en `Footer.astro`.
- **Sitemap**: Los 160 enlaces hacia `/sitemap-index.xml` no constituyen un error de M4, ya que corresponden al contrato arquitectónico reservado para M5.

---

## 4. Conclusion

Se emite veredicto formal de **`REQUEST_CHANGES`** para Milestone M4.

Para que el hito pueda ser aprobado, se requiere realizar las siguientes correcciones puntuales:
1. En `/Users/anthony/Downloads/almaholistica.com/src/pages/[slug].astro` (línea 300):
   - Cambiar `href="/biodescodificacion/migranas"` por `href="/biodescodificacion/migrana"`.
2. En `/Users/anthony/Downloads/almaholistica.com/src/pages/index.astro` (líneas 36 y 38):
   - Cambiar `'migranas'` por `'migrana'`.
   - Cambiar `'sobrepeso'` por `'sobrepeso-retencion'`.
3. En `/Users/anthony/Downloads/almaholistica.com/src/components/Footer.astro` (línea 178):
   - Agregar `data-open-quiz="true"` y `data-location="footer-bottom-contact"` al enlace `Contacto`.
4. Re-ejecutar `npm run build` y verificar que `node --test tests/*.test.mjs` pase al 100% (252 pass, 0 fail).

---

## 5. Verification Method

Para verificar independientemente las observaciones y la resolución de los hallazgos:

1. **Reproducción de Enlaces 404**:
   ```bash
   node --input-type=module -e '
   import fs from "node:fs";
   const content = fs.readFileSync("src/pages/[slug].astro", "utf8");
   if (content.includes("/biodescodificacion/migranas")) {
     console.error("HALLAZGO CONFIRMADO: Enlace roto /biodescodificacion/migranas presente");
     process.exit(1);
   } else {
     console.log("ENLACE CORREGIDO");
   }
   '
   ```

2. **Reproducción de Tarjetas Faltantes en Home**:
   ```bash
   node --input-type=module -e '
   import fs from "node:fs";
   const content = fs.readFileSync("src/pages/index.astro", "utf8");
   if (content.includes("\x27migranas\x27") || content.includes("\x27sobrepeso\x27")) {
     console.error("HALLAZGO CONFIRMADO: Slugs desalineados en featuredSlugs de index.astro");
     process.exit(1);
   } else {
     console.log("SLUGS ALINEADOS");
   }
   '
   ```

3. **Ejecución de la Suite de Pruebas Node.js**:
   ```bash
   node --test tests/*.test.mjs
   ```
   *Criterio de Aprobación*: Exit code 0, 0 pruebas fallidas (`fail: 0`).

4. **Compilación Limpia**:
   ```bash
   npm run build
   ```
   *Criterio de Aprobación*: 160 páginas generadas y cero enlaces rotos internos en `dist/`.

---

## Review Report

### Review Summary
**Verdict**: `REQUEST_CHANGES`

### Findings

#### [Critical] Finding 1: 113 Enlaces Internos Rotos (404) hacia `/biodescodificacion/migranas`
- **What**: Enlace hardcodeado con slug en plural `/biodescodificacion/migranas` en lugar de `/biodescodificacion/migrana`.
- **Where**: `/Users/anthony/Downloads/almaholistica.com/src/pages/[slug].astro`, línea 300.
- **Why**: Provoca que en cada una de las 113 páginas de ciudades generadas (`dist/<ciudad>/index.html`), el enlace a la ficha de migrañas apunte a una URL inexistente, generando errores 404 en producción y penalizaciones de indexación.
- **Suggestion**: Cambiar a `href="/biodescodificacion/migrana"`.

#### [Major] Finding 2: Omisión de 2 Tarjetas Destacadas en la Home por Tipos de Slug
- **What**: En `featuredSlugs`, los valores `'migranas'` y `'sobrepeso'` no coinciden con los slugs del catálogo (`'migrana'` y `'sobrepeso-retencion'`).
- **Where**: `/Users/anthony/Downloads/almaholistica.com/src/pages/index.astro`, líneas 36 y 38.
- **Why**: El filtro descarta ambas afecciones, renderizando únicamente 10 tarjetas en el grid de dolencias frecuentes de la página de inicio en lugar de las 12 diseñadas.
- **Suggestion**: Corregir `'migranas'` a `'migrana'` y `'sobrepeso'` a `'sobrepeso-retencion'`.

#### [Major] Finding 3: Enlace de WhatsApp en Footer sin `data-open-quiz="true"`
- **What**: El enlace inferior "Contacto" a WhatsApp carece del atributo de interceptación para el modal.
- **Where**: `/Users/anthony/Downloads/almaholistica.com/src/components/Footer.astro`, línea 178.
- **Why**: Viola la aserción de `tests/adversarial_challenger_m4_2.test.mjs` (ADV-M4.2.16) y causa que `node --test tests/*.test.mjs` falle con código 1.
- **Suggestion**: Añadir `data-open-quiz="true"` y `data-location="footer-bottom-contact"` al enlace.

### Verified Claims
- Estilo sólido mate sin blur/transparencias/neón en las 160 páginas → Verificado mediante escaneo regex de 160 HTMLs y CSS compilado → **PASS**
- Prevención de CLS con dimensiones explícitas en 321 imágenes y 1484 SVGs → Verificado mediante parser HTML → **PASS**
- Cero errores y advertencias en `npx astro check` → Verificado con salida directa → **PASS**
- Generación de 160 páginas HTML estáticas en SSG → Verificado con `npm run build` y censo de archivos en `dist/` → **PASS**
- Funcionamiento del Quiz Modal y parámetros `data-city` y `data-symptom` → Verificado con suites de test de M3 y M4 → **PASS**
- Paso al 100% de la suite de pruebas `node --test tests/*.test.mjs` → Verificado mediante ejecución directa → **FAIL (1 test fallido)**

### Coverage Gaps
- No se identificaron vacíos de cobertura en el alcance de M4.

### Unverified Items
- Ninguno. Todos los archivos generados y de código fuente fueron inspeccionados exhaustivamente.

---

## Adversarial Challenge Report

### Challenge Summary
**Overall risk assessment**: **HIGH** (Debido a 113 enlaces rotos 404 en producción y suite de tests con fallos).

### Challenges

#### [Critical] Challenge 1: Resiliencia de Enlaces Cruzados entre Ciudades y Dolencias
- **Assumption challenged**: Se asume que las páginas de ciudades enlazan correctamente a las dolencias del catálogo temático.
- **Attack scenario**: Un usuario en Bogotá o Madrid lee la sección "Dolencias Frecuentes Atendidas en Tu Ciudad" y hace clic en "Migrañas y Cefaleas".
- **Blast radius**: 113 páginas de ciudades presentan un enlace 404 que rompe la experiencia de usuario y destruye el PageRank interno del clúster programático.
- **Mitigation**: Corregir el slug a `/biodescodificacion/migrana` y validar que cada enlace generado coincida con un archivo estático real en `dist/`.

#### [High] Challenge 2: Integridad del Catálogo en la Landing Page Principal
- **Assumption challenged**: Se asume que el Hero Grid de la página principal muestra las 12 patologías más representativas.
- **Attack scenario**: Un usuario entra a la home buscando orientación para sobrepeso o migrañas; no las encuentra en el grid principal debido al fallo silencioso del filtro.
- **Blast radius**: Reducción de conversión en dos de las patologías de mayor volumen de búsqueda.
- **Mitigation**: Alinear los identificadores de `featuredSlugs` con los slugs normalizados del dataset.
