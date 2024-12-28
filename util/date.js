export function getFormattedDate(date) {
  const day = '0' + date.getDate().toString();
  return `${day.substring(day.length - 2)}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
}
export function getFormattedDate2(date) {
  return date.toISOString().slice(0, 10); //альтернативный вариант
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
