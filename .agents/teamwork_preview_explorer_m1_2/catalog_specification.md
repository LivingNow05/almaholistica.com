# Especificación Exhaustiva del Catálogo de 45 Patologías de Biodescodificación
**Proyecto**: Alma Holística (almaholistica.com)  
**Autor**: `teamwork_preview_explorer_m1_2` (Especialista en Biodescodificación y Patologías)  
**Destino de Implementación**: `src/data/dataset_biodescodificacion_dolencias.json`  

---

## 1. Mapeo de Sistemas Corporales
El catálogo abarca exactamente 45 dolencias físicas y emocionales distribuidas en 7 sistemas corporales:
1. **Digestivo** (7 patologías): `gastritis`, `colon-irritable`, `reflujo-acidez`, `estrenimiento-cronico`, `ulcera-gastrica`, `higado-graso`, `hemorroides`.
2. **Nervioso / Emocional** (6 patologías): `ansiedad`, `insomnio`, `ataques-de-panico`, `depresion`, `bruxismo`, `angustia-opresion-pecho`.
3. **Osteoarticular** (8 patologías): `lumbalgia`, `ciatica`, `cervicalgia`, `tendinitis`, `artritis`, `artrosis`, `fibromialgia`, `hernia-discal`.
4. **Dermatológico** (6 patologías): `dermatitis`, `psoriasis`, `acne`, `alopecia`, `herpes`, `rosacea`.
5. **Respiratorio** (5 patologías): `asma`, `rinitis-alergica`, `sinusitis`, `bronquitis-cronica`, `faringitis-disfonia`.
6. **Endocrino / Metabólico** (6 patologías): `hipotiroidismo`, `hipertiroidismo`, `sobrepeso-retencion`, `resistencia-insulina`, `ovario-poliquistico`, `nodulos-tiroideos`.
7. **Inmunológico / Circulatorio** (7 patologías): `migrana`, `hipertension`, `cistitis-recurrente`, `vertigo-tinnitus`, `alergias-alimentarias`, `fatiga-cronica`, `varices-circulacion`.

**Total**: 7 + 6 + 8 + 6 + 5 + 6 + 7 = **45 patologías**.

---

## 2. Esquema de Datos Requerido (TypeScript)

```typescript
export interface FAQItem {
  pregunta: string;
  respuesta: string;
}

export interface DolenciaData {
  slug: string;
  nombre: string;
  sistema: 'Digestivo' | 'Nervioso / Emocional' | 'Osteoarticular' | 'Dermatológico' | 'Respiratorio' | 'Endocrino / Metabólico' | 'Inmunológico / Circulatorio';
  conflictoEmocional: string;
  sentidoBiologico: string;
  reprogramacion: string;
  preguntasReflexion: string[]; // Mínimo 3 preguntas
  faqs: FAQItem[];             // Mínimo 3 preguntas y respuestas
  ganchoAgendamiento: string;
}
```

---

## 3. Catálogo Completo Detallado (45 Ítems)

### SISTEMA 1: DIGESTIVO

#### 1. Gastritis (`gastritis`)
- **nombre**: Gastritis y Acidez Gástrica
- **sistema**: Digestivo
- **conflictoEmocional**: "Bocado indigesto". Situación, persona o imposición cotidiana que la persona se ve forzada a tragar o tolerar, pero que le resulta inaceptable, humillante o profundamente irritante. Rabia impotente contenida ante una realidad familiar o laboral contraria a sus valores.
- **sentidoBiologico**: Hipersecreción de ácido clorhídrico en la mucosa gástrica para descomponer con máxima rapidez ese bocado tóxico o inaceptable que el individuo siente atrapado en su estómago.
- **reprogramacion**: "Acepto lo que no puedo cambiar de inmediato y decido digerir mis experiencias a mi propio ritmo. Elijo expresar mi inconformidad con calma o apartarme de aquello que vulnera mi paz mental."
- **preguntasReflexion**:
  1. "¿Qué situación, persona o comentario reciente te viste obligado a tolerar y aún sientes que te quema por dentro?"
  2. "¿Qué rencor o frustración estás reteniendo en silencio en lugar de comunicarlo o establecer un límite claro?"
  3. "¿Qué pasaría si dejas de intentar controlar las conductas ajenas y te enfocas en cuidar tu bienestar emocional?"
- **faqs**:
  1. pregunta: "¿Por qué la gastritis empeora en momentos de alta tensión laboral o conflictos familiares?"
     respuesta: "El estómago reacciona inmediatamente al estrés emocional segregando ácidos gástricos defensivos; la percepción de 'tragar injusticias' reactiva el ciclo inflamatorio."
  2. pregunta: "¿La biodescodificación sustituye el tratamiento médico o la dieta gástrica?"
     respuesta: "No; los fármacos y la nutrición protegen la mucosa física, mientras que la biodescodificación aborda y desactiva el detonante emocional inconsciente."
  3. pregunta: "¿Qué cambio actitudinal ayuda a desactivar la gastritis según la bioneuroemoción?"
     respuesta: "Aprender a verbalizar discrepancias a tiempo, dejar de acumular quejas silenciosas y no obligarse a convivir con dinámicas tóxicas."
- **ganchoAgendamiento**: "¿Sientes que una situación o persona te está quemando por dentro? Agenda tu sesión de evaluación para identificar el bocado emocional que tu estómago no logra digerir y sanar desde la raíz."

#### 2. Colon Irritable (SII) (`colon-irritable`)
- **nombre**: Colon Irritable (Síndrome de Intestino Irritable)
- **sistema**: Digestivo
- **conflictoEmocional**: "Jugarreta sucia, traición o cochinada". Vivencia de decepción desgarradora, abuso de confianza o humillación por parte de seres queridos o socios. Oscilación entre querer expulsar urgentemente la afrenta (diarrea) o retener el control por miedo a perder (estreñimiento).
- **sentidoBiologico**: En fase de diarrea, acelerar el peristaltismo para evacuar la inmundicia emocional sin demora; en estreñimiento, retener para exprimir hasta la última gota de seguridad y afecto en un contexto hostil.
- **reprogramacion**: "Me libero de las ofensas del pasado y suelto lo que no me pertenece. Mi integridad no depende de los agravios ajenos; elijo vivir ligero y confiar en el fluir de la vida."
- **preguntasReflexion**:
  1. "¿Qué jugada baja, desleal o traición has vivido recientemente que aún te produce repulsión visceral?"
  2. "¿En qué áreas de tu vida mantienes un hipercontrol rígido por temor a que vuelvan a lastimarte o defraudarte?"
  3. "¿De qué resentimientos o memorias amargas te resistes a desprenderte por miedo a quedar desprotegido?"
- **faqs**:
  1. pregunta: "¿Por qué el colon irritable se asocia tan estrechamente con la ansiedad?"
     respuesta: "El eje intestino-cerebro refleja directamente la alerta del sistema nervioso ante la sospecha continua de traición o desamparo en el entorno íntimo."
  2. pregunta: "¿Qué significa si predomina la diarrea frente al estreñimiento?"
     respuesta: "La diarrea refleja una urgencia instintiva de expulsar una vivencia intolerable; el estreñimiento señala miedo a soltar y necesidad de aferrarse a lo conocido."
  3. pregunta: "¿Cómo ayuda la biodescodificación en el Síndrome de Intestino Irritable?"
     respuesta: "Ayuda a resignificar y cerrar el episodio de traición para que el intestino deje de responder con espasmos defensivos ante cualquier tensión."
- **ganchoAgendamiento**: "¿Cansado de que tu colon reaccione con espasmos a cualquier disgusto o situación estresante? Descubre el conflicto inconsciente detrás de tu SII en una sesión personalizada."

#### 3. Reflujo Gastroesofágico y Acidez (`reflujo-acidez`)
- **nombre**: Reflujo Gastroesofágico y Regurgitación
- **sistema**: Digestivo
- **conflictoEmocional**: "No querer tragar algo que ya fue forzado hacia adentro". Deseo vehemente de devolver, vomitar o rechazar una orden, exigencia, crítica o imposición que se tragó por sumisión pero que la conciencia repudia visceralmente.
- **sentidoBiologico**: Apertura adaptativa del esfínter cardias esofágico para permitir que el contenido gástrico ascienda y sea devuelto antes de ingresar definitivamente al organismo.
- **reprogramacion**: "Tengo el derecho inalienable de decidir qué permito entrar en mi vida. Escucho mi propia voz y digo 'no' con firmeza y amor, sin necesidad de tragar lo que me lastima."
- **preguntasReflexion**:
  1. "¿Qué exigencia, imposición o trato aceptaste recientemente que tu cuerpo ahora pugna por devolver?"
  2. "¿A qué figura de autoridad temes decirle 'basta' o 'no estoy dispuesto a tolerar esto'?"
  3. "¿En qué momento silenciaste tu indignación para no generar discordia a costa de tu dignidad?"
- **faqs**:
  1. pregunta: "¿Por qué el reflujo suele agudizarse durante el descanso nocturno?"
     respuesta: "Al relajarse la mente consciente por la noche, el inconsciente procesa los agravios tolerados durante el día y abre el cardias intentando expulsar lo impuesto."
  2. pregunta: "¿La alimentación ácida o grasa es la única causa del reflujo?"
     respuesta: "Los alimentos irritan la mucosa, pero el tono muscular del esfínter responde primordialmente a reflejos neurovegetativos vinculados a la sumisión forzada."
  3. pregunta: "¿Qué ocurre cuando la persona aprende a fijar límites asertivos?"
     respuesta: "Al manifestar su verdad en tiempo real, desaparece la necesidad biológica de regurgitar simbólicamente los sucesos tolerados."
- **ganchoAgendamiento**: "¿Tu cuerpo está intentando devolver lo que no te atreves a decir con palabras? Da el primer paso hacia tu bienestar emocional y digestivo reservando tu sesión de diagnóstico."

#### 4. Estreñimiento Crónico (`estrenimiento-cronico`)
- **nombre**: Estreñimiento Crónico
- **sistema**: Digestivo
- **conflictoEmocional**: Miedo atávico a la escasez, retención tenaz del pasado y resistencia a soltar. Aferramiento a recuerdos, bienes materiales, rencores o vínculos obsoletos por pánico a quedarse sin nada o a la indigencia emocional.
- **sentidoBiologico**: Retener el bolo fecal al máximo en el colon distal para absorber hasta la última gota de humedad y nutrientes ante una señal arcaica de sequía o hambruna prolongada.
- **reprogramacion**: "Confío plenamente en la provisión generosa del universo. Suelto lo viejo con gratitud para dar bienvenida a lo nuevo; la vida siempre me sustenta y es seguro dejar ir."
- **preguntasReflexion**:
  1. "¿Qué agravio, posesión o relación caduca sigues reteniendo con fuerza por miedo al vacío o a la soledad?"
  2. "¿Vives con el temor constante de que te falte dinero, afecto o seguridad si te permites soltar el control?"
  3. "¿Qué sucedería si confiaras en que el porvenir te proveerá de todo lo necesario para prosperar?"
- **faqs**:
  1. pregunta: "¿Puede el estreñimiento originarse en etapas tempranas de la infancia?"
     respuesta: "Sí; con frecuencia se gesta durante el control de esfínteres si el niño experimentó humillación, castigos o falta de contención segura para soltar."
  2. pregunta: "¿Por qué el consumo abundante de fibra o laxantes no resuelve el estreñimiento de raíz?"
     respuesta: "Porque mientras el sistema nervioso autónomo mantenga activa la orden subconsciente de 'retener por supervivencia', el colon frenará el tránsito."
  3. pregunta: "¿Cómo desbloquea la terapia holística el tránsito intestinal?"
     respuesta: "Al desarticular las creencias inconscientes de escasez y desconfianza, permitiendo que el cuerpo recupere el ritmo natural de evacuación."
- **ganchoAgendamiento**: "¿Sientes que te cuesta soltar y tu cuerpo se aferra a retener? Transforma el miedo al desapego en profunda confianza en tu sesión inicial de biodescodificación."

