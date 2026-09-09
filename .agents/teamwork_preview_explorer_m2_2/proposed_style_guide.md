# GUÍA DE ESTILO VISUAL SÓLIDO MATE & ARQUITECTURA CERO CLS
**Proyecto**: Alma Holística (almaholistica.com)  
**Autor**: Explorer 2 (teamwork_preview_explorer_m2_2) — Matte Design System Specialist  
**Versión**: 1.0.0 — Hito M2  

---

## 1. Filosofía de Diseño: Solemne, Terapéutico y Sólido Mate

Alma Holística representa un espacio de sanación consciente, rigor terapéutico y biodescodificación profunda. A diferencia de las interfaces SaaS genéricas que abusan de transparencias efímeras, vidrios esmerilados y resplandores fluorescentes, Alma Holística fundamenta su identidad visual en la **permanencia, sobriedad y serenidad de la materia sólida**.

### Principios Fundamentales:
1. **100% Opacidad en Superficies**: Toda superficie (fondo, tarjeta, barra de navegación, menú desplegable, modal) es completamente opaca. Se prohíben categóricamente los desenfoques de fondo, transparencias intermedias y degradados desvanecidos.
2. **Jerarquía por Valor Tonal**: La profundidad y la separación de planos se construyen mediante el contraste tonal entre tres niveles de oscuridad:
   - **Nivel 0 (Fondo General)**: Abisal `#060A1A`
   - **Nivel 1 (Superficie/Tarjeta Base)**: Midnight Navy `#0A1226`
   - **Nivel 2 (Superficie Elevada/Interacción)**: Midnight Navy Intenso `#0E172F`
3. **Bordes y Delimitaciones Mates**: La estructura geométrica se define mediante líneas finas y discretas (`#1E293B` y `#1E3A5F`). Prohibido cualquier resplandor neón o efecto bioluminiscente.
4. **Claridad Funcional en Acciones**: El botón principal utiliza `#38BDF8` (Cyan suave de alto contraste), invitando a la acción terapéutica sin agresividad. Los acentos de distinción y solemnidad emplean Oro Satinado `#D4AF37` y Ámbar `#F59E0B`.
5. **Tipografía Solemne y Humanista**: Encabezados en **Cinzel** o **Playfair Display** (elegancia editorial atemporal) y cuerpo de texto en **Plus Jakarta Sans** (máxima legibilidad y calidez empática).

---

## 2. Catálogo Oficial de Tokens de Diseño

| Token Semántico | Valor Hexadecimal | Variable CSS | Clase Tailwind Sugerida | Uso y Contexto |
|---|---|---|---|---|
| **Fondo Abisal** | `#060A1A` | `--color-abyssal` | `bg-[#060A1A]` / `bg-abisal` | Fondo general de la página (`html`, `body`) |
| **Tarjeta Midnight 1** | `#0A1226` | `--color-midnight-card` | `bg-[#0A1226]` / `bg-midnight` / `.card-matte` | Tarjetas de dolencias, ciudades, Navbar base |
| **Tarjeta Midnight 2** | `#0E172F` | `--color-midnight-elevated`| `bg-[#0E172F]` / `bg-midnight-elevated` / `.card-matte-elevated` | Tarjetas destacadas, estados hover, paneles activos |
| **Borde Slate 1** | `#1E293B` | `--color-border-slate` | `border-[#1E293B]` / `border-border-slate` | Separadores, bordes de tarjetas, líneas de navegación |
| **Borde Abisal 2** | `#1E3A5F` | `--color-border-abyssal`| `border-[#1E3A5F]` / `border-border-abyssal` | Bordes en elementos elevados o seleccionados |
| **Botón Acción Cyan**| `#38BDF8` | `--color-action-cyan` | `bg-[#38BDF8]` / `bg-primary` / `.btn-action-primary` | Botón principal de agendamiento y conversión |
| **Cyan Hover** | `#0EA5E9` | `--color-action-cyan-hover` | `hover:bg-[#0EA5E9]` | Estado hover del botón principal |
| **Cyan Active** | `#0284C7` | `--color-action-cyan-active`| `active:bg-[#0284C7]` | Estado presionado del botón principal |
| **Acento Oro Satinado**| `#D4AF37` | `--color-accent-gold` | `text-[#D4AF37]` / `text-gold` / `.badge-gold` | Píldoras de categoría, iconos sagrados, estrellas |
| **Acento Ámbar** | `#F59E0B` | `--color-accent-amber` | `text-[#F59E0B]` / `text-amber` | Avisos importantes, reflexiones biológicas clave |
| **Texto Primario** | `#F8FAFC` | `--color-text-primary` | `text-slate-50` / `text-[#F8FAFC]` | Títulos, cuerpo principal, etiquetas de botones |
| **Texto Secundario** | `#94A3B8` | `--color-text-secondary` | `text-slate-400` / `text-[#94A3B8]` | Descripciones, metadatos, textos complementarios |
| **Texto Muted** | `#64748B` | `--color-text-muted` | `text-slate-500` / `text-[#64748B]` | Fechas, pies de página, disclaimers legales |

---

## 3. Matriz de Prohibiciones Estrictas (Zero Violations)

Para garantizar el cumplimiento de las auditorías automatizadas (`tests/helpers/mate_style_checker.mjs` y suites Tier 1 - Tier 5), queda **terminantemente prohibido** en cualquier archivo `.astro`, `.tsx`, `.css` o `.html`:

