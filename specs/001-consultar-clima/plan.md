# Implementation Plan: Consultar el clima de una ciudad

**Branch**: Sin rama Git; funcionalidad `001-consultar-clima` | **Date**: 2026-10-29
**Spec**: [spec.md](spec.md)

**Input**: Especificación de consulta actual por ciudad.

## Summary

SPA local con Vite y TypeScript. El navegador consulta Geocoding y Forecast de Open-Meteo.
Interfaz editorial sobria en español, con formulario principal, estados accesibles y tres
métricas. Los valores solo se redondean al presentarse. Se comprueba con Vitest y DOM simulado.

## Technical Context

**Language/Version**: TypeScript estricto y Node.js 24 disponible en el equipo.
**Primary Dependencies**: Vite para desarrollo/build; sin dependencias de ejecución.
**Storage**: Estado en memoria, sin persistencia.
**Testing**: Vitest, happy-dom, transporte inyectable y temporizadores controlados.
**Target Platform**: Navegadores modernos de escritorio y móvil; desarrollo en Windows.
**Project Type**: Aplicación web estática local.
**Performance Goals**: Actualizar carga sin esperar la red; una sola búsqueda activa.
**Constraints**: Dos peticiones secuenciales, timeout de 10 s para cada cuerpo completo.
**Scale/Scope**: Una pantalla, tres historias, proveedor público para uso académico.

## Constitution Check

Antes de investigación: PASS. Requisitos FR-001 a FR-016 identificados, capas separadas,
validación, accesibilidad y comprobaciones previstas; sin complejidad adicional.
Después del diseño: PASS. Los contratos y modelos describen errores y valores crudos;
quickstart define validación reproducible. No hay excepciones a los cinco principios.

## Project Structure

### Documentation (this feature)

```text
specs/001-consultar-clima/
  spec.md
  plan.md
  research.md
  data-model.md
  contracts/open-meteo.md
  quickstart.md
  checklists/requirements.md
  tasks.md
```

### Source Code (repository root)

```text
app/
  src/
    clients/http.ts
    services/weather.ts
    types/index.ts
    utils/formatters.ts
    components/WeatherView.ts
    WeatherController.ts
    main.ts
    styles.css
  tests/
    http.test.ts
    services.test.ts
    controller.test.ts
    view.test.ts
  index.html
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
  README.md
docs/
  bitacora-sdd.md
  evidencias/
informe/
README.md
```

**Structure Decision**: Un cliente HTTP común recibe fetch y cubre fetch + JSON dentro
del timeout. Los servicios construyen URLs y validan estructuras. El controlador recibe
servicios y vista inyectables; la vista usa textContent para datos externos.

## Phase 0: Research

Decisiones y alternativas en [research.md](research.md). Se revisó documentación oficial
y se delegó una investigación acotada del contrato meteorológico siguiendo speckit-plan.
Sin incógnitas técnicas pendientes que impidan implementar.

## Phase 1: Design

Modelos en [data-model.md](data-model.md), contrato de proveedor y de UI en
[contracts/open-meteo.md](contracts/open-meteo.md), guía en [quickstart.md](quickstart.md).

Estados: idle -> loading -> success/error. Un envío inválido no llega a red. Mientras
loading se ignoran otros envíos. El campo sigue editable; se usa el nombre capturado
al inicio para el fallback y se libera el botón en finally.

Errores: VALIDATION, CITY_NOT_FOUND, NETWORK, TIMEOUT, HTTP, INVALID_RESPONSE,
INCOMPLETE_DATA. Cada error externo conserva servicio y, si corresponde, estado HTTP.
La ausencia de results equivale a cero resultados; results de tipo incorrecto es inválido.
La ausencia de current es estructura incompatible; un objeto current con datos faltantes
es incompleto. Campos presentes no numéricos, no finitos o fuera de dominio son inválidos.

No hay despliegue en servicios externos; se entrega y muestra localmente.
