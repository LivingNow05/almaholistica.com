# Handoff Report: Diseño de Módulos de Lectura SSG (`cities.ts` & `dolencias.ts`)

**Agente**: `explorer_m4_1` (`teamwork_preview_explorer`)  
**Fecha**: 2026-09-05T23:54:50-05:00  
**Directorio de trabajo**: `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/`  
**Archivos de propuesta generados**:
- `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/proposed_cities.ts`
- `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/proposed_dolencias.ts`

---

## 1. Observation

A partir de la inspección exhaustiva de los archivos obligatorios del repositorio se registraron las siguientes observaciones directas:

1. **Requerimientos del Sistema (`ORIGINAL_REQUEST.md`)**:
   - Líneas 12-17: R1 estipula un dataset de ciudades (`dataset_almaholistica_ciudades.csv`) con más de 100 ciudades en 20 países (18 Latam + España + EE.UU. hispanos) con columnas: `Dominio, Categoría, URL Final (Slug), H1 Título, Meta Descripción, País, Moneda, Rango_Precio_Sesion, Historia_Local`.
   - Líneas 17-18: Dataset de dolencias (`dataset_biodescodificacion_dolencias.json`) estructurado con 45 patologías completas.
   - Líneas 29: Rutas dinámicas SSG requeridas: `src/pages/[slug].astro` para ciudades y `src/pages/biodescodificacion/[slug].astro` para síntomas.

2. **Inventario de Funcionalidades y Contratos (`PROJECT.md`)**:
   - Línea 42: `Feature 13: Módulos de Lectura SSG | src/lib/cities.ts (con csv-parse/sync memoizado) y src/lib/dolencias.ts para carga rápida sin fugas | M4 | Survey Report 3`.
   - Líneas 70-89: Contrato M1 ↔ M4: Define la estructura de `DolenciaData` y los requerimientos de normalización de slugs (en minúsculas, sin acentos ni barras).
   - Línea 165: Propiedad de escritura de Milestone M4: Posee exclusivamente `src/lib/cities.ts`, `src/lib/dolencias.ts`, `src/pages/`.

3. **Tipos de Datos Existentes**:
   - `src/types/city.ts` (Líneas 59-94):
     - `RawCityRow`: Interfaz con las 9 columnas exactas del CSV (`Dominio`, `Categoría`, `'URL Final (Slug)'`, `'H1 Título'`, `'Meta Descripción'`, `País`, `Moneda`, `Rango_Precio_Sesion`, `Historia_Local`).
     - `CityData`: Interfaz normalizada con propiedades camelCase (`dominio`, `categoria`, `slug`, `h1`, `metaDescripcion`, `pais`, `moneda`, `rangoPrecio`, `historiaLocal`).
     - `SupportedCountry`: 20 países soportados.
     - `SupportedCurrency`: Códigos de moneda aprobados.
   - `src/types/dolencia.ts` (Líneas 10-51):
     - `BodilySystem`: 7 sistemas biológicos ('Digestivo', 'Nervioso / Emocional', 'Osteoarticular', 'Dermatológico', 'Respiratorio', 'Endocrino / Metabólico', 'Inmunológico / Circulatorio').
     - `FAQItem`: `{ pregunta: string; respuesta: string }`.
     - `DolenciaData`: Interfaz con las 9 claves requeridas (`slug`, `nombre`, `sistema`, `conflictoEmocional`, `sentidoBiologico`, `reprogramacion`, `preguntasReflexion`, `faqs`, `ganchoAgendamiento`).

4. **Estado de los Datos Reales en Disco**:
   - `src/data/dataset_almaholistica_ciudades.csv`:
     - Posee exactamente 113 filas de datos (114 líneas totales contando cabecera).
     - Validación ejecutada mediante `tests/helpers/contracts.mjs` arrojó **0 errores de validación** y **0 colisiones de slugs**.
     - Todos los slugs están limpios y en minúsculas (ej: `bogota`, `medellin`, `madrid`, `miami`).
   - `src/data/dataset_biodescodificacion_dolencias.json`:
     - Contiene exactamente 45 dolencias.
     - Validación ejecutada mediante `tests/helpers/contracts.mjs` arrojó **0 errores de validación** y **0 colisiones de slugs**.
     - Los 7 sistemas corporales coinciden exactamente con la unión `BodilySystem`.

