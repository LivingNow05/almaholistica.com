#!/usr/bin/env python3
"""
scripts/validate_datasets.py
Script de verificación y validación estricta de integridad para los datasets de M1:
- `src/data/dataset_almaholistica_ciudades.csv` (113+ ciudades, 20 países, 9 columnas)
- `src/data/dataset_biodescodificacion_dolencias.json` (45 patologías completas)

Uso:
  python3 scripts/validate_datasets.py
  python3 scripts/validate_datasets.py --cities-csv path/to/cities.csv --dolencias-json path/to/dolencias.json
"""

import argparse
import csv
import json
import os
import re
import sys
import unicodedata
from typing import Dict, List, Set, Tuple

# Constantes de Validación
REQUIRED_CSV_COLUMNS = [
    'Dominio',
    'Categoría',
    'URL Final (Slug)',
    'H1 Título',
    'Meta Descripción',
    'País',
    'Moneda',
    'Rango_Precio_Sesion',
    'Historia_Local',
]

APPROVED_COUNTRIES = {
    # 18 Países de Latinoamérica
    'Colombia',
    'México',
    'Chile',
    'Argentina',
    'Perú',
    'Ecuador',
    'Bolivia',
    'Uruguay',
    'Paraguay',
    'Venezuela',
    'Costa Rica',
    'Panamá',
    'República Dominicana',
    'Guatemala',
    'El Salvador',
    'Honduras',
    'Nicaragua',
    'Brasil',
    # 2 Mercados de Alta Monetización
    'España',
    'Estados Unidos',
}

APPROVED_CURRENCIES = {
    'COP', 'MXN', 'CLP', 'ARS', 'PEN', 'USD', 'BOB', 'UYU', 'PYG',
    'VED', 'VES', 'CRC', 'PAB', 'DOP', 'GTQ', 'HNL', 'NIO', 'BRL', 'EUR',
}

APPROVED_BODILY_SYSTEMS = {
    'Digestivo',
    'Nervioso / Emocional',
    'Osteoarticular',
    'Dermatológico',
    'Respiratorio',
    'Endocrino / Metabólico',
    'Inmunológico / Circulatorio',
}

RESERVED_SLUGS = {
    'index', 'home', 'biodescodificacion', 'api', 'sitemap',
    'sitemap-index', 'sitemap-0', 'robots', 'favicon', 'admin',
    'auth', 'login', 'contacto', 'nosotros', 'terminos', 'privacidad',
    'assets', 'public', 'static', 'wa', 'whatsapp', 'quiz',
}

FORBIDDEN_CANINE_TERMS = [
    'bulldog', 'fluffy', 'cachorro', 'criadero', 'pedigree',
    'l4/l1', 'manto', 'pelaje', 'canino', 'raza', 'kinológica',
]

SLUG_REGEX = re.compile(r'^[a-z0-9]+(-[a-z0-9]+)*$')


class ValidationError:
    def __init__(self, dataset: str, row_or_id: str, message: str):
        self.dataset = dataset
        self.row_or_id = row_or_id
        self.message = message

    def __str__(self):
        return f"[{self.dataset}] ({self.row_or_id}): {self.message}"


