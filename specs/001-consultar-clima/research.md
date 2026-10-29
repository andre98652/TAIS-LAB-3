# Research: decisiones del caso meteorológico

## Proveedor y significado de los datos

- **Decision**: Geocoding con `count=1`, `language=es` y primer resultado. Forecast con
  `current=temperature_2m,relative_humidity_2m,precipitation`, unidades Celsius/mm y zona auto.
- **Rationale**: Coincide con el alcance previo y evita confundir humedad o probabilidad
  de lluvia. Son datos meteorológicos modelados. Conservar hora e intervalo si existen.
- **Alternatives considered**: Selector de ciudades o previsión diaria, fuera del alcance inicial.
- Fuentes: [Geocoding](https://open-meteo.com/en/docs/geocoding-api),
  [Forecast](https://open-meteo.com/en/docs).

La precipitación corresponde al intervalo retrospectivo indicado en `current.interval`.
La UI no afirmará «última hora» si el proveedor no lo indica. Sin intervalo, usará una
etiqueta genérica. La investigación fue contrastada por un agente de lectura en fase plan.

## Ejecución local y herramientas

- **Decision**: TypeScript, Vite, Vitest y happy-dom; versiones efectivas fijadas en lockfile.
- **Rationale**: Una sola pantalla no necesita framework de componentes. El DOM simulado
  comprueba accesibilidad estructural y eventos; no demuestra por sí mismo el diseño visual.
- **Alternatives considered**: React y backend, descartados porque añaden trabajo sin necesidad.
- Fuentes: [Vite](https://vite.dev/guide/), [Vitest](https://vitest.dev/guide/).

## Errores y transporte

- **Decision**: AbortController y timeout que permanece activo hasta terminar response.json().
  Cada servicio clasifica datos; el cliente común clasifica transporte y JSON ilegible.
- **Rationale**: Evita que el cuerpo pueda quedar bloqueado después de recibir cabeceras.
- **Alternatives considered**: Timeout solo de fetch, insuficiente para FR-011.

## Acceso y atribución

- **Decision**: API pública para demostración académica no comercial; no se requiere API key
  en estas URLs. Incluir crédito y licencia, e indicar redondeo de presentación.
- **Rationale**: Cumplir las condiciones aplicables y hacer comprensible la fuente.
- **Alternatives considered**: Servicio comercial, innecesario para este alcance.
- Fuentes: [Términos](https://open-meteo.com/en/terms),
  [Licencia](https://open-meteo.com/en/licence).

La disponibilidad y los límites pertenecen al proveedor. La aplicación no promete
disponibilidad continua ni interpreta los datos como una alerta meteorológica.
