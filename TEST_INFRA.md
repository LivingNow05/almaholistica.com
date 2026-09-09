# TEST_INFRA.md — Infraestructura y Arquitectura de Pruebas E2E
**Proyecto**: Alma Holística (almaholistica.com)  
**Versión**: 1.0.0  
**Autor**: Equipo de QA & E2E Testing Track (`teamwork_preview_test_writer_e2e_1`)  
**Fecha**: 2026-09-06  
**Fuentes de Verdad Autorizadas**: `ORIGINAL_REQUEST.md` y `PROJECT.md`  

---

## 1. Filosofía de Prueba Opaque-Box Basada en Requerimientos

La estrategia de pruebas de Alma Holística se rige bajo el paradigma **Opaque-Box (Caja Negra Estricta)**. Las pruebas validan el comportamiento observable, los contratos de interfaz, las salidas estructuradas y la experiencia del usuario final sin depender de detalles volátiles de implementación interna.

### Principios Rectores:
1. **Derivación de Expectativas Autorizadas**: Toda aserción proviene directamente de `ORIGINAL_REQUEST.md` y `PROJECT.md`. Ninguna prueba acepta valores arbitrarios o relajados ("pruebas de fachada").
2. **Independencia y Aislamiento**: Cada caso de prueba es atómico, autónomo y ejecutable en cualquier orden sin depender del estado dejado por otros tests.
3. **Verificabilidad Progresiva y Resiliencia**: La suite cuenta con validadores de contratos y fixtures sintéticas para verificar la lógica de especificación de inmediato, y a su vez inspecciona y valida exhaustivamente los artefactos reales en disco generados a lo largo de los milestones M1 a M5.
4. **Adversarial Hardening**: Se someten los sistemas a entradas corrompidas, inyecciones de caracteres, colisiones de slugs, caracteres Unicode y comprobación forense de estilo visual sólido mate (prohibición total de glassmorphism, blur y neón).

---

## 2. Metodología de 4 Niveles (Tiers 1 a 4)

La arquitectura de pruebas se organiza en una pirámide de cuatro niveles complementarios:

```
┌─────────────────────────────────────────────────────────────┐
│ Tier 4: Escenarios de Usuario Real (End-to-End Journeys)    │
│  - Paciente local (Bogotá / Gastritis -> Quiz -> WA)        │
│  - Paciente internacional (Madrid / Lumbalgia -> WA)        │
│  - Paciente mobile con fallback sin JavaScript              │
├─────────────────────────────────────────────────────────────┤
│ Tier 3: Interacciones Cruzadas (Pairwise & Combinatorial)   │
│  - Ciudad + Moneda + Precios + Schema LocalService          │
│  - Dolencia + Conflicto + FAQs + Quiz + Mensaje WA          │
│  - Sitemaps XML vs Totalidad de Rutas Dinámicas             │
├─────────────────────────────────────────────────────────────┤
│ Tier 2: Casos de Borde y Valores Extremos (BVA & Adversarial)│
│  - Slugs con tildes, mayúsculas, espacios y colisiones      │
│  - Monedas y precios heterogéneos (COP, EUR, USD, etc.)     │
│  - Detector de Estilo Mate (Cero glassmorphism, blur, glow) │
│  - Respuestas HTTP 404 y verificación de CLS = 0            │
├─────────────────────────────────────────────────────────────┤
│ Tier 1: Cobertura Exhaustiva por Característica             │
│  - Mínimo 5 casos de prueba por cada una de las 23 features │
│  - Partición de equivalencia en esquemas, datos y rutas     │
└─────────────────────────────────────────────────────────────┘
```

### 2.1 Tier 1: Cobertura por Característica (Category-Partition Testing)
- Cada una de las 23 características documentadas en `PROJECT.md § Feature Inventory` cuenta con **al menos 5 pruebas unitarias/funcionales independientes** (total mínimo: 115 casos).
- Valida tipos de datos, cardinalidad, campos obligatorios, funciones singleton, rutas SSG, componentes de layout, contratos de eventos y generadores de sitemaps.

