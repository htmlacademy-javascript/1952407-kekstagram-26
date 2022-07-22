import { MAX_COMMENT_LENGTH } from './constants.js';

const ALERT_SHOW_TIME = 5000;

// Функция получения рандомных чисел. От Кекса
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для проверки максимальной длины строки
const checkStringLength = (inputValue) => inputValue.length <= MAX_COMMENT_LENGTH;

// Функция для получения массива случайных неповторяющихся положительных целых чисел
const getArrayWithRandomNumbers = (minValue, maxArrayLength) => {
  const randomArray = [];
  let randomArrayValue = minValue;
  const getСomparison = (currentValue) => currentValue === randomArrayValue;

  if (minValue < -1 || minValue > maxArrayLength) {
    return null;
  }

  while (randomArray.length < maxArrayLength) {
    randomArrayValue = getRandomPositiveInteger(minValue, maxArrayLength);

    if (randomArray.length >= maxArrayLength - minValue + 1) {
      break;
    }

    if (randomArray.find(getСomparison) >= minValue) {
      getRandomPositiveInteger(minValue, maxArrayLength);
    } else {
      randomArray.push(randomArrayValue);
    }
  }

  return randomArray;
};

const bankOfUsedRandomNumber = []; // сюда записываются использованные числа

// Функция для получения неповторяющегося положительного числа от 0
const generateRandomNumber = () => {
  const min = 1;
  const max = 1000; // max должен быть больше чем вызовов этой функции, иначе цикл вайл будет работать бесконечно
  let randomNumber = getRandomPositiveInteger(min, max);
  const getСomparison = (currentValue) => currentValue === randomNumber;

  if (bankOfUsedRandomNumber.find(getСomparison) || bankOfUsedRandomNumber.find(getСomparison) === 0) { // проверяет есть ли в массиве уже такое число
    while (bankOfUsedRandomNumber.find(getСomparison) || bankOfUsedRandomNumber.find(getСomparison) === 0) { // если есть то генерирует заного, пока не получится уникальное
      randomNumber = getRandomPositiveInteger(min, max);
    }
  }

  bankOfUsedRandomNumber.push(randomNumber); // добавляет использованное число в массив
  return randomNumber;
};

// Функция для получения случайного элемента из массива. Элемент может повторяться.
const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// Функция для генерации html элемента
const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// для обработчика событий. нажати ли клавиша esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// для обработчика событий. нажати ли клавиша enter
const isEnterKey = (evt) => evt.key === 'Enter';

// показ сообщения об ошибке
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

// получение из массива данных нового массива данных с уникальными значениями и заданым количеством элементов
const getUniqueArray = (dataArray, arrayLength) => {
  const set = new Set();
  while (set.size < arrayLength) {
    set.add(getRandomArrayElement(dataArray));
  }
  return set;
};

export {
  getRandomPositiveInteger,
  getArrayWithRandomNumbers,
  checkStringLength,
  generateRandomNumber,
  getRandomArrayElement,
  makeElement,
  isEscapeKey,
  isEnterKey,
  showAlert,
  debounce,
  getUniqueArray
};
