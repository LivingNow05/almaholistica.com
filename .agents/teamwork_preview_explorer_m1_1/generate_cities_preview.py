#!/usr/bin/env python3
"""
City Dataset Generator & Validator Prototype for Alma Holística (Milestone M1)
Author: teamwork_preview_explorer_m1_1
Target: Generates and validates src/data/dataset_almaholistica_ciudades.csv
"""

import csv
import re
import os

# Country configuration: Currency and Realistic Session Price Range
COUNTRY_META = {
    "Colombia": {"moneda": "COP", "precio": "120.000 - 180.000 COP"},
    "México": {"moneda": "MXN", "precio": "$800 - $1,400 MXN"},
    "España": {"moneda": "EUR", "precio": "45€ - 75€ EUR"},
    "Estados Unidos": {"moneda": "USD", "precio": "$60 - $100 USD"},
    "Argentina": {"moneda": "ARS", "precio": "$35.000 - $55.000 ARS"},
    "Chile": {"moneda": "CLP", "precio": "$35.000 - $55.000 CLP"},
    "Perú": {"moneda": "PEN", "precio": "S/. 130 - S/. 220 PEN"},
    "Ecuador": {"moneda": "USD", "precio": "$35 - $55 USD"},
    "Bolivia": {"moneda": "BOB", "precio": "220 - 350 BOB"},
    "Brasil": {"moneda": "BRL", "precio": "R$ 180 - R$ 280 BRL"},
    "Costa Rica": {"moneda": "CRC", "precio": "₡25.000 - ₡40.000 CRC"},
    "El Salvador": {"moneda": "USD", "precio": "$35 - $55 USD"},
    "Guatemala": {"moneda": "GTQ", "precio": "Q280 - Q450 GTQ"},
    "Honduras": {"moneda": "HNL", "precio": "L850 - L1,400 HNL"},
    "Nicaragua": {"moneda": "NIO", "precio": "C$ 1,200 - C$ 1,900 NIO"},
    "Panamá": {"moneda": "USD", "precio": "$40 - $65 USD"},
    "Paraguay": {"moneda": "PYG", "precio": "₲250.000 - ₲380.000 PYG"},
    "República Dominicana": {"moneda": "DOP", "precio": "RD$ 2,200 - RD$ 3,500 DOP"},
    "Uruguay": {"moneda": "UYU", "precio": "$1.600 - $2.500 UYU"},
    "Venezuela": {"moneda": "USD", "precio": "$30 - $50 USD"},
}

