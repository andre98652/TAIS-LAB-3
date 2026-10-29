import { WeatherError, type Fetcher, type Service } from '../types';

/** El límite cubre tanto las cabeceras como el cuerpo de la respuesta. */
export async function requestJson(
  url: URL,
  service: Service,
  fetcher: Fetcher = globalThis.fetch.bind(globalThis),
  timeoutMs = 10_000,
): Promise<unknown> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => {
      reject(new WeatherError('TIMEOUT', service));
      controller.abort();
    }, timeoutMs);
  });
  try {
    const response = (async () => {
      const result = await fetcher(url, { signal: controller.signal });
      if (!result.ok) throw new WeatherError('HTTP', service, result.status);
      return await result.json() as unknown;
    })();
    return await Promise.race([response, timeout]);
  } catch (error) {
    if (error instanceof WeatherError) throw error;
    if (controller.signal.aborted) throw new WeatherError('TIMEOUT', service);
    if (error instanceof SyntaxError) throw new WeatherError('INVALID_RESPONSE', service);
    throw new WeatherError('NETWORK', service);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}
