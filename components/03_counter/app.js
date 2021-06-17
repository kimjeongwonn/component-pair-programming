// doms

const $increaseButton = document.querySelector('.increase');
const $decreaseButton = document.querySelector('.decrease');
const $counterDisplay = document.querySelector('.counter');

// utility

const counter = (() => {
  let count = 0;
  return {
    increase() {
      return ++count;
    },
    decrease() {
      return count && --count;
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

$increaseButton.addEventListener('click', () => {
  increaseCounter();
});

$decreaseButton.addEventListener('click', () => {
  decreaseCounter();
});
