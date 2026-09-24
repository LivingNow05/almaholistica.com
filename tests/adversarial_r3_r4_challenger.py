#!/usr/bin/env python3
"""
ADVERSARIAL STRESS-TEST HARNESS FOR R3 & R4 (EMPIRICAL CHALLENGER)
Author: teamwork_preview_challenger_geom2_2
Project: Alma Holística (almaholistica.com)
Milestone: GEO-M2 (Verification & Stress Testing)

Tests covered:
1. R3: RAG Citation Block in all 45 dolencias (word count 130-170, 2-part structure, 3 schemas)
2. R4: Authority & E-E-A-T in all 113 city pages (specialists, registrations, PNI/Hamer/Flèche/Lipton, local cases, medical disclaimer, 2 schemas)
3. Global Schema Census: exactly 421 schemas across 180 HTML pages.
4. Aesthetic and DOM integrity (zero yellow/gold, zero JS/template artifacts).
"""

import os
import sys
import json
import re
import csv
import statistics
from html.parser import HTMLParser

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(ROOT_DIR, "dist")
SRC_DIR = os.path.join(ROOT_DIR, "src")
DATA_DIR = os.path.join(SRC_DIR, "data")

DOLENCIAS_JSON = os.path.join(DATA_DIR, "dataset_biodescodificacion_dolencias.json")
CITIES_CSV = os.path.join(DATA_DIR, "dataset_almaholistica_ciudades.csv")
EEAT_JSON = os.path.join(DATA_DIR, "dataset_almaholistica_ciudades_eeat_geo.json")

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
    def handle_data(self, data):
        self.text_parts.append(data)
    def get_text(self):
        return " ".join(self.text_parts)

def strip_html_tags(html_str):
    parser = TextExtractor()
    parser.feed(html_str)
    return parser.get_text()

