const $popupButton = document.querySelector('.toggle-btn');
const $popupModal = document.querySelector('.popup-modal');
const $popupForm = document.querySelector('.popup-form');
const $popupInput = document.querySelector('.popup-input');
const $popupMessage = document.querySelector('.popup-message');

const isCancelable = e =>
  e.target.classList.contains('overlay') ||
  e.target.classList.contains('cancel-btn') ||
  e.target.classList.contains('close-modal');

const closeModal = () => {
  $popupModal.classList.remove('active');
  document.body.classList.remove('overlay');
  document.removeEventListener('click', cancelModalHandler);
};

const writeMessage = content => {
  $popupMessage.textContent = content;
  $popupInput.value = '';
  closeModal();
};

const cancelModalHandler = e => {
  console.log('??');
  if (!isCancelable(e)) return;
  closeModal();
};

const submitHandler = e => {
  e.preventDefault();

  const content = $popupInput.value.trim();
  if (!content) return;
  writeMessage(content);

  $popupForm.removeEventListener('submit', submitHandler);
};

const showModal = () => {
  $popupModal.classList.add('active');
  document.body.classList.add('overlay');
  $popupInput.focus();

  document.addEventListener('click', cancelModalHandler);
  $popupForm.addEventListener('submit', submitHandler);
};

$popupButton.addEventListener('click', () => {
  showModal();
});
