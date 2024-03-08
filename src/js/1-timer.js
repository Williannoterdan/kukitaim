import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

let userSelectedDate = Date();

const bottonStart = document.querySelector('button[data-start]');
const bottonStop = document.querySelector('button[data-stop]');
const bottonReset = document.querySelector('button[data-reset]');
const bottonRetorn = document.querySelector('button[data-retorn]');
bottonStart.setAttribute('disabled', '');
bottonStop.setAttribute('disabled', '');
bottonReset.setAttribute('disabled', '');
bottonRetorn.setAttribute('disabled', '');

let second = document.querySelector('span[data-seconds]');
let minutes = document.querySelector('span[data-minutes]');
let hours = document.querySelector('span[data-hours]');
let days = document.querySelector('span[data-days]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    clearInterval(taimerInterval);
    if (
      second.textContent > 1 ||
      minutes.textContent > 1 ||
      hours.textContent > 1 ||
      days.textContent > 1
    ) {
      tostStopolldtaimer();
    }
    rezering();
    console.log(selectedDates[0]);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedDates[0] - options.defaultDate > 0) {
          resolve(
            (userSelectedDate = selectedDates[0]),
            bottonStart.removeAttribute('disabled'),
            bottonStop.setAttribute('disabled', ''),
            bottonReset.setAttribute('disabled', ''),
            bottonRetorn.setAttribute('disabled', '')
          );
        } else {
          reject(
            tostPleasechooseadateinthefuture(),
            bottonStart.setAttribute('disabled', '')
          );
        }
      });
    });

    console.log('user selected:', userSelectedDate);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
console.log(convertMs(userSelectedDate));

iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  onOpening: function () {
    console.log('callback abriu!');
  },
  onClosing: function () {
    console.log('callback fechou!');
  },
});

function getTaim(taimConteiner) {
  second.textContent = taimConteiner.seconds.toString().padStart(2, '0');
  minutes.textContent = taimConteiner.minutes.toString().padStart(2, '0');
  hours.textContent = taimConteiner.hours.toString().padStart(2, '0');
  days.textContent = taimConteiner.days.toString().padStart(2, '0');
  if (
    second.textContent < 1 &&
    minutes.textContent < 1 &&
    hours.textContent < 1 &&
    days.textContent < 1
  ) {
    clearInterval(taimerInterval);
    rezering();
  }
}
function rezering() {
  second.textContent = '00';
  minutes.textContent = '00';
  hours.textContent = '00';
  days.textContent = '00';
}

let taimerInterval;

function taimerStart() {
  tostTaimerStart();
  bottonStart.setAttribute('disabled', '');
  bottonReset.removeAttribute('disabled');
  bottonStop.removeAttribute('disabled');
  taimerInterval = setInterval(() => {
    let taimConteinerMS = userSelectedDate.getTime() - Date.now();
    let taimConteiner = convertMs(taimConteinerMS);
    console.log(taimConteiner);
    getTaim(taimConteiner);
  }, 1000);
}
function taimerRetorn() {
  tostTaimerRetorn();
  bottonRetorn.setAttribute('disabled', '');
  bottonStop.removeAttribute('disabled');
  taimerInterval = setInterval(() => {
    let taimConteinerMS = userSelectedDate.getTime() - Date.now();
    let taimConteiner = convertMs(taimConteinerMS);
    console.log(taimConteiner);
    getTaim(taimConteiner);
  }, 1000);
}
function taimerStop() {
  tostTaimerStop();
  clearInterval(taimerInterval);
  bottonStop.setAttribute('disabled', '');
  bottonRetorn.removeAttribute('disabled');
}
function taimerReset() {
  tostTaimerReset();
  rezering();
  clearInterval(taimerInterval);
  bottonStop.setAttribute('disabled', '');
  bottonReset.setAttribute('disabled', '');
  bottonRetorn.setAttribute('disabled', '');
  flatpickr('#datetime-picker',options)
}

bottonStart.addEventListener('click', taimerStart);
bottonRetorn.addEventListener('click', taimerRetorn);
bottonStop.addEventListener('click', taimerStop);
bottonReset.addEventListener('click', taimerReset);

// tosts
function tostStopolldtaimer() {
  iziToast.info({
    title: 'Info',
    message: 'Stop olld taimer',
  });
}
function tostPleasechooseadateinthefuture() {
  iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
  });
}
function tostTaimerRetorn() {
  iziToast.success({
    title: 'OK',
    message: 'Taimer retorn',
  });
}
function tostTaimerStart() {
  iziToast.success({
    title: 'OK',
    message: 'Taimer start',
  });
}
function tostTaimerStop() {
  iziToast.warning({
    title: 'Caution',
    message: 'Taimer stop',
  });
}
function tostTaimerReset() {
  iziToast.warning({
    title: 'Caution',
    message: 'Taimer reset',
  });
}
