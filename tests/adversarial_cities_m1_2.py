"""
Adversarial Stress Test for dataset_almaholistica_ciudades.csv
Milestone M1 Gate Challenge (teamwork_preview_challenger_m1_2)

Validates:
1. 20 approved countries present with required city quotas (18 LATAM + Spain >= 6 + USA >= 7; total > 100).
2. Geographically coherent currencies (COP for Colombia, EUR for Spain, MXN for Mexico, USD for USA, etc.).
3. Realistic price ranges for therapy sessions in local currency.
4. Uniqueness, completeness, and non-truncation of Historia_Local narratives.
5. Zero pet/puppy/dog niche contamination.
6. Local specificity (landmarks/neighborhoods) in narratives.
7. Slugs, H1 titles, and Meta descriptions sanity.
"""

import csv
import re
import sys
from collections import defaultdict, Counter

CSV_PATH = 'src/data/dataset_almaholistica_ciudades.csv'

APPROVED_20_COUNTRIES = [
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica',
    'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala',
    'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú',
    'República Dominicana', 'Uruguay', 'Venezuela'
]

EXPECTED_CURRENCIES = {
    'Colombia': 'COP',
    'México': 'MXN',
    'Chile': 'CLP',
    'Argentina': 'ARS',
    'Perú': 'PEN',
    'Ecuador': 'USD',
    'Bolivia': 'BOB',
    'Uruguay': 'UYU',
    'Paraguay': 'PYG',
    'Venezuela': 'USD',
    'Costa Rica': 'CRC',
    'Panamá': 'USD',
    'República Dominicana': 'DOP',
    'Guatemala': 'GTQ',
    'El Salvador': 'USD',
    'Honduras': 'HNL',
    'Nicaragua': 'NIO',
    'Brasil': 'BRL',
    'España': 'EUR',
    'Estados Unidos': 'USD',
}

REQUIRED_SPAIN_CITIES = ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'bilbao']
REQUIRED_USA_CITIES = ['miami', 'los-angeles', 'houston', 'nueva-york', 'chicago', 'orlando', 'san-antonio']

PET_KEYWORDS = [
    'cachorro', 'perro', 'canino', 'camada', 'criadero', 'raza', 'mascota',
    'veterinari', 'pedigree', 'adopci', 'fluffy', 'golden retriever', 'labrador',
    'frenchie', 'pastor aleman', 'pug', 'pomerania'
]

# Approximate exchange rates to USD for sanity checking session prices:
RATES_TO_USD = {
    'USD': 1.0,
    'EUR': 1.08,
    'COP': 0.00025,
    'MXN': 0.055,
    'CLP': 0.0011,
    'ARS': 0.00095,
    'PEN': 0.27,
    'BOB': 0.14,
    'UYU': 0.024,
    'PYG': 0.00013,
    'CRC': 0.0019,
    'DOP': 0.017,
    'GTQ': 0.13,
    'HNL': 0.040,
    'NIO': 0.027,
    'BRL': 0.18,
}

def parse_price_range(precio_str, moneda):
    # Remove currency code and symbols
    clean = precio_str.replace(moneda, '')
    # Remove multi-character symbols first before single character symbols
    for sym in ['RD$', 'C$', 'S/.', 'R$', '$', '€', '₡', '₲']:
        clean = clean.replace(sym, '')
    clean = clean.strip()
    parts = clean.split('-')
    if len(parts) != 2:
        return None, None
    
    def parse_val(s):
        s = s.strip()
        if '.' in s and ',' in s:
            s = s.replace(',', '')
        elif '.' in s:
            if len(s.split('.')[-1]) == 3:
                s = s.replace('.', '')
        elif ',' in s:
            if len(s.split(',')[-1]) == 3:
                s = s.replace(',', '')
        return float(s)
    
    return parse_val(parts[0]), parse_val(parts[1])

