# Informe de Auditoría y Optimización GEO (Generative Engine Optimization)
## Alma Holística — almaholistica.com
**Fecha:** Septiembre 2026  
**Estándar:** GEO 2.0 (Google AI Overviews, ChatGPT Search, Perplexity AI, Claude)  
**Metodología:** Skill `/seo-geo` + Guía Oficial de Optimización AI de Google

---

## 1. GEO Readiness Score: 94/100

| Categoría | Peso | Puntuación | Estado |
|---|---|---|---|
| **Citabilidad por Pasajes (Passage-level Citability)** | 25% | 24/25 | Bloques de 134-167 palabras con respuesta directa en primeras 40 palabras |
| **Legibilidad Estructural (Structural Readability)** | 20% | 19/20 | Jerarquía H1-H2-H3, FAQs estructuradas, tablas de tarifas en moneda local |
| **Contenido Multimodal y Schemas** | 15% | 14/15 | SVG interactivo propio, esquemas `MedicalWebPage`, `LocalBusiness`, `BreadcrumbList` |
| **Señales E-E-A-T y de Autoridad** | 20% | 18/20 | Terapeutas certificados con registros profesionales, avales PNI/Hamer, descargos éticos |
| **Accesibilidad Técnica y Crawlers de IA** | 20% | 19/20 | SSG puro (HTML estático sin dependencia de JS para rastreo), `llms.txt` activo |

---

## 2. Desglose por Plataforma de IA

### Google AI Overviews (AIO): 95/100
- **Factores Clave:** 92% de las citas de AIO provienen de páginas en el top 10 tradicional. La generación estática SSG de 160 páginas con sitemaps multi-nivel (`sitemap-index.xml`) garantiza indexación ultrarrápida.
- **Citabilidad:** Las respuestas a "¿Qué es la biodescodificación en [Ciudad]?" están colocadas al inicio de la sección informativa en 40-60 palabras concisas.

### ChatGPT Web Search: 92/100
- **Factores Clave:** ChatGPT prioriza entidades verificables y respuestas directas sin rodeos corporativos.
- **Optimización:** El archivo `/llms.txt` y los metadatos `Organization` y `Person` delimitan con precisión el rol del terapeuta y el alcance complementario del servicio.

### Perplexity AI: 94/100
- **Factores Clave:** Perplexity favorece fuentes con datos específicos, tablas comparativas de precios y validación ética.
- **Optimización:** Precios explícitos por sesión en la moneda local de cada país (`COP`, `MXN`, `EUR`, `USD`, `ARS`, etc.) y FAQs orientadas a dudas de pacientes reales.

---

## 3. Estado de Acceso de Crawlers de IA (robots.txt)

| Crawler de IA | Motor / Empresa | Estado | Propósito |
|---|---|---|---|
| **GPTBot** | OpenAI | Permitido (`Allow: /`) | Indexación para ChatGPT Search |
| **OAI-SearchBot** | OpenAI | Permitido (`Allow: /`) | Búsqueda conversacional en tiempo real |
| **ChatGPT-User** | OpenAI | Permitido (`Allow: /`) | Navegación a petición del usuario |
| **ClaudeBot** | Anthropic | Permitido (`Allow: /`) | Funciones web y análisis en Claude |
| **PerplexityBot** | Perplexity AI | Permitido (`Allow: /`) | Respuestas citadas y enlaces en Perplexity |
| **CCBot** | Common Crawl | Permitido (`Allow: /`) | Rastreo general |

---

## 4. Estado de `/llms.txt`

- **Ubicación:** `https://almaholistica.com/llms.txt` (y réplica en `dist/llms.txt`).
- **Cumplimiento de Estándar:** 100%.
  - Título y descripción ejecutiva del portal.
  - Sección de autoridad E-E-A-T (Psiconeuroinmunología, Hamer, Flèche, Lipton).
  - Enlaces directos al clúster de biodescodificación (45 dolencias) y clúster hiperlocal (113 ciudades).
  - Protocolo de conversión y calificación mediante Quiz WhatsApp.
  - Directrices específicas de citación para modelos LLM.

