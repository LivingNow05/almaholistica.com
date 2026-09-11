# Análisis Técnico Exhaustivo: Requerimientos R3, R4 y R5
**Proyecto**: Alma Holística (almaholistica.com)  
**Agente**: `teamwork_preview_explorer_survey_3`  
**Fecha de Investigación**: 2026-09-10  
**Archivos Fuente Auditados**: `src/pages/index.astro`, `src/pages/[slug].astro`, `src/pages/biodescodificacion/[slug].astro`, `src/pages/biodescodificacion/index.astro`, `src/lib/schema.ts`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `tailwind.config.mjs`, `src/data/dataset_biodescodificacion_dolencias.json`, suites de pruebas en `tests/`.

---

## Resumen Ejecutivo

El presente informe detalla la investigación forense y técnica de los requerimientos **R3** (Tablas Comparativas y Alivio Estructural), **R4** (SEO, GEO y Datos Estructurados) y **R5** (Suite de Pruebas y Aseguramiento Técnico). Se identificaron los cuellos de botella de legibilidad por bloques densos de texto en las páginas principales y de dolencias, se diseñó la arquitectura de datos y contenido para tres tablas clínicas de alta conversión, se definió la estrategia de marcado semántico Schema.org y microdatos HTML compatible al 100% con los oráculos de prueba existentes, y se mapearon exhaustivamente las 150 pruebas de `npm test` y las 244 pruebas de `node --test tests/adversarial_*.test.mjs`.

---

## 1. Requerimiento R3: Tablas Comparativas y Alivio Estructural de Texto

### 1.1 Diagnóstico de Secciones con Texto Continuo Denso
Tras auditar el código fuente del proyecto se identificaron cuatro áreas críticas donde la densidad de texto perjudica la retención del consultante y la escaneabilidad por motores de IA:

1. **`src/pages/index.astro` (Sección 3: Fundamento Terapéutico, líneas 242-324)**:
   - Presenta 3 tarjetas de pilares explicativos ("El Choque Inconsciente", "El Sentido Biológico", "Toma de Conciencia").
   - Aunque su diseño en tarjetas `rounded-[2.5rem]` es sobrio, carece de un marco comparativo directo frente a la medicina convencional. El consultante promedio suele dudar sobre si la biodescodificación es una terapia sustitutiva o complementaria; actualmente esta aclaración vital está relegada a un acordeón de FAQ al final de la página (línea 774).
2. **`src/pages/index.astro` (Sección 6: El Proceso Terapéutico, líneas 543-631)**:
   - Presenta 4 pasos secuenciales (01 Quiz, 02 Hipótesis, 03 Sesión Online, 04 Reprogramación).
   - No especifica duración en sesiones estimadas, metodologías clínicas aplicadas (PNI, Hamer, PNL) ni entregables concretos por fase.
3. **`src/pages/biodescodificacion/index.astro` (Catálogo General, líneas 129-431)**:
   - Despliega las 45 dolencias directamente en una cuadrícula repetitiva sin una tabla sinóptica o matriz biológica que clasifique las dolencias según su **Capa Embrionaria (Endodermo, Mesodermo, Ectodermo)** y su sentido adaptativo.
4. **`src/pages/biodescodificacion/[slug].astro` (Plantilla de Síntoma, líneas 143-190)**:
   - Contiene bloques de texto descriptivo continuo en "El Conflicto Emocional Inconsciente" y "El Sentido Biológico de Supervivencia" que generan fatiga visual en pantallas móviles.

---

### 1.2 Definición de Estructura de Datos y Contenido Exacto de las 3 Tablas

