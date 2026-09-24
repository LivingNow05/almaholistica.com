/**
 * src/lib/countries.ts
 * Lector SSG memoizado y fuertemente tipado para el dataset de países (Hubs Internacionales).
 * Proyecto: Alma Holística (almaholistica.com)
 */

import countriesData from '../data/dataset_almaholistica_paises.json';
import type { CountryData } from '../types/country';
import type { SupportedCountry } from '../types/city';

/**
 * Normaliza un slug eliminando espacios, barras iniciales/finales y pasando a minúsculas.
 */
export function normalizeCountrySlug(slug: string): string {
  if (!slug || typeof slug !== 'string') return '';
  return slug
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '');
}

/**
 * Mapeo canónico de nombres de país aprobados hacia su identificador de slug.
 */
export const COUNTRY_NAME_TO_SLUG_MAP: Record<string, string> = {
  'Colombia': 'colombia',
  'México': 'mexico',
  'Costa Rica': 'costa-rica',
  'El Salvador': 'el-salvador',
  'Guatemala': 'guatemala',
  'Honduras': 'honduras',
  'Nicaragua': 'nicaragua',
  'Panamá': 'panama',
  'República Dominicana': 'republica-dominicana',
  'Argentina': 'argentina',
  'Bolivia': 'bolivia',
  'Brasil': 'brasil',
  'Chile': 'chile',
  'Ecuador': 'ecuador',
  'Paraguay': 'paraguay',
  'Perú': 'peru',
  'Uruguay': 'uruguay',
  'Venezuela': 'venezuela',
  'España': 'espana',
  'Estados Unidos': 'estados-unidos'
};

/**
 * Convierte el nombre de un país a su slug canónico (ej: "República Dominicana" -> "republica-dominicana").
 */
export function countryNameToSlug(countryName: string): string {
  if (!countryName || typeof countryName !== 'string') return '';
  const trimmed = countryName.trim();
  if (COUNTRY_NAME_TO_SLUG_MAP[trimmed]) {
    return COUNTRY_NAME_TO_SLUG_MAP[trimmed];
  }
  return trimmed
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// -------------------------------------------------------------
// Singleton Memoizado en Memoria (Cache)
// -------------------------------------------------------------
let cachedCountries: CountryData[] | null = null;
let cachedCountryBySlug: Map<string, CountryData> | null = null;
let cachedCountryByName: Map<string, CountryData> | null = null;

function initCountries(): CountryData[] {
  if (cachedCountries !== null) {
    return cachedCountries;
  }

  const list: CountryData[] = (countriesData as unknown as CountryData[]).map((c) => ({
    ...c,
    slug: normalizeCountrySlug(c.slug)
  }));

  const mapBySlug = new Map<string, CountryData>();
  const mapByName = new Map<string, CountryData>();

  for (const country of list) {
    mapBySlug.set(country.slug, country);
    // También indexar por el identificador corto (ej: "colombia" para "biodescodificacion-colombia")
    const shortSlug = country.slug.replace(/^biodescodificacion-/i, '');
    if (shortSlug && !mapBySlug.has(shortSlug)) {
      mapBySlug.set(shortSlug, country);
    }
    mapByName.set(country.pais.toLowerCase().trim(), country);
  }

  cachedCountries = list;
  cachedCountryBySlug = mapBySlug;
  cachedCountryByName = mapByName;

  return cachedCountries;
}

// -------------------------------------------------------------
// API Pública Exportada
// -------------------------------------------------------------

/**
 * Obtiene todos los 20 países tipados y cacheados.
 */
export function getCountries(): CountryData[] {
  return initCountries();
}

/**
 * Alias de getCountries para máxima consistencia de API.
 */
export function getAllCountries(): CountryData[] {
  return getCountries();
}

/**
 * Busca un país por su slug oficial (ej: "biodescodificacion-colombia" o "colombia").
 */
export function getCountryBySlug(slug: string): CountryData | undefined {
  if (!slug || typeof slug !== 'string') return undefined;
  initCountries();
  const normalized = normalizeCountrySlug(slug);
  return (
    cachedCountryBySlug?.get(normalized) ??
    cachedCountries?.find((c) => c.slug === normalized || c.slug === `biodescodificacion-${normalized}`)
  );
}

/**
 * Busca un país por su nombre (ej: "Colombia", "España", "República Dominicana").
 */
export function getCountryByName(name: string): CountryData | undefined {
  if (!name || typeof name !== 'string') return undefined;
  initCountries();
  const target = name.trim().toLowerCase();
  return (
    cachedCountryByName?.get(target) ??
    cachedCountries?.find((c) => c.pais.toLowerCase().trim() === target)
  );
}

/**
 * Retorna todos los slugs de hubs de países (ej: ["biodescodificacion-colombia", ...]).
 */
export function getCountrySlugs(): string[] {
  return getCountries().map((c) => c.slug);
}

/**
 * Invalida la caché en memoria (útil en pruebas).
 */
export function clearCountryCache(): void {
  cachedCountries = null;
  cachedCountryBySlug = null;
  cachedCountryByName = null;
}