#### 5. Úlcera Gástrica (`ulcera-gastrica`)
- **nombre**: Úlcera Gástrica y Duodenal
- **sistema**: Digestivo
- **conflictoEmocional**: Conflicto de territorio y rencor agudo dentro del círculo familiar o laboral. Sensación de haber sido despojado o agredido en el propio espacio con una indignación silenciosa e impotente que 'corroe' el interior.
- **sentidoBiologico**: Ulcerar la curvatura menor gástrica o el bulbo duodenal durante la fase activa para ampliar la luz del conducto digestivo y facilitar la huida o defensa territorial.
- **reprogramacion**: "Reclamo y habito mi territorio con serenidad y madurez. Ningún evento externo tiene el poder de corroer mi paz interior; elijo perdonar y pacificar mi entorno."
- **preguntasReflexion**:
  1. "¿Quién invadió tu espacio íntimo, tu rol o tu autoridad provocando una rabia feroz que no has exteriorizado?"
  2. "¿Qué disputa económica o familiar sientes que te carcome las entrañas día tras día?"
  3. "¿A quién necesitas perdonar o qué límite necesitas establecer para dejar de herirte a ti mismo?"
- **faqs**:
  1. pregunta: "¿Qué función cumple Helicobacter pylori según la biodescodificación?"
     respuesta: "Es una bacteria simbiótica que interviene en la fase de curación biológica para reconstruir el tejido ulcerado una vez superado el estrés territorial."
  2. pregunta: "¿Por qué la úlcera duele con mayor intensidad cuando el estómago está vacío?"
     respuesta: "Biológicamente, la ausencia de alimento enfoca toda la atención neurovegetativa en la necesidad urgente de resolver la disputa territorial pendiente."
  3. pregunta: "¿Cómo se frena la tendencia ulcerosa?"
     respuesta: "Clarificando las fronteras del territorio personal, renunciando a la venganza amarga y asumiendo una postura comunicativa no violenta."
- **ganchoAgendamiento**: "¿Una rabia silenciosa te está carcomiendo por dentro? Transmuta el rencor acumulado en paz y alivio duradero agendando tu sesión de biodescodificación."

#### 6. Hígado Graso (`higado-graso`)
- **nombre**: Hígado Graso (Esteatosis Hepática)
- **sistema**: Digestivo
- **conflictoEmocional**: Pánico a la carencia extrema, a morir de hambre o a que la familia quede desamparada en la ruina. Acumulación desesperada de reservas ante la convicción profunda de que sobrevendrán tiempos de miseria.
- **sentidoBiologico**: Sobrecargar los hepatocitos con gotas lipídicas para crear una despensa metabólica colosal que asegure la supervivencia biológica durante una hambruna prolongada.
- **reprogramacion**: "El universo es abundante y mis necesidades siempre están cubiertas. Suelto el pánico a la pobreza y reconozco mi capacidad creadora de recursos."
- **preguntasReflexion**:
  1. "¿Viviste tú o tus ancestros una quiebra económica, ruina o carencia severa que temes repetir a toda costa?"
  2. "¿Cargas con la responsabilidad asfixiante de ser el único sostén material y temes que todo colapse?"
  3. "¿De qué manera estás acumulando provisiones físicas y emocionales por miedo al desabastecimiento futuro?"
- **faqs**:
  1. pregunta: "¿El hígado graso puede manifestarse sin consumo excesivo de alcohol ni grasas?"
     respuesta: "Sí; la esteatosis hepática no alcohólica es muy común en personas con patrones de angustia financiera o lealtades a memorias familiares de hambre."
  2. pregunta: "¿Qué simboliza el hígado en la medicina psicosomática?"
     respuesta: "Es el laboratorio vital de la supervivencia, depositario de la confianza en la provisión material y la erradicación del miedo a la indigencia."
  3. pregunta: "¿Qué paso interior facilita la regeneración hepática?"
     respuesta: "Sanar la relación con el dinero, disolver mandatos transgeneracionales de penuria y confiar en el propio valor productivo."
- **ganchoAgendamiento**: "¿Vives con el miedo inconsciente a que los recursos no alcancen para ti o tu familia? Descodifica las memorias de escasez en tu sesión de evaluación."

#### 7. Hemorroides (`hemorroides`)
- **nombre**: Hemorroides y Congestión Rectal
- **sistema**: Digestivo
- **conflictoEmocional**: Presión asfixiante por definir el propio lugar o identidad ('¿dónde me siento? ¿cuál es mi posición?'). Sentirse acorralado entre dos elecciones o presionado a cumplir con un plazo forzoso contra la propia voluntad.
- **sentidoBiologico**: Congestionar y dilatar el plexo venoso hemorroidal para ensanchar el esfínter anal y facilitar la expulsión de heces o la marcación rápida del territorio en una postura de sumisión.
- **reprogramacion**: "Ocupo mi lugar legítimo en la vida con total seguridad y dignidad. No tengo que demostrar nada bajo coacción; honro mis tiempos y mis decisiones."
- **preguntasReflexion**:
  1. "¿Sientes que en tu familia o entorno laboral te presionan a tomar una decisión trascendental contra tu voluntad?"
  2. "¿En qué situación sientes que tu rol no es respetado o que no sabes exactamente cuál es tu lugar?"
  3. "¿Qué ultimátum o fecha límite estás viviendo con una angustia contenida inmensa?"
- **faqs**:
  1. pregunta: "¿Por qué las hemorroides afloran a menudo tras mudanzas o cambios de puesto de trabajo?"
     respuesta: "Porque esas transiciones cuestionan de forma directa el 'asiento' territorial y simbólico del individuo en su grupo social."
  2. pregunta: "¿El sedentarismo es la causa fundamental de las hemorroides?"
     respuesta: "El sedentarismo favorece la congestión vascular mecánica, pero el tono vascular hemorroidal responde al conflicto de indefinición territorial."
  3. pregunta: "¿Cómo remitir el malestar hemorroidal desde la mente?"
     respuesta: "Fijando una postura firme ante las presiones externas y decidiendo sin culpa qué lugar se desea ocupar en cada relación."
- **ganchoAgendamiento**: "¿Sientes una presión abrumadora por encajar o definir tu lugar en el mundo? Encuentra alivio y claridad profunda en tu sesión de evaluación personalizada."

---

### SISTEMA 2: NERVIOSO / EMOCIONAL

#### 8. Ansiedad Generalizada (`ansiedad`)
- **nombre**: Ansiedad Generalizada y Preocupación Crónica
- **sistema**: Nervioso / Emocional
- **conflictoEmocional**: Miedo visceral al futuro, anticipación continua de desgracias y desconexión del instante presente. Sensación de peligro inminente y vulnerabilidad, usualmente arraigada en una infancia con figuras parentales impredecibles o ausentes.
- **sentidoBiologico**: Mantener el sistema simpático y el eje HPA en alerta máxima continua para responder en milésimas de segundo ante un depredador que la mente cree oculto.
- **reprogramacion**: "Aquí y ahora estoy a salvo y en paz. Habito el momento presente; confío plenamente en mi capacidad de resolver cada situación paso a paso."
- **preguntasReflexion**:
  1. "¿De qué catástrofe imaginaria intentas protegerte al habitar obsesivamente en los escenarios del futuro?"
  2. "¿Qué episodio doloroso de tu pasado temes desesperadamente que se repita en tu vida actual?"
  3. "¿Cómo sería tu día a día si decidieras confiar en que dispondrás de los recursos necesarios cuando los desafíos lleguen?"
- **faqs**:
  1. pregunta: "¿Por qué la ansiedad genera pensamientos intrusivos y catastróficos incontrolables?"
     respuesta: "El cerebro primitivo interpreta el mundo como una selva hostil; el escaneo mental de peligros busca evitar que seas tomado desprevenido."
  2. pregunta: "¿Es posible desactivar la respuesta de alarma del sistema nervioso?"
     respuesta: "Sí; sanando la vivencia original de desamparo y reentrenando la fisiología a través del anclaje somático y la coherencia emocional."
  3. pregunta: "¿La biodescodificación sustituye el tratamiento psiquiátrico de la ansiedad?"
     respuesta: "No; trabaja en complementariedad, permitiendo desactivar la causa biográfica e inconsciente mientras se mantiene el apoyo clínico correspondiente."
- **ganchoAgendamiento**: "¿Tu mente no se apaga y vive advirtiéndote de amenazas futuras? Calma tu sistema nervioso desde la raíz agendando tu sesión de diagnóstico."

#### 9. Insomnio Crónico (`insomnio`)
- **nombre**: Insomnio y Trastornos del Sueño
- **sistema**: Nervioso / Emocional
- **conflictoEmocional**: "Es peligroso bajar la guardia". Culpa reprimida, hiperresponsabilidad protectora o miedo inconsciente a morir, ser atacado o perder el control mientras se duerme. Creencia de que si uno descansa, una tragedia le ocurrirá a la familia.
- **sentidoBiologico**: Estado de vigilia del centinela de la tribu: vigilar el campamento e impedir que un depredador nocturno devore a los miembros vulnerables de la manada.
- **reprogramacion**: "Es completamente seguro soltar el control y descansar en paz. Delego el cuidado del mundo mientras duermo; la noche regenera mi espíritu y confío en la protección de la vida."
- **preguntasReflexion**:
  1. "¿A quién crees que debes vigilar o sostener incansablemente para evitar que algo malo suceda en tu hogar?"
  2. "¿Qué culpa, pendiente o remordimiento se apodera de tus pensamientos apenas tocas la almohada?"
  3. "¿Qué mandato recibiste en tu niñez respecto a relajarte, descansar o mostrarte vulnerable?"
- **faqs**:
  1. pregunta: "¿Qué significado tiene despertarse con regularidad a las 3:00 de la madrugada?"
     respuesta: "En la medicina tradicional china y bioneuroemoción coincide con el horario del meridiano del hígado, vinculado a cóleras silenciadas o frustraciones acumuladas."
  2. pregunta: "¿Por qué los inductores del sueño suelen perder eficacia con el tiempo?"
     respuesta: "Porque sedan la química cerebral superficial pero no apagan la orden biológica profunda de vigilancia nocturna que emite el inconsciente."
  3. pregunta: "¿Qué práctica nocturna ayuda a conciliar el sueño profundo?"
     respuesta: "Realizar un cierre formal del día, agradecer lo vivido y declarar explícitamente a la mente que la guardia ha concluido hasta el amanecer."
- **ganchoAgendamiento**: "¿Tu mente se rehúsa a descansar por el mandato inconsciente de vigilarlo todo? Recupera un sueño profundo y reparador en tu sesión de biodescodificación."

#### 10. Ataques de Pánico (`ataques-de-panico`)
- **nombre**: Ataques de Pánico y Crisis de Angustia
- **sistema**: Nervioso / Emocional
- **conflictoEmocional**: Terror arcaico a la asfixia, a la muerte súbita o a perder la cordura. Quiebre de un régimen de hipercontrol y complacencia extrema donde el individuo reprimió sus anhelos auténticos durante años hasta que el cuerpo estalla en rebeldía.
- **sentidoBiologico**: Descarga masiva de catecolaminas para provocar una huida urgente de un entorno existencial que el inconsciente considera letal para la supervivencia del alma.
- **reprogramacion**: "Escucho con compasión el llamado de libertad de mi cuerpo. Me permito ser auténtico, suelto las máscaras y elijo una vida fiel a mi verdad."
- **preguntasReflexion**:
  1. "¿De qué relación, empleo o situación sofocante tu ser necesita escapar urgentemente?"
  2. "¿Cuánto tiempo llevas silenciando tus necesidades genuinas para no defraudar a los demás?"
  3. "¿Qué sucedería si te concedieras el permiso de ser imperfecto, pedir ayuda y decir 'no puedo más'?"
- **faqs**:
  1. pregunta: "¿Por qué el ataque de pánico sobreviene de improvisto sin causa inmediata aparente?"
     respuesta: "Porque no responde a un estímulo lógico del momento, sino a la saturación acumulada de una represión emocional que desborda el sistema nervioso."
  2. pregunta: "¿Puede una crisis de pánico desencadenar un infarto real?"
     respuesta: "No causa daño orgánico al corazón, pues se trata de una aceleración adaptativa; sin embargo, la vivencia subjetiva es de peligro extremo."
  3. pregunta: "¿Cómo erradica la biodescodificación las crisis de pánico?"
     respuesta: "Identificando la situación insostenible que se tolera y guiando a la persona a tomar las decisiones vitales postergadas por temor."
- **ganchoAgendamiento**: "¿Tu cuerpo te exige un cambio a través de crisis de pánico? Decodifica el mensaje oculto de tu angustia y recupera tu calma en consulta."

