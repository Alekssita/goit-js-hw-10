// Бібліотеки
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM-елементи
const startBtn = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

// Змінні
let userSelectedDate = null;
let countdownInterval = null;

startBtn.disabled = true;

// Flatpickr опції
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];
    if (selected <= new Date()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      return;
    }
    userSelectedDate = selected;
    startBtn.disabled = false;
  },
};

// Ініціалізація Flatpickr
flatpickr(datePicker, options);

// Обробка кнопки Start
startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  datePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDiff = userSelectedDate - now;

    if (timeDiff <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datePicker.disabled = false;
      return;
    }

    const time = convertMs(timeDiff);
    updateTimerUI(time);
  }, 1000);
});

// Функції
function updateTimerUI({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}