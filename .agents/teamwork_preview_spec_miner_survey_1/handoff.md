# Handoff Report — teamwork_preview_spec_miner_survey_1

## 1. Observation
De acuerdo con las fuentes autorizadas inspeccionadas directamente en el entorno de trabajo:

- **Archivo `ORIGINAL_REQUEST.md`** (líneas 1 a 52):
  - Línea 5: *"Plataforma web de captación y SEO programático para Alma Holística (almaholistica.com), inspirada en la arquitectura escalable de Astro + Tailwind del proyecto Fluffy. Su objetivo es posicionar dos clústeres de búsqueda de alta conversión... guiando al visitante a través de un diseño sobrio y refinado hacia un Quiz Modal de calificación interactivo que deriva a WhatsApp para agendar una sesión inicial de diagnóstico y evaluación."*
  - Líneas 13-17 (R1 Ciudades): *"`dataset_almaholistica_ciudades.csv`: Estructurar más de 100 ciudades distribuidas en los 20 países aprobados... Columnas: `Dominio, Categoría, URL Final (Slug), H1 Título, Meta Descripción, País, Moneda, Rango_Precio_Sesion, Historia_Local`."*
  - Líneas 17-18 (R1 Dolencias): *"`dataset_biodescodificacion_dolencias.json` / CSV: Base de datos estructurada con las 45 patologías y síntomas emocionales validados (Gastritis, Ansiedad, Hipotiroidismo, Sobrepeso, Lumbalgia, Ciática, Dermatitis, Colon Irritable, Migrañas, Fibromialgia, etc.), mapeando el conflicto biológico inconsciente, sistema afectado, preguntas de reflexión y gancho de agendamiento."*
  - Líneas 20-30 (R2 Arquitectura y Diseño Mate): *"- Desarrollar el sitio en Astro con Tailwind CSS y componentes React/TSX. - Estilo Visual Estricto (Sólido, Mate, Sin Transparencias ni Neón): Fondo Abisal: `#060A1A`, Superficies/Tarjetas: `#0A1226` y `#0E172F` (prohibidas transparencias, glassmorphism y degradados con opacidad baja), Bordes/Separadores: `#1E293B` / `#1E3A5F` (prohibido neón, brillo bioluminiscente o glow), Botones: `#38BDF8`, Acentos: `#D4AF37` / `#F59E0B`, Tipografía: Cinzel / Playfair Display + Plus Jakarta Sans. - Integración logo: `logo-mariposa-con-fondo-completo.svg` en Hero, Navbar, favicon y OG. - Rutas: `src/pages/[slug].astro` y `src/pages/biodescodificacion/[slug].astro`."*
  - Líneas 31-35 (R3 Funnel WhatsApp Quiz Modal): *"- Botones de WhatsApp interceptan y abren Quiz Modal de 3-4 pasos (síntoma, duración, intentos previos, ubicación). - Muestra diagnóstico preliminar y abre WhatsApp con mensaje estructurado. - Número genérico provisional `573000000000` en `src/config/site.ts`."*
  - Líneas 36-40 (R4 SEO y SitemapFast): *"- Meta tags OG, Twitter Cards, canonical URL. - Schemas JSON-LD: `MedicalWebPage`, `FAQPage`, `BreadcrumbList`. - Arquitectura SitemapFast con script `scripts/generate_sitemap.py` (`sitemap-index.xml`, `sitemap-0.xml`, `robots.txt`)."*
  - Líneas 47-51 (Criterios de Aceptación): Compilación limpia `npm run build` sin errores TypeScript/Astro; pre-renderizado SSG estático; Quiz Modal funcional en móvil y desktop; diseño responsive sin desbordamiento horizontal (CLS = 0) y estilo sólido mate.

- **Archivo `dataset_fluffy_stories.csv`** (líneas 1 a 20):
  - Formato CSV estructurado con cabeceras `Dominio,Categoría,URL Final (Slug),H1 Título,Meta Descripción,Moneda,País,Aeropuerto,Historia Local`.
  - El nuevo dataset sustituye `Aeropuerto` por `Rango_Precio_Sesion` y adapta el contenido a terapia y biodescodificación online.

