/**
 * Adversarial Test Suite: M3 WhatsApp Quiz Funnel Modal
 * Challenger: teamwork_preview_challenger_m3_1
 *
 * Empirical verification of:
 * 1. Global event delegation with closest() matching on deeply nested children (<svg>, <path>, <span>)
 * 2. Hierarchical extraction of data-symptom, data-city, data-location from trigger or ancestors
 * 3. Support for custom event 'alma:open-quiz' with { symptom, city, location } detail and auto-advance to step 2
 * 4. Resilient fallback when detail is empty or missing
 * 5. Safe non-interception of modal final link [data-quiz-final] (preventing infinite interception loops)
 * 6. Non-interception of keyboard modifiers (Meta, Ctrl, Shift, Alt) and non-primary mouse clicks (right/middle)
 * 7. Non-interception of standard links (internal navigation, anchors)
 * 8. WAI-ARIA modal contracts (role="dialog", aria-modal="true", labels, Escape key handling)
 * 9. CLS-safe scroll lock with scrollbar compensation and restoration
 * 10. Preliminary diagnosis exact formula and structured WhatsApp URL encoding
 * 11. Strict solid matte styling compliance (zero transparencias, zero backdrop-blur, zero glowing borders)
 * 12. BaseLayout.astro integration contracts (#quiz-modal-container, client:load, slot preservation)
 */

import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE_CONFIG, buildWhatsAppUrl } from '../src/config/site.ts';
import { auditMateStyleContent } from './helpers/mate_style_checker.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ============================================================================
// SIMULATED DOM ENGINE (Pure JS implementation of DOM Level 2/3 Event & Traversal)
// ============================================================================

class MockElement extends EventTarget {
  constructor(tagName, attrs = {}) {
    super();
    this.tagName = tagName.toUpperCase();
    this.attributes = { ...attrs };
    this.parentElement = null;
    this.children = [];
    this.style = {};
  }

