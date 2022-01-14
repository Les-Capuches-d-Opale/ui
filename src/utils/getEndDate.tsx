import { add, format, parseISO } from "date-fns";

export function getEndDate(dateDebut: string, seconds: number) {
  seconds = Number(seconds);
  const daysToAdd = Math.floor(seconds / (3600 * 24));
  const hoursToAdd = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutesToAdd = Math.floor((seconds % 3600) / 60);
  const secondsToAdd = Math.floor(seconds % 60);

  const result = add(parseISO(dateDebut), {
    days: daysToAdd,
    hours: hoursToAdd,
    minutes: minutesToAdd,
    seconds: secondsToAdd,
  });

  return format(result, "dd/MM/yyyy");
}
