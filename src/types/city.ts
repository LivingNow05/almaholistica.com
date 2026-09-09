/**
 * src/types/city.ts
 * Interfaces y tipos estrictos para el dataset de ciudades (SEO Hiperlocal).
 * Proyecto: Alma Holística (almaholistica.com)
 */

/**
 * 20 países aprobados según requerimiento R1 (18 LATAM + España + Estados Unidos).
 */
export type SupportedCountry =
  | 'Colombia'
  | 'México'
  | 'Chile'
  | 'Argentina'
  | 'Perú'
  | 'Ecuador'
  | 'Bolivia'
  | 'Uruguay'
  | 'Paraguay'
  | 'Venezuela'
  | 'Costa Rica'
  | 'Panamá'
  | 'República Dominicana'
  | 'Guatemala'
  | 'El Salvador'
  | 'Honduras'
  | 'Nicaragua'
  | 'Brasil'
  | 'España'
  | 'Estados Unidos';

/**
 * Monedas locales oficiales según país para sesiones online.
 */
export type SupportedCurrency =
  | 'COP' // Colombia
  | 'MXN' // México
  | 'CLP' // Chile
  | 'ARS' // Argentina
  | 'PEN' // Perú
  | 'USD' // Ecuador, El Salvador, Panamá, EE.UU. (o internacional)
  | 'BOB' // Bolivia
  | 'UYU' // Uruguay
  | 'PYG' // Paraguay
  | 'VED' // Venezuela (o USD de referencia)
  | 'CRC' // Costa Rica
  | 'PAB' // Panamá
  | 'DOP' // República Dominicana
  | 'GTQ' // Guatemala
  | 'HNL' // Honduras
  | 'NIO' // Nicaragua
  | 'BRL' // Brasil
  | 'EUR'; // España

/**
 * Representación en crudo de una fila leída directamente de `dataset_almaholistica_ciudades.csv`.
 * Las cabeceras coinciden exactamente con las 9 columnas del CSV.
 */
export interface RawCityRow {
  readonly Dominio: string;
  readonly Categoría: string;
  readonly 'URL Final (Slug)': string;
  readonly 'H1 Título': string;
  readonly 'Meta Descripción': string;
  readonly País: string;
  readonly Moneda: string;
  readonly Rango_Precio_Sesion: string;
  readonly Historia_Local: string;
}

/**
 * Estructura tipada y normalizada de una ciudad consumida por la aplicación Astro,
 * generadores de rutas estáticas (`getStaticPaths`), metadatos y schemas JSON-LD.
 */
export interface CityData {
  /** Dominio canónico del sitio (ej: https://almaholistica.com) */
  readonly dominio: string;
  /** Categoría del servicio (ej: terapia-online, biodescodificacion) */
  readonly categoria: string;
  /** Slug limpio para la ruta URL (ej: bogota, madrid, miami) */
  readonly slug: string;
  /** Encabezado H1 principal optimizado para SEO local */
  readonly h1: string;
  /** Meta descripción para buscadores (140-160 caracteres aprox) */
  readonly metaDescripcion: string;
  /** País normalizado (de los 20 países soportados) */
  readonly pais: SupportedCountry | string;
  /** Código ISO de la moneda local */
  readonly moneda: SupportedCurrency | string;
  /** Rango estimado de precio de la sesión online (ej: '45€ - 75€', '$800 - $1,400 MXN') */
  readonly rangoPrecio: string;
  /** Narrativa contextualizada y empática para la ciudad */
  readonly historiaLocal: string;
}

/**
 * Props inyectadas por Astro en `src/pages/[slug].astro`.
 */
export interface CityRouteProps {
  readonly city: CityData;
}

/**
 * Estructura de retorno para `getStaticPaths` en Astro SSG.
 */
export interface CityStaticPath {
  readonly params: { readonly slug: string };
  readonly props: CityRouteProps;
}
