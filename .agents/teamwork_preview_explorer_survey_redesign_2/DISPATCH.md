## 2026-09-06T17:14:32Z

<USER_REQUEST>
Eres teamwork_preview_explorer_survey_redesign_2.
Tu directorio de trabajo exclusivo para metadatos y reportes es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_redesign_2/
Tu objetivo es realizar una investigación exhaustiva (read-only) para la Fase 0 (Survey) del rediseño de alta gama de Alma Holística (almaholistica.com), enfocado en R2 (Animaciones Profesionales Suaves con GSAP).

LEE OBLIGATORIAMENTE Y EN PRIMER LUGAR:
/Users/anthony/Downloads/almaholistica.com/.agents/ORIGINAL_REQUEST.md (especialmente la sección ## 2026-09-06T17:12:38Z)
/Users/anthony/Downloads/almaholistica.com/PROJECT.md

TAREAS DE INVESTIGACIÓN:
1. Revisar el estado de dependencias en `package.json`:
   - ¿Está instalado GSAP? Si no, ¿cuál es el comando exacto y versión recomendada?
   - ¿Cómo maneja Astro 5 la carga e hidratación de scripts de GSAP para evitar errores de SSR o hydration mismatch?
2. Diseñar la arquitectura de animaciones GSAP:
   - **Hero Entrance**: Revelación escalonada (staggered fade-in-up con curva `cubic-bezier(0.16, 1, 0.3, 1)` o GSAP ease `power3.out` / `expo.out`) para badge, H1, párrafo de apoyo, botones de acción y contenedor gráfico.
   - **Indicador de Scroll**: Línea vertical minimalista de 1px (`w-[1px] h-16 bg-slate-800 relative overflow-hidden` con línea interior animada continua hacia abajo). ¿Dónde debe ubicarse en el Hero y cómo implementarlo limpiamente?
   - **Floating Aura**: Movimiento orgánico y sutil en segundo plano detrás del logo mariposa interactivo. Analizar cómo está implementado el logo mariposa actualmente (`logo-mariposa-con-fondo-completo.svg`, interactividad actual) y cómo integrar el aura flotante con GSAP / CSS sutil.
   - **Micro-animaciones de Tarjetas**: Elevación suave y sutil transición en hover sin saltos bruscos (`transition-all duration-500` o micro-interacción GSAP/Tailwind).
3. Asegurar que las animaciones garanticen `CLS = 0` (Cumulative Layout Shift) y respeten la accesibilidad (`prefers-reduced-motion`).

ENTREGABLE:
Escribe un reporte completo y estructurado en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_redesign_2/handoff.md` con:
- Plan de instalación e integración de GSAP en Astro.
- Snippets y arquitectura de scripts para Hero, Scroll Indicator, Floating Aura y Cards.
- Estrategia de prevención de CLS y SSR safety.

Al finalizar, usa `send_message` para notificar al orquestador. Todo en español.
</USER_REQUEST>
