# Tasks: Consultar el clima de una ciudad

**Input**: spec.md, plan.md, research.md, data-model.md y contracts/.
**Tests**: Solicitadas por la propuesta y la constitución. Escribir pruebas antes del código.
**Organization**: Historias US1, US2 y US3 de la especificación.

## Phase 1: Setup

- [x] T001 Configurar dependencias y scripts en app/package.json, app/tsconfig.json y app/vite.config.ts.
- [x] T002 Crear marcado base y exclusiones locales en app/index.html y .gitignore.

## Phase 2: Foundational

- [x] T003 Definir tipos, errores y contratos de vista en app/src/types/index.ts; Location.latitude «número finito entre -90 y 90», longitude «número finito entre -180 y 180» (FR-005).
- [x] T004 Escribir pruebas de HTTP, JSON y timeout incluyendo cuerpo lento en app/tests/http.test.ts (FR-010, FR-011).
- [x] T005 Implementar cliente HTTP común con lectura JSON, AbortController y limpieza en app/src/clients/http.ts (FR-010, FR-011).

## Phase 3: User Story 1 - Consulta actual (P1)

**Goal**: Consulta válida que muestra ciudad y tres datos.
**Independent Test**: Respuestas controladas y búsqueda real desde navegador.

- [x] T006 [US1] Escribir pruebas de mapeo, coordenadas cero y URLs en app/tests/services.test.ts (FR-003, FR-005, FR-006).
- [x] T007 [US1] Implementar geocodificación y pronóstico en app/src/services/weather.ts; humidity «número finito en [0,100]», precipitation «número finito no negativo» (FR-003 a FR-006).
- [x] T008 [US1] Escribir pruebas de unidades, redondeo y fallback en app/tests/view.test.ts (FR-006 a FR-008).
- [x] T009 [P] [US1] Implementar formateadores sin alterar datos en app/src/utils/formatters.ts (FR-007).
- [x] T010 [US1] Implementar vista de resultados y fuente en app/src/components/WeatherView.ts (FR-006, FR-008).
- [x] T011 [US1] Escribir integración de flujo exitoso en app/tests/controller.test.ts e implementar app/src/WeatherController.ts y app/src/main.ts (FR-002, FR-006, FR-008).

## Phase 4: User Story 2 - Recuperación (P2)

**Goal**: Fallos identificables y reintento disponible.
**Independent Test**: Vacío, ubicación inexistente, JSON/HTTP incompleto y siguiente consulta válida.

- [x] T012 [US2] Ampliar app/tests/services.test.ts con ausencias, tipos, rangos y clasificación de errores; consolidar validadores en app/src/services/weather.ts (FR-004, FR-005, FR-010).
- [x] T013 [US2] Probar validación de 1 a 100 caracteres tras trim y reintento en app/tests/controller.test.ts; completar mensajes y recuperación en app/src/WeatherController.ts (FR-001, FR-010, FR-012).

## Phase 5: User Story 3 - Estados y teclado (P3)

**Goal**: Una sola búsqueda, carga accesible y limpieza de resultados.
**Independent Test**: Submit/Enter, envío mientras carga y nuevo resultado.

- [x] T014 [US3] Añadir pruebas de submit único, bloqueo, limpieza y cadenas externas en app/tests/view.test.ts y app/tests/controller.test.ts (FR-002, FR-009, FR-013 a FR-016).
- [x] T015 [US3] Completar estados accesibles, foco y protección textContent en app/src/components/WeatherView.ts y app/src/WeatherController.ts (FR-009, FR-012 a FR-016).
- [x] T016 [US3] Diseñar interfaz adaptable y foco visible en app/src/styles.css (FR-015, SC-006).

## Phase 6: Polish & Cross-Cutting

- [x] T017 Documentar ejecución, decisiones y trazabilidad en README.md y docs/bitacora-sdd.md (SC-005).
- [x] T018 Ejecutar suite, typecheck y build; guardar resultados en docs/evidencias/ (SC-001 a SC-005).
- [x] T019 Comprobar vista en navegador a 360 px y escritorio, consulta real y revisión de completitud; documentar en docs/evidencias/ (SC-001, SC-003, SC-006).

## Dependencies & Execution Order

Setup -> Foundational -> US1 -> recuperación US2 -> estados US3 -> revisión final.
Los ensayos de US2/US3 son independientes con servicios simulados aunque reutilizan la vista.
T009 puede desarrollarse aparte de T010 cuando estén definidas sus firmas. Las pruebas
de módulos diferentes pueden ejecutarse en paralelo; se ejecutarán secuencialmente para
mantener sencilla la bitácora del laboratorio.

## Implementation Strategy

Primero entrega mínima US1, luego errores y accesibilidad. Cada tarea se marca cuando
sus archivos y comprobaciones existan. El análisis documental no equivale a aprobar tests.
No hay tareas de publicación externa en este caso local.
