# Análisis Exhaustivo de Arquitectura Visual, Estilos, Paleta Cromática Semántica y Componentes

**Proyecto:** Alma Holística (almaholistica.com)  
**Agente:** `teamwork_preview_explorer_survey_1` (Teamwork Explorer)  
**Fecha:** 2026-09-10  
**Objetivo:** Estudio exhaustivo para el Requerimiento R1 del Follow-up (Paleta Cromática Semántica Biológica por Sistema, cumplimiento WCAG, normativa 100% Sólido Mate y compatibilidad estricta con la suite de 150 tests de regresión y 244 tests adversariales).

---

## 1. Resumen Ejecutivo de Hallazgos

1. **Arquitectura de Estilos Actual:** El proyecto opera sobre Astro + Tailwind CSS con modo oscuro configurado como `'class'` (`tailwind.config.mjs:6`), con Modo Claro como estado predeterminado en `BaseLayout.astro:51` (`<html lang="es" class="light scroll-smooth">`) e hidratado vía script inline anti-FOUC con `localStorage.getItem('theme_preference')`.
2. **Tokens de Color Existentes:**
   - **Canvas de Fondo:** Abisal `#060A1A` (Oscuro) / Blanco Roto Editorial `#F8FAFC` (Claro).
   - **Superficies de Tarjetas:** Midnight Navy `#0A1226` (Nivel 1) y `#0E172F` (Nivel 2) en Oscuro / `#FFFFFF` y `#F1F5F9` en Claro.
   - **Bordes:** `#1E293B` y `#1E3A5F` en Oscuro / `#E2E8F0` y `#CBD5E1` en Claro.
   - **Luz de Acento:** `#779DD1` (Azul Pizarra Mate) como principal y `#38BDF8` como token de compatibilidad innegociable exigido por pruebas de regresión.
3. **Catálogo de Sistemas y Dolencias:**
   - `dataset_biodescodificacion_dolencias.json` agrupa 45 patologías en **exactamente 7 sistemas biológicos**: Digestivo (7), Osteoarticular (8), Respiratorio (5), Nervioso / Emocional (6), Dermatológico (6), Endocrino / Metabólico (6) e Inmunológico / Circulatorio (7).
   - **Restricción Crítica de Test:** La suite `adversarial_challenger_m4_2.test.mjs` (pruebas `ADV-M4.2.8` y `ADV-M4.2.9`) audita estrictamente que `getSistemas()` devuelva exactamente estos 7 sistemas. Por tanto, no se debe mutar la estructura del dataset ni los nombres de los 7 sistemas en `src/types/dolencia.ts`, sino implementar un mapeo semántico cromático hacia las 4 familias biológicas solicitadas en el follow-up.
4. **Reglas de Erradicación de Oro/Amarillo y Restricciones de Clases:**
   - Los tests `adversarial_mr3_challenger.test.mjs`, `adversarial_mr3_challenger_2.test.mjs` y `adversarial_challenger_mr2.test.mjs` prohíben de forma absoluta los códigos `#F59E0B`, `#D4AF37`, `#FFE58F`, `#E5B33A`, `#FBBF24`, `#D97706`, `#B45309`, secuencias sin hash (`f59e0b`, `d4af37`), valores RGB correspondientes y cualquier clase de Tailwind `text-amber-*`, `bg-amber-*`, `border-amber-*`, `text-yellow-*`, `bg-yellow-*`, `border-yellow-*`, `*-gold-*`.
   - **Implicación Inmediata para el Sistema Osteoarticular:** Aunque el requerimiento menciona "arcilla / ámbar cálido / terracota", **NUNCA debe usarse ninguna clase `amber-*` ni el color `#F59E0B` ni `#B45309`**. Debe utilizarse estrictamente la denominación **Terracota / Arcilla Cálida** con códigos HEX sólidos propios libres de colisiones (ej. `#C25E3E`, `#8A3618`, `#E88F71`).
