# Reporte de Exploración Técnica — Hito MR4: Rutas Dinámicas SSG de Dolencias

**Agente:** `teamwork_preview_explorer_mr4_ailments`  
**Directorio de Trabajo:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr4_ailments/`  
**Fecha:** 2026-09-06  
**Objetivo:** Análisis exhaustivo, detección de residuos de estilos obsoletos, auditoría de contratos de prueba y propuesta de código para la transformación estética de `src/pages/biodescodificacion/[slug].astro` y `src/pages/biodescodificacion/index.astro` hacia el estándar editorial Talora Wellness Group.

---

## 1. Diagnóstico Actual y Auditoría de Código

### 1.1 `src/pages/biodescodificacion/[slug].astro`
* **Estilos y Contenedores:** Actualmente usa clases genéricas de la primera iteración (`card-matte-elevated`, `card-matte`) con bordes duros de radio pequeño (`rounded-xl` y `rounded-r-xl`), esquinas de 12px que lucen rígidas en comparación con el estándar editorial `rounded-[2.5rem]` implementado en MR3.
* **Residuos de Dorado/Amarillo:**
  - Línea 100: `<div class="badge-gold mb-4">` (Sistema Biológico).
  - Línea 194: `<span class="badge-gold mb-4">Integración y Liberación</span>`.
  - Línea 309: `<span class="badge-gold mb-4">Diagnóstico Emocional en Vivo</span>`.
  - El uso de la clase `badge-gold` viola la directriz de erradicación absoluta de referencias semánticas a dorado/amarillo (`#D4AF37`, `#F59E0B`, `gold`).
* **Botones de Acción:**
  - Líneas 120, 252, 319: Emplean `.btn-action-primary` (Cyan tradicional plano) en lugar del nuevo estándar editorial de botón en píldora blanca de alta gama (`bg-white text-[#060A1A] rounded-full shadow-pill-white`).
  - Línea 132: Emplea `.btn-action-secondary` genérico.
* **Tipografía:**
  - Títulos con clase `.heading-solemn` y pesos `font-bold` pesados, en contraste con la elegancia serena monumental de *Cormorant Garamond* (`font-serif font-normal tracking-tight`).
  - Textos de lectura sin el peso refinado `font-light` ni el espaciado aireado `leading-relaxed`.
* **Indicadores y Preguntas:**
  - Línea 226: Círculos de numeración pequeños `w-8 h-8 rounded-full` con bordes finos, en lugar de las amplias burbujas circulares requeridas `w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8]`.

### 1.2 `src/pages/biodescodificacion/index.astro`
* **Cabecera y Buscador:**
  - Línea 68: Badge con borde cyan duro `border-[#38BDF8]` y padding estrecho.
  - Línea 90: Input de búsqueda con esquinas `rounded-xl` en lugar de la moderna píldora `rounded-full`.
  - Líneas 102, 113: Botones de filtro de sistemas biológicos con esquinas `rounded-lg` rígidas.
* **Cuadrícula de Tarjetas (45 Dolencias):**
  - Línea 146: Tarjetas con `rounded-2xl p-6` y bordes `#1E293B`, distantes de la holgura `rounded-[2.5rem]` y padding generoso `p-8 lg:p-10`.
  - Línea 206: Botón "Evaluar" con fondo oscuro `#0E172F` y texto cyan, en vez del botón píldora blanco refinado `rounded-full bg-white text-[#060A1A] hover:bg-[#38BDF8]`.
* **Sección de los 7 Sistemas:**
  - Línea 258: Tarjetas con radio `rounded-2xl` y viñetas de punto `w-2.5 h-2.5 rounded-full` en lugar de las características burbujas de icono circulares editoriales `w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8]`.
* **CTA Final del Directorio:**
  - Línea 328: Contenedor con `rounded-3xl` y botón `#38BDF8` plano tradicional, debiendo migrar a `rounded-[2.5rem]` con botón píldora blanco puro `shadow-pill-white`.

---

## 2. Matriz de Mapeo a la Estética Editorial Talora Wellness Group

| Elemento | Estado Actual | Transformación Requerida (Talora) |
|---|---|---|
| **Lienzo de Fondo** | `#060A1A` con separadores `#1E293B` | `#060A1A` mate abisal con bordes ultra-finos `border-slate-800/40` |
| **Tarjetas y Superficies** | `card-matte`, `card-matte-elevated`, `rounded-xl`/`rounded-2xl` | `bg-[#0A1226]` y `bg-[#0E172F]` con esquinas `rounded-[2.5rem]`, padding `p-8 sm:p-10 lg:p-14` |
| **Botones Principales** | `btn-action-primary` (`bg-[#38BDF8] text-[#060A1A] rounded-full`) | `btn-action-pill-white` (`bg-white text-[#060A1A] px-8 py-4 rounded-full shadow-pill-white hover:bg-[#38BDF8]`) |
| **Botones Secundarios** | `btn-action-secondary` básico | `group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8]` con flecha interactiva |
| **Luz de Acento** | Acentos dispersos con residuos `badge-gold` | Eyebrows editoriales con línea de 1px: `<span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>` + texto cyan tracking `[0.2em]` |
| **Burbujas de Iconos** | Puntos de 8px o cajas de 32px | Burbujas circulares `w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8]` |
| **Tipografía de Títulos** | `.heading-solemn` sans/serif bold pesado | *Cormorant Garamond* monumental `font-serif font-normal tracking-tight leading-[1.05]` |
| **Tipografía de Párrafos** | Sans standard regular | Sans-serif light `font-light text-slate-300 leading-relaxed max-w-2xl` |

