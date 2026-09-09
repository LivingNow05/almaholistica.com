# Project: Alma Holística Programmatic SEO & Conversion Platform

## Architecture & Design Standard
- **Framework & Core**: Astro 5 (SSG Static Site Generation, `output: 'static'`) + Tailwind CSS + React 19 / TypeScript + GSAP (GreenSock).
- **Design Aesthetic**: Contemporary Minimalist Editorial (Inspiración Talora Wellness Group).
  - Fondo Abisal Principal: `#060A1A` (Lienzo sereno, mate, ultra-limpio).
  - Superficies y Tarjetas Editoriales: `#060A1A`, `#0A1226` y `#0E172F` con esquinas amplias `rounded-[2.5rem]`, padding generoso (`p-10 lg:p-14`) y bordes ultra-finos (`border border-slate-800/40`).
  - Luz de Acento Única: `#38BDF8` (Cyan suave para líneas de 1px, badges de estado y micro-detalles).
  - Botones de Acción de Alta Gama en Píldora: Blanco puro `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`.
  - Botones Secundarios: Enlace minimalista con flecha interactiva (`group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8]`).
  - Erradicación Total de Amarillo/Dorado: Cero rastros de `#F59E0B`, `#D4AF37` en CSS, componentes, páginas y SVGs vectoriales.
  - Tipografía Editorial Serena: Títulos principales en Serif elegante (*Cormorant Garamond* prioritario y *Cinzel* refinado) a gran escala (`text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05]`). Párrafos de lectura en sans-serif (*Inter* / *Plus Jakarta Sans*), peso light (`font-light`), interlineado aireado (`leading-relaxed`, `max-w-xl`).
  - Eyebrows con Línea Divisoria Minimalista: `<span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>TEXTO</span>`.
  - Animaciones GSAP Profesionales: Hero entrance escalonado (`power3.out`), indicador de scroll vertical de 1px (`w-[1px] h-16 bg-slate-800`), aura flotante orgánica en loop sinusoidal detrás de la mariposa, garantía estricta de `CLS = 0` y `prefers-reduced-motion`.
- **Data Architecture**:
  - `src/data/dataset_almaholistica_ciudades.csv`: 113 ciudades en 20 países (18 Latam + España + EE.UU. hispanos).
  - `src/data/dataset_biodescodificacion_dolencias.json`: 45 patologías completas con sentido biológico, conflicto emocional, reprogramación, preguntas de reflexión y FAQs.
- **Conversion Funnel**:
  - WhatsApp Quiz Modal interactivo (`src/components/react/WhatsAppQuizModal.tsx`) adaptado con contenedor `rounded-[2.5rem]`, botones píldora blancos y cero amarillo.
  - Enrutamiento dinámico a WhatsApp (`https://wa.me/573000000000?text=...`) con mensaje estructurado.
- **SEO & SitemapFast**:
  - Schema.org JSON-LD (361 esquemas en `src/lib/schema.ts`).
  - Script Python `scripts/generate_sitemap.py` para generación determinista de 160 URLs biunívocas con trailing slash en `sitemap-index.xml`, `sitemap-0.xml`, `sitemap.xml` y `robots.txt`.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Dataset Ciudades CSV | `dataset_almaholistica_ciudades.csv` con >100 ciudades en 20 países aprobados y 9 columnas | M1 (Preserved) | ORIGINAL_REQUEST §R1 |
