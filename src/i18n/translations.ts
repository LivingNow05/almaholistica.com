/**
 * src/i18n/translations.ts
 * Diccionario nativo multilingüe para Alma Holística (almaholistica.com)
 * Idiomas soportados: Español (es), English (en), Deutsch (de), Français (fr), Italiano (it).
 * 100% nativo, sin dependencias de Google Translate ni servicios externos.
 */

export type LangCode = 'es' | 'en' | 'de' | 'fr' | 'it';

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
  quiz: {
    badge_step: string;
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
  };
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
    quiz: {
      badge_step: 'PASO',
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
    quiz: {
      badge_step: 'STEP',
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
    quiz: {
      badge_step: 'SCHRITT',
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
    quiz: {
      badge_step: 'ÉTAPE',
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
    quiz: {
      badge_step: 'PASSO',
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
    },
    footer: {
      disclaimer_title: 'Dichiarazione di Non Responsabilità Medica',
      disclaimer_text: 'Le sessioni di biodecodifica e terapia bioemozionale offerte presso Alma Holística sono percorsi di supporto integrativo e benessere emotivo. Non sostituiscono la diagnosi, il trattamento né le prescrizioni di medici, psicologi o psichiatri qualificati. In caso di sintomi acuti o cronici, consultare sempre il proprio medico curante.',
      rights: 'Tutti i diritti riservati.',
      contact: 'Contatto',
    },
  },
};
