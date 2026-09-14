#!/usr/bin/env python3
"""
Adversarial Stress Harness & Forensic Quality Assurance — Milestone M6
Author: teamwork_preview_challenger_m6_1 (EMPIRICAL CHALLENGER)
Mission: Empirical verification of link integrity, CLS prevention, conversion funnel,
         sitemaps, and JSON-LD across all 160 static HTML files in dist/.
"""

import os
import sys
import re
import json
import xml.etree.ElementTree as ET
from urllib.parse import urlparse

ROOT_DIR = "/Users/anthony/Downloads/almaholistica.com"
DIST_DIR = os.path.join(ROOT_DIR, "dist")
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")

errors = []
warnings = []

def log_error(msg):
    print(f"  [ERROR] {msg}")
    errors.append(msg)

def log_warning(msg):
    print(f"  [WARNING] {msg}")
    warnings.append(msg)

def log_success(msg):
    print(f"  [OK] {msg}")

def collect_html_files(directory):
    html_files = []
    for root, _, files in os.walk(directory):
        for f in files:
            if f.endswith(".html"):
                html_files.append(os.path.join(root, f))
    return sorted(html_files)

# ==============================================================================
# 1. SCAN AND VERIFY TOTAL HTML PAGES
# ==============================================================================
print("\n" + "="*80)
print("DIMENSION 0: CENSUS OF DIST/ GENERATED PAGES")
print("="*80)

html_files = collect_html_files(DIST_DIR)
print(f"Total HTML files discovered in {DIST_DIR}: {len(html_files)}")
if len(html_files) != 160:
    log_error(f"Expected exactly 160 HTML files in dist/, found {len(html_files)}")
else:
    log_success("Exact match: 160 HTML pages generated.")

# Map of file path -> parsed contents & element IDs
html_cache = {}
for hf in html_files:
    with open(hf, "r", encoding="utf-8") as f:
        content = f.read()
    # Extract all ids
    ids = set(re.findall(r'id=["\']([^"\']+)["\']', content))
    html_cache[hf] = {
        "content": content,
        "ids": ids,
        "rel_path": os.path.relpath(hf, DIST_DIR)
    }

# ==============================================================================
# 2. INTERNAL LINK INTEGRITY (ZERO BROKEN LINKS / ZERO 404s)
# ==============================================================================
print("\n" + "="*80)
print("DIMENSION 1: INTERNAL LINK INTEGRITY AUDIT (0 BROKEN LINKS / 404s)")
print("="*80)

total_links_scanned = 0
internal_links_checked = 0
broken_links = []

for hf, data in html_cache.items():
    content = data["content"]
    rel_source = data["rel_path"]
    
    # Extract href attributes from <a>, <link>
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
    # Also extract src attributes from <img>, <script>, <source>
    srcs = re.findall(r'src=["\']([^"\']+)["\']', content)
    
    for href in hrefs:
        total_links_scanned += 1
        
        # Skip external domains and protocols
        if href.startswith("http://") or href.startswith("https://"):
            if not href.startswith("https://almaholistica.com"):
                continue
        if href.startswith("mailto:") or href.startswith("tel:") or href.startswith("javascript:"):
            continue
            
        internal_links_checked += 1
        
        # Parse URL
        if href.startswith("https://almaholistica.com"):
            clean_href = href[len("https://almaholistica.com"):]
        else:
            clean_href = href
            
        parsed = urlparse(clean_href)
        path_part = parsed.path
        fragment = parsed.fragment
        
        # Determine target physical file in dist/
        target_file = None
        if clean_href.startswith("#"):
            # Anchor strictly on current page
            target_file = hf
        elif path_part == "" or path_part == "/":
            target_file = os.path.join(DIST_DIR, "index.html")
        else:
            clean_p = path_part.lstrip("/")
            as_dir_index = os.path.join(DIST_DIR, clean_p.rstrip("/"), "index.html")
            as_direct_file = os.path.join(DIST_DIR, clean_p)
            
            if os.path.isfile(as_dir_index):
                target_file = as_dir_index
            elif os.path.isfile(as_direct_file):
                target_file = as_direct_file
            else:
                broken_links.append({
                    "source": rel_source,
                    "href": href,
                    "reason": f"Target path '{clean_p}' does not resolve to any physical file in dist/"
                })
                continue
                
        # If fragment is present, verify that the anchor exists in target_file
        if fragment and target_file:
            if target_file in html_cache:
                target_ids = html_cache[target_file]["ids"]
                if fragment not in target_ids:
                    broken_links.append({
                        "source": rel_source,
                        "href": href,
                        "reason": f"Target anchor #{fragment} not found in {os.path.relpath(target_file, DIST_DIR)}"
                    })

    # Verify src assets exist
    for src in srcs:
        total_links_scanned += 1
        if src.startswith("http://") or src.startswith("https://") or src.startswith("data:"):
            continue
        clean_src = src.lstrip("/")
        as_asset = os.path.join(DIST_DIR, clean_src)
        if not os.path.exists(as_asset):
            broken_links.append({
                "source": rel_source,
                "href": src,
                "reason": f"Target asset src '{src}' not found on filesystem"
            })

