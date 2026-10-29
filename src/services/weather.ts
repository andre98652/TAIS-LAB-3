import { requestJson } from '../clients/http';
import { WeatherError, type Fetcher, type Location, type WeatherData, type WeatherServices } from '../types';

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function createWeatherServices(fetcher: Fetcher = globalThis.fetch.bind(globalThis)): WeatherServices {
  return {
    async geocode(city: string): Promise<Location> {
      const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
      url.search = new URLSearchParams({ name: city.trim(), count: '1', language: 'es' }).toString();
      const body = await requestJson(url, 'geocoding', fetcher);
      if (!record(body)) throw new WeatherError('INVALID_RESPONSE', 'geocoding');
      if (body.results === undefined) throw new WeatherError('CITY_NOT_FOUND', 'geocoding');
      if (!Array.isArray(body.results)) throw new WeatherError('INVALID_RESPONSE', 'geocoding');
      if (body.results.length === 0) throw new WeatherError('CITY_NOT_FOUND', 'geocoding');
      const first: unknown = body.results[0];
      if (!record(first)) throw new WeatherError('INVALID_RESPONSE', 'geocoding');
      if (first.latitude == null || first.longitude == null) throw new WeatherError('CITY_NOT_FOUND', 'geocoding');
      if (!finite(first.latitude) || !finite(first.longitude)
        || first.latitude < -90 || first.latitude > 90 || first.longitude < -180 || first.longitude > 180) {
        throw new WeatherError('INVALID_RESPONSE', 'geocoding');
      }
      return {
        latitude: first.latitude,
        longitude: first.longitude,
        name: typeof first.name === 'string' ? first.name : '',
        country: typeof first.country === 'string' ? first.country : undefined,
      };
    },

    async forecast(location: Location): Promise<WeatherData> {
      const url = new URL('https://api.open-meteo.com/v1/forecast');
      url.search = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current: 'temperature_2m,relative_humidity_2m,precipitation',
        temperature_unit: 'celsius',
        precipitation_unit: 'mm',
        timezone: 'auto',
      }).toString();
      const body = await requestJson(url, 'forecast', fetcher);
      if (!record(body) || !record(body.current)) throw new WeatherError('INVALID_RESPONSE', 'forecast');
      const current = body.current;
      if (current.temperature_2m == null || current.relative_humidity_2m == null || current.precipitation == null) {
        throw new WeatherError('INCOMPLETE_DATA', 'forecast');
      }
      if (!finite(current.temperature_2m) || !finite(current.relative_humidity_2m) || !finite(current.precipitation)
        || current.relative_humidity_2m < 0 || current.relative_humidity_2m > 100 || current.precipitation < 0) {
        throw new WeatherError('INVALID_RESPONSE', 'forecast');
      }
      return {
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        precipitation: current.precipitation,
        time: typeof current.time === 'string' ? current.time : undefined,
        interval: finite(current.interval) && current.interval > 0 ? current.interval : undefined,
      };
    },
  };
}
