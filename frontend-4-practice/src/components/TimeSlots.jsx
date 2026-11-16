export default function TimeSlots({ slots, selectedDate, selectedTime, onSelectTime, loading, error }) {
  return (
    <>
      <h2 className="timeslots__title">Доступное время</h2>
      <div className="timeslots__grid" aria-busy={loading}>
        {!selectedDate ? (
          <p className="request-message">Выберите дату, чтобы увидеть доступное время.</p>
        ) : loading ? (
          <p className="request-message" role="status">Загрузка…</p>
        ) : error ? (
          <p className="request-message request-message--error" role="alert">
            Не удалось загрузить время: {error}. Выберите другой день или обновите страницу.
          </p>
        ) : slots.length === 0 ? (
          <p className="request-message" role="status">На эту дату нет доступных слотов.</p>
        ) : slots.map(slot => (
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
