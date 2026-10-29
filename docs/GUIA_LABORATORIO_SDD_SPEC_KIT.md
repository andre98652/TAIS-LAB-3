> Actualización de estructura: la aplicación se encuentra ahora en `app/`. Entrar con `cd app` antes de ejecutar los comandos npm de esta guía. Las rutas `src/`, `tests/` y los archivos de configuración de la aplicación se interpretan dentro de `app/`.

# Guía para realizar el laboratorio de SDD con GitHub Spec Kit

Fecha de preparación: 28 de octubre de 2026.

Este archivo conserva el contexto de la conversación y propone un procedimiento para realizar el trabajo en otra laptop. Es una guía de preparación: todavía no se ha instalado Spec Kit ni se ha implementado la aplicación como parte de esta conversación.

## 1. Enunciado confirmado y decisiones propuestas

El único enunciado disponible de la nueva tarea es:

> Caso Práctico de implementación de flujo SDD con GitHub Spec Kit

El profesor no ha proporcionado, en el material compartido, una rúbrica detallada, un tema obligatorio, un lenguaje, un asistente específico ni un formato exacto de entrega.

La interpretación de trabajo es realizar un caso práctico completo: especificar una aplicación, planificarla, generar tareas, implementarla y verificarla utilizando realmente Spec Kit y un asistente de IA compatible.

Para concretarlo, se propone una aplicación web de consulta del clima por ciudad. Reutilizar esta idea permite concentrarse en aprender el flujo nuevo. El tema del clima es nuestra propuesta, basada en el laboratorio anterior; no está confirmado como obligatorio para la nueva tarea.

Los entregables, tecnologías y pruebas de esta guía son recomendaciones para una entrega demostrable. Si aparece una consigna más específica, adaptar la guía a ella.

## 2. Contexto del laboratorio anterior

El laboratorio anterior se titulaba **Guía #03 - Spec-Driven Development (SDD)**. Sus recursos incluían GitHub Spec Kit, Kiro y una lectura sobre SDD.

Según recuerda el estudiante, el profesor utilizó **Kiro** para preparar requisitos, arquitectura y tareas. Después pidió que el asistente terminara de implementar un programa relacionado con el clima.

Se revisaron estos archivos:

- `1. Piskala (2026) - SDD From Code to Contract in the Age of AI Coding Assistants.pdf`.
- `Lab03_Kiro_Specs (1).zip`.
- `prompt_kiro (1).txt`.

El ZIP contiene exactamente tres documentos:

- `requirements.md`: cinco requisitos con 29 criterios de aceptación.
- `design.md`: diseño técnico, arquitectura, modelos, manejo de errores y estrategia de pruebas.
- `tasks.md`: 12 etapas principales, todas sin marcar como completadas en la copia revisada.

El ZIP no contiene código fuente, un `package.json` ni una aplicación ejecutable. Eso describe los archivos revisados, no demuestra qué se hizo en clase o en otras carpetas.

El prompt original dice:

> Vamos a construir una aplicación web que reciba el nombre de una ciudad, convierta sus coordenadas geográficas mediante la API de geocodificación de Open-Meteo y consulte el pronóstico del clima (temperatura, humedad y precipitaciones)

En el equipo donde se inició esta conversación, los tres recursos estaban en `D:/Descargas/` y la carpeta de trabajo era `D:/tais lab3/`. Esas rutas pueden cambiar en la laptop. Copiar los recursos originales junto con esta guía si se desea consultarlos después.

## 3. Qué significan SDD, Spec Kit y los archivos Markdown

**SDD** significa Spec-Driven Development: desarrollo guiado por especificaciones. Primero se define el comportamiento esperado y después se construye y comprueba el programa usando esa definición como referencia.