| 2 | Dataset Dolencias JSON | `dataset_biodescodificacion_dolencias.json` con 45 patologías estructuradas | M1 (Preserved) | ORIGINAL_REQUEST §R1 |
| 3 | Core Redesign & GSAP Setup | Instalación de `gsap`, actualización de `tailwind.config.mjs`, `global.css`, `BaseLayout.astro` (Google Fonts Cormorant+Inter), SVGs vectoriales libres de oro y armonización de tests | MR1 | Redesign §R1, §R2, §R3 |
| 4 | Navbar & Footer Editorial | Rediseño de cabecera y pie con eliminación de amarillo/dorado, botón píldora blanco y estética de alta gama | MR2 | Redesign §R1, §R3 |
| 5 | WhatsApp Quiz Modal Redesign | Adaptación del modal interactivo a esquinas `rounded-[2.5rem]`, botón píldora blanco, cero amarillo, preservando contratos | MR2 | Redesign §R1, §R4 |
| 6 | Landing Page & GSAP Hero | `index.astro` con Hero entrance GSAP, scroll indicator de 1px, floating aura, tipografía a gran escala, tarjetas `rounded-[2.5rem]` y botones píldora | MR3 | Redesign §R1, §R2, §R3 |
| 7 | Rutas Dinámicas Ciudades | `src/pages/[slug].astro` (113 páginas) con estética depurada, cero amarillo, botones píldora blancos y tarjetas `rounded-[2.5rem]` | MR4 | Redesign §R1, §R4 |
| 8 | Rutas Dinámicas Dolencias | `src/pages/biodescodificacion/[slug].astro` (45 dolencias) y catálogo `index.astro` adaptados a la nueva estética | MR4 | Redesign §R1, §R4 |
| 9 | Suite E2E & Redesign Hardening | Verificación 100% de 160 páginas SSG, cero amarillo, botones píldora, GSAP, CLS = 0 y Auditoría Forense de Integridad | MR5 | Redesign Acceptance |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| MR1 | Redesign Core, Tokens, GSAP, SVGs & BaseLayout | `package.json` (gsap), `tailwind.config.mjs`, `global.css`, `BaseLayout.astro`, `public/*.svg`, y adaptación de helpers de tests | none | IN_PROGRESS |
| MR2 | Editorial Components & Quiz Modal | `Navbar.astro`, `Footer.astro`, `WhatsAppQuizModal.tsx` | MR1 | PLANNED |
| MR3 | Landing Page & GSAP Hero Animations | `src/pages/index.astro` con GSAP hero, floating aura, scroll indicator, tarjetas rounded-[2.5rem] y botones píldora | MR1, MR2 | PLANNED |
| MR4 | Dynamic SSG Routes (Cities & Dolencias) | `src/pages/[slug].astro`, `src/pages/biodescodificacion/[slug].astro`, `src/pages/biodescodificacion/index.astro` | MR1, MR2 | PLANNED |
| MR5 | Final Acceptance & Forensic Hardening | `tests/redesign_compliance.test.mjs`, build 160 páginas SSG, suites de pruebas completas y Auditoría Forense | MR1, MR2, MR3, MR4 | PLANNED |

---

## Interface Contracts

### M1 ↔ M4 (Datasets → Dynamic Routes)
- **`src/data/dataset_almaholistica_ciudades.csv`**:
  - Formato: CSV con cabeceras `Dominio,Categoría,URL Final (Slug),H1 Título,Meta Descripción,País,Moneda,Rango_Precio_Sesion,Historia_Local`.
  - Normalización: `URL Final (Slug)` debe estar en minúsculas, sin acentos ni barras iniciales/finales (ej: `bogota`, `madrid`, `miami`).
- **`src/data/dataset_biodescodificacion_dolencias.json`**:
  - Formato: Array de objetos JSON con tipado:
    ```typescript
    interface DolenciaData {
      slug: string;
      nombre: string;
      sistema: string;
      conflictoEmocional: string;
      sentidoBiologico: string;
      reprogramacion: string;
      preguntasReflexion: string[];
      faqs: { pregunta: string; respuesta: string }[];
      ganchoAgendamiento: string;
    }
    ```

### M2 ↔ M3 (Layout → Quiz Modal)
- **`src/config/site.ts`**:
  ```typescript
  export const SITE_CONFIG = {
    name: 'Alma Holística',
    url: 'https://almaholistica.com',
    whatsappNumber: '573000000000', // Provisional genérico
    defaultOgImage: '/logo-mariposa-con-fondo-completo.svg',
  };
  ```
