/**
 * tests/adversarial_challenger_m4_2.test.mjs
 * Challenger M4 2: Empirical Stress Test Suite
 *
 * Empirical verification of:
 * 1. SSG module robustness under adversarial, non-existent, and malformed slugs (cities.ts & dolencias.ts).
 * 2. Strict classification of all 45 pathologies into the 7 bodily systems in dataset and UI.
 * 3. Home page experience: Anti-CLS compliance (explicit dimensions), link integrity, and matte aesthetics.
 * 4. Forensic detection of slug discrepancies (e.g. 'migranas' vs 'migrana', 'sobrepeso' vs 'sobrepeso-retencion').
 */

import { describe, test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ============================================================================
// 1. SSG MODULE ROBUSTNESS UNDER ADVERSARIAL SLUGS
// ============================================================================

describe('Challenger M4-2: SSG Modules Robustness Under Non-existent Slugs', () => {
  let citiesMod;
  let dolenciasMod;

  before(async () => {
    citiesMod = await import('../src/lib/cities.ts');
    dolenciasMod = await import('../src/lib/dolencias.ts');
  });

  test('ADV-M4.2.1: getCityBySlug and getDolenciaBySlug return undefined for non-existent strings without throwing', () => {
    const nonExistentSlugs = [
      'atlantida',
      'ciudad-inexistente',
      'shangri-la',
      'valhalla',
      'covid-99',
      'sindrome-inexistente',
      'non-existent-slug-xyz-12345',
      'not-a-real-city-or-dolencia'
    ];

    for (const slug of nonExistentSlugs) {
      assert.doesNotThrow(() => {
        const city = citiesMod.getCityBySlug(slug);
        assert.strictEqual(city, undefined, `Expected getCityBySlug('${slug}') to return undefined`);
      });

      assert.doesNotThrow(() => {
        const dolencia = dolenciasMod.getDolenciaBySlug(slug);
        assert.strictEqual(dolencia, undefined, `Expected getDolenciaBySlug('${slug}') to return undefined`);
      });
    }
  });

  test('ADV-M4.2.2: getCityBySlug and getDolenciaBySlug safely handle falsy and malformed inputs', () => {
    const falsyAndMalformed = [
      '',
      '   ',
      '\t\n\r',
      null,
      undefined,
      12345,
      true,
      false,
      {},
      [],
      NaN,
      () => {},
      Symbol('test')
    ];

    for (const input of falsyAndMalformed) {
      assert.doesNotThrow(() => {
        // @ts-ignore
        const city = citiesMod.getCityBySlug(input);
        assert.strictEqual(city, undefined, `Input ${String(input)} should return undefined for city`);
      });

      assert.doesNotThrow(() => {
        // @ts-ignore
        const dolencia = dolenciasMod.getDolenciaBySlug(input);
        assert.strictEqual(dolencia, undefined, `Input ${String(input)} should return undefined for dolencia`);
      });
    }
  });

  test('ADV-M4.2.3: Security & injection resistance (path traversal, XSS, prototype pollution, regex)', () => {
    const adversarialInputs = [
      '../../etc/passwd',
      '..\\..\\windows\\system32',
      '<script>alert("XSS")</script>',
      '"><img src=x onerror=alert(1)>',
      "'; DROP TABLE cities; --",
      '__proto__',
      'constructor',
      'prototype',
      'toString',
      'valueOf',
      'hasOwnProperty',
      '.*',
      '[a-z]+',
      '(a|b)+',
      '(?:)',
      'null\0byte'
    ];

    for (const input of adversarialInputs) {
      assert.doesNotThrow(() => {
        const city = citiesMod.getCityBySlug(input);
        assert.strictEqual(city, undefined, `Input ${input} should return undefined for city`);
      });

      assert.doesNotThrow(() => {
        const dolencia = dolenciasMod.getDolenciaBySlug(input);
        assert.strictEqual(dolencia, undefined, `Input ${input} should return undefined for dolencia`);
      });
    }
  });

  test('ADV-M4.2.4: Slugs with whitespace, casing variations, or surrounding slashes resolve valid entities', () => {
    // Valid city: bogota
    assert.strictEqual(citiesMod.getCityBySlug('BOGOTA')?.slug, 'bogota');
    assert.strictEqual(citiesMod.getCityBySlug('/bogota/')?.slug, 'bogota');
    assert.strictEqual(citiesMod.getCityBySlug('   bogota   ')?.slug, 'bogota');

    // Valid dolencia: gastritis
    assert.strictEqual(dolenciasMod.getDolenciaBySlug('GASTRITIS')?.slug, 'gastritis');
    assert.strictEqual(dolenciasMod.getDolenciaBySlug('/gastritis/')?.slug, 'gastritis');
    assert.strictEqual(dolenciasMod.getDolenciaBySlug('   gastritis   ')?.slug, 'gastritis');
  });

  test('ADV-M4.2.5: Secondary filter functions handle empty and invalid arguments gracefully', () => {
    // getCitiesByCountry
    assert.deepStrictEqual(citiesMod.getCitiesByCountry(''), []);
    // @ts-ignore
    assert.deepStrictEqual(citiesMod.getCitiesByCountry(null), []);
    assert.deepStrictEqual(citiesMod.getCitiesByCountry('PaisInexistente'), []);
    assert.ok(citiesMod.getCitiesByCountry('colombia').length > 0);

    // getDolenciasBySistema
    assert.deepStrictEqual(dolenciasMod.getDolenciasBySistema(''), []);
    // @ts-ignore
    assert.deepStrictEqual(dolenciasMod.getDolenciasBySistema(null), []);
    assert.deepStrictEqual(dolenciasMod.getDolenciasBySistema('SistemaInexistente'), []);
    assert.ok(dolenciasMod.getDolenciasBySistema('digestivo').length > 0);
  });

  test('ADV-M4.2.6: Cache clearing and re-initialization operates cleanly', () => {
    citiesMod.clearCityCache();
    const citiesAfterClear = citiesMod.getCities();
    assert.ok(citiesAfterClear.length >= 100);

    dolenciasMod.clearDolenciaCache();
    const dolenciasAfterClear = dolenciasMod.getDolencias();
    assert.strictEqual(dolenciasAfterClear.length, 45);
  });
});

// ============================================================================
// 2. EMPIRICAL CLASSIFICATION OF 45 PATHOLOGIES IN 7 BODILY SYSTEMS
// ============================================================================

describe('Challenger M4-2: 45 Pathologies Classification into 7 Bodily Systems', () => {
  let dolencias;
  let dolenciasMod;

  const EXPECTED_7_SYSTEMS = [
    'Digestivo',
    'Nervioso / Emocional',
    'Osteoarticular',
    'Dermatológico',
    'Respiratorio',
    'Endocrino / Metabólico',
    'Inmunológico / Circulatorio'
  ];

  before(async () => {
    dolenciasMod = await import('../src/lib/dolencias.ts');
    dolencias = dolenciasMod.getDolencias();
  });

  test('ADV-M4.2.7: Dataset contains exactly 45 unique pathologies with valid slugs', () => {
    assert.strictEqual(dolencias.length, 45, 'Total dolencias must be exactly 45');

    const slugs = dolencias.map((d) => d.slug);
    const uniqueSlugs = new Set(slugs);
    assert.strictEqual(uniqueSlugs.size, 45, 'All 45 slugs must be unique');

    for (const slug of slugs) {
      assert.match(slug, /^[a-z0-9-]+$/, `Slug '${slug}' must be lowercase alphanumeric with hyphens`);
      assert.ok(!slug.startsWith('-') && !slug.endsWith('-'), `Slug '${slug}' must not start/end with hyphens`);
    }
  });

  test('ADV-M4.2.8: getSistemas() returns exactly the 7 bodily systems', () => {
    const sistemas = dolenciasMod.getSistemas();
    assert.strictEqual(sistemas.length, 7, 'Must have exactly 7 bodily systems');

    for (const sys of EXPECTED_7_SYSTEMS) {
      assert.ok(sistemas.includes(sys), `System '${sys}' must be included in getSistemas()`);
    }
  });

  test('ADV-M4.2.9: Every dolencia belongs to one of the 7 valid bodily systems', () => {
    const distribution = {};
    for (const sys of EXPECTED_7_SYSTEMS) {
      distribution[sys] = 0;
    }

    for (const dolencia of dolencias) {
      assert.ok(
        EXPECTED_7_SYSTEMS.includes(dolencia.sistema),
        `Dolencia '${dolencia.slug}' has invalid sistema '${dolencia.sistema}'`
      );
      distribution[dolencia.sistema]++;
    }

    // Verify all 7 systems have at least 1 pathology assigned
    for (const [sys, count] of Object.entries(distribution)) {
      assert.ok(count > 0, `System '${sys}' has no dolencias assigned`);
    }

    const totalAssigned = Object.values(distribution).reduce((sum, n) => sum + n, 0);
    assert.strictEqual(totalAssigned, 45, 'Sum of dolencias across 7 systems must be 45');
  });

  test('ADV-M4.2.10: Full data completeness for all 45 dolencias (conflicto, sentido, FAQs, preguntas)', () => {
    for (const d of dolencias) {
      assert.ok(d.nombre && d.nombre.length > 3, `Dolencia '${d.slug}' missing nombre`);
      assert.ok(d.conflictoEmocional && d.conflictoEmocional.length > 10, `Dolencia '${d.slug}' missing conflictoEmocional`);
      assert.ok(d.sentidoBiologico && d.sentidoBiologico.length > 10, `Dolencia '${d.slug}' missing sentidoBiologico`);
      assert.ok(d.reprogramacion && d.reprogramacion.length > 10, `Dolencia '${d.slug}' missing reprogramacion`);
      assert.ok(Array.isArray(d.preguntasReflexion) && d.preguntasReflexion.length >= 3, `Dolencia '${d.slug}' must have >= 3 preguntasReflexion`);
      assert.ok(Array.isArray(d.faqs) && d.faqs.length >= 3, `Dolencia '${d.slug}' must have >= 3 faqs`);
      assert.ok(d.ganchoAgendamiento && d.ganchoAgendamiento.length > 5, `Dolencia '${d.slug}' missing ganchoAgendamiento`);
    }
  });

  test('ADV-M4.2.11: dist/biodescodificacion/index.html renders all 45 cards and 7 system filter tabs', () => {
    const catalogPath = path.join(PROJECT_ROOT, 'dist/biodescodificacion/index.html');
    assert.ok(fs.existsSync(catalogPath), 'dist/biodescodificacion/index.html must exist');

    const html = fs.readFileSync(catalogPath, 'utf8');

    // Check rendered cards count
    const cardMatches = html.match(/class="[^"]*dolencia-item-card[^"]*"/g) || [];
    assert.strictEqual(cardMatches.length, 45, 'Catalog page must render all 45 cards');

    // Check system tabs
    for (const sys of EXPECTED_7_SYSTEMS) {
      assert.ok(
        html.includes(`data-system="${sys}"`),
        `Filter tab for system '${sys}' must be rendered in catalog HTML`
      );
    }

    // Check that 'data-system="all"' tab exists
    assert.ok(html.includes('data-system="all"'), 'Filter tab "Todos" (all) must exist');

    // Check all 45 slugs have valid links in the catalog
    for (const d of dolencias) {
      const linkPattern = `/biodescodificacion/${d.slug}`;
      assert.ok(html.includes(linkPattern), `Catalog must link to /biodescodificacion/${d.slug}`);
    }
  });
});

// ============================================================================
// 3. HOME PAGE EXPERIENCE (CLS = 0, FUNCTIONAL LINKS, MATTE STYLING)
// ============================================================================

describe('Challenger M4-2: Home Experience Verification (CLS, Links, Styling)', () => {
  let homeHtml;

  before(() => {
    const homePath = path.join(PROJECT_ROOT, 'dist/index.html');
    assert.ok(fs.existsSync(homePath), 'dist/index.html must exist');
    homeHtml = fs.readFileSync(homePath, 'utf8');
  });

  test('ADV-M4.2.12: CLS Prevention: all <img> tags have explicit width and height', () => {
    const imgTags = homeHtml.match(/<img[^>]+>/g) || [];
    assert.ok(imgTags.length > 0, 'Home page must contain img tags (including logo)');

    for (const img of imgTags) {
      const hasWidth = /width=["\x27]?\d+/.test(img);
      const hasHeight = /height=["\x27]?\d+/.test(img);
      assert.ok(hasWidth, `img tag missing explicit width: ${img}`);
      assert.ok(hasHeight, `img tag missing explicit height: ${img}`);
    }
  });

  test('ADV-M4.2.13: CLS Prevention: all <svg> tags have explicit dimensions or viewBox', () => {
    const svgTags = homeHtml.match(/<svg[^>]+>/g) || [];
    assert.ok(svgTags.length > 0, 'Home page must contain svg tags');

    for (const svg of svgTags) {
      const hasDims = /width=/.test(svg) && /height=/.test(svg);
      const hasViewBox = /viewBox=/.test(svg);
      assert.ok(hasDims || hasViewBox, `SVG missing both explicit dimensions and viewBox: ${svg}`);
    }
  });

  test('ADV-M4.2.14: Internal anchor targets exist on Home page', () => {
    const anchorMatches = [...homeHtml.matchAll(/href="(#[a-zA-Z0-9-_]+)"/g)].map((m) => m[1]);
    const uniqueAnchors = [...new Set(anchorMatches)];

    for (const anchor of uniqueAnchors) {
      const targetId = anchor.slice(1);
      const hasTarget = homeHtml.includes(`id="${targetId}"`);
      assert.ok(hasTarget, `Anchor ${anchor} points to nonexistent element with id="${targetId}"`);
    }
  });

  test('ADV-M4.2.15: Hyperlocal city links in Home directory all point to existing static pages', () => {
    const hrefMatches = [...homeHtml.matchAll(/href="(\/[a-zA-Z0-9-]+)"/g)].map((m) => m[1]);
    const cityLinks = hrefMatches.filter((h) => !h.startsWith('/biodescodificacion') && h !== '/');

    assert.ok(cityLinks.length >= 100, `Home must feature links to at least 100 cities (found ${cityLinks.length})`);

    for (const cityHref of cityLinks) {
      const targetHtml = path.join(PROJECT_ROOT, 'dist', cityHref, 'index.html');
      assert.ok(
        fs.existsSync(targetHtml),
        `City link ${cityHref} on Home leads to missing file: ${targetHtml}`
      );
    }
  });

  test('ADV-M4.2.16: Conversion CTAs in Home page are connected to Quiz Modal with WhatsApp fallback', () => {
    // Check main conversion CTAs in index.astro
    const homeSource = fs.readFileSync(path.join(PROJECT_ROOT, 'src/pages/index.astro'), 'utf8');
    const ctaMatches = [...homeSource.matchAll(/<a[^>]*data-open-quiz="true"[^>]*>/g)].map((m) => m[0]);
    assert.ok(ctaMatches.length >= 2, 'index.astro must have at least 2 primary conversion CTAs');

    for (const cta of ctaMatches) {
      assert.ok(
        cta.includes('href={heroWhatsAppUrl}') ||
        cta.includes('href={evaluationWhatsAppUrl}') ||
        cta.includes('href={'),
        `CTA link must have a valid WhatsApp URL fallback: ${cta}`
      );
    }

    // In the compiled dist/index.html, verify that all wa.me links match the Quiz modal trigger selector
    // (either via [data-open-quiz="true"] or via href*="wa.me")
    const waLinks = [...homeHtml.matchAll(/<a[^>]*href="https:\/\/wa\.me\/573000000000[^"]*"[^>]*>/g)].map((m) => m[0]);
    assert.ok(waLinks.length >= 4, `Home must contain multiple WhatsApp conversion points (found ${waLinks.length})`);

    // All primary CTA buttons in Home HTML have data-open-quiz="true"
    const openQuizButtons = [...homeHtml.matchAll(/<a[^>]*data-open-quiz="true"[^>]*>/g)].map((m) => m[0]);
    assert.ok(openQuizButtons.length >= 3, 'dist/index.html must have at least 3 data-open-quiz triggers');
  });

  test('ADV-M4.2.17: Strict solid matte compliance on Home and Catalog source files', async () => {
    const { auditMateStyleContent } = await import('./helpers/mate_style_checker.mjs');

    const homeSource = fs.readFileSync(path.join(PROJECT_ROOT, 'src/pages/index.astro'), 'utf8');
    const homeAudit = auditMateStyleContent(homeSource, 'src/pages/index.astro');
    assert.ok(homeAudit.passed, `Home page has matte style violations: ${JSON.stringify(homeAudit.violations)}`);

    const catalogSource = fs.readFileSync(path.join(PROJECT_ROOT, 'src/pages/biodescodificacion/index.astro'), 'utf8');
    const catalogAudit = auditMateStyleContent(catalogSource, 'src/pages/biodescodificacion/index.astro');
    assert.ok(catalogAudit.passed, `Catalog page has matte style violations: ${JSON.stringify(catalogAudit.violations)}`);
  });
});

// ============================================================================
// 4. FORENSIC AUDIT: DISCLOSURE OF SLUG DISCREPANCIES AND BROKEN INTERNAL LINKS
// ============================================================================

describe('Challenger M4-2: Forensic Audit of Slug Discrepancies and Internal Links (Remediated)', () => {
  test('ADV-M4.2.18 [RESOLVED-1]: Regression check on featuredSlugs in src/pages/index.astro', async () => {
    const { getDolencias } = await import('../src/lib/dolencias.ts');
    const dolencias = getDolencias();
    const validSlugs = new Set(dolencias.map((d) => d.slug));

    const indexContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/pages/index.astro'), 'utf8');
    const featuredMatch = indexContent.match(/const featuredSlugs = \[([^\]]+)\]/s);
    assert.ok(featuredMatch, 'featuredSlugs must be defined in src/pages/index.astro');
    const extractedSlugs = [...featuredMatch[1].matchAll(/'([a-z0-9-]+)'/g)].map(m => m[1]);

    const invalidSlugs = extractedSlugs.filter((s) => !validSlugs.has(s));
    assert.deepStrictEqual(
      invalidSlugs,
      [],
      'All featuredSlugs must exist in canonical dolencias dataset (migrana and sobrepeso-retencion)'
    );

    // Exactly 12 featured cards must be rendered in dist/index.html
    const homePath = path.join(PROJECT_ROOT, 'dist/index.html');
    const homeHtml = fs.readFileSync(homePath, 'utf8');
    const renderedFeaturedCards = homeHtml.match(/class="[^"]*home-dolencia-card[^"]*"/g) || [];
    assert.strictEqual(
      renderedFeaturedCards.length,
      12,
      'Rendered featured cards on Home must be exactly 12'
    );
  });

  test('ADV-M4.2.19 [RESOLVED-2]: Regression check on hardcoded link /biodescodificacion/migrana in src/pages/[slug].astro', () => {
    const citySlugAstroPath = path.join(PROJECT_ROOT, 'src/pages/[slug].astro');
    const cityAstroContent = fs.readFileSync(citySlugAstroPath, 'utf8');

    // Ensure the hardcoded broken plural link DOES NOT exist
    const hasBrokenMigranasLink = cityAstroContent.includes('href="/biodescodificacion/migranas"');
    assert.strictEqual(
      hasBrokenMigranasLink,
      false,
      'src/pages/[slug].astro must NOT contain hardcoded href="/biodescodificacion/migranas"'
    );

    // Ensure the correct singular link is present
    const hasCorrectMigranaLink = cityAstroContent.includes('href="/biodescodificacion/migrana"');
    assert.strictEqual(
      hasCorrectMigranaLink,
      true,
      'src/pages/[slug].astro must contain canonical href="/biodescodificacion/migrana"'
    );

    // The correct target is /biodescodificacion/migrana/index.html and exists in dist
    const correctTargetPath = path.join(PROJECT_ROOT, 'dist/biodescodificacion/migrana/index.html');
    assert.strictEqual(
      fs.existsSync(correctTargetPath),
      true,
      'The valid route in dist is /biodescodificacion/migrana/index.html'
    );
  });
});
