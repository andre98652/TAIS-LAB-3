<!-- Sync Impact Report: scaffold -> 1.0.0. Initial adoption of five principles,
scope constraints and review workflow. No removed sections or deferred values. -->
# Clima por ciudad Constitution

## Core Principles

### I. Especificaciones verificables

El comportamiento DEBE definirse en requisitos identificables antes de implementarse.
Cada cambio de comportamiento DEBE actualizar la especificación y sus comprobaciones.
Las tareas completadas DEBEN corresponder a archivos y verificaciones reales.

### II. Responsabilidades separadas

La presentación, la coordinación, la interpretación de respuestas y el transporte HTTP
DEBEN mantenerse separados. Los servicios DEBEN poder probarse con transporte simulado.
No se añadirán capas sin una responsabilidad concreta.

### III. Datos y fallos explícitos

Toda entrada y respuesta externa DEBE validarse. Los valores crudos DEBEN conservarse;
el redondeo pertenece exclusivamente a la presentación. Los errores DEBEN distinguir
validación, ubicación inexistente, red, timeout, HTTP, respuesta inválida y datos incompletos.

### IV. Experiencia accesible en español

La interfaz DEBE ofrecer etiquetas, foco visible, envío por teclado, estados de carga
y mensajes comprensibles. El usuario DEBE poder recuperarse después de cualquier fallo.
Los datos reales y las simulaciones de pruebas DEBEN identificarse como tales.

### V. Verificación reproducible

El proyecto DEBE incluir pruebas significativas de éxito y errores, chequeo de tipos,
compilación y documentación de ejecución. Los resultados DEBEN registrarse con honestidad:
una comprobación no ejecutada no puede declararse aprobada.

## Alcance y restricciones

Caso académico local de consulta meteorológica actual por ciudad con datos de Open-Meteo.
No requiere cuentas, almacenamiento persistente, mapas ni previsión de varios días.
Las dependencias DEBEN limitarse a necesidades de ejecución, desarrollo y pruebas.
Los secretos y entornos locales de herramientas NO DEBEN incorporarse a una entrega.

## Flujo y revisión

Seguir especificación, planificación, tareas, análisis, implementación y revisión final.
Revisar los documentos generados antes de implementar. Los criterios de aceptación
DEBEN trazarse a pruebas o comprobaciones documentadas. Registrar limitaciones externas.

## Governance

Esta constitución se adopta para el caso práctico propuesto y no sustituye una rúbrica
del profesor. Toda modificación DEBE describir su motivo e impacto en requisitos y pruebas.
Versionar cambios incompatibles como mayor, nuevos principios como menor y aclaraciones
como parche. La revisión final DEBE evaluar estos cinco principios.

**Version**: 1.0.0 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-10-29