#### A) Tabla de Enfoque Clínico: Medicina Convencional vs Biodescodificación Integrativa
- **Ubicación recomendada**: `src/pages/index.astro` inmediatamente después de la Sección 3 (Fundamento Terapéutico) o como sección de transición previa al catálogo de dolencias.
- **Objetivo**: Aclarar el valor diferencial y complementario del servicio, neutralizar objeciones y potenciar la citabilidad de pasajes en motores de IA (GEO).
- **Estructura de Datos (TypeScript)**:
```typescript
export interface EnfoqueClinicoRow {
  dimension: string;
  medicinaConvencional: string;
  biodescodificacion: string;
}

export const TABLA_ENFOQUE_CLINICO: EnfoqueClinicoRow[] = [
  {
    dimension: 'Paradigma de origen',
    medicinaConvencional: 'Etiología físico-mecánica y bioquímica. La enfermedad se interpreta como un fallo orgánico, alteración celular, mutación fortuita o agresión externa de patógenos.',
    biodescodificacion: 'Paradigma psicosomático y adaptativo (Psiconeuroinmunología). El síntoma es un Programa Biológico Especial activado por un impacto emocional agudo vivido en soledad.'
  },
  {
    dimension: 'Enfoque diagnóstico',
    medicinaConvencional: 'Taxonomía nosológica y análisis sintomático clínico (analíticas séricas, biopsias, ecografías, resonancias magnéticas y marcadores físicos).',
    biodescodificacion: 'Decodificación biosemiótica y rastreo biográfico. Mapeo del órgano afectado con su capa embrionaria para identificar el conflicto inconsciente detonante.'
  },
  {
    dimension: 'Nivel de intervención',
    medicinaConvencional: 'Tratamiento a nivel bioquímico y estructural físico (farmacoterapia, cirugía, radioterapia y técnicas mecánicas paliativas).',
    biodescodificacion: 'Intervención psicoemocional y neurovegetativa (toma de conciencia, catarsis guiada, desactivación del estrés simpático y reprogramación mental).'
  },
  {
    dimension: 'Objetivo del síntoma',
    medicinaConvencional: 'Anomalía o enemigo patológico que debe ser neutralizado, suprimido o extirpado para restaurar los parámetros fisiológicos estándar.',
    biodescodificacion: 'Brújula biológica de precisión y respuesta adaptativa. Revela la necesidad biológica no satisfecha que la persona no logró resolver conscientemente.'
  },
  {
    dimension: 'Papel del consultante',
    medicinaConvencional: 'Receptor receptivo o pasivo de la prescripción facultativa y el tratamiento externo indicado por el especialista de la salud.',
    biodescodificacion: 'Protagonista y agente activo indispensable. Asume la responsabilidad emocional de comprender su historia personal y resignificar sus vivencias.'
  }
];
```

