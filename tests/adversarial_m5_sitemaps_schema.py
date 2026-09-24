#!/usr/bin/env python3
"""
tests/adversarial_m5_sitemaps_schema.py
Adversarial Stress & Verification Harness — Milestone M5 (Sitemaps & Schemas)
Author: teamwork_preview_challenger_m5_1 (EMPIRICAL CHALLENGER)

Executes 6 empirical dimensions of stress-testing and deep validation:
- Dim 1: Exact 1:1 biunivocal mapping (180 URLs = 180 HTML files in dist/)
- Dim 2: Exact byte-level replication into dist/
- Dim 3: Strict XML syntax, namespaces, element hierarchy and RFC compliance
- Dim 4: robots.txt syntax and double sitemap pointer validation
- Dim 5: Static HTML JSON-LD forensic audit (421 schemas parsed, zero failures)
- Dim 6: Auto-discovery <link rel="sitemap"> and canonical trailing slash audit
"""

import os
import sys
import json
import re
from datetime import datetime
import xml.etree.ElementTree as ET

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
DIST_DIR = os.path.join(ROOT_DIR, 'dist')
DOMAIN = 'https://almaholistica.com'


def run_dimension_1_biunivocal_mapping():
    print("\n--- DIMENSION 1: Mapeo Biunívoco 1:1 (URLs vs Archivos HTML) ---")
    sitemap_path = os.path.join(PUBLIC_DIR, 'sitemap-0.xml')
    assert os.path.isfile(sitemap_path), f"Falta {sitemap_path}"

    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

    urls = [loc.text.strip() for loc in root.findall('ns:url/ns:loc', ns)]
    print(f"Total de URLs extraídas de sitemap-0.xml: {len(urls)}")
    assert len(urls) == 180, f"Se esperaban 180 URLs exactas, se encontraron {len(urls)}"

    # Verificar unicidad
    duplicates = [url for url in urls if urls.count(url) > 1]
    assert len(duplicates) == 0, f"URLs duplicadas detectadas: {set(duplicates)}"

    # Mapeo a rutas de dist/
    expected_html_files = set()
    for u in urls:
        assert u.startswith(f"{DOMAIN}/"), f"Dominio incorrecto en URL: {u}"
        assert u.endswith('/'), f"URL sin trailing slash: {u}"
        path_part = u[len(DOMAIN):].strip('/')
        if not path_part:
            html_rel = 'index.html'
        else:
            html_rel = os.path.join(path_part, 'index.html')
        html_full = os.path.normpath(os.path.join(DIST_DIR, html_rel))
        assert os.path.isfile(html_full), f"Archivo HTML faltante para URL {u}: {html_full}"
        size = os.path.getsize(html_full)
        assert size > 500, f"Archivo HTML sospechosamente pequeño o vacío ({size} bytes): {html_full}"
        expected_html_files.add(html_full)

    # Recolección real de todos los HTML en dist/
    actual_html_files = set()
    for root_d, _, files in os.walk(DIST_DIR):
        for f in files:
            if f.endswith('.html'):
                actual_html_files.add(os.path.normpath(os.path.join(root_d, f)))

    print(f"Total de archivos HTML encontrados físicamente en dist/: {len(actual_html_files)}")
    assert len(actual_html_files) == 180, f"dist/ tiene {len(actual_html_files)} HTML, esperado 180"

    diff_expected = expected_html_files - actual_html_files
    diff_actual = actual_html_files - expected_html_files
    assert len(diff_expected) == 0, f"Archivos esperados no encontrados: {diff_expected}"
    assert len(diff_actual) == 0, f"Archivos huérfanos no mapeados en sitemap: {diff_actual}"
    print("✅ DIMENSION 1 PASSED: 180 URLs mapean 1:1 exactamente a 180 archivos HTML en dist/")


def run_dimension_2_dist_replication():
    print("\n--- DIMENSION 2: Réplica Exacta de Archivos Públicos en dist/ ---")
    files_to_check = ['sitemap-0.xml', 'sitemap.xml', 'sitemap-index.xml', 'robots.txt']
    for f in files_to_check:
        pub_p = os.path.join(PUBLIC_DIR, f)
        dist_p = os.path.join(DIST_DIR, f)
        assert os.path.isfile(pub_p), f"Falta archivo en public/: {pub_p}"
        assert os.path.isfile(dist_p), f"Falta réplica en dist/: {dist_p}"
        with open(pub_p, 'rb') as fp:
            pub_bytes = fp.read()
        with open(dist_p, 'rb') as fp:
            dist_bytes = fp.read()
        assert pub_bytes == dist_bytes, f"Discrepancia de contenido binario entre public/{f} y dist/{f}"
        print(f"  ✓ public/{f} == dist/{f} ({len(pub_bytes)} bytes)")
    print("✅ DIMENSION 2 PASSED: Réplica en dist/ 100% idéntica byte-por-byte")


