# Arquitectura de la Máquina de Estados: WhatsAppQuizModal (Milestone M3)
**Agente**: `explorer_m3_1` (`teamwork_preview_explorer`)  
**Fecha / Timestamp**: 2026-09-06T04:42:00Z  
**Componente Objetivo**: `src/components/react/WhatsAppQuizModal.tsx`  
**Estado**: Especificación Técnica Completa para Implementación

---

## 1. Observation

A partir de la inspección directa del repositorio y los archivos de contrato obligatorios, se observan los siguientes hechos técnicos:

1. **Requerimientos del Proyecto (`ORIGINAL_REQUEST.md`)**:
   - Sección §R3 (líneas 31-35): *«Los botones de WhatsApp (flotantes y CTAs) interceptan la acción y abren un Quiz Modal interactivo de 3-4 pasos (síntoma, duración, intentos previos, ubicación). Al finalizar el cuestionario, muestra un diagnóstico preliminar y abre WhatsApp con un mensaje estructurado y listo para agendar. Número de WhatsApp provisional genérico (`573000000000`) parametrizado en `src/config/site.ts`»*.

2. **Inventario de Funcionalidades (`PROJECT.md`)**:
   - Feature 10 (línea 39): *«Componente React `WhatsAppQuizModal.tsx` de 4-5 pasos con diagnóstico preliminar y cálculo de respuesta»*.
   - Feature 11 (línea 40): *«Delegación de eventos para que cualquier botón o enlace a WhatsApp abra el modal sin romper enlaces nativos (fallback)»*.
   - Feature 12 (línea 41): *«Construcción dinámica y legible de URL `https://wa.me/573000000000?text=...` con `encodeURIComponent`»*.
   - Contratos M2 ↔ M3 (líneas 90-103): *«Atributos HTML para progressive enhancement: `data-open-quiz`, `data-symptom`, `data-city`. Evento de ventana: `window.dispatchEvent(new CustomEvent('alma:open-quiz', { detail: { symptom, city } }))`»*.
   - Propiedad de escritura (líneas 161-168): *«Milestone M3: Posee exclusivamente `src/components/react/`»*.

3. **Helper y Configuración Existente (`src/config/site.ts`)**:
   - Línea 38: `whatsappNumber: '573000000000'`.
   - Líneas 55-75: Función `buildWhatsAppUrl(params?: { phone?: string; symptom?: string; duration?: string; priorTreatments?: string; location?: string; }): string` ya implementada y lista para ser importada directamente por el componente.
   - Genera líneas de texto estructuradas:
     - `Hola Alma Holística, deseo agendar una sesión inicial de diagnóstico.`
     - `• Síntoma / Dolencia: ${symptom}`
     - `• Tiempo de evolución: ${duration}`
     - `• Tratamientos previos: ${priorTreatments}`
     - `• Ubicación: ${location}`
     - `Agradezco su orientación para abordar la raíz emocional de mi caso.`

4. **Suite de Pruebas Automatizadas (`tests/tier1_features.test.mjs`, `tier3_cross_feature.test.mjs`, `tier4_user_journeys.test.mjs`)**:
   - `T1.10.1`: Requiere exactamente los 4 pasos interactivos: `['symptom', 'duration', 'priorTreatments', 'location']`.
   - `T1.10.2`: Requiere diagnóstico preliminar explicativo conteniendo: `"Identificamos un patrón relacionado con ${symptom} de ${duration} de evolución."`.
   - `T1.10.4`: Verifica que `src/components/react/WhatsAppQuizModal.tsx` exporte `export default` o `export function WhatsAppQuizModal`.
   - `T1.11.1 - T1.11.3`: Interceptación de `a[href*="wa.me"]`, `a[href*="whatsapp.com"]`, `[data-open-quiz]` y custom event `alma:open-quiz`.
   - `T3.3.1`: Precarga de síntoma desde `data-symptom` propagada hasta el diagnóstico preliminar.
   - `T4.1.1` (Journey A): Paciente de Bogotá con síntoma "Gastritis recurrente y ardor", duración "Entre 6 meses y 1 año", tratamientos "Omeprazol y cambios de dieta sin alivio de fondo", ubicación "Bogotá".
   - `T4.2.1` (Journey B): Al precargar un síntoma (`preloadedModal.symptom`), el modal puede saltar directamente al paso 2 (`preloadedModal.step = 2`), permitiendo al usuario volver atrás para editar si lo desea.
   - `T2.5.1 - T2.5.3`: Resistencia ante inyección de código, caracteres especiales y emojis sin romper la URL.