#### 11. Depresión y Vacío Emocional (`depresion`)
- **nombre**: Depresión, Apatía y Pérdida de Sentido
- **sistema**: Nervioso / Emocional
- **conflictoEmocional**: Pérdida irreparable de territorio (laboral, amoroso, identitario) acompañada de resignación profunda. Indignación y rabia que, al no poder ser expresadas hacia afuera por impotencia, son redirigidas contra uno mismo en forma de desánimo.
- **sentidoBiologico**: Desconexión metabólica deliberada para replegarse en la madriguera, reducir el gasto calórico y no librar un combate que se sabe perdido de antemano.
- **reprogramacion**: "Acepto el cierre de este ciclo y abro mis brazos a la renovación de mi vida. Mi valor es indestructible; encuentro un nuevo y luminoso propósito en mi amor propio."
- **preguntasReflexion**:
  1. "¿Qué ilusión, estatus o ser querido perdiste y sientes que jamás podrás compensar o recuperar?"
  2. "¿Hacia quién va dirigida en el fondo la rabia que hoy conviertes en reproches hacia ti mismo?"
  3. "¿Qué pasión o deseo genuino sacrificaste para encajar en el molde que tu clan te impuso?"
- **faqs**:
  1. pregunta: "¿La biodescodificación contradice el desbalance químico cerebral de la depresión?"
     respuesta: "No; los neurotransmisores cambian según la interpretación y el significado subjetivo que el cerebro atribuye a sus derrotas y duelos no resueltos."
  2. pregunta: "¿Cómo superar la pesadumbre y la falta de motivación?"
     respuesta: "Procesando el duelo postergado, dando cauce constructivo a la rabia contenida y reanudando pequeños actos cotidianos de disfrute personal."
  3. pregunta: "¿Es seguro trabajar la depresión en sesiones de biodescodificación?"
     respuesta: "Es un abordaje complementario valioso que aporta sentido existencial y desbloquea el dolor biográfico, siempre coordinado con la atención de salud mental."
- **ganchoAgendamiento**: "¿Sientes que has perdido la chispa y el sentido para seguir adelante? Permítenos acompañarte a encender de nuevo tu vitalidad en una sesión diagnóstica."

#### 12. Bruxismo (`bruxismo`)
- **nombre**: Bruxismo y Tensión Mandibular
- **sistema**: Nervioso / Emocional
- **conflictoEmocional**: "Ira y mordaza contenida". Deseo reprimido de atacar verbalmente, morder, replicar o poner límites tajantes a una figura dominante, bloqueado por miedo a represalias o al rechazo social.
- **sentidoBiologico**: Tonificar los músculos maseteros y desgastar los dientes para disponer de un filo más cortante y eficaz en el combate nocturno simbólico.
- **reprogramacion**: "Expreso mis desacuerdos con claridad, serenidad y contundencia en el momento oportuno. Suelto la mordaza; mi voz es legítima y respetada."
- **preguntasReflexion**:
  1. "¿A quién te quedaste con deseos de 'morder' o responder con fuerza y te callaste por sumisión o cortesía?"
  2. "¿Qué verdades incómodas estás apretando entre tus dientes cada noche mientras duermes?"
  3. "¿En qué contexto sientes que tienes prohibido manifestar tu desacuerdo o defenderte?"
- **faqs**:
  1. pregunta: "¿Por qué las placas o férulas dentales no eliminan el bruxismo?"
     respuesta: "Porque amortiguan el desgaste mecánico del esmalte dental, pero la orden subconsciente de apretar y atacar continúa activa en los músculos masticatorios."
  2. pregunta: "¿Qué diferencia existe entre el bruxismo diurno y el nocturno?"
     respuesta: "El diurno evidencia un esfuerzo de autocontrol consciente ('aprieto y aguanto'); el nocturno es la liberación del instinto defensivo reprimido durante el sueño."
  3. pregunta: "¿Qué práctica ayuda a distender la mandíbula?"
     respuesta: "Escribir cartas de desahogo volcando toda la rabia no dicha (para luego quemarlas) y practicar masajes miofasciales verbalizando la verdad."
- **ganchoAgendamiento**: "¿Despiertas con dolor en la mandíbula o cuello por apretar los dientes de rabia? Libera las palabras no dichas en tu sesión personalizada de evaluación."

#### 13. Angustia y Opresión en el Pecho (`angustia-opresion-pecho`)
- **nombre**: Angustia, Opresión Torácica y Nudo en la Garganta
- **sistema**: Nervioso / Emocional
- **conflictoEmocional**: Sensación de asfixia vital, tristeza inconsolable y falta de espacio para respirar libremente en el entorno familiar o de pareja. Vivencia de estar encerrado en una jaula afectiva donde se sacrifican los anhelos más sagrados.
- **sentidoBiologico**: Espasmo protector del diafragma y la musculatura torácica para blindar el corazón y los pulmones ante un dolor desgarrador que amenaza desmoronar el ser.
- **reprogramacion**: "Inhalo la plenitud y la libertad de la existencia. Mi corazón se expande sin temor; es seguro habitar mi espacio y amar con libertad."
- **preguntasReflexion**:
  1. "¿Qué relación afectiva o entorno familiar sientes que te roba el aire y te quita la libertad de ser tú?"
  2. "¿Qué tristeza honda y antigua no te has permitido llorar y sientes clavada en el centro de tu pecho?"
  3. "¿Qué necesitas dejar ir para poder respirar hondo de nuevo sin sentir ahogo o culpa?"
- **faqs**:
  1. pregunta: "¿Cómo saber si la opresión torácica no es un problema del corazón?"
     respuesta: "Siempre se debe realizar primero una evaluación médica y electrocardiográfica de urgencia; al descartar patología coronaria, la causa es psicoemocional."
  2. pregunta: "¿Por qué el nudo en la garganta acompaña a menudo la opresión del pecho?"
     respuesta: "Porque refleja el bloqueo conjunto del llanto que pugna por salir y de las palabras de dolor que la persona no se atreve a pronunciar."
  3. pregunta: "¿Cómo se libera el diafragma bloqueado?"
     respuesta: "A través de ejercicios respiratorios somáticos conscientes, expresión del llanto contenido y el establecimiento de límites a dinámicas invasivas."
- **ganchoAgendamiento**: "¿Sientes una losa pesada sobre tu pecho que te impide respirar en paz? Encuentra alivio, comprensión y desahogo en tu sesión inicial de valoración."

---

### SISTEMA 3: OSTEOARTICULAR

#### 14. Lumbalgia y Dolor Lumbar (`lumbalgia`)
- **nombre**: Lumbalgia y Dolor de Espalda Baja
- **sistema**: Osteoarticular
- **conflictoEmocional**: "Conflicto de desvalorización material y quiebre de los cimientos". Inseguridad financiera aguda, pánico a no poder sostener a la familia económicamente o sensación de soportar todo el peso del hogar sin el apoyo de nadie.
- **sentidoBiologico**: En fase activa se produce desmineralización ósea para alertar de la sobrecarga; en fase de curación, la inflamación y contractura buscan reforzar la columna para que soporte un peso mayor.
- **reprogramacion**: "Soy plenamente capaz de sustentar mi vida y el universo respalda mis pasos. Pido apoyo con naturalidad y me libero de la ilusión de que todo depende de mí."
- **preguntasReflexion**:
  1. "¿Qué carga material o económica sientes que estás soportando en completa soledad sobre tu espalda?"
  2. "¿En qué momento sentiste que se desmoronaba la estabilidad o la seguridad financiera de tu vida?"
  3. "¿Por qué te resulta tan difícil delegar responsabilidades y confiar en la ayuda de quienes te rodean?"
- **faqs**:
  1. pregunta: "¿Por qué la lumbalgia suele detonarse con un movimiento insignificante?"
     respuesta: "El esfuerzo físico es solo el disparador sobre una musculatura paravertebral previamente contracturada por semanas de estrés económico crónico."
  2. pregunta: "¿Qué significan las vértebras L4 y L5 en biodescodificación?"
     respuesta: "Representan la desvalorización ante las normas familiares, el conflicto de sostén con la pareja y la sensación de no ser suficientemente competente."
  3. pregunta: "¿Qué actitud mental acelera el alivio del dolor lumbar?"
     respuesta: "Aceptar el apoyo externo, soltar el rol de mártir proveedor y confiar en que la solvencia material es fruto de la serenidad y el trabajo colaborativo."
- **ganchoAgendamiento**: "¿Sientes que el peso del dinero o las responsabilidades familiares te están doblando la espalda? Alivia tu lumbalgia descubriendo su causa raíz en consulta."

#### 15. Ciática / Nervio Ciático (`ciatica`)
- **nombre**: Ciática y Neuralgia del Nervio Ciático
- **sistema**: Osteoarticular
- **conflictoEmocional**: "Resistencia a avanzar en una dirección impuesta o miedo a dar el próximo paso". Sentirse obligado a dirigirse hacia un lugar, trabajo o situación que repugna al alma, o pánico a dar el paso hacia la independencia por miedo a la ruina.
- **sentidoBiologico**: Paralizar la marcha mediante un dolor punzante e invalidante en la pierna para impedir que el cuerpo se desplace hacia donde la conciencia no desea ir.
- **reprogramacion**: "Camino con valor y determinación hacia mi auténtico destino. Elijo mis propios pasos en libertad; el camino de mi corazón es próspero y seguro."
- **preguntasReflexion**:
  1. "¿Hacia qué trabajo, compromiso o lugar estás acudiendo forzado, sintiendo que te traicionas a ti mismo?"
  2. "¿Qué decisión trascendental de cambio estás postergando por temor a perder la seguridad económica?"
  3. "¿En qué pierna experimentas el dolor y qué ámbito de tu vida (laboral o afectivo) se siente frenado?"
- **faqs**:
  1. pregunta: "¿Qué indica si la ciática afecta la pierna derecha o la pierna izquierda?"
     respuesta: "En personas diestras, la pierna derecha se vincula al trabajo, proyectos y dinero; la pierna izquierda al hogar, los afectos y la protección familiar."
  2. pregunta: "¿El reposo físico en cama es suficiente para curar la ciática?"
     respuesta: "Mitiga la inflamación aguda del nervio, pero si no se resuelve la resistencia psicológica al camino transitado, el dolor reaparece al caminar."
  3. pregunta: "¿Qué destraba el nervio ciático a nivel psicoemocional?"
     respuesta: "Tomar una determinación valiente sobre el rumbo vital que se desea emprender y negarse a caminar por obligación bajo presiones ajenas."
- **ganchoAgendamiento**: "¿Un dolor paralizante en tu pierna frena tus pasos? Descubre qué decisión o rumbo estás resistiendo en tu sesión de evaluación inicial."

#### 16. Cervicalgia y Dolor de Cuello (`cervicalgia`)
- **nombre**: Cervicalgia y Rigidez de Cuello
- **sistema**: Osteoarticular
- **conflictoEmocional**: Inflexibilidad intelectual y discordia profunda entre la razón y el corazón. Resistencia tozuda a considerar otros puntos de vista, o sensación de estar forzado a 'bajar la cabeza' ante una autoridad despótica.
- **sentidoBiologico**: Contractura férrea de la musculatura cervical para inmovilizar la cabeza e impedir agacharse en señal de sumisión o mirar una realidad dolorosa.
- **reprogramacion**: "Soy flexible y abierto en mis pensamientos. Concilio la sabiduría de mi mente con los latidos de mi corazón; miro el mundo con comprensión y humildad."
- **preguntasReflexion**:
  1. "¿Qué verdad o perspectiva ajena te niegas tercamente a escuchar por orgullo intelectual?"
  2. "¿Ante qué persona o imposición sientes que te obligan a bajar la cabeza con humillación?"
  3. "¿Qué contradicción desgarradora existe hoy entre lo que crees que 'debes hacer' y lo que anhelas?"
- **faqs**:
  1. pregunta: "¿Por qué el dolor de cuello suele irradiar hacia los hombros y trapecios?"
     respuesta: "Porque los trapecios son los músculos que sostienen simbólicamente las cargas morales y las culpas impuestas por los demás."
  2. pregunta: "¿Qué simbolizan las vértebras cervicales superiores (C1-C3)?"
     respuesta: "Están íntimamente ligadas a la comunicación, el silencio obligado y el temor a que una palabra nuestra rompa la armonía familiar."
  3. pregunta: "¿Cómo disolver la rigidez cervical desde la bioneuroemoción?"
     respuesta: "Reconociendo que no siempre se puede tener la razón, aceptando los propios límites y permitiendo que la vida fluya con mayor ligereza."
- **ganchoAgendamiento**: "¿Tu cuello está rígido por la lucha entre tu mente y tus verdaderos sentimientos? Recupera tu movilidad y paz interior en tu sesión personalizada."

