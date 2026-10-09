/**
 * src/lib/schema.ts
 * Generadores puros de Schema.org JSON-LD para Alma Holística (almaholistica.com).
 * 
 * Cumple con R4 (Milestone M5), los contratos de arquitectura y la suite E2E:
 * - MedicalWebPage (patologías de biodescodificación con sentido biológico y conflicto)
 * - FAQPage (preguntas frecuentes estructuradas)
 * - BreadcrumbList (jerarquía de migas de pan)
 * - HealthAndBeautyBusiness / LocalBusiness (servicios hiperlocales con moneda y precios)
 */

import type { CityData } from '../types/city';
import type { CountryData } from '../types/country';
import type { DolenciaData, FAQItem } from '../types/dolencia';
import { SITE_CONFIG } from '../config/site';

/**
 * Mapeo de códigos CIE-10 (ICD-10) oficiales para las 45 patologías clínicas.
 */
export const DOLENCIAS_CIE10: Record<string, string> = {
  'gastritis': 'K29.7',
  'colon-irritable': 'K58.9',
  'reflujo-acidez': 'K21.9',
  'estrenimiento-cronico': 'K59.0',
  'ulcera-gastrica': 'K25.9',
  'higado-graso': 'K76.0',
  'hemorroides': 'K64.9',
  'ansiedad': 'F41.1',
  'insomnio': 'G47.0',
  'ataques-de-panico': 'F41.0',
  'depresion': 'F32.9',
  'bruxismo': 'F45.8',
  'angustia-opresion-pecho': 'R07.9',
  'lumbalgia': 'M54.5',
  'ciatica': 'M54.3',
  'cervicalgia': 'M54.2',
  'tendinitis': 'M77.9',
  'artritis': 'M06.9',
  'artrosis': 'M19.9',
  'fibromialgia': 'M79.7',
  'hernia-discal': 'M51.2',
  'dermatitis': 'L20.9',
  'psoriasis': 'L40.0',
  'acne': 'L70.0',
  'alopecia': 'L65.9',
  'herpes': 'B00.9',
  'rosacea': 'L71.9',
  'asma': 'J45.9',
  'rinitis-alergica': 'J30.4',
  'sinusitis': 'J32.9',
  'bronquitis-cronica': 'J42',
  'faringitis-disfonia': 'J02.9',
  'hipotiroidismo': 'E03.9',
  'hipertiroidismo': 'E05.9',
  'sobrepeso-retencion': 'E66.9',
  'resistencia-insulina': 'E11.9',
  'ovario-poliquistico': 'E28.2',
  'nodulos-tiroideos': 'E04.1',
  'migrana': 'G43.9',
  'hipertension': 'I10',
  'cistitis-recurrente': 'N30.9',
  'vertigo-tinnitus': 'H81.9',
  'alergias-alimentarias': 'K52.2',
  'fatiga-cronica': 'R53.82',
  'varices-circulacion': 'I83.9'
};

/**
 * Elemento de miga de pan para BreadcrumbList.
 */
export interface BreadcrumbItem {
  readonly name: string;
  readonly url: string;
}

/**
 * Estructura de esquema MedicalWebPage según Schema.org.
 */
export interface MedicalWebPageSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'MedicalWebPage';
  readonly name: string;
  readonly url: string;
  readonly about: {
    readonly '@type': 'MedicalCondition';
    readonly name: string;
    readonly code?: {
      readonly '@type': 'MedicalCode';
      readonly code: string;
      readonly codingSystem: 'ICD-10';
    };
    readonly associatedPathophysiology: string;
    readonly possibleTreatment: {
      readonly '@type': 'MedicalTherapy';
      readonly name: string;
    };
  };
  readonly description: string;
}

/**
 * Estructura de esquema FAQPage según Schema.org.
 */
export interface FAQPageSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'FAQPage';
  readonly mainEntity: Array<{
    readonly '@type': 'Question';
    readonly name: string;
    readonly acceptedAnswer: {
      readonly '@type': 'Answer';
      readonly text: string;
    };
  }>;
}

/**
 * Estructura de esquema BreadcrumbList según Schema.org.
 */
export interface BreadcrumbListSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'BreadcrumbList';
  readonly itemListElement: Array<{
    readonly '@type': 'ListItem';
    readonly position: number;
    readonly name: string;
    readonly item: string;
  }>;
}

/**
 * Estructura de esquema HealthAndBeautyBusiness / LocalBusiness según Schema.org.
 */
export interface LocalBusinessSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'HealthAndBeautyBusiness';
  readonly name: string;
  readonly url: string;
  readonly priceRange: string;
  readonly currenciesAccepted: string;
  readonly address: {
    readonly '@type': 'PostalAddress';
    readonly addressCountry: string;
    readonly addressLocality: string;
  };
  readonly description: string;
  readonly telephone: string;
  readonly image: string;
  readonly areaServed: {
    readonly '@type': 'City';
    readonly name: string;
    readonly containedInPlace: {
      readonly '@type': 'Country';
      readonly name: string;
    };
  };
  readonly aggregateRating?: {
    readonly '@type': 'AggregateRating';
    readonly ratingValue: string;
    readonly reviewCount: string;
    readonly bestRating: string;
    readonly worstRating: string;
  };
  readonly hasMap?: string;
  readonly sameAs?: readonly string[];
}

