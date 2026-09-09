/**
 * WhatsAppQuizModal.tsx — Componente Interactivo de Conversión y Diagnóstico Preliminar
 * Alma Holística (almaholistica.com)
 *
 * Estética: Editorial Minimalista Contemporánea (Inspiración Talora Wellness Group).
 * Paleta Bi-Color: Fondo Abisal (#060A1A), Midnight Navy (#0A1226, #0E172F), Acento Cyan (#779DD1),
 * Botones Píldora en Blanco Puro (#FFFFFF) con sombra suave (shadow-pill-white).
 * Cero rastros de amarillo u oro. 100% sólido mate, cero transparencias en superficies.
 * Cumple estrictamente con React 19, TypeScript estricto y suites de pruebas E2E (Tiers 1-4, ADV-M2, ADV-M3).
 */

import { useState, useEffect, useCallback } from 'react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../../config/site';

export type QuizStep = 1 | 2 | 3 | 4 | 5;

export interface WhatsAppQuizModalProps {
  initialSymptom?: string;
  initialLocation?: string;
}

// Opciones predefinidas para el Paso 1 (Síntomas y Dolencias Frecuentes)
const PRESET_SYMPTOMS = [
  'Gastritis / Acidez estomacal',
  'Ansiedad / Estrés crónico',
  'Lumbalgia / Dolor lumbar',
  'Ciática / Dolor nervioso',
  'Hipotiroidismo / Fatiga metabólica',
  'Migrañas / Cefaleas intensas',
  'Colon Irritable / Inflamación',
  'Dermatitis / Psoriasis / Erupciones',
  'Insomnio / Trastornos del sueño',
  'Sobrepeso / Retención de líquidos',
];

// Opciones predefinidas para el Paso 2 (Tiempo de Evolución)
const PRESET_DURATIONS = [
  'Menos de 1 mes (Manifestación reciente)',
  'De 1 a 6 meses (Episodios recurrentes)',
  'De 6 meses a 1 año (Persistencia moderada)',
  'Más de 1 año (Cuadro crónico arraigado)',
];

// Opciones predefinidas para el Paso 3 (Tratamientos Previos)
const PRESET_TREATMENTS = [
  'Medicación alopática o convencional',
  'Terapias alternativas o naturales',
  'Múltiples especialistas sin alivio definitivo',
  'Ninguno hasta el momento (primera vez)',
];

