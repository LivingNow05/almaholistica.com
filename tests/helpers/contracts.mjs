/**
 * Contratos y Validadores de Esquema para Alma Holística
 * Autor: E2E Test Writing Track (teamwork_preview_test_writer_e2e_1)
 */

export const APPROVED_COUNTRIES = [
  'Colombia',
  'México',
  'Chile',
  'Argentina',
  'Perú',
  'Ecuador',
  'Bolivia',
  'Uruguay',
  'Paraguay',
  'Venezuela',
  'Costa Rica',
  'Panamá',
  'República Dominicana',
  'Guatemala',
  'El Salvador',
  'Honduras',
  'Nicaragua',
  'Brasil',
  'España',
  'Estados Unidos'
];

export const EXPECTED_CITY_COLUMNS = [
  'Dominio',
  'Categoría',
  'URL Final (Slug)',
  'H1 Título',
  'Meta Descripción',
  'País',
  'Moneda',
  'Rango_Precio_Sesion',
  'Historia_Local'
];

export const EXPECTED_DOLENCIA_FIELDS = [
  'slug',
  'nombre',
  'sistema',
  'conflictoEmocional',
  'sentidoBiologico',
  'reprogramacion',
  'preguntasReflexion',
  'faqs',
  'ganchoAgendamiento'
];

export const COLOR_PALETTE = {
  abyssalBackground: '#060A1A',
  midnightCard1: '#0A1226',
  midnightCard2: '#0E172F',
  border1: '#1E293B',
  border2: '#1E3A5F',
  primaryAction: '#38BDF8',
  textLight: '#FFFFFF',
  textHeading: '#F8FAFC',
  slate: '#94A3B8'
};

export const PROVISIONAL_WHATSAPP_NUMBER = '573000000000';
export const CANONICAL_BASE_URL = 'https://almaholistica.com';

/**
 * Valida la estructura de una fila de Ciudad
 */
