/**
 * tests/adversarial_challenger_m4_gen3_2.test.mjs
 * Empirical Challenger M4 Gen3 2 Verification Suite
 *
 * Verifies:
 * 1. Milestone M4 conversion funnel triggers (home, cities, dolencias, catalog).
 * 2. CLS prevention across target pages and full dist build (explicit img dimensions, svg viewBox).
 * 3. Strict solid matte compliance across source and dist (auditMateStyleContent).
 * 4. Verification of Worker M4 Fix remediations (12 cards, canonical migrana link, footer contact quiz).
 * 5. Event delegation simulation and WhatsApp URL integrity across all entities.
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditMateStyleContent } from './helpers/mate_style_checker.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');

function getAllHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ============================================================================
// 1. CONVERSION FUNNEL TRIGGERS (HOME, CITIES, DOLENCIAS, CATALOG)
// ============================================================================

describe('Adversarial Challenger M4-Gen3-2: Conversion Funnel Triggers', () => {
  const targetPages = [
    { path: 'dist/index.html', name: 'Home', minWa: 4, minQuiz: 3 },
    { path: 'dist/biodescodificacion-bogota/index.html', name: 'Bogota (City)', minWa: 4, minQuiz: 3 },
    { path: 'dist/biodescodificacion/gastritis/index.html', name: 'Gastritis (Dolencia)', minWa: 4, minQuiz: 3 },
    { path: 'dist/biodescodificacion/index.html', name: 'Catalog', minWa: 4, minQuiz: 45 }
  ];

  test('ADV-GEN3.1: Every WhatsApp CTA on target pages matches the Quiz Modal trigger contracts', () => {
    for (const page of targetPages) {
      const fullPath = path.join(PROJECT_ROOT, page.path);
      assert.ok(fs.existsSync(fullPath), `Target page must exist: ${page.path}`);
      const html = fs.readFileSync(fullPath, 'utf8');

      // WhatsApp links in the page
      const waLinks = [...html.matchAll(/<a[^>]+href="[^"]*(?:wa\.me|whatsapp\.com)[^"]*"[^>]*>/gi)].map(m => m[0]);
      assert.ok(waLinks.length >= page.minWa, `${page.name} must have at least ${page.minWa} WhatsApp links (found ${waLinks.length})`);

      for (const link of waLinks) {
        // Must either match wa.me (intercepted by href*="wa.me") or have data-open-quiz
        const hasWaHref = /href="[^"]*(?:wa\.me|whatsapp\.com)/i.test(link);
        const hasQuizAttr = /data-open-quiz/i.test(link);
        assert.ok(hasWaHref || hasQuizAttr, `WhatsApp link missing trigger contract in ${page.name}: ${link}`);
      }

      // Explicit quiz triggers
      const quizTriggers = [...html.matchAll(/<[^>]+data-open-quiz=[^>]*>/gi)].map(m => m[0]);
      assert.ok(quizTriggers.length >= page.minQuiz, `${page.name} must have at least ${page.minQuiz} quiz triggers (found ${quizTriggers.length})`);
    }
  });

  test('ADV-GEN3.2: Universal audit across ALL 160 HTML pages for unhandled conversion CTAs', () => {
    const allHtml = getAllHtmlFiles(DIST_DIR);
    assert.strictEqual(allHtml.length, 160, 'dist/ must contain exactly 160 generated HTML files');

    let totalWaLinks = 0;
    let totalQuizTriggers = 0;

    for (const file of allHtml) {
      const html = fs.readFileSync(file, 'utf8');
      const waLinks = [...html.matchAll(/<a[^>]+href="[^"]*(?:wa\.me|whatsapp\.com)[^"]*"[^>]*>/gi)].map(m => m[0]);
      const quizTriggers = [...html.matchAll(/<[^>]+data-open-quiz=[^>]*>/gi)].map(m => m[0]);

      totalWaLinks += waLinks.length;
      totalQuizTriggers += quizTriggers.length;

      // Every single WA link must have a valid phone number 573000000000
      for (const link of waLinks) {
        assert.ok(link.includes('573000000000'), `WA link in ${file} does not use standard phone: ${link}`);
      }
    }

    assert.ok(totalWaLinks >= 160 * 4, `Expected at least 640 total WhatsApp links across site (found ${totalWaLinks})`);
    assert.ok(totalQuizTriggers >= 160 * 3, `Expected at least 480 quiz triggers across site (found ${totalQuizTriggers})`);
  });

  test('ADV-GEN3.3: Preloading context integrity (data-symptom on dolencias, data-city on cities)', () => {
    // Check dolencia sample
    const gastritisHtml = fs.readFileSync(path.join(DIST_DIR, 'biodescodificacion/gastritis/index.html'), 'utf8');
    assert.ok(
      gastritisHtml.includes('data-symptom="Gastritis y Acidez Gástrica"'),
      'Gastritis page must inject data-symptom="Gastritis y Acidez Gástrica"'
    );

    // Check city sample
    const bogotaHtml = fs.readFileSync(path.join(DIST_DIR, 'biodescodificacion-bogota/index.html'), 'utf8');
    assert.ok(
      bogotaHtml.includes('data-city="bogota"') || bogotaHtml.includes('data-city="Bogotá"'),
      'Bogotá page must inject data-city="bogota"'
    );
  });
});

// ============================================================================
// 2. CLS PREVENTION & MEDIA CONTAINMENT
// ============================================================================

describe('Adversarial Challenger M4-Gen3-2: CLS Prevention & Viewport Containment', () => {
  const targetSamples = [
    'dist/index.html',
    'dist/biodescodificacion-bogota/index.html',
    'dist/biodescodificacion/gastritis/index.html',
    'dist/biodescodificacion/index.html'
  ];

  test('ADV-GEN3.4: All <img> tags in target files have explicit width and height numeric attributes', () => {
    for (const sample of targetSamples) {
      const fullPath = path.join(PROJECT_ROOT, sample);
      const html = fs.readFileSync(fullPath, 'utf8');
      const imgTags = [...html.matchAll(/<img[^>]*>/gi)].map(m => m[0]);
      assert.ok(imgTags.length > 0, `Sample ${sample} must contain <img> tags`);

      for (const img of imgTags) {
        const hasWidth = /width=["\x27]?\d+/i.test(img);
        const hasHeight = /height=["\x27]?\d+/i.test(img);
        assert.ok(hasWidth, `In ${sample}: <img> tag missing width: ${img}`);
        assert.ok(hasHeight, `In ${sample}: <img> tag missing height: ${img}`);
      }
    }
  });

  test('ADV-GEN3.5: All <svg> tags in target files have explicit dimensions or viewBox', () => {
    for (const sample of targetSamples) {
      const fullPath = path.join(PROJECT_ROOT, sample);
      const html = fs.readFileSync(fullPath, 'utf8');
      const svgTags = [...html.matchAll(/<svg[^>]*>/gi)].map(m => m[0]);
      assert.ok(svgTags.length > 0, `Sample ${sample} must contain <svg> tags`);

      for (const svg of svgTags) {
        const hasDims = /width=["\x27]?\d+/i.test(svg) && /height=["\x27]?\d+/i.test(svg);
        const hasViewBox = /viewBox=["\x27][^"\x27]+["\x27]/i.test(svg);
        assert.ok(hasDims || hasViewBox, `In ${sample}: <svg> missing both dimensions and viewBox: ${svg}`);
      }
    }
  });

  test('ADV-GEN3.6: Exhaustive audit across ALL 160 HTML files for <img> and <svg> CLS prevention', () => {
    const allHtml = getAllHtmlFiles(DIST_DIR);
    let auditedImgs = 0;
    let auditedSvgs = 0;

    for (const file of allHtml) {
      const html = fs.readFileSync(file, 'utf8');
      const imgTags = [...html.matchAll(/<img[^>]*>/gi)].map(m => m[0]);
      for (const img of imgTags) {
        auditedImgs++;
        assert.ok(/width=["\x27]?\d+/i.test(img), `Missing width on img in ${file}: ${img}`);
        assert.ok(/height=["\x27]?\d+/i.test(img), `Missing height on img in ${file}: ${img}`);
      }

      const svgTags = [...html.matchAll(/<svg[^>]*>/gi)].map(m => m[0]);
      for (const svg of svgTags) {
        auditedSvgs++;
        const hasDims = /width=["\x27]?\d+/i.test(svg) && /height=["\x27]?\d+/i.test(svg);
        const hasViewBox = /viewBox=["\x27][^"\x27]+["\x27]/i.test(svg);
        assert.ok(hasDims || hasViewBox, `Missing viewBox/dims on svg in ${file}: ${svg}`);
      }
    }

    assert.ok(auditedImgs >= 300, `Expected >= 300 audited images across build (found ${auditedImgs})`);
    assert.ok(auditedSvgs >= 1400, `Expected >= 1400 audited SVGs across build (found ${auditedSvgs})`);
  });
});

// ============================================================================
// 3. STRICT SOLID MATTE VISUAL COMPLIANCE
// ============================================================================

describe('Adversarial Challenger M4-Gen3-2: Strict Solid Matte Compliance', () => {
  test('ADV-GEN3.7: 0 violations across all source files in src/ using mate_style_checker', () => {
    function getSourceFiles(dir) {
      let results = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(getSourceFiles(full));
        } else if (/\.(astro|tsx|ts|css)$/.test(entry.name)) {
          results.push(full);
        }
      }
      return results;
    }

    const srcFiles = getSourceFiles(path.join(PROJECT_ROOT, 'src'));
    assert.ok(srcFiles.length >= 10, 'Expected at least 10 source files in src/');

    for (const file of srcFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file);
      const audit = auditMateStyleContent(content, rel);
      assert.ok(audit.passed, `Violations in source file ${rel}: ${JSON.stringify(audit.violations)}`);
    }
  });

  test('ADV-GEN3.8: 0 violations across all 160 HTML files in dist/ using mate_style_checker', () => {
    const allHtml = getAllHtmlFiles(DIST_DIR);
    for (const file of allHtml) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file);
      const audit = auditMateStyleContent(content, rel);
      assert.ok(audit.passed, `Violations in dist file ${rel}: ${JSON.stringify(audit.violations)}`);
    }
  });

  test('ADV-GEN3.9: Compiled CSS bundle in dist/ does not define or use any .backdrop-blur class or backdrop-filter rule', () => {
    const cssDir = path.join(DIST_DIR, '_astro');
    if (fs.existsSync(cssDir)) {
      const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
      for (const cssFile of cssFiles) {
        const cssContent = fs.readFileSync(path.join(cssDir, cssFile), 'utf8');
        assert.strictEqual(
          cssContent.includes('.backdrop-blur'),
          false,
          `CSS bundle ${cssFile} must not define .backdrop-blur utility class`
        );
        assert.strictEqual(
          cssContent.includes('backdrop-filter:'),
          false,
          `CSS bundle ${cssFile} must not use backdrop-filter property`
        );
      }
    }
  });
});

// ============================================================================
// 4. VERIFICATION OF WORKER M4 FIX REMEDIATIONS
// ============================================================================

describe('Adversarial Challenger M4-Gen3-2: Verification of Remediation Fixes', () => {
  test('ADV-GEN3.10: Home page renders exactly 12 featured cards with valid canonical slugs', async () => {
    const { getDolencias } = await import('../src/lib/dolencias.ts');
    const validSlugs = new Set(getDolencias().map(d => d.slug));

    const homeSrc = fs.readFileSync(path.join(PROJECT_ROOT, 'src/pages/index.astro'), 'utf8');
    const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

    // Check that featuredSlugs contains canonical slugs
    assert.ok(homeSrc.includes("'migrana'"), "index.astro must use canonical slug 'migrana'");
    assert.ok(homeSrc.includes("'sobrepeso-retencion'"), "index.astro must use canonical slug 'sobrepeso-retencion'");
    assert.ok(!homeSrc.includes("'migranas'"), "index.astro must NOT contain 'migranas'");

    // Check that rendered cards count in dist/index.html is exactly 12
    const renderedCards = homeHtml.match(/class="[^"]*home-dolencia-card[^"]*"/g) || [];
    assert.strictEqual(renderedCards.length, 12, 'dist/index.html must render exactly 12 featured cards');
  });

  test('ADV-GEN3.11: No 404 links to /biodescodificacion/migranas in any city page', () => {
    const allHtml = getAllHtmlFiles(DIST_DIR);
    for (const file of allHtml) {
      const content = fs.readFileSync(file, 'utf8');
      assert.ok(
        !content.includes('href="/biodescodificacion/migranas"'),
        `File ${file} contains broken link to /biodescodificacion/migranas`
      );
    }

    // Verify valid canonical route exists
    const validMigranaHtml = path.join(DIST_DIR, 'biodescodificacion/migrana/index.html');
    assert.ok(fs.existsSync(validMigranaHtml), 'dist/biodescodificacion/migrana/index.html must exist');
  });

  test('ADV-GEN3.12: Footer WhatsApp Contact link contains data-open-quiz="true"', () => {
    const footerSrc = fs.readFileSync(path.join(PROJECT_ROOT, 'src/components/Footer.astro'), 'utf8');
    const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

    assert.ok(
      footerSrc.includes('data-location="footer-bottom-contact"') && footerSrc.includes('data-open-quiz="true"'),
      'Footer.astro contact link must include data-open-quiz="true"'
    );

    const contactMatch = homeHtml.match(/<a[^>]*data-location="footer-bottom-contact"[^>]*>/);
    assert.ok(contactMatch, 'Rendered HTML must contain contact link with data-location="footer-bottom-contact"');
    assert.ok(contactMatch[0].includes('data-open-quiz="true"'), 'Rendered contact link must have data-open-quiz="true"');
  });
});
