import { pristine } from './validate-form.js';
import { isEscapeKey } from './util.js';
import { resetScale, setDefaultScale } from './image-scale.js';

const imageFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = imageFormElement.querySelector('.text__hashtags');
const commentInputElement = imageFormElement.querySelector('.text__description');
const uploadButtonElement = imageFormElement.querySelector('#upload-file');
const closeButtonElement = imageFormElement.querySelector('.img-upload__cancel');
const photoEditPopupElement = imageFormElement.querySelector('.img-upload__overlay');

// открытие и закрытие формы
const photoEditPopupElementEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
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
}

const uploadButtonElementUploadHandler = () => {
  document.body.classList.add('modal-open');
  photoEditPopupElement.classList.remove('hidden');
  closeButtonElement.addEventListener('click', closeButtonElementClickHandler);
  document.addEventListener('keydown', photoEditPopupElementEscKeydownHandler);

  setDefaultScale();
};

uploadButtonElement.addEventListener('change', uploadButtonElementUploadHandler);

// отправка формы
imageFormElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});


export { hashtagInputElement, commentInputElement, imageFormElement };