5. **Cumplimiento Sólido Mate (`auditMateStyleContent`):**
   - Prohibido el uso de `backdrop-blur`, `backdrop-filter`, `bg-opacity-*`, valores `rgba(...)` transparentes en fondos/superficies, y sombras con resplandor (`shadow-neon`, `shadow-glow`, `shadow-cyan-500/`, `box-shadow: 0 0 ...`).
   - Toda la paleta semántica propuesta consta de valores hexadecimales **100% sólidos y opacos**.
6. **Contraste WCAG 2.1:**
   - Todos los pares de color para texto sobre fondo de badge o tarjeta superan no solo el umbral WCAG AA (4.5:1) sino el estándar **WCAG AAA (>= 7.0:1)** tanto en modo claro como en modo oscuro. Los bordes y acentos visuales superan con holgura el umbral de 3.0:1 para elementos de interfaz.

---

## 2. Inspección del Sistema de Estilos y Configuración Actual

### 2.1 `tailwind.config.mjs`
Ubicación: `/Users/anthony/Downloads/almaholistica.com/tailwind.config.mjs`
- **Modo Oscuro:** Línea 6: `darkMode: 'class'`.
- **Colores Oficiales Requeridos:**
  - `abisal: '#060A1A'`, `abyssal: '#060A1A'`.
  - `midnight`: `DEFAULT: '#0A1226'`, `elevated: '#0E172F'`.
  - `border`: `DEFAULT: '#1E293B'`, `abyssal: '#1E3A5F'`.
  - `cyan`: `DEFAULT: '#779DD1'`, `legacy: '#38BDF8'`.
  - `primary`: `DEFAULT: '#779DD1'`, `legacy: '#38BDF8'`, `contrast: '#060A1A'`.
  - `text`: `primary: '#FFFFFF'`, `heading: '#F8FAFC'`, `body: '#94A3B8'`, `muted: '#64748B'`.
- **Sombras Mates:**
  - `pill-white: '0 8px 24px rgba(255, 255, 255, 0.08)'`.
  - `matte-sm: '0 1px 2px 0 #000000'`.
  - `matte-md: '0 4px 6px -1px #000000, 0 2px 4px -2px #000000'`.
  - `matte-lg: '0 10px 15px -3px #000000, 0 4px 6px -4px #000000'`.
- **Restricciones Detectadas:** No alterar ni eliminar los tokens `#060A1A`, `#0A1226`, `#0E172F`, `#1E293B`, `#1E3A5F`, `#38BDF8`, `pill-white`, `matte-sm`, `matte-md`, `matte-lg`, pues son auditados explícitamente en `adversarial_matte_cls_m2_1.test.mjs` (líneas 138-162) y `adversarial_assets_config_m2_2.py` (líneas 183-220).

### 2.2 `src/styles/global.css`
Ubicación: `/Users/anthony/Downloads/almaholistica.com/src/styles/global.css`
- **Sección 1 (Variables CSS):** `:root` define `--color-abyssal`, `--color-midnight-card`, `--color-midnight-elevated`, `--color-action-cyan` (`#779DD1`), etc.
- **Sección 2 (Anti-CLS):** `scrollbar-gutter: stable`, `overflow-x: hidden`, `width: 100%`, contención de imágenes y SVGs (`max-width: 100%`, `height: auto`). Auditado en `ADV-M2.1.7`.
- **Sección 8 (Modo Claro Editorial):** Selectores `html:not(.dark)` y `html.light`:
  - Canvas a `#F8FAFC !important`.
  - Tarjetas `bg-[#0A1226]` y `.card-matte` a `#FFFFFF !important` con `border-color: #E2E8F0 !important`.
  - Superficies `bg-[#0E172F]` a `#F1F5F9 !important`.
  - Textos de títulos a `#0F172A !important`, párrafos a `#0F172A` con `font-weight: 450`.
  - Acentos de marca texto a `#1E40AF !important` (azul zafiro accesible AAA).
