/**
 * Configuración Central del Sitio — Alma Holística
 * Archivo: src/config/site.ts
 *
 * Parametriza los metadatos globales, URLs oficiales, número provisional de WhatsApp
 * y rutas de navegación para toda la plataforma.
 */

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  whatsappNumber: string;
  defaultOgImage: string;
  author: string;
  locale: string;
  themeColor: string;
  navLinks: NavItem[];
}

/**
 * Constante oficial SITE_CONFIG requerida por los contratos de arquitectura y pruebas
 * Nota: El número 573151206985 es el oficial de WhatsApp de Alma Holística.
 */
export const SITE_CONFIG: SiteConfig = {
  name: 'Alma Holística',
  title: 'Alma Holística | Biodescodificación y Terapia Online',
  description:
    'Plataforma de biodescodificación y terapia holística online en más de 20 países. Identifica el origen emocional de tus dolencias y agenda tu sesión inicial de diagnóstico.',
  url: 'https://almaholistica.com',
  whatsappNumber: '573151206985',
  defaultOgImage: '/logo-mariposa-con-fondo-completo.svg',
  author: 'Alma Holística',
  locale: 'es',
  themeColor: '#060A1A',
  navLinks: [
    { label: 'Inicio', href: '/' },
    { label: 'Biodescodificación', href: '/biodescodificacion' },
    { label: 'Ciudades', href: '/#ciudades' },
    { label: 'Agendar Evaluación', href: 'https://wa.me/573151206985', isCta: true }
  ]
} as const;

/**
 * Generador de URL de WhatsApp para agendamiento estructurado
 * Compatible con la suite de pruebas E2E (Tier 3 y Tier 4)
 */
export function buildWhatsAppUrl(params?: {
  phone?: string;
  symptom?: string;
  duration?: string;
  priorTreatments?: string;
  location?: string;
}): string {
  const phone = (params?.phone || SITE_CONFIG.whatsappNumber).replace(/\D/g, '');

  const textLines = [
    'Hola Alma Holística, deseo agendar una sesión inicial de diagnóstico.',
    params?.symptom ? `• Síntoma / Dolencia: ${params.symptom}` : null,
    params?.duration ? `• Tiempo de evolución: ${params.duration}` : null,
    params?.priorTreatments ? `• Tratamientos previos: ${params.priorTreatments}` : null,
    params?.location ? `• Ubicación: ${params.location}` : null,
    'Agradezco su orientación para abordar la raíz emocional de mi caso.'
  ].filter(Boolean);

  const rawMessage = textLines.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(rawMessage)}`;
}

export default SITE_CONFIG;
