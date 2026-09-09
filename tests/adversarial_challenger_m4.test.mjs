/**
 * tests/adversarial_challenger_m4.test.mjs
 * Suite Adversarial de Verificación Empírica — Milestone M4 (Dynamic SSG Routes & Pages)
 * Agente: challenger_m4_1 (teamwork_preview_challenger)
 * 
 * Verifica con oráculos estrictos y pruebas de estrés:
 * 1. Censo exacto de 160 páginas generadas estáticamente en dist/
 * 2. Ausencia de colisiones y resiliencia de normalización de slugs
 * 3. Consistencia biunívoca entre los 20 países y sus monedas
 * 4. Integridad del funnel de WhatsApp Quiz Modal (Patrón Fluffy)
 * 5. Schemas JSON-LD válidos y estructurados en cada página
 * 6. Cumplimiento de la estética sólida mate y prevención de CLS
 * 7. Memoización singleton y rendimiento O(1) bajo estrés
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getCities,
  getAllCities,
  getCityBySlug,
  getCitiesByCountry,
  getCitySlugs,
  normalizeSlug as normalizeCitySlug
} from '../src/lib/cities.ts';
import {
  getDolencias,
  getAllDolencias,
  getDolenciaBySlug,
  getDolenciasBySistema,
  getSistemas,
  getAllSistemas,
  getDolenciasSummaries,
  getDolenciaSlugs,
  normalizeSlug as normalizeDolenciaSlug
} from '../src/lib/dolencias.ts';
import { SITE_CONFIG, buildWhatsAppUrl } from '../src/config/site.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

describe('Adversarial Challenge M4.1: Censo de Rutas SSG y Generación Estática (160 Páginas)', () => {
  test('ADV-M4.1.1: dist/ contiene exactamente 160 archivos HTML generados', () => {
    assert.ok(fs.existsSync(DIST_DIR), 'El directorio dist/ debe existir tras npm run build');

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
    assert.equal(
      htmlFiles.length,
      160,
      `Se esperaban exactamente 160 archivos HTML en dist/, pero se encontraron ${htmlFiles.length}`
    );
  });

  test('ADV-M4.1.2: Censo exacto por categoría de página', () => {
    const cities = getCities();
    const dolencias = getDolencias();

    assert.equal(cities.length, 113, 'Deben existir exactamente 113 ciudades en el dataset');
    assert.equal(dolencias.length, 45, 'Deben existir exactamente 45 dolencias en el dataset');

    // 113 ciudades
    for (const city of cities) {
      const cityHtml = path.join(DIST_DIR, city.slug, 'index.html');
      assert.ok(
        fs.existsSync(cityHtml),
        `Falta el archivo HTML compilado para la ciudad ${city.slug} en ${cityHtml}`
      );
      const stat = fs.statSync(cityHtml);
      assert.ok(
        stat.size > 2000,
        `El HTML de la ciudad ${city.slug} es sospechosamente pequeño (${stat.size} bytes)`
      );
    }

    // 45 dolencias
    for (const dolencia of dolencias) {
      const bioHtml = path.join(DIST_DIR, 'biodescodificacion', dolencia.slug, 'index.html');
      assert.ok(
        fs.existsSync(bioHtml),
        `Falta el archivo HTML compilado para la dolencia ${dolencia.slug} en ${bioHtml}`
      );
      const stat = fs.statSync(bioHtml);
      assert.ok(
        stat.size > 2000,
        `El HTML de la dolencia ${dolencia.slug} es sospechosamente pequeño (${stat.size} bytes)`
      );
    }

    // Home y Catálogo de Dolencias
    const homeHtml = path.join(DIST_DIR, 'index.html');
    const catalogHtml = path.join(DIST_DIR, 'biodescodificacion', 'index.html');

    assert.ok(fs.existsSync(homeHtml), 'dist/index.html debe existir');
    assert.ok(fs.existsSync(catalogHtml), 'dist/biodescodificacion/index.html debe existir');

    assert.ok(fs.statSync(homeHtml).size > 5000, 'Home HTML debe ser sustancial');
    assert.ok(fs.statSync(catalogHtml).size > 5000, 'Catálogo HTML debe ser sustancial');
  });
});

describe('Adversarial Challenge M4.2: Robustez de Slugs y Prevención de Colisiones', () => {
  test('ADV-M4.2.1: Slugs de ciudades no colisionan con rutas estáticas ni entre sí', () => {
    const cities = getCities();
    const citySlugs = cities.map((c) => c.slug);

    const reservedNames = [
      'index',
      'biodescodificacion',
      'favicon.svg',
      'robots.txt',
      'sitemap-index.xml',
      'sitemap-0.xml',
      'sitemap.xml',
      'logo-mariposa-con-fondo-completo.svg',
      '404',
      'admin',
      'api'
    ];

    for (const slug of citySlugs) {
      assert.ok(
        !reservedNames.includes(slug),
        `El slug de ciudad "${slug}" colisiona con un nombre reservado`
      );
      assert.equal(slug, slug.toLowerCase(), `El slug "${slug}" debe estar en minúsculas`);
      assert.match(slug, /^[a-z0-9-]+$/, `El slug "${slug}" contiene caracteres no permitidos`);
    }

    const uniqueSlugs = new Set(citySlugs);
    assert.equal(
      uniqueSlugs.size,
      citySlugs.length,
      'Existen slugs de ciudades duplicados en el dataset'
    );
  });

  test('ADV-M4.2.2: Slugs de dolencias son únicos y no colisionan con index', () => {
    const dolencias = getDolencias();
    const slugs = dolencias.map((d) => d.slug);

    for (const slug of slugs) {
      assert.notEqual(slug, 'index', 'El slug de dolencia no puede ser "index"');
      assert.equal(slug, slug.toLowerCase(), `El slug "${slug}" debe estar en minúsculas`);
      assert.match(slug, /^[a-z0-9-]+$/, `El slug "${slug}" contiene caracteres no permitidos`);
    }

    const uniqueSlugs = new Set(slugs);
    assert.equal(uniqueSlugs.size, slugs.length, 'Existen slugs de dolencias duplicados');
  });

  test('ADV-M4.2.3: Stress-testing de normalización de slugs ante entradas adversariales', () => {
    const adversarialInputs = [
      { input: '   /BOGOTA/   ', expected: 'bogota' },
      { input: '///madrid///', expected: 'madrid' },
      { input: '  Buenos-Aires  ', expected: 'buenos-aires' },
      { input: '', expected: '' },
      { input: null, expected: '' },
      { input: undefined, expected: '' },
      { input: 12345, expected: '' }
    ];

    for (const { input, expected } of adversarialInputs) {
      assert.equal(normalizeCitySlug(input), expected);
      assert.equal(normalizeDolenciaSlug(input), expected);
    }
  });
});

describe('Adversarial Challenge M4.3: Determinismo Geográfico y Financiero (20 Países y Monedas)', () => {
  const EXPECTED_CURRENCY_BY_COUNTRY = {
    'Colombia': 'COP',
    'México': 'MXN',
    'Costa Rica': 'CRC',
    'El Salvador': 'USD',
    'Guatemala': 'GTQ',
    'Honduras': 'HNL',
    'Nicaragua': 'NIO',
    'Panamá': 'USD',
    'República Dominicana': 'DOP',
    'Argentina': 'ARS',
    'Bolivia': 'BOB',
    'Brasil': 'BRL',
    'Chile': 'CLP',
    'Ecuador': 'USD',
    'Paraguay': 'PYG',
    'Perú': 'PEN',
    'Uruguay': 'UYU',
    'Venezuela': 'USD',
    'España': 'EUR',
    'Estados Unidos': 'USD'
  };

  test('ADV-M4.3.1: Cobertura exacta de los 20 países aprobados sin desviaciones', () => {
    const cities = getCities();
    const countries = Array.from(new Set(cities.map((c) => c.pais)));
    assert.equal(countries.length, 20, 'Deben existir exactamente 20 países en el dataset');

    const expectedCountries = Object.keys(EXPECTED_CURRENCY_BY_COUNTRY);
    for (const exp of expectedCountries) {
      assert.ok(countries.includes(exp), `País obligatorio no encontrado: ${exp}`);
    }
  });

  test('ADV-M4.3.2: Correspondencia biunívoca País -> Moneda y consistencia de precios', () => {
    const cities = getCities();
    for (const c of cities) {
      const expectedCurrency = EXPECTED_CURRENCY_BY_COUNTRY[c.pais];
      assert.ok(expectedCurrency, `País desconocido en city: ${c.pais}`);
      assert.equal(
        c.moneda,
        expectedCurrency,
        `Discrepancia monetaria en ${c.slug}: ${c.pais} debe usar ${expectedCurrency} pero tiene ${c.moneda}`
      );
      assert.ok(
        c.rangoPrecio.includes(c.moneda) || c.rangoPrecio.includes('$'),
        `El rango de precio "${c.rangoPrecio}" en ${c.slug} debe referenciar la moneda o símbolo`
      );
    }
  });

  test('ADV-M4.3.3: Cuotas mínimas en mercados de alta monetización (España >= 6, EE.UU. >= 7)', () => {
    const spainCities = getCitiesByCountry('España');
    const usCities = getCitiesByCountry('Estados Unidos');

    assert.ok(spainCities.length >= 6, `España debe tener >= 6 ciudades (tiene ${spainCities.length})`);
    assert.ok(usCities.length >= 7, `EE.UU. debe tener >= 7 ciudades (tiene ${usCities.length})`);

    const requiredSpain = ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'bilbao'];
    const requiredUs = ['miami', 'los-angeles', 'houston', 'nueva-york', 'chicago', 'orlando', 'san-antonio'];

    const spainSlugs = spainCities.map((c) => c.slug);
    const usSlugs = usCities.map((c) => c.slug);

    for (const s of requiredSpain) {
      assert.ok(spainSlugs.includes(s), `España debe incluir la ciudad ${s}`);
    }
    for (const s of requiredUs) {
      assert.ok(usSlugs.includes(s), `EE.UU. debe incluir la ciudad ${s}`);
    }
  });
});

describe('Adversarial Challenge M4.4: Integridad del Funnel de WhatsApp (Patrón Fluffy)', () => {
  test('ADV-M4.4.1: Todas las 113 páginas de ciudades poseen CTAs interactivos con data-city y data-open-quiz', () => {
    const cities = getCities();
    for (const city of cities) {
      const htmlPath = path.join(DIST_DIR, city.slug, 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');

      assert.ok(
        html.includes('data-open-quiz="true"'),
        `La ciudad ${city.slug} no tiene el atributo data-open-quiz="true"`
      );
      assert.ok(
        html.includes(`data-city="${city.slug}"`),
        `La ciudad ${city.slug} no tiene el atributo data-city="${city.slug}"`
      );
      assert.ok(
        html.includes('wa.me/573000000000'),
        `La ciudad ${city.slug} no incluye el fallback directo a WhatsApp con número provisional`
      );
      assert.ok(
        html.includes('id="quiz-modal-container"'),
        `La ciudad ${city.slug} no incluye el contenedor de montaje para el Quiz Modal`
      );
    }
  });

  test('ADV-M4.4.2: Todas las 45 páginas de dolencias poseen CTAs con data-symptom y data-open-quiz', () => {
    const dolencias = getDolencias();
    for (const dolencia of dolencias) {
      const htmlPath = path.join(DIST_DIR, 'biodescodificacion', dolencia.slug, 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');

      assert.ok(
        html.includes('data-open-quiz="true"'),
        `La dolencia ${dolencia.slug} no tiene el atributo data-open-quiz="true"`
      );
      assert.ok(
        html.includes(`data-symptom="${dolencia.nombre}"`),
        `La dolencia ${dolencia.slug} no tiene el atributo data-symptom="${dolencia.nombre}"`
      );
      assert.ok(
        html.includes('wa.me/573000000000'),
        `La dolencia ${dolencia.slug} no incluye el fallback directo a WhatsApp`
      );
      assert.ok(
        html.includes('id="quiz-modal-container"'),
        `La dolencia ${dolencia.slug} no incluye el contenedor de montaje para el Quiz Modal`
      );
    }
  });
});

describe('Adversarial Challenge M4.5: Auditoría Forense de Schemas JSON-LD Estructurados', () => {
  test('ADV-M4.5.1: Schemas en las 113 páginas de ciudades son JSON parseable y cumplen con HealthAndBeautyBusiness', () => {
    const cities = getCities();
    for (const city of cities) {
      const htmlPath = path.join(DIST_DIR, city.slug, 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');

      const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      assert.ok(
        matches.length >= 2,
        `La ciudad ${city.slug} debe contener al menos 2 bloques JSON-LD (HealthAndBeautyBusiness + BreadcrumbList)`
      );

      let foundBusiness = false;
      let foundBreadcrumb = false;

      for (const m of matches) {
        let json;
        try {
          json = JSON.parse(m[1]);
        } catch (e) {
          assert.fail(`JSON-LD corrupto en ciudad ${city.slug}: ${e.message}`);
        }

        if (json['@type'] === 'HealthAndBeautyBusiness') {
          foundBusiness = true;
          assert.equal(json.currenciesAccepted, city.moneda);
          assert.equal(json.address?.addressCountry, city.pais);
          assert.equal(json.priceRange, city.rangoPrecio);
          assert.equal(json.url, `https://almaholistica.com/${city.slug}/`);
        } else if (json['@type'] === 'BreadcrumbList') {
          foundBreadcrumb = true;
          assert.equal(json.itemListElement?.length, 3);
        }
      }

      assert.ok(foundBusiness, `No se encontró HealthAndBeautyBusiness en ${city.slug}`);
      assert.ok(foundBreadcrumb, `No se encontró BreadcrumbList en ${city.slug}`);
    }
  });

  test('ADV-M4.5.2: Schemas en las 45 páginas de dolencias cumplen con MedicalWebPage y FAQPage', () => {
    const dolencias = getDolencias();
    for (const dolencia of dolencias) {
      const htmlPath = path.join(DIST_DIR, 'biodescodificacion', dolencia.slug, 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');

      const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      assert.ok(
        matches.length >= 2,
        `La dolencia ${dolencia.slug} debe contener bloques JSON-LD`
      );

      let foundMedical = false;
      let foundFaq = false;
      let foundBreadcrumb = false;

      for (const m of matches) {
        let json;
        try {
          json = JSON.parse(m[1]);
        } catch (e) {
          assert.fail(`JSON-LD corrupto en dolencia ${dolencia.slug}: ${e.message}`);
        }

        if (json['@type'] === 'MedicalWebPage') {
          foundMedical = true;
          assert.equal(json.about?.name, dolencia.nombre);
          assert.equal(json.about?.associatedPathophysiology, dolencia.sentidoBiologico);
          assert.equal(json.url, `https://almaholistica.com/biodescodificacion/${dolencia.slug}/`);
        } else if (json['@type'] === 'FAQPage') {
          foundFaq = true;
          assert.equal(json.mainEntity?.length, dolencia.faqs.length);
        } else if (json['@type'] === 'BreadcrumbList') {
          foundBreadcrumb = true;
          assert.equal(json.itemListElement?.length, 3);
        }
      }

      assert.ok(foundMedical, `No se encontró MedicalWebPage en ${dolencia.slug}`);
      if (dolencia.faqs && dolencia.faqs.length > 0) {
        assert.ok(foundFaq, `No se encontró FAQPage en ${dolencia.slug}`);
      }
      assert.ok(foundBreadcrumb, `No se encontró BreadcrumbList en ${dolencia.slug}`);
    }
  });
});

describe('Adversarial Challenge M4.6: Estilo Sólido Mate y Prevención de CLS', () => {
  test('ADV-M4.6.1: Cero clases prohibidas (backdrop-blur, opacity parcial, glow, neón) en las 160 páginas HTML', () => {
    const forbidden = [
      'backdrop-blur',
      'bg-opacity-',
      'shadow-neon',
      'shadow-glow'
    ];

    function scanDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(full);
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
          const content = fs.readFileSync(full, 'utf8');
          for (const word of forbidden) {
            assert.ok(
              !content.includes(word),
              `Violación de estilo mate encontrada en ${full}: se detectó clase prohibida "${word}"`
            );
          }
        }
      }
    }

    scanDir(DIST_DIR);
  });

  test('ADV-M4.6.2: Prevención de CLS: Todas las imágenes poseen atributos de dimensión explícitos', () => {
    const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    assert.ok(
      homeHtml.includes('width="320"') && homeHtml.includes('height="320"'),
      'El logo principal en index.html debe reservar width="320" y height="320"'
    );

    // Verificar que cada <img> en las páginas clave tenga atributos width y height
    const keyPages = [
      'index.html',
      'biodescodificacion/index.html',
      'bogota/index.html',
      'madrid/index.html',
      'biodescodificacion/gastritis/index.html',
      'biodescodificacion/ansiedad/index.html'
    ];

    for (const page of keyPages) {
      const pageHtml = fs.readFileSync(path.join(DIST_DIR, page), 'utf8');
      const imgTags = pageHtml.match(/<img[^>]+>/gi) || [];
      for (const img of imgTags) {
        assert.ok(img.includes('width='), `Tag <img> en ${page} carece de width: ${img}`);
        assert.ok(img.includes('height='), `Tag <img> en ${page} carece de height: ${img}`);
      }
    }
  });
});

describe('Adversarial Challenge M4.7: Rendimiento y Memoización Singleton O(1)', () => {
  test('ADV-M4.7.1: Búsqueda O(1) con 10,000 consultas consecutivas en menos de 50ms', () => {
    const citySlugs = getCitySlugs();
    const dolenciaSlugs = getDolenciaSlugs();

    const start = performance.now();
    for (let i = 0; i < 5000; i++) {
      const randomCity = citySlugs[i % citySlugs.length];
      const city = getCityBySlug(randomCity);
      assert.ok(city !== undefined, `Ciudad esperada no encontrada: ${randomCity}`);

      const randomDolencia = dolenciaSlugs[i % dolenciaSlugs.length];
      const dolencia = getDolenciaBySlug(randomDolencia);
      assert.ok(dolencia !== undefined, `Dolencia esperada no encontrada: ${randomDolencia}`);
    }
    const duration = performance.now() - start;

    assert.ok(
      duration < 50,
      `10,000 búsquedas en memoria tardaron ${duration.toFixed(2)}ms (debe ser < 50ms)`
    );
  });

  test('ADV-M4.7.2: Consultas inexistentes devuelven undefined sin lanzar excepciones', () => {
    assert.equal(getCityBySlug('ciudad-inexistente-xyz'), undefined);
    assert.equal(getCityBySlug(''), undefined);
    assert.equal(getCityBySlug(null), undefined);

    assert.equal(getDolenciaBySlug('dolencia-fantasma-123'), undefined);
    assert.equal(getDolenciaBySlug(''), undefined);
    assert.equal(getDolenciaBySlug(null), undefined);
  });

  test('ADV-M4.7.3: Mapeo de sistemas corporales es completo y consistente', () => {
    const sistemas = getSistemas();
    assert.ok(sistemas.length >= 6, 'Deben existir al menos 6 sistemas biológicos diferenciados');
    
    for (const sis of sistemas) {
      const list = getDolenciasBySistema(sis);
      assert.ok(list.length > 0, `El sistema "${sis}" no debe estar vacío`);
    }

    const summaries = getDolenciasSummaries();
    assert.equal(summaries.length, 45, 'Los resúmenes de dolencias deben contar con exactamente 45 items');
  });
});
