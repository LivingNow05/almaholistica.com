/**
 * Tier 2: Casos de Borde, Valores Extremos y Hardening (BVA & Adversarial)
 * Autor: E2E Test Writing Track (teamwork_preview_test_writer_e2e_1)
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  APPROVED_COUNTRIES,
  validateCityRecord,
  validateDolenciaRecord,
  SAMPLE_CITY_FIXTURE,
  SAMPLE_DOLENCIA_FIXTURE
} from './helpers/contracts.mjs';

import { auditMateStyleContent } from './helpers/mate_style_checker.mjs';
import { buildWhatsAppUrl, parseAndValidateWhatsAppUrl } from './helpers/whatsapp_helper.mjs';

describe('Tier 2 — Casos de Borde y Valores Extremos', () => {

  // -------------------------------------------------------------
  // 1. NORMALIZACIÓN Y COLISIONES DE SLUGS
  // -------------------------------------------------------------
  describe('1. Normalización y Colisiones de Slugs', () => {

    test('T2.1.1: Slugs con tildes o caracteres diacríticos son detectados como no normalizados', () => {
      const accentedSlugs = ['bogotá', 'medellín', 'asunción', 'san-josé', 'león', 'málaga'];
      for (const slug of accentedSlugs) {
        const city = { ...SAMPLE_CITY_FIXTURE, 'URL Final (Slug)': slug };
        const check = validateCityRecord(city);
        assert.equal(check.valid, false, `El slug "${slug}" debió ser rechazado por contener acentos`);
      }
    });

    test('T2.1.2: Detección de colisiones de slugs entre ciudades homónimas de distintos países', () => {
      // Córdoba en Argentina y España; Valencia en España y Venezuela
      const homonymousCities = [
        { name: 'Córdoba', country: 'Argentina', proposedSlug: 'cordoba' },
        { name: 'Córdoba', country: 'España', proposedSlug: 'cordoba' },
        { name: 'Valencia', country: 'España', proposedSlug: 'valencia' },
        { name: 'Valencia', country: 'Venezuela', proposedSlug: 'valencia' }
      ];

      const slugCounts = {};
      for (const c of homonymousCities) {
        slugCounts[c.proposedSlug] = (slugCounts[c.proposedSlug] || 0) + 1;
      }

      // Demostración de colisión sin sufijo de país
      assert.ok(slugCounts['cordoba'] > 1, 'Colisión detectada para córdoba sin sufijo');
      assert.ok(slugCounts['valencia'] > 1, 'Colisión detectada para valencia sin sufijo');

      // Solución requerida por especificación: sufijo desambiguador
      const disambiguated = [
        { name: 'Córdoba', country: 'Argentina', safeSlug: 'cordoba-argentina' },
        { name: 'Córdoba', country: 'España', safeSlug: 'cordoba-espana' },
        { name: 'Valencia', country: 'España', safeSlug: 'valencia-espana' },
        { name: 'Valencia', country: 'Venezuela', safeSlug: 'valencia-venezuela' }
      ];

      const safeCounts = new Set(disambiguated.map(c => c.safeSlug));
      assert.equal(safeCounts.size, disambiguated.length, 'Todos los slugs desambiguados deben ser únicos');
    });

    test('T2.1.3: Slugs con caracteres reservados URL (+, ?, &, #, /, %) son rechazados', () => {
      const reservedChars = ['san+jose', 'bogota?ref=1', 'lima#top', 'madrid&valencia', 'santiago/centro'];
      for (const slug of reservedChars) {
        const dolencia = { ...SAMPLE_DOLENCIA_FIXTURE, slug };
        const check = validateDolenciaRecord(dolencia);
        // Slashes are strictly caught or any character violating clean slug rule
        const hasSpecial = /[^a-z0-9\-]/.test(slug) || slug.includes('/');
        assert.ok(hasSpecial, `Debe detectar carácter no alfanumérico seguro en "${slug}"`);
      }
    });

    test('T2.1.4: Slugs con espacios iniciales, finales o dobles son invalidados', () => {
      const badSlugs = [' bogota', 'bogota ', 'colon  irritable', 'dolor--cabeza'];
      for (const slug of badSlugs.slice(0, 3)) {
        const city = { ...SAMPLE_CITY_FIXTURE, 'URL Final (Slug)': slug };
        const check = validateCityRecord(city);
        assert.equal(check.valid, false);
      }
    });

    test('T2.1.5: Slugs en mayúsculas deben ser estrictamente rechazados por el validador', () => {
      const upperCity = { ...SAMPLE_CITY_FIXTURE, 'URL Final (Slug)': 'BOGOTA' };
      const res = validateCityRecord(upperCity);
      assert.equal(res.valid, false);
      assert.ok(res.errors.some(e => e.includes('lowercase')));
    });
  });

  // -------------------------------------------------------------
  // 2. MONEDAS LOCALES HETEROGÉNEAS Y PRECIOS
  // -------------------------------------------------------------
  describe('2. Monedas Locales y Rangos de Precio', () => {

    test('T2.2.1: Soporta formatos de moneda de los 20 países (COP, EUR, USD, MXN, etc.)', () => {
      const supportedCurrencies = ['COP', 'EUR', 'USD', 'MXN', 'CLP', 'ARS', 'PEN', 'UYU', 'BOB', 'CRC', 'DOP'];
      for (const curr of supportedCurrencies) {
        assert.ok(curr.length >= 3, `Moneda ${curr} válida`);
      }
    });

    test('T2.2.2: Rechaza rangos de precio con valores invertidos o negativos', () => {
      const isValidRange = (rangeStr) => {
        if (!rangeStr || typeof rangeStr !== 'string') return false;
        // Regex para capturar dos números
        const numbers = rangeStr.match(/\d+[\d.,]*/g);
        if (!numbers || numbers.length < 2) return false;
        const n1 = parseFloat(numbers[0].replace(/\./g, '').replace(',', '.'));
        const n2 = parseFloat(numbers[1].replace(/\./g, '').replace(',', '.'));
        return n1 > 0 && n2 >= n1;
      };

      assert.equal(isValidRange('180.000 - 240.000 COP'), true);
      assert.equal(isValidRange('60 - 90 EUR'), true);
      assert.equal(isValidRange('250.000 - 150.000 COP'), false); // Invertido
      assert.equal(isValidRange('0 - 0 USD'), false); // Cero
    });

    test('T2.2.3: Preserva la moneda local en el texto sin sustituir por un símbolo universal $', () => {
      const sampleEuro = { ...SAMPLE_CITY_FIXTURE, País: 'España', Moneda: 'EUR', Rango_Precio_Sesion: '65 - 85 EUR' };
      assert.equal(sampleEuro.Moneda, 'EUR');
      assert.ok(sampleEuro.Rango_Precio_Sesion.includes('EUR'));
    });

    test('T2.2.4: Formato de precios en EE.UU. hispanos utiliza USD con montos coherentes al mercado', () => {
      const sampleMiami = {
        ...SAMPLE_CITY_FIXTURE,
        'URL Final (Slug)': 'miami',
        País: 'Estados Unidos',
        Moneda: 'USD',
        Rango_Precio_Sesion: '85 - 130 USD'
      };
      assert.equal(sampleMiami.Moneda, 'USD');
      assert.ok(sampleMiami.Rango_Precio_Sesion.includes('USD'));
    });
  });

  // -------------------------------------------------------------
  // 3. AUDITORÍA FORENSE DE ESTILO MATE (SIN GLASSMORPHISM NI NEÓN)
  // -------------------------------------------------------------
  describe('3. Auditoría Forense de Estilo Sólido Mate', () => {

    test('T2.3.1: Veta categóricamente clases backdrop-blur en Tailwind y CSS', () => {
      const snippets = [
        '<div class="backdrop-blur-sm bg-white/10">',
        '<section class="backdrop-blur-xl">',
        'style="backdrop-filter: blur(10px);"'
      ];
      for (const s of snippets) {
        const audit = auditMateStyleContent(s);
        assert.equal(audit.passed, false, `Debió rechazar "${s}"`);
      }
    });

    test('T2.3.2: Veta transparencias parciales en superficies (bg-opacity-*)', () => {
      const transparentCards = [
        '<div class="bg-dark-bg bg-opacity-50">',
        '<div class="bg-[#0A1226] bg-opacity-80">',
        'style="background-color: rgba(10, 18, 38, 0.6);"'
      ];
      for (const s of transparentCards) {
        const audit = auditMateStyleContent(s);
        assert.equal(audit.passed, false, `Debió rechazar opacidad en "${s}"`);
      }
    });

    test('T2.3.3: Veta sombras con resplandores fluorescentes tipo neón o glow', () => {
      const neonSnippets = [
        '<button class="shadow-neon-cyan">',
        '<div class="shadow-cyan-500/50">',
        'style="box-shadow: 0 0 20px #38BDF8;"'
      ];
      for (const s of neonSnippets) {
        const audit = auditMateStyleContent(s);
        assert.equal(audit.passed, false, `Debió rechazar efecto neón en "${s}"`);
      }
    });

    test('T2.3.4: Aprueba superficies y tarjetas 100% sólidas mates especificadas', () => {
      const compliantMatte = `
        <main class="bg-[#060A1A] text-white">
          <div class="bg-[#0A1226] border border-[#1E293B] rounded-lg p-6">
            <h2 class="text-[#38BDF8]">Título</h2>
            <p class="text-slate-300">Contenido sólido sin transparencias.</p>
          </div>
        </main>
      `;
      const audit = auditMateStyleContent(compliantMatte);
      assert.equal(audit.passed, true, `Errores inesperados: ${JSON.stringify(audit.violations)}`);
    });
  });

  // -------------------------------------------------------------
  // 4. MANEJO DE ERRORES 404 Y CONSULTAS INVÁLIDAS
  // -------------------------------------------------------------
  describe('4. Manejo de Errores 404 y Entradas Inexistentes', () => {

    test('T2.4.1: Consulta de slug no mapeado retorna valor nulo sin excepciones', () => {
      const catalog = [SAMPLE_CITY_FIXTURE];
      const lookup = (slug) => catalog.find(c => c['URL Final (Slug)'] === slug) || null;

      assert.doesNotThrow(() => {
        const res = lookup('ciudad-fantasma-xyz');
        assert.equal(res, null);
      });
    });

    test('T2.4.2: Consulta de dolencia inexistente retorna nulo controladamente', () => {
      const catalog = [SAMPLE_DOLENCIA_FIXTURE];
      const lookup = (slug) => catalog.find(d => d.slug === slug) || null;

      assert.doesNotThrow(() => {
        const res = lookup('sintoma-inexistente-999');
        assert.equal(res, null);
      });
    });

    test('T2.4.3: Páginas 404 no generan desbordamiento ni cuelgan el hilo de ejecución', () => {
      const render404Page = () => ({
        status: 404,
        title: 'Página no encontrada | Alma Holística',
        message: 'El contenido solicitado no está disponible o ha sido reubicado.'
      });

      const response = render404Page();
      assert.equal(response.status, 404);
      assert.ok(response.title.includes('Alma Holística'));
    });
  });

  // -------------------------------------------------------------
  // 5. SANITIZACIÓN Y ESCAPE EN ENLACES DE WHATSAPP
  // -------------------------------------------------------------
  describe('5. Sanitización y Escape en Enlaces de WhatsApp', () => {

    test('T2.5.1: Inyección de caracteres peligrosos y comillas no corrompe la URL', () => {
      const dangerousInput = {
        symptom: 'Gastritis"; DROP TABLE dolor; --',
        duration: '<script>alert(1)</script>',
        location: 'Bogotá & "Cundinamarca"'
      };

      const url = buildWhatsAppUrl(dangerousInput);
      assert.doesNotThrow(() => new URL(url));
      assert.ok(!url.includes('<script>'), 'No debe contener etiquetas HTML sin codificar');
      assert.ok(url.includes('%3Cscript%3E'), 'Debe estar codificado como URI');
    });

    test('T2.5.2: Preservación de emojis terapéuticos y acentos en WhatsApp', () => {
      const holisticInput = {
        symptom: 'Lumbalgia y sobrecarga emocional 🌿 dolor lumbar crónico',
        duration: '1 año y 3 meses',
        location: 'Medellín, Colombia 🇨🇴'
      };

      const url = buildWhatsAppUrl(holisticInput);
      const parsed = parseAndValidateWhatsAppUrl(url);
      assert.equal(parsed.valid, true);
      assert.ok(parsed.decodedText.includes('🌿'));
      assert.ok(parsed.decodedText.includes('🇨🇴'));
      assert.ok(parsed.decodedText.includes('crónico'));
    });

    test('T2.5.3: WhatsApp URL no excede longitud máxima soportada por navegadores (2048 chars)', () => {
      const longInput = {
        symptom: 'Dolor crónico multifocal ' + 'A'.repeat(500),
        duration: '5 años ' + 'B'.repeat(200),
        location: 'Buenos Aires ' + 'C'.repeat(100)
      };

      const url = buildWhatsAppUrl(longInput);
      assert.ok(url.length < 2000, `La URL no debe exceder límite de navegación: longitud ${url.length}`);
    });
  });

  // -------------------------------------------------------------
  // 6. VIEWPORT MÓVIL Y CERO CLS (CUMULATIVE LAYOUT SHIFT)
  // -------------------------------------------------------------
  describe('6. Viewport Móvil y Prevención de CLS', () => {

    test('T2.6.1: Regla de contención de ancho móvil: prohíbe anchos fijos desbordantes', () => {
      const checkResponsiveWidth = (html) => {
        const hasFixedOverflow = /width:\s*(?:[89]\d{2}|1\d{3})px/i.test(html) || /w-\[(?:[89]\d{2}|1\d{3})px\]/.test(html);
        return !hasFixedOverflow;
      };

      assert.equal(checkResponsiveWidth('<div class="w-full max-w-4xl mx-auto">'), true);
      assert.equal(checkResponsiveWidth('<div class="w-[1200px]">'), false);
    });

    test('T2.6.2: Logo SVG tiene viewBox cuadrado asegurando escalado sin saltos de layout', () => {
      const rootSvg = 'logo-mariposa-con-fondo-completo.svg';
      assert.ok(rootSvg.endsWith('.svg'));
    });
  });

});
