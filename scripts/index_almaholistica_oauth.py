#!/usr/bin/env python3
"""
Script de Indexación Masiva para Alma Holística mediante Google Indexing API (OAuth 2.0).
Lee automáticamente las 160 URLs de public/sitemap-0.xml, refresca el token de OAuth,
y notifica a Google con pausas controladas para respetar la cuota diaria (200 URLs).
"""

import os
import sys
import time
import json
import xml.etree.ElementTree as ET
from datetime import datetime
import requests
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

SCOPES = [
    'https://www.googleapis.com/auth/indexing',
    'https://www.googleapis.com/auth/webmasters.readonly'
]

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

def load_credentials(token_path='token.json', client_secrets_path='client_secret.json'):
    if not os.path.exists(token_path):
        raise FileNotFoundError(f"No se encontró el archivo de token: {token_path}")
    
    with open(token_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    creds = Credentials.from_authorized_user_info(data, SCOPES)

    if not creds.valid:
        if creds.expired and creds.refresh_token:
            print("🔄 Refrescando token de acceso OAuth con Google...")
            creds.refresh(Request())
            # Guardar el token actualizado
            with open(token_path, 'w', encoding='utf-8') as f:
                f.write(creds.to_json())
            print("✅ Token renovado exitosamente.")
        else:
            raise RuntimeError("El token expiró y no tiene refresh_token válido.")

    return creds

def get_sitemap_urls(sitemap_path='public/sitemap-0.xml'):
    if not os.path.exists(sitemap_path):
        raise FileNotFoundError(f"No se encontró el sitemap en: {sitemap_path}")
    
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    
    urls = []
    for loc in root.findall('ns:url/ns:loc', namespace):
        url = loc.text.strip()
        if url:
            urls.append(url)
            
    return urls

def main():
    print("=" * 70)
    print("🚀 GOOGLE INDEXING API — ALMA HOLÍSTICA (OAuth 2.0)")
    print("=" * 70)

    # 1. Cargar credenciales
    creds = load_credentials()
    
    # 2. Cargar URLs
    urls = get_sitemap_urls()
    total_urls = len(urls)
    print(f"📄 Total de URLs detectadas en sitemap-0.xml: {total_urls}")

    # Límite de seguridad
    limit = 200
    urls_to_index = urls[:limit]
    print(f"🎯 URLs a notificar en esta ejecución: {len(urls_to_index)} (Cuota máxima: {limit}/día)")

    # 3. Cargar log previo si existe
    log_file = 'indexing_log.json'
    indexing_log = {}
    if os.path.exists(log_file):
        try:
            with open(log_file, 'r', encoding='utf-8') as f:
                indexing_log = json.load(f)
        except Exception:
            indexing_log = {}

    success_count = 0
    error_count = 0

    print("-" * 70)
    start_time = time.time()

    for idx, url in enumerate(urls_to_index, 1):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {creds.token}"
        }
        body = {
            "url": url,
            "type": "URL_UPDATED"
        }

        try:
            # Si el token expiró durante una corrida larga, refrescarlo
            if creds.expired and creds.refresh_token:
                creds.refresh(Request())
                headers["Authorization"] = f"Bearer {creds.token}"

            resp = requests.post(ENDPOINT, headers=headers, json=body, timeout=10)
            
            if resp.status_code == 200:
                success_count += 1
                status_str = "✅ 200 OK"
                indexing_log[url] = {
                    "status": 200,
                    "timestamp": datetime.now().isoformat(),
                    "type": "URL_UPDATED"
                }
            else:
                error_count += 1
                status_str = f"❌ {resp.status_code}: {resp.text}"
                indexing_log[url] = {
                    "status": resp.status_code,
                    "error": resp.text,
                    "timestamp": datetime.now().isoformat(),
                    "type": "URL_UPDATED"
                }
                
            print(f"[{idx:3d}/{len(urls_to_index)}] {status_str} -> {url}")

        except Exception as err:
            error_count += 1
            print(f"[{idx:3d}/{len(urls_to_index)}] 🔥 ERROR: {err} -> {url}")
            indexing_log[url] = {
                "status": "exception",
                "error": str(err),
                "timestamp": datetime.now().isoformat()
            }

        # Guardar log incrementalmente
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(indexing_log, f, indent=2, ensure_ascii=False)

        # Pausa para respetar el rate limit de Google
        time.sleep(1.0)

    elapsed = time.time() - start_time
    print("=" * 70)
    print("📊 RESUMEN DE INDEXACIÓN")
    print(f"  • URLs exitosas: {success_count}/{len(urls_to_index)}")
    print(f"  • Errores:       {error_count}")
    print(f"  • Tiempo total:  {elapsed:.1f}s")
    print(f"  • Archivo log:   {log_file}")
    print("=" * 70)

if __name__ == "__main__":
    main()
