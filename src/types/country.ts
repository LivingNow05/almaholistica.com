/**
 * src/types/country.ts
 * Interfaces y tipos estrictos para el dataset de países (Silos Geográficos / Hubs Internacionales).
 * Proyecto: Alma Holística (almaholistica.com)
 */

import type { SupportedCountry, SupportedCurrency } from './city';

export interface CountrySpecialist {
  readonly nombre: string;
  readonly cargo: string;
  readonly registro: string;
  readonly experiencia: string;
  readonly formacion: string;
  readonly avalCientifico: string;
}

export interface CountryFAQ {
  readonly pregunta: string;
  readonly respuesta: string;
}

export interface CountryCityItem {
  readonly slug: string;
  readonly nombre: string;
  readonly precio: string;
}

export interface CountryData {
  readonly pais: SupportedCountry;
  readonly slug: string; // ej: "biodescodificacion-colombia"
  readonly h1: string;
  readonly metaDescripcion: string;
  readonly moneda: SupportedCurrency;
  readonly rangoPrecio: string;
  readonly husoHorario: string; // ej: "COT (UTC-5)"
  readonly pasarelasPago: readonly string[]; // ej: ["PSE", "Bancolombia", "Nequi", "Tarjetas"]
  readonly marcoRegulatorio: string; // Contexto ético/legal de terapias complementarias YMYL
  readonly descargoResponsabilidad: string; // Descargo ético y médico estricto
  readonly definicionClinica: string;
  readonly especialistaAsignado: CountrySpecialist;
  readonly ciudades?: readonly CountryCityItem[];
  readonly faqs: readonly CountryFAQ[]; // Mínimo 3 FAQs con profundo E-E-A-T
}

export interface CountryRouteProps {
  readonly country: CountryData;
}

export interface CountryStaticPath {
  readonly params: { readonly slug: string };
  readonly props: {
    readonly type: 'country';
    readonly country: CountryData;
    readonly city: null;
  };
}
