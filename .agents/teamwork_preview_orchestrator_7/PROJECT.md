# Project: Alma Holística — Transformación Visual, Estructural y SEO

## Architecture
- **Framework**: Astro 4.x con Tailwind CSS v3 (modo clase para Dark/Light).
- **Modo de Operación**: SSG (Static Site Generation) con 160 rutas pre-renderizadas (1 index, 1 biodescodificacion/index, 113 ciudades, 45 dolencias).
- **Sistema de Estilos**: Sólido mate (`#060A1A`, `#0A1226`, `#0E172F` en dark; `#F8FAFC`, `#FFFFFF`, `#F1F5F9` en light). Erradicación total de amarillo/oro y prohibición estricta de gradientes deslumbrantes, neón o `backdrop-blur`.
- **Paleta Biológica Semántica**: 4 familias biológicas mapeadas desde los 7 sistemas biológicos:
  - Digestivo: Verde Salvia / Esmeralda Sereno
  - Osteoarticular: Arcilla / Terracota Cálido (sin colisión con tokens prohibidos de ámbar/amarillo)
  - Respiratorio: Azul Zafiro / Celeste Nórdico
  - Nervioso / Psicosomático: Amatista Suave / Lavanda Profundo
- **Activos Visuales**: Ilustraciones SVG autoportantes con paleta mate en `public/images/` con atributos explícitos `width`, `height`, `loading="lazy"`, cero CLS.
- **Estructura Tabular y GEO**: Tablas comparativas con HTML5 semántico (`table`, `thead`, `tbody`, `th`, `caption`) y microdatos `itemscope itemtype="https://schema.org/Table"` para citabilidad por motores IA (ChatGPT Search, Perplexity, Google AI Overviews) preservando 0 scripts en `dist/index.html` y 361 scripts JSON-LD en el portal.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | Paleta Cromática Biológica Semántica | Tokens CSS y clases para 4 familias biológicas (Digestivo, Osteoarticular, Respiratorio, Nervioso) en Light y Dark mode, WCAG AAA. | M1 | R1 / Survey 1 | VERIFIED |
| 2 | Acentos UI Biológicos | Aplicación en bordes superiores (`.bio-border-*`), badges de categoría y números de paso (`journey-step`). | M1 | R1 / Survey 1 | VERIFIED |
| 3 | Helper Semántico de Dolencias | Mapeo `getBiologicalTheme(sistema)` preservando los 7 sistemas biológicos requeridos por tests. | M1 | R1 / Survey 1 | VERIFIED |
| 4 | Ilustración 1 (Hero/Enfoque) | Eje mente-cuerpo y correlación neurovegetativa en `public/images/eje-mente-cuerpo-neurovegetativo.svg` (800x600). | M2 | R2 / Survey 2 | VERIFIED |
| 5 | Ilustración 2 (Metodología) | Los 3 pilares del choque biológico y respuesta adaptativa en `public/images/pilares-choque-biologico.svg` (800x500). | M2 | R2 / Survey 2 | VERIFIED |
| 6 | Ilustración 3 (Fases del Proceso) | Rango de etapas terapéuticas desde diagnóstico hasta autorregulación en `public/images/fases-proceso-terapeutico.svg` (900x450). | M2 | R2 / Survey 2 | VERIFIED |
| 7 | Tabla de Enfoque Clínico | Medicina Convencional vs Biodescodificación Integrativa (5 dimensiones) con HTML5 y Schema Table. | M3 | R3 / Survey 3 | VERIFIED |
| 8 | Tabla Matriz de Dolencias | Muestra representativa de patologías con capa embrionaria, emoción atrapada y sentido biológico. | M3 | R3 / Survey 3 | VERIFIED |
| 9 | Tabla de Etapas del Acompañamiento | 4 fases con sesiones estimadas, metodología aplicada y resultado terapéutico esperado. | M3 | R3 / Survey 3 | VERIFIED |
| 10 | Integración Visual y Alivio Textual | Inserción armónica de ilustraciones y tablas en `src/pages/index.astro` y páginas de dolencias sin romper contratos. | M3 | R2, R3, R4 | VERIFIED |
| 11 | Optimización SEO, GEO y Microdatos | Marcado semántico HTML5 (`caption`, `th scope`, `itemscope`) garantizando 0 scripts en index y 361 en todo el sitio. | M3 | R4 / Survey 3 | VERIFIED |
| 12 | Aseguramiento Técnico y Cero CLS | Cero CLS en imágenes, preservación de 160 rutas SSG, compilación 100% limpia sin advertencias. | M4 | R5 / Survey 3 | VERIFIED |
| 13 | Aprobación de Suites de Pruebas | 150 tests unitarios en `npm test` y 244 tests en `node --test tests/adversarial_*.test.mjs` pasando con 0 fallos. | M4 | R5 / Survey 3 | VERIFIED |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Biological Semantic Palette & CSS System | `src/styles/global.css`, `tailwind.config.mjs`, `src/lib/dolencias.ts` o helper de tema biológico. | None | DONE |
| M2 | Medical-Editorial Abstract Vector Illustrations | Creación de `public/images/` y los 3 archivos SVG vectoriales autoportantes con paleta mate. | None | DONE |
| M3 | Responsive Clinical & Matrix Tables, GEO & Page Integration | Componentes Astro de tablas, marcado semántico, integración de ilustraciones y tablas en `src/pages/index.astro`. | M1, M2 | DONE |
| M4 | Final E2E Verification, Zero CLS & Adversarial Hardening | Compilación SSG (`npm run build`), ejecución completa de `npm test` (150 tests) y suites adversariales (244 tests). | M3 | DONE |

