# Data Model

## Location

- `latitude`: número finito entre -90 y 90, inclusive. Cero es válido.
- `longitude`: número finito entre -180 y 180, inclusive. Cero es válido.
- `name`: cadena, puede quedar vacía para activar fallback.
- `country`: cadena opcional, solo para contexto de ubicación.

## WeatherData

- `temperature`: número finito en °C; admite valores negativos.
- `humidity`: número finito en [0,100].
- `precipitation`: número finito no negativo en mm.
- `time`: cadena opcional de referencia del proveedor.
- `interval`: número positivo finito opcional, en segundos.

Los valores se guardan crudos; formateadores de UI aplican un decimal o redondeo entero.

## AppState

- idle: formulario listo, sin resultados.
- loading: nombre capturado, error y datos anteriores vacíos, envío bloqueado.
- success: ubicación y WeatherData visibles; envío disponible.
- error: mensaje visible, sin datos antiguos; envío disponible.

## WeatherError

Categorías: VALIDATION, CITY_NOT_FOUND, NETWORK, TIMEOUT, HTTP, INVALID_RESPONSE,
INCOMPLETE_DATA. Servicio externo: geocoding o forecast; status HTTP opcional.
Mensaje en español derivado de servicio y categoría, sin presentar detalles internos al usuario.

No se persiste información entre recargas; la aplicación no solicita ubicación del dispositivo.
