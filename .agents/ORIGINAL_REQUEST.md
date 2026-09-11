# Original User Request

## Initial Request — 2026-09-06T01:31:20Z

Plataforma web de captación y SEO programático para Alma Holística (almaholistica.com), inspirada en la arquitectura escalable de Astro + Tailwind del proyecto Fluffy. Su objetivo es posicionar dos clústeres de búsqueda de alta conversión (páginas hiperlocales por ciudad para sesiones de terapia online y páginas temáticas de biodescodificación por dolencia física/emocional), guiando al visitante a través de un diseño sobrio y refinado hacia un Quiz Modal de calificación interactivo que deriva a WhatsApp para agendar una sesión inicial de diagnóstico y evaluación.

Working directory: /Users/anthony/Downloads/almaholistica.com
Integrity mode: development

## Requirements

### R1. Dataset Programático Híbrido (20 Países y 45 Dolencias)
- **Dataset de Ciudades (`dataset_almaholistica_ciudades.csv`)**: Estructurar más de 100 ciudades distribuidas en los 20 países aprobados:
  - *Latinoamérica*: Colombia, México, Chile, Argentina, Perú, Ecuador, Bolivia, Uruguay, Paraguay, Venezuela, Costa Rica, Panamá, República Dominicana, Guatemala, El Salvador, Honduras, Nicaragua, Brasil.
  - *Mercados de Alta Monetización*: España (Madrid, Barcelona, Valencia, Sevilla, Málaga, Bilbao) y Estados Unidos Hispanos (Miami, Los Ángeles, Houston, Nueva York, Chicago, Orlando, San Antonio).
  - Columnas: `Dominio, Categoría, URL Final (Slug), H1 Título, Meta Descripción, País, Moneda, Rango_Precio_Sesion, Historia_Local`.
- **Dataset de Dolencias (`dataset_biodescodificacion_dolencias.json` / CSV)**: Base de datos estructurada con las 45 patologías y síntomas emocionales validados (Gastritis, Ansiedad, Hipotiroidismo, Sobrepeso, Lumbalgia, Ciática, Dermatitis, Colon Irritable, Migrañas, Fibromialgia, etc.), mapeando el conflicto biológico inconsciente, sistema afectado, preguntas de reflexión y gancho de agendamiento.

### R2. Arquitectura Web Astro + Tailwind + Estilo Visual Sobrio
- Desarrollar el sitio en Astro con Tailwind CSS y componentes React/TSX.
- **Estilo Visual Estricto (Sólido, Mate, Sin Transparencias ni Neón)**:
  - *Fondo Abisal*: `#060A1A` (Sólido mate).
  - *Superficies y Tarjetas*: Fondos 100% sólidos mates en Midnight Navy (`#0A1226` y `#0E172F`). Quedan prohibidas las transparencias, el efecto vidrio (glassmorphism) y los degradados con opacidad baja.
  - *Bordes y Separadores*: Discretos y mates (`#1E293B` / `#1E3A5F`). Prohibido cualquier efecto de neón, brillo bioluminiscente o glow artificial.
  - *Botones de Acción*: `#38BDF8` (Cyan suave, diseño plano y sólido).
  - *Acentos*: `#D4AF37` / `#F59E0B` (Oro satinado sobrio).
  - *Tipografía*: Cinzel / Playfair Display para títulos + Plus Jakarta Sans para texto corrido legible.
- Integración de los activos oficiales del logo: usar el SVG animado interactivo `logo-mariposa-con-fondo-completo.svg` en Hero y Navbar, favicon y OpenGraph preview.
- Rutas dinámicas: `src/pages/[slug].astro` para ciudades y `src/pages/biodescodificacion/[slug].astro` para síntomas.

### R3. Funnel de Conversión con Quiz Modal de WhatsApp (Patrón Fluffy)
- Los botones de WhatsApp (flotantes y CTAs) interceptan la acción y abren un Quiz Modal interactivo de 3-4 pasos (síntoma, duración, intentos previos, ubicación).
- Al finalizar el cuestionario, muestra un diagnóstico preliminar y abre WhatsApp con un mensaje estructurado y listo para agendar.
- Número de WhatsApp provisional genérico (`573000000000`) parametrizado en un archivo central (`src/config/site.ts`) para su posterior actualización.