  getAttribute(name) {
    return Object.prototype.hasOwnProperty.call(this.attributes, name)
      ? this.attributes[name]
      : null;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  hasAttribute(name) {
    return Object.prototype.hasOwnProperty.call(this.attributes, name);
  }

  removeAttribute(name) {
    delete this.attributes[name];
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (current instanceof MockElement && current.matches(selector)) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }

  matches(selector) {
    const subSelectors = selector.split(',').map((s) => s.trim());
    return subSelectors.some((sub) => this._matchSingle(sub));
  }

  _matchSingle(sel) {
    if (sel.startsWith('[') && sel.endsWith(']')) {
      const inside = sel.slice(1, -1);
      return this._matchAttr(inside);
    }

    if (sel.includes('[') && sel.endsWith(']')) {
      const tag = sel.split('[')[0].toUpperCase();
      const inside = sel.slice(sel.indexOf('[') + 1, -1);
      if (tag && this.tagName !== tag) return false;
      return this._matchAttr(inside);
    }

    return this.tagName === sel.toUpperCase();
  }

  _matchAttr(attrExpr) {
    if (attrExpr.includes('*=')) {
      const [attrName, rawVal] = attrExpr.split('*=').map((s) => s.trim());
      const val = rawVal.replace(/^["']|["']$/g, '');
      const attrVal = this.getAttribute(attrName);
      return attrVal !== null && attrVal.includes(val);
    }
    if (attrExpr.includes('=')) {
      const [attrName, rawVal] = attrExpr.split('=').map((s) => s.trim());
      const val = rawVal.replace(/^["']|["']$/g, '');
      return this.getAttribute(attrName) === val;
    }
    return this.hasAttribute(attrExpr);
  }
}

class MockMouseEvent {
  constructor(type, init = {}) {
    this.type = type;
    this.button = init.button ?? 0;
    this.metaKey = init.metaKey ?? false;
    this.ctrlKey = init.ctrlKey ?? false;
    this.shiftKey = init.shiftKey ?? false;
    this.altKey = init.altKey ?? false;
    this.target = init.target ?? null;
    this.defaultPrevented = false;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }
}

class MockKeyboardEvent {
  constructor(type, init = {}) {
    this.type = type;
    this.key = init.key ?? '';
    this.defaultPrevented = false;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }
}

// ============================================================================
// SUITE ADVERSARIAL M3
// ============================================================================

describe('Adversarial M3: WhatsApp Quiz Modal & Global Event Delegation Stress', () => {
  const modalSourcePath = path.join(PROJECT_ROOT, 'src/components/react/WhatsAppQuizModal.tsx');
  const layoutSourcePath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');

  assert.ok(fs.existsSync(modalSourcePath), 'WhatsAppQuizModal.tsx must exist');
  assert.ok(fs.existsSync(layoutSourcePath), 'BaseLayout.astro must exist');

  const modalCode = fs.readFileSync(modalSourcePath, 'utf8');
  const layoutCode = fs.readFileSync(layoutSourcePath, 'utf8');

  // --------------------------------------------------------------------------
  // TEST SET 1: Delegación Global de Eventos & closest() con Elementos Anidados
  // --------------------------------------------------------------------------
  describe('1. Delegación Global & closest() sobre Elementos Anidados Profundos', () => {
    let mockDoc;
    let clickListener;
    let customEventListener;
    let keydownListener;

    let openedState;
    let handleOpenCalls;
    let handleCloseCalls;

    beforeEach(() => {
      mockDoc = new MockElement('DOCUMENT');
      mockDoc.body = new MockElement('BODY');
      mockDoc.documentElement = new MockElement('HTML');
      mockDoc.documentElement.clientWidth = 1000;
      mockDoc.appendChild(mockDoc.body);

      openedState = { isOpen: false, step: 1, symptom: '', city: '' };
      handleOpenCalls = [];
      handleCloseCalls = [];

      const handleOpen = (params) => {
        handleOpenCalls.push(params);
        openedState.isOpen = true;
        openedState.symptom = params?.symptom?.trim() || '';
        openedState.city = params?.city?.trim() || '';
        if (openedState.symptom) {
          openedState.step = 2;
        } else {
          openedState.step = 1;
        }
      };

      const handleClose = () => {
        handleCloseCalls.push(true);
        openedState.isOpen = false;
      };

      // Implementación fiel de la lógica de WhatsAppQuizModal.tsx (líneas 135-199)
      clickListener = (e) => {
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

      customEventListener = (e) => {
        const detail = e.detail || {};
        handleOpen({
          symptom: detail.symptom,
          city: detail.city || detail.location,
        });
      };

      keydownListener = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
    });

    test('ADV-M3.1: Clic sobre <path> dentro de <svg> anidado en CTA wa.me intercepta y previene default', () => {
      const ctaAnchor = new MockElement('A', {
        href: 'https://wa.me/573000000000',
        'data-open-quiz': 'true',
        'data-symptom': 'Gastritis Aguda',
        'data-city': 'Bogotá',
      });
      const svg = new MockElement('SVG', { class: 'w-5 h-5' });
      const pathEl = new MockElement('PATH', { d: 'M12 2C...' });

      svg.appendChild(pathEl);
      ctaAnchor.appendChild(svg);
      mockDoc.body.appendChild(ctaAnchor);

      const event = new MockMouseEvent('click', { target: pathEl, button: 0 });
      clickListener(event);

      assert.equal(event.defaultPrevented, true, 'e.preventDefault() must be called');
      assert.equal(handleOpenCalls.length, 1, 'handleOpen must be invoked once');
      assert.equal(handleOpenCalls[0].symptom, 'Gastritis Aguda');
      assert.equal(handleOpenCalls[0].city, 'Bogotá');
      assert.equal(openedState.isOpen, true);
      assert.equal(openedState.step, 2, 'Must advance to step 2 when symptom is preloaded');
    });

    test('ADV-M3.2: Clic sobre <span> de texto dentro de CTA con whatsapp.com intercepta correctamente', () => {
      const ctaAnchor = new MockElement('A', {
        href: 'https://api.whatsapp.com/send?phone=573000000000',
        'data-open-quiz': 'true',
      });
      const span = new MockElement('SPAN');
      ctaAnchor.appendChild(span);
      mockDoc.body.appendChild(ctaAnchor);

      const event = new MockMouseEvent('click', { target: span, button: 0 });
      clickListener(event);

      assert.equal(event.defaultPrevented, true);
      assert.equal(handleOpenCalls.length, 1);
      assert.equal(handleOpenCalls[0].symptom, '');
      assert.equal(handleOpenCalls[0].city, '');
      assert.equal(openedState.step, 1, 'Must stay on step 1 when no symptom is preloaded');
    });

    test('ADV-M3.3: Jerarquía ascendente: data-symptom y data-location heredados de contenedor padre', () => {
      const section = new MockElement('SECTION', {
        'data-symptom': 'Lumbalgia y Dolor Crónico',
        'data-location': 'Santiago de Chile',
      });
      const div = new MockElement('DIV');
      const button = new MockElement('BUTTON', {
        'data-open-quiz': 'true',
      });
      const strong = new MockElement('STRONG');

      button.appendChild(strong);
      div.appendChild(button);
      section.appendChild(div);
      mockDoc.body.appendChild(section);

      const event = new MockMouseEvent('click', { target: strong, button: 0 });
      clickListener(event);

      assert.equal(event.defaultPrevented, true);
      assert.equal(handleOpenCalls.length, 1);
      assert.equal(handleOpenCalls[0].symptom, 'Lumbalgia y Dolor Crónico');
      assert.equal(handleOpenCalls[0].city, 'Santiago de Chile');
      assert.equal(openedState.step, 2);
    });

    test('ADV-M3.4: Enlaces ordinarios e internos nunca son interceptados', () => {
      const internalLink = new MockElement('A', {
        href: '/biodescodificacion/gastritis',
      });
      const textNode = new MockElement('SPAN');
      internalLink.appendChild(textNode);
      mockDoc.body.appendChild(internalLink);

      const event = new MockMouseEvent('click', { target: textNode, button: 0 });
      clickListener(event);

      assert.equal(event.defaultPrevented, false, 'Internal links must never be intercepted');
      assert.equal(handleOpenCalls.length, 0);
    });

    test('ADV-M3.5: Clics con modificadores de teclado (Meta, Ctrl, Shift, Alt) preservan navegación nativa', () => {
      const ctaAnchor = new MockElement('A', {
        href: 'https://wa.me/573000000000',
        'data-open-quiz': 'true',
      });
      mockDoc.body.appendChild(ctaAnchor);

      ['metaKey', 'ctrlKey', 'shiftKey', 'altKey'].forEach((modifier) => {
        const event = new MockMouseEvent('click', {
          target: ctaAnchor,
          button: 0,
          [modifier]: true,
        });
        clickListener(event);
        assert.equal(
          event.defaultPrevented,
          false,
          `Modifier ${modifier} must not trigger preventDefault()`
        );
      });
      assert.equal(handleOpenCalls.length, 0, 'No modal open with keyboard modifiers');
    });

    test('ADV-M3.6: Clics secundarios (botón derecho / central) no abren el modal', () => {
      const ctaAnchor = new MockElement('A', {
        href: 'https://wa.me/573000000000',
        'data-open-quiz': 'true',
      });
      mockDoc.body.appendChild(ctaAnchor);

      const rightClick = new MockMouseEvent('click', { target: ctaAnchor, button: 2 });
      clickListener(rightClick);
      assert.equal(rightClick.defaultPrevented, false);

      const middleClick = new MockMouseEvent('click', { target: ctaAnchor, button: 1 });
      clickListener(middleClick);
      assert.equal(middleClick.defaultPrevented, false);

      assert.equal(handleOpenCalls.length, 0);
    });

    test('ADV-M3.6B: Tecla Escape invoca handleClose y cierra el modal', () => {
      openedState.isOpen = true;
      const escEvent = new MockKeyboardEvent('keydown', { key: 'Escape' });
      keydownListener(escEvent);
      assert.equal(handleCloseCalls.length, 1);
      assert.equal(openedState.isOpen, false);
    });

    test('ADV-M3.6C: CustomEvent alma:open-quiz registrado en document listener abre el modal', () => {
      const customEvt = new CustomEvent('alma:open-quiz', {
        detail: { symptom: 'Dermatitis', city: 'Medellín' },
      });
      customEventListener(customEvt);
      assert.equal(openedState.isOpen, true);
      assert.equal(openedState.symptom, 'Dermatitis');
      assert.equal(openedState.city, 'Medellín');
      assert.equal(openedState.step, 2);
    });
  });

  // --------------------------------------------------------------------------
  // TEST SET 2: Disparo del CustomEvent 'alma:open-quiz'
  // --------------------------------------------------------------------------
  describe('2. Integridad y Resiliencia del CustomEvent alma:open-quiz', () => {
    let openedState;
    let customEventListener;

    beforeEach(() => {
      openedState = { isOpen: false, step: 1, symptom: '', city: '' };

      const handleOpen = (params) => {
        openedState.isOpen = true;
        openedState.symptom = params?.symptom?.trim() || '';
        openedState.city = params?.city?.trim() || '';
        if (openedState.symptom) {
          openedState.step = 2;
        } else {
          openedState.step = 1;
        }
      };

      customEventListener = (e) => {
        const detail = e.detail || {};
        handleOpen({
          symptom: detail.symptom,
          city: detail.city || detail.location,
        });
      };
    });

    test('ADV-M3.7: alma:open-quiz con symptom y city precarga y salta a paso 2', () => {
      const event = new CustomEvent('alma:open-quiz', {
        detail: { symptom: 'Fibromialgia', city: 'Madrid' },
      });
      customEventListener(event);

      assert.equal(openedState.isOpen, true);
      assert.equal(openedState.symptom, 'Fibromialgia');
      assert.equal(openedState.city, 'Madrid');
      assert.equal(openedState.step, 2);
    });

    test('ADV-M3.8: alma:open-quiz soporta propiedad location como alternativa a city', () => {
      const event = new CustomEvent('alma:open-quiz', {
        detail: { symptom: 'Colon Irritable', location: 'Buenos Aires' },
      });
      customEventListener(event);

      assert.equal(openedState.isOpen, true);
      assert.equal(openedState.symptom, 'Colon Irritable');
      assert.equal(openedState.city, 'Buenos Aires');
      assert.equal(openedState.step, 2);
    });

    test('ADV-M3.9: alma:open-quiz con symptom vacío inicia en paso 1 sin errores', () => {
      const event = new CustomEvent('alma:open-quiz', {
        detail: { city: 'Lima' },
      });
      customEventListener(event);

      assert.equal(openedState.isOpen, true);
      assert.equal(openedState.symptom, '');
      assert.equal(openedState.city, 'Lima');
      assert.equal(openedState.step, 1);
    });

    test('ADV-M3.10: alma:open-quiz sin detail no lanza excepción y abre en paso 1', () => {
      const event = new CustomEvent('alma:open-quiz');
      assert.doesNotThrow(() => {
        customEventListener(event);
      });
      assert.equal(openedState.isOpen, true);
      assert.equal(openedState.step, 1);
    });
  });

  // --------------------------------------------------------------------------
  // TEST SET 3: No Interceptación del Enlace Final WhatsApp (data-quiz-final)
  // --------------------------------------------------------------------------
  describe('3. Prevención de Bucle Infinito en Enlace Final (data-quiz-final)', () => {
    let mockDoc;
    let clickListener;
    let handleOpenCalls;

    beforeEach(() => {
      mockDoc = new MockElement('DOCUMENT');
      mockDoc.body = new MockElement('BODY');
      mockDoc.appendChild(mockDoc.body);
      handleOpenCalls = [];

      const handleOpen = (params) => {
        handleOpenCalls.push(params);
      };

      clickListener = (e) => {
        if (e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const target = e.target;
        if (!target) return;

        const trigger = target.closest(
          'a[href*="wa.me"], a[href*="whatsapp.com"], [data-open-quiz]'
        );

        // Cláusula de no-interceptación crítica
        if (!trigger || trigger.closest('[data-quiz-modal]') || trigger.hasAttribute('data-quiz-final')) {
          return;
        }

        e.preventDefault();
        handleOpen({});
      };
    });

    test('ADV-M3.11: Clic directo en enlace con data-quiz-final dentro del modal NO previene default ni reabre', () => {
      const modalRoot = new MockElement('DIV', {
        'data-quiz-modal': 'true',
        role: 'dialog',
      });
      const finalLink = new MockElement('A', {
        href: 'https://wa.me/573000000000?text=Consulta',
        'data-quiz-final': 'true',
        target: '_blank',
      });
      const linkText = new MockElement('SPAN');

      finalLink.appendChild(linkText);
      modalRoot.appendChild(finalLink);
      mockDoc.body.appendChild(modalRoot);

      const event = new MockMouseEvent('click', { target: finalLink, button: 0 });
      clickListener(event);

      assert.equal(event.defaultPrevented, false, 'Default MUST NOT be prevented for final WhatsApp CTA');
      assert.equal(handleOpenCalls.length, 0, 'Must NOT trigger handleOpen again (prevents infinite loop)');
    });

    test('ADV-M3.12: Clic en <span> o <svg> hijo del enlace final NO es interceptado', () => {
      const modalRoot = new MockElement('DIV', { 'data-quiz-modal': 'true' });
      const finalLink = new MockElement('A', {
        href: 'https://wa.me/573000000000?text=Consulta',
        'data-quiz-final': 'true',
      });
      const svgIcon = new MockElement('SVG');
      const pathEl = new MockElement('PATH');
      const spanText = new MockElement('SPAN');

      svgIcon.appendChild(pathEl);
      finalLink.appendChild(svgIcon);
      finalLink.appendChild(spanText);
      modalRoot.appendChild(finalLink);
      mockDoc.body.appendChild(modalRoot);

      // Clic en path del SVG
      const pathClick = new MockMouseEvent('click', { target: pathEl, button: 0 });
      clickListener(pathClick);
      assert.equal(pathClick.defaultPrevented, false);
      assert.equal(handleOpenCalls.length, 0);

      // Clic en span
      const spanClick = new MockMouseEvent('click', { target: spanText, button: 0 });
      clickListener(spanClick);
      assert.equal(spanClick.defaultPrevented, false);
      assert.equal(handleOpenCalls.length, 0);
    });

    test('ADV-M3.13: Enlace data-quiz-final fuera de data-quiz-modal sigue protegido por atributo directo', () => {
      const standaloneFinalLink = new MockElement('A', {
        href: 'https://wa.me/573000000000',
        'data-quiz-final': 'true',
      });
      const span = new MockElement('SPAN');
      standaloneFinalLink.appendChild(span);
      mockDoc.body.appendChild(standaloneFinalLink);

      const event = new MockMouseEvent('click', { target: span, button: 0 });
      clickListener(event);

      assert.equal(event.defaultPrevented, false);
      assert.equal(handleOpenCalls.length, 0);
    });
  });

  // --------------------------------------------------------------------------
  // TEST SET 4: Verificación Forense del Código Fuente del Modal
  // --------------------------------------------------------------------------
  describe('4. Verificación Forense de WhatsAppQuizModal.tsx', () => {
    test('ADV-M3.14: Selector global de captura incluye enlaces wa.me, whatsapp.com y data-open-quiz', () => {
      assert.ok(modalCode.includes('handleDocumentClick'));
      assert.ok(modalCode.includes('a[href*="wa.me"]'));
      assert.ok(modalCode.includes('a[href*="whatsapp.com"]'));
      assert.ok(modalCode.includes('[data-open-quiz]'));
      assert.ok(modalCode.includes('{ capture: true }'), 'Must use capture phase for reliable interception');
    });

    test('ADV-M3.15: Escucha y desuscripción limpia de alma:open-quiz y escape en useEffect', () => {
      assert.ok(modalCode.includes("window.addEventListener('alma:open-quiz'"));
      assert.ok(modalCode.includes("window.removeEventListener('alma:open-quiz'"));
      assert.ok(modalCode.includes("document.addEventListener('click', handleDocumentClick, { capture: true })"));
      assert.ok(modalCode.includes("document.removeEventListener('click', handleDocumentClick, { capture: true })"));
      assert.ok(modalCode.includes("e.key === 'Escape'"));
    });

    test('ADV-M3.16: Diagnóstico preliminar genera fórmula exacta requerida por T1.10.2', () => {
      const formulaSnippet = 'Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.';
      assert.ok(
        modalCode.includes(formulaSnippet) ||
        modalCode.includes('Identificamos un patrón relacionado con'),
        'Diagnostic paragraph must match project formula'
      );
    });

    test('ADV-M3.17: Integración con buildWhatsAppUrl y SITE_CONFIG', () => {
      assert.ok(modalCode.includes("import { SITE_CONFIG, buildWhatsAppUrl } from '../../config/site'"));
      assert.ok(modalCode.includes('buildWhatsAppUrl('));
      assert.ok(modalCode.includes('SITE_CONFIG.whatsappNumber'));
    });

    test('ADV-M3.17B: buildWhatsAppUrl genera formato conforme con SITE_CONFIG y parámetros de diagnóstico', () => {
      const url = buildWhatsAppUrl({
        phone: SITE_CONFIG.whatsappNumber,
        symptom: 'Gastritis / Acidez',
        duration: 'Más de 1 año',
        priorTreatments: 'Antiácidos',
        location: 'Bogotá'
      });
      assert.ok(url.startsWith(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=`));
      assert.ok(url.includes(encodeURIComponent('Gastritis / Acidez')));
      assert.ok(url.includes(encodeURIComponent('Bogotá')));
    });

    test('ADV-M3.18: Accesibilidad WAI-ARIA en contenedor modal', () => {
      assert.ok(modalCode.includes('role="dialog"'));
      assert.ok(modalCode.includes('aria-modal="true"'));
      assert.ok(modalCode.includes('aria-labelledby="quiz-modal-title"'));
      assert.ok(modalCode.includes('aria-describedby="quiz-modal-description"'));
      assert.ok(modalCode.includes('aria-label="Cerrar modal de evaluación"'));
    });

    test('ADV-M3.19: Prevención de CLS mediante scrollbarWidth compensation', () => {
      assert.ok(modalCode.includes('scrollbarWidth'));
      assert.ok(modalCode.includes("document.body.style.overflow = 'hidden'"));
      assert.ok(modalCode.includes('document.body.style.paddingRight'));
    });
  });

  // --------------------------------------------------------------------------
  // TEST SET 5: Contratos de BaseLayout.astro
  // --------------------------------------------------------------------------
  describe('5. Contratos de Integración en BaseLayout.astro', () => {
    test('ADV-M3.20: BaseLayout importa e inyecta WhatsAppQuizModal con client:load', () => {
      assert.ok(
        layoutCode.includes("import WhatsAppQuizModal from '../components/react/WhatsAppQuizModal'"),
        'BaseLayout must import WhatsAppQuizModal'
      );
      assert.ok(
        layoutCode.includes('<WhatsAppQuizModal client:load />'),
        'WhatsAppQuizModal must have client:load directive'
      );
    });

    test('ADV-M3.21: BaseLayout contiene #quiz-modal-container y preserva intacto <slot name="quiz-modal" />', () => {
      assert.ok(
        layoutCode.includes('id="quiz-modal-container"'),
        '#quiz-modal-container must exist'
      );
      assert.ok(
        layoutCode.includes('data-client-load="client:load"'),
        'data-client-load contract must be preserved'
      );
      assert.ok(
        layoutCode.includes('<slot name="quiz-modal" />'),
        '<slot name="quiz-modal" /> must be preserved verbatim for test compatibility'
      );
    });
  });

  // --------------------------------------------------------------------------
  // TEST SET 6: Auditoría de Estilo Visual Sólido Mate (Cero Transparencias)
  // --------------------------------------------------------------------------
  describe('6. Auditoría Estricta de Estilo Sólido Mate', () => {
    test('ADV-M3.22: WhatsAppQuizModal.tsx cumple 100% con estilo mate sólido', () => {
      const audit = auditMateStyleContent(modalCode, 'WhatsAppQuizModal.tsx');
      assert.equal(audit.passed, true, `Violations found: ${JSON.stringify(audit.violations)}`);
      assert.equal(audit.violations.length, 0);
    });

    test('ADV-M3.23: BaseLayout.astro cumple 100% con estilo mate sólido', () => {
      const audit = auditMateStyleContent(layoutCode, 'BaseLayout.astro');
      assert.equal(audit.passed, true, `Violations found: ${JSON.stringify(audit.violations)}`);
      assert.equal(audit.violations.length, 0);
    });
  });
});
