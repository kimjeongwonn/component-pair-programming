const $nav = document.querySelector('nav');
const $toggleButton = document.querySelector('i.toggle');

const toggleClass = ($dom, className) => $dom.classList.toggle(className);

$toggleButton.addEventListener('click', () => {
  toggleClass($nav, 'active');
});
