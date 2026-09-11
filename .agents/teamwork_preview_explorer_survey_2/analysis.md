# Reporte de Investigación Exhaustiva: Activos Visuales, Ilustraciones (R2) y Layout
**Agente**: `teamwork_preview_explorer_survey_2`  
**Fecha**: 2026-09-10  
**Proyecto**: Alma Holística (`almaholistica.com`)  
**Objetivo**: Mapeo técnico y visual de activos, diseño de las 3 ilustraciones clínicas vectoriales (R2), estrategia de integración en layout para romper bloques de texto y auditoría de contratos anti-CLS en la suite de pruebas.

---

## 1. Resumen Ejecutivo

1. **Estado Actual de Activos Visuales**:
   - El directorio `public/images/` **no existe actualmente**. En `public/` solo residen los activos de marca iniciales: `favicon.png`, `favicon.svg`, `logo-mariposa-con-fondo-completo.svg` (1.57 MB), `llms.txt`, `robots.txt` y sitemaps XML.
   - En la interfaz web (`src/pages/index.astro`), la única imagen gráfica de gran tamaño es el logo oficial de la mariposa interactiva en el Hero (`width="320" height="320"`). El resto del sitio está compuesto exclusivamente por extensos bloques de texto tipográfico, tarjetas con micro-iconos monocromáticos y números estilizados.
   - Existe una evidente monotonía y sobrecarga textual que requiere la incorporación de las 3 ilustraciones médicas editoriales / geométricas abstractas requeridas en R2.

2. **Diseño de las 3 Ilustraciones Vectoriales Requeridas**:
   - **Ilustración 1 (Hero/Enfoque)**: *Eje mente-cuerpo y correlación neurovegetativa* (`public/images/eje-mente-cuerpo-neurovegetativo.svg`). Silueta geométrica sagital que conecta psique/córtex, tronco cerebral/vías simpáticas-parasimpáticas del SNA y órganos diana somáticos.
   - **Ilustración 2 (Metodología)**: *Los 3 pilares del choque biológico y la respuesta adaptativa* (`public/images/pilares-choque-biologico.svg`). Triangulación bio-cibernética que vincula el Choque Inconsciente (DHS), el Sentido Biológico (capas embrionarias: Endodermo, Mesodermo, Ectodermo) y la Toma de Conciencia / Autorregulación.
   - **Ilustración 3 (Fases del Proceso)**: *Rango de etapas terapéuticas desde el diagnóstico preliminar hasta la autorregulación* (`public/images/fases-proceso-terapeutico.svg`). Oscilograma bifásico / curva electrofisiológica refinada que ilustra la transición desde la simpaticotonía aguda del conflicto hasta la normotonía y homeostasis en 4 etapas sincronizadas con el funnel de conversión.

3. **Garantía Técnica Anti-CLS y Contratos de Pruebas**:
   - La suite de pruebas actual (150 tests de regresión y 244 tests adversariales) audita exhaustivamente cada etiqueta `<img>` en las **160 páginas HTML generadas en `dist/`**.
   - Los tests `ADV-GEN3.4`, `ADV-GEN3.6`, `MR3-ADV-6.4`, `MR3-CH2-2.2`, `M6.2.1` y el arnés de estrés `adversarial_m6_stress_harness.py` fallan de manera fulminante si cualquier `<img>` carece de atributos literales numéricos `width` y `height`, o si el atributo `src` apunta a un archivo que no exista físicamente en disco.
   - Por tanto, las 3 ilustraciones deben crearse físicamente en `public/images/` en formato SVG puro, autoportante, sin scripts, con `viewBox` explícito, sin colores prohibidos (oro/amarillo) y con `loading="lazy"`, `decoding="async"`, garantizando `CLS = 0`.

---

## 2. Auditoría del Inventario de Activos y Layout Existente

