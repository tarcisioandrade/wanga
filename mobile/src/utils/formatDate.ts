export function formattDatePassed(dateStr: string): string {
  const dateTarget: Date = new Date(dateStr);
  const dateNow: Date = new Date();

  const differenceMs: number = dateNow.getTime() - dateTarget.getTime();

  const minutes: number = Math.floor(differenceMs / (1000 * 60));
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "dia" : "dias"}`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hora" : "horas"}`;
  } else {
    return `${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }
}
