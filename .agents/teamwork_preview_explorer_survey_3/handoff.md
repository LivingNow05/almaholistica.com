# Informe de Arquitectura Técnica y Patrones de Integración — Alma Holística

**Autor**: `teamwork_preview_explorer_survey_3`  
**Destinatario**: `teamwork_preview_orchestrator_1` (id: `f77d1a94-c021-4fed-9bbe-9a2cc5b5d8bc`)  
**Fecha**: 2026-09-06T01:36:00Z  
**Directorio de trabajo**: `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_3/`  
**Tipo de Handoff**: Hard (Completado con validación y recomendaciones exhaustivas)

---

## 1. Observation

A partir de la inspección directa del entorno, de los requerimientos de `ORIGINAL_REQUEST.md`, del proyecto de referencia `Bulldog Fluffy` y de los reportes de los agentes de relevamiento `teamwork_preview_spec_miner_survey_1` y `teamwork_preview_explorer_survey_2`, se observaron los siguientes hechos técnicos comprobados:

### 1.1 Entorno de Ejecución y Sistema Base
- Comando ejecutado: `node -v && npm -v && python3 --version`
- Resultado exacto:
  - **Node.js**: `v22.21.0`
  - **npm**: `10.9.4`
  - **Python**: `3.14.6`
- Estado del repositorio: Proyecto en blanco (Greenfield), sin archivos previos de configuración (`package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`).
- Activos presentes en la raíz (`/Users/anthony/Downloads/almaholistica.com/`):
  - `ORIGINAL_REQUEST.md` (4,932 bytes): Especificación mandatoria.
  - `dataset_fluffy_stories.csv` (108,238 bytes, 101 filas): Estructura de referencia de 100 ciudades en 18 países con columnas `['Dominio', 'Categoría', 'URL Final (Slug)', 'H1 Título', 'Meta Descripción', 'Moneda', 'País', 'Aeropuerto', 'Historia Local']`.
  - `logo-mariposa-con-fondo-completo.svg` (1,609,918 bytes = 1.54 MB): SVG vectorial animado con 137 líneas, filtros `<filter id="glow-star">`, gradientes radiales y animaciones CSS `.rings-layer` (`spinRings 16s`) y `.wing-left` / `.wing-right` (`flapRight 1.4s`) en `:hover`.

### 1.2 Requisitos Mandatorios de ORIGINAL_REQUEST.md
- **R1 Datasets**:
  - `dataset_almaholistica_ciudades.csv`: >100 ciudades en 20 países (18 Latam + 6 ciudades España [Madrid, Barcelona, Valencia, Sevilla, Málaga, Bilbao] + 7 ciudades EE.UU. hispanos [Miami, Los Ángeles, Houston, Nueva York, Chicago, Orlando, San Antonio] = mín. 113 registros).
    - Columnas: `Dominio, Categoría, URL Final (Slug), H1 Título, Meta Descripción, País, Moneda, Rango_Precio_Sesion, Historia_Local`.
  - `dataset_biodescodificacion_dolencias.json`: 45 patologías físicas y emocionales validadas (Gastritis, Ansiedad, Hipotiroidismo, Sobrepeso, Lumbalgia, Ciática, Dermatitis, Colon Irritable, Migrañas, Fibromialgia, etc.).
- **R2 Arquitectura y Estilo Visual**:
  - Astro + Tailwind CSS + React/TSX.
  - Estilo sólido mate estricto: Fondo Abisal `#060A1A`, Tarjetas/Superficies `#0A1226` y `#0E172F`, Bordes `#1E293B` / `#1E3A5F`, Botón Cyan `#38BDF8`, Acentos Oro `#D4AF37`. Prohibición absoluta de glassmorphism, transparencias y resplandores neón.
  - Rutas dinámicas: `src/pages/[slug].astro` y `src/pages/biodescodificacion/[slug].astro`.
- **R3 WhatsApp Quiz Funnel**:
  - Interceptación de botones de WhatsApp hacia un Quiz Modal reactivo de 3-4 pasos (síntoma, duración, intentos previos, ubicación) con diagnóstico preliminar y derivación estructurada a WhatsApp.
  - Número provisional centralizado `573000000000` en `src/config/site.ts`.
