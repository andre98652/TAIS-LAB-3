import { describe, expect, it, vi } from 'vitest';
import { createWeatherServices } from '../src/services/weather';

const location = { name: 'Lima', latitude: -12.05, longitude: -77.04 };
const current = { temperature_2m: -2.375, relative_humidity_2m: 80.5, precipitation: 0 };
const service = (body: unknown) => createWeatherServices(async () => new Response(JSON.stringify(body)));

describe('Servicios (FR-003 a FR-008, FR-010)', () => {
  it('codifica búsqueda y usa primer resultado, incluidas coordenadas cero', async () => {
    const fetcher = vi.fn(async (_input: RequestInfo | URL) => new Response(JSON.stringify({ results: [
      { latitude: 0, longitude: 0, name: 'Primera' },
      { latitude: 8, longitude: 9, name: 'Segunda' },
    ] })));
    const result = await createWeatherServices(fetcher).geocode('  São Paulo & Perú  ');
    const url = new URL(String(fetcher.mock.calls[0]?.[0]));
    expect(url.searchParams.get('name')).toBe('São Paulo & Perú');
    expect(url.searchParams.get('count')).toBe('1');
    expect(result).toMatchObject({ latitude: 0, longitude: 0, name: 'Primera' });
  });
  it.each([{}, { results: [] }, { results: [{ latitude: null, longitude: 1 }] }, { results: [{ longitude: 1 }] }])
    ('clasifica ausencia de ubicación %j', async body => {
      await expect(service(body).geocode('Lima')).rejects.toMatchObject({ code: 'CITY_NOT_FOUND' });
    });
  it.each([null, [], { results: 'no' }, { results: [null] }, { results: [{ latitude: '0', longitude: 0 }] }, { results: [{ latitude: 91, longitude: 0 }] }, { results: [{ latitude: 0, longitude: -181 }] }])
    ('rechaza estructura o coordenadas inválidas %j', async body => {
      await expect(service(body).geocode('Lima')).rejects.toMatchObject({ code: 'INVALID_RESPONSE' });
    });
  it('construye forecast con las coordenadas y variables actuales', async () => {
    const fetcher = vi.fn(async (_input: RequestInfo | URL) => new Response(JSON.stringify({ current })));
    const result = await createWeatherServices(fetcher).forecast(location);
    const url = new URL(String(fetcher.mock.calls[0]?.[0]));
    expect(url.searchParams.get('latitude')).toBe('-12.05');
    expect(url.searchParams.get('longitude')).toBe('-77.04');
    expect(url.searchParams.get('current')).toBe('temperature_2m,relative_humidity_2m,precipitation');
    expect(result).toMatchObject({ temperature: -2.375, humidity: 80.5, precipitation: 0 });
  });
  it.each(['temperature_2m', 'relative_humidity_2m', 'precipitation'])('detecta campo ausente o nulo %s', async field => {
    const missing = { ...current } as Record<string, unknown>;
    delete missing[field];
    await expect(service({ current: missing }).forecast(location)).rejects.toMatchObject({ code: 'INCOMPLETE_DATA' });
    missing[field] = null;
    await expect(service({ current: missing }).forecast(location)).rejects.toMatchObject({ code: 'INCOMPLETE_DATA' });
  });
  it.each([null, {}, { current: [] }, { current: 'x' }, { current: { ...current, relative_humidity_2m: 101 } }, { current: { ...current, precipitation: -1 } }, { current: { ...current, temperature_2m: '23' } }])
    ('rechaza datos meteorológicos inválidos %j', async body => {
      await expect(service(body).forecast(location)).rejects.toMatchObject({ code: 'INVALID_RESPONSE' });
    });
  it('preserva hora e intervalo opcionales', async () => {
    expect(await service({ current: { ...current, time: '2026-10-29T10:00', interval: 900 } }).forecast(location))
      .toMatchObject({ time: '2026-10-29T10:00', interval: 900 });
  });
});
