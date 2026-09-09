# Informe de Arquitectura de Tipos TypeScript, Normalización de Slugs y Validación de Datasets (Hito M1)

**Autor**: `teamwork_preview_explorer_m1_3` (Especialista en Tipado TypeScript y Validación de Datos)  
**Destinatario**: `teamwork_preview_orchestrator_1` (id: `f77d1a94-c021-4fed-9bbe-9a2cc5b5d8bc`)  
**Fecha**: 2026-09-06T01:39:00Z  
**Directorio de trabajo**: `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m1_3/`  
**Tipo de Handoff**: Hard (Completo, con modelos TypeScript listos, reglas de normalización y script ejecutable de validación)

---

## 1. Observation

Durante la investigación técnica de los requerimientos para el Hito M1, se realizaron observaciones directas y comprobaciones empíricas sobre el repositorio y la arquitectura de datos:

### 1.1 Entorno del Proyecto y Archivos Existentes
- **Comando ejecutado**: `python3 --version && node -v`
  - Resultado: Python `3.14.6` y Node `v22.21.0`.
- **Estructura observada en `/Users/anthony/Downloads/almaholistica.com/`**:
  - `dataset_fluffy_stories.csv`: Archivo base con 101 líneas (1 cabecera + 100 ciudades en 18 países de LATAM).
  - Cabecera original en Fluffy: `Dominio,Categoría,URL Final (Slug),H1 Título,Meta Descripción,Moneda,País,Aeropuerto,Historia Local`.
  - Slugs originales en Fluffy: con prefijo `bulldog-frances-fluffy-[ciudad]`.
  - Presencia de 20 líneas finales (81 a 101) con celdas de `Historia Local` vacías o incompletas en el archivo base Fluffy.
  - Monedas en Fluffy: Se detectó el uso de `VES` para Venezuela (filas 97-101), mientras que en requerimientos se estipula `VED/USD`.

### 1.2 Requerimientos Mandatorios de `ORIGINAL_REQUEST.md` y `PROJECT.md`
- **Ciudades CSV (`src/data/dataset_almaholistica_ciudades.csv`)**:
  - Exactamente 9 columnas: `Dominio, Categoría, URL Final (Slug), H1 Título, Meta Descripción, País, Moneda, Rango_Precio_Sesion, Historia_Local` (`PROJECT.md` líneas 70-73).
  - Distribución geográfica: Más de 100 ciudades (100 en 18 países LATAM + 6 en España [Madrid, Barcelona, Valencia, Sevilla, Málaga, Bilbao] + 7 en EE.UU. hispanos [Miami, Los Ángeles, Houston, Nueva York, Chicago, Orlando, San Antonio] = 113 registros mínimos).
  - Normalización de slugs: Minúsculas, sin acentos ni barras iniciales o finales (ej: `bogota`, `madrid`, `miami`).
- **Dolencias JSON (`src/data/dataset_biodescodificacion_dolencias.json`)**:
  - Exactamente 45 patologías físicas y emocionales validadas (`PROJECT.md` líneas 76-88).
  - 9 propiedades obligatorias por objeto: `slug`, `nombre`, `sistema`, `conflictoEmocional`, `sentidoBiologico`, `reprogramacion`, `preguntasReflexion` (array >= 3), `faqs` (array de objetos `{ pregunta, respuesta }` >= 3), `ganchoAgendamiento`.
  - Cobertura de 7 sistemas biológicos: `Digestivo`, `Nervioso / Emocional`, `Osteoarticular`, `Dermatológico`, `Respiratorio`, `Endocrino / Metabólico`, `Inmunológico / Circulatorio`.
- **Rutas y Jerarquía en Astro**:
  - Ciudades: `src/pages/[slug].astro` (montadas en la raíz `https://almaholistica.com/[slug]`).
  - Dolencias: `src/pages/biodescodificacion/[slug].astro`.
  - Directorio de Dolencias: `src/pages/biodescodificacion/index.astro`.

### 1.3 Detección de Colisión Crítica en Slugs de Ciudades
- Al analizar los 100 slugs de LATAM del dataset base y compararlos con las 13 ciudades adicionales planteadas por Explorer 1 (`teamwork_preview_explorer_m1_1/generate_cities_preview.py`):
  - **Fila 99 de Fluffy**: `Venezuela: valencia` (slug: `bulldog-frances-fluffy-valencia` -> `valencia`).
  - **Ciudad #3 de España en Explorer 1**: `España: Valencia` (slug: `valencia`).
  - **Resultado**: Si ambas ciudades generan la URL `/valencia`, se produce una colisión fatal en tiempo de compilación SSG en Astro (`getStaticPaths` fallará por conflicto de rutas duplicadas en `[slug].astro`).

