import os, re

PROJECT_DIR = "/Users/anthony/Downloads/almaholistica.com"
SRC_DIR = os.path.join(PROJECT_DIR, "src")
DIST_DIR = os.path.join(PROJECT_DIR, "dist")

FORBIDDEN_PATTERNS = [
    (r"backdrop-blur", "Backdrop blur (glassmorphism)"),
    (r"backdrop-filter", "Backdrop filter CSS"),
    (r"bg-opacity-\d+", "Tailwind bg-opacity"),
    (r"text-opacity-\d+", "Tailwind text-opacity"),
    (r"border-opacity-\d+", "Tailwind border-opacity"),
    (r"opacity-(?:[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\b", "Tailwind partial opacity"),
    (r"rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(?:0?\.\d+|0)\s*\)", "Transparent rgba() color"),
    (r"hsla\s*\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*(?:0?\.\d+|0)\s*\)", "Transparent hsla() color"),
    (r"shadow-neon", "Neon shadow"),
    (r"shadow-glow", "Glow shadow"),
    (r"box-shadow\s*:[^;]*0\s+0\s+\d+px", "Bioluminescent glow box-shadow"),
    (r"bg-[a-z0-9-]+/(?:[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\b", "Tailwind slash opacity syntax on bg"),
]

# Excluded tokens in text content (e.g. word "glowing" or "aglow" if any, or word "neon" if in medical context)
# We test class attributes, styles, and inline CSS

def scan_file(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    violations = []
    # Test class strings or general text
    for pat, desc in FORBIDDEN_PATTERNS:
        matches = re.findall(pat, content, re.IGNORECASE)
        if matches:
            violations.append((desc, matches[:3]))
    return violations

print("=== 1. SCANNING ALL SOURCE FILES IN src/ ===")
src_violations = 0
scanned_src = 0
for root, _, files in os.walk(SRC_DIR):
    for file in files:
        if file.endswith((".astro", ".tsx", ".ts", ".js", ".mjs", ".css")):
            scanned_src += 1
            fpath = os.path.join(root, file)
            v = scan_file(fpath)
            if v:
                print(f"[VIOLATION] in src: {os.path.relpath(fpath, PROJECT_DIR)}")
                for desc, m in v:
                    print(f"   - {desc}: {m}")
                src_violations += len(v)

print(f"Scanned {scanned_src} source files. Total violations: {src_violations}")

print("\n=== 2. SCANNING ALL 160 HTML PAGES IN dist/ ===")
dist_html_violations = 0
scanned_html = 0
for root, _, files in os.walk(DIST_DIR):
    for file in files:
        if file.endswith(".html"):
            scanned_html += 1
            fpath = os.path.join(root, file)
            v = scan_file(fpath)
            if v:
                print(f"[VIOLATION] in dist HTML: {os.path.relpath(fpath, PROJECT_DIR)}")
                for desc, m in v:
                    print(f"   - {desc}: {m}")
                dist_html_violations += len(v)

print(f"Scanned {scanned_html} HTML files. Total violations: {dist_html_violations}")

print("\n=== 3. SCANNING BUNDLED CSS IN dist/_astro/ ===")
css_violations = 0
scanned_css = 0
astro_dir = os.path.join(DIST_DIR, "_astro")
if os.path.exists(astro_dir):
    for file in os.listdir(astro_dir):
        if file.endswith(".css"):
            scanned_css += 1
            fpath = os.path.join(astro_dir, file)
            v = scan_file(fpath)
            if v:
                print(f"[VIOLATION] in CSS: {file}")
                for desc, m in v:
                    print(f"   - {desc}: {m}")
                css_violations += len(v)

print(f"Scanned {scanned_css} CSS files. Total violations: {css_violations}")

total_violations = src_violations + dist_html_violations + css_violations
print(f"\n==========================================")
print(f"OVERALL FORENSIC MATTE AUDIT: {total_violations} VIOLATIONS")
print(f"==========================================")
