import { isEscapeKey } from './util.js';

const imageFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = imageFormElement.querySelector('.text__hashtags');
const commentInputElement = imageFormElement.querySelector('.text__description');
const uploadButtonElement = imageFormElement.querySelector('#upload-file');
const closeButtonElement = imageFormElement.querySelector('.img-upload__cancel');
const photoEditPopupElement = imageFormElement.querySelector('.img-upload__overlay');

const photoEditPopupElementEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
      return;
    }
    closeButtonElementClickHandler();
  }
};

function closeButtonElementClickHandler() {
  document.body.classList.remove('modal-open');
  photoEditPopupElement.classList.add('hidden');
  uploadButtonElement.value = '';
  hashtagInputElement.value = '';
  commentInputElement.value = '';
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