---

## 2. Logic Chain

A partir de las observaciones verificadas, se deduce la siguiente arquitectura técnica para tipos, normalización y validación:

### 2.1 Diseño de Tipos TypeScript (`src/types/city.ts` y `src/types/dolencia.ts`)
1. **Desacoplamiento Estricto de Datos y Rutas**:
   - Para evitar dependencias circulares y permitir que los módulos de carga SSG (`src/lib/cities.ts`, `src/lib/dolencias.ts`), los componentes Astro (`[slug].astro`), y los generadores Schema.org (`src/lib/schema.ts`) compartan contratos idénticos, los tipos deben residir en `src/types/`.
2. **Representación Dual de Ciudades (Crudo vs Normalizado)**:
   - La lectura de un archivo CSV produce objetos cuyas claves corresponden literalmente a los encabezados (con espacios, tildes y paréntesis). Se definió `RawCityRow` para tipar la lectura con `csv-parse/sync`.
   - La entidad interna `CityData` normaliza estas propiedades a camelCase (`dominio`, `categoria`, `slug`, `h1`, `metaDescripcion`, `pais`, `moneda`, `rangoPrecio`, `historiaLocal`).
   - Se crearon tipos auxiliares de unión estricta: `SupportedCountry` (los 20 países) y `SupportedCurrency` (las 18 monedas ISO soportadas), así como las interfaces de rutas de Astro (`CityRouteProps`, `CityStaticPath`).
3. **Estructura Estricta de Dolencias**:
   - `FAQItem`: sub-entidad para las preguntas frecuentes tipadas `{ pregunta: string; respuesta: string }`.
   - `BodilySystem`: unión de los 7 sistemas biológicos reconocidos.
   - `DolenciaData`: interfaz exhaustiva con `readonly` para inmutabilidad durante el ciclo de vida SSG.

