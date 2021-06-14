// state

let timeDegree = 0;

// doms

const $hour = document.querySelector('.hour');
const $min = document.querySelector('.minute');
const $sec = document.querySelector('.second');

const convertTimeToTotalDegree = date =>
  (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) * 6;

const render = () => {
  $hour.style.setProperty('--deg', timeDegree / 720);
  $min.style.setProperty('--deg', timeDegree / 60);
  $sec.style.setProperty('--deg', timeDegree);
};

const setTimeDegree = _timeDegree => {
  timeDegree = _timeDegree;
  render();
};

const fetch = () => {
  setTimeDegree(convertTimeToTotalDegree(new Date()));
};

// Event Listener

window.addEventListener('DOMContentLoaded', () => {
  fetch();

  setInterval(() => {
    setTimeDegree(timeDegree + 6);
  }, 1000);
});