def check_slug_cleanliness(slug: str, context: str, dataset_name: str) -> List[ValidationError]:
    """Verifica que un slug sea estrictamente URL-safe, sin acentos ni mayúsculas."""
    errors = []
    if not slug or not slug.strip():
        errors.append(ValidationError(dataset_name, context, "El slug está vacío."))
        return errors

    trimmed = slug.strip()
    if trimmed != slug:
        errors.append(ValidationError(dataset_name, context, f"El slug tiene espacios al inicio o final: '{slug}'."))

    if '/' in slug or '\\' in slug:
        errors.append(ValidationError(dataset_name, context, f"El slug contiene barras: '{slug}'."))

    if slug.startswith('-') or slug.endswith('-'):
        errors.append(ValidationError(dataset_name, context, f"El slug empieza o termina con guion: '{slug}'."))

    if '--' in slug:
        errors.append(ValidationError(dataset_name, context, f"El slug contiene guiones dobles/consecutivos: '{slug}'."))

    if any(c.isupper() for c in slug):
        errors.append(ValidationError(dataset_name, context, f"El slug contiene mayúsculas: '{slug}'."))

    # Verificar si contiene tildes o caracteres acentuados
    decomposed = unicodedata.normalize('NFKD', slug)
    if any(unicodedata.combining(c) for c in decomposed):
        errors.append(ValidationError(dataset_name, context, f"El slug contiene tildes o acentos: '{slug}'."))

    if not SLUG_REGEX.match(slug):
        errors.append(ValidationError(dataset_name, context, f"El slug no cumple con el patrón regex ^[a-z0-9]+(-[a-z0-9]+)*$: '{slug}'."))

    if slug in RESERVED_SLUGS:
        errors.append(ValidationError(dataset_name, context, f"El slug colisiona con una ruta o palabra reservada del sistema: '{slug}'."))

    return errors


def validate_cities_csv(csv_path: str) -> Tuple[List[ValidationError], Dict[str, any]]:
    """Valida el dataset de ciudades según todos los criterios de R1 y M1."""
    errors: List[ValidationError] = []
    stats = {
        'total_rows': 0,
        'countries_found': set(),
        'currencies_found': set(),
        'unique_slugs': set(),
    }

    if not os.path.isfile(csv_path):
        errors.append(ValidationError('Ciudades CSV', 'Archivo', f"No se encontró el archivo en la ruta: {csv_path}"))
        return errors, stats

    try:
        with open(csv_path, mode='r', encoding='utf-8', errors='strict') as f:
            reader = csv.DictReader(f)
            headers = reader.fieldnames or []

            # Validar cabeceras exactas
            if headers != REQUIRED_CSV_COLUMNS:
                errors.append(ValidationError(
                    'Ciudades CSV',
                    'Cabeceras',
                    f"Cabeceras inválidas.\nEsperado: {REQUIRED_CSV_COLUMNS}\nEncontrado: {headers}"
                ))

            seen_slugs: Set[str] = set()

            for line_idx, row in enumerate(reader, start=2):
                stats['total_rows'] += 1
                row_ref = f"Línea {line_idx}"

                # 1. Comprobar campos vacíos
                for col in REQUIRED_CSV_COLUMNS:
                    val = row.get(col, '')
                    if val is None or not val.strip():
                        errors.append(ValidationError('Ciudades CSV', row_ref, f"Columna obligatoria '{col}' vacía o nula."))

                # 2. Slug
                slug = (row.get('URL Final (Slug)') or '').strip()
                row_ref_slug = f"{row_ref} ({slug or 'sin-slug'})"
                errors.extend(check_slug_cleanliness(slug, row_ref_slug, 'Ciudades CSV'))

                if slug in seen_slugs:
                    errors.append(ValidationError('Ciudades CSV', row_ref_slug, f"Slug duplicado en el dataset de ciudades: '{slug}'."))
                else:
                    seen_slugs.add(slug)
                    stats['unique_slugs'].add(slug)

                # 3. País
                country = (row.get('País') or '').strip()
                if country:
                    stats['countries_found'].add(country)
                    if country not in APPROVED_COUNTRIES:
                        errors.append(ValidationError('Ciudades CSV', row_ref_slug, f"País '{country}' no está en la lista de los 20 países aprobados."))

                # 4. Moneda
                currency = (row.get('Moneda') or '').strip().upper()
                if currency:
                    stats['currencies_found'].add(currency)
                    if currency not in APPROVED_CURRENCIES:
                        errors.append(ValidationError('Ciudades CSV', row_ref_slug, f"Moneda '{currency}' no reconocida entre las monedas soportadas."))

                # 5. Rango de precio
                precio = (row.get('Rango_Precio_Sesion') or '').strip()
                if precio and not any(c.isdigit() for c in precio):
                    errors.append(ValidationError('Ciudades CSV', row_ref_slug, f"Rango_Precio_Sesion '{precio}' parece no contener valores numéricos de referencia."))

                # 6. Sanidad del contenido de Historia_Local (no residual de Fluffy)
                historia = (row.get('Historia_Local') or '').lower()
                for term in FORBIDDEN_CANINE_TERMS:
                    if term in historia:
                        errors.append(ValidationError('Ciudades CSV', row_ref_slug, f"Historia_Local contiene términos caninos/criadero prohibidos: '{term}'."))

                if len(historia) < 80:
                    errors.append(ValidationError('Ciudades CSV', row_ref_slug, f"Historia_Local es demasiado corta ({len(historia)} caracteres). Mínimo recomendado: 80 caracteres."))

            # Validar mínimo de filas
            if stats['total_rows'] < 113:
                errors.append(ValidationError(
                    'Ciudades CSV',
                    'Total Filas',
                    f"El dataset contiene {stats['total_rows']} filas. Se requiere un mínimo de 113 ciudades (100 LATAM + 6 España + 7 EE.UU.)."
                ))

            # Validar cobertura de los 20 países
            missing_countries = APPROVED_COUNTRIES - stats['countries_found']
            if missing_countries:
                errors.append(ValidationError(
                    'Ciudades CSV',
                    'Cobertura Países',
                    f"Faltan los siguientes países obligatorios ({len(missing_countries)}): {sorted(missing_countries)}"
                ))

    except UnicodeDecodeError as e:
        errors.append(ValidationError('Ciudades CSV', 'Codificación', f"El archivo no es UTF-8 válido: {e}"))
    except Exception as e:
        errors.append(ValidationError('Ciudades CSV', 'Lectura', f"Error inesperado al leer CSV: {e}"))

    return errors, stats


