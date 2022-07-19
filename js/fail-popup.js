import { isEscapeKey } from './util.js';

const failModalTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const failModalFragment = document.createDocumentFragment();
const failModalElement = failModalTemplate.cloneNode(true);
const okButtonElement = failModalElement.querySelector('.error__button');
const errorInnerElement = failModalElement.querySelector('.error__inner');
const errorTitleElement = failModalElement.querySelector('.error__title');

const failModalElementBurqaClickHandler = (evt) => {
  if (evt.target === errorInnerElement || evt.target === errorTitleElement) {
    return;
  }
  okButtonElementClickHandler();
};

const failModalElementEscKeydownHandler = () => {
  if (isEscapeKey) {
    okButtonElementClickHandler();
  }
};

function okButtonElementClickHandler() {
  failModalElement.remove();
  okButtonElement.removeEventListener('click', okButtonElementClickHandler);
  document.removeEventListener('keydown', failModalElementEscKeydownHandler);
  failModalElement.removeEventListener('click', failModalElementBurqaClickHandler);
}

const closeFailModal = () => {
  okButtonElement.addEventListener('click', okButtonElementClickHandler);
  document.addEventListener('keydown', failModalElementEscKeydownHandler);
  failModalElement.addEventListener('click', failModalElementBurqaClickHandler);
};

const openFailModal = () => {
  failModalFragment.appendChild(failModalElement);
  document.body.appendChild(failModalFragment);
  closeFailModal();
};

export { openFailModal };
