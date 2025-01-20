export function filterByDateRange(filterType, dataArray) {
  let now = new Date();
  let startDate;

  switch (filterType) {
    case 'D':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'YD':
      // Устанавливаем время на начало вчерашнего дня
      startDate = now;
      startDate.setDate(startDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0); // Устанавливаем время на 00:00:00

      // Устанавливаем время на конец вчерашнего дня
      // now = new Date(now);
      now.setDate(now.getDate() - 1);
      now.setHours(23, 59, 59, 999); // Устанавливаем время на 23:59:59.999

      break;
    case 'W':
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      break;
    case 'M':
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      break;
    case 'Q':
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 3,
        now.getDate()
      );
      break;
    case 'Y':
      startDate = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      );
      break;
    case 'A':
      return dataArray; // Возвращаем весь массив, если фильтр "все"
    default:
      throw new Error('Invalid filter type');
  }

  return dataArray.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= now;
  });
}