def validate_dolencias_json(json_path: str) -> Tuple[List[ValidationError], Dict[str, any]]:
    """Valida el dataset de dolencias según todos los criterios de R1 y M1."""
    errors: List[ValidationError] = []
    stats = {
        'total_items': 0,
        'systems_found': set(),
        'unique_slugs': set(),
    }

    if not os.path.isfile(json_path):
        errors.append(ValidationError('Dolencias JSON', 'Archivo', f"No se encontró el archivo en la ruta: {json_path}"))
        return errors, stats

    try:
        with open(json_path, mode='r', encoding='utf-8') as f:
            data = json.load(f)

        if not isinstance(data, list):
            errors.append(ValidationError('Dolencias JSON', 'Estructura', "El JSON raíz debe ser un Array/Lista de objetos."))
            return errors, stats

        stats['total_items'] = len(data)

        if len(data) != 45:
            errors.append(ValidationError(
                'Dolencias JSON',
                'Conteo Total',
                f"El dataset contiene {len(data)} patologías. Se requieren EXACTAMENTE 45 patologías validadas."
            ))

        seen_slugs: Set[str] = set()

        required_keys = [
            'slug', 'nombre', 'sistema', 'conflictoEmocional',
            'sentidoBiologico', 'reprogramacion', 'preguntasReflexion',
            'faqs', 'ganchoAgendamiento'
        ]

        for idx, item in enumerate(data, start=1):
            item_ref = f"Item {idx}"
            if not isinstance(item, dict):
                errors.append(ValidationError('Dolencias JSON', item_ref, "El elemento del array no es un objeto JSON válido."))
                continue

            # 1. Comprobar llaves requeridas
            for key in required_keys:
                if key not in item:
                    errors.append(ValidationError('Dolencias JSON', item_ref, f"Falta el campo obligatorio '{key}'."))

            slug = item.get('slug', '')
            nombre = item.get('nombre', f'Sin nombre #{idx}')
            item_ref_named = f"{item_ref} ({nombre} | slug: {slug})"

            # 2. Validar slug
            errors.extend(check_slug_cleanliness(slug, item_ref_named, 'Dolencias JSON'))
            if slug in seen_slugs:
                errors.append(ValidationError('Dolencias JSON', item_ref_named, f"Slug duplicado en el dataset de dolencias: '{slug}'."))
            else:
                seen_slugs.add(slug)
                stats['unique_slugs'].add(slug)

            # 3. Validar sistema biológico
            sistema = item.get('sistema', '').strip()
            if not sistema:
                errors.append(ValidationError('Dolencias JSON', item_ref_named, "El campo 'sistema' está vacío."))
            else:
                stats['systems_found'].add(sistema)
                if sistema not in APPROVED_BODILY_SYSTEMS:
                    errors.append(ValidationError(
                        'Dolencias JSON',
                        item_ref_named,
                        f"El sistema '{sistema}' no pertenece a los 7 sistemas biológicos aprobados: {sorted(APPROVED_BODILY_SYSTEMS)}"
                    ))

            # 4. Validar campos de texto enriquecidos
            for text_field in ['conflictoEmocional', 'sentidoBiologico', 'reprogramacion', 'ganchoAgendamiento']:
                val = item.get(text_field, '')
                if not isinstance(val, str) or not val.strip():
                    errors.append(ValidationError('Dolencias JSON', item_ref_named, f"El campo '{text_field}' está vacío o no es texto."))
                elif len(val.strip()) < 20:
                    errors.append(ValidationError('Dolencias JSON', item_ref_named, f"El campo '{text_field}' es demasiado breve ({len(val.strip())} caracteres)."))

            # 5. Validar preguntasReflexion (mínimo 3)
            preguntas = item.get('preguntasReflexion')
            if not isinstance(preguntas, list):
                errors.append(ValidationError('Dolencias JSON', item_ref_named, "El campo 'preguntasReflexion' debe ser un array/lista."))
            else:
                if len(preguntas) < 3:
                    errors.append(ValidationError('Dolencias JSON', item_ref_named, f"'preguntasReflexion' contiene {len(preguntas)} preguntas. Mínimo requerido: 3."))
                for q_idx, q in enumerate(preguntas, start=1):
                    if not isinstance(q, str) or not q.strip():
                        errors.append(ValidationError('Dolencias JSON', item_ref_named, f"La pregunta de reflexión #{q_idx} está vacía."))

            # 6. Validar FAQs (mínimo 3)
            faqs = item.get('faqs')
            if not isinstance(faqs, list):
                errors.append(ValidationError('Dolencias JSON', item_ref_named, "El campo 'faqs' debe ser un array/lista."))
            else:
                if len(faqs) < 3:
                    errors.append(ValidationError('Dolencias JSON', item_ref_named, f"'faqs' contiene {len(faqs)} preguntas frecuentes. Mínimo requerido: 3."))
                for f_idx, faq in enumerate(faqs, start=1):
                    if not isinstance(faq, dict):
                        errors.append(ValidationError('Dolencias JSON', item_ref_named, f"El elemento FAQ #{f_idx} no es un objeto."))
                    else:
                        p = faq.get('pregunta', '')
                        r = faq.get('respuesta', '')
                        if not isinstance(p, str) or not p.strip():
                            errors.append(ValidationError('Dolencias JSON', item_ref_named, f"La FAQ #{f_idx} tiene la 'pregunta' vacía."))
                        if not isinstance(r, str) or not r.strip():
                            errors.append(ValidationError('Dolencias JSON', item_ref_named, f"La FAQ #{f_idx} tiene la 'respuesta' vacía."))

        # Verificar que los 7 sistemas biológicos estén cubiertos
        missing_systems = APPROVED_BODILY_SYSTEMS - stats['systems_found']
        if missing_systems:
            errors.append(ValidationError(
                'Dolencias JSON',
                'Cobertura Sistemas',
                f"Faltan los siguientes sistemas corporales en el catálogo ({len(missing_systems)}): {sorted(missing_systems)}"
            ))

    except json.JSONDecodeError as e:
        errors.append(ValidationError('Dolencias JSON', 'Parse JSON', f"Error de sintaxis JSON: {e}"))
    except Exception as e:
        errors.append(ValidationError('Dolencias JSON', 'Lectura', f"Error inesperado al leer JSON: {e}"))

    return errors, stats


