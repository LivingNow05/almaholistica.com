#!/usr/bin/env python3
"""
ADVERSARIAL STRESS-TEST HARNESS FOR REQUIREMENTS R1 & R2
Author: teamwork_preview_challenger_geom2_1 (Empirical Challenger)
Project: Alma Holística (almaholistica.com)
Milestone: GEO-M2 (Adversarial Challenge & Empirical Verification)

Requirements Tested:
- R1: public/llms.txt vs dist/llms.txt exact byte match, verified phone (+57 315 1206985),
      zero placeholder numbers, 113 canonical city URLs with /biodescodificacion- and trailing slash,
      45 dolencias catalog and 20 countries with local currencies.
- R2: src/pages/index.astro & dist/index.html entity anchoring in first paragraph ("Alma Holística es"
      at index 0, within first 17-50 chars, entity in first 200 chars), exactly zero JSON-LD scripts
      per MR3-CH2-4.5 invariant.
"""

import os
import sys
import hashlib
import json
import csv
import re
from html.parser import HTMLParser

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(ROOT_DIR, "dist")
SRC_DIR = os.path.join(ROOT_DIR, "src")
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
DATA_DIR = os.path.join(SRC_DIR, "data")

PUBLIC_LLMS = os.path.join(PUBLIC_DIR, "llms.txt")
DIST_LLMS = os.path.join(DIST_DIR, "llms.txt")
SRC_INDEX_ASTRO = os.path.join(SRC_DIR, "pages", "index.astro")
DIST_INDEX_HTML = os.path.join(DIST_DIR, "index.html")

CITIES_CSV = os.path.join(DATA_DIR, "dataset_almaholistica_ciudades.csv")
DOLENCIAS_JSON = os.path.join(DATA_DIR, "dataset_biodescodificacion_dolencias.json")

class FirstPHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_p = False
        self.first_p_found = False
        self.first_p_attrs = {}
        self.first_p_text_chunks = []
        self.all_p_count = 0
        self.json_ld_scripts = 0
        self.all_scripts = 0

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        t = tag.lower()
        if t == 'p':
            self.all_p_count += 1
            if not self.first_p_found:
                self.in_p = True
                self.first_p_found = True
                self.first_p_attrs = attrs_dict
        elif t == 'script':
            self.all_scripts += 1
            if attrs_dict.get('type') == 'application/ld+json':
                self.json_ld_scripts += 1

    def handle_endtag(self, tag):
        if tag.lower() == 'p' and self.in_p:
            self.in_p = False

    def handle_data(self, data):
        if self.in_p:
            self.first_p_text_chunks.append(data)

