/**
 * src/i18n/translations.ts
 * Diccionario nativo multilingüe para Alma Holística (almaholistica.com)
 * Idiomas soportados: Español (es), English (en), Deutsch (de), Français (fr), Italiano (it).
 * 100% nativo, sin dependencias de Google Translate ni servicios externos.
 */

export type LangCode = 'es' | 'en' | 'de' | 'fr' | 'it';

export interface HotspotContent {
  label: string;
  shortLabel: string;
  organ: string;
  conflict: string;
  phaseText: string;
  symptoms: string[];
}

export interface BodyScannerTranslations {
  header_tag: string;
  header_desc: string;
  legend_stress: string;
  legend_healing: string;
  plane_tag: string;
  svg_aria: string;
  label_organ: string;
  label_layer: string;
  label_conflict: string;
  label_symptoms: string;
  label_cta_question: string;
  btn_cta: string;
  layers: {
    Endodermo: string;
    Mesodermo: string;
    Ectodermo: string;
  };
  zones: {
    craneo: HotspotContent;
    tiroides: HotspotContent;
    torax: HotspotContent;
    digestivo: HotspotContent;
    columna: HotspotContent;
    epidermis: HotspotContent;
  };
}

export interface QuizTranslations {
  badge_step: string;
  step_progress_prefix: string;
  step_progress_ready: string;
  step_name_1: string;
  step_name_2: string;
  step_name_3: string;
  step_name_4: string;
  step_name_5: string;
  header_subtitle: string;
  step1_title: string;
  step1_desc: string;
  step2_title: string;
  step2_desc: string;
  step3_title: string;
  step3_desc: string;
  step4_title: string;
  step4_desc: string;
  step5_title: string;
  step5_desc: string;
  btn_continue: string;
  btn_whatsapp_final: string;
  btn_back: string;
  direct_wa: string;
  direct_wa_short: string;
  direct_consult_question: string;
  direct_consult_link: string;
  custom_symptom_btn: string;
  custom_symptom_label: string;
  custom_symptom_placeholder: string;
  custom_location_label: string;
  custom_location_placeholder: string;
  country_other: string;
  step5_completed_badge: string;
  step5_online_badge: string;
  step5_explanation: string;
  summary_symptom: string;
  summary_duration: string;
  summary_treatments: string;
  summary_location: string;
  phase1_badge: string;
  phase1_free: string;
  phase1_title: string;
  phase1_desc: string;
  phase1_footer: string;
  phase2_badge: string;
  phase2_time: string;
  phase2_title: string;
  phase2_desc: string;
  phase2_investment: string;
  under_button_note: string;
  modify_answers: string;
  close: string;
  medical_disclaimer: string;
  diagnosis_template: (symptom: string, duration: string) => string;
  symptoms: {
    gastritis: { label: string; shortLabel: string; category: string };
    ansiedad: { label: string; shortLabel: string; category: string };
    lumbalgia: { label: string; shortLabel: string; category: string };
    ciatica: { label: string; shortLabel: string; category: string };
    hipotiroidismo: { label: string; shortLabel: string; category: string };
    migrana: { label: string; shortLabel: string; category: string };
    colon: { label: string; shortLabel: string; category: string };
    dermatitis: { label: string; shortLabel: string; category: string };
    insomnio: { label: string; shortLabel: string; category: string };
    sobrepeso: { label: string; shortLabel: string; category: string };
  };
  durations: {
    less_1_month: { title: string; sub: string; label: string };
    from_1_to_6_months: { title: string; sub: string; label: string };
    from_6_to_12_months: { title: string; sub: string; label: string };
    more_than_1_year: { title: string; sub: string; label: string };
  };
  treatments: {
    conventional: { title: string; sub: string; label: string };
    alternative: { title: string; sub: string; label: string };
    multiple: { title: string; sub: string; label: string };
    none: { title: string; sub: string; label: string };
  };
}

export interface Translations {
  nav: {
    home: string;
    catalog: string;
    catalog_sub: string;
    cities: string;
    cities_sub: string;
    about: string;
    about_sub: string;
    reviews: string;
    reviews_mobile: string;
    schedule: string;
    schedule_whatsapp: string;
    select_lang: string;
    countries_link: string;
  };
  hero: {
    badge: string;
    title_prefix: string;
    title_highlight: string;
    lead: string;
    cta_primary: string;
    cta_secondary: string;
    scroll: string;
    symptoms_label: string;
    gastritis_title: string;
    gastritis_sub: string;
    ansiedad_title: string;
    ansiedad_sub: string;
    lumbalgia_title: string;
    lumbalgia_sub: string;
    migrana_title: string;
    migrana_sub: string;
  };
  sticky_bar: {
    whatsapp: string;
    start_eval: string;
  };
  body_scanner: BodyScannerTranslations;
  quiz: QuizTranslations;
  footer: {
    disclaimer_title: string;
    disclaimer_text: string;
    rights: string;
    contact: string;
  };
}