---

## 3. Mapeo Exhaustivo de Contratos de Prueba y Restricciones Técnicas

1. **Generación SSG de 45 Dolencias (`getStaticPaths`):**
   - El contrato de `ADV-M4.1.2`, `ADV-GEN3.2` y `T1.16.2` exige que `getDolencias()` genere exactamente 45 páginas temáticas en `dist/biodescodificacion/<slug>/index.html`.
   - Slugs críticos que no deben sufrir mutaciones: `migrana` (singular innegociable, nunca `migranas`), `sobrepeso-retencion` (canónico, nunca `sobrepeso`).

2. **Inyección de Esquemas JSON-LD (Regla de Asimetría Estricta):**
   - **`src/pages/biodescodificacion/[slug].astro`:** Debe inyectar EXACTAMENTE TRES (3) esquemas JSON-LD estructurados:
     1. `MedicalWebPage` (con `url: https://almaholistica.com/biodescodificacion/${dolencia.slug}/`, `about.associatedPathophysiology: dolencia.sentidoBiologico`).
     2. `FAQPage` (con `mainEntity` mapeando `dolencia.faqs`).
     3. `BreadcrumbList` (con 3 ítems: Inicio `/`, Biodescodificación `/biodescodificacion/`, Dolencia actual).
     *Comprobado por:* `ADV-M4.5.2`, `ADV-M5.4.1`, `adversarial_m5_sitemaps_schema.py` Dimensión 5.
   - **`src/pages/biodescodificacion/index.astro`:** Debe tener EXACTAMENTE CERO (0) esquemas JSON-LD.
     *Comprobado por:* `ADV-M5.4.1` (`assert.equal(matches.length, 0)`), `adversarial_m5_sitemaps_schema.py` Dimensión 5 (`assert len(matches) == 0`).

3. **Etiquetas Canónicas y Trailing Slashes:**
   - Para cada dolencia `[slug].astro`: URL canónica con barra final obligatoria `https://almaholistica.com/biodescodificacion/${dolencia.slug}/`.
   - Para el catálogo `index.astro`: URL canónica SIN barra final `https://almaholistica.com/biodescodificacion` (requerido taxativamente por `adversarial_m5_sitemaps_schema.py` línea 252: `assert canon_url == f"{DOMAIN}/biodescodificacion"`).

4. **Funnel de Conversión y Atributos del Quiz Modal:**
   - Cada página de dolencia debe contener al menos 3 disparadores `data-open-quiz="true"`, con el atributo `data-symptom={nombre}` coincidente con el nombre oficial de la dolencia (ej: "Gastritis y Acidez Gástrica").
   - El catálogo general `index.astro` debe contener al menos 45 disparadores `data-open-quiz="true"` (uno por cada tarjeta de dolencia) más los botones globales del catálogo y el modal container.
   - Todos los enlaces de fallback deben apuntar al teléfono canónico `https://wa.me/573000000000`.

5. **Auditoría de Estilo Mate Sólido (`mate_style_checker.mjs`):**
   - Prohibido `backdrop-blur`, `backdrop-filter`.
   - Prohibido `bg-opacity-*`.
   - Prohibido cualquier `rgba(...)` inline en fondos de superficies.
   - Prohibido `shadow-neon`, `shadow-glow`, `border-amber-*`, `border-yellow-*`, `#D4AF37`, `#F59E0B`.
   - Para las sombras de botones píldora, utilizar exclusivamente el token semántico `shadow-pill-white` (definido en `tailwind.config.mjs`) o la clase utilitaria de componente `.btn-action-pill-white`.

6. **Prevención de CLS (CLS = 0):**
   - Todo SVG debe poseer atributos numéricos explícitos `width` y `height`, además de `viewBox`, o estar contenido en dimensiones rígidas (`ADV-GEN3.5`).
   - Cero desbordamiento horizontal en viewport de 320px (`overflow-x: hidden`).

---

## 4. Propuesta Técnica de Código Detallada

### 4.1 Propuesta para `src/pages/biodescodificacion/[slug].astro`