- **Archivo `logo-mariposa-con-fondo-completo.svg`** (líneas 1 a 50):
  - SVG interactivo con viewBox `0 0 1254 1254`, degradados `star-aura`, `core-glow`, animaciones CSS `.rings-layer` (`spinRings 16s`), `.wing-left` y `.wing-right` (`flapLeft 1.4s` y `flapRight 1.4s`) en estado `:hover`.

- **Skill `sitemapfast`** (`SKILL.md`, líneas 19 a 116):
  - Estructura obligatoria de 2 niveles: `sitemap-index.xml` que referencia a `sitemap-0.xml`.
  - Auto-descubrimiento en `<head>`: `<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap-index.xml" />`.
  - Doble puntero en `robots.txt`: `Sitemap: https://almaholistica.com/sitemap-index.xml` y `Sitemap: https://almaholistica.com/sitemap.xml`.
  - Generador automatizado `scripts/generate_sitemap.py`.

---

## 2. Logic Chain
1. **Deconstrucción de Fuentes de Especificación**:
   - `ORIGINAL_REQUEST.md` define los pilares estratégicos de la plataforma: SEO programático masivo (ciudades + dolencias) y conversión mediante Quiz Modal hacia WhatsApp.
   - Para que el generador SSG de Astro funcione sin errores en `npm run build`, las fuentes de datos (CSV de ciudades y JSON de dolencias) deben poseer tipos TypeScript estrictos y validación de nulidad para que ningún registro rompa `getStaticPaths()`.

2. **Deducción de la Arquitectura de Datasets (R1)**:
   - **Ciudades**: Se exigen >100 ciudades en 20 países (18 países de Latinoamérica + España + EE.UU. hispanos). Cada fila debe mapear la moneda local auténtica (COP, MXN, EUR, USD, etc.) y un rango de precio adaptado a la economía de cada país para inspirar confianza y transparencia.
   - **Dolencias**: Se exigen exactamente 45 patologías validadas. Cada dolencia requiere un esquema multidimensional que incluye el sentido biológico inconsciente, sistema corporal, preguntas introspectivas, FAQs y el gancho de agendamiento. Este contenido alimenta simultáneamente el contenido visible de la página, el schema JSON-LD `MedicalWebPage` y el schema `FAQPage`.

3. **Deducción del Sistema de Diseño Mate Sólido (R2)**:
   - La directiva prohíbe taxativamente glassmorphism, transparencias (`bg-opacity-*`, `backdrop-blur-*`) y brillos de neón.
   - La paleta se restringe a fondos mates: Abisal `#060A1A`, Midnight Navy `#0A1226` y `#0E172F`, con bordes discretos `#1E293B` y acentos sobrios `#38BDF8` y `#D4AF37`.
   - Las fuentes Cinzel / Playfair Display para encabezados y Plus Jakarta Sans para texto corrido proporcionan el tono editorial, solemne y terapéutico necesario para un portal de salud y bienestar.

4. **Deducción del Embudo de Conversión (R3)**:
   - Los botones de WhatsApp no deben ser enlaces fríos directos a `wa.me`, sino desencadenantes del modal reactivo.
   - El Quiz Modal de 4 pasos recoge: 1. Síntoma/Dolencia, 2. Tiempo de evolución, 3. Tratamientos previos, 4. Ubicación geográfica.
   - Tras el paso 4, se produce un diagnóstico preliminar sintetizado y se genera una URL con `https://wa.me/573000000000?text=` con un mensaje preformateado y legible.