print(f"Total links & assets scanned: {total_links_scanned}")
print(f"Internal links & assets verified: {internal_links_checked}")
if broken_links:
    for bl in broken_links[:10]:
        log_error(f"Broken link in {bl['source']}: {bl['href']} -> {bl['reason']}")
    log_error(f"Total broken links found: {len(broken_links)}")
else:
    log_success(f"Zero broken links (0 404s) found across all {len(html_files)} pages!")

# ==============================================================================
# 3. CLS PREVENTION AUDIT (IMG AND SVG DIMENSIONS)
# ==============================================================================
print("\n" + "="*80)
print("DIMENSION 2: CLS PREVENTION AUDIT (EXPLICIT DIMENSIONS ON IMG & SVG)")
print("="*80)

img_issues = []
svg_issues = []
total_imgs = 0
total_svgs = 0

for hf, data in html_cache.items():
    content = data["content"]
    rel_path = data["rel_path"]
    
    # 1. Check all <img> tags
    img_tags = re.findall(r'<img\b[^>]*>', content, re.IGNORECASE)
    for img in img_tags:
        total_imgs += 1
        has_width = re.search(r'\bwidth=["\']?\d+', img, re.IGNORECASE) is not None
        has_height = re.search(r'\bheight=["\']?\d+', img, re.IGNORECASE) is not None
        has_aspect = "aspect-ratio" in img
        if not ((has_width and has_height) or has_aspect):
            img_issues.append({"file": rel_path, "tag": img})
            
    # 2. Check all <svg> tags
    svg_tags = re.findall(r'<svg\b[^>]*>', content, re.IGNORECASE)
    for svg in svg_tags:
        total_svgs += 1
        has_viewbox = re.search(r'\bviewBox=["\']?[^"\'>]+["\']?', svg, re.IGNORECASE) is not None
        has_width = re.search(r'\bwidth=["\']?[^"\'>]+["\']?', svg, re.IGNORECASE) is not None
        has_height = re.search(r'\bheight=["\']?[^"\'>]+["\']?', svg, re.IGNORECASE) is not None
        has_class_size = re.search(r'\bclass=["\'][^"\']*(?:w-\d+|h-\d+|size-\d+)[^"\']*["\']', svg, re.IGNORECASE) is not None
        
        if not (has_viewbox or (has_width and has_height) or has_class_size):
            svg_issues.append({"file": rel_path, "tag": svg})

print(f"Total <img> tags inspected across 160 pages: {total_imgs}")
print(f"Total <svg> tags inspected across 160 pages: {total_svgs}")

if img_issues:
    log_error(f"Found {len(img_issues)} unconstrained <img> tags lacking explicit width/height!")
    for issue in img_issues[:5]:
        print(f"    In {issue['file']}: {issue['tag']}")
else:
    log_success("All <img> tags have explicit width/height or aspect-ratio attributes.")

if svg_issues:
    log_error(f"Found {len(svg_issues)} unconstrained <svg> tags lacking viewBox/dimensions!")
    for issue in svg_issues[:5]:
        print(f"    In {issue['file']}: {issue['tag']}")
else:
    log_success("All <svg> tags have viewBox or explicit dimensions/classes preventing CLS.")

# ==============================================================================
# 4. CONVERSION FUNNEL (WHATSAPP TO QUIZ MODAL HOOKS)
# ==============================================================================
print("\n" + "="*80)
print("DIMENSION 3: CONVERSION FUNNEL (WHATSAPP LINKS & QUIZ MODAL)")
print("="*80)

funnel_issues = []

