/**
 * tests/adversarial_challenger_1_empirical.test.mjs
 * Verification Test Suite — Challenger 1 (Empirical Challenger)
 * Alma Holística (almaholistica.com)
 *
 * Verificación empírica adversarial de las 184 páginas HTML compiladas en dist/
 * para los requerimientos R1, R2 y R4.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const CITIES_JSON_PATH = path.resolve(process.cwd(), 'src/data/dataset_almaholistica_ciudades_eeat_geo.json');
const MODAL_PATH = path.resolve(process.cwd(), 'src/components/react/WhatsAppQuizModal.tsx');
const STICKY_BAR_PATH = path.resolve(process.cwd(), 'src/components/StickyMobileBar.astro');

/**
 * Función auxiliar para recolectar recursivamente todos los archivos HTML en un directorio.
 */
function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Escapar caracteres especiales para RegExp literal
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Decodificar entidades HTML comunes generadas por SSG
 */
function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

describe('Challenger 1: Verificación Empírica de Artefactos Compilados en dist/', () => {
  const allHtmlFiles = getAllHtmlFiles(DIST_DIR);
  const cities = JSON.parse(fs.readFileSync(CITIES_JSON_PATH, 'utf8'));

  test('T1.1: dist/ contiene al menos 184 páginas HTML estáticas generadas (incluyendo sobre-nosotros)', () => {
    assert.ok(
      allHtmlFiles.length >= 184,
      `Se esperaban al menos 184 archivos HTML en dist/, pero se encontraron ${allHtmlFiles.length}`
    );
  });

  test('T1.2: Las 113 páginas de ciudad existen físicamente en dist/', () => {
    assert.strictEqual(cities.length, 113, 'El dataset debe contener exactamente 113 ciudades');
    for (const city of cities) {
      const rawSlug = city['URL Final (Slug)'];
      const slug = rawSlug.startsWith('biodescodificacion-') ? rawSlug : `biodescodificacion-${rawSlug}`;
      const pagePath = path.join(DIST_DIR, slug, 'index.html');
      assert.ok(
        fs.existsSync(pagePath),
        `Falta el archivo HTML compilado para la ciudad ${city['Ciudad']} en ${pagePath}`
      );
    }
  });

  test('T2.1: Erradicación absoluta de "SÍNTESIS RAG & GEO" y "SÍNTESIS RAG" en las 184 páginas HTML', () => {
    const violations = [];
    const ragRegex = /s[íi]ntesis\s+rag/i;

    for (const htmlPath of allHtmlFiles) {
      const content = fs.readFileSync(htmlPath, 'utf8');
      if (content.includes('SÍNTESIS RAG & GEO') || content.includes('SÍNTESIS RAG') || ragRegex.test(content)) {
        violations.push(path.relative(process.cwd(), htmlPath));
      }
    }

    assert.strictEqual(
      violations.length,
      0,
      `Se detectó jerga de desarrollo "SÍNTESIS RAG" en ${violations.length} páginas: ${violations.slice(0, 5).join(', ')}`
    );
  });

  test('T2.2: Sustitución de jerga por "ATENCIÓN CLÍNICA Y METODOLOGÍA EN" en las 113 páginas de ciudad', () => {
    const missingReplacement = [];

    for (const city of cities) {
      const rawSlug = city['URL Final (Slug)'];
      const slug = rawSlug.startsWith('biodescodificacion-') ? rawSlug : `biodescodificacion-${rawSlug}`;
      const pagePath = path.join(DIST_DIR, slug, 'index.html');
      const content = fs.readFileSync(pagePath, 'utf8');

      const expectedHeader = `ATENCIÓN CLÍNICA Y METODOLOGÍA EN ${city['Ciudad'].toUpperCase()}`;
      if (!content.includes(expectedHeader)) {
        missingReplacement.push(`${city['Ciudad']} (${slug})`);
      }
    }

    assert.strictEqual(
      missingReplacement.length,
      0,
      `Falta la cabecera clínica humana en ${missingReplacement.length} ciudades: ${missingReplacement.slice(0, 5).join(', ')}`
    );
  });

  test('T3.1: En las 113 páginas de ciudad, el Hero móvil NO contiene precios monetarios antes de los micro-chips/CTA', () => {
    const prematurePriceViolations = [];
    // Monedas comunes y palabras clave de precios que no deben aparecer antes de los chips
    const currencyPattern = /\b(COP|EUR|USD|MXN|ARS|CLP|PEN|UYU|BOB|PYG|VES|CRC|GTQ|HNL|NIO|DOP|BRL)\b/i;
    const priceDigitsPattern = /\b\d{1,3}(?:\.\d{3})*\s*(?:COP|EUR|USD|MXN|ARS|CLP|PEN|UYU|BOB|PYG|VES|CRC|GTQ|HNL|NIO|DOP|BRL|\$|€)/i;

    for (const city of cities) {
      const rawSlug = city['URL Final (Slug)'];
      const slug = rawSlug.startsWith('biodescodificacion-') ? rawSlug : `biodescodificacion-${rawSlug}`;
      const pagePath = path.join(DIST_DIR, slug, 'index.html');
      const content = fs.readFileSync(pagePath, 'utf8');

      // Extraer la primera sección dentro de <main> (Hero)
      const mainHeroMatch = content.match(/<main[^>]*>[\s\S]*?<section[^>]*>([\s\S]*?)<\/section>/);
      assert.ok(mainHeroMatch, `No se pudo encontrar la sección Hero en ${slug}`);
      const heroHtml = mainHeroMatch[1];

      // Encontrar el inicio de los micro-chips de dolencias o del CTA
      const firstActionIndex = heroHtml.search(/data-open-quiz="true"/);
      assert.ok(firstActionIndex > 0, `No se encontraron botones de acción en el Hero de ${slug}`);

      const preActionHeroSnippet = heroHtml.slice(0, firstActionIndex);

      if (currencyPattern.test(preActionHeroSnippet) || priceDigitsPattern.test(preActionHeroSnippet)) {
        prematurePriceViolations.push(`${city['Ciudad']} (${slug})`);
      }
    }

    assert.strictEqual(
      prematurePriceViolations.length,
      0,
      `Se detectaron precios monetarios prematuros antes del CTA en el Hero de ${prematurePriceViolations.length} ciudades: ${prematurePriceViolations.join(', ')}`
    );
  });

  test('T3.2: En las 113 páginas de ciudad, el Hero incluye enlace sutil hacia #precios-heading', () => {
    const missingSubtleLink = [];

    for (const city of cities) {
      const rawSlug = city['URL Final (Slug)'];
      const slug = rawSlug.startsWith('biodescodificacion-') ? rawSlug : `biodescodificacion-${rawSlug}`;
      const pagePath = path.join(DIST_DIR, slug, 'index.html');
      const content = fs.readFileSync(pagePath, 'utf8');

      if (!content.includes('href="#precios-heading"')) {
        missingSubtleLink.push(slug);
      }
    }

    assert.strictEqual(
      missingSubtleLink.length,
      0,
      `Falta el enlace ancla a #precios-heading en ${missingSubtleLink.length} ciudades: ${missingSubtleLink.join(', ')}`
    );
  });

  test('T4.1: En las 113 páginas de ciudad, la sección #precios-heading CONSERVA la información de tarifas y moneda', () => {
    const missingPriceSection = [];
    const missingCurrencyOrRate = [];

    for (const city of cities) {
      const rawSlug = city['URL Final (Slug)'];
      const slug = rawSlug.startsWith('biodescodificacion-') ? rawSlug : `biodescodificacion-${rawSlug}`;
      const pagePath = path.join(DIST_DIR, slug, 'index.html');
      const content = fs.readFileSync(pagePath, 'utf8');

      if (!content.includes('id="precios-heading"')) {
        missingPriceSection.push(slug);
        continue;
      }

      const expectedCurrency = city['Moneda'];
      const expectedPrice = city['Rango_Precio_Sesion'];

      if (!content.includes(expectedCurrency)) {
        missingCurrencyOrRate.push(`${slug}: falta moneda ${expectedCurrency}`);
      }
      if (expectedPrice && !content.includes(expectedPrice)) {
        missingCurrencyOrRate.push(`${slug}: falta precio ${expectedPrice}`);
      }
    }

    assert.strictEqual(
      missingPriceSection.length,
      0,
      `Falta la sección #precios-heading en ${missingPriceSection.length} ciudades: ${missingPriceSection.join(', ')}`
    );
    assert.strictEqual(
      missingCurrencyOrRate.length,
      0,
      `Discrepancias de moneda o precio en #precios-heading: ${missingCurrencyOrRate.slice(0, 5).join(', ')}`
    );
  });

  test('T5.1: En las 113 páginas de ciudad existen micro-chips táctiles con data-open-quiz, data-symptom y data-city', () => {
    const expectedSymptoms = ['Ansiedad', 'Gastritis', 'Dolor Lumbar', 'Migrañas', 'Colon Irritable', 'Insomnio'];
    const invalidChips = [];

    for (const city of cities) {
      const rawSlug = city['URL Final (Slug)'];
      const slug = rawSlug.startsWith('biodescodificacion-') ? rawSlug : `biodescodificacion-${rawSlug}`;
      const pagePath = path.join(DIST_DIR, slug, 'index.html');
      const content = fs.readFileSync(pagePath, 'utf8');

      const cityName = city['Ciudad'];
      const escapedCityName = escapeRegExp(cityName);

      for (const symptom of expectedSymptoms) {
        // Verificar que exista un botón con data-open-quiz="true", data-symptom y data-city
        const chipRegex = new RegExp(
          `<button[^>]*data-open-quiz="true"[^>]*data-symptom="${symptom}"[^>]*data-city="${escapedCityName}"`,
          'i'
        );
        if (!chipRegex.test(content)) {
          invalidChips.push(`${slug}: falta chip "${symptom}" para ${cityName}`);
        }
      }
    }

    assert.strictEqual(
      invalidChips.length,
      0,
      `Fallas en micro-chips táctiles (${invalidChips.length} errores): ${invalidChips.slice(0, 5).join(', ')}`
    );
  });

  test('T6.1: En las 113 páginas de ciudad existen los 3 acordeones <details> semánticos y preservan 100% de texto', () => {
    const missingHistoriaDetails = [];
    const missingComparativaDetails = [];
    const missingBasesDetails = [];
    const missingHistoriaText = [];
    const missingBasesText = [];

    for (const city of cities) {
      const rawSlug = city['URL Final (Slug)'];
      const slug = rawSlug.startsWith('biodescodificacion-') ? rawSlug : `biodescodificacion-${rawSlug}`;
      const pagePath = path.join(DIST_DIR, slug, 'index.html');
      const content = fs.readFileSync(pagePath, 'utf8');
      const decodedContent = decodeHtmlEntities(content);

      // 1. Historia Local
      if (!content.includes('id="historia-local-heading"') || !content.includes('CONTEXTO URBANO Y SALUD EMOCIONAL')) {
        missingHistoriaDetails.push(slug);
      }
      const historiaText = city['Historia_Local'];
      if (historiaText && !decodedContent.includes(historiaText)) {
        missingHistoriaText.push(slug);
      }

      // 2. Comparativa Online vs Presencial
      if (!content.includes('id="comparativa-online-heading"') || !content.includes('Ver Comparativa Detallada: Consulta Online vs Consultorio Presencial')) {
        missingComparativaDetails.push(slug);
      }

      // 3. Bases Biológicas y Marco Científico
      if (!content.includes('MARCO CIENTÍFICO Y BASES BIOLÓGICAS') || !content.includes('Pilares Metodológicos de la Consulta')) {
        missingBasesDetails.push(slug);
      }
      const autoridadText = city['EEAT_Autoridad_Cientifica'];
      if (autoridadText && !decodedContent.includes(autoridadText)) {
        missingBasesText.push(slug);
      }
    }

    assert.strictEqual(
      missingHistoriaDetails.length,
      0,
      `Falta acordeón de Historia Local en: ${missingHistoriaDetails.join(', ')}`
    );
    assert.strictEqual(
      missingHistoriaText.length,
      0,
      `Texto de Historia Local no presente en DOM estático en: ${missingHistoriaText.join(', ')}`
    );
    assert.strictEqual(
      missingComparativaDetails.length,
      0,
      `Falta acordeón de Comparativa en: ${missingComparativaDetails.join(', ')}`
    );
    assert.strictEqual(
      missingBasesDetails.length,
      0,
      `Falta acordeón de Bases Biológicas en: ${missingBasesDetails.join(', ')}`
    );
    assert.strictEqual(
      missingBasesText.length,
      0,
      `Texto de Autoridad Científica no presente en DOM estático en: ${missingBasesText.join(', ')}`
    );
  });

  test('T7.1: WhatsAppQuizModal contiene "bg-slate-950/80 backdrop-blur-sm" en código fuente y bundle dist/', () => {
    const modalSrc = fs.readFileSync(MODAL_PATH, 'utf8');
    assert.ok(
      modalSrc.includes('bg-slate-950/80 backdrop-blur-sm'),
      'src/components/react/WhatsAppQuizModal.tsx debe contener "bg-slate-950/80 backdrop-blur-sm"'
    );

    // Verificar en dist/_astro/
    const astroDir = path.join(DIST_DIR, '_astro');
    assert.ok(fs.existsSync(astroDir), 'El directorio dist/_astro debe existir');
    const modalBundles = fs.readdirSync(astroDir).filter(f => f.startsWith('WhatsAppQuizModal') && f.endsWith('.js'));
    assert.ok(modalBundles.length > 0, 'Debe existir un bundle cliente compilado de WhatsAppQuizModal en dist/_astro/');

    let bundleHasBackdrop = false;
    for (const bundle of modalBundles) {
      const bundleContent = fs.readFileSync(path.join(astroDir, bundle), 'utf8');
      if (bundleContent.includes('bg-slate-950/80') && bundleContent.includes('backdrop-blur-sm')) {
        bundleHasBackdrop = true;
        break;
      }
    }
    assert.ok(
      bundleHasBackdrop,
      'El bundle compilado de WhatsAppQuizModal en dist/_astro/ debe incluir las clases bg-slate-950/80 y backdrop-blur-sm'
    );
  });

  test('T7.2: StickyMobileBar.astro existe con "md:hidden" y está presente en las páginas de producción de dist/', () => {
    const stickySrc = fs.readFileSync(STICKY_BAR_PATH, 'utf8');
    assert.ok(
      stickySrc.includes('md:hidden'),
      'src/components/StickyMobileBar.astro debe contener la clase responsiva "md:hidden"'
    );
    assert.ok(
      stickySrc.includes('data-sticky-mobile-bar="true"'),
      'src/components/StickyMobileBar.astro debe definir data-sticky-mobile-bar="true"'
    );

    // Verificar presencia en las páginas de producción gobernadas por BaseLayout (113 ciudades, 20 países, 45 dolencias, 1 catálogo, 1 home, 1 sobre-nosotros)
    const productionHtmlFiles = allHtmlFiles.filter(f => !f.includes('/propuestas/'));
    assert.ok(productionHtmlFiles.length >= 180, 'Deben existir al menos 180 páginas de producción usando BaseLayout');

    const missingStickyBar = [];
    for (const htmlPath of productionHtmlFiles) {
      const content = fs.readFileSync(htmlPath, 'utf8');
      if (!content.includes('data-sticky-mobile-bar="true"') || !content.includes('md:hidden')) {
        missingStickyBar.push(path.relative(process.cwd(), htmlPath));
      }
    }

    assert.strictEqual(
      missingStickyBar.length,
      0,
      `StickyMobileBar con md:hidden ausente en ${missingStickyBar.length} páginas de producción: ${missingStickyBar.join(', ')}`
    );
  });
});