5. **Deducción del Motor SEO y SitemapFast (R4)**:
   - Cada ruta programática debe inyectar dinámicamente etiquetas OpenGraph, Twitter Cards y su URL canónica correspondiente.
   - Schemas JSON-LD `MedicalWebPage`, `FAQPage` y `BreadcrumbList` deben serializarse en el HTML estático inicial para evitar demoras de indexación según directrices de Googlebot.
   - El script `scripts/generate_sitemap.py` generará de forma determinista `sitemap-index.xml`, `sitemap-0.xml` y `robots.txt` a partir de los registros reales de los datasets.

---

## 3. Features Discovered

| # | Categoría | Característica | Descripción | Entradas | Salidas | Comportamiento de Error | Descubierto Vía |
|---|-----------|----------------|-------------|----------|---------|-------------------------|-----------------|
| 1 | R1 Datasets | Dataset Ciudades (`dataset_almaholistica_ciudades.csv`) | Base de datos con >100 ciudades de 20 países aprobados (Latam, España, EE.UU.) | Parámetros locales: nombre, país, moneda, rango de precio, historia local | Archivo CSV UTF-8 con 9 columnas exactas | Falta de columnas o campos vacíos invalida `getStaticPaths()` | ORIGINAL_REQUEST.md §R1 |
| 2 | R1 Datasets | Dataset Dolencias (`dataset_biodescodificacion_dolencias.json`) | Catálogo estructurado de las 45 patologías físicas y emocionales validadas | Campos: slug, nombre, sistema, conflicto_emocional, sentido_biologico, reprogramacion, preguntas_reflexion, faqs, gancho | Archivo JSON con tipado TypeScript en `src/types/dolencia.ts` | Slugs duplicados o caracteres inválidos en URL rompen el build estático | ORIGINAL_REQUEST.md §R1 |
| 3 | R2 Diseño | Paleta Mate Sólida Estricta | Tokens CSS Tailwind libres de glassmorphism, transparencias y glow | Variables de color en `tailwind.config.mjs`: `#060A1A`, `#0A1226`, `#0E172F`, `#1E293B`, `#38BDF8`, `#D4AF37` | Clases Tailwind `bg-dark-bg`, `bg-dark-card`, etc., 100% sólidas | Uso de `backdrop-blur` o `opacity` viola la regla de estilo visual | ORIGINAL_REQUEST.md §R2 |
| 4 | R2 Tipografía | Tipografía Dual Editorial | Carga de Cinzel/Playfair Display para encabezados y Plus Jakarta Sans para cuerpo | Google Fonts en `BaseLayout.astro` | Renderizado tipográfico fluido y legible | Fallback a sans-serif y serif estándar del sistema | ORIGINAL_REQUEST.md §R2 |
| 5 | R2 Assets | Integración del Logo SVG Oficial | Logo mariposa interactivo animado (`logo-mariposa-con-fondo-completo.svg`) | Archivo SVG local en `public/` o componente | Visualización interactiva en Hero, Navbar, favicon y metadata OG | Tamaño no responsivo puede generar desbordamiento horizontal | ORIGINAL_REQUEST.md §R2 |
| 6 | R2 Rutas | Página Principal (`src/pages/index.astro`) | Home optimizada para conversión, presentación de servicios, listados y buscador | Datos destacados de ciudades y dolencias | HTML estático optimizado con CLS = 0 | Error si no se encuentran los datasets al compilar | ORIGINAL_REQUEST.md §R2 |
| 7 | R2 Rutas | Rutas Hiperlocales (`src/pages/[slug].astro`) | Landing pages dinámicas por ciudad con adaptación de moneda, precios y contexto local | Parámetro `[slug]` desde `dataset_almaholistica_ciudades.csv` | Páginas estáticas por ciudad con SEO local y llamada a sesión online | Slug no encontrado retorna HTTP 404 | ORIGINAL_REQUEST.md §R2 |
| 8 | R2 Rutas | Rutas de Biodescodificación (`src/pages/biodescodificacion/[slug].astro`) | Landing pages temáticas con conflicto emocional, sentido biológico, preguntas y FAQs | Parámetro `[slug]` desde `dataset_biodescodificacion_dolencias.json` | Páginas estáticas por síntoma con esquema médico y gancho hacia el Quiz | Slug inexistente retorna HTTP 404 | ORIGINAL_REQUEST.md §R2 |
| 9 | R2 Rutas | Índice de Dolencias (`src/pages/biodescodificacion/index.astro`) | Directorio completo navegable con las 45 patologías filtrables por sistema corporal | Lista de dolencias del dataset | Grid responsive con tarjetas sólidas mates | Si el array está vacío, muestra estado informativo | ORIGINAL_REQUEST.md §R2 |
| 10 | R3 Funnel | Interceptación de Botones WhatsApp | Todos los botones de contacto y CTA interceptan el clic para invocar el modal interactivo | Evento de clic en botones con clase o handler del modal | Apertura suave del modal reactivo sin recargar la página | Si JS está deshabilitado, fallback a enlace directo con mensaje base | ORIGINAL_REQUEST.md §R3 |
| 11 | R3 Funnel | Quiz Modal Reactivo (4 Pasos) | Componente TSX de 4 pasos: 1. Dolencia, 2. Duración, 3. Terapias previas, 4. Ubicación | Respuestas del usuario en estado React | Pantalla con diagnóstico preliminar y botón a WhatsApp | Validación de selección en cada paso antes de avanzar | ORIGINAL_REQUEST.md §R3 |
| 12 | R3 Funnel | Configuración Central (`src/config/site.ts`) | Archivo de constantes globales para teléfono provisional (`573000000000`), URLs y metadatos | Constantes exportadas de TypeScript | Consistencia de datos en todo el portal y fácil reemplazo futuro | Error de tipado si faltan campos obligatorios | ORIGINAL_REQUEST.md §R3 |
| 13 | R3 Funnel | Generador de Enlace WhatsApp con Mensaje Estructurado | Codificación dinámica de los datos del Quiz en el parámetro `?text=` | Estado del Quiz (síntoma, tiempo, intentos, ciudad/país) | URL formateada `https://wa.me/573000000000?text=...` | Caracteres especiales o saltos de línea se escapan con `encodeURIComponent` | ORIGINAL_REQUEST.md §R3 |
| 14 | R4 SEO | Meta Tags y Canónicas Dinámicas | Inyección de meta títulos, descripciones de 150 caracteres, OG y Twitter Cards | Props pasadas a `BaseLayout.astro` | Etiquetas `<meta>` y `<link rel="canonical">` en `<head>` | Título o descripción faltante activa valores por defecto | ORIGINAL_REQUEST.md §R4 |
| 15 | R4 SEO | Schema JSON-LD `MedicalWebPage` | Datos estructurados que describen la afección y el abordaje holístico/bioemocional | Datos de la dolencia (nombre, sistema, conflicto) | Bloque `<script type="application/ld+json">` en el HTML | Validación de sintaxis JSON estricta | ORIGINAL_REQUEST.md §R4 |
| 16 | R4 SEO | Schema JSON-LD `FAQPage` | Marcado estructurado de preguntas frecuentes para resultados enriquecidos en Google | Array de FAQs por dolencia | Bloque JSON-LD con entidades `Question` y `Answer` | Array vacío no renderiza el bloque para evitar advertencias de GSC | ORIGINAL_REQUEST.md §R4 |
| 17 | R4 SEO | Schema JSON-LD `BreadcrumbList` | Jerarquía estructurada de navegación (Home > Sección > Página) | Ruta actual y niveles jerárquicos | Bloque JSON-LD con `itemListElement` ordenado | Niveles incorrectos romperían el validador Schema.org | ORIGINAL_REQUEST.md §R4 |
| 18 | R4 SEO | Generador SitemapFast (`scripts/generate_sitemap.py`) | Script Python que compila `sitemap-index.xml`, `sitemap-0.xml` y `robots.txt` | Rutas estáticas y registros de los datasets | Archivos XML y TXT listos en la carpeta `public/` | Archivo o ruta no encontrada genera excepción controlada en consola | ORIGINAL_REQUEST.md §R4 |
| 19 | R4 SEO | Auto-descubrimiento en `<head>` | Inyección de `<link rel="sitemap" href="/sitemap-index.xml">` en el layout base | Configuración del layout | Indexación prioritaria de Googlebot en cualquier página secundaria | Falta de la etiqueta retrasa el rastreo de Googlebot | SKILL `sitemapfast` |

