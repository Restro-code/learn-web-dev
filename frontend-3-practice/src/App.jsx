import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import StepIndicator from './components/StepIndicator.jsx';
import Calendar from './components/Calendar.jsx';
import TimeSlots from './components/TimeSlots.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import { startOfDay, formatDate } from './utils/date.js';
import { getSlotsForDate } from './data/slots.js';

export default function App() {
  const [today] = useState(() => startOfDay(new Date()));
  const [currentMonth, setCurrentMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const slots = selectedDate ? getSlotsForDate(selectedDate) : [];
  const summary = selectedDate
    ? formatDate(selectedDate) + ' • ' + (selectedTime || 'Выберите время')
    : 'Выберите дату и время';

  function selectDate(date) {
    setSelectedDate(date);
    setSelectedTime(null);
    setConfirmed(false);
  }

  function changeMonth(offset) {
    setCurrentMonth(month => new Date(month.getFullYear(), month.getMonth() + offset, 1));
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmed(false);
  }

  function selectTime(time) {
    setSelectedTime(time);
    setConfirmed(false);
  }

  function confirmBooking() {
    if (selectedDate && slots.some(slot => slot.time === selectedTime && slot.available)) {
      setConfirmed(true);
    }
  }

  return (
    <>
      <Header />
      <main className="main">
        <StepIndicator />
        <section className="booking">
          <div className="booking__header">
            <span className="booking__subtitle">Выберите дату и время</span>
            <h1 className="booking__title">Доступные даты</h1>
          </div>
          <div className="booking__content">
            <Calendar currentMonth={currentMonth} today={today} selectedDate={selectedDate}
              onSelectDate={selectDate} onChangeMonth={changeMonth} />
            <aside className="timeslots">
              <TimeSlots slots={slots} selectedDate={selectedDate}
                selectedTime={selectedTime} onSelectTime={selectTime} />
              <BookingSummary summary={summary} canConfirm={Boolean(selectedDate && selectedTime)}
                confirmed={confirmed} onConfirm={confirmBooking} />
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
