let timerId = null;
let laps = [];
let timerStatus = {
  min: 0,
  sec: 0,
  ms: 0
};

const [$leftButton, $rightButton] = document.querySelectorAll('.control');
const $timerDisplay = document.querySelector('.display');
const $laps = document.querySelector('.laps');

const zeroFill = (num, size) => {
  const zeroCount = size - ('' + num).length;
  const zeros = Array.from({ length: zeroCount }, () => '0').join('');
  return zeros + num;
};

const displayTime = () => {
  const { min, sec, ms } = timerStatus;
  $timerDisplay.textContent = `
  ${zeroFill(min, 2)}:${zeroFill(sec, 2)}:${zeroFill(ms, 2)}`;
};

const render = () => {
  $leftButton.textContent = timerId ? 'Stop' : 'Start';
  $rightButton.textContent = timerId ? 'Lap' : 'Reset';

  if (laps.length < 1) $laps.textContent = '';
  else {
    $laps.innerHTML = laps.reduce(
      (html, lap, idx) =>
        html +
        `
      <div>${idx + 1}</div>
      <div>${lap}</div>  
      `,
      `<div class="lap-title">Laps</div>
    <div class="lap-title">Time</div>`
    );
  }
};

const setTimerStatus = _timerStatus => {
  if (_timerStatus.ms > 99) {
    _timerStatus.sec += 1;
    _timerStatus.ms = 0;
  }
  if (_timerStatus.sec > 59) {
    _timerStatus.min += 1;
    _timerStatus.sec = 0;
  }
  timerStatus = _timerStatus;
  displayTime();
};

const setTimerId = _timerId => {
  timerId = _timerId;
  render();
};

const setLaps = _laps => {
  laps = _laps;
  render();
};

const startTimer = () => {
  $rightButton.removeAttribute('disabled');
  setTimerId(
    setInterval(() => {
      setTimerStatus({ ...timerStatus, ms: timerStatus.ms + 1 });
    }, 10)
  );
};

const stopTimer = () => {
  if (timerId) clearInterval(timerId);
  setTimerId(null);
};

const resetTimer = () => {
  $rightButton.setAttribute('disabled', 'disabled');
  setTimerStatus({ min: 0, sec: 0, ms: 0 });
  setLaps([]);
};

const recoardLap = () => {
  setLaps([...laps, $timerDisplay.textContent]);
};

$leftButton.addEventListener('click', () => {
  timerId ? stopTimer() : startTimer();
});

$rightButton.addEventListener('click', () => {
  if (timerId) recoardLap();
  else resetTimer();
});

window.addEventListener('DOMContentLoaded', () => {
  render();
});
