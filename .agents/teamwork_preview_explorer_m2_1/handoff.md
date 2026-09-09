# Handoff Report — Explorer 1 (Milestone M2: Astro 5 & Build Tooling)

**Agente**: `teamwork_preview_explorer_m2_1`  
**Destinatario**: `parent` (`f77d1a94-c021-4fed-9bbe-9a2cc5b5d8bc`) y Worker M2  
**Fecha**: 2026-09-06T01:53:00Z  
**Tipo**: Hard Handoff (Investigación y Especificación Completa)

---

## 1. Observation (Observaciones Directas)

1. **Entorno de Ejecución Local**:
   - Comando: `node -v && npm -v && python3 --version`
   - Salida:
     ```text
     v22.21.0
     10.9.4
     Python 3.14.6
     ```
2. **Requisitos de Pruebas de la Característica 4 (Feature 4)**:
   - Archivo: `tests/tier1_features.test.mjs` (Líneas 185 a 220).
   - T1.4.1 valida presencia de `package.json` y existencia obligatoria del script `"build"`:
     ```javascript
     const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
     assert.ok(pkg.scripts?.build, 'Debe incluir script build');
     ```
   - T1.4.2 valida `astro.config.mjs` requiriendo salida estática:
     ```javascript
     assert.ok(content.includes("output: 'static'") || content.includes('output: "static"'));
     ```
   - T1.4.3 valida presencia de `tailwind.config.mjs` con `content` o `theme`.
   - T1.4.4 valida presencia de `tsconfig.json` con `compilerOptions`.
   - T1.4.5 valida compatibilidad con Node v22 (`nodeMajor >= 18`).
3. **Requisitos de Arquitectura y Dominio Canónico**:
   - `PROJECT.md` Línea 4: `Astro 5 (SSG Static Site Generation, output: 'static') + Tailwind CSS + React 19 / TypeScript`.
   - `tests/helpers/contracts.mjs` Línea 65: `export const CANONICAL_BASE_URL = 'https://almaholistica.com';`.
   - `DISPATCH.md` Líneas 14-17: `astro.config.mjs con site: 'https://almaholistica.com', output: 'static', trailingSlash: 'always'`.
4. **Validación Experimental de Dependencias en Sandbox**:
   - Se probó la resolución real con `npm install` en `/tmp/test-m2-verification`:
     - Astro: `5.18.2`
     - `@astrojs/react`: `4.4.2` (con soporte para `react: ^19.0.0`)
     - `@astrojs/tailwind`: `5.1.5` (con peerDependency `tailwindcss: ^3.0.24`)
     - `tailwindcss`: `3.4.19`
     - `react`: `19.2.8`
     - `react-dom`: `19.2.8`
     - `typescript`: `5.9.3`
     - `@astrojs/check`: `0.9.10`
     - `csv-parse`: `5.6.0`
     - `@types/node`: `22.20.1`
     - `@types/react`: `19.2.18`
     - `@types/react-dom`: `19.2.7`
   - Salida del comando: `added 461 packages in 11s. 0 errors.`
   - Ejecución de `npx astro check`:
     ```text
     [content] Syncing content
     [types] Generated 111ms
     [check] Getting diagnostics for Astro files...
     Result (2 files): 0 errors, 0 warnings, 0 hints
     ```

---

## 2. Logic Chain (Cadena de Razonamiento Lógico)

1. **Alineación de Versiones de Astro 5 y Tailwind**:
   - Dado que `@astrojs/tailwind@5.1.5` declara como peer dependency `tailwindcss: ^3.0.24`, utilizar Tailwind CSS v4 introduciría discrepancias severas con la integración oficial de Astro para Tailwind. La versión especificada `tailwindcss: "^3.4.17"` cumple a cabalidad con la integración de Astro y permite el archivo de configuración `tailwind.config.mjs` estándar requerido por `PROJECT.md` y `tests/tier1_features.test.mjs` (T1.4.3).
2. **Soporte de React 19 sin Advertencias de Peer Dependencies**:
   - Tanto `@astrojs/react@4.2.1+` como sus tipos asociados `@types/react@^19` y `@types/react-dom@^19` soportan formalmente React 19 (`^17.0.2 || ^18.0.0 || ^19.0.0`). Nuestra prueba empírica en Node 22 confirmó instalación libre de conflictos.
3. **Mapeo de Rutas y Modo Estricto en TypeScript**:
   - Extender `"astro/tsconfigs/strict"` otorga la configuración estricta estándar del core de Astro.
   - Definir `"jsx": "react-jsx"` y `"jsxImportSource": "react"` asegura que los componentes TSX de React 19 (como `WhatsAppQuizModal.tsx` en M3) compilen sin necesidad de importar manualmente `React`.
   - El path alias `"@/*": ["src/*"]` garantiza importaciones canónicas y limpias para los datasets (`@/data`), modelos (`@/types`), layouts (`@/layouts`) y configuración (`@/config`).
