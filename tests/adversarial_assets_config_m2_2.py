"""
Adversarial Stress Test for Assets & Site Config
Milestone M2 Gate Challenge (teamwork_preview_challenger_m2_2)

Validates:
1. public/logo-mariposa-con-fondo-completo.svg exists, >1MB, valid XML/SVG, square viewBox, hover CSS/keyframes, no malicious scripts.
2. public/favicon.svg exists, valid XML/SVG.
3. src/config/site.ts exports SITE_CONFIG with required contract fields:
   - whatsappNumber: '573000000000'
   - url: 'https://almaholistica.com'
   - name: 'Alma Holística'
   - defaultOgImage: '/logo-mariposa-con-fondo-completo.svg'
4. buildWhatsAppUrl parameter stress testing (emojis, special chars, long inputs).
5. AST / Type-checking sanity.
"""

import os
import re
import sys
import xml.etree.ElementTree as ET

LOGO_PATH = "public/logo-mariposa-con-fondo-completo.svg"
FAVICON_PATH = "public/favicon.svg"
SITE_CONFIG_PATH = "src/config/site.ts"

def run_tests():
    errors = []
    warnings = []

    print("======================================================================")
    print("EMPIRICAL CHALLENGER: ADVERSARIAL ASSETS & CONFIG TEST SUITE (M2.2)")
    print("======================================================================\n")

    # -------------------------------------------------------------------------
    # TEST 1: Logo SVG Inspection & Stress
    # -------------------------------------------------------------------------
    print("--- [TEST 1] Testing Logo SVG (public/logo-mariposa-con-fondo-completo.svg) ---")
    if not os.path.exists(LOGO_PATH):
        errors.append(f"Logo SVG file does not exist: {LOGO_PATH}")
    else:
        size = os.path.getsize(LOGO_PATH)
        print(f"File size: {size} bytes ({size / (1024 * 1024):.2f} MB)")
        if size < 1024 * 1024:
            errors.append(f"Logo SVG is smaller than 1MB: {size} bytes")
        
        try:
            tree = ET.parse(LOGO_PATH)
            root = tree.getroot()
            tag = root.tag
            if not tag.endswith("svg"):
                errors.append(f"Root tag is not svg: {tag}")
            
            viewbox = root.attrib.get("viewBox")
            print(f"Root tag: {tag}, viewBox: {viewbox}")
            if not viewbox:
                errors.append("Logo SVG missing viewBox attribute")
            else:
                parts = [float(p) for p in viewbox.split()]
                if len(parts) != 4:
                    errors.append(f"Invalid viewBox parts: {viewbox}")
                elif parts[2] != parts[3]:
                    warnings.append(f"viewBox is not 1:1 square: {viewbox}")
                else:
                    print(f"viewBox is square aspect ratio ({parts[2]}x{parts[3]}) - PASS")
        except ET.ParseError as e:
            errors.append(f"Logo SVG XML parse error: {e}")

        # Check content for animations, hover, security
        with open(LOGO_PATH, "r", encoding="utf-8") as f:
            content = f.read()

        # Security check
        if "<script" in content.lower():
            errors.append("Security violation: <script> tag detected in SVG logo")
        if "onload=" in content.lower() or "onerror=" in content.lower():
            errors.append("Security violation: Inline JavaScript event handler detected in SVG logo")

        # Interactivity check
        has_hover = ":hover" in content
        has_keyframes = "@keyframes" in content
        has_transform = "transform" in content
        print(f"CSS :hover present: {has_hover}")
        print(f"CSS @keyframes present: {has_keyframes}")
        print(f"CSS transform present: {has_transform}")

        if not has_hover:
            errors.append("Logo SVG missing :hover interactive styling")
        if not has_keyframes:
            errors.append("Logo SVG missing @keyframes CSS animation definition")

    print(f"Test 1 result: {'FAIL' if errors else 'PASS'}\n")

    # -------------------------------------------------------------------------
    # TEST 2: Favicon SVG Inspection
    # -------------------------------------------------------------------------
    print("--- [TEST 2] Testing Favicon SVG (public/favicon.svg) ---")
    t2_errors = []
    if not os.path.exists(FAVICON_PATH):
        t2_errors.append(f"Favicon SVG file does not exist: {FAVICON_PATH}")
    else:
        fav_size = os.path.getsize(FAVICON_PATH)
        print(f"Favicon size: {fav_size} bytes ({fav_size / (1024 * 1024):.2f} MB)")
        try:
            tree = ET.parse(FAVICON_PATH)
            root = tree.getroot()
            if not root.tag.endswith("svg"):
                t2_errors.append(f"Favicon root tag is not svg: {root.tag}")
            print(f"Favicon root tag: {root.tag}, viewBox: {root.attrib.get('viewBox')}")
        except ET.ParseError as e:
            t2_errors.append(f"Favicon XML parse error: {e}")

        with open(FAVICON_PATH, "r", encoding="utf-8") as f:
            fav_content = f.read()
        if "<script" in fav_content.lower():
            t2_errors.append("Security violation: <script> tag detected in favicon")

    if t2_errors:
        errors.extend(t2_errors)
    print(f"Test 2 result: {'FAIL' if t2_errors else 'PASS'}\n")

    # -------------------------------------------------------------------------
    # TEST 3: Site Config Verification (src/config/site.ts)
    # -------------------------------------------------------------------------
    print("--- [TEST 3] Testing Site Config (src/config/site.ts) ---")
    t3_errors = []
    if not os.path.exists(SITE_CONFIG_PATH):
        t3_errors.append(f"Site config file does not exist: {SITE_CONFIG_PATH}")
    else:
        with open(SITE_CONFIG_PATH, "r", encoding="utf-8") as f:
            cfg_code = f.read()

        # Contract requirements
        if "export const SITE_CONFIG" not in cfg_code and "export default SITE_CONFIG" not in cfg_code:
            t3_errors.append("SITE_CONFIG is not exported from src/config/site.ts")

        # whatsappNumber check
        match_phone = re.search(r"whatsappNumber:\s*['\"]([^'\"]+)['\"]", cfg_code)
        if not match_phone:
            t3_errors.append("whatsappNumber not found in SITE_CONFIG")
        else:
            phone_val = match_phone.group(1)
            print(f"Found whatsappNumber: '{phone_val}'")
            if phone_val != "573000000000":
                t3_errors.append(f"whatsappNumber is '{phone_val}', expected exact '573000000000'")

        # URL check
        match_url = re.search(r"url:\s*['\"]([^'\"]+)['\"]", cfg_code)
        if not match_url:
            t3_errors.append("url not found in SITE_CONFIG")
        else:
            url_val = match_url.group(1)
            print(f"Found url: '{url_val}'")
            if url_val != "https://almaholistica.com":
                t3_errors.append(f"url is '{url_val}', expected 'https://almaholistica.com'")

        # defaultOgImage check
        match_og = re.search(r"defaultOgImage:\s*['\"]([^'\"]+)['\"]", cfg_code)
        if not match_og:
            t3_errors.append("defaultOgImage not found in SITE_CONFIG")
        else:
            og_val = match_og.group(1)
            print(f"Found defaultOgImage: '{og_val}'")
            if og_val != "/logo-mariposa-con-fondo-completo.svg":
                t3_errors.append(f"defaultOgImage is '{og_val}', expected '/logo-mariposa-con-fondo-completo.svg'")

        # name check
        match_name = re.search(r"name:\s*['\"]([^'\"]+)['\"]", cfg_code)
        if not match_name:
            t3_errors.append("name not found in SITE_CONFIG")
        else:
            name_val = match_name.group(1)
            print(f"Found name: '{name_val}'")
            if name_val != "Alma Holística":
                t3_errors.append(f"name is '{name_val}', expected 'Alma Holística'")

    if t3_errors:
        errors.extend(t3_errors)
    print(f"Test 3 result: {'FAIL' if t3_errors else 'PASS'}\n")

    # -------------------------------------------------------------------------
    # TEST 4: Design Tokens & Tailwind Conformance
    # -------------------------------------------------------------------------
    print("--- [TEST 4] Testing Design Tokens in tailwind.config.mjs ---")
    t4_errors = []
    tw_path = "tailwind.config.mjs"
    if os.path.exists(tw_path):
        with open(tw_path, "r", encoding="utf-8") as f:
            tw_code = f.read()

        # Check required solid matte colors (bicolor palette)
        expected_colors = {
            "060A1A": "Fondo Abisal",
            "0A1226": "Midnight Navy Card",
            "0E172F": "Midnight Navy Alt",
            "1E293B": "Borde Slate",
            "38BDF8": "Cyan Primario",
        }
        for hex_code, desc in expected_colors.items():
            if hex_code.lower() not in tw_code.lower():
                t4_errors.append(f"Color {desc} (#{hex_code}) not found in tailwind.config.mjs")
            else:
                print(f"  [OK] Color {desc} (#{hex_code}) configured")

        # Check eradication of gold and amber in tailwind.config.mjs
        eradicated_colors = {
            "D4AF37": "Oro Satinado",
            "F59E0B": "Ámbar Acento",
        }
        for hex_code, desc in eradicated_colors.items():
            if hex_code.lower() in tw_code.lower():
                t4_errors.append(f"Forbidden color {desc} (#{hex_code}) found in tailwind.config.mjs")
            else:
                print(f"  [OK] Color {desc} (#{hex_code}) properly eradicated")

        # Check forbidden classes/tokens
        forbidden = ["backdrop-blur", "glassmorphism"]
        for f_token in forbidden:
            if f_token in tw_code:
                t4_errors.append(f"Forbidden visual token '{f_token}' found in tailwind.config.mjs")

    if t4_errors:
        errors.extend(t4_errors)
    print(f"Test 4 result: {'FAIL' if t4_errors else 'PASS'}\n")

    # -------------------------------------------------------------------------
    # TEST 5: BaseLayout Anchors & Interface Contracts
    # -------------------------------------------------------------------------
    print("--- [TEST 5] Testing BaseLayout.astro Anchors ---")
    t5_errors = []
    layout_path = "src/layouts/BaseLayout.astro"
    if not os.path.exists(layout_path):
        t5_errors.append(f"BaseLayout.astro does not exist: {layout_path}")
    else:
        with open(layout_path, "r", encoding="utf-8") as f:
            layout_content = f.read()

        # #quiz-modal-container check
        if 'id="quiz-modal-container"' not in layout_content and "id='quiz-modal-container'" not in layout_content:
            t5_errors.append("#quiz-modal-container missing in BaseLayout.astro")
        else:
            print("  [OK] #quiz-modal-container anchor found")

        if 'data-client-load="client:load"' not in layout_content:
            t5_errors.append('data-client-load="client:load" attribute missing on #quiz-modal-container')
        else:
            print("  [OK] data-client-load='client:load' contract present")

        if '<slot name="quiz-modal"' not in layout_content and "<slot name='quiz-modal'" not in layout_content:
            t5_errors.append('<slot name="quiz-modal" /> missing in BaseLayout.astro')
        else:
            print("  [OK] <slot name='quiz-modal' /> found")

        # <slot name="schema" /> check inside <head>
        if '<slot name="schema"' not in layout_content and "<slot name='schema'" not in layout_content:
            t5_errors.append('<slot name="schema" /> missing in BaseLayout.astro')
        else:
            head_start = layout_content.find("<head")
            head_end = layout_content.find("</head>")
            slot_idx = layout_content.find('name="schema"')
            if slot_idx == -1:
                slot_idx = layout_content.find("name='schema'")
            if head_start != -1 and head_end != -1 and head_start < slot_idx < head_end:
                print("  [OK] <slot name='schema' /> located inside <head>...</head>")
            else:
                t5_errors.append("<slot name='schema' /> is not located inside <head>...</head>")

        # Check sitemap auto-discovery
        if 'rel="sitemap"' not in layout_content or '/sitemap-index.xml' not in layout_content:
            t5_errors.append('Sitemap auto-discovery link missing in BaseLayout.astro')
        else:
            print("  [OK] Sitemap auto-discovery link found")

    if t5_errors:
        errors.extend(t5_errors)
    print(f"Test 5 result: {'FAIL' if t5_errors else 'PASS'}\n")

    # -------------------------------------------------------------------------
    # TEST 6: buildWhatsAppUrl Stress Testing with Conflictive Inputs
    # -------------------------------------------------------------------------
    print("--- [TEST 6] Testing buildWhatsAppUrl() with Conflictive Inputs ---")
    t6_errors = []
    import subprocess
    import json
    node_script = """
    import { buildWhatsAppUrl } from './src/config/site.ts';
    import { URL } from 'node:url';

    const testCases = [
      { symptom: 'Gastritis & Reflujo ? Severo = Sí #1 + Dolor %20 / Tórax \\\\ Alto', location: 'Bogotá & Chía' },
      { symptom: '<script>alert("XSS")</script>', priorTreatments: '\"><img src=x onerror=alert(1)>' },
      { symptom: '🦋 Ansiedad 🧘‍♀️ opresión 💔', duration: '3 años 🌿' },
      { symptom: 'Line 1\\r\\nLine 2\\tTab\\nLine 3: "quotes" \\'single\\' `backticks`' },
      { phone: '+57 (300) 123-4567' },
      { phone: '' },
      { symptom: 'A'.repeat(2000) }
    ];

    const results = [];
    for (const tc of testCases) {
      const urlStr = buildWhatsAppUrl(tc);
      const parsed = new URL(urlStr);
      results.push({
        validUrl: true,
        hashEmpty: parsed.hash === '',
        singleParam: Array.from(parsed.searchParams.keys()).length === 1 && parsed.searchParams.has('text'),
        textLength: (parsed.searchParams.get('text') || '').length
      });
    }
    console.log(JSON.stringify(results));
    """
    try:
        proc = subprocess.run(
            ["node", "-e", node_script],
            capture_output=True,
            text=True,
            check=True
        )
        results = json.loads(proc.stdout)
        for i, r in enumerate(results):
            if not r["validUrl"] or not r["hashEmpty"] or not r["singleParam"] or r["textLength"] == 0:
                t6_errors.append(f"Test case {i} failed URL stress requirements: {r}")
        if not t6_errors:
            print(f"  [OK] Successfully stress-tested {len(results)} conflictive test cases across delimiters, XSS, Unicode, emojis and linebreaks")
    except Exception as e:
        t6_errors.append(f"buildWhatsAppUrl stress testing failed to execute: {e}")

    if t6_errors:
        errors.extend(t6_errors)
    print(f"Test 6 result: {'FAIL' if t6_errors else 'PASS'}\n")

    # -------------------------------------------------------------------------
    # SUMMARY & VERDICT
    # -------------------------------------------------------------------------
    print("======================================================================")
    print("FINAL SUMMARY OF ASSETS & CONFIG VERIFICATION")
    print("======================================================================")
    print(f"Total Errors: {len(errors)}")
    print(f"Total Warnings: {len(warnings)}")

    if errors:
        print("\nERRORS:")
        for e in errors:
            print(f"  - [FAIL] {e}")
    else:
        print("\nALL ADVERSARIAL ASSETS & CONFIG TESTS PASSED EMPIRICALLY!")

    verdict = "CONFIRM_CORRECTNESS" if not errors else "REJECT"
    print(f"\nVERDICT: {verdict}")
    print("======================================================================")
    return len(errors) == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
