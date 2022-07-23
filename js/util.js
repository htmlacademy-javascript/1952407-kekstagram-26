import { MAX_COMMENT_LENGTH } from './constants.js';

const ALERT_SHOW_TIME = 5000;

// Функция получения рандомных чисел. От Кекса
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для получения случайного элемента из массива. Элемент может повторяться.
const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// Получение из массива данных нового массива данных с уникальными значениями и заданым количеством элементов
const getUniqueArray = (dataArray, arrayLength) => {
  const set = new Set();
  while (set.size < arrayLength) {
    set.add(getRandomArrayElement(dataArray));
  }
  return set;
};

// Функция для проверки максимальной длины строки
const checkStringLength = (inputValue) => inputValue.length <= MAX_COMMENT_LENGTH;

// Функция для генерации html элемента
const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Для обработчика событий. нажати ли клавиша esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Для обработчика событий. нажати ли клавиша enter
const isEnterKey = (evt) => evt.key === 'Enter';

// Показ сообщения об ошибке
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.textTransform = 'none';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция debounce для устранения дребезга. Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {
  getRandomPositiveInteger,
  checkStringLength,
  getRandomArrayElement,
  makeElement,
  isEscapeKey,
  isEnterKey,
  showAlert,
  debounce,
  getUniqueArray
};