### 2.1 Inspección del Directorio `public/`
| Archivo | Tamaño | Tipo / Contenido | Rol en la Plataforma |
| :--- | :--- | :--- | :--- |
| `public/favicon.png` | 85.7 KB | PNG rasterizado | Favicon alternativo navegadores antiguos |
| `public/favicon.svg` | 1.57 MB | SVG vectorial | Favicon principal vectorial |
| `public/logo-mariposa-con-fondo-completo.svg` | 1.57 MB | SVG interactivo animado | Logo oficial en Hero y Navbar (`<object>` e `<img>` fallback) |
| `public/robots.txt` | 124 B | Texto plano | Directivas de rastreo de motores de búsqueda |
| `public/sitemap-index.xml` | 236 B | XML Sitemap | Índice de sitemaps según arquitectura SitemapFast |
| `public/sitemap-0.xml` | 28.1 KB | XML Sitemap | Mapeo de las 160 URLs canónicas del portal |
| `public/sitemap.xml` | 28.1 KB | XML Sitemap | Sitemap redundante de compatibilidad |
| `public/llms.txt` | 4.89 KB | Markdown | Archivo semántico para indexación de motores de IA (GEO / LLMs) |
| `public/images/` | **NO EXISTE** | Directorio | **Debe ser creado** para alojar los activos de R2 |

### 2.2 Activos Gráficos en la Raíz del Repositorio
- `logo-mariposa-con-fondo-completo.svg`: SVG oficial con dimensiones `viewBox="0 0 1254 1254"`, capas `.rings-layer` con animación `@keyframes spinRings 16s linear infinite`, alas `.wing-left` y `.wing-right` con `@keyframes flapLeft` y `flapRight` en hover.
- `logo-mariposa-hover.svg` y `logo-mariposa-hover-mejorado.svg`: Versiones experimentales de hover del logo.

### 2.3 Iconos Vectoriales Inline Actuales
- **Navbar (`src/components/Navbar.astro`)**:
  - Logo: `<img>` con `width="44"` y `height="44"`, contenedor con `shrink-0`.
  - Theme Toggle: Icono SVG Sol (`M12 3v1...`) e Icono SVG Luna (`M20.354 15.354...`).
  - Menú Móvil: Botón con barras y estado ARIA.
- **Footer (`src/components/Footer.astro`)**:
  - Logo: `<img>` con `width="40"` y `height="40"`, contenedor con `shrink-0`.
- **Landing Page (`src/pages/index.astro`)**:
  - Hero: Icono WhatsApp (24x24 con `width="16" height="16"`).
  - Escenario Hero: `<object type="image/svg+xml" data="/logo-mariposa-con-fondo-completo.svg">` con fallback `<img width="320" height="320" loading="eager" />`.
  - Pilares: 3 iconos en burbujas `w-14 h-14` (Rayo, Escudo, Corazón).
  - Buscadores: Lupa (`M21 21l-6-6...`) y Pin de Localización (`M17.657 16.657...`).
  - Proceso: Contenedores circulares con números tipográficos `01`, `02`, `03`, `04`.
  - Testimonios: Comillas decorativas tipográficas serifadas `&ldquo;`.
  - FAQs: Iconos `+` interactivos con rotación en apertura `group-open:rotate-45`.

### 2.4 Diagnóstico de Alivio Estructural del Texto
- La landing page actual posee **1,093 líneas de código Astro**.
- Las secciones 2 (Manifiesto), 3 (Pilares), 4 (Catálogo de dolencias), 5 (Directorio de ciudades), 6 (Proceso), 7 (Testimonios) y 8 (FAQs) presentan una densidad textual sumamente concentrada.
- Aunque el diseño editorial estilo Talora Wellness es sobrio, la carencia de ilustraciones anatómicas o diagramas técnicos provoca fatiga visual y no transmite visualmente el rigor clínico-médico de la biodescodificación integrativa.

---

## 3. Especificaciones Técnicas y Visuales de las 3 Ilustraciones Requeridas (R2)

Para cumplir con la directiva editorial y las restricciones de la suite de pruebas, las 3 ilustraciones deben generarse como archivos **SVG vectoriales puros, autoportantes, 100% sólidos mates y libres de scripts**.

### 3.1 Ilustración 1: Eje Mente-Cuerpo y Correlación Neurovegetativa
- **Ruta de archivo**: `public/images/eje-mente-cuerpo-neurovegetativo.svg`
- **Dimensiones y Aspect Ratio**:
  - `viewBox="0 0 800 600"`
  - `width="800"`
  - `height="600"`
  - Aspect ratio: `4:3` (1.333)
- **Concepto Clínico / Sentido Biológico**:
  - Ilustra la tríada fundamental de la biodescodificación:
    1. **Nivel Psíquico / Cerebral**: Recepción del choque biológico en la corteza y diencéfalo.
    2. **Eje Neurovegetativo (SNA)**: Transmisión sináptica bidireccional por vías simpáticas (estrés/alerta) y parasimpáticas/vagotónicas (reparación/descanso).
    3. **Nivel Orgánico Periférico**: El tejido y órgano diana donde se expresa el síntoma adaptativo.
