/**
 * tests/adversarial_jsonld_robots_m5_2.test.mjs
 * Empirical Challenger M5-2 Verification Suite
 *
 * Exhaustively stress-tests:
 * 1. JSON-LD in all 160 production HTML files in dist/:
 *    - JSON.parse() clean execution (zero syntax errors)
 *    - @context === 'https://schema.org'
 *    - 113 City pages: HealthAndBeautyBusiness and BreadcrumbList (sequential positions 1,2,3)
 *    - 45 Dolencia pages: MedicalWebPage, FAQPage, and BreadcrumbList (sequential positions 1,2,3)
 *    - Total extracted scripts: 361
 * 2. robots.txt verification in both public/ and dist/:
 *    - User-agent: *
 *    - Allow: /
 *    - Sitemap pointers to https://almaholistica.com/sitemap-index.xml & https://almaholistica.com/sitemap.xml
 * 3. Exact bijection:
 *    - 160 sitemap URLs <-> 160 dist HTML files
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

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

const HTML_FILES = getAllHtmlFiles(DIST_DIR);

describe('Adversarial Challenger M5-2: JSON-LD Stress-Testing across 160 dist HTML files', () => {
  test('ADV-M5.2.1: Exactly 160 production HTML files exist in dist/', () => {
    assert.equal(
      HTML_FILES.length,
      160,
      `Expected exactly 160 HTML files in dist/, found ${HTML_FILES.length}`
    );
  });

  test('ADV-M5.2.2: Every <script type="application/ld+json"> parses cleanly and has @context https://schema.org', () => {
    const scriptRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let totalScripts = 0;

    for (const filePath of HTML_FILES) {
      const relPath = path.relative(DIST_DIR, filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = [...content.matchAll(scriptRegex)];

      for (const match of matches) {
        totalScripts++;
        const rawJson = match[1].trim();
        let parsed;
        try {
          parsed = JSON.parse(rawJson);
        } catch (err) {
          assert.fail(`JSON.parse failure in ${relPath}: ${err.message}`);
        }

        assert.ok(parsed, `Parsed JSON-LD is empty in ${relPath}`);
        assert.equal(
          parsed['@context'],
          'https://schema.org',
          `@context must be 'https://schema.org' in ${relPath}, got: ${parsed['@context']}`
        );
      }
    }

    // 113 city pages * 2 + 45 dolencia pages * 3 = 361 schemas
    assert.equal(
      totalScripts,
      361,
      `Expected exactly 361 JSON-LD scripts across all 160 files, found ${totalScripts}`
    );
  });

  test('ADV-M5.2.3: All 113 City pages contain HealthAndBeautyBusiness and BreadcrumbList', () => {
    const scriptRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const cityFiles = HTML_FILES.filter(f => {
      const rel = path.relative(DIST_DIR, f);
      return !rel.startsWith('biodescodificacion/') && rel !== 'index.html';
    });

    assert.equal(cityFiles.length, 113, `Expected 113 city pages, found ${cityFiles.length}`);

    for (const filePath of cityFiles) {
      const relPath = path.relative(DIST_DIR, filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = [...content.matchAll(scriptRegex)];
      const schemas = matches.map(m => JSON.parse(m[1].trim()));

      const businessSchema = schemas.find(s => s['@type'] === 'HealthAndBeautyBusiness');
      const breadcrumbSchema = schemas.find(s => s['@type'] === 'BreadcrumbList');

      assert.ok(businessSchema, `City page ${relPath} is missing HealthAndBeautyBusiness schema`);
      assert.ok(breadcrumbSchema, `City page ${relPath} is missing BreadcrumbList schema`);

      // HealthAndBeautyBusiness deep validation
      assert.ok(businessSchema.name, `Missing name in ${relPath}`);
      assert.ok(businessSchema.url.startsWith('https://almaholistica.com/'), `Invalid url in ${relPath}: ${businessSchema.url}`);
      assert.ok(businessSchema.url.endsWith('/'), `URL must have trailing slash in ${relPath}`);
      assert.ok(businessSchema.currenciesAccepted, `Missing currenciesAccepted in ${relPath}`);
      assert.ok(businessSchema.priceRange, `Missing priceRange in ${relPath}`);
      assert.equal(businessSchema.telephone, '+573151206985', `Telephone must match site config in ${relPath}`);
      assert.equal(businessSchema.address?.['@type'], 'PostalAddress', `Missing PostalAddress in ${relPath}`);
      assert.ok(businessSchema.address?.addressLocality, `Missing addressLocality in ${relPath}`);
      assert.ok(businessSchema.address?.addressCountry, `Missing addressCountry in ${relPath}`);

      // BreadcrumbList deep validation (3 items: Inicio, Ciudades, City)
      assert.equal(breadcrumbSchema.itemListElement?.length, 3, `City breadcrumb must have 3 items in ${relPath}`);
      breadcrumbSchema.itemListElement.forEach((item, idx) => {
        assert.equal(item['@type'], 'ListItem');
        assert.equal(item.position, idx + 1);
        assert.ok(item.name);
        assert.ok(item.item);
      });
      assert.equal(breadcrumbSchema.itemListElement[0].name, 'Inicio');
      assert.equal(breadcrumbSchema.itemListElement[0].item, 'https://almaholistica.com/');
      assert.equal(breadcrumbSchema.itemListElement[1].name, 'Ciudades');
      assert.equal(breadcrumbSchema.itemListElement[1].item, 'https://almaholistica.com/#ciudades');
    }
  });

  test('ADV-M5.2.4: All 45 Dolencia pages contain MedicalWebPage, FAQPage, and BreadcrumbList', () => {
    const scriptRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const dolenciaFiles = HTML_FILES.filter(f => {
      const rel = path.relative(DIST_DIR, f);
      return rel.startsWith('biodescodificacion/') && rel !== 'biodescodificacion/index.html';
    });

    assert.equal(dolenciaFiles.length, 45, `Expected 45 dolencia pages, found ${dolenciaFiles.length}`);

    for (const filePath of dolenciaFiles) {
      const relPath = path.relative(DIST_DIR, filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = [...content.matchAll(scriptRegex)];
      const schemas = matches.map(m => JSON.parse(m[1].trim()));

      const medicalSchema = schemas.find(s => s['@type'] === 'MedicalWebPage');
      const faqSchema = schemas.find(s => s['@type'] === 'FAQPage');
      const breadcrumbSchema = schemas.find(s => s['@type'] === 'BreadcrumbList');

      assert.ok(medicalSchema, `Dolencia page ${relPath} is missing MedicalWebPage schema`);
      assert.ok(faqSchema, `Dolencia page ${relPath} is missing FAQPage schema`);
      assert.ok(breadcrumbSchema, `Dolencia page ${relPath} is missing BreadcrumbList schema`);

      // MedicalWebPage deep validation
      assert.ok(medicalSchema.name, `Missing name in ${relPath}`);
      assert.ok(medicalSchema.url.startsWith('https://almaholistica.com/biodescodificacion/'), `Invalid url in ${relPath}`);
      assert.ok(medicalSchema.url.endsWith('/'), `URL must have trailing slash in ${relPath}`);
      assert.equal(medicalSchema.about?.['@type'], 'MedicalCondition', `about must be MedicalCondition in ${relPath}`);
      assert.ok(medicalSchema.about?.name, `Missing about.name in ${relPath}`);
      assert.ok(medicalSchema.about?.associatedPathophysiology, `Missing associatedPathophysiology in ${relPath}`);

      // FAQPage deep validation
      assert.ok(Array.isArray(faqSchema.mainEntity) && faqSchema.mainEntity.length > 0, `FAQPage must have questions in ${relPath}`);
      for (const q of faqSchema.mainEntity) {
        assert.equal(q['@type'], 'Question', `FAQ entity must be Question in ${relPath}`);
        assert.ok(q.name, `FAQ Question must have name in ${relPath}`);
        assert.equal(q.acceptedAnswer?.['@type'], 'Answer', `acceptedAnswer must be Answer in ${relPath}`);
        assert.ok(q.acceptedAnswer?.text, `acceptedAnswer must have text in ${relPath}`);
      }

      // BreadcrumbList deep validation (3 items: Inicio, Biodescodificación, Dolencia)
      assert.equal(breadcrumbSchema.itemListElement?.length, 3, `Dolencia breadcrumb must have 3 items in ${relPath}`);
      breadcrumbSchema.itemListElement.forEach((item, idx) => {
        assert.equal(item['@type'], 'ListItem');
        assert.equal(item.position, idx + 1);
        assert.ok(item.name);
        assert.ok(item.item);
      });
      assert.equal(breadcrumbSchema.itemListElement[0].name, 'Inicio');
      assert.equal(breadcrumbSchema.itemListElement[0].item, 'https://almaholistica.com/');
      assert.equal(breadcrumbSchema.itemListElement[1].name, 'Biodescodificación');
      assert.equal(breadcrumbSchema.itemListElement[1].item, 'https://almaholistica.com/biodescodificacion/');
    }
  });
});

describe('Adversarial Challenger M5-2: robots.txt and Sitemap Validation', () => {
  const robotsPaths = [
    { name: 'public/robots.txt', fullPath: path.join(PUBLIC_DIR, 'robots.txt') },
    { name: 'dist/robots.txt', fullPath: path.join(DIST_DIR, 'robots.txt') },
  ];

  for (const { name, fullPath } of robotsPaths) {
    test(`ADV-M5.2.5: ${name} contains correct user-agent rules and Sitemap declarations`, () => {
      assert.ok(fs.existsSync(fullPath), `${name} must exist`);
      const content = fs.readFileSync(fullPath, 'utf8');

      // User-agent rule
      assert.match(content, /User-agent:\s*\*/i, `${name} must specify User-agent: *`);
      assert.match(content, /Allow:\s*\//i, `${name} must specify Allow: /`);

      // Prohibit accidental Disallow: /
      assert.doesNotMatch(content, /Disallow:\s*\/\s*$/m, `${name} must not block all crawlers with Disallow: /`);

      // Sitemap directives
      assert.ok(
        content.includes('Sitemap: https://almaholistica.com/sitemap-index.xml'),
        `${name} must declare Sitemap: https://almaholistica.com/sitemap-index.xml`
      );
      assert.ok(
        content.includes('Sitemap: https://almaholistica.com/sitemap.xml'),
        `${name} must declare Sitemap: https://almaholistica.com/sitemap.xml`
      );
    });
  }

  test('ADV-M5.2.6: SitemapFast 1-to-1 bijection with all 160 HTML files in dist/', () => {
    const sitemap0Path = path.join(DIST_DIR, 'sitemap-0.xml');
    assert.ok(fs.existsSync(sitemap0Path), 'dist/sitemap-0.xml must exist');
    const xml = fs.readFileSync(sitemap0Path, 'utf8');

    const locMatches = [...xml.matchAll(/<loc>(https:\/\/almaholistica\.com\/[^<]*)<\/loc>/g)].map(m => m[1]);
    assert.equal(locMatches.length, 160, `sitemap-0.xml must contain exactly 160 URLs, got ${locMatches.length}`);

    // Check that every URL has a trailing slash
    for (const url of locMatches) {
      assert.ok(url.endsWith('/'), `URL in sitemap must end with trailing slash: ${url}`);
    }

    // Convert URLs to expected relative HTML paths
    const expectedHtmlPaths = new Set(
      locMatches.map(url => {
        const pathname = new URL(url).pathname;
        if (pathname === '/') return 'index.html';
        return path.join(pathname.slice(1), 'index.html');
      })
    );

    const actualHtmlPaths = new Set(
      HTML_FILES.map(f => path.relative(DIST_DIR, f))
    );

    assert.equal(expectedHtmlPaths.size, 160);
    assert.equal(actualHtmlPaths.size, 160);

    for (const p of expectedHtmlPaths) {
      assert.ok(actualHtmlPaths.has(p), `Path in sitemap missing in dist: ${p}`);
    }
  });
});
