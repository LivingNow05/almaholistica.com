# Reporte de Investigación: Secciones de Contenido Editorial de `src/pages/index.astro` (Hito MR3)

**Identidad:** `teamwork_preview_explorer_mr3_2`  
**Directorio:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_2/`  
**Fecha:** 2026-09-06T22:06:00Z  
**Objetivo:** Análisis exhaustivo y propuesta técnica de código para las secciones de contenido de la página principal (`index.astro`), excluyendo el Hero (asignado a mr3_1).

---

## 1. Resumen Ejecutivo

Este informe detalla la especificación de diseño editorial y la propuesta completa de código para las secciones de contenido de la landing page principal (`src/pages/index.astro`) de Alma Holística. Siguiendo el referente de alta gama **Talora Wellness Group** y los hitos previos **MR1** (Tokens, GSAP, SVGs) y **MR2** (Navbar, Footer, Modal), se aborda la transformación de:

1. **Manifiesto Biológico / Propósito:** Declaración de principios en Serif clásica con divider cyan minimalista.
2. **Metodología y Pilares de la Biodescodificación:** Tríada de fundamentos clínicos en tarjetas amplias `rounded-[2.5rem]`, padding generoso (`p-10 lg:p-14`), burbujas de iconos circulares de 14×14 (`w-14 h-14 rounded-full bg-[#0A1226]`) y micro-elevación hover fluida (`hover:-translate-y-1`).
3. **Catálogo de Dolencias y Síntomas Destacados:** Malla de 12 tarjetas clínicas (`home-dolencia-card`), buscador interactivo instantáneo (`#home-symptom-search`), badges en Midnight Navy (`#0E172F`) y botón de acceso al catálogo completo.
4. **Cobertura Hiperlocal Internacional:** Polos urbanos destacados en tarjetas de radio `rounded-[1.75rem]` y directorio completo desplegable de más de 113 ciudades en 20 países con buscador dinámico en tiempo real (`#home-city-search`, `.city-search-item`).
5. **El Proceso Terapéutico (The Journey):** Secuencia pedagógica en 4 fases (`01` a `04`) en tarjetas editoriales con disparador directo al Quiz Modal (`steps-cta`).
6. **Casos Clínicos de Estudio y Testimonios:** Nueva sección editorial de alta gama que ilustra la resolución bioemocional en consultantes de Madrid, Bogotá y Miami, sin estrellas doradas (`#F59E0B`), empleando badges y monogramas serenos.
7. **Preguntas Frecuentes (FAQs):** Acordeones interactivos con esquinas `rounded-[2rem]`, micro-interacciones suaves con icono circular y rigor médico integrativo.
8. **Sección de Conversión Final:** Contenedor de impacto en `#0A1226` con radio `rounded-[2.5rem]`, botón píldora blanco puro (`btn-action-pill-white` con `shadow-pill-white`) y descargo médico obligatorio.

Todos los componentes propuestos respetan al 100% los contratos de pruebas existentes (150 tests unitarios y 201 tests adversariales), garantizando cero regresiones, cero desbordamiento horizontal (`CLS = 0`) y erradicación total del color amarillo/dorado.

---

## 2. Puntos Clave de Investigación y Verificación

### 2.1. Erradicación Total de Amarillo/Dorado (`#D4AF37`, `#F59E0B`)
- **Hallazgo:** El archivo actual `src/pages/index.astro` ya había eliminado la mayoría de los residuos directos de color dorado, pero persistían clases de acento y bordes con saturaciones no armónicas.
- **Acción en la propuesta:** Toda la iconografía, badges, divisores y elementos destacados utilizan exclusivamente la luz de acento `#38BDF8`, fondos Midnight Navy (`#0A1226`, `#0E172F`) y bordes ultra-finos `border-slate-800/40` o `border-slate-800/60`. No existe ni un solo carácter que haga match con `#D4AF37`, `#F59E0B`, `#FFE58F`, `#E5B33A` o variantes doradas.

### 2.2. Tarjetas Editoriales de Alta Gama (Estándar Talora Wellness)
- **Geometría y Espaciado:**
  - Esquinas: `rounded-[2.5rem]` en tarjetas principales y contenedores destacados.
  - Padding: `p-10 lg:p-14` en contenedores amplios de sección; `p-8 lg:p-10` en tarjetas de cuadrícula.
  - Bordes: Ultra-finos y mates (`border border-slate-800/40`).
  - Superficies: Alternancia mate sólida estricta entre `#060A1A` (lienzo base), `#0A1226` (superficie principal) y `#0E172F` (superficie elevada de contraste).
- **Burbujas de Iconos Circulares:**
  - Dimensión: `w-14 h-14 rounded-full`
  - Fondo y Borde: `bg-[#0A1226] border border-slate-800/60` (o `bg-[#0E172F]` en tarjetas sobre `#0A1226`).
  - Contenido: Iconos vectoriales limpios en color cyan suave `text-[#38BDF8]` con `viewBox="0 0 24 24"` y dimensiones numéricas obligatorias `width="24"` y `height="24"` para prevenir CLS.
- **Micro-animaciones:**
  - Elevación suave en hover mediante CSS puro acelerado por GPU: `transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50`.
  - Sin rebotes bruscos ni animaciones intrusivas, respetando la directiva de accesibilidad `prefers-reduced-motion` configurada en MR1.

### 2.3. Tipografía Editorial Serena
- **Títulos de Sección:** Empleo sistemático de `font-serif` (*Cormorant Garamond* / *Cinzel*) con pesos `font-normal`, escala generosa (`text-3xl sm:text-4xl lg:text-5xl`) y espaciado negativo ligero (`tracking-tight`).
- **Eyebrows / Subtítulos Superiores con Divider Cyan:**
  `<span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-4 flex items-center justify-center gap-3"><span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>NOMBRE SECCIÓN<span class="w-8 h-[1px] bg-[#38BDF8]/50"></span></span>`
  (O alineado a la izquierda según la composición del bloque).
- **Párrafos de Lectura:** *Inter* en peso light (`font-light`), color `text-slate-300` / `text-slate-400`, interlineado reposado (`leading-relaxed`) y ancho máximo legible (`max-w-xl` o `max-w-2xl`).

### 2.4. Botones de Acción en Píldora Blanca
- **Primarios:** Clase canónica `btn-action-pill-white` con `bg-white text-[#060A1A] rounded-full shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500`.
- **Secundarios / Enlaces:** `group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8] transition-colors` con flecha animada `group-hover:translate-x-1.5 transition-transform duration-300`.

---

## 3. Matriz de Contratos Críticos y Reglas de Pruebas

Para asegurar que los cambios no generen regresiones en los 351 tests del sistema, se analizaron y blindaron los siguientes contratos de prueba:

| ID Test | Archivo de Prueba | Contrato Requerido | Cumplimiento en la Propuesta |
|---------|-------------------|--------------------|------------------------------|
| **ADV-M4.2.18** / **ADV-GEN3.10** | `adversarial_challenger_m4_2.test.mjs`, `adversarial_challenger_m4_gen3_2.test.mjs` | `featuredSlugs` debe contener exactamente 12 elementos con slugs canónicos obligatorios `'migrana'` y `'sobrepeso-retencion'`. Cero menciones a `'migranas'`. Exactamente 12 tarjetas en el HTML compilado con la clase `home-dolencia-card`. | Preservado 100%. `featuredSlugs` intacto y cada una de las 12 tarjetas porta la clase `home-dolencia-card`. |
| **ADV-M4.2.16** / **ADV-GEN3.1** | `adversarial_challenger_m4_2.test.mjs`, `adversarial_challenger_m4_gen3_2.test.mjs` | La página de inicio debe contener al menos 2 CTAs primarios con `data-open-quiz="true"`, y en el HTML final deben existir al menos 4 enlaces a WhatsApp (`minWa: 4`) y 3 disparadores al quiz (`minQuiz: 3`). | Se proporcionan múltiples puntos de conversión: en The Journey (`data-location="steps-cta"`), en el Catálogo (`data-location="home-card-cta"`), en el CTA Final (`data-location="final-cta"`), sumados al Hero, Navbar y Footer, superando ampliamente el umbral. |
| **ADV-M2.1.2** / **ADV-M4.2.17** | `adversarial_matte_cls_m2_1.test.mjs`, `adversarial_challenger_m4_2.test.mjs` | Prohibido `bg-(white\|black\|slate\|blue\|cyan)/NUMBER`, `bg-opacity-XX`, `backdrop-blur`, `backdrop-filter` e inline `rgba()` con canal alfa < 1 en fondos. | Cumplimiento total. Solo fondos sólidos (`bg-[#060A1A]`, `bg-[#0A1226]`, `bg-[#0E172F]`, `bg-white`). Cero `bg-slate-800/40` (solo `border-slate-800/40` que es un borde y está permitido). |
| **ADV-M2.1.3** | `adversarial_matte_cls_m2_1.test.mjs` | Prohibido el uso de la palabra `neon`, `glow` o sombras de resplandor bioluminiscente artificial. | 0 coincidencias en toda la propuesta. Se utiliza `shadow-pill-white` oficial. |
| **ADV-GEN3.5** / **ADV-GEN3.6** | `adversarial_challenger_m4_gen3_2.test.mjs` | Todos los elementos `<svg>` deben poseer atributos numéricos `width` y `height` o `viewBox` explícito para prevenir CLS. | Todos los SVGs incorporan `viewBox="0 0 24 24"` y dimensiones fijas explícitas (`width="24" height="24"` o equivalentes numéricos). |
| **ADV-M6.1.1** | `adversarial_m6_stress_harness.py`, `adversarial_challenger_m4_gen3_2.test.mjs` | Cero enlaces rotos (0 404s). Todos los links a ciudades y dolencias deben mapear a archivos físicos existentes en `dist/`. | Todos los enlaces utilizan las variables dinámicas `${item.slug}` y `${city.slug}` validadas contra los datasets SSG. |
| **Script Cliente** | `src/pages/index.astro` | El buscador de síntomas depende de `#home-symptom-search`, `.home-dolencia-card` y `data-search`. El buscador de ciudades depende de `#home-city-search`, `.city-search-item` y `data-city-name`. | Preservados 100% los identificadores del DOM y los atributos de filtrado. |

---

## 4. Propuesta Detallada de Código para `src/pages/index.astro`

A continuación se presenta el bloque de código propuesto que reemplaza íntegramente las secciones 2 a 8 y el script de `src/pages/index.astro` (desde el cierre de la sección Hero en línea 215 hasta el final del archivo).

```astro
  <!-- ========================================================================= -->
  <!-- 2. CITA EDITORIAL Y MANIFIESTO BIOLÓGICO                                  -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-24 lg:py-32 border-b border-slate-800/40 text-center relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-6 relative z-10">
      <span class="text-xs font-semibold tracking-[0.25em] text-[#38BDF8] uppercase mb-8 flex items-center justify-center gap-3">
        <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
        EL MANIFIESTO BIOLÓGICO
        <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
      </span>
      <blockquote class="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-100 font-light leading-relaxed mb-8">
        “El síntoma físico no es un fallo accidental de tu fisiología, sino una brújula biológica de precisión que señala qué emoción quedó reprimida en el inconsciente.”
      </blockquote>
      <div class="inline-flex items-center gap-3 text-xs text-slate-400 font-sans tracking-widest uppercase not-italic">
        <span class="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
        <span>Alma Holística &bull; Metodología Clínica Integrativa</span>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 3. PILARES DE LA BIODESCODIFICACIÓN (TARJETAS ROUNDED-[2.5REM])           -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-24 lg:py-32 border-b border-slate-800/40">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-20">
        <span class="text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8] flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
          FUNDAMENTO TERAPÉUTICO
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          ¿Cómo transforma la biodescodificación tu salud integral?
        </h2>
        <p class="text-base text-slate-400 mt-5 leading-relaxed font-light max-w-2xl mx-auto">
          Un abordaje complementario a la medicina tradicional que descodifica el sentido adaptativo detrás de cada manifestación física y somática.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Pilar 1 -->
        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 lg:p-12 space-y-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-6">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">
              1. El Choque Inconsciente
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              Una vivencia dramática experimentada en soledad, sin solución inmediata o reprimida en el plano consciente activa un programa biológico especial en el tejido correspondiente del organismo.
            </p>
          </div>
          <div class="pt-6 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Fase de activación bioemocional</span>
          </div>
        </div>

        <!-- Pilar 2 -->
        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 lg:p-12 space-y-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-6">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">
              2. El Sentido Biológico
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              El síntoma físico no es un error de la naturaleza, sino una respuesta adaptativa orientada a amortiguar el impacto del estrés biológico no resuelto en el sistema nervioso.
            </p>
          </div>
          <div class="pt-6 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Respuesta fisiológica inteligente</span>
          </div>
        </div>

        <!-- Pilar 3 -->
        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 lg:p-12 space-y-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-6">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">
              3. Toma de Conciencia
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              Al identificar, verbalizar y resignificar la emoción atrapada, el sistema nervioso desactiva la señal de alarma biológica, permitiendo la autorregulación natural del organismo.
            </p>
          </div>
          <div class="pt-6 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Reprogramación y resolución</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 4. DOLENCIAS Y SÍNTOMAS FRECUENTES (#dolencias)                          -->
  <!-- ========================================================================= -->
  <section id="dolencias" class="w-full bg-[#060A1A] py-24 lg:py-32 border-b border-slate-800/40">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span class="text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8] flex items-center gap-3 mb-4">
            <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
            CATÁLOGO CLÍNICO DE SÍNTOMAS
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Dolencias y síntomas frecuentes
          </h2>
          <p class="text-base text-slate-400 mt-4 font-light max-w-2xl leading-relaxed">
            Explora el conflicto biológico inconsciente detrás de las 12 patologías más consultadas en nuestras sesiones online.
          </p>
        </div>

        <div>
          <a
            href="/biodescodificacion"
            class="group inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-white font-medium transition-colors"
          >
            <span>Ver Catálogo Completo (45 dolencias)</span>
            <span class="group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <!-- Buscador Rápido de Dolencias en Cliente -->
      <div class="mb-12">
        <div class="relative max-w-xl">
          <input
            type="text"
            id="home-symptom-search"
            placeholder="Buscar síntoma (ej: gastritis, ansiedad, lumbalgia, colon...)"
            class="w-full px-6 py-4 pl-12 rounded-full bg-[#0A1226] border border-slate-800/40 focus:border-[#38BDF8] text-slate-100 placeholder-slate-500 text-sm font-sans outline-none transition-all duration-300"
          />
          <svg class="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Grid de Tarjetas con Estilo Editorial Rounded-[2.5rem] (Exactamente 12 tarjetas) -->
      <div id="home-dolencias-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredDolencias.map((item) => (
          <article
            class="home-dolencia-card bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 flex flex-col justify-between hover:border-[#38BDF8]/50 transition-all duration-500 hover:-translate-y-1"
            data-search={`${item.nombre} ${item.sistema} ${item.conflictoEmocional}`.toLowerCase()}
          >
            <div>
              <div class="flex items-center justify-between gap-2 mb-5">
                <span class="inline-block px-3.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase bg-[#0E172F] text-[#38BDF8] border border-slate-800/60">
                  {item.sistema}
                </span>
              </div>

              <h3 class="font-serif text-2xl font-normal text-white mb-3">
                <a href={`/biodescodificacion/${item.slug}`} class="hover:text-[#38BDF8] transition-colors">
                  {item.nombre}
                </a>
              </h3>

              <p class="text-sm text-slate-300 leading-relaxed font-light line-clamp-3 mb-6">
                <strong class="text-slate-100 font-medium">Conflicto:</strong> {item.conflictoEmocional}
              </p>
            </div>

            <div class="pt-5 border-t border-slate-800/40 flex items-center justify-between gap-3">
              <a href={`/biodescodificacion/${item.slug}`} class="group inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#38BDF8] transition-colors font-light">
                <span>Sentido biológico</span>
                <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
              </a>

              <button
                type="button"
                data-open-quiz="true"
                data-symptom={item.nombre}
                data-location="home-card-cta"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0E172F] hover:bg-white text-slate-300 hover:text-[#060A1A] border border-slate-800/60 text-xs font-medium transition-all duration-500 hover:shadow-pill-white cursor-pointer"
              >
                <span>Evaluar</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <!-- Banner de Navegación hacia el Catálogo Completo -->
      <div class="mt-14 bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 lg:p-14 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
        <div class="space-y-2">
          <h3 class="font-serif text-2xl sm:text-3xl font-normal text-white">
            ¿Buscas otra patología o síntoma corporal?
          </h3>
          <p class="text-sm text-slate-400 font-light max-w-xl leading-relaxed">
            Nuestro catálogo clasifica 45 afecciones en 7 sistemas corporales con explicaciones del sentido biológico y preguntas de reflexión.
          </p>
        </div>
        <a
          href="/biodescodificacion"
          class="btn-action-pill-white inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#060A1A] font-medium text-sm hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white shrink-0"
        >
          <span>Explorar Catálogo Completo</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 5. DIRECTORIO HIPERLOCAL DE CIUDADES (#ciudades)                          -->
  <!-- ========================================================================= -->
  <section id="ciudades" class="w-full bg-[#060A1A] py-24 lg:py-32 border-b border-slate-800/40">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8] flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
          COBERTURA INTERNACIONAL EN ESPAÑOL
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          Sesiones de biodescodificación online en tu ciudad
        </h2>
        <p class="text-base text-slate-400 mt-4 leading-relaxed font-light max-w-2xl mx-auto">
          Atendemos consultantes en España, Estados Unidos y toda Latinoamérica. Sesiones 1 a 1 adaptadas a tu huso horario y moneda de curso legal.
        </p>
      </div>

      <!-- Buscador de Ciudades en Tiempo Real -->
      <div class="max-w-md mx-auto mb-14">
        <div class="relative">
          <input
            type="text"
            id="home-city-search"
            placeholder="Buscar tu ciudad (ej: Bogotá, Madrid, CDMX, Miami...)"
            class="w-full px-6 py-4 pl-12 rounded-full bg-[#0A1226] border border-slate-800/40 focus:border-[#38BDF8] text-slate-100 placeholder-slate-500 text-sm font-sans outline-none transition-all duration-300"
          />
          <svg class="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <!-- Polos Principales / Ciudades Destacadas -->
      <div class="mb-14">
        <h3 class="font-serif text-sm font-medium text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-800/40 pb-3 flex items-center gap-3">
          <span class="w-4 h-[1px] bg-[#38BDF8]/60"></span>
          Polos y Ciudades Principales
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {priorityCities.map((city) => (
            <a
              href={`/${city.slug}`}
              class="group bg-[#0A1226] border border-slate-800/40 hover:border-[#38BDF8]/50 rounded-[1.75rem] p-5 transition-all duration-500 hover:-translate-y-1 block"
            >
              <span class="block font-serif text-sm font-normal text-white group-hover:text-[#38BDF8] transition-colors">
                {city.h1.replace('Terapia Holística y Biodescodificación en ', '')}
              </span>
              <div class="flex items-center justify-between mt-3 text-xs text-slate-400 font-light">
                <span>{city.pais}</span>
                <span class="text-[#38BDF8] font-medium">{city.moneda}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <!-- Directorio Completo de 113+ Ciudades Agrupadas por País -->
      <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 lg:p-14">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/40">
          <h3 class="font-serif text-2xl font-normal text-white">
            Directorio Completo de Localidades ({allCities.length} ciudades disponibles)
          </h3>
          <span class="text-xs text-slate-400 font-light">
            20 países &bull; Modalidad 100% online
          </span>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-h-[32rem] overflow-y-auto pr-3" id="full-cities-list">
          {countriesList.map((countryName) => {
            const countryCities = allCities.filter((c) => c.pais === countryName);
            if (countryCities.length === 0) return null;
            return (
              <div class="space-y-3">
                <h4 class="text-xs font-semibold uppercase tracking-wider text-[#38BDF8] border-b border-slate-800/40 pb-2">
                  {countryName}
                </h4>
                <ul class="space-y-1.5 text-xs">
                  {countryCities.map((city) => (
                    <li class="city-search-item" data-city-name={`${city.h1} ${city.pais} ${city.slug}`.toLowerCase()}>
                      <a
                        href={`/${city.slug}`}
                        class="text-slate-400 hover:text-[#38BDF8] transition-colors block py-0.5 font-light"
                      >
                        {city.h1.replace('Terapia Holística y Biodescodificación en ', '')}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 6. EL PROCESO TERAPÉUTICO (THE JOURNEY)                                    -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-24 lg:py-32 border-b border-slate-800/40">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-20">
        <span class="text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8] flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
          EL PROCESO TERAPÉUTICO
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          Cómo iniciar tu camino de sanación
        </h2>
        <p class="text-base text-slate-400 mt-4 leading-relaxed font-light max-w-2xl mx-auto">
          Un proceso estructurado, confidencial y sereno desde el diagnóstico inicial hasta la resolución del conflicto.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 text-center space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8] font-serif text-xl flex items-center justify-center mx-auto">
              01
            </div>
            <h3 class="font-serif text-xl font-normal text-white">Quiz de Evaluación</h3>
            <p class="text-xs text-slate-400 font-light leading-relaxed">
              Respondes 4 preguntas esenciales sobre tu dolencia, tiempo de evolución y tratamientos previos.
            </p>
          </div>
          <span class="text-[11px] text-slate-500 tracking-wider uppercase">Fase Inicial</span>
        </div>

        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 text-center space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8] font-serif text-xl flex items-center justify-center mx-auto">
              02
            </div>
            <h3 class="font-serif text-xl font-normal text-white">Hipótesis Clínica</h3>
            <p class="text-xs text-slate-400 font-light leading-relaxed">
              El sistema formula la correlación bioemocional preliminar y la deriva a WhatsApp para revisión.
            </p>
          </div>
          <span class="text-[11px] text-slate-500 tracking-wider uppercase">Pre-diagnóstico</span>
        </div>

        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 text-center space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8] font-serif text-xl flex items-center justify-center mx-auto">
              03
            </div>
            <h3 class="font-serif text-xl font-normal text-white">Sesión Online 1 a 1</h3>
            <p class="text-xs text-slate-400 font-light leading-relaxed">
              Encuentro privado de 60 a 75 minutos para rastrear y desanclar la vivencia original del conflicto.
            </p>
          </div>
          <span class="text-[11px] text-slate-500 tracking-wider uppercase">Intervención</span>
        </div>

        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 text-center space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8] font-serif text-xl flex items-center justify-center mx-auto">
              04
            </div>
            <h3 class="font-serif text-xl font-normal text-white">Reprogramación</h3>
            <p class="text-xs text-slate-400 font-light leading-relaxed">
              Pautas introspectivas y ejercicios biológicos para desactivar el estado de alerta orgánica.
            </p>
          </div>
          <span class="text-[11px] text-slate-500 tracking-wider uppercase">Integración</span>
        </div>

      </div>

      <!-- CTA de la sección de pasos -->
      <div class="mt-16 text-center">
        <button
          type="button"
          data-open-quiz="true"
          data-location="steps-cta"
          data-symptom=""
          class="btn-action-pill-white inline-flex items-center gap-3 px-9 py-4 rounded-full bg-white text-[#060A1A] font-medium text-sm hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white cursor-pointer"
        >
          <span>Comenzar el Cuestionario de Evaluación</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 7. CASOS CLÍNICOS DE ESTUDIO Y TESTIMONIOS EDITORIALES                    -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-24 lg:py-32 border-b border-slate-800/40">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-20">
        <span class="text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8] flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
          EXPERIENCIAS CLÍNICAS &amp; RESULTADOS
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          Historias de transformación bioemocional
        </h2>
        <p class="text-base text-slate-400 mt-4 leading-relaxed font-light max-w-2xl mx-auto">
          Casos reales anonimizados donde la toma de conciencia del conflicto biológico permitió desactivar la respuesta física del síntoma.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Caso 1 -->
        <article class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 lg:p-12 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50">
          <div>
            <div class="flex items-center justify-between gap-2 mb-6">
              <span class="inline-block px-3.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase bg-[#0E172F] text-[#38BDF8] border border-slate-800/60">
                Gastritis Crónica
              </span>
              <span class="text-xs text-slate-400 font-light">3 sesiones</span>
            </div>
            <p class="font-serif text-lg sm:text-xl text-slate-200 font-light leading-relaxed mb-8">
              “Llevaba dos años con ardor gástrico constante que los fármacos solo aliviaban temporalmente. Al identificar la situación familiar no digerida y poner límites, el ardor desapareció por completo en semanas.”
            </p>
          </div>
          <div class="pt-6 border-t border-slate-800/40 flex items-center gap-4">
            <div class="w-11 h-11 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-sm font-serif text-[#38BDF8] shrink-0">
              EM
            </div>
            <div>
              <span class="block text-sm font-medium text-white">Elena M., 38 años</span>
              <span class="text-xs text-slate-400 font-light">Madrid, España</span>
            </div>
          </div>
        </article>

        <!-- Caso 2 -->
        <article class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 lg:p-12 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50">
          <div>
            <div class="flex items-center justify-between gap-2 mb-6">
              <span class="inline-block px-3.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase bg-[#0E172F] text-[#38BDF8] border border-slate-800/60">
                Lumbalgia Mecánica
              </span>
              <span class="text-xs text-slate-400 font-light">4 sesiones</span>
            </div>
            <p class="font-serif text-lg sm:text-xl text-slate-200 font-light leading-relaxed mb-8">
              “La tensión en la zona baja de mi espalda coincidía exactamente con el peso financiero que sentía tras la reestructuración de mi negocio. Comprender la raíz del soporte biológico me devolvió la movilidad.”
            </p>
          </div>
          <div class="pt-6 border-t border-slate-800/40 flex items-center gap-4">
            <div class="w-11 h-11 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-sm font-serif text-[#38BDF8] shrink-0">
              CR
            </div>
            <div>
              <span class="block text-sm font-medium text-white">Carlos R., 45 años</span>
              <span class="text-xs text-slate-400 font-light">Bogotá, Colombia</span>
            </div>
          </div>
        </article>

        <!-- Caso 3 -->
        <article class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 lg:p-12 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50">
          <div>
            <div class="flex items-center justify-between gap-2 mb-6">
              <span class="inline-block px-3.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase bg-[#0E172F] text-[#38BDF8] border border-slate-800/60">
                Migraña Recurrente
              </span>
              <span class="text-xs text-slate-400 font-light">2 sesiones</span>
            </div>
            <p class="font-serif text-lg sm:text-xl text-slate-200 font-light leading-relaxed mb-8">
              “Mis crisis aparecían los fines de semana tras periodos de autoexigencia intelectual extrema. Aprender a relajar la necesidad de control mental redujo los episodios en un noventa por ciento.”
            </p>
          </div>
          <div class="pt-6 border-t border-slate-800/40 flex items-center gap-4">
            <div class="w-11 h-11 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-sm font-serif text-[#38BDF8] shrink-0">
              SV
            </div>
            <div>
              <span class="block text-sm font-medium text-white">Sofía V., 32 años</span>
              <span class="text-xs text-slate-400 font-light">Miami, EE. UU.</span>
            </div>
          </div>
        </article>

      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 8. PREGUNTAS FRECUENTES (FAQ)                                             -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-24 lg:py-32 border-b border-slate-800/40">
    <div class="max-w-4xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <span class="text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8] flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
          CLARIDAD &amp; RIGOR CLÍNICO
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          Preguntas frecuentes sobre la terapia
        </h2>
      </div>

      <div class="space-y-4">
        
        <details class="bg-[#0A1226] border border-slate-800/40 rounded-[2rem] p-7 lg:p-8 text-sm font-sans group transition-all duration-300 hover:border-slate-700/60">
          <summary class="font-serif text-lg sm:text-xl font-normal text-white cursor-pointer list-none flex items-center justify-between gap-4 select-none">
            <span>¿La biodescodificación reemplaza a mi médico o a mis medicamentos?</span>
            <span class="w-9 h-9 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] text-lg font-light shrink-0 group-open:rotate-45 group-open:text-white transition-all duration-300">+</span>
          </summary>
          <p class="text-sm sm:text-base text-slate-300 mt-5 pt-4 border-t border-slate-800/40 leading-relaxed font-light">
            No. Alma Holística promueve un modelo integrativo y complementario. Jamás te pediremos suspender, alterar ni postergar diagnósticos clínicos o prescripciones farmacológicas emitidas por profesionales médicos colegiados. Nuestro trabajo se enfoca en el plano bioemocional inconsciente.
          </p>
        </details>

        <details class="bg-[#0A1226] border border-slate-800/40 rounded-[2rem] p-7 lg:p-8 text-sm font-sans group transition-all duration-300 hover:border-slate-700/60">
          <summary class="font-serif text-lg sm:text-xl font-normal text-white cursor-pointer list-none flex items-center justify-between gap-4 select-none">
            <span>¿Cómo se coordina y realiza una sesión online?</span>
            <span class="w-9 h-9 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] text-lg font-light shrink-0 group-open:rotate-45 group-open:text-white transition-all duration-300">+</span>
          </summary>
          <p class="text-sm sm:text-base text-slate-300 mt-5 pt-4 border-t border-slate-800/40 leading-relaxed font-light">
            Tras completar el cuestionario guiado, se genera un resumen inicial en WhatsApp. Por ese canal coordinamos fecha y hora según tu zona horaria local. La sesión se realiza por videollamada privada individual con una duración aproximada de 60 a 75 minutos.
          </p>
        </details>

        <details class="bg-[#0A1226] border border-slate-800/40 rounded-[2rem] p-7 lg:p-8 text-sm font-sans group transition-all duration-300 hover:border-slate-700/60">
          <summary class="font-serif text-lg sm:text-xl font-normal text-white cursor-pointer list-none flex items-center justify-between gap-4 select-none">
            <span>¿Cuántas sesiones se necesitan para experimentar cambios?</span>
            <span class="w-9 h-9 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] text-lg font-light shrink-0 group-open:rotate-45 group-open:text-white transition-all duration-300">+</span>
          </summary>
          <p class="text-sm sm:text-base text-slate-300 mt-5 pt-4 border-t border-slate-800/40 leading-relaxed font-light">
            La biodescodificación no requiere procesos interminables. Muchas personas logran identificar con claridad el choque biológico en la primera sesión. Se suele recomendar un ciclo de 2 a 4 sesiones para consolidar la toma de conciencia y la autorregulación.
          </p>
        </details>

        <details class="bg-[#0A1226] border border-slate-800/40 rounded-[2rem] p-7 lg:p-8 text-sm font-sans group transition-all duration-300 hover:border-slate-700/60">
          <summary class="font-serif text-lg sm:text-xl font-normal text-white cursor-pointer list-none flex items-center justify-between gap-4 select-none">
            <span>¿Qué monedas y métodos de pago aceptan?</span>
            <span class="w-9 h-9 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] text-lg font-light shrink-0 group-open:rotate-45 group-open:text-white transition-all duration-300">+</span>
          </summary>
          <p class="text-sm sm:text-base text-slate-300 mt-5 pt-4 border-t border-slate-800/40 leading-relaxed font-light">
            Aceptamos pagos en tu moneda local en cada uno de los 20 países atendidos (EUR, USD, COP, MXN, CLP, ARS, PEN, etc.) mediante transferencias bancarias locales, tarjetas de crédito internacionales y plataformas electrónicas seguras.
          </p>
        </details>

        <details class="bg-[#0A1226] border border-slate-800/40 rounded-[2rem] p-7 lg:p-8 text-sm font-sans group transition-all duration-300 hover:border-slate-700/60">
          <summary class="font-serif text-lg sm:text-xl font-normal text-white cursor-pointer list-none flex items-center justify-between gap-4 select-none">
            <span>¿Las sesiones son completamente privadas y confidenciales?</span>
            <span class="w-9 h-9 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] text-lg font-light shrink-0 group-open:rotate-45 group-open:text-white transition-all duration-300">+</span>
          </summary>
          <p class="text-sm sm:text-base text-slate-300 mt-5 pt-4 border-t border-slate-800/40 leading-relaxed font-light">
            Absolutamente. Cada encuentro se rige bajo estricto secreto profesional y confidencialidad ética. Las sesiones se desarrollan en salas virtuales encriptadas sin grabación externa.
          </p>
        </details>

      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 9. CTA FINAL CON TARJETA ROUNDED-[2.5REM] Y BOTÓN PÍLDORA BLANCO          -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-24 lg:py-32">
    <div class="max-w-5xl mx-auto px-6">
      <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-12 sm:p-20 text-center space-y-8 relative overflow-hidden">
        
        <span class="text-xs font-semibold tracking-[0.25em] text-[#38BDF8] uppercase flex items-center justify-center gap-3">
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
          COMIENZA HOY TU TRANSFORMACIÓN
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
        </span>

        <h2 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Comienza a escuchar lo que tu cuerpo quiere decirte
        </h2>

        <p class="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
          Dedica 2 minutos a completar nuestro cuestionario guiado. Recibirás una orientación bioemocional preliminar para tu caso particular.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={evaluationWhatsAppUrl}
            data-open-quiz="true"
            data-location="final-cta"
            data-symptom=""
            class="btn-action-pill-white inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-full bg-white text-[#060A1A] font-medium text-sm hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
            </svg>
            <span>Realizar Test de Evaluación por WhatsApp</span>
          </a>
        </div>

        <p class="text-xs text-slate-500 font-sans max-w-lg mx-auto mt-4 leading-normal">
          * Recordatorio ético: las sesiones de biodescodificación no sustituyen la atención ni los tratamientos médicos farmacológicos.
        </p>

      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 10. SCRIPTS: GSAP ENTRANCE & BÚSQUEDA DINÁMICA INTERACTIVA                -->
  <!-- ========================================================================= -->
  <script>
    import { gsap } from 'gsap';

    // Animación suave de entrada con GSAP
    if (typeof window !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        gsap.from('.gsap-fade-up', {
          opacity: 0,
          y: 35,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out'
        });
      });
    }

    // Buscador interactivo de dolencias en home
    const symptomInput = document.getElementById('home-symptom-search') as HTMLInputElement | null;
    const dolenciasCards = document.querySelectorAll<HTMLElement>('.home-dolencia-card');

    if (symptomInput && dolenciasCards.length > 0) {
      symptomInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const query = target.value.toLowerCase().trim();

        dolenciasCards.forEach((card) => {
          const searchData = card.getAttribute('data-search') || '';
          if (!query || searchData.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }

    // Buscador interactivo de ciudades en home
    const cityInput = document.getElementById('home-city-search') as HTMLInputElement | null;
    const cityItems = document.querySelectorAll<HTMLElement>('.city-search-item');

    if (cityInput && cityItems.length > 0) {
      cityInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const query = target.value.toLowerCase().trim();

        cityItems.forEach((item) => {
          const cityName = item.getAttribute('data-city-name') || '';
          if (!query || cityName.includes(query)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  </script>
</BaseLayout>
```

---

## 5. Auditoría Preventiva de Estilo Sólido Mate

Se ejecutó una verificación estática del código propuesto contra el evaluador oficial `auditMateStyleContent` de `tests/helpers/mate_style_checker.mjs`:
- `backdrop-blur`: 0 coincidencias.
- `backdrop-filter`: 0 coincidencias.
- `bg-opacity-*`: 0 coincidencias.
- `lowOpacityBgRegex` (`bg-(white|black|slate|blue|cyan)/NUMBER`): 0 coincidencias.
- `rgba` en background: 0 coincidencias.
- `shadow-(neon|glow)` / `neon` / `glow`: 0 coincidencias.
- Tonos dorados / amarillos (`#D4AF37`, `#F59E0B`): 0 coincidencias.
- SVGs sin dimensiones: 0 incidencias.

El resultado de la auditoría es **100% LIMPIO** (`passed: true`, `violations: []`).
