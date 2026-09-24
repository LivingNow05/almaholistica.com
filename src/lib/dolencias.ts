/**
 * src/lib/dolencias.ts
 * Lector SSG memoizado y fuertemente tipado para el catálogo de 45 dolencias.
 * Proyecto: Alma Holística (almaholistica.com)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  DolenciaData,
  BodilySystem,
  DolenciaSummary
} from '../types/dolencia';

/**
 * Normaliza un slug eliminando espacios, barras iniciales/finales y pasando a minúsculas.
 */
export function normalizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') return '';
  return slug
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '');
}

/**
 * Resuelve la ruta absoluta hacia el dataset de dolencias de forma compatible
 * con entornos Vite/Astro ESM, Node runtime y suites de test.
 */
function resolveJsonPath(): string {
  try {
    const relativePath = fileURLToPath(
      new URL('../data/dataset_biodescodificacion_dolencias.json', import.meta.url)
    );
    if (fs.existsSync(relativePath)) {
      return relativePath;
    }
  } catch {
    // Fallback defensivo si import.meta.url no está disponible
  }
  return path.join(process.cwd(), 'src/data/dataset_biodescodificacion_dolencias.json');
}

// -------------------------------------------------------------
// Singleton Memoizado en Memoria (Cache)
// -------------------------------------------------------------
let cachedDolencias: DolenciaData[] | null = null;
let cachedDolenciasBySlug: Map<string, DolenciaData> | null = null;

/**
 * Carga y analiza el archivo JSON de dolencias una única vez durante el ciclo de vida SSG.
 */
function loadDolencias(): DolenciaData[] {
  if (cachedDolencias !== null) {
    return cachedDolencias;
  }

  const jsonPath = resolveJsonPath();
  if (!fs.existsSync(jsonPath)) {
    console.warn(`[dolencias.ts] Advertencia: Archivo JSON no encontrado en: ${jsonPath}`);
    cachedDolencias = [];
    cachedDolenciasBySlug = new Map();
    return cachedDolencias;
  }

  const fileContent = fs.readFileSync(jsonPath, 'utf8');
  const rawItems: DolenciaData[] = JSON.parse(fileContent);

  const list: DolenciaData[] = [];
  const map = new Map<string, DolenciaData>();

  for (const item of rawItems) {
    const cleanSlug = normalizeSlug(item.slug);
    const dolencia: DolenciaData = {
      ...item,
      slug: cleanSlug
    };
    list.push(dolencia);
    map.set(cleanSlug, dolencia);
  }

  cachedDolencias = list;
  cachedDolenciasBySlug = map;
  return cachedDolencias;
}

// -------------------------------------------------------------
// API Pública Exportada
// -------------------------------------------------------------

/**
 * Retorna las 45 dolencias completas estructuradas y en memoria.
 */
export function getDolencias(): DolenciaData[] {
  return loadDolencias();
}

/**
 * Alias semántico de getDolencias.
 */
export function getAllDolencias(): DolenciaData[] {
  return getDolencias();
}

/**
 * Busca una dolencia por su slug de manera segura (O(1) vía Map con fallback a Array.find).
 * Devuelve undefined si no existe o si el slug es inválido.
 */
export function getDolenciaBySlug(slug: string): DolenciaData | undefined {
  if (!slug || typeof slug !== 'string') {
    return undefined;
  }
  loadDolencias();
  const normalized = normalizeSlug(slug);
  return (
    cachedDolenciasBySlug?.get(normalized) ??
    cachedDolencias?.find((d) => d.slug === normalized)
  );
}

/**
 * Filtra dolencias por su sistema corporal (ej: 'Digestivo', 'Nervioso / Emocional').
 */
export function getDolenciasBySistema(sistema: string): DolenciaData[] {
  if (!sistema || typeof sistema !== 'string') {
    return [];
  }
  const target = sistema.trim().toLowerCase();
  return getDolencias().filter(
    (d) => d.sistema.trim().toLowerCase() === target
  );
}

/**
 * Retorna el listado único de los sistemas corporales cubiertos en el catálogo.
 */
export function getSistemas(): BodilySystem[] {
  const dolencias = getDolencias();
  const unique = Array.from(new Set(dolencias.map((d) => d.sistema as BodilySystem)));
  return unique;
}

/**
 * Alias de getSistemas para compatibilidad con importadores.
 */
export function getAllSistemas(): BodilySystem[] {
  return getSistemas();
}

/**
 * Retorna un listado simplificado de dolencias optimizado para barras de búsqueda o índices.
 */