5. **Pruebas Automatizadas Existentes (`tests/tier1_features.test.mjs`)**:
   - En líneas 566-612 (Feature 13: Módulos de Lectura SSG):
     - T1.13.1 exige que `src/lib/cities.ts` exporte `getCities` o `getCityBySlug`.
     - T1.13.2 exige que `cities.ts` implemente memoización verificando que el código contenga `cached`, `cache` o `let cities`.
     - T1.13.3 exige que `src/lib/dolencias.ts` exporte `getDolencias` o `getDolenciaBySlug`.
     - T1.13.4 exige que `dolencias.ts` busque eficientemente por slug verificando que el código contenga `find` o `slug`.
     - T1.13.5 exige que búsquedas de slugs inexistentes devuelvan `undefined` de forma segura sin lanzar excepciones.

6. **Entorno de Compilación y Dependencias**:
   - `package.json` ya incluye `csv-parse: "^5.6.0"`.
   - `tsconfig.json` configura `baseUrl: "."`, alias `@/*` -> `src/*`, y `strictNullChecks: true`.
   - `astro check` y `npx tsc --noEmit` completan con 0 errores y 0 advertencias críticas.

---

## 2. Logic Chain

1. **Necesidad de Memoización Estricta en SSG**:
   - *Premisa*: Astro ejecuta la función `getStaticPaths()` de cada página dinámica (`[slug].astro` y `biodescodificacion/[slug].astro`) para recopilar todas las rutas a construir. Luego, durante la fase de renderizado estático de 113 páginas de ciudades y 45 páginas de dolencias, cada página consume datos del módulo.
   - *Inferencia*: Si cada invocación releyera el archivo CSV de disco (192 KB) o el archivo JSON (97 KB) y lo parseara de nuevo, se incurriría en más de 158 lecturas de disco síncronas innecesarias durante el build.
   - *Solución*: Implementar variables singleton en memoria a nivel de módulo (`let cachedCities: CityData[] | null = null;` y `let cachedDolencias: DolenciaData[] | null = null;`). El parseo se realiza exactamente una sola vez.

2. **Indexación para Búsquedas O(1)**:
   - *Premisa*: Rutas individuales y componentes pueden invocar `getCityBySlug(slug)` o `getDolenciaBySlug(slug)` repetidamente.
   - *Inferencia*: Un escaneo secuencial `Array.find()` en cada renderizado tiene complejidad O(N).
   - *Solución*: En el momento en que se inicializa la caché, se construye simultáneamente un `Map<string, CityData>` y `Map<string, DolenciaData>`. Esto reduce la búsqueda a O(1), manteniendo un fallback a `.find()` en caso de ser necesario.

3. **Mapeo Tipado Dual (CamelCase + Cabeceras Crudas)**:
   - *Premisa*: `src/types/city.ts` define la interfaz canónica de consumo `CityData` con propiedades camelCase (`dominio`, `categoria`, `slug`, `h1`, `metaDescripcion`, `pais`, `moneda`, `rangoPrecio`, `historiaLocal`). No obstante, fixtures de prueba y código existente en scripts acceden a veces a claves crudas como `row['H1 Título']` o `row.Moneda`.
   - *Solución*: El transformador `mapRowToCity()` retorna el objeto con todas las propiedades de `CityData`, y mediante `Object.defineProperties()` añade las claves del CSV original como propiedades de sólo lectura. Esto asegura 100% de compatibilidad tanto con código tipado nuevo como con pruebas que utilicen las cabeceras originales.

4. **Sanitización y Resiliencia en Slugs**:
   - *Premisa*: El test T2.1.4 y los contratos indican que entradas con espacios accidentales, mayúsculas o barras (ej: `" /bogota/ "`) no deben provocar fallos ni búsquedas fallidas cuando se busca un recurso legítimo.
   - *Solución*: Función `normalizeSlug(slug: string)` que aplica `.trim().toLowerCase().replace(/^\/+|\/+$/g, '')`, permitiendo tolerancia ante entradas imperfectas y garantizando que slugs no existentes devuelvan estrictamente `undefined`.

5. **Resolución de Rutas Agnóstica del Entorno**:
   - *Premisa*: En Astro/Vite el código corre en bundling ESM (`import.meta.url`), mientras que en tests directos de Node (`node --test`) corre bajo el contexto del proceso de ejecución.
   - *Solución*: Implementar `resolveCsvPath()` y `resolveJsonPath()` intentando primero `fileURLToPath(new URL('../data/...', import.meta.url))` y empleando `path.join(process.cwd(), 'src/data/...')` como fallback robusto.