#### B) Tabla Matriz de Dolencias y Sentido Biológico (Muestra Representativa)
- **Ubicación recomendada**: `src/pages/biodescodificacion/index.astro` (cabecera sinóptica del catálogo) o bloque central en `src/pages/index.astro`.
- **Objetivo**: Proporcionar una matriz estructurada de referencia que correlacione el síntoma con la emoción, la capa embrionaria (Ontogenia) y el sentido biológico.
- **Estructura de Datos (TypeScript)**:
```typescript
export interface MatrizDolenciaRow {
  sintoma: string;
  slug: string;
  sistema: string;
  emocionAtrapada: string;
  capaEmbrionaria: 'Endodermo' | 'Mesodermo Antiguo' | 'Mesodermo Nuevo' | 'Ectodermo';
  releCerebral: string;
  sentidoBiologico: string;
  colorSystem: 'digestivo' | 'osteoarticular' | 'respiratorio' | 'nervioso' | 'dermatologico' | 'metabolico';
}

export const TABLA_MATRIZ_DOLENCIAS: MatrizDolenciaRow[] = [
  {
    sintoma: 'Gastritis y Acidez Gástrica',
    slug: 'gastritis',
    sistema: 'Digestivo',
    emocionAtrapada: 'Bocado indigesto. Rabia e impotencia por imposiciones o situaciones cotidianas que la persona se ve forzada a tragar contra sus valores.',
    capaEmbrionaria: 'Endodermo',
    releCerebral: 'Tronco Encefálico',
    sentidoBiologico: 'Hipersecreción de ácido clorhídrico para descomponer rápidamente el bocado tóxico o inaceptable que el individuo siente atorado.',
    colorSystem: 'digestivo'
  },
  {
    sintoma: 'Colon Irritable (SII)',
    slug: 'colon-irritable',
    sistema: 'Digestivo',
    emocionAtrapada: 'Jugarreta sucia o traición. Sensación de vileza o humillación sufrida por seres cercanos, debatiéndose entre evacuar o retener el control.',
    capaEmbrionaria: 'Endodermo',
    releCerebral: 'Tronco Encefálico',
    sentidoBiologico: 'Acelerar el peristaltismo para expulsar la inmundicia emocional (diarrea) o retener para absorber el último recurso de seguridad (estreñimiento).',
    colorSystem: 'digestivo'
  },
  {
    sintoma: 'Dermatitis Atópica y Eccema',
    slug: 'dermatitis',
    sistema: 'Dermatológico',
    emocionAtrapada: 'Conflicto de separación. Pérdida brusca del contacto físico, abrazo o cercanía de un ser querido, o contacto impuesto vivido con rechazo.',
    capaEmbrionaria: 'Ectodermo',
    releCerebral: 'Corteza Sensorial',
    sentidoBiologico: 'Pérdida temporal de sensibilidad para atenuar el sufrimiento de la separación en fase activa; hiperemia y prurito en curación para reconstruir el contacto.',
    colorSystem: 'dermatologico'
  },
  {
    sintoma: 'Lumbalgia Mecánica (L4-L5)',
    slug: 'lumbalgia',
    sistema: 'Osteoarticular',
    emocionAtrapada: 'Desvalorización por colapso del soporte. Miedo a la ruina financiera, sensación de no ser capaz de sostener la estructura familiar o económica.',
    capaEmbrionaria: 'Mesodermo Nuevo',
    releCerebral: 'Sustancia Blanca',
    sentidoBiologico: 'Necrosis/osteólisis microscópica en fase activa para flexibilizar la estructura; recalcificación reforzada en resolución para soportar mayor peso.',
    colorSystem: 'osteoarticular'
  },
  {
    sintoma: 'Ciática y Neuralgia Lumbar',
    slug: 'ciatica',
    sistema: 'Osteoarticular / Nervioso',
    emocionAtrapada: 'Miedo a avanzar hacia el futuro. Impotencia para doblegarse o dar un paso en una dirección obligada o contraria a la voluntad consciente.',
    capaEmbrionaria: 'Mesodermo Nuevo',
    releCerebral: 'Sustancia Blanca / Corteza Motora',
    sentidoBiologico: 'Inmovilizar temporalmente la extremidad inferior mediante dolor neuropático para evitar un desplazamiento que el inconsciente considera peligroso.',
    colorSystem: 'osteoarticular'
  },
  {
    sintoma: 'Hipotiroidismo',
    slug: 'hipotiroidismo',
    sistema: 'Endocrino / Metabólico',
    emocionAtrapada: 'Conflicto de tiempo e impotencia. Percepción de que el tiempo vuela y nunca se llega a tiempo a las exigencias ("no alcanzo a atrapar el bocado").',
    capaEmbrionaria: 'Endodermo',
    releCerebral: 'Tronco Encefálico',
    sentidoBiologico: 'Frenar el ritmo metabólico del organismo para ahorrar energía vital ante una competencia o carrera evaluada como inalcanzable.',
    colorSystem: 'metabolico'
  },
  {
    sintoma: 'Migraña Recurrente',
    slug: 'migrana',
    sistema: 'Nervioso / Psicosomático',
    emocionAtrapada: 'Autoexigencia intelectual y miedo al descontrol. Necesidad de encontrar soluciones lógicas perfectas y desvalorización por sentirse incompetente.',
    capaEmbrionaria: 'Ectodermo',
    releCerebral: 'Corteza Cerebral',
    sentidoBiologico: 'Vasodilatación craneal durante la fase vagotónica (fines de semana o reposo) para reparar e hiperirrigar el tejido cerebral tras un hipercontrol agudo.',
    colorSystem: 'nervioso'
  },
  {
    sintoma: 'Sobrepeso y Retención de Líquidos',
    slug: 'sobrepeso-retencion',
    sistema: 'Endocrino / Renal',
    emocionAtrapada: 'Conflicto de refugiado y abandono. Sentirse solo, aislado, arrancado de su entorno natural o con pérdida de todos los referentes de soporte vital.',
    capaEmbrionaria: 'Endodermo',
    releCerebral: 'Tronco Encefálico (Túbulos Colectores Renales)',
    sentidoBiologico: 'Cierre de los poros renales para retener agua en el organismo y conservar el volumen biológico vital ante la experiencia de abandono en el desierto.',
    colorSystem: 'metabolico'
  }
];
```