def run_dimension_3_xml_syntax():
    print("\n--- DIMENSION 3: Estándares XML, Namespaces y RFC Sitemaps.org ---")
    # 1. sitemap-index.xml
    index_path = os.path.join(PUBLIC_DIR, 'sitemap-index.xml')
    with open(index_path, 'r', encoding='utf-8') as fp:
        raw_idx = fp.read().strip()
    assert raw_idx.startswith('<?xml version="1.0" encoding="UTF-8"?>'), "Declaración XML faltante en sitemap-index.xml"
    assert raw_idx.endswith('</sitemapindex>'), "Etiqueta de cierre faltante en sitemap-index.xml"

    tree_idx = ET.parse(index_path)
    root_idx = tree_idx.getroot()
    assert root_idx.tag == '{http://www.sitemaps.org/schemas/sitemap/0.9}sitemapindex'
    sitemaps = root_idx.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}sitemap')
    assert len(sitemaps) == 1, f"Se esperaba 1 sitemap en sitemap-index, se hallaron {len(sitemaps)}"
    loc_val = sitemaps[0].find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text.strip()
    lastmod_val = sitemaps[0].find('{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod').text.strip()
    assert loc_val == f"{DOMAIN}/sitemap-0.xml"
    datetime.strptime(lastmod_val, '%Y-%m-%d')
    print("  ✓ sitemap-index.xml validado correctamente")

    # 2. sitemap-0.xml y sitemap.xml
    valid_freqs = {'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'}
    for name in ['sitemap-0.xml', 'sitemap.xml']:
        s_path = os.path.join(PUBLIC_DIR, name)
        with open(s_path, 'r', encoding='utf-8') as fp:
            raw_s = fp.read().strip()
        assert raw_s.startswith('<?xml version="1.0" encoding="UTF-8"?>')
        assert raw_s.endswith('</urlset>')

        tree = ET.parse(s_path)
        root = tree.getroot()
        assert root.tag == '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset'
        urls = root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
        assert len(urls) == 180

        for idx, u in enumerate(urls):
            loc = u.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text.strip()
            lastmod = u.find('{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod').text.strip()
            changefreq = u.find('{http://www.sitemaps.org/schemas/sitemap/0.9}changefreq').text.strip()
            priority = u.find('{http://www.sitemaps.org/schemas/sitemap/0.9}priority').text.strip()

            assert loc.startswith(f"{DOMAIN}/"), f"Loc inválido en URL #{idx}: {loc}"
            assert loc.endswith('/'), f"Loc sin barra final en URL #{idx}: {loc}"
            datetime.strptime(lastmod, '%Y-%m-%d')
            assert changefreq in valid_freqs, f"Frecuencia inválida en URL #{idx}: {changefreq}"
            p_val = float(priority)
            assert 0.0 <= p_val <= 1.0, f"Prioridad fuera de rango [0.0, 1.0] en URL #{idx}: {priority}"

            # Validación de jerarquía de prioridades
            if loc == f"{DOMAIN}/":
                assert priority == '1.0' and changefreq == 'daily'
            elif loc == f"{DOMAIN}/biodescodificacion/":
                assert priority == '0.9' and changefreq == 'weekly'
            else:
                assert priority == '0.8' and changefreq == 'weekly'

        print(f"  ✓ {name} (180 URLs) validado con jerarquía de prioridades correcta")

    print("✅ DIMENSION 3 PASSED: Protocolos XML y Sitemaps.org 100% conformes")


def run_dimension_4_robots_txt():
    print("\n--- DIMENSION 4: Protocolo robots.txt ---")
    robots_path = os.path.join(PUBLIC_DIR, 'robots.txt')
    with open(robots_path, 'r', encoding='utf-8') as fp:
        lines = [line.strip() for line in fp if line.strip()]

    assert 'User-agent: *' in lines, "Falta User-agent: * en robots.txt"
    assert 'Allow: /' in lines, "Falta Allow: / en robots.txt"
    assert f"Sitemap: {DOMAIN}/sitemap-index.xml" in lines, "Falta Sitemap: sitemap-index.xml"
    assert f"Sitemap: {DOMAIN}/sitemap.xml" in lines, "Falta Sitemap: sitemap.xml"

    print("  ✓ User-agent: * y Allow: / presentes")
    print(f"  ✓ Doble puntero: sitemap-index.xml y sitemap.xml declarados")
    print("✅ DIMENSION 4 PASSED: robots.txt cumple cabalmente con la directriz técnica")


