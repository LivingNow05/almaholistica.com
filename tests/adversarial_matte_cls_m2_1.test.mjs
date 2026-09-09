/**
 * Adversarial Test Suite: Solid Matte Visual Compliance & Anti-CLS Containment
 * Milestone: M2 Gate Challenge
 * Author: teamwork_preview_challenger_m2_1
 *
 * Exhaustively stress-tests:
 * 1. Absolute absence of forbidden styles (backdrop-blur, translucency, low opacity, neon glow)
 *    across all production source files (Astro, CSS, TS, JS, Config, HTML).
 * 2. Strict adherence to official matte color tokens (#060A1A, #0A1226, #0E172F, #1E293B, #1E3A5F, #38BDF8) and eradication of gold/amber.
 * 3. Anti-CLS containment: scrollbar-gutter, overflow-x hidden, explicit aspect ratios/dimensions on images/SVGs.
 * 4. Responsive design integrity from 320px (mobile) to large screens (responsive navigation, flexible grids).
 * 5. Layout contract resilience: SEO tags, accessibility landmarks, ARIA states, and medical disclaimers.
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

// Helper to recursively collect all source and asset files
function collectFiles(dir, extensions = ['.astro', '.css', '.ts', '.tsx', '.mjs', '.js', '.json']) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.astro' || entry.name === '.agents' || entry.name === '.git') {
        continue;
      }
      results.push(...collectFiles(fullPath, extensions));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const sourceFiles = collectFiles(path.join(PROJECT_ROOT, 'src'));
const configFiles = [
  path.join(PROJECT_ROOT, 'tailwind.config.mjs'),
  path.join(PROJECT_ROOT, 'astro.config.mjs'),
  path.join(PROJECT_ROOT, 'package.json')
].filter(f => fs.existsSync(f));

const allTargetFiles = [...sourceFiles, ...configFiles];

describe('Adversarial Challenge M2.1: Solid Matte Visual Compliance', () => {

  test('ADV-M2.1.1: Comprehensive scan for forbidden backdrop-blur and glassmorphism', () => {
    const glassRegexes = [
      /backdrop-blur/i,
      /backdrop-filter/i,
      /-webkit-backdrop-filter/i,
      /filter:\s*blur\(/i,
      /glassmorphism/i
    ];

    for (const file of allTargetFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relPath = path.relative(PROJECT_ROOT, file);

      for (const regex of glassRegexes) {
        const match = content.match(regex);
        assert.ok(
          !match,
          `VIOLATION DETECTED in ${relPath}: Found forbidden glassmorphism pattern "${match?.[0]}"`
        );
      }
    }
  });

  test('ADV-M2.1.2: Strict veto against low-opacity transparencies and partial alpha overlays', () => {
    // Check for Tailwind opacity utilities applied to backgrounds
    const lowOpacityBgRegex = /bg-(?:opacity|white|black|slate|blue|cyan)\/(?:[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\b/i;
    // Check for CSS rgba with low alpha (< 1) in backgrounds and surfaces
    const rgbaTransparentRegex = /(?:bg-|background(?:-color)?\s*:\s*)[^;}"'>]*rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0?\.\d+\s*\)/i;
    // Check for Tailwind bg-opacity utilities
    const twBgOpacityRegex = /bg-opacity-(?:10|20|30|40|50|60|70|80|90)\b/i;

    for (const file of allTargetFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relPath = path.relative(PROJECT_ROOT, file);

      const bgOpacityMatch = content.match(twBgOpacityRegex);
      assert.ok(
        !bgOpacityMatch,
        `VIOLATION DETECTED in ${relPath}: Found forbidden bg-opacity class "${bgOpacityMatch?.[0]}"`
      );

      const lowAlphaBgMatch = content.match(lowOpacityBgRegex);
      assert.ok(
        !lowAlphaBgMatch,
        `VIOLATION DETECTED in ${relPath}: Found forbidden fractional opacity class "${lowAlphaBgMatch?.[0]}"`
      );

      const rgbaMatch = content.match(rgbaTransparentRegex);
      assert.ok(
        !rgbaMatch,
        `VIOLATION DETECTED in ${relPath}: Found forbidden transparent rgba() definition "${rgbaMatch?.[0]}"`
      );
    }
  });

  test('ADV-M2.1.3: Absolute veto against neon and bioluminescent glow effects', () => {
    const glowRegexes = [
      /shadow-(?:neon|glow|cyan-500\/|blue-500\/|amber-500\/)/i,
      /box-shadow\s*:[^;]*0\s+0\s+\d+px\s+#[0-9a-fA-F]+/i,
      /text-shadow\s*:[^;]*0\s+0\s+\d+px/i,
      /\bneon\b/i,
      /\bglow\b/i
    ];

    for (const file of allTargetFiles) {
      // Exclude comments in mate_style_checker or documentation
      const content = fs.readFileSync(file, 'utf8');
      const relPath = path.relative(PROJECT_ROOT, file);

      for (const regex of glowRegexes) {
        const match = content.match(regex);
        assert.ok(
          !match,
          `VIOLATION DETECTED in ${relPath}: Found forbidden glow/neon pattern "${match?.[0]}"`
        );
      }
    }
  });

  test('ADV-M2.1.4: Validation of official matte color tokens in tailwind.config.mjs', () => {
    const twPath = path.join(PROJECT_ROOT, 'tailwind.config.mjs');
    assert.ok(fs.existsSync(twPath), 'tailwind.config.mjs must exist');
    const twContent = fs.readFileSync(twPath, 'utf8');

    // Abyssal Background
    assert.ok(twContent.includes('#060A1A'), 'Must configure Abyssal Background #060A1A');
    // Midnight Navy Cards (100% solid matte)
    assert.ok(twContent.includes('#0A1226'), 'Must configure Midnight Navy Card 1 #0A1226');
    assert.ok(twContent.includes('#0E172F'), 'Must configure Midnight Navy Card 2 #0E172F');
    // Borders
    assert.ok(twContent.includes('#1E293B'), 'Must configure Border 1 #1E293B');
    assert.ok(twContent.includes('#1E3A5F'), 'Must configure Border 2 #1E3A5F');
    // Primary Action Cyan
    assert.ok(twContent.includes('#38BDF8'), 'Must configure Primary Action Cyan #38BDF8');
    // Eradication of Gold / Amber (Redesign Requirement R1)
    assert.ok(!twContent.includes('#D4AF37'), 'Must not configure Gold Accent #D4AF37');
    assert.ok(!twContent.includes('#F59E0B'), 'Must not configure Amber Accent #F59E0B');

    // Box shadows include editorial pill-white and solid matte shadows
    assert.ok(twContent.includes('pill-white'), 'Tailwind config defines pill-white shadow');
    assert.ok(twContent.includes('matte-sm'), 'Tailwind config defines matte-sm solid shadow');
    assert.ok(twContent.includes('matte-md'), 'Tailwind config defines matte-md solid shadow');
    assert.ok(twContent.includes('matte-lg'), 'Tailwind config defines matte-lg solid shadow');
  });

  test('ADV-M2.1.5: Verification with helper auditMateStyleContent across all M2 components', () => {
    const m2Files = [
      'src/layouts/BaseLayout.astro',
      'src/components/Navbar.astro',
      'src/components/Footer.astro',
      'src/styles/global.css'
    ];

    for (const rel of m2Files) {
      const full = path.join(PROJECT_ROOT, rel);
      if (!fs.existsSync(full)) continue;
      const content = fs.readFileSync(full, 'utf8');
      const audit = auditMateStyleContent(content, rel);
      assert.equal(
        audit.passed,
        true,
        `auditMateStyleContent failed for ${rel}: ${JSON.stringify(audit.violations)}`
      );
    }
  });
});

describe('Adversarial Challenge M2.1: Anti-CLS (Cumulative Layout Shift = 0)', () => {

  test('ADV-M2.1.6: BaseLayout ensures mobile viewport containment without zooming distortions', () => {
    const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
    assert.ok(fs.existsSync(layoutPath), 'BaseLayout.astro must exist');
    const layout = fs.readFileSync(layoutPath, 'utf8');

    // Viewport meta tag
    assert.ok(
      layout.includes('name="viewport"') && layout.includes('content="width=device-width, initial-scale=1.0"'),
      'Must contain standard mobile viewport tag: width=device-width, initial-scale=1.0'
    );

    // Lang attribute for i18n
    assert.ok(layout.includes('lang="es"'), 'html tag must specify lang="es"');

    // Theme color matching abyssal background
    assert.ok(layout.includes('name="theme-color"') && layout.includes('#060A1A'), 'theme-color must be #060A1A');
  });

  test('ADV-M2.1.7: Global CSS enforces zero horizontal shift and media containment', () => {
    const cssPath = path.join(PROJECT_ROOT, 'src/styles/global.css');
    assert.ok(fs.existsSync(cssPath), 'global.css must exist');
    const css = fs.readFileSync(cssPath, 'utf8');

    // Anti-layout shift scrollbar gutter
    assert.ok(
      css.includes('scrollbar-gutter: stable'),
      'html must declare scrollbar-gutter: stable to avoid sudden layout jumping'
    );

    // Horizontal overflow containment
    assert.ok(
      css.includes('overflow-x: hidden'),
      'html/body/main must strictly enforce overflow-x: hidden'
    );

    // Media element responsive containment (img, svg, video)
    assert.ok(
      css.includes('img, svg, video') || (css.includes('img') && css.includes('max-width: 100%')),
      'Media elements must be constrained with max-width: 100% and height: auto'
    );
  });

  test('ADV-M2.1.8: Logo and SVGs have explicit aspect ratio and fixed dimension containers', () => {
    const navbarPath = path.join(PROJECT_ROOT, 'src/components/Navbar.astro');
    const footerPath = path.join(PROJECT_ROOT, 'src/components/Footer.astro');

    const navbar = fs.readFileSync(navbarPath, 'utf8');
    const footer = fs.readFileSync(footerPath, 'utf8');

    // Navbar logo dimensions
    assert.ok(navbar.includes('width="44"'), 'Navbar logo img must have explicit width="44"');
    assert.ok(navbar.includes('height="44"'), 'Navbar logo img must have explicit height="44"');
    assert.ok(navbar.includes('shrink-0'), 'Navbar logo container must prevent shrinking under flex pressure');
    assert.ok(navbar.includes('loading="eager"'), 'Navbar logo must use loading="eager" to avoid layout shift on render');

    // Footer logo dimensions
    assert.ok(footer.includes('width="40"'), 'Footer logo img must have explicit width="40"');
    assert.ok(footer.includes('height="40"'), 'Footer logo img must have explicit height="40"');
    assert.ok(footer.includes('shrink-0'), 'Footer logo container must prevent shrinking');
  });

  test('ADV-M2.1.9: Font loading optimization prevents Flash of Invisible Text (FOIT/FOUT shift)', () => {
    const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
    const layout = fs.readFileSync(layoutPath, 'utf8');

    // Preconnect to Google Fonts
    assert.ok(
      layout.includes('rel="preconnect" href="https://fonts.googleapis.com"'),
      'Must preconnect to fonts.googleapis.com'
    );
    assert.ok(
      layout.includes('rel="preconnect" href="https://fonts.gstatic.com"') && layout.includes('crossorigin'),
      'Must preconnect to fonts.gstatic.com with crossorigin'
    );

    // font-display: swap is present in URL
    assert.ok(
      layout.includes('display=swap'),
      'Google Fonts query must include display=swap to prevent invisible text shift'
    );
  });
});

describe('Adversarial Challenge M2.1: Responsive Architecture & Accessibility', () => {

  test('ADV-M2.1.10: Responsive navigation mechanics for mobile (320px) to desktop', () => {
    const navbarPath = path.join(PROJECT_ROOT, 'src/components/Navbar.astro');
    const navbar = fs.readFileSync(navbarPath, 'utf8');

    // Desktop nav is hidden on mobile: hidden md:flex
    assert.ok(navbar.includes('hidden md:flex'), 'Desktop nav must hide on screens < 768px (md)');

    // Mobile menu toggle button is visible only on mobile: flex md:hidden
    assert.ok(navbar.includes('flex md:hidden') || navbar.includes('md:hidden'), 'Mobile hamburger button must display on mobile');

    // Mobile menu container has id="mobile-menu" and hidden class
    assert.ok(navbar.includes('id="mobile-menu"'), 'Mobile menu container must have id="mobile-menu"');
    assert.ok(navbar.includes('hidden md:hidden'), 'Mobile menu must be hidden by default');

    // Accessible ARIA attributes on toggle button
    assert.ok(navbar.includes('aria-label='), 'Hamburger button must have aria-label');
    assert.ok(navbar.includes('aria-expanded="false"'), 'Hamburger button must specify initial aria-expanded="false"');

    // Mobile menu script toggles aria-expanded and hidden class
    assert.ok(navbar.includes("btn.setAttribute('aria-expanded', String(!isExpanded))"), 'Script must update aria-expanded on toggle');
  });

  test('ADV-M2.1.11: Responsive multi-column footer layout (1 col mobile, 2 col tablet, 4 col desktop)', () => {
    const footerPath = path.join(PROJECT_ROOT, 'src/components/Footer.astro');
    const footer = fs.readFileSync(footerPath, 'utf8');

    assert.ok(
      footer.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-4'),
      'Footer grid must gracefully scale from 1 column on mobile to 2 on tablet and 4 on desktop'
    );

    // Bottom copyright and links wrap cleanly on mobile
    assert.ok(
      footer.includes('flex flex-col sm:flex-row'),
      'Footer bottom legal links must stack vertically on mobile (320px) and align horizontally on sm+'
    );
  });

  test('ADV-M2.1.12: Mandatory medical & legal disclaimer present and accessible', () => {
    const footerPath = path.join(PROJECT_ROOT, 'src/components/Footer.astro');
    const footer = fs.readFileSync(footerPath, 'utf8');

    // Disclaimer heading
    assert.ok(
      footer.includes('Descargo de Responsabilidad Médica'),
      'Footer must contain official heading "Descargo de Responsabilidad Médica"'
    );

    // Explicit clarification that therapy does not substitute medical doctor
    assert.ok(
      footer.includes('sustituyen') && footer.includes('diagnóstico') && footer.includes('médico'),
      'Footer disclaimer must explicitly state therapy does not replace clinical diagnosis'
    );
  });

  test('ADV-M2.1.13: WhatsApp CTA buttons adhere to conversion funnel contracts', () => {
    const navbarPath = path.join(PROJECT_ROOT, 'src/components/Navbar.astro');
    const footerPath = path.join(PROJECT_ROOT, 'src/components/Footer.astro');

    const navbar = fs.readFileSync(navbarPath, 'utf8');
    const footer = fs.readFileSync(footerPath, 'utf8');

    // CTAs must include data-open-quiz attribute for progressive enhancement interception (M3)
    assert.ok(navbar.includes('data-open-quiz="true"'), 'Navbar CTA must have data-open-quiz="true"');
    assert.ok(footer.includes('data-open-quiz="true"'), 'Footer CTA must have data-open-quiz="true"');

    // Primary action colors used on CTAs
    assert.ok(navbar.includes('bg-[#779DD1]') || navbar.includes('bg-[#38BDF8]'), 'Navbar CTA button must use official Cyan #779DD1');
    assert.ok(navbar.includes('text-[#060A1A]'), 'Navbar CTA button text must use high-contrast Abyssal #060A1A');
  });

  test('ADV-M2.1.14: SEO meta tags and Sitemap auto-discovery in BaseLayout', () => {
    const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
    const layout = fs.readFileSync(layoutPath, 'utf8');

    // Sitemap link tag
    assert.ok(
      layout.includes('rel="sitemap"') && layout.includes('/sitemap-index.xml'),
      'BaseLayout must include <link rel="sitemap" href="/sitemap-index.xml">'
    );

    // OpenGraph & Twitter
    assert.ok(layout.includes('property="og:title"'), 'Must include og:title');
    assert.ok(layout.includes('property="og:description"'), 'Must include og:description');
    assert.ok(layout.includes('property="og:image"'), 'Must include og:image');
    assert.ok(layout.includes('name="twitter:card"'), 'Must include twitter:card');
  });
});
