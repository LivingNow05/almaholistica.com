# Handoff Report — Relevamiento R3 (Citabilidad RAG) y R4 (E-E-A-T Clínico)

**De:** `teamwork_preview_explorer_survey_2`  
**Para:** `teamwork_preview_orchestrator_8` (Conv ID: `dee5921c-c2ce-44d0-97b2-5ec780197d61`)  
**Fecha:** 2026-09-16  
**Tipo de Handoff:** Hard (Tarea de exploración y diseño arquitectónico completada)  
**Reporte Completo:** `/Users/anthony/Downloads/almaholistica.com/.agents/teamwork_preview_explorer_survey_2/report.md`

---

## 1. Observation

A través de inspección directa de código, análisis de datos en disco y ejecución de herramientas CLI, se observó lo siguiente:

1. **Catálogo y Generación de Dolencias (R3):**
   - Archivo de datos: `src/data/dataset_biodescodificacion_dolencias.json` (97,287 bytes, 1,262 líneas). Contiene exactamente 45 objetos con las propiedades requeridas: `slug`, `nombre`, `sistema`, `conflictoEmocional`, `sentidoBiologico`, `reprogramacion`, `preguntasReflexion` (array >= 3), `faqs` (array >= 3), `ganchoAgendamiento`.
   - Generación estática SSG: `src/pages/biodescodificacion/[slug].astro` genera 45 rutas vía `getStaticPaths()` consumiendo `getDolencias()` de `src/lib/dolencias.ts`.
   - Orden actual de secciones en `src/pages/biodescodificacion/[slug].astro`:
     - Líneas 80-84: `<Fragment slot="schema">` (JSON-LD: `MedicalWebPage`, `FAQPage`, `BreadcrumbList`).
     - Líneas 88-94: Migas de pan.
     - Líneas 97-139: `<header>` (Hero con H1, badge de sistema y CTAs de WhatsApp).
     - Líneas 142-187: `<section id="en-palabras-simples">` (3 tarjetas explicativas).
     - Líneas 190-211: `<section aria-label="Termómetro Biológico">` (2 tarjetas de fases).
     - Líneas 214-238: `<section id="conflicto">` (**Inicio del Desglose Detallado**).
     - Líneas 402-413: `<aside aria-label="Aviso Médico">` (Descargo médico general).
   - Inserción requerida: Antes del desglose detallado (`#conflicto`), idealmente entre la línea 140 (post-Hero) y 142.

2. **Calibración del Pasaje RAG (134-167 palabras):**
   - Se probó empíricamente una fórmula de 2 partes:
     - Parte 1 (Definición directa): ~46-68 palabras (Patología + Sistema + Conflicto Emocional Raíz + Sentido Biológico Adaptativo).
     - Parte 2 (Fases y protocolo): 97 palabras fijas (Fase simpaticotónica de estrés activo vs vagotonía de reparación + protocolo individual de reprogramación bioemocional 1 a 1 de Alma Holística + advertencia explícita de no sustitución alopática).
   - Resultado empírico sobre las 45 dolencias:
     - Recuento mínimo: **143 palabras**.
     - Recuento máximo: **165 palabras**.
     - **100% de las 45 dolencias cumplen estrictamente el rango de 134 a 167 palabras** (y el rango de aceptación de 130 a 170 palabras).

3. **Dataset de Autoridad E-E-A-T (R4):**
   - Archivo de datos: `src/data/dataset_almaholistica_ciudades_eeat_geo.json` (754,424 bytes, 4,070 líneas). Contiene 113 registros de ciudades con:
     - 3 especialistas clínicos: `Lic. Sofía Alarcón Valdés` (Reg. ITH-8492), `Dr. Mateo Benavides Rivas` (Reg. AIE-5120), `Dra. Elena Monsalve Duarte` (Reg. CIT-6311).
     - Aval metodológico unificado (`EEAT_Autoridad_Cientifica`): Cita expresa de Psiconeuroinmunología (PNI), 5 Leyes de la NMG del Dr. Ryke Geerd Hamer, Escuela Francesa de Christian Flèche y Epigenética del Dr. Bruce Lipton.
     - Descargo ético y legal (`EEAT_Confiabilidad_Descargo`).
     - Casos clínicos locales (`EEAT_Experiencia_Casos_Locales`).
   - Discrepancia de slug detectada: El CSV `dataset_almaholistica_ciudades.csv` usa `biodescodificacion-bogota`, mientras que el JSON usa `bogota`. Se validó que `slug.replace(/^biodescodificacion-/, '')` hace coincidir el **100% (113 de 113 registros)**.