def load_data():
    with open(DOLENCIAS_JSON, "r", encoding="utf-8") as f:
        dolencias = json.load(f)

    with open(EEAT_JSON, "r", encoding="utf-8") as f:
        eeat_cities = json.load(f)

    with open(CITIES_CSV, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        csv_cities = list(reader)

    return dolencias, eeat_cities, csv_cities


def tokenize_words_whitespace(text):
    return [w for w in re.split(r"\s+", text.strip()) if w]


def tokenize_words_regex_unicode(text):
    # Matches words including Spanish accented characters and compound words
    return re.findall(r"\b[\wáéíóúÁÉÍÓÚñÑüÜ]+(?:[-'][a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*\b", text)


def tokenize_words_standard(text):
    return re.findall(r"\b\w+\b", text)


def extract_json_ld_schemas(html_content):
    schemas = []
    matches = re.finditer(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>([\s\S]*?)</script>', html_content, re.IGNORECASE)
    for m in matches:
        raw_json = m.group(1).strip()
        try:
            parsed = json.loads(raw_json)
            schemas.append(parsed)
        except Exception as e:
            schemas.append({"_parse_error": str(e), "_raw": raw_json})
    return schemas


def test_r3_dolencias(dolencias):
    print("\n" + "=" * 80)
    print("DIMENSION 1: R3 ADVERSARIAL STRESS-TEST (45 DOLENCIAS RAG BLOCK & SCHEMAS)")
    print("=" * 80)

    assert len(dolencias) == 45, f"Expected 45 dolencias in dataset, got {len(dolencias)}"
    
    dolencia_dirs = [
        d for d in os.listdir(os.path.join(DIST_DIR, "biodescodificacion"))
        if os.path.isdir(os.path.join(DIST_DIR, "biodescodificacion", d))
    ]
    assert len(dolencia_dirs) == 45, f"Expected 45 dolencia subdirectories in dist/, got {len(dolencia_dirs)}"

    word_counts_ws = []
    word_counts_re = []
    part1_counts = []
    part2_counts = []

    rag_pattern = re.compile(
        r'<section\b[^>]*id=["\']definicion-citabilidad-rag["\'][^>]*>([\s\S]*?)<\/section>',
        re.IGNORECASE
    )

    p_pattern = re.compile(r'<p\b[^>]*>([\s\S]*?)</p>', re.IGNORECASE)

    failures = []

    for item in dolencias:
        slug = item["slug"]
        nombre = item["nombre"]
        sistema = item["sistema"]
        html_path = os.path.join(DIST_DIR, "biodescodificacion", slug, "index.html")

        if not os.path.isfile(html_path):
            failures.append(f"Missing HTML file: {html_path}")
            continue

        with open(html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        # 1. RAG section existence
        match = rag_pattern.search(html_content)
        if not match:
            failures.append(f"[{slug}] Missing <section id='definicion-citabilidad-rag'>")
            continue

        section_html = match.group(1)

        # 2. Location verification: must be after </header> and before #en-palabras-simples
        header_end = html_content.find("</header>")
        section_pos = match.start()
        simples_pos = html_content.find('id="en-palabras-simples"')

        if header_end == -1 or section_pos < header_end:
            failures.append(f"[{slug}] RAG section not located after </header>")
        if simples_pos != -1 and section_pos > simples_pos:
            failures.append(f"[{slug}] RAG section located AFTER #en-palabras-simples")

        # 3. Extract paragraphs inside RAG section
        paragraphs = p_pattern.findall(section_html)
        if len(paragraphs) < 2:
            failures.append(f"[{slug}] RAG section expected at least 2 paragraphs (Part 1 and Part 2), found {len(paragraphs)}")
            continue

        p1_text = strip_html_tags(paragraphs[0])
        p2_text = strip_html_tags(paragraphs[1])
        full_passage_text = f"{p1_text} {p2_text}"

        p1_words = len(tokenize_words_whitespace(p1_text))
        p2_words = len(tokenize_words_whitespace(p2_text))
        passage_words_ws = len(tokenize_words_whitespace(full_passage_text))
        passage_words_re = len(tokenize_words_regex_unicode(full_passage_text))

        word_counts_ws.append(passage_words_ws)
        word_counts_re.append(passage_words_re)
        part1_counts.append(p1_words)
        part2_counts.append(p2_words)

        # Assertions on word counts:
        # Requisito R3: 130-170 tolerancia estricta, 134-167 objetivo.
        if passage_words_ws < 130 or passage_words_ws > 170:
            failures.append(f"[{slug}] Passage word count (ws={passage_words_ws}) out of [130, 170]")
        if passage_words_ws < 134 or passage_words_ws > 167:
            failures.append(f"[{slug}] Passage word count (ws={passage_words_ws}) out of target [134, 167]")

        # 4. Part 1 semantic validation (Definition, System, Conflict, Adaptive meaning)
        p1_lower = p1_text.lower()
        if nombre.lower() not in p1_lower:
            failures.append(f"[{slug}] Part 1 missing pathology name '{nombre}'")
        if "sistema" not in p1_lower:
            failures.append(f"[{slug}] Part 1 missing 'sistema' keyword")
        if "conflicto biológico" not in p1_lower:
            failures.append(f"[{slug}] Part 1 missing 'conflicto biológico'")
        if "sentido adaptativo" not in p1_lower and "sentido biológico" not in p1_lower:
            failures.append(f"[{slug}] Part 1 missing 'sentido adaptativo' or 'sentido biológico'")

        # 5. Part 2 semantic validation (Phases, Protocol, Allopathic disclaimer)
        p2_lower = p2_text.lower()
        if "simpaticotónico" not in p2_lower and "estrés activo" not in p2_lower:
            failures.append(f"[{slug}] Part 2 missing active stress phase ('simpaticotónico'/'estrés activo')")
        if "vagotonía" not in p2_lower and "reparación" not in p2_lower:
            failures.append(f"[{slug}] Part 2 missing resolution phase ('vagotonía'/'reparación')")
        if "reprogramación bioemocional" not in p2_lower:
            failures.append(f"[{slug}] Part 2 missing 'reprogramación bioemocional'")
        if "alma holística" not in p2_lower:
            failures.append(f"[{slug}] Part 2 missing 'Alma Holística'")
        if "1 a 1" not in p2_lower and "individual" not in p2_lower:
            failures.append(f"[{slug}] Part 2 missing '1 a 1' consultation mention")
        if "sin sustituir" not in p2_lower:
            failures.append(f"[{slug}] Part 2 missing ethical medical disclaimer 'sin sustituir'")
        if "medicina alopática" not in p2_lower:
            failures.append(f"[{slug}] Part 2 missing 'medicina alopática'")

        # 6. Schemas check for dolencia page (MedicalWebPage, FAQPage, BreadcrumbList)
        schemas = extract_json_ld_schemas(html_content)
        if len(schemas) != 3:
            failures.append(f"[{slug}] Expected exactly 3 JSON-LD schemas, found {len(schemas)}")

        schema_types = set()
        for idx, s in enumerate(schemas):
            if "_parse_error" in s:
                failures.append(f"[{slug}] Schema #{idx} JSON parse error: {s['_parse_error']}")
            else:
                schema_types.add(s.get("@type"))

        expected_types = {"MedicalWebPage", "FAQPage", "BreadcrumbList"}
        if not expected_types.issubset(schema_types):
            failures.append(f"[{slug}] Missing expected schema types: {expected_types - schema_types}")

    print(f"Total dolencia pages evaluated: {len(dolencias)}")
    print(f"Whitespace word counts -> Min: {min(word_counts_ws)}, Max: {max(word_counts_ws)}, Mean: {statistics.mean(word_counts_ws):.2f}, Stdev: {statistics.stdev(word_counts_ws):.2f}")
    print(f"Regex Unicode word counts -> Min: {min(word_counts_re)}, Max: {max(word_counts_re)}, Mean: {statistics.mean(word_counts_re):.2f}")
    print(f"Part 1 word counts -> Min: {min(part1_counts)}, Max: {max(part1_counts)}, Mean: {statistics.mean(part1_counts):.2f}")
    print(f"Part 2 word counts -> Min: {min(part2_counts)}, Max: {max(part2_counts)}, Mean: {statistics.mean(part2_counts):.2f}")

    if failures:
        print(f"\n[FAIL] Found {len(failures)} failures in R3:")
        for f in failures[:15]:
            print(f"  - {f}")
        if len(failures) > 15:
            print(f"  ... and {len(failures) - 15} more.")
        assert False, f"R3 failed with {len(failures)} issues."
    else:
        print("\n[OK] R3 passed all adversarial stress-tests across 45 dolencias!")
    return word_counts_ws


def test_r4_cities(eeat_cities, csv_cities):
    print("\n" + "=" * 80)
    print("DIMENSION 2: R4 ADVERSARIAL STRESS-TEST (113 CIUDADES E-E-A-T & SCHEMAS)")
    print("=" * 80)

    assert len(eeat_cities) == 113, f"Expected 113 cities in EEAT JSON, got {len(eeat_cities)}"
    assert len(csv_cities) == 113, f"Expected 113 cities in CSV, got {len(csv_cities)}"

    eeat_by_slug = {c["URL Final (Slug)"].strip().lower(): c for c in eeat_cities}

    failures = []
    specialist_distribution = {}
    total_city_schemas = 0

    for c in csv_cities:
        raw_slug = c["URL Final (Slug)"].strip()
        clean_slug = re.sub(r"^biodescodificacion-", "", raw_slug, flags=re.I).lower().strip()
        dir_name = f"biodescodificacion-{clean_slug}"
        html_path = os.path.join(DIST_DIR, dir_name, "index.html")

        if not os.path.isfile(html_path):
            failures.append(f"Missing city HTML: {html_path}")
            continue

        with open(html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        eeat_data = eeat_by_slug.get(clean_slug)
        if not eeat_data:
            failures.append(f"Missing EEAT JSON entry for slug '{clean_slug}'")
            continue

        # 1. Authority section heading
        if 'id="eeat-authority-heading"' not in html_content and 'aria-labelledby="eeat-authority-heading"' not in html_content:
            failures.append(f"[{clean_slug}] Missing eeat-authority-heading section")

        # 2. Specialist presence & Professional Registration
        spec_name = eeat_data["EEAT_Especialista_Nombre"]
        spec_reg = eeat_data["EEAT_Especialista_Registro"]
        spec_cargo = eeat_data["EEAT_Especialista_Cargo"]

        specialist_distribution[spec_name] = specialist_distribution.get(spec_name, 0) + 1

        allowed_specialists = {
            "Lic. Sofía Alarcón Valdés",
            "Dr. Mateo Benavides Rivas",
            "Dra. Elena Monsalve Duarte"
        }
        if spec_name not in allowed_specialists:
            failures.append(f"[{clean_slug}] Specialist '{spec_name}' not in allowed set")

        if spec_name not in html_content:
            failures.append(f"[{clean_slug}] Specialist name '{spec_name}' not found in HTML")

        # Extract registration code e.g. ITH-8492, AIE-5120, CIT-6311
        reg_code_match = re.search(r"[A-Z]{3}-\d{4}", spec_reg)
        if not reg_code_match:
            failures.append(f"[{clean_slug}] Malformed registration code in dataset: '{spec_reg}'")
        else:
            reg_code = reg_code_match.group(0)
            if reg_code not in html_content:
                failures.append(f"[{clean_slug}] Registration code '{reg_code}' not found in HTML")

        # 3. Scientific Methodology Pillars (PNI, Hamer, Flèche, Lipton)
        pillars = [
            ("Psiconeuroinmunología", ["Psiconeuroinmunología", "PNI"]),
            ("Hamer", ["Hamer", "Ryke Geerd Hamer"]),
            ("Flèche", ["Flèche", "Christian Flèche"]),
            ("Lipton", ["Lipton", "Bruce Lipton"])
        ]
        for p_name, variants in pillars:
            if not any(v in html_content for v in variants):
                failures.append(f"[{clean_slug}] Missing methodology pillar: {p_name}")

        # 4. Local cases and ethical disclaimer
        casos = eeat_data.get("EEAT_Experiencia_Casos_Locales", "").strip()
        if not casos:
            failures.append(f"[{clean_slug}] Empty EEAT_Experiencia_Casos_Locales in dataset")
        else:
            # Check snippet in HTML (first 50 chars)
            snippet = casos[:50].strip()
            if snippet not in html_content:
                failures.append(f"[{clean_slug}] Local cases snippet '{snippet}' not found in HTML")

        descargo = eeat_data.get("EEAT_Confiabilidad_Descargo", "").strip()
        if not descargo:
            failures.append(f"[{clean_slug}] Empty EEAT_Confiabilidad_Descargo in dataset")
        else:
            snippet_d = descargo[:40].strip()
            if snippet_d not in html_content and "Descargo de Responsabilidad Médica" not in html_content:
                failures.append(f"[{clean_slug}] Medical disclaimer not found in HTML")

        # 5. Schemas check: Exactly 2 schemas per city page
        schemas = extract_json_ld_schemas(html_content)
        if len(schemas) != 2:
            failures.append(f"[{clean_slug}] Expected exactly 2 schemas, found {len(schemas)}")
        total_city_schemas += len(schemas)

        types_found = set()
        for idx, s in enumerate(schemas):
            if "_parse_error" in s:
                failures.append(f"[{clean_slug}] Schema #{idx} JSON parse error: {s['_parse_error']}")
            else:
                types_found.add(s.get("@type"))

        expected_city_types = {"HealthAndBeautyBusiness", "BreadcrumbList"}
        if not expected_city_types.issubset(types_found):
            failures.append(f"[{clean_slug}] Missing expected city schema types: {expected_city_types - types_found}")

    print(f"Total city pages evaluated: {len(csv_cities)}")
    print(f"Specialist distribution across 113 cities: {specialist_distribution}")
    print(f"Total schemas in city pages: {total_city_schemas} (expected: 226)")

    if failures:
        print(f"\n[FAIL] Found {len(failures)} failures in R4:")
        for f in failures[:15]:
            print(f"  - {f}")
        if len(failures) > 15:
            print(f"  ... and {len(failures) - 15} more.")
        assert False, f"R4 failed with {len(failures)} issues."
    else:
        print("\n[OK] R4 passed all adversarial stress-tests across 113 city pages!")


def test_global_census_and_invariants():
    print("\n" + "=" * 80)
    print("DIMENSION 3: GLOBAL SCHEMA CENSUS & ADVERSARIAL INVARIANTS")
    print("=" * 80)

    # 1. Total HTML pages in dist/
    all_html_files = []
    for root, _, files in os.walk(DIST_DIR):
        for f in files:
            if f.endswith(".html"):
                all_html_files.append(os.path.join(root, f))

    print(f"Total HTML files in dist/: {len(all_html_files)} (expected: 180)")
    assert len(all_html_files) == 180, f"Expected 180 HTML files, found {len(all_html_files)}"

    # 2. Total schemas census
    total_schemas = 0
    schemas_by_type = {}
    pages_with_schemas = {}

    for path in all_html_files:
        rel_path = os.path.relpath(path, DIST_DIR)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        schemas = extract_json_ld_schemas(content)
        count = len(schemas)
        total_schemas += count
        pages_with_schemas[rel_path] = count

        for idx, s in enumerate(schemas):
            if "_parse_error" in s:
                assert False, f"Corrupted JSON-LD in {rel_path} (#{idx}): {s['_parse_error']}"
            schema_type = s.get("@type", "Unknown")
            schemas_by_type[schema_type] = schemas_by_type.get(schema_type, 0) + 1

    print(f"Total JSON-LD schemas found across 180 pages: {total_schemas}")
    print(f"Schema types breakdown: {schemas_by_type}")

    # Verify home page has 0 schemas (MR3-CH2-4.5)
    assert pages_with_schemas.get("index.html") == 0, f"dist/index.html MUST have 0 schemas, has {pages_with_schemas.get('index.html')}"
    # Verify catalog page has 0 schemas
    assert pages_with_schemas.get(os.path.join("biodescodificacion", "index.html")) == 0, "dist/biodescodificacion/index.html must have 0 schemas"

    # Verify total is exactly 421
    assert total_schemas == 421, f"Expected exactly 421 JSON-LD schemas globally, found {total_schemas}"

    # 3. Aesthetics & Brand Invariants
    # Forbidden yellow/gold hex and color tokens in HTML files
    print("\nAdversarial check: Forbidden yellow and gold tokens in dist/...")
    forbidden_tokens = [
        "#F59E0B", "#D4AF37", "#f59e0b", "#d4af37",
        "text-yellow-", "bg-yellow-", "border-yellow-",
        "text-amber-", "bg-amber-"
    ]

    yellow_violations = []
    for path in all_html_files:
        rel_path = os.path.relpath(path, DIST_DIR)
        with open(path, "r", encoding="utf-8") as f:
            c = f.read()
        for tok in forbidden_tokens:
            if tok in c:
                yellow_violations.append((rel_path, tok))

    print(f"Forbidden yellow/gold violations: {len(yellow_violations)}")
    assert len(yellow_violations) == 0, f"Found yellow/gold violations: {yellow_violations[:5]}"

    # 4. Template artifact check (no unparsed AST or undefined/NaN strings)
    print("Adversarial check: Template artifacts and corrupt tokens...")
    artifact_tokens = [
        "{ragBlock", "{especialista", "{casosLocales", "{autoridadCientifica",
        "undefined", "NaN", "[object Object]"
    ]
    template_violations = []
    for path in all_html_files:
        rel_path = os.path.relpath(path, DIST_DIR)
        with open(path, "r", encoding="utf-8") as f:
            c = f.read()
        for tok in artifact_tokens:
            if tok in c:
                template_violations.append((rel_path, tok))

    print(f"Template/interpolation artifacts found: {len(template_violations)}")
    assert len(template_violations) == 0, f"Found template artifacts: {template_violations[:5]}"

    print("\n[OK] Global schema census (421) and brand invariants passed 100%!")


def main():
    print("=" * 80)
    print("STARTING EMPIRICAL CHALLENGER ADVERSARIAL SUITE (R3 & R4)")
    print("=" * 80)

    dolencias, eeat_cities, csv_cities = load_data()

    test_r3_dolencias(dolencias)
    test_r4_cities(eeat_cities, csv_cities)
    test_global_census_and_invariants()

    print("\n" + "=" * 80)
    print("ALL EMPIRICAL CHALLENGES PASSED! VERDICT: APPROVE")
    print("=" * 80)


if __name__ == "__main__":
    main()