- **R4 SEO y SitemapFast**:
  - Metadatos OG, Twitter Cards, canonical tags.
  - Schemas JSON-LD: `MedicalWebPage`, `FAQPage`, `BreadcrumbList`.
  - Script `scripts/generate_sitemap.py` para generar `sitemap-index.xml`, `sitemap-0.xml` y `robots.txt`.

### 1.3 Arquitectura del Proyecto de Referencia (`Bulldog Fluffy`)
- En `Bulldog Fluffy/src/pages/[slug].astro`:
  - `getStaticPaths()` leía el CSV usando `fs.readFileSync()` con un analizador de cadenas por caracteres en el propio archivo.
  - Generaba las rutas retornando `{ params: { slug }, props: { item } }`.
  - Inyectaba scripts JSON-LD en el layout base iterando un array `allSchema`.
  - Tenía un script inline en `public/scripts/quiz-modal.js` interceptando eventos `click` en elementos `a[href*="wa.me"]`.
- En `sitemapfast/SKILL.md`:
  - Se define la jerarquía de 2 niveles: `sitemap-index.xml` -> `sitemap-0.xml`.
  - Auto-descubrimiento en `<head>`: `<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap-index.xml" />`.
  - Declaración en `robots.txt` con doble puntero.

---

## 2. Logic Chain

A partir de las observaciones, se deduce la siguiente cadena lógica estructurada para los 5 ejes requeridos:

### 2.1 Carga de Datasets Estáticos en `getStaticPaths` (CSV y JSON)
1. **Mecanismo de Evaluación en Astro SSG**:
   - `getStaticPaths()` se ejecuta en tiempo de compilación (Node.js build-time) antes de que se renderice cualquier plantilla HTML.
   - Si se procesa o analiza el CSV de 113 filas de forma repetida dentro del cuerpo de la página en lugar de en `getStaticPaths`, el costo pasa de $O(N)$ a $O(N^2)$, degradando la velocidad de compilación.
2. **Abstracción de Lectura Centralizada (`src/lib/data/`)**:
   - Para el CSV (`dataset_almaholistica_ciudades.csv`):
     - La librería estándar `csv-parse/sync` es la solución más rápida, robusta y tolerante a campos entrecomillados con comas y saltos de línea (como `Historia_Local`).
     - Al crear un módulo singleton `src/lib/cities.ts` con memoización en memoria (`cachedCities`), el archivo CSV se lee del disco y se analiza una sola vez durante todo el ciclo de vida del build.
   - Para el JSON (`dataset_biodescodificacion_dolencias.json`):
     - Astro (soportado por Vite) permite `import dolenciasData from '../data/dataset_biodescodificacion_dolencias.json';` de manera nativa con tipado e inferencia directa, sin necesidad de librerías externas.
3. **Propagación Eficiente mediante `props`**:
   - En lugar de pasar únicamente `params: { slug }` y forzar a la plantilla a buscar el elemento en el array, se debe retornar el objeto completo deserializado en `props: { city }` y `props: { dolencia }`. De este modo, Astro entrega los datos pre-resueltos a la plantilla sin búsquedas adicionales en tiempo de renderizado.

### 2.2 Integración de Componentes Interactivos React (WhatsApp Quiz Modal)
1. **Selección de Directiva de Cliente (`client:load` vs `client:visible` vs `client:idle`)**:
   - Un componente modal con superposición (`position: fixed; inset: 0; z-index: 9999`) inicia invisible (`display: none` o `opacity: 0; pointer-events: none`).
   - Si se usa `client:visible`, el componente depende de un `IntersectionObserver`. Como el contenedor del modal está oculto o fuera del flujo estándar, **`client:visible` nunca se hidratará o fallará si el usuario hace clic en el CTA del Hero antes de desplazarse hasta el final de la página**.
   - Si se usa `client:idle`, existe una ventana de latencia (1-3 segundos) donde un usuario móvil que presione el botón flotante de WhatsApp sufrirá un "clic muerto" o una redirección no calificada.
   - Por tanto, la directiva correcta y obligatoria es **`client:load`** montado en el layout principal (`BaseLayout.astro`).
