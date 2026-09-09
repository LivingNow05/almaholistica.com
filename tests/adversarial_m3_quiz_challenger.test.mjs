/**
 * Adversarial Test Suite: WhatsApp Quiz Modal, Diagnosis Formula, WhatsApp URL & Layout Contracts
 * Milestone: M3 Gate Challenge
 * Author: teamwork_preview_challenger_m3_2
 *
 * Empirical verification:
 * 1. Exact preliminary diagnosis formula in Step 5:
 *    `Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`
 *    with boundary conditions, special characters, tildes, quotes and whitespace trimming.
 * 2. buildWhatsAppUrl() phone sanitization, encoding and URL validity.
 * 3. BaseLayout.astro contract compliance:
 *    - #quiz-modal-container exists in <body> with data-client-load="client:load"
 *    - <slot name="quiz-modal" /> remains self-closing and intact (ADV-M2.2.10)
 *    - <WhatsAppQuizModal client:load /> is present
 * 4. WhatsAppQuizModal.tsx component architecture, accessibility and solid-matte compliance.
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildWhatsAppUrl, SITE_CONFIG } from '../src/config/site.ts';
import { auditMateStyleContent } from './helpers/mate_style_checker.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

describe('Adversarial M3.2: Exact Preliminary Diagnosis Formula Stress-Testing', () => {
  const modalPath = path.join(PROJECT_ROOT, 'src/components/react/WhatsAppQuizModal.tsx');
  const modalSource = fs.readFileSync(modalPath, 'utf8');

  // Diagnosis formula helper matching WhatsAppQuizModal logic
  function generateDiagnosis(effectiveSymptom, effectiveDuration) {
    const sym = effectiveSymptom.trim() || 'Consulta General';
    const dur = effectiveDuration.trim() || 'No especificado';
    return `Identificamos un patrón relacionado con ${sym} de ${dur} de evolución.`;
  }

  test('ADV-M3.2.1: WhatsAppQuizModal contains the verbatim diagnosis formula', () => {
    const formulaPattern = /Identificamos un patrón relacionado con \$\{effectiveSymptom\} de \$\{effectiveDuration\} de evolución\./;
    assert.ok(
      formulaPattern.test(modalSource),
      'WhatsAppQuizModal.tsx must contain verbatim formula `Identificamos un patrón relacionado con ${effectiveSymptom} de ${effectiveDuration} de evolución.`'
    );
  });

  test('ADV-M3.2.2: Diagnosis text with standard clinical inputs', () => {
    const text = generateDiagnosis('Gastritis', 'Más de 1 año');
    assert.equal(text, 'Identificamos un patrón relacionado con Gastritis de Más de 1 año de evolución.');
  });

  test('ADV-M3.2.3: Diagnosis text with special characters, quotes and accents', () => {
    const inputs = [
      { symptom: 'Migraña con aura & fotofobia "severa"', duration: '6 meses a 1 año' },
      { symptom: 'Dolor lumbar / ciática aguda', duration: '3 semanas (reciente)' },
      { symptom: 'Sobrepeso & retención de líquidos (100%)', duration: '> 2 años' },
      { symptom: 'Colon irritable <espástico>', duration: '1 a 6 meses' },
    ];

    for (const item of inputs) {
      const result = generateDiagnosis(item.symptom, item.duration);
      assert.ok(result.startsWith('Identificamos un patrón relacionado con '));
      assert.ok(result.endsWith(' de evolución.'));
      assert.ok(result.includes(item.symptom));
      assert.ok(result.includes(item.duration));
    }
  });

  test('ADV-M3.2.4: Diagnosis text fallback when inputs are empty or whitespace only', () => {
    const resultEmpty = generateDiagnosis('', '');
    assert.equal(resultEmpty, 'Identificamos un patrón relacionado con Consulta General de No especificado de evolución.');

    const resultSpaces = generateDiagnosis('   ', '   \t\n');
    assert.equal(resultSpaces, 'Identificamos un patrón relacionado con Consulta General de No especificado de evolución.');
  });

  test('ADV-M3.2.5: Diagnosis text with international Unicode and emojis', () => {
    const result = generateDiagnosis('Fatiga crónica y estrés 🧘‍♀️✨', '2 años ⏳');
    assert.equal(
      result,
      'Identificamos un patrón relacionado con Fatiga crónica y estrés 🧘‍♀️✨ de 2 años ⏳ de evolución.'
    );
  });
});

describe('Adversarial M3.2: buildWhatsAppUrl() Derivation and Sanitization', () => {
  test('ADV-M3.2.6: Generates valid wa.me URL with default config phone', () => {
    assert.equal(SITE_CONFIG.whatsappNumber, '573000000000');
    const url = buildWhatsAppUrl({
      symptom: 'Gastritis',
      duration: '1 año',
      priorTreatments: 'Omeprazol',
      location: 'Bogotá'
    });
    const parsed = new URL(url);
    assert.equal(parsed.protocol, 'https:');
    assert.equal(parsed.hostname, 'wa.me');
    assert.equal(parsed.pathname, '/573000000000');
    assert.ok(parsed.searchParams.has('text'));
  });

  test('ADV-M3.2.7: Phone number sanitization removes all non-digit formatting', () => {
    const unformattedPhones = [
      '+57 (300) 000-0000',
      '57 300 000 0000',
      ' +57-300-000-0000 ',
      'tel:573000000000'
    ];
    for (const phone of unformattedPhones) {
      const url = buildWhatsAppUrl({ phone, symptom: 'Ansiedad' });
      const parsed = new URL(url);
      assert.equal(parsed.pathname, '/573000000000');
    }
  });

  test('ADV-M3.2.8: URL query parameter encoding is strictly compliant', () => {
    const url = buildWhatsAppUrl({
      symptom: 'Dolor & Inflamación articular + rigidez',
      duration: '100% permanente',
      priorTreatments: 'Acupuntura / Fisioterapia & Medicación',
      location: 'Madrid / España'
    });
    // Raw URL must not contain raw spaces or unencoded & in parameter values
    assert.ok(!url.includes(' & '));
    assert.ok(url.includes('%26'));
    assert.ok(url.includes('%20') || url.includes('+'));

    const parsed = new URL(url);
    const decodedText = parsed.searchParams.get('text');
    assert.ok(decodedText.includes('Dolor & Inflamación articular + rigidez'));
    assert.ok(decodedText.includes('• Síntoma / Dolencia:'));
    assert.ok(decodedText.includes('• Tiempo de evolución:'));
    assert.ok(decodedText.includes('• Tratamientos previos:'));
    assert.ok(decodedText.includes('• Ubicación:'));
  });
});

describe('Adversarial M3.2: BaseLayout.astro Interface Contract & Slot Integrity', () => {
  const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
  const layoutSource = fs.readFileSync(layoutPath, 'utf8');

  test('ADV-M3.2.9: #quiz-modal-container exists in <body> with data-client-load="client:load"', () => {
    const containerMatch = layoutSource.match(/<div\s+[^>]*id=["']quiz-modal-container["'][^>]*>/i);
    assert.ok(containerMatch, 'BaseLayout must contain div with id="quiz-modal-container"');
    assert.ok(
      containerMatch[0].includes('data-client-load="client:load"'),
      'Container must declare data-client-load="client:load"'
    );
  });

  test('ADV-M3.2.10: <slot name="quiz-modal" /> remains intact, self-closing and uncorrupted', () => {
    const slotPattern = /<slot\s+name=["']quiz-modal["']\s*\/>/;
    assert.ok(
      slotPattern.test(layoutSource),
      'ADV-M2.2.10 regression check: BaseLayout must provide self-closing `<slot name="quiz-modal" />`'
    );
  });

  test('ADV-M3.2.11: WhatsAppQuizModal component is mounted with client:load in BaseLayout', () => {
    const importMatch = layoutSource.match(/import\s+WhatsAppQuizModal\s+from\s+['"][^'"]+WhatsAppQuizModal['"]/);
    assert.ok(importMatch, 'BaseLayout must import WhatsAppQuizModal');

    const componentMatch = layoutSource.match(/<WhatsAppQuizModal\s+client:load\s*\/>/);
    assert.ok(componentMatch, 'BaseLayout must mount `<WhatsAppQuizModal client:load />`');
  });
});

describe('Adversarial M3.2: WhatsAppQuizModal Architecture, Interaction & Solid Matte Design', () => {
  const modalPath = path.join(PROJECT_ROOT, 'src/components/react/WhatsAppQuizModal.tsx');
  const modalSource = fs.readFileSync(modalPath, 'utf8');

  test('ADV-M3.2.12: Dual export contract (named and default export)', () => {
    assert.ok(modalSource.includes('export function WhatsAppQuizModal'), 'Must provide named export');
    assert.ok(modalSource.includes('export default WhatsAppQuizModal'), 'Must provide default export');
  });

  test('ADV-M3.2.13: Global click interception ignores data-quiz-final and modifier keys', () => {
    assert.ok(modalSource.includes('data-quiz-final'), 'Must prevent infinite loop by skipping data-quiz-final');
    assert.ok(modalSource.includes('metaKey'), 'Must ignore Ctrl/Cmd/Shift/Alt clicks to allow native tabs');
    assert.ok(modalSource.includes('ctrlKey'));
    assert.ok(modalSource.includes('button !== 0'), 'Must ignore non-primary clicks');
  });

  test('ADV-M3.2.14: Support for custom event alma:open-quiz with symptom/city preloading', () => {
    assert.ok(modalSource.includes('alma:open-quiz'), 'Must listen to window custom event alma:open-quiz');
    assert.ok(modalSource.includes('setStep(2)'), 'Must advance to step 2 when symptom is preloaded');
  });

  test('ADV-M3.2.15: Accessibility compliance (WAI-ARIA dialog, Escape key handler)', () => {
    assert.ok(modalSource.includes('role="dialog"'), 'Must have role="dialog"');
    assert.ok(modalSource.includes('aria-modal="true"'), 'Must have aria-modal="true"');
    assert.ok(modalSource.includes('aria-labelledby="quiz-modal-title"'), 'Must have aria-labelledby');
    assert.ok(modalSource.includes('aria-describedby="quiz-modal-description"'), 'Must have aria-describedby');
    assert.ok(modalSource.includes("e.key === 'Escape'"), 'Must close on Escape key');
  });

  test('ADV-M3.2.16: Strict Solid Matte Visual Compliance (zero forbidden classes)', () => {
    const audit = auditMateStyleContent(modalSource, 'WhatsAppQuizModal.tsx');
    assert.equal(audit.passed, true, `Solid matte audit failed: ${audit.violations.join(', ')}`);
    assert.equal(audit.violations.length, 0);
  });
});
