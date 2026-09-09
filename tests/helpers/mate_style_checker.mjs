/**
 * Auditor Estático de Estilo Visual Sólido Mate para Alma Holística
 * Autor: E2E Test Writing Track (teamwork_preview_test_writer_e2e_1)
 */

export const FORBIDDEN_STYLE_PATTERNS = [
  { pattern: /backdrop-blur/i, description: 'Efecto glassmorphism o desenfoque de fondo prohibido (backdrop-blur)' },
  { pattern: /backdrop-filter/i, description: 'Propiedad CSS backdrop-filter prohibida' },
  { pattern: /bg-opacity-(?:10|20|30|40|50|60|70|80|90)/i, description: 'Transparencias en fondos de tarjetas prohibidas' },
  { pattern: /(?:bg-|background(?:-color)?\s*:\s*)[^;}"'>]*rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\s*\)/i, description: 'Colores RGBA transparentes prohibidos en superficies' },
  { pattern: /shadow-(?:neon|glow|cyan-500\/|blue-500\/)/i, description: 'Sombras o resplandores de neón prohibidos' },
  { pattern: /box-shadow\s*:[^;]*0\s+0\s+\d+px\s+#[0-9a-fA-F]+/i, description: 'Resplandor bioluminiscente neón prohibido en CSS' }
];

export const MANDATORY_COLOR_TOKENS = [
  '#060A1A', // Fondo Abisal
  '#0A1226', // Midnight Navy Card 1
  '#0E172F', // Midnight Navy Card 2
  '#1E293B', // Border 1
  '#38BDF8'  // Botón Acción Cyan
];

/**
 * Analiza un fragmento de código o archivo en busca de violaciones de estilo mate
 */
export function auditMateStyleContent(content, filename = 'inline') {
  const violations = [];

  for (const { pattern, description } of FORBIDDEN_STYLE_PATTERNS) {
    if (pattern.test(content)) {
      violations.push({
        filename,
        rule: description,
        match: content.match(pattern)?.[0]
      });
    }
  }

  return {
    passed: violations.length === 0,
    violations
  };
}