**Spec Kit** es un conjunto de herramientas, plantillas e instrucciones que estructura ese proceso para un asistente de programación con IA. El asistente genera documentos y código siguiendo el flujo; el estudiante revisa los resultados y toma las decisiones del proyecto. [Repositorio oficial](https://github.com/github/spec-kit).

Un archivo `.md` es un documento de texto en formato Markdown. Puede contener títulos, listas, criterios, diagramas o tareas. VS Code permite leer su vista previa con `Ctrl+Shift+V`.

Para este trabajo interesan especialmente:

- `constitution.md`: principios del proyecto.
- `spec.md`: comportamiento esperado y requisitos de la funcionalidad.
- `plan.md`: decisiones técnicas para implementar la especificación.
- `tasks.md`: trabajo concreto que debe realizarse.

Spec Kit puede generar otros documentos de apoyo según la versión y el caso. Conservar los que produzca el flujo real. El estudiante no necesita inventar manualmente archivos para aparentar que utilizó la herramienta.

### Relación con Kiro

Los documentos del laboratorio anterior sirven como referencia para comprender el problema. En Spec Kit, los requisitos suelen recogerse en `spec.md` y el diseño en `plan.md`; `tasks.md` conserva la función de plan de implementación. Esta correspondencia es conceptual: no basta con cambiar nombres a los archivos anteriores para demostrar el uso de Spec Kit.

### Costos

Spec Kit es gratuito y de código abierto con licencia MIT. [Licencia](https://github.com/github/spec-kit/blob/main/LICENSE).

El servicio de IA utilizado tiene sus propios planes, funciones y límites. La instalación de Spec Kit no incluye uso ilimitado de modelos. GitHub Copilot ofrece alternativas gratuitas y de pago, y acceso para estudiantes verificados; comprobar qué funciones incluye la cuenta disponible. En la documentación consultada, las skills de Copilot en el IDE no estaban incluidas en Copilot Free. Por tanto, no dar por hecho que cualquier cuenta gratuita permite seguir exactamente los ejemplos en modo skills. [Planes de Copilot](https://docs.github.com/en/copilot/get-started/plans).

No se ha elegido ni contratado un plan de IA para este trabajo.

## 4. Proyecto propuesto

**Nombre descriptivo:** Consulta meteorológica por ciudad con SDD y GitHub Spec Kit.

**Nombre de carpeta sugerido:** `clima-sdd-speckit`.

**Objetivo:** permitir que una persona ingrese una ciudad y consulte temperatura, humedad relativa y precipitación actuales mediante Open-Meteo.

**Flujo de uso:**

1. El usuario escribe una ciudad, por ejemplo Lima.
2. La aplicación valida la entrada y muestra un estado de carga.
3. Consulta el servicio de geocodificación para obtener latitud y longitud.
4. Con esas coordenadas consulta el servicio meteorológico.
5. Muestra el nombre de ciudad y los tres datos con sus unidades.
6. Si ocurre un problema, informa del error y permite reintentar.

Aunque en los materiales aparece la palabra «pronóstico», el alcance que se propone conservar es **condiciones actuales**. Una previsión de varios días sería una ampliación que necesitaría nuevos requisitos.

### Alcance inicial

- Interfaz en español.
- Campo de ciudad y botón Buscar.
- Búsqueda con botón y con Enter.
- Temperatura en grados Celsius, humedad en porcentaje y precipitación en milímetros.
- Estados inicial, cargando, resultado y error.
- Manejo de validaciones y fallos de los servicios.
- Pruebas y documentación para ejecutar el programa.

No se contemplan inicialmente cuentas, base de datos, mapas, pagos ni un servidor de negocio. Estas funciones no son necesarias para el caso propuesto.

## 5. Requisitos que conviene llevar a la especificación

Estos puntos trasladan el caso anterior a una propuesta revisable. La especificación generada debe expresar criterios comprobables y mantener identificadores que permitan relacionar requisitos, tareas y pruebas.

### Entrada de ciudad

1. El campo admite como máximo 100 caracteres.
2. La búsqueda puede enviarse mediante clic o Enter.
3. Una entrada vacía o con solo espacios produce un mensaje de validación y ninguna petición de red.
4. Se eliminan los espacios al inicio y al final antes de consultar.
5. El campo permite corregir la ciudad y reintentar después de un error.

### Obtención de ubicación

6. Se consulta Open-Meteo Geocoding con el nombre y `count=1`.
7. Se utiliza el primer resultado válido.
8. Si no hay resultados o faltan coordenadas, se informa que no se encontró la ciudad.
9. Las coordenadas deben ser numéricas y finitas, con latitud entre -90 y 90 y longitud entre -180 y 180.

### Consulta meteorológica

10. Se solicitan los datos actuales `temperature_2m`, `relative_humidity_2m` y `precipitation`.
11. Se mantienen los valores recibidos sin redondearlos en la capa de datos.
12. Se distingue entre fallo de red, timeout, respuesta HTTP fallida, respuesta inválida y datos incompletos.
13. Cada petición dispone de un límite de espera de 10 segundos que cubre la lectura de la respuesta.

### Presentación

14. Se muestran ciudad, temperatura con °C, humedad con % y precipitación con mm.
15. Temperatura y precipitación se muestran con un decimal; humedad como entero. Es una decisión concreta compatible con el máximo de un decimal del material anterior.
16. Si la respuesta no trae nombre de ciudad, se usa el nombre ingresado, recortado.
17. Al iniciar otra búsqueda válida se limpian resultados y errores anteriores.
18. El indicador de carga desaparece tanto al terminar correctamente como al fallar cualquiera de los dos servicios.
19. Los errores se muestran en texto y el formulario conserva etiquetas y foco visible.

### Decisión adicional para evitar resultados desordenados

Durante una búsqueda se propone impedir un segundo envío, manteniendo el texto editable. Al terminar, el botón vuelve a habilitarse. Otra solución válida sería cancelar o ignorar respuestas antiguas, pero debe quedar elegida una sola política y probarse. Este punto mejora la propuesta; no es un requisito explícito del enunciado nuevo.

## 6. Inconsistencias del material anterior que hay que resolver

### Nombre del parámetro de humedad

`requirements.md` menciona `relativehumidity_2m`. El diseño y las tareas utilizan `relative_humidity_2m`, que coincide con la documentación consultada de Open-Meteo. Usar este último de forma consistente en los nuevos documentos y en el código. [Variables meteorológicas](https://open-meteo.com/en/docs).

### Respuesta inválida frente a datos incompletos

Las tareas anteriores mezclan expectativas para objetos con campos ausentes. Se propone documentar esta clasificación:

- JSON que no se puede leer, cuerpo de tipo incorrecto o estructura principal incompatible: `INVALID_RESPONSE`.
- Estructura meteorológica `current` reconocible, pero con uno o más valores necesarios ausentes o nulos: `INCOMPLETE_DATA`.
- Valores presentes de tipo incorrecto o no finitos: `INVALID_RESPONSE`.
- Geocodificación sin resultados o con coordenadas ausentes: `CITY_NOT_FOUND`, conforme al caso anterior.

Las pruebas deben usar esa misma clasificación. No crear pruebas que esperen dos errores distintos para la misma respuesta.

### Pruebas opcionales del archivo anterior

Las tareas con `*` del ZIP se presentan como opcionales para un MVP. Esto no demuestra que el profesor haya declarado opcionales las pruebas en la nueva tarea. Se propone incluir un conjunto significativo de pruebas, aunque no se reproduzcan todas las pruebas de propiedades del plan anterior.

## 7. Preparar la laptop

La ruta ilustrativa de esta guía usa **Windows, PowerShell, VS Code y GitHub Copilot**. Si se elige otro asistente compatible, seguir su integración oficial y adaptar la forma de invocar las etapas. No hace falta instalar todos los asistentes.

### Herramientas

- Un editor y un asistente de IA compatible, instalado y autenticado.
- Python 3.11 o superior para Spec Kit.
- `uv`, para instalar y administrar la herramienta de línea de comandos.
- Node.js en una versión LTS compatible con la versión de Vite que se utilice; incluye npm.
- Un navegador moderno.
- Git, recomendado para guardar avances y entregar un repositorio. La documentación actual de Spec Kit lo considera opcional para el flujo básico; puede ser necesario para rutas de instalación o extensiones concretas.

Descargas y requisitos oficiales:

- [Python](https://www.python.org/downloads/).
- [Node.js](https://nodejs.org/).
- [Git](https://git-scm.com/downloads).
- [VS Code](https://code.visualstudio.com/).
- [Instalación de Spec Kit](https://github.github.com/spec-kit/installation.html).
- [Requisitos de Vite](https://vite.dev/guide/).
- [Integración con Copilot](https://github.github.com/spec-kit/integrations/copilot.html).
- [Otras integraciones](https://github.github.com/spec-kit/integrations/index.html).

Abrir una terminal nueva después de instalar herramientas. Comprobar por separado:

```powershell
py --version
node --version
npm --version
git --version
uv --version
```

Si `py` no existe, probar `python --version`. No continuar con un error de herramienta desconocida sin resolver qué falta instalar o agregar al PATH.

Si falta uv y Windows dispone de WinGet, la documentación ofrece:

```powershell
winget install --id=astral-sh.uv -e
```

Después, abrir otra terminal y ejecutar `uv --version`. [Instalación oficial de uv para Spec Kit](https://github.github.com/spec-kit/install/uv.html).

### Instalar Spec Kit

En PowerShell:

```powershell
uv tool install specify-cli
specify version
specify --help
```

La instalación indicada usa el paquete oficial publicado en PyPI. Registrar la versión que realmente se instala. Si se dispone de una versión indicada por el profesor, utilizar esa versión y su documentación correspondiente.

No se han ejecutado estas instalaciones al redactar la guía.

## 8. Crear el proyecto y abrirlo en el asistente

Elegir una carpeta para los trabajos. Por ejemplo:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\Documents\Laboratorios"
Set-Location "$env:USERPROFILE\Documents\Laboratorios"
specify init clima-sdd-speckit --integration copilot --script ps
Set-Location .\clima-sdd-speckit
```

El ejemplo crea un proyecto nuevo llamado `clima-sdd-speckit` y configura la integración de Copilot con scripts de PowerShell. Si ese proyecto ya existe, abrirlo y revisar su estado; no repetir la creación encima de archivos de trabajo.

Abrir esa carpeta en VS Code mediante Archivo > Abrir carpeta. Si está disponible el comando del editor, también puede usarse `code .`.

Verificar que el asistente tenga acceso a la carpeta del proyecto y que aparezcan las instrucciones o skills instaladas. En la integración actual de Copilot, el modo predeterminado guarda las skills en `.github/skills/`. [Guía de Copilot](https://github.github.com/spec-kit/integrations/copilot.html).

### Distinguir terminal de chat

- **PowerShell:** instalación, `specify init`, comandos npm y control de versiones.
- **Chat del asistente:** etapas como `/speckit-specify` y los prompts de esta guía.

Los ejemplos siguientes usan la notación actual del modo skills de Copilot. Otras integraciones o versiones pueden mostrar comandos con puntos u otra sintaxis. Utilizar los que realmente exponga el asistente; no escribirlos en PowerShell. [Referencia de invocación](https://github.github.com/spec-kit/integrations/cli.html).

Si el plan de Copilot no permite skills, consultar el modo de comandos documentado o elegir una integración disponible con la cuenta que ya se tenga. No contratar un plan por suposición. El modo de comandos se configura durante la inicialización con `--integration-options="--commands"`; su interfaz cambia, de modo que los ejemplos de skills no se deben copiar literalmente sin adaptarlos.

## 9. Ejecutar el flujo SDD

Ejecutar una etapa a la vez y revisar lo que deja antes de pasar a la siguiente. La secuencia oficial incluye constitución, especificación, plan, tareas, implementación y comprobación de completitud; también hay etapas de aclaración y análisis. [Guía oficial](https://github.github.com/spec-kit/quickstart.html).

Los textos siguientes son propuestas para nuestro caso. Deben pegarse en el chat del asistente dentro del proyecto.

### Paso 1. Principios del proyecto

```text
/speckit-constitution Este es un proyecto académico de consulta meteorológica. Establece principios de código legible, separación de responsabilidades, interfaz en español, accesibilidad básica, validación de entradas, manejo explícito de errores y pruebas de los comportamientos principales. Mantén trazabilidad entre requisitos, tareas y pruebas. No se debe afirmar que una prueba pasó sin ejecutarla ni presentar datos simulados como consultas reales.
```

Revisar que los principios sean viables para una aplicación pequeña. Guardar la constitución en la ubicación que genere la herramienta.

### Paso 2. Especificar la aplicación

```text
/speckit-specify Crear una aplicación web en español para consultar las condiciones meteorológicas actuales de una ciudad. El usuario escribe un nombre de hasta 100 caracteres y busca con el botón o con Enter. La aplicación elimina espacios en los extremos, rechaza entradas vacías o de solo espacios sin realizar peticiones y muestra un indicador de carga. Obtiene la ubicación de la ciudad y consulta temperatura en °C, humedad relativa en % y precipitación en mm. Muestra el nombre de ciudad del servicio o, si falta, el texto de búsqueda recortado. Usa el primer resultado de ubicación. Informa ciudad no encontrada, fallos de los servicios, timeout por petición y datos inválidos o incompletos. Permite corregir y reintentar después de un error. Limpia resultados anteriores al comenzar otra búsqueda válida. Temperatura y precipitación se muestran con un decimal y humedad como entero. El alcance es tiempo actual; no incluye cuentas, mapas ni predicción de varios días. Define historias de usuario y criterios de aceptación comprobables.
```

Revisar que `spec.md` describa los comportamientos de la sección 5 y no agregue funciones innecesarias. Aún no pedir que escriba la aplicación.

### Paso 3. Resolver decisiones pendientes

```text
/speckit-clarify Revisa ambigüedades sobre nombres de ciudades, datos incompletos, formato numérico, estados de carga y búsquedas simultáneas. Propuesta: usar el primer resultado; limitar cada petición a 10 segundos incluyendo lectura de respuesta; bloquear otro envío mientras carga y reactivarlo al finalizar, conservando el campo editable; distinguir JSON o estructura inválidos de un objeto meteorológico con valores ausentes. Pregunta lo necesario y registra las decisiones en la especificación.
```

Responder con las decisiones del proyecto. Si la herramienta detecta una contradicción, corregirla antes de planificar. Conservar el registro de decisiones para el informe.

### Paso 4. Generar el plan técnico

```text
/speckit-plan Implementar una SPA con Vite, TypeScript estricto, HTML y CSS, usando fetch y AbortController. Sin backend ni base de datos. Usar Open-Meteo Geocoding con count=1 y Forecast con current=temperature_2m,relative_humidity_2m,precipitation. Separar presentación, controlador, servicios, clientes HTTP, tipos y formateadores. Validar respuestas externas y coordenadas, preservar valores crudos y redondear solamente al renderizar. El timeout debe cubrir la lectura del cuerpo. Seguir la política de búsquedas definida en spec.md. Usar Vitest y un entorno DOM para pruebas relevantes; Testing Library si ayuda. Las pruebas automáticas deben simular respuestas HTTP, mientras que la demostración en navegador debe consultar el servicio real. Añadir scripts dev, build, test y typecheck, junto con README e indicación de la fuente Open-Meteo. Consultar la documentación actual de las APIs y elegir versiones de dependencias compatibles.
```

Revisar las responsabilidades de cada capa, las URLs, los tipos y el manejo de errores. Este stack es una propuesta práctica, no una exigencia confirmada del profesor.

### Paso 5. Generar las tareas

```text
/speckit-tasks
```

Comprobar que el plan incluya configuración, clientes, servicios, interfaz, controlador, pruebas, documentación y validación final. Las tareas deben referenciar requisitos identificables y quedar pendientes hasta su realización.

Si no aparecen las pruebas acordadas, solicitar que las incorpore de acuerdo con la especificación y el plan.

### Paso 6. Revisar consistencia

```text
/speckit-analyze
```

Corregir los problemas detectados en el documento correspondiente y volver a analizar. Este análisis revisa documentos; no equivale a haber ejecutado pruebas de la aplicación. [Referencia del flujo](https://github.github.com/spec-kit/reference/agentic-sdd.html).

Si se usa `/speckit-checklist`, recordar que evalúa la calidad de los requisitos. Una casilla marcada en esa lista no demuestra que una funcionalidad esté implementada. Revisar los criterios antes de aprobarlos.

### Paso 7. Implementar

```text
/speckit-implement Implementa el caso definido en las especificaciones y el plan. Respeta las tareas y valida cada etapa. Si falta información técnica, consulta fuentes oficiales. Actualiza tasks.md con el progreso real. Ejecuta las comprobaciones configuradas y registra errores o pendientes con honestidad. Incluye instrucciones de instalación, ejecución, pruebas y compilación en el README. No sobrescribas las especificaciones ni la guía para hacer que el resultado aparente cumplir.
```

Durante la implementación revisar archivos generados y resultados. Si aparece un fallo real, pedir su corrección y repetir la comprobación afectada. No aceptar solo el mensaje «terminado» como prueba de funcionamiento.

### Paso 8. Revisar que no falte trabajo

```text
/speckit-converge
```

Si detecta pendientes y añade tareas, implementarlas y repetir la revisión. Si la versión instalada no incluye esta etapa, registrar esa diferencia y realizar una revisión explícita contra los requisitos, acompañada de pruebas y demostración. No inventar un resultado «Converged» que no se haya obtenido.

## 10. Referencia de las APIs

### Geocodificación

Ejemplo de consulta para Lima:

```text
https://geocoding-api.open-meteo.com/v1/search?name=Lima&count=1&language=es
```

La información relevante se obtiene del primer elemento de `results`: nombre, latitud y longitud. Un resultado vacío debe producir el mensaje de ciudad no encontrada. La aplicación debe construir los parámetros de manera segura con `URL` y `URLSearchParams`.

Con `count=1`, ciudades que comparten nombre pueden resolverse a una ubicación distinta de la que el usuario tenía en mente. Es una limitación aceptada del alcance inicial, que conviene explicar en el README. [Geocoding API](https://open-meteo.com/en/docs/geocoding-api).

### Datos meteorológicos actuales

Ejemplo con coordenadas aproximadas de Lima, solo para ilustrar la URL:

```text
https://api.open-meteo.com/v1/forecast?latitude=-12.05&longitude=-77.04&current=temperature_2m,relative_humidity_2m,precipitation&timezone=auto
```

La aplicación debe utilizar las coordenadas devueltas por geocodificación en cada búsqueda; no dejar las de Lima fijas.

Campos de interés dentro de `current`:

- `temperature_2m`.
- `relative_humidity_2m`.
- `precipitation`.

No confundir precipitación en mm con probabilidad de lluvia en %. Los valores meteorológicos cambian con el tiempo; no escribir temperaturas esperadas fijas en las pruebas que consultan el servicio real. Revisar el uso aplicable y conservar atribución a Open-Meteo en la aplicación o README. [Forecast API](https://open-meteo.com/en/docs).

## 11. Archivos que debería conservar el proyecto

La estructura exacta depende de la versión de Spec Kit y del asistente. Esta es una referencia de organización, no una plantilla que deba fabricarse antes de ejecutar el flujo:

```text
clima-sdd-speckit/
  .specify/                Infraestructura y estado generados por Spec Kit
  .github/                Integración de Copilot, si se eligió esa opción
  specs/                  Especificaciones generadas, según configuración
  src/
    clients/
    services/
    components/
    types/
    utils/
    main.ts
    styles.css
  tests/                  O pruebas junto a los módulos de src/
  docs/
    evidencias/
    informe-laboratorio.md
  index.html
  package.json
  package-lock.json       Si se utiliza npm
  tsconfig.json
  README.md
```

Los archivos `spec.md`, `plan.md` y `tasks.md` deben conservarse en las ubicaciones creadas por Spec Kit. Registrar sus rutas reales en el README. No asumir que una rama o carpeta se llamará obligatoriamente `001-clima`; la gestión de funcionalidades puede variar entre versiones.

El README debe explicar objetivo, herramientas y versiones, ubicación de las especificaciones, instalación, comandos, casos de uso, pruebas, limitaciones y fuente de datos.

## 12. Ejecutar y verificar en la laptop

Cuando el asistente haya generado el proyecto, abrir PowerShell en la carpeta que contiene `package.json`. Leer antes la sección scripts de ese archivo para confirmar que los comandos acordados existen.

Para instalar dependencias por primera vez:

```powershell
npm install
```

Si se traslada un proyecto que ya tiene `package-lock.json` sincronizado, usar `npm ci` para reinstalar lo registrado. Si falla por discrepancias entre manifiesto y lockfile, pedir que se corrija la causa y no borrar archivos al azar.

Iniciar el servidor:

```powershell
npm run dev
```

Abrir en el navegador la URL que imprima la terminal. Vite suele usar `http://localhost:5173`, pero puede elegir otro puerto. Para detenerlo, pulsar `Ctrl+C`. [Guía de Vite](https://vite.dev/guide/).

En otra terminal del mismo proyecto, con los scripts que se pidió configurar:

```powershell
npm run typecheck
npm run test -- --run
npm run build
```

Esos scripts forman parte del plan propuesto. Si alguno no existe, revisar `package.json` y solicitar la configuración acordada antes de afirmar que se ejecutó.

Para revisar la compilación, si existe el script correspondiente:

```powershell
npm run preview
```

No abrir `index.html` con doble clic para probar este proyecto TypeScript/Vite: utilizar el servidor indicado en el README.

### Casos mínimos de comprobación

1. **Ciudad válida:** buscar una ciudad y comprobar nombre, valores y unidades.
2. **Enter:** enviar desde el campo y comprobar que no se duplica la búsqueda.
3. **Vacío:** debe aparecer validación, sin peticiones de red.
4. **Solo espacios:** mismo comportamiento que vacío.
5. **Espacios alrededor:** `  Lima  ` debe consultarse como `Lima`.
6. **Ciudad inexistente:** usar una búsqueda que realmente devuelva cero resultados, o simularla en una prueba. No asumir que un texto concreto siempre será inexistente.
7. **Error de geocodificación:** simular fallo de red o HTTP y comprobar mensaje, fin de carga y posibilidad de reintentar.
8. **Error meteorológico:** simular el fallo después de una geocodificación exitosa.
9. **Timeout:** simular espera con temporizadores controlados; comprobar cancelación y recuperación de la interfaz.
10. **Datos incompletos:** simular un `current` con un valor requerido ausente o nulo.
11. **Datos inválidos:** simular JSON incorrecto, estructura incompatible y valores no numéricos.
12. **Redondeo:** usar datos controlados para comprobar un decimal y humedad entera, sin alterar el valor crudo almacenado.
13. **Nueva búsqueda:** comprobar que desaparecen los datos anteriores y se muestran los nuevos al finalizar.
14. **Búsqueda mientras carga:** verificar la política elegida en la especificación.
15. **Nombre ausente:** comprobar el nombre de búsqueda como alternativa.

Los fallos difíciles de reproducir en vivo deben cubrirse con respuestas HTTP simuladas. Guardar resultados reales de ejecución. Si una prueba no se realizó o falló, registrarlo como pendiente o fallo.

## 13. Evidencias e informe propuestos

Estos elementos se recomiendan para demostrar el proceso; no se presentan como requisitos confirmados del profesor.

Guardar capturas legibles de:

- La versión de Spec Kit y la inicialización del proyecto.
- La constitución y la especificación revisadas.
- El plan técnico y las tareas generadas.
- El análisis de consistencia y las correcciones que correspondan.
- La aplicación mostrando una consulta real.
- Un caso de validación y un caso de error.
- Las pruebas, el chequeo de tipos y la compilación.
- La revisión final de pendientes o convergencia, si está disponible.

Conservar evidencia del flujo de Spec Kit, además de la pantalla final del programa. No incluir credenciales ni afirmar que las capturas documentan el laboratorio original si corresponden a la realización posterior.

### Estructura sugerida del informe

1. Enunciado recibido y alcance elegido.
2. Objetivo de la aplicación.
3. Herramientas y versiones utilizadas.
4. Aplicación del flujo SDD, con documentos y decisiones.
5. Arquitectura implementada y recorrido de una búsqueda.
6. Comprobaciones realizadas y resultados.
7. Dificultades, correcciones y limitaciones.
8. Aprendizaje: cómo ayudaron las especificaciones a dirigir y revisar al asistente.

Un ejemplo de trazabilidad que puede explicarse en el informe es: «rechazar ciudad vacía» aparece como criterio en la especificación, origina una tarea de validación y queda comprobado por una prueba que verifica que no se realiza ninguna petición.

## 14. Lista para revisar antes de entregar

### Proceso

- [ ] Se confirmó si existe una consigna adicional del profesor.
- [ ] Se usó Spec Kit realmente y se registró su versión.
- [ ] Se registraron el asistente y el modo de integración utilizados.
- [ ] Se conservan los documentos generados y las decisiones revisadas.
- [ ] Se resolvieron las contradicciones del parámetro de humedad y los errores de datos.
- [ ] Las tareas marcadas reflejan trabajo comprobado.

### Aplicación

- [ ] La aplicación inicia siguiendo el README.
- [ ] La búsqueda válida consulta las APIs reales.
- [ ] Se muestran ciudad y los tres datos con unidades correctas.
- [ ] La validación evita peticiones para entradas vacías.
- [ ] Los fallos terminan el estado de carga y permiten reintentar.
- [ ] Las pruebas, el chequeo de tipos y la compilación se ejecutaron y sus resultados están registrados.

### Entrega

- [ ] Se incluye código, especificaciones, configuración y lockfile.
- [ ] Se incluye un README suficiente para otra laptop.
- [ ] Se incluyen informe y evidencias si se adopta esta propuesta o el profesor los exige.
- [ ] Se revisó que las carpetas ocultas de Spec Kit y del asistente se conserven en la copia.
- [ ] Se excluyeron `node_modules` y credenciales del paquete o repositorio.
- [ ] Se comprobó una copia limpia, instalando dependencias desde los archivos incluidos.
- [ ] Se adaptó el formato final a lo que indique el aula: ZIP, repositorio, informe u otra opción.

Esta guía, por sí sola, no es evidencia de haber realizado el flujo ni de tener una aplicación funcionando.

## 15. Trasladar o retomar el trabajo en otra laptop

Si solo existe esta guía, copiarla y, opcionalmente, los tres recursos anteriores. En el otro equipo hay que preparar herramientas e iniciar el proyecto desde la sección 7.

Si el proyecto ya está iniciado, copiar la carpeta completa con especificaciones, código y archivos ocultos, excluyendo `node_modules`. En la otra laptop instalar las herramientas, autenticarse en el asistente, abrir esa carpeta y reinstalar dependencias. No reiniciar el proyecto por defecto.

Un repositorio Git permite conservar el historial de cambios. Publicarlo en GitHub solo si se decide usarlo como respaldo o forma de entrega; utilizar GitHub Spec Kit no implica que la aplicación se publique automáticamente.

### Prompt para un futuro asistente

```text
Lee GUIA_LABORATORIO_SDD_SPEC_KIT.md como contexto para mi trabajo académico. El único enunciado confirmado es: "Caso Práctico de implementación de flujo SDD con GitHub Spec Kit". La aplicación del clima, el stack y los entregables de la guía son una propuesta, no una rúbrica del profesor.

Antes de hacer cambios, revisa el estado de esta carpeta, las instrucciones del proyecto, las herramientas instaladas y la versión de Spec Kit. Si ya hay especificaciones o código, continúa desde ese punto y conserva los avances; no reinicialices ni sobrescribas archivos por defecto. No deduzcas que el trabajo está hecho porque la guía contenga una lista de pasos.

Ayúdame a realizar el flujo de Spec Kit con un asistente compatible: principios, especificación, aclaraciones necesarias, plan, tareas, análisis, implementación y verificación. Adapta la sintaxis a la integración y versión realmente instaladas. Explica qué debo hacer en la terminal y qué debo ejecutar en el chat. Si aún falta elegir el asistente o resolver su acceso, acláralo antes de instalar o contratar servicios.

Usa el caso de consulta meteorológica actual por ciudad y Open-Meteo, salvo que yo aporte un nuevo enunciado. Revisa los requisitos y las inconsistencias señaladas en la guía. Mantén trazabilidad, ejecuta las verificaciones pertinentes y documenta resultados reales. No inventes capturas, pruebas aprobadas, tareas completadas ni una ejecución de Spec Kit que no haya ocurrido.
```

## 16. Problemas frecuentes

### `specify` no se reconoce

Abrir una terminal nueva, comprobar `uv --version`, consultar `uv tool list` y revisar las instrucciones de PATH de la instalación. Confirmar `specify version` antes de inicializar.

### Una opción o etapa no existe

Registrar la versión y consultar su ayuda. Tutoriales antiguos y versiones nuevas pueden utilizar opciones y notaciones diferentes. No mezclar `--ai` de una guía antigua con `--integration` sin comprobar la versión. Documentar cualquier adaptación al flujo.

### Los comandos del asistente no aparecen

Comprobar la carpeta abierta, la integración elegida, el inicio de sesión y el modo skills o comandos. Reiniciar o recargar el editor si acaba de instalarse la integración. Consultar la página oficial de ese asistente.

### PowerShell bloquea `npm.ps1`

Probar `npm.cmd --version` y, si funciona, usar `npm.cmd` en los comandos del proyecto. Si el bloqueo afecta scripts propios de Spec Kit, consultar su documentación y la política de ejecución del equipo. No cambiar globalmente la configuración por ensayo y error.

### La API falla

Revisar conexión, URL, parámetros, estado HTTP y cuerpo de respuesta. Comprobar que se usa `relative_humidity_2m` y que la segunda consulta utiliza las coordenadas obtenidas en la primera. Las pruebas simuladas ayudan a separar un fallo de código de una indisponibilidad externa.

### El asistente declara que terminó, pero el proyecto no arranca

Ejecutar los pasos del README, guardar el error y solicitar una corrección concreta. Revisar de nuevo el criterio afectado. Un mensaje del asistente o una casilla marcada no sustituye una ejecución comprobada.

## 17. Fuentes para actualizar esta guía

La documentación técnica se consultó al preparar este archivo. Las opciones, integraciones y planes pueden cambiar; contrastar con la versión instalada.

- [Repositorio y licencia de Spec Kit](https://github.com/github/spec-kit).
- [Instalación de Spec Kit](https://github.github.com/spec-kit/installation.html).
- [Instalación de uv](https://github.github.com/spec-kit/install/uv.html).
- [Guía del flujo SDD](https://github.github.com/spec-kit/quickstart.html).
- [Referencia de etapas SDD](https://github.github.com/spec-kit/reference/agentic-sdd.html).
- [Integraciones compatibles](https://github.github.com/spec-kit/integrations/index.html).
- [Sintaxis de invocación](https://github.github.com/spec-kit/integrations/cli.html).
- [Integración de Copilot](https://github.github.com/spec-kit/integrations/copilot.html).
- [Planes de Copilot](https://docs.github.com/en/copilot/get-started/plans).
- [Guía de Vite](https://vite.dev/guide/).
- [Geocodificación de Open-Meteo](https://open-meteo.com/en/docs/geocoding-api).
- [Datos meteorológicos de Open-Meteo](https://open-meteo.com/en/docs).

Los recursos del laboratorio anterior son material de referencia aportado por el estudiante. Las instrucciones que contienen pertenecen al caso anterior y deben revisarse antes de trasladarlas a esta nueva tarea.