#### C) Tabla de Etapas del Acompañamiento Terapéutico
- **Ubicación recomendada**: `src/pages/index.astro` (complementando la sección 6 "El Proceso Terapéutico") y en `src/pages/[slug].astro` (como desglose de las sesiones online en cada ciudad).
- **Objetivo**: Clarificar el proceso clínico en 4 fases medibles con sesiones estimadas, metodologías y resultados terapéuticos verificables.
- **Estructura de Datos (TypeScript)**:
```typescript
export interface EtapaAcompanamientoRow {
  fase: string;
  numero: string;
  sesionesEstimadas: string;
  metodologia: string;
  resultadoEsperado: string;
  badge: string;
}

export const TABLA_ETAPAS_ACOMPANAMIENTO: EtapaAcompanamientoRow[] = [
  {
    numero: '01',
    fase: 'Diagnóstico & Cartografía Biológica',
    sesionesEstimadas: '1 sesión (60 - 75 min)',
    metodologia: 'Anamnesis clínica biográfica, test de estrés bioemocional, correlación del síntoma físico con las leyes biológicas de Hamer y localización del evento desencadenante (Bioshock).',
    resultadoEsperado: 'Identificación precisa del conflicto raíz inconsciente, comprensión del sentido adaptativo del síntoma y entrega de la hipótesis clínica personalizada.',
    badge: 'Fase Inicial'
  },
  {
    numero: '02',
    fase: 'Desanclaje Emocional & Catarsis',
    sesionesEstimadas: '1 a 2 sesiones',
    metodologia: 'Técnicas de Psiconeuroinmunología (PNI), regresión consciente al momento del choque, desactivación de la alerta neurovegetativa y liberación somática de emociones reprimidas.',
    resultadoEsperado: 'Descenso notable del nivel de alerta simpática en el sistema nervioso autónomo, liberación de la tensión visceral y disminución progresiva del dolor físico.',
    badge: 'Intervención'
  },
  {
    numero: '03',
    fase: 'Reprogramación Mental & Límites',
    sesionesEstimadas: '1 sesión',
    metodologia: 'Anclajes de PNL integrativa, elaboración de decretos biológicos de resignificación, reestructuración cognitiva de creencias limitantes y establecimiento de límites asertivos.',
    resultadoEsperado: 'Generación de nuevos circuitos neuronales de respuesta ante detonantes estresores, desactivación de la orden biológica de alarma y prevención activa de recidivas.',
    badge: 'Integración'
  },
  {
    numero: '04',
    fase: 'Consolidación & Autorregulación',
    sesionesEstimadas: 'Seguimiento a los 21-30 días (opcional)',
    metodologia: 'Evaluación de marcadores de estabilidad somática, balance de coherencia mente-cuerpo, calibración del estilo de vida y entrega de guía de higiene bioemocional continua.',
    resultadoEsperado: 'Remisión sostenida del conflicto inconsciente, autonomía del consultante para autorregularse ante futuros estresores y consolidación del bienestar integral.',
    badge: 'Consolidación'
  }
];
```

---

### 1.3 Patrón de Visualización Responsivo (Cero CLS y Cero Desbordamiento)

Para cumplir estrictamente con los contratos de calidad técnica (`CLS = 0`, viewport móvil de 320px sin desbordamiento horizontal y respeto por los estilos mate):

1. **Estructura del Contenedor Exterior**:
   ```html
   <div class="w-full max-w-full overflow-hidden rounded-[2.5rem] bg-[#0A1226] border border-slate-800/40 p-6 sm:p-8 lg:p-10 my-12">
   ```
2. **Sub-contenedor de Scroll Horizontal Suave**:
   ```html
   <div class="relative w-full overflow-x-auto scroll-smooth overscroll-contain" style="scrollbar-gutter: stable;">
   ```
3. **Scrollbar Estilizada con Tokens de Marca**:
   ```css
   /* En src/styles/global.css */
   .table-scroll-container::-webkit-scrollbar {
     height: 6px;
   }
   .table-scroll-container::-webkit-scrollbar-track {
     background-color: #060A1A;
     border-radius: 9999px;
   }
   .table-scroll-container::-webkit-scrollbar-thumb {
     background-color: #1E293B;
     border-radius: 9999px;
   }
   .table-scroll-container::-webkit-scrollbar-thumb:hover {
     background-color: #1E3A5F;
   }
   ```
4. **Micro-indicador de Ayuda Móvil**:
   - Para pantallas `< lg` (móviles y tablets), incorporar un micro-indicador discreto en la parte superior derecha de la tabla:
   ```html
   <div class="flex items-center gap-1.5 text-xs text-slate-400 font-sans mb-3 lg:hidden">
     <svg class="w-3.5 h-3.5 text-[#779DD1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
     <span>Desplaza horizontalmente para ver la tabla completa</span>
   </div>
   ```
5. **Estética Sólida Mate Estricta**:
   - `thead`: `bg-[#0E172F] text-slate-100 border-b border-slate-800/60 font-serif`
   - `tbody tr`: Fondos alternados 100% sólidos mates (`bg-[#0A1226]` y `bg-[#0E172F]`) sin `bg-opacity-*` ni transparencias.
   - `th` y `td`: `px-5 py-4 text-sm text-slate-200 border-b border-slate-800/40 align-top`
   - Acentos de Capas Embrionarias / Sistemas: Badges discretos tipo píldora (`px-3 py-1 rounded-full text-xs font-semibold`).