2. **Patrón de Interceptación Global (Dual Trigger)**:
   - Para mantener el resto de la web como HTML estático puro (islas de Astro sin hidratación innecesaria en botones y cabeceras), el modal React debe registrar en su `useEffect` un escuchador de clics delegado a nivel `document`:
     ```typescript
     document.addEventListener('click', (e) => {
       const trigger = (e.target as HTMLElement)?.closest('a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]');
       if (trigger) {
         e.preventDefault();
         openQuiz({
           symptom: trigger.getAttribute('data-symptom'),
           city: trigger.getAttribute('data-city')
         });
       }
     });
     ```
   - Además, debe exponer `window.openAlmaQuiz(opts)` y escuchar el evento personalizado `window.addEventListener('alma:open-quiz', ...)`.
   - **Degradación Elegante (Progressive Enhancement)**: Los botones estáticos conservan un enlace real `href="https://wa.me/573000000000?text=..."`. Si JavaScript estuviera deshabilitado en el cliente, el enlace a WhatsApp sigue funcionando y nunca se pierde un lead.

### 2.3 Mecanismo de Generación de SitemapFast (`scripts/generate_sitemap.py`)
1. **Población Dinámica de URLs**:
   - El script en Python debe ejecutarse con la biblioteca estándar (`csv`, `json`, `os`, `datetime`, `timezone`).
   - Lee:
     - `src/data/dataset_almaholistica_ciudades.csv` (113 URLs bajo `https://almaholistica.com/{slug}/`).
     - `src/data/dataset_biodescodificacion_dolencias.json` (45 URLs bajo `https://almaholistica.com/biodescodificacion/{slug}/`).
     - Páginas estáticas núcleo: `/` (Home, prioridad 1.0) y `/biodescodificacion/` (Directorio, prioridad 0.9).
2. **Sincronización Dual (`public/` y `dist/`)**:
   - Si el script escribe en `public/`, Astro copiará automáticamente los archivos a `dist/` en `npm run build`.
   - Si el script se ejecuta como post-build (`astro build && python3 scripts/generate_sitemap.py`), escribirá directamente tanto en `public/` (para el servidor de desarrollo `npm run dev`) como en `dist/` (para producción).
   - Estructura generada:
     - `sitemap-index.xml` (índice maestro).
     - `sitemap-0.xml` (catálogo con ~160 URLs, `<priority>`, `<changefreq>` y `<lastmod>`).
     - `sitemap.xml` (enlace espejo para compatibilidad con rastreadores antiguos).
     - `robots.txt` (con directivas dobles hacia `sitemap-index.xml` y `sitemap.xml`).

### 2.4 Utilidades para Generación de Schema.org JSON-LD
1. **Requisitos de Datos Estructurados en Salud y Bienestar**:
   - Google exige precisión en sitios con contenido terapéutico o de salud.
   - Esquemas necesarios:
     - `MedicalWebPage`: en rutas `/biodescodificacion/[slug]` con entidad `about: { @type: "MedicalCondition" }` y `possibleTreatment: { @type: "MedicalTherapy" }`.
     - `HealthAndBeautyBusiness` o `LocalBusiness`: en rutas `/[slug]` indicando `areaServed` (Ciudad, País), `priceRange` y `currenciesAccepted`.
     - `FAQPage`: en todas las páginas temáticas para generar accordions enriquecidos en las SERPs de Google.
     - `BreadcrumbList`: jerarquía de navegación completa para mostrar migas de pan legibles en Google.
2. **Arquitectura de Funciones Puras en `src/lib/schema.ts`**:
   - Crear generadores tipados que reciban el objeto `city` o `dolencia` y retornen objetos planos JSON-LD listos para serializar con `JSON.stringify()`.
   - En `BaseLayout.astro`, recibir `schemas?: object[]` y renderizarlos mediante:
     ```astro
     {schemas.map((s) => (
       <script type="application/ld+json" set:html={JSON.stringify(s)} />
     ))}
     ```

