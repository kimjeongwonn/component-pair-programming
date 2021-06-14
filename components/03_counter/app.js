// constant

// doms

const $counterContainer = document.querySelector('.container');
const $counterDisplay = document.querySelector('.counter');

// utility

const counter = (() => {
  let count = 0;
  return {
    increase() {
      return ++count;
    },
    decrease() {
      return count > 0 ? --count : 0;
    }
  };
})();

// DOM manipulation

const increaseCounter = () => {
  $counterDisplay.textContent = counter.increase();
};
const decreaseCounter = () => {
  $counterDisplay.textContent = counter.decrease();
};

// Event Listener

$counterContainer.addEventListener('click', e => {
  if (e.target.matches('.container > .increase, .increase > i')) increaseCounter();
  if (e.target.matches('.container > .decrease, .decrease > i')) decreaseCounter();
});