- **Estructura Gráfica y Elementos Vectoriales**:
  1. *Lienzo y Fondo*: Rectángulo base `#0A1226` con cuadrícula médica milimétrica sutil (líneas discontinuas en `#1E293B`, `stroke-width="0.75"`).
  2. *Silueta Anatómica Superior*: Perfil geométrico estilizado en líneas de trazo blanco/slate (`#94A3B8`, `stroke-width="1.5"`).
  3. *Red Neural / Foco Cerebral*: Anillos concéntricos y red de sinapsis con nodos (`circle r="3"` en `#779DD1` y `#38BDF8`).
  4. *Columna Neurovegetativa Central*: Canal dual con dos vías entrelazadas tipo oscilograma o doble hélice médica:
     - Vía Simpaticotónica (alerta biológica): Trazo dinámico en Ámbar Terracota Mate (`#C2410C` / `#EA580C`).
     - Vía Vagotónica (reparación y autorregulación): Trazo sinusoidal en Lavanda Profundo (`#8B5CF6`) y Azul Pizarra (`#779DD1`).
  5. *Órganos Somáticos Abstractos*: Iconografía geométrica de órganos clave (estómago/digestivo, columna/osteomuscular, pulmones/respiratorio, corazón) conectados al eje central mediante vectores de pulso bioeléctrico.
  6. *Etiquetas Clínicas Integradas*: Textos SVG en fuente tipográfica sans-serif limpia (`Inter` / `system-ui`), color `#94A3B8`, peso 500, tamaño 11px-12px indicando:
     - `CORTEZA Y DIENCÉFALO (RECEPCIÓN DEL CONFLICTO)`
     - `SISTEMA NERVIOSO AUTÓNOMO (VÍAS SIMPÁTICAS / PARASIMPÁTICAS)`
     - `RESPUESTA ADAPTATIVA EN EL ÓRGANO DIANA`

---

### 3.2 Ilustración 2: Metodología — Los 3 Pilares del Choque Biológico y la Respuesta Adaptativa
- **Ruta de archivo**: `public/images/pilares-choque-biologico.svg`
- **Dimensiones y Aspect Ratio**:
  - `viewBox="0 0 800 500"`
  - `width="800"`
  - `height="500"`
  - Aspect ratio: `16:10` (1.6)
- **Concepto Clínico / Sentido Biológico**:
  - Mapea el ciclo biológico adaptativo que rige la enfermedad y la sanación:
    1. **Pilar 1: El Choque Inconsciente (DHS / Bio-shock)**: Evento imprevisto, agudo, vivido en soledad y sin solución consciente.
    2. **Pilar 2: La Respuesta Adaptativa del Tejido**: Modificación funcional o celular en la capa embrionaria específica (Endodermo, Mesodermo, Ectodermo) para amortiguar el impacto biológico.
    3. **Pilar 3: La Toma de Conciencia y Autorregulación**: Desactivación del programa biológico de emergencia mediante la integración psicoemocional.
- **Estructura Gráfica y Elementos Vectoriales**:
  1. *Lienzo y Fondo*: Fondo sólido `#0A1226` con borde periférico `#1E293B`.
  2. *Triangulación Bio-Cibernética*: Tres macro-nodos circulares (`r="54"`) situados en los vértices de un triángulo equilátero dinámico con bordes redondeados.
  3. *Flujos de Interconexión*: Curvas bezier gruesas (`stroke-width="2.5"`) con micro-vectores de dirección que conectan los 3 pilares en un bucle continuo de retroalimentación biológica.
  4. *Detalle por Macro-Nodo*:
     - **Nodo 1 (Choque Inconsciente)**: Núcleo en Terracota Mate (`#C2410C`), anillo concéntrico discontinuo de onda de choque, icono interior de impacto.
     - **Nodo 2 (Respuesta Adaptativa)**: Núcleo en Verde Salvia / Esmeralda Sereno (`#10B981`), estructura multicapa representativa de las 3 capas germinativas (Endodermo, Mesodermo, Ectodermo).
     - **Nodo 3 (Toma de Conciencia)**: Núcleo en Amatista / Lavanda Suave (`#8B5CF6`) y Cyan (`#779DD1`), con icono de resonancia y equilibrio.
  5. *Núcleo Central*: Silueta sutil de la mariposa geométrica de Alma Holística en trazo ultrafino `#779DD1`/30 que simboliza la transformación.
  6. *Textos Explicativos*: Rótulos claros para cada nodo con subtítulo de función fisiológica.

