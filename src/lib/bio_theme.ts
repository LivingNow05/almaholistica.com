/**
 * src/lib/bio_theme.ts
 * Paleta Cromática Biológica Semántica (Hito M1)
 * Proyecto: Alma Holística (almaholistica.com)
 *
 * Mapeo semántico de los 7 sistemas biológicos a las 4 familias cromáticas:
 * - Sistema Digestivo (Verde Salvia / Esmeralda Sereno)
 * - Sistema Osteoarticular (Arcilla / Terracota Cálido) — Prohibido amarillo/ámbar
 * - Sistema Respiratorio (Azul Zafiro / Celeste Nórdico)
 * - Sistema Nervioso / Psicosomático (Amatista Suave / Lavanda Profundo)
 */

export type BiologicalFamily = 'digestivo' | 'osteoarticular' | 'respiratorio' | 'nervioso';

export interface BiologicalTheme {
  family: BiologicalFamily;
  name: string;
  badgeClass: string;
  borderClass: string;
  dotClass: string;
  accentHexLight: string;
  accentHexDark: string;
  badgeBgHexLight: string;
  badgeBgHexDark: string;
  badgeBorderHexLight: string;
  badgeBorderHexDark: string;
  textHexLight: string;
  textHexDark: string;
  surfaceHexLight: string;
  surfaceHexDark: string;
}

export const BIOLOGICAL_THEMES: Record<BiologicalFamily, BiologicalTheme> = {
  digestivo: {
    family: 'digestivo',
    name: 'Sistema Digestivo & Metabólico',
    badgeClass: 'bio-badge-digestivo',
    borderClass: 'bio-border-digestivo',
    dotClass: 'bio-dot-digestivo',
    accentHexLight: '#2E854B',
    accentHexDark: '#3E9B67',
    badgeBgHexLight: '#E8F5EC',
    badgeBgHexDark: '#0C1F16',
    badgeBorderHexLight: '#A8D8B6',
    badgeBorderHexDark: '#1A3D2C',
    textHexLight: '#13522E',
    textHexDark: '#6AC894',
    surfaceHexLight: '#F3FAF5',
    surfaceHexDark: '#0E241A'
  },
  osteoarticular: {
    family: 'osteoarticular',
    name: 'Sistema Osteoarticular & Circulatorio',
    badgeClass: 'bio-badge-osteoarticular',
    borderClass: 'bio-border-osteoarticular',
    dotClass: 'bio-dot-osteoarticular',
    accentHexLight: '#C25E3E',
    accentHexDark: '#C86241',
    badgeBgHexLight: '#FDF0EA',
    badgeBgHexDark: '#24120D',
    badgeBorderHexLight: '#ECC3B2',
    badgeBorderHexDark: '#4A2419',
    textHexLight: '#8A3618',
    textHexDark: '#E88F71',
    surfaceHexLight: '#FAF2EE',
    surfaceHexDark: '#28150F'
  },
  respiratorio: {
    family: 'respiratorio',
    name: 'Sistema Respiratorio',
    badgeClass: 'bio-badge-respiratorio',
    borderClass: 'bio-border-respiratorio',
    dotClass: 'bio-dot-respiratorio',
    accentHexLight: '#2B74AA',
    accentHexDark: '#3688C7',
    badgeBgHexLight: '#EAF2F9',
    badgeBgHexDark: '#0B1A28',
    badgeBorderHexLight: '#AECBE5',
    badgeBorderHexDark: '#19354E',
    textHexLight: '#124B73',
    textHexDark: '#6BAEE3',
    surfaceHexLight: '#F1F6FB',
    surfaceHexDark: '#0E2032'
  },
  nervioso: {
    family: 'nervioso',
    name: 'Sistema Nervioso & Psicosomático',
    badgeClass: 'bio-badge-nervioso',
    borderClass: 'bio-border-nervioso',
    dotClass: 'bio-dot-nervioso',
    accentHexLight: '#7C4499',
    accentHexDark: '#8E55B0',
    badgeBgHexLight: '#F4EFF9',
    badgeBgHexDark: '#1B0F28',
    badgeBorderHexLight: '#D0BEE0',
    badgeBorderHexDark: '#392051',
    textHexLight: '#532A78',
    textHexDark: '#BC91DF',
    surfaceHexLight: '#F7F3FA',
    surfaceHexDark: '#211332'
  }
};

/**
 * Normaliza y clasifica un sistema biológico corporal (de los 7 sistemas del dataset)
 * en una de las 4 familias biológicas visuales.
 */
export function resolveBiologicalFamily(sistema: string): BiologicalFamily {
  if (!sistema || typeof sistema !== 'string') {
    return 'nervioso';
  }
  const norm = sistema.toLowerCase().trim();

  // 1. Familia Digestivo: Digestivo + Endocrino / Metabólico
  if (
    norm.includes('digestiv') ||
    norm.includes('endocrin') ||
    norm.includes('metaból') ||
    norm.includes('metabol')
  ) {
    return 'digestivo';
  }

  // 2. Familia Osteoarticular: Osteoarticular + Inmunológico / Circulatorio
  if (
    norm.includes('osteo') ||
    norm.includes('articular') ||
    norm.includes('inmuno') ||
    norm.includes('circulat')
  ) {
    return 'osteoarticular';
  }

  // 3. Familia Respiratorio: Respiratorio
  if (norm.includes('respirat')) {
    return 'respiratorio';
  }

  // 4. Familia Nervioso / Psicosomático: Nervioso / Emocional + Dermatológico + default
  return 'nervioso';
}

/**
 * Retorna la familia semántica biológica ('digestivo' | 'osteoarticular' | 'respiratorio' | 'nervioso')
 * correspondiente al sistema corporal indicado.
 * Si se invoca con el segundo argumento full=true, retorna el objeto de configuración completo BiologicalTheme.
 */
export function getBiologicalTheme(sistema: string): BiologicalFamily;
export function getBiologicalTheme(sistema: string, full: true): BiologicalTheme;
export function getBiologicalTheme(sistema: string, full?: boolean): BiologicalFamily | BiologicalTheme {
  const family = resolveBiologicalFamily(sistema);
  if (full) {
    return BIOLOGICAL_THEMES[family];
  }
  return family;
}

/**
 * Retorna el objeto completo de tema biológico para un sistema dado.
 */
export function getBiologicalThemeDetails(sistema: string): BiologicalTheme {
  const family = resolveBiologicalFamily(sistema);
  return BIOLOGICAL_THEMES[family];
}

/**
 * Retorna la clase CSS del borde superior (3px) para el sistema.
 */
export function getBiologicalBorderClass(sistema: string): string {
  const family = resolveBiologicalFamily(sistema);
  return BIOLOGICAL_THEMES[family].borderClass;
}

/**
 * Retorna la clase CSS del badge de categoría para el sistema.
 */
export function getBiologicalBadgeClass(sistema: string): string {
  const family = resolveBiologicalFamily(sistema);
  return BIOLOGICAL_THEMES[family].badgeClass;
}