export function getDolenciasSummaries(): DolenciaSummary[] {
  return getDolencias().map((d) => ({
    slug: d.slug,
    nombre: d.nombre,
    sistema: d.sistema,
    conflictoEmocional: d.conflictoEmocional
  }));
}

/**
 * Retorna todos los slugs de dolencias (útil para generación de sitemaps y validación).
 */
export function getDolenciaSlugs(): string[] {
  return getDolencias().map((d) => d.slug);
}

/**
 * Invalida la caché en memoria (útil para pruebas unitarias o recargas en caliente).
 */
export function clearDolenciaCache(): void {
  cachedDolencias = null;
  cachedDolenciasBySlug = null;
}

// -------------------------------------------------------------
// Paleta Cromática Biológica Semántica (Hito M1)
// -------------------------------------------------------------

export type BiologicalFamily = 'digestivo' | 'osteoarticular' | 'respiratorio' | 'nervioso';

export interface BiologicalTheme {
  family: BiologicalFamily;
  name: string;
  badgeClass: string;
  borderClass: string;
  dotClass: string;
  accentHexLight: string;
  accentHexDark: string;
  badgeBgHexLight: string;
  badgeBgHexDark: string;
  badgeBorderHexLight: string;
  badgeBorderHexDark: string;
  textHexLight: string;
  textHexDark: string;
  surfaceHexLight: string;
  surfaceHexDark: string;
}

export const BIOLOGICAL_THEMES: Record<BiologicalFamily, BiologicalTheme> = {
  digestivo: {
    family: 'digestivo',
    name: 'Sistema Digestivo & Metabólico',
    badgeClass: 'bio-badge-digestivo',
    borderClass: 'bio-border-digestivo',
    dotClass: 'bio-dot-digestivo',
    accentHexLight: '#2E854B',
    accentHexDark: '#3E9B67',
    badgeBgHexLight: '#E8F5EC',
    badgeBgHexDark: '#0C1F16',
    badgeBorderHexLight: '#A8D8B6',
    badgeBorderHexDark: '#1A3D2C',
    textHexLight: '#13522E',
    textHexDark: '#6AC894',
    surfaceHexLight: '#F3FAF5',
    surfaceHexDark: '#0E241A'
  },
  osteoarticular: {
    family: 'osteoarticular',
    name: 'Sistema Osteoarticular & Circulatorio',
    badgeClass: 'bio-badge-osteoarticular',
    borderClass: 'bio-border-osteoarticular',
    dotClass: 'bio-dot-osteoarticular',
    accentHexLight: '#C25E3E',
    accentHexDark: '#C86241',
    badgeBgHexLight: '#FDF0EA',
    badgeBgHexDark: '#24120D',
    badgeBorderHexLight: '#ECC3B2',
    badgeBorderHexDark: '#4A2419',
    textHexLight: '#8A3618',
    textHexDark: '#E88F71',
    surfaceHexLight: '#FAF2EE',
    surfaceHexDark: '#28150F'
  },
  respiratorio: {
    family: 'respiratorio',
    name: 'Sistema Respiratorio',
    badgeClass: 'bio-badge-respiratorio',
    borderClass: 'bio-border-respiratorio',
    dotClass: 'bio-dot-respiratorio',
    accentHexLight: '#2B74AA',
    accentHexDark: '#3688C7',
    badgeBgHexLight: '#EAF2F9',
    badgeBgHexDark: '#0B1A28',
    badgeBorderHexLight: '#AECBE5',
    badgeBorderHexDark: '#19354E',
    textHexLight: '#124B73',
    textHexDark: '#6BAEE3',
    surfaceHexLight: '#F1F6FB',
    surfaceHexDark: '#0E2032'
  },
  nervioso: {
    family: 'nervioso',
    name: 'Sistema Nervioso & Psicosomático',
    badgeClass: 'bio-badge-nervioso',
    borderClass: 'bio-border-nervioso',
    dotClass: 'bio-dot-nervioso',
    accentHexLight: '#7C4499',
    accentHexDark: '#8E55B0',
    badgeBgHexLight: '#F4EFF9',
    badgeBgHexDark: '#1B0F28',
    badgeBorderHexLight: '#D0BEE0',
    badgeBorderHexDark: '#392051',
    textHexLight: '#532A78',
    textHexDark: '#BC91DF',
    surfaceHexLight: '#F7F3FA',
    surfaceHexDark: '#211332'
  }
};

/**
 * Normaliza y clasifica un sistema biológico corporal (de los 7 sistemas del dataset)
 * en una de las 4 familias biológicas visuales.
 */