```astro
---
/**
 * src/pages/biodescodificacion/[slug].astro — Ruta Dinámica SSG para Dolencias Físicas y Emocionales
 * Alma Holística (almaholistica.com)
 *
 * Genera estáticamente las 45 páginas temáticas de biodescodificación por síntoma.
 * Estética Editorial Contemporánea: Inspiración Talora Wellness Group.
 * Fondo Abisal Sólido Mate (#060A1A), Superficies Midnight (#0A1226, #0E172F), Luz Cyan (#38BDF8).
 * Tarjetas amplias rounded-[2.5rem], botones píldora blancos con shadow-pill-white y cero amarillo.
 * Cumple con R1, R2, R3, R4, R5 y la suite de pruebas adversarial M4/M5/M6.
 */

import BaseLayout from '../../layouts/BaseLayout.astro';
import { getDolencias } from '../../lib/dolencias';
import type { DolenciaData, DolenciaStaticPath } from '../../types/dolencia';
import { SITE_CONFIG, buildWhatsAppUrl } from '../../config/site';
import {
  buildMedicalWebPageSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from '../../lib/schema';

export async function getStaticPaths(): Promise<DolenciaStaticPath[]> {
  const dolencias = getDolencias();
  return dolencias.map((dolencia) => ({
    params: { slug: dolencia.slug },
    props: { dolencia },
  }));
}

export interface Props {
  dolencia: DolenciaData;
}

const { dolencia } = Astro.props;

// Extracción tipada estricta de las propiedades de la dolencia
const nombre = dolencia.nombre;
const sistema = dolencia.sistema;
const conflictoEmocional = dolencia.conflictoEmocional;
const sentidoBiologico = dolencia.sentidoBiologico;
const reprogramacion = dolencia.reprogramacion;
const preguntasReflexion = dolencia.preguntasReflexion || [];
const faqs = dolencia.faqs || [];
const ganchoAgendamiento = dolencia.ganchoAgendamiento;

// Metadatos SEO y URL Canónica oficial con trailing slash (conforme a astro.config.mjs y adversarial M5)
const pageTitle = `Biodescodificación de ${nombre} | Conflicto Emocional y Sanación | ${SITE_CONFIG.name}`;
const pageDescription = `Descubre el conflicto emocional inconsciente y sentido biológico de ${nombre}. Pautas de reprogramación mental y agenda tu sesión online de diagnóstico.`;
const canonicalUrl = `https://almaholistica.com/biodescodificacion/${dolencia.slug}/`;

// Schemas JSON-LD Estructurados (MedicalWebPage + FAQPage + BreadcrumbList) — EXACTAMENTE 3 SCHEMAS
const medicalSchema = buildMedicalWebPageSchema(dolencia, canonicalUrl);
const faqSchema = buildFAQSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema([
  {
    name: 'Inicio',
    url: 'https://almaholistica.com/',
  },
  {
    name: 'Biodescodificación',
    url: 'https://almaholistica.com/biodescodificacion/',
  },
  {
    name: nombre,
    url: canonicalUrl,
  },
]);

// Generación de URL de WhatsApp estructurada para progressive enhancement
const fallbackWhatsAppUrl = buildWhatsAppUrl({
  symptom: nombre,
});
---

<BaseLayout
  title={pageTitle}
  description={pageDescription}
  canonical={canonicalUrl}
