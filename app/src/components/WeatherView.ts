import type { Location, WeatherData } from '../types';
import { formatCoordinates, formatHumidity, formatPrecipitation, formatTemperature } from '../utils/formatters';

const compass = `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="1.5"/><path d="m30 18-4 8-8 4 4-8 8-4Z" fill="currentColor"/><path d="M24 1v7m0 32v7M1 24h7m32 0h7" stroke="currentColor"/></svg>`;
const sun = `<svg viewBox="0 0 160 160" fill="none" aria-hidden="true"><circle cx="80" cy="80" r="37" stroke="currentColor" stroke-width="1.3"/><circle cx="80" cy="80" r="51" stroke="currentColor" stroke-width=".6" stroke-dasharray="2 5"/><path d="M80 9v19m0 104v19M9 80h19m104 0h19M30 30l13 13m74 74 13 13M30 130l13-13m74-74 13-13" stroke="currentColor" stroke-width="1.3"/></svg>`;

export class WeatherView {
  readonly form: HTMLFormElement;
  readonly input: HTMLInputElement;
  readonly submit: HTMLButtonElement;
  readonly result: HTMLElement;
  readonly error: HTMLElement;
  private readonly status: HTMLElement;
  private readonly welcome: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    root.innerHTML = `
      <div class="page-shell">
        <header class="masthead"><a class="brand" href="./" aria-label="Latitud, inicio">${compass}<span>latitud<span class="brand-dot">.</span></span></a><span class="masthead-note">Una ventana al tiempo de cada lugar</span></header>
        <main>
          <section class="intro" aria-labelledby="page-title">
            <div class="intro-copy"><p class="eyebrow"><span class="tiny-line"></span> EL TIEMPO, AHORA</p><h1 id="page-title">Cada ciudad.<br>Un nuevo <em>cielo.</em></h1><p class="intro-description">Descubre cómo está el tiempo en ese lugar<br class="desktop-break"> que tienes en mente.</p></div>
            <div class="search-panel"><p class="panel-index">01 / ELIGE UN LUGAR</p><form novalidate><label for="city">¿Qué ciudad quieres explorar?</label><div class="input-row"><input id="city" name="city" maxlength="100" autocomplete="off" placeholder="Por ejemplo, Lima" aria-describedby="search-help search-error"><button class="search-button" type="submit"><span>Consultar</span><span aria-hidden="true">↗</span></button></div><p id="search-help" class="form-help">Escribe su nombre y presiona Enter.</p></form><div class="suggestions"><span>Prueba con</span><button type="button" data-example="Lima">Lima</button><button type="button" data-example="Cusco">Cusco</button><button type="button" data-example="Arequipa">Arequipa</button></div></div>
          </section>
          <section class="weather-section" aria-label="Resultados del tiempo" aria-busy="false">
            <div class="section-label"><span>CONDICIONES ACTUALES</span><span class="source-tag"><span></span> OPEN-METEO</span></div>
            <p class="search-status" role="status" aria-live="polite" hidden></p>
            <p id="search-error" class="error-message" role="alert" hidden></p>
            <div class="welcome"><div class="sun-illustration">${sun}</div><div><h2>El mundo tiene muchos cielos.</h2><p>Empieza con una ciudad para conocer el suyo.</p></div><span class="welcome-coordinate" aria-hidden="true">N / S<br>O / E</span></div>
            <article class="weather-result" hidden aria-label="Datos de la ciudad"><div class="location-heading"><div><p class="eyebrow">TU LUGAR EN EL MAPA</p><h2 data-city></h2><p class="location-detail" data-location></p></div><div class="reference-time" data-time></div></div><div class="metrics"><section class="metric temperature"><p class="metric-name">Temperatura</p><p class="metric-value" data-temperature></p><p class="metric-note">A 2 metros del suelo</p></section><section class="metric"><p class="metric-name">Humedad relativa</p><p class="metric-value" data-humidity></p><p class="metric-note">Vapor de agua en el aire</p></section><section class="metric"><p class="metric-name">Precipitación</p><p class="metric-value" data-precipitation></p><p class="metric-note" data-interval>Del intervalo actual</p></section></div></article>
          </section>
          <aside class="field-note"><span class="field-note-label">UNA NOTA SOBRE EL TIEMPO</span><p>La misma hora, distintas latitudes. Los datos describen condiciones modeladas para la ubicación encontrada.</p></aside>
        </main>
        <footer><span>Hecho para mirar un poco más allá.</span><p>Datos: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a><span class="footer-detail">Valores redondeados para su presentación.</span></p></footer>
      </div>`;
    this.form = this.find('form');
    this.input = this.find('#city');
    this.submit = this.find('[type="submit"]');
    this.result = this.find('.weather-result');
    this.error = this.find('#search-error');
    this.status = this.find('[role="status"]');
    this.welcome = this.find('.welcome');
    root.querySelectorAll<HTMLButtonElement>('[data-example]').forEach(button => {
      button.addEventListener('click', () => {
        this.input.value = button.dataset.example ?? '';
        this.form.requestSubmit();
      });
    });
  }

  private find<T extends HTMLElement>(selector: string): T {
    const element = this.root.querySelector<T>(selector);
    if (!element) throw new Error(`Falta elemento de la vista: ${selector}`);
    return element;
  }

  onSearch(callback: (city: string) => void): void {
    this.form.addEventListener('submit', event => { event.preventDefault(); callback(this.input.value); });
  }

  setLoading(loading: boolean): void {
    this.submit.disabled = loading;
    this.submit.querySelector('span')!.textContent = loading ? 'Buscando' : 'Consultar';
    this.status.hidden = !loading;
    this.status.textContent = loading ? 'Buscando la ciudad y sus condiciones actuales…' : '';
    this.find('.weather-section').setAttribute('aria-busy', String(loading));
    this.root.querySelectorAll<HTMLButtonElement>('[data-example]').forEach(button => { button.disabled = loading; });
    if (loading) this.welcome.hidden = true;
  }

  clearResults(): void {
    this.result.hidden = true;
    this.result.querySelectorAll('[data-city], [data-location], [data-time], [data-temperature], [data-humidity], [data-precipitation]')
      .forEach(element => { element.textContent = ''; });
    this.welcome.hidden = false;
  }

  clearError(): void {
    this.error.hidden = true;
    this.error.textContent = '';
    this.input.removeAttribute('aria-invalid');
  }

  showError(message: string, validation = false): void {
    this.error.textContent = message;
    this.error.hidden = false;
    if (validation) this.input.setAttribute('aria-invalid', 'true');
    this.welcome.hidden = false;
    this.input.focus();
  }

  showWeather(location: Location, weather: WeatherData, searchedCity: string): void {
    this.find('[data-city]').textContent = location.name.trim() || searchedCity;
    this.find('[data-location]').textContent = [location.country, formatCoordinates(location.latitude, location.longitude)].filter(Boolean).join(' · ');
    this.find('[data-time]').textContent = weather.time ? `Referencia local\n${weather.time.replace('T', ' · ')}` : 'Condiciones actuales';
    this.find('[data-temperature]').textContent = formatTemperature(weather.temperature);
    this.find('[data-humidity]').textContent = formatHumidity(weather.humidity);
    this.find('[data-precipitation]').textContent = formatPrecipitation(weather.precipitation);
    this.find('[data-interval]').textContent = weather.interval
      ? `Acumulada en ${Number((weather.interval / 60).toFixed(1))} min`
      : 'Del intervalo actual';
    this.welcome.hidden = true;
    this.result.hidden = false;
  }
}
