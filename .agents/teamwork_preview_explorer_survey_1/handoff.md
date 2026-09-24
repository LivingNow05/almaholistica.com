# Informe de Investigación Técnica y Arquitectura de Datos: 20 Hubs de País en Astro
**Agente**: `teamwork_preview_explorer_survey_1`  
**Fase**: Levantamiento y Exploración (Survey Phase)  
**Proyecto**: Alma Holística (`almaholistica.com`)  
**Fecha/Hora**: 2026-09-24T05:15:00Z  
**Archivo de destino**: `.agents/teamwork_preview_explorer_survey_1/handoff.md`

---

## 1. Observaciones Directas (Observations)

### 1.1. Inspección de Archivos Clave del Repositorio
- **`astro.config.mjs`** (líneas 1-14):
  Configuración confirmada:
  ```javascript
  export default defineConfig({
    site: 'https://almaholistica.com',
    output: 'static',
    trailingSlash: 'always',
    integrations: [ react(), tailwind() ]
  });
  ```
  *Observación*: Todas las páginas generadas compilan en modo estático a directorios con `index.html` y requieren URLs canónicas con barra final (`trailingSlash: 'always'`).

- **`src/pages/[slug].astro`** (líneas 19-25 y 73):
  ```typescript
  export async function getStaticPaths(): Promise<CityStaticPath[]> {
    const cities = getCities();
    return cities.map((city) => ({
      params: { slug: city.slug },
      props: { city },
    }));
  }
  ```
  La URL canónica se calcula como:
  ```typescript
  const canonicalUrl = `https://almaholistica.com/${rawSlug}/`;
  ```
  *Observación*: Actualmente `[slug].astro` consume `getCities()` y genera exclusivamente las páginas de ciudades.

- **`src/lib/cities.ts`** (líneas 104-125 y 135-137):
  - Analiza `src/data/dataset_almaholistica_ciudades.csv` con `csv-parse/sync`.
  - Memoiza en memoria `cachedCities` y `cachedCityBySlug`.
  - Provee `getCities()`, `getCityBySlug()`, `getCitiesByCountry()`, `getCitySlugs()`.

- **`src/types/city.ts`** (líneas 10-54):
  - Define `SupportedCountry` con exactamente 20 países (`Colombia | México | Chile | Argentina | Perú | Ecuador | Bolivia | Uruguay | Paraguay | Venezuela | Costa Rica | Panamá | República Dominicana | Guatemala | El Salvador | Honduras | Nicaragua | Brasil | España | Estados Unidos`).
  - Define `SupportedCurrency` con 18 códigos ISO (`COP, MXN, CLP, ARS, PEN, USD, BOB, UYU, PYG, VED, CRC, PAB, DOP, GTQ, HNL, NIO, BRL, EUR`).

- **`src/data/dataset_almaholistica_ciudades.csv`**:
  - Contiene exactamente 113 filas de datos (más 1 fila de cabecera con 9 columnas: `Dominio, Categoría, URL Final (Slug), H1 Título, Meta Descripción, País, Moneda, Rango_Precio_Sesion, Historia_Local`).
  - Todos los 113 slugs poseen el prefijo obligatorio `biodescodificacion-`.

- **`src/data/dataset_almaholistica_ciudades_eeat_geo.json`**:
  - Contiene exactamente 113 registros de ciudades con metadatos E-E-A-T y GEO (`URL Final (Slug)` sin prefijo `biodescodificacion-`, nombre de especialista, cargo, registro profesional, experiencia, formación, aval científico y preguntas frecuentes locales).

- **`scripts/generate_sitemap.py`** (líneas 61-86, 142):
  - Actualmente genera sitemaps para 160 URLs: 1 Home (`/`) + 1 Catálogo (`/biodescodificacion/`) + 113 Ciudades (`/{slug}/`) + 45 Dolencias (`/biodescodificacion/{slug}/`).

---

### 1.2. Mapeo Exhaustivo: 20 Países y Distribución de las 113 Ciudades
La distribución confirmada mediante inspección algorítmica es:

| # | País | Moneda | Cantidad | Lista Completa de Slugs en Dataset Actual |
|---|------|--------|----------|-------------------------------------------|
| 1 | **Colombia** | COP | 5 | `biodescodificacion-bogota`, `biodescodificacion-medellin`, `biodescodificacion-cali`, `biodescodificacion-barranquilla`, `biodescodificacion-cartagena` |
| 2 | **México** | MXN | 15 | `biodescodificacion-cdmx`, `biodescodificacion-guadalajara`, `biodescodificacion-monterrey`, `biodescodificacion-puebla`, `biodescodificacion-toluca`, `biodescodificacion-tijuana`, `biodescodificacion-leon`, `biodescodificacion-ciudad-juarez`, `biodescodificacion-torreon`, `biodescodificacion-queretaro`, `biodescodificacion-san-luis-potosi`, `biodescodificacion-merida`, `biodescodificacion-aguascalientes`, `biodescodificacion-hermosillo`, `biodescodificacion-saltillo` |
| 3 | **Costa Rica** | CRC | 5 | `biodescodificacion-san-jose`, `biodescodificacion-alajuela`, `biodescodificacion-cartago`, `biodescodificacion-heredia`, `biodescodificacion-puntarenas` |
| 4 | **El Salvador** | USD | 5 | `biodescodificacion-san-salvador`, `biodescodificacion-santa-ana`, `biodescodificacion-san-miguel`, `biodescodificacion-soyapango`, `biodescodificacion-santa-tecla` |
| 5 | **Guatemala** | GTQ | 5 | `biodescodificacion-ciudad-de-guatemala`, `biodescodificacion-mixco`, `biodescodificacion-villa-nueva`, `biodescodificacion-quetzaltenango`, `biodescodificacion-antigua-guatemala` |
| 6 | **Honduras** | HNL | 5 | `biodescodificacion-tegucigalpa`, `biodescodificacion-san-pedro-sula`, `biodescodificacion-choloma`, `biodescodificacion-la-ceiba`, `biodescodificacion-el-progreso` |
| 7 | **Nicaragua** | NIO | 5 | `biodescodificacion-managua`, `biodescodificacion-leon-ni`, `biodescodificacion-masaya`, `biodescodificacion-chinandega`, `biodescodificacion-granada` |
| 8 | **Panamá** | USD | 5 | `biodescodificacion-panama` *(conflicto detectado)*, `biodescodificacion-colon`, `biodescodificacion-david`, `biodescodificacion-san-miguelito`, `biodescodificacion-la-chorrera` |
| 9 | **República Dominicana** | DOP | 5 | `biodescodificacion-santo-domingo`, `biodescodificacion-santiago-rd`, `biodescodificacion-la-romana`, `biodescodificacion-san-pedro-macoris`, `biodescodificacion-punta-cana` |
| 10 | **Argentina** | ARS | 5 | `biodescodificacion-buenos-aires`, `biodescodificacion-cordoba`, `biodescodificacion-rosario`, `biodescodificacion-mendoza`, `biodescodificacion-la-plata` |
| 11 | **Bolivia** | BOB | 5 | `biodescodificacion-la-paz`, `biodescodificacion-santa-cruz`, `biodescodificacion-cochabamba`, `biodescodificacion-sucre`, `biodescodificacion-el-alto` |
| 12 | **Brasil** | BRL | 5 | `biodescodificacion-sao-paulo`, `biodescodificacion-rio-de-janeiro`, `biodescodificacion-brasilia`, `biodescodificacion-salvador`, `biodescodificacion-fortaleza` |
| 13 | **Chile** | CLP | 5 | `biodescodificacion-santiago`, `biodescodificacion-valparaiso`, `biodescodificacion-concepcion`, `biodescodificacion-la-serena`, `biodescodificacion-antofagasta` |
| 14 | **Ecuador** | USD | 5 | `biodescodificacion-quito`, `biodescodificacion-guayaquil`, `biodescodificacion-cuenca`, `biodescodificacion-santo-domingo-ec`, `biodescodificacion-ambato` |
| 15 | **Paraguay** | PYG | 5 | `biodescodificacion-asuncion`, `biodescodificacion-ciudad-del-este`, `biodescodificacion-san-lorenzo`, `biodescodificacion-luque`, `biodescodificacion-capiata` |
| 16 | **Perú** | PEN | 5 | `biodescodificacion-lima`, `biodescodificacion-arequipa`, `biodescodificacion-trujillo`, `biodescodificacion-chiclayo`, `biodescodificacion-piura` |
| 17 | **Uruguay** | UYU | 5 | `biodescodificacion-montevideo`, `biodescodificacion-salto`, `biodescodificacion-ciudad-de-la-costa`, `biodescodificacion-paysandu`, `biodescodificacion-maldonado` |
| 18 | **Venezuela** | USD | 5 | `biodescodificacion-caracas`, `biodescodificacion-maracaibo`, `biodescodificacion-valencia-ve`, `biodescodificacion-barquisimeto`, `biodescodificacion-maracay` |
| 19 | **España** | EUR | 6 | `biodescodificacion-madrid`, `biodescodificacion-barcelona`, `biodescodificacion-valencia`, `biodescodificacion-sevilla`, `biodescodificacion-malaga`, `biodescodificacion-bilbao` |
| 20 | **Estados Unidos** | USD | 7 | `biodescodificacion-miami`, `biodescodificacion-los-angeles`, `biodescodificacion-houston`, `biodescodificacion-nueva-york`, `biodescodificacion-chicago`, `biodescodificacion-orlando`, `biodescodificacion-san-antonio` |

**Total de Ciudades**: $5 \times 17 + 15 + 6 + 7 = 85 + 15 + 6 + 7 = 113$ ciudades exactas distribuidas en 20 países.

---

### 1.3. Detección Crítica: Colisión de Slugs en Panamá
Al cruzar los slugs canónicos previstos para los 20 países (`/biodescodificacion-{pais}/`) con los 113 slugs de ciudades:
- **19 países** no tienen colisión alguna con los slugs de sus ciudades (ej: país México es `biodescodificacion-mexico` y su capital es `biodescodificacion-cdmx`; país Guatemala es `biodescodificacion-guatemala` y su capital es `biodescodificacion-ciudad-de-guatemala`).
- **País Panamá**:
  - Slug canónico del Hub de País según R1: `biodescodificacion-panama`.
  - Slug actual de Ciudad de Panamá en `dataset_almaholistica_ciudades.csv`: `biodescodificacion-panama` (con H1 `"Terapia de Biodescodificación Biológica en Ciudad de Panamá"`).
  - *Conflicto*: Si ambos coexisten con el mismo slug en Astro SSG, se produce una sobreescritura de ruta (`[getStaticPaths] duplicate route`) y el censo total de URLs generadas sería 179 en lugar de 180.

---

### 1.4. Auditoría de Datos Disponibles para los 20 Países
- **Datos actualmente existentes**:
  - `País` y `Moneda`: presentes en el CSV de ciudades y `public/llms.txt`.
  - `Especialistas Clínicos`: 3 profesionales seniors definidos en `dataset_almaholistica_ciudades_eeat_geo.json`:
    1. *Lic. Sofía Alarcón Valdés* (Reg. ITH-8492)
    2. *Dr. Mateo Benavides Rivas* (Reg. AIE-5120)
    3. *Dra. Elena Monsalve Duarte* (Reg. CIT-6311)
- **Datos inexistentes a nivel país** (requieren formalizarse en un nuevo dataset):
  - *Husos Horarios específicos*: COT (UTC-5), CST (UTC-6), ART (UTC-3), CLT (UTC-3/4), CET (UTC+1), etc.
  - *Pasarelas y medios de pago locales representativos*: PSE / Nequi (Colombia), SPEI / OXXO (México), Bizum (España), Mercado Pago (Argentina), Webpay (Chile), Yape / Plin (Perú), SINPE Móvil (Costa Rica), etc.
  - *Marco regulatorio ético/sanitario localizado*: Adecuación a la normativa de salud y terapias complementarias de cada país (garantizando estricto apego YMYL sin sustituir la medicina alopática).
  - *Definición clínica adaptada*: Contextualización de la biodescodificación según la realidad y tensiones socioculturales de cada nación.
  - *Preguntas frecuentes del país*: Mínimo 3 FAQs localizadas por país para inyección en Schema `FAQPage`.

---

## 2. Cadena Lógica (Logic Chain)

1. **Premisa 1 (Enrutamiento SSG en Astro)**:
   - En Astro, todos los archivos bajo `src/pages/` determinan la estructura de URLs estáticas.
   - Las páginas de ciudades se compilan como `dist/{slug}/index.html` mediante `src/pages/[slug].astro`.
   - Las páginas Hub de País deben tener el formato `/biodescodificacion-{pais}/`, lo que significa que residen en el mismo nivel de raíz que las ciudades (`dist/biodescodificacion-{pais}/index.html`).
   - Astro prohíbe tener dos archivos con parámetros dinámicos en el mismo directorio (ej. no se puede tener `src/pages/[citySlug].astro` y `src/pages/[countrySlug].astro`).

2. **Premisa 2 (Estrategia de Enrutamiento Óptima)**:
   - Puesto que tanto las 113 ciudades como los 20 países comparten la estructura de slug raíz (`/:slug/`), la arquitectura SSG más limpia y canónica en Astro es unificar la generación en `src/pages/[slug].astro`.
   - `getStaticPaths()` retornará la unión de las 113 rutas de ciudades y las 20 rutas de países (133 rutas dinámicas totales).
   - Para mantener una estricta separación de responsabilidades y modularidad de código, `src/pages/[slug].astro` discriminará por tipo de página (`type: 'city'` vs `type: 'country'`) renderizando la vista correspondiente o delegando en componentes dedicados: `<CityTemplate city={city} />` y `<CountryHubTemplate country={country} />`.

3. **Premisa 3 (Resolución del Conflicto de Slug en Panamá)**:
   - El requerimiento R1 estipula que los 20 Hubs deben llamarse `/biodescodificacion-{pais}/` (por ende, Panamá País debe ser obligatoriamente `/biodescodificacion-panama/`).
   - El censo de páginas exige exactamente 180 archivos HTML (1 Home + 1 Catálogo + 45 Dolencias + 113 Ciudades + 20 Países).
   - La capital de Panamá en el dataset es `"Ciudad de Panamá"`, con H1 `"Terapia de Biodescodificación Biológica en Ciudad de Panamá"`.
   - Siguiendo el estándar exacto aplicado a `"Ciudad de Guatemala"` (`biodescodificacion-ciudad-de-guatemala`), la ciudad de Panamá debe renombrarse a `biodescodificacion-ciudad-de-panama`.
   - Esto elimina la colisión, preserva la cuenta de 113 ciudades y 20 países distintos, y garantiza 180 páginas HTML únicas sin conflicto.

4. **Premisa 4 (Necesidad de `dataset_almaholistica_paises.json`)**:
   - Para cumplir R2 con profundidad clínica y rigor YMYL, no es suficiente heredar textos genéricos de las ciudades.
   - Es mandatorio estructurar `src/data/dataset_almaholistica_paises.json` conteniendo los 20 registros con sus contratos de datos tipados (`CountryData`), incluyendo su lista de ciudades subordinadas, huso horario, pasarelas de pago, marco regulatorio, especialista asignado y 3 FAQs con marcado estructurado.

---

## 3. Salvedades y Advertencias (Caveats)

1. **Aserciones en Suites de Pruebas**:
   - Múltiples tests adversariales (`tests/adversarial_challenger_m5.test.mjs`, `tests/adversarial_challenger_m4.test.mjs`, `tests/adversarial_r1_r2_challenger.py`, `tests/adversarial_r3_r4_challenger.py`, etc.) comprueban censos numéricos fijos:
     - `160 páginas HTML en dist/` $\rightarrow$ Pasará a ser **180 páginas**.
     - `361 schemas JSON-LD en dist/` $\rightarrow$ Pasará a ser **421 schemas** (113 ciudades $\times$ 2 + 45 dolencias $\times$ 3 + 20 países $\times$ 3).
     - `sitemap-0.xml con 160 URLs` $\rightarrow$ Pasará a ser **180 URLs**.
   - Los tests deberán ser actualizados de forma sincronizada al implementar los 20 Hubs para evitar falsos negativos.

2. **Breadcrumbs Jerárquicos en Ciudades (R3)**:
   - Actualmente las ciudades tienen migas: `Inicio` > `Ciudades` > `[Ciudad]`.
   - R3 exige: `Inicio` > `[Nombre del País]` > `[Ciudad]`, donde `[Nombre del País]` enlaza canónicamente a `/biodescodificacion-{pais}/`.
   - `buildBreadcrumbSchema` y el marcado visual en `[slug].astro` requerirán recibir el slug del país correspondiente.

3. **Invariante Adversarial MR3-CH2-4.5 en Home**:
   - La página `index.astro` tiene prohibido inyectar bloques JSON-LD (`MR3-CH2-4.5`).
   - Al incorporar la sección con enlaces a los 20 Hubs en la Home (R3), debe asegurarse que no se introduzcan scripts `type="application/ld+json"` en `src/pages/index.astro`.

---

## 4. Conclusión y Recomendación de Arquitectura

### 4.1. Estrategia de Enrutamiento Recomendada
- **Archivo unificado**: Mantener `src/pages/[slug].astro` como enrutador dinámico raíz.
- **Mecanismo `getStaticPaths()`**:
  ```typescript
  export async function getStaticPaths() {
    const cities = getCities();
    const countries = getCountries();

    const cityPaths = cities.map((city) => ({
      params: { slug: city.slug },
      props: { type: 'city' as const, city, country: null },
    }));

    const countryPaths = countries.map((country) => ({
      params: { slug: country.slug },
      props: { type: 'country' as const, city: null, country },
    }));

    return [...cityPaths, ...countryPaths];
  }
  ```
- **Modularidad**: Encapsular el diseño del Hub de País en un componente dedicado (ej. `src/components/country/CountryHubView.astro`) y el de Ciudad en `src/components/city/CityView.astro` (o renderizado condicional limpio en `[slug].astro`).

### 4.2. Contratos de Datos Formales para R1 y R2

#### Contrato 1: `CountryData` (`src/types/country.ts`)
```typescript
import type { SupportedCountry, SupportedCurrency } from './city';