### 2.2 Criterios de Unicidad y Normalización de Slugs
1. **Regla de Formato URL-Safe**:
   - Expresión regular canónica: `^[a-z0-9]+(-[a-z0-9]+)*$`
   - Restricciones: longitud 2-60 caracteres, minúsculas exclusivas, sin diacríticos/acentos, sin barras (`/` o `\`), sin guiones al inicio o final, sin guiones dobles (`--`).
2. **Algoritmo Universal de Normalización**:
   - Descomposición Unicode NFD / NFKD para separar letras base de tildes/marcas de combinación.
   - Eliminación de marcas `\u0300-\u036f`.
   - Sustitución de caracteres especiales (`ñ` -> `n`, `ü` -> `u`, `ç` -> `c`).
   - Conversión a minúsculas (`toLowerCase()`).
   - Reemplazo de caracteres no alfanuméricos por guion `-`.
   - Colapso de guiones consecutivos (`/-+/g` -> `-`).
   - Recorte de guiones iniciales y finales.
3. **Resolución de Colisiones entre Ciudades Homónimas**:
   - Dado que las páginas de ciudades se ubican en la raíz `/[slug].astro`, no puede haber dos ciudades con el mismo slug.
   - En el dataset Fluffy original se adoptó el estándar de sufijo de país para ciudades secundarias:
     - `santiago` (Chile) vs `santiago-rd` (República Dominicana).
     - `santo-domingo` (República Dominicana) vs `santo-domingo-ec` (Ecuador).
     - `leon` (México) vs `leon-ni` (Nicaragua).
   - **Solución para Valencia**:
     - Venezuela mantiene `valencia` (o `valencia-ve`).
     - España debe utilizar obligatoriamente **`valencia-es`** (o `valencia-espana`).
4. **Protección contra Colisión con Rutas Reservadas de Astro**:
   - Como `[slug].astro` captura cualquier ruta raíz, ningún slug de ciudad puede llamarse igual que rutas maestras o archivos estáticos:
     `RESERVED_SLUGS = {'index', 'home', 'biodescodificacion', 'api', 'sitemap', 'sitemap-index', 'sitemap-0', 'robots', 'favicon', 'admin', 'auth', 'login', 'contacto', 'nosotros', 'terminos', 'privacidad', 'assets', 'public', 'static', 'wa', 'whatsapp', 'quiz'}`.
5. **Aislamiento Cruzado con Dolencias**:
   - Aunque las dolencias se ubican bajo `/biodescodificacion/[slug].astro`, la suite de validación comprueba la intersección de conjuntos (`city_slugs ∩ dolencia_slugs`) para asegurar cero ambigüedad conceptual.

### 2.3 Script de Validación Automatizada (`scripts/validate_datasets.py`)
1. **Elección de Python 3 para el Gate**:
   - Python 3.14.6 está preinstalado.
   - Su biblioteca estándar (`csv`, `json`, `re`, `sys`, `os`, `unicodedata`, `argparse`) no requiere dependencias externas (`npm install`, `node_modules`).
   - Puede ejecutarse inmediatamente tanto en local, en scripts de pipeline o en el comando `npm test`.
2. **Matriz de Puntos de Control (Checkpoints)**:
   - **Ciudades CSV**:
     - `[C1]` Archivo legible UTF-8.
     - `[C2]` Cabeceras exactas (9 columnas en orden exacto).
     - `[C3]` Filas mínimas: >= 113.
     - `[C4]` Celdas sin vacíos ni nulos ni cadenas en blanco.
     - `[C5]` Cobertura total de los 20 países aprobados.
     - `[C6]` Monedas aprobadas (incluyendo soporte de `VES` y `VED`).
     - `[C7]` Rango de precio no vacío con datos numéricos.
     - `[C8]` Slugs conformes a regex sin tildes ni mayúsculas.
     - `[C9]` Unicidad estricta de slugs (0 duplicados).
     - `[C10]` Cero colisiones con palabras reservadas.
     - `[C11]` Cero términos caninos residuales (`bulldog`, `cachorro`, `criadero`, `pedigree`, etc.).
     - `[C12]` Longitud cualitativa de `Historia_Local` (mín. 80 caracteres).
   - **Dolencias JSON**:
     - `[D1]` Archivo JSON parseable como Array.
     - `[D2]` Conteo exacto: 45 elementos.
     - `[D3]` 9 campos obligatorios en cada objeto.
     - `[D4]` Ningún campo nulo ni vacío.
     - `[D5]` `preguntasReflexion`: array >= 3 preguntas no vacías.
     - `[D6]` `faqs`: array >= 3 objetos `{ pregunta, respuesta }` no vacíos.
     - `[D7]` Cobertura de los 7 sistemas biológicos aprobados.
     - `[D8]` Slugs conformes a regex sin tildes ni mayúsculas.
     - `[D9]` Unicidad estricta de los 45 slugs.
     - `[D10]` Profundidad cualitativa en conflicto, sentido y reprogramación (> 20 caracteres c/u).
   - **Integridad Cruzada**:
     - `[X1]` Cero intersección entre slugs de ciudades y dolencias.

---

## 3. Caveats

1. **Moneda de Venezuela**: En `ORIGINAL_REQUEST.md` se menciona `VED/USD`, mientras que en `dataset_fluffy_stories.csv` se utilizaba `VES`. El validador admite tanto `VED`, `VES` como `USD` para evitar falsos positivos si el Worker utiliza una u otra nomenclatura bancaria venezolana.
2. **Dependencia de `csv-parse` en Node**: Para el código Astro final en `src/lib/cities.ts`, se requiere el paquete `csv-parse`. El script de validación aquí diseñado (`validate_datasets.py`) es independiente de Node, permitiendo validar los datasets en el hito M1 incluso antes de que `package.json` esté configurado o instalado.
3. **Sufijo de Valencia**: Debe coordinarse con Explorer 1 (`teamwork_preview_explorer_m1_1`) y el Worker de M1 que Valencia (España) debe generarse con el slug `valencia-es`.

---

## 4. Conclusion & Artefactos Generados

Se han diseñado, verificado y almacenado en el directorio de trabajo del agente los tres componentes requeridos para Hito M1:

### 4.1 Código de `src/types/city.ts` (Artefacto: `proposed_city.ts`)
```typescript
/**
 * src/types/city.ts
 * Interfaces y tipos estrictos para el dataset de ciudades (SEO Hiperlocal).
 * Proyecto: Alma Holística (almaholistica.com)
 */

export type SupportedCountry =
  | 'Colombia'
  | 'México'
  | 'Chile'
  | 'Argentina'
  | 'Perú'
  | 'Ecuador'
  | 'Bolivia'
  | 'Uruguay'
  | 'Paraguay'
  | 'Venezuela'
  | 'Costa Rica'
  | 'Panamá'
  | 'República Dominicana'
  | 'Guatemala'
  | 'El Salvador'
  | 'Honduras'
  | 'Nicaragua'
  | 'Brasil'
  | 'España'
  | 'Estados Unidos';

export type SupportedCurrency =
  | 'COP' | 'MXN' | 'CLP' | 'ARS' | 'PEN' | 'USD' | 'BOB' | 'UYU' | 'PYG'
  | 'VED' | 'CRC' | 'PAB' | 'DOP' | 'GTQ' | 'HNL' | 'NIO' | 'BRL' | 'EUR';

export interface RawCityRow {
  readonly Dominio: string;
  readonly Categoría: string;
  readonly 'URL Final (Slug)': string;
  readonly 'H1 Título': string;
  readonly 'Meta Descripción': string;
  readonly País: string;
  readonly Moneda: string;
  readonly Rango_Precio_Sesion: string;
  readonly Historia_Local: string;
}

export interface CityData {
  readonly dominio: string;
  readonly categoria: string;
  readonly slug: string;
  readonly h1: string;
  readonly metaDescripcion: string;
  readonly pais: SupportedCountry | string;
  readonly moneda: SupportedCurrency | string;
  readonly rangoPrecio: string;
  readonly historiaLocal: string;
}

export interface CityRouteProps {
  readonly city: CityData;
}

export interface CityStaticPath {
  readonly params: { readonly slug: string };
  readonly props: CityRouteProps;
}
```

### 4.2 Código de `src/types/dolencia.ts` (Artefacto: `proposed_dolencia.ts`)
```typescript
/**
 * src/types/dolencia.ts
 * Interfaces y tipos estrictos para el catálogo de 45 dolencias de Biodescodificación.
 * Proyecto: Alma Holística (almaholistica.com)
 */

export type BodilySystem =
  | 'Digestivo'
  | 'Nervioso / Emocional'
  | 'Osteoarticular'
  | 'Dermatológico'
  | 'Respiratorio'
  | 'Endocrino / Metabólico'
  | 'Inmunológico / Circulatorio';

export interface FAQItem {
  readonly pregunta: string;
  readonly respuesta: string;
}

export interface DolenciaData {
  readonly slug: string;
  readonly nombre: string;
  readonly sistema: BodilySystem | string;
  readonly conflictoEmocional: string;
  readonly sentidoBiologico: string;
  readonly reprogramacion: string;
  readonly preguntasReflexion: readonly string[];
  readonly faqs: readonly FAQItem[];
  readonly ganchoAgendamiento: string;
}

export interface DolenciaRouteProps {
  readonly dolencia: DolenciaData;
}

export interface DolenciaStaticPath {
  readonly params: { readonly slug: string };
  readonly props: DolenciaRouteProps;
}

export type DolenciaSummary = Pick<DolenciaData, 'slug' | 'nombre' | 'sistema' | 'conflictoEmocional'>;
```

### 4.3 Script Ejecutable `scripts/validate_datasets.py` (Artefacto: `proposed_validate_datasets.py`)
El archivo completo se encuentra probado y guardado en `.agents/teamwork_preview_explorer_m1_3/proposed_validate_datasets.py`. Contiene validación completa de cabeceras, formato de filas, detección de 20 países, 45 patologías, 7 sistemas corporales, limpieza contra palabras caninas y retorno con código de salida `0` (éxito) o `1` (fallo).

---

## 5. Verification Method

Para verificar independientemente este trabajo y ejecutar el gate de validación:

1. **Inspección de Archivos Propuestos**:
   - Verificar la sintaxis de los tipos:
     `view_file /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m1_3/proposed_city.ts`
     `view_file /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m1_3/proposed_dolencia.ts`
2. **Prueba de Ejecución del Script de Validación**:
   - Ejecutar el script contra los datasets una vez que el Worker de M1 los genere en `src/data/`:
     ```bash
     python3 .agents/teamwork_preview_explorer_m1_3/proposed_validate_datasets.py \
       --cities-csv src/data/dataset_almaholistica_ciudades.csv \
       --dolencias-json src/data/dataset_biodescodificacion_dolencias.json
     ```
   - O una vez instalado en su destino final:
     ```bash
     python3 scripts/validate_datasets.py
     ```
3. **Condición de Invalidación**:
   - Si el validador no detecta duplicados de slugs (por ejemplo si existiera `valencia` dos veces).
   - Si el validador no detecta si un país de los 20 falta en el CSV.
   - Si el validador permite un JSON con 44 o 46 dolencias en lugar de exactamente 45.
   *(Todas estas condiciones fueron probadas y verificadas con éxito durante la fase de análisis).*
