import { hashtagInputElement, commentInputElement, imageFormElement } from './image-form.js';
import { checkStringLength } from './util.js';
import { MAX_COMMENT_LENGTH, MAX_NUMBER_OF_HASHTAGS } from './constants.js';

const hashtagPattern = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// валидация с помощью pristine
const pristine = new Pristine(imageFormElement, {
  classTo: 'js-pristine-validation',
  errorClass: 'js-pristine-validation--invalid',
  successClass: 'js-pristine-validation--valid',
  errorTextParent: 'js-pristine-validation',
  errorTextTag: 'div',
  errorTextClass: 'js-pristine-validation__error-text',
});

// хэштэг
const checkHashtagsText = (inputValue) => {
  const hashtagsArray = inputValue.split(' ').filter((element) => element !== '');
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!hashtagPattern.test(hashtagsArray[i])) {
      return false;
    }
  }
  return true;
};

const checkHashtagsForNoRepeate = (inputValue) => {
  const hashtagsArray = inputValue.toLowerCase().split(' ').filter((element) => element !== '');
  const set = new Set(hashtagsArray);
  return (set.size === hashtagsArray.length);
};

const checkHashtagsNumber = (inputValue) => {
  const hashtagsArray = inputValue.split(' ').filter((element) => element !== '');
  return hashtagsArray.length <= MAX_NUMBER_OF_HASHTAGS;
};

pristine.addValidator(
  hashtagInputElement,
  checkHashtagsForNoRepeate,
  'Нельзя повторять хэштэги',
  1, // приоритет показа смс
  true // остановка. если ошибка, то показывает только 1 смс из всех
);

pristine.addValidator(
  hashtagInputElement,
  checkHashtagsNumber,
  `Количество хэштэгов не может быть больше ${MAX_NUMBER_OF_HASHTAGS}`,
  1,
  true
);

pristine.addValidator(
  hashtagInputElement,
  checkHashtagsText,
  'Хэштэг начинается с #, содержит буквы и цифры без пробелов, длина 19 символов после #',
  1,
  true
);

// комментарий
pristine.addValidator(
  commentInputElement,
  checkStringLength,
  `не более ${MAX_COMMENT_LENGTH} символов`,
  1,
  true
);

export { pristine };