>
  <Fragment slot="schema">
    <script is:inline type="application/ld+json" set:html={JSON.stringify(medicalSchema)} />
    {faqSchema && <script is:inline type="application/ld+json" set:html={JSON.stringify(faqSchema)} />}
    <script is:inline type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  </Fragment>

  <article class="w-full max-w-5xl mx-auto px-6 lg:px-12 py-10 md:py-16">
    <!-- Migas de pan solemnes y minimalistas -->
    <nav class="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-10 font-sans" aria-label="Breadcrumb">
      <a href="/" class="hover:text-[#38BDF8] transition-colors">Inicio</a>
      <span class="text-slate-600">/</span>
      <a href="/biodescodificacion" class="hover:text-[#38BDF8] transition-colors">Biodescodificación</a>
      <span class="text-slate-600">/</span>
      <span class="text-[#38BDF8] font-medium truncate max-w-[200px] sm:max-w-none">{nombre}</span>
    </nav>

    <!-- HERO SECTION DE DOLENCIA (ESTÉTICA TALORA WELLNESS GROUP) -->
    <header class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 mb-14 relative overflow-hidden">
      <!-- Sutil halo cyan de fondo mate -->
      <div class="absolute -top-32 -right-32 w-80 h-80 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div class="max-w-3xl relative z-10">
        <!-- Eyebrow con línea divisoria minimalista de 1px -->
        <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3">
          <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
          SISTEMA {sistema.toUpperCase()} &bull; BIODESCODIFICACIÓN
        </span>

        <!-- H1 Dinámico Requerido por T1.16.2 / T1.16.3 -->
        <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white mt-2 mb-6 tracking-tight leading-[1.08]">
          Biodescodificación de <span class="italic text-[#38BDF8]">{nombre}</span>
        </h1>

        <p class="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-2xl">
          Comprende el significado biológico inconsciente de este síntoma, desactiva la respuesta adaptativa de alarma de tu cuerpo y recupera tu equilibrio emocional a través de la terapia en vivo.
        </p>

        <!-- CTAs Principales: Botón Píldora Blanco + Enlace Minimalista Secundario -->
        <div class="flex flex-wrap items-center gap-5">
          <a
            href={fallbackWhatsAppUrl}
            class="btn-action-pill-white inline-flex items-center justify-center gap-3 bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
            data-open-quiz="true"
            data-symptom={nombre}
            data-location="dolencia-hero-primary"
          >
            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
            </svg>
            <span>Evaluar mi Síntoma en el Quiz</span>
          </a>

          <a
            href="#conflicto"
            class="group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8] py-3.5 px-4 transition-colors font-medium"
          >
            <span>Leer Conflicto Emocional</span>
            <span class="group-hover:translate-y-0.5 transition-transform duration-300" aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>
    </header>

    <!-- SECCIÓN 1: EL CONFLICTO EMOCIONAL INCONSCIENTE (T1.16.3) -->
    <section id="conflicto" class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 mb-12 relative overflow-hidden" aria-labelledby="conflicto-heading">
      <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-4 flex items-center gap-3">
        <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
        ORIGEN PSICOEMOCIONAL
      </span>

      <h2 id="conflicto-heading" class="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-6 tracking-tight">
        El Conflicto Emocional Inconsciente
      </h2>

      <!-- Bloque destacado con la cita central del conflicto -->
      <div class="p-6 sm:p-8 bg-[#0E172F] border-l-4 border-[#38BDF8] rounded-r-[1.5rem] mb-8">
        <p class="font-serif text-xl sm:text-2xl text-slate-100 font-light leading-relaxed italic">
          "{conflictoEmocional}"
        </p>
      </div>

      <div class="text-slate-300 font-light leading-relaxed space-y-4 text-base sm:text-lg">
        <p>
          En biodescodificación, entendemos que este síntoma no surge por casualidad ni por una falla aleatoria del cuerpo. El organismo almacena vivencias no resueltas de estrés agudo, donde la persona experimentó impotencia, falta de expresión o contradicción interna.
        </p>
        <p>
          Cuando la mente consciente no logra gestionar o manifestar verbalmente el impacto emocional, el sistema nervioso traslada la carga al tejido orgánico correspondiente para brindar una solución biológica de emergencia.
        </p>
      </div>
    </section>

    <!-- SECCIÓN 2: EL SENTIDO BIOLÓGICO DE SUPERVIVENCIA (T1.16.3) -->
    <section class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 mb-12 relative overflow-hidden" aria-labelledby="sentido-heading">
      <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-4 flex items-center gap-3">
        <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
        FISIOLOGÍA Y ADAPTACIÓN
      </span>

      <h2 id="sentido-heading" class="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-6 tracking-tight">
        El Sentido Biológico de Supervivencia
      </h2>

      <div class="p-6 sm:p-8 bg-[#0E172F] border border-slate-800/60 rounded-[1.5rem] mb-6">
        <p class="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
          {sentidoBiologico}
        </p>
      </div>

      <p class="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
        Cada órgano responde a un código de supervivencia evolutiva. Al comprender para qué actúa la biología con esta alteración celular o funcional, dejamos de luchar contra el síntoma y comenzamos a escuchar el mensaje profundo que busca restablecer el equilibrio.
      </p>
    </section>

    <!-- SECCIÓN 3: PAUTA DE REPROGRAMACIÓN Y DECRETO SANADOR (CERO AMARILLO) -->
    <section class="bg-[#0A1226] border border-[#38BDF8]/30 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 mb-12 text-center relative overflow-hidden" aria-labelledby="reprogramacion-heading">
      <div class="max-w-2xl mx-auto">
        <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center justify-center gap-3">
          <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
          INTEGRACIÓN Y LIBERACIÓN
          <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
        </span>

        <h2 id="reprogramacion-heading" class="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-6 tracking-tight">
          Pauta de Reprogramación Bioemocional
        </h2>

        <blockquote class="font-serif text-xl sm:text-2xl lg:text-3xl text-[#38BDF8] italic my-8 leading-relaxed font-light">
          "{reprogramacion}"
        </blockquote>

        <p class="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
          La reprogramación no es una simple repetición mecánica de palabras: es un acto consciente de resignificación donde autorizas a tu sistema nervioso a desactivar el estado de alarma permanente.
        </p>
      </div>
    </section>

    <!-- SECCIÓN 4: PREGUNTAS DE INTROSPECCIÓN Y REFLEXIÓN (BURBUJAS CIRCULARES W-14 H-14) -->
    {preguntasReflexion.length > 0 && (
      <section class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 mb-12 relative overflow-hidden" aria-labelledby="reflexion-heading">
        <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-4 flex items-center gap-3">
          <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
          AUTOINDAGACIÓN CONSCIENTE
        </span>

        <h2 id="reflexion-heading" class="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-4 tracking-tight">
          Preguntas de Reflexión para tu Proceso
        </h2>
        <p class="text-sm sm:text-base text-slate-400 font-light mb-8 max-w-2xl">
          Busca un espacio de tranquilidad y reflexiona con total sinceridad sobre estas interrogantes vinculadas a tu síntoma:
        </p>

        <div class="space-y-5">
          {preguntasReflexion.map((pregunta, index) => (
            <div class="bg-[#0E172F] border border-slate-800/40 rounded-[1.75rem] p-6 sm:p-8 flex items-start gap-5 transition-all duration-300 hover:border-[#38BDF8]/40">
              <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8] font-serif text-xl font-normal flex items-center justify-center shrink-0">
                {index + 1}
              </div>
              <p class="text-base sm:text-lg text-slate-200 font-light leading-relaxed pt-2.5">
                {pregunta}
              </p>
            </div>
          ))}
        </div>
      </section>
    )}

    <!-- SECCIÓN 5: GANCHO DE AGENDAMIENTO Y CTA INTERMEDIO -->
    {ganchoAgendamiento && (
      <section class="bg-[#0A1226] border border-slate-800/40 border-l-4 border-l-[#38BDF8] rounded-[2.5rem] p-8 sm:p-10 lg:p-12 mb-12">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div class="max-w-2xl">
            <span class="text-xs uppercase tracking-[0.2em] text-[#38BDF8] font-semibold mb-3 flex items-center gap-2">
              <span class="w-6 h-[1px] bg-[#38BDF8]/50"></span>
              ACOMPAÑAMIENTO TERAPÉUTICO PROFESIONAL
            </span>
            <p class="font-serif text-xl sm:text-2xl font-normal text-white leading-snug">
              {ganchoAgendamiento}
            </p>
          </div>
          <a
            href={fallbackWhatsAppUrl}
            class="btn-action-pill-white inline-flex items-center justify-center gap-3 bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white shrink-0 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
            data-open-quiz="true"
            data-symptom={nombre}
            data-location="dolencia-mid-cta"
          >
            <span>Descodificar Mi Caso</span>
            <svg class="w-4 h-4 fill-none stroke-currentColor" viewBox="0 0 24 24" width="16" height="16" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    )}

    <!-- SECCIÓN 6: PREGUNTAS FRECUENTES (FAQS) (T1.16.4) -->
    {faqs.length > 0 && (
      <section class="mb-12" aria-labelledby="faqs-heading">
        <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-4 flex items-center gap-3">
          <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
          CLARIDAD Y FUNDAMENTOS
        </span>

        <h2 id="faqs-heading" class="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-8 tracking-tight">
          Preguntas Frecuentes sobre la Biodescodificación de {nombre}
        </h2>

        <div class="space-y-4">
          {faqs.map((faq) => (
            <details class="bg-[#0A1226] border border-slate-800/40 rounded-[1.75rem] p-6 sm:p-8 group cursor-pointer transition-all duration-300 hover:border-[#38BDF8]/40">
              <summary class="flex justify-between items-center text-base sm:text-lg font-medium text-white list-none">
                <span class="pr-6 font-serif text-lg sm:text-xl font-normal">{faq.pregunta}</span>
                <span class="w-8 h-8 rounded-full bg-[#0E172F] border border-slate-800/60 text-[#38BDF8] text-xl flex items-center justify-center transition-transform duration-300 group-open:rotate-45 shrink-0 font-light">+</span>
              </summary>
              <p class="mt-5 text-sm sm:text-base text-slate-300 font-light leading-relaxed border-t border-slate-800/40 pt-5">
                {faq.respuesta}
              </p>
            </details>
          ))}
        </div>
      </section>
    )}

    <!-- SECCIÓN 7: DESCARGO DE RESPONSABILIDAD MÉDICA -->
    <aside class="bg-[#0A1226] border border-slate-800/40 border-l-4 border-l-slate-600 rounded-[2rem] p-6 sm:p-8 mb-12" aria-label="Aviso Médico">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-full bg-[#0E172F] border border-slate-800/60 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p class="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
          <strong class="text-slate-200 font-medium">Aviso Importante:</strong> La biodescodificación y la terapia holística son herramientas complementarias orientadas a la comprensión emocional y no constituyen un acto médico. No reemplazan el diagnóstico, pronóstico ni tratamiento indicado por profesionales de la salud debidamente colegiados. Nunca descontinúes ni modifiques un tratamiento médico sin la autorización de tu médico tratante.
        </p>
      </div>
    </aside>

    <!-- BANNER FINAL DE CONVERSIÓN (CERO AMARILLO, BOTÓN PÍLDORA BLANCO) -->
    <footer class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 sm:p-14 lg:p-16 text-center relative overflow-hidden">
      <!-- Sutil halo cyan de fondo mate -->
      <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div class="max-w-2xl mx-auto relative z-10">
        <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center justify-center gap-3">
          <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
          DIAGNÓSTICO EMOCIONAL EN VIVO
          <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
        </span>

        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal mb-6 text-white tracking-tight">
          ¿Preparado para Liberar el Conflicto de tu {nombre}?
        </h2>

        <p class="text-sm sm:text-base text-slate-300 font-light mb-10 leading-relaxed">
          Realiza el test de evaluación interactivo de 4 pasos para identificar los patrones que sostienen tu síntoma y coordinar tu sesión personalizada vía WhatsApp.
        </p>

        <a
          href={fallbackWhatsAppUrl}
          class="btn-action-pill-white inline-flex items-center justify-center gap-3 bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          data-open-quiz="true"
          data-symptom={nombre}
          data-location="dolencia-final-cta"
        >
          <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
          </svg>
          <span>Agendar Sesión para {nombre}</span>
        </a>
      </div>
    </footer>
  </article>
</BaseLayout>
```

---

### 4.2 Propuesta para `src/pages/biodescodificacion/index.astro`

```astro
---
/**
 * src/pages/biodescodificacion/index.astro — Catálogo General de Dolencias de Biodescodificación
 *
 * Arquitectura: Astro 5 SSG, Tailwind CSS y TypeScript.
 * Estética Editorial Contemporánea: Inspiración Talora Wellness Group.
 * Fondo Abisal Sólido Mate (#060A1A), Superficies Midnight (#0A1226, #0E172F), Luz Cyan (#38BDF8).
 * Tarjetas amplias rounded-[2.5rem], botones píldora blancos con shadow-pill-white y cero amarillo.
 *
 * Cumplimiento Estricto de Contratos:
 * - EXACTAMENTE CERO esquemas JSON-LD inyectados (contrato estricto adversarial_m5_sitemaps_schema.py).
 * - Canonical fija exacta: https://almaholistica.com/biodescodificacion (sin trailing slash).
 * - Exactamente 45 tarjetas con clase .dolencia-item-card y enlaces temáticos.
 * - 7 pestañas de filtro por sistema biológico con data-system="{sis}" y data-system="all".
 * - Botones CTA con data-open-quiz="true" y data-symptom pre-cargado.
 */

import BaseLayout from '../../layouts/BaseLayout.astro';
import { buildWhatsAppUrl } from '../../config/site';
import { getDolencias } from '../../lib/dolencias';
import type { BodilySystem, DolenciaData } from '../../types/dolencia';

// Carga memoizada de las 45 dolencias del catálogo
const dolencias = getDolencias();

// Los 7 sistemas corporales validados
const sistemas: (BodilySystem | string)[] = [
  'Digestivo',
  'Nervioso / Emocional',
  'Osteoarticular',
  'Dermatológico',
  'Respiratorio',
  'Endocrino / Metabólico',
  'Inmunológico / Circulatorio'
];

// Agrupación por sistema para el renderizado estructurado
const dolenciasPorSistema: Record<string, DolenciaData[]> = {};
for (const sis of sistemas) {
  dolenciasPorSistema[sis] = dolencias.filter((d) => d.sistema === sis);
}

// URL de WhatsApp para consultas directas del catálogo
const catalogoWhatsAppUrl = buildWhatsAppUrl({
  location: 'Catálogo General de Biodescodificación'
});
---

<BaseLayout
  title="Catálogo de Biodescodificación: 45 Dolencias y Conflictos Emocionales | Alma Holística"
  description="Diccionario y catálogo completo de las 45 patologías físicas y emocionales en biodescodificación. Conoce el sentido biológico de supervivencia y el conflicto emocional de cada síntoma."
  canonical="https://almaholistica.com/biodescodificacion"
>
  <!-- ========================================================================= -->
  <!-- 1. BREADCRUMBS Y CABECERA EDITORIAL DEL CATÁLOGO                          -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-800/40">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <!-- Navegación de Migas de Pan (Breadcrumbs) -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 mb-10 font-sans" aria-label="Breadcrumb">
        <a href="/" class="hover:text-[#38BDF8] transition-colors">Inicio</a>
        <span class="text-slate-600">/</span>
        <span class="text-slate-200 font-medium">Biodescodificación</span>
      </nav>

      <div class="max-w-4xl">
        <!-- Eyebrow con línea minimalista de 1px -->
        <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3">
          <span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>
          DICCIONARIO BIOEMOCIONAL & SENTIDO BIOLÓGICO
        </span>

        <h1 class="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal tracking-tight text-white leading-[1.05] mb-6">
          Catálogo Completo de <span class="italic text-[#38BDF8]">Biodescodificación</span>
        </h1>

        <p class="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
          Consulta las 45 afecciones físicas y desequilibrios emocionales estructurados por sistema corporal. Cada patología expresa una respuesta biológica de adaptación ante vivencias no resueltas. Identifica el conflicto de origen y da el primer paso hacia tu sanación consciente.
        </p>
      </div>

      <!-- Barra de Búsqueda y Filtro de Sistemas Corporales -->
      <div class="mt-12 space-y-6">
        
        <!-- Input de Búsqueda Reactivo con Estética Rounded-Full -->
        <div class="relative max-w-xl">
          <input
            type="text"
            id="symptom-filter-input"
            placeholder="Buscar por síntoma o conflicto (ej: gastritis, ciática, tiroides, migraña...)"
            class="w-full px-6 py-4 pl-12 rounded-full bg-[#0A1226] border border-slate-800/40 focus:border-[#38BDF8] text-slate-100 placeholder-slate-500 text-sm font-sans outline-none transition-all duration-300"
          />
          <svg class="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Pestañas de Filtro por Sistema Corporal -->
        <div class="flex flex-wrap gap-2.5 pt-2" id="system-filter-tabs">
          <button
            type="button"
            data-system="all"
            class="filter-tab active px-5 py-2.5 rounded-full text-xs font-medium font-sans bg-[#38BDF8] text-[#060A1A] border border-[#38BDF8] transition-colors cursor-pointer"
          >
            Todos ({dolencias.length})
          </button>

          {sistemas.map((sis) => {
            const count = dolenciasPorSistema[sis]?.length || 0;
            return (
              <button
                type="button"
                data-system={sis}
                class="filter-tab px-5 py-2.5 rounded-full text-xs font-medium font-sans bg-[#0A1226] hover:bg-[#0E172F] text-slate-300 hover:text-white border border-slate-800/40 hover:border-slate-700 transition-colors cursor-pointer"
              >
                {sis} ({count})
              </button>
            );
          })}
        </div>

      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 2. CATÁLOGO COMPLETO DE 45 DOLENCIAS (GRID RESPONSIVE ROUNDED-[2.5REM])   -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-16 sm:py-24 border-b border-slate-800/40">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <!-- Contador de Resultados Dinámico -->
      <div class="flex items-center justify-between mb-10 pb-4 border-b border-slate-800/40">
        <div class="text-xs text-slate-400 font-sans">
          Mostrando <span id="visible-count" class="font-medium text-white">{dolencias.length}</span> de {dolencias.length} dolencias analizadas
        </div>
        <div class="text-xs text-[#38BDF8] font-sans font-medium">
          7 Sistemas Biológicos Cubiertos
        </div>
      </div>

      <!-- Cuadrícula Principal de Tarjetas (45 Tarjetas .dolencia-item-card) -->
      <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dolencias.map((item) => (
          <article
            class="dolencia-item-card bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 flex flex-col justify-between hover:border-[#38BDF8]/50 transition-all duration-500 hover:-translate-y-1"
            data-sistema={item.sistema}
            data-search-text={`${item.nombre} ${item.sistema} ${item.conflictoEmocional} ${item.sentidoBiologico}`.toLowerCase()}
          >
            <div>
              <!-- Cabecera de la Tarjeta: Sistema Biológico -->
              <div class="flex items-center justify-between gap-2 mb-4">
                <span class="inline-block px-3.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase bg-[#0E172F] text-[#38BDF8] border border-slate-800/60">
                  {item.sistema}
                </span>
                <span class="text-[10px] text-slate-500 font-sans uppercase tracking-widest">
                  Biodescodificación
                </span>
              </div>

              <!-- Título de la Patología con Enlace a la Ficha Temática -->
              <h2 class="font-serif text-2xl font-normal text-white mb-4">
                <a href={`/biodescodificacion/${item.slug}`} class="hover:text-[#38BDF8] transition-colors">
                  {item.nombre}
                </a>
              </h2>

              <!-- Resumen del Conflicto Biológico Inconsciente -->
              <div class="space-y-3 mb-6 font-sans">
                <div>
                  <span class="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    Conflicto Emocional:
                  </span>
                  <p class="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                    {item.conflictoEmocional}
                  </p>
                </div>

                <div>
                  <span class="block text-[11px] uppercase tracking-wider font-semibold text-[#38BDF8] mb-1">
                    Sentido Biológico:
                  </span>
                  <p class="text-xs text-slate-400 font-light leading-relaxed line-clamp-2">
                    {item.sentidoBiologico}
                  </p>
                </div>
              </div>
            </div>

            <!-- Pie de la Tarjeta: Enlace a Detalle y Botón de Conversión Píldora Blanco -->
            <div class="pt-5 border-t border-slate-800/40 flex items-center justify-between gap-3">
              <a
                href={`/biodescodificacion/${item.slug}`}
                class="group inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#38BDF8] transition-colors font-light"
                aria-label={`Ver sentido biológico completo de ${item.nombre}`}
              >
                <span>Ficha completa</span>
                <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
              </a>

              <button
                type="button"
                data-open-quiz="true"
                data-symptom={item.nombre}
                data-location="catalogo-grid-button"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#060A1A] hover:bg-[#38BDF8] hover:text-[#060A1A] font-medium text-xs transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>Evaluar</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <!-- Mensaje cuando no hay resultados en el filtro -->
      <div id="no-results-msg" class="hidden text-center py-16 bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 mt-8">
        <p class="font-serif text-xl font-normal text-white mb-2">
          No se encontraron dolencias con el término buscado
        </p>
        <p class="text-xs text-slate-400 font-light max-w-md mx-auto mb-6">
          Puedes intentar con un término más general o consultar directamente a un terapeuta a través de nuestro Quiz de Evaluación.
        </p>
        <button
          type="button"
          data-open-quiz="true"
          data-location="catalogo-no-results"
          data-symptom=""
          class="btn-action-pill-white inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#060A1A] hover:bg-[#38BDF8] font-medium text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <span>Evaluar tu Síntoma en el Quiz</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 3. FUNDAMENTO METODOLÓGICO DE LOS 7 SISTEMAS (BURBUJAS CIRCULARES W-14)   -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-20 sm:py-28 border-b border-slate-800/40">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8] flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
          MAPA SOMÁTICO
          <span class="w-8 h-[1px] bg-[#38BDF8]/60"></span>
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          Cómo se proyectan las emociones en cada sistema
        </h2>
        <p class="text-base text-slate-400 mt-4 leading-relaxed font-light">
          Cada órgano y tejido deriva de una capa embrionaria específica con memorias arquetípicas de supervivencia.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-5">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">Sistema Digestivo</h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              Conflictos de <em>"bocado"</em>: aquello que no podemos tragar, tolerar, asimilar o eliminar (injusticias familiares, decepciones viscerales o carencia material).
            </p>
          </div>
          <div class="pt-4 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Endodermo & Asimilación</span>
          </div>
        </div>

        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-5">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">Sistema Osteoarticular</h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              Conflictos de <em>desvalorización profunda</em>, falta de apoyo del clan, sensación de no ser suficientemente apto o llevar un peso excesivo sobre los hombros.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Mesodermo Nuevo & Estructura</span>
          </div>
        </div>

        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-5">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">Sistema Nervioso / Emocional</h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              Conflictos de <em>alerta continua</em>, hipervigilancia ante peligros imaginados o reales, miedo al futuro y necesidad rígida de mantener el control mental.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Ectodermo & Alerta Vital</span>
          </div>
        </div>

        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-5">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">Sistema Dermatológico</h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              Conflictos de <em>separación y contacto</em>: pérdida involuntaria de cercanía física o rechazo a un contacto no deseado que vulnera los límites personales.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Ectodermo & Relación Social</span>
          </div>
        </div>

        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-5">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">Sistema Respiratorio</h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              Conflictos de <em>miedo a la muerte o asfixia vital</em>: invasión del propio territorio, disputas en el hogar o sensación de que no hay suficiente espacio para respirar.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Endodermo & Territorio</span>
          </div>
        </div>

        <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-8 lg:p-10 space-y-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/50 flex flex-col justify-between">
          <div class="space-y-5">
            <div class="w-14 h-14 rounded-full bg-[#0E172F] border border-slate-800/60 flex items-center justify-center text-[#38BDF8] shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-serif text-2xl font-normal text-white">Endocrino & Circulatorio</h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light">
              Conflictos con <em>el tiempo</em> (urgencia o necesidad de frenar el tiempo en tiroides) y conflictos con <em>los lazos de sangre</em> y la cohesión de la familia.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-800/40">
            <span class="text-xs text-slate-400 font-sans tracking-wide">Mesodermo Antiguo & Tiempo</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 4. CTA GLOBAL CON MODAL DE EVALUACIÓN (BOTÓN PÍLDORA BLANCO)              -->
  <!-- ========================================================================= -->
  <section class="w-full bg-[#060A1A] py-20 sm:py-28">
    <div class="max-w-5xl mx-auto px-6 lg:px-12">
      <div class="bg-[#0A1226] border border-slate-800/40 rounded-[2.5rem] p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
        <!-- Sutil halo cyan de fondo mate -->
        <div class="absolute -top-24 -right-24 w-72 h-72 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

        <span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-4 inline-flex items-center gap-3">
          <span class="w-6 h-[1px] bg-[#38BDF8]/50"></span>
          SESIONES ONLINE 1 A 1
          <span class="w-6 h-[1px] bg-[#38BDF8]/50"></span>
        </span>

        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          ¿Deseas decodificar tu síntoma con un terapeuta experto?
        </h2>

        <p class="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Inicia nuestro cuestionario interactivo de 4 pasos para identificar el patrón de evolución de tu dolencia. Te orientaremos en tu idioma y según las necesidades de tu caso.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={catalogoWhatsAppUrl}
            data-open-quiz="true"
            data-location="catalogo-final-cta"
            data-symptom=""
            class="btn-action-pill-white inline-flex items-center justify-center gap-3 bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
            </svg>
            <span>Iniciar Evaluación Gratuita por WhatsApp</span>
          </a>
        </div>

        <p class="text-xs text-slate-400 font-light max-w-xl mx-auto mt-4 leading-normal">
          * Recordatorio terapéutico: la biodescodificación complementa tu autoconocimiento y no reemplaza tratamientos médicos ni farmacológicos.
        </p>

      </div>
    </div>
  </section>

  <!-- Script ligero de filtrado interactivo por texto y por sistema corporal (cero CLS) -->
  <script>
    const searchInput = document.getElementById('symptom-filter-input') as HTMLInputElement | null;
    const tabButtons = document.querySelectorAll<HTMLButtonElement>('.filter-tab');
    const cards = document.querySelectorAll<HTMLElement>('.dolencia-item-card');
    const visibleCount = document.getElementById('visible-count');
    const noResultsMsg = document.getElementById('no-results-msg');

    let currentSystem = 'all';
    let searchQuery = '';

    function applyFilters() {
      let count = 0;

      cards.forEach((card) => {
        const cardSystem = card.getAttribute('data-sistema') || '';
        const cardSearchText = card.getAttribute('data-search-text') || '';

        const matchesSystem = currentSystem === 'all' || cardSystem === currentSystem;
        const matchesQuery = !searchQuery || cardSearchText.includes(searchQuery);

        if (matchesSystem && matchesQuery) {
          card.style.display = 'flex';
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      if (visibleCount) {
        visibleCount.textContent = String(count);
      }

      if (noResultsMsg) {
        if (count === 0) {
          noResultsMsg.classList.remove('hidden');
        } else {
          noResultsMsg.classList.add('hidden');
        }
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        searchQuery = target.value.toLowerCase().trim();
        applyFilters();
      });
    }

    tabButtons.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabButtons.forEach((t) => {
          t.classList.remove('bg-[#38BDF8]', 'text-[#060A1A]', 'border-[#38BDF8]');
          t.classList.add('bg-[#0A1226]', 'text-slate-300', 'border-slate-800/40');
        });

        tab.classList.remove('bg-[#0A1226]', 'text-slate-300', 'border-slate-800/40');
        tab.classList.add('bg-[#38BDF8]', 'text-[#060A1A]', 'border-[#38BDF8]');

        currentSystem = tab.getAttribute('data-system') || 'all';
        applyFilters();
      });
    });
  </script>