4. **Configuración de Astro (`astro.config.mjs`)**:
   - `site: 'https://almaholistica.com'` y `output: 'static'` satisfacen T1.4.2 y el contrato de `CANONICAL_BASE_URL`.
   - `trailingSlash: 'always'` garantiza que las rutas generadas para ciudades (`/bogota/`) y dolencias (`/biodescodificacion/gastritis/`) sigan el estándar canónico sin redirecciones 301 intermedias.
5. **Orquestación de Scripts de npm**:
   - `"build": "astro check && astro build"` asegura que cualquier error de tipado o de sintaxis en plantillas Astro aborte la compilación antes de emitir archivos a `dist/`.
   - `"sitemap": "python3 scripts/generate_sitemap.py"` provee el trigger independiente exigido por el dispatch y la arquitectura SitemapFast.
   - `"test": "node --test tests/tier1_features.test.mjs tests/tier2_edge_cases.test.mjs tests/tier3_cross_feature.test.mjs tests/tier4_user_journeys.test.mjs"` permite ejecutar la suite de pruebas nativa de Node.js en cualquier momento.

---

## 3. Caveats (Advertencias y Supuestos)

1. **Scripts de Sitemap en M2**: El script `scripts/generate_sitemap.py` pertenece al Hito M5. Por ende, en el Hito M2 `"build"` ejecuta `astro check && astro build`. El script `"sitemap"` ya queda definido en `package.json` para cuando M5 lo implemente.
2. **Ausencia Temporal de Páginas en M2**: En M2 aún no existen páginas en `src/pages/` (se crearán en M4). Durante M2, `npx astro check` verifica la estructura, componentes y layouts sin errores.
3. **Restricción de Solo Lectura**: Como Explorer, no modificamos los archivos de la raíz (`package.json`, etc.), sino que suministramos el código exacto y las instrucciones operativas listas para que el Worker de M2 las aplique.

---

## 4. Conclusion & Especificaciones Concretas para el Worker

El Worker de M2 debe escribir exactamente los siguientes tres archivos en la raíz del proyecto y luego ejecutar la instalación:

### Archivo 1: `package.json` (Ruta: `/Users/anthony/Downloads/almaholistica.com/package.json`)

```json
{
  "name": "almaholistica",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "sitemap": "python3 scripts/generate_sitemap.py",
    "check": "astro check",
    "test": "node --test tests/tier1_features.test.mjs tests/tier2_edge_cases.test.mjs tests/tier3_cross_feature.test.mjs tests/tier4_user_journeys.test.mjs"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/react": "^4.2.1",
    "@astrojs/tailwind": "^5.1.5",
    "astro": "^5.4.2",
    "csv-parse": "^5.6.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  },
  "devDependencies": {
    "@types/node": "^22.13.5",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4"
  }
}
```

### Archivo 2: `astro.config.mjs` (Ruta: `/Users/anthony/Downloads/almaholistica.com/astro.config.mjs`)

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://almaholistica.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind()
  ]
});
```

### Archivo 3: `tsconfig.json` (Ruta: `/Users/anthony/Downloads/almaholistica.com/tsconfig.json`)

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 5. Verification Method (Método de Verificación Independiente)

Para verificar independientemente la validez de la configuración y ejecución:

1. **Instalación de Dependencias**:
   ```bash
   cd /Users/anthony/Downloads/almaholistica.com
   npm install
   ```
   *Criterio de éxito*: Salida `added ... packages`, código de salida 0 sin errores de peer dependency.

2. **Verificación de Versión de Astro y Chequeo Estático**:
   ```bash
   npx astro --version
   npx astro check
   ```
   *Criterio de éxito*: Versión `astro v5.x.x` y `0 errors, 0 warnings, 0 hints`.

3. **Verificación de Pruebas Automatizadas de la Característica 4**:
   ```bash
   node --test tests/tier1_features.test.mjs
   ```
   *Criterio de éxito*: Los tests `T1.4.1`, `T1.4.2`, `T1.4.4` y `T1.4.5` deben ejecutarse y pasar con status `ok` (dejan de saltarse al encontrar los archivos en disco).

4. **Condición de Invalidación**:
   - Si `npm install` falla por incompatibilidad de dependencias en Node v22.
   - Si `astro.config.mjs` no contiene `output: 'static'`.
   - Si `tsconfig.json` no contiene `compilerOptions`.