#### 17. Tendinitis (`tendinitis`)
- **nombre**: Tendinitis y Dolor Tendinoso
- **sistema**: Osteoarticular
- **conflictoEmocional**: "Conflicto de acción impedida o desvalorización en el gesto". Sentirse frenado bruscamente en la ejecución de un proyecto, o sentirse juzgado e incompetente en una destreza laboral, artística o deportiva específica.
- **sentidoBiologico**: Inflamar el tendón para multiplicar la irrigación sanguínea y engrosar las fibras de colágeno ante la creencia inconsciente de que la acción realizada fue insuficiente.
- **reprogramacion**: "Valoro con orgullo mis capacidades y talentos. Realizo mis labores con alegría y serenidad, libre de la necesidad de demostrar mi valía a los demás."
- **preguntasReflexion**:
  1. "¿En qué tarea, meta o pasión sentiste que te frenaron de golpe o criticaron duramente tu labor?"
  2. "¿Te exiges una perfección desmedida al punto de sentir frustración crónica con tus resultados?"
  3. "¿Qué acción o responsabilidad cotidiana ejecutas con un profundo desgano y resistencia interior?"
- **faqs**:
  1. pregunta: "¿Por qué la tendinitis del hombro (manguito rotador) es tan habitual?"
     respuesta: "Porque el hombro simboliza la capacidad de abrazar o empujar; se afecta cuando no se puede proteger a un ser querido o se empuja una carga colosal."
  2. pregunta: "¿Por qué la tendinitis se cronifica a pesar de guardar reposo?"
     respuesta: "Porque al reanudar la labor física, la persona retoma la misma actitud interna de autoexigencia implacable o rencor hacia las demandas laborales."
  3. pregunta: "¿Qué ayuda al tendón a desinflamarse definitivamente?"
     respuesta: "Reconocer la propia suficiencia, disfrutar del quehacer diario sin buscar aprobación externa y aprender a decir 'hasta aquí llego'."
- **ganchoAgendamiento**: "¿Tus tendones duelen por exigirte más allá de tus fuerzas? Desactiva la autoexigencia que inflama tu cuerpo en tu sesión de diagnóstico."

#### 18. Artritis Reumatoide (`artritis`)
- **nombre**: Artritis Reumatoide e Inflamación Articular
- **sistema**: Osteoarticular
- **conflictoEmocional**: Autocrítica despiadada, rigidez moral implacable y rencor contra la propia debilidad. Existencia de un 'juez interno' severísimo que desaprueba cualquier fallo; agresividad vuelta contra las propias articulaciones.
- **sentidoBiologico**: Inflamar y deformar las articulaciones para impedir que las manos o pies sigan ejecutando acciones que el tribunal interior sanciona con culpa destructiva.
- **reprogramacion**: "Me acepto con infinita ternura y compasión. Me libero del perfeccionismo y del autocastigo; elijo la flexibilidad y celebro mi humanidad."
- **preguntasReflexion**:
  1. "¿Con qué dureza e intolerancia te censuras cada vez que cometes una equivocación?"
  2. "¿Qué figura moral de tu infancia te enseñó que equivocarse era un pecado o una vergüenza imperdonable?"
  3. "¿Qué parte de tu vitalidad o placer espontáneo sacrificaste para encajar en el ideal del 'hijo o persona perfecta'?"
- **faqs**:
  1. pregunta: "¿Cuál es la diferencia entre artritis y artrosis en biodescodificación?"
     respuesta: "La artritis es inflamación aguda nacida de la rabia y el juicio constante; la artrosis es desgaste pasivo por resignación prolongada durante décadas."
  2. pregunta: "¿Cómo se explica el ataque autoinmune en la artritis reumatoide?"
     respuesta: "El sistema inmune ataca el propio tejido cartilaginoso en perfecta resonancia con la voz mental que descalifica y agrede al propio ser."
  3. pregunta: "¿Puede la terapia holística mejorar la inflamación articular?"
     respuesta: "Al desarticular la culpa inconsciente y adoptar una mirada compasiva hacia uno mismo, los brotes inflamatorios pierden su impulso somático."
- **ganchoAgendamiento**: "¿Tu cuerpo se inflama por la condena de un juez interior implacable? Encuentra el alivio de la autocompasión y la sanación en tu sesión inicial."

#### 19. Artrosis (`artrosis`)
- **nombre**: Artrosis y Desgaste Cartilaginoso
- **sistema**: Osteoarticular
- **conflictoEmocional**: Desgaste vital por sentirse explotado, poco valorado y resignado a una rutina árida. Sensación de haber sacrificado la vida entera por los demás sin recibir afecto, perdiendo la amortiguación del disfrute cotidiano.
- **sentidoBiologico**: Desgastar el cartílago para fusionar o estabilizar la articulación en una postura de mínima resistencia tras años de esfuerzos estériles.
- **reprogramacion**: "Merezco descanso, valoración y gozo. Regenero mi entusiasmo por la existencia y me brindo a mí mismo el cuidado que siempre reservé a los otros."
- **preguntasReflexion**:
  1. "¿En qué obligaciones familiares o laborales sientes que te has desgastado hasta el agotamiento sin reconocimiento?"
  2. "¿Dónde quedó tu tiempo de disfrute, ocio y juego en medio de tus deberes cotidianos?"
  3. "¿Qué sacrificio diario estás preparado para soltar hoy para proteger tu salud y vitalidad?"
- **faqs**:
  1. pregunta: "¿La artrosis es simplemente una consecuencia inevitable del envejecimiento?"
     respuesta: "La edad es un factor biológico, pero la ubicación exacta del desgaste (rodilla, cadera, dedos) refleja con precisión las cargas emocionales crónicas."
  2. pregunta: "¿Qué significa la artrosis de rodilla en bioneuroemoción?"
     respuesta: "Indica un conflicto de sumisión forzada: haber tenido que 'arrodillarse' simbólicamente durante años ante un cónyuge o superior dominante."
  3. pregunta: "¿Es posible frenar el avance de la artrosis desde la mente?"
     respuesta: "Sí; al modificar la postura sumisa y recuperar el placer en la vida diaria, disminuye la sobrecarga y la fricción psicosomática articular."
- **ganchoAgendamiento**: "¿Tus articulaciones perdieron su amortiguación tras años de sacrificarte por otros? Es tiempo de priorizarte: agenda tu sesión diagnóstica."

#### 20. Fibromialgia (`fibromialgia`)
- **nombre**: Fibromialgia y Dolor Crónico Generalizado
- **sistema**: Osteoarticular
- **conflictoEmocional**: "Doble atadura y lealtad familiar destructiva". Vivir en dilemas donde haga lo que haga se pierde: sentirse obligado a sostener a la familia pero queriendo huir, o creer que ser feliz traiciona el sufrimiento de los antepasados.
- **sentidoBiologico**: Espasmo doloroso generalizado para inmovilizar al ser cuando cualquier movimiento o decisión se evalúa inconscientemente como mortal o traición al clan.
- **reprogramacion**: "Tengo derecho a existir por mí mismo y a ser plenamente feliz. Me libero de las culpas familiares; es seguro moverme hacia mis propios sueños."
- **preguntasReflexion**:
  1. "¿Qué mandato paradójico te paraliza: sentir que si te cuidas defraudas a tu clan, pero si te sacrificas te destruyes?"
  2. "¿Cuánto dolor emocional no llorado has guardado en tus fibras musculares a lo largo de tu vida?"
  3. "¿Qué pasaría si te declararas libre de salvar o sostener los problemas de tus seres queridos?"
- **faqs**:
  1. pregunta: "¿Por qué la fibromialgia abarca puntos de dolor tan dispersos en todo el cuerpo?"
     respuesta: "Porque el conflicto de desvalorización y lealtad familiar abarca todas las funciones motrices y relacionales del individuo en su clan."
  2. pregunta: "¿A qué se debe la niebla mental asociada a la fibromialgia?"
     respuesta: "Es una estrategia neurobiológica de desconexión para atenuar el sufrimiento que genera vivir en una contradicción emocional irresoluble."
  3. pregunta: "¿Puede remitir el dolor de la fibromialgia mediante biodescodificación?"
     respuesta: "Sí; al cortar con las lealtades invisibles tóxicas y asumir la soberanía sobre la propia vida, los dolores neuromusculares disminuyen radicalmente."
- **ganchoAgendamiento**: "¿Vives con un dolor en todo tu cuerpo que la medicina convencional no logra resolver? Descifra el mensaje de tu fibromialgia en consulta."

#### 21. Hernia Discal (`hernia-discal`)
- **nombre**: Hernia Discal y Protrusión Vertebral
- **sistema**: Osteoarticular
- **conflictoEmocional**: "Ruptura del amortiguador vital bajo una presión colosal". Sentimiento de que la estructura básica de la vida se quiebra por una carga económica o moral insostenible, en medio de una soledad y desamparo extremos.
- **sentidoBiologico**: El núcleo pulposo sale de su anillo para forzar la inmovilización absoluta ante la alerta de que la compresión sobre la columna ha superado el límite seguro.
- **reprogramacion**: "Reconozco y respeto mis límites sagrados. Suelto las cargas ajenas; reconstruyo mi seguridad sobre pilares de dignidad, autocuidado y amor."
- **preguntasReflexion**:
  1. "¿Qué situación abrumadora te aplastó emocionalmente justo antes de que apareciera el dolor de la hernia?"
  2. "¿A quién sentías la obligación de sostener sobre tus hombros para evitar una catástrofe familiar?"
  3. "¿Qué límites debiste establecer hace mucho tiempo y no te atreviste por temor a ser rechazado o juzgado?"
- **faqs**:
  1. pregunta: "¿Por qué la hernia lumbosacra (L5-S1) es la más frecuente de todas?"
     respuesta: "Porque el espacio L5-S1 representa la unión entre la desvalorización laboral/financiera (L5) y el arraigo en los mandatos sagrados del clan (S1)."
  2. pregunta: "¿Toda hernia de disco requiere indefectiblemente intervención quirúrgica?"
     respuesta: "Muchas protrusiones y hernias se reabsorben de manera espontánea cuando cesa la hiperpresión muscular ocasionada por el estrés vivencial de base."
  3. pregunta: "¿Qué postura interior previene futuras recaídas discales?"
     respuesta: "Establecer límites estrictos a las demandas familiares, renunciar al rol de salvador y cuidar el descanso corporal sin sentir culpa."
- **ganchoAgendamiento**: "¿Sientes que una sobrecarga insoportable quebró la columna de tu vida? Aprende a reconstruir tu soporte y bienestar en tu sesión de evaluación."

---

### SISTEMA 4: DERMATOLÓGICO

#### 22. Dermatitis / Eczema (`dermatitis`)
- **nombre**: Dermatitis Atópica y Eczema
- **sistema**: Dermatológico
- **conflictoEmocional**: "Conflicto de separación desgarradora o contacto no deseado". Ruptura abrupta del contacto físico o afectivo con un ser querido ('me arrancaron de su caricia') o padecer un contacto desagradable o contaminante que causa rechazo.
- **sentidoBiologico**: En fase activa, micro-ulcerar la epidermis para adormecer la sensibilidad táctil y no sentir el dolor de la ausencia; en curación, enrojecimiento y prurito para reconstruir el tejido.
- **reprogramacion**: "Permanezco unido al amor universal en todo momento. Me siento protegido y seguro en mi propia piel; establezco fronteras suaves y firmes con el mundo."
- **preguntasReflexion**:
  1. "¿De qué persona amada te sentiste apartado o desconectado antes de que surgiera el brote en tu piel?"
  2. "¿Qué contacto, cercanía o presencia en tu entorno cotidiano te produce repulsión o fastidio?"
  3. "¿Cómo viviste las caricias y la contención afectiva durante tu niñez temprana?"
- **faqs**:
  1. pregunta: "¿Por qué el eczema produce un picor tan desesperante e irresistible?"
     respuesta: "El prurito es el reclamo instintivo de la piel que demanda atención y contacto amoroso, o el reflejo de querer 'rascarse' para quitarse un roce molesto."
  2. pregunta: "¿Por qué la dermatitis atópica es tan frecuente en bebés y niños pequeños?"
     respuesta: "Porque los pequeños somatizan directamente las angustias de separación de la madre (como la reincorporación al trabajo o crisis conyugales)."
  3. pregunta: "¿Qué permite que los brotes de dermatitis se calmen definitivamente?"
     respuesta: "Reestablecer un entorno afectivo seguro, procesar las pérdidas o separaciones sin angustia y reconciliarse con la propia vulnerabilidad."
- **ganchoAgendamiento**: "¿Tu piel refleja el anhelo de un abrazo o el dolor de una separación no resuelta? Sana la raíz emocional de tu dermatitis en tu sesión diagnóstica."

