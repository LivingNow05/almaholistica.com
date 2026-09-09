#!/usr/bin/env python3
"""
City Dataset Generator & Validator for Alma Holística (Milestone M1)
Author: teamwork_preview_explorer_m1_1
Generates: src/data/dataset_almaholistica_ciudades.csv
Complies with:
  - Exactly 113 cities across 20 countries (18 LATAM + 6 Spain + 7 US Hispanics)
  - Exactly 9 columns: Dominio, Categoría, URL Final (Slug), H1 Título, Meta Descripción, País, Moneda, Rango_Precio_Sesion, Historia_Local
  - Zero canine references
  - Authentic currencies and realistic session price ranges
  - Empathetic, culturally rich local therapeutic narratives
"""

import csv
import re
import os
import sys

# Country configuration: Currency and Realistic Session Price Range
COUNTRY_CONFIG = {
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
    "Guatemala": {"moneda": "GTQ", "precio": "280 - 450 GTQ"},
    "Honduras": {"moneda": "HNL", "precio": "850 - 1.400 HNL"},
    "Nicaragua": {"moneda": "NIO", "precio": "C$ 1,200 - C$ 1,900 NIO"},
    "Panamá": {"moneda": "USD", "precio": "$40 - $65 USD"},
    "Paraguay": {"moneda": "PYG", "precio": "₲250.000 - ₲380.000 PYG"},
    "República Dominicana": {"moneda": "DOP", "precio": "RD$ 2,200 - RD$ 3,500 DOP"},
    "Uruguay": {"moneda": "UYU", "precio": "$1.600 - $2.500 UYU"},
    "Venezuela": {"moneda": "USD", "precio": "$30 - $50 USD"},
}

