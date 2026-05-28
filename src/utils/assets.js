export function assetUrl(path) {
  if (!path) return path;

  if (/^(https?:|data:|mailto:|#)/.test(path)) {
    return path;
  }

  const cleanPath = String(path).replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
