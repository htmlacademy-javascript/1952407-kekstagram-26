import { isEscapeKey } from './util.js';

const imageFormElement = document.querySelector('.img-upload__form');
const uploadButtonElement = imageFormElement.querySelector('#upload-file');
const closeButtonElement = imageFormElement.querySelector('.img-upload__cancel');
const photoEditPopupElement = imageFormElement.querySelector('.img-upload__overlay');

const photoEditPopupElementEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeButtonElementClickHandler();
  }
};

function closeButtonElementClickHandler() {
  document.body.classList.remove('modal-open');
  photoEditPopupElement.classList.add('hidden');
  closeButtonElement.removeEventListener('click', closeButtonElementClickHandler);
  document.removeEventListener('keydown', photoEditPopupElementEscKeydownHandler);
}

const uploadButtonElementUploadHandler = () => {
  document.body.classList.add('modal-open');
  photoEditPopupElement.classList.remove('hidden');
  closeButtonElement.addEventListener('click', closeButtonElementClickHandler);
  document.addEventListener('keydown', photoEditPopupElementEscKeydownHandler);
};

uploadButtonElement.addEventListener('change', uploadButtonElementUploadHandler);
