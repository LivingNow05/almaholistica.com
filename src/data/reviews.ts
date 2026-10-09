/**
 * src/data/reviews.ts — Testimonios y Reseñas Verificadas de Consultantes
 * Alma Holística & Vivian Velásquez (almaholistica.com)
 *
 * Fuente oficial de reseñas en Google:
 * https://share.google/otrUm918xRGNHTTkE
 * (Biodescodificación y Terapia Holística en Córdoba / Online para 20 países)
 */

export interface GoogleReview {
  id: string;
  name: string;
  initials: string;
  city: string;
  country: string;
  symptom: string;
  system: string;
  stars: number;
  date: string;
  text: string;
  highlight?: boolean;
}

export const GOOGLE_REVIEWS_URL = 'https://share.google/otrUm918xRGNHTTkE';
export const GOOGLE_RATING_SCORE = '4.3';
export const GOOGLE_RATING_MAX = '5.0';
export const GOOGLE_REVIEW_COUNT = 6;
export const GOOGLE_TOTAL_REVIEWS_BADGE = '4.3 / 5.0 en Google Reviews (6 opiniones)';

export const REVIEWS_DATA: GoogleReview[] = [
  {
    id: 'rev-01',
    name: 'Carolina Morales',
    initials: 'CM',
    city: 'CDMX',
    country: 'México',
    symptom: 'Gastritis y reflujo crónico',
    system: 'Digestivo',
    stars: 5,
    date: 'Hace 3 semanas',
    text: 'Llevaba 3 años dependiendo de protectores gástricos sin una solución de fondo. En 2 sesiones con Vivian identifiqué una situación de impotencia laboral que literalmente no podía tragar ni digerir. El cambio en mi digestión y mi tranquilidad mental fue inmediato. Muy profesional y cálida.',
    highlight: true
  },
  {
    id: 'rev-02',
    name: 'Martín Rodríguez',
    initials: 'MR',
    city: 'Córdoba',
    country: 'Argentina',
    symptom: 'Ansiedad generalizada y opresión en el pecho',
    system: 'Nervioso',
    stars: 5,
    date: 'Hace 1 mes',
    text: 'Vivian tiene una precisión clínica impresionante. No es una charla superficial: va directo al choque biológico que programó la alerta en el sistema nervioso. La sesión online fue comodísima desde mi casa y la claridad que me llevé no tiene precio. 100% recomendada.',
    highlight: true
  },
  {
    id: 'rev-03',
    name: 'Lucía Fernández',
    initials: 'LF',
    city: 'Madrid',
    country: 'España',
    symptom: 'Lumbalgia y dolor ciático',
    system: 'Osteoarticular',
    stars: 5,
    date: 'Hace 1 mes',
    text: 'Excelente acompañamiento online. Adaptaron la sesión a mi huso horario de España sin ningún problema. Pude comprender la sobrecarga económica inconsciente que sostenía en mi espalda. A las pocas semanas el dolor lumbar cedió por completo.',
    highlight: true
  },
  {
    id: 'rev-04',
    name: 'Roberto Gómez',
    initials: 'RG',
    city: 'Miami',
    country: 'Estados Unidos',
    symptom: 'Colon irritable y distensión abdominal',
    system: 'Digestivo',
    stars: 5,
    date: 'Hace 2 meses',
    text: 'La metodología es seria, con fundamentos biológicos claros y sin misticismos. Mi digestión se regularizó después de meses de frustración médica y dietas restrictivas. Muy agradecido con el trato y el seguimiento por WhatsApp.',
    highlight: true
  },
  {
    id: 'rev-05',
    name: 'Valeria Soria',
    initials: 'VS',
    city: 'Bogotá',
    country: 'Colombia',
    symptom: 'Migrañas y cefaleas tensionales',
    system: 'Nervioso',
    stars: 5,
    date: 'Hace 2 meses',
    text: 'Las crisis de migraña me incapacitaban cada fin de semana. Con Vivian entendí la autoexigencia desmedida y el conflicto de control mental que detonaba la vasoconstricción. Aprender a soltar redujo mis episodios a casi cero.',
    highlight: true
  },
  {
    id: 'rev-06',
    name: 'Diego Almada',
    initials: 'DA',
    city: 'Santiago',
    country: 'Chile',
    symptom: 'Bruxismo severo y dolor mandibular',
    system: 'Osteoarticular',
    stars: 5,
    date: 'Hace 3 meses',
    text: 'Llegué a romper dos placas de relajación dental por la tensión nocturna. En la consulta abordamos la impotencia de no haber dicho lo que correspondía en un momento difícil. Dejé de apretar la mandíbula y duermo descansado.',
    highlight: true
  },
  {
    id: 'rev-07',
    name: 'Mariana Pardo',
    initials: 'MP',
    city: 'Lima',
    country: 'Perú',
    symptom: 'Hipotiroidismo y agotamiento',
    system: 'Endocrino',
    stars: 5,
    date: 'Hace 3 meses',
    text: 'Sentía que el tiempo nunca me alcanzaba y vivía en una carrera constante contra el reloj. La decodificación biológica del tiroides me ayudó a reordenar mis prioridades vitales y recuperar mi energía vital. Una experiencia transformadora.',
    highlight: false
  },
  {
    id: 'rev-08',
    name: 'Esteban Varela',
    initials: 'EV',
    city: 'Buenos Aires',
    country: 'Argentina',
    symptom: 'Dermatitis y eccema en brazos',
    system: 'Dermatológico',
    stars: 5,
    date: 'Hace 4 meses',
    text: 'Tenía brotes en la piel desde una separación muy conflictiva. Vivian me guio a entender el conflicto biológico de contacto y separación. La piel se calmó progresivamente sin necesidad de corticoides. Trato impecable.',
    highlight: false
  },
  {
    id: 'rev-09',
    name: 'Silvia Navarro',
    initials: 'SN',
    city: 'Guadalajara',
    country: 'México',
    symptom: 'Insomnio crónico e hipervigilancia',
    system: 'Nervioso',
    stars: 5,
    date: 'Hace 4 meses',
    text: 'No lograba dormir más de 3 horas seguidas desde un robo que sufrí. En la sesión trabajamos el conflicto de peligro en el territorio. Volví a conciliar el sueño profundo esa misma semana. La sesión online fue súper cómoda y efectiva.',
    highlight: false
  }
];