- **Disparo del Modal**:
  - Atributos HTML para progressive enhancement: `data-open-quiz`, `data-symptom`, `data-city`.
  - Evento de ventana: `window.dispatchEvent(new CustomEvent('alma:open-quiz', { detail: { symptom, city } }))`.

### M4 ↔ M5 (Pages → Schemas & Sitemap)
- **`src/lib/schema.ts`**:
  - `buildMedicalWebPageSchema(dolencia: DolenciaData, canonicalUrl: string): object`
  - `buildFAQSchema(faqs: FAQItem[]): object | null`
  - `buildBreadcrumbSchema(items: { name: string; url: string }[]): object`
  - `buildLocalServiceSchema(city: CityData, canonicalUrl: string): object`
- **`scripts/generate_sitemap.py`**:
  - Salida obligatoria: `public/sitemap-index.xml`, `public/sitemap-0.xml`, `public/sitemap.xml`, `public/robots.txt` (y réplica en `dist/` si existe).

---

## Code Layout
```
almaholistica.com/
├── public/
│   ├── favicon.svg
│   ├── logo-mariposa-con-fondo-completo.svg
│   ├── robots.txt                    # Generado por scripts/generate_sitemap.py
│   ├── sitemap-index.xml             # Generado por scripts/generate_sitemap.py
│   ├── sitemap-0.xml                 # Generado por scripts/generate_sitemap.py
│   └── sitemap.xml                   # Generado por scripts/generate_sitemap.py
├── scripts/
│   └── generate_sitemap.py           # Generador SitemapFast
├── src/
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Navbar.astro
│   │   └── react/
│   │       └── WhatsAppQuizModal.tsx # React interactivo con client:load
│   ├── config/
│   │   └── site.ts                   # Configuración global y teléfono 573000000000
│   ├── data/
│   │   ├── dataset_almaholistica_ciudades.csv      # >100 ciudades, 20 países
│   │   └── dataset_biodescodificacion_dolencias.json # 45 dolencias completas
│   ├── layouts/
│   │   └── BaseLayout.astro          # Layout maestro sólido mate con JSON-LD
│   ├── lib/
│   │   ├── cities.ts                 # Lector singleton CSV con memoización
│   │   ├── dolencias.ts              # Lector singleton JSON
│   │   └── schema.ts                 # Funciones generadoras Schema.org JSON-LD
│   ├── pages/
│   │   ├── [slug].astro              # SSG de ciudades (113+ páginas)
│   │   ├── index.astro               # Home principal
│   │   └── biodescodificacion/
│   │       ├── [slug].astro          # SSG de dolencias (45 páginas)
│   │       └── index.astro           # Directorio completo de dolencias
│   └── types/
│       ├── city.ts                   # Interfaces TypeScript de ciudades
│       └── dolencia.ts               # Interfaces TypeScript de dolencias
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

---

## Write Ownership (Redesign Track)
- **Milestone MR1**: Posee exclusivamente `package.json`, `tailwind.config.mjs`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `public/logo-mariposa-con-fondo-completo.svg`, `public/favicon.svg`, y `tests/helpers/contracts.mjs`, `tests/helpers/mate_style_checker.mjs`, `tests/tier1_features.test.mjs`, `tests/adversarial_matte_cls_m2_1.test.mjs`, `tests/adversarial_assets_config_m2_2.py`.
- **Milestone MR2**: Posee exclusivamente `src/components/Navbar.astro`, `src/components/Footer.astro`, `src/components/react/WhatsAppQuizModal.tsx`.
- **Milestone MR3**: Posee exclusivamente `src/pages/index.astro`.
- **Milestone MR4**: Posee exclusivamente `src/pages/[slug].astro`, `src/pages/biodescodificacion/[slug].astro`, `src/pages/biodescodificacion/index.astro`.
- **Milestone MR5**: Posee exclusivamente `tests/redesign_compliance.test.mjs`, suites E2E adicionales de aceptación y reportes finales.
