import { buildCalendarGrid, isSameDate, MONTH_NAMES } from '../utils/date.js';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function Calendar({ currentMonth, today, selectedDate, onSelectDate, onChangeMonth }) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  return (
    <section className="calendar">
      <div className="calendar__header">
        <h2 className="calendar__month">{MONTH_NAMES[month]} {year}</h2>
        <div className="calendar__nav">
          <button type="button" className="calendar__arrow" aria-label="Предыдущий месяц"
            onClick={() => onChangeMonth(-1)}>‹</button>
          <button type="button" className="calendar__arrow" aria-label="Следующий месяц"
            onClick={() => onChangeMonth(1)}>›</button>
        </div>
      </div>
      <div className="calendar__weekdays">
        {WEEKDAYS.map(day => <span key={day} className="calendar__weekday">{day}</span>)}
      </div>
      <div className="calendar__days">
        {buildCalendarGrid(year, month).map((date, index) => {
          if (!date) return <span key={index} className="day day--empty" aria-hidden="true" />;
          const isPast = date < today;
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isSelected = isSameDate(date, selectedDate);
          const classes = ['day', isWeekend && 'day--weekend', isPast && 'day--muted',
            isSelected && 'day--selected'].filter(Boolean).join(' ');
          return (
            <button key={index} type="button" className={classes} disabled={isPast}
              aria-pressed={isSelected} onClick={() => onSelectDate(date)}>
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
}