# Rich local geographic & cultural context map for all 100 LATAM cities
LATAM_LOCAL_CONTEXT = {
    # Colombia
    "bogota": {
        "nombre": "Bogotá",
        "entorno": "la sabana bogotana y el dinamismo de sectores como Rosales, Usaquén, Chapinero y el Parque El Virrey",
        "estresores": "el tráfico constante, las jornadas laborales extensas y la exigencia del clima frío capitalino que favorecen contracturas cervicales, gastritis y fatiga mental"
    },
    "medellin": {
        "nombre": "Medellín",
        "entorno": "la Ciudad de la Eterna Primavera, entre barrios como El Poblado, Laureles, Envigado y Belén",
        "estresores": "el ritmo emprendedor acelerado y la autoexigencia constante, que suelen somatizarse en problemas digestivos, colon irritable y tensión muscular"
    },
    "cali": {
        "nombre": "Cali",
        "entorno": "la calidez del Valle del Cauca y la vida residencial en Ciudad Jardín, Granada, San Fernando y Santa Teresita",
        "estresores": "las altas temperaturas y el ritmo cotidiano que intensifican el cansancio crónico, la ansiedad contenida y los desequilibrios del descanso"
    },
    "barranquilla": {
        "nombre": "Barranquilla",
        "entorno": "la Puerta de Oro de Colombia, en sectores como Alto Prado, Riomar, Villa Santos y el Gran Malecón",
        "estresores": "la velocidad del comercio caribeño y las presiones familiares, manifestándose en migrañas recurrentes, afecciones cutáneas y acidez estomacal"
    },
    "cartagena": {
        "nombre": "Cartagena",
        "entorno": "el entorno caribeño entre Bocagrande, Castillogrande, Manga y la zona histórica",
        "estresores": "el contraste entre el turismo constante y las demandas de la vida diaria, propiciando sobrecarga emocional, insomnio y retención de líquidos"
    },
    # México
    "cdmx": {
        "nombre": "CDMX",
        "entorno": "la vibrante megalópolis mexicana, entre colonias como Polanco, Roma Norte, Condesa, Del Valle y Santa Fe",
        "estresores": "el tráfico descomunal, la contaminación y la hiperactividad urbana que detonan cuadros severos de ansiedad, gastritis nerviosa y bruxismo"
    },
    "guadalajara": {
        "nombre": "Guadalajara",
        "entorno": "la Perla Tapatía, en colonias emblemáticas como Providencia, Puerta de Hierro, Chapultepec y Chapalita",
        "estresores": "las presiones del ecosistema tecnológico y empresarial tradicional, manifestándose en contracturas de espalda, colon irritable y migrañas"
    },
    "monterrey": {
        "nombre": "Monterrey",
        "entorno": "la capital industrial del norte, abarcando San Pedro Garza García, Valle Oriente, Cumbres y Contry",
        "estresores": "la alta cultura de rendimiento laboral y las temperaturas extremas, generando desequilibrios metabólicos, sobrepeso emocional e insomnio"
    },
    "puebla": {
        "nombre": "Puebla",
        "entorno": "la histórica y moderna Angelópolis, abarcando La Paz, Zavaleta y Lomas de Angelópolis",
        "estresores": "la exigencia académica y laboral que activa memorias familiares inconscientes, provocando dolores lumbares y reflujo gástrico"
    },
    "toluca": {
        "nombre": "Toluca",
        "entorno": "la fría meseta toluqueña y las zonas residenciales de Metepec y Providencia",
        "estresores": "el clima gélido y los traslados prolongados a la capital, que acentúan la rigidez osteomuscular y estados depresivos estacionales"
    },
    "tijuana": {
        "nombre": "Tijuana",
        "entorno": "la dinámica frontera en áreas como Zona Río, Playas de Tijuana, Chapultepec y Agua Caliente",
        "estresores": "la intensa vida binacional y el estrés transfronterizo, generando trastornos de pánico, hipertensión y fatiga adrenal"
    },
    "leon": {
        "nombre": "León",
        "entorno": "la capital del calzado en el Bajío, en fraccionamientos como El Molino, Gran Jardín y Campestre",
        "estresores": "la actividad manufacturera y comercial intensiva, que suele reflejarse en dolores articulares, lumbalgia y tensión mandibular"
    },
    "ciudad-juarez": {
        "nombre": "Ciudad Juárez",
        "entorno": "el entorno fronterizo y desértico en zonas como Campos Elíseos y Paseo de la Victoria",
        "estresores": "el aislamiento derivado del clima extremo y la rutina industrial, que impactan el sistema respiratorio y los ciclos de sueño"
    },
    "torreon": {
        "nombre": "Torreón",
        "entorno": "el corazón de la Comarca Lagunera, en áreas como Las Villas, Campestre La Rosita y Senderos",
        "estresores": "las altas temperaturas y la rigidez de las dinámicas comerciales, desencadenando agotamiento crónico y afecciones de la piel"
    },
    "queretaro": {
        "nombre": "Querétaro",
        "entorno": "la próspera ciudad colonial y tecnológica en Juriquilla, Milenio III, El Campanario y Álamos",
        "estresores": "el acelerado crecimiento urbano y la congestión vial reciente, que somatizan en dolores de cabeza, gastritis y ansiedad"
    },
    "san-luis-potosi": {
        "nombre": "San Luis Potosí",
        "entorno": "el altiplano potosino en colonias como Lomas, Chapultepec y Tangamanga",
        "estresores": "la transición hacia una urbe industrial masiva, generando tensiones corporales, rigidez en el cuello y bloqueos emocionales"
    },
    "merida": {
        "nombre": "Mérida",
        "entorno": "la apacible capital yucateca en zonas residenciales como Altabrisa, Montebello y Temozón Norte",
        "estresores": "el calor abrasador y la dificultad para expresar inconformidades internas, traduciéndose en hipotiroidismo y problemas circulatorios"
    },
    "aguascalientes": {
        "nombre": "Aguascalientes",
        "entorno": "la tranquilidad del Bajío en zonas como Bosques, Campestre y San Telmo",
        "estresores": "la monotonía de las jornadas corporativas que reprimen la creatividad personal, manifestándose en lumbalgia y tensión digestiva"
    },
    "hermosillo": {
        "nombre": "Hermosillo",
        "entorno": "el cálido desierto sonorense en vecindarios como Pitic, Los Lagos y Grand Gourmet",
        "estresores": "el rigor climático y el estrés acumulado que afectan el ritmo cardiovascular y la vitalidad energética cotidiana"
    },
    "saltillo": {
        "nombre": "Saltillo",
        "entorno": "la meseta coahuilense en fraccionamientos como San Patricio, Los Alpes y Real de Peña",
        "estresores": "el trabajo repetitivo de la industria automotriz, provocando contracturas dorsales, inflamación articular y fatiga crónica"
    },
    # Costa Rica
    "san-jose": {
        "nombre": "San José",
        "entorno": "el Valle Central costarricense, entre Escazú, Santa Ana, Rohrmoser y Curridabat",
        "estresores": "las presas de tráfico y la sobrecarga laboral de las multinacionales, que detonan gastritis, migrañas y sobrepeso emocional"
    },
    "alajuela": {
        "nombre": "Alajuela",
        "entorno": "las faldas del volcán Poás y las zonas residenciales de la Ciudad de los Mangos",
        "estresores": "las altas temperaturas y el ritmo de las zonas francas, que impactan la calidad del sueño y generan tensión muscular"
    },
    "cartago": {
        "nombre": "Cartago",
        "entorno": "el fresco valle colonial y los distritos residenciales brumosos",
        "estresores": "el apego a estructuras familiares rígidas que dificultan soltar el pasado, manifestándose en problemas articulares y tiroideos"
    },
    "heredia": {
        "nombre": "Heredia",
        "entorno": "la Ciudad de las Flores, con sus complejos tecnológicos y condominios modernos",
        "estresores": "la constante exigencia académica y tecnológica que satura el sistema nervioso con ansiedad e insomnio"
    },
    "puntarenas": {
        "nombre": "Puntarenas",
        "entorno": "la costa pacífica costarricense y la vida ribereña del puerto",
        "estresores": "las fluctuaciones económicas de la costa que generan incertidumbre y se somatizan en dolencias estomacales y cansancio"
    },
    # El Salvador
    "san-salvador": {
        "nombre": "San Salvador",
        "entorno": "el valle capitalino al pie del volcán, entre Escalón, San Benito, Santa Elena y Antiguo Cuscatlán",
        "estresores": "el tráfico denso y la presión económica constante, provocando colitis nerviosa, palpitaciones y cefaleas"
    },
    "santa-ana": {
        "nombre": "Santa Ana",
        "entorno": "la Ciudad Morena en el occidente salvadoreño y sus barrios residenciales",
        "estresores": "las lealtades familiares implícitas que frenan proyectos personales, manifestándose en dolores lumbares y dermatitis"
    },
    "san-miguel": {
        "nombre": "San Miguel",
        "entorno": "la cálida Perla Oriental salvadoreña y su activo comercio regional",
        "estresores": "el calor sofocante y el agotamiento laboral continuo que derivan en hipertensión y fatiga adrenal"
    },
    "soyapango": {
        "nombre": "Soyapango",
        "entorno": "el denso núcleo industrial y urbano de la zona metropolitana",
        "estresores": "la hiperactividad del entorno y los traslados difíciles que saturan el cuerpo con tensión cervical y acidez estomacal"
    },
    "santa-tecla": {
        "nombre": "Santa Tecla",
        "entorno": "el agradable microclima tecleño en áreas como Pinares de Suiza y Merliot",
        "estresores": "el afán de perfeccionismo y estatus profesional que desemboca en bruxismo nocturno, colon irritable e insomnio"
    },
    # Guatemala
    "ciudad-de-guatemala": {
        "nombre": "Ciudad de Guatemala",
        "entorno": "la capital guatemalteca, en zonas residenciales como Zona 10, Zona 14, Zona 15 y Carretera a El Salvador",
        "estresores": "la congestión vial extrema y el estrés corporativo, causando migrañas recurrentes, ansiedad y gastritis crónica"
    },
    "mixco": {
        "nombre": "Mixco",
        "entorno": "la dinámica área metropolitana en sectores como San Cristóbal y Montserrat",
        "estresores": "las largas horas invertidas en el tránsito vehicular diario, reflejándose en dolores cervicales y agotamiento mental"
    },
    "villa-nueva": {
        "nombre": "Villa Nueva",
        "entorno": "el motor industrial del sur metropolitano y sus complejos residenciales",
        "estresores": "la sobreexigencia física y laboral que afecta el sistema digestivo y la salud osteomuscular"
    },
    "quetzaltenango": {
        "nombre": "Quetzaltenango",
        "entorno": "la histórica Xelajú entre frías montañas y arquitectura colonial",
        "estresores": "el peso de las tradiciones familiares y el clima frío que agudizan contracturas, sinusitis crónica y melancolía"
    },
    "antigua-guatemala": {
        "nombre": "Antigua Guatemala",
        "entorno": "la emblemática ciudad colonial rodeada por volcanes imponentes",
        "estresores": "la tensión interna de conciliar la vida moderna con expectativas rígidas, provocando reflujo y rigidez corporal"
    },
    # Honduras
    "tegucigalpa": {
        "nombre": "Tegucigalpa",
        "entorno": "la cuenca montañosa capitalina en áreas como Lomas del Guijarro, Las Hadas y Palmira",
        "estresores": "la topografía escarpada y el tráfico caótico que generan tensión en hombros, insomnio y estados de alerta constante"
    },
    "san-pedro-sula": {
        "nombre": "San Pedro Sula",
        "entorno": "la capital industrial hondureña, abarcando Río de Piedras, Bella Vista y Trejo",
        "estresores": "las altas exigencias fabriles y mercantiles unidas al calor intenso, somatizándose en hipertensión y colitis"
    },
    "choloma": {
        "nombre": "Choloma",
        "entorno": "el núcleo maquilero y manufacturero del Valle de Sula",
        "estresores": "las rutinas repetitivas y las presiones económicas que provocan lumbalgia crónica y sobrecarga digestiva"
    },
    "la-ceiba": {
        "nombre": "La Ceiba",
        "entorno": "la Novia de Honduras frente al mar Caribe y al pie de Pico Bonito",
        "estresores": "el desbalance entre la tranquilidad costera y las preocupaciones familiares, reflejándose en dermatitis y migrañas"
    },
    "el-progreso": {
        "nombre": "El Progreso",
        "entorno": "la Perla del Ulúa y su estratégica posición comercial en el norte",
        "estresores": "la incertidumbre financiera y la sobrecarga laboral que generan dolores de espalda y problemas gástricos"
    },
    # Nicaragua
    "managua": {
        "nombre": "Managua",
        "entorno": "la ribera del Xolotlán y las zonas de Villa Fontana, Santo Domingo y Las Colinas",
        "estresores": "el calor persistente y la complejidad cotidiana que desencadenan ansiedad, insomnio y agotamiento nervioso"
    },
    "leon-ni": {
        "nombre": "León (NI)",
        "entorno": "la histórica y universitaria ciudad universitaria colonial nicaragüense",
        "estresores": "el clima ardiente y la rigidez de expectativas familiares que somatizan en dolor de cabeza crónico y acidez"
    },
    "masaya": {
        "nombre": "Masaya",
        "entorno": "la cuna del folclore nicaragüense y sus barrios artesanos",
        "estresores": "las cargas emocionales transgeneracionales no resueltas que se manifiestan en rigidez articular y desánimo"
    },
    "chinandega": {
        "nombre": "Chinandega",
        "entorno": "el corazón agrícola del occidente bajo la mirada del volcán San Cristóbal",
        "estresores": "el intenso esfuerzo laboral bajo temperaturas extremas, impactando el hígado y la tensión muscular"
    },
    "granada": {
        "nombre": "Granada",
        "entorno": "la Gran Sultana colonial a orillas del Cocibolca",
        "estresores": "la dificultad para expresar emociones de duelo o frustración, somatizándose en afecciones pulmonares y digestivas"
    },
    # Panamá
    "panama": {
        "nombre": "Ciudad de Panamá",
        "entorno": "el centro financiero internacional en áreas como Punta Pacífica, Costa del Este, San Francisco y Bella Vista",
        "estresores": "el vertiginoso ritmo financiero global y el tráfico denso, propiciando taquicardia, gastritis nerviosa y fatiga crónica"
    },
    "colon": {
        "nombre": "Colón",
        "entorno": "el núcleo portuario atlántico y la Zona Libre de Colón",
        "estresores": "la tensión por el entorno socioeconómico cambiante, provocando dolores lumbares y afecciones cutáneas"
    },
    "david": {
        "nombre": "David",
        "entorno": "el corazón agropecuario y comercial de la provincia de Chiriquí",
        "estresores": "el calor del valle chiricano y las altas responsabilidades familiares que se reflejan en sobrepeso e hipertensión"
    },
    "san-miguelito": {
        "nombre": "San Miguelito",
        "entorno": "el densamente poblado distrito urbano del área metropolitana",
        "estresores": "la sobreestimulación y los desplazamientos agotadores que saturan el sistema nervioso, manifestándose en insomnio"
    },
    "la-chorrera": {
        "nombre": "La Chorrera",
        "entorno": "el sector de Panamá Oeste y sus crecientes comunidades residenciales",
        "estresores": "el diario traslado hacia la capital para trabajar, generando contracturas en el cuello y agotamiento emocional"
    },
    # República Dominicana
    "santo-domingo": {
        "nombre": "Santo Domingo",
        "entorno": "el corazón urbano dominicano en sectores como Piantini, Naco, Bella Vista y el Mirador Sur",
        "estresores": "el tráfico intenso y el afán de destacar social y profesionalmente, provocando colon irritable, bruxismo y migrañas"
    },
    "santiago-rd": {
        "nombre": "Santiago (RD)",
        "entorno": "la hidalga Ciudad Corazón del Valle del Cibao en áreas como Cerros de Gurabo y Villa Olga",
        "estresores": "la autoexigencia comercial y la devoción familiar que postergan el autocuidado, causando dolores de espalda y reflujo"
    },
    "la-romana": {
        "nombre": "La Romana",
        "entorno": "el este dominicano entre Casa de Campo y las áreas residenciales urbanas",
        "estresores": "el choque entre el lujo turístico y las responsabilidades cotidianas, manifestándose en ansiedad e insomnio"
    },
    "san-pedro-macoris": {
        "nombre": "San Pedro de Macorís",
        "entorno": "la Sultana del Este y su histórica tradición cañera y universitaria",
        "estresores": "la dificultad para expresar heridas emocionales del pasado, somatizándose en desequilibrios tiroideos y musculares"
    },
    "punta-cana": {
        "nombre": "Punta Cana",
        "entorno": "el epicentro turístico internacional de playas de arena blanca",
        "estresores": "las jornadas laborales desfasadas y el distanciamiento de la familia de origen, produciendo fatiga extrema y dermatitis"
    },
    # Argentina
    "buenos-aires": {
        "nombre": "Buenos Aires",
        "entorno": "la capital porteña en barrios icónicos como Palermo, Recoleta, Belgrano, Caballito y San Telmo",
        "estresores": "la hiperactividad mental característica, la incertidumbre económica y el ritmo incesante que somatizan en ansiedad, insomnio y contracturas crónicas"
    },
    "cordoba": {
        "nombre": "Córdoba",
        "entorno": "la docta capital mediterránea en Nueva Córdoba, Cerro de las Rosas y Alta Córdoba",
        "estresores": "la exigencia universitaria y laboral combinada con tensiones no expresadas, manifestándose en gastritis, cefaleas y colon irritable"
    },
    "rosario": {
        "nombre": "Rosario",
        "entorno": "la ribera del río Paraná en Pichincha, Barrio Martin y Fisherton",
        "estresores": "el estrés urbano y la preocupación por el entorno, detonando crisis de angustia, opresión en el pecho y rigidez cervical"
    },
    "mendoza": {
        "nombre": "Mendoza",
        "entorno": "la tierra del sol y del buen vino al pie de la imponente cordillera de los Andes",
        "estresores": "el clima seco y las demandas de la actividad vitivinícola y corporativa, que provocan dolores articulares y fatiga física"
    },
    "la-plata": {
        "nombre": "La Plata",
        "entorno": "la ciudad de las diagonales con su ordenada trama urbana y ambiente universitario",
        "estresores": "el exceso de análisis mental y la rigidez en rutinas que impactan el sistema digestivo y la postura de la columna"
    },
    # Bolivia
    "la-paz": {
        "nombre": "La Paz",
        "entorno": "la majestuosa hoyada andina entre Sopocachi, Calacoto, San Miguel y Miraflores",
        "estresores": "la altitud geográfica y la intensa dinámica urbana que aumentan la fatiga respiratoria, cefaleas y retención de tensiones"
    },
    "santa-cruz": {
        "nombre": "Santa Cruz",
        "entorno": "la pujante metrópoli del oriente boliviano en Equipetrol, Las Palmas y Urubó",
        "estresores": "el clima cálido y la velocidad comercial voraz que generan sobrepeso por compensación emocional, acidez e insomnio"
    },
    "cochabamba": {
        "nombre": "Cochabamba",
        "entorno": "la Ciudad Jardín del valle central boliviano con su clima apacible",
        "estresores": "los conflictos familiares reprimidos alrededor de la mesa y la tradición, reflejándose en gastritis y afecciones biliares"
    },
    "sucre": {
        "nombre": "Sucre",
        "entorno": "la Ciudad Blanca colonial y capital constitucional de Bolivia",
        "estresores": "el peso de la solemnidad y el deber ser, traduciéndose en rigidez de cuello, hombros y lumbalgias persistentes"
    },
    "el-alto": {
        "nombre": "El Alto",
        "entorno": "la vibrante y luchadora metrópoli del altiplano a más de 4000 metros de altura",
        "estresores": "el intenso esfuerzo físico cotidiano y el rigor del clima helado, manifestándose en inflamación articular y agotamiento"
    },
    # Brasil
    "sao-paulo": {
        "nombre": "São Paulo",
        "entorno": "el gigantesco centro financiero de América Latina en Jardins, Itaim Bibi, Pinheiros y Moema",
        "estresores": "el tráfico interminable, la competitividad implacable y el ritmo 'non-stop' que saturan el cuerpo con estrés crónico, hipertensión y pánico"
    },
    "rio-de-janeiro": {
        "nombre": "Rio de Janeiro",
        "entorno": "la Ciudad Maravillosa entre Ipanema, Leblon, Copacabana y Barra da Tijuca",
        "estresores": "el contraste entre la belleza natural y las preocupaciones de seguridad cotidiana, generando tensión muscular constante e insomnio"
    },
    "brasilia": {
        "nombre": "Brasília",
        "entorno": "la capital federal diseñada por Niemeyer en Plano Piloto, Lago Sul y Lago Norte",
        "estresores": "el clima seco de cerrado y el ambiente burocrático estricto que somatizan en alergias respiratorias y rigidez emocional"
    },
    "salvador": {
        "nombre": "Salvador",
        "entorno": "la energía cultural bahiana en Barra, Ondina, Pituba y el centro histórico",
        "estresores": "conflictos transgeneracionales ancestrales no procesados que se proyectan en afecciones dermatológicas y dolores lumbares"
    },
    "fortaleza": {
        "nombre": "Fortaleza",
        "entorno": "la costa nororiental de Ceará en Meireles, Aldeota y Praia de Iracema",
        "estresores": "la presión del trabajo turístico y comercial que altera los hábitos alimentarios, provocando reflujo y sobrepeso"
    },
    # Chile
    "santiago": {
        "nombre": "Santiago",
        "entorno": "la capital chilena al pie de los Andes, en comunas como Las Condes, Providencia, Vitacura y Ñuñoa",
        "estresores": "el ritmo de vida sumamente acelerado, las jornadas extensas y el 'esfuerzo sin pausa' que derivan en colon irritable, bruxismo y depresión"
    },
    "valparaiso": {
        "nombre": "Valparaíso",
        "entorno": "la pintoresca ciudad de los cerros y su vecina costera Viña del Mar",
        "estresores": "la nostalgia no canalizada y la fatiga del desplazamiento en pendientes que impactan las articulaciones y el ánimo"
    },
    "concepcion": {
        "nombre": "Concepción",
        "entorno": "la capital penquista en el sur chileno con fuerte dinamismo industrial y universitario",
        "estresores": "el clima frío y lluvioso sumado a la autoexigencia intelectual, manifestándose en contracturas dorsales y cefaleas"
    },
    "la-serena": {
        "nombre": "La Serena",
        "entorno": "la apacible bahía de Coquimbo y sus valles transversales luminosos",
        "estresores": "el aislamiento emocional y la dificultad para procesar duelos, somatizándose en desequilibrios del sistema inmunológico"
    },
    "antofagasta": {
        "nombre": "Antofagasta",
        "entorno": "la Perla del Norte y el eje minero costero del desierto de Atacama",
        "estresores": "los rigurosos turnos mineros y el desarraigo del hogar que ocasionan insomnio grave, trastornos digestivos y fatiga extrema"
    },
    # Ecuador
    "quito": {
        "nombre": "Quito",
        "entorno": "la Carita de Dios entre laderas andinas en Cumbayá, La Carolina, González Suárez y Tumbaco",
        "estresores": "el tránsito vehicular y la hipoxia de la altura que potencian la sensación de cansancio, ansiedad y migrañas"
    },
    "guayaquil": {
        "nombre": "Guayaquil",
        "entorno": "la Perla del Pacífico en Samborondón, Puerto Santa Ana, Urdesa y Ceibos",
        "estresores": "el calor tropical constante y la presión comercial competitiva, somatizándose en problemas gástricos e hipertensión"
    },
    "cuenca": {
        "nombre": "Cuenca",
        "entorno": "la joya colonial de los cuatro ríos en Yanuncay, El Vergel y el Centro Histórico",
        "estresores": "la contención de emociones para guardar las apariencias familiares, causando dolores articulares y afecciones de la tiroides"
    },
    "santo-domingo-ec": {
        "nombre": "Santo Domingo (EC)",
        "entorno": "la encrucijada comercial de los Tsáchilas entre la Costa y la Sierra",
        "estresores": "el ritmo mercantil incansable que dificulta las pausas reparadoras, generando lumbalgia y agotamiento físico"
    },
    "ambato": {
        "nombre": "Ambato",
        "entorno": "la industriosa Ciudad de las Flores y las Frutas en Ficoa y Miraflores",
        "estresores": "la obsesión por la productividad y el trabajo sin tregua que terminan colapsando el sistema digestivo con gastritis"
    },
    # Paraguay
    "asuncion": {
        "nombre": "Asunción",
        "entorno": "la Madre de Ciudades en zonas residenciales como Villa Morra, Carmelitas, Manora y Los Laureles",
        "estresores": "el calor sofocante y el ritmo corporativo moderno que se traducen en hipertensión, fatiga crónica y migrañas"
    },
    "ciudad-del-este": {
        "nombre": "Ciudad del Este",
        "entorno": "la vibrante frontera comercial de la Triple Frontera",
        "estresores": "la volatilidad de los negocios internacionales y la tensión constante que provocan acidez, bruxismo y colitis"
    },
    "san-lorenzo": {
        "nombre": "San Lorenzo",
        "entorno": "la Ciudad Universitaria y su activo comercio urbano",
        "estresores": "la sobrecarga de responsabilidades laborales y académicas que se reflejan en contracturas de cuello e insomnio"
    },
    "luque": {
        "nombre": "Luque",
        "entorno": "la histórica cuna artesanal de la orfebrería cercana a la capital",
        "estresores": "conflictos transgeneracionales vinculados al reconocimiento y el linaje, somatizándose en dolores lumbares"
    },
    "capiata": {
        "nombre": "Capiatá",
        "entorno": "el corredor residencial del departamento Central",
        "estresores": "el estrés del desplazamiento diario y las preocupaciones financieras familiares, manifestándose en agotamiento"
    },
    # Perú
    "lima": {
        "nombre": "Lima",
        "entorno": "la metrópoli costera en distritos como Miraflores, San Isidro, Surco, La Molina y Barranco",
        "estresores": "el denso tráfico limeño, el cielo gris persistente y la alta autoexigencia profesional que propician depresión, gastritis y contracturas crónicas"
    },
    "arequipa": {
        "nombre": "Arequipa",
        "entorno": "la Ciudad Blanca al pie del volcán Misti en Yanahuara, Cayma y Cerro Colorado",
        "estresores": "el fuerte temperamento regional y la dificultad para ceder el control, manifestándose en dolores de cabeza y problemas hepáticos"
    },
    "trujillo": {
        "nombre": "Trujillo",
        "entorno": "la Capital de la Primavera en California, El Golf y Huanchaco",
        "estresores": "el afán de éxito familiar y la tensión laboral que repercuten en sobrepeso emocional y alteraciones del colon"
    },
    "chiclayo": {
        "nombre": "Chiclayo",
        "entorno": "la Capital de la Amistad en Santa Victoria, Pimentel y Los Parques",
        "estresores": "la preocupación constante por el bienestar de los hijos y el clan, somatizándose en acidez y fatiga física"
    },
    "piura": {
        "nombre": "Piura",
        "entorno": "la calurosa tierra del eterno calor en Los Ejidos, Miraflores y Santa María del Pinar",
        "estresores": "las altas temperaturas y el agotamiento mental que debilitan el descanso nocturno y aceleran la ansiedad"
    },
    # Uruguay
    "montevideo": {
        "nombre": "Montevideo",
        "entorno": "la rambla costera montevideana en Pocitos, Punta Carretas, Carrasco y Parque Rodó",
        "estresores": "la tendencia a la rumiación mental y la nostalgia no expresada, que frecuentemente somatizan en afecciones respiratorias, ansiedad y problemas digestivos"
    },
    "salto": {
        "nombre": "Salto",
        "entorno": "el litoral termal del río Uruguay y su ambiente agroindustrial",
        "estresores": "las preocupaciones económicas y familiares que se fijan en la espalda baja en forma de lumbago y ciática"
    },
    "ciudad-de-la-costa": {
        "nombre": "Ciudad de la Costa",
        "entorno": "el balneario residencial canario entre Médanos, Solymar y Lagomar",
        "estresores": "la doble vida entre el descanso costero y los traslados laborales a Montevideo, generando cansancio mental crónico"
    },
    "paysandu": {
        "nombre": "Paysandú",
        "entorno": "la histórica Heroica a orillas del río Uruguay",
        "estresores": "la resistencia al cambio y las lealtades familiares antiguas que producen rigidez osteomuscular y artritis"
    },
    "maldonado": {
        "nombre": "Maldonado",
        "entorno": "el departamento esteño cercano a Punta del Este, Cantegril y San Rafael",
        "estresores": "la marcada estacionalidad laboral que provoca incertidumbre económica profunda, insomnio y crisis de pánico"
    },
    # Venezuela
    "caracas": {
        "nombre": "Caracas",
        "entorno": "el valle al pie del Ávila en Altamira, Las Mercedes, La Castellana, Los Palos Grandes y El Cafetal",
        "estresores": "la continua incertidumbre socioeconómica, la hipervigilancia y el estrés crónico que disparan hipertensión, gastritis y agotamiento adrenal"
    },
    "maracaibo": {
        "nombre": "Maracaibo",
        "entorno": "la cálida tierra del sol amada a orillas del Lago en Bella Vista, El Milagro y Cecilio Acosta",
        "estresores": "las temperaturas extremas y las fallas de servicios que generan desesperanza aprendida, inflamación corporal e insomnio"
    },
    "valencia-ve": {
        "nombre": "Valencia (VE)",
        "entorno": "la capital industrial carabobeña en El Trigal, Prebo, Los Mangos y Guaparo",
        "estresores": "las dificultades de la reactivación productiva y la sobrecarga familiar, traduciéndose en cefaleas tensionales y reflujo"
    },
    "barquisimeto": {
        "nombre": "Barquisimeto",
        "entorno": "la Ciudad de los Crepúsculos en Nueva Segovia, El Parral y Cabudare",
        "estresores": "la lucha constante por sostener el bienestar familiar, que se somatiza en contracturas cervicales y ansiedad"
    },
    "maracay": {
        "nombre": "Maracay",
        "entorno": "la Ciudad Jardín aragüeña en Las Delicias, La Soledad y San Jacinto",
        "estresores": "el clima caluroso y las tensiones del entorno que impactan negativamente la calidad del descanso y el ánimo"
    }
}