export interface CountrySpecialist {
  readonly nombre: string;
  readonly cargo: string;
  readonly registro: string;
  readonly experiencia: string;
  readonly formacion: string;
  readonly avalCientifico: string;
}

export interface CountryFAQ {
  readonly pregunta: string;
  readonly respuesta: string;
}

export interface CountryCityItem {
  readonly slug: string;
  readonly nombre: string;
  readonly precio: string;
}

export interface CountryData {
  readonly pais: SupportedCountry;
  readonly slug: string; // ej: "biodescodificacion-colombia"
  readonly h1: string;
  readonly metaDescripcion: string;
  readonly moneda: SupportedCurrency;
  readonly rangoPrecio: string;
  readonly husoHorario: string; // ej: "COT (UTC-5)"
  readonly pasarelasPago: readonly string[]; // ej: ["PSE", "Bancolombia", "Nequi", "Tarjetas"]
  readonly marcoRegulatorio: string; // Leyes locales sobre terapias complementarias
  readonly descargoResponsabilidad: string; // Compromiso ético YMYL
  readonly definicionClinica: string;
  readonly especialistaAsignado: CountrySpecialist;
  readonly ciudades: readonly CountryCityItem[];
  readonly faqs: readonly CountryFAQ[]; // Mínimo 3
}
```

#### Contrato 2: Módulo Lector `src/lib/countries.ts`
- `getCountries(): CountryData[]`
- `getCountryBySlug(slug: string): CountryData | undefined`
- `getCountryByName(name: string): CountryData | undefined`
- `getCountrySlugs(): string[]`

#### Contrato 3: Schemas de País en `src/lib/schema.ts`
Cada Hub de País inyecta exactamente 3 esquemas JSON-LD:
1. `MedicalWebPage`: con la definición clínica del servicio y terapia bioemocional en el país.
2. `FAQPage`: generado a partir de las 3 FAQs del país (`buildFAQSchema(country.faqs)`).
3. `BreadcrumbList`: `Inicio` (`/`) $\rightarrow$ `{country.pais}` (`/biodescodificacion-{pais}/`).

---

## 5. Método de Verificación Independiente (Verification Method)

Para validar que el censo, las rutas y los contratos se cumplan estrictamente:

1. **Verificación de Censo de Archivos en `dist/`**:
   ```bash
   npm run build
   node -e '
     const fs = require("fs");
     const path = require("path");
     const distDir = "dist";
     let count = 0;
     function walk(d) {
       for (const e of fs.readdirSync(d, { withFileTypes: true })) {
         if (e.isDirectory()) walk(path.join(d, e.name));
         else if (e.name.endsWith(".html")) count++;
       }
     }
     walk(distDir);
     console.log("Total HTML pages in dist:", count);
     if (count !== 180) throw new Error("Expected 180 pages, found " + count);
     console.log("✅ Censo de 180 páginas perfecto!");
   '
   ```

2. **Verificación de los 20 Hubs de País**:
   ```bash
   node -e '
     const fs = require("fs");
     const countries = ["colombia", "mexico", "costa-rica", "el-salvador", "guatemala", "honduras", "nicaragua", "panama", "republica-dominicana", "argentina", "bolivia", "brasil", "chile", "ecuador", "paraguay", "peru", "uruguay", "venezuela", "espana", "estados-unidos"];
     for (const c of countries) {
       const p = `dist/biodescodificacion-${c}/index.html`;
       if (!fs.existsSync(p)) throw new Error("Missing country hub: " + p);
     }
     console.log("✅ Los 20 Hubs de País existen físicamente en dist/!");
   '
   ```

3. **Verificación de Colisiones y No-Redundancia**:
   ```bash
   node -e '
     const fs = require("fs");
     const sitemap = fs.readFileSync("dist/sitemap-0.xml", "utf8");
     const urls = [...sitemap.matchAll(/<loc>(https:\/\/almaholistica\.com\/[^<]+)<\/loc>/g)].map(m => m[1]);
     const unique = new Set(urls);
     console.log("URLs en sitemap:", urls.length, "Únicas:", unique.size);
     if (unique.size !== 180) throw new Error("Discrepancia en sitemap: esperado 180 URLs únicas");
     console.log("✅ 180 URLs únicas y sin duplicados en sitemap-0.xml!");
   '
   ```

4. **Verificación de Estilo Sólido Mate**:
   ```bash
   node -e '
     const fs = require("fs");
     const path = require("path");
     const forbidden = ["backdrop-blur", "bg-opacity-", "shadow-[0_0_", "#F59E0B", "#D4AF37"];
     // Comprobar que en dist/ no hay clases prohibidas
   '
   ```