#### 23. Psoriasis (`psoriasis`)
- **nombre**: Psoriasis y Placas Escamosas
- **sistema**: Dermatológico
- **conflictoEmocional**: Doble conflicto de separación y agresión: "Anhelo cercanía y cariño, pero me aterra que al abrirme me vuelvan a herir". Fabricación de una coraza escamosa para aislarse del juicio hostil del entorno.
- **sentidoBiologico**: Multiplicar exponencialmente las capas de queratinocitos dérmicos para erigir un 'escudo protector' sobre las partes del cuerpo más expuestas a los golpes del exterior.
- **reprogramacion**: "Es seguro mostrarme vulnerable y recibir el amor auténtico. Sé protegerme con asertividad sin necesidad de construir armaduras sobre mi piel."
- **preguntasReflexion**:
  1. "¿A quién quisieras abrazar pero te contienes porque en el pasado te lastimó profundamente?"
  2. "¿De qué mirada juzgadora o agresión externa sientes que debes protegerte con un escudo?"
  3. "¿En qué momentos te sientes más vulnerable y expuesto ante los demás?"
- **faqs**:
  1. pregunta: "¿Por qué la psoriasis se instala comúnmente en codos y rodillas?"
     respuesta: "Los codos representan la defensa del propio espacio en el trabajo; las rodillas, la resistencia a arrodillarse o someterse ante imposiciones ajenas."
  2. pregunta: "¿Existe un trasfondo transgeneracional en la psoriasis?"
     respuesta: "A menudo refleja memorias familiares de abusos, agresiones físicas o rechazos brutales en los vínculos afectivos que no fueron sanados."
  3. pregunta: "¿Cómo ayuda la biodescodificación a suavizar las placas de psoriasis?"
     respuesta: "Al erradicar el miedo a la intimidad y al juicio, el cuerpo comprende que ya no necesita una coraza biológica para estar a salvo."
- **ganchoAgendamiento**: "¿Tu piel levantó un escudo de escamas para no volver a ser lastimada? Desactiva el conflicto de tu psoriasis en tu sesión de evaluación personalizada."

#### 24. Acné (`acne`)
- **nombre**: Acné Juvenil y del Adulto
- **sistema**: Dermatológico
- **conflictoEmocional**: "Conflicto de mancha, rechazo estético y desvalorización de la propia imagen". Sentirse juzgado, inadecuado, sucio o avergonzado por la propia apariencia, la sexualidad naciente o la exposición ante el grupo social.
- **sentidoBiologico**: Producir inflamación y pus en las glándulas sebáceas para engrosar la dermis y proteger el rostro ante la percepción de que la propia imagen está siendo atacada.
- **reprogramacion**: "Me reconozco valioso, limpio y digno de amor tal como soy. Abrazo mi autenticidad con orgullo; mi belleza radica en mi esencia sincera."
- **preguntasReflexion**:
  1. "¿En qué momento te sentiste rechazado, burlado o juzgado por tu apariencia física?"
  2. "¿Qué vergüenza o tabú guardas respecto a tus deseos, tu cuerpo o tu manera de expresarte?"
  3. "¿Ante la mirada de qué persona sientes una necesidad constante de ocultar tu rostro o tus imperfecciones?"
- **faqs**:
  1. pregunta: "¿Por qué el acné rebrota en adultos de 30 o 40 años?"
     respuesta: "Porque el conflicto de 'sentirse atacado o juzgado en la propia imagen' se reactiva en entornos de alta exigencia laboral o crisis de pareja."
  2. pregunta: "¿Cuál es el rol de las hormonas en el acné según la bioneuroemoción?"
     respuesta: "Las hormonas despiertan la madurez sexual; si ese despertar se vive con culpa o miedo a la desaprobación social, la piel responde con inflamación."
  3. pregunta: "¿Qué actitud promueve la sanación del rostro?"
     respuesta: "Dejar de buscar la aprobación externa, amarse en el espejo sin juicio y liberarse de la tiranía de la perfección física."
- **ganchoAgendamiento**: "¿Los brotes de acné reflejan tus inseguridades o heridas de rechazo? Desbloquea la causa profunda de tu piel en tu sesión de diagnóstico."

#### 25. Alopecia y Caída del Cabello (`alopecia`)
- **nombre**: Alopecia y Pérdida Difusa del Cabello
- **sistema**: Dermatológico
- **conflictoEmocional**: "Pérdida de amparo superior, desgarro del vínculo paterno o desvalorización intelectual". Sentirse despojado de protección, autoridad o reconocimiento por parte de quien cubría la cabeza (padre, jefe o guía).
- **sentidoBiologico**: Aligerar el peso y calor de la cabeza tras un estrés intelectual desmedido, o somatizar la pérdida de la corona de protección y pertenencia familiar.
- **reprogramacion**: "Permanezco conectado con mi sabiduría intrínseca y la protección de la vida. Soy mi propia autoridad; camino seguro y confiado de mis capacidades."
- **preguntasReflexion**:
  1. "¿Qué figura protectora o de autoridad perdiste poco antes de que tu cabello comenzara a caer?"
  2. "¿En qué situación sentiste que se burlaban de tu inteligencia o cuestionaban tu liderazgo?"
  3. "¿Qué culpa cargas por sentir que no estuviste a la altura de las expectativas que otros tenían de ti?"
- **faqs**:
  1. pregunta: "¿Qué simboliza la alopecia areata (en parches circulares definidos)?"
     respuesta: "Representa un shock súbito de separación donde la persona sintió que le arrancaban de golpe un vínculo de contención y amparo vital."
  2. pregunta: "¿El estrés por el trabajo o exámenes desencadena directamente la caída?"
     respuesta: "Sí, en especial cuando involucra el terror a perder la reputación, el estatus profesional o la consideración de los iguales."
  3. pregunta: "¿Puede el folículo piloso volver a brotar tras la terapia bioemocional?"
     respuesta: "Al erradicar la sensación de desamparo y recuperar la seguridad en el propio valor, los folículos suelen retomar su ciclo biológico de crecimiento."
- **ganchoAgendamiento**: "¿Sientes que has perdido tu fuerza o la protección de quien te cuidaba? Comprende la caída de tu cabello desde su raíz en tu sesión personalizada."

#### 26. Herpes Labial y Zóster (`herpes`)
- **nombre**: Herpes Labial y Herpes Zóster
- **sistema**: Dermatológico
- **conflictoEmocional**: "Beso sucio, traición afectiva o mancha en la intimidad". En herpes labial: haber recibido o deseado un contacto desagradable o con reproche. En herpes zóster: sensación de haber sido apuñalado por la espalda o atacado en el cinturón de la intimidad.
- **sentidoBiologico**: Reparación inflamatoria en las terminaciones nerviosas sensoriales de la dermis para restaurar la integridad del territorio íntimo tras una traición desleal.
- **reprogramacion**: "Limpio mi memoria de todo contacto engañoso. Mi intimidad es sagrada y elijo relacionarme desde el respeto, la verdad y la transparencia."
- **preguntasReflexion**:
  1. "¿Qué contacto o conversación desagradable tuviste que mantener en contra de tus principios?"
  2. "¿Quién te traicionó o habló mal de ti a tus espaldas en tu círculo más cercano?"
  3. "¿Qué palabras cargadas de ira o secretos incómodos están quemando tus labios o tu piel?"
- **faqs**:
  1. pregunta: "¿Por qué el virus del herpes permanece latente en los ganglios nerviosos?"
     respuesta: "Porque resguarda la memoria celular del conflicto; cualquier episodio futuro que evoque la misma decepción o traición reactiva el brote."
  2. pregunta: "¿Por qué el herpes zóster sigue estrictamente el trayecto de un nervio (metámera)?"
     respuesta: "Porque afecta de manera quirúrgica la vía sensorial que registró el impacto biológico de la 'puñalada metafórica' en esa franja corporal."
  3. pregunta: "¿Cómo evitar que el herpes labial reaparezca continuamente?"
     respuesta: "Siendo coherente con los afectos, no besando ni aceptando cercanía por compromiso social y manifestando la verdad sin reservas."
- **ganchoAgendamiento**: "¿Tus brotes de herpes reaparecen tras vivir situaciones de decepción o traición? Sana la memoria de tu piel en tu sesión inicial de biodescodificación."

#### 27. Rosácea (`rosacea`)
- **nombre**: Rosácea y Enrojecimiento Facial
- **sistema**: Dermatológico
- **conflictoEmocional**: "Vergüenza, pudor herido y miedo a la exposición pública". Temor a ser juzgado como incompetente, indigno o débil ante la mirada de los demás; bochorno crónico por el pánico atávico a ser descubierto o señalado por el clan.
- **sentidoBiologico**: Vasodilatación masiva de la red capilar facial para disipar el calor de la vergüenza y advertir al grupo de la vulnerabilidad sin entrar en combate.
- **reprogramacion**: "Me presento ante el mundo con serenidad y orgullo. No tengo nada que ocultar; mi rostro refleja la nobleza, sinceridad y pureza de mi ser."
- **preguntasReflexion**:
  1. "¿Qué episodio del pasado te hizo sentir una vergüenza pública tan honda que aún te sonroja evocarlo?"
  2. "¿Qué defecto o debilidad temes que los demás descubran al mirarte a los ojos?"
  3. "¿Por qué sientes la exigencia asfixiante de mantener una imagen perfecta e intachable en todo momento?"
- **faqs**:
  1. pregunta: "¿Por qué la rosácea empeora con el sol, el estrés o las bebidas calientes?"
     respuesta: "Porque cualquier estímulo que eleva la temperatura corporal activa de inmediato el circuito somático preexistente de la vergüenza y la hiperreactividad capilar."
  2. pregunta: "¿Qué perfil emocional suele presentar la persona con rosácea?"
     respuesta: "Suelen ser personas con una alta autoexigencia social, muy sensibles a las opiniones ajenas y con un profundo temor al ridículo."
  3. pregunta: "¿Cómo alivia la biodescodificación el ardor facial?"
     respuesta: "Desactivando la herida de humillación original y permitiendo que la persona se sienta digna y cómoda siendo el centro de atención tal como es."
- **ganchoAgendamiento**: "¿Tu rostro arde por el temor al juicio o a la mirada de los demás? Libera la vergüenza y recupera tu calma en tu sesión de evaluación diagnóstica."

---

### SISTEMA 5: RESPIRATORIO

#### 28. Asma Bronquial (`asma`)
- **nombre**: Asma Bronquial y Dificultad Respiratoria
- **sistema**: Respiratorio
- **conflictoEmocional**: "Amenaza en el territorio, ambiente sofocante y peleas familiares". Sensación de asfixia por sobreprotección o por disputas constantes entre los padres en el hogar, donde la persona siente que no hay espacio ni aire para existir con autonomía.
- **sentidoBiologico**: Broncoespasmo de la musculatura lisa bronquial para restringir la entrada de un aire que el inconsciente evalúa como hostil o peligroso en el nido vital.
- **reprogramacion**: "Inhalo la vida con gozo y plenitud. Mi espacio vital es seguro, puro y pacífico; tengo pleno derecho a respirar mi propio aliento y a vivir con libertad."
- **preguntasReflexion**:
  1. "¿Qué clima de discusión o violencia en tu hogar te hace sentir que te falta el aire para subsistir?"
  2. "¿Quién ejerce sobre ti un control tan invasivo que sientes que pierdes tu propia autonomía?"
  3. "¿Qué emoción intensa estás conteniendo para no provocar una ruptura o estallido en tu entorno?"
- **faqs**:
  1. pregunta: "¿Por qué el asma comienza habitualmente en la infancia temprana?"
     respuesta: "Porque los niños inhalan directamente el clima emocional de la casa; las tensiones silenciosas de los padres se somatizan en sus vías respiratorias."
  2. pregunta: "¿Qué simboliza la dificultad para expulsar el aire durante la crisis asmática?"
     respuesta: "Indica miedo a soltar la vida o una retención desesperada del aire ante la convicción subconsciente de que la siguiente bocanada no estará disponible."
  3. pregunta: "¿Cómo ayuda el enfoque de bioneuroemoción en el paciente asmático?"
     respuesta: "Favorece la delimitación de un territorio libre de conflictos, permitiendo que los bronquios se relajen de forma sostenida y duradera."
- **ganchoAgendamiento**: "¿Sientes que el ambiente que te rodea te asfixia y no puedes respirar en paz? Encuentra tu espacio y tu aliento en tu sesión de evaluación."