---

## 2. Requerimiento R4: SEO, GEO y Datos Estructurados

### 2.1 Diagnóstico de los Esquemas JSON-LD Existentes
En `src/lib/schema.ts` se implementan actualmente cuatro generadores puros de esquemas JSON-LD:
1. `buildMedicalWebPageSchema(dolencia, canonicalUrl)`: Inyectado en las 45 páginas de dolencias (`src/pages/biodescodificacion/[slug].astro`).
2. `buildFAQSchema(faqs)`: Inyectado en las 45 páginas de dolencias que contienen preguntas frecuentes.
3. `buildBreadcrumbSchema(items)`: Inyectado en las 113 páginas de ciudades y en las 45 páginas de dolencias.
4. `buildLocalServiceSchema(city, canonicalUrl)`: Inyectado como `HealthAndBeautyBusiness` en las 113 páginas de ciudades.

### 2.2 HALLAZGO CRÍTICO FORENSE: Restricciones de Pruebas Adversariales
Durante la inspección de la suite de pruebas se identificaron dos restricciones de diseño estrictas que un implementador incauto rompería fácilmente:

1. **Prohibición de JSON-LD en la Home (`dist/index.html`)**:
   - Pruebas `MR3-ADV-4.1` (en `tests/adversarial_mr3_challenger.test.mjs`, línea 195) y `MR3-CH2-4.5` (en `tests/adversarial_mr3_challenger_2.test.mjs`, línea 247) declaran:
     ```javascript
     test('MR3-ADV-4.1: dist/index.html NO contiene bloques <script type="application/ld+json">', () => {
       const jsonLdBlocks = [...distIndexContent.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
       assert.strictEqual(jsonLdBlocks.length, 0, 'dist/index.html must have exactly 0 JSON-LD blocks.');
     });
     ```
   - **Consecuencia Directa**: **BAJO NINGUNA CIRCUNSTANCIA** se debe inyectar una etiqueta `<script type="application/ld+json">` dentro de `src/pages/index.astro`. Hacerlo ocasionaría el fallo fulminante de 2 pruebas adversariales críticas.

2. **Censo Global Estricto de 361 Scripts JSON-LD en `dist/`**:
   - Pruebas `ADV-M5.2.2` (en `tests/adversarial_jsonld_robots_m5_2.test.mjs`, línea 86), `adversarial_challenger_m5.test.mjs` (línea 530), `adversarial_m6_final_qa.test.mjs` (línea 338) y `adversarial_m5_sitemaps_schema.py` (línea 195) comprueban:
     ```javascript
     // 113 city pages * 2 + 45 dolencia pages * 3 = 361 schemas
     assert.equal(totalScripts, 361, `Expected exactly 361 JSON-LD scripts across all 160 files`);
     ```
   - **Consecuencia Directa**: Tampoco se pueden agregar nuevas etiquetas `<script type="application/ld+json">` adicionales en las páginas de ciudades o dolencias, ya que elevarían el conteo total a 362+, fallando las 4 suites de verificación de esquemas.

### 2.3 Solución de Ingeniería Elegante y Conforme para R4
Para maximizar la visibilidad en motores generativos (ChatGPT Search, Perplexity AI, Google AI Overviews) sin alterar el conteo de 361 scripts ni violar la regla de 0 scripts en la home:

#### Estrategia A: Microdatos Semánticos HTML5 en las Tablas (Recomendación Principal)
Tanto Google como los crawlers de OpenAI y Perplexity leen y priorizan los microdatos nativos HTML5 y las etiquetas semánticas directamente en el DOM:
```html
<table 
  itemscope 
  itemtype="https://schema.org/Table" 
  class="w-full text-left border-collapse"
  aria-label="Matriz de Enfoque Clínico Comparativo"
>
  <caption itemprop="about" class="text-left font-serif text-xl sm:text-2xl text-slate-100 mb-4 font-normal">
    Cuadro Comparativo: Medicina Convencional vs Biodescodificación Integrativa
  </caption>
  <thead>
    <tr class="border-b border-slate-800/60 bg-[#0E172F]">
      <th scope="col" class="py-4 px-5 text-sm font-semibold text-[#779DD1]">Dimensión Clínica</th>
      <th scope="col" class="py-4 px-5 text-sm font-semibold text-slate-200">Medicina Convencional</th>
      <th scope="col" class="py-4 px-5 text-sm font-semibold text-slate-200">Biodescodificación Integrativa</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-800/40 bg-[#0A1226]">
      <th scope="row" class="py-4 px-5 text-sm font-medium text-slate-300">Paradigma de origen</th>
      <td class="py-4 px-5 text-sm text-slate-300">Etiología mecanicista y celular...</td>
      <td class="py-4 px-5 text-sm text-slate-300">Programa Biológico Especial (SBS)...</td>
    </tr>
    <!-- Resto de filas -->
  </tbody>
</table>
```
**Ventajas Técnicas**:
- Cero scripts añadidos: no incrementa el contador de 361 bloques JSON-LD.
- Cero scripts en `index.html`: `MR3-ADV-4.1` pasa en verde.
- Máxima citabilidad por pasajes (GEO): Perplexity y ChatGPT Search extraen matrices directamente a través de las etiquetas `<table>`, `<thead>`, `<tbody>`, `<th scope="row">` y `<caption>`.

