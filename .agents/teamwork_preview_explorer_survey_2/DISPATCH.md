## 2026-09-24T05:07:15Z

<USER_REQUEST>
You are teamwork_preview_explorer_survey_2, working on the Survey phase for Alma Holística.
Your working directory is: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_2/
You must read ORIGINAL_REQUEST.md at: /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (specifically the section "## Follow-up — 2026-09-24T05:04:09Z").
Also read /Users/anthony/Downloads/almaholistica.com/PROJECT.md.

YOUR MISSION:
Investigate UI design, pyramid silo linking, breadcrumbs, and Schema.org invariants for the 20 Country Hubs and city pages:
1. Inspect `src/pages/index.astro`. How should the Home page link to the 20 country hubs? What section or component should be added/updated?
2. Inspect `src/pages/[slug].astro` (and relevant components like `Layout.astro`, `Navigation.astro`, breadcrumbs). How are breadcrumbs currently rendered on city pages? What changes are needed to implement `Inicio > [Nombre del País] > [Ciudad]` with link to `/biodescodificacion-{pais}/`?
3. Check `src/lib/schema.ts` and how schemas are generated. What schemas are generated for city pages (`HealthAndBeautyBusiness`, `BreadcrumbList`)? How should the country hubs schemas be defined (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`)? Note any invariants (e.g., Home page MUST have 0 ld+json scripts according to MR3-CH2-4.5).
4. Inspect CSS, Tailwind classes, and style enforcement tools (such as `mate_style_checker.py` or similar in `scripts/` or `tests/`). What exact rules exist for Swiss Bio-Tech solid matte (#060A1A, #0A1226, no transparencies, no backdrop-blur, no forbidden classes)?
5. Detail how each Country Hub should be laid out visually: hero, clinical E-E-A-T definition, specialist card, operational info (currency, timezone, payments), ethical disclaimer, FAQ accordion, and grid of links to its associated cities.

Write your complete, structured findings to:
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_2/handoff.md

Report back when done using send_message.
</USER_REQUEST>
