import { useEffect, useState } from 'react';
import Calendar from './Calendar.jsx';
import TimeSlots from './TimeSlots.jsx';
import BookingSummary from './BookingSummary.jsx';
import { formatDate, isSameDate } from '../utils/date.js';
import { fetchSlots } from '../api.js';

export default function BookingCalendar({ today }) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [slotsState, setSlotsState] = useState({ loading: true, error: null, slots: [] });
  const { loading, error, slots } = slotsState;

  useEffect(() => {
    if (!selectedDate) return;
    let active = true;
    async function loadSlots() {
      try {
        const data = await fetchSlots({
          day: selectedDate.getDate(),
          month: selectedDate.getMonth(),
          year: selectedDate.getFullYear(),
        });
        if (active) setSlotsState({ loading: false, error: null, slots: data.slots });
      } catch (err) {
        if (active) setSlotsState({ loading: false, error: err.message, slots: [] });
      }
    }
    loadSlots();
    // Игнорируем ответ, если пользователь уже выбрал другую дату.
    return () => { active = false; };
  }, [selectedDate]);
  const summary = selectedDate
    ? formatDate(selectedDate) + ' • ' + (selectedTime || 'Выберите время')
    : 'Выберите дату и время';

  function selectDate(date) {
    if (isSameDate(date, selectedDate)) return;
    setSelectedDate(date);
    setSlotsState({ loading: true, error: null, slots: [] });
    setSelectedTime(null);
    setConfirmed(false);
  }

  function changeMonth(offset) {
    setCurrentMonth(month => new Date(month.getFullYear(), month.getMonth() + offset, 1));
    setSelectedDate(null);
    setSlotsState({ loading: false, error: null, slots: [] });
    setSelectedTime(null);
    setConfirmed(false);
  }

  function selectTime(time) {
    setSelectedTime(time);
    setConfirmed(false);
  }

  function confirmBooking() {
    if (!loading && !error && selectedDate && slots.some(slot => slot.time === selectedTime && slot.available)) {
      setConfirmed(true);
    }
  }

  return (
    <div className="booking__content">
      <Calendar currentMonth={currentMonth} today={today} selectedDate={selectedDate}
        onSelectDate={selectDate} onChangeMonth={changeMonth} />
      <aside className="timeslots">
        <TimeSlots slots={slots} selectedDate={selectedDate} loading={loading} error={error}
          selectedTime={selectedTime} onSelectTime={selectTime} />
        <BookingSummary summary={summary} canConfirm={Boolean(!loading && !error && selectedDate && selectedTime)}
          confirmed={confirmed} onConfirm={confirmBooking} />
      </aside>
    </div>
  );
}
