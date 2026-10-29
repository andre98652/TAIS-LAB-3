export type Service = 'geocoding' | 'forecast';
export type ErrorCode = 'VALIDATION' | 'CITY_NOT_FOUND' | 'NETWORK' | 'TIMEOUT' | 'HTTP' | 'INVALID_RESPONSE' | 'INCOMPLETE_DATA';
export type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  time?: string;
  interval?: number;
}

export interface WeatherServices {
  geocode(city: string): Promise<Location>;
  forecast(location: Location): Promise<WeatherData>;
}

export type AppState = 'idle' | 'loading' | 'success' | 'error';

export class WeatherError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly service?: Service,
    public readonly status?: number,
  ) {
    const label = service === 'geocoding' ? 'de búsqueda de ciudades' : 'meteorológico';
    const messages: Record<ErrorCode, string> = {
      VALIDATION: 'Escribe el nombre de una ciudad, de 1 a 100 caracteres.',
      CITY_NOT_FOUND: 'No encontramos esa ciudad. Revisa el nombre e inténtalo de nuevo.',
      NETWORK: `No pudimos conectar con el servicio ${label}. Revisa tu conexión y vuelve a intentar.`,
      TIMEOUT: `El servicio ${label} no respondió a tiempo. Vuelve a intentar.`,
      HTTP: `El servicio ${label} devolvió un error. Inténtalo de nuevo más tarde.`,
      INVALID_RESPONSE: `El servicio ${label} envió datos no válidos. Vuelve a intentar.`,
      INCOMPLETE_DATA: 'Los datos meteorológicos están incompletos. Prueba otra vez más tarde.',
    };
    super(messages[code]);
    this.name = 'WeatherError';
  }
}
