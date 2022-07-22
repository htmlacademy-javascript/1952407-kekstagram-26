import { pristine } from './validate-form.js';
import { isEscapeKey } from './util.js';
import { resetScale, setDefaultScale } from './image-scale.js';
import { createSlider, destroySlider } from './image-filters.js';
import { sendData } from './api.js';
import { openSuccessModal } from './success-popup.js';
import { openFailModal } from './fail-popup.js';

const imageFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = imageFormElement.querySelector('.text__hashtags');
const commentInputElement = imageFormElement.querySelector('.text__description');
const uploadButtonElement = imageFormElement.querySelector('#upload-file');
const closeButtonElement = imageFormElement.querySelector('.img-upload__cancel');
const photoEditPopupElement = imageFormElement.querySelector('.img-upload__overlay');
const submitButtonElement = imageFormElement.querySelector('.img-upload__submit');

// открытие и закрытие формы
const photoEditPopupElementEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInputElement
      || document.activeElement === commentInputElement
      || document.querySelector('.error')) {
      return;
    }
    closeButtonElementClickHandler();
  }
};

const resetErrorText = (element) => {
  for (const errorTextElement of element) {
    errorTextElement.textContent = '';
  }
};

function closeButtonElementClickHandler() {
  const errorTextElements = imageFormElement.querySelectorAll('.js-pristine-validation__error-text');
  document.body.classList.remove('modal-open');
  photoEditPopupElement.classList.add('hidden');
  uploadButtonElement.value = '';
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  resetErrorText(errorTextElements);
  closeButtonElement.removeEventListener('click', closeButtonElementClickHandler);
  document.removeEventListener('keydown', photoEditPopupElementEscKeydownHandler);

  resetScale();
  destroySlider();
}

const uploadButtonElementUploadHandler = () => {
  document.body.classList.add('modal-open');
  photoEditPopupElement.classList.remove('hidden');
  closeButtonElement.addEventListener('click', closeButtonElementClickHandler);
  document.addEventListener('keydown', photoEditPopupElementEscKeydownHandler);

  setDefaultScale();
  createSlider();
};

uploadButtonElement.addEventListener('change', uploadButtonElementUploadHandler);

// блокировка кнопки после отправки формы
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

// отправка формы
imageFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        closeButtonElementClickHandler();
        openSuccessModal();
        unblockSubmitButton();
      },
      () => {
        openFailModal();
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  }
});


export { hashtagInputElement, commentInputElement, imageFormElement, closeButtonElementClickHandler };