// Opciones predefinidas para el Paso 4 (Países / Mercados Principales)
const PRESET_COUNTRIES = [
  'Colombia',
  'España',
  'México',
  'Estados Unidos',
  'Argentina',
  'Chile',
  'Perú',
  'Ecuador',
  'Costa Rica',
  'Panamá',
];

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

  // Síntoma y valores efectivos (priorizan texto personalizado si fue escrito)
  const effectiveSymptom = (customSymptom.trim() || symptom.trim()) || 'Consulta General';
  const effectiveDuration = (customDuration.trim() || duration.trim()) || 'No especificado';
  const effectivePriorTreatments = (customPriorTreatments.trim() || priorTreatments.trim()) || 'No especificado';
  const effectiveLocation = (customLocation.trim() || location.trim()) || 'Consulta Online';

  // Manejador de apertura con soporte de precarga contextual
  const handleOpen = useCallback((params?: { symptom?: string; city?: string }) => {
    const sym = params?.symptom?.trim() || '';
    const loc = params?.city?.trim() || '';

    if (sym) {
      setSymptom(sym);
      setCustomSymptom('');
      // Si el síntoma viene precargado (ej. página temática), avanza directamente a duración (Paso 2, contrato T4.2.1 / ADV-M3.2.14)
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
      // Respetar modificadores de teclado (abrir en nueva pestaña) y clics auxiliares
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Buscar si el clic proviene de un trigger para abrir el quiz
      const trigger = target.closest<HTMLElement>(
        'a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]'
      );

      // Si no es un trigger o es el enlace final de envío dentro del propio modal, no interceptar
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

    // Escucha del evento custom 'alma:open-quiz'
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ symptom?: string; city?: string; location?: string }>;
      const detail = customEvent.detail || {};
      handleOpen({
        symptom: detail.symptom,
        city: detail.city || detail.location,
      });
    };

    // Manejo accesible de tecla Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    window.addEventListener('alma:open-quiz', handleCustomEvent);
    window.addEventListener('keydown', handleKeyDown);

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

  return (
    <div
      data-quiz-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
      aria-describedby="quiz-modal-description"
    >
      {/*
        Backdrop 100% sólido mate (#060A1A).
        Lienzo abisal sereno sin filtros, transparencias ni capas difuminadas.
      */}
      <div
        className="fixed inset-0 bg-[#060A1A] cursor-pointer animate-backdrop-fade"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/*
        Contenedor Modal en Superficie Midnight Navy (#0A1226) con Esquinas Amplias rounded-[2.5rem].
        Borde ultra-fino border-slate-800/60, diseño plano y sobrio, 100% opaco con entrada suave.
      */}
      <div className="relative w-full max-w-xl bg-[#0A1226] border border-slate-800/60 rounded-[2.5rem] p-6 sm:p-8 md:p-10 z-10 my-auto text-slate-100 shadow-none animate-modal-enter">
        
        {/* Barra Superior: Logo de Marca en Contenedor Circular, Título Editorial y Botón Cerrar */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#060A1A] border border-slate-800/60 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/logo-mariposa-con-fondo-completo.svg"
                alt="Alma Holística"
                className="w-full h-full object-contain"
                width="40"
                height="40"
              />
            </div>
            <div>
              <span className="font-serif text-base font-normal text-slate-900 dark:text-white tracking-wide block">
                Alma Holística
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#779DD1] font-sans font-medium block">
                Evaluación & Agendamiento
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar modal de evaluación"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-white bg-[#0E172F] hover:bg-[#1E293B] border border-slate-800/60 flex items-center justify-center active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#779DD1]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/*
          Barra de Progreso Minimalista: 4 pasos visuales con acento Cyan (#779DD1) y Slate Mate (#1E293B).
        */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between mb-2 text-xs font-sans">
            <span className="font-medium uppercase tracking-[0.15em] text-[#779DD1] text-xs">
              {step <= 4 ? `Paso ${step} de 4` : 'Diagnóstico Completado'}
            </span>
            <span className="text-slate-600 dark:text-slate-400 font-medium text-xs">
              {step === 1 && 'Motivo de Consulta'}
              {step === 2 && 'Tiempo de Evolución'}
              {step === 3 && 'Tratamientos Previos'}
              {step === 4 && 'Ubicación'}
              {step === 5 && 'Evaluación Preliminar'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  step >= s ? 'bg-[#779DD1]' : 'bg-[#1E293B]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* PASO 1: Selección de Síntoma o Motivo de Consulta                     */}
        {/* ==================================================================== */}
        {step === 1 && (
          <div key={1} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white tracking-tight mb-2"
            >
              ¿Cuál es el síntoma o dolencia principal?
            </h3>
            <p
              id="quiz-modal-description"
              className="text-sm text-slate-700 dark:text-slate-400 font-normal leading-relaxed mb-6 font-sans"
            >
              Selecciona una afección frecuente o describe libremente lo que estás experimentando.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1 mb-5">
              {PRESET_SYMPTOMS.map((item) => {
                const isSelected = symptom === item && !customSymptom;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSymptom(item);
                      setCustomSymptom('');
                    }}
                    className={`quiz-option-button w-full text-left p-3.5 rounded-2xl text-sm font-sans transition-all duration-300 flex items-center justify-between active:scale-[0.98] ${
                      isSelected
                        ? 'bg-[#0E172F] border border-[#779DD1] text-white font-medium'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border border-slate-800/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="leading-snug">{item}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all duration-300 ${
                        isSelected ? 'border-[#779DD1] scale-110' : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#779DD1]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mb-6">
              <label
                htmlFor="custom-symptom-input"
                className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-400 mb-2 font-sans"
              >
                O escribe tu síntoma personalizado:
              </label>
              <input
                id="custom-symptom-input"
                type="text"
                value={customSymptom}
                onChange={(e) => {
                  setCustomSymptom(e.target.value);
                  if (e.target.value) {
                    setSymptom(e.target.value);
                  }
                }}
                placeholder="Ej: Dolor en el pecho al despertar, vértigo ocasional..."
                className="w-full px-4 py-3.5 rounded-2xl bg-[#060A1A] border border-slate-800/60 focus:border-[#779DD1] text-slate-100 placeholder-slate-500 text-sm font-sans outline-none transition-colors"
              />
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800/60">
              <button
                type="button"
                disabled={!effectiveSymptom.trim() || effectiveSymptom === 'Consulta General'}
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-[#060A1A] font-medium text-xs sm:text-sm hover:bg-[#779DD1] hover:text-[#060A1A] active:scale-[0.96] transition-all duration-300 shadow-pill-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#779DD1]"
              >
                <span>Continuar</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PASO 2: Tiempo de Evolución                                           */}
        {/* ==================================================================== */}
        {step === 2 && (
          <div key={2} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white tracking-tight mb-2"
            >
              ¿Cuánto tiempo llevas experimentando este síntoma?
            </h3>
            <p
              id="quiz-modal-description"
              className="text-sm text-slate-700 dark:text-slate-400 font-normal leading-relaxed mb-6 font-sans"
            >
              El tiempo de evolución permite identificar si el conflicto biológico se encuentra en fase activa o de reparación.
            </p>

            <div className="space-y-3 mb-5">
              {PRESET_DURATIONS.map((dur) => {
                const isSelected = duration === dur && !customDuration;
                return (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => {
                      setDuration(dur);
                      setCustomDuration('');
                    }}
                    className={`quiz-option-button w-full text-left p-4 rounded-2xl text-sm font-sans transition-all duration-300 flex items-center justify-between active:scale-[0.98] ${
                      isSelected
                        ? 'bg-[#0E172F] border border-[#779DD1] text-white font-medium'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border border-slate-800/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="leading-snug">{dur}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all duration-300 ${
                        isSelected ? 'border-[#779DD1] scale-110' : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#779DD1]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mb-6">
              <label
                htmlFor="custom-duration-input"
                className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-400 mb-2 font-sans"
              >
                O especifica el tiempo exacto:
              </label>
              <input
                id="custom-duration-input"
                type="text"
                value={customDuration}
                onChange={(e) => {
                  setCustomDuration(e.target.value);
                  if (e.target.value) {
                    setDuration(e.target.value);
                  }
                }}
                placeholder="Ej: Más de 2 años de dolor intermitente, 3 meses..."
                className="w-full px-4 py-3.5 rounded-2xl bg-[#060A1A] border border-slate-800/60 focus:border-[#779DD1] text-slate-100 placeholder-slate-500 text-sm font-sans outline-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#0E172F] hover:bg-[#1E293B] border border-slate-800/60 text-slate-300 hover:text-white text-xs sm:text-sm font-medium active:scale-[0.96] transition-all duration-300 cursor-pointer"
              >
                &larr; Volver
              </button>
              <button
                type="button"
                disabled={!effectiveDuration || effectiveDuration === 'No especificado'}
                onClick={() => setStep(3)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-[#060A1A] font-medium text-xs sm:text-sm hover:bg-[#779DD1] hover:text-[#060A1A] active:scale-[0.96] transition-all duration-300 shadow-pill-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#779DD1]"
              >
                <span>Continuar</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PASO 3: Tratamientos Previos                                         */}
        {/* ==================================================================== */}
        {step === 3 && (
          <div key={3} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white tracking-tight mb-2"
            >
              ¿Qué tratamientos o abordajes has intentado?
            </h3>
            <p
              id="quiz-modal-description"
              className="text-sm text-slate-700 dark:text-slate-400 font-normal leading-relaxed mb-6 font-sans"
            >
              Esto permite al terapeuta orientar la sesión inicial según el recorrido de tu organismo.
            </p>

            <div className="space-y-3 mb-5">
              {PRESET_TREATMENTS.map((treatment) => {
                const isSelected = priorTreatments === treatment && !customPriorTreatments;
                return (
                  <button
                    key={treatment}
                    type="button"
                    onClick={() => {
                      setPriorTreatments(treatment);
                      setCustomPriorTreatments('');
                    }}
                    className={`quiz-option-button w-full text-left p-4 rounded-2xl text-sm font-sans transition-all duration-300 flex items-center justify-between active:scale-[0.98] ${
                      isSelected
                        ? 'bg-[#0E172F] border border-[#779DD1] text-white font-medium'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border border-slate-800/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="leading-snug">{treatment}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all duration-300 ${
                        isSelected ? 'border-[#779DD1] scale-110' : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#779DD1]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mb-6">
              <label
                htmlFor="custom-treatments-input"
                className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-400 mb-2 font-sans"
              >
                O especifica tus tratamientos previos:
              </label>
              <input
                id="custom-treatments-input"
                type="text"
                value={customPriorTreatments}
                onChange={(e) => {
                  setCustomPriorTreatments(e.target.value);
                  if (e.target.value) {
                    setPriorTreatments(e.target.value);
                  }
                }}
                placeholder="Ej: Omeprazol y cambios de dieta sin alivio, quiropráctica..."
                className="w-full px-4 py-3.5 rounded-2xl bg-[#060A1A] border border-slate-800/60 focus:border-[#779DD1] text-slate-100 placeholder-slate-500 text-sm font-sans outline-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#0E172F] hover:bg-[#1E293B] border border-slate-800/60 text-slate-300 hover:text-white text-xs sm:text-sm font-medium active:scale-[0.96] transition-all duration-300 cursor-pointer"
              >
                &larr; Volver
              </button>
              <button
                type="button"
                disabled={!effectivePriorTreatments || effectivePriorTreatments === 'No especificado'}
                onClick={() => setStep(4)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-[#060A1A] font-medium text-xs sm:text-sm hover:bg-[#779DD1] hover:text-[#060A1A] active:scale-[0.96] transition-all duration-300 shadow-pill-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#779DD1]"
              >
                <span>Continuar</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PASO 4: Ubicación y País de Residencia                                */}
        {/* ==================================================================== */}
        {step === 4 && (
          <div key={4} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white tracking-tight mb-2"
            >
              ¿En qué país o ciudad te encuentras?
            </h3>
            <p
              id="quiz-modal-description"
              className="text-sm text-slate-700 dark:text-slate-400 font-normal leading-relaxed mb-6 font-sans"
            >
              Atendemos sesiones online en más de 20 países adaptando los horarios y medios a tu país de residencia.
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {PRESET_COUNTRIES.map((ctry) => {
                const isSelected = location === ctry && !customLocation;
                return (
                  <button
                    key={ctry}
                    type="button"
                    onClick={() => {
                      setLocation(ctry);
                      setCustomLocation('');
                    }}
                    className={`quiz-option-button px-4 py-2.5 rounded-full text-sm font-sans active:scale-[0.96] transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#0E172F] border border-[#779DD1] text-[#779DD1] font-medium'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border border-slate-800/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    {ctry}
                  </button>
                );
              })}
            </div>

            <div className="mb-6">
              <label
                htmlFor="custom-location-input"
                className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-400 mb-2 font-sans"
              >
                O escribe tu ciudad o país específico:
              </label>
              <input
                id="custom-location-input"
                type="text"
                value={customLocation || location}
                onChange={(e) => {
                  setCustomLocation(e.target.value);
                  if (e.target.value) setLocation(e.target.value);
                }}
                placeholder="Ej: Barcelona, Buenos Aires, Santiago..."
                className="w-full p-4 rounded-2xl bg-[#060A1A] border border-slate-800/60 focus:border-[#779DD1] text-slate-100 placeholder-slate-500 text-sm font-sans outline-none transition-all duration-300"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-3 rounded-full text-sm text-slate-400 hover:text-white font-sans transition-colors"
              >
                &larr; Volver
              </button>

              <button
                type="button"
                onClick={() => setStep(5)}
                disabled={!effectiveLocation.trim()}
                className={`px-8 py-3.5 rounded-full text-sm font-medium font-sans flex items-center gap-2 transition-all duration-300 ${
                  effectiveLocation.trim()
                    ? 'bg-white text-[#060A1A] hover:bg-[#779DD1] hover:text-[#060A1A] shadow-pill-white cursor-pointer active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <span>Generar Diagnóstico</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PASO 5: Diagnóstico Preliminar y Derivación a WhatsApp                */}
        {/* ==================================================================== */}
        {step === 5 && (
          <div key={5} className="animate-quiz-step">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] bg-[#0E172F] text-[#779DD1] border border-[#1E3A5F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#779DD1]" />
                Evaluación Preliminar Completada
              </span>
            </div>

            <h3
              id="quiz-modal-title"
              className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white tracking-tight mb-2"
            >
              Patrón Emocional Identificado
            </h3>

            {/* Cuadro de Diagnóstico Preliminar (Superficie #0E172F, Borde #1E3A5F) */}
            <div className="bg-[#0E172F] border border-[#1E3A5F] rounded-2xl p-5 sm:p-6 mb-5 space-y-3">
              {/* Texto explicativo exacto requerido por test T1.10.2 y ADV-M3.2.1 (CONTRATO VERBATIM OBLIGATORIO) */}
              <p
                id="quiz-modal-description"
                data-diagnosis={`Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`}
                className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed"
              >
                {`Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`}
              </p>

              <p className="text-sm text-slate-700 dark:text-slate-300 font-normal font-sans leading-relaxed">
                En biodescodificación, cada síntoma físico corresponde a un conflicto biológico y emocional inconsciente que tu cuerpo intenta resolver. Tu sesión inicial de diagnóstico evaluará el origen emocional específico de tu caso.
              </p>

              {/* Ficha Resumen de Respuestas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#0A1226] border border-slate-800/60 rounded-xl p-3.5 text-xs font-sans mt-3">
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block text-sm font-normal">Síntoma:</span>
                  <span className="font-medium text-slate-200">{effectiveSymptom}</span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block text-sm font-normal">Tiempo de evolución:</span>
                  <span className="font-medium text-slate-200">{effectiveDuration}</span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block text-sm font-normal">Tratamientos previos:</span>
                  <span className="font-medium text-slate-200">{effectivePriorTreatments}</span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block text-sm font-normal">Ubicación:</span>
                  <span className="font-medium text-slate-200">{effectiveLocation}</span>
                </div>
              </div>
            </div>

            {/* Botón Principal de Conversión a WhatsApp en Píldora Blanca de Alta Gama */}
            <a
              href={finalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-quiz-final="true"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[#060A1A] font-medium text-sm sm:text-base hover:bg-[#779DD1] hover:text-[#060A1A] active:scale-[0.97] transition-all duration-500 shadow-pill-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#779DD1]"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31" />
              </svg>
              <span>Agendar Sesión de Diagnóstico por WhatsApp</span>
            </a>

            {/* Enlace secundario para modificar respuestas */}
            <div className="flex items-center justify-between pt-4 mt-2">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="group inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-[#779DD1] active:scale-[0.96] transition-all cursor-pointer font-medium"
              >
                &larr; Modificar respuestas
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-white active:scale-[0.96] transition-all cursor-pointer font-medium"
              >
                Cerrar
              </button>
            </div>

            {/* Descargo Médico Obligatorio */}
            <p className="text-xs text-slate-600 dark:text-slate-500 text-center mt-4 font-sans leading-normal font-normal">
              * La biodescodificación complementa tu bienestar y no sustituye el diagnóstico ni tratamiento médico o farmacológico prescrito por profesionales colegiados.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default WhatsAppQuizModal;