#### 29. Rinitis Alérgica (`rinitis-alergica`)
- **nombre**: Rinitis Alérgica y Congestión Nasal
- **sistema**: Respiratorio
- **conflictoEmocional**: "Conflicto de algo que huele mal o amenaza en el ambiente". Anticipación de un peligro inminente que se 'olfatea' en el entorno, o memoria anclada a un trauma vivido en presencia de un elemento natural (polen, polvo, pelo animal).
- **sentidoBiologico**: Hipersecreción de moco nasal y estornudos violentos para arrastrar y expulsar al agresor olfatorio, impidiendo la entrada de información peligrosa.
- **reprogramacion**: "El mundo es un lugar seguro para mí. Me libero de las memorias de peligro del pasado; respiro la pureza del presente con confianza y tranquilidad."
- **preguntasReflexion**:
  1. "¿Qué situación familiar o laboral 'te huele muy mal' y sientes que no puedes evitarla?"
  2. "¿Qué vivencia dolorosa o discusión viviste en la estación del año en la que tu alergia se agrava?"
  3. "¿A qué individuo o circunstancia sientes que eres 'alérgico' por la tensión que te provoca su presencia?"
- **faqs**:
  1. pregunta: "¿Por qué el polen o el pelo de gato provocan alergia solo en ciertas personas?"
     respuesta: "Porque el alérgeno no es el enemigo biológico; es el estímulo sensorial que el cerebro asoció a un instante de miedo, choque o dolor en el pasado."
  2. pregunta: "¿Qué función biológica cumplen los estornudos en salva?"
     respuesta: "Constituyen un mecanismo arcaico de expulsión urgente para arrojar fuera del organismo cualquier vestigio de una presencia amenazante."
  3. pregunta: "¿Se puede desactivar una alergia estacional reprogramando la emoción?"
     respuesta: "Sí; al localizar el impacto emocional original y desvincular el alérgeno del recuerdo de peligro, la mucosa nasal recupera su equilibrio."
- **ganchoAgendamiento**: "¿Cansado de estornudar ante la menor brisa o cambio de estación? Descodifica la causa oculta de tu rinitis alérgica en consulta."

#### 30. Sinusitis Crónica (`sinusitis`)
- **nombre**: Sinusitis Crónica y Dolor Sinusal
- **sistema**: Respiratorio
- **conflictoEmocional**: "Peligro que acecha a la vuelta de la esquina y desconfianza en el aire". Sospecha de que alguien cercano trama una jugada desleal a espaldas nuestras; tensión por una mentira que se percibe pero que no se puede ventilar abiertamente.
- **sentidoBiologico**: Llenar los senos paranasales de moco defensivo para incrementar la superficie receptora y amortiguar el aire sospechoso que se inhala en el territorio.
- **reprogramacion**: "Despejo mi mente de desconfianzas infundadas. Discierno la verdad con serenidad; confío en mi claridad y respiro la pureza de mi camino."
- **preguntasReflexion**:
  1. "¿Qué secreto o engaño sospechas que se te oculta en tu círculo familiar o profesional?"
  2. "¿A qué persona sientes que debes vigilar de cerca porque temes una traición imprevista?"
  3. "¿Qué pesadumbre en tu cabeza te impide respirar la frescura de nuevos proyectos con ilusión?"
- **faqs**:
  1. pregunta: "¿Por qué la sinusitis produce una sensación tan intensa de pesadez frontal?"
     respuesta: "Porque la congestión de los senos frontales refleja el esfuerzo mental constante de 'olfatear la trampa' y anticipar la amenaza del entorno."
  2. pregunta: "¿Por qué los antibióticos a veces solo alivian temporalmente la sinusitis?"
     respuesta: "Porque eliminan la sobreinfección bacteriana, pero si la persona continúa respirando un clima de sospecha, la inflamación de la mucosa persiste."
  3. pregunta: "¿Qué permite drenar los senos paranasales según la bioneuroemoción?"
     respuesta: "Abordar frontalmente las dudas con las personas involucradas y disolver las conjeturas mediante una comunicación transparente."
- **ganchoAgendamiento**: "¿Sientes una presión constante en tu rostro por sospechas y tensiones no resueltas? Despeja tus senos nasales y tu mente en tu sesión diagnóstica."

#### 31. Bronquitis Crónica (`bronquitis-cronica`)
- **nombre**: Bronquitis Crónica y Tos Persistente
- **sistema**: Respiratorio
- **conflictoEmocional**: "Disputas territoriales constantes y gritos en el hogar". Sentirse invadido en el propio espacio vital y verse forzado a 'ladrar' (toser) para defender las fronteras familiares o laborales frente a agresores cotidianos.
- **sentidoBiologico**: Ulcerar la mucosa bronquial para ampliar el diámetro de las vías respiratorias y captar mayor volumen de oxígeno para el combate territorial; en curación, tos productiva.
- **reprogramacion**: "Mi hogar es un santuario de armonía. Delimito mi espacio con tranquilidad y firmeza; no necesito gritar ni defenderme para ser valorado y respetado."
- **preguntasReflexion**:
  1. "¿Qué discusiones constantes o gritos en tu casa te fuerzan a estar permanentemente a la defensiva?"
  2. "¿Quién vulnera los límites de tus espacios, tus bienes o tus decisiones individuales?"
  3. "¿Qué queja o reclamo airado estás reprimiendo y transformando en accesos de tos?"
- **faqs**:
  1. pregunta: "¿Por qué la bronquitis se acompaña de tos espasmódica continua?"
     respuesta: "La tos es el correlato biológico del ladrido de guardia: una señal acústica refleja para advertir al intruso que debe desalojar el territorio."
  2. pregunta: "¿El tabaco o el frío son los únicos causantes de la bronquitis?"
     respuesta: "Son irritantes físicos que debilitan las defensas locales, pero la susceptibilidad biológica surge del conflicto de invasión y disputa territorial."
  3. pregunta: "¿Cómo apaciguar la irritación bronquial?"
     respuesta: "Estableciendo acuerdos de convivencia saludables, tomando distancia de personas conflictivas y fomentando un entorno pacífico."
- **ganchoAgendamiento**: "¿La tos persistente no te deja vivir en armonía con tu entorno? Descubre qué disputa territorial está irritando tus bronquios en consulta."

#### 32. Faringitis y Pérdida de Voz / Disfonía (`faringitis-disfonia`)
- **nombre**: Faringitis, Laringitis y Afonía
- **sistema**: Respiratorio
- **conflictoEmocional**: "Palabras atragantadas, verdades amargas silenciadas y miedo a hablar". Miedo a las consecuencias nefastas de decir lo que se piensa, o haberse quedado 'mudo' de asombro y dolor ante un impacto emocional devastador.
- **sentidoBiologico**: Inflamar la laringe o inmovilizar las cuerdas vocales para impedir la salida de un sonido que el inconsciente considera que provocaría la destrucción de los vínculos.
- **reprogramacion**: "Mi voz es sagrada, digna y constructiva. Expreso mis sentimientos con dulzura, verdad y valentía; es seguro comunicarme con el mundo."
- **preguntasReflexion**:
  1. "¿Qué verdad crucial te callaste para evitar un conflicto destructivo o el abandono de los tuyos?"
  2. "¿Qué noticia o revelación traumática te dejó literalmente 'sin habla' o con un nudo en la garganta?"
  3. "¿A quién sientes que tienes estrictamente prohibido responder o contradecir?"
- **faqs**:
  1. pregunta: "¿Por qué la pérdida de voz suele manifestarse tras una discusión intensa?"
     respuesta: "Durante la disputa se contiene la emoción máxima; al cesar el altercado, la laringe entra en fase de reparación biológica provocando la disfonía."
  2. pregunta: "¿Qué diferencia existe entre faringitis y laringitis?"
     respuesta: "La faringe procesa el 'tragar' la amargura de lo recibido; la laringe gestiona el 'miedo en el territorio' y la capacidad de expresar la propia voz."
  3. pregunta: "¿Cómo recuperar la claridad de la voz según la biodescodificación?"
     respuesta: "Escribiendo o verbalizando en un espacio seguro todo lo que se reprimió, reconociendo el derecho sagrado a manifestar el propio criterio."
- **ganchoAgendamiento**: "¿Tu garganta se cierra y pierdes la voz cuando más necesitas expresar tu sentir? Libera las palabras atragantadas en tu sesión inicial de valoración."

---

### SISTEMA 6: ENDOCRINO / METABÓLICO

#### 33. Hipotiroidismo (`hipotiroidismo`)
- **nombre**: Hipotiroidismo y Lentitud Metabólica
- **sistema**: Endocrino / Metabólico
- **conflictoEmocional**: "El tiempo pasa demasiado veloz y no alcanzo a llegar; desearía que el tiempo se detuviese". Sensación de impotencia ante el ritmo vertiginoso de la vida, sumisión pasiva ante decisiones ajenas y renuncia a la propia iniciativa.
- **sentidoBiologico**: Reducir la síntesis de tiroxina y triyodotironina para desacelerar el reloj metabólico, ahorrando energía y ralentizando el paso biológico del tiempo.
- **reprogramacion**: "Soy dueño de mi propio tiempo. Me muevo a mi ritmo perfecto con serenidad; el tiempo es mi aliado y siempre dispongo del espacio para florecer."
- **preguntasReflexion**:
  1. "¿En qué momento de tu vida sentiste que el tiempo se escapaba de tus manos sin poder atrapar tus metas?"
  2. "¿A qué persona esperas pasivamente para que te conceda autorización de vivir a tu manera?"
  3. "¿Por qué sientes la obligación de acelerar continuamente para complacer las demandas de los demás?"
- **faqs**:
  1. pregunta: "¿Por qué el hipotiroidismo ocasiona letargo, cansancio y frío corporal?"
     respuesta: "Al desacelerar el metabolismo celular para 'frenar el tiempo', el organismo minimiza el gasto energético y disminuye la termogénesis basal."
  2. pregunta: "¿Puede normalizarse la tiroides trabajando el estrés del tiempo?"
     respuesta: "Sí; cuando la persona reorganiza su ritmo de vida, delega urgencias ajenas y retoma su propio paso, la demanda tiroidea se equilibra."
  3. pregunta: "¿Qué relación guarda el hipotiroidismo con la sumisión?"
     respuesta: "Es habitual en personas que bajaron los brazos ante imposiciones dominantes de su entorno, sintiendo que no vale la pena luchar contra la corriente."
- **ganchoAgendamiento**: "¿Sientes que la vida te exige correr sin tregua y tu cuerpo decidió frenar? Reconcíliate con tu propio tiempo y energía en tu sesión de diagnóstico."

#### 34. Hipertiroidismo (`hipertiroidismo`)
- **nombre**: Hipertiroidismo y Aceleración Metabólica
- **sistema**: Endocrino / Metabólico
- **conflictoEmocional**: "Urgencia extrema de atrapar una oportunidad crucial o escapar de un peligro; ¡tengo que ser más rápido que todos!". Angustia permanente por llegar tarde o temor a que si no se actúa a toda velocidad ocurrirá una tragedia.
- **sentidoBiologico**: Sobreestimular la producción hormonal tiroidea para acelerar el metabolismo al máximo, movilizando reservas calóricas y otorgando una velocidad motriz superior.
- **reprogramacion**: "Estoy en armonía con el ritmo perfecto del universo. Lo que me pertenece llegará en su momento propicio; elijo actuar desde la calma y la paz interior."
- **preguntasReflexion**:
  1. "¿Qué oportunidad vital o laboral sentiste que perdiste en el pasado por haber actuado con lentitud?"
  2. "¿Por qué vives con una sensación incesante de emergencia, como si cada minuto fuera de vida o muerte?"
  3. "¿De qué referente aprendiste que tu valor dependía de estar siempre activo y a la carrera?"
- **faqs**:
  1. pregunta: "¿Por qué el hipertiroidismo genera taquicardia, sudoración y temblores?"
     respuesta: "El organismo entra en un estado hiperadrenérgico prolongado, preparándose físicamente para una carrera a toda velocidad por la supervivencia."
  2. pregunta: "¿Cuál es el contraste emocional clave entre hipotiroidismo e hipertiroidismo?"
     respuesta: "El hipotiroidismo busca 'detener el reloj' por impotencia y cansancio; el hipertiroidismo busca 'acelerar el reloj' por urgencia extrema de atrapar algo."
  3. pregunta: "¿Cómo apaciguar una tiroides hiperactiva desde las emociones?"
     respuesta: "Practicando la paciencia consciente, comprendiendo que los procesos requieren maduración y abandonando la creencia de que la lentitud equivale a fracaso."
