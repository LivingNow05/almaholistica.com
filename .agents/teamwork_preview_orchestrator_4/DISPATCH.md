## 2026-09-06T17:15:00Z

<USER_REQUEST>
You are the Project Orchestrator for Alma Holística (almaholistica.com).

Your identity: teamwork_preview_orchestrator_4
Your working directory: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_orchestrator_4
Project root: /Users/anthony/Downloads/almaholistica.com
Authoritative user request: /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (specifically the latest request under ## 2026-09-06T17:12:38Z)

TASK SUMMARY:
Execute a high-end visual and UX redesign for Alma Holística (almaholistica.com), transforming the interface toward a serene, contemporary minimalist editorial aesthetic inspired by Talora Wellness Group.

KEY REQUIREMENTS:
1. R1 - Estilo Visual Minimalista Editorial (Inspiración Talora Wellness):
   - Total elimination of yellow/gold tones (#F59E0B, #D4AF37) across all CSS, components, cards, SVGs, and buttons.
   - Depurated bi-color palette: Fondo Abisal (#060A1A), surfaces (#060A1A, #0A1226), single accent light (#38BDF8 cyan), pure white (#FFFFFF, #F8FAFC) for titles & primary buttons, slate (#94A3B8, font-light) for body text.
   - High-end pill buttons in pure white: `bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-[0_8px_24px_rgba(255,255,255,0.08)]`. Secondary buttons as minimal link with arrow.
   - Modern minimalist cards: wide containers with rounded-[2.5rem], generous padding (p-10 lg:p-14), ultra-fine borders (border border-slate-800/40), circular icon bubbles (w-14 h-14 rounded-full bg-[#0A1226] border border-slate-800/60).
2. R2 - Animaciones Profesionales Suaves con GSAP:
   - Integrate GSAP (install via npm if not present) for smooth entrance transitions and micro-interactions.
   - Hero entrance: staggered fade-in-up reveal.
   - Minimalist vertical scroll indicator (1px line, w-[1px] h-16 bg-slate-800 relative overflow-hidden with moving inner line).
   - Floating aura: organic subtle motion behind interactive butterfly logo.
   - Card micro-animations: smooth elevation on hover.
3. R3 - Tipografía Editorial Serena:
   - Primary titles in elegant Serif (Cormorant Garamond or refined Cinzel) at large scale (text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-normal).
   - Eyebrow subtitles with minimalist divider line:
     `<span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>TERAPIA Y BIODESCODIFICACIÓN</span>`
   - Body paragraphs in sans-serif (Inter or Plus Jakarta Sans), font-light, leading-relaxed, max-w-xl.
4. R4 - Preservación Integral de la Arquitectura Existente:
   - 114 dynamic city pages (src/pages/[slug].astro).
   - 45 dynamic ailment pages (src/pages/biodescodificacion/[slug].astro).
   - WhatsApp Quiz Modal (WhatsAppQuizModal.tsx) adapted to new aesthetic (rounded-[2.5rem], white pill button, zero yellow).
   - SitemapFast architecture (sitemap-index.xml, sitemap-0.xml, robots.txt).
   - Schema.org JSON-LD and E-E-A-T / GEO assets.
5. Acceptance Criteria:
   - Zero traces of yellow/gold (#F59E0B, #D4AF37) in CSS, components, or pages.
   - Bi-color master palette (#060A1A & #38BDF8) + pure white + slate.
   - Action buttons are pill-shaped (rounded-full) in pure white.
   - Cards are rounded-[2.5rem] with generous padding.
   - GSAP entrance animations smooth, CLS = 0.
   - Minimalist scroll indicator in Hero.
   - Clean font loading (Cormorant Garamond / Cinzel + Inter / Plus Jakarta Sans).
   - `npm run build` compiles 100% cleanly without TypeScript or Astro errors.
   - All 160 static pages generated successfully.
   - Tests pass cleanly.
</USER_REQUEST>