---

## Interface Contracts
### M1 ↔ M3: Clases CSS de Paleta Biológica
- Clases de borde superior de 3px: `.bio-border-digestivo`, `.bio-border-osteoarticular`, `.bio-border-respiratorio`, `.bio-border-nervioso`.
- Badges con fondo sólido opaco y micro-dot: `.bio-badge-digestivo`, `.bio-badge-osteoarticular`, etc.
- Helper `getBiologicalTheme(sistema)` preservando los 7 sistemas de `getSistemas()`.

### M2 ↔ M3: Contrato de Activos de Imagen
- Archivos en disco en `public/images/`:
  - `/images/eje-mente-cuerpo-neurovegetativo.svg` (800x600)
  - `/images/pilares-choque-biologico.svg` (800x500)
  - `/images/fases-proceso-terapeutico.svg` (900x450)
- Inserción en HTML con `width` y `height` numéricos literales, `loading="lazy"`, `decoding="async"`.

### M3 ↔ M4: Contratos de Integración y Tests
- `dist/index.html`:
  - Exactamente 0 bloques `<script type="application/ld+json">`.
  - Exactamente 12 tarjetas `.home-dolencia-card` con slugs canónicos `migrana` y `sobrepeso-retencion`.
  - Al menos 100 enlaces `.city-search-item`.
  - Al menos 4 enlaces de WhatsApp hacia `573000000000`.
  - Microdatos Schema Table mediante atributos `itemscope itemtype="https://schema.org/Table"`.
- Total de esquemas JSON-LD en `dist/`: exactamente 361 (113 ciudades * 2 + 45 dolencias * 3).

---

## Code Layout
- `public/images/` — Nuevos activos vectoriales SVG de ilustraciones médicas (3 archivos).
- `src/styles/global.css` — Clases semánticas biológicas para light y dark mode.
- `src/lib/dolencias.ts` y `src/lib/bio_theme.ts` — Tipos y helpers de temas biológicos.
- `src/components/` — Componentes `ClinicalApproachTable.astro`, `BiologicalMatrixTable.astro`, `AccompanimentStagesTable.astro`.
- `src/pages/index.astro` — Integración de ilustraciones y tablas aliviando la densidad de texto.
- `tests/` — Suite de pruebas de regresión y adversariales inviolables (394 tests pasando al 100%).