def validate_cross_dataset_integrity(city_slugs: Set[str], dolencia_slugs: Set[str]) -> List[ValidationError]:
    """Verifica que no existan colisiones de slugs entre ciudades y dolencias."""
    errors = []
    collisions = city_slugs.intersection(dolencia_slugs)
    if collisions:
        for slug in sorted(collisions):
            errors.append(ValidationError(
                'Colisión Cruzada',
                slug,
                f"El slug '{slug}' existe tanto en el dataset de ciudades como en el dataset de dolencias."
            ))
    return errors


def run_validation(cities_csv_path: str, dolencias_json_path: str) -> int:
    """Ejecuta la suite completa de validación e imprime el informe consolidado."""
    print("=" * 70)
    print(" VALIDACIÓN ESTRICTA DE DATASETS — ALMA HOLÍSTICA (HITO M1)")
    print("=" * 70)
    print(f"-> Ciudades CSV:  {cities_csv_path}")
    print(f"-> Dolencias JSON: {dolencias_json_path}")
    print("-" * 70)

    all_errors: List[ValidationError] = []

    # Validar Ciudades
    city_errors, city_stats = validate_cities_csv(cities_csv_path)
    all_errors.extend(city_errors)

    # Validar Dolencias
    dolencia_errors, dolencia_stats = validate_dolencias_json(dolencias_json_path)
    all_errors.extend(dolencia_errors)

    # Validar Integridad Cruzada
    cross_errors = validate_cross_dataset_integrity(city_stats['unique_slugs'], dolencia_stats['unique_slugs'])
    all_errors.extend(cross_errors)

    # Resumen de Estadísticas
    print("\n--- RESUMEN DE ESTADÍSTICAS ---")
    print(f"• Ciudades procesadas: {city_stats['total_rows']} (Únicas: {len(city_stats['unique_slugs'])})")
    print(f"• Países detectados ({len(city_stats['countries_found'])}/20): {', '.join(sorted(city_stats['countries_found'])) if city_stats['countries_found'] else 'Ninguno'}")
    print(f"• Monedas detectadas ({len(city_stats['currencies_found'])}): {', '.join(sorted(city_stats['currencies_found'])) if city_stats['currencies_found'] else 'Ninguna'}")
    print(f"• Dolencias procesadas: {dolencia_stats['total_items']}/45 (Únicas: {len(dolencia_stats['unique_slugs'])})")
    print(f"• Sistemas corporales ({len(dolencia_stats['systems_found'])}/7): {', '.join(sorted(dolencia_stats['systems_found'])) if dolencia_stats['systems_found'] else 'Ninguno'}")
    print("-" * 70)

    # Reporte de Errores
    if not all_errors:
        print("\n [PASS] ¡VALIDACIÓN 100% EXITOSA! Todos los datasets cumplen los requisitos del Gate M1.")
        print("=" * 70)
        return 0
    else:
        print(f"\n❌ [FAIL] Se encontraron {len(all_errors)} errores de integridad en los datasets:")
        for idx, err in enumerate(all_errors, start=1):
            print(f"  {idx}. {err}")
        print("\n" + "=" * 70)
        return 1


def main():
    parser = argparse.ArgumentParser(description="Validador de Datasets para Alma Holística M1")
    parser.add_argument(
        '--cities-csv',
        default=os.path.join('src', 'data', 'dataset_almaholistica_ciudades.csv'),
        help='Ruta al archivo dataset_almaholistica_ciudades.csv'
    )
    parser.add_argument(
        '--dolencias-json',
        default=os.path.join('src', 'data', 'dataset_biodescodificacion_dolencias.json'),
        help='Ruta al archivo dataset_biodescodificacion_dolencias.json'
    )

    args = parser.parse_args()
    sys.exit(run_validation(args.cities_csv, args.dolencias_json))


if __name__ == '__main__':
    main()
