export function secondsToDays(seconds?: number) {
  if (!seconds) return;
  const h = Math.round((seconds / 3600) % 24);
  const jrs = Math.round(seconds / 3600 / 24);
  return `${jrs} jours ${h} h`;
}