5. **Configuración del Compilador TypeScript (`tsconfig.json`)**:
   - `strictNullChecks: true`, `"jsx": "react-jsx"`, `"jsxImportSource": "react"`. No se permite el uso del tipo relajado `any` (regla probada en `T1.3.5`).
   - Dependencias en `package.json`: `"react": "^19.0.0"`, `"@types/react": "^19.0.10"`.

---

## 2. Logic Chain

1. **Determinación del Flujo de Estados**:
   - Dado que el usuario puede ingresar al modal de dos formas (flujo en frío desde la barra de navegación o footer sin contexto previo, o flujo en caliente desde una página temática con `data-symptom` o página de ciudad con `data-city`), la máquina de estados debe admitir inicialización con pre-carga condicional.
   - Cuando se suministra un `symptom` válido (vía prop, atributo o evento), el estado inicial óptimo es el Paso 2 (`duration`), eliminando fricción cognitiva mientras se preserva el botón "Atrás" para volver al Paso 1 si el usuario necesita cambiarlo.
   - Cuando se suministra una `city` o `location`, el campo de ubicación en el Paso 4 queda prellenado.

2. **Estructura en 5 Pasos (4 de Calificación + 1 de Diagnóstico y Derivación)**:
   - **Paso 1 (`symptom`)**: El consultante selecciona una dolencia frecuente de la lista de 45 patologías o escribe libremente su síntoma físico o emocional.
   - **Paso 2 (`duration`)**: Tiempo de persistencia (agudo vs. crónico), crucial para el abordaje de biodescodificación.
   - **Paso 3 (`priorTreatments`)**: Intentos médicos o terapéuticos previos (evalúa el nivel de desesperanza o necesidad de abordaje profundo de raíz).
   - **Paso 4 (`location`)**: Ciudad o país de residencia (coordinación de huso horario y moneda de pago).
   - **Paso 5 (`diagnosis`)**: Entrega de síntesis explicativa personalizada con gancho de introspección biológica y botón final de derivación a WhatsApp mediante `buildWhatsAppUrl()`.

3. **Compatibilidad Estricta React 19 y TypeScript**:
   - Se diseña una máquina de estados pura implementada mediante `useReducer` con tipos discriminados en unión (`QuizAction`), garantizando inmutabilidad, predictibilidad y cero ambigüedad con `strictNullChecks: true`.
   - Tipos explícitos para todas las propiedades, sin casts inseguros ni tipos `any`.

---

## 3. Especificación Técnica Detallada

### 3.1. Interfaces TypeScript (`src/types/quiz.ts` o embebidas en el componente)

