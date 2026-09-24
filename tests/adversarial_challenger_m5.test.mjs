/**
 * tests/adversarial_challenger_m5.test.mjs
 * Suite Adversarial de Verificación Empírica — Milestone M5 (Sitemaps & Schemas)
 * Agente: teamwork_preview_challenger_m5_1 (EMPIRICAL CHALLENGER)
 * 
 * Verifica con oráculos estrictos y pruebas de estrés adversariales:
 * 1. Mapeo biunívoco 1:1 entre URLs de public/sitemap-0.xml y archivos HTML en dist/ (180 URLs = 180 HTML)
 * 2. Validación estructural de XML (sitemap-index.xml, sitemap-0.xml, sitemap.xml, robots.txt)
 * 3. Pruebas de estrés adversariales en src/lib/schema.ts con entradas malformadas, extremas y Unicode
 * 4. Censo e integridad de schemas JSON-LD en la totalidad de páginas generadas en dist/
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
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Carga en memoria de src/lib/schema.ts emulando el compilador de Astro/Vite
const schemaBuild = esbuild.buildSync({
  entryPoints: [path.join(ROOT_DIR, 'src/lib/schema.ts')],
  bundle: true,
  write: false,
  format: 'esm'
});
const schemaCode = schemaBuild.outputFiles[0].text;
const schemaModule = await import(`data:text/javascript;base64,${Buffer.from(schemaCode).toString('base64')}`);

const {
  buildMedicalWebPageSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  buildLocalServiceSchema
} = schemaModule;

// Carga de SITE_CONFIG para validación cruzada
const siteBuild = esbuild.buildSync({
  entryPoints: [path.join(ROOT_DIR, 'src/config/site.ts')],
  bundle: true,
  write: false,
  format: 'esm'
});
const siteCode = siteBuild.outputFiles[0].text;
const siteModule = await import(`data:text/javascript;base64,${Buffer.from(siteCode).toString('base64')}`);
const { SITE_CONFIG } = siteModule;

// ============================================================================
// SUITE 1: MAPEO BIUNÍVOCO 1:1 (SITEMAP-0.XML <-> DIST HTML)
// ============================================================================
describe('Adversarial Challenge M5.1: Mapeo Biunívoco 1:1 (180 URLs = 180 HTML)', () => {
  const sitemap0Path = path.join(PUBLIC_DIR, 'sitemap-0.xml');
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');

  test('ADV-M5.1.1: public/sitemap-0.xml contiene exactamente 180 URLs únicas', () => {
    assert.ok(fs.existsSync(sitemap0Path), 'public/sitemap-0.xml debe existir');
    const content = fs.readFileSync(sitemap0Path, 'utf8');
    const matches = [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

    assert.equal(matches.length, 180, `Se esperaban 180 URLs en sitemap-0.xml, se hallaron ${matches.length}`);
    const uniqueSet = new Set(matches);
    assert.equal(uniqueSet.size, 180, 'No deben existir URLs duplicadas en sitemap-0.xml');
  });

  test('ADV-M5.1.2: public/sitemap.xml contiene las mismas 180 URLs que sitemap-0.xml', () => {
    assert.ok(fs.existsSync(sitemapPath), 'public/sitemap.xml debe existir');
    const content0 = fs.readFileSync(sitemap0Path, 'utf8');
    const contentLegacy = fs.readFileSync(sitemapPath, 'utf8');
    const urls0 = [...content0.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    const urlsLegacy = [...contentLegacy.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

    assert.equal(urlsLegacy.length, 180);
    assert.deepEqual(urlsLegacy, urls0, 'sitemap.xml y sitemap-0.xml deben contener la secuencia exacta de URLs');
  });

  test('ADV-M5.1.3: dist/ contiene exactamente 180 archivos HTML generados', () => {
    assert.ok(fs.existsSync(DIST_DIR), 'dist/ debe existir tras npm run build');

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
      return results;
    }

    const htmlFiles = collectHtmlFiles(DIST_DIR);
    assert.equal(htmlFiles.length, 180, `Se esperaban 180 archivos HTML en dist/, pero se encontraron ${htmlFiles.length}`);
  });

  test('ADV-M5.1.4: Cada URL de sitemap-0.xml mapea 1:1 a un archivo HTML físico no vacío en dist/', () => {
    const content = fs.readFileSync(sitemap0Path, 'utf8');
    const urls = [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

    for (const url of urls) {
      assert.ok(url.startsWith('https://almaholistica.com/'), `URL debe comenzar con dominio oficial: ${url}`);
      assert.ok(url.endsWith('/'), `URL debe terminar en trailing slash estricto: ${url}`);

      const pathPart = url.slice('https://almaholistica.com/'.length).replace(/\/+$/, '');
      const expectedHtmlPath = pathPart === ''
        ? path.join(DIST_DIR, 'index.html')
        : path.join(DIST_DIR, pathPart, 'index.html');

      assert.ok(fs.existsSync(expectedHtmlPath), `Archivo HTML faltante para URL: ${url} en ${expectedHtmlPath}`);
      const stats = fs.statSync(expectedHtmlPath);
      assert.ok(stats.size > 500, `Archivo HTML demasiado pequeño o vacío (${stats.size} bytes): ${expectedHtmlPath}`);
    }
  });

  test('ADV-M5.1.5: Cada archivo HTML en dist/ corresponde a una URL en sitemap-0.xml (diferencia simétrica vacía)', () => {
    const content = fs.readFileSync(sitemap0Path, 'utf8');
    const urls = [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

    const expectedFiles = new Set(urls.map(url => {
      const pathPart = url.slice('https://almaholistica.com/'.length).replace(/\/+$/, '');
      return pathPart === ''
        ? path.resolve(DIST_DIR, 'index.html')
        : path.resolve(DIST_DIR, pathPart, 'index.html');
    }));

    function collectHtmlFiles(dir) {
      let results = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(collectHtmlFiles(full));
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
          results.push(path.resolve(full));
        }
      }
      return results;
    }

    const actualFiles = new Set(collectHtmlFiles(DIST_DIR));
    assert.equal(actualFiles.size, 180);

    // Symmetric difference
    const diff1 = [...expectedFiles].filter(x => !actualFiles.has(x));
    const diff2 = [...actualFiles].filter(x => !expectedFiles.has(x));
    assert.deepEqual(diff1, [], `Archivos esperados pero no encontrados: ${JSON.stringify(diff1)}`);
    assert.deepEqual(diff2, [], `Archivos encontrados no listados en sitemap: ${JSON.stringify(diff2)}`);
  });

  test('ADV-M5.1.6: Réplica exacta de sitemaps y robots.txt en dist/', () => {
    const filesToVerify = ['sitemap-0.xml', 'sitemap.xml', 'sitemap-index.xml', 'robots.txt'];
    for (const f of filesToVerify) {
      const pubFile = path.join(PUBLIC_DIR, f);
      const distFile = path.join(DIST_DIR, f);
      assert.ok(fs.existsSync(distFile), `Archivo de réplica faltante en dist/: ${f}`);
      const pubBuf = fs.readFileSync(pubFile);
      const distBuf = fs.readFileSync(distFile);
      assert.ok(pubBuf.equals(distBuf), `Discrepancia en contenido entre public/${f} y dist/${f}`);
    }
  });
});

// ============================================================================
// SUITE 2: VALIDACIÓN ESTRUCTURAL DE XML Y PROTOCOLO SITEMAPS.ORG
// ============================================================================
describe('Adversarial Challenge M5.2: Validación Estructural de XML y Protocolos', () => {
  const sitemap0Path = path.join(PUBLIC_DIR, 'sitemap-0.xml');
  const sitemapIndexPath = path.join(PUBLIC_DIR, 'sitemap-index.xml');
  const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');

  test('ADV-M5.2.1: sitemap-index.xml cumple con el protocolo XML de sitemapindex', () => {
    const content = fs.readFileSync(sitemapIndexPath, 'utf8').trim();
    assert.ok(content.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Declaración XML requerida');
    assert.ok(content.includes('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'Namespace xmlns requerido');
    assert.ok(content.endsWith('</sitemapindex>'), 'Cierre de sitemapindex');

    const sitemapMatches = [...content.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)];
    assert.equal(sitemapMatches.length, 1, 'sitemap-index.xml debe apuntar a exactamente 1 sitemap (sitemap-0.xml)');

    const locMatch = content.match(/<loc>(.*?)<\/loc>/);
    assert.ok(locMatch, '<loc> debe existir en <sitemap>');
    assert.equal(locMatch[1], 'https://almaholistica.com/sitemap-0.xml');

    const lastmodMatch = content.match(/<lastmod>(.*?)<\/lastmod>/);
    assert.ok(lastmodMatch, '<lastmod> debe existir en <sitemap>');
    assert.match(lastmodMatch[1], /^\d{4}-\d{2}-\d{2}$/, 'lastmod debe tener formato YYYY-MM-DD');
  });

  test('ADV-M5.2.2: sitemap-0.xml cumple con esquema urlset y atributos por URL', () => {
    const content = fs.readFileSync(sitemap0Path, 'utf8').trim();
    assert.ok(content.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
    assert.ok(content.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
    assert.ok(content.endsWith('</urlset>'));

    const urlBlocks = [...content.matchAll(/<url>([\s\S]*?)<\/url>/g)];
    assert.equal(urlBlocks.length, 180);

    const validChangefreqs = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']);

    for (let i = 0; i < urlBlocks.length; i++) {
      const block = urlBlocks[i][1];
      const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
      const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
      const changefreq = block.match(/<changefreq>(.*?)<\/changefreq>/)?.[1];
      const priority = block.match(/<priority>(.*?)<\/priority>/)?.[1];

      assert.ok(loc, `URL bloque #${i + 1} no tiene <loc>`);
      assert.ok(lastmod, `URL bloque #${i + 1} no tiene <lastmod>`);
      assert.ok(changefreq, `URL bloque #${i + 1} no tiene <changefreq>`);
      assert.ok(priority, `URL bloque #${i + 1} no tiene <priority>`);

      assert.match(lastmod, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(validChangefreqs.has(changefreq), `changefreq inválido: ${changefreq}`);

      const numPriority = parseFloat(priority);
      assert.ok(!isNaN(numPriority) && numPriority >= 0.0 && numPriority <= 1.0, `priority fuera de rango: ${priority}`);

      // Comprobación de jerarquía de prioridades
      if (loc === 'https://almaholistica.com/') {
        assert.equal(priority, '1.0', 'Home debe tener prioridad 1.0');
        assert.equal(changefreq, 'daily', 'Home debe tener frecuencia daily');
      } else if (loc === 'https://almaholistica.com/biodescodificacion/') {
        assert.equal(priority, '0.9', 'Catálogo debe tener prioridad 0.9');
        assert.equal(changefreq, 'weekly', 'Catálogo debe tener frecuencia weekly');
      } else {
        assert.equal(priority, '0.8', 'Rutas de ciudades y dolencias deben tener prioridad 0.8');
        assert.equal(changefreq, 'weekly');
      }
    }
  });

  test('ADV-M5.2.3: robots.txt tiene sintaxis estricta y doble puntero a sitemaps', () => {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    assert.ok(robots.includes('User-agent: *'), 'Debe permitir User-agent: *');
    assert.ok(robots.includes('Allow: /'), 'Debe incluir Allow: /');
    assert.ok(robots.includes('Sitemap: https://almaholistica.com/sitemap-index.xml'), 'Debe referenciar sitemap-index.xml');
    assert.ok(robots.includes('Sitemap: https://almaholistica.com/sitemap.xml'), 'Debe referenciar sitemap.xml');
  });
});

// ============================================================================
// SUITE 3: PRUEBAS DE ESTRÉS ADVERSARIALES EN SRC/LIB/SCHEMA.TS
// ============================================================================
describe('Adversarial Challenge M5.3: Stress Testing de src/lib/schema.ts', () => {

  describe('FAQ Schema Stress & Fallbacks', () => {
    test('ADV-M5.3.1: buildFAQSchema retorna null ante undefined, null o array vacío', () => {
      assert.equal(buildFAQSchema(undefined), null);
      assert.equal(buildFAQSchema(null), null);
      assert.equal(buildFAQSchema([]), null);
    });

    test('ADV-M5.3.2: buildFAQSchema resiste array con cadenas vacías y serializa JSON válido', () => {
      const emptyFaqs = [
        { pregunta: '', respuesta: '' },
        { pregunta: '   ', respuesta: '   ' }
      ];
      const schema = buildFAQSchema(emptyFaqs);
      assert.notEqual(schema, null);
      assert.equal(schema['@type'], 'FAQPage');
      assert.equal(schema.mainEntity.length, 2);

      const json = JSON.stringify(schema);
      assert.doesNotThrow(() => JSON.parse(json));
    });

    test('ADV-M5.3.3: buildFAQSchema resiste caracteres especiales, HTML y scripts maliciosos (XSS injection)', () => {
      const maliciousFaqs = [
        {
          pregunta: '<script>alert("XSS")</script> ¿Es seguro el tratamiento?',
          respuesta: 'Totalmente seguro. "Test" & \'Single\' & <b>bold</b>. </script><svg onload=alert(1)>'
        },
        {
          pregunta: '¿Inyecciones SQL? \'; DROP TABLE users; --',
          respuesta: 'No aplican en sitios estáticos SSG \\0 \\r \\n \t.'
        }
      ];

      const schema = buildFAQSchema(maliciousFaqs);
      assert.notEqual(schema, null);
      const json = JSON.stringify(schema);
      const parsed = JSON.parse(json);
      assert.equal(parsed.mainEntity[0].name, maliciousFaqs[0].pregunta);
      assert.equal(parsed.mainEntity[0].acceptedAnswer.text, maliciousFaqs[0].respuesta);
    });

    test('ADV-M5.3.4: buildFAQSchema escala a 1,000 elementos sin degradación ni stack overflow', () => {
      const bigFaqs = Array.from({ length: 1000 }, (_, i) => ({
        pregunta: `Pregunta terapéutica número ${i + 1}?`,
        respuesta: `Respuesta biológica detallada número ${i + 1} con texto extendido.`
      }));

      const t0 = performance.now();
      const schema = buildFAQSchema(bigFaqs);
      const t1 = performance.now();

      assert.notEqual(schema, null);
      assert.equal(schema.mainEntity.length, 1000);
      assert.ok(t1 - t0 < 50, `La generación de 1,000 FAQs debe tardar <50ms (tardó ${(t1 - t0).toFixed(2)}ms)`);

      const json = JSON.stringify(schema);
      assert.doesNotThrow(() => JSON.parse(json));
    });
  });

  describe('MedicalWebPage Schema Stress & Injection', () => {
    test('ADV-M5.3.5: buildMedicalWebPageSchema maneja cadenas vacías sin lanzar excepción', () => {
      const emptyDolencia = {
        slug: '',
        nombre: '',
        sistema: '',
        conflictoEmocional: '',
        sentidoBiologico: '',
        reprogramacion: '',
        preguntasReflexion: [],
        faqs: [],
        ganchoAgendamiento: ''
      };

      const schema = buildMedicalWebPageSchema(emptyDolencia, 'https://almaholistica.com/test/');
      assert.equal(schema['@context'], 'https://schema.org');
      assert.equal(schema['@type'], 'MedicalWebPage');
      assert.equal(schema.name, 'Biodescodificación de ');
      assert.equal(schema.about['@type'], 'MedicalCondition');
      assert.equal(schema.about.possibleTreatment['@type'], 'MedicalTherapy');

      const json = JSON.stringify(schema);
      assert.doesNotThrow(() => JSON.parse(json));
    });

    test('ADV-M5.3.6: buildMedicalWebPageSchema soporta Unicode complejo, diacríticos y emojis', () => {
      const unicodeDolencia = {
        slug: 'ansiedad-emocional',
        nombre: 'Ansiedad Crónica 🧘‍♀️ — Estrés & Taquicardia (心臓 / قلق)',
        sistema: 'Sistema Nervioso & Emocional 🧠✨',
        conflictoEmocional: 'Miedo al porvenir, hipercontrol y sensación de "no tener tiempo" ⏳.',
        sentidoBiologico: 'Aceleración cardíaca para huir del depredador invisible 🐆.',
        reprogramacion: 'Aceptación del instante presente y relajación del sistema vago.',
        preguntasReflexion: ['¿A qué le temes?'],
        faqs: [],
        ganchoAgendamiento: 'Agenda tu consulta'
      };

      const schema = buildMedicalWebPageSchema(unicodeDolencia, 'https://almaholistica.com/biodescodificacion/ansiedad-emocional/');
      assert.ok(schema.name.includes('🧘‍♀️'));
      assert.ok(schema.about.associatedPathophysiology.includes('🐆'));

      const json = JSON.stringify(schema);
      const parsed = JSON.parse(json);
      assert.equal(parsed.about.name, unicodeDolencia.nombre);
      assert.equal(parsed.about.associatedPathophysiology, unicodeDolencia.sentidoBiologico);
    });

    test('ADV-M5.3.7: buildMedicalWebPageSchema soporta cargas masivas de 50KB de texto', () => {
      const massiveText = 'Conflicto biológico profundo. '.repeat(2000); // ~60KB
      const massiveDolencia = {
        slug: 'gastritis',
        nombre: 'Gastritis Masiva',
        sistema: 'Digestivo',
        conflictoEmocional: massiveText,
        sentidoBiologico: massiveText,
        reprogramacion: 'Reprogramación',
        preguntasReflexion: [],
        faqs: [],
        ganchoAgendamiento: 'Agendar'
      };

      const schema = buildMedicalWebPageSchema(massiveDolencia, 'https://almaholistica.com/biodescodificacion/gastritis/');
      const json = JSON.stringify(schema);
      assert.ok(json.length > 100000);
      const parsed = JSON.parse(json);
      assert.equal(parsed.description.length, massiveText.length);
    });
  });

  describe('Breadcrumb Schema Stress', () => {
    test('ADV-M5.3.8: buildBreadcrumbSchema maneja array vacío y listas grandes con posiciones 1-indexadas', () => {
      const emptySchema = buildBreadcrumbSchema([]);
      assert.equal(emptySchema['@type'], 'BreadcrumbList');
      assert.deepEqual(emptySchema.itemListElement, []);

      const items50 = Array.from({ length: 50 }, (_, i) => ({
        name: `Nivel ${i + 1}`,
        url: `https://almaholistica.com/nivel-${i + 1}/`
      }));

      const schema = buildBreadcrumbSchema(items50);
      assert.equal(schema.itemListElement.length, 50);

      // Verificar que las posiciones son enteros estrictos 1-indexados secuenciales
      for (let i = 0; i < 50; i++) {
        assert.equal(schema.itemListElement[i].position, i + 1);
        assert.equal(schema.itemListElement[i]['@type'], 'ListItem');
        assert.equal(schema.itemListElement[i].name, `Nivel ${i + 1}`);
        assert.equal(schema.itemListElement[i].item, `https://almaholistica.com/nivel-${i + 1}/`);
      }

      const json = JSON.stringify(schema);
      assert.doesNotThrow(() => JSON.parse(json));
    });
  });

  describe('LocalService Schema Stress & Multi-Schema Polymorphism', () => {
    test('ADV-M5.3.9: buildLocalServiceSchema resiste objeto vacío {} aplicando fallbacks seguros', () => {
      const emptyCity = {};
      const schema = buildLocalServiceSchema(emptyCity, 'https://almaholistica.com/local/');

      assert.equal(schema['@context'], 'https://schema.org');
      assert.equal(schema['@type'], 'HealthAndBeautyBusiness');
      assert.equal(schema.currenciesAccepted, 'USD');
      assert.ok(schema.priceRange.includes('USD'));
      assert.equal(schema.areaServed.name, 'Local');
      assert.equal(schema.telephone, `+${SITE_CONFIG.whatsappNumber}`);

      const json = JSON.stringify(schema);
      assert.doesNotThrow(() => JSON.parse(json));
    });

    test('ADV-M5.3.10: buildLocalServiceSchema procesa transparentemente objetos con nombres de columna CSV crudos', () => {
      const rawCsvCity = {
        'URL Final (Slug)': 'cordoba',
        'H1 Título': 'Terapia Holística en Córdoba',
        'Meta Descripción': 'Sesiones personalizadas en Córdoba, Argentina.',
        'País': 'Argentina',
        'Moneda': 'ARS',
        'Rango_Precio_Sesion': '$18.000 - $35.000 ARS'
      };

      const schema = buildLocalServiceSchema(rawCsvCity, 'https://almaholistica.com/cordoba/');
      assert.equal(schema.name, 'Alma Holística — Terapia Holística en Córdoba');
      assert.equal(schema.currenciesAccepted, 'ARS');
      assert.equal(schema.priceRange, '$18.000 - $35.000 ARS');
      assert.equal(schema.address.addressCountry, 'Argentina');
      assert.equal(schema.address.addressLocality, 'cordoba');
      assert.equal(schema.areaServed.containedInPlace.name, 'Argentina');

      const json = JSON.stringify(schema);
      const parsed = JSON.parse(json);
      assert.equal(parsed.currenciesAccepted, 'ARS');
    });

    test('ADV-M5.3.11: Oráculo Universal de Serialización: Cero NaN, undefined o funciones en JSON resultante', () => {
      const testCases = [
        buildMedicalWebPageSchema({
          slug: 'test',
          nombre: 'Test',
          sistema: 'Test',
          conflictoEmocional: 'Test',
          sentidoBiologico: 'Test',
          reprogramacion: 'Test',
          preguntasReflexion: [],
          faqs: [],
          ganchoAgendamiento: 'Test'
        }, 'https://almaholistica.com/test/'),
        buildFAQSchema([{ pregunta: 'P1', respuesta: 'R1' }]),
        buildBreadcrumbSchema([{ name: 'Home', url: 'https://almaholistica.com/' }]),
        buildLocalServiceSchema({ slug: 'lima', pais: 'Perú', moneda: 'PEN', rangoPrecio: '150 PEN' }, 'https://almaholistica.com/lima/')
      ];

      for (const item of testCases) {
        const str = JSON.stringify(item);
        assert.ok(!str.includes('undefined'), 'No debe existir "undefined" en JSON serializado');
        assert.ok(!str.includes('NaN'), 'No debe existir "NaN" en JSON serializado');
        assert.doesNotThrow(() => JSON.parse(str));
      }
    });
  });
});

// ============================================================================
// SUITE 4: AUDITORÍA FORENSE DE SCHEMAS EN DIST/*.HTML
// ============================================================================
describe('Adversarial Challenge M5.4: Auditoría Forense de Schemas en Archivos HTML Compilados', () => {
  test('ADV-M5.4.1: Censo exacto de schemas en las 180 páginas generadas', () => {
    let totalSchemas = 0;
    let cityPagesCount = 0;
    let countryPagesCount = 0;
    let dolenciaPagesCount = 0;

    const countrySlugs = new Set(
      JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/dataset_almaholistica_paises.json'), 'utf8')).map((c) => c.slug)
    );

    const pattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;

    function walk(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          walk(full);
        } else if (e.isFile() && e.name.endsWith('.html')) {
          const rel = path.relative(DIST_DIR, full);
          const html = fs.readFileSync(full, 'utf8');
          const matches = [...html.matchAll(pattern)].map(m => m[1]);

          if (rel === 'index.html' || rel === path.join('biodescodificacion', 'index.html')) {
            assert.equal(matches.length, 0, `Página de índice ${rel} no debe tener schemas de entidad individual`);
          } else if (rel.startsWith('biodescodificacion' + path.sep)) {
            // Página de dolencia: MedicalWebPage + FAQPage + BreadcrumbList = 3
            assert.equal(matches.length, 3, `Página de dolencia ${rel} debe contener exactamente 3 schemas JSON-LD`);
            dolenciaPagesCount++;
            totalSchemas += matches.length;
          } else if (countrySlugs.has(rel.split(path.sep)[0])) {
            // Página de hub de país: MedicalWebPage + FAQPage + BreadcrumbList = 3
            assert.equal(matches.length, 3, `Página de hub de país ${rel} debe contener exactamente 3 schemas JSON-LD`);
            countryPagesCount++;
            totalSchemas += matches.length;
          } else {
            // Página de ciudad: HealthAndBeautyBusiness + BreadcrumbList = 2
            assert.equal(matches.length, 2, `Página de ciudad ${rel} debe contener exactamente 2 schemas JSON-LD`);
            cityPagesCount++;
            totalSchemas += matches.length;
          }

          // Verificar que cada bloque es JSON estrictamente válido
          for (const m of matches) {
            let parsed;
            assert.doesNotThrow(() => {
              parsed = JSON.parse(m.trim());
            }, `JSON-LD inválido o malformado en ${rel}`);
            assert.equal(parsed['@context'], 'https://schema.org', `Context inválido en ${rel}`);
            assert.ok(parsed['@type'], `Type faltante en ${rel}`);
          }
        }
      }
    }

    walk(DIST_DIR);

    assert.equal(cityPagesCount, 113, 'Deben existir exactamente 113 páginas de ciudades en dist/');
    assert.equal(countryPagesCount, 20, 'Deben existir exactamente 20 páginas de hubs de país en dist/');
    assert.equal(dolenciaPagesCount, 45, 'Deben existir exactamente 45 páginas de dolencias en dist/');
    assert.equal(totalSchemas, 421, 'Deben existir exactamente 421 bloques JSON-LD en todo el sitio compilado (113*2 + 45*3 + 20*3)');
  });
});
