const $popupButton = document.querySelector('.toggle-btn');
const $popupModal = document.querySelector('.popup-modal');
const $popupForm = document.querySelector('.popup-form');
const $popupInput = document.querySelector('.popup-input');
const $popupMessage = document.querySelector('.popup-message');

const isCancelable = e =>
  e.target.classList.contains('overlay') ||
  e.target.classList.contains('cancel-btn') ||
  e.target.classList.contains('close-modal');

const closeModal = willRemoveEventHandler => {
  $popupModal.classList.remove('active');
  document.body.classList.remove('overlay');
  document.removeEventListener('click', willRemoveEventHandler);
};

const cancelModalHandler = e => {
  if (!isCancelable(e)) return;
  closeModal(cancelModalHandler);
};

const writeMessage = content => {
  $popupMessage.textContent = content;
  $popupInput.value = '';
  closeModal(cancelModalHandler);
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
