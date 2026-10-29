import { WeatherError, type AppState, type WeatherServices } from './types';
import type { WeatherView } from './components/WeatherView';

export class WeatherController {
  state: AppState = 'idle';

  constructor(private readonly view: WeatherView, private readonly services: WeatherServices) {
    view.onSearch(city => { void this.search(city); });
  }

  async search(rawCity: string): Promise<void> {
    if (this.state === 'loading') return;
    const city = rawCity.trim();
    this.view.clearError();
    this.view.clearResults();
    if (!city || city.length > 100) {
      this.state = 'error';
      this.view.showError(new WeatherError('VALIDATION').message, true);
      return;
    }
    this.state = 'loading';
    this.view.setLoading(true);
    try {
      const location = await this.services.geocode(city);
      const weather = await this.services.forecast(location);
      this.view.showWeather(location, weather, city);
      this.state = 'success';
    } catch (error) {
      this.state = 'error';
      this.view.showError(error instanceof WeatherError ? error.message : 'No pudimos completar la búsqueda. Inténtalo de nuevo.');
    } finally {
      this.view.setLoading(false);
    }
  }
}
