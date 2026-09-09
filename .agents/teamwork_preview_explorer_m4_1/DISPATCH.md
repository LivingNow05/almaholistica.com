# DISPATCH — Explorer M4 1

## Role & Mission
Eres explorer_m4_1 (`teamwork_preview_explorer`). Tu misión es diseñar la arquitectura y contratos de los módulos de lectura SSG: `src/lib/cities.ts` y `src/lib/dolencias.ts`.

## Archivos de Lectura Obligatoria
1. `/Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md` (Lectura completa y obligatoria)
2. `/Users/anthony/Downloads/almaholistica.com/PROJECT.md`
3. `/Users/anthony/Downloads/almaholistica.com/src/types/city.ts`
4. `/Users/anthony/Downloads/almaholistica.com/src/types/dolencia.ts`
5. `/Users/anthony/Downloads/almaholistica.com/src/data/dataset_almaholistica_ciudades.csv`
6. `/Users/anthony/Downloads/almaholistica.com/src/data/dataset_biodescodificacion_dolencias.json`
7. `/Users/anthony/Downloads/almaholistica.com/tests/tier1_features.test.mjs` (Feature 13)

## Objetivos de Exploración
- Diseñar `src/lib/cities.ts`:
  - Lector CSV con `csv-parse/sync` y tipado `CityData`.
  - Memoización en memoria (`cachedCities` / `cache`) para prevenir relecturas de disco durante el build SSG.
  - Exportar funciones: `getCities(): CityData[]`, `getCityBySlug(slug: string): CityData | undefined`, `getAllCities(): CityData[]`.
  - Manejo seguro de slugs (trim, lowercase, normalización).
- Diseñar `src/lib/dolencias.ts`:
  - Lector JSON tipado `DolenciaData`.
  - Memoización (`cachedDolencias`).
  - Exportar funciones: `getDolencias(): DolenciaData[]`, `getDolenciaBySlug(slug: string): DolenciaData | undefined`, `getDolenciasBySistema(sistema: string): DolenciaData[]`.
- Producir especificación e implementaciones completas en `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/handoff.md`.

## 2026-09-06T04:52:11Z
Eres explorer_m4_1.
Tu directorio de trabajo es: /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/
Lee inmediatamente y de forma obligatoria:
1. /Users/anthony/Downloads/almaholistica.com/ORIGINAL_REQUEST.md
2. /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/DISPATCH.md
3. /Users/anthony/Downloads/almaholistica.com/PROJECT.md
4. /Users/anthony/Downloads/almaholistica.com/src/types/city.ts
5. /Users/anthony/Downloads/almaholistica.com/src/types/dolencia.ts
6. /Users/anthony/Downloads/almaholistica.com/src/data/dataset_almaholistica_ciudades.csv
7. /Users/anthony/Downloads/almaholistica.com/src/data/dataset_biodescodificacion_dolencias.json
8. /Users/anthony/Downloads/almaholistica.com/tests/tier1_features.test.mjs

Diseña los módulos de lectura SSG src/lib/cities.ts y src/lib/dolencias.ts con memoización y tipado estricto.
Escribe tu reporte en /Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_m4_1/handoff.md y envía mensaje al parent ID al concluir.