export function resolveBiologicalFamily(sistema: string): BiologicalFamily {
  if (!sistema || typeof sistema !== 'string') {
    return 'nervioso';
  }
  const norm = sistema.toLowerCase().trim();

  // 1. Familia Digestivo: Digestivo + Endocrino / Metabólico
  if (
    norm.includes('digestiv') ||
    norm.includes('endocrin') ||
    norm.includes('metaból') ||
    norm.includes('metabol')
  ) {
    return 'digestivo';
  }

  // 2. Familia Osteoarticular: Osteoarticular + Inmunológico / Circulatorio
  if (
    norm.includes('osteo') ||
    norm.includes('articular') ||
    norm.includes('inmuno') ||
    norm.includes('circulat')
  ) {
    return 'osteoarticular';
  }

  // 3. Familia Respiratorio: Respiratorio
  if (norm.includes('respirat')) {
    return 'respiratorio';
  }

  // 4. Familia Nervioso / Psicosomático: Nervioso / Emocional + Dermatológico + default
  return 'nervioso';
}

/**
 * Retorna la familia semántica biológica ('digestivo' | 'osteoarticular' | 'respiratorio' | 'nervioso')
 * correspondiente al sistema corporal indicado.
 * Si se invoca con el segundo argumento full=true, retorna el objeto de configuración completo BiologicalTheme.
 */
export function getBiologicalTheme(sistema: string): BiologicalFamily;
export function getBiologicalTheme(sistema: string, full: true): BiologicalTheme;
export function getBiologicalTheme(sistema: string, full?: boolean): BiologicalFamily | BiologicalTheme {
  const family = resolveBiologicalFamily(sistema);
  if (full) {
    return BIOLOGICAL_THEMES[family];
  }
  return family;
}

/**
 * Retorna el objeto completo de tema biológico para un sistema dado.
 */
export function getBiologicalThemeDetails(sistema: string): BiologicalTheme {
  const family = resolveBiologicalFamily(sistema);
  return BIOLOGICAL_THEMES[family];
}

/**
 * Retorna la clase CSS del borde superior (3px) para el sistema.
 */
export function getBiologicalBorderClass(sistema: string): string {
  const family = resolveBiologicalFamily(sistema);
  return BIOLOGICAL_THEMES[family].borderClass;
}

/**
 * Retorna la clase CSS del badge de categoría para el sistema.
 */
export function getBiologicalBadgeClass(sistema: string): string {
  const family = resolveBiologicalFamily(sistema);
  return BIOLOGICAL_THEMES[family].badgeClass;
}

// -------------------------------------------------------------
// Bloque Canónico de Citabilidad RAG (Hito GEO-M1 / R3)
// -------------------------------------------------------------

export interface DolenciaRagBlock {
  readonly definitionPart: string;
  readonly protocolPart: string;
  readonly fullPassage: string;
  readonly wordCount: number;
  readonly directAnswer: string;
  readonly biologicalPhasesAndProtocol: string;
  readonly fullText: string;
}

/**
 * Retorna el bloque canónico de citabilidad RAG calibrado (134-167 palabras) para motores de IA (R3).
 * Estructura de 2 partes:
 * - Parte 1 (40-50 palabras directas): Patología + Sistema biológico + Conflicto emocional raíz + Sentido biológico adaptativo.
 * - Parte 2 (80-100 palabras concisas): Fases biológicas (estrés activo simpaticotónico vs vagotonía de reparación) + protocolo individual de reprogramación bioemocional 1 a 1 de Alma Holística + descargo médico alopático.
 */
