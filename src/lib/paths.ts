/** Prefix local pages and assets once, including GitHub Pages project paths. */
export function sitePath(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

export function resourcePath(path: string): string {
  return path.startsWith('https://') ? path : sitePath(path);
}
