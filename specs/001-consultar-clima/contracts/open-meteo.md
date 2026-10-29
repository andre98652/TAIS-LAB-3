# Contratos de integración y presentación

## Geocoding

GET `https://geocoding-api.open-meteo.com/v1/search`.
Parámetros: `name` recortado y codificado con URLSearchParams, `count=1`, `language=es`.
Un objeto con results ausente o array vacío equivale a ciudad no encontrada.
Si results existe debe ser array. Su primer elemento debe ser objeto; coordenadas
ausentes/nulas se consideran ciudad no encontrada; otros tipos o rangos son inválidos.

## Forecast

GET `https://api.open-meteo.com/v1/forecast`.
Parámetros: latitude, longitude, current con las tres variables, temperature_unit=celsius,
precipitation_unit=mm, timezone=auto. La respuesta debe tener un objeto current.
temperature_2m, relative_humidity_2m y precipitation faltantes/nulos producen INCOMPLETE_DATA.
Tipos incorrectos o valores fuera del dominio producen INVALID_RESPONSE.

## Transporte común

HTTP no exitoso produce HTTP con servicio y código; JSON ilegible produce INVALID_RESPONSE.
Error de conexión produce NETWORK y expiración de AbortController produce TIMEOUT.
El temporizador de 10000 ms cubre fetch y lectura JSON y se limpia siempre en finally.

## Vista

Formulario con label, input maxlength=100, botón submit y un solo handler submit.
El controlador valida incluso las invocaciones programáticas de longitud superior a 100.
El input es editable durante carga; solo el envío queda bloqueado. Estado con role=status,
error con role=alert y resultados con nombre y unidades. Cadenas externas con textContent.
No hay datos simulados en la UI de producción. La atribución enlaza proveedor y CC BY 4.0.
