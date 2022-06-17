// Функция получения рандомных чисел (от Кекса)
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для проверки максимальной длины строки. Кекстаграм
const checkStringLength = (string, length) => string.length <= length;

checkStringLength('Some comment', 140);


// Задание 4. Больше деталей

const userNames = [
  'Елизавета',
  'Михаил',
  'Виктория',
  'Артём',
  'Максим',
  'Кира',
  'Руслан',
  'Арсений',
  'Тимур',
  'Полина',
  'Софья',
  'София',
  'Ксения',
  'Варвара',
  'Макар',
  'Анастасия',
  'Сергей',
  'Мила',
  'Есения',
  'Павел',
  'Кирилл',
  'Алексей',
  'Дмитрий',
  'Владислава',
  'Тимофей',
  'Константин',
  'Любовь',
  'Илья',
  'Арина',
  'Таисия',
];

const userDescriptions = [
  'Я кушаю',
  'Я и мои друзья',
  'Моя будущая жена',
  'Круто потусили',
  'Я тут спал',
  'Говорят js это весело',
  'Лучше так не делать',
  'Твои мечты сбудутся',
  'Хоп хей лалалей крыша едет - я за ней',
  'Ковид надоел',
  'Миру мир'
];

const userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Функция для получения массива случайных неповторяющихся положительных целых чисел
const getRandomNumbersInArray = (minValue, maxArrayLength) => {
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

const bankUsedRandomNumber = []; // сюда записываются использованные числа

// Функция для получения неповторяющегося положительного числа от 0
const generateRandomNumber = () => {
  const min = 1;
  const max = 200; // max должен быть больше чем вызовов этой функции, иначе цикл вайл будет работать бесконечно
  let randomNumber = getRandomPositiveInteger(min, max);
  const getСomparison = (currentValue) => currentValue === randomNumber;

  if (bankUsedRandomNumber.find(getСomparison) || bankUsedRandomNumber.find(getСomparison) === 0) { // проверяет есть ли в массиве уже такое число
    while (bankUsedRandomNumber.find(getСomparison) || bankUsedRandomNumber.find(getСomparison) === 0) { // если есть то генерирует заного, пока не получится уникальное
      randomNumber = getRandomPositiveInteger(min, max);
    }
  }

  bankUsedRandomNumber.push(randomNumber); // добавляет использованное число в массив
  return randomNumber;
};

// Функция для получения случайного элемента из массива. Элемент может повторяться.
const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// Функция получения 1 или 2 не повторяющихся сообщений
const getMessage = () => {
  const number = getRandomPositiveInteger(1, 2);
  const firstMessage = getRandomArrayElement(userComments);
  let secondMessage = getRandomArrayElement(userComments);

  if (secondMessage === firstMessage) {
    while (secondMessage === firstMessage) {
      secondMessage = getRandomArrayElement(userComments);
    }
  }

  if (number % 2 === 0) {
    return `${firstMessage} ${secondMessage}`;
  }

  return firstMessage;
};

const generateObjectComment = () => ({
  id: generateRandomNumber(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getMessage(),
  name: getRandomArrayElement(userNames),
});

// Генерируем комментарии
const generateComment = (length) => {
  const array = [];
  const randomArray = getRandomNumbersInArray(1, length);
  let index;
  for (let i = 0; i < randomArray.length; i++) {
    index = randomArray[i];
    array.push(generateObjectComment(index));
  }

  return array;
};

const generateObjectPhoto = (idPhoto, pictureNumber) => ({
  id: idPhoto,
  url: `photos/${pictureNumber}.jpg`,
  description: getRandomArrayElement(userDescriptions),
  likes: getRandomPositiveInteger(15, 200),
  comments: generateComment(getRandomPositiveInteger(1, 6))
});

// Генерируем массив фоток
const generatePhoto = (count) => {
  const array = [];
  const randomArray = getRandomNumbersInArray(1, count);
  const randomArrayForPhoto = getRandomNumbersInArray(1, count);
  let idPhoto;
  let pictureNumber;
  for (let i = 0; i < count; i++) {
    idPhoto = randomArray[i];
    pictureNumber = randomArrayForPhoto[i];
    array.push(generateObjectPhoto(idPhoto, pictureNumber));
  }

  return array;
};

const MAX_PHOTO_COUNT = 25; //сколько сделать фотографий

generatePhoto(MAX_PHOTO_COUNT);