---

### 3.3 Ilustración 3: Fases del Proceso Terapéutico — Rango de Etapas desde el Diagnóstico hasta la Autorregulación
- **Ruta de archivo**: `public/images/fases-proceso-terapeutico.svg`
- **Dimensiones y Aspect Ratio**:
  - `viewBox="0 0 900 450"`
  - `width="900"`
  - `height="450"`
  - Aspect ratio: `2:1` (2.0)
- **Concepto Clínico / Sentido Biológico**:
  - Curva de evolución bifásica terapéutica que desglosa el acompañamiento clínico desde la fase de crisis hasta la normotonía:
    - **Etapa 01**: Evaluación y Cuestionario (identificación del síntoma y línea temporal).
    - **Etapa 02**: Hipótesis Clínica y Sentido Biológico (detección del conflicto activo y fase de simpaticotonía).
    - **Etapa 03**: Sesión Online 1 a 1 (intervención, desanclaje emocional y entrada en fase de resolución / vagotonía).
    - **Etapa 04**: Reprogramación y Autorregulación (estabilización celular, homeostasis y cierre del programa biológico).
- **Estructura Gráfica y Elementos Vectoriales**:
  1. *Lienzo y Fondo*: Superficie mate `#0A1226` con rejilla tipo oscilograma clínico de precisión (`#0E172F` / `#1E293B`).
  2. *Ejes de Coordenadas Médicas*:
     - Eje horizontal: `Línea Temporal del Acompañamiento Terapéutico`.
     - Eje vertical: `Tono Neurovegetativo (Simpaticotonía vs Parasimpaticotonía)`.
  3. *Curva Bifásica de Sanación*: Línea vectorial continua de 3px que describe:
     - Ascenso de tensión (estrés y alerta biológica).
     - Meseta de conflicto activo.
     - Punto de inflexión en la sesión clínica (Toma de Conciencia / Vagotonía de sanación).
     - Curva armónica suave descendente hacia la normotonía balanceada.
  4. *4 Hitos Nodales Numerados*:
     - Cápsulas nodales `01`, `02`, `03`, `04` con bordes circulares `#1E3A5F`, fondos `#0E172F` y números en tipografía serifada editorial (`Cormorant Garamond`).
     - Badges de color coordinados: Sky/Azul (`#0284C7`), Verde (`#10B981`), Índigo/Amatista (`#8B5CF6`) y Cyan (`#779DD1`).
  5. *Línea Base de Homeostasis*: Línea horizontal discontinua central (`stroke-dasharray="4,4"`, `#64748B`) que marca el equilibrio fisiológico normotónico.

---

## 4. Estrategia de Integración en Páginas y Componentes

Para aliviar efectivamente los bloques de texto continuo y sincronizarse con los requisitos de R3 (Tablas Comparativas), se propone la siguiente arquitectura de integración:

### 4.1 En `src/pages/index.astro`
1. **Sección de Enfoque Clínico / Manifiesto (Integración de Ilustración 1)**:
   - **Ubicación**: Justo después del Manifiesto Biológico (línea 237) o dentro de la nueva subsección de "Enfoque Clínico y Modelo Integrativo".
   - **Formato de Maquetación**: Grid de 2 columnas o tarjeta editorial destacada (`rounded-[2.5rem] p-8 lg:p-12 bg-[#0A1226] border border-slate-800/40`):
     - Columna izquierda / Superior: Tabla de Enfoque Clínico (*Medicina Convencional vs Biodescodificación Integrativa*).
     - Columna derecha / Inferior: `Ilustración 1 (Eje Mente-Cuerpo)` con título explicativo y pie de figura descriptivo (`<figure>` y `<figcaption>`).
   - **Snippet de Implementación**:
     ```html
     <figure class="relative w-full max-w-2xl mx-auto rounded-[2rem] overflow-hidden bg-[#0A1226] border border-slate-800/40 p-4 sm:p-6">
       <img
         src="/images/eje-mente-cuerpo-neurovegetativo.svg"
         alt="Diagrama anatómico vectorial del eje mente-cuerpo y la correlación neurovegetativa en biodescodificación"
         width="800"
         height="600"
         loading="lazy"
         decoding="async"
         class="w-full h-auto object-contain rounded-[1.5rem]"
       />
       <figcaption class="mt-3 text-center text-xs font-sans text-slate-400 font-medium">
         Figura 1. Correlación neurovegetativa: cómo el conflicto inconsciente activa la respuesta adaptativa del tejido orgánico.
       </figcaption>
     </figure>
     ```

