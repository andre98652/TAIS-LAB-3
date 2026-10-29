export const formatTemperature = (value: number): string => `${value.toFixed(1)} °C`;
export const formatHumidity = (value: number): string => `${Math.round(value)} %`;
export const formatPrecipitation = (value: number): string => `${value.toFixed(1)} mm`;

export function formatCoordinates(latitude: number, longitude: number): string {
  return `${Math.abs(latitude).toFixed(2)}° ${latitude < 0 ? 'S' : 'N'} · ${Math.abs(longitude).toFixed(2)}° ${longitude < 0 ? 'O' : 'E'}`;
}
