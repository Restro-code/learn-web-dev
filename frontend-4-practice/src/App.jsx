import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import StepIndicator from './components/StepIndicator.jsx';
import BookingCalendar from './components/BookingCalendar.jsx';
import { fetchToday } from './api.js';

export default function App() {
  const [today, setToday] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadToday() {
      try {
        const data = await fetchToday();
        if (active) setToday(new Date(data.year, data.month, data.day));
      } catch (err) {
        if (active) setError(err.message);
      }
    }
    loadToday();
    return () => { active = false; };
  }, []);

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
          {error ? (
            <p className="request-message request-message--error" role="alert">
              Не удалось загрузить текущую дату: {error}. Обновите страницу, чтобы повторить запрос.
            </p>
          ) : today ? (
            <BookingCalendar today={today} />
          ) : (
            <p className="request-message" role="status">Загрузка…</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