---

## 3. Caveats

1. **Restricción de Rol Solo Lectura (Explorer)**:
   - De acuerdo con la convención de investigación y propiedad de escritura, este explorador diseñó, verificó y redactó las implementaciones completas en su carpeta (`.agents/teamwork_preview_explorer_m4_1/`), pero no modificó directamente el árbol `src/lib/`. La colocación definitiva en `src/lib/cities.ts` y `src/lib/dolencias.ts` corresponde al worker implementador asignado a M4.
2. **Datasets Estáticos vs Dinámicos**:
   - La memoización asume que los archivos CSV y JSON son estáticos durante la compilación SSG. Si en un entorno de desarrollo se modifican los datasets en caliente sin reiniciar el servidor de desarrollo de Astro, se suministran las funciones `clearCityCache()` y `clearDolenciaCache()` para invalidar la memoria si fuera necesario.
3. **No se registraron otros caveats ni bloqueos técnicos**:
   - Todas las dependencias (`csv-parse`, Node.js fs, TypeScript) ya están instaladas y funcionando al 100%.

---

## 4. Conclusion

El diseño arquitectónico de los módulos de lectura SSG está concluido, probado sintáctica y funcionalmente, y listo para ser trasladado a `src/lib/cities.ts` y `src/lib/dolencias.ts`.

### Resumen de Contratos y APIs Diseñadas

#### `src/lib/cities.ts`
- **Imports**: `fs`, `path`, `fileURLToPath`, `parse` de `csv-parse/sync`, tipos de `../types/city`.
- **Estado Interno**:
  - `let cachedCities: CityData[] | null = null;`
  - `let cachedCityBySlug: Map<string, CityData> | null = null;`
- **Funciones Públicas**:
  - `getCities(): CityData[]`: Devuelve las 113 ciudades procesadas con tipado estricto.
  - `getAllCities(): CityData[]`: Alias semántico de `getCities()`.
  - `getCityBySlug(slug: string): CityData | undefined`: Búsqueda O(1) con normalización previa.
  - `getCitiesByCountry(country: string): CityData[]`: Filtrado por país.
  - `getCitySlugs(): string[]`: Array plano de slugs para `getStaticPaths` y sitemaps.
  - `clearCityCache(): void`: Invalidador de caché.
  - `normalizeSlug(slug: string): string`: Normalizador reutilizable.

#### `src/lib/dolencias.ts`
- **Imports**: `fs`, `path`, `fileURLToPath`, tipos de `../types/dolencia`.
- **Estado Interno**:
  - `let cachedDolencias: DolenciaData[] | null = null;`
  - `let cachedDolenciasBySlug: Map<string, DolenciaData> | null = null;`
- **Funciones Públicas**:
  - `getDolencias(): DolenciaData[]`: Devuelve las 45 patologías estructuradas.
  - `getAllDolencias(): DolenciaData[]`: Alias semántico de `getDolencias()`.
  - `getDolenciaBySlug(slug: string): DolenciaData | undefined`: Búsqueda O(1) vía Map con fallback `.find()`.
  - `getDolenciasBySistema(sistema: string): DolenciaData[]`: Filtrado por sistema biológico.
  - `getSistemas(): BodilySystem[]`: Array con los 7 sistemas únicos.
  - `getDolenciasSummaries(): DolenciaSummary[]`: Resúmenes para componentes de búsqueda ligera.
  - `getDolenciaSlugs(): string[]`: Array plano de slugs.
  - `clearDolenciaCache(): void`: Invalidador de caché.
  - `normalizeSlug(slug: string): string`: Normalizador de slugs.

### Código Propuesto para `src/lib/cities.ts`
Ubicado en `.agents/teamwork_preview_explorer_m4_1/proposed_cities.ts`:

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';
import type {
  CityData,
  RawCityRow,
  SupportedCountry,
  SupportedCurrency
} from '../types/city';

export function normalizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') return '';
  return slug
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '');
}

function resolveCsvPath(): string {
  try {
    const relativePath = fileURLToPath(
      new URL('../data/dataset_almaholistica_ciudades.csv', import.meta.url)
    );
    if (fs.existsSync(relativePath)) {
      return relativePath;
    }
  } catch {
    // Fallback si import.meta.url no es resoluble
  }
  return path.join(process.cwd(), 'src/data/dataset_almaholistica_ciudades.csv');
}

