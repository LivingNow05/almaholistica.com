# Handoff Report: Survey R1 & R2 — Alma Holística

**De:** teamwork_preview_explorer_survey_1 (Explorer)  
**Para:** teamwork_preview_orchestrator_8 (Parent Agent, Conv ID: dee5921c-c2ce-44d0-97b2-5ec780197d61)  
**Fecha:** 2026-09-16  
**Tipo de Handoff:** Hard (Task complete)  
**Documento de soporte:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_1/report.md`

---

## 1. Observation

### Observación 1.1: Teléfono en `public/llms.txt` y `dist/llms.txt`
- En `/Users/anthony/Downloads/almaholistica.com/public/llms.txt` (línea 35) y `/Users/anthony/Downloads/almaholistica.com/dist/llms.txt` (línea 35):
  ```text
  35: - Teléfono Oficial de Coordinación: +57 300 000 0000 (vía WhatsApp API).
  ```
- En `/Users/anthony/Downloads/almaholistica.com/src/config/site.ts` (líneas 30-38):
  ```typescript
  30:  * Nota: El número 573151206985 es el oficial de WhatsApp de Alma Holística.
  ...
  38:   whatsappNumber: '573151206985',
  ```
- En `/Users/anthony/Downloads/almaholistica.com/tests/adversarial_assets_config_m2_2.py` (líneas 63-65):
  ```python
  assert whatsapp == '573151206985', f"whatsappNumber must be '573151206985', got '{whatsapp}'"
  ```

### Observación 1.2: Enlaces a Ciudades en `public/llms.txt` vs Slugs Reales
- En `/Users/anthony/Downloads/almaholistica.com/public/llms.txt` (líneas 23-31):
  ```markdown
  23: - [Bogotá, Colombia](https://almaholistica.com/bogota/): Terapia holística adaptada a consultantes en Bogotá, Colombia (Tarifas en COP).
  24: - [Medellín, Colombia](https://almaholistica.com/medellin/): Sesiones online en Medellín, Envigado y El Poblado.
  25: - [Ciudad de México (CDMX)](https://almaholistica.com/cdmx/): Consulta virtual para residentes de CDMX (Tarifas en MXN).
  26: - [Madrid, España](https://almaholistica.com/madrid/): Acompañamiento en biodescodificación adaptado a horarios de España y Europa (Tarifas en EUR).
  ...
  31: - [Miami, Estados Unidos](https://almaholistica.com/miami/): Sesiones en español para la comunidad hispanohablante de Florida y EE.UU. (Tarifas en USD).
  ```
- En `/Users/anthony/Downloads/almaholistica.com/src/data/dataset_almaholistica_ciudades.csv` (columna `URL Final (Slug)`):
  - Fila 2: `biodescodificacion-bogota`
  - Fila 3: `biodescodificacion-medellin`
  - Fila 7: `biodescodificacion-cdmx`
  - Filas España: `biodescodificacion-madrid`, `biodescodificacion-barcelona`
  - Filas USA: `biodescodificacion-miami`
- En `/Users/anthony/Downloads/almaholistica.com/astro.config.mjs` (línea 9):
  ```javascript
  trailingSlash: 'always',
  ```
- Las carpetas generadas en `dist/` corresponden a `dist/biodescodificacion-bogota/index.html`, etc. Las rutas `dist/bogota/` no existen (arrojando 404).

### Observación 1.3: Catálogo de Dolencias y Países
- En `/Users/anthony/Downloads/almaholistica.com/src/data/dataset_biodescodificacion_dolencias.json`:
  - Existen exactamente 45 dolencias validadas (`length = 45`), organizadas en 4 familias biológicas (Digestivo, Osteoarticular, Respiratorio, Psicosomático/Nervioso).
  - En `public/llms.txt`, únicamente se mencionan 9 dolencias individuales (faltan 36).
- En `/Users/anthony/Downloads/almaholistica.com/src/data/dataset_almaholistica_ciudades.csv`:
  - Existen exactamente 113 ciudades en 20 países: Argentina, Bolivia, Brasil, Chile, Colombia, Costa Rica, Ecuador, El Salvador, España, Estados Unidos, Guatemala, Honduras, México, Nicaragua, Panamá, Paraguay, Perú, República Dominicana, Uruguay, Venezuela.
  - En `public/llms.txt`, solo se mencionan ciudades de 7 países.

### Observación 1.4: Mecanismo de Construcción de `llms.txt`
- `package.json` define:
  ```json
  "build": "astro check && astro build"
  ```
- No hay scripts de generación dedicados a `llms.txt` en `scripts/`.
- Astro copia de forma directa e inalterada el contenido de `public/` hacia `dist/`.

### Observación 1.5: Hero y Primer Párrafo Visible en `src/pages/index.astro`
- En `/Users/anthony/Downloads/almaholistica.com/src/pages/index.astro` (líneas 138-140):
  ```astro
  138:           <!-- Párrafo Quirúrgico Directo -->
  139:           <p class="gsap-hero-el text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl mb-6 leading-relaxed">
  140:             La biodescodificación demuestra que tu síntoma físico es la respuesta biológica de tu cuerpo ante un estrés o vivencia no resuelta. Identifica tu síntoma y descubre en una sesión privada 1 a 1 cómo desactivar la señal de alarma y recuperar tu calma.
  141:           </p>
  ```
- No existen etiquetas `<p>` previas en `src/layouts/BaseLayout.astro` ni en `src/components/Navbar.astro`.
- La animación GSAP en `src/pages/index.astro` (líneas 1114-1121) anima:
  ```javascript
  gsap.from('.gsap-hero-el, .gsap-fade-up', {
    opacity: 0,
    y: 35,
    duration: 1.1,
    stagger: 0.1,
    ease: 'power3.out',
    clearProps: 'transform,opacity'
  });
  ```

### Observación 1.6: Restricción Adversarial `MR3-CH2-4.5`
- En `/Users/anthony/Downloads/almaholistica.com/tests/adversarial_mr3_challenger_2.test.mjs` (líneas 247-250):
  ```javascript
  test('MR3-CH2-4.5: Zero entity JSON-LD schemas injected in home page', () => {
    const jsonLdBlocks = [...distIndexHtml.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi)];
    assert.strictEqual(jsonLdBlocks.length, 0, 'Landing page dist/index.html must NOT inject entity JSON-LD schemas');
  });
  ```
- En `/Users/anthony/Downloads/almaholistica.com/tests/adversarial_m5_sitemaps_schema.py` (líneas 191-192):
  ```python
  if rel in ['index.html', os.path.join('biodescodificacion', 'index.html')]:
      assert len(matches) == 0, f"Índice {rel} no debería contener schemas de entidad"
  ```
- En `/Users/anthony/Downloads/almaholistica.com/tests/adversarial_jsonld_robots_m5_2.test.mjs` (líneas 87-91):
  ```javascript
  // 113 city pages * 2 + 45 dolencia pages * 3 = 361 schemas
  assert.equal(totalScripts, 361, `Expected exactly 361 JSON-LD scripts across all 160 files, found ${totalScripts}`);
  ```

---

## 2. Logic Chain

1. **Sobre R1 (Teléfono):**
   - De acuerdo con la Observación 1.1, `public/llms.txt` contiene `+57 300 000 0000` mientras que `src/config/site.ts` y las pruebas adversariales establecen `573151206985` como oficial.
   - Por tanto, mantener `+57 300 000 0000` en `llms.txt` alimenta información desactualizada a motores de IA y viola el criterio de aceptación de R1.

2. **Sobre R1 (URLs de Ciudades y Trailing Slash):**
   - De acuerdo con la Observación 1.2, `public/llms.txt` enlaza a `https://almaholistica.com/{ciudad}/`, pero `src/data/dataset_almaholistica_ciudades.csv` define slugs como `biodescodificacion-{ciudad}` y `astro.config.mjs` impone `trailingSlash: 'always'`.
   - Por tanto, las URLs en `llms.txt` provocan errores 404 a los agentes de IA. Deben actualizarse obligatoriamente al formato canónico `https://almaholistica.com/biodescodificacion-{ciudad}/`.

3. **Sobre R1 (Catálogo y Países):**
   - De acuerdo con la Observación 1.3, el portal cuenta con 45 patologías y 20 países con monedas locales específicas, pero `llms.txt` solo presenta una fracción reducida.
   - Por tanto, para maximizar la citabilidad GEO de pasajes, `llms.txt` debe incorporar el catálogo completo y la cobertura de los 20 países.

4. **Sobre R2 (Anclaje de Entidad):**
   - De acuerdo con la Observación 1.5, el primer elemento `<p>` de texto visible en el DOM corresponde a la línea 138 de `src/pages/index.astro`.
   - Actualmente dicho párrafo no contiene la frase "Alma Holística es".
   - Al reformular dicho párrafo iniciando con:  
     `Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países...`,  
     se satisface el requisito de incluir la frase en los primeros 50 caracteres y declarar la entidad en los primeros 200 caracteres, conservando la clase `gsap-hero-el` y el estilo Swiss Bio-Tech.

5. **Sobre R2 (Restricción Adversarial `MR3-CH2-4.5`):**
   - De acuerdo con la Observación 1.6, tres suites de prueba independientes (`adversarial_mr3_challenger_2.test.mjs`, `adversarial_m5_sitemaps_schema.py` y `adversarial_jsonld_robots_m5_2.test.mjs`) imponen que `dist/index.html` contenga exactamente CERO bloques `<script type="application/ld+json">`, fijando el conteo total en 361 schemas para las 160 páginas.
   - Por tanto, cualquier adición de JSON-LD a la Home romperá de inmediato la suite de pruebas. El anclaje de entidad en la Home debe residir únicamente en el texto plano HTML visible y en `llms.txt`.

---

## 3. Caveats

- **No Caveats técnicos graves:** La arquitectura actual está completamente mapeada y los contratos de datos son claros.
- **Áreas no modificadas en esta fase:** Como agente Explorer en modo solo lectura, no se han modificado archivos de código fuente (`src/pages/index.astro`, `public/llms.txt`, etc.). Las modificaciones deben ser ejecutadas por el agente Implementer designado.

---

## 4. Conclusion

1. **R1:** `public/llms.txt` requiere una sanitización integral: reemplazar el teléfono provisional por `+57 315 1206985`, actualizar todas las rutas de ciudades al formato `/biodescodificacion-{slug}/`, expandir el catálogo a las 45 patologías y detallar los 20 países con sus monedas locales y directrices completas para crawlers de IA. Tras el cambio, `npm run build` sincroniza automáticamente `dist/llms.txt`.
2. **R2:** En `src/pages/index.astro`, el primer párrafo visible del Hero (líneas 138-140) debe reformularse iniciando con `"Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países..."`. Se deben preservar la clase `gsap-hero-el`, el estilo Swiss Bio-Tech mate y la restricción estricta de CERO scripts JSON-LD en `dist/index.html` para cumplir cabalmente con `MR3-CH2-4.5`.

---

## 5. Verification Method

Para verificar independientemente que las condiciones descritas se cumplen y que las implementaciones no rompan nada:

1. **Verificación de Tests:**
   ```bash
   npm test
   node --test tests/adversarial_*.test.mjs
   python3 tests/adversarial_assets_config_m2_2.py
   python3 tests/adversarial_m6_stress_harness.py
   ```
   *Criterio de éxito:* 150/150 tests en npm test, 244/244 tests adversariales en node, y 0 errores en los scripts Python.

2. **Verificación de `llms.txt`:**
   ```bash
   # Comprobar que no existe el teléfono provisional
   grep "300 000 0000" public/llms.txt
   # Comprobar que no hay enlaces a ciudades sin prefijo
   grep "almaholistica.com/bogota" public/llms.txt
   # Comprobar presencia del teléfono oficial
   grep "+57 315 1206985" public/llms.txt
   ```

3. **Verificación de la Home y `MR3-CH2-4.5`:**
   ```bash
   # Comprobar frase en primeros 50 caracteres del primer <p> de index.astro
   head -n 145 src/pages/index.astro | grep -C 2 "Alma Holística es"
   # Comprobar cero scripts JSON-LD en dist/index.html
   grep -c "application/ld+json" dist/index.html # Debe arrojar 0
   ```
