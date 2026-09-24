# Plan — Orchestrator 9: 20 Country Hubs & Silo Linking (180 Static Pages)

## Objective
Implementar 20 páginas Hub por País (`/biodescodificacion-{pais}/`), enlazado piramidal Home -> Hubs -> Ciudades, migas de pan y schemas, regeneración de sitemaps para 180 páginas, y adaptación completa de suites de pruebas con cero regresiones.

## Phases
1. **Fase 0: Survey & Technical Reconnaissance**
   - Dispatch 3 parallel Explorers:
     - Explorer 1: Datasets, 20 countries mapping, slug format, routing structure in Astro.
     - Explorer 2: Existing tests census, adversarial suites, Python harnesses, style checkers (`mate_style_checker`).
     - Explorer 3: Sitemaps generator (`scripts/generate_sitemap.py`), internal linking (Home, city pages breadcrumbs, schemas).
   - Synthesize survey findings into updated `PROJECT.md` / Architecture.

2. **Fase 1: Implementation Track**
   - Milestone M1: Data & SSG Route Creation for 20 Country Hubs (`src/pages/[slug].astro` or dedicated route, dataset structure, Swiss Bio-Tech solid matte templates).
   - Milestone M2: Pyramid Silo Internal Linking & Breadcrumbs (Home -> 20 Hubs, Hubs -> Ciudades, Ciudades -> Inicio > País > Ciudad, BreadcrumbList JSON-LD).
   - Milestone M3: Sitemaps Sync (`scripts/generate_sitemap.py`), `public/llms.txt` and tests assertions update for 180 static pages.

3. **Fase 2: Multi-Agent Review, Adversarial Verification & Forensic Audit**
   - 2 Reviewers independently checking code, schemas, and requirements.
   - 2 Challengers checking edge cases, link integrity, schema validation, CLS = 0, style compliance.
   - Forensic Auditor verifying zero cheating, authentic implementation.
   - Gate verification.

4. **Fase 3: Final Synthesis & Victory Handoff**
   - Verification report to caller agent (sentinel).
