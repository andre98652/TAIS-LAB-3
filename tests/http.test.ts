import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestJson } from '../src/clients/http';

afterEach(() => vi.useRealTimers());

describe('HTTP y timeout completo (FR-010, FR-011)', () => {
  it('lee JSON válido', async () => {
    const fetcher = vi.fn(async () => new Response('{"ok":true}'));
    expect(await requestJson(new URL('https://example.test'), 'forecast', fetcher)).toEqual({ ok: true });
    expect(fetcher.mock.calls).toHaveLength(1);
  });
  it.each([301, 404, 429, 500, 503])('rechaza HTTP %i', async (status) => {
    await expect(requestJson(new URL('https://example.test'), 'geocoding', async () => new Response('', { status })))
      .rejects.toMatchObject({ code: 'HTTP', service: 'geocoding', status });
  });
  it('distingue JSON inválido', async () => {
    await expect(requestJson(new URL('https://example.test'), 'forecast', async () => new Response('no-json')))
      .rejects.toMatchObject({ code: 'INVALID_RESPONSE', service: 'forecast' });
  });
  it('distingue error de conexión', async () => {
    await expect(requestJson(new URL('https://example.test'), 'forecast', async () => { throw new TypeError('offline'); }))
      .rejects.toMatchObject({ code: 'NETWORK' });
  });
  it('cancela fetch pendiente al cumplir 10 segundos', async () => {
    vi.useFakeTimers();
    let signal: AbortSignal | undefined;
    const fetcher = vi.fn((_url: RequestInfo | URL, init?: RequestInit) => {
      signal = init?.signal ?? undefined;
      return new Promise<Response>(() => {});
    });
    const outcome = requestJson(new URL('https://example.test'), 'geocoding', fetcher).catch(e => e);
    await vi.advanceTimersByTimeAsync(10_000);
    expect(await outcome).toMatchObject({ code: 'TIMEOUT' });
    expect(signal?.aborted).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('mantiene timeout durante la lectura del cuerpo', async () => {
    vi.useFakeTimers();
    const response = { ok: true, json: () => new Promise(() => {}) } as Response;
    const outcome = requestJson(new URL('https://example.test'), 'forecast', async () => response).catch(e => e);
    await vi.advanceTimersByTimeAsync(10_000);
    expect(await outcome).toMatchObject({ code: 'TIMEOUT', service: 'forecast' });
    expect(vi.getTimerCount()).toBe(0);
  });
});
