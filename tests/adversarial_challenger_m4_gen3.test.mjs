import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

describe('Challenger M4-Gen3: Static File Census and Build Verification', () => {
  const allHtml = getAllHtmlFiles(DIST_DIR);

  test('GEN3-1: dist/ exists and contains exactly 180 HTML files', () => {
    assert.strictEqual(
      allHtml.length,
      180,
      `Expected exactly 180 static HTML files in dist/, found ${allHtml.length}`
    );
  });

  test('GEN3-2: Categorical census: 113 city pages, 20 country hub pages, 45 dolencia pages, 1 catalog, 1 home', () => {
    const countrySlugs = new Set(
      JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'src/data/dataset_almaholistica_paises.json'), 'utf8')).map((c) => c.slug)
    );
    const countryPages = allHtml.filter((f) => {
      const rel = path.relative(DIST_DIR, f);
      const slug = rel.split(path.sep)[0];
      return countrySlugs.has(slug);
    });
    const cityPages = allHtml.filter((f) => {
      const rel = path.relative(DIST_DIR, f);
      const slug = rel.split(path.sep)[0];
      return rel.startsWith('biodescodificacion-') && !countrySlugs.has(slug);
    });
    const dolenciaPages = allHtml.filter((f) => {
      const rel = path.relative(DIST_DIR, f);
      return rel.startsWith('biodescodificacion/') && rel !== 'biodescodificacion/index.html';
    });
    const catalogPage = allHtml.filter((f) => path.relative(DIST_DIR, f) === 'biodescodificacion/index.html');
    const homePage = allHtml.filter((f) => path.relative(DIST_DIR, f) === 'index.html');

    assert.strictEqual(cityPages.length, 113, `Expected 113 city pages, found ${cityPages.length}`);
    assert.strictEqual(countryPages.length, 20, `Expected 20 country hub pages, found ${countryPages.length}`);
    assert.strictEqual(dolenciaPages.length, 45, `Expected 45 dolencia pages, found ${dolenciaPages.length}`);
    assert.strictEqual(catalogPage.length, 1, 'Expected exactly 1 catalog page at dist/biodescodificacion/index.html');
    assert.strictEqual(homePage.length, 1, 'Expected exactly 1 home page at dist/index.html');
  });
});

describe('Challenger M4-Gen3: Zero Internal 404 Links Across All 180 Pages', () => {
  const allHtml = getAllHtmlFiles(DIST_DIR);

  test('GEN3-3: Automated link scraper across all 180 HTML files detects ZERO broken internal <a> links', () => {
    const brokenLinks = [];
    let totalAnchorTags = 0;

    for (const file of allHtml) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(DIST_DIR, file);
      const matches = [...content.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>/gi)].map((m) => m[1]);

      for (const rawHref of matches) {
        totalAnchorTags++;
        if (
          rawHref.startsWith('http://') ||
          rawHref.startsWith('https://') ||
          rawHref.startsWith('mailto:') ||
          rawHref.startsWith('tel:') ||
          rawHref.startsWith('javascript:') ||
          rawHref.startsWith('#')
        ) {
          continue;
        }

        const cleanHref = rawHref.split('?')[0].split('#')[0];
        if (cleanHref === '' || cleanHref === '/') continue;

        const cleanPath = cleanHref.startsWith('/') ? cleanHref.slice(1) : cleanHref;
        const targetDirIndex = path.join(DIST_DIR, cleanPath, 'index.html');
        const targetHtml = path.join(DIST_DIR, cleanPath + '.html');
        const targetDirect = path.join(DIST_DIR, cleanPath);
        const targetPublic = path.join(PROJECT_ROOT, 'public', cleanPath);

        const exists =
          fs.existsSync(targetDirIndex) ||
          fs.existsSync(targetHtml) ||
          fs.existsSync(targetDirect) ||
          fs.existsSync(targetPublic);

        if (!exists) {
          brokenLinks.push({
            source: rel,
            href: rawHref,
            resolvedPath: targetDirIndex
          });
        }
      }
    }

    assert.ok(totalAnchorTags > 5000, `Expected >5000 anchor tags evaluated, found ${totalAnchorTags}`);
    assert.strictEqual(
      brokenLinks.length,
      0,
      `Detected ${brokenLinks.length} broken internal links: ${JSON.stringify(brokenLinks.slice(0, 5))}`
    );
  });
});

