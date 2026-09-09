/**
 * src/types/dolencia.ts
 * Interfaces y tipos estrictos para el catálogo de 45 dolencias de Biodescodificación.
 * Proyecto: Alma Holística (almaholistica.com)
 */

/**
 * Los 7 sistemas biológicos y emocionales cubiertos en el catálogo.
 */
export type BodilySystem =
  | 'Digestivo'
  | 'Nervioso / Emocional'
  | 'Osteoarticular'
  | 'Dermatológico'
  | 'Respiratorio'
  | 'Endocrino / Metabólico'
  | 'Inmunológico / Circulatorio';

/**
 * Estructura de pregunta frecuente para inyección en Schema FAQPage y accordions UI.
 */
export interface FAQItem {
  /** Pregunta formulada por el usuario/consultante */
  readonly pregunta: string;
  /** Respuesta fundamentada en biodescodificación y terapia holística */
  readonly respuesta: string;
}

/**
 * Representación estructurada completa de una patología física o emocional en biodescodificación.
 */
export interface DolenciaData {
  /** Slug URL-safe en minúsculas y sin acentos (ej: gastritis, ansiedad, colon-irritable) */
  readonly slug: string;
  /** Nombre común formal de la patología o síntoma (ej: Gastritis, Ansiedad generalizada) */
  readonly nombre: string;
  /** Sistema corporal al que pertenece la dolencia */
  readonly sistema: BodilySystem | string;
  /** Conflicto biológico/emocional inconsciente desencadenante */
  readonly conflictoEmocional: string;
  /** Sentido o propósito biológico de supervivencia que busca el síntoma */
  readonly sentidoBiologico: string;
  /** Pauta de reprogramación mental, toma de conciencia o afirmación terapéutica */
  readonly reprogramacion: string;
  /** Mínimo 3 preguntas de introspección para que el consultante explore su conflicto */
  readonly preguntasReflexion: readonly string[];
  /** Mínimo 3 FAQs estructuradas para rich snippets (FAQPage Schema) */
  readonly faqs: readonly FAQItem[];
  /** Mensaje persuasivo o gancho para incentivar a iniciar el WhatsApp Quiz Modal */
  readonly ganchoAgendamiento: string;
}

/**
 * Props inyectadas por Astro en `src/pages/biodescodificacion/[slug].astro`.
 */
export interface DolenciaRouteProps {
  readonly dolencia: DolenciaData;
}

/**
 * Estructura de retorno para `getStaticPaths` en Astro SSG para dolencias.
 */
export interface DolenciaStaticPath {
  readonly params: { readonly slug: string };
  readonly props: DolenciaRouteProps;
}

/**
 * Resumen de dolencia para índices, buscadores y tarjetas de navegación rápida.
 */
export type DolenciaSummary = Pick<DolenciaData, 'slug' | 'nombre' | 'sistema' | 'conflictoEmocional'>;