def run_tests():
    total_assertions = 0
    passed_assertions = 0
    failed_assertions = []

    def check(condition, message):
        nonlocal total_assertions, passed_assertions, failed_assertions
        total_assertions += 1
        if condition:
            passed_assertions += 1
            print(f"  [PASS] {message}")
        else:
            failed_assertions.append(message)
            print(f"  [FAIL] {message}")

    print("=" * 80)
    print("EMPIRICAL ADVERSARIAL CHALLENGER SUITE: REQUIREMENTS R1 & R2")
    print("=" * 80)

    # --------------------------------------------------------------------------
    # DIMENSION 1: R1 — LLMS.TXT FILE PARITY, BYTE MATCH & CRYPTOGRAPHIC HASH
    # --------------------------------------------------------------------------
    print("\n--- DIMENSION 1: public/llms.txt vs dist/llms.txt Byte Parity & Hash ---")
    check(os.path.exists(PUBLIC_LLMS), f"public/llms.txt exists ({PUBLIC_LLMS})")
    check(os.path.exists(DIST_LLMS), f"dist/llms.txt exists ({DIST_LLMS})")

    with open(PUBLIC_LLMS, "rb") as f:
        public_bytes = f.read()

    with open(DIST_LLMS, "rb") as f:
        dist_bytes = f.read()

    public_hash = hashlib.sha256(public_bytes).hexdigest()
    dist_hash = hashlib.sha256(dist_bytes).hexdigest()

    check(len(public_bytes) > 15000, f"public/llms.txt non-trivial size: {len(public_bytes)} bytes")
    check(public_bytes == dist_bytes, "public/llms.txt and dist/llms.txt match byte-for-byte exactly")
    check(public_hash == dist_hash, f"SHA-256 digests match ({public_hash})")

    # Check for CRLF vs LF consistency
    check(b"\r\n" not in public_bytes, "public/llms.txt uses clean UNIX LF line endings")
    check(b"\r\n" not in dist_bytes, "dist/llms.txt uses clean UNIX LF line endings")

    # Decode UTF-8 cleanly
    try:
        public_text = public_bytes.decode("utf-8")
        dist_text = dist_bytes.decode("utf-8")
        check(True, "Both files decode as strict UTF-8 without decoding errors")
    except UnicodeDecodeError as e:
        check(False, f"UTF-8 decoding error: {e}")

    # --------------------------------------------------------------------------
    # DIMENSION 2: R1 — TELEPHONY SANITIZATION & ZERO-TOLERANCE PLACEHOLDERS
    # --------------------------------------------------------------------------
    print("\n--- DIMENSION 2: Telephony Sanitization & Zero Placeholder Numbers ---")
    official_phone = "+57 315 1206985"
    official_count_public = public_text.count(official_phone)
    official_count_dist = dist_text.count(official_phone)

    check(official_count_public >= 2, f"Official phone '{official_phone}' present in public/llms.txt ({official_count_public} times)")
    check(official_count_dist >= 2, f"Official phone '{official_phone}' present in dist/llms.txt ({official_count_dist} times)")

    # Strict zero-tolerance for placeholders
    placeholder_patterns = [
        "300 000 0000",
        "3000000000",
        "573000000000",
        "+57 300",
        "+57300",
        "300-000-0000",
        "+57 (300)",
        "5730000000",
        "300 000"
    ]
    for pattern in placeholder_patterns:
        matches_pub = len(re.findall(re.escape(pattern), public_text))
        matches_dst = len(re.findall(re.escape(pattern), dist_text))
        check(matches_pub == 0, f"Zero occurrences of placeholder '{pattern}' in public/llms.txt (found {matches_pub})")
        check(matches_dst == 0, f"Zero occurrences of placeholder '{pattern}' in dist/llms.txt (found {matches_dst})")

    # Check site config for consistency
    site_ts_path = os.path.join(SRC_DIR, "config", "site.ts")
    with open(site_ts_path, "r", encoding="utf-8") as f:
        site_ts = f.read()
    check("573151206985" in site_ts, "src/config/site.ts contains official number 573151206985")
    check("3000000000" not in site_ts and "300 000" not in site_ts, "src/config/site.ts free of placeholder numbers")

    # --------------------------------------------------------------------------
    # DIMENSION 3: R1 — 113 CITIES CANONICAL URL VALIDATION & TRAILING SLASH
    # --------------------------------------------------------------------------
    print("\n--- DIMENSION 3: 113 City URLs Canonical Format (/biodescodificacion- & Trailing Slash) ---")
    with open(CITIES_CSV, "r", encoding="utf-8") as f:
        csv_reader = csv.DictReader(f)
        cities_data = list(csv_reader)

    check(len(cities_data) == 113, f"Dataset has exactly 113 cities (found {len(cities_data)})")

    missing_city_urls_pub = []
    missing_city_urls_dst = []
    non_canonical_slugs = []
    missing_slash_matches = []

    for c in cities_data:
        slug = c["URL Final (Slug)"].strip()
        expected_url = f"https://almaholistica.com/{slug}/"

        if not slug.startswith("biodescodificacion-"):
            non_canonical_slugs.append(slug)

        if expected_url not in public_text:
            missing_city_urls_pub.append(expected_url)

        if expected_url not in dist_text:
            missing_city_urls_dst.append(expected_url)

        # Adversarial check: verify no bare URL without trailing slash is linked
        # Uses boundary (?![a-zA-Z0-9_-]|/) to avoid false matching prefixes (e.g. leon matching leon-ni)
        bare_pattern = rf"https://almaholistica\.com/{re.escape(slug)}(?![a-zA-Z0-9_-]|/)"
        if re.search(bare_pattern, public_text):
            missing_slash_matches.append(slug)

    check(len(non_canonical_slugs) == 0, f"All 113 slugs in CSV have 'biodescodificacion-' prefix ({len(non_canonical_slugs)} invalid)")
    check(len(missing_city_urls_pub) == 0, f"All 113 city URLs present in public/llms.txt (missing: {len(missing_city_urls_pub)})")
    check(len(missing_city_urls_dst) == 0, f"All 113 city URLs present in dist/llms.txt (missing: {len(missing_city_urls_dst)})")
    check(len(missing_slash_matches) == 0, f"Zero city URLs missing trailing slash (violations: {len(missing_slash_matches)})")

    # Verify regex census of all city URLs in llms.txt
    all_city_links = re.findall(r"https://almaholistica\.com/biodescodificacion-[a-z0-9-]+/?", public_text)
    check(len(all_city_links) == 113, f"Exactly 113 city links matched by regex in public/llms.txt (found {len(all_city_links)})")
    city_links_without_slash = [u for u in all_city_links if not u.endswith("/")]
    check(len(city_links_without_slash) == 0, f"All {len(all_city_links)} city links end with canonical trailing slash (without slash: {len(city_links_without_slash)})")

    # Negative check: no old/unprefixed city URLs exist (e.g. /bogota/, /madrid/)
    legacy_patterns = [
        "https://almaholistica.com/bogota/",
        "https://almaholistica.com/medellin/",
        "https://almaholistica.com/madrid/",
        "https://almaholistica.com/cdmx/",
        "https://almaholistica.com/buenos-aires/"
    ]
    for lp in legacy_patterns:
        check(lp not in public_text, f"Zero occurrences of legacy un-prefixed URL '{lp}'")

    # --------------------------------------------------------------------------
    # DIMENSION 4: R1 — 45 DOLENCIAS CANONICAL URLs, METADATA & CATEGORIZATION
    # --------------------------------------------------------------------------
    print("\n--- DIMENSION 4: 45 Dolencias Catalog & Biological Classification ---")
    with open(DOLENCIAS_JSON, "r", encoding="utf-8") as f:
        dolencias_data = json.load(f)

    check(len(dolencias_data) == 45, f"Dataset contains exactly 45 dolencias (found {len(dolencias_data)})")

    missing_dolencia_urls = []
    missing_dolencia_names = []
    dolencia_missing_slashes = []

    for d in dolencias_data:
        slug = d["slug"].strip()
        nombre = d["nombre"].strip()
        expected_url = f"https://almaholistica.com/biodescodificacion/{slug}/"

        if expected_url not in public_text:
            missing_dolencia_urls.append(expected_url)

        if nombre not in public_text:
            missing_dolencia_names.append(nombre)

        bare_dol_pattern = rf"https://almaholistica\.com/biodescodificacion/{re.escape(slug)}(?![a-zA-Z0-9_-]|/)"
        if re.search(bare_dol_pattern, public_text):
            dolencia_missing_slashes.append(slug)

    check(len(missing_dolencia_urls) == 0, f"All 45 dolencia URLs present with trailing slash (missing: {len(missing_dolencia_urls)})")
    check(len(missing_dolencia_names) == 0, f"All 45 dolencia clinical names present in llms.txt (missing: {len(missing_dolencia_names)})")
    check(len(dolencia_missing_slashes) == 0, f"Zero dolencia URLs missing trailing slash (violations: {len(dolencia_missing_slashes)})")

    # Verify presence of biological systems
    expected_systems = [
        "Sistema Digestivo",
        "Sistema Nervioso / Emocional",
        "Sistema Osteoarticular",
        "Sistema Dermatológico",
        "Sistema Respiratorio",
        "Sistema Endocrino / Metabólico",
        "Sistema Inmunológico / Circulatorio"
    ]
    for sys_name in expected_systems:
        check(sys_name in public_text, f"Biological system '{sys_name}' present in public/llms.txt")

    # Count dolencia item URLs matched
    dol_matched = re.findall(r"https://almaholistica\.com/biodescodificacion/[a-z0-9-]+/", public_text)
    check(len(dol_matched) == 45, f"Exactly 45 dolencia item URLs matched in public/llms.txt (found {len(dol_matched)})")

    # --------------------------------------------------------------------------
    # DIMENSION 5: R1 — 20 COUNTRIES AND OFFICIAL LOCAL CURRENCIES BIJECTIVE MAP
    # --------------------------------------------------------------------------
    print("\n--- DIMENSION 5: 20 Countries and Official Local Currencies ---")
    countries_map = {}
    for c in cities_data:
        p = c["País"].strip()
        curr = c["Moneda"].strip()
        if p not in countries_map:
            countries_map[p] = {"currency": curr, "cities": []}
        countries_map[p]["cities"].append(c["URL Final (Slug)"].strip())

    check(len(countries_map) == 20, f"Exactly 20 distinct countries in CSV dataset (found {len(countries_map)})")

    missing_countries_llms = []
    currency_mismatches = []
    cities_sum = 0

    for country, data in sorted(countries_map.items()):
        cities_sum += len(data["cities"])
        if country not in public_text:
            missing_countries_llms.append(country)

        # Regex check for **Country** (Moneda: CUR)
        curr_pattern = rf"\*\*{re.escape(country)}\*\*\s*\(Moneda:\s*([A-Z]{{3}})\)"
        m = re.search(curr_pattern, public_text)
        if not m:
            currency_mismatches.append(f"{country}: pattern not found")
        else:
            found_curr = m.group(1)
            if found_curr != data["currency"]:
                currency_mismatches.append(f"{country}: expected {data['currency']}, found {found_curr}")

    check(len(missing_countries_llms) == 0, f"All 20 countries present in public/llms.txt (missing: {len(missing_countries_llms)})")
    check(len(currency_mismatches) == 0, f"All 20 countries have correct local currency format (mismatches: {len(currency_mismatches)})")
    check(cities_sum == 113, f"Sum of cities across all 20 countries equals 113 (sum: {cities_sum})")

    # --------------------------------------------------------------------------
    # DIMENSION 6: R2 — HERO FIRST PARAGRAPH ENTITY ANCHORING
    # --------------------------------------------------------------------------
    print("\n--- DIMENSION 6: R2 Hero First Paragraph Entity Anchoring ---")
    with open(DIST_INDEX_HTML, "r", encoding="utf-8") as f:
        dist_html = f.read()

    with open(SRC_INDEX_ASTRO, "r", encoding="utf-8") as f:
        src_astro = f.read()

    parser = FirstPHTMLParser()
    parser.feed(dist_html)

    check(parser.first_p_found, "First <p> tag found in dist/index.html")
    p_classes = parser.first_p_attrs.get("class", "")
    check("gsap-hero-el" in p_classes, f"First <p> has 'gsap-hero-el' class ({p_classes})")

    first_p_text = " ".join("".join(parser.first_p_text_chunks).split()).strip()
    check(len(first_p_text) > 50, f"First <p> text has substantive length ({len(first_p_text)} chars)")

    # Assert "Alma Holística es" at character 0
    entity_needle = "Alma Holística es"
    pos = first_p_text.find(entity_needle)
    check(pos == 0, f"'{entity_needle}' appears at position 0 of first <p> text (found at index {pos})")
    check(pos <= 17, f"'{entity_needle}' is within the first 17 characters")
    check(pos <= 50, f"'{entity_needle}' is within the first 50 characters")

    # Assert entity declaration in first 200 chars
    expected_statement = "Alma Holística es una plataforma clínica de biodescodificación y terapia bioemocional integrativa con atención online 1 a 1 en más de 20 países."
    check(expected_statement in first_p_text, "Full entity declaration statement present in first <p>")
    stmt_end_pos = first_p_text.find(expected_statement) + len(expected_statement)
    check(stmt_end_pos <= 200, f"Entity declaration completed within first 200 characters (completed at char {stmt_end_pos})")

    # Check that in src/pages/index.astro the exact same text is present
    check(expected_statement in src_astro, "src/pages/index.astro contains identical entity declaration statement")

    # Assert no prior <p> tags exist in body before the hero paragraph
    body_match = re.search(r"<body\b[^>]*>(.*)", dist_html, re.DOTALL | re.IGNORECASE)
    if body_match:
        body_content = body_match.group(1)
        first_p_pos = body_content.find("<p")
        pre_p_content = body_content[:first_p_pos]
        prior_p_tags = len(re.findall(r"<p\b", pre_p_content, re.IGNORECASE))
        check(prior_p_tags == 0, f"Zero <p> tags precede hero paragraph in <body> (found {prior_p_tags})")

    # --------------------------------------------------------------------------
    # DIMENSION 7: R2 — MR3-CH2-4.5 ZERO JSON-LD IN DIST/INDEX.HTML & 361 INVARIANT
    # --------------------------------------------------------------------------
    print("\n--- DIMENSION 7: R2 Invariant MR3-CH2-4.5 (Zero JSON-LD in dist/index.html) ---")
    json_ld_blocks = list(re.finditer(r"<script\b[^>]*type=[\"']application/ld\+json[\"'][^>]*>", dist_html, re.IGNORECASE))
    check(len(json_ld_blocks) == 0, f"Strict MR3-CH2-4.5: Exactly 0 JSON-LD scripts in dist/index.html (found {len(json_ld_blocks)})")

    # Check for any rogue ld+json mentions inside any <script>
    any_ld_json_in_scripts = [
        s.group(0) for s in re.finditer(r"<script\b[^>]*>.*?</script>", dist_html, re.DOTALL | re.IGNORECASE)
        if "application/ld+json" in s.group(0)
    ]
    check(len(any_ld_json_in_scripts) == 0, f"Zero <script> tags reference application/ld+json in dist/index.html (found {len(any_ld_json_in_scripts)})")

    # Check src/pages/index.astro does not have slot="schema" or JSON-LD
    schema_slot_in_index = "<Fragment slot=\"schema\">" in src_astro or "slot=\"schema\"" in src_astro
    check(not schema_slot_in_index, "src/pages/index.astro does not define a schema slot")

    # Global schema invariant check: exactly 361 schemas across dist/
    print("\n--- Global Schema Census (361 Invariant across 160 HTML files) ---")
    total_html_files = 0
    total_json_ld_scripts = 0
    city_page_schemas = 0
    dolencia_page_schemas = 0
    other_page_schemas = 0

    for root, _, files in os.walk(DIST_DIR):
        for file in files:
            if file.endswith(".html"):
                total_html_files += 1
                filepath = os.path.join(root, file)
                rel_path = os.path.relpath(filepath, DIST_DIR)
                with open(filepath, "r", encoding="utf-8") as hf:
                    hcontent = hf.read()
                schemas_in_page = len(re.findall(r"<script\b[^>]*type=[\"']application/ld\+json[\"'][^>]*>", hcontent, re.IGNORECASE))
                total_json_ld_scripts += schemas_in_page

                if rel_path.startswith("biodescodificacion-"):
                    city_page_schemas += schemas_in_page
                elif rel_path.startswith("biodescodificacion/") and rel_path != "biodescodificacion/index.html":
                    dolencia_page_schemas += schemas_in_page
                else:
                    other_page_schemas += schemas_in_page

    check(total_html_files == 160, f"Census: exactly 160 HTML pages in dist/ (found {total_html_files})")
    check(total_json_ld_scripts == 361, f"Total global JSON-LD scripts equals 361 invariant (found {total_json_ld_scripts})")
    check(city_page_schemas == 226, f"113 city pages contain 226 schemas (2 per page) (found {city_page_schemas})")
    check(dolencia_page_schemas == 135, f"45 dolencia pages contain 135 schemas (3 per page) (found {dolencia_page_schemas})")
    check(other_page_schemas == 0, f"Home and catalog pages contain 0 schemas (found {other_page_schemas})")

    # --------------------------------------------------------------------------
    # DIMENSION 8: ADVERSARIAL MUTATION, BROKEN LINKS & INTEGRITY TESTING
    # --------------------------------------------------------------------------
    print("\n--- DIMENSION 8: Adversarial Syntax, Markdown & Integrity Fuzzing ---")
    # Check for unrendered template tags
    corrupted_tokens = ["${", "{{", "}}", "undefined", "NaN", "null"]
    for tok in corrupted_tokens:
        tok_pub = public_text.count(tok)
        tok_dst = dist_text.count(tok)
        check(tok_pub == 0, f"Zero '{tok}' template artifacts in public/llms.txt (found {tok_pub})")
        check(tok_dst == 0, f"Zero '{tok}' template artifacts in dist/llms.txt (found {tok_dst})")

    # Check for insecure http:// links
    insecure_pub = re.findall(r"http://[a-zA-Z0-9.-]+", public_text)
    insecure_dst = re.findall(r"http://[a-zA-Z0-9.-]+", dist_text)
    check(len(insecure_pub) == 0, f"Zero insecure http:// URLs in public/llms.txt (found {len(insecure_pub)})")
    check(len(insecure_dst) == 0, f"Zero insecure http:// URLs in dist/llms.txt (found {len(insecure_dst)})")

    # Check markdown link validity [text](url)
    broken_md_links = re.findall(r"\[\s*\]\([^\)]*\)|\[[^\]]*\]\(\s*\)", public_text)
    check(len(broken_md_links) == 0, f"Zero broken markdown link syntaxes in public/llms.txt (found {len(broken_md_links)})")

    # Double-slash check in paths
    double_slashes = re.findall(r"https://almaholistica\.com//", public_text)
    check(len(double_slashes) == 0, f"Zero double slashes in URLs (found {len(double_slashes)})")

    # --------------------------------------------------------------------------
    # SUMMARY & FINAL VERDICT
    # --------------------------------------------------------------------------
    print("\n" + "=" * 80)
    print("EMPIRICAL CHALLENGER VERIFICATION SUMMARY")
    print("=" * 80)
    print(f"Total Assertions: {total_assertions}")
    print(f"Passed Assertions: {passed_assertions}")
    print(f"Failed Assertions: {len(failed_assertions)}")

    if failed_assertions:
        print("\nFAILURES ENCOUNTERED:")
        for fa in failed_assertions:
            print(f"  - {fa}")
        verdict = "REJECT"
    else:
        print("\nALL ADVERSARIAL ASSERTIONS PASSED WITH ZERO FAILURES!")
        verdict = "APPROVE"

    print(f"\nFINAL VERDICT: {verdict}")
    print("=" * 80)

    return 0 if verdict == "APPROVE" else 1

if __name__ == "__main__":
    sys.exit(run_tests())