### 2.2 Tier 2: Casos de Borde y Valores Extremos (Boundary Value Analysis)
- **Normalización de Slugs**: Slugs con caracteres con diacríticos (`bogotá` -> `bogota`), mayúsculas (`MADRID` -> `madrid`), caracteres reservados (`san/jose` -> `san-jose`), y resolución de colisiones (`cordoba-argentina` vs `cordoba-espana`).
- **Monedas y Precios**: Formatos monetarios heterogéneos (COP, USD, EUR, MXN, CLP, ARS, PEN), rangos numéricos extremos o nulos.
- **Auditoría Forense de Estilo Mate**: Escaneo automatizado de código CSS/Tailwind para vetar clases prohibidas (`backdrop-blur`, `bg-opacity-*`, sombras glow neón) asegurando el cumplimiento estricto del fondo abisal `#060A1A` y tarjetas `#0A1226` / `#0E172F`.
- **Manejo de Errores y 404**: Validación de respuestas para slugs inexistentes o consultas erróneas sin desbordamiento de memoria ni excepciones no capturadas.

### 2.3 Tier 3: Interacciones Cruzadas (Pairwise & Combinatorial Testing)
- **Matriz Ciudad + Precio + Schema**: Verifica que los datos del CSV de ciudades se propaguen coherentemente a la ruta `/[slug]`, al bloque JSON-LD `HealthAndBeautyBusiness` o `LocalBusiness`, y al modal de contacto.
- **Matriz Dolencia + Sentido Biológico + FAQs + Quiz + WhatsApp**: Verifica que al seleccionar una dolencia en `biodescodificacion/[slug]`, las preguntas de reflexión y FAQs correspondan al conflicto biológico, el Quiz precargue el síntoma (`data-symptom`), y el botón final construya la URL `https://wa.me/573000000000?text=...` con todos los parámetros perfectamente formateados y legibles.
- **Integridad de Sitemaps**: Cruce bidireccional entre las URLs de `dataset_almaholistica_ciudades.csv`, `dataset_biodescodificacion_dolencias.json`, `index.astro`, y los enlaces `<loc>` listados en `sitemap-0.xml` e indexados en `sitemap-index.xml`.

### 2.4 Tier 4: Escenarios de Usuario Real (Workload & Scenario-Based)
- **Flujo A (Paciente Hiperlocal)**:
  1. Usuario ingresa a una landing local (`/bogota`).
  2. Lee la historia local empática y tarifas en moneda local (COP).
  3. Hace clic en un botón flotante de WhatsApp.
  4. La interacción es interceptada por el Quiz Modal reactivo.
  5. Completa los 4 pasos (Síntoma: Gastritis, Tiempo: 6 meses, Terapias previas: Medicación, Ubicación: Bogotá).
  6. Recibe el diagnóstico preliminar ("Gastritis vinculada a indigestión emocional / no poder digerir una situación en Bogotá").
  7. El botón final genera y abre la URL `wa.me` estructurada.
- **Flujo B (Paciente Temático de Biodescodificación)**:
  1. Usuario ingresa desde buscador a `/biodescodificacion/ansiedad`.
  2. Explora el conflicto de anticipación y desprotección, y revisa las preguntas de reflexión.
  3. Abre el Quiz desde el gancho de la dolencia.
  4. Completa el cuestionario con sus datos.
  5. Se emite el mensaje formateado para agendamiento con el terapeuta.
- **Flujo C (Acceso Mobile y Fallback sin JavaScript)**:
  1. Paciente accede en pantalla reducida (320px ancho) validando ausencia de scroll horizontal (CLS = 0).
  2. Simulación de entorno con JavaScript inactivo: los enlaces directos a `wa.me` conservan el teléfono de rescate `573000000000` con mensaje base (Progressive Enhancement).

---

## 3. Matriz de Cobertura de las 23 Características