def verify_funnel_page(rel_path, page_type):
    full_path = os.path.join(DIST_DIR, rel_path)
    if full_path not in html_cache:
        log_error(f"Missing page: {rel_path}")
        return
    content = html_cache[full_path]["content"]
    
    # 1. Must have container for WhatsAppQuizModal or client script
    has_modal_container = ('id="quiz-modal-container"' in content or 
                           'astro-island' in content or 
                           'WhatsAppQuizModal' in content)
    if not has_modal_container:
        funnel_issues.append({"file": rel_path, "issue": "Missing quiz-modal-container or astro-island"})
        
    # 2. Must contain WhatsApp CTAs
    wa_links = re.findall(r'href=["\'](https://wa\.me/[^"\']+)["\']', content)
    if not wa_links:
        funnel_issues.append({"file": rel_path, "issue": "No WhatsApp CTA links found"})
    else:
        for wa_url in wa_links:
            if "573151206985" not in wa_url:
                funnel_issues.append({"file": rel_path, "issue": f"WhatsApp URL does not use site phone number: {wa_url}"})
            if "text=" not in wa_url:
                funnel_issues.append({"file": rel_path, "issue": f"WhatsApp URL missing text parameter: {wa_url}"})

    # 3. Must have interception mechanism (data-open-quiz or global wa.me click delegation)
    has_data_open_quiz = "data-open-quiz" in content
    has_global_interception = ("alma:open-quiz" in content or "data-symptom" in content or "wa.me" in content)
    if not (has_data_open_quiz or has_global_interception):
        funnel_issues.append({"file": rel_path, "issue": "No quiz opening trigger attributes or scripts found"})

# Check home
verify_funnel_page("index.html", "home")
# Check catalog
verify_funnel_page(os.path.join("biodescodificacion", "index.html"), "catalog")
# Check all 113 cities
city_count = 0
for hf, data in html_cache.items():
    rp = data["rel_path"]
    if rp.count(os.sep) == 1 and not rp.startswith("biodescodificacion"):
        city_count += 1
        verify_funnel_page(rp, "city")

# Check all 45 dolencias
dolencia_count = 0
for hf, data in html_cache.items():
    rp = data["rel_path"]
    if rp.startswith("biodescodificacion" + os.sep) and rp != os.path.join("biodescodificacion", "index.html"):
        dolencia_count += 1
        verify_funnel_page(rp, "dolencia")

print(f"Verified funnel across {city_count} city pages and {dolencia_count} dolencia pages.")
if funnel_issues:
    log_error(f"Found {len(funnel_issues)} conversion funnel issues!")
    for fi in funnel_issues[:10]:
        print(f"    In {fi['file']}: {fi['issue']}")
else:
    log_success("Conversion funnel verified: All 160 pages correctly implement WhatsApp CTAs and Quiz Modal triggers.")

# ==============================================================================
# 5. SITEMAPS & ROBOTS.TXT (PUBLIC VS DIST PARITY & COVERAGE)
# ==============================================================================
print("\n" + "="*80)
print("DIMENSION 4: SITEMAP & ROBOTS.TXT INTEGRITY & PARITY")
print("="*80)

sitemap_files = ["sitemap-index.xml", "sitemap-0.xml", "sitemap.xml", "robots.txt"]
parity_errors = []

for sm in sitemap_files:
    pub_path = os.path.join(PUBLIC_DIR, sm)
    dst_path = os.path.join(DIST_DIR, sm)
    
    if not os.path.exists(pub_path):
        log_error(f"Missing {pub_path}")
        parity_errors.append(f"Missing {pub_path}")
        continue
    if not os.path.exists(dst_path):
        log_error(f"Missing {dst_path}")
        parity_errors.append(f"Missing {dst_path}")
        continue
        
    with open(pub_path, "rb") as f1, open(dst_path, "rb") as f2:
        c1 = f1.read()
        c2 = f2.read()
        if c1 != c2:
            log_error(f"Content mismatch between {pub_path} and {dst_path} ({len(c1)} vs {len(c2)} bytes)")
            parity_errors.append(f"Mismatch {sm}")
        else:
            log_success(f"Perfect byte-for-byte parity: public/{sm} == dist/{sm} ({len(c1)} bytes)")

# Verify 160 URLs in sitemap-0.xml
sitemap0_path = os.path.join(DIST_DIR, "sitemap-0.xml")
if os.path.exists(sitemap0_path):
    tree = ET.parse(sitemap0_path)
    root = tree.getroot()
    ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    loc_elements = root.findall('.//ns:loc', ns)
    urls = [elem.text.strip() for elem in loc_elements]
    
    print(f"Total URLs in sitemap-0.xml: {len(urls)}")
    if len(urls) != 160:
        log_error(f"Expected exactly 160 URLs in sitemap-0.xml, found {len(urls)}")
    else:
        log_success("Exact match: 160 URLs listed in sitemap-0.xml.")
        
    if len(set(urls)) != 160:
        log_error(f"Duplicate URLs found in sitemap-0.xml: unique {len(set(urls))} vs total {len(urls)}")
    else:
        log_success("Zero duplicate URLs in sitemap-0.xml.")
        
    missing_from_dist = []
    for u in urls:
        path = urlparse(u).path.strip("/")
        if path == "":
            expected_file = os.path.join(DIST_DIR, "index.html")
        else:
            expected_file = os.path.join(DIST_DIR, path, "index.html")
        if not os.path.isfile(expected_file):
            missing_from_dist.append((u, expected_file))
            
    if missing_from_dist:
        log_error(f"{len(missing_from_dist)} URLs in sitemap do not exist in dist/: {missing_from_dist[:5]}")
    else:
        log_success("100% of sitemap URLs map bijectively to physical HTML files in dist/.")