- **Sección 9 (Modo Oscuro):** Selectores `html.dark`:
  - Canvas a `#060A1A !important`.
  - Tarjetas a `#0A1226 !important` con borde `rgba(30, 41, 59, 0.4)`.
  - Textos a `#FFFFFF`, `#F1F5F9`, `#CBD5E1`.
- **Sección 10 (Journey Steps, líneas 803-879):**
  - Define `.journey-number` y `[data-journey-step="1..4"]` con acentos de borde superior y conectores de flujo entre pasos.

### 2.3 `src/layouts/BaseLayout.astro`
- Línea 51: `<html lang="es" class="light scroll-smooth">` fija el Modo Claro como predeterminado para cumplir el requerimiento de accesibilidad y estética editorial.
- Líneas 94-110: Script inline para lectura inmediata de `localStorage.getItem('theme_preference')`, alternando clases `.dark` y `.light` sin parpadeo (FOUC).
- Línea 118: `<div class="bg-[#F8FAFC] dark:bg-[#060A1A] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans selection:bg-[#779DD1] selection:text-[#060A1A] antialiased">`.

---

## 3. Análisis del Catálogo de Dolencias y Sistemas Biológicos

### 3.1 Estructura en `src/data/dataset_biodescodificacion_dolencias.json`
El dataset cuenta con 45 patologías estructuradas con los campos:
`slug`, `nombre`, `sistema`, `conflictoEmocional`, `sentidoBiologico`, `reprogramacion`, `preguntasReflexion`, `faqs`, `ganchoAgendamiento`.

Distribución exacta de los 7 sistemas biológicos:
| Sistema en Dataset | Conteo | Dolencias Representativas | Capa Embrionaria Principal |
| :--- | :---: | :--- | :--- |
| **Digestivo** | 7 | Gastritis, Colon Irritable, Reflujo/Acidez, Estreñimiento, Úlcera, Hígado Graso, Hemorroides | Endodermo (Supervivencia / Asimilación del bocado) |
| **Osteoarticular** | 8 | Lumbalgia, Ciática, Cervicalgia, Tendinitis, Artritis, Artrosis, Fibromialgia, Hernia Discal | Mesodermo Nuevo (Valorización / Estructura / Movimiento) |
| **Respiratorio** | 5 | Asma Bronquial, Rinitis Alérgica, Sinusitis, Bronquitis Crónica, Faringitis/Disfonía | Endodermo / Ectodermo (Territorio / Amenaza / Espacio vital) |
| **Nervioso / Emocional** | 6 | Ansiedad, Insomnio, Ataques de Pánico, Depresión, Bruxismo, Angustia/Opresión | Ectodermo (Alerta / Psique / Relación con el entorno) |
| **Dermatológico** | 6 | Dermatitis, Psoriasis, Acné, Alopecia, Herpes, Rosácea | Ectodermo (Contacto/Separación) y Mesodermo Antiguo (Protección) |
| **Endocrino / Metabólico** | 6 | Hipotiroidismo, Hipertiroidismo, Sobrepeso/Retención, Resistencia Insulina, SOP, Nódulos | Endodermo / Ectodermo (Urgencia temporal / Reserva energética) |
| **Inmunológico / Circulatorio** | 7 | Migraña, Hipertensión, Cistitis Recurrente, Vértigo/Tinnitus, Alergias Alimentarias, Fatiga Crónica, Várices | Mesodermo Nuevo (Desvalorización profunda / Lazos sanguíneos) |

