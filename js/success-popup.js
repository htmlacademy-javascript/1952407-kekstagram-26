import { isEscapeKey } from './util.js';

const successModalTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successModalFragment = document.createDocumentFragment();
const successModalElement = successModalTemplate.cloneNode(true);
const okButtonElement = successModalElement.querySelector('.success__button');
const successInnerElement = successModalElement.querySelector('.success__inner');
const successTitleElement = successModalElement.querySelector('.success__title');

const successModalElementOverlayClickHandler = (evt) => {
  if (evt.target === successInnerElement || evt.target === successTitleElement) {
    return;
  }
  okButtonElementClickHandler();
};

const successModalElementEscKeydownHandler = () => {
  if (isEscapeKey) {
    okButtonElementClickHandler();
  }
};

function okButtonElementClickHandler() {
  successModalElement.remove();
  okButtonElement.removeEventListener('click', okButtonElementClickHandler);
  document.removeEventListener('keydown', successModalElementEscKeydownHandler);
  successModalElement.removeEventListener('click', successModalElementOverlayClickHandler);
}

const closeSuccessModal = () => {
  okButtonElement.addEventListener('click', okButtonElementClickHandler);
  document.addEventListener('keydown', successModalElementEscKeydownHandler);
  successModalElement.addEventListener('click', successModalElementOverlayClickHandler);
};

const openSuccessModal = () => {
  successModalFragment.appendChild(successModalElement);
  document.body.appendChild(successModalFragment);
  closeSuccessModal();
};

export { openSuccessModal };
