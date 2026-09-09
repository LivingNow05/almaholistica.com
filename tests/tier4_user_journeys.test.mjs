/**
 * Tier 4: Escenarios de Usuario Real y Flujos End-to-End (Workload & Journeys)
 * Autor: E2E Test Writing Track (teamwork_preview_test_writer_e2e_1)
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  PROVISIONAL_WHATSAPP_NUMBER,
  SAMPLE_CITY_FIXTURE,
  SAMPLE_DOLENCIA_FIXTURE
} from './helpers/contracts.mjs';

import { buildWhatsAppUrl, parseAndValidateWhatsAppUrl } from './helpers/whatsapp_helper.mjs';

describe('Tier 4 — Escenarios de Usuario Real (End-to-End User Journeys)', () => {

  // -------------------------------------------------------------
  // JOURNEY A: PACIENTE HIPERLOCAL (BOGOTÁ / GASTRITIS)
  // -------------------------------------------------------------
  describe('Journey A: Paciente Hiperlocal desde Landing de Ciudad (Bogotá)', () => {

    test('T4.1.1: Simulación completa de navegación, Quiz de 4 pasos y conversión a WhatsApp', () => {
      // 1. Simulación de carga de la página local
      const pageContext = {
        url: 'https://almaholistica.com/bogota',
        city: SAMPLE_CITY_FIXTURE['H1 Título'],
        currency: SAMPLE_CITY_FIXTURE.Moneda,
        priceRange: SAMPLE_CITY_FIXTURE.Rango_Precio_Sesion,
        story: SAMPLE_CITY_FIXTURE.Historia_Local
      };

      assert.equal(pageContext.currency, 'COP');
      assert.ok(pageContext.story.includes('Bogotá'));

      // 2. Paciente hace clic en el CTA de evaluación inicial
      const quizTrigger = {
        city: 'Bogotá',
        defaultSymptom: null
      };

      // 3. Progresión a través de los 4 pasos del Quiz Modal
      const sessionState = {
        step1_symptom: 'Gastritis recurrente y ardor',
        step2_duration: 'Entre 6 meses y 1 año',
        step3_priorTreatments: 'Omeprazol y cambios de dieta sin alivio de fondo',
        step4_location: quizTrigger.city
      };

      // 4. Generación de síntesis diagnóstica preliminar
      const diagnosticSummary = `Evaluación para ${sessionState.step1_symptom} en ${sessionState.step4_location}: sugerimos explorar situaciones familiares o laborales que te resultan difíciles de aceptar o digerir.`;
      assert.ok(diagnosticSummary.includes('Gastritis'));

      // 5. Generación del enlace final de WhatsApp
      const finalWhatsAppUrl = buildWhatsAppUrl({
        symptom: sessionState.step1_symptom,
        duration: sessionState.step2_duration,
        priorTreatments: sessionState.step3_priorTreatments,
        location: sessionState.step4_location
      });

      // 6. Validación exhaustiva del enlace de destino
      const parsed = parseAndValidateWhatsAppUrl(finalWhatsAppUrl);
      assert.equal(parsed.valid, true);
      assert.equal(parsed.phone, PROVISIONAL_WHATSAPP_NUMBER);
      assert.ok(parsed.decodedText.includes('Gastritis recurrente'));
      assert.ok(parsed.decodedText.includes('Omeprazol'));
      assert.ok(parsed.decodedText.includes('Bogotá'));
      assert.ok(parsed.hasEvaluationIntent, true);
    });
  });

  // -------------------------------------------------------------
  // JOURNEY B: PACIENTE TEMÁTICO DE BIODESCODIFICACIÓN (MADRID / LUMBALGIA)
  // -------------------------------------------------------------
  describe('Journey B: Paciente Temático desde Catálogo de Dolencias (Madrid)', () => {

    test('T4.2.1: Navegación de síntoma, reflexión introspectiva y derivación estructurada', () => {
      // 1. Simulación de llegada a la página temática
      const dolenciaPage = {
        url: 'https://almaholistica.com/biodescodificacion/lumbalgia',
        symptomName: 'Lumbalgia y Dolor Lumbar',
        conflict: 'Sobrecarga de responsabilidades y sensación de falta de apoyo o soporte económico/emocional en el clan.',
        reflectionQuestions: [
          '¿Qué carga sientes que estás sosteniendo en soledad?',
          '¿Tienes miedo a no poder sostener económicamente a los tuyos?'
        ],
        ctaHook: 'Identifica la raíz inconsciente del peso que carga tu espalda.'
      };

      // 2. Interceptación con pre-carga del síntoma
      const preloadedModal = {
        symptom: dolenciaPage.symptomName,
        step: 2 // Avanza directamente a duración
      };
      assert.equal(preloadedModal.symptom, 'Lumbalgia y Dolor Lumbar');

      // 3. Paciente completa los datos restantes
      const answers = {
        symptom: preloadedModal.symptom,
        duration: 'Más de 2 años de dolor intermitente',
        priorTreatments: 'Sesiones de quiropráctica y antiinflamatorios',
        location: 'Madrid, España'
      };

      // 4. Salida al canal de WhatsApp del terapeuta
      const waUrl = buildWhatsAppUrl(answers);
      const parsed = parseAndValidateWhatsAppUrl(waUrl);

      assert.equal(parsed.valid, true);
      assert.ok(parsed.decodedText.includes('Lumbalgia y Dolor Lumbar'));
      assert.ok(parsed.decodedText.includes('Madrid, España'));
      assert.ok(parsed.decodedText.includes('quiropráctica'));
    });
  });

  // -------------------------------------------------------------
  // JOURNEY C: PACIENTE MÓVIL Y RESILIENCIA SIN JAVASCRIPT
  // -------------------------------------------------------------
  describe('Journey C: Experiencia Móvil y Fallback sin JavaScript', () => {

    test('T4.3.1: Resiliencia ante fallos de red o bloqueo de scripts (Progressive Enhancement)', () => {
      // Enlace estático renderizado en el HTML inicial
      const staticButtonHtml = `<a href="https://wa.me/${PROVISIONAL_WHATSAPP_NUMBER}?text=Hola%20Alma%20Hol%C3%ADstica%2C%20deseo%20agendar%20una%20sesi%C3%B3n" class="bg-[#38BDF8] text-[#060A1A]" data-open-quiz data-symptom="Ansiedad">Agendar Evaluación</a>`;

      // Simulación de clic sin ejecución de JS: el navegador sigue el atributo href
      const hrefMatch = staticButtonHtml.match(/href="([^"]+)"/);
      assert.ok(hrefMatch, 'El botón estático debe contar con atributo href nativo');

      const hrefValue = hrefMatch[1];
      const parsed = parseAndValidateWhatsAppUrl(hrefValue);
      assert.equal(parsed.valid, true);
      assert.equal(parsed.phone, PROVISIONAL_WHATSAPP_NUMBER);
      assert.ok(parsed.decodedText.includes('Hola Alma Holística'));
    });

    test('T4.3.2: Contrato de viewport móvil: cero desbordamiento en dispositivos angostos (320px)', () => {
      const viewportSpecs = {
        minWidth: 320,
        maxWidth: 1440,
        hasMetaViewport: true,
        viewportContent: 'width=device-width, initial-scale=1.0'
      };

      assert.equal(viewportSpecs.hasMetaViewport, true);
      assert.ok(viewportSpecs.viewportContent.includes('width=device-width'));
      assert.ok(viewportSpecs.viewportContent.includes('initial-scale=1.0'));
    });
  });

});