# New cities for España (6) and EE.UU. Hispanos (7)
ADDITIONAL_CITIES = [
    # España (6)
    {
        "slug": "madrid",
        "nombre": "Madrid",
        "pais": "España",
        "entorno": "la capital española y el dinamismo de barrios emblemáticos como Salamanca, Chamberí, Retiro, Malasaña y el Paseo de la Castellana",
        "estresores": "el ritmo acelerado de las grandes corporaciones, la autoexigencia constante y la sobrecarga mental que desembocan en ansiedad, insomnio, migrañas y rigidez cervical"
    },
    {
        "slug": "barcelona",
        "nombre": "Barcelona",
        "pais": "España",
        "entorno": "la cosmopolita atmósfera mediterránea que conecta el Eixample, Gràcia, Sarrià-Sant Gervasi, Poblenou y Les Corts",
        "estresores": "la aceleración urbana, la alta competitividad profesional y el perfeccionismo que suelen somatizarse en trastornos digestivos, colon irritable y fatiga crónica"
    },
    {
        "slug": "valencia",
        "nombre": "Valencia",
        "pais": "España",
        "entorno": "la luminosidad levantina de Ruzafa, El Carmen, Cánovas, Campanar y el cauce del Turia",
        "estresores": "la dificultad para equilibrar el ritmo de trabajo con el espacio personal, generando cuadros de agotamiento, dermatitis atópica y contracturas de espalda"
    },
    {
        "slug": "sevilla",
        "nombre": "Sevilla",
        "pais": "España",
        "entorno": "la tradición y calidez hispalense en barrios como Triana, Nervión, Los Remedios y el Casco Antiguo",
        "estresores": "las lealtades familiares invisibles y el silencio ante conflictos emocionales arraigados, manifestándose en gastritis, dolores articulares y pesadez física"
    },
    {
        "slug": "malaga",
        "nombre": "Málaga",
        "pais": "España",
        "entorno": "el vertiginoso desarrollo de la Costa del Sol en sectores como El Limonar, La Malagueta, Soho y Teatinos",
        "estresores": "la adaptación a cambios urbanos rápidos y la sobrecarga laboral en servicios y tecnología, provocando bruxismo, insomnio y desequilibrios tiroideos"
    },
    {
        "slug": "bilbao",
        "nombre": "Bilbao",
        "pais": "España",
        "entorno": "la sobria elegancia y fuerza del entorno vasco en Abando, Indautxu, el Casco Viejo y Getxo",
        "estresores": "la contención de emociones vulnerables y la autoexigencia implícita, que el cuerpo somatiza en lumbalgia, ciática y rigidez en la columna"
    },
    # EE.UU. Hispanos (7)
    {
        "slug": "miami",
        "nombre": "Miami",
        "pais": "Estados Unidos",
        "entorno": "el vibrante centro multicultural en áreas como Brickell, Coral Gables, Doral, Coconut Grove y Kendall",
        "estresores": "el estrés del alto costo de vida, la presión constante de éxito y los duelos migratorios no resueltos, generando crisis de ansiedad, hipertensión y fatiga adrenal"
    },
    {
        "slug": "los-angeles",
        "nombre": "Los Ángeles",
        "pais": "Estados Unidos",
        "entorno": "la extensa metrópoli californiana desde Downtown, Pasadena y Glendale hasta Silver Lake y la Costa",
        "estresores": "las interminables horas en el tráfico de los freeways, la competitividad laboral y el aislamiento, traduciéndose en dolores de espalda crónicos, migrañas y acidez"
    },
    {
        "slug": "houston",
        "nombre": "Houston",
        "pais": "Estados Unidos",
        "entorno": "el centro empresarial y médico de Texas en vecindarios como The Woodlands, Katy, Sugar Land, The Heights y Galleria",
        "estresores": "las extensas jornadas laborales, el sedentarismo forzado por las distancias y el impacto emocional del estilo de vida acelerado, produciendo desórdenes metabólicos y sobrepeso"
    },
    {
        "slug": "nueva-york",
        "nombre": "Nueva York",
        "pais": "Estados Unidos",
        "entorno": "la incesante energía '24/7' de la Gran Manzana abarcando Manhattan, Queens, Brooklyn y el Bronx",
        "estresores": "la sobreestimulación constante, los espacios reducidos y el ritmo frenético que detonan ataques de pánico, gastritis nerviosa profunda y trastornos del sueño"
    },
    {
        "slug": "chicago",
        "nombre": "Chicago",
        "pais": "Estados Unidos",
        "entorno": "la imponente Ciudad de los Vientos en distritos como Lincoln Park, The Loop, Pilsen, Lakeview y Naperville",
        "estresores": "los inviernos prolongados y exigentes sumados a la presión profesional corporativa, provocando contracturas musculares severas, desánimo y desequilibrios inmunológicos"
    },
    {
        "slug": "orlando",
        "nombre": "Orlando",
        "pais": "Estados Unidos",
        "entorno": "el corazón residencial de Florida Central en Lake Nona, Dr. Phillips, Winter Park, Windermere y Hunters Creek",
        "estresores": "el reto de sostener a la familia en un entorno turístico y dinámico, donde los conflictos de desvalorización y agotamiento se reflejan en la salud física"
    },
    {
        "slug": "san-antonio",
        "nombre": "San Antonio",
        "pais": "Estados Unidos",
        "entorno": "la rica herencia bicultural y residencial en zonas como Stone Oak, Alamo Heights, Pearl District y Medical Center",
        "estresores": "los lazos transgeneracionales de la comunidad hispana que demandan sanación de memorias familiares para liberar síntomas crónicos, inflamación articular y estrés acumulado"
    }
]