2. **Sección de Pilares del Fundamento Terapéutico (Integración de Ilustración 2)**:
   - **Ubicación**: En la Sección 3 de `index.astro` (línea 258, antes del grid de pilares o en disposición asimétrica).
   - **Formato de Maquetación**: Banner conceptual horizontal antes de las 3 tarjetas de pilares, o acompañando a la nueva *Tabla Matriz de Dolencias y Sentido Biológico* (R3).
   - **Snippet de Implementación**:
     ```html
     <div class="mb-14 max-w-4xl mx-auto">
       <figure class="rounded-[2.5rem] bg-[#0A1226] border border-slate-800/40 p-6 lg:p-8">
         <img
           src="/images/pilares-choque-biologico.svg"
           alt="Esquema de los tres pilares del choque biológico: impacto inconsciente, sentido biológico adaptativo y autorregulación"
           width="800"
           height="500"
           loading="lazy"
           decoding="async"
           class="w-full h-auto object-contain rounded-[1.75rem]"
         />
         <figcaption class="mt-4 text-center text-xs sm:text-sm text-slate-400">
           Figura 2. Los 3 pilares de la respuesta adaptativa y su progresión según la capa embrionaria.
         </figcaption>
       </figure>
     </div>
     ```

3. **Sección del Proceso Terapéutico (Integración de Ilustración 3)**:
   - **Ubicación**: En la Sección 6 de `index.astro` (línea 559, justo antes o después del grid de los 4 pasos terapéuticos).
   - **Formato de Maquetación**: Infografía panorámica que precede a las tarjetas de pasos, o como cabecera visual de la *Tabla de Etapas del Acompañamiento* (R3).
   - **Snippet de Implementación**:
     ```html
     <div class="mb-16 max-w-5xl mx-auto">
       <figure class="rounded-[2.5rem] bg-[#0A1226] border border-slate-800/40 p-6 sm:p-10">
         <img
           src="/images/fases-proceso-terapeutico.svg"
           alt="Curva electrofisiológica de las fases terapéuticas desde la evaluación preliminar hasta la autorregulación biológica"
           width="900"
           height="450"
           loading="lazy"
           decoding="async"
           class="w-full h-auto object-contain rounded-[1.5rem]"
         />
         <figcaption class="mt-4 text-center text-xs text-slate-400">
           Figura 3. Curva bifásica del proceso terapéutico: del estrés simpaticotónico a la normotonía de autorregulación.
         </figcaption>
       </figure>
     </div>
     ```

### 4.2 En Páginas Dinámicas de Dolencias (`src/pages/biodescodificacion/[slug].astro`)
- En las 45 páginas de dolencias temáticas, entre la Sección 1 ("El Conflicto Emocional Inconsciente", línea 144) y la Sección 2 ("El Sentido Biológico de Supervivencia", línea 171), existe un espacio ideal para insertar una vista compacta de la Ilustración 1 o Ilustración 2 para ilustrar cómo el choque biológico se traduce en el síntoma específico del consultante.

---

## 5. Requisitos Técnicos Indispensables y Prevención de CLS (CLS = 0)

Para garantizar cero salto de contenido y 100% de cumplimiento en la suite de pruebas:

1. **Atributos Literales Numéricos en `<img>`**:
   - Todo tag `<img>` DEBE tener `width="XXX"` y `height="YYY"` explícitos con números enteros sin unidad `px`.
   - Ejemplo conforme: `<img src="/images/eje-mente-cuerpo-neurovegetativo.svg" width="800" height="600" ... />`.
   - Justificación: Los navegadores modernos reservan el espacio vertical del bloque antes de iniciar la descarga gracias a la proporción de aspecto derivada (`aspect-ratio: 800/600 = 1.333`), eliminando cualquier Cumulative Layout Shift (`CLS = 0`).

