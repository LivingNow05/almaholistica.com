---
name: sitemapfast
description: "Implementa la arquitectura de Sitemaps de alta velocidad estilo Astro (sitemap-index.xml + sitemap-0.xml, auto-descubrimiento en <head>, robots.txt y generadores para SEO programático) para lograr indexación masiva ultra-rápida en Google Search Console. Trigger: '/sitemapfast'."
---

# Skill: SitemapFast ⚡ (Arquitectura de Indexación Rápida)

Esta skill implementa la arquitectura de sitemaps multi-nivel optimizada (estilo Astro) para lograr la máxima velocidad de rastreo e indexación en Google Search Console y otros motores de búsqueda.

## 🎯 Cuándo usar esta skill
- Cuando el usuario ejecute `/sitemapfast`.
- Al iniciar o auditar un proyecto con páginas masivas (SEO programático, landing pages por ciudades, productos o artículos de blog).
- Cuando se necesite configurar o corregir el descubrimiento de URLs y sitemaps para Googlebot.

---

## 🏗️ Los 4 Pilares de la Arquitectura SitemapFast

### 1. Estructura de Sitemaps en 2 Niveles
En lugar de un único sitemap plano que pueda volverse pesado o confuso para los rastreadores, se implementa una jerarquía:
- **`sitemap-index.xml`:** Índice maestro que agrupa y divide los sub-sitemaps.
- **`sitemap-0.xml` (y `sitemap.xml`):** Sub-sitemaps con las URLs finales, prioridades (`<priority>`), fechas de actualización (`<lastmod>`) y frecuencia de cambio (`<changefreq>`).

### 2. Auto-descubrimiento en el `<head>` del HTML
Se inyecta obligatoriamente en el `<head>` de todas las páginas:
```html
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap-index.xml" />
```
*Beneficio:* Cada vez que Googlebot aterriza en cualquier página secundaria (por un backlink o búsqueda), descubre de inmediato el sitemap maestro sin tener que rastrear la home primero.

### 3. Punteros Dobles en `robots.txt`
El archivo `robots.txt` en la raíz debe declarar explícitamente:
```text
User-agent: *
Allow: /

Sitemap: https://<DOMINIO>/sitemap-index.xml
Sitemap: https://<DOMINIO>/sitemap.xml
```

### 4. Generador Automatizado (`scripts/generate_sitemap.py`)
Un script en Python o TypeScript que lee las rutas estáticas y los datasets dinámicos (CSV, JSON, base de datos) y regenera todos los XMLs en 1 segundo.

---

## 📋 Flujo de Ejecución Paso a Paso

1. **Detección del Entorno y Dominio:**
   - Identificar el dominio canónico de producción (ej: `https://frenchbulldogfluffy.com` o el configurado en el proyecto).
   - Localizar el directorio público (`public/` o `dist/` según el framework).
   - Identificar las fuentes de datos para SEO programático (ej: `public/dataset_*.csv`, `src/data/*.json`, o rutas dinámicas).

2. **Creación del Script Generador (`scripts/generate_sitemap.py`):**
   ```python
   import os
   import csv
   from datetime import datetime, timezone

   DOMAIN = 'https://tu-dominio.com'
   ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
   PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
   TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')

   def generate_sitemaps():
       urls = [
           {'loc': f'{DOMAIN}/', 'priority': '1.0', 'changefreq': 'daily'},
           # Rutas estáticas principales
       ]

       # Cargar URLs dinámicas (CSV / JSON) si existen
       # ...

       # 1. Generar sitemap-0.xml y sitemap.xml
       sitemap_lines = [
           '<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
       ]
       for u in urls:
           sitemap_lines.append('  <url>')
           sitemap_lines.append(f'    <loc>{u["loc"]}</loc>')
           sitemap_lines.append(f'    <lastmod>{TODAY}</lastmod>')
           sitemap_lines.append(f'    <changefreq>{u["changefreq"]}</changefreq>')
           sitemap_lines.append(f'    <priority>{u["priority"]}</priority>')
           sitemap_lines.append('  </url>')
       sitemap_lines.append('</urlset>')
       
       xml_content = '\n'.join(sitemap_lines)
       with open(os.path.join(PUBLIC_DIR, 'sitemap.xml'), 'w', encoding='utf-8') as f:
           f.write(xml_content)
       with open(os.path.join(PUBLIC_DIR, 'sitemap-0.xml'), 'w', encoding='utf-8') as f:
           f.write(xml_content)

       # 2. Generar sitemap-index.xml
       sitemap_index = f'''<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <sitemap>
       <loc>{DOMAIN}/sitemap-0.xml</loc>
       <lastmod>{TODAY}</lastmod>
     </sitemap>
   </sitemapindex>
   '''
       with open(os.path.join(PUBLIC_DIR, 'sitemap-index.xml'), 'w', encoding='utf-8') as f:
           f.write(sitemap_index)

       # 3. Generar robots.txt
       robots_content = f'''User-agent: *
   Allow: /

   Sitemap: {DOMAIN}/sitemap-index.xml
   Sitemap: {DOMAIN}/sitemap.xml
   '''
       with open(os.path.join(PUBLIC_DIR, 'robots.txt'), 'w', encoding='utf-8') as f:
           f.write(robots_content)

       print(f'✅ SitemapFast completado: {len(urls)} URLs generadas.')
   ```

3. **Inyección en el HTML:**
   - Asegurarse de que el `<head>` del template principal (`index.html`, `Base.astro`, `layout.tsx`, etc.) tenga:
     ```html
     <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap-index.xml" />
     <link rel="canonical" href="https://tu-dominio.com/" />
     ```

4. **Validación de Servidor Nginx (Anti-Error 404 en SPA):**
   - Si la aplicación es una SPA (React, Vite, Vue) alojada en Nginx/Docker en Easypanel, verificar que `nginx.conf` tenga `try_files $uri $uri/ /index.html;` (NUNCA usar `=404` ni `error_page 404 /index.html`).
   - Validar con `curl -sI https://tu-dominio.com/ruta-secundaria` que devuelva **`HTTP 200 OK`**.

5. **Validación y Despliegue:**
   - Ejecutar el script generador (`python3 scripts/generate_sitemap.py`).
   - Validar la compilación (`npm run build`).
   - Subir los cambios a GitHub (`git add . && git commit -m "feat(seo): implement /sitemapfast architecture" && git push`) y desplegar en Easypanel.

6. **Instrucciones para el Usuario:**
   - Indicar que en Google Search Console debe enviar `sitemap-index.xml` en la sección de Sitemaps.