export function validateCityRecord(city) {
  const errors = [];
  if (!city) return { valid: false, errors: ['City object is null or undefined'] };

  for (const col of EXPECTED_CITY_COLUMNS) {
    if (city[col] === undefined || city[col] === null || String(city[col]).trim() === '') {
      errors.push(`Missing or empty required column: "${col}"`);
    }
  }

  if (city['URL Final (Slug)']) {
    const rawSlug = String(city['URL Final (Slug)']);
    if (rawSlug !== rawSlug.trim()) {
      errors.push(`Slug must not contain leading or trailing spaces: "${rawSlug}"`);
    }
    const slug = rawSlug.trim();
    if (slug !== slug.toLowerCase()) {
      errors.push(`Slug must be lowercase: "${slug}"`);
    }
    if (/[áéíóúÁÉÍÓÚñÑ\s]/.test(slug)) {
      errors.push(`Slug contains accents or spaces: "${slug}"`);
    }
    if (slug.startsWith('/') || slug.endsWith('/')) {
      errors.push(`Slug must not start or end with slash: "${slug}"`);
    }
  }

  if (city['País']) {
    const normalizedCountry = APPROVED_COUNTRIES.find(
      c => c.toLowerCase() === String(city['País']).trim().toLowerCase()
    );
    if (!normalizedCountry) {
      errors.push(`Country "${city['País']}" is not in the approved list of 20 countries`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Valida la estructura de un objeto de Dolencia
 */
export function validateDolenciaRecord(dolencia) {
  const errors = [];
  if (!dolencia) return { valid: false, errors: ['Dolencia object is null or undefined'] };

  for (const field of EXPECTED_DOLENCIA_FIELDS) {
    if (dolencia[field] === undefined || dolencia[field] === null) {
      errors.push(`Missing required field: "${field}"`);
    }
  }

  if (typeof dolencia.slug !== 'string' || dolencia.slug.trim() === '') {
    errors.push('Field "slug" must be a non-empty string');
  } else {
    if (dolencia.slug !== dolencia.slug.trim()) {
      errors.push(`Slug must not contain leading or trailing spaces: "${dolencia.slug}"`);
    }
    if (dolencia.slug !== dolencia.slug.toLowerCase()) {
      errors.push(`Slug must be lowercase: "${dolencia.slug}"`);
    }
    if (/[áéíóúÁÉÍÓÚñÑ\s]/.test(dolencia.slug)) {
      errors.push(`Slug contains accents or spaces: "${dolencia.slug}"`);
    }
    if (dolencia.slug.startsWith('/') || dolencia.slug.endsWith('/')) {
      errors.push(`Slug must not start or end with slash: "${dolencia.slug}"`);
    }
  }

  if (!Array.isArray(dolencia.preguntasReflexion) || dolencia.preguntasReflexion.length === 0) {
    errors.push('Field "preguntasReflexion" must be a non-empty array of strings');
  }

  if (!Array.isArray(dolencia.faqs) || dolencia.faqs.length === 0) {
    errors.push('Field "faqs" must be a non-empty array of FAQItem');
  } else {
    dolencia.faqs.forEach((faq, idx) => {
      if (!faq.pregunta || typeof faq.pregunta !== 'string' || faq.pregunta.trim() === '') {
        errors.push(`FAQ at index ${idx} missing valid "pregunta"`);
      }
      if (!faq.respuesta || typeof faq.respuesta !== 'string' || faq.respuesta.trim() === '') {
        errors.push(`FAQ at index ${idx} missing valid "respuesta"`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Fixture representativo de Ciudad para pruebas de contrato
 */
export const SAMPLE_CITY_FIXTURE = {
  Dominio: 'almaholistica.com',
  Categoría: 'Biodescodificación y Terapia Holística Online',
  'URL Final (Slug)': 'bogota',
  'H1 Título': 'Terapia Holística y Biodescodificación Online en Bogotá',
  'Meta Descripción': 'Sesiones personalizadas de biodescodificación y sanación emocional en Bogotá. Identifica el origen de tus síntomas con terapeutas certificados.',
  País: 'Colombia',
  Moneda: 'COP',
  Rango_Precio_Sesion: '180.000 - 240.000 COP',
  Historia_Local: 'En la vibrante y exigente cotidianidad de Bogotá, el estrés urbano suele traducirse en bloqueos físicos. Te acompañamos a sanar desde la raíz.'
};

/**
 * Fixture representativo de Dolencia para pruebas de contrato
 */
export const SAMPLE_DOLENCIA_FIXTURE = {
  slug: 'gastritis',
  nombre: 'Gastritis y Reflujo Gástrico',
  sistema: 'Sistema Digestivo',
  conflictoEmocional: 'Indigestión emocional. Sensación de haber tenido que tragar o aceptar una situación inaceptable o indigesta en el entorno familiar o laboral.',
  sentidoBiologico: 'La mucosa gástrica hipersegrega ácido clorhídrico para intentar digerir y destruir químicamente el bocado que se siente atrapado.',
  reprogramacion: 'Acepto lo que no puedo controlar, expreso mis desacuerdos con asertividad y digiero con calma los acontecimientos de mi vida.',
  preguntasReflexion: [
    '¿Qué situación o persona sientes que te ves obligado/a a tolerar aunque te resulte tóxica?',
    '¿Qué noticia reciente sentiste como un golpe directo en la boca del estómago?',
    '¿Por qué te cuesta poner límites saludables antes de somatizar la molestia?'
  ],
  faqs: [
    {
      pregunta: '¿La biodescodificación sustituye el tratamiento médico para la gastritis?',
      respuesta: 'No. La biodescodificación es una terapia complementaria que aborda la raíz emocional inconsciente, trabajando en conjunto con la medicina convencional.'
    },
    {
      pregunta: '¿Cuántas sesiones se necesitan para notar cambios?',
      respuesta: 'Generalmente desde la primera sesión de diagnóstico se identifican los detonantes emocionales y se percibe un alivio significativo en la reactividad gástrica.'
    }
  ],
  ganchoAgendamiento: 'Descubre qué emoción está encendiendo el fuego en tu estómago y libérala en una sesión personalizada.'
};
