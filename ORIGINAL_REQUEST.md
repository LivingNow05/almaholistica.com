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