| # | Característica | Requerimiento / Contrato | Tier | Casos de Prueba (Mínimo 5) | Archivo de Prueba | Criterio de Aceptación |
|---|----------------|--------------------------|------|----------------------------|-------------------|------------------------|
| 1 | **Dataset Ciudades CSV** | `src/data/dataset_almaholistica_ciudades.csv` >100 ciudades, 20 países, 9 columnas | Tier 1 | T1.1.1 Conteo >100 filas<br>T1.1.2 Exactamente 20 países aprobados<br>T1.1.3 9 columnas exactas presentes<br>T1.1.4 No filas vacías ni campos nulos<br>T1.1.5 Precios y monedas coherentes | `tests/tier1_features.test.mjs` | CSV válido con 113+ registros completos |
| 2 | **Dataset Dolencias JSON** | `src/data/dataset_biodescodificacion_dolencias.json` 45 patologías completas | Tier 1 | T1.2.1 Exactamente 45 dolencias<br>T1.2.2 9 campos obligatorios por dolencia<br>T1.2.3 Slugs únicos y limpios<br>T1.2.4 Preguntas reflexión array no vacío<br>T1.2.5 FAQs array con pregunta/respuesta | `tests/tier1_features.test.mjs` | JSON parseable, 45 objetos estructurados |
| 3 | **Tipos TypeScript de Datos** | `CityData`, `DolenciaData`, `FAQItem` | Tier 1 | T1.3.1 Validación estricta de schema CityData<br>T1.3.2 Validación estricta de DolenciaData<br>T1.3.3 Validación de FAQItem<br>T1.3.4 Rechazo de campos no tipados<br>T1.3.5 Tipos exportables y coherentes | `tests/tier1_features.test.mjs` | Tipos TS sin `any` ni errores de compilación |
| 4 | **Package & Tooling Setup** | Astro 5, Tailwind CSS, React 19, TypeScript | Tier 1 | T1.4.1 Presencia de `package.json` con scripts<br>T1.4.2 `astro.config.mjs` con `output: 'static'`<br>T1.4.3 `tailwind.config.mjs` configurado<br>T1.4.4 `tsconfig.json` con paths y strictness<br>T1.4.5 Dependencias requeridas presentes | `tests/tier1_features.test.mjs` | Configuración estática y reproducible |
| 5 | **Configuración Central Sitio** | `src/config/site.ts` | Tier 1 | T1.5.1 Constante `SITE_CONFIG` exportada<br>T1.5.2 Teléfono provisional `573000000000`<br>T1.5.3 URL base `https://almaholistica.com`<br>T1.5.4 Nombre del sitio 'Alma Holística'<br>T1.5.5 Imagen OG por defecto válida | `tests/tier1_features.test.mjs` | Configuración única e inmutable |
| 6 | **Tokens Diseño Sólido Mate** | Paleta mate estricta sin transparencias ni neón | Tier 1 | T1.6.1 Presencia de fondo Abisal `#060A1A`<br>T1.6.2 Tarjetas Midnight `#0A1226` / `#0E172F`<br>T1.6.3 Bordes `#1E293B` / `#1E3A5F`<br>T1.6.4 Botón `#38BDF8` y Acentos `#D4AF37`<br>T1.6.5 Prohibición de `backdrop-blur` y opacidades | `tests/tier1_features.test.mjs` | Paleta 100% opaca y mate |
| 7 | **Tipografías Cinzel & Jakarta** | Cinzel/Playfair Display + Plus Jakarta Sans | Tier 1 | T1.7.1 Declaración de fuente Cinzel para títulos<br>T1.7.2 Declaración de Plus Jakarta para cuerpo<br>T1.7.3 Integración Google Fonts en layout<br>T1.7.4 Fallbacks estándar de sistema<br>T1.7.5 Clases de fuente mapeadas en Tailwind | `tests/tier1_features.test.mjs` | Tipografía editorial solemne y legible |
| 8 | **Activos Gráficos y Logo SVG** | `logo-mariposa-con-fondo-completo.svg` | Tier 1 | T1.8.1 SVG oficial disponible en `public/`<br>T1.8.2 ViewBox y dimensiones correctas<br>T1.8.3 Animaciones CSS de alas y anillos presentes<br>T1.8.4 Favicon configurado con SVG<br>T1.8.5 OpenGraph preview asociada al logo | `tests/tier1_features.test.mjs` | Vector interactivo optimizado |
| 9 | **Componentes Base Layout** | `BaseLayout`, `Navbar`, `Footer` | Tier 1 | T1.9.1 `BaseLayout.astro` renderiza `<html>`, `<head>`, `<body>`<br>T1.9.2 `Navbar.astro` con logo y menú responsive<br>T1.9.3 `Footer.astro` con disclaimer y enlaces<br>T1.9.4 Cero desbordamiento horizontal (CLS = 0)<br>T1.9.5 Inyección de metadatos y esquemas | `tests/tier1_features.test.mjs` | Layout sólido responsive y accesible |
| 10 | **Quiz Modal Reactivo** | `WhatsAppQuizModal.tsx` de 4-5 pasos | Tier 1 | T1.10.1 Montaje con `client:load`<br>T1.10.2 Estado inicial invisible/cerrado<br>T1.10.3 Progresión secuencial de 4 pasos<br>T1.10.4 Diagnóstico preliminar generado<br>T1.10.5 Botón final de derivación a WhatsApp | `tests/tier1_features.test.mjs` | Componente React interactivo fluido |
| 11 | **Interceptación Global WhatsApp** | Delegación de eventos para botones WA | Tier 1 | T1.11.1 Clics en `a[href*="wa.me"]` interceptados<br>T1.11.2 Soporte de atributo `data-open-quiz`<br>T1.11.3 Extracción de `data-symptom` y `data-city`<br>T1.11.4 Evento personalizado `alma:open-quiz`<br>T1.11.5 Degradación elegante (href no se rompe) | `tests/tier1_features.test.mjs` | Clic abre modal sin perder fallback |
| 12 | **Generación Mensaje WhatsApp** | URL con mensaje preformateado y legible | Tier 1 | T1.12.1 Base `https://wa.me/573000000000?text=`<br>T1.12.2 Inclusión de síntoma, duración y ubicación<br>T1.12.3 Codificación con `encodeURIComponent`<br>T1.12.4 Saltos de línea legibles (`%0A` o `\n`)<br>T1.12.5 Resistencia a emojis y signos especiales | `tests/tier1_features.test.mjs` | Mensaje persuasivo y listo para enviar |
| 13 | **Módulos de Lectura SSG** | `src/lib/cities.ts` y `src/lib/dolencias.ts` | Tier 1 | T1.13.1 `getCities()` memoizado en memoria<br>T1.13.2 `getCityBySlug(slug)` eficiente O(1)/O(N)<br>T1.13.3 `getDolencias()` memoizado<br>T1.13.4 `getDolenciaBySlug(slug)` preciso<br>T1.13.5 Cero fugas de memoria en build SSG | `tests/tier1_features.test.mjs` | Módulos singleton ultra-rápidos |
| 14 | **Landing Page Principal** | `src/pages/index.astro` | Tier 1 | T1.14.1 Renderizado de Hero con mariposa animada<br>T1.14.2 Sección explicativa de biodescodificación<br>T1.14.3 Selector/directorio de ciudades<br>T1.14.4 Buscador o cuadrícula de dolencias<br>T1.14.5 CTA destacado al Quiz de evaluación | `tests/tier1_features.test.mjs` | Home estética de alta conversión |
| 15 | **Rutas Dinámicas Ciudades** | `src/pages/[slug].astro` SSG | Tier 1 | T1.15.1 `getStaticPaths` genera 113+ ciudades<br>T1.15.2 Inyección de moneda y rango de precio<br>T1.15.3 Inclusión de `Historia_Local` en plantilla<br>T1.15.4 Título H1 dinámico por ciudad<br>T1.15.5 Botones CTA con `data-city` precargado | `tests/tier1_features.test.mjs` | Páginas locales personalizadas |
| 16 | **Rutas Dinámicas Dolencias** | `src/pages/biodescodificacion/[slug].astro` | Tier 1 | T1.16.1 `getStaticPaths` genera 45 dolencias<br>T1.16.2 Exposición de sentido biológico y conflicto<br>T1.16.3 Sección de preguntas de introspección<br>T1.16.4 Bloque interactivo de FAQs visibles<br>T1.16.5 Botones CTA con `data-symptom` precargado | `tests/tier1_features.test.mjs` | Páginas de biodescodificación rigurosas |
| 17 | **Directorio de Dolencias** | `src/pages/biodescodificacion/index.astro` | Tier 1 | T1.17.1 Listado completo de las 45 patologías<br>T1.17.2 Agrupación lógica por sistemas corporales<br>T1.17.3 Enlaces internos hacia cada `/[slug]`<br>T1.17.4 Tarjetas sólidas mate sin desenfoque<br>T1.17.5 Responsividad total en móviles | `tests/tier1_features.test.mjs` | Catálogo temático navegable |
| 18 | **Módulo Schema.org JSON-LD** | `src/lib/schema.ts` | Tier 1 | T1.18.1 Generador de `MedicalWebPage`<br>T1.18.2 Generador de `FAQPage`<br>T1.18.3 Generador de `BreadcrumbList`<br>T1.18.4 Generador de `HealthAndBeautyBusiness`<br>T1.18.5 Sintaxis JSON-LD válida y estricta | `tests/tier1_features.test.mjs` | Rich snippets certificados por Google |
| 19 | **Metadatos SEO en Layout** | OpenGraph, Twitter Cards, Canónicas | Tier 1 | T1.19.1 Meta etiqueta `og:title` dinámica<br>T1.19.2 Meta etiqueta `og:description` adecuada<br>T1.19.3 `og:image` apuntando a mariposa oficial<br>T1.19.4 `<link rel="canonical">` absoluto<br>T1.19.5 Atributo `lang="es"` en `<html>` | `tests/tier1_features.test.mjs` | SEO on-page de máxima visibilidad |
| 20 | **Generador SitemapFast** | `scripts/generate_sitemap.py` | Tier 1 | T1.20.1 Ejecución determinista en Python 3<br>T1.20.2 Creación de `sitemap-index.xml`<br>T1.20.3 Creación de `sitemap-0.xml` con todas las URLs<br>T1.20.4 Generación de `robots.txt` con doble puntero<br>T1.20.5 Inclusión de réplica en `public/` y `dist/` | `tests/tier1_features.test.mjs` | Arquitectura SitemapFast 100% compliant |
| 21 | **Auto-descubrimiento de Sitemap** | Link tag en `<head>` | Tier 1 | T1.21.1 Presencia de `<link rel="sitemap">`<br>T1.21.2 Atributo `type="application/xml"`<br>T1.21.3 `href="/sitemap-index.xml"` exacto<br>T1.21.4 `title="Sitemap"` presente<br>T1.21.5 Inserción en todas las páginas del layout | `tests/tier1_features.test.mjs` | Indexación instantánea para Googlebot |
| 22 | **Suite E2E Tiers 1-4 & Verificación** | Suite de pruebas automatizada | Tier 1 | T1.22.1 Runner ejecutable con `node --test`<br>T1.22.2 Estructura organizada en `tests/`<br>T1.22.3 Tiempos de ejecución sub-segundo<br>T1.22.4 Código de salida 0 en éxito<br>T1.22.5 Reportes de error claros y accionables | `tests/tier1_features.test.mjs` | Infraestructura de calidad continua |
| 23 | **Hardening Adversarial Tier 5** | Verificación forense y anti-trampa | Tier 1 | T1.23.1 Detección de código malicioso o trampas<br>T1.23.2 Verificación de ausencia de fachadas en tests<br>T1.23.3 Comprobación de tipos estrictos sin `any`<br>T1.23.4 Auditoría de estilos mate (cero neón/blur)<br>T1.23.5 Resistencia a inputs malformados | `tests/tier1_features.test.mjs` | Certificación final de robustez |

