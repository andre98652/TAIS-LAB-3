import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WeatherView } from '../src/components/WeatherView';
import { formatTemperature, formatHumidity, formatPrecipitation } from '../src/utils/formatters';

let view: WeatherView;
beforeEach(() => { document.body.innerHTML = '<main id="test"></main>'; view = new WeatherView(document.querySelector('#test')!); });

describe('Vista y formato (FR-002, FR-006 a FR-009, FR-015, FR-016)', () => {
  it('formatea valores y unidades', () => {
    expect(formatTemperature(-2.375)).toBe('-2.4 °C');
    expect(formatHumidity(80.5)).toBe('81 %');
    expect(formatPrecipitation(0)).toBe('0.0 mm');
  });
  it('etiqueta campo, limita longitud y registra un solo submit', () => {
    const callback = vi.fn();
    view.onSearch(callback);
    view.input.value = 'Lima';
    view.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(callback).toHaveBeenCalledExactlyOnceWith('Lima');
    expect(view.input.maxLength).toBe(100);
    expect(document.querySelector(`label[for="${view.input.id}"]`)).not.toBeNull();
    expect(view.submit.type).toBe('submit');
  });
  it('muestra nombre alternativo y unidades sin modificar los valores crudos', () => {
    const weather = { temperature: -2.375, humidity: 80.5, precipitation: 0 };
    view.showWeather({ name: '', latitude: 0, longitude: 0 }, weather, 'Lima');
    expect(view.result.textContent).toContain('Lima');
    expect(view.result.textContent).toContain('-2.4');
    expect(view.result.textContent).toContain('81');
    expect(view.result.textContent).toContain('°C');
    expect(view.result.textContent).toContain('mm');
    expect(weather.temperature).toBe(-2.375);
  });
  it('presenta nombres externos como texto', () => {
    view.showWeather({ name: '<img src=x onerror=alert(1)>', latitude: 0, longitude: 0 }, { temperature: 1, humidity: 50, precipitation: 0 }, 'Lima');
    expect(view.result.querySelector('img')).toBeNull();
    expect(view.result.textContent).toContain('<img src=x onerror=alert(1)>');
  });
  it('limpia resultados, anuncia carga y mantiene input editable', () => {
    view.showWeather({ name: 'Lima', latitude: 0, longitude: 0 }, { temperature: 1, humidity: 50, precipitation: 0 }, 'Lima');
    view.clearResults();
    view.setLoading(true);
    expect(view.result.hidden).toBe(true);
    expect(view.result.querySelector('[data-city]')?.textContent).toBe('');
    expect(view.submit.disabled).toBe(true);
    expect(view.input.disabled).toBe(false);
    expect(document.querySelector('[role="status"]')?.textContent).toContain('Buscando');
    view.setLoading(false);
    expect(view.submit.disabled).toBe(false);
  });
});
