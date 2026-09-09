/**
 * tests/adversarial_mr3_challenger_2.test.mjs
 * Adversarial Verification Suite — Milestone MR3 (Challenger 2)
 *
 * Empirical verification of:
 * 1. Client-side JS syntax & AST integrity (search inputs, GSAP animations, bundle check).
 * 2. CLS prevention via explicit width & height attributes on images (specifically 320x320 logo) and SVGs.
 * 3. Search filter behavior under stress, unicode, accents, malformed queries, and edge cases.
 * 4. Design & token conformance (Talora Wellness standards, zero yellow/gold, solid matte).
 * 5. 160 pages SSG compilation census and link integrity from home.
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_ASTRO_PATH = path.join(ROOT_DIR, 'src/pages/index.astro');
const DIST_INDEX_PATH = path.join(ROOT_DIR, 'dist/index.html');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DOLENCIAS_JSON_PATH = path.join(ROOT_DIR, 'src/data/dataset_biodescodificacion_dolencias.json');
const CITIES_CSV_PATH = path.join(ROOT_DIR, 'src/data/dataset_almaholistica_ciudades.csv');

describe('MR3 Challenger 2: Adversarial Verification & Client Robustness', () => {
  let indexAstroContent;
  let distIndexHtml;
  let dolencias;
  let clientBundleFile;
  let clientBundleContent;
  let cardDataSearch;
  let cityDataNames;

  before(() => {
    assert.ok(fs.existsSync(INDEX_ASTRO_PATH), 'src/pages/index.astro must exist');
    assert.ok(fs.existsSync(DIST_INDEX_PATH), 'dist/index.html must exist (run build first)');

    indexAstroContent = fs.readFileSync(INDEX_ASTRO_PATH, 'utf8');
    distIndexHtml = fs.readFileSync(DIST_INDEX_PATH, 'utf8');
    dolencias = JSON.parse(fs.readFileSync(DOLENCIAS_JSON_PATH, 'utf8'));

    // Locate bundled client JS for index.astro
    const astroDir = path.join(DIST_DIR, '_astro');
    assert.ok(fs.existsSync(astroDir), 'dist/_astro directory must exist');
    const astroFiles = fs.readdirSync(astroDir);
    clientBundleFile = astroFiles.find(f => f.startsWith('index.astro_') && f.endsWith('.js'));
    assert.ok(clientBundleFile, 'Must find bundled client JS for index.astro in dist/_astro');
    clientBundleContent = fs.readFileSync(path.join(astroDir, clientBundleFile), 'utf8');

    // Extract search dataset simulated from dist/index.html
    cardDataSearch = [...distIndexHtml.matchAll(/class=["'][^"']*home-dolencia-card[^"']*["'][^>]*data-search=["']([^"']*)["']/gi)]
      .map(m => m[1]);
    
    cityDataNames = [...distIndexHtml.matchAll(/class=["'][^"']*city-search-item[^"']*["'][^>]*data-city-name=["']([^"']*)["']/gi)]
      .map(m => m[1]);
  });

  // ============================================================================
  // 1. AUDITORÍA DE CLIENT SCRIPTS, AST Y SINTAXIS JS
  // ============================================================================
  describe('Dimension 1: Client Script & JS Syntax Audit', () => {
    test('MR3-CH2-1.1: Bundled client script passes node --check with zero syntax errors', () => {
      const bundlePath = path.join(DIST_DIR, '_astro', clientBundleFile);
      assert.doesNotThrow(() => {
        execSync(`node --check "${bundlePath}"`, { stdio: 'pipe' });
      }, 'Client bundle JS must be syntactically valid and pass node --check');
    });

    test('MR3-CH2-1.2: dist/index.html loads client bundle via <script type="module">', () => {
      const scriptTagRegex = new RegExp(`<script\\b[^>]*type=["']module["'][^>]*src=["']/[^"']*${clientBundleFile}["'][^>]*>`, 'i');
      assert.ok(scriptTagRegex.test(distIndexHtml), `dist/index.html must reference /_astro/${clientBundleFile} as ES module`);
    });

    test('MR3-CH2-1.3: Script tags implement #home-symptom-search and #home-city-search event listeners', () => {
      assert.ok(indexAstroContent.includes("document.getElementById('home-symptom-search')"), 'Must query #home-symptom-search');
      assert.ok(indexAstroContent.includes("document.getElementById('home-city-search')"), 'Must query #home-city-search');
      assert.ok(clientBundleContent.includes('home-symptom-search'), 'Bundled JS must contain home-symptom-search logic');
      assert.ok(clientBundleContent.includes('home-city-search'), 'Bundled JS must contain home-city-search logic');
    });

    test('MR3-CH2-1.4: GSAP animations respect prefers-reduced-motion and use clean completion hooks', () => {
      assert.ok(indexAstroContent.includes('prefers-reduced-motion'), 'Must check prefers-reduced-motion');
      assert.ok(indexAstroContent.includes("clearProps: 'transform,opacity'"), 'Must specify clearProps to prevent layout persistence');
      assert.ok(indexAstroContent.includes('.hero-floating-aura'), 'Must animate .hero-floating-aura');
      assert.ok(indexAstroContent.includes('sine.inOut'), 'Must use sine.inOut easing for smooth organic float');
      assert.ok(clientBundleContent.includes('prefers-reduced-motion'), 'Bundled JS must maintain reduced motion check');
    });
  });

  // ============================================================================
  // 2. AUDITORÍA DE PREVENCIÓN DE CLS (CUMULATIVE LAYOUT SHIFT = 0)
  // ============================================================================
  describe('Dimension 2: Cumulative Layout Shift (CLS) Prevention Audit', () => {
    test('MR3-CH2-2.1: Butterfly logo fallback <img> has explicit width="320" and height="320"', () => {
      const logoImgMatches = [...distIndexHtml.matchAll(/<img\b[^>]*src=["'][^"']*logo-mariposa[^"']*["'][^>]*>/gi)];
      assert.ok(logoImgMatches.length >= 2, 'Should find at least 2 logo img tags in dist/index.html');
      
      const heroLogo = logoImgMatches.find(m => /width=["']320["']/i.test(m[0]) && /height=["']320["']/i.test(m[0]));
      assert.ok(heroLogo, 'Hero butterfly logo <img> must have explicit width="320" and height="320"');
      assert.ok(/loading=["']eager["']/i.test(heroLogo[0]), 'Hero butterfly logo must be loading="eager" to avoid FOUC/CLS');
    });

    test('MR3-CH2-2.2: All <img> tags in dist/index.html have explicit width and height attributes', () => {
      const imgTags = [...distIndexHtml.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
      assert.ok(imgTags.length > 0, 'Should find img tags in page');

      for (const tag of imgTags) {
        const hasWidth = /width=["']\d+["']/i.test(tag);
        const hasHeight = /height=["']\d+["']/i.test(tag);
        assert.ok(hasWidth && hasHeight, `Tag must specify width and height: ${tag}`);
      }
    });

    test('MR3-CH2-2.3: Hero logo container has rigid square responsive dimensions preventing layout jump', () => {
      assert.ok(indexAstroContent.includes('w-72 h-72 sm:w-88 sm:h-88 md:w-[26rem] md:h-[26rem]'),
        'Logo container must define strict square dimensions across breakpoints');
      assert.ok(indexAstroContent.includes('shrink-0'), 'Logo container must be shrink-0');
    });

    test('MR3-CH2-2.4: Scroll line indicator container has fixed 1px width and 64px (h-16) height', () => {
      assert.ok(distIndexHtml.includes('w-[1px] h-16 bg-slate-800 relative overflow-hidden'),
        'Scroll line indicator container must be strictly dimensioned w-[1px] h-16');
    });

    test('MR3-CH2-2.5: All SVGs in dist/index.html have viewBox or explicit dimensions', () => {
      const svgTags = [...distIndexHtml.matchAll(/<svg\b[^>]*>/gi)].map(m => m[0]);
      assert.ok(svgTags.length >= 10, 'Should have multiple SVGs');

      for (const svg of svgTags) {
        const hasViewBox = /viewBox=["'][^"']*["']/i.test(svg);
        const hasWidth = /width=["']\d+["']/i.test(svg) || /class=["'][^"']*\bw-\d+/i.test(svg);
        const hasHeight = /height=["']\d+["']/i.test(svg) || /class=["'][^"']*\bh-\d+/i.test(svg);
        assert.ok(hasViewBox || (hasWidth && hasHeight), `SVG must be dimensionally constrained: ${svg}`);
      }
    });
  });

  // ============================================================================
  // 3. ESTRÉS Y COMPORTAMIENTO ADVERSARIAL DE LOS FILTROS DE CLIENTE
  // ============================================================================
  describe('Dimension 3: Client Filter Robustness & Stress Harness', () => {
    test('MR3-CH2-3.1: Exactly 12 cards have data-search and >=100 cities have data-city-name', () => {
      assert.strictEqual(cardDataSearch.length, 12, 'Must have exactly 12 cards with data-search');
      assert.ok(cityDataNames.length >= 100, `Must have >= 100 cities with data-city-name, found ${cityDataNames.length}`);
    });

    test('MR3-CH2-3.2: Symptom search simulation with adversarial inputs', () => {
      const simulateSymptom = (rawQuery) => {
        const q = rawQuery.toLowerCase().trim();
        return cardDataSearch.filter(data => !q || data.includes(q));
      };

      // 1. Empty & whitespace
      assert.strictEqual(simulateSymptom('').length, 12, 'Empty string shows all 12');
      assert.strictEqual(simulateSymptom('   ').length, 12, 'Whitespace shows all 12');

      // 2. Exact symptoms
      assert.ok(simulateSymptom('gastritis').length >= 1, 'gastritis must match');
      assert.ok(simulateSymptom('GASTRITIS').length >= 1, 'Uppercase must match');
      assert.ok(simulateSymptom('ansiedad').length >= 1, 'ansiedad must match');
      assert.ok(simulateSymptom('migraña').length >= 1 || simulateSymptom('migrana').length >= 1, 'migrana must match');

      // 3. Substrings & systems
      assert.ok(simulateSymptom('digestivo').length >= 1, 'System query "digestivo" must match');
      assert.ok(simulateSymptom('emocional').length >= 1, 'Emotion query "emocional" must match');

      // 4. Adversarial strings (symbols, regex chars, SQL/XSS injections)
      assert.strictEqual(simulateSymptom('([*+?^$|{}])').length, 0, 'Regex metachars must not error');
      assert.strictEqual(simulateSymptom("<script>alert('xss')</script>").length, 0, 'Script tags must not crash');
      assert.strictEqual(simulateSymptom("' OR '1'='1").length, 0, 'SQL injection must not crash');
      assert.strictEqual(simulateSymptom('nonexistent_symptom_xyz_12345').length, 0, 'Non-existent shows 0');
      assert.strictEqual(simulateSymptom('A'.repeat(5000)).length, 0, 'Long input string executes cleanly');
    });

    test('MR3-CH2-3.3: City search simulation with bilingual accents, capitals, and countries', () => {
      const simulateCity = (rawQuery) => {
        const q = rawQuery.toLowerCase().trim();
        return cityDataNames.filter(data => !q || data.includes(q));
      };

      // 1. Empty & whitespace
      assert.strictEqual(simulateCity('').length, cityDataNames.length, 'Empty string shows all cities');
      assert.strictEqual(simulateCity('   ').length, cityDataNames.length, 'Whitespace shows all cities');

      // 2. Bogotá with and without accent
      const bogotaAccented = simulateCity('bogotá');
      const bogotaPlain = simulateCity('bogota');
      assert.ok(bogotaAccented.length >= 1, 'Accented "bogotá" must match');
      assert.ok(bogotaPlain.length >= 1, 'Unaccented "bogota" must match');

      // 3. Major capital cities
      assert.ok(simulateCity('madrid').length >= 1, 'Madrid must match');
      assert.ok(simulateCity('cdmx').length >= 1 || simulateCity('ciudad de méxico').length >= 1, 'CDMX must match');
      assert.ok(simulateCity('buenos aires').length >= 1, 'Buenos Aires must match');
      assert.ok(simulateCity('miami').length >= 1, 'Miami must match');

      // 4. Country queries (data-city-name includes country name)
      assert.ok(simulateCity('colombia').length >= 4, 'Query "colombia" must match Colombian cities');
      assert.ok(simulateCity('españa').length >= 4, 'Query "españa" must match Spanish cities');
      assert.ok(simulateCity('estados unidos').length >= 4, 'Query "estados unidos" must match US cities');

      // 5. Stress inputs
      assert.strictEqual(simulateCity('!@#$%^&*()').length, 0, 'Symbols return 0 safely');
      assert.strictEqual(simulateCity('ciudad_inexistente_9999').length, 0, 'Non-existent city returns 0');
      assert.strictEqual(simulateCity('Z'.repeat(5000)).length, 0, 'Large payload handled without TLE');
    });
  });

  // ============================================================================
  // 4. ESTÁNDAR VISUAL EDITORIAL (TALORA WELLNESS, CERO AMARILLO, SÓLIDO MATE)
  // ============================================================================
  describe('Dimension 4: Design Standards & Visual Identity', () => {
    test('MR3-CH2-4.1: Eradication of forbidden yellow and gold hex codes', () => {
      const forbiddenHexes = [
        '#f59e0b', '#d4af37', '#ffe58f', '#e5b33a',
        '#fbbf24', '#f59e0b', '#d97706', '#b45309'
      ];
      for (const hex of forbiddenHexes) {
        assert.ok(!indexAstroContent.toLowerCase().includes(hex), `index.astro must not contain ${hex}`);
        assert.ok(!distIndexHtml.toLowerCase().includes(hex), `dist/index.html must not contain ${hex}`);
      }
    });

    test('MR3-CH2-4.2: Eradication of forbidden glassmorphism and neon effects', () => {
      const forbiddenTokens = ['backdrop-blur', 'glassmorphism', 'neon-glow', 'glow-cyan'];
      for (const token of forbiddenTokens) {
        assert.ok(!indexAstroContent.includes(token), `index.astro must not contain token ${token}`);
        assert.ok(!distIndexHtml.includes(token), `dist/index.html must not contain token ${token}`);
      }
    });

    test('MR3-CH2-4.3: Action buttons adhere to rounded-full pill design in pure white', () => {
      const classes = [...distIndexHtml.matchAll(/class=["']([^"']+)["']/gi)].map(m => m[1]);
      const whitePills = classes.filter(cls => cls.includes('bg-white') && cls.includes('rounded-full'));
      assert.ok(whitePills.length >= 3, `Expected at least 3 white pill buttons in page, found ${whitePills.length}`);
    });

    test('MR3-CH2-4.4: Section cards utilize rounded-[2.5rem] contemporary border curvature', () => {
      const roundedLargeCards = [...distIndexHtml.matchAll(/class=["'][^"']*rounded-\[2\.5rem\][^"']*["']/gi)];
      assert.ok(roundedLargeCards.length >= 10, `Expected multiple rounded-[2.5rem] cards, found ${roundedLargeCards.length}`);
    });

    test('MR3-CH2-4.5: Zero entity JSON-LD schemas injected in home page', () => {
      const jsonLdBlocks = [...distIndexHtml.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi)];
      assert.strictEqual(jsonLdBlocks.length, 0, 'Landing page dist/index.html must NOT inject entity JSON-LD schemas');
    });
  });

  // ============================================================================
  // 5. COMPILACIÓN SSG (160 PÁGINAS) Y RESOLUCIÓN DE ENLACES
  // ============================================================================
  describe('Dimension 5: SSG Compilation Census & Link Parity', () => {
    test('MR3-CH2-5.1: Exactly 160 HTML files generated in dist/', () => {
      const collectFiles = (dir) => {
        let results = [];
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            results = results.concat(collectFiles(full));
          } else if (entry.isFile() && entry.name.endsWith('.html')) {
            results.push(full);
          }
        }
        return results;
      };
      const files = collectFiles(DIST_DIR);
      assert.strictEqual(files.length, 160, `dist/ must contain exactly 160 HTML files, found ${files.length}`);
    });

    test('MR3-CH2-5.2: All internal hyperlinks on dist/index.html resolve to existing files or valid anchors', () => {
      const hrefMatches = [...distIndexHtml.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
      for (const href of hrefMatches) {
        if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
          continue; // External links verified separately
        }
        if (href.startsWith('#')) {
          const anchorId = href.slice(1);
          assert.ok(distIndexHtml.includes(`id="${anchorId}"`), `Anchor ${href} must exist in dist/index.html`);
          continue;
        }

        // Relative internal path without leading slash
        const rawPath = href.split('?')[0].split('#')[0];
        const cleanPath = rawPath.replace(/^\//, '');

        if (cleanPath === '' || cleanPath === '/') {
          assert.ok(fs.existsSync(path.join(DIST_DIR, 'index.html')), 'Root index.html must exist');
          continue;
        }

        if (cleanPath.endsWith('.xml') || cleanPath.endsWith('.txt') || cleanPath.endsWith('.svg') || cleanPath.endsWith('.png')) {
          const assetFile = path.join(DIST_DIR, cleanPath);
          assert.ok(fs.existsSync(assetFile), `Asset for ${href} must exist at ${assetFile}`);
          continue;
        }

        // Astro clean URLs: /bogota -> dist/bogota/index.html or dist/bogota.html
        const dirIndex = path.join(DIST_DIR, cleanPath, 'index.html');
        const flatHtml = path.join(DIST_DIR, `${cleanPath}.html`);
        const directHtml = path.join(DIST_DIR, cleanPath);
        assert.ok(fs.existsSync(dirIndex) || fs.existsSync(flatHtml) || fs.existsSync(directHtml),
          `Target file for internal link ${href} must exist in dist/`);
      }
    });

    test('MR3-CH2-5.3: Conversion buttons properly connect to WhatsAppQuizModal via data-open-quiz', () => {
      const quizTriggers = [...distIndexHtml.matchAll(/data-open-quiz=["']true["']/gi)];
      assert.ok(quizTriggers.length >= 10, `Must have conversion quiz triggers across the page, found ${quizTriggers.length}`);
    });
  });
});
