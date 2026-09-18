export async function fetcher<T>(url: string): Promise<T> {
  // En dev, usa proxy Vite para /api/status-page y evitar CORS
  const isDev = (import.meta as unknown as { env: { DEV: boolean } }).env.DEV;
  let proxied = url;
  if (isDev && url.includes("/api/status-page")) {
    try {
      const u = new URL(url);
      proxied = `${u.pathname}${u.search}`;
    } catch {
      // url ya relativa
    }
  }
  const res = await fetch(proxied, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Fetch ${url} failed: ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}
