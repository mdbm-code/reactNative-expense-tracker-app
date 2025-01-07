export function getFormattedDate(_date, short) {
  let date = _date;
  if (!_date) {
    date = new Date();
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const day = '0' + date.getDate().toString();
  const month = '0' + (date.getMonth() + 1).toString();

  let year = date.getFullYear().toString();
  if (short) {
    year = year.slice(-2);
  }
  return `${day.substring(day.length - 2)}.${month.substring(
    month.length - 2
  )}.${year}`;
}
export function getFormattedDate2(date) {
  return date.toISOString().slice(0, 10); //альтернативный вариант
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