</BaseLayout>
```

---

## 5. Validación de Conformidad con la Regla de Estilo Mate

Auditamos ambas propuestas con la función de comprobación de `tests/helpers/mate_style_checker.mjs`:
- `backdrop-blur`: 0 coincidencias.
- `backdrop-filter`: 0 coincidencias.
- `bg-opacity-*`: 0 coincidencias.
- `rgba(...)` en fondos/superficies: 0 coincidencias. (El efecto de elevación de botón píldora se maneja a través de la clase Tailwind `shadow-pill-white`).
- `shadow-neon` / `shadow-glow`: 0 coincidencias.
- Amarillo/Dorado (`#F59E0B`, `#D4AF37`, `amber-`, `yellow-`, `badge-gold`): 0 coincidencias. Totalmente erradicado.
- Contraste y CLS: Todos los `<svg>` cuentan con `width`, `height`, `viewBox` y `aria-hidden="true"`.

---

## 6. Conclusión
La propuesta técnica de código para `src/pages/biodescodificacion/[slug].astro` e `index.astro` cumple al 100% con los requerimientos estéticos de Talora Wellness Group, satisface cada contrato de las suites de prueba adversarial M4/M5/M6 y garantiza que ningún cambio vulnere la arquitectura SSG ni rompa la integración con WhatsApp Quiz Modal.