def run_dimension_5_jsonld_schemas():
    print("\n--- DIMENSION 5: Auditoría Forense de Schemas JSON-LD en dist/ ---")
    pattern = re.compile(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.DOTALL)

    country_paises_path = os.path.join(ROOT_DIR, 'src', 'data', 'dataset_almaholistica_paises.json')
    with open(country_paises_path, 'r', encoding='utf-8') as cp_file:
        country_slugs = set(c['slug'] for c in json.load(cp_file))

    city_pages = 0
    country_pages = 0
    dolencia_pages = 0
    total_schemas = 0

    for root_d, _, files in os.walk(DIST_DIR):
        for f in files:
            if f.endswith('.html'):
                fpath = os.path.join(root_d, f)
                rel = os.path.relpath(fpath, DIST_DIR)
                with open(fpath, 'r', encoding='utf-8') as html_file:
                    content = html_file.read()

                matches = pattern.findall(content)

                if rel in ['index.html', os.path.join('biodescodificacion', 'index.html')]:
                    assert len(matches) == 0, f"Índice {rel} no debería contener schemas de entidad"
                elif rel.startswith('biodescodificacion' + os.sep):
                    assert len(matches) == 3, f"Página {rel} esperaba 3 schemas, hallados {len(matches)}"
                    dolencia_pages += 1
                    total_schemas += 3
                    # Tipos esperados
                    types = []
                    for m in matches:
                        data = json.loads(m.strip())
                        assert data.get('@context') == 'https://schema.org'
                        types.append(data.get('@type'))
                    assert 'MedicalWebPage' in types
                    assert 'FAQPage' in types
                    assert 'BreadcrumbList' in types
                elif rel.split(os.sep)[0] in country_slugs:
                    assert len(matches) == 3, f"Página {rel} esperaba 3 schemas, hallados {len(matches)}"
                    country_pages += 1
                    total_schemas += 3
                    # Tipos esperados
                    types = []
                    for m in matches:
                        data = json.loads(m.strip())
                        assert data.get('@context') == 'https://schema.org'
                        types.append(data.get('@type'))
                    assert 'MedicalWebPage' in types
                    assert 'FAQPage' in types
                    assert 'BreadcrumbList' in types
                else:
                    assert len(matches) == 2, f"Página {rel} esperaba 2 schemas, hallados {len(matches)}"
                    city_pages += 1
                    total_schemas += 2
                    types = []
                    for m in matches:
                        data = json.loads(m.strip())
                        assert data.get('@context') == 'https://schema.org'
                        types.append(data.get('@type'))
                    assert 'HealthAndBeautyBusiness' in types
                    assert 'BreadcrumbList' in types

    print(f"  ✓ 113 páginas de ciudades auditadas (2 schemas c/u = {city_pages * 2})")
    print(f"  ✓ 20 páginas de hubs de país auditadas (3 schemas c/u = {country_pages * 3})")
    print(f"  ✓ 45 páginas de dolencias auditadas (3 schemas c/u = {dolencia_pages * 3})")
    print(f"  ✓ Total de schemas JSON-LD válidos en el sitio: {total_schemas}")
    assert city_pages == 113
    assert country_pages == 20
    assert dolencia_pages == 45
    assert total_schemas == 421
    print("✅ DIMENSION 5 PASSED: 421 esquemas JSON-LD analizados y validados sin un solo fallo de sintaxis")


def run_dimension_6_html_head_audit():
    print("\n--- DIMENSION 6: Auto-descubrimiento y Etiquetas Canónicas en <head> ---")
    sitemap_link_pattern = re.compile(r'<link[^>]+rel=["\']sitemap["\'][^>]+href=["\']/sitemap-index\.xml["\']', re.IGNORECASE)
    canonical_pattern = re.compile(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](https://almaholistica\.com[^"\']*)["\']', re.IGNORECASE)

    checked = 0
    for root_d, _, files in os.walk(DIST_DIR):
        for f in files:
            if f.endswith('.html'):
                fpath = os.path.join(root_d, f)
                rel = os.path.relpath(fpath, DIST_DIR)
                with open(fpath, 'r', encoding='utf-8') as html_file:
                    content = html_file.read()

                # Verificar <link rel="sitemap" href="/sitemap-index.xml">
                assert sitemap_link_pattern.search(content), f"Falta link sitemap-index.xml en {fpath}"

                # Verificar canonical tag
                canon_match = canonical_pattern.search(content)
                assert canon_match, f"Falta canonical tag en {fpath}"
                canon_url = canon_match.group(1)
                # Las 180 páginas tienen trailing slash estricto conforme a astro.config.mjs
                assert canon_url.endswith('/'), f"Canonical sin trailing slash en {fpath}: {canon_url}"

                checked += 1

    print(f"  ✓ 180 páginas HTML contienen <link rel=\"sitemap\" href=\"/sitemap-index.xml\" />")
    print(f"  ✓ 180 páginas HTML contienen <link rel=\"canonical\" href=\"https://almaholistica.com/...\" /> (100% con barra final estricta)")
    print("✅ DIMENSION 6 PASSED: Metadatos de auto-descubrimiento y canonicalización 100% correctos")


def main():
    print("================================================================================")
    print("INICIANDO SUITE ADVERSARIAL M5 — SITEMAPS & SCHEMAS (EMPIRICAL CHALLENGER)")
    print("================================================================================")
    run_dimension_1_biunivocal_mapping()
    run_dimension_2_dist_replication()
    run_dimension_3_xml_syntax()
    run_dimension_4_robots_txt()
    run_dimension_5_jsonld_schemas()
    run_dimension_6_html_head_audit()
    print("\n================================================================================")
    print("TODAS LAS 6 DIMENSIONES ADVERSARIALES M5 PASARON EMPÍRICAMENTE AL 100%!")
    print("VEREDICTO: CONFIRM_CORRECTNESS")
    print("================================================================================")


if __name__ == '__main__':
    main()
