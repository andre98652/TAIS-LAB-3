import './styles.css';
import { WeatherView } from './components/WeatherView';
import { createWeatherServices } from './services/weather';
import { WeatherController } from './WeatherController';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('No se encontró la raíz de la aplicación.');
new WeatherController(new WeatherView(root), createWeatherServices());