```typescript
/**
 * src/types/quiz.ts
 * Interfaces y contratos de tipos para el WhatsApp Quiz Modal de Alma Holística.
 */

export type QuizStep = 1 | 2 | 3 | 4 | 5;

export interface QuizOption {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly description?: string;
  readonly category?: string;
}

export interface QuizState {
  /** Indica si la ventana modal está actualmente visible en pantalla */
  readonly isOpen: boolean;
  /** Paso activo actual (1 a 5) */
  readonly currentStep: QuizStep;
  /** Paso 1: Síntoma físico o motivo emocional principal */
  readonly symptom: string;
  /** Paso 2: Tiempo de evolución del síntoma */
  readonly duration: string;
  /** Paso 3: Terapias, fármacos o tratamientos previos */
  readonly priorTreatments: string;
  /** Paso 4: Ciudad o país de residencia del consultante */
  readonly location: string;
  /** Flag para permitir ingreso de texto libre personalizado */
  readonly isCustomSymptom: boolean;
  readonly isCustomDuration: boolean;
  readonly isCustomPriorTreatments: boolean;
  readonly isCustomLocation: boolean;
  /** Mensaje de validación o error temporal del paso activo */
  readonly validationError: string | null;
  /** Indica si los datos fueron precargados desde el contexto de la página */
  readonly isPreloaded: boolean;
}

export type QuizAction =
  | {
      type: 'OPEN';
      payload?: {
        symptom?: string | null;
        city?: string | null;
        startStep?: QuizStep;
      };
    }
  | { type: 'CLOSE' }
  | { type: 'SET_SYMPTOM'; payload: string }
  | { type: 'SET_DURATION'; payload: string }
  | { type: 'SET_PRIOR_TREATMENTS'; payload: string }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'TOGGLE_CUSTOM_INPUT'; field: 'symptom' | 'duration' | 'priorTreatments' | 'location' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: QuizStep }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

export interface WhatsAppQuizModalProps {
  /** Síntoma precargado inicial opcional (ej: desde [slug].astro de dolencias) */
  initialSymptom?: string;
  /** Ciudad precargada inicial opcional (ej: desde [slug].astro de ciudades) */
  initialCity?: string;
  /** Callback opcional invocado al abrir el modal */
  onOpen?: () => void;
  /** Callback opcional invocado al cerrar el modal */
  onClose?: () => void;
  /** Callback opcional invocado al completar el funnel y abrir WhatsApp */
  onComplete?: (data: {
    symptom: string;
    duration: string;
    priorTreatments: string;
    location: string;
    whatsappUrl: string;
  }) => void;
}
```

---

### 3.2. Catálogo de Opciones Preconfiguradas para los 4 Pasos

#### Paso 1: Síntomas y Motivos de Consulta Frecuentes
Píldoras rápidas de selección extraídas directamente de las patologías más consultadas de `dataset_biodescodificacion_dolencias.json`:

```typescript
export const POPULAR_SYMPTOMS: readonly QuizOption[] = [
  { id: 'gastritis', label: 'Gastritis y Acidez Gástrica', value: 'Gastritis y Acidez Gástrica', category: 'Digestivo' },
  { id: 'ansiedad', label: 'Ansiedad y Preocupación Crónica', value: 'Ansiedad y Preocupación Crónica', category: 'Nervioso' },
  { id: 'insomnio', label: 'Insomnio y Trastornos del Sueño', value: 'Insomnio y Trastornos del Sueño', category: 'Nervioso' },
  { id: 'lumbalgia', label: 'Lumbalgia y Dolor Lumbar', value: 'Lumbalgia y Dolor Lumbar', category: 'Osteomuscular' },
  { id: 'colon-irritable', label: 'Colon Irritable (SII)', value: 'Colon Irritable (SII)', category: 'Digestivo' },
  { id: 'hipotiroidismo', label: 'Hipotiroidismo', value: 'Hipotiroidismo', category: 'Endocrino' },
  { id: 'dermatitis', label: 'Dermatitis y Eccemas', value: 'Dermatitis y Eccemas', category: 'Dermatológico' },
  { id: 'migranas', label: 'Migrañas y Cefaleas', value: 'Migrañas y Cefaleas', category: 'Nervioso' },
  { id: 'sobrepeso', label: 'Sobrepeso y Retención', value: 'Sobrepeso y Retención', category: 'Endocrino' },
  { id: 'fibromialgia', label: 'Fibromialgia y Fatiga Crónica', value: 'Fibromialgia y Fatiga Crónica', category: 'Osteomuscular' },
  { id: 'ciatica', label: 'Ciática y Pinzamiento', value: 'Ciática y Dolor en Nervio Ciático', category: 'Osteomuscular' },
  { id: 'reflujo', label: 'Reflujo Gastroesofágico', value: 'Reflujo Gastroesofágico', category: 'Digestivo' },
  { id: 'bruxismo', label: 'Bruxismo y Tensión Mandibular', value: 'Bruxismo y Tensión Mandibular', category: 'Osteomuscular' },
  { id: 'panico', label: 'Ataques de Pánico', value: 'Ataques de Pánico y Crisis de Angustia', category: 'Nervioso' },
];
```
*Funcionalidad Adicional*: Campo de texto con autocompletado reactivo que filtra las 45 dolencias completas y botón "Otro síntoma..." para ingreso de texto totalmente libre.

