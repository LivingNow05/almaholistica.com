# BRIEFING — 2026-09-06T22:20:50Z

## Mission
Implement the full editorial redesign of `src/pages/index.astro` and GSAP animations for Alma Holística following Talora Wellness Group aesthetic and preserving all test contracts.

## 🔒 My Identity
- Archetype: implementer
- Roles: implementer, qa
- Working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_mr3_run/
- Original parent: ab7c73c9-9a1c-497f-a187-71e8ce3ddaaa
- Milestone: MR3 (Rediseño Editorial Landing Page & Animaciones GSAP)

## 🔒 Key Constraints
- Exclusive write ownership: ONLY modify `src/pages/index.astro`. Do not touch other files without need.
- Strict bi-color aesthetic (#060A1A, #38BDF8), white pill buttons with `shadow-pill-white` token (NEVER inline `shadow-[...rgba...]` with `bg-white`).
- Zero gold/yellow (#F59E0B, #D4AF37, #FFE58F, #E5B33A). Zero banned words ("neon", "glow", "backdrop-blur", "glassmorphism") in code or comments.
- Rounded cards (`rounded-[2.5rem]`), generous padding (`p-10 lg:p-14`), ultra-fine borders (`border border-slate-800/40`), icon bubbles (`w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60`).
- Hero GSAP fade-in-up staggered with cubic-bezier, scroll indicator 1px vertical (h-16), subtle floating aura, CLS=0.
- Serif headings (Cormorant Garamond), eyebrows with minimal line `<span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>`, font-light body.
- Contracts:
  * Exactly 12 dolencias canónicas with `home-dolencia-card` class (including 'migrana' and 'sobrepeso-retencion').
  * Minimum 100 valid hyper-local city links pointing to existing SSG routes.
  * WhatsApp buttons with `data-open-quiz="true"`.
  * ZERO JSON-LD schemas in `index.astro` (required by adversarial_m5_sitemaps_schema).
  * Maintain `<section id="dolencias">` and `<section id="ciudades">`.
  * Maintain search inputs `#home-symptom-search` and `#home-city-search`.

## Current Parent
- Conversation ID: ab7c73c9-9a1c-497f-a187-71e8ce3ddaaa
- Updated: 2026-09-06T22:20:50Z

## Task Summary
- **What to build**: Full editorial redesign of `src/pages/index.astro`
- **Success criteria**: All style audits pass (mate_style_checker), build passes, and 100% of test suites pass without regression.
- **Interface contracts**: PROJECT.md, tests/adversarial_*.test.mjs, tests/adversarial_*.py
- **Code layout**: `src/pages/index.astro`

## Change Tracker
- **Files modified**: `src/pages/index.astro` (complete editorial redesign conforming to Talora Wellness Group aesthetic and all testing contracts)
- **Build status**: PASS (160 pages built in 2.14s)
- **Pending issues**: None

## Quality Status
- **Build/test result**: PASS (150/150 unit tests, 201/201 adversarial JS tests, 4/4 Python adversarial harnesses pass)
- **Lint status**: 0 mate style violations (`auditMateStyleContent` passed: true, violations: [])
- **Tests added/modified**: Validated against comprehensive existing test suites

## Loaded Skills
- None
