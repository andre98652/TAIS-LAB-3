# Bitácora de realización del laboratorio

## Reorganización posterior de la entrega

Por solicitud del estudiante, la aplicación se agrupó en `app/`: código, pruebas,
HTML, manifiestos npm, configuraciones y directorios locales de dependencias y build.
Las especificaciones, el informe y las evidencias permanecen en la raíz del repositorio.
Los comandos npm se ejecutan ahora desde `app/`. Las capturas y el informe conservan
las rutas históricas de la realización original.

Fecha: 29 de octubre de 2026. Carpeta: `D:/tais lab3/clima-sdd-speckit`.

## Contexto

Se retomó la idea del clima del laboratorio anterior con Kiro. El nuevo enunciado fue
«Caso Práctico de implementación de flujo SDD con GitHub Spec Kit». La implementación
actual se creó en una carpeta nueva. Los datos y conclusiones del informe anterior
no se consideran resultados de esta realización.

## Preparación comprobada

1. Se creó un entorno Python local con el runtime 3.12.14 disponible en Codex.
2. Se instalaron desde el registro oficial uv 0.13.6 y specify-cli 1.2.5.
3. Se ejecutó `specify version`, y después `specify init --here --force --non-interactive
   --integration codex --script ps` en la carpeta nueva, que solo contenía `.tools/`.
4. La CLI instaló plantillas, scripts de PowerShell, memoria y skills de la integración.

## Etapas del asistente

Se leyeron las instrucciones reales de `.agents/skills/speckit-*/SKILL.md`. Las skills
son procedimientos para el asistente: no se fingió una llamada de terminal a `$speckit-*`
ni se ejecutó un segundo modelo para generar los documentos.

- **Constitution**: se resolvió la plantilla mediante `resolve-template.ps1` y se adoptaron
  cinco principios, versión 1.0.0.
- **Specify**: se resolvió spec-template; se creó `specs/001-consultar-clima`, tres historias,
  16 requisitos funcionales, seis criterios de éxito y checklist de calidad. Se registró
  la funcionalidad activa en `.specify/feature.json`.
- **Plan**: se ejecutó `setup-plan.ps1 -Json`; se documentaron stack, capas y contrato.
  La skill solicitaba investigación delegada: se realizó una revisión acotada de fuentes
  oficiales de Open-Meteo y se incorporaron hora, intervalo y atribución.
- **Tasks**: se ejecutó `setup-tasks.ps1 -Json`; se generaron 19 tareas en seis fases,
  agrupadas por historia y con rutas de archivos.
- **Analyze**: se comprobaron prerrequisitos y se revisó consistencia de documentos antes
  de implementar. Se resolvieron en el diseño el parámetro de humedad, el timeout del cuerpo
  y la clasificación de datos incompletos. La revisión es del asistente, no aprobación docente.
- **Implement**: se escribieron primero pruebas y se ejecutaron antes del código. La primera
  ejecución no pudo resolver módulos aún inexistentes: cuatro suites fallidas y cero casos
  ejecutados. Se conserva esa salida; no se describe como 47 fallos de comportamiento.
  Después se implementaron cliente, servicios, vista, controlador y estilos.

## Resultados técnicos

- Suite final: 47 casos aprobados en cuatro archivos.
- Typecheck: aprobado. La primera ejecución detectó el tipo del import CSS y dos firmas
  de mocks; se corrigieron antes de la compilación final.
- Build: aprobado, con salida en dist.
- Navegador: consulta real de Lima, con 26.3 °C, 67 % y 0.0 mm en la captura;
  referencia local del proveedor 2026-10-29 10:00. Son valores de esa consulta, no constantes.
- Enter: consulta de `  Cusco  ` resuelta por el servicio como Cuzco, con 16.2 °C,
  47 % y 0.0 mm en la captura del mismo periodo.
- Vacío: se verificó el mensaje con entrada de espacios.
- Responsive: ancho de viewport 360 px y ancho de documento 345 px, sin desbordamiento horizontal.
- La consola del navegador consultada no mostró errores ni avisos durante esa revisión.

## Incidencias del entorno

La restricción de red impidió algunas descargas y el acceso al servidor ejecutado dentro
del sandbox. Se usaron autorizaciones de herramientas para descargar dependencias y
ejecutar temporalmente Vite fuera de ese entorno, limitado a 127.0.0.1:5179.
La pestaña anterior apuntaba a 5178; se abrió y comprobó 5179 con HTTP 200.

## Evidencias y límites

Los archivos de docs/evidencias contienen salidas reales y capturas del navegador.
No se utilizaron fast-check, jsdom ni Testing Library en esta realización. No se midió
cobertura porcentual, no se realizó npm audit y no se publicó el proyecto en GitHub.
Las simulaciones prueban errores controlados; las consultas de navegador prueban el
recorrido real en ese momento y no garantizan disponibilidad futura del proveedor.
