/**
 * tests/adversarial_mr3_challenger.test.mjs
 *
 * Suite de Verificación Adversarial Empírica para el Hito MR3
 * Landing Page (src/pages/index.astro) y Producción (dist/index.html)
 *
 * Autor: teamwork_preview_challenger_mr3_1 (EMPIRICAL CHALLENGER)
 *
 * Misión Adversarial:
 * 1. Exactamente 12 tarjetas .home-dolencia-card con slugs canónicos obligatorios
 *    (incluyendo 'migrana' y 'sobrepeso-retencion').
 * 2. Al menos 100 enlaces a ciudades existentes en dist/ con selector .city-search-item.
 * 3. Al menos 4 enlaces de WhatsApp y al menos 3 disparadores data-open-quiz="true".
 * 4. Exactamente CERO esquemas JSON-LD inyectados en dist/index.html.
 * 5. CERO rastros de amarillo (#F59E0B, #D4AF37) y clases prohibidas (backdrop-blur, etc.).
 * 6. Integridad de animaciones GSAP, Anti-CLS (CLS = 0) y anclas funcionales.
 * 7. Estrés y resistencia de los filtros de búsqueda en cliente.
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditMateStyleContent } from './helpers/mate_style_checker.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const INDEX_ASTRO_PATH = path.join(PROJECT_ROOT, 'src/pages/index.astro');
const DIST_INDEX_PATH = path.join(PROJECT_ROOT, 'dist/index.html');
const DOLENCIAS_DATA_PATH = path.join(PROJECT_ROOT, 'src/data/dataset_biodescodificacion_dolencias.json');
const CITIES_DATA_PATH = path.join(PROJECT_ROOT, 'src/data/dataset_almaholistica_ciudades.csv');

describe('MR3 Challenger Oracle: Verificación Adversarial Integral', () => {
  let indexAstroContent;
  let distIndexContent;
  let dolenciasDataset;

  before(() => {
    assert.ok(fs.existsSync(INDEX_ASTRO_PATH), `src/pages/index.astro must exist at ${INDEX_ASTRO_PATH}`);
    assert.ok(fs.existsSync(DIST_INDEX_PATH), `dist/index.html must exist at ${DIST_INDEX_PATH}. Run npm run build first.`);
    indexAstroContent = fs.readFileSync(INDEX_ASTRO_PATH, 'utf8');
    distIndexContent = fs.readFileSync(DIST_INDEX_PATH, 'utf8');
    dolenciasDataset = JSON.parse(fs.readFileSync(DOLENCIAS_DATA_PATH, 'utf8'));
  });

  // ==========================================================================
  // REQUISITO 1: 12 TARJETAS .home-dolencia-card Y SLUGS CANÓNICOS OBLIGATORIOS
  // ==========================================================================
  describe('Criterio 1: Exactamente 12 tarjetas .home-dolencia-card y Slugs Canónicos', () => {
    test('MR3-ADV-1.1: featuredSlugs en index.astro contiene exactamente 12 slugs canónicos', () => {
      const match = indexAstroContent.match(/const featuredSlugs = \[([\s\S]*?)\];/);
      assert.ok(match, 'featuredSlugs array must be explicitly declared in index.astro');
      const slugs = [...match[1].matchAll(/'([a-z0-9-]+)'/g)].map(m => m[1]);

      assert.strictEqual(slugs.length, 12, `featuredSlugs must have exactly 12 items, found ${slugs.length}`);

      // Slugs obligatorios innegociables
      assert.ok(slugs.includes('migrana'), "featuredSlugs MUST include canonical singular 'migrana'");
      assert.ok(!slugs.includes('migranas'), "featuredSlugs MUST NOT contain plural 'migranas'");
      assert.ok(slugs.includes('sobrepeso-retencion'), "featuredSlugs MUST include 'sobrepeso-retencion'");
      assert.ok(!slugs.includes('sobrepeso'), "featuredSlugs MUST NOT contain old slug 'sobrepeso'");

      // Validar contra dataset oficial de 45 dolencias
      const canonicalSlugs = new Set(dolenciasDataset.map(d => d.slug));
      for (const slug of slugs) {
        assert.ok(canonicalSlugs.has(slug), `Slug '${slug}' from featuredSlugs not found in official dolencias dataset`);
      }
    });

    test('MR3-ADV-1.2: dist/index.html renderiza exactamente 12 tarjetas con clase .home-dolencia-card', () => {
      const cardMatches = [...distIndexContent.matchAll(/<article[^>]*class="[^"]*home-dolencia-card[^"]*"[^>]*>/g)];
      assert.strictEqual(cardMatches.length, 12, `dist/index.html must render exactly 12 .home-dolencia-card articles (found ${cardMatches.length})`);
    });

    test('MR3-ADV-1.3: Todas las 12 tarjetas en dist/index.html tienen enlaces a páginas SSG existentes en dist/', () => {
      const expectedSlugs = [
        'gastritis',
        'colon-irritable',
        'ansiedad',
        'lumbalgia',
        'ciatica',
        'hipotiroidismo',
        'dermatitis',
        'migrana',
        'insomnio',
        'sobrepeso-retencion',
        'fibromialgia',
        'bruxismo'
      ];

      for (const slug of expectedSlugs) {
        const expectedHref = `/biodescodificacion/${slug}`;
        assert.ok(
          distIndexContent.includes(`href="${expectedHref}"`),
          `dist/index.html must contain link to ${expectedHref}`
        );

        const targetFile = path.join(PROJECT_ROOT, 'dist', 'biodescodificacion', slug, 'index.html');
        assert.ok(
          fs.existsSync(targetFile),
          `Static destination file does not exist: ${targetFile}`
        );
      }
    });

    test('MR3-ADV-1.4: Cada tarjeta .home-dolencia-card incluye botón de evaluación con data-open-quiz="true" y data-symptom', () => {
      const cardSnippets = distIndexContent.split('<article').slice(1).filter(chunk => chunk.includes('home-dolencia-card'));
      assert.strictEqual(cardSnippets.length, 12, 'Must isolate exactly 12 card blocks');

      for (let i = 0; i < cardSnippets.length; i++) {
        const snippet = cardSnippets[i];
        assert.ok(snippet.includes('data-open-quiz="true"'), `Card #${i + 1} missing data-open-quiz="true"`);
        assert.ok(snippet.includes('data-symptom="'), `Card #${i + 1} missing data-symptom attribute`);
        assert.ok(snippet.includes('rounded-[2.5rem]'), `Card #${i + 1} must feature rounded-[2.5rem] editorial corners`);
      }
    });
  });

  // ==========================================================================
  // REQUISITO 2: AL MENOS 100 ENLACES A CIUDADES CON .city-search-item
  // ==========================================================================
  describe('Criterio 2: Cobertura de Ciudades (>=100) con Selector .city-search-item', () => {
    test('MR3-ADV-2.1: dist/index.html contiene al menos 100 elementos con selector .city-search-item', () => {
      const cityItemMatches = [...distIndexContent.matchAll(/<li[^>]*class="[^"]*city-search-item[^"]*"[^>]*>/g)];
      assert.ok(
        cityItemMatches.length >= 100,
        `Expected at least 100 .city-search-item elements, found ${cityItemMatches.length}`
      );
    });

    test('MR3-ADV-2.2: Cada .city-search-item apunta a un archivo estático real en dist/', () => {
      const itemRegex = /<li[^>]*class="[^"]*city-search-item[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
      const items = [...distIndexContent.matchAll(itemRegex)];
      assert.ok(items.length >= 100, `Found ${items.length} items`);

      let validatedLinks = 0;
      for (const item of items) {
        const anchorMatch = item[1].match(/href="\/([a-zA-Z0-9-]+)\/?"/);
        assert.ok(anchorMatch, `city-search-item does not contain a valid href: ${item[0]}`);
        const citySlug = anchorMatch[1];

        const targetFile = path.join(PROJECT_ROOT, 'dist', citySlug, 'index.html');
        assert.ok(
          fs.existsSync(targetFile),
          `City link /${citySlug} leads to non-existent file: ${targetFile}`
        );
        validatedLinks++;
      }

      assert.ok(validatedLinks >= 100, `Validated ${validatedLinks} existing city files in dist/`);
    });

    test('MR3-ADV-2.3: Todos los .city-search-item cuentan con data-city-name para filtrado en cliente', () => {
      const itemsWithoutData = [...distIndexContent.matchAll(/<li[^>]*class="[^"]*city-search-item[^"]*"(?![\s\S]*?data-city-name=)[^>]*>/g)];
      assert.strictEqual(itemsWithoutData.length, 0, 'All .city-search-item elements must have data-city-name attribute');
    });
  });

  // ==========================================================================
  // REQUISITO 3: >= 4 ENLACES WHATSAPP Y >= 3 DISPARADORES data-open-quiz="true"
  // ==========================================================================
  describe('Criterio 3: Funnel de Conversión (WhatsApp y Quiz Modal)', () => {
    test('MR3-ADV-3.1: dist/index.html contiene al menos 4 enlaces de WhatsApp hacia 573151206985', () => {
      const waLinks = [...distIndexContent.matchAll(/href="https:\/\/wa\.me\/573151206985[^"]*"/g)];
      assert.ok(
        waLinks.length >= 4,
        `Expected at least 4 WhatsApp links in dist/index.html, found ${waLinks.length}`
      );
    });

    test('MR3-ADV-3.2: dist/index.html contiene al menos 3 disparadores data-open-quiz="true"', () => {
      const openQuizTriggers = [...distIndexContent.matchAll(/data-open-quiz="true"/g)];
      assert.ok(
        openQuizTriggers.length >= 3,
        `Expected at least 3 data-open-quiz="true" triggers, found ${openQuizTriggers.length}`
      );
    });

    test('MR3-ADV-3.3: Los CTAs principales utilizan botones píldora blancos de alta gama', () => {
      const pillButtons = [...distIndexContent.matchAll(/class="[^"]*rounded-full[^"]*bg-white[^"]*text-\[#060A1A\][^"]*"/g)];
      assert.ok(
        pillButtons.length >= 3,
        `Expected at least 3 high-end white pill buttons (Hero, Step, CTA final), found ${pillButtons.length}`
      );
    });
  });

  // ==========================================================================
  // REQUISITO 4: CERO ESQUEMAS JSON-LD EN dist/index.html
  // ==========================================================================
  describe('Criterio 4: Cero Esquemas JSON-LD inyectados en la Landing Page', () => {
    test('MR3-ADV-4.1: dist/index.html NO contiene bloques <script type="application/ld+json">', () => {
      const jsonLdBlocks = [...distIndexContent.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
      assert.strictEqual(
        jsonLdBlocks.length,
        0,
        `dist/index.html must have exactly 0 JSON-LD blocks (found ${jsonLdBlocks.length}). Schema is reserved for SSG programmatics.`
      );
    });
  });

  // ==========================================================================
  // REQUISITO 5: CERO RASTROS DE AMARILLO Y CLASES PROHIBIDAS
  // ==========================================================================
  describe('Criterio 5: Erradicación Absoluta de Amarillo y Estilo Mate Sólido', () => {
    const FORBIDDEN_COLORS = [
      /#f59e0b/i,
      /#d4af37/i,
      /#ffe58f/i,
      /#e5b33a/i,
      /rgb\s*\(\s*245\s*,\s*158\s*,\s*11\s*\)/i,
      /rgb\s*\(\s*212\s*,\s*175\s*,\s*55\s*\)/i,
    ];

    const FORBIDDEN_CLASSES = [
      /backdrop-blur/i,
      /glassmorphism/i,
      /\bneon\b/i,
      /\bglow\b/i,
      /bg-amber-/i,
      /text-amber-/i,
      /border-amber-/i,
      /bg-yellow-/i,
      /text-yellow-/i,
      /border-yellow-/i
    ];

    test('MR3-ADV-5.1: src/pages/index.astro libre de colores amarillos o dorados', () => {
      for (const pattern of FORBIDDEN_COLORS) {
        const match = indexAstroContent.match(pattern);
        assert.strictEqual(
          match,
          null,
          `Found forbidden color pattern ${pattern} in src/pages/index.astro: "${match?.[0]}"`
        );
      }
    });

    test('MR3-ADV-5.2: src/pages/index.astro libre de clases prohibidas (backdrop-blur, neon, glow, etc.)', () => {
      for (const pattern of FORBIDDEN_CLASSES) {
        const match = indexAstroContent.match(pattern);
        assert.strictEqual(
          match,
          null,
          `Found forbidden class pattern ${pattern} in src/pages/index.astro: "${match?.[0]}"`
        );
      }
    });

    test('MR3-ADV-5.3: dist/index.html libre de colores amarillos o dorados', () => {
      for (const pattern of FORBIDDEN_COLORS) {
        const match = distIndexContent.match(pattern);
        assert.strictEqual(
          match,
          null,
          `Found forbidden color pattern ${pattern} in dist/index.html: "${match?.[0]}"`
        );
      }
    });

    test('MR3-ADV-5.4: dist/index.html libre de backdrop-blur y clases translúcidas prohibidas', () => {
      for (const pattern of FORBIDDEN_CLASSES) {
        const match = distIndexContent.match(pattern);
        assert.strictEqual(
          match,
          null,
          `Found forbidden class pattern ${pattern} in dist/index.html: "${match?.[0]}"`
        );
      }
    });

    test('MR3-ADV-5.5: Auditoría rigurosa con mate_style_checker.mjs sobre src/pages/index.astro', () => {
      const audit = auditMateStyleContent(indexAstroContent, 'src/pages/index.astro');
      assert.strictEqual(
        audit.passed,
        true,
        `mate_style_checker failed with violations: ${JSON.stringify(audit.violations)}`
      );
      assert.strictEqual(audit.violations.length, 0);
    });
  });

  // ==========================================================================
  // REQUISITO 6: GSAP ANIMATIONS, PREFERS-REDUCED-MOTION & ANTI-CLS
  // ==========================================================================
  describe('Criterio 6: Animaciones GSAP, Accesibilidad y Prevención de CLS', () => {
    test('MR3-ADV-6.1: GSAP importado y configurado en src/pages/index.astro', () => {
      assert.ok(indexAstroContent.includes("import { gsap } from 'gsap'"), "index.astro must import { gsap } from 'gsap'");
      assert.ok(indexAstroContent.includes('power3.out'), 'GSAP must use power3.out for smooth editorial entrance');
      assert.ok(indexAstroContent.includes("clearProps: 'transform,opacity'"), 'GSAP must clear inline props to preserve hovers and layout');
      assert.ok(indexAstroContent.includes('sine.inOut'), 'GSAP floating aura must use sine.inOut for organic sinusoidal motion');
    });

    test('MR3-ADV-6.2: Respeto estricto de prefers-reduced-motion', () => {
      assert.ok(
        indexAstroContent.includes('prefers-reduced-motion: reduce'),
        'GSAP scripts must check window.matchMedia("(prefers-reduced-motion: reduce)") before animating'
      );
    });

    test('MR3-ADV-6.3: Indicador de scroll minimalista presente y estilizado', () => {
      assert.ok(
        distIndexContent.includes('w-[1px] h-16 bg-slate-800'),
        'Scroll indicator vertical line of 1px (h-16 = 64px) must be present in dist/index.html'
      );
      assert.ok(
        distIndexContent.includes('animate-scroll-line'),
        'Scroll indicator inner line must have animated class'
      );
    });

    test('MR3-ADV-6.4: Anti-CLS: Contenedores e imágenes con dimensiones explícitas', () => {
      const imgTags = [...distIndexContent.matchAll(/<img[^>]+>/g)].map(m => m[0]);
      assert.ok(imgTags.length > 0, 'Must have img tags');

      for (const img of imgTags) {
        assert.ok(/width=["']\d+["']/.test(img), `Img tag missing width: ${img}`);
        assert.ok(/height=["']\d+["']/.test(img), `Img tag missing height: ${img}`);
      }
    });

    test('MR3-ADV-6.5: Anclas internas (#dolencias, #ciudades) resuelven a elementos existentes', () => {
      const anchors = ['#dolencias', '#ciudades'];
      for (const anchor of anchors) {
        const id = anchor.slice(1);
        assert.ok(
          distIndexContent.includes(`id="${id}"`),
          `Internal anchor ${anchor} points to nonexistent id="${id}" in dist/index.html`
        );
      }
    });
  });

  // ==========================================================================
  // REQUISITO 7: PRUEBA DE ESTRÉS DE FILTRADO EN CLIENTE (BUSCADORES)
  // ==========================================================================
  describe('Criterio 7: Estrés y Resistencia de Búsqueda Interactiva', () => {
    test('MR3-ADV-7.1: Entradas malformadas y caracteres extremos en simulador de búsqueda de dolencias', () => {
      // Extraer datos de búsqueda de las 12 tarjetas en dist/index.html
      const searchAttrs = [...distIndexContent.matchAll(/class="[^"]*home-dolencia-card[^"]*"[^>]*data-search="([^"]+)"/g)].map(m => m[1]);
      assert.strictEqual(searchAttrs.length, 12, 'Must extract data-search for 12 cards');

      const stressQueries = [
        '',
        '   ',
        'GASTRITIS',
        'ansiedad',
        'xyz-no-existe-999',
        '<script>alert(1)</script>',
        '../../../etc/passwd',
        ' sobrepeso ',
        'migraña',
        'migrana',
        'áéíóú',
        'null',
        'undefined',
        '{}'
      ];

      for (const query of stressQueries) {
        const cleanQuery = query.toLowerCase().trim();
        const matches = searchAttrs.filter(item => !cleanQuery || item.includes(cleanQuery));

        if (!cleanQuery) {
          assert.strictEqual(matches.length, 12, 'Empty query must show all 12 cards');
        } else if (cleanQuery === 'xyz-no-existe-999') {
          assert.strictEqual(matches.length, 0, 'Nonexistent query must filter to 0 cards');
        } else if (cleanQuery === 'gastritis') {
          assert.ok(matches.length >= 1, "Query 'gastritis' must find at least 1 card");
        } else if (cleanQuery === 'migraña') {
          assert.ok(matches.length >= 1, "Query 'migraña' must find at least 1 card");
        }
      }
    });

    test('MR3-ADV-7.2: Entradas malformadas y acentos en simulador de búsqueda de ciudades', () => {
      const cityAttrs = [...distIndexContent.matchAll(/class="[^"]*city-search-item[^"]*"[^>]*data-city-name="([^"]+)"/g)].map(m => m[1]);
      assert.ok(cityAttrs.length >= 100, 'Must extract data-city-name for >=100 cities');

      const cityQueries = [
        '',
        'bogota',
        'madrid',
        'miami',
        'CIUDAD INEXISTENTE 12345',
        '"><img src=x onerror=alert(1)>'
      ];

      for (const query of cityQueries) {
        const cleanQuery = query.toLowerCase().trim();
        const matches = cityAttrs.filter(item => !cleanQuery || item.includes(cleanQuery));

        if (!cleanQuery) {
          assert.ok(matches.length >= 100, 'Empty query must show all cities');
        } else if (cleanQuery === 'bogota') {
          assert.ok(matches.length >= 1, 'Query bogota must find matching city');
        } else if (cleanQuery === 'CIUDAD INEXISTENTE 12345'.toLowerCase()) {
          assert.strictEqual(matches.length, 0, 'Inexistent city must return 0 results');
        }
      }
    });
  });
});
