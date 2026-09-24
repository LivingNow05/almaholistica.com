/**
 * Adversarial Verification Specialist Test Suite
 * Agent: teamwork_preview_challenger_2
 *
 * Direct Empirical Challenges:
 * 1. Swiss Bio-Tech solid matte compliance (tests/helpers/mate_style_checker.mjs)
 *    against dist/ and all Astro/TSX/CSS components. Zero violations (no backdrop-blur,
 *    no bg-opacity-*, no neon glow, no #f59e0b / #d4af37 / amber / yellow).
 * 2. CLS = 0: All <img> tags have explicit width and height; all <svg> have explicit dimensions or viewBox.
 * 3. Global Schema.org census: Exactly 421 JSON-LD schemas in dist/
 *    (113 cities * 2 + 45 dolencias * 3 + 20 hubs * 3 = 421).
 *    Verify dist/index.html has exactly 0 schemas (MR3-CH2-4.5).
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
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

function getAllSourceFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllSourceFiles(full));
    } else if (entry.isFile() && /\.(astro|tsx|ts|css)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

describe('Challenger 2 — Mission 1: Swiss Bio-Tech Solid Matte Compliance', () => {
  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  const srcFiles = getAllSourceFiles(SRC_DIR);

  test('M1.1: 0 mate_style_checker violations across all Astro/TSX/CSS source components in src/', () => {
    assert.ok(srcFiles.length >= 10, `Expected source files, found ${srcFiles.length}`);
    const allViolations = [];
    for (const file of srcFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file);
      const audit = auditMateStyleContent(content, rel);
      if (!audit.passed) {
        allViolations.push(...audit.violations);
      }
    }
    assert.deepEqual(allViolations, [], `Found ${allViolations.length} mate_style violations in src/`);
  });

  test('M1.2: 0 mate_style_checker violations across all 180 HTML pages in dist/', () => {
    assert.strictEqual(htmlFiles.length, 180, `Expected exactly 180 HTML files, found ${htmlFiles.length}`);
    const allViolations = [];
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file);
      const audit = auditMateStyleContent(content, rel);
      if (!audit.passed) {
        allViolations.push(...audit.violations);
      }
    }
    assert.deepEqual(allViolations, [], `Found ${allViolations.length} mate_style violations in dist/`);
  });

  test('M1.3: Zero occurrences of yellow/amber (#f59e0b, #d4af37, text-amber, bg-amber, text-yellow, bg-yellow) in src/ components', () => {
    const yellowPatterns = [
      /#f59e0b/i,
      /#d4af37/i,
      /\b(?:text|bg|border|stroke|fill)-amber-[0-9]+/i,
      /\b(?:text|bg|border|stroke|fill)-yellow-[0-9]+/i
    ];

    const violations = [];
    for (const file of srcFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file);
      for (const pattern of yellowPatterns) {
        if (pattern.test(content)) {
          violations.push({ file: rel, match: content.match(pattern)[0] });
        }
      }
    }
    assert.deepEqual(violations, [], `Found yellow/amber violations in src/: ${JSON.stringify(violations)}`);
  });

  test('M1.4: Zero occurrences of yellow/amber (#f59e0b, #d4af37) in dist/ HTML and CSS files', () => {
    const yellowHexRegex = /#(?:f59e0b|d4af37)/i;
    const violations = [];
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file);
      if (yellowHexRegex.test(content)) {
        violations.push({ file: rel, match: content.match(yellowHexRegex)[0] });
      }
    }

    const cssDir = path.join(DIST_DIR, '_astro');
    if (fs.existsSync(cssDir)) {
      const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
      for (const cssFile of cssFiles) {
        const content = fs.readFileSync(path.join(cssDir, cssFile), 'utf8');
        if (yellowHexRegex.test(content)) {
          violations.push({ file: `_astro/${cssFile}`, match: content.match(yellowHexRegex)[0] });
        }
      }
    }
    assert.deepEqual(violations, [], `Found yellow/amber violations in dist/: ${JSON.stringify(violations)}`);
  });
});

describe('Challenger 2 — Mission 2: CLS = 0 (Cumulative Layout Shift Containment)', () => {
  const htmlFiles = getAllHtmlFiles(DIST_DIR);

  test('M2.1: Every <img> tag across all 180 pages in dist/ has explicit width and height numeric attributes', () => {
    let totalImgs = 0;
    const missingDimensions = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file);

      // Match all <img> tags
      const imgTags = content.match(/<img[^>]*>/gi) || [];
      for (const tag of imgTags) {
        totalImgs++;
        const hasWidth = /\bwidth\s*=\s*["'][0-9]+%?["']/i.test(tag);
        const hasHeight = /\bheight\s*=\s*["'][0-9]+%?["']/i.test(tag);
        if (!hasWidth || !hasHeight) {
          missingDimensions.push({ file: rel, tag });
        }
      }
    }

    assert.ok(totalImgs >= 900, `Expected at least 900 <img> tags across 180 pages, found ${totalImgs}`);
    assert.deepEqual(missingDimensions, [], `Found <img> tags missing explicit width/height: ${JSON.stringify(missingDimensions.slice(0, 5))}`);
  });

  test('M2.2: Every <svg> tag across all 180 pages in dist/ has viewBox or explicit width/height', () => {
    let totalSvgs = 0;
    const missingSvgDimensions = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file);

      const svgTags = content.match(/<svg[^>]*>/gi) || [];
      for (const tag of svgTags) {
        totalSvgs++;
        const hasViewBox = /\bviewBox\s*=\s*["'][^"']+["']/i.test(tag);
        const hasWidth = /\bwidth\s*=\s*["'][^"']+["']/i.test(tag);
        const hasHeight = /\bheight\s*=\s*["'][^"']+["']/i.test(tag);
        const hasSizingClass = /class\s*=\s*["'][^"']*\b(?:w-\d+|h-\d+|w-\[\d+px\]|h-\[\d+px\])\b[^"']*["']/i.test(tag);

        if (!hasViewBox && !(hasWidth && hasHeight) && !hasSizingClass) {
          missingSvgDimensions.push({ file: rel, tag });
        }
      }
    }

    assert.ok(totalSvgs >= 2000, `Expected at least 2000 <svg> tags across 180 pages, found ${totalSvgs}`);
    assert.deepEqual(missingSvgDimensions, [], `Found <svg> tags missing viewBox or dimension attributes: ${JSON.stringify(missingSvgDimensions.slice(0, 5))}`);
  });
});

describe('Challenger 2 — Mission 3: Global Schema.org Census & Invariants', () => {
  const htmlFiles = getAllHtmlFiles(DIST_DIR);

  test('M3.1: Exactly 421 JSON-LD schemas in dist/', () => {
    let totalSchemas = 0;
    const schemaTypes = {};
    const citySchemas = [];
    const countrySchemas = [];
    const dolenciaSchemas = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(DIST_DIR, file);

      const scriptMatches = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
      totalSchemas += scriptMatches.length;

      for (const match of scriptMatches) {
        const jsonContent = match.replace(/<script type="application\/ld\+json">/i, '').replace(/<\/script>/i, '').trim();
        const parsed = JSON.parse(jsonContent);
        const type = parsed['@type'] || 'Unknown';
        schemaTypes[type] = (schemaTypes[type] || 0) + 1;
      }

      if (rel === 'index.html' || rel === 'biodescodificacion/index.html') {
        assert.strictEqual(scriptMatches.length, 0, `${rel} must have 0 schemas`);
      } else if (rel.startsWith('biodescodificacion/')) {
        dolenciaSchemas.push({ file: rel, count: scriptMatches.length });
      } else {
        // City or Country hub
        // We know there are 20 country hubs:
        const countryHubSlugs = [
          'argentina', 'bolivia', 'brasil', 'chile', 'colombia', 'costa-rica',
          'ecuador', 'el-salvador', 'espana', 'estados-unidos', 'guatemala',
          'honduras', 'mexico', 'nicaragua', 'panama', 'paraguay', 'peru',
          'republica-dominicana', 'uruguay', 'venezuela'
        ];
        const dirName = path.dirname(rel).replace(/^biodescodificacion-/, '');
        if (countryHubSlugs.includes(dirName)) {
          countrySchemas.push({ file: rel, count: scriptMatches.length });
        } else {
          citySchemas.push({ file: rel, count: scriptMatches.length });
        }
      }
    }

    assert.strictEqual(totalSchemas, 421, `Global schema census must be exactly 421, found ${totalSchemas}`);
    assert.strictEqual(citySchemas.length, 113, `Must have 113 city pages, found ${citySchemas.length}`);
    assert.strictEqual(countrySchemas.length, 20, `Must have 20 country hub pages, found ${countrySchemas.length}`);
    assert.strictEqual(dolenciaSchemas.length, 45, `Must have 45 dolencia pages, found ${dolenciaSchemas.length}`);

    // Verify 113 cities * 2 schemas = 226
    const non2Cities = citySchemas.filter(c => c.count !== 2);
    assert.deepEqual(non2Cities, [], `All 113 cities must have exactly 2 schemas`);

    // Verify 20 country hubs * 3 schemas = 60
    const non3Countries = countrySchemas.filter(c => c.count !== 3);
    assert.deepEqual(non3Countries, [], `All 20 country hubs must have exactly 3 schemas`);

    // Verify 45 dolencias * 3 schemas = 135
    const non3Dolencias = dolenciaSchemas.filter(d => d.count !== 3);
    assert.deepEqual(non3Dolencias, [], `All 45 dolencias must have exactly 3 schemas`);

    // 226 + 60 + 135 = 421
    assert.strictEqual(113 * 2 + 20 * 3 + 45 * 3, 421);
  });

  test('M3.2: MR3-CH2-4.5 Invariant — dist/index.html has EXACTLY 0 schemas', () => {
    const indexPath = path.join(DIST_DIR, 'index.html');
    assert.ok(fs.existsSync(indexPath), 'dist/index.html must exist');
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    const schemaMatches = indexContent.match(/<script\s+type=["']application\/ld\+json["']/gi) || [];
    assert.strictEqual(schemaMatches.length, 0, `dist/index.html must have 0 JSON-LD schemas (found ${schemaMatches.length})`);
  });
});