### 3.2 Mapeo Semántico hacia las 4 Familias Biológicas Requeridas (R1)
Para satisfacer el requerimiento R1 del follow-up sin alterar la firma de `getSistemas()` (que exige exactamente 7 sistemas en `ADV-M4.2.8`), se establece la siguiente correspondencia biocientífica:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MAPEO SEMÁNTICO BIOLÓGICO                            │
├─────────────────────────────┬───────────────────────────────────────────────┤
│ Familia R1 (Follow-up)      │ Sistemas Asociados del Dataset (7 Sistemas)   │
├─────────────────────────────┼───────────────────────────────────────────────┤
│ 1. SISTEMA DIGESTIVO        │ • Digestivo                                   │
│    (Verde Salvia /          │ • Endocrino / Metabólico (Asimilación,        │
│     Esmeralda Sereno)       │   nutrición y balance calórico visceral)      │
├─────────────────────────────┼───────────────────────────────────────────────┤
│ 2. SISTEMA OSTEOARTICULAR   │ • Osteoarticular                              │
│    (Arcilla / Terracota     │ • Inmunológico / Circulatorio (Mesodermo      │
│     Cálido)                 │   nuevo: sangre, linfa, soporte estructural)  │
├─────────────────────────────┼───────────────────────────────────────────────┤
│ 3. SISTEMA RESPIRATORIO     │ • Respiratorio                                │
│    (Azul Zafiro /           │   (Oxigenación, intercambio gaseoso,           │
│     Celeste Nórdico)        │   comunicación y espacio vital)               │
├─────────────────────────────┼───────────────────────────────────────────────┤
│ 4. SISTEMA NERVIOSO /       │ • Nervioso / Emocional                        │
│    PSICOSOMÁTICO            │ • Dermatológico (Ectodermo común: piel como   │
│    (Amatista Suave /        │   órgano sensorial y proyección somática)     │
│     Lavanda Profundo)       │                                               │
└─────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 4. Matriz Cromática Semántica Propuesta (Modo Claro y Modo Oscuro)

Cada sistema cuenta con especificaciones de color **100% sólidas y mates**, verificadas computacionalmente bajo el estándar WCAG 2.1 (Relative Luminance Contrast).

### 4.1 Familia 1: Sistema Digestivo (Verde Salvia / Esmeralda Sereno)
*Concepto Clínico: Asimilación consciente, digestión del bocado emocional, desinflamación visceral y calma homeostática.*