2. **Atributos de Rendimiento y Accesibilidad**:
   - `loading="lazy"`: Carga diferida nativa del navegador cuando el elemento entra en el margen del viewport.
   - `decoding="async"`: Decodificación asíncrona fuera del hilo principal de renderizado.
   - `alt="..."`: Texto alternativo rico en terminología clínica y SEO (biodescodificación, correlación neurovegetativa, sentido biológico, autorregulación).
   - `role="img"` y semántica HTML5 con `<figure>` y `<figcaption>`.

3. **Restricciones de Estilo Sólido Mate (Mate Style Policy)**:
   - Los SVGs **no deben contener**:
     - Filtros de desenfoque tipo `filter: blur(...)` o `feGaussianBlur stdDeviation=">5"`.
     - Fondos translúcidos con opacidades fraccionarias en Tailwind (`bg-slate-900/50`).
     - Resplandores de neón (`box-shadow: 0 0 20px #...` o clases `shadow-neon`).
     - Colores prohibidos por el estándar editorial: `#D4AF37` (oro satinado) y `#F59E0B` (ámbar clásico).
   - Los SVGs **deben usar**:
     - Superficies sólidas mates (`#060A1A`, `#0A1226`, `#0E172F`).
     - Bordes mates discretos (`#1E293B`, `#1E3A5F`).
     - Acentos semánticos aprobados: Verde Salvia (`#10B981`), Terracota (`#C2410C`), Azul Zafiro (`#0284C7`), Amatista (`#8B5CF6`) y Cyan (`#779DD1` / `#38BDF8`).

4. **Reglas de Contención Responsiva de Ancho (Mobile 320px - Desktop)**:
   - Prohibido utilizar anchos fijos desbordantes (`w-[800px]`, `w-[900px]`, `width: 800px` en CSS) según test `T2.6.1`.
   - Se debe utilizar siempre `w-full max-w-2xl` o `w-full max-w-4xl` con `h-auto mx-auto`.
   - En CSS global (`src/styles/global.css`), la regla existente:
     `img, svg, video, canvas, audio, iframe, embed, object { display: block; max-width: 100%; height: auto; }`
     garantiza que la imagen se adapte perfectamente a pantallas estrechas de 320px sin desbordar el viewport horizontal.

---

## 6. Mapeo y Análisis de la Suite de Pruebas Automatizadas

La suite actual consta de **150 pruebas de regresión** (`npm test`) y **244 pruebas adversariales** (`node --test tests/adversarial_*.test.mjs`). Un total de 394 pruebas que se ejecutan limpiamente con 0 fallos.

A continuación se detallan las pruebas específicas que auditan imágenes, activos, estilos y CLS:

### 6.1 Pruebas Específicas de Imágenes y Prevención de CLS
| Archivo de Prueba | Test ID / Nombre | Criterio de Verificación Específico |
| :--- | :--- | :--- |
| `tests/adversarial_mr3_challenger.test.mjs` | `MR3-ADV-6.4` | Escanea `dist/index.html` y exige que **todos** los `<img>` contengan `width="[0-9]+"` y `height="[0-9]+"`. |
| `tests/adversarial_mr3_challenger_2.test.mjs` | `MR3-CH2-2.1` | Valida que el logo de la mariposa preserve `width="320" height="320"` y `loading="eager"`. |
| `tests/adversarial_mr3_challenger_2.test.mjs` | `MR3-CH2-2.2` | Comprueba que todos los `<img>` en `dist/index.html` tengan dimensiones numéricas explícitas. |
| `tests/adversarial_mr3_challenger_2.test.mjs` | `MR3-CH2-2.5` | Exige que todos los `<svg>` en la página tengan `viewBox` o atributos `width`/`height`. |
| `tests/adversarial_challenger_m4_gen3_2.test.mjs` | `ADV-GEN3.4` | Verifica atributos `width` y `height` en archivos HTML de muestra (`gastritis`, `index.html`, etc.). |
| `tests/adversarial_challenger_m4_gen3_2.test.mjs` | `ADV-GEN3.6` | **Auditoría exhaustiva sobre las 160 páginas HTML**: Cualquier `<img>` sin `width` y `height` hace fallar la suite. |
| `tests/adversarial_challenger_m4.test.mjs` | `M4.6 (Líneas 439-456)` | Exige `width=` y `height=` en todas las páginas clave (`index.html`, `bogota`, `madrid`, `gastritis`, `ansiedad`). |
| `tests/adversarial_m6_final_qa.test.mjs` | `M6.2.1` | Comprueba que todos los tags `<img>` en `dist/` tengan atributos numéricos de ancho y alto. |
| `tests/adversarial_m6_stress_harness.py` | `Dimension 1 (Líneas 85-125)` | **Auditoría de integridad de enlaces y activos físicos**: Extrae cada `src` de `<img>` y valida que el archivo físico exista en `dist/` (0 enlaces rotos, 0 errores 404). |
| `tests/adversarial_m6_stress_harness.py` | `Dimension 2 (Líneas 185-215)` | Inspecciona que todos los `<img>` de las 160 páginas posean `has_width and has_height`. |
| `tests/tier2_edge_cases.test.mjs` | `T2.6.1` | Veta cualquier estilo CSS o clase con ancho fijo desbordante (`w-[800px]`, `width: 800px`). |

