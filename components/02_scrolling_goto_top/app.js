// constant

const SCROLL_BUTTON_THRESHOLD = 100;

// doms

const $goToTopButton = document.querySelector('.scroll-icon');

// utility

const toThrottle = (() => {
  let timerId = null;

  return (callback, delayTime) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, delayTime);
  };
})();

const checkScrollY = () => SCROLL_BUTTON_THRESHOLD < window.pageYOffset;

// DOM manipulation

const showGoToTopButton = () => {
  $goToTopButton.style.display = checkScrollY() ? 'block' : 'none';
};

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Event Listener

window.addEventListener('scroll', () => {
  toThrottle(showGoToTopButton, 100);
});

$goToTopButton.addEventListener('click', () => {
  goToTop();
});