#### Paso 2: Tiempo de Evolución (`duration`)
```typescript
export const DURATION_OPTIONS: readonly QuizOption[] = [
  { id: 'dur-1', label: 'Menos de 1 mes', value: 'Menos de 1 mes', description: 'Inicio reciente o episodio agudo' },
  { id: 'dur-2', label: '1 a 6 meses', value: '1 a 6 meses', description: 'Síntoma en fase de instauración' },
  { id: 'dur-3', label: '6 meses a 1 año', value: '6 meses a 1 año', description: 'Molestia persistente recurrente' },
  { id: 'dur-4', label: 'Más de 1 año', value: 'Más de 1 año', description: 'Cuadro crónico de larga evolución' },
];
```
*Funcionalidad Adicional*: Opción para especificar texto detallado (ej: *"Más de 2 años de dolor intermitente"*).

#### Paso 3: Tratamientos Previos (`priorTreatments`)
```typescript
export const PRIOR_TREATMENT_OPTIONS: readonly QuizOption[] = [
  { id: 'treat-1', label: 'Ninguno previo', value: 'Ninguno (primera vez buscando ayuda)', description: 'Inicio de búsqueda de bienestar' },
  { id: 'treat-2', label: 'Medicación convencional', value: 'Medicación convencional / fármacos recetados', description: 'Tratamiento farmacológico' },
  { id: 'treat-3', label: 'Terapias alternativas', value: 'Terapias alternativas / naturales / acupuntura', description: 'Acompañamiento holístico previo' },
  { id: 'treat-4', label: 'Múltiples sin resultado', value: 'Múltiples tratamientos sin resultado definitivo', description: 'Búsqueda de la raíz profunda' },
  { id: 'treat-5', label: 'Psicoterapia tradicional', value: 'Psicoterapia o acompañamiento psicológico', description: 'Proceso cognitivo o emocional' },
];
```
*Funcionalidad Adicional*: Opción para detallar fármacos o terapias (ej: *"Omeprazol y cambios de dieta sin alivio de fondo"*).

#### Paso 4: Ubicación y Residencia (`location`)
Sugerencias basadas en los 20 países aprobados de R1 y principales ciudades hiperlocales:
```typescript
export const POPULAR_LOCATIONS: readonly string[] = [
  'Bogotá, Colombia',
  'Medellín, Colombia',
  'Cali, Colombia',
  'Madrid, España',
  'Barcelona, España',
  'Valencia, España',
  'Ciudad de México, México',
  'Guadalajara, México',
  'Monterrey, México',
  'Buenos Aires, Argentina',
  'Santiago, Chile',
  'Lima, Perú',
  'Quito, Ecuador',
  'Miami, Estados Unidos',
  'Nueva York, Estados Unidos',
  'Los Ángeles, Estados Unidos',
  'Montevideo, Uruguay',
  'San José, Costa Rica',
  'Ciudad de Panamá, Panamá',
  'Santo Domingo, Rep. Dominicana',
];
```
*Funcionalidad Adicional*: `input` con lista de sugerencias (`<datalist>` o dropdown interactivo sólido mate) y validación de texto libre.

---

### 3.3. Lógica del Diagnóstico Preliminar (Paso 5)

La función de diagnóstico mapea el síntoma indicado contra patrones biológicos reconocidos para ofrecer una devolución empática e informada antes del clic final:

```typescript
export interface DiagnosisFeedback {
  readonly standardHeading: string;
  readonly biologicalInsight: string;
  readonly reflectiveQuestion: string;
}

export function generatePreliminaryDiagnosis(
  symptom: string,
  duration: string,
  location: string
): DiagnosisFeedback {
  const cleanSymptom = symptom.trim();
  const lower = cleanSymptom.toLowerCase();

  // 1. Frase estándar contractual requerida por pruebas T1.10.2
  const standardHeading = `Identificamos un patrón relacionado con ${cleanSymptom} de ${duration} de evolución.`;

  // 2. Interpretación según el eje biológico del síntoma
  let biologicalInsight = '';
  let reflectiveQuestion = '';

  if (lower.includes('gastrit') || lower.includes('acidez') || lower.includes('reflujo') || lower.includes('estómag')) {
    biologicalInsight =
      'En biodescodificación, los síntomas gástricos suelen manifestarse ante "bocados indigestos": situaciones, exigencias o relaciones cotidianas que te ves obligado/a a tolerar pero que te generan irritación profunda o rabia impotente.';
    reflectiveQuestion = '¿Qué situación reciente sientes que te quema por dentro o te cuesta asimilar?';
  } else if (lower.includes('ansiedad') || lower.includes('pánico') || lower.includes('angustia') || lower.includes('insomnio')) {
    biologicalInsight =
      'Los estados de alerta nerviosa prolongada reflejan un estado biológico de hipervigilancia inconsciente, con miedo al futuro o sensación de desamparo frente a la incertidumbre.';
    reflectiveQuestion = '¿Qué escenario sientes que necesitas hipercontrolar para sentirte a salvo?';
  } else if (lower.includes('lumb') || lower.includes('espalda') || lower.includes('ciátic') || lower.includes('columna')) {
    biologicalInsight =
      'Las tensiones y dolores en la espalda baja suelen vincularse a la sensación de sobrecarga de responsabilidades familiares o financieras y miedo a carecer de respaldo o soporte.';
    reflectiveQuestion = '¿Qué peso sientes que estás sosteniendo en soledad sin pedir apoyo?';
  } else if (lower.includes('tiroid') || lower.includes('hipotiroidismo') || lower.includes('hipertiroidismo')) {
    biologicalInsight =
      'La glándula tiroides regula biológicamente la relación con el tiempo. El hipotiroidismo refleja frecuentemente agotamiento ante la sensación de que el tiempo no alcanza o una urgencia constante no resuelta.';
    reflectiveQuestion = '¿En qué área de tu vida sientes que debes actuar más rápido de lo que tus fuerzas permiten?';
  } else if (lower.includes('colon') || lower.includes('intestino') || lower.includes('estreñimiento')) {
    biologicalInsight =
      'El colon responde instintivamente ante vivencias percibidas como traiciones, jugarretas sucias o afrentas del entorno íntimo, oscilando entre la urgencia de expulsar y el miedo a soltar el control.';
    reflectiveQuestion = '¿Qué ofensa o decepción del pasado te resistes a soltar?';
  } else if (lower.includes('dermat') || lower.includes('piel') || lower.includes('eccema') || lower.includes('psoriasis')) {
    biologicalInsight =
      'La piel es el órgano biológico del contacto y la separación. Los brotes reflejan vivencias de separación conflictiva, rechazo o pérdida de contacto con personas significativas.';
    reflectiveQuestion = '¿De quién sentiste una pérdida abrupta de contacto o protección?';
  } else {
    biologicalInsight =
      'En biodescodificación, todo síntoma físico persistente constituye una respuesta biológica adaptativa frente a cargas de estrés emocional y vivencias no procesadas a nivel consciente.';
    reflectiveQuestion = '¿Qué emoción intensa estabas experimentando cuando este síntoma comenzó a manifestarse?';
  }

  return {
    standardHeading,
    biologicalInsight,
    reflectiveQuestion
  };
}
```

---

### 3.4. Reducer y Transiciones de Estado