### 2.5 Estrategia de Build y Rendimiento SSG
1. **Mitigación de Sobrecarga de Memoria en Astro 5 / Node 22**:
   - Generar ~160 páginas estáticas es un volumen ligero para Astro, pero se vuelve problemático si se cometen los siguientes errores detectados:
     - **Error potencial 1: Embeber el SVG de 1.54 MB en cada página**. Si `logo-mariposa-con-fondo-completo.svg` se inyectara en línea (`inline`) en las 160 páginas, el tamaño total del build aumentaría en **~246 MB de HTML redundante**. La solución óptima es colocar el archivo en `public/logo-mariposa-con-fondo-completo.svg` y consumirlo con la etiqueta `<img src="/logo-mariposa-con-fondo-completo.svg" ... />` o `<object data="/logo-mariposa-con-fondo-completo.svg" type="image/svg+xml" ... />` para preservar la animación hover interactiva. De esta forma, el navegador descarga el archivo **una sola vez** y lo guarda en caché HTTP.
     - **Error potencial 2: Fugas de memoria por re-análisis de archivos**. La memoización de datasets garantiza que Node mantenga un único array de datos en memoria heap (< 50 MB).
2. **Garantía de Estilo Sólido y Cero CLS**:
   - Diseñar las tarjetas con dimensiones y estilos fijos sin `backdrop-filter: blur()`, lo que acelera el tiempo de renderizado de la GPU y elimina el repintado costoso.

---

## 3. Caveats

1. **Interacción del SVG Animado en Safari/Firefox**: El archivo `logo-mariposa-con-fondo-completo.svg` contiene animaciones CSS en `:hover` dentro del SVG. Cuando un SVG se carga mediante `<img>`, algunos navegadores restringen la ejecución de animaciones por seguridad. Si se desea mantener la animación de hover interactiva en el Hero de la Home, se recomienda renderizarlo inline únicamente en `index.astro` (en una sola página el impacto de 1.5 MB es aceptable) o usar `<object type="image/svg+xml" data="...">`. En el resto de las 160 páginas programáticas (navbar y footer), se debe utilizar `<img>` para no inflar el HTML.
2. **Disponibilidad de Librería `csv-parse`**: Al estar el repositorio en blanco, el paquete `csv-parse` debe incluirse obligatoriamente en las dependencias de `package.json` (`npm i csv-parse`).
3. **Normalización Estricta de Slugs**: En `dataset_almaholistica_ciudades.csv`, los nombres de ciudades con tildes o caracteres especiales (ej: "Bogotá", "Medellín") deben contar con slugs normalizados en minúsculas y sin acentos (`bogota`, `medellin`) para evitar divergencias entre URLs del sitemap y el sistema de archivos del servidor.

---

## 4. Conclusion & Plan de Implementación

La arquitectura recomendada para el proyecto **Alma Holística** es sólida, ultra-rápida y de fácil mantenimiento. A continuación se presentan las especificaciones concretas de diseño y código para cada uno de los 5 componentes:

### 4.1 Código de Carga de Datasets Estáticos

#### `src/lib/cities.ts`
```typescript
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

export interface CityData {
  dominio: string;
  categoria: string;
  slug: string;
  h1: string;
  metaDescripcion: string;
  pais: string;
  moneda: string;
  rangoPrecio: string;
  historiaLocal: string;
}

let cachedCities: CityData[] | null = null;

export function getCities(): CityData[] {
  if (cachedCities) return cachedCities;

  const csvPath = path.resolve(process.cwd(), 'src/data/dataset_almaholistica_ciudades.csv');
  const rawText = fs.readFileSync(csvPath, 'utf-8');
  
  const records = parse(rawText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  cachedCities = records.map((r) => ({
    dominio: r['Dominio'] || 'https://almaholistica.com',
    categoria: r['Categoría'] || 'terapia-online',
    slug: (r['URL Final (Slug)'] || '').trim().toLowerCase().replace(/^\//, '').replace(/\/$/, ''),
    h1: r['H1 Título'] || '',
    metaDescripcion: r['Meta Descripción'] || '',
    pais: r['País'] || '',
    moneda: r['Moneda'] || 'USD',
    rangoPrecio: r['Rango_Precio_Sesion'] || '',
    historiaLocal: r['Historia_Local'] || '',
  }));

  return cachedCities;
}

export function getCityBySlug(slug: string): CityData | undefined {
  return getCities().find((c) => c.slug === slug);
}
```

