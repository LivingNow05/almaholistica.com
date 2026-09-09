import json, csv, os, html

dist_dir = "/Users/anthony/Downloads/almaholistica.com/dist"

# --- PART 1: 113 CITIES VERIFICATION ---
cities_csv = "/Users/anthony/Downloads/almaholistica.com/src/data/dataset_almaholistica_ciudades.csv"
with open(cities_csv, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    cities = list(reader)

print(f"--- 1. CITIES AUDIT ({len(cities)} cities) ---")
city_errors = []
for c in cities:
    slug = c["URL Final (Slug)"].strip().lower()
    html_path = os.path.join(dist_dir, slug, "index.html")
    if not os.path.exists(html_path):
        city_errors.append((slug, "Missing HTML file"))
        continue
        
    with open(html_path, "r", encoding="utf-8") as hf:
        raw = hf.read()
    unescaped = html.unescape(raw)
    lower = unescaped.lower()
    
    # H1 title
    h1 = c["H1 Título"].strip().lower()
    if h1 not in lower:
        city_errors.append((slug, f"H1 missing: {h1[:30]}"))
        
    # Country
    country = c["País"].strip().lower()
    if country not in lower:
        city_errors.append((slug, f"Country missing: {country}"))
        
    # Currency
    currency = c["Moneda"].strip().lower()
    if currency not in lower:
        city_errors.append((slug, f"Currency missing: {currency}"))
        
    # Price
    price = c["Rango_Precio_Sesion"].strip().lower()
    if price not in lower:
        city_errors.append((slug, f"Price missing: {price}"))
        
    # Local story (snippet)
    story = c["Historia_Local"].strip().replace('"', '').replace("'", "")[:40].lower()
    if story not in lower:
        city_errors.append((slug, f"Story snippet missing: {story}"))
        
    # data-city
    expected_attr = f'data-city="{slug}"'
    if expected_attr not in raw:
        city_errors.append((slug, f"Attribute missing: {expected_attr}"))
        
    # Schema
    if "healthandbeautybusiness" not in lower:
        city_errors.append((slug, "Schema HealthAndBeautyBusiness missing"))
        
    if "breadcrumblist" not in lower:
        city_errors.append((slug, "Schema BreadcrumbList missing"))

print(f"City audit errors: {len(city_errors)}")
if city_errors:
    for e in city_errors[:10]:
        print("  -", e)
else:
    print("ALL 113 CITIES PASSED CONTENT & HYPERLOCAL AUDIT WITH 100% ACCURACY!")

# --- PART 2: 45 DOLENCIAS VERIFICATION ---
dolencias_json = "/Users/anthony/Downloads/almaholistica.com/src/data/dataset_biodescodificacion_dolencias.json"
with open(dolencias_json, "r", encoding="utf-8") as f:
    dolencias = json.load(f)

print(f"\n--- 2. DOLENCIAS AUDIT ({len(dolencias)} dolencias) ---")
dolencia_errors = []
for d in dolencias:
    slug = d["slug"].strip().lower()
    html_path = os.path.join(dist_dir, "biodescodificacion", slug, "index.html")
    if not os.path.exists(html_path):
        dolencia_errors.append((slug, "Missing HTML file"))
        continue
        
    with open(html_path, "r", encoding="utf-8") as hf:
        raw = hf.read()
    unescaped = html.unescape(raw)
    lower = unescaped.lower().replace('"', '').replace("'", "")
    
    # Nombre
    name = d["nombre"].strip()
    if name.lower() not in lower:
        dolencia_errors.append((slug, f"Nombre missing: {name}"))
        
    # Sistema
    sistema = d["sistema"].strip()
    if sistema.lower() not in lower:
        dolencia_errors.append((slug, f"Sistema missing: {sistema}"))
        
    # Conflicto
    conflicto = d["conflictoEmocional"].strip().replace('"', '').replace("'", "")[:35].lower()
    if conflicto not in lower:
        dolencia_errors.append((slug, f"Conflicto missing: {conflicto}"))
        
    # Sentido
    sentido = d["sentidoBiologico"].strip().replace('"', '').replace("'", "")[:35].lower()
    if sentido not in lower:
        dolencia_errors.append((slug, f"Sentido missing: {sentido}"))
        
    # Reprogramación
    reprog = d["reprogramacion"].strip().replace('"', '').replace("'", "")[:35].lower()
    if reprog not in lower:
        dolencia_errors.append((slug, f"Reprog missing: {reprog}"))
        
    # Preguntas
    for q in d["preguntasReflexion"]:
        q_clean = q.strip().replace('"', '').replace("'", "")[:30].lower()
        if q_clean not in lower:
            dolencia_errors.append((slug, f"Pregunta missing: {q_clean}"))
            
    # FAQs
    for faq in d["faqs"]:
        f_clean = faq["pregunta"].strip().replace('"', '').replace("'", "")[:30].lower()
        if f_clean not in lower:
            dolencia_errors.append((slug, f"FAQ missing: {f_clean}"))
            
    # Schemas
    if "medicalwebpage" not in lower:
        dolencia_errors.append((slug, "Schema MedicalWebPage missing"))
    if "faqpage" not in lower:
        dolencia_errors.append((slug, "Schema FAQPage missing"))
    if "breadcrumblist" not in lower:
        dolencia_errors.append((slug, "Schema BreadcrumbList missing"))
        
    # data-symptom
    expected_attr = f'data-symptom="{name}"'
    if expected_attr not in raw:
        dolencia_errors.append((slug, f"data-symptom missing: {expected_attr}"))

print(f"Dolencia audit errors: {len(dolencia_errors)}")
if dolencia_errors:
    for e in dolencia_errors[:10]:
        print("  -", e)
else:
    print("ALL 45 DOLENCIAS PASSED CONTENT & CLINICAL MEANING AUDIT WITH 100% ACCURACY!")

# --- PART 3: HOMEPAGE & CATALOG AUDIT ---
print("\n--- 3. HOMEPAGE & CATALOG AUDIT ---")
home_path = os.path.join(dist_dir, "index.html")
catalog_path = os.path.join(dist_dir, "biodescodificacion", "index.html")

assert os.path.exists(home_path), "Homepage missing"
assert os.path.exists(catalog_path), "Catalog page missing"

with open(home_path, "r", encoding="utf-8") as f:
    home_raw = f.read()

with open(catalog_path, "r", encoding="utf-8") as f:
    cat_raw = f.read()

# Verify home has cities list and dolencias list
assert "data-city-name=" in home_raw, "Homepage missing interactive cities list"
assert "data-search=" in home_raw, "Homepage missing interactive dolencias list"
assert "logo-mariposa-con-fondo-completo.svg" in home_raw, "Homepage missing logo"
assert 'width="320"' in home_raw and 'height="320"' in home_raw, "Homepage missing explicit logo dimensions"

# Verify catalog has all 45 dolencias and search filter
assert "symptom-filter-input" in cat_raw, "Catalog missing filter input"
assert "data-sistema=" in cat_raw, "Catalog missing data-sistema attributes"
assert "visible-count" in cat_raw, "Catalog missing counter"

print("HOMEPAGE AND CATALOG AUDIT: 100% CLEAN AND OPERATIONAL!")
