/**
 * Adversarial Test Suite: Configuration, WhatsApp URL Generator, Layout Anchors & SVG Assets
 * Milestone: M2 Gate Challenge
 * Author: teamwork_preview_challenger_m2_2
 *
 * Empirical verification:
 * 1. Stress testing buildWhatsAppUrl() in src/config/site.ts with conflictive characters:
 *    - URL delimiters (&, ?, =, #, +, %, /, \, @, ;, :, $)
 *    - Whitespace, newlines (\n, \r\n, \t)
 *    - Quotes, backticks, brackets, HTML/XSS and SQL injection payloads
 *    - Emojis, multibyte Unicode, surrogate pairs, ZWJ sequences, international scripts
 *    - Phone number sanitization and fallbacks
 *    - Boundary and extreme values
 * 2. Anchors and Layout contracts in src/layouts/BaseLayout.astro:
 *    - #quiz-modal-container inside <body> with data-client-load="client:load" and <slot name="quiz-modal" />
 *    - <slot name="schema" /> inside <head>
 *    - BaseLayout structural integrity (lang="es", sitemap auto-discovery, Google Fonts)
 * 3. Integrity of SVGs in public/:
 *    - public/logo-mariposa-con-fondo-completo.svg and public/favicon.svg
 *    - XML well-formedness, root <svg>, square viewBox (1:1), file size > 1MB
 *    - Security audit: zero scripts, zero inline event handlers
 *    - Interactive CSS animations (:hover, @keyframes)
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import from production implementation code
import { buildWhatsAppUrl, SITE_CONFIG } from '../src/config/site.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

describe('Adversarial M2.2: buildWhatsAppUrl() Stress Testing with Conflictive Inputs', () => {

  test('ADV-M2.2.0: SITE_CONFIG export integrity and required architectural contract constants', () => {
    assert.equal(SITE_CONFIG.whatsappNumber, '573151206985', 'Official phone must be exact 573151206985');
    assert.equal(SITE_CONFIG.url, 'https://almaholistica.com', 'Canonical base URL must match');
    assert.equal(SITE_CONFIG.name, 'Alma Holística', 'Official site name must match');
    assert.equal(SITE_CONFIG.defaultOgImage, '/logo-mariposa-con-fondo-completo.svg', 'OG image must point to butterfly logo');
    assert.equal(SITE_CONFIG.themeColor, '#060A1A', 'Theme color must be Abyssal Background #060A1A');
  });

  test('ADV-M2.2.1: Default invocation produces valid wa.me URL with standard greeting', () => {
    const urlStr = buildWhatsAppUrl();
    assert.ok(urlStr.startsWith(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=`), 'Must start with default wa.me prefix');
    
    const parsed = new URL(urlStr);
    assert.equal(parsed.protocol, 'https:');
    assert.equal(parsed.hostname, 'wa.me');
    assert.equal(parsed.pathname, '/573151206985');
    assert.equal(parsed.hash, '', 'URL hash must be empty');

    const decoded = decodeURIComponent(parsed.searchParams.get('text') || '');
    assert.ok(decoded.includes('Hola Alma Holística, deseo agendar una sesión inicial de diagnóstico.'));
    assert.ok(decoded.includes('Agradezco su orientación para abordar la raíz emocional de mi caso.'));
    assert.ok(!decoded.includes('Síntoma'), 'Default message should not contain symptom bullet point');
  });

  test('ADV-M2.2.2: Invocation with empty object {} behaves identically to undefined', () => {
    const urlEmpty = buildWhatsAppUrl({});
    const urlUndef = buildWhatsAppUrl(undefined);
    assert.equal(urlEmpty, urlUndef, 'Empty object must result in default message URL');
  });

  test('ADV-M2.2.3: URL delimiters (&, ?, =, #, %, +, /) in symptom do NOT fragment the URL or create rogue query params', () => {
    const conflictiveSymptom = 'Gastritis & Reflujo ? Severo = Sí #1 + Dolor %20 / Tórax \\ Alto';
    const urlStr = buildWhatsAppUrl({
      symptom: conflictiveSymptom,
      location: 'Bogotá & Chía'
    });

    // Parse URL with standard URL parser
    const parsed = new URL(urlStr);

    // CRITICAL: The '#' MUST NOT become a URL fragment / hash
    assert.equal(parsed.hash, '', 'Hash delimiter # inside parameters must be safely encoded and not create a URL hash');

    // CRITICAL: The '&' and '=' MUST NOT create additional query parameters
    const queryKeys = Array.from(parsed.searchParams.keys());
    assert.deepEqual(queryKeys, ['text'], 'Search params must contain ONLY the "text" parameter, no rogue params from unescaped & or =');

    // The text parameter must decode back exactly to the original content
    const decodedText = parsed.searchParams.get('text');
    assert.ok(decodedText.includes(conflictiveSymptom), 'Decoded text must preserve all conflictive delimiters verbatim');
    assert.ok(decodedText.includes('Bogotá & Chía'), 'Location with & must be preserved');
  });

  test('ADV-M2.2.4: Code injection, XSS vectors and SQL payloads are encoded and do not disrupt URL syntax', () => {
    const payloads = [
      '<script>alert("XSS")</script>',
      '"><img src=x onerror=alert(1)>',
      "' OR '1'='1'; DROP TABLE dolencias; --",
      'javascript:/*--></title></style></textarea></script></xmp><svg/onload=\'+/"/+/onmouseover=1/+/[*/[]/+alert(1)//\'>',
      '"><a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">click</a>'
    ];

    for (const payload of payloads) {
      const urlStr = buildWhatsAppUrl({
        symptom: payload,
        priorTreatments: payload
      });

      // Must parse without error
      let parsed;
      assert.doesNotThrow(() => {
        parsed = new URL(urlStr);
      }, `URL parsing should not throw for payload: ${payload}`);

      assert.equal(parsed.hostname, 'wa.me');
      assert.equal(parsed.hash, '');
      const queryKeys = Array.from(parsed.searchParams.keys());
      assert.deepEqual(queryKeys, ['text'], 'Should not generate extra search parameters');

      const decoded = parsed.searchParams.get('text');
      assert.ok(decoded.includes(payload), `Payload should be safely retrievable from decoded text: ${payload}`);
    }
  });

  test('ADV-M2.2.5: Linebreaks, tabs, carriage returns, quotes and backticks are preserved and encoded safely', () => {
    const multilineInput = "Línea 1: Dolor lumbar\r\nLínea 2:\tCon irradiación\nLínea 3: 'comillas simples', \"dobles\", `backticks`";
    const urlStr = buildWhatsAppUrl({
      symptom: multilineInput
    });

    const parsed = new URL(urlStr);
    assert.equal(parsed.hash, '');

    const decoded = parsed.searchParams.get('text');
    assert.ok(decoded.includes('Línea 1: Dolor lumbar'), 'Preserves line 1');
    assert.ok(decoded.includes('\tCon irradiación'), 'Preserves tabs');
    assert.ok(decoded.includes("'comillas simples'"), 'Preserves single quotes');
    assert.ok(decoded.includes('"dobles"'), 'Preserves double quotes');
    assert.ok(decoded.includes('`backticks`'), 'Preserves backticks');
  });

  test('ADV-M2.2.6: Multibyte Unicode, emojis, ZWJ sequences and international scripts', () => {
    const complexUnicode = [
      '🦋 Ansiedad crónica y opresión 🧘‍♀️ en el pecho 💔',
      '👨‍👩‍👧‍👦 Conflicto con el clan familiar y ancestros 🌿',
      '¿Fibromialgia, colon irritable & migraña aguda? ¡Urgente!',
      'Мигрень и хроническая усталость (Cyrillic)',
      '胃炎与胃溃疡 (Chinese)',
      'صداع نصfi ومشاكل هضمية (Arabic)',
      'São Paulo, Ciudad de México, Bogotá, Medellín'
    ];

    for (const text of complexUnicode) {
      const urlStr = buildWhatsAppUrl({ symptom: text });
      const parsed = new URL(urlStr);
      const decoded = parsed.searchParams.get('text');
      assert.ok(decoded.includes(text), `Unicode string must survive roundtrip: ${text}`);
    }
  });

  test('ADV-M2.2.7: Phone number sanitization and formatting resilience', () => {
    // International format with spaces, plus, parentheses and hyphens
    const input1 = buildWhatsAppUrl({ phone: '+57 (300) 123-4567' });
    assert.ok(input1.startsWith('https://wa.me/573001234567?text='), 'Strips non-digits from formatted phone');

    // Phone with dots
    const input2 = buildWhatsAppUrl({ phone: '57.300.987.6543' });
    assert.ok(input2.startsWith('https://wa.me/573009876543?text='), 'Strips dots');

    // Phone with leading and trailing whitespace
    const input3 = buildWhatsAppUrl({ phone: '   573111222333   ' });
    assert.ok(input3.startsWith('https://wa.me/573111222333?text='), 'Trims whitespace digits');

    // Empty string phone falls back to SITE_CONFIG.whatsappNumber
    const input4 = buildWhatsAppUrl({ phone: '' });
    assert.ok(input4.startsWith('https://wa.me/573151206985?text='), 'Empty phone string falls back to default');

    // Undefined phone falls back to SITE_CONFIG.whatsappNumber
    const input5 = buildWhatsAppUrl({ phone: undefined });
    assert.ok(input5.startsWith('https://wa.me/573151206985?text='), 'Undefined phone falls back to default');
  });

  test('ADV-M2.2.8: Extreme long strings and boundary input combinations', () => {
    // 2,000-character description
    const longString = 'Dolor recurrente '.repeat(120);
    const urlStr = buildWhatsAppUrl({ symptom: longString });
    assert.doesNotThrow(() => new URL(urlStr), 'Long URLs must remain valid parseable URLs');
    const parsed = new URL(urlStr);
    const decoded = parsed.searchParams.get('text');
    assert.ok(decoded.includes(longString));

    // Combination of empty string parameters (falsy values must not render bullets)
    const urlEmptyProps = buildWhatsAppUrl({
      symptom: '',
      duration: '',
      priorTreatments: '',
      location: ''
    });
    const parsedEmpty = new URL(urlEmptyProps);
    const decodedEmpty = parsedEmpty.searchParams.get('text');
    assert.ok(!decodedEmpty.includes('•'), 'Empty string properties must not render bullet points');
  });
});

