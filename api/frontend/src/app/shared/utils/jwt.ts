export function decodeJwt<T = any>(token: string): T | null {
  try {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload)) as T;
  } catch {
    return null;
  }
}
