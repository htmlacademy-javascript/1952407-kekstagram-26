// Функция получения рандомных чисел. От Кекса
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для проверки максимальной длины строки
const checkStringLength = (string, length) => string.length <= length;

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
  const max = 200; // max должен быть больше чем вызовов этой функции, иначе цикл вайл будет работать бесконечно
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

export {
  getRandomPositiveInteger,
  getArrayWithRandomNumbers,
  checkStringLength,
  generateRandomNumber,
  getRandomArrayElement,
  makeElement
};