#### Estrategia B: Enriquecimiento Interno de Esquemas Existentes en Dolencias
En las 45 páginas de dolencias, el esquema `MedicalWebPage` generado por `buildMedicalWebPageSchema` en `src/lib/schema.ts` puede ampliarse internamente incorporando sub-entidades Schema.org como propiedades de la misma raíz:
- Incorporar `subjectOf` con un esquema `HowTo` que describa las fases del protocolo de desanclaje.
- Incorporar `hasPart` con un esquema `Table` que represente la matriz biológica de la dolencia.
Al mantenerse dentro del mismo bloque `<script type="application/ld+json">`, el número total de scripts permanece exactamente en 361.

---

## 3. Requerimiento R5: Mapeo de Pruebas y Aseguramiento Técnico

### 3.1 Inventario de Suites de Pruebas del Proyecto

El ecosistema de pruebas de Alma Holística se divide en dos comandos oficiales:
1. **`npm test`**: Ejecuta las suites funcionales de Tiers 1 a 4 (`tests/tier*.test.mjs`).
   - Total verificado: **150 pruebas**, 40 suites, 0 fallos.
2. **`node --test tests/adversarial_*.test.mjs`**: Ejecuta 14 suites de pruebas adversariales independientes.
   - Total verificado: **244 pruebas**, 70 suites, 0 fallos.
3. **Scripts de estrés en Python (`tests/*.py`)**: Verificaciones adicionales de QA final y sitemaps.

---

### 3.2 Desglose de `npm test` (150 Pruebas)

| Archivo de Prueba | Tests | Cobertura / Objetivo Técnico Principal |
|---|---|---|
| `tests/tier1_features.test.mjs` | **115** | Cobertura exhaustiva de las 23 características de `PROJECT.md` (mínimo 5 tests por feature): datasets de ciudades (CSV) y dolencias (JSON), tipados TS, configuración de sitio, paleta mate, activos SVG, componentes de layout, Quiz WhatsApp, módulos de lectura SSG, plantillas de página, esquemas JSON-LD, SitemapFast y auto-descubrimiento. |
| `tests/tier2_edge_cases.test.mjs` | **21** | Análisis de valores límite y casos de borde: normalización de slugs con tildes/espacios/mayúsculas, monedas heterogéneas (COP, EUR, USD, ARS, etc.), auditoría forense de estilo mate (prohibición de `backdrop-blur`, `bg-opacity-*`, sombras glow), URLs 404, sanitización de caracteres en enlaces de WhatsApp y contención anti-CLS (320px). |
| `tests/tier3_cross_feature.test.mjs` | **10** | Pruebas combinatorias cruzadas: Cruce 1 (Ciudad + Moneda + Precio + Schema LocalBusiness), Cruce 2 (Dolencia + Preguntas + FAQs + Schema MedicalWebPage/FAQPage), Cruce 3 (Dolencia + Precarga en Quiz + Diagnóstico + WhatsApp), Cruce 4 (Sitemaps XML vs Totalidad de Rutas SSG). |
| `tests/tier4_user_journeys.test.mjs` | **4** | Escenarios de usuario extremo a extremo: Journey A (Paciente hiperlocal en Bogotá con Quiz y WhatsApp), Journey B (Paciente temático en Madrid para Lumbalgia), Journey C (Experiencia móvil a 320px y Progressive Enhancement sin JavaScript). |
| **TOTAL `npm test`** | **150** | **100% PASS / 0 FAIL** (Tiempo: ~130ms) |

---

