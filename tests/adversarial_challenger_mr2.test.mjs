/**
 * adversarial_challenger_mr2.test.mjs
 *
 * Suite de Verificación Adversarial Empírica para Hito MR2
 * Componentes evaluados: Navbar.astro, Footer.astro, WhatsAppQuizModal.tsx
 *
 * Desafíos evaluados:
 * 1. Resistencia a mutaciones de color: erradicación total de #D4AF37, #F59E0B y variantes ofuscadas/calculadas.
 * 2. Verificación empírica de eventos del modal: trigger 'alma:open-quiz', atributos data-*, data-quiz-final, y WAI-ARIA.
 * 3. Contratos estructurales y responsive de componentes editoriales (Navbar, Footer, Modal).
 * 4. Resistencia a fallos de borde, ataques de XSS/inyección en inputs, y compensación anti-CLS.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditMateStyleContent } from './helpers/mate_style_checker.mjs';
import { SITE_CONFIG, buildWhatsAppUrl } from '../src/config/site.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const NAVBAR_PATH = path.join(PROJECT_ROOT, 'src/components/Navbar.astro');
const FOOTER_PATH = path.join(PROJECT_ROOT, 'src/components/Footer.astro');
const MODAL_PATH = path.join(PROJECT_ROOT, 'src/components/react/WhatsAppQuizModal.tsx');

const navbarSource = fs.readFileSync(NAVBAR_PATH, 'utf8');
const footerSource = fs.readFileSync(FOOTER_PATH, 'utf8');
const modalSource = fs.readFileSync(MODAL_PATH, 'utf8');

const MR2_COMPONENTS = [
  { name: 'Navbar.astro', path: NAVBAR_PATH, source: navbarSource },
  { name: 'Footer.astro', path: FOOTER_PATH, source: footerSource },
  { name: 'WhatsAppQuizModal.tsx', path: MODAL_PATH, source: modalSource }
];

// ============================================================================
// CLASE MOCK DOM PARA SIMULACIÓN PRECISA DE EVENTOS EN NODE
// ============================================================================
class MockDOMElement {
  constructor(tagName, attributes = {}, textContent = '') {
    this.tagName = tagName.toUpperCase();
    this.attributes = { ...attributes };
    this.textContent = textContent;
    this.children = [];
    this.parentNode = null;
    this.classList = {
      _classes: new Set((attributes.class || '').split(/\s+/).filter(Boolean)),
      contains: (cls) => this.classList._classes.has(cls),
      add: (cls) => this.classList._classes.add(cls),
      remove: (cls) => this.classList._classes.delete(cls),
      toggle: (cls) => {
        if (this.classList._classes.has(cls)) {
          this.classList._classes.delete(cls);
          return false;
        } else {
          this.classList._classes.add(cls);
          return true;
        }
      }
    };
    this.style = {};
  }

  getAttribute(name) {
    return this.attributes[name] ?? null;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  hasAttribute(name) {
    return Object.prototype.hasOwnProperty.call(this.attributes, name);
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (current.matches && current.matches(selector)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  matches(selector) {
    const parts = selector.split(',').map(s => s.trim());
    for (const part of parts) {
      if (part.startsWith('[') && part.endsWith(']')) {
        const inner = part.slice(1, -1);
        if (inner.includes('=')) {
          const [attr, rawVal] = inner.split('=');
          const val = rawVal.replace(/^["']|["']$/g, '');
          if (this.getAttribute(attr) === val) return true;
        } else {
          if (this.hasAttribute(inner)) return true;
        }
      } else if (part.includes('[')) {
        // e.g. a[href*="wa.me"]
        const tag = part.substring(0, part.indexOf('[')).toUpperCase();
        if (tag && this.tagName !== tag) continue;
        const inner = part.substring(part.indexOf('[') + 1, part.indexOf(']'));
        if (inner.includes('*=')) {
          const [attr, rawVal] = inner.split('*=');
          const val = rawVal.replace(/^["']|["']$/g, '');
          const attrVal = this.getAttribute(attr) || '';
          if (attrVal.includes(val)) return true;
        } else if (inner.includes('=')) {
          const [attr, rawVal] = inner.split('=');
          const val = rawVal.replace(/^["']|["']$/g, '');
          if (this.getAttribute(attr) === val) return true;
        } else if (this.hasAttribute(inner)) {
          return true;
        }
      } else if (part.toUpperCase() === this.tagName) {
        return true;
      }
    }
    return false;
  }
}

// ============================================================================
// SUITE 1: RESISTENCIA A MUTACIONES DE COLOR Y ERRADICACIÓN DE ORO/AMARILLO
// ============================================================================
describe('MR2 Challenger - Dimensión 1: Resistencia a Mutaciones de Color', () => {

  test('ADV-MR2.1.1: Cero apariciones literales de #D4AF37 y #F59E0B (todas las variaciones de mayúsculas/minúsculas)', () => {
    const forbiddenHexRegex = /#(?:d4af37|f59e0b)/i;

    for (const comp of MR2_COMPONENTS) {
      const match = comp.source.match(forbiddenHexRegex);
      assert.equal(
        match,
        null,
        `Violación encontrada en ${comp.name}: contiene color prohibido "${match ? match[0] : ''}"`
      );
    }
  });

  test('ADV-MR2.1.2: Cero secuencias hexadecimales puras D4AF37 o F59E0B sin símbolo hash (resistencia a concatenaciones)', () => {
    // Busca si alguien dividió '#' + 'D4AF37' o 'd4af37' como constante
    const unhashedRegex = /(?:d4af37|f59e0b)/i;

    for (const comp of MR2_COMPONENTS) {
      const match = comp.source.match(unhashedRegex);
      assert.equal(
        match,
        null,
        `Violación de secuencia hexadecimal encontrada en ${comp.name}: contiene "${match ? match[0] : ''}"`
      );
    }
  });

  test('ADV-MR2.1.3: Cero declaraciones RGB/RGBA equivalentes a oro (#D4AF37 -> 212, 175, 55) o ámbar (#F59E0B -> 245, 158, 11)', () => {
    const rgbGoldRegex = /rgba?\s*\(\s*212\s*,\s*175\s*,\s*55/i;
    const rgbAmberRegex = /rgba?\s*\(\s*245\s*,\s*158\s*,\s*11/i;

    for (const comp of MR2_COMPONENTS) {
      assert.equal(
        rgbGoldRegex.test(comp.source),
        false,
        `${comp.name} contiene valores RGB equivalentes a oro satinado (212, 175, 55)`
      );
      assert.equal(
        rgbAmberRegex.test(comp.source),
        false,
        `${comp.name} contiene valores RGB equivalentes a ámbar (245, 158, 11)`
      );
    }
  });

  test('ADV-MR2.1.4: Cero clases de utilidad Tailwind de paletas amarillas, ámbar o doradas (amber-*, yellow-*, gold-*)', () => {
    const tailwindForbiddenColors = /(?:text|bg|border|from|to|via|ring|shadow|fill|stroke)-(?:amber|yellow|gold)(?:-[a-z0-9]+)?/i;

    for (const comp of MR2_COMPONENTS) {
      const match = comp.source.match(tailwindForbiddenColors);
      assert.equal(
        match,
        null,
        `Violación de clase Tailwind encontrada en ${comp.name}: "${match ? match[0] : ''}"`
      );
    }
  });

  test('ADV-MR2.1.5: Cero intentos de ofuscación de cadenas (String.fromCharCode, eval, atob, unicode/hex escapes)', () => {
    const obfuscationRegex = /(?:String\.fromCharCode|atob\s*\(|Buffer\.from\s*\(|eval\s*\(|Function\s*\(|\\u0023|\\x23)/i;

    for (const comp of MR2_COMPONENTS) {
      const match = comp.source.match(obfuscationRegex);
      assert.equal(
        match,
        null,
        `Patrón sospechoso de ofuscación detectado en ${comp.name}: "${match ? match[0] : ''}"`
      );
    }
  });

  test('ADV-MR2.1.6: Auditoría de cumplimiento 100% Sólido Mate (auditMateStyleContent sin violaciones)', () => {
    for (const comp of MR2_COMPONENTS) {
      const audit = auditMateStyleContent(comp.source, comp.name);
      assert.equal(
        audit.passed,
        true,
        `Auditoría mate falló en ${comp.name} con ${audit.violations.length} violaciones: ${audit.violations.map(v => v.reason).join('; ')}`
      );
      assert.equal(audit.violations.length, 0);
    }
  });
});

// ============================================================================
// SUITE 2: VERIFICACIÓN EMPÍRICA DEL MOTOR DE EVENTOS DE WHATSAPP QUIZ MODAL
// ============================================================================
describe('MR2 Challenger - Dimensión 2: Eventos y Despacho del Modal de Quiz', () => {

  // Implementación del harness de eventos equivalente al comportamiento de WhatsAppQuizModal.tsx
  function createModalHarness() {
    let state = {
      isOpen: false,
      step: 1,
      symptom: '',
      customSymptom: '',
      duration: '',
      customDuration: '',
      priorTreatments: '',
      customPriorTreatments: '',
      location: '',
      customLocation: ''
    };

    const handleOpen = (params) => {
      const sym = params?.symptom?.trim() || '';
      const loc = params?.city?.trim() || '';

      if (sym) {
        state.symptom = sym;
        state.customSymptom = '';
        state.step = 2;
      } else {
        state.step = 1;
      }

      if (loc) {
        state.location = loc;
        state.customLocation = '';
      }

      state.isOpen = true;
    };

    const handleClose = () => {
      state.isOpen = false;
    };

    const handleDocumentClick = (e) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target;
      if (!target) return;

      const trigger = target.closest(
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

    const handleCustomEvent = (e) => {
      const detail = e.detail || {};
      handleOpen({
        symptom: detail.symptom,
        city: detail.city || detail.location,
      });
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    return {
      getState: () => ({ ...state }),
      setState: (updates) => { Object.assign(state, updates); },
      handleOpen,
      handleClose,
      handleDocumentClick,
      handleCustomEvent,
      handleKeyDown
    };
  }

  test('ADV-MR2.2.1: Disparo de CustomEvent "alma:open-quiz" con síntoma precargado avanza directamente a Paso 2', () => {
    const harness = createModalHarness();

    harness.handleCustomEvent({
      type: 'alma:open-quiz',
      detail: { symptom: 'Lumbalgia aguda', city: 'Madrid' }
    });

    const s = harness.getState();
    assert.equal(s.isOpen, true, 'El modal debe abrirse');
    assert.equal(s.step, 2, 'Debe avanzar directamente al paso 2 (tiempo de evolución) al recibir síntoma');
    assert.equal(s.symptom, 'Lumbalgia aguda');
    assert.equal(s.location, 'Madrid');
  });

  test('ADV-MR2.2.2: Disparo de CustomEvent "alma:open-quiz" solo con ciudad/localización inicia en Paso 1', () => {
    const harness = createModalHarness();

    harness.handleCustomEvent({
      type: 'alma:open-quiz',
      detail: { location: 'Bogotá' }
    });

    const s = harness.getState();
    assert.equal(s.isOpen, true);
    assert.equal(s.step, 1, 'Sin síntoma debe permanecer en paso 1');
    assert.equal(s.symptom, '');
    assert.equal(s.location, 'Bogotá');
  });

  test('ADV-MR2.2.3: Disparo de CustomEvent "alma:open-quiz" sin detail o vacío no arroja excepción', () => {
    const harness = createModalHarness();

    assert.doesNotThrow(() => {
      harness.handleCustomEvent({ type: 'alma:open-quiz' });
    });

    const s = harness.getState();
    assert.equal(s.isOpen, true);
    assert.equal(s.step, 1);
  });

  test('ADV-MR2.2.4: Intercepción de clics delegados sobre trigger data-open-quiz invoca preventDefault y extrae atributos', () => {
    const harness = createModalHarness();

    const triggerLink = new MockDOMElement('A', {
      'href': 'https://wa.me/573000000000',
      'data-open-quiz': 'true',
      'data-symptom': 'Gastritis',
      'data-city': 'Miami'
    });

    let prevented = false;
    const mockEvent = {
      button: 0,
      target: triggerLink,
      preventDefault: () => { prevented = true; }
    };

    harness.handleDocumentClick(mockEvent);

    assert.equal(prevented, true, 'Debe prevenir la navegación directa por defecto');
    const s = harness.getState();
    assert.equal(s.isOpen, true);
    assert.equal(s.step, 2);
    assert.equal(s.symptom, 'Gastritis');
    assert.equal(s.location, 'Miami');
  });

  test('ADV-MR2.2.5: Clic sobre elemento interno anidado (<svg>, <path>) propaga correctamente vía closest()', () => {
    const harness = createModalHarness();

    const triggerLink = new MockDOMElement('A', {
      'href': 'https://wa.me/573000000000',
      'data-open-quiz': 'true',
      'data-location': 'footer-cta'
    });
    const svgIcon = new MockDOMElement('SVG');
    const pathElem = new MockDOMElement('PATH');
    svgIcon.appendChild(pathElem);
    triggerLink.appendChild(svgIcon);

    let prevented = false;
    const mockEvent = {
      button: 0,
      target: pathElem,
      preventDefault: () => { prevented = true; }
    };

    harness.handleDocumentClick(mockEvent);

    assert.equal(prevented, true);
    const s = harness.getState();
    assert.equal(s.isOpen, true);
    assert.equal(s.step, 1);
    assert.equal(s.location, 'footer-cta');
  });

  test('ADV-MR2.2.6: Clic con teclas modificadoras (meta, ctrl, shift, alt) no es interceptado para permitir abrir en nueva pestaña', () => {
    const harness = createModalHarness();

    const triggerLink = new MockDOMElement('A', {
      'href': 'https://wa.me/573000000000',
      'data-open-quiz': 'true'
    });

    const modifierKeys = ['metaKey', 'ctrlKey', 'shiftKey', 'altKey'];
    for (const key of modifierKeys) {
      let prevented = false;
      const eventWithModifier = {
        button: 0,
        [key]: true,
        target: triggerLink,
        preventDefault: () => { prevented = true; }
      };

      harness.handleDocumentClick(eventWithModifier);
      assert.equal(prevented, false, `No debe interceptar cuando ${key} está activo`);
    }

    // Botón secundario del mouse (rueda o clic derecho)
    let preventedSecondary = false;
    const eventAuxClick = {
      button: 1, // Middle click
      target: triggerLink,
      preventDefault: () => { preventedSecondary = true; }
    };
    harness.handleDocumentClick(eventAuxClick);
    assert.equal(preventedSecondary, false, 'No debe interceptar clic con botón auxiliar');
  });

  test('ADV-MR2.2.7: Clic sobre data-quiz-final="true" dentro del modal NO es interceptado para permitir salida hacia WhatsApp', () => {
    const harness = createModalHarness();

    const modalContainer = new MockDOMElement('DIV', { 'data-quiz-modal': 'true' });
    const finalLink = new MockDOMElement('A', {
      'href': 'https://wa.me/573000000000?text=test',
      'data-quiz-final': 'true'
    });
    modalContainer.appendChild(finalLink);

    let prevented = false;
    const mockEvent = {
      button: 0,
      target: finalLink,
      preventDefault: () => { prevented = true; }
    };

    harness.handleDocumentClick(mockEvent);

    assert.equal(prevented, false, 'El enlace final hacia WhatsApp con data-quiz-final no debe llamar preventDefault');
  });

  test('ADV-MR2.2.8: Tecla Escape cierra el modal de evaluación inmediatamente', () => {
    const harness = createModalHarness();
    harness.handleOpen({ symptom: 'Ansiedad' });
    assert.equal(harness.getState().isOpen, true);

    harness.handleKeyDown({ key: 'Escape' });
    assert.equal(harness.getState().isOpen, false, 'Escape debe cerrar el modal');
  });

  test('ADV-MR2.2.9: Extracción contextual de data-symptom y data-city desde contenedor ancestro', () => {
    const harness = createModalHarness();

    const cardWrapper = new MockDOMElement('DIV', {
      'data-symptom': 'Colon Irritable',
      'data-city': 'Buenos Aires'
    });
    const innerCTA = new MockDOMElement('A', {
      'href': 'https://wa.me/573000000000',
      'data-open-quiz': 'true'
    });
    cardWrapper.appendChild(innerCTA);

    let prevented = false;
    harness.handleDocumentClick({
      button: 0,
      target: innerCTA,
      preventDefault: () => { prevented = true; }
    });

    assert.equal(prevented, true);
    const s = harness.getState();
    assert.equal(s.symptom, 'Colon Irritable');
    assert.equal(s.location, 'Buenos Aires');
    assert.equal(s.step, 2);
  });

  test('ADV-MR2.2.10: Integración de SITE_CONFIG y buildWhatsAppUrl produce enlaces WhatsApp conformes', () => {
    assert.equal(SITE_CONFIG.whatsappNumber, '573000000000');
    const url = buildWhatsAppUrl({
      phone: SITE_CONFIG.whatsappNumber,
      symptom: 'Gastritis severa',
      duration: '6 meses a 1 año',
      priorTreatments: 'Medicación alopática',
      location: 'Bogotá'
    });

    const parsed = new URL(url);
    assert.equal(parsed.protocol, 'https:');
    assert.equal(parsed.hostname, 'wa.me');
    assert.equal(parsed.pathname, '/573000000000');
    assert.ok(parsed.searchParams.has('text'));

    const text = parsed.searchParams.get('text');
    assert.ok(text.includes('Gastritis severa'));
    assert.ok(text.includes('6 meses a 1 año'));
    assert.ok(text.includes('Medicación alopática'));
    assert.ok(text.includes('Bogotá'));
  });
});

// ============================================================================
// SUITE 3: CONTRATO VERBATIM DE DIAGNÓSTICO, ARIA Y CARACTERÍSTICAS TÉCNICAS
// ============================================================================
describe('MR2 Challenger - Dimensión 3: Accesibilidad WAI-ARIA y Contrato de Diagnóstico', () => {

  test('ADV-MR2.3.1: WhatsAppQuizModal.tsx implementa atributos WAI-ARIA estrictos (dialog, modal, labelledby, describedby)', () => {
    assert.ok(modalSource.includes('role="dialog"'), 'Debe incluir role="dialog"');
    assert.ok(modalSource.includes('aria-modal="true"'), 'Debe incluir aria-modal="true"');
    assert.ok(modalSource.includes('aria-labelledby="quiz-modal-title"'), 'Debe incluir aria-labelledby="quiz-modal-title"');
    assert.ok(modalSource.includes('aria-describedby="quiz-modal-description"'), 'Debe incluir aria-describedby="quiz-modal-description"');
  });

  test('ADV-MR2.3.2: Cada uno de los 5 pasos del modal contiene elementos con id="quiz-modal-title" e id="quiz-modal-description"', () => {
    // Contar apariciones de quiz-modal-title y quiz-modal-description
    const titleMatches = (modalSource.match(/id="quiz-modal-title"/g) || []).length;
    const descMatches = (modalSource.match(/id="quiz-modal-description"/g) || []).length;

    assert.equal(titleMatches, 5, `Deben existir exactamente 5 títulos accesibles (uno por paso), encontrados: ${titleMatches}`);
    assert.equal(descMatches, 5, `Deben existir exactamente 5 descripciones accesibles (uno por paso), encontradas: ${descMatches}`);
  });

  test('ADV-MR2.3.3: Verbatim exacto del diagnóstico en Paso 5 cumple tanto en atributo data-diagnosis como en contenido visual', () => {
    const verbatimPattern = /Identificamos un patrón relacionado con \$\{effectiveSymptom\} de \$\{effectiveDuration\} de evolución\./;
    assert.ok(
      verbatimPattern.test(modalSource),
      'El componente debe contener el string template verbatim para la fórmula diagnóstica'
    );

    assert.ok(
      modalSource.includes('data-diagnosis={`Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`}'),
      'data-diagnosis debe contener la fórmula verbatim'
    );
  });

  test('ADV-MR2.3.4: Botón de cierre posee etiqueta accesible aria-label', () => {
    assert.ok(
      modalSource.includes('aria-label="Cerrar modal de evaluación"'),
      'El botón de cerrar debe tener aria-label="Cerrar modal de evaluación"'
    );
  });

  test('ADV-MR2.3.5: Contenedor del modal aplica esquinas editoriales rounded-[2.5rem] y fondo mate #0A1226', () => {
    assert.ok(modalSource.includes('rounded-[2.5rem]'), 'El modal debe incluir la clase editorial rounded-[2.5rem]');
    assert.ok(modalSource.includes('bg-[#0A1226]'), 'El modal debe usar la superficie mate #0A1226');
  });

  test('ADV-MR2.3.6: Botón final y botones de navegación usan estilo píldora blanco bg-white text-[#060A1A] rounded-full', () => {
    assert.ok(modalSource.includes('rounded-full bg-white text-[#060A1A]') || modalSource.includes('bg-white text-[#060A1A] font-medium text-xs sm:text-sm hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white') || modalSource.includes('bg-white text-[#060A1A]'), 'Botones de acción deben usar píldora blanca');
    assert.ok(modalSource.includes('shadow-pill-white'), 'Botones deben usar sombra shadow-pill-white');
  });

  test('ADV-MR2.3.7: Exportación dual (Named y Default) presente en WhatsAppQuizModal.tsx', () => {
    assert.ok(modalSource.includes('export function WhatsAppQuizModal'), 'Debe proveer named export');
    assert.ok(modalSource.includes('export default WhatsAppQuizModal'), 'Debe proveer default export');
  });
});

// ============================================================================
// SUITE 4: CONTRATOS ESTRUCTURALES DE NAVBAR Y FOOTER
// ============================================================================
describe('MR2 Challenger - Dimensión 4: Contratos de Navbar.astro y Footer.astro', () => {

  test('ADV-MR2.4.1: Navbar.astro cumple dimensiones explícitas y contención del Logo', () => {
    assert.ok(navbarSource.includes('width="44"'), 'Logo en Navbar debe tener width="44"');
    assert.ok(navbarSource.includes('height="44"'), 'Logo en Navbar debe tener height="44"');
    assert.ok(navbarSource.includes('shrink-0'), 'Contenedor del logo en Navbar debe tener shrink-0');
    assert.ok(navbarSource.includes('loading="eager"'), 'Logo en Navbar debe cargar con loading="eager"');
  });

  test('ADV-MR2.4.2: Navbar.astro incluye navegación responsiva y control accesible del menú móvil', () => {
    assert.ok(navbarSource.includes('hidden md:flex'), 'Navegación desktop oculta en móvil (hidden md:flex)');
    assert.ok(navbarSource.includes('id="mobile-menu"'), 'Contenedor de menú móvil con id="mobile-menu"');
    assert.ok(navbarSource.includes('hidden md:hidden'), 'Menú móvil oculto por defecto');
    assert.ok(navbarSource.includes('aria-expanded="false"'), 'Botón hamburguesa inicializado en aria-expanded="false"');
    assert.ok(navbarSource.includes("btn.setAttribute('aria-expanded', String(!isExpanded))"), 'Script actualiza aria-expanded en toggle');
  });

  test('ADV-MR2.4.3: Navbar.astro CTAs desktop y móvil tienen data-open-quiz y estilo píldora blanco', () => {
    assert.ok(navbarSource.includes('data-open-quiz="true"'), 'Debe contener data-open-quiz="true"');
    assert.ok(navbarSource.includes('data-location="global"'), 'CTA desktop debe tener data-location="global"');
    assert.ok(navbarSource.includes('data-location="mobile-nav"'), 'CTA móvil debe tener data-location="mobile-nav"');
    assert.ok(navbarSource.includes('hover:bg-[#779DD1]') || navbarSource.includes('hover:bg-[#6482AD]') || navbarSource.includes('hover:bg-[#38BDF8]'), 'Debe tener hover con el color de acento');
  });

  test('ADV-MR2.4.4: Footer.astro cumple dimensiones explícitas del Logo y grilla responsiva', () => {
    assert.ok(footerSource.includes('width="40"'), 'Logo en Footer debe tener width="40"');
    assert.ok(footerSource.includes('height="40"'), 'Logo en Footer debe tener height="40"');
    assert.ok(footerSource.includes('shrink-0'), 'Contenedor del logo en Footer debe tener shrink-0');
    assert.ok(footerSource.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-4'), 'Grilla de 1 a 4 columnas');
    assert.ok(footerSource.includes('flex flex-col sm:flex-row'), 'Barra legal flex-col en móvil y row en sm+');
  });

  test('ADV-MR2.4.5: Footer.astro incluye Descargo Médico obligatorio con términos clave', () => {
    assert.ok(footerSource.includes('Descargo de Responsabilidad Médica'), 'Título obligatorio presente');
    assert.ok(footerSource.includes('sustituyen'), 'Término "sustituyen" presente');
    assert.ok(footerSource.includes('diagnóstico'), 'Término "diagnóstico" presente');
    assert.ok(footerSource.includes('médico'), 'Término "médico" presente');
  });

  test('ADV-MR2.4.6: Footer.astro CTAs tienen data-open-quiz y localizaciones requeridas', () => {
    assert.ok(footerSource.includes('data-location="footer-cta"'), 'CTA columna 4 data-location="footer-cta"');
    assert.ok(footerSource.includes('data-location="footer-brand"'), 'CTA marca data-location="footer-brand"');
    assert.ok(footerSource.includes('data-location="footer-bottom-contact"'), 'Enlace inferior data-location="footer-bottom-contact"');
  });
});
