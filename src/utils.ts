export function formatNumber(number: number | string) {
  return new Intl.NumberFormat("IR-fa").format(parseFloat(`${number}`));
}

export function formatTime(time: number | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(time);
}