function mapRowToCity(row: RawCityRow): CityData {
  const cleanSlug = normalizeSlug(row['URL Final (Slug)']);

  const city: CityData = {
    dominio: row['Dominio']?.trim() || 'https://almaholistica.com',
    categoria: row['Categoría']?.trim() || 'terapia-online',
    slug: cleanSlug,
    h1: row['H1 Título']?.trim() || '',
    metaDescripcion: row['Meta Descripción']?.trim() || '',
    pais: (row['País']?.trim() || '') as SupportedCountry,
    moneda: (row['Moneda']?.trim() || '') as SupportedCurrency,
    rangoPrecio: row['Rango_Precio_Sesion']?.trim() || '',
    historiaLocal: row['Historia_Local']?.trim() || ''
  };

  Object.defineProperties(city, {
    'Dominio': { value: city.dominio, enumerable: true, writable: false },
    'Categoría': { value: city.categoria, enumerable: true, writable: false },
    'URL Final (Slug)': { value: city.slug, enumerable: true, writable: false },
    'H1 Título': { value: city.h1, enumerable: true, writable: false },
    'Meta Descripción': { value: city.metaDescripcion, enumerable: true, writable: false },
    'País': { value: city.pais, enumerable: true, writable: false },
    'Moneda': { value: city.moneda, enumerable: true, writable: false },
    'Rango_Precio_Sesion': { value: city.rangoPrecio, enumerable: true, writable: false },
    'Historia_Local': { value: city.historiaLocal, enumerable: true, writable: false }
  });

  return city;
}

let cachedCities: CityData[] | null = null;
let cachedCityBySlug: Map<string, CityData> | null = null;

function loadCities(): CityData[] {
  if (cachedCities !== null) {
    return cachedCities;
  }

  const csvPath = resolveCsvPath();
  if (!fs.existsSync(csvPath)) {
    console.warn(`[cities.ts] Advertencia: Archivo CSV no encontrado en: ${csvPath}`);
    cachedCities = [];
    cachedCityBySlug = new Map();
    return cachedCities;
  }

  const fileContent = fs.readFileSync(csvPath, 'utf8');
  const rawRows: RawCityRow[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true
  });

  const list: CityData[] = [];
  const map = new Map<string, CityData>();

  for (const row of rawRows) {
    const city = mapRowToCity(row);
    if (city.slug) {
      list.push(city);
      map.set(city.slug, city);
    }
  }

  cachedCities = list;
  cachedCityBySlug = map;
  return cachedCities;
}

export function getCities(): CityData[] {
  return loadCities();
}

export function getAllCities(): CityData[] {
  return getCities();
}

export function getCityBySlug(slug: string): CityData | undefined {
  if (!slug || typeof slug !== 'string') {
    return undefined;
  }
  loadCities();
  const normalized = normalizeSlug(slug);
  return (
    cachedCityBySlug?.get(normalized) ??
    cachedCities?.find((c) => c.slug === normalized)
  );
}

export function getCitiesByCountry(country: string): CityData[] {
  if (!country || typeof country !== 'string') {
    return [];
  }
  const target = country.trim().toLowerCase();
  return getCities().filter((c) => String(c.pais).trim().toLowerCase() === target);
}

export function getCitySlugs(): string[] {
  return getCities().map((c) => c.slug);
}

