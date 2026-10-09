/**
 * WhatsAppQuizModal.tsx — Componente Interactivo de Conversión y Diagnóstico Preliminar
 * Alma Holística (almaholistica.com)
 *
 * Estética: Swiss Bio-Tech Grotesque Contemporánea.
 * Paleta Biológica Sólida Mate: Fondo Abisal (#060A1A), Midnight Navy (#0A1226, #0E172F),
 * Acentos Clínicos Cyan (#38BDF8) y Verde Esmeralda Oficial WhatsApp (#25D366).
 * 100% sólido mate, cero transparencias en superficies, cero rastros de neón o amarillo.
 * Cumple estrictamente con React 19, TypeScript estricto y suites de pruebas E2E (Tiers 1-4, ADV-M2, ADV-M3, ADV-M4).
 *
 * Soporte Nativo Multilingüe Dinámico: Español, English, Deutsch, Français, Italiano.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../../config/site';
import { TRANSLATIONS, type LangCode } from '../../i18n/translations';

export type QuizStep = 1 | 2 | 3 | 4 | 5;

export interface WhatsAppQuizModalProps {
  initialSymptom?: string;
  initialLocation?: string;
}

const SYMPTOM_KEYS = [
  { key: 'gastritis', icon: '🔥' },
  { key: 'ansiedad', icon: '⚡' },
  { key: 'lumbalgia', icon: '🛡️' },
  { key: 'ciatica', icon: '⚡' },
  { key: 'hipotiroidismo', icon: '🦋' },
  { key: 'migrana', icon: '🧠' },
  { key: 'colon', icon: '🌊' },
  { key: 'dermatitis', icon: '🌿' },
  { key: 'insomnio', icon: '🌙' },
  { key: 'sobrepeso', icon: '⚖️' },
] as const;

const DURATION_KEYS = [
  { key: 'less_1_month', icon: '⚡' },
  { key: 'from_1_to_6_months', icon: '📅' },
  { key: 'from_6_to_12_months', icon: '⏳' },
  { key: 'more_than_1_year', icon: '🔒' },
] as const;

const TREATMENT_KEYS = [
  { key: 'conventional', icon: '💊' },
  { key: 'alternative', icon: '🌿' },
  { key: 'multiple', icon: '🩺' },
  { key: 'none', icon: '✨' },
] as const;

interface CountryOption {
  name: string;
  flag: string;
  price: string;
  currency: string;
}

// Helper para determinar la tarifa y moneda según la ubicación ingresada
function resolveCountryPricing(loc: string): { country: string; price: string; currency: string } {
  const norm = (loc || '').toLowerCase().trim();
  if (norm.includes('colombia') || norm.includes('bogot') || norm.includes('medell') || norm.includes('cali') || norm.includes('barranquilla') || norm.includes('cartagena') || norm.includes('bucaramanga')) {
    return { country: 'Colombia', price: '$140.000 - $220.000 COP', currency: 'COP' };
  }
  if (norm.includes('mex') || norm.includes('méx') || norm.includes('cdmx') || norm.includes('guadalajara') || norm.includes('monterrey') || norm.includes('puebla') || norm.includes('cancun')) {
    return { country: 'México', price: '$800 - $1,400 MXN', currency: 'MXN' };
  }
  if (norm.includes('españa') || norm.includes('espana') || norm.includes('madrid') || norm.includes('barcelona') || norm.includes('valencia') || norm.includes('sevilla') || norm.includes('malaga') || norm.includes('bilbao')) {
    return { country: 'España', price: '50€ - 85€ EUR', currency: 'EUR' };
  }
  if (norm.includes('estados unidos') || norm.includes('eeuu') || norm.includes('usa') || norm.includes('miami') || norm.includes('los angeles') || norm.includes('houston') || norm.includes('nueva york') || norm.includes('chicago') || norm.includes('orlando')) {
    return { country: 'Estados Unidos', price: '$65 - $110 USD', currency: 'USD' };
  }
  if (norm.includes('argentina') || norm.includes('buenos aires') || norm.includes('cordoba') || norm.includes('rosario') || norm.includes('mendoza')) {
    return { country: 'Argentina', price: '$45.000 - $75.000 ARS', currency: 'ARS' };
  }
  if (norm.includes('chile') || norm.includes('santiago') || norm.includes('valparaiso') || norm.includes('concepcion')) {
    return { country: 'Chile', price: '$38.000 - $62.000 CLP', currency: 'CLP' };
  }
  if (norm.includes('perú') || norm.includes('peru') || norm.includes('lima') || norm.includes('arequipa') || norm.includes('trujillo')) {
    return { country: 'Perú', price: 'S/ 150 - S/ 250 PEN', currency: 'PEN' };
  }
  if (norm.includes('costa rica') || norm.includes('san jose') || norm.includes('alajuela')) {
    return { country: 'Costa Rica', price: '₡25.000 - ₡40.000 CRC', currency: 'CRC' };
  }
  if (norm.includes('uruguay') || norm.includes('montevideo')) {
    return { country: 'Uruguay', price: '$1.800 - $2.900 UYU', currency: 'UYU' };
  }
  if (norm.includes('bolivia') || norm.includes('la paz') || norm.includes('santa cruz')) {
    return { country: 'Bolivia', price: '280 Bs - 450 Bs BOB', currency: 'BOB' };
  }
  if (norm.includes('paraguay') || norm.includes('asuncion')) {
    return { country: 'Paraguay', price: '₲300.000 - ₲500.000 PYG', currency: 'PYG' };
  }
  if (norm.includes('dominicana') || norm.includes('santo domingo')) {
    return { country: 'República Dominicana', price: 'RD$2.500 - RD$3.800 DOP', currency: 'DOP' };
  }
  if (norm.includes('ecuador') || norm.includes('quito') || norm.includes('guayaquil') || norm.includes('cuenca') || norm.includes('panam') || norm.includes('venezuela') || norm.includes('salvador')) {
    return { country: loc || 'Latinoamérica', price: '$40 - $65 USD', currency: 'USD' };
  }
  return { country: loc || 'Atención Online', price: '$40 - $70 USD', currency: 'USD' };
}

export function WhatsAppQuizModal({
  initialSymptom = '',
  initialLocation = '',
}: WhatsAppQuizModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<QuizStep>(1);
  const [symptom, setSymptom] = useState<string>(initialSymptom);
  const [customSymptom, setCustomSymptom] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [priorTreatments, setPriorTreatments] = useState<string>('');
  const [customPriorTreatments, setCustomPriorTreatments] = useState<string>('');
  const [location, setLocation] = useState<string>(initialLocation);
  const [customLocation, setCustomLocation] = useState<string>('');
  const [showCustomSymptomInput, setShowCustomSymptomInput] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<LangCode>('es');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alma_preferred_lang') as LangCode;
      if (saved && ['es', 'en', 'de', 'fr', 'it'].includes(saved)) {
        setCurrentLang(saved);
      }
    } catch (e) {}

    const handleLangChanged = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.lang && ['es', 'en', 'de', 'fr', 'it'].includes(detail.lang)) {
        setCurrentLang(detail.lang);
      }
    };

    window.addEventListener('alma:lang-changed', handleLangChanged);
    return () => {
      window.removeEventListener('alma:lang-changed', handleLangChanged);
    };
  }, []);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['es'];

  // Listas de opciones dinámicas según idioma seleccionado
  const presetSymptoms = useMemo(() => {
    return SYMPTOM_KEYS.map(({ key, icon }) => {
      const item = (t.quiz.symptoms as any)[key];
      return {
        key,
        icon,
        label: item ? item.label : key,
        shortLabel: item ? item.shortLabel : key,
        category: item ? item.category : '',
      };
    });
  }, [t]);

  const presetDurations = useMemo(() => {
    return DURATION_KEYS.map(({ key, icon }) => {
      const item = (t.quiz.durations as any)[key];
      return {
        key,
        icon,
        title: item ? item.title : key,
        sub: item ? item.sub : '',
        label: item ? item.label : key,
      };
    });
  }, [t]);

  const presetTreatments = useMemo(() => {
    return TREATMENT_KEYS.map(({ key, icon }) => {
      const item = (t.quiz.treatments as any)[key];
      return {
        key,
        icon,
        title: item ? item.title : key,
        sub: item ? item.sub : '',
        label: item ? item.label : key,
      };
    });
  }, [t]);

  const presetCountries = useMemo<CountryOption[]>(() => [
    { name: 'Colombia', flag: '🇨🇴', price: '$140.000 - $220.000 COP', currency: 'COP' },
    { name: 'México', flag: '🇲🇽', price: '$800 - $1,400 MXN', currency: 'MXN' },
    { name: 'España', flag: '🇪🇸', price: '50€ - 85€ EUR', currency: 'EUR' },
    { name: 'Estados Unidos', flag: '🇺🇸', price: '$65 - $110 USD', currency: 'USD' },
    { name: 'Argentina', flag: '🇦🇷', price: '$45.000 - $75.000 ARS', currency: 'ARS' },
    { name: 'Chile', flag: '🇨🇱', price: '$38.000 - $62.000 CLP', currency: 'CLP' },
    { name: 'Perú', flag: '🇵🇪', price: 'S/ 150 - S/ 250 PEN', currency: 'PEN' },
    { name: 'Ecuador', flag: '🇪🇨', price: '$40 - $65 USD', currency: 'USD' },
    { name: 'Costa Rica', flag: '🇨🇷', price: '₡25.000 - ₡40.000 CRC', currency: 'CRC' },
    { name: 'Panamá', flag: '🇵🇦', price: '$40 - $65 USD', currency: 'USD' },
    { name: t.quiz.country_other || 'Otro País', flag: '🌐', price: '$40 - $65 USD', currency: 'USD' },
  ], [t]);

  // Síntoma y valores efectivos (priorizan texto personalizado si fue escrito)
  const effectiveSymptom = (customSymptom.trim() || symptom.trim()) || 'Consulta General';
  const effectiveDuration = (customDuration.trim() || duration.trim()) || 'No especificado';
  const effectivePriorTreatments = (customPriorTreatments.trim() || priorTreatments.trim()) || 'No especificado';
  const effectiveLocation = (customLocation.trim() || location.trim()) || 'Consulta Online';

  // Manejador de selección táctil y avance automático (Tap & Flow en 160ms)
  const handleSelectAndAdvance = useCallback((setter: (val: string) => void, val: string, nextStep: QuizStep) => {
    setter(val);
    setTimeout(() => {
      setStep(nextStep);
    }, 160);
  }, []);

  // Manejador de apertura con soporte de precarga contextual
  const handleOpen = useCallback((params?: { symptom?: string; city?: string }) => {
    const sym = params?.symptom?.trim() || '';
    const loc = params?.city?.trim() || '';

    if (sym) {
      setSymptom(sym);
      setCustomSymptom('');
      setStep(2);
    } else {
      setStep(1);
    }

    if (loc) {
      setLocation(loc);
      setCustomLocation('');
    }

    setIsOpen(true);
  }, []);

  // Manejador de cierre
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Bloqueo de scroll en document.body cuando el modal está abierto (sin CLS)
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Delegación global de clics, escucha de CustomEvent y control de teclado (Escape)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleDocumentClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.closest('.language-selector-wrapper') ||
        target.closest('.lang-option-btn') ||
        target.closest('#lang-menu-desktop') ||
        target.closest('#lang-menu-mobile') ||
        target.closest('#lang-mobile-selector-section') ||
        target.closest('#lang-backdrop-mobile')
      ) {
        return;
      }

      const trigger = target.closest<HTMLElement>(
        'a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]'
      );

      if (!trigger || trigger.closest('[data-quiz-modal]') || trigger.hasAttribute('data-quiz-final')) {
        return;
      }

      e.preventDefault();

      const triggerSymptom =
        trigger.getAttribute('data-symptom') ||
        trigger.closest('[data-symptom]')?.getAttribute('data-symptom') ||
        '';

      const triggerCity =
        trigger.getAttribute('data-city') ||
        trigger.getAttribute('data-location') ||
        trigger.closest('[data-city]')?.getAttribute('data-city') ||
        trigger.closest('[data-location]')?.getAttribute('data-location') ||
        '';

      handleOpen({
        symptom: triggerSymptom,
        city: triggerCity,
      });
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ symptom?: string; city?: string; location?: string }>;
      const detail = customEvent.detail || {};
      handleOpen({
        symptom: detail.symptom,
        city: detail.city || detail.location,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    window.addEventListener('alma:open-quiz', handleCustomEvent);
    window.addEventListener('keydown', handleKeyDown);

    if (typeof window !== 'undefined' && (window as any).__pendingQuizDetail) {
      const pending = (window as any).__pendingQuizDetail;
      (window as any).__pendingQuizDetail = null;
      handleOpen({
        symptom: pending.symptom,
        city: pending.city,
      });
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
      window.removeEventListener('alma:open-quiz', handleCustomEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  // Generación de URL final de WhatsApp estructurada con buildWhatsAppUrl()
  const finalWhatsAppUrl = buildWhatsAppUrl({
    phone: SITE_CONFIG.whatsappNumber,
    symptom: effectiveSymptom,
    duration: effectiveDuration,
    priorTreatments: effectivePriorTreatments,
    location: effectiveLocation,
  });

  // URL directa de escape sin completar el quiz
  const directWhatsAppUrl = buildWhatsAppUrl({
    phone: SITE_CONFIG.whatsappNumber,
    symptom: effectiveSymptom !== 'Consulta General' ? effectiveSymptom : 'Consulta Directa',
    location: effectiveLocation !== 'Consulta Online' ? effectiveLocation : '',
  });

  // Información de precios localizada para el paso 5
  const pricingInfo = resolveCountryPricing(effectiveLocation);

  // Fórmula diagnóstica dinámica según idioma con fallback estricto
  const diagnosisText = t.quiz.diagnosis_template
    ? t.quiz.diagnosis_template(effectiveSymptom, effectiveDuration)
    : `Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`;

  return (
    <div
      data-quiz-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
      aria-describedby="quiz-modal-description"
    >
      {/* Backdrop 100% sólido mate (#060A1A) */}
      <div
        className="fixed inset-0 bg-[#060A1A] cursor-pointer animate-backdrop-fade"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Contenedor Modal en Superficie Midnight Navy (#0A1226) */}
      <div
        data-quiz-card="true"
        className="relative w-full max-w-xl max-h-[85dvh] flex flex-col bg-[#0A1226] border border-slate-800 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-7 md:p-8 z-10 my-auto text-slate-100 shadow-2xl animate-modal-enter overflow-hidden"
      >
        {/* Acento superior de precisión Swiss Bio-Tech */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#38BDF8]" />

        {/* Barra Superior: Logo de Marca, Identificador Clínico y Botón Cerrar */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#060A1A] border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/logo-mariposa-con-fondo-completo.svg"
                alt="Alma Holística"
                className="w-full h-full object-contain"
                width="40"
                height="40"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-extrabold text-sm sm:text-base text-white tracking-tight uppercase">
                  Alma Holística
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0E172F] border border-[#1E3A5F] text-[10px] font-sans font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  ONLINE
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#779DD1] font-sans font-semibold block">
                {t.quiz.header_subtitle}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar modal de evaluación"
            className="w-9 h-9 rounded-full text-slate-400 hover:text-white bg-[#0E172F] hover:bg-[#1E293B] border border-slate-800 flex items-center justify-center active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Barra de Progreso Segmentada: 4 pasos visuales con acento Cyan (#38BDF8) */}
        <div className="w-full mb-4 sm:mb-5 shrink-0">
          <div className="flex items-center justify-between mb-1.5 text-xs font-sans">
            <span className="font-bold uppercase tracking-wider text-[#779DD1] text-[11px]">
              {step <= 4 ? `${t.quiz.step_progress_prefix || 'PASO 0'}${step} / 04` : (t.quiz.step_progress_ready || 'DIAGNÓSTICO LISTO')}
            </span>
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wide">
              {step === 1 && t.quiz.step_name_1}
              {step === 2 && t.quiz.step_name_2}
              {step === 3 && t.quiz.step_name_3}
              {step === 4 && t.quiz.step_name_4}
              {step === 5 && t.quiz.step_name_5}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  step >= s ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Área con scroll interno ergonómico para preguntas y opciones */}
        <div className="flex-1 overflow-y-auto pr-1 min-h-0">

        {/* ==================================================================== */}
        {/* PASO 1: Selección de Síntoma (Micro-Chips Táctiles & Auto-Avance)     */}
        {/* ==================================================================== */}
        {step === 1 && (
          <div key={1} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-1"
            >
              {t.quiz.step1_title}
            </h3>
            <p
              id="quiz-modal-description"
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 font-sans"
            >
              {t.quiz.step1_desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {presetSymptoms.map((item) => {
                const isSelected = symptom === item.label && !customSymptom;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setCustomSymptom('');
                      handleSelectAndAdvance(setSymptom, item.label, 2);
                    }}
                    className={`quiz-option-button w-full text-left p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-sans transition-all duration-150 flex items-center justify-between active:scale-[0.98] cursor-pointer min-h-[46px] border ${
                      isSelected
                        ? 'bg-[#0E172F] border-2 border-[#38BDF8] text-white font-bold shadow-sm'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border-slate-800 text-slate-200 hover:text-white hover:border-[#38BDF8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0" aria-hidden="true">{item.icon}</span>
                      <span className="truncate sm:whitespace-normal leading-tight font-medium">{item.shortLabel}</span>
                    </div>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-1.5 transition-all ${
                        isSelected ? 'border-[#38BDF8] bg-[#38BDF8]' : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <span className="w-1 h-1 rounded-full bg-[#060A1A]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Campo desplegable para síntoma no listado */}
            {!showCustomSymptomInput ? (
              <div className="mb-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowCustomSymptomInput(true)}
                  className="text-xs font-sans text-[#779DD1] hover:text-white underline underline-offset-4 transition-colors"
                >
                  {t.quiz.custom_symptom_btn}
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="custom-symptom-input"
                  className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
                >
                  {t.quiz.custom_symptom_label}
                </label>
                <div className="flex gap-2">
                  <input
                    id="custom-symptom-input"
                    type="text"
                    value={customSymptom}
                    onChange={(e) => {
                      setCustomSymptom(e.target.value);
                      if (e.target.value) setSymptom(e.target.value);
                    }}
                    placeholder={t.quiz.custom_symptom_placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A1A] border border-slate-800 focus:border-[#38BDF8] text-white placeholder-slate-500 text-xs font-sans outline-none transition-colors"
                  />
                  <button
                    type="button"
                    disabled={!customSymptom.trim()}
                    onClick={() => setStep(2)}
                    className="rounded-full bg-white text-[#060A1A] px-4 py-2 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    OK &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Escape Directo a WhatsApp para Saltear el Quiz */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-quiz-final="true"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-sans"
              >
                <span>{t.quiz.direct_consult_question}</span>
                <span className="text-emerald-400 font-bold underline underline-offset-2">{t.quiz.direct_consult_link}</span>
              </a>

              {effectiveSymptom && effectiveSymptom !== 'Consulta General' && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full bg-white text-[#060A1A] px-5 py-2 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all active:scale-95 cursor-pointer ml-auto"
                >
                  {t.quiz.btn_continue} &rarr;
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PASO 2: Tiempo de Evolución (Tarjetas Táctiles & Auto-Avance)         */}
        {/* ==================================================================== */}
        {step === 2 && (
          <div key={2} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-1"
            >
              {t.quiz.step2_title}
            </h3>
            <p
              id="quiz-modal-description"
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 font-sans"
            >
              {t.quiz.step2_desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {presetDurations.map((dur) => {
                const isSelected = duration === dur.label && !customDuration;
                return (
                  <button
                    key={dur.key}
                    type="button"
                    onClick={() => {
                      setCustomDuration('');
                      handleSelectAndAdvance(setDuration, dur.label, 3);
                    }}
                    className={`quiz-option-button w-full text-left p-3 rounded-xl text-xs font-sans transition-all duration-150 flex items-center justify-between active:scale-[0.98] cursor-pointer min-h-[50px] border ${
                      isSelected
                        ? 'bg-[#0E172F] border-2 border-[#38BDF8] text-white font-bold shadow-sm'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border-slate-800 text-slate-200 hover:text-white hover:border-[#38BDF8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base shrink-0" aria-hidden="true">{dur.icon}</span>
                      <div>
                        <div className="font-bold text-white leading-tight">{dur.title}</div>
                        <div className="text-[11px] text-slate-400 leading-tight">{dur.sub}</div>
                      </div>
                    </div>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all ${
                        isSelected ? 'border-[#38BDF8] bg-[#38BDF8]' : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <span className="w-1 h-1 rounded-full bg-[#060A1A]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0E172F] hover:bg-[#1E293B] border border-slate-800 text-slate-300 hover:text-white text-xs font-sans font-semibold uppercase tracking-wider active:scale-[0.96] transition-all cursor-pointer"
              >
                &larr; {t.quiz.btn_back}
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-quiz-final="true"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-sans"
              >
                <span>{t.quiz.direct_wa_short}</span>
              </a>

              {effectiveDuration && effectiveDuration !== 'No especificado' && (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-full bg-white text-[#060A1A] px-5 py-2 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all active:scale-95 cursor-pointer"
                >
                  {t.quiz.btn_continue} &rarr;
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PASO 3: Tratamientos Previos (Tarjetas Táctiles & Auto-Avance)        */}
        {/* ==================================================================== */}
        {step === 3 && (
          <div key={3} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-1"
            >
              {t.quiz.step3_title}
            </h3>
            <p
              id="quiz-modal-description"
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 font-sans"
            >
              {t.quiz.step3_desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {presetTreatments.map((treatment) => {
                const isSelected = priorTreatments === treatment.label && !customPriorTreatments;
                return (
                  <button
                    key={treatment.key}
                    type="button"
                    onClick={() => {
                      setCustomPriorTreatments('');
                      handleSelectAndAdvance(setPriorTreatments, treatment.label, 4);
                    }}
                    className={`quiz-option-button w-full text-left p-3 rounded-xl text-xs font-sans transition-all duration-150 flex items-center justify-between active:scale-[0.98] cursor-pointer min-h-[50px] border ${
                      isSelected
                        ? 'bg-[#0E172F] border-2 border-[#38BDF8] text-white font-bold shadow-sm'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border-slate-800 text-slate-200 hover:text-white hover:border-[#38BDF8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base shrink-0" aria-hidden="true">{treatment.icon}</span>
                      <div>
                        <div className="font-bold text-white leading-tight">{treatment.title}</div>
                        <div className="text-[11px] text-slate-400 leading-tight">{treatment.sub}</div>
                      </div>
                    </div>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all ${
                        isSelected ? 'border-[#38BDF8] bg-[#38BDF8]' : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <span className="w-1 h-1 rounded-full bg-[#060A1A]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0E172F] hover:bg-[#1E293B] border border-slate-800 text-slate-300 hover:text-white text-xs font-sans font-semibold uppercase tracking-wider active:scale-[0.96] transition-all cursor-pointer"
              >
                &larr; {t.quiz.btn_back}
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-quiz-final="true"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-sans"
              >
                <span>{t.quiz.direct_wa_short}</span>
              </a>

              {effectivePriorTreatments && effectivePriorTreatments !== 'No especificado' && (
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="rounded-full bg-white text-[#060A1A] px-5 py-2 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all active:scale-95 cursor-pointer"
                >
                  {t.quiz.btn_continue} &rarr;
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PASO 4: Ubicación y País (Píldoras de País & Auto-Avance al Diagnóstico) */}
        {/* ==================================================================== */}
        {step === 4 && (
          <div key={4} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-1"
            >
              {t.quiz.step4_title}
            </h3>
            <p
              id="quiz-modal-description"
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 font-sans"
            >
              {t.quiz.step4_desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {presetCountries.map((ctry) => {
                const isSelected = location === ctry.name && !customLocation;
                return (
                  <button
                    key={ctry.name}
                    type="button"
                    onClick={() => {
                      setCustomLocation('');
                      handleSelectAndAdvance(setLocation, ctry.name, 5);
                    }}
                    className={`quiz-option-button px-3 py-2 rounded-full text-xs font-sans transition-all duration-150 flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#0E172F] border-2 border-[#38BDF8] text-white font-bold shadow-sm scale-105'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border-slate-800 text-slate-300 hover:text-white hover:border-[#38BDF8]'
                    }`}
                  >
                    <span>{ctry.flag}</span>
                    <span>{ctry.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-4">
              <label
                htmlFor="custom-location-input"
                className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
              >
                {t.quiz.custom_location_label}
              </label>
              <input
                id="custom-location-input"
                type="text"
                value={customLocation || (location !== 'Consulta Online' ? location : '')}
                onChange={(e) => {
                  setCustomLocation(e.target.value);
                  if (e.target.value) setLocation(e.target.value);
                }}
                placeholder={t.quiz.custom_location_placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A1A] border border-slate-800 focus:border-[#38BDF8] text-white placeholder-slate-500 text-xs font-sans outline-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0E172F] hover:bg-[#1E293B] border border-slate-800 text-slate-300 hover:text-white text-xs font-sans font-semibold uppercase tracking-wider active:scale-[0.96] transition-all cursor-pointer"
              >
                &larr; {t.quiz.btn_back}
              </button>

              <button
                type="button"
                onClick={() => setStep(5)}
                disabled={!effectiveLocation.trim()}
                className="rounded-full bg-white text-[#060A1A] px-6 py-2.5 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>{t.quiz.btn_continue}</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PASO 5: Diagnóstico Preliminar, Transparencia de Tarifas & Agendar    */}
        {/* ==================================================================== */}
        {step === 5 && (
          <div key={5} className="animate-quiz-step">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-[#0E172F] text-emerald-400 border border-[#1E3A5F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                {t.quiz.step5_completed_badge}
              </span>
              <span className="text-[11px] font-sans text-slate-400 font-semibold">
                {t.quiz.step5_online_badge}
              </span>
            </div>

            <h3
              id="quiz-modal-title"
              className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-2"
            >
              {t.quiz.step5_title}
            </h3>

            {/* Cuadro de Diagnóstico Preliminar (Superficie #0E172F, Borde #1E3A5F) */}
            <div className="bg-[#0E172F] border border-[#1E3A5F] rounded-2xl p-4 mb-3 space-y-2">
              {/* Texto explicativo exacto requerido por test T1.10.2 y ADV-M3.2.1 (CONTRATO VERBATIM OBLIGATORIO) */}
              <p
                id="quiz-modal-description"
                data-diagnosis={`Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`}
                className="text-xs sm:text-sm text-white font-sans font-bold leading-relaxed"
              >
                {diagnosisText || `Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`}
              </p>

              <p className="text-[11px] sm:text-xs text-slate-300 font-normal font-sans leading-relaxed">
                {t.quiz.step5_explanation}
              </p>

              {/* Ficha Resumen Compacta en Micro-Tags */}
              <div className="grid grid-cols-2 gap-2 bg-[#060A1A] border border-slate-800 rounded-xl p-2.5 text-[11px] font-sans mt-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.quiz.summary_symptom}</span>
                  <span className="font-bold text-white truncate block">{effectiveSymptom}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.quiz.summary_duration}</span>
                  <span className="font-bold text-white truncate block">{effectiveDuration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.quiz.summary_treatments}</span>
                  <span className="font-bold text-white truncate block">{effectivePriorTreatments}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.quiz.summary_location}</span>
                  <span className="font-bold text-white truncate block">{effectiveLocation}</span>
                </div>
              </div>
            </div>

            {/* Roadmap de Atención en 2 Fases con Transparencia Radical de Precios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {/* Fase 1: Valoración Inicial Sin Costo */}
              <div className="bg-[#060A1A] border border-emerald-500 rounded-2xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400 font-sans">
                      {t.quiz.phase1_badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#0E172F] border border-emerald-500 text-[10px] font-sans font-extrabold text-emerald-300">
                      {t.quiz.phase1_free}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-white mb-1">
                    {t.quiz.phase1_title}
                  </h4>
                  <p className="text-[11px] text-slate-300 font-sans leading-snug">
                    {t.quiz.phase1_desc}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-400 font-sans font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  {t.quiz.phase1_footer}
                </div>
              </div>

              {/* Fase 2: Sesión Profunda de Biodescodificación */}
              <div className="bg-[#060A1A] border border-slate-800 rounded-2xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#779DD1] font-sans">
                      {t.quiz.phase2_badge}
                    </span>
                    <span className="text-[10px] font-sans text-slate-400 font-semibold">
                      {t.quiz.phase2_time}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-white mb-1">
                    {t.quiz.phase2_title}
                  </h4>
                  <p className="text-[11px] text-slate-300 font-sans leading-snug">
                    {t.quiz.phase2_desc}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-slate-400 text-[10px] font-medium">{t.quiz.phase2_investment} ({pricingInfo.country}):</span>
                  <span className="font-bold text-[#38BDF8] text-[11px]">{pricingInfo.price}</span>
                </div>
              </div>
            </div>

            {/* Botón Principal de Conversión a WhatsApp en Verde Esmeralda Oficial (#25D366) */}
            <a
              href={finalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-quiz-final="true"
              className="btn-whatsapp-primary w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#060A1A] text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider shadow-lg active:scale-[0.97] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 448 512" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              <span>{t.quiz.btn_whatsapp_final}</span>
            </a>

            <p className="text-[10px] text-slate-400 text-center mt-2 font-sans font-medium">
              {t.quiz.under_button_note}
            </p>

            {/* Enlace secundario para modificar respuestas */}
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="group inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#779DD1] active:scale-[0.96] transition-all cursor-pointer font-sans font-semibold uppercase tracking-wider"
              >
                {t.quiz.modify_answers}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-white active:scale-[0.96] transition-all cursor-pointer font-sans font-semibold uppercase tracking-wider"
              >
                {t.quiz.close}
              </button>
            </div>

            {/* Descargo Médico Obligatorio */}
            <p className="text-[10px] text-slate-500 text-center mt-3 font-sans leading-normal font-normal">
              {t.quiz.medical_disclaimer}
            </p>
          </div>
        )}
        </div>

      </div>
    </div>
  );
}

export default WhatsAppQuizModal;