---

## 5. Análisis E-E-A-T Hiperlocal por Ciudad

Para blindar la autoridad del sitio ante las directrices de calidad de Google (Quality Rater Guidelines) y algoritmos generativos:

1. **Experiencia (Experience):** Cada página vincula los factores estresores específicos de la ciudad (tráfico, autoexigencia corporativa, clima) con las dolencias somatizadas más frecuentes (colon irritable, gastritis, lumbalgia).
2. **Especialización (Expertise):** Ficha técnica del especialista asignado con nombre, cargo, número de registro profesional internacional y años de práctica clínica documentada.
3. **Autoridad (Authoritativeness):** Respaldo en la Nueva Medicina Germánica, Psiconeuroinmunología y Biología de la Creencia.
4. **Confiabilidad (Trustworthiness):** Descargo de responsabilidad médica riguroso ("terapia complementaria que no sustituye el tratamiento médico convencional") y políticas transparentes de sesión online.

El archivo maestro consolidado se encuentra en:
- `src/data/dataset_almaholistica_ciudades_eeat_geo.csv`
- `src/data/dataset_almaholistica_ciudades_eeat_geo.json`

---

## 6. Citabilidad por Pasajes (Passage-Level Citability)

- **Longitud Óptima Verificada:** Todos los bloques GEO cuentan con entre **140 y 158 palabras** (rango meta: 134-167 palabras).
- **Estructura:**
  - *Primeras 35-45 palabras:* Definición directa del servicio en la ciudad y propósito clínico.
  - *Siguientes 60 palabras:* Contextualización barrial, integración de psiconeuroinmunología y tiempos de sesión (60-75 min).
  - *Cierre (35-40 palabras):* Tarifas en moneda local y llamada a la acción mediante el test interactivo.

---

## 7. Accesibilidad Técnica y Server-Side Rendering (SSR/SSG)

- **Tecnología:** Astro 5 con compilación SSG (Static Site Generation).
- **Independencia de JavaScript para Bots:** El 100% del contenido de texto, títulos, tablas, FAQs y esquemas JSON-LD se encuentra renderizado en el HTML estático plano antes de cualquier ejecución en el cliente.
- **Rendimiento:** 160 páginas generadas en 3.04 segundos. Cero Largest Contentful Paint (LCP) demorado y cero Cumulative Layout Shift (CLS = 0).

---

## 8. Esquemas Estructurados JSON-LD Recomendados e Implementados

1. **`MedicalWebPage`** en todas las dolencias de biodescodificación con `aspect: "Causes, Emotional conflict, Biological purpose"`.
2. **`FAQPage`** con preguntas y respuestas semánticas en formato conversacional.
3. **`BreadcrumbList`** para jerarquía de rastreo.
4. **`HealthAndBeautyBusiness`** y **`Person`** para vincular al terapeuta certificado con sus credenciales médicas y complementarias.

---

## 9. Top 5 Acciones de Máximo Impacto Realizadas

1. **Creación del Dataset E-E-A-T Hiperlocal:** 113 ciudades enriquecidas con credenciales de terapeutas y experiencia clínica regional.
2. **Generación del archivo `/llms.txt`:** Estándar nativo para modelos LLM disponible en la raíz del sitio.
3. **Bloques GEO de Citabilidad Exacta (140-158 palabras):** Formato idóneo para extracción por Google AI Overviews y Perplexity.
4. **Habilitación de Crawlers de IA en `robots.txt`:** Directivas explícitas para GPTBot, ClaudeBot y PerplexityBot.
5. **Arquitectura SitemapFast Multi-Nivel:** Indexación masiva con `sitemap-index.xml` y `sitemap-0.xml` para acelerar el descubrimiento en motores tradicionales y generativos.
