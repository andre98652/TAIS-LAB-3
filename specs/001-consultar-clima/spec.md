# Feature Specification: Consultar el clima de una ciudad

**Feature Branch**: Sin rama; funcionalidad `001-consultar-clima`.

**Created**: 2026-10-29

**Status**: Ready for planning

**Input**: Crear el caso práctico académico del clima siguiendo el flujo SDD con Spec Kit.
El único enunciado del profesor disponible exige un caso práctico con Spec Kit;
la temática y el alcance siguientes proceden de la propuesta de esta conversación.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consultar condiciones actuales (Priority: P1)

Como visitante quiero buscar una ciudad y ver temperatura, humedad y precipitación actuales.

**Why this priority**: Es el valor central de la aplicación.

**Independent Test**: Buscar Lima y comprobar ciudad y tres valores con unidades;
la prueba automática usa respuestas controladas y la demostración usa el servicio real.

**Acceptance Scenarios**:

1. **Given** una ciudad localizable, **When** envío su nombre, **Then** veo el nombre
   resuelto, temperatura en °C, humedad en % y precipitación en mm.
2. **Given** `  Lima  `, **When** envío, **Then** la búsqueda utiliza `Lima`.
3. **Given** una ubicación válida sin nombre, **When** llega el tiempo, **Then** veo el
   texto de búsqueda recortado como nombre.
4. **Given** valores decimales, **When** se presentan, **Then** temperatura y precipitación
   tienen un decimal y humedad es entera, sin modificar los datos recibidos almacenados.

### User Story 2 - Corregir búsquedas y recuperarse de errores (Priority: P2)

Como visitante quiero entender por qué no obtengo datos y poder corregir o reintentar.

**Why this priority**: Evita resultados engañosos y permite usar la aplicación ante fallos.

**Independent Test**: Enviar vacío y simular ubicaciones inexistentes y fallos externos;
comprobar mensajes distintos y que después se pueda realizar una búsqueda correcta.

**Acceptance Scenarios**:

1. **Given** vacío o solo espacios, **When** envío, **Then** veo validación y no hay consulta.
2. **Given** cero ubicaciones o coordenadas ausentes, **When** se resuelve la búsqueda,
   **Then** veo ciudad no encontrada y puedo reintentar.
3. **Given** fallo externo, **When** termina la búsqueda, **Then** veo el servicio afectado
   y el tipo de problema, y desaparece la carga.
4. **Given** datos incompletos, **When** llega el resultado, **Then** no se presentan
   valores inexistentes como cero ni se conservan datos de otra ciudad.

### User Story 3 - Buscar con teclado y entender los estados (Priority: P3)

Como visitante quiero usar el formulario con teclado y conocer cuándo está trabajando.

**Why this priority**: Mejora acceso y evita envíos duplicados o resultados confusos.

**Independent Test**: Navegar con teclado, enviar con Enter, comprobar carga, bloqueo
temporal del envío y limpieza de resultados al buscar otra ciudad.

**Acceptance Scenarios**:

1. **Given** foco en el campo, **When** pulso Enter, **Then** se realiza una sola búsqueda.
2. **Given** consulta en curso, **When** intento otro envío, **Then** no comienza otra;
   el campo permanece editable y el botón se habilita al terminar.
3. **Given** un resultado previo, **When** inicio otra búsqueda válida, **Then** el resultado
   y error anteriores desaparecen antes de llegar los nuevos datos.
4. **Given** pantalla estrecha, **When** utilizo el formulario, **Then** etiquetas,
   resultados y errores se pueden leer sin desplazamiento horizontal de la página.

### Edge Cases

- Coordenadas iguales a cero son válidas; valores no finitos o fuera de rango son inválidos.
- Temperaturas negativas y precipitación cero son válidas.
- Nombre ausente o vacío utiliza el nombre introducido.
- Texto de ciudad con caracteres HTML se presenta como texto, nunca se ejecuta.
- Respuesta ilegible o estructura incompatible: respuesta inválida.
- Estructura meteorológica reconocible con valores ausentes o nulos: datos incompletos.
- Cada servicio tiene un límite de espera de 10 segundos, incluyendo lectura de respuesta.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Admitir ciudad de 1 a 100 caracteres tras recortar extremos; rechazar vacío
  y solo espacios antes de consultar un servicio.
- **FR-002**: Permitir envío mediante botón o Enter sin duplicarlo.
- **FR-003**: Resolver el nombre y utilizar solo la primera ubicación devuelta.
- **FR-004**: Informar ciudad no encontrada para cero ubicaciones o coordenadas ausentes.
- **FR-005**: Validar coordenadas numéricas finitas en los rangos [-90,90] y [-180,180].
- **FR-006**: Mostrar ciudad, temperatura en °C, humedad en % y precipitación en mm actuales.
- **FR-007**: Conservar valores crudos y formatear solo al mostrar: un decimal para
  temperatura/precipitación, entero para humedad.
- **FR-008**: Usar como alternativa el nombre de búsqueda recortado cuando falte el nombre resuelto.
- **FR-009**: Mostrar carga durante ambas etapas y ocultarla al terminar con éxito o error.
- **FR-010**: Distinguir servicio afectado y problemas de red, espera, HTTP, datos inválidos
  y datos meteorológicos incompletos, con mensajes en español.
- **FR-011**: Limitar a 10 segundos cada consulta externa, incluyendo lectura de respuesta.
- **FR-012**: Mantener el campo editable y permitir reintentos tras cualquier error.
- **FR-013**: Limpiar datos y errores previos al comenzar otra búsqueda válida.
- **FR-014**: Bloquear otro envío durante carga y habilitarlo después; ignorar envíos
  programáticos mientras hay una búsqueda activa.
- **FR-015**: Proporcionar etiqueta, foco visible y anuncios de estado accesibles.
- **FR-016**: Presentar cadenas externas como texto, sin interpretarlas como marcado.

### Key Entities *(include if feature involves data)*

- **Consulta**: nombre original y nombre recortado, con estado inicial/cargando/éxito/error.
- **Ubicación**: latitud, longitud, nombre y país opcional del primer resultado.
- **Tiempo actual**: temperatura, humedad, precipitación y hora opcional de referencia.
- **Fallo**: servicio afectado y categoría que determina el mensaje al usuario.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Una consulta exitosa presenta el nombre y los tres datos con sus unidades.
- **SC-002**: Las entradas vacías producen cero consultas externas.
- **SC-003**: Todo fallo previsto termina la carga y permite un nuevo intento.
- **SC-004**: Un envío con Enter causa una sola búsqueda, y durante carga no hay otra.
- **SC-005**: Todas las historias cuentan con comprobaciones repetibles de sus escenarios.
- **SC-006**: A 360 px de ancho no hay desbordamiento horizontal de la página.

## Assumptions

- Caso académico local, de un solo visitante, sin autenticación ni almacenamiento persistente.
- Depende de conectividad y de un proveedor externo; no se promete disponibilidad absoluta.
- Nombres de ciudades ambiguos utilizan el primer resultado; no se incluye selector de ubicaciones.
- Tiempo actual, no predicción de varios días, mapas ni alertas meteorológicas.
- Se solicita incluir pruebas automáticas de éxito, validación, recuperación y estados.
- Los límites de humedad [0,100] y precipitación no negativa se validarán como datos del dominio.
- Las decisiones de alcance son supuestos razonables de esta realización, no respuestas atribuidas al profesor.
