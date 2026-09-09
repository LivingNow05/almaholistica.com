#!/usr/bin/env python3
import json
import csv
import os
import re
from collections import Counter

CITIES_CSV = "src/data/dataset_almaholistica_ciudades.csv"
DOLENCIAS_JSON = "src/data/dataset_biodescodificacion_dolencias.json"

print("--- STARTING ADVERSARIAL AUDIT OF DATASETS ---")

# -------------------------------------------------------------
# AUDIT 1: dataset_biodescodificacion_dolencias.json
# -------------------------------------------------------------
with open(DOLENCIAS_JSON, 'r', encoding='utf-8') as f:
    dolencias = json.load(f)

print(f"\n1. DOLENCIAS JSON: Total items = {len(dolencias)}")
assert len(dolencias) == 45, f"Expected 45, got {len(dolencias)}"

all_questions = []
all_faq_questions = []
all_faq_answers = []
all_conflicts = []
all_biological_senses = []
slugs_dolencias = set()
systems_counter = Counter()

canine_regex = re.compile(
    r'\b(perro|perros|cachorro|cachorros|canino|caninos|pedigree|criadero|criaderos|camada|camadas|raza|razas|veterinari\w+|adiestramient\w+|fluffy|bulldog)\b',
    re.IGNORECASE
)

placeholder_regex = re.compile(
    r'\b(lorem|ipsum|dolor sit|test|prueba|ejemplo|sample|dummy|asdf|foo|bar|baz|todo)\b',
    re.IGNORECASE
)

short_or_shallow_entries = []
canine_hits_dolencias = []
placeholder_hits_dolencias = []

for idx, d in enumerate(dolencias):
    slug = d.get('slug', '')
    nombre = d.get('nombre', '')
    sistema = d.get('sistema', '')
    conflicto = d.get('conflictoEmocional', '')
    sentido = d.get('sentidoBiologico', '')
    reprog = d.get('reprogramacion', '')
    preguntas = d.get('preguntasReflexion', [])
    faqs = d.get('faqs', [])
    gancho = d.get('ganchoAgendamiento', '')

    slugs_dolencias.add(slug)
    systems_counter[sistema] += 1

    # Check lengths
    if len(conflicto.split()) < 15 or len(sentido.split()) < 15 or len(reprog.split()) < 10:
        short_or_shallow_entries.append((slug, "Short text in core bioemotional fields"))

    if len(preguntas) < 3:
        short_or_shallow_entries.append((slug, f"Less than 3 questions: {len(preguntas)}"))
    if len(faqs) < 3:
        short_or_shallow_entries.append((slug, f"Less than 3 faqs: {len(faqs)}"))

    # Canine terms check
    full_text = f"{slug} {nombre} {sistema} {conflicto} {sentido} {reprog} {' '.join(preguntas)} {' '.join(f.get('pregunta','') + ' ' + f.get('respuesta','') for f in faqs)} {gancho}"
    for match in canine_regex.finditer(full_text):
        canine_hits_dolencias.append((slug, match.group(0)))
    for match in placeholder_regex.finditer(full_text):
        placeholder_hits_dolencias.append((slug, match.group(0)))

    all_conflicts.append(conflicto)
    all_biological_senses.append(sentido)
    for q in preguntas:
        all_questions.append(q)
    for f in faqs:
        all_faq_questions.append(f.get('pregunta', ''))
        all_faq_answers.append(f.get('respuesta', ''))

print(f"Unique dolencia slugs: {len(slugs_dolencias)}")
print(f"Distribution across systems: {dict(systems_counter)}")
print(f"Canine hits in dolencias: {len(canine_hits_dolencias)}")
print(f"Placeholder hits in dolencias: {len(placeholder_hits_dolencias)}")
print(f"Short/shallow entries in dolencias: {len(short_or_shallow_entries)}")

# Check duplicate questions or answers across different pathologies
unique_questions = set(all_questions)
unique_faq_q = set(all_faq_questions)
print(f"Total questions: {len(all_questions)} (Unique: {len(unique_questions)})")
print(f"Total FAQ questions: {len(all_faq_questions)} (Unique: {len(unique_faq_q)})")

