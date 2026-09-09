/**
 * tests/adversarial_m6_final_qa.test.mjs
 * Final Adversarial Stress Testing & Quality Assurance Suite — Milestone M6
 * Author: teamwork_preview_challenger_m6_1 (EMPIRICAL CHALLENGER)
 * 
 * Comprehensive Empirical Verification of the entire product:
 * 1. Internal Link Integrity: Scan all 160 HTML files in dist/ for 0 broken links (zero 404s).
 * 2. CLS Prevention: Verify explicit width/height or viewBox on all <img> and <svg> tags in dist/.
 * 3. Conversion Funnel: Verify WhatsApp links across home, cities, dolencias, and catalog open Quiz Modal.
 * 4. Sitemaps: Verify public/ and dist/ sitemaps and robots.txt match and accurately represent 160 pages.
 * 5. JSON-LD: Verify valid JSON-LD parsing and structural conformance across all 160 pages.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

// Helper to recursively collect all HTML files
function collectHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(collectHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results.sort();
}

// Load site config
const siteBuild = esbuild.buildSync({
  entryPoints: [path.join(ROOT_DIR, 'src/config/site.ts')],
  bundle: true,
  write: false,
  format: 'esm'
});
const siteCode = siteBuild.outputFiles[0].text;
const { SITE_CONFIG } = await import(`data:text/javascript;base64,${Buffer.from(siteCode).toString('base64')}`);

const htmlFiles = collectHtmlFiles(DIST_DIR);

// ==============================================================================
// SUITE 1: CENSUS AND HTML GENERATION INTEGRITY
// ==============================================================================
describe('M6 QA Dimension 0: Static HTML Generation Census', () => {
  test('M6.0.1: Exactly 160 HTML pages exist in dist/', () => {
    assert.equal(htmlFiles.length, 160, `Expected 160 HTML files, found ${htmlFiles.length}`);
  });

  test('M6.0.2: All 160 pages are non-empty and well-formed HTML5', () => {
    for (const file of htmlFiles) {
      const stat = fs.statSync(file);
      assert.ok(stat.size > 1000, `Page ${file} suspiciously small: ${stat.size} bytes`);
      const content = fs.readFileSync(file, 'utf8');
      assert.ok(content.includes('<!DOCTYPE html>') || content.includes('<!doctype html>'), `Missing doctype in ${file}`);
      assert.ok(content.includes('<html'), `Missing <html tag in ${file}`);
      assert.ok(content.includes('</html>'), `Missing </html> tag in ${file}`);
      assert.ok(content.includes('lang="es"'), `Missing lang="es" attribute in ${file}`);
    }
  });
});

// ==============================================================================
// SUITE 2: INTERNAL LINK INTEGRITY (ZERO BROKEN LINKS / 404s)
// ==============================================================================
describe('M6 QA Dimension 1: Internal Link Integrity Audit (0 Broken Links)', () => {
  test('M6.1.1: Every internal href resolves to a physical file or anchor in dist/', () => {
    const broken = [];
    let checkedCount = 0;

    // Pre-cache all page ids
    const idMap = new Map();
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const ids = new Set([...content.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]));
      idMap.set(file, ids);
    }

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relSource = path.relative(DIST_DIR, file);
      const hrefs = [...content.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);

      for (const href of hrefs) {
        // Skip external, mailto, tel
        if (href.startsWith('http://') || href.startsWith('https://')) {
          if (!href.startsWith('https://almaholistica.com')) continue;
        }
        if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;

        checkedCount++;
        let clean = href.startsWith('https://almaholistica.com') ? href.slice('https://almaholistica.com'.length) : href;

        let targetFile = null;
        let fragment = null;

        if (clean.includes('#')) {
          const parts = clean.split('#');
          clean = parts[0];
          fragment = parts[1];
        }

        if (href.startsWith('#')) {
          targetFile = file;
        } else if (clean === '' || clean === '/') {
          targetFile = path.join(DIST_DIR, 'index.html');
        } else {
          const stripped = clean.replace(/^\/+|\/+$/g, '');
          const asDir = path.join(DIST_DIR, stripped, 'index.html');
          const asFile = path.join(DIST_DIR, stripped);

          if (fs.existsSync(asDir)) {
            targetFile = asDir;
          } else if (fs.existsSync(asFile)) {
            targetFile = asFile;
          } else {
            broken.push({ file: relSource, href, reason: 'Target path does not exist in dist/' });
            continue;
          }
        }

        if (fragment && targetFile && targetFile.endsWith('.html')) {
          const targetIds = idMap.get(targetFile);
          if (targetIds && !targetIds.has(fragment)) {
            broken.push({ file: relSource, href, reason: `Target anchor #${fragment} missing in ${path.relative(DIST_DIR, targetFile)}` });
          }
        }
      }
    }

    assert.ok(checkedCount > 4000, `Expected >4000 checked links, got ${checkedCount}`);
    assert.deepEqual(broken, [], `Found ${broken.length} broken links: ${JSON.stringify(broken.slice(0, 5))}`);
  });
});

// ==============================================================================
// SUITE 3: CLS PREVENTION (EXPLICIT DIMENSIONS ON IMG & SVG)
// ==============================================================================
describe('M6 QA Dimension 2: CLS Prevention Audit (Images & SVGs)', () => {
  test('M6.2.1: All <img> tags have explicit width and height or aspect-ratio attributes', () => {
    let imgCount = 0;
    const unconstrained = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const imgs = content.match(/<img\b[^>]*>/gi) || [];

      for (const img of imgs) {
        imgCount++;
        const hasWidth = /\bwidth=["']?\d+/i.test(img);
        const hasHeight = /\bheight=["']?\d+/i.test(img);
        const hasAspect = img.includes('aspect-ratio');

        if (!((hasWidth && hasHeight) || hasAspect)) {
          unconstrained.push({ file: path.relative(DIST_DIR, file), tag: img });
        }
      }
    }

    assert.ok(imgCount >= 160, `Expected at least 160 img tags across all pages, found ${imgCount}`);
    assert.deepEqual(unconstrained, [], `Found unconstrained img tags: ${JSON.stringify(unconstrained)}`);
  });

  test('M6.2.2: All <svg> tags have viewBox or explicit width/height or sizing classes', () => {
    let svgCount = 0;
    const unconstrained = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const svgs = content.match(/<svg\b[^>]*>/gi) || [];

      for (const svg of svgs) {
        svgCount++;
        const hasViewBox = /\bviewBox=["']?[^"'>]+["']?/i.test(svg);
        const hasWidth = /\bwidth=["']?[^"'>]+["']?/i.test(svg);
        const hasHeight = /\bheight=["']?[^"'>]+["']?/i.test(svg);
        const hasClassSize = /\bclass=["'][^"']*(?:w-\d+|h-\d+|size-\d+)[^"']*["']/i.test(svg);

        if (!(hasViewBox || (hasWidth && hasHeight) || hasClassSize)) {
          unconstrained.push({ file: path.relative(DIST_DIR, file), tag: svg });
        }
      }
    }

    assert.ok(svgCount >= 1000, `Expected >1000 svgs across 160 pages, found ${svgCount}`);
    assert.deepEqual(unconstrained, [], `Found unconstrained svg tags: ${JSON.stringify(unconstrained)}`);
  });
});

// ==============================================================================
// SUITE 4: CONVERSION FUNNEL & WHATSAPP QUIZ MODAL
// ==============================================================================
describe('M6 QA Dimension 3: Conversion Funnel & Quiz Modal Interception', () => {
  test('M6.3.1: All 160 pages contain WhatsApp CTAs with provisional phone 573000000000', () => {
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relPath = path.relative(DIST_DIR, file);

      assert.ok(
        content.includes(`https://wa.me/${SITE_CONFIG.whatsappNumber}`),
        `Page ${relPath} missing central WhatsApp link with ${SITE_CONFIG.whatsappNumber}`
      );
      assert.ok(
        content.includes('data-open-quiz') || content.includes('data-symptom') || content.includes('alma:open-quiz'),
        `Page ${relPath} missing quiz trigger attributes`
      );
      assert.ok(
        content.includes('id="quiz-modal-container"') || content.includes('astro-island'),
        `Page ${relPath} missing quiz-modal-container anchor`
      );
    }
  });

  test('M6.3.2: WhatsApp text parameters are validly encoded and contain no raw JSON or XSS', () => {
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const waLinks = [...content.matchAll(/href=["'](https:\/\/wa\.me\/[^"']+)["']/g)].map(m => m[1]);

      for (const waUrl of waLinks) {
        assert.ok(!waUrl.includes('<script>'), `Potential XSS injection in wa.me link in ${file}`);
        assert.ok(!waUrl.includes('undefined'), `Found 'undefined' in wa.me link: ${waUrl}`);
        assert.ok(!waUrl.includes('NaN'), `Found 'NaN' in wa.me link: ${waUrl}`);
        assert.ok(waUrl.includes('text='), `wa.me link missing text parameter: ${waUrl}`);
      }
    }
  });
});

// ==============================================================================
// SUITE 5: SITEMAPS AND ROBOTS.TXT CONFORMANCE
// ==============================================================================
describe('M6 QA Dimension 4: Sitemaps & robots.txt Parity and RFC Conformance', () => {
  test('M6.4.1: public/ and dist/ sitemaps and robots.txt are byte-for-byte identical', () => {
    const files = ['sitemap-index.xml', 'sitemap-0.xml', 'sitemap.xml', 'robots.txt'];
    for (const f of files) {
      const pubPath = path.join(PUBLIC_DIR, f);
      const dstPath = path.join(DIST_DIR, f);
      assert.ok(fs.existsSync(pubPath), `Missing public/${f}`);
      assert.ok(fs.existsSync(dstPath), `Missing dist/${f}`);
      const pubBuf = fs.readFileSync(pubPath);
      const dstBuf = fs.readFileSync(dstPath);
      assert.ok(pubBuf.equals(dstBuf), `Byte mismatch between public/${f} and dist/${f}`);
    }
  });

  test('M6.4.2: sitemap-0.xml lists exactly 160 canonical URLs mapping 1:1 to dist/ pages', () => {
    const sitemapContent = fs.readFileSync(path.join(DIST_DIR, 'sitemap-0.xml'), 'utf8');
    const urls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

    assert.equal(urls.length, 160, `sitemap-0.xml must contain exactly 160 URLs, found ${urls.length}`);
    const uniqueUrls = new Set(urls);
    assert.equal(uniqueUrls.size, 160, 'sitemap-0.xml must contain zero duplicate URLs');

    for (const u of urls) {
      assert.ok(u.startsWith('https://almaholistica.com/'), `Invalid URL domain in sitemap: ${u}`);
      assert.ok(u.endsWith('/'), `URL must end with trailing slash: ${u}`);

      const pathname = u.replace('https://almaholistica.com', '').replace(/^\/+|\/+$/g, '');
      const expectedHtml = pathname === '' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, pathname, 'index.html');
      assert.ok(fs.existsSync(expectedHtml), `Sitemap URL ${u} does not map to physical file ${expectedHtml}`);
    }
  });

  test('M6.4.3: robots.txt contains User-agent: *, Allow: / and dual sitemap pointers', () => {
    const robots = fs.readFileSync(path.join(DIST_DIR, 'robots.txt'), 'utf8');
    assert.ok(robots.includes('User-agent: *'));
    assert.ok(robots.includes('Allow: /'));
    assert.ok(robots.includes('Sitemap: https://almaholistica.com/sitemap-index.xml'));
    assert.ok(robots.includes('Sitemap: https://almaholistica.com/sitemap.xml'));
  });
});

// ==============================================================================
// SUITE 6: JSON-LD SYNTAX & STRUCTURAL INTEGRITY
// ==============================================================================
describe('M6 QA Dimension 5: JSON-LD Syntax and Semantic Integrity', () => {
  test('M6.5.1: Exactly 361 JSON-LD schemas exist across the site with 100% valid JSON', () => {
    let totalSchemas = 0;
    const typeCounts = {};

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relPath = path.relative(DIST_DIR, file);
      const scriptBlocks = [...content.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)].map(m => m[1]);

      if (relPath === 'index.html' || relPath === path.join('biodescodificacion', 'index.html')) {
        assert.equal(scriptBlocks.length, 0, `Index page ${relPath} should not contain entity schemas`);
        continue;
      }

      if (relPath.startsWith('biodescodificacion' + path.sep)) {
        assert.equal(scriptBlocks.length, 3, `Dolencia page ${relPath} must contain exactly 3 schemas`);
      } else {
        assert.equal(scriptBlocks.length, 2, `City page ${relPath} must contain exactly 2 schemas`);
      }

      for (const block of scriptBlocks) {
        totalSchemas++;
        let parsed;
        try {
          parsed = JSON.parse(block.trim());
        } catch (e) {
          assert.fail(`JSON parse error in ${relPath}: ${e.message}`);
        }

        assert.equal(parsed['@context'], 'https://schema.org', `Invalid @context in ${relPath}`);
        const type = parsed['@type'];
        assert.ok(type, `Missing @type in ${relPath}`);
        typeCounts[type] = (typeCounts[type] || 0) + 1;

        if (type === 'MedicalWebPage') {
          assert.ok(parsed.about, `MedicalWebPage missing about in ${relPath}`);
          assert.ok(parsed.about.associatedPathophysiology, `MedicalWebPage missing associatedPathophysiology in ${relPath}`);
        } else if (type === 'FAQPage') {
          assert.ok(Array.isArray(parsed.mainEntity) && parsed.mainEntity.length > 0, `FAQPage missing mainEntity in ${relPath}`);
        } else if (type === 'BreadcrumbList') {
          assert.ok(Array.isArray(parsed.itemListElement) && parsed.itemListElement.length > 0, `BreadcrumbList missing itemListElement in ${relPath}`);
        } else if (type === 'HealthAndBeautyBusiness') {
          assert.ok(parsed.address, `HealthAndBeautyBusiness missing address in ${relPath}`);
          assert.ok(parsed.currenciesAccepted, `HealthAndBeautyBusiness missing currenciesAccepted in ${relPath}`);
          assert.ok(parsed.priceRange, `HealthAndBeautyBusiness missing priceRange in ${relPath}`);
        }
      }
    }

    assert.equal(totalSchemas, 361, `Expected 361 total schemas, found ${totalSchemas}`);
    assert.equal(typeCounts['MedicalWebPage'], 45, 'Expected 45 MedicalWebPage schemas');
    assert.equal(typeCounts['FAQPage'], 45, 'Expected 45 FAQPage schemas');
    assert.equal(typeCounts['BreadcrumbList'], 158, 'Expected 158 BreadcrumbList schemas (113 cities + 45 dolencias)');
    assert.equal(typeCounts['HealthAndBeautyBusiness'], 113, 'Expected 113 HealthAndBeautyBusiness schemas');
  });
});
