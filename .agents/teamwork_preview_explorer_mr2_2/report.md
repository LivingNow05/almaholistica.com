# Reporte de Investigación: Refactorización Editorial de `src/components/Footer.astro` (Hito MR2)

- **Investigador:** `teamwork_preview_explorer_mr2_2`
- **Fecha:** 2026-09-06T21:54:00Z
- **Directorio de Metadatos:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr2_2/`
- **Componente Objetivo:** `/Users/anthony/Downloads/almaholistica.com/src/components/Footer.astro`
- **Modo:** Solo lectura (READ-ONLY)

---

## 1. Resumen Ejecutivo

El componente `src/components/Footer.astro` actúa como el ancla inferior global del sitio para las 160 páginas estáticas generadas por Astro. Actualmente se encuentra estructurado en 4 columnas principales, una sección obligatoria de descargo de responsabilidad médica y una barra inferior de derechos y enlaces legales.

Si bien su arquitectura estructural y enlaces a WhatsApp cumplen con los contratos de las pruebas automatizadas originales, el componente presenta **4 residuos explícitos del color oro/amarillo (`#D4AF37`)**, bordes rígidos heredados (`border-[#1E293B]`), un botón CTA con estética básica cuadrada (`rounded-md bg-[#38BDF8]`), y carece del tratamiento tipográfico editorial y sereno inspirado en el estándar de Talora Wellness Group requerido para el hito MR2.

Este reporte detalla cada punto crítico y entrega la especificación exacta de código línea por línea para que el agente ejecutor (`teamwork_preview_worker_mr2`) pueda implementar los cambios con cero regresión y 100% de cumplimiento en las suites de pruebas.

---

## 2. Auditoría de Colores Prohibidos (Erradicación Total de Amarillo/Dorado)

Se ejecutó una búsqueda estricta de patrones hexadecimales (`#D4AF37`, `#F59E0B`), nombres de colores (`gold`, `amber`, `yellow`, `orange`) y clases de Tailwind asociadas en `src/components/Footer.astro`.

### 2.1. Ocurrencias Detectadas

Se identificaron exactamente **4 apariciones de `#D4AF37`**:

| Línea Actual | Elemento Afectado | Código Actual | Problema / Razón de Reemplazo | Solución Propuesta para MR2 |
|---|---|---|---|---|
| **91** | Enlace Catálogo Dolencias (Columna 2) | `class="text-xs font-semibold text-[#D4AF37] hover:underline"` | Color oro prohibido; `hover:underline` visualmente anticuado | Reemplazar por enlace minimalista con micro-interacción: `class="group inline-flex items-center gap-1.5 text-xs font-medium text-[#38BDF8] hover:text-white transition-colors duration-300"` |
| **113** | Badge Cobertura Países (Columna 3) | `<span class="bg-[#0A1226] border border-[#1E293B] px-2 py-1 rounded text-[#D4AF37]">` | Color oro prohibido; borde rígido | Reemplazar por píldora sutil con acento cyan: `<span class="bg-[#0E172F] border border-[#1E3A5F] px-2.5 py-1 rounded-full text-[#38BDF8] font-medium">` |
| **136** | Estado Operativo (Columna 4) | `<div class="flex items-center gap-2 text-xs text-[#D4AF37] font-medium">` | Color oro prohibido en texto de estado | Reemplazar por texto en cyan armónico con dot esmeralda: `<div class="flex items-center gap-2 text-xs text-[#38BDF8] font-medium">` |
| **160** | Título Descargo Médico (Disclaimer) | `<h4 class="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">` | Color oro prohibido en cabecera legal | Reemplazar por eyebrow editorial cyan con línea sutil: `<h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-[#38BDF8] mb-2.5 flex items-center gap-2"><span class="w-4 h-[1px] bg-[#38BDF8]/50"></span>` |

### 2.2. Verificación de Otros Tonos
- Coincidencias de `#F59E0B`: **0**
- Coincidencias de `gold`: **0**
- Coincidencias de `amber`: **0**

---

## 3. Estructura de Columnas y Layout Responsivo

### 3.1. Contratos de Prueba Existentes
Las pruebas adversariales y funcionales auditan estrictamente la estructura del footer:
- **`tests/adversarial_matte_cls_m2_1.test.mjs` (Líneas 295-309)**:
  - Exige que el grid contenga textualmente la clase `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`.
  - Exige que la barra inferior contenga textualmente `flex flex-col sm:flex-row`.