| Propiedad UI | Modo Claro (Fondo #F8FAFC / #FFFFFF) | Modo Oscuro (Fondo #060A1A / #0A1226) | Razón de Contraste WCAG |
| :--- | :--- | :--- | :--- |
| **Fondo Badge** | `#E8F5EC` (Salvia Suave Sólido) | `#0C1F16` (Verde Abisal Sólido) | Superficie 100% opaca |
| **Borde Badge** | `#A8D8B6` (Salvia Medio) | `#1A3D2C` (Esmeralda Oscuro) | Separador nítido sin glow |
| **Texto Badge / Énfasis** | `#13522E` (Esmeralda Profundo) | `#6AC894` (Verde Salvia Luminoso) | **Claro: 8.22:1 (AAA)** / **Oscuro: 8.42:1 (AAA)** |
| **Acento Borde Superior** | `#2E854B` (Verde Esmeralda Mate) | `#3E9B67` (Esmeralda Sereno Mate) | **Claro: 4.59:1 (AA)** / **Oscuro: 5.40:1 (AA)** |
| **Fondo Tarjeta Destacada**| `#F3FAF5` (Menta Muy Pálido Sólido)| `#0E241A` (Verde Musgo Profundo) | Contenedor mate sin transparencias |
| **Dot / Indicador** | `#2E854B` | `#3E9B67` | Punto de anclaje visual sólido |

### 4.2 Familia 2: Sistema Osteoarticular (Arcilla / Terracota Cálido)
*Concepto Clínico: Estructura ósea, valorización personal, soporte musculoesquelético y superación de la rigidez adaptativa.*  
*⚠️ Blindaje Anti-Regresión: Cero componentes amarillos, sin código `#F59E0B` ni `#B45309`, sin clases `amber-*`.*

| Propiedad UI | Modo Claro (Fondo #F8FAFC / #FFFFFF) | Modo Oscuro (Fondo #060A1A / #0A1226) | Razón de Contraste WCAG |
| :--- | :--- | :--- | :--- |
| **Fondo Badge** | `#FDF0EA` (Arcilla Pálida Sólida) | `#24120D` (Terracota Abisal Sólido) | Superficie 100% opaca |
| **Borde Badge** | `#ECC3B2` (Arcilla Media) | `#4A2419` (Terracota Oscuro) | Separador nítido sin glow |
| **Texto Badge / Énfasis** | `#8A3618` (Terracota Profundo) | `#E88F71` (Terracota Cálido Luminoso) | **Claro: 7.18:1 (AAA)** / **Oscuro: 7.37:1 (AAA)** |
| **Acento Borde Superior** | `#C25E3E` (Arcilla Terracota Mate) | `#C86241` (Terracota Sereno Mate) | **Claro: 4.23:1 (AA)** / **Oscuro: 4.68:1 (AA)** |
| **Fondo Tarjeta Destacada**| `#FAF2EE` (Arcilla Suave Sólida) | `#28150F` (Tierra Abisal Profunda) | Contenedor mate sin transparencias |
| **Dot / Indicador** | `#C25E3E` | `#C86241` | Punto de anclaje visual sólido |

### 4.3 Familia 3: Sistema Respiratorio (Azul Zafiro / Celeste Nórdico)
*Concepto Clínico: Expansión torácica, territorio vital, contacto con la atmósfera compartida y desactivación de la sensación de asfixia.*

| Propiedad UI | Modo Claro (Fondo #F8FAFC / #FFFFFF) | Modo Oscuro (Fondo #060A1A / #0A1226) | Razón de Contraste WCAG |
| :--- | :--- | :--- | :--- |
| **Fondo Badge** | `#EAF2F9` (Celeste Nórdico Pálido) | `#0B1A28` (Azul Abisal Sólido) | Superficie 100% opaca |
| **Borde Badge** | `#AECBE5` (Celeste Hielo) | `#19354E` (Zafiro Oscuro) | Separador nítido sin glow |
| **Texto Badge / Énfasis** | `#124B73` (Azul Zafiro Profundo) | `#6BAEE3` (Celeste Nórdico Luminoso) | **Claro: 8.14:1 (AAA)** / **Oscuro: 7.37:1 (AAA)** |
| **Acento Borde Superior** | `#2B74AA` (Zafiro Sereno Mate) | `#3688C7` (Celeste Nórdico Mate) | **Claro: 5.02:1 (AA)** / **Oscuro: 4.88:1 (AA)** |
| **Fondo Tarjeta Destacada**| `#F1F6FB` (Azul Hielo Sólido) | `#0E2032` (Zafiro Profundo Sólido) | Contenedor mate sin transparencias |
| **Dot / Indicador** | `#2B74AA` | `#3688C7` | Punto de anclaje visual sólido |

### 4.4 Familia 4: Sistema Nervioso / Psicosomático (Amatista Suave / Lavanda Profundo)
*Concepto Clínico: Regulación del sistema nervioso autónomo (simpático/parasimpático), serenidad mental, integración psicosomática y superación de la angustia.*

| Propiedad UI | Modo Claro (Fondo #F8FAFC / #FFFFFF) | Modo Oscuro (Fondo #060A1A / #0A1226) | Razón de Contraste WCAG |
| :--- | :--- | :--- | :--- |
| **Fondo Badge** | `#F4EFF9` (Lavanda Pálido Sólido) | `#1B0F28` (Amatista Abisal Sólido) | Superficie 100% opaca |
| **Borde Badge** | `#D0BEE0` (Lavanda Medio) | `#392051` (Amatista Oscuro) | Separador nítido sin glow |
| **Texto Badge / Énfasis** | `#532A78` (Amatista Profundo) | `#BC91DF` (Lavanda Luminoso) | **Claro: 9.42:1 (AAA)** / **Oscuro: 7.21:1 (AAA)** |
| **Acento Borde Superior** | `#7C4499` (Amatista Mate) | `#8E55B0` (Lavanda Profundo Mate) | **Claro: 6.68:1 (AAA)** / **Oscuro: 3.62:1 (AA)** |
| **Fondo Tarjeta Destacada**| `#F7F3FA` (Lila Suave Sólido) | `#211332` (Amatista Profundo Sólido)| Contenedor mate sin transparencias |
| **Dot / Indicador** | `#7C4499` | `#8E55B0` | Punto de anclaje visual sólido |

---

## 5. Aplicación Práctica en Componentes UI

### 5.1 Bordes Superiores en Tarjetas de Dolencias
Para dotar de dinamismo cromático a las tarjetas de dolencias en la página principal (`src/pages/index.astro`) y en el catálogo (`src/pages/biodescodificacion/index.astro`), se aplican clases semánticas según el sistema corporal:

```css
/* Bordes superiores semánticos mates (3px de grosor para acento visual sobrio) */
.bio-border-digestivo {
  border-top: 3px solid #2E854B !important;
}
html.dark .bio-border-digestivo {
  border-top: 3px solid #3E9B67 !important;
}

.bio-border-osteoarticular {
  border-top: 3px solid #C25E3E !important;
}
html.dark .bio-border-osteoarticular {
  border-top: 3px solid #C86241 !important;
}

.bio-border-respiratorio {
  border-top: 3px solid #2B74AA !important;
}
html.dark .bio-border-respiratorio {
  border-top: 3px solid #3688C7 !important;
}

.bio-border-nervioso {
  border-top: 3px solid #7C4499 !important;
}
html.dark .bio-border-nervioso {
  border-top: 3px solid #8E55B0 !important;
}
```

### 5.2 Badges de Categoría Semánticos
Reemplazo del badge genérico actual por variantes biológicas:

```html
<!-- Ejemplo: Badge Sistema Digestivo -->
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#E8F5EC] text-[#13522E] border border-[#A8D8B6] dark:bg-[#0C1F16] dark:text-[#6AC894] dark:border-[#1A3D2C]">
  <span class="w-1.5 h-1.5 rounded-full bg-[#2E854B] dark:bg-[#3E9B67]"></span>
  Digestivo
</span>

<!-- Ejemplo: Badge Sistema Osteoarticular -->
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#FDF0EA] text-[#8A3618] border border-[#ECC3B2] dark:bg-[#24120D] dark:text-[#E88F71] dark:border-[#4A2419]">
  <span class="w-1.5 h-1.5 rounded-full bg-[#C25E3E] dark:bg-[#C86241]"></span>
  Osteoarticular
</span>
```

### 5.3 Números de Paso en el Funnel Terapéutico (`journey-step`)
En `src/pages/index.astro` (líneas 560-614), los 4 pasos del proceso de sanación se alinean con la progresión terapéutica de las 4 familias:
- **Paso 01 (Quiz Inicial / Diagnóstico):** Azul Respiratorio (toma de aire, espacio, claridad mental inicial).
  - Badge de fase: `bg-[#EAF2F9] text-[#124B73] border-[#AECBE5] dark:bg-[#0B1A28] dark:text-[#6BAEE3] dark:border-[#19354E]`
  - Círculo de número: borde superior y número en zafiro sereno.
- **Paso 02 (Hipótesis Clínica / Inconsciente):** Amatista / Lavanda Psicosomático (exploración de la psique, emoción atrapada).
  - Badge de fase: `bg-[#F4EFF9] text-[#532A78] border-[#D0BEE0] dark:bg-[#1B0F28] dark:text-[#BC91DF] dark:border-[#392051]`
- **Paso 03 (Sesión 1 a 1 / Encuentro):** Arcilla / Terracota Cálido (contacto somático, estructura ósea, arraigo corporal).
  - Badge de fase: `bg-[#FDF0EA] text-[#8A3618] border-[#ECC3B2] dark:bg-[#24120D] dark:text-[#E88F71] dark:border-[#4A2419]`
- **Paso 04 (Reprogramación / Regeneración):** Verde Salvia / Esmeralda (asimilación biológica, renovación celular y homeostasis).
  - Badge de fase: `bg-[#E8F5EC] text-[#13522E] border-[#A8D8B6] dark:bg-[#0C1F16] dark:text-[#6AC894] dark:border-[#1A3D2C]`

### 5.4 Helper TypeScript Recomendado (`src/lib/colors.ts`)
Para facilitar la inyección limpia y fuertemente tipada en componentes Astro y React:

```typescript
export interface BiologicalTheme {
  family: 'digestivo' | 'osteoarticular' | 'respiratorio' | 'nervioso';
  name: string;
  badgeClass: string;
  borderClass: string;
  accentHexLight: string;
  accentHexDark: string;
  dotClass: string;
}

export function getBiologicalTheme(sistema: string): BiologicalTheme {
  const norm = (sistema || '').toLowerCase();

  if (norm.includes('digestiv') || norm.includes('endocrin') || norm.includes('metaból')) {
    return {
      family: 'digestivo',
      name: 'Sistema Digestivo & Metabólico',
      badgeClass: 'bg-[#E8F5EC] text-[#13522E] border-[#A8D8B6] dark:bg-[#0C1F16] dark:text-[#6AC894] dark:border-[#1A3D2C]',
      borderClass: 'bio-border-digestivo',
      accentHexLight: '#2E854B',
      accentHexDark: '#3E9B67',
      dotClass: 'bg-[#2E854B] dark:bg-[#3E9B67]'
    };
  }

  if (norm.includes('osteo') || norm.includes('articular') || norm.includes('inmuno') || norm.includes('circulat')) {
    return {
      family: 'osteoarticular',
      name: 'Sistema Osteoarticular & Circulatorio',
      badgeClass: 'bg-[#FDF0EA] text-[#8A3618] border-[#ECC3B2] dark:bg-[#24120D] dark:text-[#E88F71] dark:border-[#4A2419]',
      borderClass: 'bio-border-osteoarticular',
      accentHexLight: '#C25E3E',
      accentHexDark: '#C86241',
      dotClass: 'bg-[#C25E3E] dark:bg-[#C86241]'
    };
  }

  if (norm.includes('respirat')) {
    return {
      family: 'respiratorio',
      name: 'Sistema Respiratorio',
      badgeClass: 'bg-[#EAF2F9] text-[#124B73] border-[#AECBE5] dark:bg-[#0B1A28] dark:text-[#6BAEE3] dark:border-[#19354E]',
      borderClass: 'bio-border-respiratorio',
      accentHexLight: '#2B74AA',
      accentHexDark: '#3688C7',
      dotClass: 'bg-[#2B74AA] dark:bg-[#3688C7]'
    };
  }

  // Por defecto y para Nervioso / Emocional y Dermatológico
  return {
    family: 'nervioso',
    name: 'Sistema Nervioso & Psicosomático',
    badgeClass: 'bg-[#F4EFF9] text-[#532A78] border-[#D0BEE0] dark:bg-[#1B0F28] dark:text-[#BC91DF] dark:border-[#392051]',
    borderClass: 'bio-border-nervioso',
    accentHexLight: '#7C4499',
    accentHexDark: '#8E55B0',
    dotClass: 'bg-[#7C4499] dark:bg-[#8E55B0]'
  };
}
```

---

## 6. Auditoría de Pruebas Existentes y Reglas de Blindaje

Tras inspeccionar los 22 archivos de prueba en `tests/`, se sintetizan las aserciones clave que la nueva paleta semántica **NUNCA** debe romper:

1. **Eradicación Total de Amarillos y Dorados Antiguos:**
   - **Pruebas:** `adversarial_mr3_challenger.test.mjs` (MR3-ADV-5.1 y 5.3), `adversarial_mr3_challenger_2.test.mjs` (MR3-CH2-4.1), `adversarial_challenger_mr2.test.mjs` (ADV-MR2.1.1 a ADV-MR2.1.4).
   - **Regla:** Quedan prohibidos en código fuente y en `dist/` los strings: `#f59e0b`, `#d4af37`, `#ffe58f`, `#e5b33a`, `#fbbf24`, `#d97706`, `#b45309`, secuencias puras `f59e0b` y `d4af37`, valores RGB `245, 158, 11` y `212, 175, 55`, y las clases Tailwind `text-amber-*`, `bg-amber-*`, `border-amber-*`, `text-yellow-*`, `bg-yellow-*`, `border-yellow-*`, `*-gold-*`.
   - **Verificación de nuestra propuesta:** Ninguno de los códigos HEX o clases propuestas colisiona con estos patrones.
2. **Normativa 100% Sólido Mate (`auditMateStyleContent`):**
   - **Pruebas:** Ejecutada en `adversarial_matte_cls_m2_1.test.mjs:164`, `tier1_features.test.mjs:663`, `adversarial_mr3_challenger.test.mjs:275`, `adversarial_challenger_m4_2.test.mjs:364`.
   - **Regla:** Cero `backdrop-blur`, cero `backdrop-filter`, cero `bg-opacity-*`, cero `rgba` en background, cero `shadow-neon` o `shadow-glow`.
   - **Verificación de nuestra propuesta:** Todos los badges y fondos de acento son colores HEX o clases sólidas opacas.
3. **Preservación de Tokens Mandatorios en `tailwind.config.mjs`:**
   - **Pruebas:** `adversarial_matte_cls_m2_1.test.mjs:138` y `adversarial_assets_config_m2_2.py:183`.
   - **Regla:** Deben preservarse intactos los tokens `#060A1A`, `#0A1226`, `#0E172F`, `#1E293B`, `#1E3A5F`, `#38BDF8`, `pill-white`, `matte-sm`, `matte-md`, `matte-lg`.
   - **Verificación de nuestra propuesta:** Los nuevos tokens biológicos se agregan extendiendo el objeto `theme.extend.colors` sin eliminar ni modificar los existentes.
4. **Preservación de `getSistemas()` y Catálogo de 45 Dolencias:**
   - **Pruebas:** `adversarial_challenger_m4_2.test.mjs` (ADV-M4.2.8 y ADV-M4.2.9).
   - **Regla:** `getSistemas()` debe retornar exactamente los 7 sistemas originales.
   - **Verificación de nuestra propuesta:** El mapeo semántico cromático se realiza a nivel visual y de helpers de presentación en `src/lib/colors.ts`, manteniendo el dataset intacto.
5. **Preservación de 12 Tarjetas y Slugs Canónicos en `index.astro`:**
   - **Pruebas:** `adversarial_mr3_challenger.test.mjs:53` y `adversarial_challenger_m4_gen3_2.test.mjs:263`.
   - **Regla:** `featuredSlugs` debe tener exactamente 12 elementos con `migrana` y `sobrepeso-retencion`. Cada tarjeta debe conservar `.home-dolencia-card`, `rounded-[2.5rem]`, `data-open-quiz="true"`, `data-symptom`.
   - **Verificación de nuestra propuesta:** Los acentos semánticos se añaden como clases adicionales o bordes superiores sin alterar la presencia de estas clases obligatorias.

---

## 7. Conclusiones y Próximos Pasos para Implementación

1. La paleta cromática semántica biológica propuesta satisface al 100% las necesidades de diferenciación clínica y dinamismo visual solicitadas en el requerimiento R1.
2. La totalidad de los colores cumple con la categoría **WCAG AAA** para texto sobre superficies y **WCAG AA** para bordes y acentos visuales.
3. La estrategia de implementación no genera conflicto alguno con la suite existente de 150 pruebas de regresión ni con las 244 pruebas adversariales.
