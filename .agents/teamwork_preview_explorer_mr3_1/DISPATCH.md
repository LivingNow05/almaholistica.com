## 2026-09-06T22:04:07Z
Tu identidad: teamwork_preview_explorer_mr3_1
Tu directorio de trabajo exclusivo: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_1/

Archivos obligatorios a leer antes de iniciar:
1. /Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (Requerimiento original autoritativo, sección ## 2026-09-06T17:12:38Z)
2. /Users/anthony/Downloads/almaholistica.com/PROJECT.md (Arquitectura y definición de hitos MR1-MR5)
3. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_mr1/handoff.md (Tokens, GSAP instalado, SVGs limpios)
4. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_mr2/handoff.md (Navbar, Footer, Modal adaptados)

MISIÓN:
Investigar exhaustivamente la sección Hero de `src/pages/index.astro` para preparar la implementación del Hito MR3 (Landing Page & GSAP Hero Animations).
Eres un agente de solo lectura (READ-ONLY). NO debes modificar ni escribir código fuente en el proyecto.

PUNTOS CLAVE A INVESTIGAR:
1. Estado actual del Hero en `src/pages/index.astro`:
   - Detección de cualquier presencia de `#D4AF37`, `#F59E0B`, o clases doradas.
   - Tipografía del título principal: debe usar Serif elegante (*Cormorant Garamond* o *Cinzel*) a gran escala (`text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-normal`).
   - Eyebrow con línea divisoria minimalista: `<span class="text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-[#38BDF8]/50"></span>TEXTO</span>`.
   - Botón de acción principal en píldora blanca de alta gama (`bg-white text-[#060A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#38BDF8] hover:text-[#060A1A] transition-all duration-500 shadow-pill-white`) y botón secundario como enlace minimalista con flecha (`group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8]`).
   - Indicador de scroll vertical minimalista de 1px (`w-[1px] h-16 bg-slate-800 relative overflow-hidden` con línea interna animada hacia abajo).
   - Floating aura: efecto sutil orgánico en loop sinusoidal detrás del logo vectorial de la mariposa interactiva (`/logo-mariposa-con-fondo-completo.svg`).
   - Animación de entrada GSAP para los elementos del Hero: staggered fade-in-up con curva suave (`power3.out` o `cubic-bezier(0.16, 1, 0.3, 1)`), con garantía estricta de CLS = 0 y respeto a `prefers-reduced-motion`.
2. Proponer la especificación técnica y el código exacto propuesto para el Hero de `index.astro`.

ENTREGABLES:
Escribe tu reporte en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_1/report.md` y tu handoff en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_mr3_1/handoff.md`.
Al terminar, envía un mensaje notificando la finalización.