### 3.3 Desglose de `node --test tests/adversarial_*.test.mjs` (244 Pruebas)

| # | Archivo de Prueba Adversarial | Tests | Aserciones Críticas Evaluadas |
|---|---|---|---|
| 1 | `adversarial_challenger_m4.test.mjs` | **17** | Censo de 160 HTMLs en `dist/`, consistencia 113 ciudades y 45 dolencias, normalización y colisiones de slugs, consistencia país-moneda, flujo de WhatsApp y esquemas JSON-LD en archivos compilados. |
| 2 | `adversarial_challenger_m4_2.test.mjs` | **19** | Resiliencia de módulos SSG ante entradas malformadas/nulas, inyecciones de código/XSS, clasificación estricta de las 45 patologías en 7 sistemas corporales y anti-CLS en home. |
| 3 | `adversarial_challenger_m4_gen3.test.mjs` | **10** | Censo categórico (113 ciudades, 45 dolencias, 1 catálogo, 1 home) y escaneo masivo de 0 enlaces internos 404 rotos entre los 160 archivos HTML. |
| 4 | `adversarial_challenger_m4_gen3_2.test.mjs` | **12** | Integridad de hipervínculos cruzados, validación de anclas `#`, trailing slashes y coherencia relacional de páginas. |
| 5 | `adversarial_challenger_m5.test.mjs` | **21** | Correspondencia biunívoca 1:1 entre URLs de `sitemap-0.xml` (160 URLs) y archivos HTML en `dist/`, validación sintáctica de XML, pruebas de inyección y estrés en `schema.ts`, y conteo exacto de 361 esquemas JSON-LD. |
| 6 | `adversarial_challenger_mr2.test.mjs` | **29** | Erradicación de amarillo/dorado (`#D4AF37`, `#F59E0B`), eventos de WhatsAppQuizModal (`alma:open-quiz`, `data-open-quiz`, `data-symptom`), WAI-ARIA en Navbar/Footer/Modal y contratos responsive. |
| 7 | `adversarial_contracts_config_m2_2.test.mjs` | **19** | Verificación estricta de contratos en `contracts.mjs`, integridad de tokens de color, configuración central y esquemas de ciudad y dolencia. |
| 8 | `adversarial_jsonld_robots_m5_2.test.mjs` | **7** | Validación profunda de JSON-LD en las 160 páginas: ejecución limpia de `JSON.parse()`, `@context: https://schema.org`, 113 ciudades con `HealthAndBeautyBusiness` + `BreadcrumbList`, 45 dolencias con `MedicalWebPage` + `FAQPage` + `BreadcrumbList`, conteo exacto de 361 scripts y robots.txt con doble sitemap. |
| 9 | `adversarial_m3_challenger.test.mjs` | **26** | Lógica de pasos del Quiz Modal (4 pasos), cálculo de hipótesis diagnóstica, codificación de URLs para WhatsApp y prevención de desbordamiento de caracteres. |
| 10 | `adversarial_m3_quiz_challenger.test.mjs` | **16** | Simulación reactiva del Quiz, precarga de dolencias vía `data-symptom`, interacción de teclado y escape de entradas de usuario. |
| 11 | `adversarial_m6_final_qa.test.mjs` | **11** | Puerta final de calidad: 160 páginas SSG, 0 enlaces rotos, dimensiones explícitas en `<img>` y `<svg>`, 361 esquemas JSON-LD y paridad byte-por-byte en sitemaps. |
| 12 | `adversarial_matte_cls_m2_1.test.mjs` | **14** | Escaneo integral de código fuente en busca de `backdrop-blur`, `bg-opacity-*`, sombras glow neón, contención estricta de anchos (`overflow-x: hidden`, `scrollbar-gutter: stable`). |
| 13 | `adversarial_mr3_challenger.test.mjs` | **23** | **Criterio 4: Cero esquemas JSON-LD en `dist/index.html`**, erradicación total de amarillo, botones píldora en blanco puro (`bg-white text-[#060A1A] rounded-full`), tarjetas `rounded-[2.5rem]` y animaciones GSAP sin saltos. |
| 14 | `adversarial_mr3_challenger_2.test.mjs` | **20** | Auditoría de sintaxis en bundles de cliente, **MR3-CH2-4.5 (Zero entity JSON-LD schemas in home)**, logo mariposa con `width="320" height="320"`, estrés de búsqueda en cliente para dolencias y ciudades, y censo de 160 HTMLs. |
| **TOTAL ADVERSARIAL** | **244** | **100% PASS / 0 FAIL** (Tiempo: ~540ms) |

