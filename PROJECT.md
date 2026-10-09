# Project: Alma Holística - Optimización Móvil, Embudo y Accesibilidad

## Architecture
- **Framework**: Astro 5 (SSG) + React 19 (Islands) + Tailwind CSS v3.
- **Data Flow**: Datos hiperlocales en `src/data/` (113 ciudades, 20 países, 45 dolencias).
- **Core Pages**: `src/pages/[slug].astro` (landing de ciudades hiperlocales y hubs de países), `src/pages/biodescodificacion/[slug].astro` (fichas de dolencias).
- **Global Layout & Styles**: `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `tailwind.config.mjs`.
- **Conversion System**: `WhatsAppQuizModal.tsx` (React island con interceptación global de `[data-open-quiz]`), `FloatingWhatsApp.astro`, y nueva `StickyMobileBar.astro`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Saneamiento Tipográfico Serif/Mono | Eliminar `.font-mono, .font-serif { font-family: var(--font-sans) !important; }` en `global.css` y reconfigurar `serif` en `tailwind.config.mjs`. | M1 | ORIGINAL_REQUEST § R3 |
| F2 | Corrección de Contrastes WCAG AAA | Ajustar `#64748B` a `#94A3B8` en modo oscuro y placeholders a `#475569` en modo claro; eliminar selectores agresivos que rompen contraste. | M1 | ORIGINAL_REQUEST § R3 |
| F3 | Backdrop Translúcido WhatsAppQuizModal | Sustituir `bg-[#060A1A]` al 100% por `bg-slate-950/80 backdrop-blur-sm`. | M1 | ORIGINAL_REQUEST § R4 |
| F4 | Ergonomía Móvil y Grid Modal (360-414px) | Añadir `max-h-[85dvh]` con scroll interno, grid adaptativo para botones/chips en pantallas angostas. | M1 | ORIGINAL_REQUEST § R4 |
| F5 | Barra de Acción Inferior Fija (Sticky Bar) | Implementar `StickyMobileBar.astro` fija en móvil (`md:hidden`) con WhatsApp directo y botón Evaluación. Ocultar `FloatingWhatsApp` en móvil (`hidden md:flex`). | M1 | ORIGINAL_REQUEST § R4 |
| F6 | Hero Móvil Empático | Reestructurar Hero de `[slug].astro`, titular empático `text-2xl sm:text-4xl`, subtítulo centrado en síntoma, CTA elevado en primer pliegue. | M2 | ORIGINAL_REQUEST § R1 |
| F7 | Eliminación de Precios en Pliegue Inicial | Retirar tarjeta monetaria rígida del Hero; tarifas preservadas en `#precios-heading` y en el Paso 5 del modal. | M2 | ORIGINAL_REQUEST § R1 |
| F8 | Selector Rápido de Dolencias Móvil | Micro-chips horizontales con `data-open-quiz="true"`, `data-symptom` y `data-city` para precargar directamente el Paso 2 del modal. | M2 | ORIGINAL_REQUEST § R1 |
| F9 | Sustitución de Jerga RAG & GEO | Reemplazar "DICTAMEN CLÍNICO // SÍNTESIS RAG & GEO EN CDMX" por "ATENCIÓN CLÍNICA Y METODOLOGÍA EN CDMX" (`font-sans font-bold`). | M2 | ORIGINAL_REQUEST § R2 |
| F10 | Compactación Semántica de Contenido | Implementar acordeones `<details>` y `<summary>` en Contexto Urbano, Comparativa Online vs Presencial y Marco Científico, manteniendo 100% texto en DOM. | M2 | ORIGINAL_REQUEST § R2 |
| F11 | Blindaje Técnico y Cero Regresiones | Garantizar 361 esquemas JSON-LD intactos, 100% tests pasando (`npm test`) y compilación limpia de 184 páginas SSG (`npm run build`). | M3 | ORIGINAL_REQUEST § R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Estilos Globales, Tipografía, Modal y Sticky Bar | R3 y R4: `src/styles/global.css`, `tailwind.config.mjs`, `WhatsAppQuizModal.tsx`, `StickyMobileBar.astro`, `FloatingWhatsApp.astro`, `BaseLayout.astro`. | None | DONE |
| M2 | Hero Móvil, Embudo, Dolencias y Compactación Semántica | R1 y R2: `src/pages/[slug].astro` (Hero empático, chips, remoción precio prematuro, sustitución RAG/GEO, `<details>/<summary>`). | M1 | DONE |
| M3 | Verificación Integral, Blindaje E2E y Auditoría Forense | R5: Validación integral de toda la suite de pruebas, compilación 184 páginas, 361 esquemas JSON-LD, revisión y auditoría forense. | M1, M2 | DONE |

## Interface Contracts
### `StickyMobileBar.astro` ↔ `BaseLayout.astro`
- Componente autónomo importado en `src/layouts/BaseLayout.astro`.
- Renderiza una barra fija en la parte inferior visible exclusivamente en pantallas móviles (`md:hidden fixed bottom-0 inset-x-0 z-40`).
- Dispara el modal mediante atributos `data-open-quiz="true"` respetados globalmente por `WhatsAppQuizModal.tsx`.
- `<main>` en `BaseLayout.astro` adopta `pb-20 md:pb-0` para no superponer contenido.

### `WhatsAppQuizModal.tsx` ↔ `[slug].astro` & Micro-Chips
- Atributos esperados por el listener global de `WhatsAppQuizModal.tsx`:
  - `data-open-quiz="true"`
  - `data-symptom="NombreDolencia"`
  - `data-city="NombreCiudad"`
- Al activarse un micro-chip con estos atributos, el modal salta automáticamente al **Paso 2** con síntoma y ciudad precargados.

### `<details>` / `<summary>` ↔ SEO / Motores IA / DOM
- Elementos HTML nativos sin JavaScript externo para asegurar renderizado estático en `dist/`.
- Clases de Tailwind: `group`, `group-open:rotate-180`, superficies sólidas `#0A1226`, `#0E172F`, `#060A1A`.
- 100% del texto de `{historiaLocal}`, tabla comparativa y `{autoridadCientifica}` se mantiene en el DOM.

## Code Layout
- `src/styles/global.css`: Estilos globales, variables CSS, contrastes claro/oscuro. (DONE en M1)
- `tailwind.config.mjs`: Configuración de familias tipográficas, breakpoints, colores. (DONE en M1)
- `src/components/react/WhatsAppQuizModal.tsx`: Modal reactivo de evaluación. (DONE en M1)
- `src/components/StickyMobileBar.astro`: Nueva barra fija móvil. (DONE en M1)
- `src/components/FloatingWhatsApp.astro`: Botón flotante desktop. (DONE en M1)
- `src/layouts/BaseLayout.astro`: Layout base HTML. (DONE en M1)
- `src/pages/[slug].astro`: Páginas de ciudad y hubs. (DONE en M2)