#### `src/lib/dolencias.ts`
```typescript
import rawDolencias from '../data/dataset_biodescodificacion_dolencias.json';

export interface FAQItem {
  pregunta: string;
  respuesta: string;
}

export interface DolenciaData {
  slug: string;
  nombre: string;
  sistema: string;
  conflictoEmocional: string;
  sentidoBiologico: string;
  reprogramacion: string;
  preguntasReflexion: string[];
  faqs: FAQItem[];
  ganchoAgendamiento: string;
}

export function getDolencias(): DolenciaData[] {
  return rawDolencias as DolenciaData[];
}

export function getDolenciaBySlug(slug: string): DolenciaData | undefined {
  return getDolencias().find((d) => d.slug === slug);
}
```

#### Uso en `src/pages/[slug].astro`
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCities, type CityData } from '../lib/cities';
import { buildLocalServiceSchema, buildBreadcrumbSchema } from '../lib/schema';

export async function getStaticPaths() {
  const cities = getCities();
  return cities.map((city) => ({
    params: { slug: city.slug },
    props: { city },
  }));
}

interface Props {
  city: CityData;
}
const { city } = Astro.props;

const canonicalUrl = `https://almaholistica.com/${city.slug}/`;
const schemas = [
  buildLocalServiceSchema(city, canonicalUrl),
  buildBreadcrumbSchema([
    { name: 'Inicio', url: 'https://almaholistica.com/' },
    { name: city.h1, url: canonicalUrl },
  ]),
];
---
<BaseLayout title={`${city.h1} | Alma Holística`} description={city.metaDescripcion} canonicalUrl={canonicalUrl} schemas={schemas}>
  <!-- Contenido sólido mate de la ciudad -->
</BaseLayout>
```

---

### 4.2 Integración del WhatsApp Quiz Modal en React

#### Componente React: `src/components/react/WhatsAppQuizModal.tsx`
```tsx
import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../config/site';

interface QuizState {
  symptom: string;
  duration: string;
  priorTreatments: string;
  location: string;
}