---

## 4. Edge Cases

| # | Característica | Entrada / Situación | Comportamiento Observado / Especificado |
|---|----------------|---------------------|-----------------------------------------|
| 1 | Rutas de Ciudades | Ciudad con caracteres especiales o tildes (ej: "Bogotá", "Medellín", "San José") | El campo `URL Final (Slug)` debe normalizarse estrictamente en minúsculas y sin acentos (`bogota`, `medellin`, `san-jose`) para evitar desajustes en el enrutamiento HTTP y URLs canónicas. |
| 2 | Rutas de Ciudades | Ciudades con el mismo nombre en diferentes países (ej: "Córdoba" en Argentina y España, "Valencia" en España y Venezuela) | El slug debe incluir el sufijo de país o contexto (`cordoba-argentina`, `cordoba-espana`, `valencia-espana`, `valencia-venezuela`) para evitar colisiones en `getStaticPaths()`. |
| 3 | Moneda en Ciudades | Variedad de monedas en los 20 países (COP, MXN, USD, EUR, CLP, ARS, PEN, UYU, etc.) | La plantilla debe formatear dinámicamente el precio sin asumir símbolos universales de `$`, reflejando la moneda local especificada en la columna `Moneda` del dataset. |
| 4 | Dolencias | Dolencia con múltiples términos o sinónimos (ej: "Colon Irritable" vs "Síndrome de Intestino Irritable") | El campo `nombre` muestra el título comprensible para el usuario ("Colon Irritable (SII)"), mientras que el slug permanece limpio (`colon-irritable`). |
| 5 | Dolencias | Textos largos en `conflicto_emocional` y `sentido_biologico` | El diseño debe manejar saltos de párrafo y lectura cómoda con tipografía Plus Jakarta Sans con interlineado holgado (`leading-relaxed`) y sin desbordar el contenedor en pantallas móviles (320px). |
| 6 | Quiz Modal | El usuario intenta avanzar de paso sin seleccionar una opción en el Quiz | El botón de siguiente paso permanece deshabilitado o muestra un aviso sutil sin bloquear la interfaz, garantizando que todos los datos necesarios para WhatsApp se recopilen. |
| 7 | Quiz Modal | El usuario cierra el modal a mitad del cuestionario | El estado se reinicia o se preserva sin generar fugas de memoria; al reabrir, el modal debe volver a un estado coherente. |
| 8 | WhatsApp Enlace | Dispositivo sin cliente de WhatsApp instalado (escritorio sin app o navegador web) | La URL debe ser `https://wa.me/{numero}?text={encodedText}`, lo que permite a WhatsApp redirigir automáticamente a WhatsApp Web en escritorio o a la aplicación nativa en iOS/Android. |
| 9 | WhatsApp Mensaje | Mensaje con caracteres reservados (`&`, `?`, `=`, saltos de línea, emojis) | Se debe utilizar estrictamente `encodeURIComponent()` para todos los valores dinámicos y saltos de línea (`\n`), garantizando que el texto llegue perfectamente formateado y legible. |
| 10 | Estilo Mate | Clases accidentales de Tailwind como `bg-opacity-50`, `backdrop-blur-md` o sombras fluorescentes | Cualquier propiedad de desenfoque de fondo o transparencia parcial sobre fondo abisal queda vetada. La inspección del auditor forense verificará la ausencia de `backdrop-blur` y estilos neón. |
| 11 | Logo SVG Oficial | Inserción directa de un SVG de 1.6 MB en múltiples componentes | El archivo `logo-mariposa-con-fondo-completo.svg` debe ser referenciado como asset estático optimizado o cargado de forma que no degrade el tiempo de carga de la página ni genere CLS (Cumulative Layout Shift) en móviles. |
| 12 | SitemapFast | Generación de sitemaps antes de que existan los archivos en `public/` o `dist/` | El script `scripts/generate_sitemap.py` debe crear el directorio `public/` si no existe, o ejecutarse como paso de pre-build o post-build de Astro. |

