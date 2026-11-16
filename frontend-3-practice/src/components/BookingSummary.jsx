export default function BookingSummary({ summary, canConfirm, confirmed, onConfirm }) {
  return (
    <>
      <p className="booking-summary" aria-live="polite">{summary}</p>
      <button type="button" className="confirm-btn" disabled={!canConfirm} onClick={onConfirm}>
        Подтвердить
      </button>
      <p className="booking-status" role="status">
        {confirmed && ('Запись подтверждена: ' + summary)}
      </p>
    </>
  );
}