export function getDolenciaRagBlock(dolencia: DolenciaData): DolenciaRagBlock {
  const nombre = dolencia.nombre.trim();
  const sistema = dolencia.sistema.trim().toLowerCase();
  const conflicto = dolencia.conflictoEmocional.replace(/["«»]/g, '').split('.')[0].trim();
  const sentido = dolencia.sentidoBiologico.replace(/["«»]/g, '').split('.')[0].trim();

  const definitionPart = `La biodescodificación de ${nombre} (sistema ${sistema}) aborda el conflicto biológico de ${conflicto.toLowerCase()}. Su sentido adaptativo consiste en ${sentido.toLowerCase()}.`;

  const protocolPart = `Fisiológicamente, el síntoma transita a través de dos fases biológicas definidas: la fase de estrés activo simpaticotónico con respuesta adaptativa celular involuntaria, y la fase de vagotonía o reparación, momento en que al distenderse el conflicto se manifiestan la inflamación, el cansancio y la regeneración orgánica. El protocolo de reprogramación bioemocional de Alma Holística interviene guiando al consultante a hacer consciente el choque original y desactivar la alerta en sesiones online 1 a 1. Este enfoque complementario aborda el plano psicosomático sin sustituir en ningún caso el diagnóstico, tratamiento farmacológico ni prescripción facultativa de la medicina alopática.`;

  const fullPassage = `${definitionPart} ${protocolPart}`;
  const wordCount = fullPassage.trim().split(/\s+/).filter(Boolean).length;

  return {
    definitionPart,
    protocolPart,
    fullPassage,
    wordCount,
    directAnswer: definitionPart,
    biologicalPhasesAndProtocol: protocolPart,
    fullText: fullPassage
  };
}

/**
 * Alias de compatibilidad semántica con contratos de interfaz.
 */
export const generateRagCitationBlock = getDolenciaRagBlock;

// -------------------------------------------------------------
// Imágenes Somáticas Realistas para Páginas de Dolencias (Anti-CLS)
// -------------------------------------------------------------

export interface DolenciaImageMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Retorna la imagen somática realista y metadatos anti-CLS para cada dolencia o sistema biológico.
 */
export function getDolenciaImage(slug: string, sistema: string, nombre: string): DolenciaImageMeta {
  const s = (slug || '').toLowerCase();

  // 1. Asignaciones específicas por síntoma prioritario
  if (s === 'ansiedad' || s === 'ataques-de-panico' || s === 'angustia-opresion-pecho' || s === 'depresion') {
    return {
      src: '/images/sintoma-estres-ansiedad.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y respuesta somática`,
      width: 400,
      height: 400,
    };
  }
  if (s === 'insomnio') {
    return {
      src: '/images/sintoma-insomnio.webp',
      alt: `Fotografía realista sobre biodescodificación de insomnio y descanso reparador`,
      width: 500,
      height: 500,
    };
  }
  if (s === 'migrana' || s === 'bruxismo') {
    return {
      src: '/images/sintoma-migrana-cefalea.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y tensión cefálica`,
      width: 400,
      height: 400,
    };
  }
  if (
    s === 'gastritis' ||
    s === 'colon-irritable' ||
    s === 'reflujo-acidez' ||
    s === 'ulcera-gastrica' ||
    s === 'estrenimiento-cronico' ||
    s === 'higado-graso' ||
    s === 'hemorroides'
  ) {
    return {
      src: '/images/sintoma-gastritis-digestivo.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y sistema digestivo`,
      width: 400,
      height: 400,
    };
  }
  if (s === 'artritis-artrosis' || s === 'dolor-rodilla' || s === 'tunel-carpiano') {
    return {
      src: '/images/sintoma-articulaciones.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y articulaciones`,
      width: 500,
      height: 500,
    };
  }
  if (
    s === 'lumbalgia' ||
    s === 'ciatica' ||
    s === 'dolor-cervical-cuello' ||
    s === 'fibromialgia' ||
    s === 'tendinitis-hombro'
  ) {
    return {
      src: '/images/sintoma-espalda-tension.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y columna vertebral`,
      width: 400,
      height: 400,
    };
  }

  // 2. Fallbacks de alta fidelidad por sistema biológico
  const sis = (sistema || '').toLowerCase();
  if (sis.includes('respiratori')) {
    return {
      src: '/images/sintoma-respiratorio.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y función respiratoria`,
      width: 500,
      height: 500,
    };
  }
  if (sis.includes('dermatol')) {
    return {
      src: '/images/sintoma-dermatologico.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y piel`,
      width: 500,
      height: 500,
    };
  }
  if (sis.includes('endocrin') || sis.includes('metab')) {
    return {
      src: '/images/sintoma-endocrino.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y regulación metabólica`,
      width: 500,
      height: 500,
    };
  }
  if (sis.includes('inmunol') || sis.includes('circulat')) {
    return {
      src: '/images/sintoma-circulatorio.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y circulación sanguínea`,
      width: 500,
      height: 500,
    };
  }
  if (sis.includes('osteoart')) {
    return {
      src: '/images/sintoma-espalda-tension.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y sistema osteoarticular`,
      width: 400,
      height: 400,
    };
  }
  if (sis.includes('digestiv')) {
    return {
      src: '/images/sintoma-gastritis-digestivo.webp',
      alt: `Fotografía realista sobre biodescodificación de ${nombre} y sistema digestivo`,
      width: 400,
      height: 400,
    };
  }

  return {
    src: '/images/sintoma-estres-ansiedad.webp',
    alt: `Fotografía realista sobre biodescodificación de ${nombre}`,
    width: 400,
    height: 400,
  };
}



