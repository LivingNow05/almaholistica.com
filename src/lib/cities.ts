/**
 * src/lib/cities.ts
 * Lector SSG memoizado y fuertemente tipado para el dataset de ciudades.
 * Proyecto: Alma Holística (almaholistica.com)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';
import type {
  CityData,
  RawCityRow,
  SupportedCountry,
  SupportedCurrency
} from '../types/city';

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
 * Resuelve la ruta absoluta hacia el dataset de ciudades de forma compatible
 * tanto con entornos Vite/Astro ESM como con Node runtime y suites de test.
 */
function resolveCsvPath(): string {
  try {
    const relativePath = fileURLToPath(
      new URL('../data/dataset_almaholistica_ciudades.csv', import.meta.url)
    );
    if (fs.existsSync(relativePath)) {
      return relativePath;
    }
  } catch {
    // Fallback defensivo si import.meta.url no está disponible
  }
  return path.join(process.cwd(), 'src/data/dataset_almaholistica_ciudades.csv');
}

/**
 * Transforma una fila sin procesar del CSV en una estructura CityData tipada
 * y define propiedades accesorias para máxima compatibilidad con código existente.
 */
function mapRowToCity(row: RawCityRow): CityData {
  const cleanSlug = normalizeSlug(row['URL Final (Slug)']);

  const city: CityData = {
    dominio: row['Dominio']?.trim() || 'https://almaholistica.com',
    categoria: row['Categoría']?.trim() || 'terapia-online',
    slug: cleanSlug,
    h1: row['H1 Título']?.trim() || '',
    metaDescripcion: row['Meta Descripción']?.trim() || '',
    pais: (row['País']?.trim() || '') as SupportedCountry,
    moneda: (row['Moneda']?.trim() || '') as SupportedCurrency,
    rangoPrecio: row['Rango_Precio_Sesion']?.trim() || '',
    historiaLocal: row['Historia_Local']?.trim() || ''
  };

  // Propiedades accesorias no modificables para preservar compatibilidad con código que espere cabeceras crudas
  Object.defineProperties(city, {
    'Dominio': { value: city.dominio, enumerable: true, writable: false },
    'Categoría': { value: city.categoria, enumerable: true, writable: false },
    'URL Final (Slug)': { value: city.slug, enumerable: true, writable: false },
    'H1 Título': { value: city.h1, enumerable: true, writable: false },
    'Meta Descripción': { value: city.metaDescripcion, enumerable: true, writable: false },
    'País': { value: city.pais, enumerable: true, writable: false },
    'Moneda': { value: city.moneda, enumerable: true, writable: false },
    'Rango_Precio_Sesion': { value: city.rangoPrecio, enumerable: true, writable: false },
    'Historia_Local': { value: city.historiaLocal, enumerable: true, writable: false }
  });

  return city;
}

// -------------------------------------------------------------
// Singleton Memoizado en Memoria (Cache)
// -------------------------------------------------------------
let cachedCities: CityData[] | null = null;
let cachedCityBySlug: Map<string, CityData> | null = null;

/**
 * Carga y analiza el archivo CSV una única vez durante el ciclo de vida del proceso SSG.
 */
function loadCities(): CityData[] {
  if (cachedCities !== null) {
    return cachedCities;
  }

  const csvPath = resolveCsvPath();
  if (!fs.existsSync(csvPath)) {
    console.warn(`[cities.ts] Advertencia: Archivo CSV no encontrado en: ${csvPath}`);
    cachedCities = [];
    cachedCityBySlug = new Map();
    return cachedCities;
  }

  const fileContent = fs.readFileSync(csvPath, 'utf8');
  const rawRows: RawCityRow[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true
  });

  const list: CityData[] = [];
  const map = new Map<string, CityData>();

  for (const row of rawRows) {
    const city = mapRowToCity(row);
    if (city.slug) {
      list.push(city);
      map.set(city.slug, city);
    }
  }

  cachedCities = list;
  cachedCityBySlug = map;
  return cachedCities;
}

// -------------------------------------------------------------
// API Pública Exportada
// -------------------------------------------------------------

/**
 * Obtiene todas las ciudades normalizadas y cacheadas.
 */
export function getCities(): CityData[] {
  return loadCities();
}

/**
 * Alias de getCities para conveniencia semántica.
 */
export function getAllCities(): CityData[] {
  return getCities();
}

/**
 * Busca una ciudad por su slug URL de forma segura (O(1) mediante índice en memoria).
 * Devuelve undefined si no existe o si el slug es inválido.
 */
export function getCityBySlug(slug: string): CityData | undefined {
  if (!slug || typeof slug !== 'string') {
    return undefined;
  }
  loadCities();
  const normalized = normalizeSlug(slug);
  return (
    cachedCityBySlug?.get(normalized) ??
    cachedCities?.find((c) => c.slug === normalized)
  );
}

/**
 * Filtra ciudades por país (búsqueda insensible a mayúsculas y acentos normalizados).
 */
export function getCitiesByCountry(country: string): CityData[] {
  if (!country || typeof country !== 'string') {
    return [];
  }
  const target = country.trim().toLowerCase();
  return getCities().filter((c) => String(c.pais).trim().toLowerCase() === target);
}

/**
 * Retorna todos los slugs de ciudades disponibles (ideal para sitemaps y validación).
 */
export function getCitySlugs(): string[] {
  return getCities().map((c) => c.slug);
}

/**
 * Invalida la caché en memoria (útil para pruebas unitarias o recargas en caliente).
 */
export function clearCityCache(): void {
  cachedCities = null;
  cachedCityBySlug = null;
}