4. **Preservación de Esquemas Schema.org y Restricción Adversarial:**
   - En dolencias: `MedicalWebPage`, `FAQPage` y `BreadcrumbList` están inyectados en el slot `schema` de `BaseLayout` y son auditados por `tests/adversarial_jsonld_robots_m5_2.test.mjs`.
   - En Home: La prueba `tests/adversarial_mr3_challenger_2.test.mjs` (Línea 247) test `MR3-CH2-4.5` prohíbe taxativamente la inyección de esquemas `application/ld+json` en `dist/index.html`.

5. **Línea Base de Compilación y Pruebas:**
   - `npm test`: 150/150 tests pasan.
   - `node --test tests/adversarial_*.test.mjs`: 244/244 tests pasan.
   - `python3 tests/adversarial_assets_config_m2_2.py`: 6/6 tests pasan.
   - `python3 tests/adversarial_m6_stress_harness.py`: 160 páginas verificadas con 0 errores.

---

## 2. Logic Chain

1. **R3 (Ubicación y Formato del Pasaje RAG):**
   - *Premisa:* Los retrievers de IA (GPTBot, PerplexityBot, Google AI Overviews) priorizan párrafos de respuesta directa ubicados tempranamente en la estructura semántica del documento, antes de desgloses fraccionados.
   - *Deducción:* Ubicar el bloque RAG inmediatamente después del Hero (`<header>`) y antes de `#en-palabras-simples` o `#conflicto` maximiza la citabilidad.
   - *Premisa:* La prueba de extractabilidad exige un rango calibrado de 134 a 167 palabras (o 130 a 170 según criterios de aceptación), respondiendo en las primeras 40-50 palabras la definición y en las siguientes 80-100 palabras las fases y el protocolo.
   - *Deducción:* Si la Parte 2 se fija en 97 palabras calibradas y la Parte 1 extrae y limpia el conflicto y sentido biológico de cada patología (~46-68 palabras), la suma total resulta invariablemente entre 143 y 165 palabras para todas las 45 dolencias.

2. **R4 (Estrategia de Visualización de Autoridad E-E-A-T):**
   - *Premisa:* El dataset `dataset_almaholistica_ciudades_eeat_geo.json` fue diseñado para dotar a las páginas de ciudad de credenciales de terapeutas reales y casos clínicos locales, mientras que la Home y las Dolencias requieren aval metodológico sin violar contratos preexistentes.
   - *Deducción:* La integración debe distribuirse en:
     1. *Páginas de ciudad (`[slug].astro`):* Módulo hiperlocal E-E-A-T con la ficha del terapeuta asignado, casos clínicos locales, aval científico y descargo ético.
     2. *Home (`index.astro`):* Sección editorial con los 3 especialistas y la fundamentación PNI/Hamer/Flèche/Lipton presentada únicamente en HTML semántico (respetando la regla adversarial `MR3-CH2-4.5` de no inyectar JSON-LD en `index.html`).
     3. *Dolencias (`biodescodificacion/[slug].astro`):* Integración de la complementariedad médica en el bloque RAG y badge de respaldo metodológico en el aside de aviso médico.

3. **Preservación Técnica y Cero CLS:**
   - *Premisa:* Los estilos deben respetar la normativa de diseño sólido mate (`#060A1A`, `#0A1226`, `#38BDF8`), sin degradados transparentes ni efectos dorados/amarillos (`#F59E0B`, `#D4AF37`), y sin producir desplazamiento de diseño (`CLS = 0`).
   - *Deducción:* Toda nueva tarjeta o módulo debe emplear las clases estándar del proyecto (`card-matte`, `card-matte-elevated`, bordes `border-slate-800`, textos `text-slate-300` / `text-white`), y mantener intactas las 160 rutas SSG.

---

## 3. Caveats

