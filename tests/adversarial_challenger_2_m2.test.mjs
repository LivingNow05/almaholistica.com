/**
 * EMPIRICAL CHALLENGER 2 INDEPENDENT ADVERSARIAL SUITE — M2 VERIFICATION
 * Target: Alma Holística (R1 - R5)
 * Runner: node --test tests/adversarial_challenger_2_m2.test.mjs
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');
const STYLES_FILE = path.join(ROOT_DIR, 'src', 'styles', 'global.css');
const TAILWIND_FILE = path.join(ROOT_DIR, 'tailwind.config.mjs');
const MODAL_FILE = path.join(ROOT_DIR, 'src', 'components', 'react', 'WhatsAppQuizModal.tsx');
const STICKY_FILE = path.join(ROOT_DIR, 'src', 'components', 'StickyMobileBar.astro');
const FLOATING_FILE = path.join(ROOT_DIR, 'src', 'components', 'FloatingWhatsApp.astro');
const BASE_LAYOUT_FILE = path.join(ROOT_DIR, 'src', 'layouts', 'BaseLayout.astro');

const cities = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'dataset_almaholistica_ciudades_eeat_geo.json'), 'utf8'));
const dolencias = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'dataset_biodescodificacion_dolencias.json'), 'utf8'));

// Mathematical WCAG Relative Luminance & Contrast Functions
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function sRgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  return 0.2126 * sRgbToLinear(rgb.r) + 0.7152 * sRgbToLinear(rgb.g) + 0.0722 * sRgbToLinear(rgb.b);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

describe('CHALLENGER 2: 1. Empirical Verification of 361 JSON-LD Schemas', () => {
  let totalSchemas = 0;

  test('113 Cities in dist/ contain exactly 2 valid JSON-LD schemas each (226 schemas total)', () => {
    assert.strictEqual(cities.length, 113, 'Expected exactly 113 cities in dataset');

    for (const city of cities) {
      const slug = city['URL Final (Slug)'].trim().toLowerCase();
      const filePath = path.join(DIST_DIR, `biodescodificacion-${slug}`, 'index.html');
      assert.ok(fs.existsSync(filePath), `HTML file for city ${slug} must exist`);

      const html = fs.readFileSync(filePath, 'utf8');
      const scriptMatches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

      assert.strictEqual(scriptMatches.length, 2, `City ${slug} must have exactly 2 JSON-LD schemas, found ${scriptMatches.length}`);

      const types = new Set();
      for (const sm of scriptMatches) {
        totalSchemas++;
        const content = sm[1];
        assert.ok(!content.includes('undefined'), `Schema in ${slug} contains undefined`);
        assert.ok(!content.includes('NaN'), `Schema in ${slug} contains NaN`);
        assert.ok(!content.includes('[object Object]'), `Schema in ${slug} contains [object Object]`);

        const parsed = JSON.parse(content);
        assert.ok(parsed['@context'], `Missing @context in ${slug}`);
        assert.ok(parsed['@type'], `Missing @type in ${slug}`);
        types.add(parsed['@type']);

        if (parsed['@type'] === 'HealthAndBeautyBusiness') {
          assert.ok(parsed.name && parsed.name.trim().length > 0, `City ${slug} missing name`);
          assert.ok(parsed.address, `City ${slug} missing address`);
          assert.ok(parsed.areaServed, `City ${slug} missing areaServed`);
        } else if (parsed['@type'] === 'BreadcrumbList') {
          assert.ok(Array.isArray(parsed.itemListElement) && parsed.itemListElement.length >= 2, `City ${slug} invalid breadcrumbs`);
        }
      }

      assert.ok(types.has('HealthAndBeautyBusiness'), `City ${slug} missing HealthAndBeautyBusiness`);
      assert.ok(types.has('BreadcrumbList'), `City ${slug} missing BreadcrumbList`);
    }
  });

  test('45 Dolencias in dist/ contain exactly 3 valid JSON-LD schemas each (135 schemas total)', () => {
    assert.strictEqual(dolencias.length, 45, 'Expected exactly 45 dolencias in dataset');

    for (const dol of dolencias) {
      const filePath = path.join(DIST_DIR, 'biodescodificacion', dol.slug, 'index.html');
      assert.ok(fs.existsSync(filePath), `HTML file for dolencia ${dol.slug} must exist`);

      const html = fs.readFileSync(filePath, 'utf8');
      const scriptMatches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

      assert.strictEqual(scriptMatches.length, 3, `Dolencia ${dol.slug} must have exactly 3 JSON-LD schemas, found ${scriptMatches.length}`);

      const types = new Set();
      for (const sm of scriptMatches) {
        totalSchemas++;
        const content = sm[1];
        assert.ok(!content.includes('undefined'), `Schema in ${dol.slug} contains undefined`);
        assert.ok(!content.includes('NaN'), `Schema in ${dol.slug} contains NaN`);
        assert.ok(!content.includes('[object Object]'), `Schema in ${dol.slug} contains [object Object]`);

        const parsed = JSON.parse(content);
        assert.ok(parsed['@context'], `Missing @context in ${dol.slug}`);
        assert.ok(parsed['@type'], `Missing @type in ${dol.slug}`);
        types.add(parsed['@type']);

        if (parsed['@type'] === 'MedicalWebPage') {
          assert.ok(parsed.name && parsed.name.trim().length > 0, `Dolencia ${dol.slug} missing name`);
        } else if (parsed['@type'] === 'FAQPage') {
          assert.ok(Array.isArray(parsed.mainEntity) && parsed.mainEntity.length >= 2, `Dolencia ${dol.slug} invalid FAQs`);
        } else if (parsed['@type'] === 'BreadcrumbList') {
          assert.ok(Array.isArray(parsed.itemListElement) && parsed.itemListElement.length >= 2, `Dolencia ${dol.slug} invalid breadcrumbs`);
        }
      }

      assert.ok(types.has('MedicalWebPage'), `Dolencia ${dol.slug} missing MedicalWebPage`);
      assert.ok(types.has('FAQPage'), `Dolencia ${dol.slug} missing FAQPage`);
      assert.ok(types.has('BreadcrumbList'), `Dolencia ${dol.slug} missing BreadcrumbList`);
    }
  });

  test('Cumulative sum of verified structured schemas is strictly 361', () => {
    assert.strictEqual(totalSchemas, 361, `Expected exactly 361 schemas across the site, got ${totalSchemas}`);
  });
});

describe('CHALLENGER 2: 2. Mathematical WCAG AAA Contrast Ratio Validation', () => {
  test('Dark Mode text-muted (#94A3B8 on #060A1A) exceeds WCAG AAA 7.0:1', () => {
    const cr = contrastRatio('#94A3B8', '#060A1A');
    assert.ok(cr >= 7.0, `Contrast ratio ${cr.toFixed(2)}:1 must be >= 7.0:1 (AAA)`);
  });

  test('Dark Mode placeholder (#94A3B8 on input bg #0A1226) exceeds WCAG AAA 7.0:1', () => {
    const cr = contrastRatio('#94A3B8', '#0A1226');
    assert.ok(cr >= 7.0, `Contrast ratio ${cr.toFixed(2)}:1 must be >= 7.0:1 (AAA)`);
  });

  test('Light Mode primary text (#0F172A on #FFFFFF) exceeds WCAG AAA 7.0:1', () => {
    const cr = contrastRatio('#0F172A', '#FFFFFF');
    assert.ok(cr >= 7.0, `Contrast ratio ${cr.toFixed(2)}:1 must be >= 7.0:1 (AAA)`);
  });

  test('Light Mode body text (#334155 on #FFFFFF) exceeds WCAG AAA 7.0:1', () => {
    const cr = contrastRatio('#334155', '#FFFFFF');
    assert.ok(cr >= 7.0, `Contrast ratio ${cr.toFixed(2)}:1 must be >= 7.0:1 (AAA)`);
  });

  test('Light Mode placeholder (#475569 on #FFFFFF) exceeds WCAG AAA 7.0:1', () => {
    const cr = contrastRatio('#475569', '#FFFFFF');
    assert.ok(cr >= 7.0, `Contrast ratio ${cr.toFixed(2)}:1 must be >= 7.0:1 (AAA)`);
  });

  test('Button Pill (#060A1A on #FFFFFF) exceeds WCAG AAA 7.0:1', () => {
    const cr = contrastRatio('#060A1A', '#FFFFFF');
    assert.ok(cr >= 7.0, `Contrast ratio ${cr.toFixed(2)}:1 must be >= 7.0:1 (AAA)`);
  });
});

describe('CHALLENGER 2: 3. Typography & CSS Rules Sanitation', () => {
  test('global.css does not force sans-serif on font-serif or font-mono with !important', () => {
    const css = fs.readFileSync(STYLES_FILE, 'utf8');
    assert.ok(!css.includes('.font-mono,\n  .font-serif {\n    font-family: var(--font-sans) !important;'), 'global.css must not override font-serif to font-sans');
    assert.ok(!css.includes('.font-mono, .font-serif { font-family: var(--font-sans) !important; }'), 'global.css must not override font-serif to font-sans');
  });

  test('tailwind.config.mjs configures authentic serif fonts', () => {
    const tw = fs.readFileSync(TAILWIND_FILE, 'utf8');
    assert.ok(tw.includes('"Cormorant Garamond"'), 'tailwind.config.mjs must contain Cormorant Garamond');
    assert.ok(!tw.match(/serif:\s*\[\s*'"Plus Jakarta Sans"'/), 'serif must not map to Plus Jakarta Sans');
  });
});

describe('CHALLENGER 2: 4. Mobile Hero & Semantic Compaction (R1 & R2)', () => {
  test('No premature pricing card in Hero across all 113 city pages', () => {
    for (const city of cities) {
      const slug = city['URL Final (Slug)'].trim().toLowerCase();
      const filePath = path.join(DIST_DIR, `biodescodificacion-${slug}`, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const heroMatch = html.match(/<section\b[^>]*>([\s\S]*?)<\/section>/i);
      assert.ok(heroMatch, `Hero section missing in ${slug}`);
      const heroContent = heroMatch[1];
      assert.ok(!heroContent.includes('Rango por Sesión'), `Hero in ${slug} must not contain premature price card`);
    }
  });

  test('Zero occurrences of "SÍNTESIS RAG & GEO" in all dist/ HTML files', () => {
    for (const city of cities) {
      const slug = city['URL Final (Slug)'].trim().toLowerCase();
      const filePath = path.join(DIST_DIR, `biodescodificacion-${slug}`, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      assert.ok(!html.includes('SÍNTESIS RAG & GEO'), `Found SÍNTESIS RAG & GEO in ${slug}`);
      assert.ok(!html.includes('SINTESIS RAG & GEO'), `Found SINTESIS RAG & GEO in ${slug}`);
      assert.ok(html.includes('ATENCIÓN CLÍNICA Y METODOLOGÍA EN') || html.includes('Atención Clínica y Metodología'), `Missing human clinical heading in ${slug}`);
    }
  });

  test('All 113 city pages contain symptom selector micro-chips and semantic details accordions', () => {
    for (const city of cities) {
      const slug = city['URL Final (Slug)'].trim().toLowerCase();
      const filePath = path.join(DIST_DIR, `biodescodificacion-${slug}`, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');

      assert.ok(html.includes('data-open-quiz="true"'), `Missing quiz trigger in ${slug}`);
      assert.ok(html.includes('data-symptom="Ansiedad"'), `Missing Ansiedad micro-chip in ${slug}`);
      assert.ok(html.includes('data-symptom="Gastritis"'), `Missing Gastritis micro-chip in ${slug}`);

      const detailsMatches = [...html.matchAll(/<details\b/gi)];
      assert.ok(detailsMatches.length >= 3, `Expected at least 3 <details> accordions in ${slug}, found ${detailsMatches.length}`);
    }
  });
});

describe('CHALLENGER 2: 5. WhatsAppQuizModal & Sticky Mobile Bar (R4)', () => {
  test('WhatsAppQuizModal has translucent backdrop with backdrop-blur-sm', () => {
    const code = fs.readFileSync(MODAL_FILE, 'utf8');
    assert.ok(code.includes('bg-slate-950/80'), 'Modal backdrop missing bg-slate-950/80');
    assert.ok(code.includes('backdrop-blur-sm'), 'Modal backdrop missing backdrop-blur-sm');
  });

  test('WhatsAppQuizModal card has max-h-[85dvh] and responsive grid', () => {
    const code = fs.readFileSync(MODAL_FILE, 'utf8');
    assert.ok(code.includes('max-h-[85dvh]'), 'Modal card missing max-h-[85dvh]');
    assert.ok(code.includes('overflow-y-auto'), 'Modal body missing internal scroll');
    assert.ok(code.includes('grid-cols-1 sm:grid-cols-2'), 'Step 1 grid missing responsive grid-cols-1 sm:grid-cols-2');
  });

  test('StickyMobileBar is fixed, mobile-only, and mounted in BaseLayout', () => {
    const stickyCode = fs.readFileSync(STICKY_FILE, 'utf8');
    assert.ok(stickyCode.includes('fixed bottom-0'), 'Sticky bar must be fixed at bottom');
    assert.ok(stickyCode.includes('md:hidden'), 'Sticky bar must be hidden on desktop (md:hidden)');
    assert.ok(stickyCode.includes('data-sticky-mobile-bar="true"'), 'Sticky bar missing data-sticky-mobile-bar');

    const floatingCode = fs.readFileSync(FLOATING_FILE, 'utf8');
    assert.ok(floatingCode.includes('hidden md:flex'), 'Floating WhatsApp button must be hidden on mobile (hidden md:flex)');

    const layoutCode = fs.readFileSync(BASE_LAYOUT_FILE, 'utf8');
    assert.ok(layoutCode.includes('<StickyMobileBar'), 'BaseLayout must mount StickyMobileBar');
    assert.ok(layoutCode.includes('pb-20 md:pb-0'), 'BaseLayout main tag must have pb-20 md:pb-0 padding compensation');
  });
});
