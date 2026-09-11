# Changes — teamwork_preview_worker_m1

**Hito:** M1 — Paleta Cromática Biológica Semántica  
**Fecha:** 2026-09-10  
**Archivos Modificados:**
- `src/lib/bio_theme.ts` (Nuevo)
- `src/lib/dolencias.ts` (Modificado)
- `tailwind.config.mjs` (Modificado)
- `src/styles/global.css` (Modificado)

---

## 1. `src/lib/bio_theme.ts` (Nuevo archivo)
- **Motivo:** Proporcionar un módulo dedicado y desacoplado para tipado y utilidades del sistema cromático biológico sin forzar dependencias pesadas en componentes que solo necesitan información de tema.
- **Detalle de Cambios:**
  - Definición de tipos:
    - `BiologicalFamily = 'digestivo' | 'osteoarticular' | 'respiratorio' | 'nervioso'`
    - `BiologicalTheme` con propiedades de contraste, nombres, clases CSS (`badgeClass`, `borderClass`, `dotClass`) y códigos HEX para temas claro y oscuro.
  - Constante `BIOLOGICAL_THEMES` que indexa la configuración estética de cada familia biológica.
  - Funciones:
    - `resolveBiologicalFamily(sistema: string): BiologicalFamily`: Mapea los 7 sistemas biológicos a las 4 familias.
    - `getBiologicalTheme(sistema: string): BiologicalFamily`: Retorna la familia como string union o el objeto completo si se provee `full: true`.
    - `getBiologicalThemeDetails(sistema: string): BiologicalTheme`: Retorna el objeto completo.
    - `getBiologicalBorderClass(sistema: string): string`: Helper para clase de borde superior de 3px.
    - `getBiologicalBadgeClass(sistema: string): string`: Helper para clase de badge.

---

## 2. `src/lib/dolencias.ts` (Modificado)
- **Motivo:** Cumplir el contrato de interfaz M1 ↔ M3 especificado en `PROJECT.md` y dispatch, permitiendo que cualquier importador de `dolencias.ts` acceda a `getBiologicalTheme()` sin alterar `getSistemas()` ni ninguna de las funciones memoizadas preexistentes.
- **Detalle de Cambios:**
  - Se añadieron al final del archivo las exportaciones de:
    - `BiologicalFamily`
    - `BiologicalTheme`
    - `BIOLOGICAL_THEMES`
    - `resolveBiologicalFamily`
    - `getBiologicalTheme`
    - `getBiologicalThemeDetails`
    - `getBiologicalBorderClass`
    - `getBiologicalBadgeClass`
  - Se preservó estrictamente intacta la función `getSistemas()` (que sigue retornando los 7 sistemas corporales para cumplir la prueba adversarial `ADV-M4.2.8`).

---

## 3. `tailwind.config.mjs` (Modificado)
- **Motivo:** Exponer los tokens cromáticos de las 4 familias biológicas a través del sistema de clases utilitarias de Tailwind, garantizando compatibilidad total con el compilador y preservando los tokens preexistentes.
- **Detalle de Cambios:**
  - Se extendió el objeto `theme.extend.colors` con el namespace `bio`:
    - `bio.digestivo`: `#2E854B`, `#3E9B67`, `#E8F5EC`, `#0C1F16`, `#A8D8B6`, `#1A3D2C`, `#13522E`, `#6AC894`, `#F3FAF5`, `#0E241A`.
    - `bio.osteoarticular`: `#C25E3E`, `#C86241`, `#FDF0EA`, `#24120D`, `#ECC3B2`, `#4A2419`, `#8A3618`, `#E88F71`, `#FAF2EE`, `#28150F`.
    - `bio.respiratorio`: `#2B74AA`, `#3688C7`, `#EAF2F9`, `#0B1A28`, `#AECBE5`, `#19354E`, `#124B73`, `#6BAEE3`, `#F1F6FB`, `#0E2032`.
    - `bio.nervioso`: `#7C4499`, `#8E55B0`, `#F4EFF9`, `#1B0F28`, `#D0BEE0`, `#392051`, `#532A78`, `#BC91DF`, `#F7F3FA`, `#211332`.
  - Se verificó la preservación íntegra de tokens requeridos por pruebas adversariales: `#060A1A`, `#0A1226`, `#0E172F`, `#1E293B`, `#1E3A5F`, `#38BDF8`, `pill-white`, `matte-sm`, `matte-md`, `matte-lg`.
  - Cero inclusión de términos o códigos prohibidos (`amber`, `yellow`, `gold`, `#F59E0B`, `#D4AF37`, etc.).

---

## 4. `src/styles/global.css` (Modificado)
- **Motivo:** Añadir las clases de presentación visual de la paleta semántica biológica y armonizar la sección de números de paso (`journey-step`) bajo el estándar 100% sólido mate y accesibilidad WCAG AAA.
- **Detalle de Cambios:**
  - **Sección 11: Paleta Cromática Biológica Semántica:**
    - Clases de borde superior (3px solid): `.bio-border-digestivo`, `.bio-border-osteoarticular`, `.bio-border-respiratorio`, `.bio-border-nervioso` con selectores `html.dark` para modo oscuro.
    - Clases de badges de categoría: `.bio-badge`, `.bio-badge-digestivo`, `.bio-badge-osteoarticular`, `.bio-badge-respiratorio`, `.bio-badge-nervioso` en fondos 100% sólidos opacos con variantes para Modo Claro y Modo Oscuro.
    - Clases de micro-dots circulares: `.bio-dot`, `.bio-dot-digestivo`, `.bio-dot-osteoarticular`, `.bio-dot-respiratorio`, `.bio-dot-nervioso`, junto a pseudo-elementos fallback `::before` con exclusión vía `:has(.bio-dot)` para evitar duplicidad si el dot se incluye en el markup.
  - **Actualización de Journey Steps (Armonización M1):**
    - Paso 1 (Diagnóstico / Aire): Azul Zafiro / Celeste Nórdico (`#2B74AA` / `#3688C7`).
    - Paso 2 (Hipótesis / Psique): Amatista Suave / Lavanda Profundo (`#7C4499` / `#8E55B0`).
    - Paso 3 (Sesión 1 a 1 / Arraigo): Arcilla / Terracota Cálido (`#C25E3E` / `#C86241` — sin ámbar/amarillo).
    - Paso 4 (Regeneración / Homeostasis): Verde Salvia / Esmeralda Sereno (`#2E854B` / `#3E9B67`).
    - Reemplazo de los bordes translúcidos anteriores `rgba(...)` por bordes sólidos de 3px y flechas conectoras sólidas `#779DD1`.
  - **Cumplimiento Sólido Mate:** Verificado con `auditMateStyleContent` (0 violaciones).