### R4. Optimización SEO, Rendimiento y Esquemas Estructurados (SitemapFast)
- Generación de metaetiquetas OpenGraph, Twitter Cards y etiquetas canónicas en cada página.
- Inyección de esquemas JSON-LD estructurados (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`).
- Implementar la arquitectura SitemapFast con script `scripts/generate_sitemap.py` (`sitemap-index.xml`, `sitemap-0.xml`, `robots.txt`).

## Acceptance Criteria

### Dataset y Contenido SEO
- [ ] `dataset_almaholistica_ciudades.csv` contiene más de 100 ciudades de los 20 países con moneda local, slug y texto empático.
- [ ] Base de datos de dolencias contiene las 45 patologías con su sentido biológico y preguntas de reflexión.

### Compilación y Funcionalidad
- [ ] El proyecto compila limpiamente al 100% sin errores de TypeScript ni de Astro al ejecutar `npm run build`.
- [ ] Todas las páginas programáticas de ciudades y dolencias se generan estáticamente.
- [ ] El Quiz Modal abre correctamente al hacer clic en los botones de WhatsApp en escritorio y móvil, permitiendo avanzar y redirigiendo a WhatsApp con el mensaje estructurado.
- [ ] La página principal (`index.astro`) cuenta con diseño responsive sin desbordamiento horizontal (CLS = 0) y respetando las restricciones de estilo sólido (sin transparencias ni neón).

## 2026-09-06T17:12:38Z

Rediseño visual y de experiencia de usuario de alta gama para Alma Holística (almaholistica.com), transformando la interfaz hacia una estética editorial minimalista, serena y contemporánea inspirada en el estándar de diseño de Talora Wellness Group. Incorpora animaciones suaves profesionales mediante GSAP, elimina por completo el color amarillo/dorado, reduce la paleta a 2 colores maestros (Fondo Abisal `#060A1A` y Luz Cyan `#38BDF8`), e implementa botones redondeados tipo píldora en blanco puro (`bg-white text-[#060A1A] rounded-full`) y tarjetas amplias `rounded-[2.5rem]` con tipografía editorial de gran escala.

Working directory: /Users/anthony/Downloads/almaholistica.com
Integrity mode: development

## Requirements

### R1. Estilo Visual Minimalista Editorial (Inspiración Talora Wellness)
- **Eliminación Total del Amarillo:** Eliminar completamente los tonos amarillos y dorados (`#F59E0B`, `#D4AF37`) en todo el sitio, componentes, tarjetas y botones.
- **Paleta Bi-Color Depurada:**
  - *Fondo Abisal Principal:* `#060A1A` (Lienzo sereno, limpio, mate).
  - *Superficies y Secciones de Respiración:* Alternancia entre `#060A1A`, `#0A1226` y sutiles fondos off-white/slate cuando aplique en componentes contrastados.
  - *Luz de Acento Única:* `#38BDF8` (Cyan suave para líneas finas de 1px, badges de estado y micro-detalles).
  - *Texto de Lectura:* Blanco nítido (`#FFFFFF`, `#F8FAFC`) para títulos y Slate ligero (`#94A3B8`) con peso font-light para párrafos de lectura reposada.
- **Botones de Alta Gama en Píldora (Rounded-Full en Blanco):**
  - Botones principales de acción en color blanco puro: `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`.
  - Botones secundarios tipo enlace con flecha interactiva minimalista (`group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8]`).
- **Tarjetas Minimalistas Modernas:**
  - Reemplazo total de tarjetas con aspecto rígido o antiguo por contenedores amplios `rounded-[2.5rem]`, padding generoso (`p-10 lg:p-14`), bordes ultra-finos (`border border-slate-800/40`), iconografía en burbujas circulares (`w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60 flex items-center justify-center`).

### R2. Animaciones Profesionales Suaves con GSAP
- Integración de GSAP (GreenSock) para transiciones fluidas de entrada y micro-interacciones:
  - *Hero Entrance:* Revelación escalonada (staggered fade-in-up con curva `cubic-bezier(0.16, 1, 0.3, 1)`).
  - *Indicador de Scroll:* Línea vertical animada minimalista de 1px (`w-[1px] h-16 bg-slate-800 relative overflow-hidden` con línea interior en movimiento).
  - *Floating Aura:* Movimiento orgánico y sutil en segundo plano detrás del logo mariposa interactivo.
  - *Micro-animaciones de Tarjetas:* Elevación suave y sutil transición en hover sin saltos bruscos.

### R3. Tipografía Editorial Serena
- Títulos principales en Serif elegante (*Cormorant Garamond* o *Cinzel* refinado) a gran escala (`text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-normal`).
- Subtítulos superiores con línea divisoria minimalista:
  `<span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>TERAPIA Y BIODESCODIFICACIÓN</span>`
- Párrafos en fuente sin serifa (*Inter* / *Plus Jakarta Sans*), peso light (`font-light`), interlineado aireado (`leading-relaxed`) y ancho máximo controlado (`max-w-xl`).

### R4. Preservación Integral de la Arquitectura Existente
- Mantener intactas todas las funcionalidades y rutas programáticas SSG:
  - 114 páginas dinámicas de ciudades (`src/pages/[slug].astro`).
  - 45 páginas dinámicas de dolencias (`src/pages/biodescodificacion/[slug].astro`).
  - Quiz Modal interactivo de WhatsApp (`WhatsAppQuizModal.tsx`) adaptando su diseño exterior a la nueva estética minimalista (bordes `rounded-[2.5rem]`, botón blanco redondeado, sin amarillo).
  - Arquitectura SitemapFast (`sitemap-index.xml`, `sitemap-0.xml`, `robots.txt`).
  - Esquemas Schema.org JSON-LD (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`) y archivos E-E-A-T / GEO (`llms.txt`, datasets).

## Acceptance Criteria

### Estilo Visual y Paleta
- [ ] No existe ningún rastro del color amarillo ni dorado (`#F59E0B`, `#D4AF37`) en el código CSS, componentes o páginas.
- [ ] La paleta se concentra en 2 colores maestros (Abisal `#060A1A` y Cyan `#38BDF8`), más blanco puro `#FFFFFF` y Slate para textos y botones.
- [ ] Los botones primarios de acción (Hero, Navbar, CTAs y Quiz) son redondeados tipo píldora (`rounded-full`) en blanco puro con hover suave.
- [ ] Las tarjetas de servicios, terapias y testimonios lucen esquinas amplias `rounded-[2.5rem]`, padding generoso y aspecto moderno y sereno.

### Animaciones GSAP y Rendimiento
- [ ] Animaciones de entrada fluidas ejecutadas con GSAP sin tirones ni desbordamiento horizontal (`CLS = 0`).
- [ ] Indicador de scroll minimalista presente en el Hero.
- [ ] Carga limpia de fuentes (*Cormorant Garamond* / *Cinzel* e *Inter*).

### Compilación y Funcionalidad
- [ ] El proyecto compila limpiamente al 100% sin errores de TypeScript ni de Astro al ejecutar `npm run build`.
- [ ] Las 160 páginas estáticas se generan correctamente.
- [ ] La suite de pruebas pasa satisfactoriamente.

## Follow-up — 2026-09-10T19:48:47Z

Transformación visual, estructural y SEO de Alma Holística (almaholistica.com) mediante una paleta cromática biológica semántica, generación de ilustraciones anatómicas y geométricas abstractas para romper los bloques continuos de texto, e incorporación de tablas comparativas de alto valor clínico indexables para motores tradicionales y de IA (GEO).

Working directory: /Users/anthony/Downloads/almaholistica.com
Integrity mode: development

## Requirements

### R1. Dinamismo y Paleta Cromática Biológica Semántica
- Romper la uniformidad visual del sitio implementando una paleta de colores semántica y diferenciada según el sistema biológico y la función anatómica:
  - Sistema Digestivo (verde salvia / esmeralda sereno).
  - Sistema Osteoarticular (arcilla / ámbar cálido / terracota).
  - Sistema Respiratorio (azul zafiro / celeste nórdico).
  - Sistema Nervioso / Psicosomático (amatista suave / lavanda profundo).
- Aplicar estos acentos de forma elegante en bordes superiores, badges de categoría, números de paso e indicadores visuales tanto en Modo Claro como en Modo Oscuro.
- Respetar la normativa de diseño sólido mate: fondos y superficies 100% opacas, sin gradientes deslumbrantes ni efectos de neón.

### R2. Generación e Integración de Ilustraciones Anatómicas y Geométricas Abstractas
- Crear e integrar activos visuales originales con estética de ilustraciones anatómicas, biología celular y siluetas bioenergéticas en vectores y texturas mate de calidad médica editorial:
  - Ilustración 1 (Hero/Enfoque): Eje mente-cuerpo y correlación neurovegetativa.
  - Ilustración 2 (Metodología): Los 3 pilares del choque biológico y la respuesta adaptativa.
  - Ilustración 3 (Fases del Proceso): Rango de etapas terapéuticas desde el diagnóstico preliminar hasta la autorregulación.
- Cada imagen debe alojarse localmente en `public/images/`, contar con atributos fijos `width` y `height`, texto alternativo (`alt`) descriptivo optimizado para SEO, y carga diferida (`loading="lazy"`).

### R3. Tablas Comparativas y Alivio Estructural de Texto
- Reorganizar secciones con alta densidad de texto continuo en tablas comparativas estructuradas y agradables a la vista:
  - **Tabla de Enfoque Clínico**: *Medicina Convencional vs Biodescodificación Integrativa* (Dimensiones: Paradigma de origen, Enfoque diagnóstico, Nivel de intervención, Objetivo del síntoma, Papel del consultante).
  - **Tabla Matriz de Dolencias y Sentido Biológico**: Muestra representativa de patologías con *Síntoma Físico, Emoción Atrapada, Capa Embrionaria (Endodermo/Mesodermo/Ectodermo) y Sentido Biológico Adaptativo*.
  - **Tabla de Etapas del Acompañamiento**: *Fase, Sesiones Estimadas, Metodología Aplicada y Resultado Terapéutico Esperado*.
- Las tablas deben ser plenamente responsivas (scroll horizontal suave con indicación visual o diseño apilable en móviles) y visualmente estilizadas con la paleta de la marca.

### R4. Optimización SEO, GEO (Generative Engine Optimization) y Datos Estructurados
- Integrar microdatos semánticos HTML y esquemas JSON-LD complementarios (`MedicalWebPage`, `HowTo`, `Table`, `FAQPage`) que permitan a motores de respuesta de IA (ChatGPT Search, Perplexity, Google AI Overviews) extraer y citar directamente los datos de las tablas.
- Asegurar encabezados semánticos jerárquicos (H2, H3), etiquetas semánticas `<table>`, `<thead>`, `<tbody>`, `<th>`, `<caption>` y descripciones enriquecidas con palabras clave de alta intención en terapia integrativa y biodescodificación.

### R5. Garantía de Calidad Técnica, Cero CLS y Preservación de Pruebas
- Preservar las 160 rutas estáticas SSG del proyecto sin alterar rutas ni enlaces canónicos.
- Superar con 0 fallos la suite completa de tests automatizados (150 tests de regresión y 244 tests adversariales).
- Garantizar Cero Cumulative Layout Shift (`CLS = 0`) en la carga de imágenes, tablas y estilos.

## Acceptance Criteria

### Cromatismo e Identidad Visual
- [ ] Las diferentes dolencias y secciones presentan acentos diferenciados según su sistema biológico (verde para digestivo, terracota para osteoarticular, azul para respiratorio, lavanda para nervioso).
- [ ] El contraste en Modo Claro cumple con las normativas de accesibilidad WCAG (mínimo 4.5:1 para texto normal y 3:1 para acentos grandes).
- [ ] No existen transparencias no permitidas ni brillos de neón (`auditMateStyleContent` conforme).

### Ilustraciones y Medios Visuales
- [ ] Se integran ilustraciones conceptuales abstractas de calidad médica en las secciones clave del portal.
- [ ] Cada imagen cuenta con dimensiones explícitas (`width`, `height`) y texto `alt` rico en contexto semántico.
- [ ] No se produce salto de layout durante la carga de las imágenes.

### Tablas Comparativas y Legibilidad
- [ ] El portal incluye al menos 2 tablas comparativas claras y legibles que alivian la carga de texto continuo.
- [ ] En pantallas móviles (320px - 640px) las tablas son accesibles y cómodas de navegar sin desbordar el viewport horizontal del layout.

### SEO y Validación Técnica
- [ ] Las tablas y contenido nuevo cuentan con Schema.org JSON-LD válido y etiquetas semánticas HTML5.
- [ ] `npm run build` genera las 160 páginas estáticas sin advertencias ni errores.
- [ ] `npm test` ejecuta 150 pruebas con 0 fallos.
- [ ] `node --test tests/adversarial_*.test.mjs` pasa 244 pruebas con 0 fallos.
- [ ] El despliegue a producción vía Easypanel se sincroniza exitosamente a través del repositorio GitHub.

