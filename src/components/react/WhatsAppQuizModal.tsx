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
 * Características Clave:
 * - Flujo ultra-dinámico "Tap & Flow": selección con micro-retraso táctil (160ms) que avanza automáticamente.
 * - Micro-chips visuales con iconografía semántica para eliminar paredes de texto.
 * - Transparencia de precios por país y propuesta de valor de 2 etapas (Llamada de Valoración de 15 min sin costo + Sesión profunda).
 * - Enlace de escape directo a WhatsApp en cada paso para usuarios que prefieren consultar sin completar el quiz.
 */

import { useState, useEffect, useCallback } from 'react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../../config/site';

export type QuizStep = 1 | 2 | 3 | 4 | 5;

export interface WhatsAppQuizModalProps {
  initialSymptom?: string;
  initialLocation?: string;
}

// Opciones enriquecidas para el Paso 1 (Síntomas y Dolencias Frecuentes)
interface SymptomOption {
  label: string;
  shortLabel: string;
  icon: string;
  category: string;
}

const PRESET_SYMPTOMS: SymptomOption[] = [
  { label: 'Gastritis / Acidez estomacal', shortLabel: 'Gastritis / Acidez', icon: '🔥', category: 'Digestivo' },
  { label: 'Ansiedad / Estrés crónico', shortLabel: 'Ansiedad / Estrés', icon: '⚡', category: 'Emocional' },
  { label: 'Lumbalgia / Dolor lumbar', shortLabel: 'Dolor Lumbar / Espalda', icon: '🛡️', category: 'Estructural' },
  { label: 'Ciática / Dolor nervioso', shortLabel: 'Ciática / Nervio', icon: '⚡', category: 'Neural' },
  { label: 'Hipotiroidismo / Fatiga metabólica', shortLabel: 'Tiroides / Fatiga', icon: '🦋', category: 'Endocrino' },
  { label: 'Migrañas / Cefaleas intensas', shortLabel: 'Migrañas / Cefalea', icon: '🧠', category: 'Cefálico' },
  { label: 'Colon Irritable / Inflamación', shortLabel: 'Colon Irritable', icon: '🌊', category: 'Intestinal' },
  { label: 'Dermatitis / Psoriasis / Erupciones', shortLabel: 'Dermatitis / Piel', icon: '🌿', category: 'Cutáneo' },
  { label: 'Insomnio / Trastornos del sueño', shortLabel: 'Insomnio / Sueño', icon: '🌙', category: 'Reposo' },
  { label: 'Sobrepeso / Retención de líquidos', shortLabel: 'Sobrepeso / Retención', icon: '⚖️', category: 'Metabólico' },
];

// Opciones enriquecidas para el Paso 2 (Tiempo de Evolución)
interface DurationOption {
  label: string;
  title: string;
  sub: string;
  icon: string;
}

const PRESET_DURATIONS: DurationOption[] = [
  {
    label: 'Menos de 1 mes (Manifestación reciente)',
    title: 'Menos de 1 mes',
    sub: 'Manifestación reciente / Alerta inicial',
    icon: '⚡',
  },
  {
    label: 'De 1 a 6 meses (Episodios recurrentes)',
    title: '1 a 6 meses',
    sub: 'Episodios recurrentes o intermitentes',
    icon: '📅',
  },
  {
    label: 'De 6 meses a 1 año (Persistencia moderada)',
    title: '6 meses a 1 año',
    sub: 'Persistencia moderada',
    icon: '⏳',
  },
  {
    label: 'Más de 1 año (Cuadro crónico arraigado)',
    title: 'Más de 1 año',
    sub: 'Cuadro crónico arraigado',
    icon: '🔒',
  },
];

// Opciones enriquecidas para el Paso 3 (Tratamientos Previos)
interface TreatmentOption {
  label: string;
  title: string;
  sub: string;
  icon: string;
}