- **`tests/adversarial_matte_cls_m2_1.test.mjs` (Líneas 243-247)**:
  - Exige que el logo de mariposa mantenga dimensiones explícitas `width="40"`, `height="40"` y la clase `shrink-0` en su contenedor.

### 3.2. Estructura de las 4 Columnas Principales
1. **Columna 1 — Marca y Misión**:
   - Contenedor de logo circular (`w-10 h-10 rounded-full bg-[#0A1226] border border-slate-800/60 flex items-center justify-center shrink-0`).
   - Nombre de marca en tipografía *Cormorant Garamond* (`font-serif text-2xl font-normal tracking-tight text-white`).
   - Párrafo de propósito en *Inter* ligero (`font-light text-sm text-slate-400 leading-relaxed`).
   - Enlace secundario con flecha animada hacia WhatsApp (`data-open-quiz="true"`, `data-location="footer-brand"`).
2. **Columna 2 — Áreas de Biodescodificación**:
   - Cabecera H3 con divisor refinado `border-b border-slate-800/40 pb-2.5`.
   - Iteración de `featuredSystems` mapeando las 4 categorías clave.
   - Enlace al catálogo general de 45 dolencias sin dorado.
3. **Columna 3 — Cobertura Internacional**:
   - Cabecera H3 en *Cormorant Garamond*.
   - Párrafo introductorio de zona horaria y moneda local.
   - Flex-wrap de badges en píldora (`rounded-full`) para los 12 países principales y el badge destacado de `+8 países más`.
   - Enlace al directorio de ciudades (`/#ciudades`).
4. **Columna 4 — Tarjeta de Evaluación y Conversión**:
   - Cabecera H3 de evaluación.
   - Tarjeta refinada con bordes suaves: `bg-[#0A1226] border border-slate-800/40 p-5 rounded-2xl space-y-4`.
   - Indicador de atención terapéutica activa.
   - Botón de acción principal en formato píldora blanco de alta gama (`rounded-full bg-white text-[#060A1A] ... shadow-pill-white`).

---

## 4. Auditoría Tipográfica: Fuentes Editoriales Serena

En el hito MR1 se configuraron las fuentes Google Fonts en `BaseLayout.astro` y las familias tipográficas en `tailwind.config.mjs`:
- `font-serif`: `'Cormorant Garamond', 'Cinzel', 'Playfair Display', serif`
- `font-sans`: `'Inter', 'Plus Jakarta Sans', system-ui, ...`

### Aplicación en `Footer.astro`:
- **Títulos y Secciones**:
  - Encabezados H3 (`Biodescodificación`, `Atención en 20 Países`, `Evaluación Inicial`) y marca (`Alma Holística`): deben usar `font-serif` con peso `font-normal` o `font-medium` y espaciado `tracking-wider` / `tracking-tight` para conferir la estética reposada y editorial.
- **Párrafos de Lectura y Textos Legales**:
  - Deben utilizar `font-sans font-light` (`Inter` a peso 300) con `leading-relaxed` y colores de texto `text-slate-400`, garantizando alta legibilidad sin fatiga visual.
- **Enlaces de Navegación**:
  - `font-sans text-sm font-light text-slate-400 hover:text-[#38BDF8] transition-colors duration-200`.

---

## 5. Fondo, Bordes y Reglas Anti-Glassmorphism

### 5.1. Paleta de Superficies y Bordes
- **Lienzo Maestro**: `bg-[#060A1A]` (Fondo Abisal sólido, 100% mate).
- **Superficie de Tarjetas**: `bg-[#0A1226]` (Midnight Navy sólido mate).
- **Divisores y Separadores**: `border-t border-slate-800/40` (ultra-fino, sutil, sin brillo ni opacidad en background).
- **Bordes de Tarjetas**: `border border-slate-800/40` con esquinas modernas `rounded-2xl`.

### 5.2. Hallazgo Crítico: Prevención de Falsos Positivos en `auditMateStyleContent`
Durante la investigación empírica en Node.js, se detectó una interacción crítica entre la regla estática de `tests/helpers/mate_style_checker.mjs`:

```javascript
{ pattern: /(?:bg-|background(?:-color)?\s*:\s*)[^;}"'>]*rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\s*\)/i, description: 'Colores RGBA transparentes prohibidos en superficies' }
```

**Problema Detectado:**
Si en el atributo `class="..."` del botón blanco se escribe la sombra arbitraria en línea:
`class="... bg-white text-[#060A1A] ... shadow-[0_8px_24px_rgba(255,255,255,0.08)] ..."`
La expresión regular busca desde `bg-` hasta el primer `rgba(...)` sin caracteres delimitadores de atributos. Debido a que `bg-white` y `shadow-[...rgba...]` comparten el mismo atributo `class`, la regla detona erróneamente un **falso positivo** indicando `"Colores RGBA transparentes prohibidos en superficies"`.

**Solución Validada:**
Usar la clase de Tailwind oficial generada en MR1:
`shadow-pill-white`
Al usar `shadow-pill-white`, no existe la cadena textual `rgba` dentro del archivo `.astro`, lo que hace que `auditMateStyleContent` devuelva `{ passed: true, violations: [] }` de forma 100% limpia.

---

## 6. Embudo de Conversión WhatsApp y Atributos de Intercepción

El componente `Footer.astro` incluye tres (3) puntos de conversión hacia WhatsApp, cada uno con contratos de tests inmutables:

1. **Enlace Secundario en Columna 1**:
   - `href={whatsappFooterUrl}`
   - `data-open-quiz="true"`
   - `data-location="footer-brand"`
   - `data-symptom=""`
2. **Botón Principal en Columna 4**:
   - `href={whatsappFooterUrl}`
   - `data-open-quiz="true"`
   - `data-location="footer-cta"`
   - `data-symptom=""`
   - Requiere estilo píldora blanco: `class="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white text-[#060A1A] font-medium text-xs tracking-wider uppercase hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white group"`
3. **Enlace "Contacto" en Barra Inferior**:
   - `href={whatsappFooterUrl}`
   - `data-open-quiz="true"`
   - `data-location="footer-bottom-contact"`
   - *Obligatorio por los tests `ADV-GEN3.12` y `GEN3-10`*.

---

## 7. Sección de Descargo de Responsabilidad Médica (T1.9.3 y ADV-M2.1.12)

El descargo de responsabilidad es un requerimiento legal y clínico estricto. El test `ADV-M2.1.12` verifica:
- Título que contenga: `"Descargo de Responsabilidad Médica"`
- Cuerpo que contenga: `"sustituyen"`, `"diagnóstico"` y `"médico"`.
- Test `T1.9.3` verifica: `"médic"`, `"terapia"`, `"holística"`.

### Refactorización Visual:
- Se preserva el texto legal de forma íntegra e inalterada.
- Se moderniza el contenedor a tarjeta `bg-[#0A1226] border border-slate-800/40 rounded-2xl p-6 lg:p-7`.
- El título se migra de `#D4AF37` a `#38BDF8` con un acento de línea minimalista (`<span class="w-4 h-[1px] bg-[#38BDF8]/50"></span>`).

---

## 8. Código Propuesto Línea por Línea para el Worker MR2

A continuación se detalla la propuesta completa de reemplazo para `src/components/Footer.astro`:

```astro
---
/**
 * Footer.astro — Pie de Página Global de Alma Holística
 *
 * Estilo: Minimalista Editorial de Alta Gama (Inspiración Talora Wellness Group).
 * Paleta Bi-Color: Fondo Abisal (#060A1A), Superficie Midnight Navy (#0A1226),
 * Luz Cyan (#38BDF8) y Slate (#94A3B8 / #64748B). Cero rastros de amarillo/dorado.
 * Tipografía: Cormorant Garamond (títulos y secciones) + Inter (lectura y enlaces).
 *
 * Requisitos y Contratos:
 * - Descargo de responsabilidad médica y terapéutica explícito (T1.9.3, ADV-M2.1.12).
 * - Enlaces institucionales, catálogo de biodescodificación y ciudades.
 * - Soporte para 20 países (18 Latam + España + EE.UU. hispanos).
 * - Botón CTA y enlaces con data-open-quiz="true" (ADV-M2.1.13, ADV-GEN3.12, GEN3-10).
 * - Contención de dimensiones de logo (width="40", height="40", shrink-0) (ADV-M2.1.8).
 * - Grilla responsive: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 (ADV-M2.1.11).
 * - Barra legal responsive: flex flex-col sm:flex-row (ADV-M2.1.11).
 */

import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';

const currentYear = new Date().getFullYear();
const whatsappFooterUrl = buildWhatsAppUrl({
  location: 'Pie de Página'
});

const featuredSystems = [
  { name: 'Sistema Digestivo (Gastritis, Colon)', slug: 'gastritis' },
  { name: 'Sistema Osteomuscular (Lumbalgia, Ciática)', slug: 'lumbalgia' },
  { name: 'Sistema Nervioso (Ansiedad, Migrañas)', slug: 'ansiedad' },
  { name: 'Sistema Tegumentario (Dermatitis, Psoriasis)', slug: 'dermatitis' }
];

const mainCountries = [
  'España', 'Estados Unidos', 'Colombia', 'México',
  'Argentina', 'Chile', 'Perú', 'Ecuador',
  'Uruguay', 'Costa Rica', 'Panamá', 'Rep. Dominicana'
];
---

<footer class="w-full bg-[#060A1A] border-t border-slate-800/40 text-slate-300 font-sans mt-auto">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      
      <!-- Columna 1: Marca y Propósito Holístico -->
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#0A1226] border border-slate-800/60 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="/logo-mariposa-con-fondo-completo.svg"
              alt="Alma Holística Logo"
              class="w-full h-full object-contain"
              width="40"
              height="40"
              loading="lazy"
            />
          </div>
          <span class="font-serif text-2xl font-normal tracking-tight text-white">
            Alma Holística
          </span>
        </div>
        <p class="text-sm font-light text-slate-400 leading-relaxed">
          Centro de biodescodificación y terapia holística online. Te acompañamos a decodificar el sentido biológico y el conflicto emocional inconsciente detrás de tus síntomas físicos para restaurar tu bienestar integral.
        </p>
        <div class="pt-2">
          <a
            href={whatsappFooterUrl}
            data-open-quiz="true"
            data-location="footer-brand"
            data-symptom=""
            class="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#38BDF8] hover:text-white transition-colors duration-300"
          >
            <span>Sesiones Online 1 a 1</span>
            <span class="transform group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <!-- Columna 2: Áreas de Biodescodificación -->
      <div>
        <h3 class="font-serif text-base font-normal tracking-wider uppercase text-white mb-5 pb-2.5 border-b border-slate-800/40">
          Biodescodificación
        </h3>
        <ul class="space-y-2.5 text-sm font-light">
          {featuredSystems.map((item) => (
            <li>
              <a
                href={`/biodescodificacion/${item.slug}`}
                class="text-slate-400 hover:text-[#38BDF8] transition-colors duration-200"
              >
                {item.name}
              </a>
            </li>
          ))}
          <li class="pt-2">
            <a
              href="/biodescodificacion"
              class="group inline-flex items-center gap-1.5 text-xs font-medium text-[#38BDF8] hover:text-white transition-colors duration-300"
            >
              <span>Ver las 45 Dolencias y Síntomas</span>
              <span class="transform group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">&rarr;</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Columna 3: Cobertura Internacional (20 Países) -->
      <div>
        <h3 class="font-serif text-base font-normal tracking-wider uppercase text-white mb-5 pb-2.5 border-b border-slate-800/40">
          Atención en 20 Países
        </h3>
        <p class="text-xs font-light text-slate-400 mb-3.5 leading-relaxed">
          Terapia en español con adaptación de zona horaria y moneda local:
        </p>
        <div class="flex flex-wrap gap-1.5 text-xs font-light text-slate-400">
          {mainCountries.map((country) => (
            <span class="bg-[#0A1226] border border-slate-800/60 px-2.5 py-1 rounded-full text-slate-300">
              {country}
            </span>
          ))}
          <span class="bg-[#0E172F] border border-[#1E3A5F] px-2.5 py-1 rounded-full text-[#38BDF8] font-medium">
            +8 países más
          </span>
        </div>
        <div class="mt-5">
          <a
            href="/#ciudades"
            class="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-[#38BDF8] transition-colors duration-300"
          >
            <span>Directorio de más de 100 ciudades</span>
            <span class="transform group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <!-- Columna 4: Evaluación y Agendamiento -->
      <div class="space-y-4">
        <h3 class="font-serif text-base font-normal tracking-wider uppercase text-white mb-5 pb-2.5 border-b border-slate-800/40">
          Evaluación Inicial
        </h3>
        <p class="text-sm font-light text-slate-400 leading-relaxed">
          Inicia tu proceso con una valoración personalizada para comprender qué mensaje intenta comunicarte tu cuerpo.
        </p>
        <div class="bg-[#0A1226] border border-slate-800/40 p-5 rounded-2xl space-y-4">
          <div class="flex items-center gap-2 text-xs text-[#38BDF8] font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Atención terapéutica activa</span>
          </div>
          <a
            href={whatsappFooterUrl}
            data-open-quiz="true"
            data-location="footer-cta"
            data-symptom=""
            class="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white text-[#060A1A] font-medium text-xs tracking-wider uppercase hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white group"
          >
            <svg class="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
            </svg>
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>

    </div>

    <!-- Sección de Descargo de Responsabilidad Médica Obligatoria (T1.9.3) -->
    <div class="border-t border-slate-800/40 pt-8 pb-6">
      <div class="bg-[#0A1226] border border-slate-800/40 rounded-2xl p-6 lg:p-7">
        <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-[#38BDF8] mb-2.5 flex items-center gap-2">
          <span class="w-4 h-[1px] bg-[#38BDF8]/50"></span>
          Descargo de Responsabilidad Médica y Terapéutica
        </h4>
        <p class="text-xs font-light text-slate-400 leading-relaxed">
          La biodescodificación y las sesiones de terapia holística ofrecidas por Alma Holística constituyen un proceso de autoconocimiento, gestión emocional y toma de consciencia personal. Bajo ninguna circunstancia sustituyen, modifican, interrumpen ni reemplazan el diagnóstico clínico, consulta, examen o tratamiento médico ni farmacológico prescrito por profesionales sanitarios colegiados. Ante cualquier dolencia, síntoma agudo o enfermedad, consulte de forma prioritaria con su médico o especialista de la salud.
        </p>
      </div>
    </div>

    <!-- Barra Inferior de Derechos y Créditos -->
    <div class="border-t border-slate-800/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-400">
      <p>
        &copy; {currentYear} {SITE_CONFIG.name} (<a href="/" class="hover:text-white transition-colors duration-200">{SITE_CONFIG.url.replace('https://', '')}</a>). Todos los derechos reservados.
      </p>
      <div class="flex items-center gap-6">
        <a href="/" class="hover:text-[#38BDF8] transition-colors duration-200">Inicio</a>
        <a href="/biodescodificacion" class="hover:text-[#38BDF8] transition-colors duration-200">Catálogo de Dolencias</a>
        <a href="/#ciudades" class="hover:text-[#38BDF8] transition-colors duration-200">Ciudades</a>
        <a href={whatsappFooterUrl} data-open-quiz="true" data-location="footer-bottom-contact" class="hover:text-[#38BDF8] transition-colors duration-200">Contacto</a>
      </div>
    </div>

  </div>
</footer>
```

---

## 9. Matriz de Verificación y Comandos

El Worker podrá certificar la refactorización ejecutando:

1. **Auditoría de Erradicación de Oro**:
   ```bash
   grep -rnIE "#D4AF37|#F59E0B|gold|amber" src/components/Footer.astro
   ```
   *Resultado esperado:* 0 coincidencias.

2. **Auditoría Estática de Estilo Mate**:
   ```bash
   node -e '
   const { auditMateStyleContent } = require("./tests/helpers/mate_style_checker.mjs");
   const fs = require("fs");
   const code = fs.readFileSync("src/components/Footer.astro", "utf8");
   const res = auditMateStyleContent(code, "src/components/Footer.astro");
   if (!res.passed) { console.error("FAILED:", res.violations); process.exit(1); }
   console.log("PASS: auditMateStyleContent limpio");
   '
   ```

3. **Verificación de Contratos E2E y Adversariales**:
   ```bash
   node --test tests/adversarial_matte_cls_m2_1.test.mjs
   node --test tests/adversarial_challenger_m4_gen3_2.test.mjs
   npm test
   ```

4. **Compilación Limpia SSG (160 páginas)**:
   ```bash
   npm run build
   ```