def run_adversarial_tests():
    errors = []
    warnings = []
    
    print('======================================================================')
    print('EMPIRICAL CHALLENGER: ADVERSARIAL TEST SUITE (M1.2)')
    print('======================================================================')
    
    try:
        with open(CSV_PATH, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            headers = reader.fieldnames
            rows = list(reader)
    except Exception as e:
        print(f'CRITICAL: Failed to read CSV at {CSV_PATH}: {e}')
        sys.exit(1)
        
    print(f'Total Rows Loaded: {len(rows)}')
    print(f'Headers: {headers}\n')
    
    # Check total rows
    if len(rows) < 100:
        errors.append(f'Expected >100 rows, found {len(rows)}')
    
    # 1. Country coverage
    by_country = defaultdict(list)
    for r in rows:
        by_country[r['País']].append(r)
        
    print(f'Distinct Countries Found: {len(by_country)}')
    for country in APPROVED_20_COUNTRIES:
        if country not in by_country:
            errors.append(f'Approved country missing: {country}')
        else:
            count = len(by_country[country])
            if count < 5:
                errors.append(f'Country {country} has only {count} cities (minimum 5 required)')
                
    for c in by_country:
        if c not in APPROVED_20_COUNTRIES:
            errors.append(f'Unauthorized country in dataset: {c}')
            
    # Check specific Spain cities
    spain_slugs = [x['URL Final (Slug)'] for x in by_country.get('España', [])]
    for sc in REQUIRED_SPAIN_CITIES:
        if sc not in spain_slugs:
            errors.append(f'Missing required Spain city slug: {sc}')
            
    # Check specific USA cities
    usa_slugs = [x['URL Final (Slug)'] for x in by_country.get('Estados Unidos', [])]
    for uc in REQUIRED_USA_CITIES:
        if uc not in usa_slugs:
            errors.append(f'Missing required USA city slug: {uc}')
            
    print(f'[TEST 1] Country Coverage & City Quotas: {"FAIL" if errors else "PASS"}')
    
    # 2. Currency Mapping & Price Ranges
    currency_errors = []
    for c, cities in by_country.items():
        expected_curr = EXPECTED_CURRENCIES.get(c)
        for city in cities:
            slug = city['URL Final (Slug)']
            moneda = city['Moneda']
            precio = city['Rango_Precio_Sesion']
            
            if moneda != expected_curr:
                currency_errors.append(f'{slug} ({c}): Moneda is {moneda}, expected {expected_curr}')
                
            if not precio.endswith(moneda):
                currency_errors.append(f'{slug} ({c}): Price "{precio}" does not end with currency "{moneda}"')
                
            p_min, p_max = parse_price_range(precio, moneda)
            if p_min is None or p_max is None:
                currency_errors.append(f'{slug} ({c}): Could not parse price range "{precio}"')
            else:
                if p_min >= p_max:
                    currency_errors.append(f'{slug} ({c}): Min price ({p_min}) >= Max price ({p_max}) in "{precio}"')
                if p_min <= 0:
                    currency_errors.append(f'{slug} ({c}): Non-positive price ({p_min}) in "{precio}"')
                    
                # Economical reasonableness check (approx $20 - $160 USD per session)
                rate = RATES_TO_USD.get(moneda, 1.0)
                usd_min = p_min * rate
                usd_max = p_max * rate
                if usd_min < 20 or usd_max > 160:
                    warnings.append(f'{slug} ({c}): Unusual session price in USD equiv (${usd_min:.1f}-${usd_max:.1f})')
                    
    if currency_errors:
        errors.extend(currency_errors)
    print(f'[TEST 2] Currency Mapping & Price Range Formatting: {"FAIL" if currency_errors else "PASS"}')
    
    # 3. Slugs uniqueness and formatting
    slug_errors = []
    slugs = [r['URL Final (Slug)'] for r in rows]
    slug_counts = Counter(slugs)
    for s, count in slug_counts.items():
        if count > 1:
            slug_errors.append(f'Duplicate slug found: "{s}" ({count} occurrences)')
    for s in slugs:
        if not re.match('^[a-z0-9-]+$', s):
            slug_errors.append(f'Invalid slug format (must be lowercase alphanumeric + hyphens): "{s}"')
        if s.startswith('-') or s.endswith('-'):
            slug_errors.append(f'Slug has leading/trailing hyphen: "{s}"')
            
    if slug_errors:
        errors.extend(slug_errors)
    print(f'[TEST 3] Slug Format & Uniqueness: {"FAIL" if slug_errors else "PASS"}')
    
    # 4. Narratives (Historia_Local) Uniqueness, Truncation, Length, Contamination
    narrative_errors = []
    historias = [r['Historia_Local'] for r in rows]
    historia_counts = Counter(historias)
    for h, count in historia_counts.items():
        if count > 1:
            narrative_errors.append(f'Duplicate Historia_Local detected ({count} identical records)')
            
    for r in rows:
        slug = r['URL Final (Slug)']
        h = r['Historia_Local'].strip()
        if len(h) < 300:
            narrative_errors.append(f'{slug}: Narrative too short ({len(h)} chars, min 300 expected)')
        if not h.endswith('.'):
            narrative_errors.append(f'{slug}: Narrative does not end with period (possible truncation): "{h[-30:]}"')
        if '...' in h:
            narrative_errors.append(f'{slug}: Narrative contains ellipsis (...): "{h[-40:]}"')
            
        # Pet niche contamination check
        full_text = ' '.join(r.values()).lower()
        for kw in PET_KEYWORDS:
            if re.search(r'\b' + re.escape(kw), full_text):
                narrative_errors.append(f'{slug}: Contaminated with pet niche keyword "{kw}"')
                
    if narrative_errors:
        errors.extend(narrative_errors)
    print(f'[TEST 4] Narrative Uniqueness, Truncation & Contamination: {"FAIL" if narrative_errors else "PASS"}')
    
    # 5. Local Specificity Audit: Does each narrative contain local references?
    generic_narratives = []
    for r in rows:
        slug = r['URL Final (Slug)']
        h = r['Historia_Local']
        # Extract city tokens
        city_tokens = [tok for tok in slug.split('-') if len(tok) > 2]
        # At least one token or country should appear in narrative
        found_local = any(tok.lower() in h.lower() for tok in city_tokens) or (r['País'].lower() in h.lower())
        if not found_local:
            generic_narratives.append(slug)
            
    if generic_narratives:
        warnings.append(f'Narratives lacking local city/country token: {generic_narratives}')
    print(f'[TEST 5] Local Specificity Audit: {"WARN" if generic_narratives else "PASS"}')
    
    # 6. Domain, Category, H1 and Meta descriptions
    seo_errors = []
    for r in rows:
        slug = r['URL Final (Slug)']
        if r['Dominio'] != 'https://almaholistica.com':
            seo_errors.append(f'{slug}: Invalid Dominio "{r["Dominio"]}"')
        if r['Categoría'] != 'terapia-online':
            seo_errors.append(f'{slug}: Invalid Categoría "{r["Categoría"]}"')
        if not r['H1 Título'].strip():
            seo_errors.append(f'{slug}: Empty H1 Título')
        if not r['Meta Descripción'].strip():
            seo_errors.append(f'{slug}: Empty Meta Descripción')
            
    if seo_errors:
        errors.extend(seo_errors)
    print(f'[TEST 6] SEO Columns Consistency: {"FAIL" if seo_errors else "PASS"}')
    
    print('\n======================================================================')
    print('RESULTS SUMMARY')
    print('======================================================================')
    print(f'Total Errors: {len(errors)}')
    print(f'Total Warnings: {len(warnings)}')
    
    if errors:
        print('\nERRORS DETECTED:')
        for e in errors:
            print(f'  - [FAIL] {e}')
    else:
        print('\nALL 6 ADVERSARIAL TEST DIMENSIONS PASSED PERFECTLY!')
        
    if warnings:
        print('\nWARNINGS / OBSERVATIONS:')
        for w in warnings:
            print(f'  - [WARN] {w}')
            
    verdict = 'CONFIRM_CORRECTNESS' if not errors else 'REJECT'
    print(f'\nVERDICT: {verdict}')
    print('======================================================================')
    
    return len(errors) == 0

if __name__ == '__main__':
    success = run_adversarial_tests()
    sys.exit(0 if success else 1)
