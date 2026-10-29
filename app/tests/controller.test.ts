import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WeatherView } from '../src/components/WeatherView';
import { WeatherController } from '../src/WeatherController';
import { WeatherError, type WeatherData } from '../src/types';

let view: WeatherView;
const location = { name: 'Lima', latitude: -12.05, longitude: -77.04 };
const weather = { temperature: 20.15, humidity: 70.2, precipitation: 0 };
beforeEach(() => { document.body.innerHTML = '<div id="test"></div>'; view = new WeatherView(document.querySelector('#test')!); });
const services = () => ({ geocode: vi.fn(async (_city: string) => location), forecast: vi.fn(async () => weather) });

describe('Flujo completo y recuperación', () => {
  it('recorta, consulta secuencialmente y presenta datos', async () => {
    const api = services();
    await new WeatherController(view, api).search('  Lima  ');
    expect(api.geocode).toHaveBeenCalledExactlyOnceWith('Lima');
    expect(api.forecast).toHaveBeenCalledExactlyOnceWith(location);
    expect(view.result.hidden).toBe(false);
    expect(view.submit.disabled).toBe(false);
  });
  it.each(['', '   ', '\t\n', 'a'.repeat(101)])('rechaza entrada %j sin red', async city => {
    const api = services();
    await new WeatherController(view, api).search(city);
    expect(api.geocode).not.toHaveBeenCalled();
    expect(view.error.hidden).toBe(false);
    expect(view.input.disabled).toBe(false);
  });
  it('se recupera después de ciudad no encontrada', async () => {
    const api = services();
    api.geocode.mockRejectedValueOnce(new WeatherError('CITY_NOT_FOUND', 'geocoding'));
    const controller = new WeatherController(view, api);
    await controller.search('nada');
    expect(api.forecast).not.toHaveBeenCalled();
    expect(view.error.textContent).toContain('No encontramos');
    expect(view.submit.disabled).toBe(false);
    await controller.search('Lima');
    expect(view.error.hidden).toBe(true);
    expect(view.result.hidden).toBe(false);
  });
  it('oculta carga también si falla forecast', async () => {
    const api = services();
    api.forecast.mockRejectedValueOnce(new WeatherError('INCOMPLETE_DATA', 'forecast'));
    await new WeatherController(view, api).search('Lima');
    expect(view.error.textContent).toContain('incompletos');
    expect(view.submit.disabled).toBe(false);
    expect(view.result.hidden).toBe(true);
  });
  it('limpia antes de la nueva respuesta e ignora envíos durante carga', async () => {
    const api = services();
    const controller = new WeatherController(view, api);
    await controller.search('Lima');
    let finish!: (data: WeatherData) => void;
    api.forecast.mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
    const pending = controller.search('Cusco');
    await vi.waitFor(() => expect(api.forecast).toHaveBeenCalledTimes(2));
    expect(view.result.hidden).toBe(true);
    expect(view.result.querySelector('[data-city]')?.textContent).toBe('');
    await controller.search('Arequipa');
    expect(api.geocode).toHaveBeenCalledTimes(2);
    finish(weather);
    await pending;
    expect(view.submit.disabled).toBe(false);
  });
});