| Patrón Prohibido | Motivo del Veto | Alternativa Obligatoria |
|---|---|---|
| Clases de desenfoque (`back`+`drop-blur-*`) | Efecto vidrio esmerilado prohibido por especificación | Fondo sólido 100% mate: `bg-[#0A1226]` o `bg-[#060A1A]` |
| Propiedad CSS de desenfoque (`back`+`drop-filter`) | Propiedad CSS de desenfoque de fondo | Superficie opaca sin filtro |
| Opacidades parciales (`bg-`+`opacity-*` de 10 a 90) | Genera transparencias en superficies | Fondos opacos calibrados en la paleta oficial |
| Canales alfa (`rgba(..., 0.x)`) | Canales alfa transparentes en fondos o bordes | Notación hexadecimal pura de 6 dígitos (`#0A1226`) |
| Sombras bioluminiscentes (`shadow-`+`neon`, `shadow-`+`glow`) | Resplandor bioluminiscente artificial | Borde nítido discreto (`border-[#1E293B]`) o `shadow-none` |
| `w-[1200px]` o anchos fijos | Desborda pantallas móviles causando CLS | `w-full max-w-7xl mx-auto px-4 sm:px-6` |

> ⚠️ **ADVERTENCIA FORENSE**: El verificador estático `tests/helpers/mate_style_checker.mjs` analiza el contenido textual bruto de los archivos. **NUNCA escribas los identificadores prohibidos ni siquiera dentro de comentarios de código** (por ejemplo, nunca escribas comentarios con palabras clave de desenfoque o neón), ya que la expresión regular disparará una violación inmediata.


---

## 4. Reglas Preventivas para Cero CLS (Cumulative Layout Shift = 0)

Para asegurar un puntaje perfecto de 0.00 en Core Web Vitals en dispositivos móviles y de escritorio:

1. **Dimensiones Explícitas en Medios e Iconos**:
   - Todo elemento `<img />` y `<svg>` debe declarar explícitamente sus atributos `width` y `height`, o estar contenido en un contenedor con proporción fija de Tailwind (`aspect-square`, `w-11 h-11`, etc.).
   - El logo oficial de la mariposa (`logo-mariposa-con-fondo-completo.svg`) posee un `viewBox="0 0 1254 1254"` (relación 1:1). En la barra de navegación se debe renderizar con `width="44" height="44"` y clases `w-11 h-11`. En la sección Hero debe usar `w-64 h-64 sm:w-80 sm:h-80 aspect-square`.

2. **Carga Óptima de Fuentes sin FOUT ni Saltos de Texto**:
   - Google Fonts debe integrarse con `&display=swap` y doble `<link rel="preconnect">` hacia `fonts.googleapis.com` y `fonts.gstatic.com` (con `crossorigin`).
   - Las familias tipográficas deben emparejarse con fuentes genéricas de reserva (`serif` para Cinzel / Playfair Display, y `sans-serif` para Plus Jakarta Sans).

3. **Estabilidad del Scrollbar Vertical (`scrollbar-gutter: stable`)**:
   - Configurado globalmente en `html` dentro de `src/styles/global.css`. Evita el típico salto horizontal de 15 píxeles cuando una página corta redirige a una página larga con scroll vertical.

4. **Contención Responsiva Estricta**:
   - `html` y `body` definen `overflow-x: hidden; width: 100%; max-width: 100vw;`.
   - Ningún contenedor de cuadrícula o tarjeta debe sobrepasar el ancho disponible. Todos los contenedores deben responder fluidamente desde viewports de **320px** (pantallas móviles mínimas) hasta monitores ultrawide (1440px+).

5. **Aislamiento de Modales y Overlays Fuera del Flujo (Document Flow)**:
   - El modal interactivo de WhatsApp (`WhatsAppQuizModal.tsx`) debe posicionarse con `fixed inset-0 z-50`. No debe empujar ni alterar el flujo del DOM principal cuando se monta o desmonta.

---

## 5. Ejemplos Prácticos de Implementación

### A. Tarjeta de Dolencia (Biodescodificación)
```html
<article class="bg-[#0A1226] hover:bg-[#0E172F] border border-[#1E293B] hover:border-[#1E3A5F] rounded-xl p-6 transition-colors duration-200">
  <div class="flex items-center justify-between mb-4">
    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#0E172F] text-[#D4AF37] border border-[#D4AF37]/20 uppercase tracking-wider">
      Sistema Digestivo
    </span>
  </div>
  <h3 class="font-serif text-xl font-bold text-slate-100 mb-2">
    Gastritis y Reflujo
  </h3>
  <p class="text-sm text-slate-400 mb-4 line-clamp-2">
    Conflicto de indigestión emocional y situaciones inaceptables en el entorno.
  </p>
  <a
    href="/biodescodificacion/gastritis"
    class="inline-flex items-center text-sm font-semibold text-[#38BDF8] hover:text-[#7DD3FC] transition-colors"
  >
    Explorar sentido biológico →
  </a>
</article>
```

### B. Botón de Conversión CTA con Interceptación de Quiz
```html
<a
  href="https://wa.me/573000000000?text=Hola%20Alma%20Hol%C3%ADstica%2C%20deseo%20evaluar%20mi%20caso"
  data-open-quiz="true"
  data-symptom="Gastritis"
  data-city="Bogotá"
  class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-[#060A1A] font-bold text-sm tracking-wide transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
>
  <span>Iniciar Evaluación Gratuita</span>
  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
  </svg>
</a>
```