---

## 5. Caveats
- **Sin caveats de implementación directa**: Como agente Specification Miner, este informe se limita a la extracción, análisis y documentación exhaustiva de las especificaciones y contratos de interfaz. No se ha implementado código de aplicación en `src/`, garantizando la estricta separación de responsabilidades y el modo de integridad de desarrollo.
- **Número de WhatsApp**: El número `573000000000` es provisional conforme a la especificación, y debe permanecer configurado en un único punto (`src/config/site.ts`) para que el usuario o el cliente pueda reemplazarlo sin tocar componentes ni plantillas.

---

## 6. Conclusion
La plataforma Alma Holística cuenta con una especificación completa, coherente y ejecutable:
1. **Requisitos de Datos R1**: Dos datasets bien definidos:
   - `dataset_almaholistica_ciudades.csv` con >100 ciudades en 20 países y 9 columnas clave.
   - `dataset_biodescodificacion_dolencias.json` con 45 patologías completas y 9 campos por dolencia.
2. **Requisitos Visuales y de Arquitectura R2**:
   - Astro con renderizado estático (SSG) + Tailwind CSS + React TSX.
   - Estilo mate sólido estricto: Paleta `#060A1A`, `#0A1226`, `#0E172F`, `#1E293B`, `#38BDF8`, `#D4AF37`. CERO glassmorphism, CERO resplandores neón.
   - Tipografía Cinzel/Playfair Display y Plus Jakarta Sans.
   - Logo oficial interactivo `logo-mariposa-con-fondo-completo.svg`.
   - Enrutamiento dinámico en `/[slug].astro` y `/biodescodificacion/[slug].astro`.
