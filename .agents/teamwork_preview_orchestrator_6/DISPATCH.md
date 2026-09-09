# DISPATCH — teamwork_preview_orchestrator_6

## 2026-09-06T22:17:04Z
You are the Project Orchestrator for Alma Holística (almaholistica.com).

Your identity: teamwork_preview_orchestrator_6
Your working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_orchestrator_6
Project root: /Users/anthony/Downloads/almaholistica.com
Predecessor: teamwork_preview_orchestrator_5 (in .agents/teamwork_preview_orchestrator_5/)
Scope document: /Users/anthony/Downloads/almaholistica.com/PROJECT.md
Authoritative request: /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (under ## 2026-09-06T17:12:38Z)

CURRENT STATUS & PICKUP POINT:
- MR1 (Core, Tokens, GSAP, SVGs): 100% COMPLETE & VERIFIED.
- MR2 (Navbar, Footer, WhatsAppQuizModal): 100% COMPLETE & UNANIMOUSLY APPROVED (2 Reviewers, 2 Challengers with 647 test assertions passed, 1 Forensic Auditor CLEAN).
- MR3 (Landing Page `src/pages/index.astro` & GSAP Animations): Pick up implementation here!
- MR4 (Dynamic SSG Routes: `src/pages/[slug].astro`, `src/pages/biodescodificacion/[slug].astro`, `biodescodificacion/index.astro`): Needs to be updated to match the new editorial aesthetic (zero yellow, bi-color, pill buttons, rounded-[2.5rem] cards).
- MR5 (Final Acceptance, Test Suite & Forensic Hardening): Full build and test verification.

DETAILED REQUIREMENTS:
1. R1 - Estilo Visual Minimalista Editorial (Talora Wellness Group):
   - Total elimination of yellow/gold (#F59E0B, #D4AF37) in all CSS, components, cards, SVGs, and buttons.
   - Depurated bi-color palette: Fondo Abisal (#060A1A), surfaces (#060A1A, #0A1226), single accent light (#38BDF8 cyan), pure white (#FFFFFF, #F8FAFC) for titles & primary buttons, slate (#94A3B8, font-light) for body text.
   - High-end pill buttons in pure white: `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`. Secondary buttons as minimal link with arrow.
   - Modern minimalist cards: wide containers with rounded-[2.5rem], generous padding (p-10 lg:p-14), ultra-fine borders (border border-slate-800/40), circular icon bubbles (w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60).
2. R2 - Animaciones Profesionales Suaves con GSAP:
   - GSAP transitions for Hero entrance (staggered fade-in-up, cubic-bezier curve).
   - Minimalist vertical scroll indicator (1px line, w-[1px] h-16 bg-slate-800 relative overflow-hidden with moving inner line).
   - Floating aura: organic subtle motion behind interactive butterfly logo.
   - Card micro-animations: smooth hover elevation without layout shifts (CLS = 0).
3. R3 - Tipografía Editorial Serena:
   - Primary titles in elegant Serif (Cormorant Garamond or refined Cinzel) at large scale (text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-normal).
   - Eyebrow subtitles with minimalist divider line (`<span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>...</span>`).
   - Body paragraphs in sans-serif (Inter / Plus Jakarta Sans), font-light, leading-relaxed, max-w-xl.
4. R4 - Preservación Integral de la Arquitectura Existente:
   - 114 dynamic city pages (src/pages/[slug].astro).
   - 45 dynamic ailment pages (src/pages/biodescodificacion/[slug].astro).
   - WhatsApp Quiz Modal (WhatsAppQuizModal.tsx) adapted to new aesthetic.
   - SitemapFast architecture (sitemap-index.xml, sitemap-0.xml, robots.txt).
   - Schema.org JSON-LD and E-E-A-T / GEO assets.
5. Acceptance Criteria:
   - Zero traces of yellow/gold (#F59E0B, #D4AF37).
   - `npm run build` compiles 100% cleanly without TypeScript or Astro errors (160 static pages).
   - Full test suite passes.

OPERATIONAL INSTRUCTIONS:
- Create and maintain your BRIEFING.md and progress.md in your working directory (.agents/teamwork_preview_orchestrator_6/).
- Drive MR3, MR4, and MR5 to completion through specialized workers and reviewers.
- When finished and verified with `npm run build` and tests, claim victory and report to me (the Sentinel).