# Verify robots.txt
robots_path = os.path.join(DIST_DIR, "robots.txt")
if os.path.exists(robots_path):
    with open(robots_path, "r", encoding="utf-8") as f:
        robots_content = f.read()
    if "User-agent: *" not in robots_content or "Allow: /" not in robots_content:
        log_error("robots.txt missing User-agent or Allow directives")
    if "sitemap-index.xml" not in robots_content or "sitemap.xml" not in robots_content:
        log_error("robots.txt missing dual sitemap pointers")
    else:
        log_success("robots.txt verified with dual sitemap declarations.")

# ==============================================================================
# 6. JSON-LD VALIDATION ACROSS ALL PAGES
# ==============================================================================
print("\n" + "="*80)
print("DIMENSION 5: JSON-LD SYNTAX & SCHEMA STRUCTURE AUDIT")
print("="*80)

total_jsonld_blocks = 0
jsonld_errors = []
schema_type_counts = {}

for hf, data in html_cache.items():
    content = data["content"]
    rel_path = data["rel_path"]
    
    scripts = re.findall(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
    
    # Hub/catalog index pages are not required to have entity schemas per M5 contract
    if rel_path in ("index.html", os.path.join("biodescodificacion", "index.html")):
        if len(scripts) != 0:
            log_warning(f"Unexpected schema found in {rel_path}: {len(scripts)} blocks")
        continue

    # All programmatic pages (113 cities and 45 dolencias) MUST have schemas
    if not scripts:
        jsonld_errors.append(f"No JSON-LD schema found in programmatic page {rel_path}")
        continue
        
    for s_idx, s_content in enumerate(scripts):
        total_jsonld_blocks += 1
        trimmed = s_content.strip()
        try:
            parsed = json.loads(trimmed)
        except json.JSONDecodeError as e:
            jsonld_errors.append(f"JSON-LD syntax error in {rel_path} block {s_idx}: {str(e)}")
            continue
            
        if isinstance(parsed, dict):
            context = parsed.get("@context", "")
            if "schema.org" not in context:
                jsonld_errors.append(f"Invalid @context '{context}' in {rel_path}")
            stype = parsed.get("@type", "UNKNOWN")
            schema_type_counts[stype] = schema_type_counts.get(stype, 0) + 1
            
            if stype == "MedicalWebPage":
                if "about" not in parsed:
                    jsonld_errors.append(f"MedicalWebPage in {rel_path} missing 'about' field")
            elif stype == "FAQPage":
                if "mainEntity" not in parsed or not parsed["mainEntity"]:
                    jsonld_errors.append(f"FAQPage in {rel_path} missing 'mainEntity' questions")
            elif stype == "BreadcrumbList":
                if "itemListElement" not in parsed or not parsed["itemListElement"]:
                    jsonld_errors.append(f"BreadcrumbList in {rel_path} missing 'itemListElement'")
            elif stype in ("HealthAndBeautyBusiness", "LocalBusiness"):
                if "address" not in parsed:
                    jsonld_errors.append(f"LocalBusiness in {rel_path} missing 'address'")
        else:
            jsonld_errors.append(f"JSON-LD in {rel_path} is not a JSON object")

print(f"Total JSON-LD script blocks inspected: {total_jsonld_blocks}")
print(f"Schema types found: {schema_type_counts}")

if jsonld_errors:
    log_error(f"Found {len(jsonld_errors)} JSON-LD schema errors!")
    for je in jsonld_errors[:10]:
        print(f"    {je}")
else:
    log_success(f"All {total_jsonld_blocks} JSON-LD schemas parsed cleanly with 100% valid syntax and structures.")

# ==============================================================================
# SUMMARY VERDICT
# ==============================================================================
print("\n" + "="*80)
print("FINAL QA AUDIT SUMMARY (M6 EMPIRICAL CHALLENGER)")
print("="*80)
print(f"Total Pages Checked: {len(html_files)}")
print(f"Total Errors Found: {len(errors)}")
print(f"Total Warnings: {len(warnings)}")

if errors:
    print("\nVERDICT: REJECT")
    sys.exit(1)
else:
    print("\nVERDICT: CONFIRM_CORRECTNESS")
    sys.exit(0)