3. **Embudo de Conversión R3**:
   - Quiz Modal de 4 pasos que intercepta todos los clics a WhatsApp y remite al lead con un diagnóstico preliminar y un mensaje preestructurado a `573000000000`.
4. **Optimización SEO y SitemapFast R4**:
   - Metadatos completos (OG, Twitter Cards, Canónicas).
   - Schemas JSON-LD `MedicalWebPage`, `FAQPage`, `BreadcrumbList`.
   - Arquitectura SitemapFast en `scripts/generate_sitemap.py` con `sitemap-index.xml`, `sitemap-0.xml` y `robots.txt`.

El proyecto está 100% delimitado y listo para ser descompuesto en los hitos M1 a M6 por el orquestador y ejecutado por los equipos correspondientes.

---

## 7. Verification Method
1. **Verificación de Datasets**:
   - Inspeccionar que `dataset_almaholistica_ciudades.csv` contenga más de 100 filas, 20 países y las 9 cabeceras requeridas.
   - Inspeccionar que `dataset_biodescodificacion_dolencias.json` sea un array JSON válido con 45 elementos y los 9 campos requeridos en cada objeto.
2. **Verificación de Compilación y Tipado**:
   - Ejecutar `npm run build` o `npx astro check` para certificar que Astro genere todas las rutas estáticas sin errores.
3. **Verificación de Conformidad Visual Mate**:
   - Comprobar mediante búsqueda con `grep` que no existan clases como `backdrop-blur`, `bg-opacity-`, ni efectos `box-shadow` tipo neón en el código fuente.
4. **Verificación de SitemapFast**:
   - Ejecutar `python3 scripts/generate_sitemap.py` y validar la presencia y contenido de `public/sitemap-index.xml`, `public/sitemap-0.xml` y `public/robots.txt`.