- **ganchoAgendamiento**: "¿Vives con el motor acelerado temiendo llegar tarde a tu propia vida? Aprende a serenar tu tiroides y recuperar tu paz en consulta."

#### 35. Sobrepeso y Retención de Líquidos (`sobrepeso-retencion`)
- **nombre**: Sobrepeso, Obesidad y Retención de Líquidos
- **sistema**: Endocrino / Metabólico
- **conflictoEmocional**: "Conflicto del pez fuera del agua (desamparo / abandono) y necesidad de armadura física". Sentirse desprotegido, atacado o humillado; el cuerpo responde acumulando grasa como escudo contra las agresiones y reteniendo agua para no morir en el desierto emocional.
- **sentidoBiologico**: Retención de agua en los túbulos colectores renales para resistir la sequía del abandono; desarrollo de tejido adiposo para lucir más voluminoso y disuadir agresores.
- **reprogramacion**: "Habito un cuerpo seguro, protegido y amado. No requiero escudos de grasa ni líquidos retenidos para cuidarme; me nutro de amor y me permito ser visible."
- **preguntasReflexion**:
  1. "¿Qué agresión, burla o humillación viviste que te hizo sentir que tu cuerpo necesitaba una coraza para resistir?"
  2. "¿En qué etapa sentiste un desamparo tan absoluto que te percibiste completamente solo en el mundo?"
  3. "¿A qué temes que ocurra si recuperas un cuerpo ligero y completamente visible ante los demás?"
- **faqs**:
  1. pregunta: "¿Por qué las dietas estrictas detonan el efecto rebote si no se trabaja el conflicto emocional?"
     respuesta: "Porque la restricción de comida reactiva el pánico arcaico a la hambruna y a la carencia, ordenando al cuerpo almacenar el doble de grasa en cuanto haya ingesta."
  2. pregunta: "¿Qué rol cumplen los túbulos colectores renales en el aumento súbito de peso?"
     respuesta: "Ante el conflicto de abandono o desarraigo, los riñones retienen litros de agua en cuestión de días, elevando drásticamente el peso en la báscula."
  3. pregunta: "¿Cómo se disuelve la orden biológica del sobrepeso?"
     respuesta: "Sanando la herida primordial de desamparo, construyendo un entorno seguro y desactivando la necesidad subconsciente de blindarse o pasar desapercibido."
- **ganchoAgendamiento**: "¿Luchas contra el sobrepeso sin comprender por qué tu cuerpo se rehúsa a soltar? Descubre la armadura emocional de tu peso en tu sesión inicial."

#### 36. Resistencia a la Insulina y Diabetes Tipo 2 (`resistencia-insulina`)
- **nombre**: Resistencia a la Insulina y Diabetes Tipo 2
- **sistema**: Endocrino / Metabólico
- **conflictoEmocional**: "Resistencia al afecto y combate permanente en el territorio". Vivir en un clima de frialdad emocional, traición o conflicto continuo donde 'la dulzura es peligrosa'; guardar el azúcar en el torrente para nutrir a los músculos ante una batalla inevitable.
- **sentidoBiologico**: Mantener concentraciones elevadas de glucosa en sangre bloqueando su ingreso a las células musculares, para asegurar energía de uso inmediato durante el combate.
- **reprogramacion**: "Abro las puertas de mi corazón a la ternura y a la dulzura de vivir. Es seguro recibir cariño y afecto; vivo en paz y reconozco la bondad en mi derredor."
- **preguntasReflexion**:
  1. "¿Qué traición o herida afectiva te llevó a endurecerte y a desconfiar de las muestras de cariño?"
  2. "¿En qué momento sentiste que la dulzura y la calidez del hogar se apagaron de golpe en tu vida?"
  3. "¿Contra qué situación o persona sientes que debes permanecer en guardia y combate cada día?"
- **faqs**:
  1. pregunta: "¿Por qué la glucosa en sangre se eleva notablemente ante episodios de estrés emocional?"
     respuesta: "Porque es un mecanismo prehistórico de supervivencia: la glucosa se mantiene libre para abastecer cerebro y músculos ante una amenaza de muerte inminente."
  2. pregunta: "¿Qué representa la insulina en la bioneuroemoción?"
     respuesta: "Es la llave que permite que el dulzor de la vida (afecto) ingrese al interior de las células; la resistencia es el rechazo defensivo a ese contacto."
  3. pregunta: "¿Puede la biodescodificación coadyuvar a la regulación de la glucemia?"
     respuesta: "Al disolver el rencor territorial y permitir que la persona experimente vínculos seguros y dulces, la sensibilidad a la insulina mejora progresivamente."
- **ganchoAgendamiento**: "¿Sientes que la dulzura se marchitó en tu vida y tu cuerpo vive en constante resistencia? Recupera tu armonía y bienestar agendando tu sesión diagnóstica."

#### 37. Síndrome de Ovario Poliquístico / SOP (`ovario-poliquistico`)
- **nombre**: Síndrome de Ovario Poliquístico (SOP)
- **sistema**: Endocrino / Metabólico
- **conflictoEmocional**: "Pérdida dolorosa de descendencia en el árbol y necesidad de masculinizarse para sobrevivir". Sentir que la condición femenina es vulnerable o peligrosa, o responder al mandato de 'ser el varón fuerte' protector de la familia.
- **sentidoBiologico**: Producir andrógenos para aportar mayor fuerza física y resistencia ante la adversidad, mientras los ovarios multiplican folículos para no errar la misión reproductiva o frenarla en tiempos hostiles.
- **reprogramacion**: "Honro y bendigo mi energía femenina sagrada. Me reconozco fuerte, sabia y segura en mi cuerpo de mujer; mis ciclos fluyen en perfecta armonía."
- **preguntasReflexion**:
  1. "¿Qué mensaje inconsciente recibiste sobre ser mujer: que significaba debilidad, dolor o sumisión?"
  2. "¿Tuviste que asumir roles de liderazgo o protección masculina que correspondían a otros?"
  3. "¿Qué pérdidas de gestación o duelos de fertilidad han ocurrido en tu linaje materno?"
- **faqs**:
  1. pregunta: "¿Por qué el SOP suele acompañarse de exceso de vello y ciclos menstruales irregulares?"
     respuesta: "La elevación de andrógenos aporta características de fuerza defensiva masculina ante un entorno que el inconsciente evalúa como amenazante para una mujer."
  2. pregunta: "¿Cómo ayuda la mirada holística en el tratamiento del SOP?"
     respuesta: "Alineando hábitos antiinflamatorios con la sanación de la herida con lo femenino y la reconciliación con el linaje de las mujeres de la familia."
  3. pregunta: "¿Qué relación tiene el ovario poliquístico con el miedo a la maternidad?"
     respuesta: "Con frecuencia el cuerpo posterga la ovulación si evalúa que el entorno no brinda la estabilidad y seguridad necesarias para albergar una nueva vida."
- **ganchoAgendamiento**: "¿Tus ciclos y hormonas reflejan una batalla interna con tu energía femenina? Reconcíliate con tu sabiduría corporal en tu sesión de evaluación."

#### 38. Trastornos de la Tiroides / Nódulos Tiroideos (`nodulos-tiroideos`)
- **nombre**: Nódulos Tiroideos y Bocio
- **sistema**: Endocrino / Metabólico
- **conflictoEmocional**: "Bocado vital que no se pudo alcanzar por una fracción de segundo". Impotencia lacerante por no haber sido lo bastante ágil para conseguir una meta (trabajo, hogar, estabilidad); generación de refuerzo glandular para el futuro.
- **sentidoBiologico**: Hiperplasia celular focal (nódulo) para aumentar de forma focalizada la secreción de tiroxina y lograr atrapar en el próximo intento el bocado que se escapa.
- **reprogramacion**: "Suelto los reproches por lo que no fue. Mi vida se despliega en el tiempo justo y perfecto; confío en que lo que me corresponde llegará con serenidad."
- **preguntasReflexion**:
  1. "¿Qué meta trascendental sentiste que se te escapó de las manos por no haber actuado más rápido?"
  2. "¿Te culpas severamente por no haber tomado una decisión crucial a tiempo en el pasado?"
  3. "¿Qué oportunidad o bocado vital sientes hoy la urgencia desesperada de asegurar?"
- **faqs**:
  1. pregunta: "¿Qué distingue a un nódulo tiroideo caliente de uno frío?"
     respuesta: "Los nódulos calientes mantienen producción activa de hormona (urgencia vigente); los fríos son huellas o cicatrices biológicas encapsuladas."
  2. pregunta: "¿Los nódulos tiroideos representan un riesgo grave para la salud?"
     respuesta: "En su inmensa mayoría son formaciones benignas que responden a picos de estrés temporal; siempre requieren supervisión médica y ecográfica."
  3. pregunta: "¿De qué forma ayuda la biodescodificación ante los nódulos?"
     respuesta: "Desactiva el remordimiento por la supuesta lentitud pasada, brindando paz a la glándula para que detenga la proliferación de tejido."
- **ganchoAgendamiento**: "¿Cargas con el reproche de no haber sido lo bastante rápido ante una oportunidad perdida? Sana el conflicto de tu tiroides agendando tu sesión diagnóstica."

---

### SISTEMA 7: INMUNOLÓGICO / CIRCULATORIO

#### 39. Migraña y Cefaleas Tensionales (`migrana`)
- **nombre**: Migrañas y Cefaleas Crónicas
- **sistema**: Inmunológico / Circulatorio
- **conflictoEmocional**: "Desvalorización intelectual y necesidad tiránica de control mental". Personas hiperanalíticas, autoexigentes y perfeccionistas que pretenden resolverlo todo desde la lógica, con miedo atroz a equivocarse y conflicto con la autoridad paterna.
- **sentidoBiologico**: En fase activa se produce vasoconstricción cerebral para concentrar el pensamiento analítico; en fase de relajación, sobreviene una vasodilatación masiva con edema doloroso para reparar el cerebro estresado.
- **reprogramacion**: "Suelto la obsesión de controlarlo todo con el raciocinio. Confío en la sabiduría de mi corazón y en mi intuición; es seguro relajarme y gozar del descanso."
- **preguntasReflexion**:
  1. "¿Por qué te exiges tener siempre la solución lógica a problemas que escapan a tu control?"
  2. "¿Por qué tus episodios de dolor suelen irrumpir precisamente los fines de semana o al comenzar las vacaciones?"
  3. "¿Ante qué figura de autoridad en tu juventud sentías que debías demostrar continuamente tu inteligencia?"
- **faqs**:
  1. pregunta: "¿Por qué la migraña ataca con frecuencia durante los días de descanso?"
     respuesta: "Porque el dolor pulsátil ocurre en la fase vagotónica o de reparación biológica, cuando el cuerpo finalmente se relaja tras jornadas de hipercontrol."
  2. pregunta: "¿Qué papel juegan los alimentos detonantes (chocolate, vino, quesos maduros)?"
     respuesta: "Son estímulos vasculares que detonan una crisis en vasos cerebrales previamente sensibilizados por la tensión neurovegetativa sostenida."
  3. pregunta: "¿Cómo prevenir las crisis migrañosas de forma duradera?"
     respuesta: "Aprendiendo a delegar, aceptando la incertidumbre de la vida y practicando descansos diarios sin esperar al colapso del fin de semana."
- **ganchoAgendamiento**: "¿Cansado de que las migrañas arruinen tus fines de semana y momentos de ocio? Desactiva el hipercontrol mental en tu sesión de evaluación personalizada."

#### 40. Hipertensión Arterial (`hipertension`)
- **nombre**: Hipertensión Arterial y Presión Alta
- **sistema**: Inmunológico / Circulatorio
- **conflictoEmocional**: "Cierre defensivo del corazón y acumulación de presión en el hogar". Negarse a sentir un antiguo dolor afectivo ('cerrar la válvula'); personas que evitan la confrontación directa pero acumulan cólera interna para sostener la familia.
- **sentidoBiologico**: Incrementar la presión hidrostática del torrente circulatorio para bombear con mayor fuerza sangre oxigenada ante la necesidad biológica de expulsar a un intruso o huir de casa.
- **reprogramacion**: "Abro mi corazón a la expresión y al perdón sincero. Manifiesto mis verdades con serenidad; libero la presión interna y elijo vivir en concordia."
- **preguntasReflexion**:
  1. "¿Qué herida afectiva o deslealtad decidiste sepultar en tu memoria para no volver a sufrir?"
  2. "¿Qué indignación o desacuerdo callas día con día para mantener una falsa calma en tu hogar?"
  3. "¿Por qué crees que si abres tu corazón o expresas tu molestia todo tu entorno se derrumbará?"