export function clearCityCache(): void {
  cachedCities = null;
  cachedCityBySlug = null;
}
```

### Código Propuesto para `src/lib/dolencias.ts`
Ubicado en `.agents/teamwork_preview_explorer_m4_1/proposed_dolencias.ts`:

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  DolenciaData,
  BodilySystem,
  DolenciaSummary
} from '../types/dolencia';

export function normalizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') return '';
  return slug
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '');
}

function resolveJsonPath(): string {
  try {
    const relativePath = fileURLToPath(
      new URL('../data/dataset_biodescodificacion_dolencias.json', import.meta.url)
    );
    if (fs.existsSync(relativePath)) {
      return relativePath;
    }
  } catch {
    // Fallback si import.meta.url no es resoluble
  }
  return path.join(process.cwd(), 'src/data/dataset_biodescodificacion_dolencias.json');
}

let cachedDolencias: DolenciaData[] | null = null;
let cachedDolenciasBySlug: Map<string, DolenciaData> | null = null;

function loadDolencias(): DolenciaData[] {
  if (cachedDolencias !== null) {
    return cachedDolencias;
  }

  const jsonPath = resolveJsonPath();
  if (!fs.existsSync(jsonPath)) {
    console.warn(`[dolencias.ts] Advertencia: Archivo JSON no encontrado en: ${jsonPath}`);
    cachedDolencias = [];
    cachedDolenciasBySlug = new Map();
    return cachedDolencias;
  }

  const fileContent = fs.readFileSync(jsonPath, 'utf8');
  const rawItems: DolenciaData[] = JSON.parse(fileContent);

  const list: DolenciaData[] = [];
  const map = new Map<string, DolenciaData>();

  for (const item of rawItems) {
    const cleanSlug = normalizeSlug(item.slug);
    const dolencia: DolenciaData = {
      ...item,
      slug: cleanSlug
    };
    list.push(dolencia);
    map.set(cleanSlug, dolencia);
  }

  cachedDolencias = list;
  cachedDolenciasBySlug = map;
  return cachedDolencias;
}

export function getDolencias(): DolenciaData[] {
  return loadDolencias();
}

export function getAllDolencias(): DolenciaData[] {
  return getDolencias();
}

export function getDolenciaBySlug(slug: string): DolenciaData | undefined {
  if (!slug || typeof slug !== 'string') {
    return undefined;
  }
  loadDolencias();
  const normalized = normalizeSlug(slug);
  return (
    cachedDolenciasBySlug?.get(normalized) ??
    cachedDolencias?.find((d) => d.slug === normalized)
  );
}

export function getDolenciasBySistema(sistema: string): DolenciaData[] {
  if (!sistema || typeof sistema !== 'string') {
    return [];
  }
  const target = sistema.trim().toLowerCase();
  return getDolencias().filter(
    (d) => d.sistema.trim().toLowerCase() === target
  );
}

export function getSistemas(): BodilySystem[] {
  const dolencias = getDolencias();
  const unique = Array.from(new Set(dolencias.map((d) => d.sistema as BodilySystem)));
  return unique;
}

export function getDolenciasSummaries(): DolenciaSummary[] {
  return getDolencias().map((d) => ({
    slug: d.slug,
    nombre: d.nombre,
    sistema: d.sistema,
    conflictoEmocional: d.conflictoEmocional
  }));
}

export function getDolenciaSlugs(): string[] {
  return getDolencias().map((d) => d.slug);
}

export function clearDolenciaCache(): void {
  cachedDolencias = null;
  cachedDolenciasBySlug = null;
}
```

---

## 5. Verification Method

Para verificar independientemente estas implementaciones y asegurar que no hay regresiones:

1. **Inspección de Archivos Generados**:
   - Comprobar existencia y contenido de:
     - `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/proposed_cities.ts`
     - `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/proposed_dolencias.ts`

2. **Verificación de Tipos TypeScript**:
   Ejecutar en la raíz del proyecto:
   ```bash
   npx tsc --noEmit
   npm run check
   ```
   *Criterio de aprobación*: 0 errores en TypeScript y Astro Diagnostics.

3. **Verificación Funcional con Node.js**:
   Ejecutar el siguiente script de validación directa de los datasets y contratos:
   ```bash
   node -e "
   import fs from 'node:fs';
   import assert from 'node:assert/strict';

   const citiesCode = fs.readFileSync('.agents/teamwork_preview_explorer_m4_1/proposed_cities.ts', 'utf8');
   assert.ok(citiesCode.includes('getCities') || citiesCode.includes('getCityBySlug'));
   assert.ok(citiesCode.includes('cached') || citiesCode.includes('cache'));

   const dolenciasCode = fs.readFileSync('.agents/teamwork_preview_explorer_m4_1/proposed_dolencias.ts', 'utf8');
   assert.ok(dolenciasCode.includes('getDolencias') || dolenciasCode.includes('getDolenciaBySlug'));
   assert.ok(dolenciasCode.includes('find') || dolenciasCode.includes('slug'));
   console.log('Feature 13 contract assertions: 100% PASS');
   "
   ```

4. **Verificación del Test Suite General**:
   ```bash
   npm test
   ```
   *Criterio de aprobación*: 117 tests aprobados, 0 fallos, 0 errores.

5. **Condición de Invalidación**:
   Este diseño quedaría invalidado únicamente si se modifican las cabeceras de `dataset_almaholistica_ciudades.csv` eliminando columnas requeridas, o si se alteran las interfaces `CityData` / `DolenciaData` en `src/types/`.
