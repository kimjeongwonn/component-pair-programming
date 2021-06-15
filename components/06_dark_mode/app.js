let theme = 'light';

const applyTheme = () => {
  document.body.classList.toggle('dark', theme === 'dark');
};

const setTheme = _theme => {
  theme = _theme;
  localStorage.setItem('theme', theme);
  applyTheme();
};

const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};

const isSystemThemeDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const fetchTheme = () => {
  const localTheme = localStorage.getItem('theme');
  setTheme(localTheme || (isSystemThemeDark() ? 'dark' : 'light'));
};

fetchTheme();

window.addEventListener('DOMContentLoaded', () => {
  const $toggleButton = document.querySelector('.toggle-button');
  $toggleButton.addEventListener('click', toggleTheme);
});