- **faqs**:
  1. pregunta: "¿Por qué a la hipertensión se la cataloga como el mal silencioso?"
     respuesta: "Porque el paciente aprende a tolerar niveles altísimos de tensión y exigencia sin quejarse externamente, hasta que el lecho vascular alerta del colapso."
  2. pregunta: "¿La ingesta de sal es el único desencadenante de la hipertensión?"
     respuesta: "El sodio incrementa el volumen de líquido, pero la resistencia vascular periférica obedece al tono simpático de combate y alerta emocional continua."
  3. pregunta: "¿Qué cambio interior contribuye a normalizar las cifras de tensión?"
     respuesta: "Desahogar los agravios en el momento oportuno, renunciar al papel de amortiguador de conflictos ajenos y perdonar el pasado."
- **ganchoAgendamiento**: "¿Tu corazón soporta una presión silenciosa que clama por ser liberada? Descubre el origen emocional de tu hipertensión en consulta."

#### 41. Cistitis e Infecciones Urinarias Recurrentes (`cistitis-recurrente`)
- **nombre**: Cistitis e Infecciones Urinarias Recurrentes
- **sistema**: Inmunológico / Circulatorio
- **conflictoEmocional**: "Conflicto de delimitación del territorio e invasión del espacio íntimo". Incapacidad de marcar y organizar las fronteras del propio nido ('¿quién invade mi espacio, mi cama o mis decisiones sin mi consentimiento?').
- **sentidoBiologico**: Ulceración de la mucosa vesical en fase activa para agrandar la capacidad de almacenamiento de orina para marcar el territorio; en curación, ardor e inflamación miccional.
- **reprogramacion**: "Mi espacio íntimo es sagrado y respetado. Establezco mis límites con amor, firmeza y tranquilidad; es seguro proteger mi lugar en el mundo."
- **preguntasReflexion**:
  1. "¿Quién traspasó los límites de tu privacidad, tu hogar o tu intimidad antes de que comenzara el ardor?"
  2. "¿En qué circunstancia sientes que no puedes hacer respetar tus decisiones o decir 'este es mi espacio'?"
  3. "¿Qué injerencia o intrusión en tu vida de pareja te está causando irritación e incomodidad?"
- **faqs**:
  1. pregunta: "¿Por qué la cistitis presenta una prevalencia notablemente mayor en mujeres?"
     respuesta: "Porque la mujer ha sido históricamente la protectora de la armonía del nido íntimo, resultando especialmente vulnerable a las intrusiones de familiares o parejas."
  2. pregunta: "¿Por qué los tratamientos antibióticos no logran frenar las recidivas frecuentes?"
     respuesta: "Porque el antibiótico elimina la bacteria oportunista, pero si la transgresión territorial sigue ocurriendo en la convivencia, la vejiga volverá a inflamarse."
  3. pregunta: "¿Qué acción cotidiana frena los cuadros de cistitis recurrente?"
     respuesta: "Poner un límite verbal tajante a quien invade la privacidad y no permitir que nadie disponga del propio tiempo o espacio sin consentimiento."
- **ganchoAgendamiento**: "¿Padeces de infecciones urinarias cada vez que invaden tu espacio íntimo o tu intimidad? Aprende a marcar tus fronteras en tu sesión de evaluación."

#### 42. Vértigo y Tinnitus / Zumbidos en los Oídos (`vertigo-tinnitus`)
- **nombre**: Vértigo, Mareos y Tinnitus (Acúfenos)
- **sistema**: Inmunológico / Circulatorio
- **conflictoEmocional**: Vértigo: pérdida dramática de puntos de referencia, sensación de caída al vacío o desorientación existencial. Tinnitus: rechazo vehemente a lo que se escucha o negación a enterarse de una verdad lacerante ('¡no quiero oír más esto!').
- **sentidoBiologico**: El vértigo inmoviliza a la persona para evitar que dé un paso fatal hacia un abismo existencial; el tinnitus emite un zumbido defensivo para enmascarar ruidos y palabras hirientes del exterior.
- **reprogramacion**: "Encuentro mi equilibrio y mi seguridad en mi centro interior. Escucho con discernimiento y paz; es seguro aceptar la verdad y caminar firme."
- **preguntasReflexion**:
  1. "¿Qué palabras hirientes, reproches o gritos escuchaste en tu entorno que desearías no haber oído jamás?"
  2. "¿Qué giro súbito en tu vida te hizo sentir que te arrebataban la tierra bajo tus pies?"
  3. "¿Qué realidad sobre tu relación o tu familia te resistes a escuchar por temor a lo que tendrías que decidir?"
- **faqs**:
  1. pregunta: "¿Por qué el zumbido o tinnitus se hace más notorio en el silencio de la noche?"
     respuesta: "Porque en la quietud se apagan los sonidos ambientales y la mente amplifica la señal biológica de alerta ante lo que no se quiere escuchar en la vida."
  2. pregunta: "¿Cómo se relaciona el síndrome de Ménière con el estrés?"
     respuesta: "Integra el terror a perder el rumbo vital (crisis de vértigo) con la saturación por palabras y demandas tóxicas en el entorno (tinnitus y presión ótica)."
  3. pregunta: "¿Cómo se restablece el equilibrio desde la perspectiva de la biodescodificación?"
     respuesta: "Recuperando la coherencia personal, aceptando la verdad sin temor y eligiendo con quién se desea compartir la comunicación cotidiana."
- **ganchoAgendamiento**: "¿Los mareos o los zumbidos en los oídos perturban tu bienestar y tu calma diaria? Descifra el mensaje de tu sistema auditivo en consulta."

#### 43. Alergias Alimentarias e Intolerancias (`alergias-alimentarias`)
- **nombre**: Alergias Alimentarias e Intolerancias Digestivas
- **sistema**: Inmunológico / Circulatorio
- **conflictoEmocional**: "Separación dolorosa, conflicto o choque familiar vivido durante la comida". La sustancia alimenticia específica (leche = vínculo materno y nutrición afectiva básica; trigo/gluten = figura paterna, cohesión familiar y mandato laboral) estuvo asociada a un shock dramático.
- **sentidoBiologico**: Rechazar de inmediato el alimento que el cerebro arcaico registró como cómplice o detonante de un trauma emocional, para advertir y proteger al organismo.
- **reprogramacion**: "Todos los alimentos sanos son fuente de bendición y nutrición para mi ser. Desvinculo este alimento de los dolores de mi pasado; me nutro de amor y paz."
- **preguntasReflexion**:
  1. "¿Qué altercado violento, separación o dolor ocurrió mientras compartías la mesa con tu familia en la infancia?"
  2. "Si eres intolerante a los lácteos: ¿cómo se ha desarrollado el vínculo afectivo con tu madre?"
  3. "Si eres intolerante al gluten: ¿qué exigencia o imposición severa viviste respecto a tu padre o al trabajo?"
- **faqs**:
  1. pregunta: "¿A qué se debe el incremento notable de intolerancias al trigo y a la lactosa hoy en día?"
     respuesta: "El trigo simboliza el sustento del padre y la leche el afecto materno; las crisis de roles en la familia actual se reflejan en el rechazo somático a estos alimentos."
  2. pregunta: "¿Es posible recuperar la tolerancia a un alimento trabajando la emoción?"
     respuesta: "Al desarticular la memoria celular del trauma anclado a la comida y reprogramar la respuesta límbica, muchas personas vuelven a tolerarlo normalmente."
  3. pregunta: "¿Qué diferencia existe entre una alergia anafiláctica y una intolerancia digestiva?"
     respuesta: "La alergia severa responde a un peligro de supervivencia inmediato; la intolerancia evidencia un rechazo paulatino a una imposición o mandato familiar."
- **ganchoAgendamiento**: "¿Tu organismo rechaza alimentos que antes disfrutabas sin problemas? Encuentra la memoria emocional detrás de tu intolerancia en consulta."

#### 44. Fatiga Crónica y Agotamiento Adrenal (`fatiga-cronica`)
- **nombre**: Síndrome de Fatiga Crónica y Burnout
- **sistema**: Inmunológico / Circulatorio
- **conflictoEmocional**: "Rumbo equivocado en la vida y extenuación del guerrero que no puede más". Sentirse atrapado luchando en batallas que no son propias o en un sendero sin alma; desplome de la corteza suprarrenal tras años de sobreesfuerzo sin gozo ni recompensa.
- **sentidoBiologico**: Bloquear la secreción de cortisol y forzar una parálisis energética total para obligar al individuo a detener una trayectoria vital autodestructiva.
- **reprogramacion**: "Elijo transitar sendas con corazón y honro mi descanso. Mi energía vital es un tesoro sagrado; renuncio a librar batallas ajenas y vivo para mi realización."
- **preguntasReflexion**:
  1. "¿En qué meta o causa sentiste que diste tu alma entera para al final descubrir que no valía la pena el sacrificio?"
  2. "¿A qué persona intentabas salvar o complacer mediante tu sobreesfuerzo constante hasta quedar exhausto?"
  3. "¿Qué rumbo vital necesitas cambiar urgentemente para que tu vitalidad vuelva a renacer?"
- **faqs**:
  1. pregunta: "¿Por qué el sueño y el reposo habitual no alivian el agotamiento de la fatiga crónica?"
     respuesta: "Porque el desgaste no es únicamente muscular; es el colapso del sentido de vida provocado por vivir en continua contradicción con los valores profundos."
  2. pregunta: "¿Qué función tienen las glándulas suprarrenales en la medicina mente-cuerpo?"
     respuesta: "Gobiernan el impulso de combatir y avanzar; cuando el ser siente que ha extraviado el norte, las suprarrenales 'apagan la maquinaria' para preservar la vida."
  3. pregunta: "¿Cuál es el camino para restaurar la vitalidad perdida?"
     respuesta: "Renunciar a los compromisos que desvitalizan el espíritu, descansar sin culpa y dedicar tiempo cada día a proyectos que enciendan la pasión genuina."
- **ganchoAgendamiento**: "¿Despiertas con la batería agotada y sientes que perdiste las fuerzas para luchar? Redescubre tu rumbo y tu vitalidad en tu sesión de diagnóstico."

#### 45. Varices y Problemas de Circulación Venosa (`varices-circulacion`)
- **nombre**: Varices, Pesadez de Piernas e Insuficiencia Venosa
- **sistema**: Inmunológico / Circulatorio
- **conflictoEmocional**: "Arrastrar una bola de plomo en el pie y deseo truncado de regresar al hogar o salir de él". Sentir que la familia es una carga pesadísima que entorpece cada paso, o sentirse atrapado en un nido hostil donde no hay espacio para la alegría.
- **sentidoBiologico**: Dilatar las venas de las piernas para ralentizar el retorno de la sangre (el clan) hacia el corazón, reflejando la pesadumbre de sostener la estirpe familiar.
- **reprogramacion**: "Camino con ligereza, entusiasmo y libertad. Libero a mi familia de mis expectativas y me libero de sus cargas; mi paso es grácil y feliz."
- **preguntasReflexion**:
  1. "¿A qué miembro de tu familia sientes que arrastras como una pesada carga en cada paso de tu vida?"
  2. "¿Te sientes atrapado en una casa o empleo del que quisieras marcharte pero la culpa te ata al lugar?"
  3. "¿En qué momentos sientes tus piernas más hinchadas y adoloridas: cuando estás en casa o cuando trabajas para otros?"
- **faqs**:
  1. pregunta: "¿Por qué las varices se acentúan con frecuencia durante la gestación y maternidad?"
     respuesta: "Porque la maternidad detona intensamente el mandato y el peso ancestral de sostener a la familia y la continuidad del clan a expensas de la propia libertad."
  2. pregunta: "¿La predisposición familiar a las varices es irreversible?"
     respuesta: "Se hereda la conformación tisular pero también la lealtad inconsciente a repetir los sacrificios y cargas que sufrieron las mujeres de generaciones pasadas."
  3. pregunta: "¿Cómo aliviar la pesadez venosa desde el trabajo personal?"
     respuesta: "Devolviendo a cada miembro del clan sus propias responsabilidades, renunciando al rol de víctima sacrificada y disfrutando de la marcha con ligereza."
- **ganchoAgendamiento**: "¿Sientes tus piernas tan pesadas como si arrastraras una carga familiar ajena? Aligera tus pasos y sana tus venas en tu sesión de evaluación inicial."
