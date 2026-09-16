/**
 * ADVERSARIAL DEEP DIVE TEST SUITE FOR R3 & R4
 * Challenger: teamwork_preview_challenger_geom2_2
 * Uses Node.js native test runner and Intl.Segmenter
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

const dolencias = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'dataset_biodescodificacion_dolencias.json'), 'utf8'));
const eeatCities = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'dataset_almaholistica_ciudades_eeat_geo.json'), 'utf8'));

describe('R3 Deep Adversarial Stress: Intl.Segmenter & DOM Structure across 45 Dolencias', () => {
  const segmenter = new Intl.Segmenter('es', { granularity: 'word' });

  for (const dol of dolencias) {
    test(`R3: ${dol.slug} — RAG block bounds, Intl.Segmenter, and 3 valid JSON-LD schemas`, () => {
      const htmlPath = path.join(DIST_DIR, 'biodescodificacion', dol.slug, 'index.html');
      assert.ok(fs.existsSync(htmlPath), `HTML file for ${dol.slug} must exist`);

      const html = fs.readFileSync(htmlPath, 'utf8');

      // 1. RAG section presence and attributes
      const ragMatch = html.match(/<section\b[^>]*id=["']definicion-citabilidad-rag["'][^>]*>([\s\S]*?)<\/section>/i);
      assert.ok(ragMatch, `Must contain <section id="definicion-citabilidad-rag"> in ${dol.slug}`);

      const sectionHtml = ragMatch[1];
      assert.ok(html.includes('aria-label="Definición Clínica y Citabilidad RAG"'), `Missing aria-label in ${dol.slug}`);
      assert.ok(sectionHtml.includes(`¿Qué es la Biodescodificación de ${dol.nombre}?`), `Missing h2 heading with dolencia name in ${dol.slug}`);

      // 2. Extract paragraphs
      const pMatches = [...sectionHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)];
      assert.ok(pMatches.length >= 2, `Must contain at least 2 paragraphs in ${dol.slug}, found ${pMatches.length}`);

      const p1 = pMatches[0][1].replace(/<[^>]+>/g, ' ').trim();
      const p2 = pMatches[1][1].replace(/<[^>]+>/g, ' ').trim();
      const fullPassage = `${p1} ${p2}`;

      // 3. Word counts via whitespace
      const wordsWhitespace = fullPassage.split(/\s+/).filter(Boolean);
      assert.ok(
        wordsWhitespace.length >= 130 && wordsWhitespace.length <= 170,
        `Whitespace word count (${wordsWhitespace.length}) out of [130, 170] in ${dol.slug}`
      );
      assert.ok(
        wordsWhitespace.length >= 134 && wordsWhitespace.length <= 167,
        `Target word count (${wordsWhitespace.length}) out of [134, 167] in ${dol.slug}`
      );

      // 4. Word counts via Intl.Segmenter
      const segments = [...segmenter.segment(fullPassage)].filter(s => s.isWordLike);
      assert.ok(
        segments.length >= 130 && segments.length <= 170,
        `Intl.Segmenter word count (${segments.length}) out of [130, 170] in ${dol.slug}`
      );

      // 5. Schema verification: exactly 3 schemas
      const scriptMatches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
      assert.strictEqual(scriptMatches.length, 3, `Expected exactly 3 schemas in ${dol.slug}, got ${scriptMatches.length}`);

      const types = new Set();
      for (const sm of scriptMatches) {
        const parsed = JSON.parse(sm[1]);
        types.add(parsed['@type']);
      }
      assert.ok(types.has('MedicalWebPage'), `Missing MedicalWebPage schema in ${dol.slug}`);
      assert.ok(types.has('FAQPage'), `Missing FAQPage schema in ${dol.slug}`);
      assert.ok(types.has('BreadcrumbList'), `Missing BreadcrumbList schema in ${dol.slug}`);
    });
  }
});

describe('R4 Deep Adversarial Stress: Initials, Badges, 4 Pillars, and Schemas across 113 Cities', () => {
  const cityMap = new Map(eeatCities.map(c => [c['URL Final (Slug)'].trim().toLowerCase(), c]));

  for (const [slug, data] of cityMap.entries()) {
    test(`R4: ${slug} (${data['Ciudad']}, ${data['País']}) — Specialist, registration, initials badge, and 2 schemas`, () => {
      const dirName = `biodescodificacion-${slug}`;
      const htmlPath = path.join(DIST_DIR, dirName, 'index.html');
      assert.ok(fs.existsSync(htmlPath), `HTML file for city ${slug} must exist at ${htmlPath}`);

      const html = fs.readFileSync(htmlPath, 'utf8');

      // 1. Specialist and Initials Badge
      const specName = data['EEAT_Especialista_Nombre'];
      assert.ok(html.includes(specName), `HTML must contain specialist ${specName} for ${slug}`);

      let expectedInitials = 'AH';
      if (specName.includes('Sofía Alarcón')) expectedInitials = 'SA';
      else if (specName.includes('Mateo Benavides')) expectedInitials = 'MB';
      else if (specName.includes('Elena Monsalve')) expectedInitials = 'EM';

      assert.ok(
        html.includes(`>${expectedInitials}<`) || html.includes(`>${expectedInitials} <`) || html.includes(expectedInitials),
        `HTML must display initials ${expectedInitials} for specialist ${specName} in ${slug}`
      );

      // 2. Registration code
      const regMatch = data['EEAT_Especialista_Registro'].match(/[A-Z]{3}-\d{4}/);
      assert.ok(regMatch, `Registration code must exist in dataset for ${slug}`);
      assert.ok(html.includes(regMatch[0]), `Registration code ${regMatch[0]} must be in HTML for ${slug}`);

      // 3. 4 Methodology pillars
      assert.ok(html.includes('PNI Clínica') || html.includes('Psiconeuroinmunología'), `Missing PNI in ${slug}`);
      assert.ok(html.includes('Dr. R.G. Hamer') || html.includes('Hamer'), `Missing Hamer in ${slug}`);
      assert.ok(html.includes('Christian Flèche') || html.includes('Flèche'), `Missing Flèche in ${slug}`);
      assert.ok(html.includes('Dr. Bruce Lipton') || html.includes('Lipton'), `Missing Lipton in ${slug}`);

      // 4. Local cases & ethical disclaimer
      assert.ok(html.includes('Casos en ') || html.includes('EXPERIENCIA CLÍNICA LOCAL'), `Missing local cases in ${slug}`);
      assert.ok(html.includes('Compromiso Ético y Descargo de Responsabilidad Médica:'), `Missing disclaimer heading in ${slug}`);

      // 5. Schema verification: exactly 2 schemas
      const scriptMatches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
      assert.strictEqual(scriptMatches.length, 2, `City ${slug} must have exactly 2 schemas, got ${scriptMatches.length}`);

      const types = new Set();
      for (const sm of scriptMatches) {
        const parsed = JSON.parse(sm[1]);
        types.add(parsed['@type']);
      }
      assert.ok(types.has('HealthAndBeautyBusiness'), `Missing HealthAndBeautyBusiness in ${slug}`);
      assert.ok(types.has('BreadcrumbList'), `Missing BreadcrumbList in ${slug}`);
    });
  }
});
