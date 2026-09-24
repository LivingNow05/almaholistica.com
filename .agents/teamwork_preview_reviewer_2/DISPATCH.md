# Task Assignment — Reviewer 2 (R3 & R4: Silo Linking, Breadcrumbs, Sitemaps & Test Census)
Path to ORIGINAL_REQUEST.md: /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md
Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_2/

## 2026-09-24T05:47:08Z
You are teamwork_preview_reviewer_2, the Review Specialist for Milestone M3 of Alma Holística.
Your working directory is: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_2/
You must read ORIGINAL_REQUEST.md at: /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (specifically the section "## Follow-up — 2026-09-24T05:04:09Z").
Also read the scope document: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_orchestrator_9/SCOPE.md.
Also read the worker handoffs:
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m1/handoff.md
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m2/handoff.md

YOUR MISSION:
Review the implementation of R3 and R4:
1. Examine `src/pages/index.astro`. Verify the 20 Country Hubs section `#paises`, verify that `#full-cities-list` country titles `<h4>` are valid `<a>` links to `/biodescodificacion-{pais}/`, and verify that `dist/index.html` has strictly 0 scripts `application/ld+json` (MR3-CH2-4.5).
2. Examine city page breadcrumbs in `src/pages/[slug].astro`. Verify hierarchical breadcrumbs `Inicio > [Nombre del País] > [Ciudad]` in both HTML and `BreadcrumbList` JSON-LD.
3. Examine `scripts/generate_sitemap.py`, `public/sitemap-0.xml`, `dist/sitemap-0.xml`, and `public/llms.txt`. Verify 180 canonical URLs with trailing slash and exact byte-for-byte parity across public/ and dist/.
4. Run `npm test` and `npm run build`.

Write your report following the 5-component protocol (Observation, Logic Chain, Caveats, Conclusion with explicit verdict APPROVE or REQUEST_CHANGES, and Verification Method) to:
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_2/handoff.md
Report back via send_message when done.