export const TRANSLATIONS: Record<LangCode, Translations> = {
  es: {
    nav: {
      home: 'Inicio',
      catalog: 'Biodescodificación',
      catalog_sub: 'Biodescodificación (Catálogo)',
      cities: 'Ciudades',
      cities_sub: 'Ciudades & Cobertura',
      about: 'Sobre Nosotros',
      about_sub: 'Sobre Nosotros (Vivian Velásquez)',
      reviews: '4.3 en Google Reviews',
      reviews_mobile: '⭐ Opiniones en Google (4.3 / 5.0)',
      schedule: 'Agendar Sesión',
      schedule_whatsapp: 'Agendar Sesión por WhatsApp',
      select_lang: 'Seleccionar Idioma / Select Language',
      countries_link: '🌎 Ver 20 países y monedas locales →',
    },
    hero: {
      badge: 'BIODESCODIFICACIÓN INTEGRATIVA CLÍNICA',
      title_prefix: 'Comprende el origen emocional de tus',
      title_highlight: 'síntomas físicos.',
      lead: 'Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países. Te acompañamos a descodificar el conflicto biológico inconsciente detrás de tu dolencia.',
      cta_primary: 'Iniciar Evaluación por WhatsApp',
      cta_secondary: '[EXPLORAR 45 DOLENCIAS]',
      scroll: 'RAD // SCROLL',
      symptoms_label: 'Dolencias Frecuentes',
      gastritis_title: 'Gastritis & Reflujo',
      gastritis_sub: 'Conflicto que no puedo digerir',
      ansiedad_title: 'Ansiedad & Estrés',
      ansiedad_sub: 'Miedo al futuro o anticipación',
      lumbalgia_title: 'Lumbalgia & Dolor',
      lumbalgia_sub: 'Carga económica o falta de apoyo',
      migrana_title: 'Migrañas & Cefalea',
      migrana_sub: 'Presión en sienes',
    },
    sticky_bar: {
      whatsapp: 'WhatsApp',
      start_eval: 'Iniciar Evaluación',
    },
    body_scanner: {
      header_tag: 'SYS // BIO-SCANNER ANATÓMICO v2.4',
      header_desc: 'Interactúa con la silueta biológica para decodificar el conflicto subyacente a tu síntoma físico',
      legend_stress: 'Estrés Activo',
      legend_healing: 'Reparación',
      plane_tag: 'RAD // CORONAL PLANE',
      svg_aria: 'Silueta anatómica humana con puntos biológicos interactivos',
      label_organ: 'ÓRGANO:',
      label_layer: 'CAPA:',
      label_conflict: 'Conflicto Biológico Raíz (Sentido de Supervivencia)',
      label_symptoms: 'Síntomas frecuentes en este eje:',
      label_cta_question: '¿Presentas alguno de estos síntomas? Puedes evaluar tu caso ahora.',
      btn_cta: 'Iniciar Triaje de Mi Síntoma',
      layers: {
        Endodermo: 'Endodermo',
        Mesodermo: 'Mesodermo',
        Ectodermo: 'Ectodermo',
      },
      zones: {
        craneo: {
          label: 'Cráneo y Sistema Nervioso',
          shortLabel: 'Cráneo',
          organ: 'Corteza Cerebral y Vasos Craneales',
          conflict: 'Miedo frontal, sobreexigencia intelectual, impotencia o rabia no expresada retenida en el pensamiento.',
          phaseText: 'Fase Activa (Simpaticotonía / Estrés)',
          symptoms: ['Migraña', 'Insomnio', 'Bruxismo', 'Ansiedad'],
        },
        tiroides: {
          label: 'Garganta y Glándula Tiroides',
          shortLabel: 'Garganta',
          organ: 'Tiroides y Conductos Faríngeos',
          conflict: 'Urgencia de tiempo: "El tiempo pasa demasiado rápido y no llego" o impotencia para atrapar o expulsar la palabra.',
          phaseText: 'Fase Activa (Conflicto de Tiempo)',
          symptoms: ['Hipotiroidismo', 'Nódulo Tiroideo', 'Afonía'],
        },
        torax: {
          label: 'Tórax, Pulmones y Corazón',
          shortLabel: 'Tórax',
          organ: 'Alvéolos Pulmonares y Miocardio',
          conflict: 'Miedo visceral a la asfixia o pérdida de territorio: "Siento que me quitan el aire o el sustento".',
          phaseText: 'Fase de Reparación (Vagotonía)',
          symptoms: ['Opresión Torácica', 'Ansiedad', 'Asma'],
        },
        digestivo: {
          label: 'Abdomen y Aparato Digestivo',
          shortLabel: 'Abdomen',
          organ: 'Estómago, Duodeno y Colon',
          conflict: 'Bocado indigesto: una situación o traición que no puedes tolerar, digerir ni expulsar de tu vida.',
          phaseText: 'Fase de Reparación (Inflamación Regenerativa)',
          symptoms: ['Gastritis', 'Colon Irritable', 'Sobrepeso / Retención'],
        },
        columna: {
          label: 'Columna Vertebral y Lumbar',
          shortLabel: 'Columna',
          organ: 'Vértebras Lumbares y Músculos Espinales',
          conflict: 'Desvalorización estructural: "No puedo sostener esta carga económica o familiar por mí mismo".',
          phaseText: 'Fase de Reparación (Dolor Post-Estrés)',
          symptoms: ['Lumbalgia', 'Ciática', 'Hernia Discal'],
        },
        epidermis: {
          label: 'Piel y Tejido Tegumentario',
          shortLabel: 'Piel',
          organ: 'Epidermis y Capa Basal Cutánea',
          conflict: 'Conflicto de separación: ruptura involuntaria de contacto físico, afectivo o protección con alguien vital.',
          phaseText: 'Fase de Reparación (Eccema / Prurito)',
          symptoms: ['Dermatitis', 'Eccema', 'Psoriasis'],
        },
      },
    },
    quiz: {
      badge_step: 'PASO',
      step_progress_prefix: 'PASO 0',
      step_progress_ready: 'DIAGNÓSTICO LISTO',
      step_name_1: 'Motivo de Consulta',
      step_name_2: 'Tiempo de Evolución',
      step_name_3: 'Tratamientos Previos',
      step_name_4: 'País / Ciudad',
      step_name_5: 'Patrón Identificado',
      header_subtitle: 'Evaluación Rápida & Agendamiento',
      step1_title: '¿Cuál es tu síntoma o motivo de consulta principal?',
      step1_desc: 'Selecciona una dolencia frecuente o escribe la tuya para iniciar el análisis bioemocional.',
      step2_title: '¿Cuánto tiempo llevas experimentando este síntoma?',
      step2_desc: 'El tiempo de evolución indica si el conflicto biológico está en fase activa o en reparación.',
      step3_title: '¿Qué tratamientos has probado previamente?',
      step3_desc: 'La biodescodificación es complementaria a la medicina y permite abordar la raíz psicosomática.',
      step4_title: '¿En qué país o ciudad te encuentras?',
      step4_desc: 'Atendemos de forma personalizada online en más de 20 países en tu huso horario local.',
      step5_title: 'Evaluación Preliminar y Siguiente Paso',
      step5_desc: 'Hemos correlacionado tus respuestas para conectarte con un especialista asignado.',
      btn_continue: 'Continuar',
      btn_whatsapp_final: 'Continuar a WhatsApp',
      btn_back: 'Atrás',
      direct_wa: 'O consulta directamente por WhatsApp sin completar el formulario →',
      direct_wa_short: '💬 WhatsApp directo →',
      direct_consult_question: '💬 ¿Prefieres consultar directamente?',
      direct_consult_link: 'Escribir por WhatsApp →',
      custom_symptom_btn: '+ ¿Tu dolencia no está en la lista? Escríbela aquí',
      custom_symptom_label: 'Describe tu síntoma específico:',
      custom_symptom_placeholder: 'Ej: Presión en el pecho, mareos, dolor dorsal...',
      custom_location_label: 'O escribe tu ciudad específica:',
      custom_location_placeholder: 'Ej: Bogotá, Madrid, Barcelona, CDMX, Miami, Buenos Aires...',
      country_other: 'Otro País',
      step5_completed_badge: 'Evaluación Preliminar Completada',
      step5_online_badge: 'Atención 1 a 1 Online',
      step5_explanation: 'En biodescodificación, este síntoma refleja un programa biológico adaptativo. En tu valoración inicial revisaremos el detonante emocional para orientar su resolución definitiva.',
      summary_symptom: 'Síntoma:',
      summary_duration: 'Evolución:',
      summary_treatments: 'Tratamientos:',
      summary_location: 'Ubicación / País:',
      phase1_badge: 'Fase 1 • Orientación',
      phase1_free: 'SIN COSTO',
      phase1_title: 'Llamada de Valoración (15 min)',
      phase1_desc: 'Videollamada 1 a 1 para escuchar tu caso, revisar antecedentes y explicarte el sentido biológico.',
      phase1_footer: '100% Gratuita • Sin Compromiso',
      phase2_badge: 'Fase 2 • Profunda',
      phase2_time: '90 Minutos',
      phase2_title: 'Sesión de Descodificación',
      phase2_desc: 'Acompañamiento individual para desactivar el choque biológico y restaurar el bienestar.',
      phase2_investment: 'Inversión',
      under_button_note: 'Respuesta personalizada en menos de 15 minutos • Sin cobro previo',
      modify_answers: '← Modificar respuestas',
      close: 'Cerrar',
      medical_disclaimer: '* La biodescodificación es complementaria y no sustituye el diagnóstico ni tratamiento médico facultativo colegiado.',
      diagnosis_template: (symptom, duration) => `Identificamos un patrón relacionado con ${symptom} de ${duration} de evolución.`,
      symptoms: {
        gastritis: { label: 'Gastritis / Acidez estomacal', shortLabel: 'Gastritis / Acidez', category: 'Digestivo' },
        ansiedad: { label: 'Ansiedad / Estrés crónico', shortLabel: 'Ansiedad / Estrés', category: 'Emocional' },
        lumbalgia: { label: 'Lumbalgia / Dolor lumbar', shortLabel: 'Dolor Lumbar / Espalda', category: 'Estructural' },
        ciatica: { label: 'Ciática / Dolor nervioso', shortLabel: 'Ciática / Nervio', category: 'Neural' },
        hipotiroidismo: { label: 'Hipotiroidismo / Fatiga metabólica', shortLabel: 'Tiroides / Fatiga', category: 'Endocrino' },
        migrana: { label: 'Migrañas / Cefaleas intensas', shortLabel: 'Migrañas / Cefalea', category: 'Cefálico' },
        colon: { label: 'Colon Irritable / Inflamación', shortLabel: 'Colon Irritable', category: 'Intestinal' },
        dermatitis: { label: 'Dermatitis / Psoriasis / Erupciones', shortLabel: 'Dermatitis / Piel', category: 'Cutáneo' },
        insomnio: { label: 'Insomnio / Trastornos del sueño', shortLabel: 'Insomnio / Sueño', category: 'Reposo' },
        sobrepeso: { label: 'Sobrepeso / Retención de líquidos', shortLabel: 'Sobrepeso / Retención', category: 'Metabólico' },
      },
      durations: {
        less_1_month: { title: 'Menos de 1 mes', sub: 'Manifestación reciente / Alerta inicial', label: 'Menos de 1 mes (Manifestación reciente)' },
        from_1_to_6_months: { title: '1 a 6 meses', sub: 'Episodios recurrentes o intermitentes', label: 'De 1 a 6 meses (Episodios recurrentes)' },
        from_6_to_12_months: { title: '6 meses a 1 año', sub: 'Persistencia moderada', label: 'De 6 meses a 1 año (Persistencia moderada)' },
        more_than_1_year: { title: 'Más de 1 año', sub: 'Cuadro crónico arraigado', label: 'Más de 1 año (Cuadro crónico arraigado)' },
      },
      treatments: {
        conventional: { title: 'Medicación convencional', sub: 'Fármacos o tratamientos médicos tradicionales', label: 'Medicación alopática o convencional' },
        alternative: { title: 'Terapias complementarias', sub: 'Acupuntura, naturopatía u homeopatía', label: 'Terapias alternativas o naturales' },
        multiple: { title: 'Múltiples consultas', sub: 'Diversos estudios sin causa clara encontrada', label: 'Múltiples especialistas sin alivio definitivo' },
        none: { title: 'Primera exploración', sub: 'Primer abordaje específico para este síntoma', label: 'Ninguno hasta el momento (primera vez)' },
      },
    },
    footer: {
      disclaimer_title: 'Descargo de Responsabilidad Médica',
      disclaimer_text: 'Las sesiones de biodescodificación y terapia bioemocional ofrecidas en Alma Holística son procesos de acompañamiento integrativo y bienestar emocional. No sustituyen el diagnóstico, tratamiento ni prescripción de médicos, psicólogos clínicos o psiquiatras calificados. Ante cualquier síntoma agudo o condición crónica, consulte siempre a su médico tratante.',
      rights: 'Todos los derechos reservados.',
      contact: 'Contacto',
    },
  },

  en: {
    nav: {
      home: 'Home',
      catalog: 'Biodecoding',
      catalog_sub: 'Biodecoding (Catalog)',
      cities: 'Cities & Coverage',
      cities_sub: 'Cities & Global Coverage',
      about: 'About Us',
      about_sub: 'About Us (Vivian Velásquez)',
      reviews: '4.3 on Google Reviews',
      reviews_mobile: '⭐ Google Reviews (4.3 / 5.0)',
      schedule: 'Book Session',
      schedule_whatsapp: 'Book Session via WhatsApp',
      select_lang: 'Select Language',
      countries_link: '🌎 View 20 countries & local currencies →',
    },
    hero: {
      badge: 'CLINICAL INTEGRATIVE BIODECODING',
      title_prefix: 'Understand the emotional root of your',
      title_highlight: 'physical symptoms.',
      lead: 'Alma Holística is a clinical platform for biodecoding and integrative bioemotional therapy offering 1-on-1 online sessions in over 20 countries. We guide you to decode the subconscious biological conflict behind your condition.',
      cta_primary: 'Start WhatsApp Assessment',
      cta_secondary: '[EXPLORE 45 CONDITIONS]',
      scroll: 'RAD // SCROLL',
      symptoms_label: 'Frequent Conditions',
      gastritis_title: 'Gastritis & Reflux',
      gastritis_sub: 'Conflict I cannot digest',
      ansiedad_title: 'Anxiety & Stress',
      ansiedad_sub: 'Fear of future or anticipation',
      lumbalgia_title: 'Lower Back Pain',
      lumbalgia_sub: 'Financial burden or lack of support',
      migrana_title: 'Migraines & Headaches',
      migrana_sub: 'Temple pressure and tension',
    },
    sticky_bar: {
      whatsapp: 'WhatsApp',
      start_eval: 'Start Assessment',
    },
    body_scanner: {
      header_tag: 'SYS // ANATOMICAL BIO-SCANNER v2.4',
      header_desc: 'Interact with the biological silhouette to decode the conflict underlying your physical symptom',
      legend_stress: 'Active Stress',
      legend_healing: 'Healing Phase',
      plane_tag: 'RAD // CORONAL PLANE',
      svg_aria: 'Human anatomical silhouette with interactive biological hotspots',
      label_organ: 'ORGAN:',
      label_layer: 'LAYER:',
      label_conflict: 'Root Biological Conflict (Survival Mechanism)',
      label_symptoms: 'Frequent symptoms in this axis:',
      label_cta_question: 'Experiencing any of these symptoms? You can assess your case now.',
      btn_cta: 'Start My Symptom Triage',
      layers: {
        Endodermo: 'Endoderm',
        Mesodermo: 'Mesoderm',
        Ectodermo: 'Ectoderm',
      },
      zones: {
        craneo: {
          label: 'Skull & Nervous System',
          shortLabel: 'Skull',
          organ: 'Cerebral Cortex & Cranial Vessels',
          conflict: 'Frontal fear, intellectual overburden, powerlessness or unexpressed anger held in thoughts.',
          phaseText: 'Active Phase (Sympathicotonia / Stress)',
          symptoms: ['Migraine', 'Insomnia', 'Bruxism', 'Anxiety'],
        },
        tiroides: {
          label: 'Throat & Thyroid Gland',
          shortLabel: 'Throat',
          organ: 'Thyroid & Pharyngeal Ducts',
          conflict: 'Urgency of time: "Time is running too fast and I cannot keep up" or inability to catch or voice the word.',
          phaseText: 'Active Phase (Time Conflict)',
          symptoms: ['Hypothyroidism', 'Thyroid Nodule', 'Aphonia'],
        },
        torax: {
          label: 'Thorax, Lungs & Heart',
          shortLabel: 'Thorax',
          organ: 'Pulmonary Alveoli & Myocardium',
          conflict: 'Visceral fear of suffocation or loss of territory: "I feel my air or livelihood is being taken away".',
          phaseText: 'Healing Phase (Vagotonia)',
          symptoms: ['Chest Tightness', 'Anxiety', 'Asthma'],
        },
        digestivo: {
          label: 'Abdomen & Digestive System',
          shortLabel: 'Abdomen',
          organ: 'Stomach, Duodenum & Colon',
          conflict: 'Indigestible morsel: a situation, affront or betrayal that you cannot tolerate, digest, or expel.',
          phaseText: 'Healing Phase (Regenerative Inflammation)',
          symptoms: ['Gastritis', 'Irritable Bowel', 'Overweight / Retention'],
        },
        columna: {
          label: 'Spine & Lumbar Region',
          shortLabel: 'Spine',
          organ: 'Lumbar Vertebrae & Spinal Muscles',
          conflict: 'Structural self-devaluation: "I cannot carry this financial or family burden on my own".',
          phaseText: 'Healing Phase (Post-Stress Pain)',
          symptoms: ['Low Back Pain', 'Sciatica', 'Herniated Disc'],
        },
        epidermis: {
          label: 'Skin & Integumentary Tissue',
          shortLabel: 'Skin',
          organ: 'Epidermis & Cutaneous Basal Layer',
          conflict: 'Separation conflict: involuntary loss of physical, emotional contact or protection with a vital being.',
          phaseText: 'Healing Phase (Eczema / Pruritus)',
          symptoms: ['Dermatitis', 'Eczema', 'Psoriasis'],
        },
      },
    },
    quiz: {
      badge_step: 'STEP',
      step_progress_prefix: 'STEP 0',
      step_progress_ready: 'DIAGNOSIS READY',
      step_name_1: 'Reason for Consultation',
      step_name_2: 'Symptom Duration',
      step_name_3: 'Previous Treatments',
      step_name_4: 'Country / City',
      step_name_5: 'Identified Pattern',
      header_subtitle: 'Fast Clinical Triage & Scheduling',
      step1_title: 'What is your primary symptom or reason for consultation?',
      step1_desc: 'Select a common condition or type your own to begin the bioemotional analysis.',
      step2_title: 'How long have you been experiencing this symptom?',
      step2_desc: 'The duration indicates whether the biological conflict is in an active or resolution phase.',
      step3_title: 'What treatments have you tried previously?',
      step3_desc: 'Biodecoding complements conventional medicine by addressing the underlying psychosomatic root.',
      step4_title: 'In which country or city are you located?',
      step4_desc: 'We provide personalized online sessions in over 20 countries matching your local timezone.',
      step5_title: 'Preliminary Assessment & Next Step',
      step5_desc: 'We have processed your answers to connect you with an assigned clinical specialist.',
      btn_continue: 'Continue',
      btn_whatsapp_final: 'Continue to WhatsApp',
      btn_back: 'Back',
      direct_wa: 'Or consult directly via WhatsApp without completing the form →',
      direct_wa_short: '💬 Direct WhatsApp →',
      direct_consult_question: '💬 Prefer to consult directly?',
      direct_consult_link: 'Message on WhatsApp →',
      custom_symptom_btn: "+ Can't find your symptom? Type it here",
      custom_symptom_label: 'Describe your specific symptom:',
      custom_symptom_placeholder: 'E.g.: Chest pressure, dizziness, dorsal pain...',
      custom_location_label: 'Or type your specific city:',
      custom_location_placeholder: 'E.g.: New York, London, Madrid, Miami, Toronto...',
      country_other: 'Other Country',
      step5_completed_badge: 'Preliminary Evaluation Completed',
      step5_online_badge: '1-on-1 Online Care',
      step5_explanation: 'In biodecoding, this symptom reflects an adaptive biological program. In your initial assessment we will identify the emotional trigger to guide its permanent resolution.',
      summary_symptom: 'Symptom:',
      summary_duration: 'Duration:',
      summary_treatments: 'Treatments:',
      summary_location: 'Location / Country:',
      phase1_badge: 'Phase 1 • Orientation',
      phase1_free: 'NO COST',
      phase1_title: 'Initial Assessment Call (15 min)',
      phase1_desc: '1-on-1 video call to hear your case, review history, and explain the biological meaning.',
      phase1_footer: '100% Free • No Obligation',
      phase2_badge: 'Phase 2 • In-Depth',
      phase2_time: '90 Minutes',
      phase2_title: 'Biodecoding Session',
      phase2_desc: 'Individual accompaniment to release biological shock and restore full wellbeing.',
      phase2_investment: 'Investment',
      under_button_note: 'Personalized response in under 15 minutes • No upfront fee',
      modify_answers: '← Modify responses',
      close: 'Close',
      medical_disclaimer: '* Biodecoding is complementary and does not replace medical diagnosis or registered physician treatment.',
      diagnosis_template: (symptom, duration) => `We identified a pattern related to ${symptom} with ${duration} duration.`,
      symptoms: {
        gastritis: { label: 'Gastritis / Stomach Acidity', shortLabel: 'Gastritis / Acidity', category: 'Digestive' },
        ansiedad: { label: 'Anxiety / Chronic Stress', shortLabel: 'Anxiety / Stress', category: 'Emotional' },
        lumbalgia: { label: 'Lower Back Pain / Lumbago', shortLabel: 'Back / Lumbar Pain', category: 'Structural' },
        ciatica: { label: 'Sciatica / Nerve Pain', shortLabel: 'Sciatica / Nerve', category: 'Neural' },
        hipotiroidismo: { label: 'Hypothyroidism / Fatigue', shortLabel: 'Thyroid / Fatigue', category: 'Endocrine' },
        migrana: { label: 'Migraines / Severe Headaches', shortLabel: 'Migraines / Headache', category: 'Cephalic' },
        colon: { label: 'Irritable Bowel / Inflammation', shortLabel: 'Irritable Bowel', category: 'Intestinal' },
        dermatitis: { label: 'Dermatitis / Psoriasis / Eczema', shortLabel: 'Dermatitis / Skin', category: 'Cutaneous' },
        insomnio: { label: 'Insomnia / Sleep Disorders', shortLabel: 'Insomnia / Sleep', category: 'Rest' },
        sobrepeso: { label: 'Overweight / Fluid Retention', shortLabel: 'Overweight / Retention', category: 'Metabolic' },
      },
      durations: {
        less_1_month: { title: 'Less than 1 month', sub: 'Recent onset / Initial warning', label: 'Less than 1 month (Recent onset)' },
        from_1_to_6_months: { title: '1 to 6 months', sub: 'Recurrent or intermittent episodes', label: '1 to 6 months (Recurrent episodes)' },
        from_6_to_12_months: { title: '6 months to 1 year', sub: 'Moderate persistence', label: '6 months to 1 year (Moderate persistence)' },
        more_than_1_year: { title: 'Over 1 year', sub: 'Deeply rooted chronic condition', label: 'Over 1 year (Chronic condition)' },
      },
      treatments: {
        conventional: { title: 'Conventional medication', sub: 'Traditional medical prescription or drugs', label: 'Conventional / allopathic medication' },
        alternative: { title: 'Complementary therapies', sub: 'Acupuncture, naturopathy or homeopathy', label: 'Alternative or natural therapies' },
        multiple: { title: 'Multiple specialists', sub: 'Several studies without clear cause found', label: 'Multiple specialists without definitive relief' },
        none: { title: 'First time exploration', sub: 'First specific approach for this symptom', label: 'None so far (first time)' },
      },
    },
    footer: {
      disclaimer_title: 'Medical Disclaimer',
      disclaimer_text: 'The biodecoding and bioemotional therapy sessions offered at Alma Holística are integrative complementary wellness processes. They do not replace diagnosis, treatment, or medical prescriptions from qualified physicians, clinical psychologists, or psychiatrists. For any acute symptom or chronic condition, always consult your physician.',
      rights: 'All rights reserved.',
      contact: 'Contact',
    },
  },

  de: {
    nav: {
      home: 'Startseite',
      catalog: 'Biodekodierung',
      catalog_sub: 'Biodekodierung (Katalog)',
      cities: 'Städte & Abdeckung',
      cities_sub: 'Städte & Globale Abdeckung',
      about: 'Über Uns',
      about_sub: 'Über Uns (Vivian Velásquez)',
      reviews: '4.3 auf Google Reviews',
      reviews_mobile: '⭐ Google Bewertungen (4.3 / 5.0)',
      schedule: 'Sitzung Buchen',
      schedule_whatsapp: 'Sitzung per WhatsApp Buchen',
      select_lang: 'Sprache Wählen',
      countries_link: '🌎 20 Länder und lokale Währungen anzeigen →',
    },
    hero: {
      badge: 'KLINISCHE INTEGRATIVE BIODEKODIERUNG',
      title_prefix: 'Verstehen Sie die emotionale Ursache Ihrer',
      title_highlight: 'körperlichen Symptome.',
      lead: 'Alma Holística ist eine klinische Plattform für Biodekodierung und integrative bioemotionale Therapie mit 1-zu-1-Online-Sitzungen in über 20 Ländern. Wir begleiten Sie dabei, den unbewussten biologischen Konflikt hinter Ihrem Leiden zu entschlüsseln.',
      cta_primary: 'Bewertung per WhatsApp Starten',
      cta_secondary: '[45 SYMPTOME ERKUNDEN]',
      scroll: 'RAD // SCROLL',
      symptoms_label: 'Häufige Symptome',
      gastritis_title: 'Gastritis & Reflux',
      gastritis_sub: 'Konflikt, den ich nicht verdauen kann',
      ansiedad_title: 'Angst & Stress',
      ansiedad_sub: 'Zukunftsangst oder ständige Anspannung',
      lumbalgia_title: 'Lendenschmerzen & Rücken',
      lumbalgia_sub: 'Finanzielle Last oder fehlende Stütze',
      migrana_title: 'Migräne & Kopfschmerzen',
      migrana_sub: 'Druck an den Schläfen',
    },
    sticky_bar: {
      whatsapp: 'WhatsApp',
      start_eval: 'Bewertung Starten',
    },
    body_scanner: {
      header_tag: 'SYS // ANATOMISCHER BIO-SCANNER v2.4',
      header_desc: 'Interagieren Sie mit der biologischen Silhouette, um den Konflikt hinter Ihrem körperlichen Symptom zu entschlüsseln',
      legend_stress: 'Aktiver Stress',
      legend_healing: 'Heilung',
      plane_tag: 'RAD // FRONTAL-EBENE',
      svg_aria: 'Menschliche anatomische Silhouette mit interaktiven biologischen Hotspots',
      label_organ: 'ORGAN:',
      label_layer: 'KEIMBLATT:',
      label_conflict: 'Biologischer Wurzelkonflikt (Überlebenssinn)',
      label_symptoms: 'Häufige Symptome auf dieser Achse:',
      label_cta_question: 'Haben Sie eines dieser Symptome? Sie können Ihren Fall jetzt bewerten.',
      btn_cta: 'Triage Meines Symptoms Starten',
      layers: {
        Endodermo: 'Entoderm',
        Mesodermo: 'Mesoderm',
        Ectodermo: 'Ektoderm',
      },
      zones: {
        craneo: {
          label: 'Schädel & Nervensystem',
          shortLabel: 'Schädel',
          organ: 'Großhirnrinde & Schädelgefäße',
          conflict: 'Frontale Angst, intellektuelle Überforderung, Ohnmacht oder ungesagter Zorn im Denken festgehalten.',
          phaseText: 'Aktive Phase (Sympathikotonie / Stress)',
          symptoms: ['Migräne', 'Schlaflosigkeit', 'Bruxismus', 'Angstzustände'],
        },
        tiroides: {
          label: 'Hals & Schilddrüse',
          shortLabel: 'Hals',
          organ: 'Schilddrüse & Pharynxkanäle',
          conflict: 'Zeitdringlichkeit: "Die Zeit vergeht zu schnell und ich schaffe es nicht" oder Unfähigkeit, das Wort auszusprechen.',
          phaseText: 'Aktive Phase (Zeitkonflikt)',
          symptoms: ['Hypothyreose', 'Schilddrüsenknoten', 'Aphonie'],
        },
        torax: {
          label: 'Brustkorb, Lunge & Herz',
          shortLabel: 'Brustkorb',
          organ: 'Lungenalveolen & Myokard',
          conflict: 'Viszerale Angst vor Ersticken oder Revierverlust: "Man nimmt mir die Luft oder meine Lebensgrundlage".',
          phaseText: 'Heilungsphase (Vagotonie)',
          symptoms: ['Engegefühl in der Brust', 'Angstzustände', 'Asthma'],
        },
        digestivo: {
          label: 'Abdomen & Verdauungstrakt',
          shortLabel: 'Bauch',
          organ: 'Magen, Zwölffingerdarm & Dickdarm',
          conflict: 'Unverdaulicher Brocken: eine Situation oder ein Verrat, den man weder tolerieren, verdauen noch loswerden kann.',
          phaseText: 'Heilungsphase (Regenerative Entzündung)',
          symptoms: ['Gastritis', 'Reizdarm', 'Übergewicht / Wassereinlagerung'],
        },
        columna: {
          label: 'Wirbelsäule & Lendenbereich',
          shortLabel: 'Wirbelsäule',
          organ: 'Lendenwirbel & Rückenmuskulatur',
          conflict: 'Strukturelle Selbstentwertung: "Ich kann diese finanzielle oder familiäre Last nicht allein tragen".',
          phaseText: 'Heilungsphase (Schmerz nach Stress)',
          symptoms: ['Hexenschuss / Lumbalgie', 'Ischialgie', 'Bandscheibenvorfall'],
        },
        epidermis: {
          label: 'Haut & Integumentäres Gewebe',
          shortLabel: 'Haut',
          organ: 'Epidermis & Basalzellschicht',
          conflict: 'Trennungs-Konflikt: unfreiwilliger Verlust von körperlichem Kontakt oder Schutz zu einer wichtigen Person.',
          phaseText: 'Heilungsphase (Ekzem / Juckreiz)',
          symptoms: ['Dermatitis', 'Ekzem', 'Psoriasis'],
        },
      },
    },
    quiz: {
      badge_step: 'SCHRITT',
      step_progress_prefix: 'SCHRITT 0',
      step_progress_ready: 'DIAGNOSE BEREIT',
      step_name_1: 'Konsultationsgrund',
      step_name_2: 'Symptomdauer',
      step_name_3: 'Bisherige Behandlungen',
      step_name_4: 'Land / Stadt',
      step_name_5: 'Identifiziertes Muster',
      header_subtitle: 'Schnelle Triage & Terminvergabe',
      step1_title: 'Was ist Ihr primäres Symptom oder Ihr Konsultationsgrund?',
      step1_desc: 'Wählen Sie ein häufiges Leiden oder geben Sie Ihr eigenes ein, um die Analyse zu beginnen.',
      step2_title: 'Wie lange leiden Sie bereits unter diesem Symptom?',
      step2_desc: 'Die Dauer zeigt an, ob sich der biologische Konflikt in der aktiven oder Erholungsphase befindet.',
      step3_title: 'Welche Behandlungen haben Sie bisher ausprobiert?',
      step3_desc: 'Biodekodierung ergänzt die Schulmedizin und adressiert die psychosomatische Wurzel.',
      step4_title: 'In welchem Land oder welcher Stadt befinden Sie sich?',
      step4_desc: 'Wir betreuen Sie persönlich online in über 20 Ländern in Ihrer lokalen Zeitzone.',
      step5_title: 'Vorläufige Bewertung & Nächster Schritt',
      step5_desc: 'Wir haben Ihre Angaben abgeglichen, um Sie mit einem Fachtherapeuten zu verbinden.',
      btn_continue: 'Weiter',
      btn_whatsapp_final: 'Weiter zu WhatsApp',
      btn_back: 'Zurück',
      direct_wa: 'Oder direkt per WhatsApp ohne Formular anfragen →',
      direct_wa_short: '💬 Direkt per WhatsApp →',
      direct_consult_question: '💬 Möchten Sie lieber direkt anfragen?',
      direct_consult_link: 'Per WhatsApp schreiben →',
      custom_symptom_btn: '+ Symptom nicht in der Liste? Hier eingeben',
      custom_symptom_label: 'Beschreiben Sie Ihr konkretes Symptom:',
      custom_symptom_placeholder: 'Z.B.: Druck in der Brust, Schwindel, Rückenschmerzen...',
      custom_location_label: 'Oder nennen Sie Ihre Stadt:',
      custom_location_placeholder: 'Z.B.: Berlin, München, Wien, Zürich, Hamburg...',
      country_other: 'Anderes Land',
      step5_completed_badge: 'Vorläufige Bewertung Abgeschlossen',
      step5_online_badge: '1-zu-1 Online-Betreuung',
      step5_explanation: 'In der Biodekodierung spiegelt dieses Symptom ein adaptives biologisches Programm wider. Im Erstgespräch identifizieren wir den emotionalen Auslöser.',
      summary_symptom: 'Symptom:',
      summary_duration: 'Dauer:',
      summary_treatments: 'Behandlungen:',
      summary_location: 'Standort / Land:',
      phase1_badge: 'Phase 1 • Orientierung',
      phase1_free: 'KOSTENLOS',
      phase1_title: 'Orientierungsgespräch (15 Min.)',
      phase1_desc: '1-zu-1 Videocall zur Besprechung Ihrer Vorgeschichte und der biologischen Bedeutung.',
      phase1_footer: '100% Kostenlos • Unverbindlich',
      phase2_badge: 'Phase 2 • Tiefgehend',
      phase2_time: '90 Minuten',
      phase2_title: 'Biodekodierungs-Sitzung',
      phase2_desc: 'Individuelle Begleitung zur Auflösung des biologischen Schocks und Wiederherstellung des Wohlbefindens.',
      phase2_investment: 'Investition',
      under_button_note: 'Persönliche Rückmeldung in unter 15 Minuten • Keine Vorauszahlung',
      modify_answers: '← Antworten anpassen',
      close: 'Schließen',
      medical_disclaimer: '* Biodekodierung ist komplementär und ersetzt keine ärztliche Diagnose oder fachärztliche Behandlung.',
      diagnosis_template: (symptom, duration) => `Wir haben ein Muster bezüglich ${symptom} mit einer Dauer von ${duration} identifiziert.`,
      symptoms: {
        gastritis: { label: 'Gastritis / Magensäure', shortLabel: 'Gastritis / Säure', category: 'Verdauung' },
        ansiedad: { label: 'Angst / Chronischer Stress', shortLabel: 'Angst / Stress', category: 'Emotional' },
        lumbalgia: { label: 'Hexenschuss / Rückenschmerzen', shortLabel: 'Rückenschmerzen', category: 'Strukturell' },
        ciatica: { label: 'Ischias / Nervenschmerz', shortLabel: 'Ischias / Nerv', category: 'Neural' },
        hipotiroidismo: { label: 'Schilddrüsenunterfunktion / Fatigue', shortLabel: 'Schilddrüse / Fatigue', category: 'Endokrin' },
        migrana: { label: 'Migräne / Starke Kopfschmerzen', shortLabel: 'Migräne / Kopfschmerz', category: 'Zerebral' },
        colon: { label: 'Reizdarm / Blähbauch', shortLabel: 'Reizdarm', category: 'Intestinal' },
        dermatitis: { label: 'Dermatitis / Psoriasis / Ekzeme', shortLabel: 'Dermatitis / Haut', category: 'Kutan' },
        insomnio: { label: 'Schlaflosigkeit / Schlafstörungen', shortLabel: 'Schlafstörungen', category: 'Erholung' },
        sobrepeso: { label: 'Übergewicht / Wassereinlagerungen', shortLabel: 'Übergewicht / Retention', category: 'Metabolisch' },
      },
      durations: {
        less_1_month: { title: 'Weniger als 1 Monat', sub: 'Kürzlich aufgetreten / Erste Warnung', label: 'Weniger als 1 Monat (Kürzlich aufgetreten)' },
        from_1_to_6_months: { title: '1 bis 6 Monate', sub: 'Wiederkehrende oder schubweise Episoden', label: '1 bis 6 Monate (Wiederkehrend)' },
        from_6_to_12_months: { title: '6 Monate bis 1 Jahr', sub: 'Mäßig anhaltend', label: '6 Monate bis 1 Jahr (Anhaltend)' },
        more_than_1_year: { title: 'Mehr als 1 Jahr', sub: 'Tief verwurzeltes chronisches Bild', label: 'Mehr als 1 Jahr (Chronisch)' },
      },
      treatments: {
        conventional: { title: 'Schulmedizinische Medikamente', sub: 'Arzneimittel oder traditionelle Behandlungen', label: 'Konventionelle / allopathische Medikation' },
        alternative: { title: 'Komplementäre Therapien', sub: 'Akupunktur, Naturheilkunde, Homöopathie', label: 'Alternative oder natürliche Therapien' },
        multiple: { title: 'Mehrere Facharztbesuche', sub: 'Untersuchungen ohne klaren Befund', label: 'Mehrere Spezialisten ohne dauerhafte Besserung' },
        none: { title: 'Erste ganzheitliche Abklärung', sub: 'Erster gezielter Ansatz für dieses Symptom', label: 'Bisher keine Behandlung (Erstkontakt)' },
      },
    },
    footer: {
      disclaimer_title: 'Medizinischer Haftungsausschluss',
      disclaimer_text: 'Die bei Alma Holística angebotenen Sitzungen zur Biodekodierung sind integrative Prozesse zur emotionalen Begleitung. Sie ersetzen keine Diagnose, Behandlung oder Verordnung durch qualifizierte Ärzte, Psychologen oder Psychiater. Wenden Sie sich bei akuten oder chronischen Symptomen immer an Ihren behandelnden Arzt.',
      rights: 'Alle Rechte vorbehalten.',
      contact: 'Kontakt',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      catalog: 'Décodage Biologique',
      catalog_sub: 'Décodage Biologique (Catalogue)',
      cities: 'Villes & Couverture',
      cities_sub: 'Villes & Couverture Globale',
      about: 'À Propos',
      about_sub: 'À Propos (Vivian Velásquez)',
      reviews: '4.3 sur Google Reviews',
      reviews_mobile: '⭐ Avis Google (4.3 / 5.0)',
      schedule: 'Réserver une Séance',
      schedule_whatsapp: 'Réserver par WhatsApp',
      select_lang: 'Choisir la Langue',
      countries_link: '🌎 Voir 20 pays et devises locales →',
    },
    hero: {
      badge: 'DÉCODAGE BIOLOGIQUE INTÉGRATIF',
      title_prefix: "Comprenez l'origine émotionnelle de vos",
      title_highlight: 'symptômes physiques.',
      lead: "Alma Holística est une plateforme clinique de décodage biologique et de thérapie bioémotionnelle intégrative proposant des consultations en ligne 1 à 1 dans plus de 20 pays. Nous vous accompagnons pour décoder le conflit biologique inconscient derrière votre affection.",
      cta_primary: "Démarrer l'Évaluation sur WhatsApp",
      cta_secondary: '[EXPLORER 45 AFFECTIONS]',
      scroll: 'RAD // SCROLL',
      symptoms_label: 'Affections Fréquentes',
      gastritis_title: 'Gastrite & Reflux',
      gastritis_sub: 'Conflit impossible à digérer',
      ansiedad_title: 'Anxiété & Stress',
      ansiedad_sub: "Peur du futur ou anticipation",
      lumbalgia_title: 'Lombalgie & Douleur',
      lumbalgia_sub: 'Charge financière ou manque de soutien',
      migrana_title: 'Migraines & Céphalées',
      migrana_sub: 'Pression aux tempes',
    },
    sticky_bar: {
      whatsapp: 'WhatsApp',
      start_eval: "Démarrer l'Évaluation",
    },
    body_scanner: {
      header_tag: 'SYS // BIO-SCANNER ANATOMIQUE v2.4',
      header_desc: 'Interagissez avec la silhouette biologique pour décoder le conflit sous-jacent à votre symptôme physique',
      legend_stress: 'Stress Actif',
      legend_healing: 'Phase de Réparation',
      plane_tag: 'RAD // PLAN FRONTAL',
      svg_aria: 'Silhouette anatomique humaine avec zones biologiques interactives',
      label_organ: 'ORGANE :',
      label_layer: 'FEUILLET :',
      label_conflict: 'Conflit Biologique Racine (Sens de Survie)',
      label_symptoms: 'Symptômes fréquents sur cet axe :',
      label_cta_question: 'Ressentez-vous l’un de ces symptômes ? Évaluez votre situation maintenant.',
      btn_cta: 'Démarrer le Triage de Mon Symptôme',
      layers: {
        Endodermo: 'Endoderme',
        Mesodermo: 'Mésoderme',
        Ectodermo: 'Ectoderme',
      },
      zones: {
        craneo: {
          label: 'Crâne et Système Nerveux',
          shortLabel: 'Crâne',
          organ: 'Cortex Cérébral et Vaisseaux Crâniens',
          conflict: 'Peur frontale, surmenage intellectuel, impuissance ou colère non exprimée retenue dans les pensées.',
          phaseText: 'Phase Active (Sympathicotonie / Stress)',
          symptoms: ['Migraine', 'Insomnie', 'Bruxisme', 'Anxiété'],
        },
        tiroides: {
          label: 'Gorge et Glande Thyroïde',
          shortLabel: 'Gorge',
          organ: 'Thyroïde et Conduits Pharyngés',
          conflict: 'Urgence du temps : "Le temps passe trop vite et je ne m\'en sors pas" ou impuissance à exprimer ou retenir la parole.',
          phaseText: 'Phase Active (Conflit de Temps)',
          symptoms: ['Hypothyroïdie', 'Nodule Thyroïdien', 'Aphonie'],
        },
        torax: {
          label: 'Thorax, Poumons et Cœur',
          shortLabel: 'Thorax',
          organ: 'Alvéoles Pulmonaires et Myocarde',
          conflict: 'Peur viscérale d\'étouffement ou perte de territoire : "On me prive d\'air ou de mes moyens de subsistance".',
          phaseText: 'Phase de Réparation (Vagotonie)',
          symptoms: ['Oppression Thoracique', 'Anxiété', 'Asthme'],
        },
        digestivo: {
          label: 'Abdomen et Système Digestif',
          shortLabel: 'Abdomen',
          organ: 'Estomac, Duodénum et Côlon',
          conflict: 'Morceau indigeste : une situation ou trahison impossible à tolérer, digérer ou évacuer de sa vie.',
          phaseText: 'Phase de Réparation (Inflammation Régénératrice)',
          symptoms: ['Gastrite', 'Côlon Irritable', 'Surpoids / Rétention'],
        },
        columna: {
          label: 'Colonne Vertébrale et Lombaire',
          shortLabel: 'Colonne',
          organ: 'Vertèbres Lombaires et Muscles Spinaux',
          conflict: 'Dévalorisation structurelle : "Je ne peux pas porter ce fardeau financier ou familial tout seul".',
          phaseText: 'Phase de Réparation (Douleur Post-Stress)',
          symptoms: ['Lombalgie', 'Sciatique', 'Hernie Discale'],
        },
        epidermis: {
          label: 'Peau et Tissu Tégumentaire',
          shortLabel: 'Peau',
          organ: 'Épiderme et Couche Basale Cutanée',
          conflict: 'Conflit de séparation : rupture involontaire de contact physique, affectif ou de protection avec un être cher.',
          phaseText: 'Phase de Réparation (Eczéma / Prurit)',
          symptoms: ['Dermatite', 'Eczéma', 'Psoriasis'],
        },
      },
    },
    quiz: {
      badge_step: 'ÉTAPE',
      step_progress_prefix: 'ÉTAPE 0',
      step_progress_ready: 'DIAGNOSTIC PRÊT',
      step_name_1: 'Motif de Consultation',
      step_name_2: 'Durée du Symptôme',
      step_name_3: 'Traitements Précédents',
      step_name_4: 'Pays / Ville',
      step_name_5: 'Schéma Identifié',
      header_subtitle: 'Triage Clinique Rapide & Rendez-vous',
      step1_title: 'Quel est votre symptôme principal ou motif de consultation ?',
      step1_desc: 'Sélectionnez une affection fréquente ou saisissez la vôtre pour démarrer votre analyse.',
      step2_title: 'Depuis combien de temps ressentez-vous ce symptôme ?',
      step2_desc: 'La durée indique si le conflit biologique est en phase active ou en phase de réparation.',
      step3_title: 'Quels traitements avez-vous déjà essayés ?',
      step3_desc: 'Le décodage biologique est complémentaire à la médecine et traite la racine psychosomatique.',
      step4_title: 'Dans quel pays ou ville vous trouvez-vous ?',
      step4_desc: 'Nous vous accompagnons en ligne dans plus de 20 pays selon votre fuseau horaire.',
      step5_title: 'Évaluation Préliminaire & Étape Suivante',
      step5_desc: 'Nous avons corrélé vos réponses pour vous orienter vers un thérapeute dédié.',
      btn_continue: 'Continuer',
      btn_whatsapp_final: 'Continuer vers WhatsApp',
      btn_back: 'Retour',
      direct_wa: 'Ou consultez directement par WhatsApp sans remplir le formulaire →',
      direct_wa_short: '💬 WhatsApp direct →',
      direct_consult_question: '💬 Vous préférez consulter directement ?',
      direct_consult_link: 'Écrire sur WhatsApp →',
      custom_symptom_btn: '+ Votre affection n’est pas listée ? Écrivez-la ici',
      custom_symptom_label: 'Décrivez votre symptôme spécifique :',
      custom_symptom_placeholder: 'Ex : Pression thoracique, vertiges, douleur dorsale...',
      custom_location_label: 'Ou écrivez votre ville :',
      custom_location_placeholder: 'Ex : Paris, Lyon, Bruxelles, Montréal, Genève...',
      country_other: 'Autre pays',
      step5_completed_badge: 'Évaluation Préliminaire Terminée',
      step5_online_badge: 'Accompagnement 1 à 1 en Ligne',
      step5_explanation: 'En décodage biologique, ce symptôme traduit un programme biologique adaptatif. Lors de votre séance initiale, nous explorerons le déclencheur émotionnel.',
      summary_symptom: 'Symptôme :',
      summary_duration: 'Évolution :',
      summary_treatments: 'Traitements :',
      summary_location: 'Localisation / Pays :',
      phase1_badge: 'Phase 1 • Orientation',
      phase1_free: 'GRATUIT',
      phase1_title: 'Appel d’Évaluation (15 min)',
      phase1_desc: 'Appel vidéo 1 à 1 pour écouter votre histoire et expliquer le sens biologique.',
      phase1_footer: '100% Gratuit • Sans Engagement',
      phase2_badge: 'Phase 2 • Approfondie',
      phase2_time: '90 Minutes',
      phase2_title: 'Séance de Décodage',
      phase2_desc: 'Accompagnement personnalisé pour désactiver le choc biologique et restaurer votre équilibre.',
      phase2_investment: 'Tarif',
      under_button_note: 'Réponse personnalisée en moins de 15 minutes • Aucun paiement préalable',
      modify_answers: '← Modifier les réponses',
      close: 'Fermer',
      medical_disclaimer: '* Le décodage biologique est complémentaire et ne remplace aucun diagnostic ni traitement médical conventionnel.',
      diagnosis_template: (symptom, duration) => `Nous avons identifié un schéma lié à ${symptom} de ${duration} d'évolution.`,
      symptoms: {
        gastritis: { label: 'Gastrite / Brûlures d’estomac', shortLabel: 'Gastrite / Acidité', category: 'Digestif' },
        ansiedad: { label: 'Anxiété / Stress chronique', shortLabel: 'Anxiété / Stress', category: 'Émotionnel' },
        lumbalgia: { label: 'Lombalgie / Douleur au dos', shortLabel: 'Mal de dos / Lombaire', category: 'Structurel' },
        ciatica: { label: 'Sciatique / Douleur nerveuse', shortLabel: 'Sciatique / Nerf', category: 'Neural' },
        hipotiroidismo: { label: 'Hypothyroïdie / Fatigue', shortLabel: 'Thyroïde / Fatigue', category: 'Endocrinien' },
        migrana: { label: 'Migraines / Céphalées intenses', shortLabel: 'Migraines / Céphalée', category: 'Céphalique' },
        colon: { label: 'Côlon Irritable / Spasmes', shortLabel: 'Côlon Irritable', category: 'Intestinal' },
        dermatitis: { label: 'Dermatite / Psoriasis / Eczéma', shortLabel: 'Dermatite / Peau', category: 'Cutané' },
        insomnio: { label: 'Insomnie / Troubles du sommeil', shortLabel: 'Insomnie / Sommeil', category: 'Repos' },
        sobrepeso: { label: 'Surpoids / Rétention d’eau', shortLabel: 'Surpoids / Rétention', category: 'Métabolique' },
      },
      durations: {
        less_1_month: { title: 'Moins d’un mois', sub: 'Apparition récente / Alerte initiale', label: 'Moins d’un mois (Récent)' },
        from_1_to_6_months: { title: '1 à 6 mois', sub: 'Épisodes récurrents ou intermittents', label: '1 à 6 mois (Récurrent)' },
        from_6_to_12_months: { title: '6 mois à 1 an', sub: 'Persistance modérée', label: '6 mois à 1 an (Persistant)' },
        more_than_1_year: { title: 'Plus d’un an', sub: 'Tableau chronique enraciné', label: 'Plus d’un an (Chronique)' },
      },
      treatments: {
        conventional: { title: 'Médication conventionnelle', sub: 'Médicaments ou soins médicaux allopathiques', label: 'Médicaments allopathiques traditionnels' },
        alternative: { title: 'Thérapies complémentaires', sub: 'Acupuncture, naturopathie ou homéopathie', label: 'Thérapies alternatives ou naturelles' },
        multiple: { title: 'Multiples spécialistes', sub: 'Examens variés sans cause organique claire', label: 'Nombreuses consultations sans soulagement' },
        none: { title: 'Première démarche', sub: 'Première approche spécifique pour ce symptôme', label: 'Aucun traitement préalable (première fois)' },
      },
    },
    footer: {
      disclaimer_title: 'Avertissement Médical',
      disclaimer_text: "Les séances de décodage biologique proposées chez Alma Holística sont des processus d'accompagnement intégratif. Elles ne remplacent ni le diagnostic, ni le traitement ou la prescription d'un médecin ou psychiatre qualifié. En cas de symptôme aigu ou chronique, consultez toujours votre médecin traitant.",
      rights: 'Tous droits réservés.',
      contact: 'Contact',
    },
  },

  it: {
    nav: {
      home: 'Home',
      catalog: 'Biodecodifica',
      catalog_sub: 'Biodecodifica (Catalogo)',
      cities: 'Città & Copertura',
      cities_sub: 'Città & Copertura Globale',
      about: 'Chi Siamo',
      about_sub: 'Chi Siamo (Vivian Velásquez)',
      reviews: '4.3 su Google Reviews',
      reviews_mobile: '⭐ Recensioni Google (4.3 / 5.0)',
      schedule: 'Prenota Sessione',
      schedule_whatsapp: 'Prenota Sessione su WhatsApp',
      select_lang: 'Seleziona Lingua',
      countries_link: '🌎 Vedi 20 paesi e valute locali →',
    },
    hero: {
      badge: 'BIODECODIFICA INTEGRATIVA CLINICA',
      title_prefix: "Comprendi l'origine emotiva dei tuoi",
      title_highlight: 'sintomi fisici.',
      lead: "Alma Holística è una piattaforma clinica di biodecodifica e terapia bioemozionale integrativa con sessioni online 1 a 1 in oltre 20 paesi. Ti accompagniamo a decodificare il conflitto biologico inconscio dietro il tuo disturbo.",
      cta_primary: 'Inizia Valutazione su WhatsApp',
      cta_secondary: '[ESPLORA 45 DISTURBI]',
      scroll: 'RAD // SCROLL',
      symptoms_label: 'Disturbi Frequenti',
      gastritis_title: 'Gastrite & Reflusso',
      gastritis_sub: 'Conflitto che non riesco a digerire',
      ansiedad_title: 'Ansia & Stress',
      ansiedad_sub: 'Paura del futuro o anticipazione',
      lumbalgia_title: 'Lombalgia & Schiena',
      lumbalgia_sub: 'Carico economico o mancanza di sostegno',
      migrana_title: 'Emicrania & Cefalea',
      migrana_sub: 'Pressione alle tempie',
    },
    sticky_bar: {
      whatsapp: 'WhatsApp',
      start_eval: 'Inizia Valutazione',
    },
    body_scanner: {
      header_tag: 'SYS // BIO-SCANNER ANATOMICO v2.4',
      header_desc: 'Interagisci con la sagoma biologica per decodificare il conflitto alla base del tuo sintomo fisico',
      legend_stress: 'Stress Attivo',
      legend_healing: 'Riparazione',
      plane_tag: 'RAD // PIANO CORONALE',
      svg_aria: 'Sagoma anatomica umana con hotspot biologici interattivi',
      label_organ: 'ORGANO:',
      label_layer: 'FOGLIETTO:',
      label_conflict: 'Conflitto Biologico Radice (Senso di Sopravvivenza)',
      label_symptoms: 'Sintomi frequenti su questo asse:',
      label_cta_question: 'Manifesti uno di questi sintomi? Puoi valutare il tuo caso adesso.',
      btn_cta: 'Inizia Triage del Mio Sintomo',
      layers: {
        Endodermo: 'Endoderma',
        Mesodermo: 'Mesoderma',
        Ectodermo: 'Ectoderma',
      },
      zones: {
        craneo: {
          label: 'Cranio e Sistema Nervoso',
          shortLabel: 'Cranio',
          organ: 'Corteccia Cerebrale e Vasi Cranici',
          conflict: 'Paura frontale, sovraccarico intellettuale, impotenza o rabbia inespressa trattenuta nei pensieri.',
          phaseText: 'Fase Attiva (Simpaticotonia / Stress)',
          symptoms: ['Emicrania', 'Insonnia', 'Bruxismo', 'Ansia'],
        },
        tiroides: {
          label: 'Gola e Ghiandola Tiroide',
          shortLabel: 'Gola',
          organ: 'Tiroide e Condotti Faringei',
          conflict: 'Urgenza di tempo: "Il tempo passa troppo in fretta e non ce la faccio" o impotenza nel pronunciare la parola.',
          phaseText: 'Fase Attiva (Conflitto di Tempo)',
          symptoms: ['Ipotiroidismo', 'Nodulo Tiroideo', 'Afonia'],
        },
        torax: {
          label: 'Torace, Polmoni e Cuore',
          shortLabel: 'Torace',
          organ: 'Alveoli Polmonari e Miocardio',
          conflict: 'Paura viscerale di soffocamento o perdita di territorio: "Sento che mi tolgono l\'aria o il sostentamento".',
          phaseText: 'Fase di Riparazione (Vagotonia)',
          symptoms: ['Oppressione Toracica', 'Ansia', 'Asma'],
        },
        digestivo: {
          label: 'Addome e Apparato Digerente',
          shortLabel: 'Addome',
          organ: 'Stomaco, Duodeno e Colon',
          conflict: 'Boccone indigesto: una situazione o un tradimento che non riesci a tollerare, digerire o espellere.',
          phaseText: 'Fase di Riparazione (Infiammazione Rigenerativa)',
          symptoms: ['Gastrite', 'Colon Irritabile', 'Sovrappeso / Ritenzione'],
        },
        columna: {
          label: 'Colonna Vertebrale e Lombare',
          shortLabel: 'Colonna',
          organ: 'Vertebre Lombari e Muscoli Spinali',
          conflict: 'Svalutazione strutturale: "Non riesco a sostenere questo carico economico o familiare da solo".',
          phaseText: 'Fase di Riparazione (Dolore Post-Stress)',
          symptoms: ['Lombalgia', 'Sciatica', 'Ernia del Disco'],
        },
        epidermis: {
          label: 'Pelle e Tessuto Tegumentario',
          shortLabel: 'Pelle',
          organ: 'Epidermide e Strato Basale Cutaneo',
          conflict: 'Conflitto di separazione: rottura involontaria del contatto fisico, affettivo o di protezione con una persona cara.',
          phaseText: 'Fase di Riparazione (Eczema / Prurito)',
          symptoms: ['Dermatite', 'Eczema', 'Psoriasi'],
        },
      },
    },
    quiz: {
      badge_step: 'PASSO',
      step_progress_prefix: 'PASSO 0',
      step_progress_ready: 'DIAGNOSI PRONTA',
      step_name_1: 'Motivo del Consulto',
      step_name_2: 'Tempo di Evoluzione',
      step_name_3: 'Trattamenti Precedenti',
      step_name_4: 'Paese / Città',
      step_name_5: 'Schema Identificato',
      header_subtitle: 'Triage Rapido & Prenotazione',
      step1_title: 'Qual è il tuo sintomo o motivo principale del consulto?',
      step1_desc: 'Seleziona un disturbo comune o scrivi il tuo per avviare l’analisi bioemozionale.',
      step2_title: 'Da quanto tempo avverti questo sintomo?',
      step2_desc: 'La durata indica se il conflitto biologico è in fase attiva o in fase di riparazione.',
      step3_title: 'Quali trattamenti hai già provato in precedenza?',
      step3_desc: 'La biodecodifica è complementare alla medicina e affronta la radice psicosomatica.',
      step4_title: 'In quale paese o città ti trovi?',
      step4_desc: 'Offriamo sessioni online personalizzate in oltre 20 paesi nel tuo fuso orario locale.',
      step5_title: 'Valutazione Preliminare e Prossimo Passo',
      step5_desc: 'Abbiamo correlato le tue risposte per collegarti con uno specialista clinico dedicato.',
      btn_continue: 'Continua',
      btn_whatsapp_final: 'Continua su WhatsApp',
      btn_back: 'Indietro',
      direct_wa: 'Oppure consulta direttamente su WhatsApp senza compilare il modulo →',
      direct_wa_short: '💬 WhatsApp diretto →',
      direct_consult_question: '💬 Preferisci consultare direttamente?',
      direct_consult_link: 'Scrivi su WhatsApp →',
      custom_symptom_btn: '+ Il tuo disturbo non è nell’elenco? Scrivilo qui',
      custom_symptom_label: 'Descrivi il tuo sintomo specifico:',
      custom_symptom_placeholder: 'Es: Pressione al petto, vertigini, dolore dorsale...',
      custom_location_label: 'Oppure inserisci la tua città:',
      custom_location_placeholder: 'Es: Roma, Milano, Napoli, Torino, Palermo...',
      country_other: 'Altro Paese',
      step5_completed_badge: 'Valutazione Preliminare Completata',
      step5_online_badge: 'Assistenza 1 a 1 Online',
      step5_explanation: 'Nella biodecodifica, questo sintomo riflette un programma biologico adattivo. Durante la prima sessione individueremo la causa emotiva per favorirne la risoluzione.',
      summary_symptom: 'Sintomo:',
      summary_duration: 'Evoluzione:',
      summary_treatments: 'Trattamenti:',
      summary_location: 'Posizione / Paese:',
      phase1_badge: 'Fase 1 • Orientamento',
      phase1_free: 'GRATUITO',
      phase1_title: 'Colloquio di Valutazione (15 min)',
      phase1_desc: 'Videochiamata 1 a 1 per ascoltare il tuo caso, valutare la storia e spiegare il senso biologico.',
      phase1_footer: '100% Gratuito • Senza Impegno',
      phase2_badge: 'Fase 2 • Approfondita',
      phase2_time: '90 Minuti',
      phase2_title: 'Sessione di Biodecodifica',
      phase2_desc: 'Supporto individuale per disattivare lo shock biologico e ripristinare il benessere.',
      phase2_investment: 'Investimento',
      under_button_note: 'Risposta personalizzata in meno di 15 minuti • Nessun costo anticipato',
      modify_answers: '← Modifica risposte',
      close: 'Chiudi',
      medical_disclaimer: '* La biodecodifica è complementare e non sostituisce diagnosi né cure mediche qualificate.',
      diagnosis_template: (symptom, duration) => `Abbiamo identificato uno schema correlato a ${symptom} di ${duration} di evoluzione.`,
      symptoms: {
        gastritis: { label: 'Gastrite / Acidità di stomaco', shortLabel: 'Gastrite / Acidità', category: 'Digerente' },
        ansiedad: { label: 'Ansia / Stress cronico', shortLabel: 'Ansia / Stress', category: 'Emozionale' },
        lumbalgia: { label: 'Lombalgia / Mal di schiena', shortLabel: 'Mal di Schiena', category: 'Strutturale' },
        ciatica: { label: 'Sciatica / Dolore nervoso', shortLabel: 'Sciatica / Nervo', category: 'Neurale' },
        hipotiroidismo: { label: 'Ipotiroidismo / Stanchezza', shortLabel: 'Tiroide / Fatica', category: 'Endocrino' },
        migrana: { label: 'Emicranie / Cefalee intense', shortLabel: 'Emicrania / Cefalea', category: 'Cefalico' },
        colon: { label: 'Colon Irritabile / Gonfiore', shortLabel: 'Colon Irritabile', category: 'Intestinale' },
        dermatitis: { label: 'Dermatite / Psoriasi / Eruzioni', shortLabel: 'Dermatite / Pelle', category: 'Cutaneo' },
        insomnio: { label: 'Insonnia / Disturbi del sonno', shortLabel: 'Insonnia / Sonno', category: 'Riposo' },
        sobrepeso: { label: 'Sovrappeso / Ritenzione idrica', shortLabel: 'Sovrappeso / Ritenzione', category: 'Metabolico' },
      },
      durations: {
        less_1_month: { title: 'Meno di 1 mese', sub: 'Esordio recente / Segnale iniziale', label: 'Meno di 1 mese (Recente)' },
        from_1_to_6_months: { title: 'Da 1 a 6 mesi', sub: 'Episodi ricorrenti o intermittenti', label: 'Da 1 a 6 mesi (Ricorrente)' },
        from_6_to_12_months: { title: 'Da 6 mesi a 1 anno', sub: 'Persistenza moderata', label: 'Da 6 mesi a 1 anno (Moderata)' },
        more_than_1_year: { title: 'Più di 1 anno', sub: 'Quadro cronico radicato', label: 'Più di 1 anno (Cronico)' },
      },
      treatments: {
        conventional: { title: 'Farmaci convenzionali', sub: 'Farmaci o cure mediche tradizionali', label: 'Medicazione allopatica o convenzionale' },
        alternative: { title: 'Terapie complementari', sub: 'Agopuntura, naturopatia o omeopatia', label: 'Terapie alternative o naturali' },
        multiple: { title: 'Molteplici specialisti', sub: 'Vari esami senza riscontro definitivo', label: 'Molteplici consulti senza sollievo duraturo' },
        none: { title: 'Primo approccio', sub: 'Primo percorso mirato per questo sintomo', label: 'Nessuno fino a questo momento' },
      },
    },
    footer: {
      disclaimer_title: 'Dichiarazione di Non Responsabilità Medica',
      disclaimer_text: 'Le sessioni di biodecodifica e terapia bioemozionale offerte presso Alma Holística sono percorsi di supporto integrativo e benessere emotivo. Non sostituiscono la diagnosi, il trattamento né le prescrizioni di medici, psicologi o psichiatri qualificati. In caso di sintomi acuti o cronici, consultare sempre il proprio medico curante.',
      rights: 'Tutti i diritti riservati.',
      contact: 'Contatto',
    },
  },
};