---

### 3.4 Matriz de Puntos de Fricción Críticos y Cómo Evitar Regresiones

| Riesgo Técnico / Punto de Fricción | Prueba que Fallaría Inmediatamente | Medida de Prevención Obligatoria |
|---|---|---|
| **Inyectar `<script type="application/ld+json">` en la Home (`index.astro`)** | `MR3-ADV-4.1` (en `adversarial_mr3_challenger.test.mjs`) y `MR3-CH2-4.5` (en `adversarial_mr3_challenger_2.test.mjs`). | Utilizar únicamente marcado semántico HTML5 (`<table>`, `<caption>`, `<thead>`, `<tbody>`, `<th>`, `<td>`) y microdatos (`itemscope itemtype="https://schema.org/Table"`). **NUNCA agregar bloques `<script type="application/ld+json">` a la home.** |
| **Añadir un nuevo bloque `<script type="application/ld+json">` en páginas de dolencia o ciudad** | `ADV-M5.2.2` (en `adversarial_jsonld_robots_m5_2.test.mjs`), `adversarial_challenger_m5.test.mjs` y `adversarial_m6_final_qa.test.mjs`. | El total de bloques JSON-LD en todo el sitio compilado debe ser **exactamente 361**. Si se amplía Schema.org para dolencias, debe hacerse como sub-propiedad anidada dentro del bloque `MedicalWebPage` existente. |
| **Usar clases prohibidas de Tailwind (`bg-opacity-*`, `backdrop-blur`, `neon-glow`)** | `ADV-M2.1.1`, `ADV-M2.1.2` (en `adversarial_matte_cls_m2_1.test.mjs`) y `MR3-CH2-4.2`. | Fondos 100% opacos y sólidos (`#060A1A`, `#0A1226`, `#0E172F`). Sin transparencias ni efectos de vidrio. |
| **Usar tonos amarillos o dorados (`#F59E0B`, `#D4AF37`, `bg-amber-*`, `text-yellow-*`)** | `MR3-ADV-5.1` y `MR3-CH2-4.1`. | Al implementar la paleta semántica del sistema osteoarticular, usar tonos terracota/arcilla (`#C26D55`, `#B4533C`), **NUNCA** amarillo, ámbar ni dorado. |
| **Desbordamiento horizontal en viewport móvil (< 640px)** | `T2.6.1`, `T4.3.2` y `ADV-M2.1.3`. | Todas las tablas deben estar dentro de contenedores con `w-full max-w-full overflow-x-auto` y estilos de tabla responsivos. |
| **Etiquetas `<img>` o `<svg>` sin dimensiones explícitas** | `MR3-CH2-2.1`, `MR3-CH2-2.2` y `ADV-M4.6.3`. | Todo elemento visual nuevo debe contener `width`, `height` explícitos y `viewBox`. |
| **Hipervínculos internos rotos (404)** | `GEN3-3` (en `adversarial_challenger_m4_gen3.test.mjs`) y `MR3-CH2-5.2`. | Todos los enlaces `href` deben apuntar a rutas estáticas existentes con barra final (`/biodescodificacion/gastritis/`) o anclas válidas con `id` correspondiente en la página. |
| **Alterar el censo de 160 páginas generadas** | `ADV-M4.1.1`, `GEN3-1`, `ADV-M5.1.3`, `MR3-CH2-5.1`. | Preservar exactamente las 113 rutas de ciudades, 45 dolencias, 1 catálogo (`biodescodificacion/index.html`) y 1 home (`index.html`). |

---

## 4. Conclusión de la Investigación

La investigación confirma que:
1. Las secciones con texto denso en `src/pages/index.astro`, `src/pages/biodescodificacion/index.astro` y las páginas dinámicas pueden transformarse mediante las tres tablas clínicas estructuradas diseñadas en la Sección 1.2, aportando orden visual, alivio cognitivo y alta conversión.
2. Los motores generativos de IA (Perplexity, ChatGPT Search, Google AI Overviews) se benefician enormemente del marcado semántico de tablas HTML5 y microdatos Schema.org sin requerir la inyección de nuevos scripts JSON-LD en la home, lo que blinda la integridad de los oráculos de prueba existentes.
3. La suite de pruebas actual (150 tests de regresión + 244 tests adversariales) constituye una barrera infranqueable de calidad que previene regresiones visuales (estilos mate), funcionales (Quiz WhatsApp) y de infraestructura (160 páginas SSG y 361 esquemas JSON-LD).
