import fs from 'fs';
import assert from 'assert';

console.log('=== INICIANDO AUDITORÍA FORENSE ADVERSARIAL MR3 ===');

const srcCode = fs.readFileSync('src/pages/index.astro', 'utf8');
const distHtml = fs.readFileSync('dist/index.html', 'utf8');

// 1. Veto contra oro/amarillo y estilos prohibidos
const forbidden = [
  '#F59E0B', '#D4AF37', '#FFE58F', '#E5B33A',
  'backdrop-blur', 'glassmorphism', 'neon', 'glow'
];
for (const token of forbidden) {
  assert(!srcCode.toLowerCase().includes(token.toLowerCase()), `Violación en src: token prohibido detectado: ${token}`);
  assert(!distHtml.toLowerCase().includes(token.toLowerCase()), `Violación en dist: token prohibido detectado: ${token}`);
}
console.log('✓ Check 1: Erradicación total de colores dorados y estilos prohibidos.');

// 2. Veto contra inline rgba en src/pages/index.astro
assert(!srcCode.includes('rgba'), 'Violación: src/pages/index.astro contiene rgba inline.');
console.log('✓ Check 2: Cero ocurrencias de rgba inline en index.astro.');

// 3. Verificación de token shadow-pill-white y botones píldora
assert(srcCode.includes('shadow-pill-white'), 'Violación: shadow-pill-white no encontrado en src.');
assert(srcCode.includes('rounded-full'), 'Violación: rounded-full no encontrado en src.');
assert(srcCode.includes('btn-action-pill-white'), 'Violación: btn-action-pill-white no encontrado en src.');
console.log('✓ Check 3: Botones píldora y shadow-pill-white validados.');

// 4. Tarjetas rounded-[2.5rem] y burbujas de iconos w-14 h-14
const roundedCardsMatches = srcCode.match(/rounded-\[2\.5rem\]/g) || [];
assert(roundedCardsMatches.length >= 5, `Se esperaban múltiples tarjetas rounded-[2.5rem], se encontraron: ${roundedCardsMatches.length}`);

const iconBubblesMatches = srcCode.match(/w-14 h-14 rounded-full/g) || [];
assert(iconBubblesMatches.length >= 4, `Se esperaban burbujas circulares w-14 h-14, se encontraron: ${iconBubblesMatches.length}`);
console.log(`✓ Check 4: Tarjetas rounded-[2.5rem] (${roundedCardsMatches.length}) y burbujas de iconos (${iconBubblesMatches.length}) validadas.`);

// 5. Scroll indicator vertical de 1px
assert(srcCode.includes('w-[1px] h-16 bg-slate-800 relative overflow-hidden'), 'Violación: Scroll indicator line missing in src.');
assert(srcCode.includes('animate-scroll-line'), 'Violación: animate-scroll-line missing in src.');
console.log('✓ Check 5: Scroll indicator vertical de 1px presente.');

// 6. GSAP integraciones y floating aura
assert(srcCode.includes("import { gsap } from 'gsap'"), 'Violación: import { gsap } from "gsap" missing in src.');
assert(srcCode.includes("gsap.from('.gsap-hero-el, .gsap-fade-up'"), 'Violación: gsap hero entrance missing in src.');
assert(srcCode.includes('hero-floating-aura'), 'Violación: hero-floating-aura missing in src.');
assert(srcCode.includes('prefers-reduced-motion'), 'Violación: prefers-reduced-motion check missing in GSAP script.');
console.log('✓ Check 6: Animaciones GSAP, floating aura y accesibilidad reducida validadas.');

// 7. Eyebrow editorial con línea minimalista
assert(srcCode.includes('w-8 h-[1px] bg-[#38BDF8]'), 'Violación: Eyebrow minimal line missing in src.');
console.log('✓ Check 7: Eyebrows editoriales con líneas minimalistas presentes.');

// 8. Títulos en Cormorant / font-serif a gran escala
assert(srcCode.includes('font-serif text-5xl md:text-7xl lg:text-[5.5rem]'), 'Violación: Título principal en gran escala no encontrado.');
console.log('✓ Check 8: Tipografía editorial a gran escala verificada.');

// 9. Preservación estricta de contratos funcionales
const featuredMatches = srcCode.match(/const featuredSlugs = \[([\s\S]*?)\];/);
assert(featuredMatches, 'featuredSlugs no encontrado.');
const expectedFeatured = [
  'gastritis', 'colon-irritable', 'ansiedad', 'lumbalgia',
  'ciatica', 'hipotiroidismo', 'dermatitis', 'migrana',
  'insomnio', 'sobrepeso-retencion', 'fibromialgia', 'bruxismo'
];
for (const slug of expectedFeatured) {
  assert(featuredMatches[1].includes(slug), `Slug canónico ${slug} faltante en featuredSlugs`);
}
console.log('✓ Check 9: 12 dolencias canónicas estrictamente conservadas.');

// 10. Funnel de conversión y Quiz Modal
const quizMatches = srcCode.match(/data-open-quiz="true"/g) || [];
assert(quizMatches.length >= 3, `Se esperaban al menos 3 disparadores de quiz, encontrados: ${quizMatches.length}`);
console.log(`✓ Check 10: Conversión y Quiz Modal verificados (${quizMatches.length} disparadores).`);

console.log('=== TODAS LAS 10 COMPROBACIONES ADVERSARIALES PASARON SATISFACTORIAMENTE ===');
