function secondsToDays(seconds?: number) {
  if (!seconds) return;
  const h = Math.round((seconds / 3600) % 24);
  const jrs = Math.round(seconds / 3600 / 24);
  if (h === 0) {
    return `${jrs} jours`;
  }
  if (jrs === 0) {
    return `${h} h`;
  }
  return `${jrs} jours ${h} h`;
}

export default secondsToDays;