describe('Adversarial M2.2: BaseLayout.astro Anchors & Interface Contracts', () => {
  const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
  assert.ok(fs.existsSync(layoutPath), 'BaseLayout.astro must exist');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');

  test('ADV-M2.2.9: #quiz-modal-container exists in <body> with data-client-load="client:load"', () => {
    // Check id="quiz-modal-container"
    const containerMatch = layoutContent.match(/<div\s+[^>]*id=["']quiz-modal-container["'][^>]*>/i);
    assert.ok(containerMatch, 'Must find element with id="quiz-modal-container"');

    const containerTag = containerMatch[0];
    assert.ok(
      containerTag.includes('data-client-load="client:load"'),
      '#quiz-modal-container must specify data-client-load="client:load" contract for zero-latency M3 hydration'
    );

    // Verify it is located inside <body>
    const bodyStartIndex = layoutContent.indexOf('<body');
    const bodyEndIndex = layoutContent.indexOf('</body>');
    const containerIndex = layoutContent.indexOf('id="quiz-modal-container"');

    assert.ok(bodyStartIndex !== -1, 'BaseLayout must contain <body>');
    assert.ok(bodyEndIndex !== -1, 'BaseLayout must contain </body>');
    assert.ok(
      containerIndex > bodyStartIndex && containerIndex < bodyEndIndex,
      '#quiz-modal-container must be inside <body>...</body>'
    );
  });

  test('ADV-M2.2.10: #quiz-modal-container contains <slot name="quiz-modal" />', () => {
    // Check that inside the container or adjacent to it, slot name="quiz-modal" is provided
    const slotQuizMatch = layoutContent.match(/<slot\s+name=["']quiz-modal["']\s*\/>/i);
    assert.ok(slotQuizMatch, 'BaseLayout must provide <slot name="quiz-modal" /> for M3 component injection');
  });

  test('ADV-M2.2.11: <slot name="schema" /> exists inside <head>', () => {
    const headStartIndex = layoutContent.indexOf('<head');
    const headEndIndex = layoutContent.indexOf('</head>');
    const schemaSlotMatch = layoutContent.match(/<slot\s+name=["']schema["']\s*\/>/i);

    assert.ok(headStartIndex !== -1, 'BaseLayout must contain <head>');
    assert.ok(headEndIndex !== -1, 'BaseLayout must contain </head>');
    assert.ok(schemaSlotMatch, 'BaseLayout must contain <slot name="schema" />');

    const schemaSlotIndex = layoutContent.indexOf(schemaSlotMatch[0]);
    assert.ok(
      schemaSlotIndex > headStartIndex && schemaSlotIndex < headEndIndex,
      '<slot name="schema" /> must be placed strictly inside <head>...</head> for SEO JSON-LD scripts'
    );
  });

  test('ADV-M2.2.12: BaseLayout structural integrity and compliance', () => {
    // Doctype and lang="es"
    assert.ok(layoutContent.startsWith('---'), 'Must contain frontmatter fence');
    assert.ok(layoutContent.includes('<!doctype html>'), 'Must specify <!doctype html>');
    assert.ok(layoutContent.includes('<html lang="es"'), 'html tag must specify lang="es"');

    // Global CSS and Layout components
    assert.ok(layoutContent.includes("import '../styles/global.css'"), 'Must import global.css');
    assert.ok(layoutContent.includes('<Navbar />'), 'Must render <Navbar />');
    assert.ok(layoutContent.includes('<Footer />'), 'Must render <Footer />');
    assert.ok(layoutContent.includes('<slot />'), 'Must render default content <slot />');

    // SitemapFast auto-discovery link
    assert.ok(
      layoutContent.includes('<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap-index.xml" />'),
      'Must contain exact SitemapFast auto-discovery link'
    );

    // Canonical link tag
    assert.ok(layoutContent.includes('<link rel="canonical"'), 'Must contain canonical link tag');

    // Solid matte background token on root wrapper
    assert.ok(layoutContent.includes('bg-[#060A1A]'), 'Must use Abyssal Background #060A1A');
  });
});

describe('Adversarial M2.2: Comprehensive SVG Asset Integrity in public/', () => {
  const publicDir = path.join(PROJECT_ROOT, 'public');
  assert.ok(fs.existsSync(publicDir), 'public/ directory must exist');

  const files = fs.readdirSync(publicDir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));

  test('ADV-M2.2.13: public/ contains both required SVG assets', () => {
    assert.ok(svgFiles.includes('logo-mariposa-con-fondo-completo.svg'), 'Must contain logo-mariposa-con-fondo-completo.svg');
    assert.ok(svgFiles.includes('favicon.svg'), 'Must contain favicon.svg');
  });

  for (const svgFile of svgFiles) {
    const fullPath = path.join(publicDir, svgFile);
    const content = fs.readFileSync(fullPath, 'utf8');
    const stats = fs.statSync(fullPath);

    test(`ADV-M2.2.14: SVG [${svgFile}] XML validity, root tag and square viewBox`, () => {
      // Non-empty and >1MB for official vector logo/favicon
      assert.ok(stats.size > 1024 * 1024, `${svgFile} should be > 1MB (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

      // Starts with <svg or xml declaration followed by <svg
      assert.ok(content.includes('<svg'), `${svgFile} must contain <svg root tag`);
      assert.ok(content.includes('</svg>'), `${svgFile} must have closing </svg> tag`);
      assert.ok(content.includes('xmlns="http://www.w3.org/2000/svg"'), `${svgFile} must declare svg namespace`);

      // ViewBox validation: 4 components, square aspect ratio
      const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/);
      assert.ok(viewBoxMatch, `${svgFile} must specify viewBox`);

      const parts = viewBoxMatch[1].trim().split(/\s+/).map(Number);
      assert.equal(parts.length, 4, `${svgFile} viewBox must have 4 numbers`);
      assert.ok(!isNaN(parts[2]) && !isNaN(parts[3]), `${svgFile} width and height in viewBox must be numeric`);
      assert.equal(parts[2], parts[3], `${svgFile} must have 1:1 square aspect ratio to prevent CLS`);
    });

    test(`ADV-M2.2.15: SVG [${svgFile}] Security Audit (Zero XSS / Scripts / Handlers)`, () => {
      assert.ok(!content.includes('<script'), `${svgFile} must not contain <script> tags`);
      assert.ok(!content.includes('</script>'), `${svgFile} must not contain closing script tags`);
      assert.ok(!/onload\s*=/i.test(content), `${svgFile} must not contain onload handlers`);
      assert.ok(!/onerror\s*=/i.test(content), `${svgFile} must not contain onerror handlers`);
      assert.ok(!/onclick\s*=/i.test(content), `${svgFile} must not contain onclick handlers`);
      assert.ok(!/onmouseover\s*=/i.test(content), `${svgFile} must not contain onmouseover handlers`);
      assert.ok(!/javascript\s*:/i.test(content), `${svgFile} must not contain javascript: URLs`);
    });
  }

  test('ADV-M2.2.16: Official logo contains interactive CSS animations (:hover, @keyframes)', () => {
    const logoContent = fs.readFileSync(path.join(publicDir, 'logo-mariposa-con-fondo-completo.svg'), 'utf8');
    assert.ok(logoContent.includes(':hover'), 'Logo must contain :hover interactive CSS rules');
    assert.ok(logoContent.includes('@keyframes'), 'Logo must contain @keyframes CSS animation definitions');
    assert.ok(logoContent.includes('transform'), 'Logo must contain CSS transform declarations');
  });
});