def build_therapeutic_story(nombre, pais, entorno, estresores):
    """
    Generates a cohesive, empathetic 3-part therapeutic narrative tailored to the city.
    """
    p1 = (
        f"En {nombre}, {pais}, el ritmo cotidiano que transcurre a través de {entorno} impone un nivel de exigencia "
        f"que muchas veces satura silenciosamente el sistema nervioso. Factores como {estresores} hacen que el cuerpo "
        f"comience a somatizar tensiones internas en forma de molestias físicas persistentes, agotamiento o desequilibrios del descanso."
    )
    p2 = (
        f"La biodescodificación y la terapia holística de Alma Holística abordan cada síntoma no como una falla del organismo, "
        f"sino como una valiosa respuesta biológica de supervivencia ante vivencias emocionales no expresadas o patrones heredados. "
        f"A través de una indagación consciente, identificamos el conflicto inconsciente que originó la dolencia para desactivar "
        f"el programa de alerta y permitir la recuperación natural del equilibrio mente-cuerpo."
    )
    p3 = (
        f"Mediante nuestras sesiones online en vivo para {nombre}, accedes a un espacio confidencial, cálido y guiado por terapeutas "
        f"expertos sin la necesidad de desplazarte ni perder tiempo en el tránsito. Te invitamos a realizar nuestro test de evaluación "
        f"interactivo para descubrir el sentido biológico de tus síntomas y dar el primer paso hacia tu bienestar agendando tu consulta por WhatsApp."
    )
    return f"{p1} {p2} {p3}"