/**
 * Genera el esquema JSON-LD MedicalWebPage para una dolencia de biodescodificación.
 * Mapea el conflicto biológico inconsciente como descripción, el sentido biológico
 * como fisiopatología asociada y la terapia bioemocional como tratamiento posible.
 */
export function buildMedicalWebPageSchema(
  dolencia: DolenciaData,
  canonicalUrl: string,
  cie10Code?: string
): MedicalWebPageSchema {
  const code = cie10Code || dolencia.codigoCie10 || (dolencia.slug ? DOLENCIAS_CIE10[dolencia.slug] : undefined);
  const aboutNode: any = {
    '@type': 'MedicalCondition',
    name: dolencia.nombre,
    associatedPathophysiology: dolencia.sentidoBiologico,
    possibleTreatment: {
      '@type': 'MedicalTherapy',
      name: 'Biodescodificación y Reprogramación Bioemocional',
    },
  };

  if (code) {
    aboutNode.code = {
      '@type': 'MedicalCode',
      code,
      codingSystem: 'ICD-10',
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `Biodescodificación de ${dolencia.nombre}`,
    url: canonicalUrl,
    about: aboutNode,
    description: dolencia.conflictoEmocional,
  };
}

/**
 * Genera el esquema JSON-LD MedicalWebPage para una página Hub de País.
 * Mapea la definición clínica regional como fisiopatología asociada y la terapia
 * bioemocional integrativa como tratamiento posible (conforme a R2, R4 y E-E-A-T).
 */
export function buildCountryMedicalWebPageSchema(
  country: CountryData,
  canonicalUrl: string
): MedicalWebPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: country.h1 || `Biodescodificación y Terapia Bioemocional en ${country.pais}`,
    url: canonicalUrl,
    about: {
      '@type': 'MedicalCondition',
      name: `Somatización Bioemocional y Descodificación Biológica en ${country.pais}`,
      associatedPathophysiology: country.definicionClinica,
      possibleTreatment: {
        '@type': 'MedicalTherapy',
        name: 'Biodescodificación e Integración Bioemocional Online',
      },
    },
    description: country.metaDescripcion,
  };
}

/**
 * Genera el esquema JSON-LD FAQPage para listas de preguntas frecuentes.
 * Retorna null si la lista está vacía o no está definida.
 */
export function buildFAQSchema(
  faqs?: readonly FAQItem[] | FAQItem[] | null
): FAQPageSchema | null {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.respuesta,
      },
    })),
  };
}

/**
 * Genera el esquema JSON-LD BreadcrumbList con jerarquía ordenada de migas de pan.
 */
export function buildBreadcrumbSchema(
  items: readonly BreadcrumbItem[] | BreadcrumbItem[]
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Genera el esquema JSON-LD HealthAndBeautyBusiness (LocalBusiness) para una página de ciudad.
 * Incluye nombre oficial, moneda, rango de precios (priceRange), dirección postal,
 * área servida (City/Country) y teléfono de atención.
 */
export function buildLocalServiceSchema(
  city: CityData,
  canonicalUrl: string
): LocalBusinessSchema {
  const rawCity = city as any;
  const rawSlug = city.slug || rawCity['URL Final (Slug)'] || '';
  const cityName = rawSlug ? rawSlug.charAt(0).toUpperCase() + rawSlug.slice(1) : 'Local';
  const h1Title = city.h1 || rawCity['H1 Título'] || `Terapia Holística y Biodescodificación en ${cityName}`;
  const metaDesc =
    city.metaDescripcion ||
    rawCity['Meta Descripción'] ||
    `Sesiones online de terapia holística y biodescodificación en ${cityName}, ${city.pais}. Sanación emocional profunda y equilibrio mente-cuerpo.`;
  const pais = city.pais || rawCity['País'] || '';
  const moneda = city.moneda || rawCity['Moneda'] || 'USD';
  const precio = city.rangoPrecio || rawCity['Rango_Precio_Sesion'] || `Consultar tarifas locales (${moneda})`;

  const ogImageUrl = SITE_CONFIG.defaultOgImage.startsWith('http')
    ? SITE_CONFIG.defaultOgImage
    : new URL(SITE_CONFIG.defaultOgImage, SITE_CONFIG.url).href;

  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: `Alma Holística — ${h1Title}`,
    url: canonicalUrl,
    priceRange: precio,
    currenciesAccepted: moneda,
    address: {
      '@type': 'PostalAddress',
      addressCountry: pais,
      addressLocality: rawSlug,
    },
    description: metaDesc,
    telephone: `+${SITE_CONFIG.whatsappNumber}`,
    image: ogImageUrl,
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: {
        '@type': 'Country',
        name: pais,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.3',
      reviewCount: '6',
      bestRating: '5',
      worstRating: '1',
    },
    hasMap: 'https://maps.google.com/?cid=4077548945231278670',
    sameAs: [
      'https://share.google/otrUm918xRGNHTTkE',
      'https://maps.google.com/?cid=4077548945231278670',
      'https://www.instagram.com/almaholistica.lat'
    ],
  };
}
