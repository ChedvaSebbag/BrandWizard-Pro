export function formatBrandName(name) {
  if (!name) return "";
  return name.trim().replace(/\s+/g, " ");
}