export const WhatsAppQuizModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuizState>({
    symptom: '',
    duration: '',
    priorTreatments: '',
    location: '',
  });

  // Interceptación global de eventos de clic hacia WhatsApp
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]');
      if (triggerModal(target)) {
        e.preventDefault();
      }
    };

    const triggerModal = (el: Element | null): boolean => {
      if (!el || el.closest('#alma-quiz-modal-container')) return false;
      const symptomAttr = el.getAttribute('data-symptom');
      const cityAttr = el.getAttribute('data-city');
      
      setFormData((prev) => ({
        ...prev,
        symptom: symptomAttr || prev.symptom || '',
        location: cityAttr || prev.location || '',
      }));
      setStep(symptomAttr ? 2 : 1);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      return true;
    };

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ symptom?: string; city?: string }>;
      setFormData((prev) => ({
        ...prev,
        symptom: customEvent.detail?.symptom || prev.symptom,
        location: customEvent.detail?.city || prev.location,
      }));
      setStep(customEvent.detail?.symptom ? 2 : 1);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('alma:open-quiz', handleCustomOpen);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('alma:open-quiz', handleCustomOpen);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleFinish = () => {
    const message = `Hola Alma Holística 🦋\nDeseo agendar una sesión inicial de diagnóstico y evaluación.\n\n📋 Mi Diagnóstico Preliminar:\n- Síntoma/Dolencia: ${formData.symptom || 'Consulta General'}\n- Tiempo con el síntoma: ${formData.duration}\n- Intentos previos: ${formData.priorTreatments}\n- Ubicación: ${formData.location || 'Online'}\n\n¿Tienen disponibilidad para consulta online?`;
    
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    closeModal();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div id="alma-quiz-modal-container" className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#060A1A]/90">
      <div className="relative w-full max-w-lg bg-[#0A1226] border border-[#1E293B] rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
        <button onClick={closeModal} aria-label="Cerrar" className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl">✕</button>
        
        {/* Cabecera del Quiz */}
        <div className="mb-6 text-center">
          <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">Evaluación Bioemocional Inicial</span>
          <h3 className="text-xl font-bold mt-1 text-zinc-100">
            {step === 1 && '¿Qué síntoma o dolencia deseas sanar?'}
            {step === 2 && '¿Cuánto tiempo llevas con este síntoma?'}
            {step === 3 && '¿Qué tratamientos has intentado previamente?'}
            {step === 4 && 'Confirma tu ciudad para la sesión online'}
            {step === 5 && '✓ Diagnóstico Preliminar Listo'}
          </h3>
        </div>

        {/* Pasos Interactivos */}
        {step === 1 && (
          <div className="space-y-3">
            {['Gastritis o Colon Irritable', 'Ansiedad o Insomnio', 'Migrañas o Cefaleas', 'Dolores Musculares (Lumbalgia/Ciática)', 'Afecciones en Piel o Alergias', 'Otro síntoma'].map((opt) => (
              <button
                key={opt}
                onClick={() => { setFormData({ ...formData, symptom: opt }); setStep(2); }}
                className="w-full text-left px-4 py-3 bg-[#0E172F] border border-[#1E3A5F] hover:border-[#38BDF8] rounded-xl text-zinc-200 text-sm font-medium transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {['Menos de 1 mes', '1 a 6 meses', '6 meses a 2 años', 'Más de 2 años (crónico/recurrente)'].map((opt) => (
              <button
                key={opt}
                onClick={() => { setFormData({ ...formData, duration: opt }); setStep(3); }}
                className="w-full text-left px-4 py-3 bg-[#0E172F] border border-[#1E3A5F] hover:border-[#38BDF8] rounded-xl text-zinc-200 text-sm font-medium transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            {['Tratamientos médicos convencionales y fármacos', 'Terapias alternativas / naturales', 'Terapia psicológica tradicional', 'Primera vez buscando el origen emocional'].map((opt) => (
              <button
                key={opt}
                onClick={() => { setFormData({ ...formData, priorTreatments: opt }); setStep(4); }}
                className="w-full text-left px-4 py-3 bg-[#0E172F] border border-[#1E3A5F] hover:border-[#38BDF8] rounded-xl text-zinc-200 text-sm font-medium transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Ej. Bogotá, Madrid, CDMX, Miami..."
              defaultValue={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-[#0E172F] border border-[#1E3A5F] rounded-xl text-white focus:outline-none focus:border-[#38BDF8]"
            />
            <button
              onClick={() => setStep(5)}
              className="w-full py-3 bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-bold rounded-xl text-center transition-colors"
            >
              Generar Diagnóstico Preliminar
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 text-center">
            <div className="bg-[#0E172F] border border-[#1E3A5F] p-4 rounded-xl text-left text-sm text-zinc-300">
              <p className="font-semibold text-[#D4AF37] mb-1">🌿 Origen Inconsciente Identificado:</p>
              <p className="text-xs leading-relaxed">
                El síntoma <strong className="text-white">{formData.symptom || 'seleccionado'}</strong> responde a un bloqueo emocional de adaptación biológica no resuelto conscientemente. En la sesión de diagnóstico abordaremos el momento desencadenante y el protocolo de reprogramación.
              </p>
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-3.5 bg-[#38BDF8] hover:bg-[#0ea5e9] text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <span>💬 Agendar Sesión de Diagnóstico en WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
```

---

### 4.3 Script SitemapFast Automatizado (`scripts/generate_sitemap.py`)

```python
#!/usr/bin/env python3
"""
SitemapFast ⚡ Architecture Generator for Alma Holística
Generates:
- public/sitemap-index.xml
- public/sitemap-0.xml
- public/sitemap.xml (legacy fallback)
- public/robots.txt
And synchronizes with dist/ if dist exists.
"""

import os
import csv
import json
from datetime import datetime, timezone

DOMAIN = "https://almaholistica.com"
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
DIST_DIR = os.path.join(ROOT_DIR, "dist")
SRC_DATA_DIR = os.path.join(ROOT_DIR, "src", "data")
TODAY = datetime.now(timezone.utc).strftime("%Y-%m-%d")

def generate_sitemaps():
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    
    urls = [
        {"loc": f"{DOMAIN}/", "priority": "1.0", "changefreq": "daily"},
        {"loc": f"{DOMAIN}/biodescodificacion/", "priority": "0.9", "changefreq": "weekly"},
    ]

    # 1. Leer Ciudades
    cities_csv = os.path.join(SRC_DATA_DIR, "dataset_almaholistica_ciudades.csv")
    if not os.path.exists(cities_csv):
        cities_csv = os.path.join(ROOT_DIR, "dataset_almaholistica_ciudades.csv")
        
    if os.path.exists(cities_csv):
        with open(cities_csv, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                slug = (row.get("URL Final (Slug)") or "").strip().lower().strip("/")
                if slug:
                    urls.append({
                        "loc": f"{DOMAIN}/{slug}/",
                        "priority": "0.8",
                        "changefreq": "weekly"
                    })
    else:
        print(f"⚠️ Aviso: No se encontró el dataset de ciudades en {cities_csv}")

    # 2. Leer Dolencias
    dolencias_json = os.path.join(SRC_DATA_DIR, "dataset_biodescodificacion_dolencias.json")
    if os.path.exists(dolencias_json):
        with open(dolencias_json, "r", encoding="utf-8") as f:
            dolencias = json.load(f)
            for d in dolencias:
                slug = d.get("slug", "").strip().lower().strip("/")
                if slug:
                    urls.append({
                        "loc": f"{DOMAIN}/biodescodificacion/{slug}/",
                        "priority": "0.8",
                        "changefreq": "weekly"
                    })
    else:
        print(f"⚠️ Aviso: No se encontró el dataset de dolencias en {dolencias_json}")

    # 3. Construir sitemap-0.xml
    sitemap_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    for u in urls:
        sitemap_lines.append("  <url>")
        sitemap_lines.append(f"    <loc>{u['loc']}</loc>")
        sitemap_lines.append(f"    <lastmod>{TODAY}</lastmod>")
        sitemap_lines.append(f"    <changefreq>{u['changefreq']}</changefreq>")
        sitemap_lines.append(f"    <priority>{u['priority']}</priority>")
        sitemap_lines.append("  </url>")
    sitemap_lines.append("</urlset>")
    xml_content = "\n".join(sitemap_lines)

    # 4. Construir sitemap-index.xml
    index_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>{DOMAIN}/sitemap-0.xml</loc>
    <lastmod>{TODAY}</lastmod>
  </sitemap>
</sitemapindex>
"""

    # 5. Construir robots.txt
    robots_content = f"""User-agent: *
Allow: /

Sitemap: {DOMAIN}/sitemap-index.xml
Sitemap: {DOMAIN}/sitemap.xml
"""

    targets = [PUBLIC_DIR]
    if os.path.exists(DIST_DIR):
        targets.append(DIST_DIR)

    for target in targets:
        with open(os.path.join(target, "sitemap-0.xml"), "w", encoding="utf-8") as f:
            f.write(xml_content)
        with open(os.path.join(target, "sitemap.xml"), "w", encoding="utf-8") as f:
            f.write(xml_content)
        with open(os.path.join(target, "sitemap-index.xml"), "w", encoding="utf-8") as f:
            f.write(index_content)
        with open(os.path.join(target, "robots.txt"), "w", encoding="utf-8") as f:
            f.write(robots_content)

    print(f"✅ SitemapFast generado con éxito: {len(urls)} URLs creadas en {[os.path.relpath(t, ROOT_DIR) for t in targets]}.")

if __name__ == "__main__":
    generate_sitemaps()
```

---

### 4.4 Utilidades de Schema.org JSON-LD (`src/lib/schema.ts`)

```typescript
import type { CityData } from './cities';
import type { DolenciaData } from './dolencias';

export function buildMedicalWebPageSchema(dolencia: DolenciaData, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `Biodescodificación de ${dolencia.nombre}: Sentido Biológico y Conflicto Emocional`,
    description: dolencia.conflictoEmocional,
    url: canonicalUrl,
    about: {
      '@type': 'MedicalCondition',
      name: dolencia.nombre,
      possibleTreatment: [
        {
          '@type': 'MedicalTherapy',
          name: 'Biodescodificación y Acompañamiento Bioemocional Online',
          description: dolencia.reprogramacion,
        },
      ],
      signOrSymptom: {
        '@type': 'MedicalSignOrSymptom',
        name: `Afección en ${dolencia.sistema}`,
      },
    },
    aspect: ['emotional-conflict', 'biological-sense', 'psychosomatic-origin', 'reprogramming'],
    audience: {
      '@type': 'MedicalAudience',
      audienceType: 'Pacientes en búsqueda del origen emocional de sus síntomas físicos',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alma Holística',
      url: 'https://almaholistica.com',
      logo: 'https://almaholistica.com/logo-mariposa-con-fondo-completo.svg',
    },
  };
}

export function buildFAQSchema(faqs: { pregunta: string; respuesta: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.respuesta,
      },
    })),
  };
}

export function buildBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: b.url,
    })),
  };
}

export function buildLocalServiceSchema(city: CityData, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: `Alma Holística - Sesiones de Biodescodificación Online en ${city.h1}`,
    description: city.metaDescripcion,
    url: canonicalUrl,
    telephone: '+573000000000',
    priceRange: city.rangoPrecio,
    currenciesAccepted: city.moneda,
    areaServed: {
      '@type': 'City',
      name: city.h1,
      containedInPlace: {
        '@type': 'Country',
        name: city.pais,
      },
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://almaholistica.com',
      servicePhone: '+573000000000',
      serviceLocation: 'Sesión Online por Videollamada (Zoom / Meet / WhatsApp)',
    },
  };
}
```

---

### 4.5 Configuración de Build y Rendimiento

#### `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://almaholistica.com',
  trailingSlash: 'always',
  output: 'static',
  scopedStyleStrategy: 'where',
  compressHTML: true,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    build: {
      emptyOutDir: true,
      cssMinify: true,
      minify: 'esbuild',
    },
  },
});
```

#### `package.json` Recomendado
```json
{
  "name": "almaholistica-com",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "sitemap": "python3 scripts/generate_sitemap.py",
    "prebuild": "python3 scripts/generate_sitemap.py",
    "build": "astro check && astro build && python3 scripts/generate_sitemap.py",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/react": "^4.2.1",
    "@astrojs/tailwind": "^5.1.5",
    "astro": "^5.4.2",
    "csv-parse": "^5.6.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  },
  "devDependencies": {
    "@types/node": "^22.13.9",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4"
  }
}
```

---

## 5. Verification Method

Para que el orquestador y los agentes de pruebas E2E verifiquen de forma autónoma la arquitectura planteada:

1. **Verificación de Carga de Datasets**:
   - Comprobar que `src/data/dataset_almaholistica_ciudades.csv` contenga al menos 113 filas de datos válidos con cabeceras `Dominio, Categoría, URL Final (Slug), H1 Título, Meta Descripción, País, Moneda, Rango_Precio_Sesion, Historia_Local`.
   - Comprobar que `src/data/dataset_biodescodificacion_dolencias.json` contenga exactamente 45 objetos válidos con claves `slug, nombre, sistema, conflictoEmocional, sentidoBiologico, reprogramacion, preguntasReflexion, faqs, ganchoAgendamiento`.
2. **Verificación de Compilación Limpia**:
   - Ejecutar: `npm run build`
   - Salida esperada: Código de salida 0, sin advertencias de TypeScript (`astro check` pasa al 100%) y generación de todas las carpetas estáticas en `dist/`.
3. **Verificación de Rutas Programáticas en `dist/`**:
   - Comprobar existencia de `dist/index.html`.
   - Contar carpetas en `dist/`: debe haber más de 113 subcarpetas para ciudades y 45 subcarpetas bajo `dist/biodescodificacion/`.
4. **Verificación de SitemapFast**:
   - Ejecutar: `python3 scripts/generate_sitemap.py`
   - Validar que `public/sitemap-index.xml` y `dist/sitemap-index.xml` apunten a `sitemap-0.xml`.
   - Validar que `public/sitemap-0.xml` contenga más de 160 etiquetas `<url>`.
   - Validar que `public/robots.txt` incluya las directivas `Sitemap: https://almaholistica.com/sitemap-index.xml` y `Sitemap: https://almaholistica.com/sitemap.xml`.
5. **Verificación de Schema.org JSON-LD**:
   - En una página de ciudad: comprobar que contenga `<script type="application/ld+json">` con `@type: "HealthAndBeautyBusiness"` y `BreadcrumbList`.
   - En una página de dolencia: comprobar que contenga `<script type="application/ld+json">` con `@type: "MedicalWebPage"` y `FAQPage`.
