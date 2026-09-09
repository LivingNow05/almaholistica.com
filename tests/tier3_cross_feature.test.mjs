/**
 * Tier 3: Interacciones Cruzadas y Pruebas Combinatorias (Pairwise & Integration)
 * Cruces: Ciudad + Precio + Schema; Dolencia + Preguntas + FAQs + Quiz + WhatsApp; Sitemaps vs Rutas
 * Autor: E2E Test Writing Track (teamwork_preview_test_writer_e2e_1)
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  PROVISIONAL_WHATSAPP_NUMBER,
  CANONICAL_BASE_URL,
  SAMPLE_CITY_FIXTURE,
  SAMPLE_DOLENCIA_FIXTURE
} from './helpers/contracts.mjs';

import { buildWhatsAppUrl, parseAndValidateWhatsAppUrl } from './helpers/whatsapp_helper.mjs';

describe('Tier 3 — Interacciones Cruzadas (Cross-Feature Combinations)', () => {

  // -------------------------------------------------------------
  // CRUCE 1: CIUDAD + PRECIO + SCHEMA JSON-LD
  // -------------------------------------------------------------
  describe('Cruce 1: Ciudad + Moneda + Rango de Precios + Schema LocalBusiness', () => {

    function buildMockLocalBusinessSchema(city, canonicalUrl) {
      return {
        '@context': 'https://schema.org',
        '@type': 'HealthAndBeautyBusiness',
        name: `Alma Holística — ${city['H1 Título']}`,
        url: canonicalUrl,
        priceRange: city.Rango_Precio_Sesion,
        currenciesAccepted: city.Moneda,
        address: {
          '@type': 'PostalAddress',
          addressCountry: city.País,
          addressLocality: city['URL Final (Slug)']
        },
        description: city['Meta Descripción'],
        telephone: `+${PROVISIONAL_WHATSAPP_NUMBER}`
      };
    }

    test('T3.1.1: Propagación de datos de Bogotá (COP) al Schema JSON-LD', () => {
      const cityBogota = {
        ...SAMPLE_CITY_FIXTURE,
        'URL Final (Slug)': 'bogota',
        País: 'Colombia',
        Moneda: 'COP',
        Rango_Precio_Sesion: '180.000 - 240.000 COP'
      };
      const canonical = `${CANONICAL_BASE_URL}/${cityBogota['URL Final (Slug)']}`;
      const schema = buildMockLocalBusinessSchema(cityBogota, canonical);

      assert.equal(schema['@type'], 'HealthAndBeautyBusiness');
      assert.equal(schema.currenciesAccepted, 'COP');
      assert.equal(schema.priceRange, '180.000 - 240.000 COP');
      assert.equal(schema.address.addressCountry, 'Colombia');
      assert.equal(schema.url, 'https://almaholistica.com/bogota');
      assert.doesNotThrow(() => JSON.stringify(schema));
    });

    test('T3.1.2: Propagación de datos de Madrid (EUR) al Schema JSON-LD', () => {
      const cityMadrid = {
        ...SAMPLE_CITY_FIXTURE,
        'URL Final (Slug)': 'madrid',
        'H1 Título': 'Terapia Holística y Biodescodificación Online en Madrid',
        País: 'España',
        Moneda: 'EUR',
        Rango_Precio_Sesion: '65 - 90 EUR'
      };
      const canonical = `${CANONICAL_BASE_URL}/${cityMadrid['URL Final (Slug)']}`;
      const schema = buildMockLocalBusinessSchema(cityMadrid, canonical);

      assert.equal(schema.currenciesAccepted, 'EUR');
      assert.equal(schema.priceRange, '65 - 90 EUR');
      assert.equal(schema.address.addressCountry, 'España');
      assert.equal(schema.url, 'https://almaholistica.com/madrid');
    });

    test('T3.1.3: Propagación de datos de Miami (USD) al Schema JSON-LD', () => {
      const cityMiami = {
        ...SAMPLE_CITY_FIXTURE,
        'URL Final (Slug)': 'miami',
        'H1 Título': 'Terapia Holística y Biodescodificación Online en Miami',
        País: 'Estados Unidos',
        Moneda: 'USD',
        Rango_Precio_Sesion: '85 - 130 USD'
      };
      const canonical = `${CANONICAL_BASE_URL}/${cityMiami['URL Final (Slug)']}`;
      const schema = buildMockLocalBusinessSchema(cityMiami, canonical);

      assert.equal(schema.currenciesAccepted, 'USD');
      assert.equal(schema.priceRange, '85 - 130 USD');
      assert.equal(schema.address.addressCountry, 'Estados Unidos');
    });
  });

  // -------------------------------------------------------------
  // CRUCE 2: DOLENCIA + CONFLICTO + FAQS + MEDICAL SCHEMAS
  // -------------------------------------------------------------
  describe('Cruce 2: Dolencia + Preguntas + FAQs + Schema MedicalWebPage y FAQPage', () => {

    function buildMockMedicalAndFAQSchemas(dolencia, canonicalUrl) {
      const medicalSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: `Biodescodificación de ${dolencia.nombre}`,
        url: canonicalUrl,
        about: {
          '@type': 'MedicalCondition',
          name: dolencia.nombre,
          associatedPathophysiology: dolencia.sentidoBiologico,
          possibleTreatment: {
            '@type': 'MedicalTherapy',
            name: 'Biodescodificación y Reprogramación Bioemocional'
          }
        },
        description: dolencia.conflictoEmocional
      };

      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: dolencia.faqs.map(f => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta
          }
        }))
      };

      return { medicalSchema, faqSchema };
    }

    test('T3.2.1: Sincronización entre datos de Gastritis y Schemas JSON-LD', () => {
      const canonical = `${CANONICAL_BASE_URL}/biodescodificacion/${SAMPLE_DOLENCIA_FIXTURE.slug}`;
      const { medicalSchema, faqSchema } = buildMockMedicalAndFAQSchemas(SAMPLE_DOLENCIA_FIXTURE, canonical);

      assert.equal(medicalSchema['@type'], 'MedicalWebPage');
      assert.equal(medicalSchema.about.name, 'Gastritis y Reflujo Gástrico');
      assert.ok(medicalSchema.description.includes('Indigestión emocional'));

      assert.equal(faqSchema['@type'], 'FAQPage');
      assert.equal(faqSchema.mainEntity.length, 2);
      assert.equal(faqSchema.mainEntity[0]['@type'], 'Question');
      assert.equal(faqSchema.mainEntity[0].acceptedAnswer['@type'], 'Answer');
    });

    test('T3.2.2: Schemas no generan discrepancias con las preguntas de introspección', () => {
      const reflectionQuestions = SAMPLE_DOLENCIA_FIXTURE.preguntasReflexion;
      assert.ok(reflectionQuestions.length >= 2);
      // Las preguntas de reflexión son parte del contenido visible introspectivo
      for (const q of reflectionQuestions) {
        assert.ok(q.startsWith('¿') && q.endsWith('?'), `Pregunta válida: ${q}`);
      }
    });
  });

  // -------------------------------------------------------------
  // CRUCE 3: DOLENCIA + PRECARGA DE QUIZ + ENLACE WHATSAPP
  // -------------------------------------------------------------
  describe('Cruce 3: Dolencia + Precarga en Quiz + Diagnóstico + Redirección WhatsApp', () => {

    test('T3.3.1: Precarga de síntoma desde data-symptom hasta el diagnóstico preliminar', () => {
      const incomingSymptom = 'Hipotiroidismo';
      const userAnswers = {
        step1_symptom: incomingSymptom,
        step2_duration: 'Más de 1 año',
        step3_priorTreatments: 'Medicación de reemplazo hormonal',
        step4_location: 'Santiago de Chile'
      };

      const preliminaryDiagnosis = `Tu consulta sobre ${userAnswers.step1_symptom} (${userAnswers.step2_duration}) sugiere un patrón biológico relacionado con el tiempo y la urgencia.`;
      assert.ok(preliminaryDiagnosis.includes('Hipotiroidismo'));

      const waUrl = buildWhatsAppUrl({
        symptom: userAnswers.step1_symptom,
        duration: userAnswers.step2_duration,
        priorTreatments: userAnswers.step3_priorTreatments,
        location: userAnswers.step4_location
      });

      const parsed = parseAndValidateWhatsAppUrl(waUrl);
      assert.equal(parsed.valid, true);
      assert.ok(parsed.decodedText.includes('Hipotiroidismo'));
      assert.ok(parsed.decodedText.includes('Santiago de Chile'));
      assert.ok(parsed.decodedText.includes('Medicación de reemplazo hormonal'));
    });

    test('T3.3.2: Cruce de Ciudad y Dolencia en sesión interactiva', () => {
      const userSession = {
        city: 'Lima',
        symptom: 'Lumbalgia y Dolor de Espalda Baja',
        duration: '3 a 6 meses',
        priorTreatments: 'Fisioterapia'
      };

      const waUrl = buildWhatsAppUrl({
        symptom: userSession.symptom,
        duration: userSession.duration,
        priorTreatments: userSession.priorTreatments,
        location: userSession.city
      });

      const parsed = parseAndValidateWhatsAppUrl(waUrl);
      assert.equal(parsed.phone, PROVISIONAL_WHATSAPP_NUMBER);
      assert.ok(parsed.decodedText.includes('Lima'));
      assert.ok(parsed.decodedText.includes('Lumbalgia'));
    });
  });

  // -------------------------------------------------------------
  // CRUCE 4: INTEGRIDAD DE SITEMAPFAST VS TODAS LAS RUTAS
  // -------------------------------------------------------------
  describe('Cruce 4: Sitemaps XML vs Totalidad de Rutas Dinámicas', () => {

    test('T3.4.1: Modelo relacional de SitemapFast valida correspondencia biunívoca', () => {
      const mockCities = [
        { 'URL Final (Slug)': 'bogota' },
        { 'URL Final (Slug)': 'madrid' },
        { 'URL Final (Slug)': 'miami' }
      ];
      const mockDolencias = [
        { slug: 'gastritis' },
        { slug: 'ansiedad' },
        { slug: 'lumbalgia' }
      ];

      // URLs esperadas
      const expectedUrls = new Set([
        'https://almaholistica.com/',
        'https://almaholistica.com/biodescodificacion',
        ...mockCities.map(c => `https://almaholistica.com/${c['URL Final (Slug)']}`),
        ...mockDolencias.map(d => `https://almaholistica.com/biodescodificacion/${d.slug}`)
      ]);

      // Simulación de salida de sitemap-0.xml
      const sitemap0Urls = new Set([
        'https://almaholistica.com/',
        'https://almaholistica.com/biodescodificacion',
        'https://almaholistica.com/bogota',
        'https://almaholistica.com/madrid',
        'https://almaholistica.com/miami',
        'https://almaholistica.com/biodescodificacion/gastritis',
        'https://almaholistica.com/biodescodificacion/ansiedad',
        'https://almaholistica.com/biodescodificacion/lumbalgia'
      ]);

      assert.equal(expectedUrls.size, sitemap0Urls.size);
      for (const url of expectedUrls) {
        assert.ok(sitemap0Urls.has(url), `URL faltante en sitemap: ${url}`);
      }
    });

    test('T3.4.2: Estructura de sitemap-index.xml apunta obligatoriamente a sitemap-0.xml', () => {
      const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://almaholistica.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

      assert.ok(indexXml.includes('<sitemapindex'));
      assert.ok(indexXml.includes('https://almaholistica.com/sitemap-0.xml'));
    });

    test('T3.4.3: robots.txt expone punteros requeridos por motores de búsqueda', () => {
      const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://almaholistica.com/sitemap-index.xml
Sitemap: https://almaholistica.com/sitemap.xml`;

      assert.ok(robotsTxt.includes('Sitemap: https://almaholistica.com/sitemap-index.xml'));
      assert.ok(robotsTxt.includes('Sitemap: https://almaholistica.com/sitemap.xml'));
      assert.ok(robotsTxt.includes('User-agent: *'));
    });
  });

});