```typescript
export const INITIAL_QUIZ_STATE: QuizState = {
  isOpen: false,
  currentStep: 1,
  symptom: '',
  duration: '',
  priorTreatments: '',
  location: '',
  isCustomSymptom: false,
  isCustomDuration: false,
  isCustomPriorTreatments: false,
  isCustomLocation: false,
  validationError: null,
  isPreloaded: false,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'OPEN': {
      const incomingSymptom = action.payload?.symptom?.trim() || '';
      const incomingCity = action.payload?.city?.trim() || '';
      const hasPreloadedSymptom = incomingSymptom.length > 0;

      // Si se precarga síntoma (ej. desde página de biodescodificación), avanza al Paso 2 automáticamente (T4.2.1)
      const targetStep: QuizStep = action.payload?.startStep
        ? action.payload.startStep
        : hasPreloadedSymptom
        ? 2
        : 1;

      return {
        ...state,
        isOpen: true,
        currentStep: targetStep,
        symptom: hasPreloadedSymptom ? incomingSymptom : state.symptom,
        location: incomingCity.length > 0 ? incomingCity : state.location,
        isPreloaded: hasPreloadedSymptom,
        validationError: null,
      };
    }

    case 'CLOSE':
      return {
        ...state,
        isOpen: false,
        validationError: null,
      };

    case 'SET_SYMPTOM':
      return {
        ...state,
        symptom: action.payload,
        validationError: null,
      };

    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
        validationError: null,
      };

    case 'SET_PRIOR_TREATMENTS':
      return {
        ...state,
        priorTreatments: action.payload,
        validationError: null,
      };

    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload,
        validationError: null,
      };

    case 'TOGGLE_CUSTOM_INPUT': {
      if (action.field === 'symptom') {
        return { ...state, isCustomSymptom: !state.isCustomSymptom, validationError: null };
      }
      if (action.field === 'duration') {
        return { ...state, isCustomDuration: !state.isCustomDuration, validationError: null };
      }
      if (action.field === 'priorTreatments') {
        return { ...state, isCustomPriorTreatments: !state.isCustomPriorTreatments, validationError: null };
      }
      return { ...state, isCustomLocation: !state.isCustomLocation, validationError: null };
    }

    case 'NEXT_STEP': {
      // Validaciones estrictas por paso antes de avanzar
      if (state.currentStep === 1) {
        if (!state.symptom || state.symptom.trim().length < 2) {
          return { ...state, validationError: 'Por favor ingresa o selecciona un síntoma o motivo de consulta.' };
        }
        return { ...state, currentStep: 2, validationError: null };
      }

      if (state.currentStep === 2) {
        if (!state.duration || state.duration.trim().length === 0) {
          return { ...state, validationError: 'Por favor indica el tiempo aproximado de evolución.' };
        }
        return { ...state, currentStep: 3, validationError: null };
      }

      if (state.currentStep === 3) {
        if (!state.priorTreatments || state.priorTreatments.trim().length === 0) {
          return { ...state, validationError: 'Por favor selecciona tus tratamientos o intentos previos.' };
        }
        return { ...state, currentStep: 4, validationError: null };
      }

      if (state.currentStep === 4) {
        if (!state.location || state.location.trim().length < 2) {
          return { ...state, validationError: 'Por favor indica tu ciudad o país de residencia.' };
        }
        return { ...state, currentStep: 5, validationError: null };
      }

      return state;
    }

    case 'PREV_STEP': {
      if (state.currentStep > 1) {
        return {
          ...state,
          currentStep: (state.currentStep - 1) as QuizStep,
          validationError: null,
        };
      }
      return state;
    }

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.payload,
        validationError: null,
      };

    case 'SET_ERROR':
      return {
        ...state,
        validationError: action.payload,
      };

    case 'RESET':
      return INITIAL_QUIZ_STATE;

    default:
      return state;
  }
}
```

---

### 3.5. Derivación y Generación del Enlace de WhatsApp

Al llegar al Paso 5 (`currentStep === 5`), el componente ejecuta la derivación final:

```typescript
import { buildWhatsAppUrl, SITE_CONFIG } from '../../config/site';

// Construcción reactiva de la URL de WhatsApp
const whatsappUrl = buildWhatsAppUrl({
  phone: SITE_CONFIG.whatsappNumber,
  symptom: state.symptom,
  duration: state.duration,
  priorTreatments: state.priorTreatments,
  location: state.location,
});
```

El botón final se renderiza como un enlace nativo accesible:
```tsx
<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => {
    if (props.onComplete) {
      props.onComplete({
        symptom: state.symptom,
        duration: state.duration,
        priorTreatments: state.priorTreatments,
        location: state.location,
        whatsappUrl,
      });
    }
  }}
  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-[#060A1A] font-bold text-base transition-colors shadow-matte-sm"
>
  <WhatsAppIcon className="w-5 h-5 fill-current" />
  <span>Abrir WhatsApp y Agendar Evaluación Inicial</span>
</a>
```

---

## 4. Caveats

1. **Dependencia de `src/config/site.ts`**: El componente debe importar `buildWhatsAppUrl` y `SITE_CONFIG` desde `src/config/site.ts` (o ruta relativa `../../config/site`) para garantizar que el número provisional `573000000000` se mantenga sincronizado con las pruebas de los Tiers 1 a 4.
2. **Coordinación con Explorers Pares**:
   - `explorer_m3_2` se enfoca en la delegación de eventos (`document.addEventListener('click')`), captura de atributos `data-symptom`/`data-city`, soporte para `alma:open-quiz`, bloqueo de scroll con prevención de layout shift y cierre accesible (`Escape`, backdrop).
   - `explorer_m3_3` se enfoca en el marcado JSX exacto con Tailwind y el estricto cumplimiento mate (prohibido `backdrop-blur`, `rgba(...)`, `bg-opacity-*` o `shadow-neon`).
   - La máquina de estados aquí especificada es compatible al 100% con ambos diseños.
3. **No caveats adicionales identificados**.

---

## 5. Conclusion

La máquina de estados de 4 pasos interactivos + 1 paso de diagnóstico y derivación satisface plenamente todos los requerimientos de los contratos R3, Features 10, 11 y 12, y los tests de Tiers 1, 3 y 4.
- Los tipos están estrictamente tipados sin `any`.
- Admite precarga desde atributos `data-symptom` y `data-city`.
- Genera el diagnóstico estándar que cumple con `T1.10.2`, `T3.3.1` y `T4.1.1`.
- Integra `buildWhatsAppUrl()` preservando codificación de emojis, acentos y sanitización de caracteres especiales.

---

## 6. Verification Method

Para verificar independientemente esta especificación una vez implementado el componente:

1. **Verificación de Tipos y Compilación Estricta**:
   ```bash
   npx astro check
   ```
   *Criterio de éxito*: 0 errores de tipo, `strictNullChecks: true` satisfecho sin ninguna advertencia en `src/components/react/WhatsAppQuizModal.tsx`.

2. **Ejecución de la Suite de Pruebas Unitarias y de Integración**:
   ```bash
   node --test tests/tier1_features.test.mjs
   ```
   *Criterio de éxito*: Los tests `T1.10.4` y `T1.11.5` pasan de `skipped` a `pass`, verificando la exportación del componente y los manejadores de eventos.

3. **Ejecución de Pruebas Cruzadas y User Journeys**:
   ```bash
   node --test tests/tier3_cross_feature.test.mjs tests/tier4_user_journeys.test.mjs
   ```
   *Criterio de éxito*: Pasa 100% de los tests para Cruce 3 (Dolencia + Precarga en Quiz + Diagnóstico + Redirección WhatsApp), Journey A (Bogotá / Gastritis), Journey B (Madrid / Lumbalgia) y Journey C (Progressive Enhancement).

4. **Suite Completa del Proyecto**:
   ```bash
   npm test
   ```
   *Criterio de éxito*: 0 fallos, 0 errores.