# Check duplication rate
if len(unique_questions) < len(all_questions) * 0.9:
    print("WARNING: High question duplication across pathologies!")
if len(unique_faq_q) < len(all_faq_questions) * 0.7:
    print("WARNING: High FAQ question duplication across pathologies!")

# -------------------------------------------------------------
# AUDIT 2: dataset_almaholistica_ciudades.csv
# -------------------------------------------------------------
print("\n2. CITIES CSV AUDIT")
with open(CITIES_CSV, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    cities = list(reader)

print(f"Total city rows: {len(cities)}")
assert len(cities) == 113, f"Expected 113 rows, got {len(cities)}"

countries_counter = Counter()
currencies_counter = Counter()
city_slugs = set()
canine_hits_cities = []
placeholder_hits_cities = []
short_historia_cities = []
suspicious_prices = []

# Currency map expectation
EXPECTED_COUNTRY_CURRENCIES = {
    'Colombia': {'COP'},
    'México': {'MXN'},
    'España': {'EUR'},
    'Estados Unidos': {'USD'},
    'Argentina': {'ARS'},
    'Chile': {'CLP'},
    'Perú': {'PEN'},
    'Bolivia': {'BOB'},
    'Brasil': {'BRL'},
    'Costa Rica': {'CRC'},
    'República Dominicana': {'DOP'},
    'Guatemala': {'GTQ'},
    'Honduras': {'HNL'},
    'Nicaragua': {'NIO'},
    'Paraguay': {'PYG'},
    'Uruguay': {'UYU'},
    'Ecuador': {'USD'},
    'Panamá': {'USD', 'PAB'},
    'El Salvador': {'USD'},
    'Venezuela': {'USD', 'VES', 'VED'},
}

for row in cities:
    slug = row.get('URL Final (Slug)', '')
    pais = row.get('País', '')
    moneda = row.get('Moneda', '')
    precio = row.get('Rango_Precio_Sesion', '')
    historia = row.get('Historia_Local', '')
    h1 = row.get('H1 Título', '')
    meta = row.get('Meta Descripción', '')

    city_slugs.add(slug)
    countries_counter[pais] += 1
    currencies_counter[moneda] += 1

    # Check currency match
    allowed_curr = EXPECTED_COUNTRY_CURRENCIES.get(pais, set())
    if moneda not in allowed_curr:
        suspicious_prices.append((slug, pais, moneda, f"Unexpected currency for country (expected {allowed_curr})"))

    # Check canine terms
    full_row_text = f"{slug} {pais} {moneda} {precio} {historia} {h1} {meta}"
    for match in canine_regex.finditer(full_row_text):
        canine_hits_cities.append((slug, match.group(0)))
    for match in placeholder_regex.finditer(full_row_text):
        placeholder_hits_cities.append((slug, match.group(0)))

    # Historia local quality
    if len(historia.split()) < 20:
        short_historia_cities.append((slug, len(historia.split())))

print(f"Unique city slugs: {len(city_slugs)}")
print(f"Total countries: {len(countries_counter)} (Expected: 20)")
print(f"Currencies found: {dict(currencies_counter)}")
print(f"Canine hits in cities: {len(canine_hits_cities)}")
if canine_hits_cities:
    print(f"Details of canine hits: {canine_hits_cities}")
print(f"Placeholder hits in cities: {len(placeholder_hits_cities)}")
if placeholder_hits_cities:
    print(f"Details of placeholder hits: {placeholder_hits_cities}")
print(f"Short historia cities (<20 words): {len(short_historia_cities)}")
print(f"Suspicious currency assignments: {len(suspicious_prices)}")
if suspicious_prices:
    print(f"Details: {suspicious_prices}")

# Check slug collision between cities and dolencias
slug_collision = city_slugs.intersection(slugs_dolencias)
print(f"Slugs collision between datasets: {len(slug_collision)}")
if slug_collision:
    print(f"Collisions: {slug_collision}")

print("\n--- AUDIT SCRIPT FINISHED ---")