---

## 4. Estrategia de Ejecución y Runner

La suite utiliza el **Node.js Native Test Runner** (`node --test`), disponible de forma nativa en Node 22 (`v22.21.0`).

### Ventajas Técnicas:
- **Cero Dependencias Externas**: No requiere instalar paquetes npm pesados (Jest, Mocha, Vitest) que puedan fallar por versiones o descargas de red.
- **Velocidad Extrema**: Ejecuta cientos de pruebas y validaciones en menos de 1 segundo.
- **Compatibilidad Nativa ESM**: Soporta sintaxis de módulos modernos `import / export` (`.mjs`).
- **Aserciones Estrictas**: Integra `node:assert/strict` para comparaciones profundas e inmutables.

### Comandos de Ejecución Oficiales:

```bash
# Ejecutar toda la suite de pruebas (Tiers 1, 2, 3 y 4)
node --test tests/*.test.mjs

# Ejecutar por Tier específico:
node --test tests/tier1_features.test.mjs
node --test tests/tier2_edge_cases.test.mjs
node --test tests/tier3_cross_feature.test.mjs
node --test tests/tier4_user_journeys.test.mjs

# Ejecutar con reporte detallado
node --test --test-reporter=spec tests/*.test.mjs
```

---

## 5. Criterios de Aceptación y Puerta de Calidad (Quality Gate)

1. **Paso del 100% de Pruebas**: Cero fallos tolerados (`0 failed`).
2. **Cobertura Completa del Inventario**: Las 23 características del proyecto cuentan con pruebas activas y documentadas.
3. **Cero Violaciones de Estilo Mate**: Ni un solo componente o archivo CSS contiene `backdrop-blur`, degradados transparentes sobre fondo abisal o efectos de neón.
4. **Validación Bidireccional de Rutas**: Toda ciudad del CSV y toda dolencia del JSON cuenta con su ruta SSG y está registrada en el sitemap XML.
5. **Funnel Conectado**: Todo CTA a WhatsApp produce una URL válida con codificación correcta hacia el número provisional `573000000000`.
