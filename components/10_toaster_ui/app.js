let toastCount = 0;

const [$successButton, $errorButton, $warningButton] =
  document.querySelectorAll('button');

const parseStylePixel = styleString => +styleString.slice(0, -2);

const createToastElement = ({ type, title, message }) => {
  const $toastDiv = document.createElement('div');
  $toastDiv.classList.add('toast');
  $toastDiv.classList.add('toast-' + type);
  $toastDiv.style.bottom = '0';

  $toastDiv.innerHTML = `
      <h4 class="toast-heading">${title} (${toastCount++}) </h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href="#${type}" />
        </svg>
        <p>${message} </p>
      </div>
      <a class="close">&times;</a>
  `;

  const timerId = setTimeout(() => {
    $toastDiv.remove();
    toastCount--;
  }, 3000);

  $toastDiv.querySelector('.close').addEventListener('click', e => {
    clearTimeout(timerId);
    [...document.querySelectorAll('.toast')]
      .filter(toast => {
        const targetToastBottom = parseStylePixel(
          e.target.parentNode.style.bottom
        );
        const currentToastBottom = parseStylePixel(toast.style.bottom);
        return targetToastBottom < currentToastBottom;
      })
      .forEach(toast => {
        const currentToastBottom = parseStylePixel(toast.style.bottom);
        toast.style.bottom = currentToastBottom - 100 + 'px';
      });
    $toastDiv.remove();
    toastCount--;
  });

  return $toastDiv;
};

const stackUpToasts = () => {
  [...document.querySelectorAll('.toast')].forEach(toast => {
    const currentToastBottom = parseStylePixel(toast.style.bottom);
    toast.style.bottom = currentToastBottom + 100 + 'px';
  });
};

const executeToast = toastObj => {
  const toastElement = createToastElement(toastObj);
  stackUpToasts();
  document.body.append(toastElement);
};

$successButton.addEventListener('click', () => {
  executeToast({
    type: 'success',
    title: '👍 Well Done!',
    message: 'this is a success message'
  });
});

$warningButton.addEventListener('click', () => {
  executeToast({
    type: 'warning',
    title: '⚠️ Warning!!',
    message: 'this is an warning message'
  });
});

$errorButton.addEventListener('click', () => {
  executeToast({
    type: 'error',
    title: '❌ Error !',
    message: 'this is an error message!'
  });
});
