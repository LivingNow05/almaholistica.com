# Protocolo Nocturno 3-3-3

Producto principal: USD 27. Biblioteca complementaria: USD 12. Total con complemento: USD 39. Esta carpeta contiene una demostración local; el rediseño del libro no publica el sitio ni activa cobros.

## Edición del libro · 23 de octubre de 2026

Título editorial: **Esta noche, baja el ritmo**. Identidad: Alma Holística. Fondo verde oscuro, texto marfil y acentos cálidos; alternativa clara y control para ampliar la letra. El lector presenta un capítulo por vez, con índice lateral en escritorio y desplegable en móvil. Conserva las direcciones de los capítulos y las claves de las notas guardadas.

La explicación usa tres verbos: reconoce, anota y afloja. Incluye 12 capítulos, una ruta breve, siete noches de práctica, seis casos ficticios, un cuaderno personal, dos audios y cuatro fuentes de salud. El 3-3-3 es una ayuda para recordar pasos, frases y zonas del cuerpo; no representa tres minutos ni una promesa de dormir. La guía está dirigida a adultos.

## Archivos

| Archivo | Contenido |
| --- | --- |
| `producto-digital.html` | Texto, estructura del lector, audios y formularios |
| `libro.css` | Composición, temas y adaptación móvil |
| `libro-funciones.js` | Notas, plan, exportaciones y controles de audio |
| `libro-lector.js` | Navegación por capítulos, índice móvil, temas y deshacer el borrado de una nota |
| `libro-editorial.json` | Mapa editorial de capítulos |
| `descargas/guia-protocolo-nocturno-3-3-3.pdf` | Edición nocturna: 29 páginas, tamaño Carta |
| `descargas/guia-protocolo-nocturno-impresion.pdf` | Edición clara: 29 páginas, tamaño Carta; conserva la portada oscura |
| `descargas/hojas-imprimibles-registro.pdf` | Tres hojas de trabajo A4 existentes |
| `descargas/hojas-imprimibles-registro.html` | Versión web de las hojas de trabajo |
| `descargas/transcripciones-integras-audios.txt` | Transcripciones completas de los dos audios |
| `audio/pausa-serena-madrugada-3min.m4a` | Pausa guiada de 3 minutos |
| `audio/sesion-descanso-nocturno-12min.m4a` | Recorrido guiado de 12 minutos |
| `index.html` | Presentación de la oferta y selector de complemento |
| `order-bump.html` | Biblioteca complementaria de 30 fichas |
| `ads-pack.html` | Material interno del operador |

Ambos libros PDF tienen índice con enlaces y marcadores para los 12 capítulos, ejemplos sin cortes, hojas para escribir y transcripciones completas en un anexo. Se generan desde el texto del lector con `scripts/build_nocturnal_pdf.py`, en la raíz del repositorio. Requiere Python, BeautifulSoup y ReportLab. Las fuentes locales son Baskerville y Arial; `BOOK_FONT_DIR` permite cambiar su carpeta. La edición PDF tiene composición propia y no depende de imprimir la página web.

## Notas y privacidad

El guardado está desactivado por defecto. Al activarlo, las notas permanecen sin cifrar en el navegador; no se transmiten a un servidor. La interfaz lo explica antes de marcar la casilla. Desactivar el guardado no elimina notas anteriores. Hay descargas de texto y respaldo, una opción para deshacer el borrado individual y confirmación antes de borrar todos los datos. Las claves `p333_*_v2` anteriores siguen siendo compatibles.

Los audios existentes usan voz sintética en español, identificada como tal. No se presentan como grabaciones de Vivian Velásquez. Las transcripciones del lector se conservaron sin cambios: 30 párrafos en total.

## Fuentes de salud

- NHLBI: https://www.nhlbi.nih.gov/health/insomnia/treatment
- NHLBI: https://www.nhlbi.nih.gov/health/insomnia/causes
- NHLBI: https://www.nhlbi.nih.gov/health/insomnia/diagnosis
- AASM, 2021: https://pmc.ncbi.nlm.nih.gov/articles/PMC7853203/

Las fuentes se enlazan al final del libro. Se distingue el autocuidado de un tratamiento del insomnio, se describen motivos para consultar y se evita atribuir un órgano o una emoción a una hora concreta. La guía no sustituye atención médica ni indica cambiar medicamentos.

## Verificación del rediseño

- Navegación por la portada y los 12 capítulos a 320 px: un capítulo visible por vez, sin desbordamiento horizontal.
- Revisión visual en escritorio y a 390 px; índice móvil, cambio de tema y ampliación de texto.
- Guardado de una nota de prueba, borrado y restauración mediante Deshacer. La nota de esta prueba se retiró al terminar.
- Reproducción de ambos audios; al iniciar uno, el otro se pausa. Despliegue de transcripción con texto ampliado sin desbordamiento.
- Sin errores de consola durante estas pruebas. Archivos JavaScript con sintaxis válida.
- Todos los recursos locales enlazados existen; sin identificadores HTML duplicados.
- Dos PDF de 29 páginas con 12 marcadores cada uno. Revisión visual de las páginas renderizadas y corrección de páginas sobrantes y cortes de párrafo.

La landing, el complemento, los audios y las tres hojas de trabajo no se rediseñaron en esta última intervención.
