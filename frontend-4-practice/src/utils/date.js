export const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDate(first, second) {
  return Boolean(first && second && startOfDay(first).getTime() === startOfDay(second).getTime());
}

export function buildCalendarGrid(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: offset + daysInMonth }, (_, index) =>
    index < offset ? null : new Date(year, month, index - offset + 1));
}

export function formatDate(date) {
  return date.toLocaleDateString('ru-RU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}
