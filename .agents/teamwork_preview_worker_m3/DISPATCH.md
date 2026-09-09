# DISPATCH — Worker M3 (Milestone M3: WhatsApp Quiz Funnel Modal)

## Role & Mission
Eres `teamwork_preview_worker_m3` (`teamwork_preview_worker`). Tu misión es implementar el componente React 19 `src/components/react/WhatsAppQuizModal.tsx` y montarlo con `client:load` en `src/layouts/BaseLayout.astro` respetando rigurosamente el diseño sólido mate y los contratos de pruebas E2E.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Archivos de Lectura Obligatoria
1. `/Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md` (Lectura completa y obligatoria)
2. `/Users/anthony/Downloads/almaholistica.com/PROJECT.md`
3. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m3_1/handoff.md`
4. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m3_2/handoff.md`
5. `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m3_3/handoff.md`
6. `/Users/anthony/Downloads/almaholistica.com/src/layouts/BaseLayout.astro`
7. `/Users/anthony/Downloads/almaholistica.com/src/config/site.ts`

## Propiedad Exclusiva de Escritura (Write Ownership)
- Posees exclusivamente:
  - `src/components/react/WhatsAppQuizModal.tsx` (creación)
  - `src/layouts/BaseLayout.astro` (adición del import y renderizado de `<WhatsAppQuizModal client:load />` adyacente a `<slot name="quiz-modal" />`)

## Especificación de Implementación
1. Materializar `src/components/react/WhatsAppQuizModal.tsx`:
   - 4 pasos interactivos (`symptom`, `duration`, `priorTreatments`, `location`) + paso 5 de diagnóstico preliminar.
   - Fórmula verbatim en diagnóstico (T1.10.2): `Identificamos un patrón relacionado con ${symptom} de ${duration} de evolución.`
   - Derivación final a WhatsApp estructurada con `buildWhatsAppUrl()` de `src/config/site.ts`.
   - Interceptación global de eventos (`a[href*="wa.me"]`, `a[href*="whatsapp.com"]`, `[data-open-quiz]`), soporte de `data-symptom`, `data-city`, y escucha del evento custom `alma:open-quiz`.
   - WAI-ARIA modal (`role="dialog"`, `aria-modal="true"`, tecla Escape, backdrop click).
   - Bloqueo de scroll sin CLS (`overflow: hidden`).
   - Diseño 100% sólido mate (#060A1A, #0A1226, #0E172F, #1E293B, #38BDF8, #D4AF37). Cero `backdrop-blur`, cero transparencias, cero glow/neón.
   - Exportación dual: `export function WhatsAppQuizModal` y `export default WhatsAppQuizModal`.
2. Integrar en `src/layouts/BaseLayout.astro`:
   - Importar `import WhatsAppQuizModal from '../components/react/WhatsAppQuizModal';`.
   - Dentro de `#quiz-modal-container`:
     ```astro
     <div id="quiz-modal-container" data-client-load="client:load">
       <slot name="quiz-modal" />
       <WhatsAppQuizModal client:load />
     </div>
     ```
     *Nota crítica*: Mantener `<slot name="quiz-modal" />` intacto y autocerrado para cumplir con el test adversarial `ADV-M2.2.10`.

## Comandos a Ejecutar y Verificar
- `npx astro check` (debe arrojar 0 errores, 0 warnings).
- `node --test tests/*.test.mjs` (todas las pruebas activas de M1, M2 y M3 deben pasar con 0 fallos).
- Ejecutar verificación del checker de estilo mate sobre `src/components/react/WhatsAppQuizModal.tsx` y `src/layouts/BaseLayout.astro`.

## Entrega
Generar reporte en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m3/handoff.md` con las 5 secciones (Observation, Logic Chain, Caveats, Conclusion, Verification Method).
Enviar mensaje al orquestador al concluir.

## 2026-09-06T04:44:06Z
Eres worker_m3 (teamwork_preview_worker).
Tu directorio de trabajo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m3/
Lee inmediatamente y de forma obligatoria:
1. /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
2. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m3/DISPATCH.md
3. /Users/anthony/Downloads/almaholistica.com/PROJECT.md
4. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m3_1/handoff.md
5. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m3_2/handoff.md
6. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m3_3/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Implementa:
1. `src/components/react/WhatsAppQuizModal.tsx` con las especificaciones de M3: 4 pasos interactivos + diagnóstico preliminar exacto ("Identificamos un patrón relacionado con ${symptom} de ${duration} de evolución."), derivación a WhatsApp con buildWhatsAppUrl(), delegación global de clics para wa.me y data-open-quiz, custom event alma:open-quiz, soporte a11y (Escape, backdrop click), y estilo 100% sólido mate (cero transparencias, cero backdrop-blur).
2. Integra el componente en `src/layouts/BaseLayout.astro` con client:load dentro de `#quiz-modal-container`, manteniendo `<slot name="quiz-modal" />` autocerrado intacto.
3. Ejecuta `npx astro check` y `node --test tests/*.test.mjs`. Verifica que pasen sin errores.
4. Escribe tu handoff en /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m3/handoff.md y envía mensaje al parent ID al concluir.