const PRESET_TREATMENTS: TreatmentOption[] = [
  {
    label: 'Medicación alopática o convencional',
    title: 'Medicación convencional',
    sub: 'Fármacos o tratamientos médicos tradicionales',
    icon: '💊',
  },
  {
    label: 'Terapias alternativas o naturales',
    title: 'Terapias complementarias',
    sub: 'Acupuntura, naturopatía u homeopatía',
    icon: '🌿',
  },
  {
    label: 'Múltiples especialistas sin alivio definitivo',
    title: 'Múltiples consultas',
    sub: 'Diversos estudios sin causa clara encontrada',
    icon: '🩺',
  },
  {
    label: 'Ninguno hasta el momento (primera vez)',
    title: 'Primera exploración',
    sub: 'Primer abordaje específico para este síntoma',
    icon: '✨',
  },
];

// Opciones para el Paso 4 (Países / Mercados Principales con Moneda y Rango Local)
interface CountryOption {
  name: string;
  flag: string;
  price: string;
  currency: string;
}

const PRESET_COUNTRIES: CountryOption[] = [
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
  { name: 'Otro País', flag: '🌐', price: '$40 - $65 USD', currency: 'USD' },
];

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

  // URL directa de escape sin completar el quiz
  const directWhatsAppUrl = buildWhatsAppUrl({
    phone: SITE_CONFIG.whatsappNumber,
    symptom: effectiveSymptom !== 'Consulta General' ? effectiveSymptom : 'Consulta Directa',
    location: effectiveLocation !== 'Consulta Online' ? effectiveLocation : '',
  });

  // Información de precios localizada para el paso 5
  const pricingInfo = resolveCountryPricing(effectiveLocation);

  return (
    <div
      data-quiz-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
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
        Contenedor Modal en Superficie Midnight Navy (#0A1226) con Esquinas Amplias rounded-[2rem] sm:rounded-[2.5rem].
        Borde de precisión border-slate-800, 100% opaco y animado con entrada suave.
      */}
      <div
        data-quiz-card="true"
        className="relative w-full max-w-xl bg-[#0A1226] border border-slate-800 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-7 md:p-8 z-10 my-auto text-slate-100 shadow-2xl animate-modal-enter overflow-hidden"
      >
        {/* Acento superior de precisión Swiss Bio-Tech */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#38BDF8]" />

        {/* Barra Superior: Logo de Marca, Identificador Clínico y Botón Cerrar */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
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
                Evaluación Rápida &amp; Agendamiento
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

        {/*
          Barra de Progreso Segmentada: 4 pasos visuales con acento Cyan (#38BDF8) y Slate Mate (#1E293B).
        */}
        <div className="w-full mb-5">
          <div className="flex items-center justify-between mb-1.5 text-xs font-sans">
            <span className="font-bold uppercase tracking-wider text-[#779DD1] text-[11px]">
              {step <= 4 ? `PASO 0${step} / 04` : 'DIAGNÓSTICO LISTO'}
            </span>
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wide">
              {step === 1 && 'Motivo de Consulta'}
              {step === 2 && 'Tiempo de Evolución'}
              {step === 3 && 'Tratamientos Previos'}
              {step === 4 && 'País / Ciudad'}
              {step === 5 && 'Patrón Identificado'}
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

        {/* ==================================================================== */}
        {/* PASO 1: Selección de Síntoma (Micro-Chips Táctiles & Auto-Avance)     */}
        {/* ==================================================================== */}
        {step === 1 && (
          <div key={1} className="animate-quiz-step">
            <h3
              id="quiz-modal-title"
              className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-1"
            >
              ¿Qué dolencia o síntoma deseas descodificar?
            </h3>
            <p
              id="quiz-modal-description"
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 font-sans"
            >
              Toca tu síntoma principal para iniciar tu orientación inmediata sin costo.
            </p>

            {/* Grid dinámico de micro-chips con auto-avance al tocar */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {PRESET_SYMPTOMS.map((item) => {
                const isSelected = symptom === item.label && !customSymptom;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setCustomSymptom('');
                      handleSelectAndAdvance(setSymptom, item.label, 2);
                    }}
                    className={`quiz-option-button w-full text-left p-2.5 sm:p-3 rounded-xl text-xs font-sans transition-all duration-150 flex items-center justify-between active:scale-[0.97] cursor-pointer min-h-[46px] border ${
                      isSelected
                        ? 'bg-[#0E172F] border-2 border-[#38BDF8] text-white font-bold shadow-sm'
                        : 'bg-[#060A1A] hover:bg-[#0E172F] border-slate-800 text-slate-200 hover:text-white hover:border-[#38BDF8]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base shrink-0" aria-hidden="true">{item.icon}</span>
                      <span className="truncate leading-tight font-medium">{item.shortLabel}</span>
                    </div>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-1 transition-all ${
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
                  + ¿Tu dolencia no está en la lista? Escríbela aquí
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="custom-symptom-input"
                  className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
                >
                  Describe tu síntoma específico:
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
                    placeholder="Ej: Presión en el pecho, mareos, dolor dorsal..."
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
                <span>💬 ¿Prefieres consultar directamente?</span>
                <span className="text-emerald-400 font-bold underline underline-offset-2">Escribir por WhatsApp &rarr;</span>
              </a>

              {effectiveSymptom && effectiveSymptom !== 'Consulta General' && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full bg-white text-[#060A1A] px-5 py-2 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all active:scale-95 cursor-pointer ml-auto"
                >
                  Continuar &rarr;
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
              ¿Cuánto tiempo llevas experimentando este síntoma?
            </h3>
            <p
              id="quiz-modal-description"
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 font-sans"
            >
              Toca una opción para determinar si el conflicto está en fase activa o de reparación.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {PRESET_DURATIONS.map((dur) => {
                const isSelected = duration === dur.label && !customDuration;
                return (
                  <button
                    key={dur.label}
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
                &larr; Volver
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-quiz-final="true"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-sans"
              >
                <span>💬 WhatsApp directo &rarr;</span>
              </a>

              {effectiveDuration && effectiveDuration !== 'No especificado' && (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-full bg-white text-[#060A1A] px-5 py-2 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all active:scale-95 cursor-pointer"
                >
                  Continuar &rarr;
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
              ¿Qué tratamientos previos has intentado?
            </h3>
            <p
              id="quiz-modal-description"
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 font-sans"
            >
              Toca una opción para que el terapeuta oriente la consulta según el recorrido previo de tu cuerpo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {PRESET_TREATMENTS.map((treatment) => {
                const isSelected = priorTreatments === treatment.label && !customPriorTreatments;
                return (
                  <button
                    key={treatment.label}
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
                &larr; Volver
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-quiz-final="true"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-sans"
              >
                <span>💬 WhatsApp directo &rarr;</span>
              </a>

              {effectivePriorTreatments && effectivePriorTreatments !== 'No especificado' && (
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="rounded-full bg-white text-[#060A1A] px-5 py-2 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all active:scale-95 cursor-pointer"
                >
                  Continuar &rarr;
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
              ¿En qué país te encuentras?
            </h3>
            <p
              id="quiz-modal-description"
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 font-sans"
            >
              Toca tu país para asignar el terapeuta en tu huso horario y mostrarte tarifas locales transparentes.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {PRESET_COUNTRIES.map((ctry) => {
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
                O escribe tu ciudad específica:
              </label>
              <input
                id="custom-location-input"
                type="text"
                value={customLocation || (location !== 'Consulta Online' ? location : '')}
                onChange={(e) => {
                  setCustomLocation(e.target.value);
                  if (e.target.value) setLocation(e.target.value);
                }}
                placeholder="Ej: Bogotá, Madrid, Barcelona, CDMX, Miami, Buenos Aires..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060A1A] border border-slate-800 focus:border-[#38BDF8] text-white placeholder-slate-500 text-xs font-sans outline-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0E172F] hover:bg-[#1E293B] border border-slate-800 text-slate-300 hover:text-white text-xs font-sans font-semibold uppercase tracking-wider active:scale-[0.96] transition-all cursor-pointer"
              >
                &larr; Volver
              </button>

              <button
                type="button"
                onClick={() => setStep(5)}
                disabled={!effectiveLocation.trim()}
                className="rounded-full bg-white text-[#060A1A] px-6 py-2.5 text-xs font-bold font-sans uppercase tracking-wider shadow-pill-white hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Generar Diagnóstico</span>
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
                Evaluación Preliminar Completada
              </span>
              <span className="text-[11px] font-sans text-slate-400 font-semibold">
                Atención 1 a 1 Online
              </span>
            </div>

            <h3
              id="quiz-modal-title"
              className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-2"
            >
              Patrón Bioemocional Identificado
            </h3>

            {/* Cuadro de Diagnóstico Preliminar (Superficie #0E172F, Borde #1E3A5F) */}
            <div className="bg-[#0E172F] border border-[#1E3A5F] rounded-2xl p-4 mb-3 space-y-2">
              {/* Texto explicativo exacto requerido por test T1.10.2 y ADV-M3.2.1 (CONTRATO VERBATIM OBLIGATORIO) */}
              <p
                id="quiz-modal-description"
                data-diagnosis={`Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`}
                className="text-xs sm:text-sm text-white font-sans font-bold leading-relaxed"
              >
                {`Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`}
              </p>

              <p className="text-[11px] sm:text-xs text-slate-300 font-normal font-sans leading-relaxed">
                En biodescodificación, este síntoma refleja un programa biológico adaptativo. En tu valoración inicial revisaremos el detonante emocional para orientar su resolución definitiva.
              </p>

              {/* Ficha Resumen Compacta en Micro-Tags */}
              <div className="grid grid-cols-2 gap-2 bg-[#060A1A] border border-slate-800 rounded-xl p-2.5 text-[11px] font-sans mt-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Síntoma:</span>
                  <span className="font-bold text-white truncate block">{effectiveSymptom}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Evolución:</span>
                  <span className="font-bold text-white truncate block">{effectiveDuration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tratamientos:</span>
                  <span className="font-bold text-white truncate block">{effectivePriorTreatments}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ubicación / País:</span>
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
                      Fase 1 • Orientación
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#0E172F] border border-emerald-500 text-[10px] font-sans font-extrabold text-emerald-300">
                      SIN COSTO
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-white mb-1">
                    Llamada de Valoración (15 min)
                  </h4>
                  <p className="text-[11px] text-slate-300 font-sans leading-snug">
                    Videollamada 1 a 1 para escuchar tu caso, revisar antecedentes y explicarte el sentido biológico.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-400 font-sans font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  100% Gratuita • Sin Compromiso
                </div>
              </div>

              {/* Fase 2: Sesión Profunda de Biodescodificación */}
              <div className="bg-[#060A1A] border border-slate-800 rounded-2xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#779DD1] font-sans">
                      Fase 2 • Profunda
                    </span>
                    <span className="text-[10px] font-sans text-slate-400 font-semibold">
                      90 Minutos
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-white mb-1">
                    Sesión de Descodificación
                  </h4>
                  <p className="text-[11px] text-slate-300 font-sans leading-snug">
                    Acompañamiento individual para desactivar el choque biológico y restaurar el bienestar.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-slate-400 text-[10px] font-medium">Inversión ({pricingInfo.country}):</span>
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
              <span>Agendar Llamada de 15 Min por WhatsApp</span>
            </a>

            <p className="text-[10px] text-slate-400 text-center mt-2 font-sans font-medium">
              Respuesta personalizada en menos de 15 minutos • Sin cobro previo
            </p>

            {/* Enlace secundario para modificar respuestas */}
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="group inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#779DD1] active:scale-[0.96] transition-all cursor-pointer font-sans font-semibold uppercase tracking-wider"
              >
                &larr; Modificar respuestas
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-white active:scale-[0.96] transition-all cursor-pointer font-sans font-semibold uppercase tracking-wider"
              >
                Cerrar
              </button>
            </div>

            {/* Descargo Médico Obligatorio */}
            <p className="text-[10px] text-slate-500 text-center mt-3 font-sans leading-normal font-normal">
              * La biodescodificación es complementaria y no sustituye el diagnóstico ni tratamiento médico facultativo colegiado.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default WhatsAppQuizModal;