### 6.2 Pruebas de Estilo Visual Sólido Mate y Erradicación de Oro
| Archivo de Prueba | Test ID / Nombre | Criterio de Verificación Específico |
| :--- | :--- | :--- |
| `tests/helpers/mate_style_checker.mjs` | `auditMateStyleContent` | Prohíbe terminantemente `backdrop-blur`, `backdrop-filter`, `bg-opacity-*`, `shadow-neon`, `glow`. |
| `tests/adversarial_matte_cls_m2_1.test.mjs` | `ADV-M2.1.1` a `ADV-M2.1.5` | Escaneo en todos los archivos `.astro`, `.css`, `.ts`, `.tsx`, `.mjs` contra glassmorphism y neón. |
| `tests/adversarial_challenger_mr2.test.mjs` | `ADV-MR2.1.1` a `ADV-MR2.1.4` | Cero apariciones de `#D4AF37`, `#F59E0B`, RGB (212,175,55), RGB (245,158,11), clases `amber-*`, `yellow-*`, `gold-*`. |
| `tests/adversarial_assets_config_m2_2.py` | `TEST 1 y TEST 2` | Inspección de seguridad SVG: **Cero `<script>`**, cero event handlers (`onload=`, `onerror=`). |

---

## 7. Plan de Acción y Guía Paso a Paso para el Worker Implementador (M2)

Para cuando el Orchestrator despache el hito de implementación M2, el Worker asignado debe seguir esta secuencia estricta:

1. **Paso 1: Creación del Directorio de Imágenes**:
   - Crear el directorio físico `public/images/`.
2. **Paso 2: Generación de los 3 Archivos SVG**:
   - Crear `public/images/eje-mente-cuerpo-neurovegetativo.svg` (`viewBox="0 0 800 600"`, 100% vectorial, colores mate).
   - Crear `public/images/pilares-choque-biologico.svg` (`viewBox="0 0 800 500"`, 3 pilares, capas embrionarias).
   - Crear `public/images/fases-proceso-terapeutico.svg` (`viewBox="0 0 900 450"`, curva bifásica y 4 hitos).
   - Validar que ninguno contenga scripts, event handlers, ni colores prohibidos (#D4AF37, #F59E0B).
3. **Paso 3: Integración en Componentes Astro**:
   - En `src/pages/index.astro`, insertar las figuras con atributos explícitos:
     - `width="800" height="600" loading="lazy" decoding="async" alt="..."` para Ilustración 1.
     - `width="800" height="500" loading="lazy" decoding="async" alt="..."` para Ilustración 2.
     - `width="900" height="450" loading="lazy" decoding="async" alt="..."` para Ilustración 3.
   - Envolver cada imagen en contenedores responsivos fluidos (`w-full max-w-2xl` o `max-w-4xl mx-auto`) con bordes editoriales `rounded-[2rem]`.
4. **Paso 4: Verificación Empírica**:
   - Ejecutar `npm run build` para asegurar que Astro copie `public/images/` hacia `dist/images/` y genere las 160 páginas estáticas.
   - Ejecutar `npm test` (150 tests) y `node --test tests/adversarial_*.test.mjs` (244 tests).
   - Ejecutar `python3 tests/adversarial_m6_stress_harness.py` para asegurar que los enlaces a imágenes en `dist/` sean resueltos con 0 errores 404.
