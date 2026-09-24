#!/usr/bin/env python3
"""
scripts/generate_sitemap.py
Generador automatizado de sitemaps y robots.txt siguiendo la arquitectura SitemapFast.
Proyecto: Alma Holística (https://almaholistica.com)

Genera:
1. public/sitemap-0.xml y public/sitemap.xml (exactamente 180 URLs con trailing slash)
2. public/sitemap-index.xml (apuntando a sitemap-0.xml)
3. public/robots.txt (con doble puntero a sitemap-index.xml y sitemap.xml)
4. Réplica automática en dist/ si el directorio dist/ existe tras el build.
"""

import os
import csv
import json
from datetime import datetime, timezone

DOMAIN = 'https://almaholistica.com'
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DATA_DIR = os.path.join(ROOT_DIR, 'src', 'data')
PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
DIST_DIR = os.path.join(ROOT_DIR, 'dist')
TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')


def load_city_slugs() -> list[str]:
    csv_path = os.path.join(SRC_DATA_DIR, 'dataset_almaholistica_ciudades.csv')
    slugs = []
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"No se encontró el dataset de ciudades en: {csv_path}")

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            raw_slug = row.get('URL Final (Slug)', '')
            if raw_slug:
                clean_slug = raw_slug.strip().strip('/').lower()
                if clean_slug:
                    slugs.append(clean_slug)
    return slugs


def load_dolencia_slugs() -> list[str]:
    json_path = os.path.join(SRC_DATA_DIR, 'dataset_biodescodificacion_dolencias.json')
    slugs = []
    if not os.path.exists(json_path):
        raise FileNotFoundError(f"No se encontró el dataset de dolencias en: {json_path}")

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        for item in data:
            raw_slug = item.get('slug', '')
            if raw_slug:
                clean_slug = raw_slug.strip().strip('/').lower()
                if clean_slug:
                    slugs.append(clean_slug)
    return slugs


def load_country_slugs() -> list[str]:
    json_path = os.path.join(SRC_DATA_DIR, 'dataset_almaholistica_paises.json')
    slugs = []
    if not os.path.exists(json_path):
        raise FileNotFoundError(f"No se encontró el dataset de países en: {json_path}")

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        for item in data:
            raw_slug = item.get('slug', '')
            if raw_slug:
                clean_slug = raw_slug.strip().strip('/').lower()
                if clean_slug:
                    slugs.append(clean_slug)
    return slugs


def build_url_list() -> list[dict]:
    # 1. Rutas Estáticas Principales
    urls = [
        {'loc': f'{DOMAIN}/', 'priority': '1.0', 'changefreq': 'daily'},
        {'loc': f'{DOMAIN}/biodescodificacion/', 'priority': '0.9', 'changefreq': 'weekly'},
    ]

    # 2. Rutas Dinámicas de Ciudades (113 ciudades)
    city_slugs = load_city_slugs()
    for slug in city_slugs:
        urls.append({
            'loc': f'{DOMAIN}/{slug}/',
            'priority': '0.8',
            'changefreq': 'weekly'
        })

    # 3. Rutas Dinámicas de Dolencias (45 patologías)
    dolencia_slugs = load_dolencia_slugs()
    for slug in dolencia_slugs:
        urls.append({
            'loc': f'{DOMAIN}/biodescodificacion/{slug}/',
            'priority': '0.8',
            'changefreq': 'weekly'
        })

    # 4. Rutas Dinámicas de Hubs de País (20 países)
    country_slugs = load_country_slugs()
    for slug in country_slugs:
        urls.append({
            'loc': f'{DOMAIN}/{slug}/',
            'priority': '0.8',
            'changefreq': 'weekly'
        })

    return urls


def generate_sitemap_xml(urls: list[dict]) -> str:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
    ]
    for u in urls:
        lines.append('  <url>')
        lines.append(f'    <loc>{u["loc"]}</loc>')
        lines.append(f'    <lastmod>{TODAY}</lastmod>')
        lines.append(f'    <changefreq>{u["changefreq"]}</changefreq>')
        lines.append(f'    <priority>{u["priority"]}</priority>')
        lines.append('  </url>')
    lines.append('</urlset>')
    return '\n'.join(lines) + '\n'


def generate_sitemap_index_xml() -> str:
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>{DOMAIN}/sitemap-0.xml</loc>
    <lastmod>{TODAY}</lastmod>
  </sitemap>
</sitemapindex>
'''


def generate_robots_txt() -> str:
    return f'''User-agent: *
Allow: /

Sitemap: {DOMAIN}/sitemap-index.xml
Sitemap: {DOMAIN}/sitemap.xml
'''


def write_and_replicate(filename: str, content: str):
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    pub_target = os.path.join(PUBLIC_DIR, filename)
    with open(pub_target, 'w', encoding='utf-8') as f:
        f.write(content)

    if os.path.exists(DIST_DIR):
        dist_target = os.path.join(DIST_DIR, filename)
        with open(dist_target, 'w', encoding='utf-8') as f:
            f.write(content)


def main():
    print("Iniciando generación de arquitectura SitemapFast...")
    urls = build_url_list()
    total_urls = len(urls)

    if total_urls != 180:
        print(f"⚠️ Advertencia: Total de URLs generadas es {total_urls}, esperado: 180.")
    else:
        print(f"✅ Total de URLs exactamente 180 (1 home + 1 catálogo + 113 ciudades + 45 dolencias + 20 hubs de país).")

    # 1. Contenido de sitemaps
    sitemap_content = generate_sitemap_xml(urls)
    write_and_replicate('sitemap-0.xml', sitemap_content)
    write_and_replicate('sitemap.xml', sitemap_content)

    # 2. Contenido de sitemap-index
    sitemap_index_content = generate_sitemap_index_xml()
    write_and_replicate('sitemap-index.xml', sitemap_index_content)

    # 3. Contenido de robots.txt
    robots_content = generate_robots_txt()
    write_and_replicate('robots.txt', robots_content)

    print(f"✅ SitemapFast completado con éxito.")
    print(f"   Archivos generados en {PUBLIC_DIR}:")
    print(f"   - sitemap-index.xml")
    print(f"   - sitemap-0.xml ({total_urls} URLs)")
    print(f"   - sitemap.xml ({total_urls} URLs)")
    print(f"   - robots.txt")
    if os.path.exists(DIST_DIR):
        print(f"   Réplica completada en {DIST_DIR}.")


if __name__ == '__main__':
    main()
