# DISPATCH — teamwork_preview_reviewer_m1_2

## Role
Content & Medical Spec Reviewer (Milestone M1 Gate)

## Working Directory
/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_m1_2/

## Mandatory Inputs
- /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
- /Users/anthony/Downloads/almaholistica.com/PROJECT.md
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m1/handoff.md

## Scope & Objective
1. Review substantive quality and domain compliance of the datasets:
   - Verify that all 45 pathologies in `src/data/dataset_biodescodificacion_dolencias.json` have profound biological sense, authentic emotional conflicts, genuine reprogramming affirmations, non-trivial reflection questions (>=3), and clinically structured FAQs (>=3).
   - Verify that all 113 cities in `src/data/dataset_almaholistica_ciudades.csv` have zero residual puppy references, authentic therapeutic local narratives, and real local currency codes and pricing.
2. Run test execution: `python3 scripts/validate_datasets.py` and `node --test tests/*.test.mjs`.
3. Output explicit verdict: APPROVE or REQUEST_CHANGES in `handoff.md` and notify orchestrator.

## 2026-09-06T01:43:53Z
Tu identidad es teamwork_preview_reviewer_m1_2.
Tu directorio de trabajo exclusivo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_m1_2/
Tu tarea asignada está en: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_reviewer_m1_2/DISPATCH.md

Debes leer OBLIGATORIAMENTE antes de empezar:
- /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
- /Users/anthony/Downloads/almaholistica.com/PROJECT.md
- /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_worker_m1/handoff.md

Revisa la calidad de contenido y cumplimiento médico/terapéutico de M1:
- Verifica que las 45 patologías en `src/data/dataset_biodescodificacion_dolencias.json` posean rigor bioemocional, sentido biológico, reprogramación y preguntas y FAQs auténticas.
- Verifica que las 113 ciudades en `src/data/dataset_almaholistica_ciudades.csv` tengan precios reales, monedas locales y narrativas locales sin alusiones a cachorros.
- Ejecuta los tests de validación.

Emite tu veredicto explícito (APPROVE o REQUEST_CHANGES) en tu `handoff.md` y notifica al orquestador.
