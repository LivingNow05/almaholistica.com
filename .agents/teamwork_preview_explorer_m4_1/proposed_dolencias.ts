/**
 * src/lib/dolencias.ts (Propuesta de Implementación)
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
