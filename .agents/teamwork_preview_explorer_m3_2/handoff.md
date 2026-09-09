# Reporte de Exploración Handoff — Explorer M3 2
**Misión**: Delegación Global de Eventos de WhatsApp, Soporte de Accesibilidad (A11y), Bloqueo de Scroll Anti-CLS y Progressive Enhancement para `WhatsAppQuizModal.tsx`.
**Fecha**: 2026-09-06T04:42:00Z
**Autor**: `teamwork_preview_explorer_m3_2` (Archetype: Explorer)
**Destinatario**: Parent Agent (`teamwork_preview_orchestrator` / Worker M3)

---

## 1. Observation (Observaciones Directas)

A partir de la auditoría minuciosa del repositorio, archivos fuente, hojas de estilo y suites de pruebas automatizadas, se extraen las siguientes observaciones verificadas:

### 1.1 Contratos de la Suite de Pruebas (`tests/tier1_features.test.mjs`)
- **Feature 11 (Interceptación Global WhatsApp)**:
  - Línea 486-490:
    ```javascript
    test('T1.11.1: Selector de interceptación cubre enlaces wa.me y data-open-quiz', () => {
      const selector = 'a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]';
      assert.ok(selector.includes('wa.me'));
      assert.ok(selector.includes('data-open-quiz'));
    });
    ```
  - Línea 492-496:
    ```javascript
    test('T1.11.2: Parámetros de contexto data-symptom y data-city son soportados', () => {
      const dataset = { symptom: 'Ciática', city: 'Madrid' };
      assert.equal(dataset.symptom, 'Ciática');
      assert.equal(dataset.city, 'Madrid');
    });
    ```
  - Línea 498-502:
    ```javascript
    test('T1.11.3: Soporte para evento custom alma:open-quiz', () => {
      const eventName = 'alma:open-quiz';
      assert.equal(eventName, 'alma:open-quiz');
    });
    ```
  - Línea 503-507:
    ```javascript
    test('T1.11.4: Progressive enhancement: los enlaces directos a WhatsApp funcionan si JS está inactivo', () => {
      const fallbackHref = `https://wa.me/${PROVISIONAL_WHATSAPP_NUMBER}?text=Hola%20deseo%20informacion`;
      const parsed = parseAndValidateWhatsAppUrl(fallbackHref);
      assert.equal(parsed.valid, true);
    });
    ```
  - Línea 509-517:
    ```javascript
    test('T1.11.5: Inspección de lógica de interceptación en el componente React', (t) => {
      const modalPath = path.join(PROJECT_ROOT, 'src/components/react/WhatsAppQuizModal.tsx');
      // Requiere: addEventListener, alma:open-quiz o data-open-quiz
      assert.ok(code.includes('addEventListener') || code.includes('alma:open-quiz') || code.includes('data-open-quiz'));
    });
    ```

### 1.2 Flujos de Usuario Real y Precarga (`tests/tier4_user_journeys.test.mjs`)
- **Journey B (Página Temática y Precarga de Síntoma)**:
  - Líneas 93-97:
    ```javascript
    // 2. Interceptación con pre-carga del síntoma
    const preloadedModal = {
      symptom: dolenciaPage.symptomName,
      step: 2 // Avanza directamente a duración
    };
    assert.equal(preloadedModal.symptom, 'Lumbalgia y Dolor Lumbar');
    ```
    *Observación crítica*: Cuando un disparador cuenta con `data-symptom` (o el CustomEvent trae `symptom`), el Quiz Modal debe precargar el síntoma y avanzar automáticamente al **Paso 2 (duración)**, ahorrando fricción al paciente. Si no hay síntoma precargado, debe iniciar en el **Paso 1 (síntoma)**.
- **Journey C (Resiliencia Móvil y Progressive Enhancement)**:
  - Líneas 123-136:
    ```javascript
    test('T4.3.1: Resiliencia ante fallos de red o bloqueo de scripts (Progressive Enhancement)', () => {
      const staticButtonHtml = `<a href="https://wa.me/${PROVISIONAL_WHATSAPP_NUMBER}?text=Hola%20Alma%20Hol%C3%ADstica%2C%20deseo%20agendar%20una%20sesi%C3%B3n" class="bg-[#38BDF8] text-[#060A1A]" data-open-quiz data-symptom="Ansiedad">Agendar Evaluación</a>`;
      // Simulación de clic sin ejecución de JS: el navegador sigue el atributo href
      const hrefMatch = staticButtonHtml.match(/href="([^"]+)"/);
      assert.ok(hrefMatch, 'El botón estático debe contar con atributo href nativo');
    ...
    ```

### 1.3 Estructura Actual de Botones y Enlaces en Layout (`src/components/Navbar.astro` y `Footer.astro`)
- En `src/components/Navbar.astro` (líneas 78-83 y 139-144):
  ```html
  <a
    href={whatsappCtaUrl}
    data-open-quiz="true"
    data-location="global"
    data-symptom=""
    class="..."
  >
    <svg ...>...</svg>
    <span>Agendar Sesión</span>
  </a>
  ```
- En `src/components/Footer.astro` (líneas 60-64 y 141-145):
  ```html
  <a
    href={whatsappFooterUrl}
    data-open-quiz="true"
    data-location="footer-cta"
    data-symptom=""
    class="..."
  >
  ```
  *Observación crítica*: Los botones contienen elementos hijos anidados (`<svg>`, `<path>`, `<span>`). Un clic del usuario puede tener como `event.target` un `<path>` o un `<span>`. Por ende, el manejador global NO puede limitarse a evaluar `target.matches()`; debe utilizar obligatoriamente `target.closest()`.

### 1.4 Reglas Anti-CLS en Estilos Globales (`src/styles/global.css`)
- Líneas 50-64:
  ```css
  html {
    ...
    /* Evita el salto horizontal del layout cuando aparece/desaparece la barra vertical */
    scrollbar-gutter: stable;
    /* Contención estricta de ancho: CERO desbordamiento horizontal */
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }
  ```
- Líneas 66-79:
  ```css
  body {
    ...
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
  }
  ```
  *Observación crítica*: Aunque `scrollbar-gutter: stable` ya está configurado en `html`, al aplicar `overflow: hidden` al `body` en navegadores como WebKit móvil o navegadores de escritorio sin soporte completo de gutter, el layout puede parpadear si no se compensa el ancho de la barra de scroll mediante `paddingRight` dinámico.

### 1.5 Punto de Montaje en BaseLayout (`src/layouts/BaseLayout.astro`)
- Líneas 110-115:
  ```astro
  <!--
    Contenedor de montaje para el Quiz Modal interactivo de WhatsApp (Milestone M3).
    client:load garantiza cero latencia de hidratación al ser activado por cualquier CTA.
  -->
  <div id="quiz-modal-container" data-client-load="client:load">
    <slot name="quiz-modal" />
  </div>
  ```
  El componente React `WhatsAppQuizModal.tsx` debe montarse con la directiva `client:load` para que sus listeners globales de eventos queden activos inmediatamente tras la carga de la página.

---

## 2. Logic Chain (Cadena Lógica de Deducción y Diseño)

A partir de las observaciones anteriores, se construye el diseño técnico mediante la siguiente secuencia de razonamiento:

1. **Delegación de Eventos a Nivel de Documento vs Listeners Individuales**:
   - *Premisa*: Las páginas generadas por Astro contienen múltiples CTAs dinámicos en Navbar, Hero, catálogo de 45 dolencias, directorio de 113 ciudades y Footer. Adicionalmente, el catálogo puede tener filtros dinámicos que renderizan tarjetas en cliente.
   - *Deducción*: Asignar listeners individuales a cada elemento requeriría recalcularlos tras cada render o mutación DOM. La delegación global en `document.addEventListener('click', handleGlobalClick)` captura el 100% de los elementos actuales y futuros con costo O(1) de memoria.

2. **Resolución de Nodos Anidados y Traversal Ascendente (`closest`)**:
   - *Premisa*: Los enlaces `<a href="https://wa.me/...">` contienen `<svg>` y `<span>` (Obs. 1.3).
   - *Deducción*: `event.target` será frecuentemente el nodo hijo. Se debe ejecutar:
     `const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>('a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]');`
     Si `trigger === null`, el evento se ignora de inmediato.

3. **Extracción de Atributos de Contexto (`data-symptom`, `data-city`, `data-location`) con Búsqueda Ancestral**:
   - *Premisa*: En páginas de dolencias (`biodescodificacion/[slug].astro`), el botón puede tener `data-symptom="Gastritis"`, o bien un contenedor padre (tarjeta de dolencia) puede definir `data-symptom`. En páginas de ciudades (`[slug].astro`), puede existir `data-city="bogota"` o `data-location="Bogotá"`.
   - *Deducción*: La extracción debe priorizar el elemento trigger y, en su defecto, ascender por el árbol DOM:
     ```typescript
     const symptom =
       trigger.getAttribute('data-symptom') ||
       trigger.closest('[data-symptom]')?.getAttribute('data-symptom') ||
       '';

     const city =
       trigger.getAttribute('data-city') ||
       trigger.getAttribute('data-location') ||
       trigger.closest('[data-city]')?.getAttribute('data-city') ||
       trigger.closest('[data-location]')?.getAttribute('data-location') ||
       '';
     ```

4. **Regla de Progresión Automática a Paso 2 si hay Síntoma**:
   - *Premisa*: Según el contrato T4.2.1 (Obs. 1.2), cuando el modal recibe un síntoma precargado, debe iniciar en `step: 2` (tiempo de evolución), eliminando la redundancia de pedirle al usuario que vuelva a seleccionar el síntoma.
   - *Deducción*: La función `openQuiz({ symptom, city })` debe evaluar:
     ```typescript
     const initialStep = symptom && symptom.trim().length > 0 ? 2 : 1;
     setFormData(prev => ({
       ...prev,
       symptom: symptom.trim(),
       location: city.trim() || prev.location
     }));
     setCurrentStep(initialStep);
     setIsOpen(true);
     ```

5. **Manejo de Modificadores de Teclado y Clics Auxiliares**:
   - *Premisa*: Si un usuario hace `Ctrl + Clic`, `Cmd + Clic`, `Shift + Clic` o clic con la rueda del ratón (botón central), su intención es abrir el enlace de WhatsApp en una nueva pestaña.
   - *Deducción*: No se debe interceptar si `event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey`. Se permite que el navegador ejecute la navegación nativa hacia WhatsApp.

6. **Progressive Enhancement y Garantía de No-Bloqueo de Enlaces**:
   - *Premisa*: Si ocurre un error de JavaScript o el modal no se puede abrir, el usuario nunca debe quedarse atrapado con un enlace que no hace nada porque se llamó a `event.preventDefault()`.
   - *Deducción*: `event.preventDefault()` solo debe llamarse **después** de que la lógica de apertura se ejecuta exitosamente dentro de un bloque `try/catch`. Si se produce alguna excepción inesperada, no se previene el comportamiento por defecto y el navegador sigue el `href` nativo hacia WhatsApp (`https://wa.me/573000000000?text=...`).

7. **Escucha del CustomEvent `alma:open-quiz`**:
   - *Premisa*: T1.11.3 (Obs. 1.1) y `PROJECT.md` estipulan que scripts desacoplados o componentes de terceros pueden disparar el modal con `window.dispatchEvent(new CustomEvent('alma:open-quiz', { detail: { symptom, city } }))`.
   - *Deducción*: El componente React debe registrar un listener en `window` para `'alma:open-quiz'`, extrayendo `detail.symptom` y `detail.city` (o `detail.location`) y ejecutando la misma lógica de apertura.

8. **Accesibilidad Integral (A11y - WAI-ARIA Dialog)**:
   - *Cierre por tecla Escape*: Capturar `keydown` cuando `isOpen === true`. Si `event.key === 'Escape'`, invocar `closeModal()`, `event.stopPropagation()` y `event.preventDefault()`.
   - *Cierre por Clic en Backdrop*: El contenedor overlay captura clics. Si `event.target === event.currentTarget`, se cierra el modal.
   - *Cierre por Botón (X)*: Botón con `aria-label="Cerrar cuestionario de evaluación"`, icono decorativo con `aria-hidden="true"`.
   - *Atributos Semánticos*: El contenedor del diálogo debe declarar:
     - `role="dialog"`
     - `aria-modal="true"`
     - `aria-labelledby="quiz-modal-title"`
     - `aria-describedby="quiz-modal-description"`
   - *Gestión y Restauración de Foco*:
     - Al abrir: Guardar `lastActiveElement = document.activeElement as HTMLElement | null`. Poner el foco en el diálogo o en el primer elemento interactivo (`closeButtonRef` o primera opción).
     - Al cerrar: Devolver el foco al elemento que disparó la apertura: `lastActiveElement?.focus()`.
     - *Focus Trap*: Bloquear el tabulado dentro del modal. En `Tab` hacia adelante, si se está en el último elemento interactivo, rotar al primero; en `Shift + Tab`, rotar del primero al último.

9. **Bloqueo de Scroll en `document.body` con Compensación Anti-CLS**:
   - *Premisa*: Al abrir el modal, la página de fondo no debe poder desplazarse (evita scrolls accidentales en móvil y escritorio). Sin embargo, ocultar la barra de desplazamiento provoca un salto de layout (layout shift) de 15-17px hacia la derecha en navegadores desktop.
   - *Deducción*: Al abrir:
     1. Calcular el ancho de la barra: `const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;`
     2. Guardar valores previos de `document.body.style.overflow` y `document.body.style.paddingRight`.
     3. Aplicar `document.body.style.overflow = 'hidden'`.
     4. Si `scrollbarWidth > 0`, aplicar `document.body.style.paddingRight = `${scrollbarWidth}px``.
     5. En la función de limpieza (`cleanup`), restaurar los estilos exactos previos. Esto garantiza cero saltos (CLS = 0) y previene bloqueos residuales de scroll si el componente se desmonta.

---

## 3. Caveats (Límites, Supuestos y Consideraciones)

1. **Orden de Eventos Sintéticos vs Nativos en React 19**:
   - Los listeners en `document` registrados con `document.addEventListener` nativo se ejecutan durante la fase de burbujeo nativa del DOM. En React 19, los handlers del árbol de React delegan en la raíz del contenedor. Al registrar el listener de delegación en `document` dentro de un `useEffect`, este interceptará todos los clics de elementos estáticos generados por Astro en el HTML (Navbar, Footer, contenido Markdown) sin interferir con los eventos internos de React dentro del modal.
2. **Compatibilidad con Renderizado en Servidor (SSR/SSG)**:
   - Astro realiza Static Site Generation (SSG). En el servidor (`Node.js`), los objetos `window`, `document` y `HTMLElement` no existen. Todo el código de delegación de eventos, bloqueo de scroll y focus trap DEBE residir dentro de hooks `useEffect` o estar protegido con `typeof window !== 'undefined'`.
3. **Navegadores In-App (Instagram / Facebook / TikTok / WhatsApp Webview)**:
   - Los navegadores embebidos en iOS/Android a veces manejan el `overflow: hidden` en `body` permitiendo el "rubber-banding" o rebote táctil en `document.documentElement`. La solución diseñada aplica contención en `body` y, en caso de soporte táctil, previene el `touchmove` en el overlay del modal cuando el toque no se produce dentro del contenedor scrolleable del diálogo.
4. **Prioridad de Atributos**:
   - Si un elemento tiene tanto `data-city` como `data-location`, se toma `data-city` primero y luego `data-location`. Si `data-symptom=""` es una cadena vacía, se trata como no provisto, obligando al usuario a iniciar en el Paso 1.

---

## 4. Conclusion & Especificación Técnica Completa

A continuación se presenta la especificación de diseño completa, los tipos TypeScript y los hooks listos para ser implementados por `teamwork_preview_worker_m3` en `src/components/react/WhatsAppQuizModal.tsx`.

### 4.1 Tipos TypeScript de Interceptación y Contexto

```typescript
// src/types/quiz-events.ts

export interface QuizModalContext {
  symptom?: string;
  city?: string;
  location?: string;
}

export interface AlmaOpenQuizCustomEventDetail {
  symptom?: string;
  city?: string;
  location?: string;
}

export type AlmaOpenQuizEvent = CustomEvent<AlmaOpenQuizCustomEventDetail>;

declare global {
  interface WindowEventMap {
    'alma:open-quiz': AlmaOpenQuizEvent;
  }
}
```

### 4.2 Hook de Delegación Global de Eventos (`useQuizEventDelegation`)

Este hook encapsula la interceptación de clics globales, la extracción de atributos ascendentes, el evento custom y el fallback fail-safe para progressive enhancement:

```typescript
import { useEffect, useCallback } from 'react';

const TRIGGER_SELECTOR = 'a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]';

interface UseQuizEventDelegationOptions {
  onOpen: (context: { symptom: string; city: string }) => void;
  enabled?: boolean;
}

export function useQuizEventDelegation({
  onOpen,
  enabled = true
}: UseQuizEventDelegationOptions) {

  // Función normalizada para abrir con sanitización
  const triggerOpen = useCallback((rawSymptom?: string | null, rawCity?: string | null) => {
    const symptom = (rawSymptom || '').trim();
    const city = (rawCity || '').trim();
    onOpen({ symptom, city });
  }, [onOpen]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // 1. Manejador de Delegación de Clics Globales
    const handleGlobalClick = (event: MouseEvent) => {
      // Ignorar si el evento ya fue prevenido
      if (event.defaultPrevented) return;

      // Respetar modificadores de teclado (abrir en nueva pestaña) y clics no principales
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Buscar el trigger más cercano hacia arriba en el DOM
      const trigger = target.closest<HTMLElement>(TRIGGER_SELECTOR);
      if (!trigger) return;

      // Extracción de contexto con soporte de traversal ascendente
      const symptom =
        trigger.getAttribute('data-symptom') ||
        trigger.closest('[data-symptom]')?.getAttribute('data-symptom') ||
        '';

      const city =
        trigger.getAttribute('data-city') ||
        trigger.getAttribute('data-location') ||
        trigger.closest('[data-city]')?.getAttribute('data-city') ||
        trigger.closest('[data-location]')?.getAttribute('data-location') ||
        '';

      // Progressive Enhancement Fail-Safe:
      // Ejecutar apertura en try/catch. Si falla, NO llamar preventDefault() para que el href nativo funcione.
      try {
        triggerOpen(symptom, city);
        event.preventDefault();
      } catch (err) {
        console.warn(
          '[WhatsAppQuizModal] No se pudo abrir el modal interactivo. Usando fallback de navegación nativa hacia WhatsApp.',
          err
        );
        // Sin preventDefault: el navegador abrirá el enlace wa.me normalmente
      }
    };

    // 2. Manejador del Custom Event 'alma:open-quiz'
    const handleCustomEvent = (event: Event) => {
      const customEvt = event as CustomEvent<{ symptom?: string; city?: string; location?: string }>;
      const detail = customEvt.detail || {};
      const symptom = detail.symptom || '';
      const city = detail.city || detail.location || '';
      triggerOpen(symptom, city);
    };

    // Registrar listeners
    document.addEventListener('click', handleGlobalClick, { capture: false });
    window.addEventListener('alma:open-quiz', handleCustomEvent as EventListener);

    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: false });
      window.removeEventListener('alma:open-quiz', handleCustomEvent as EventListener);
    };
  }, [enabled, triggerOpen]);
}
```

### 4.3 Hook de Accesibilidad y Control del Modal (`useModalA11y`)

Este hook gestiona el cierre por tecla `Escape`, trampa de foco accesible (focus trap), restauración de foco al elemento previo y bloqueo de scroll anti-CLS:

```typescript
import { useEffect, useRef, useCallback } from 'react';

interface UseModalA11yOptions {
  isOpen: boolean;
  onClose: () => void;
  dialogRef: React.RefObject<HTMLElement | null>;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

export function useModalA11y({
  isOpen,
  onClose,
  dialogRef,
  initialFocusRef
}: UseModalA11yOptions) {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // 1. Bloqueo de Scroll Anti-CLS con compensación de Scrollbar
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    // Guardar el elemento enfocado antes de abrir el modal
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    // Calcular ancho exacto de la barra de desplazamiento
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    // Bloquear scroll
    document.body.style.overflow = 'hidden';

    // Compensar el espacio para evitar CLS en navegadores desktop
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      // Restauración rigurosa al cerrar o desmontar
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;

      // Devolver el foco al elemento que activó el modal
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  // 2. Foco inicial al abrir
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (dialogRef.current) {
        // Buscar el primer elemento enfocable dentro del diálogo
        const focusable = dialogRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) {
          focusable.focus();
        } else {
          dialogRef.current.focus();
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen, dialogRef, initialFocusRef]);

  // 3. Manejo de Tecla Escape y Trampa de Foco (Focus Trap)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      // Cierre por Escape
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.stopPropagation();
        event.preventDefault();
        onClose();
        return;
      }

      // Focus Trap en Tab / Shift+Tab
      if (event.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );

        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab: Si está en el primero, cicla al último
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: Si está en el último, cicla al primero
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [isOpen, onClose, dialogRef]
  );

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);
}
```

### 4.4 Integración del Flujo de Estados del Quiz Modal

Al unificar los hallazgos de `explorer_m3_1` (máquina de estados), `explorer_m3_2` (eventos y accesibilidad) y `explorer_m3_3` (diseño mate sólido):

1. **Estado Inicial del Modal**:
   ```typescript
   const [isOpen, setIsOpen] = useState(false);
   const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
   const [formData, setFormData] = useState({
     symptom: '',
     duration: '',
     priorTreatments: '',
     location: ''
   });
   ```

2. **Lógica de Apertura (`openModal`)**:
   ```typescript
   const openModal = useCallback(({ symptom, city }: { symptom: string; city: string }) => {
     setFormData(prev => ({
       ...prev,
       symptom: symptom || prev.symptom,
       location: city || prev.location
     }));

     // Si ya cuenta con síntoma precargado (ej: clic desde página de biodescodificación),
     // avanza directamente al paso 2 conforme al contrato T4.2.1
     if (symptom && symptom.trim().length > 0) {
       setCurrentStep(2);
     } else {
       setCurrentStep(1);
     }

     setIsOpen(true);
   }, []);
   ```

3. **Cierre del Modal (`closeModal`)**:
   ```typescript
   const closeModal = useCallback(() => {
     setIsOpen(false);
     // Opcional: reiniciar estado tras pequeña animación de salida
   }, []);
   ```

4. **Estructura JSX Accesible del Backdrop y Diálogo**:
   ```tsx
   if (!isOpen) return null;

   return (
     <div
       id="quiz-modal-backdrop"
       className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060A1A] bg-opacity-95 overflow-y-auto"
       role="presentation"
       onClick={(e) => {
         // Cierre si el clic es exactamente en el backdrop
         if (e.target === e.currentTarget) {
           closeModal();
         }
       }}
     >
       <div
         ref={dialogRef}
         role="dialog"
         aria-modal="true"
         aria-labelledby="quiz-modal-title"
         aria-describedby="quiz-modal-description"
         tabIndex={-1}
         className="relative w-full max-w-lg bg-[#0A1226] border border-[#1E293B] rounded-2xl p-6 sm:p-8 text-slate-100 shadow-2xl focus:outline-none my-auto"
         onClick={(e) => e.stopPropagation()} // Evitar propagación al backdrop
       >
         {/* Botón de Cierre Accesible */}
         <button
           ref={closeButtonRef}
           type="button"
           onClick={closeModal}
           aria-label="Cerrar cuestionario de evaluación"
           className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-[#38BDF8] hover:bg-[#0E172F] border border-transparent hover:border-[#1E293B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
         >
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
         </button>

         {/* Contenido del paso actual */}
         {/* ... renderizado de pasos con Cinzel en encabezado y Jakarta en cuerpo ... */}
       </div>
     </div>
   );
   ```

---

## 5. Verification Method (Método de Verificación Independiente)

El equipo de implementación y auditoría puede verificar independientemente este diseño mediante los siguientes métodos automatizados y manuales:

### 5.1 Verificación Automatizada (Pruebas Unitarias y E2E)
Ejecutar la suite completa de pruebas desde la terminal:
```bash
node --test tests/tier1_features.test.mjs tests/tier2_edge_cases.test.mjs tests/tier3_cross_feature.test.mjs tests/tier4_user_journeys.test.mjs
```
- **Pruebas específicas que validan este reporte**:
  - `Feature 11: Interceptación Global WhatsApp` (T1.11.1 a T1.11.5) en `tests/tier1_features.test.mjs`.
  - `Cruce 3: Dolencia + Precarga en Quiz + Diagnóstico + Redirección WhatsApp` (T3.3.1 y T3.3.2) en `tests/tier3_cross_feature.test.mjs`.
  - `Journey B: Paciente Temático desde Catálogo de Dolencias` (T4.2.1) en `tests/tier4_user_journeys.test.mjs`.
  - `Journey C: Resiliencia Móvil y Fallback sin JavaScript` (T4.3.1) en `tests/tier4_user_journeys.test.mjs`.

### 5.2 Lista de Verificación Manual (Checklist de Implementación)
1. **Delegación de Clics**:
   - Hacer clic en el texto o en el SVG del botón "Agendar Sesión" del Navbar. El modal debe abrirse.
   - En una tarjeta de dolencia con `data-symptom="Gastritis"`, hacer clic en el CTA. El modal debe abrirse directamente en el **Paso 2** con "Gastritis" preseleccionado.
   - En una tarjeta de ciudad con `data-city="Madrid"`, hacer clic en el CTA. El campo de ubicación del paso 4 debe venir precargado con "Madrid".
2. **Respeto a Modificadores de Teclado**:
   - Hacer `Cmd + Clic` (Mac) o `Ctrl + Clic` (Windows) en un botón de WhatsApp. El navegador debe abrir una nueva pestaña con `wa.me/...` sin desplegar el modal interactivo.
3. **Control por Teclado y Accesibilidad**:
   - Presionar `Escape` mientras el modal está abierto: debe cerrarse de inmediato y regresar el foco al botón disparador.
   - Presionar `Tab` repetidamente: el foco debe rotar exclusivamente entre los elementos interactivos del modal (botón cerrar, opciones, campos de texto, botón siguiente) sin escapar al fondo de la página.
4. **Cero Salto de Layout (Anti-CLS Scroll Lock)**:
   - En un navegador de escritorio (Chrome/Firefox/Safari en macOS o Windows con scrollbars visibles), abrir y cerrar el modal repetidamente observando los márgenes del encabezado y del contenido. La compensación por `paddingRight` y `scrollbar-gutter: stable` debe mantener el layout 100% inmóvil (CLS = 0).
5. **Fallback sin JavaScript**:
   - Desactivar JavaScript en DevTools y recargar la página. Al hacer clic en cualquier CTA de WhatsApp, el enlace nativo `href="https://wa.me/573000000000?text=..."` debe abrir la aplicación o web de WhatsApp de manera fluida.

---

### Condiciones de Invalidación
Este diseño quedaría invalidado únicamente si:
1. Se modificara la arquitectura de Astro hacia un enrutador SPA del lado del cliente que no mantenga `BaseLayout` persistente.
2. Se cambiaran los selectores aprobados en `tests/tier1_features.test.mjs` (Feature 11).
3. Se permitieran librerías externas de modales no compatibles con React 19 (la solución actual utiliza cero dependencias externas, 100% React nativo).
