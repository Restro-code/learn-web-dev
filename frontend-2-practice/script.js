// ============================================================================
// 1. ДАННЫЕ (слоты, «сегодня»)
// ============================================================================


const TODAY = new Date(2026, 10, 20);

const MONTH_NAMES = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];


const BASE_SLOTS = [
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "13:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
];


// 2. СОСТОЯНИЕ


const state = {
  currentYear: 2026,
  currentMonth: 10,
  selectedDate: new Date(2026, 10, 20),
  selectedTime: null,
};


// 3. ЧИСТЫЕ ФУНКЦИИ



function getSlotsForDate(date) {
  const daySeed = date.getDate(); 
  return BASE_SLOTS.map((slot, index) => {
    const isAvailable = slot.available && ((daySeed + index) % 3 !== 0);
    return { ...slot, available: isAvailable };
  });
}


// 4. ОТРИСОВКА И ОБРАБОТЧИКИ


function renderCalendar() {
  const monthEl = document.querySelector('.calendar__month');
  monthEl.textContent = `${MONTH_NAMES[state.currentMonth]} ${state.currentYear}`;

  const daysContainer = document.querySelector('.calendar__days');
  daysContainer.innerHTML = '';

  const firstDay = new Date(state.currentYear, state.currentMonth, 1);
  const lastDay = new Date(state.currentYear, state.currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  

  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const todayStart = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());

  // 1. Добавляем пустые ячейки для выравнивания сетки (только для вида)
  for (let i = 0; i < offset; i++) {
    const emptyCell = document.createElement('span');
    emptyCell.className = 'day day--empty';
    daysContainer.appendChild(emptyCell);
  }


  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(state.currentYear, state.currentMonth, d);
    const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;
    const isPast = cellDate < todayStart;
    
    const isSelected = state.selectedDate && 
                       d === state.selectedDate.getDate() && 
                       state.currentMonth === state.selectedDate.getMonth() && 
                       state.currentYear === state.selectedDate.getFullYear();

    const dayEl = document.createElement('span');
    dayEl.className = 'day';
    dayEl.textContent = d;

    if (isPast || isWeekend) {
      dayEl.classList.add('day--muted');
      dayEl.style.cursor = 'not-allowed';
    } else {
      if (isSelected) {
        dayEl.classList.add('day--selected');
      }

      dayEl.addEventListener('click', () => {
        state.selectedDate = new Date(state.currentYear, state.currentMonth, d);
        state.selectedTime = null; // Сбрасываем время при смене дня
        renderCalendar();
        renderSlots();
        updateConfirmButton();
      });
    }
    daysContainer.appendChild(dayEl);
  }
}

function renderSlots() {
  const grid = document.querySelector('.timeslots__grid');
  grid.innerHTML = '';

  const slots = getSlotsForDate(state.selectedDate);

  slots.forEach(slot => {
    const btn = document.createElement('button');
    btn.className = 'slot';
    
    if (!slot.available) {
      btn.classList.add('slot--busy');
      btn.innerHTML = `${slot.time}<span class="slot__busy">Занято</span>`;
      btn.disabled = true;
    } else {
      btn.textContent = slot.time;
      
      if (state.selectedTime === slot.time) {
        btn.style.background = 'var(--color-green)';
        btn.style.color = '#fff';
      } else {
        // Сбрасываем инлайн-стили, чтобы работали CSS hover-эффекты
        btn.style.background = '';
        btn.style.color = '';
      }

      btn.addEventListener('click', () => {
        state.selectedTime = slot.time;
        renderSlots();
        updateConfirmButton();
      });
    }
    grid.appendChild(btn);
  });
}

function updateConfirmButton() {
  const btn = document.querySelector('.confirm-btn');
  if (!btn) return;

  if (state.selectedDate && state.selectedTime) {
    // Активное состояние: чёрная кнопка
    btn.disabled = false;
    btn.style.background = 'var(--color-text)'; // #1a1a1a (черный)
    btn.style.color = '#fff';
    btn.style.cursor = 'pointer';
    btn.style.opacity = '1';
    btn.textContent = `Подтвердить`;
  } else {
    // Неактивное состояние: серая кнопка
    btn.disabled = true;
    btn.style.background = 'var(--color-gray)'; // #D9D9D9 (серый)
    btn.style.color = 'var(--color-text-muted)'; // #9E9E9E
    btn.style.cursor = 'not-allowed';
    btn.style.opacity = '1';
    btn.textContent = 'Подтвердить';
  }
}

function initCalendarNavigation() {
  const prevBtn = document.querySelector('.calendar__arrow[aria-label="Предыдущий месяц"]');
  const nextBtn = document.querySelector('.calendar__arrow[aria-label="Следующий месяц"]');

  prevBtn.addEventListener('click', () => {
    state.currentMonth--;
    if (state.currentMonth < 0) {
      state.currentMonth = 11;
      state.currentYear--;
    }
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    state.currentMonth++;
    if (state.currentMonth > 11) {
      state.currentMonth = 0;
      state.currentYear++;
    }
    renderCalendar();
  });
}

// ============================================================================
// 5. ИНИЦИАЛИЗАЦИЯ
// ============================================================================

function init() {
  const todayStart = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
  if (state.selectedDate < todayStart) {
    state.selectedDate = new Date(todayStart);
  }

  initCalendarNavigation();
  renderCalendar();
  renderSlots();
  updateConfirmButton();
}

document.addEventListener('DOMContentLoaded', init);