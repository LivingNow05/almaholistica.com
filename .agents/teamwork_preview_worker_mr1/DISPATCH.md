## 2026-09-06T17:20:17Z
Eres teamwork_preview_worker_mr1.
Tu directorio de trabajo exclusivo para metadatos y reportes es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_mr1/
Tu objetivo es implementar el hito MR1 (Redesign Core, Tokens, GSAP, SVGs & BaseLayout) para el rediseño de alta gama de Alma Holística (almaholistica.com).

LEE OBLIGATORIAMENTE Y EN PRIMER LUGAR:
1. /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (especialmente la sección ## 2026-09-06T17:12:38Z)
2. /Users/anthony/Downloads/almaholistica.com/PROJECT.md
3. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_redesign_1/handoff.md
4. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_redesign_2/handoff.md
5. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_redesign_3/handoff.md

ARCHIVOS BAJO TU PROPIEDAD EXCLUSIVA DE ESCRITURA:
- `package.json`
- `tailwind.config.mjs`
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `public/logo-mariposa-con-fondo-completo.svg`
- `public/favicon.svg`
- `tests/helpers/contracts.mjs`
- `tests/helpers/mate_style_checker.mjs`
- `tests/tier1_features.test.mjs`
- `tests/adversarial_matte_cls_m2_1.test.mjs`
- `tests/adversarial_assets_config_m2_2.py`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

TAREAS ESPECÍFICAS A IMPLEMENTAR:
1. **Instalación de GSAP:** Ejecutar `npm install gsap@^3.15.0`. Verificar que `package.json` y `package-lock.json` registren la dependencia.
2. **Tokens en `tailwind.config.mjs`:**
   - Erradicar por completo los colores `gold` (`#D4AF37`) y `amber` (`#F59E0B`).
   - Implementar la paleta bi-color: `abisal: '#060A1A'`, `cyan: { DEFAULT: '#38BDF8', soft: '#38BDF8', hover: '#0EA5E9', active: '#0284C7' }`, `midnight: { DEFAULT: '#0A1226', surface: '#0A1226', card: '#0A1226', elevated: '#0E172F' }`, `text: { primary: '#FFFFFF', heading: '#F8FAFC', body: '#94A3B8', muted: '#64748B' }`.
   - Extender `fontFamily`: `serif` con `'Cormorant Garamond'` prioritario y `'Cinzel'` de respaldo; `sans` con `'Inter'` prioritario y `'Plus Jakarta Sans'` de respaldo.
   - Extender `borderRadius`: `'card-editorial': '2.5rem'`.
   - Extender `boxShadow`: `'pill-white': '0 8px 24px rgba(255, 255, 255, 0.08)'`.
3. **Estilos en `src/styles/global.css`:**
   - Eliminar `--color-accent-gold` y `--color-accent-amber`.
   - Actualizar utilidades de botones y badges para soportar botones píldora blancos y badges cyan/slate.
   - Añadir soporte de accesibilidad `@media (prefers-reduced-motion: reduce)`.
4. **Google Fonts en `src/layouts/BaseLayout.astro`:**
   - Actualizar el enlace en `<head>` para cargar `family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400` y `family=Inter:wght@300;400;500;600` además de Cinzel y Plus Jakarta Sans.
5. **Activos SVG vectoriales en `public/`:**
   - En `public/logo-mariposa-con-fondo-completo.svg` y `public/favicon.svg`: En la Capa 4, actualizar los gradientes `star-aura` y `core-glow` y los trazos vectoriales para migrar de dorado/amarillo a tonos cyan (#38BDF8 / #BAE6FD / #FFFFFF), de modo que NO quede ningún rastro de amarillo/dorado en los SVGs.
6. **Armonización de Tests y Helpers:**
   - En `tests/helpers/contracts.mjs`: actualizar `COLOR_PALETTE` reflejando la paleta bicolor (#060A1A y #38BDF8) y eliminando `secondaryAccentGold`/`secondaryAccentAmber`.
   - En `tests/helpers/mate_style_checker.mjs`: refinar la expresión regular de estilos prohibidos para que las sombras como `shadow-[0_8px_24px_rgba(255,255,255,0.08)]` NO disparen falsos positivos de superficies transparentes (prohibir solo `bg-` o `background:` con rgba). Eliminar `'#D4AF37'` de `MANDATORY_COLOR_TOKENS`.
   - En `tests/tier1_features.test.mjs`: adaptar `T1.6.4` para validar la nueva paleta bicolor y ausencia de amarillo.
   - En `tests/adversarial_matte_cls_m2_1.test.mjs`: actualizar `ADV-M2.1.4` para verificar ausencia de `#D4AF37` y permitir la sombra del botón píldora.
   - En `tests/adversarial_assets_config_m2_2.py`: actualizar las aserciones de color en test 4.
7. **Verificación Estricta:**
   - Ejecutar `npx astro check`, `npm test`, `node --test tests/adversarial_*.test.mjs` y las suites de Python.
   - Documentar comandos y resultados exactos en el handoff.