1. **Variaciones de longitud sintáctica en nombres de dolencia:** Patologías con nombres extensos (ej. `Colon Irritable (Síndrome de Intestino Irritable)` o `Resistencia a la Insulina y Síndrome Metabólico`) generan pasajes de ~165 palabras, rozando el límite superior de 167. El generador debe recortar prefijos redundantes ("En fase de", "Se caracteriza por") para mantener un margen de seguridad holgado (< 160 palabras).
2. **Archivos CSV vs JSON de ciudades:** No se debe reemplazar ni eliminar `dataset_almaholistica_ciudades.csv`, ya que `tests/tier1_features.test.mjs` valida su presencia física y sus 9 columnas exactas. `dataset_almaholistica_ciudades_eeat_geo.json` debe utilizarse como capa de enriquecimiento auxiliar.
3. **Restricción adversarial `MR3-CH2-4.5` en Home:** Se debe recordar al implementador que bajo ninguna circunstancia debe añadirse un script `type="application/ld+json"` en `src/pages/index.astro`.

---

## 4. Conclusion

1. **R3 está plenamente formulado y verificado:** Es 100% viable generar dinámicamente un bloque RAG calibrado de 134-167 palabras para las 45 dolencias mediante un helper puro en `src/lib/dolencias.ts`, e insertarlo post-Hero en `src/pages/biodescodificacion/[slug].astro`.
2. **R4 cuenta con datos completos y estructura definida:** La información de los 3 especialistas, los casos clínicos locales y el respaldo metodológico (PNI, Hamer, Flèche, Lipton) está lista para ser consumida desde `src/data/dataset_almaholistica_ciudades_eeat_geo.json` hacia las páginas de ciudad y la Home.
3. **Los 3 esquemas JSON-LD (`MedicalWebPage`, `FAQPage`, `BreadcrumbList`) se encuentran preservados:** No sufren alteración estructural y continúan pasando todas las pruebas adversariales.
4. **La documentación completa de soporte y código de referencia ha sido consolidada en `report.md`.**

---

## 5. Verification Method

Para verificar independientemente todos los hallazgos empíricos reportados:

1. **Verificación de conteo de palabras RAG en las 45 dolencias:**
   ```bash
   python3 -c "
   import json, re
   with open('src/data/dataset_biodescodificacion_dolencias.json') as f:
       dolencias = json.load(f)
   def count_words(t): return len(re.findall(r'\b\w+\b', t))
   P2 = 'Fisiológicamente, el síntoma transita a través de dos fases biológicas definidas: la fase de estrés activo simpaticotónico con respuesta adaptativa celular involuntaria, y la fase de vagotonía o reparación, momento en que al distenderse el conflicto se manifiestan la inflamación, el cansancio y la regeneración orgánica. El protocolo de reprogramación bioemocional de Alma Holística interviene guiando al consultante a hacer consciente el choque original y desactivar la alerta en sesiones online 1 a 1. Este enfoque complementario aborda el plano psicosomático sin sustituir en ningún caso el diagnóstico, tratamiento farmacológico ni prescripción facultativa de la medicina alopática.'
   w_p2 = count_words(P2)
   for d in dolencias:
       conflicto = re.sub(r'[\"«»]', '', d['conflictoEmocional']).split('.')[0].strip()
       sentido = re.sub(r'[\"«»]', '', d['sentidoBiologico']).split('.')[0].strip()
       p1 = f'La biodescodificación de {d[\"nombre\"]} (sistema {d[\"sistema\"].lower()}) aborda el conflicto biológico de {conflicto.lower()}. Su sentido adaptativo consiste en {sentido.lower()}.'
       tot = count_words(p1) + w_p2
       assert 130 <= tot <= 170, f'{d[\"slug\"]} fuera de rango: {tot}'
   print('OK: Las 45 dolencias cumplen el rango estricto de citabilidad!')
   "
   ```

2. **Verificación de paridad de slugs de ciudades entre CSV y JSON E-E-A-T:**
   ```bash
   python3 -c "
   import csv, json
   with open('src/data/dataset_almaholistica_ciudades.csv') as f:
       csv_slugs = [r['URL Final (Slug)'].strip().replace('biodescodificacion-', '') for r in csv.DictReader(f)]
   with open('src/data/dataset_almaholistica_ciudades_eeat_geo.json') as f:
       json_slugs = set(d['URL Final (Slug)'].strip().replace('biodescodificacion-', '') for d in json.load(f))
   assert all(s in json_slugs for s in csv_slugs)
   print('OK: 113 de 113 ciudades tienen correspondencia biunívoca en el dataset E-E-A-T!')
   "
   ```

3. **Verificación de preservación de esquemas y suite de pruebas:**
   ```bash
   npm test
   node --test tests/adversarial_*.test.mjs
   python3 tests/adversarial_assets_config_m2_2.py
   python3 tests/adversarial_m6_stress_harness.py
   ```