describe('Challenger M4-Gen3: Migraña Canonical Singular Link Integrity', () => {
  const allHtml = getAllHtmlFiles(DIST_DIR);
  const cityPages = allHtml.filter((f) => {
    const rel = path.relative(DIST_DIR, f);
    return rel.startsWith('biodescodificacion-');
  });

  test('GEN3-4: ZERO city pages contain plural link /biodescodificacion/migranas', () => {
    const violatingPages = [];
    for (const file of cityPages) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(DIST_DIR, file);
      if (content.includes('/biodescodificacion/migranas')) {
        violatingPages.push(rel);
      }
    }
    assert.strictEqual(
      violatingPages.length,
      0,
      `Found ${violatingPages.length} city pages with plural /biodescodificacion/migranas: ${violatingPages.slice(0, 5).join(', ')}`
    );
  });

  test('GEN3-5: ALL 113 city pages contain singular link /biodescodificacion/migrana', () => {
    const conformingPages = [];
    for (const file of cityPages) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(DIST_DIR, file);
      if (content.includes('/biodescodificacion/migrana')) {
        conformingPages.push(rel);
      }
    }
    assert.strictEqual(
      conformingPages.length,
      113,
      `Expected all 113 city pages to link to /biodescodificacion/migrana, but found ${conformingPages.length}`
    );
  });

  test('GEN3-6: Target static page dist/biodescodificacion/migrana/index.html exists and has valid title and content', () => {
    const migranaPath = path.join(DIST_DIR, 'biodescodificacion/migrana/index.html');
    assert.ok(fs.existsSync(migranaPath), 'dist/biodescodificacion/migrana/index.html must exist');

    const content = fs.readFileSync(migranaPath, 'utf8');
    assert.ok(content.includes('Migraña'), 'Page must contain title Migraña');
    assert.ok(content.includes('Sistema Nervioso'), 'Page must belong to Sistema Nervioso');
  });

  test('GEN3-7: Plural target dist/biodescodificacion/migranas does NOT exist as a route', () => {
    const migranasPath = path.join(DIST_DIR, 'biodescodificacion/migranas');
    assert.strictEqual(fs.existsSync(migranasPath), false, 'Plural directory dist/biodescodificacion/migranas must not exist');
  });
});

describe('Challenger M4-Gen3: Catalog and City Pages Link Resolution Stress Test', () => {
  test('GEN3-8: Catalog page (dist/biodescodificacion/index.html) links to all 45 dolencias and all resolve', () => {
    const catalogPath = path.join(DIST_DIR, 'biodescodificacion/index.html');
    const content = fs.readFileSync(catalogPath, 'utf8');
    const matches = [...content.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>/gi)].map((m) => m[1]);

    const dolenciaHrefs = matches.filter(
      (h) => h.startsWith('/biodescodificacion/') && h !== '/biodescodificacion/' && h !== '/biodescodificacion'
    );
    const uniqueDolencias = [...new Set(dolenciaHrefs)];

    assert.strictEqual(uniqueDolencias.length, 45, `Expected 45 unique dolencias in catalog, found ${uniqueDolencias.length}`);

    for (const href of uniqueDolencias) {
      const cleanPath = href.startsWith('/') ? href.slice(1) : href;
      const target = path.join(DIST_DIR, cleanPath, 'index.html');
      assert.ok(fs.existsSync(target), `Catalog link ${href} resolves to non-existent file ${target}`);
    }
  });

  test('GEN3-9: Home page renders 12 featured cards with valid canonical slugs', () => {
    const homePath = path.join(DIST_DIR, 'index.html');
    const content = fs.readFileSync(homePath, 'utf8');
    const cardMatches = content.match(/class="[^"]*home-dolencia-card[^"]*"/g) || [];

    assert.strictEqual(
      cardMatches.length,
      12,
      `Expected exactly 12 home-dolencia-card elements, found ${cardMatches.length}`
    );

    assert.ok(content.includes('href="/biodescodificacion/migrana"'), 'Home must contain link to /biodescodificacion/migrana');
    assert.ok(
      content.includes('href="/biodescodificacion/sobrepeso-retencion"'),
      'Home must contain link to /biodescodificacion/sobrepeso-retencion'
    );
  });

  test('GEN3-10: Footer contact link has data-open-quiz="true" across Home, Catalog, and City pages', () => {
    const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    assert.ok(
      homeHtml.includes('data-location="footer-bottom-contact"') && homeHtml.includes('data-open-quiz="true"'),
      'Footer contact link on Home must have data-open-quiz="true"'
    );

    const catalogHtml = fs.readFileSync(path.join(DIST_DIR, 'biodescodificacion/index.html'), 'utf8');
    assert.ok(
      catalogHtml.includes('data-location="footer-bottom-contact"') && catalogHtml.includes('data-open-quiz="true"'),
      'Footer contact link on Catalog must have data-open-quiz="true"'
    );

    const sampleCityHtml = fs.readFileSync(path.join(DIST_DIR, 'biodescodificacion-bogota/index.html'), 'utf8');
    assert.ok(
      sampleCityHtml.includes('data-location="footer-bottom-contact"') && sampleCityHtml.includes('data-open-quiz="true"'),
      'Footer contact link on Bogota must have data-open-quiz="true"'
    );
  });
});