# New cities for España (6) and EE.UU. hispanos (7)
ADDITIONAL_CITIES = [
    # España (6)
    {
        "slug": "madrid",
        "nombre": "Madrid",
        "pais": "España",
        "h1": "Terapia Holística y Biodescodificación en Madrid",
        "entorno": "el ritmo dinámico de la capital española, entre barrios como Salamanca, Chamberí, Malasaña y el Paseo de la Castellana",
        "contexto_emocional": "la exigencia profesional, la sobrecarga mental y el estrés corporativo madrileño que frecuentemente se traducen en ansiedad, insomnio, migrañas y sobrecarga cervical"
    },
    {
        "slug": "barcelona",
        "nombre": "Barcelona",
        "pais": "España",
        "h1": "Terapia Holística y Biodescodificación en Barcelona",
        "entorno": "el pulso cosmopolita mediterráneo que conecta el Eixample, Gràcia, Sarrià-Sant Gervasi y Poblenou",
        "contexto_emocional": "la constante aceleración urbana, la autoexigencia y el ritmo multifacético barcelonés que suelen somatizarse en problemas digestivos, colon irritable y tensión acumulada"
    },
    {
        "slug": "valencia",
        "nombre": "Valencia",
        "pais": "España",
        "h1": "Terapia Holística y Biodescodificación en Valencia",
        "entorno": "la luminosidad levantina de zonas como Ruzafa, El Carmen, Cánovas y los alrededores del antiguo cauce del Turia",
        "contexto_emocional": "la búsqueda de un equilibrio consciente frente a las tensiones cotidianas y patrones emocionales heredados que se manifiestan en fatiga, dermatitis y afecciones psicosomáticas"
    },
    {
        "slug": "sevilla",
        "nombre": "Sevilla",
        "pais": "España",
        "h1": "Terapia Holística y Biodescodificación en Sevilla",
        "entorno": "la calidez y tradición hispalense que recorre Triana, Nervión, Los Remedios y el Centro Histórico",
        "contexto_emocional": "los bloqueos emocionales silenciosos, la necesidad de soltar cargas familiares transgeneracionales y síntomas recurrentes como dolores musculares y gastritis"
    },
    {
        "slug": "malaga",
        "nombre": "Málaga",
        "pais": "España",
        "h1": "Terapia Holística y Biodescodificación en Málaga",
        "entorno": "el crecimiento vertiginoso de la Costa del Sol en sectores como El Limonar, La Malagueta, Soho y Teatinos",
        "contexto_emocional": "la adaptación al ritmo acelerado de una ciudad en transformación, donde el estrés mental suele desencadenar insomnio, bruxismo y desequilibrios tiroideos"
    },
    {
        "slug": "bilbao",
        "nombre": "Bilbao",
        "pais": "España",
        "h1": "Terapia Holística y Biodescodificación en Bilbao",
        "entorno": "la fuerza industrial y elegancia vanguardista de Abando, Indautxu, el Casco Viejo y Getxo",
        "contexto_emocional": "la tendencia a contener emociones, la exigencia implícita y la tensión que el cuerpo traduce en molestias osteoarticulares, lumbalgia y presión pectoral"
    },
    # EE.UU. Hispanos (7)
    {
        "slug": "miami",
        "nombre": "Miami",
        "pais": "Estados Unidos",
        "h1": "Terapia Holística y Biodescodificación en Miami",
        "entorno": "el vibrante entorno multicultural de Florida en áreas como Brickell, Coral Gables, Doral y Kendall",
        "contexto_emocional": "la presión del éxito constante, el desarraigo de la comunidad hispana y las jornadas extenuantes que desembocan en episodios de ansiedad, hipertensión y fatiga adrenal"
    },
    {
        "slug": "los-angeles",
        "nombre": "Los Ángeles",
        "pais": "Estados Unidos",
        "h1": "Terapia Holística y Biodescodificación en Los Ángeles",
        "entorno": "la inmensa metrópoli californiana desde Downtown, Pasadena y Glendale hasta Silver Lake y la Costa",
        "contexto_emocional": "el estrés del tráfico inacabable, la alta competitividad y la desconexión interior que muchas veces se somatizan en dolor de espalda crónico, migrañas y digestión lenta"
    },
    {
        "slug": "houston",
        "nombre": "Houston",
        "pais": "Estados Unidos",
        "h1": "Terapia Holística y Biodescodificación en Houston",
        "entorno": "el núcleo energético y corporativo de Texas en vecindarios como The Woodlands, Katy, Sugar Land y The Heights",
        "contexto_emocional": "las largas jornadas laborales, el impacto emocional del estilo de vida acelerado y la necesidad de gestionar el conflicto biológico detrás de afecciones metabólicas y sobrepeso"
    },
    {
        "slug": "nueva-york",
        "nombre": "Nueva York",
        "pais": "Estados Unidos",
        "h1": "Terapia Holística y Biodescodificación en Nueva York",
        "entorno": "el ritmo incesante de la Gran Manzana que abarca Manhattan, Queens, Brooklyn y el Bronx",
        "contexto_emocional": "el ritmo vertiginoso '24/7', la sobreestimulación constante y la carga mental que derivan en trastornos de pánico, gastritis nerviosa y dificultad para conciliar el sueño"
    },
    {
        "slug": "chicago",
        "nombre": "Chicago",
        "pais": "Estados Unidos",
        "h1": "Terapia Holística y Biodescodificación en Chicago",
        "entorno": "la majestuosa Ciudad de los Vientos en distritos como Lincoln Park, The Loop, Pilsen y Naperville",
        "contexto_emocional": "los inviernos prolongados combinados con el estrés profesional y familiar, provocando contracturas musculares crónicas, desánimo y somatizaciones inmunológicas"
    },
    {
        "slug": "orlando",
        "nombre": "Orlando",
        "pais": "Estados Unidos",
        "h1": "Terapia Holística y Biodescodificación en Orlando",
        "entorno": "la expansión residencial y turística del centro de Florida en Lake Nona, Dr. Phillips, Winter Park y Hunters Creek",
        "contexto_emocional": "el reto de equilibrar vida laboral y familiar en la comunidad hispana, donde los conflictos de desvalorización y frustración suelen proyectarse en la salud física"
    },
    {
        "slug": "san-antonio",
        "nombre": "San Antonio",
        "pais": "Estados Unidos",
        "h1": "Terapia Holística y Biodescodificación en San Antonio",
        "entorno": "la rica herencia bicultural tejana en zonas como Stone Oak, Alamo Heights, Pearl District y Medical Center",
        "contexto_emocional": "los lazos y lealtades familiares invisibles que requieren comprensión transgeneracional para liberar síntomas recurrentes, rigidez articular y ansiedad latente"
    }
]

# Canine forbidden keywords for strict zero-tolerance validation
FORBIDDEN_CANINE_TERMS = [
    r"\bbulldog\b", r"\bfluffy\b", r"\bcachorro\b", r"\bcachorros\b", r"\bcachorrito\b",
    r"\bperro\b", r"\bperros\b", r"\bcanino\b", r"\bcaninos\b", r"\bcanina\b", r"\bcaninas\b",
    r"\bmanto\b", r"\bpelaje\b", r"\bl4/l1\b", r"\bl1/l4\b", r"\bl1\b", r"\bl4\b",
    r"\bpedigree\b", r"\braza\b", r"\brazas\b", r"\bcrianza\b", r"\bcriadero\b", r"\bcriadores\b",
    r"\bvacuna\b", r"\bvacunas\b", r"\bvacunaci[oó]n\b", r"\bdesparasita\w*",
    r"\baeropuerto\b", r"\bvuelo vip\b", r"\btransporte vip\b", r"\bboeing\b",
    r"\bkinol[oó]gica\b", r"\bcinol[oó]gica\b"
]

print("Script template loaded successfully.")
