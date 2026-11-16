export default function TimeSlots({ slots, selectedDate, selectedTime, onSelectTime }) {
  return (
    <>
      <h2 className="timeslots__title">Доступное время</h2>
      <div className="timeslots__grid">
        {!selectedDate && 'Выберите дату, чтобы увидеть доступное время.'}
        {slots.map(slot => (
          <button key={slot.time} type="button" disabled={!slot.available}
            className={['slot', !slot.available && 'slot--busy', selectedTime === slot.time && 'slot--selected'].filter(Boolean).join(' ')}
            aria-pressed={selectedTime === slot.time} onClick={() => onSelectTime(slot.time)}>
            {slot.time}
            {!slot.available && <span className="slot__busy">Занято</span>}
          </button>
        ))}
      </div>
    </>
  );
}