def generate_cities_dataset(source_csv_path, output_csv_path):
    # Read source fluffy dataset
    with open(source_csv_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fluffy_rows = list(reader)

    print(f"Read {len(fluffy_rows)} source rows from {source_csv_path}")

    all_rows = []

    # 1. Process 100 LATAM cities
    for r in fluffy_rows:
        raw_slug = r["URL Final (Slug)"].replace("bulldog-frances-fluffy-", "")
        country = r["País"]
        
        # Disambiguation for Valencia (VE)
        if raw_slug == "valencia" and country == "Venezuela":
            slug = "valencia-ve"
        else:
            slug = raw_slug

        if slug not in LATAM_LOCAL_CONTEXT:
            raise ValueError(f"Missing local context mapping for LATAM city: {slug}")

        info = LATAM_LOCAL_CONTEXT[slug]
        nombre = info["nombre"]
        entorno = info["entorno"]
        estresores = info["estresores"]

        meta = COUNTRY_CONFIG[country]
        moneda = meta["moneda"]
        precio = meta["precio"]

        h1 = f"Terapia Holística y Biodescodificación en {nombre}"
        meta_desc = f"Sesiones online de terapia holística y biodescodificación en {nombre}, {country}. Sanación emocional profunda, equilibrio mente-cuerpo y alivio de síntomas. Agenda tu sesión."
        historia = build_therapeutic_story(nombre, country, entorno, estresores)

        all_rows.append({
            "Dominio": "https://almaholistica.com",
            "Categoría": "terapia-online",
            "URL Final (Slug)": slug,
            "H1 Título": h1,
            "Meta Descripción": meta_desc,
            "País": country,
            "Moneda": moneda,
            "Rango_Precio_Sesion": precio,
            "Historia_Local": historia
        })

    # 2. Add 6 Spain and 7 US cities
    for c in ADDITIONAL_CITIES:
        slug = c["slug"]
        nombre = c["nombre"]
        country = c["pais"]
        entorno = c["entorno"]
        estresores = c["estresores"]

        meta = COUNTRY_CONFIG[country]
        moneda = meta["moneda"]
        precio = meta["precio"]

        h1 = f"Terapia Holística y Biodescodificación en {nombre}"
        meta_desc = f"Sesiones online de terapia holística y biodescodificación en {nombre}, {country}. Sanación emocional profunda, equilibrio mente-cuerpo y alivio de síntomas. Agenda tu sesión."
        historia = build_therapeutic_story(nombre, country, entorno, estresores)

        all_rows.append({
            "Dominio": "https://almaholistica.com",
            "Categoría": "terapia-online",
            "URL Final (Slug)": slug,
            "H1 Título": h1,
            "Meta Descripción": meta_desc,
            "País": country,
            "Moneda": moneda,
            "Rango_Precio_Sesion": precio,
            "Historia_Local": historia
        })

    # Ensure target directory exists
    os.makedirs(os.path.dirname(os.path.abspath(output_csv_path)), exist_ok=True)

    # Write output CSV with exact 9 columns
    fieldnames = [
        "Dominio",
        "Categoría",
        "URL Final (Slug)",
        "H1 Título",
        "Meta Descripción",
        "País",
        "Moneda",
        "Rango_Precio_Sesion",
        "Historia_Local"
    ]

    with open(output_csv_path, mode="w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()
        for row in all_rows:
            writer.writerow(row)

    print(f"Successfully generated {len(all_rows)} cities in {output_csv_path}")
    return all_rows

def validate_dataset(csv_path):
    print(f"\n--- Validating {csv_path} ---")
    with open(csv_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        rows = list(reader)

    expected_headers = [
        "Dominio", "Categoría", "URL Final (Slug)", "H1 Título",
        "Meta Descripción", "País", "Moneda", "Rango_Precio_Sesion", "Historia_Local"
    ]
    assert headers == expected_headers, f"Header mismatch: {headers} != {expected_headers}"
    print(f"Headers match exactly (9 columns): {headers}")

    assert len(rows) == 113, f"Expected 113 rows, got {len(rows)}"
    print(f"Total rows: {len(rows)} (100 LATAM + 6 España + 7 EE.UU.)")

    # Countries check
    countries = set(r["País"] for r in rows)
    assert len(countries) == 20, f"Expected 20 countries, got {len(countries)}: {countries}"
    print(f"Total countries: {len(countries)} (20 approved countries)")

    # Slug uniqueness and regex
    slugs = [r["URL Final (Slug)"] for r in rows]
    assert len(slugs) == len(set(slugs)), f"Duplicate slugs detected: {[s for s in slugs if slugs.count(s) > 1]}"
    slug_regex = re.compile(r"^[a-z0-9-]+$")
    for s in slugs:
        assert slug_regex.match(s), f"Slug fails regex ^[a-z0-9-]+$: '{s}'"
    print(f"All 113 slugs are unique and match ^[a-z0-9-]+$")

    # Forbidden canine keywords check
    forbidden_regex = re.compile(
        r"\b(bulldog|fluffy|cachorro|cachorros|cachorrito|perro|perros|canino|caninos|canina|caninas|"
        r"manto|pelaje|l4/l1|l1/l4|gen\s+l[14]|alelos?\s+l[14]|pedigree|raza|razas|crianza|criadero|criadores|"
        r"vacuna|vacunas|vacunaci[oó]n|desparasita\w*|aeropuerto|vuelo vip|transporte vip|boeing|"
        r"kinol[oó]gica|cinol[oó]gica)\b",
        re.IGNORECASE
    )

    for i, r in enumerate(rows):
        for col, val in r.items():
            assert val.strip() != "", f"Empty cell at row {i+1}, col {col}"
            m = forbidden_regex.search(val)
            assert m is None, f"Forbidden canine term '{m.group(0)}' found at row {i+1}, col {col}"

    print("Zero empty cells and ZERO canine terms found across all 113 rows!")

    # Currency validation
    for r in rows:
        expected_curr = COUNTRY_CONFIG[r["País"]]["moneda"]
        assert r["Moneda"] == expected_curr, f"Currency mismatch for {r['País']}: got {r['Moneda']}, expected {expected_curr}"

    print("All currencies match authentic national currencies (COP, MXN, EUR, USD, ARS, CLP, PEN, BOB, BRL, CRC, DOP, GTQ, HNL, NIO, PYG, UYU)!")
    print("DATASET VALIDATION 100% PASSED!")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Generador del dataset de ciudades para Alma Holística")
    parser.add_argument(
        "--input",
        default="/Users/anthony/Downloads/almaholistica.com/dataset_fluffy_stories.csv",
        help="Ruta al CSV base de historias fluffy"
    )
    parser.add_argument(
        "--output",
        default="/Users/anthony/Downloads/almaholistica.com/src/data/dataset_almaholistica_ciudades.csv",
        help="Ruta destino para dataset_almaholistica_ciudades.csv"
    )
    args = parser.parse_args()

    print(f"Generando dataset de ciudades desde: {args.input}")
    print(f"Destino: {args.output}")
    generate_cities_dataset(args.input, args.output)
    validate_dataset(args.output)

