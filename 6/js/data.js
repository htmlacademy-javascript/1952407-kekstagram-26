import {
  getRandomPositiveInteger,
  getArrayWithRandomNumbers,
  generateRandomNumber,
  getRandomArrayElement
} from './util.js';

// сколько сгенерировать фотографий
const MAX_PHOTO_COUNT = 25;

const USER_NAMES = [
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

const USER_DESCRIPTIONS = [
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

const USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Функция получения 1 или 2 не повторяющихся сообщений
const getMessage = () => {
  const number = getRandomPositiveInteger(1, 2);
  const firstMessage = getRandomArrayElement(USER_COMMENTS);
  let secondMessage = getRandomArrayElement(USER_COMMENTS);

  if (secondMessage === firstMessage) {
    while (secondMessage === firstMessage) {
      secondMessage = getRandomArrayElement(USER_COMMENTS);
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
  name: getRandomArrayElement(USER_NAMES),
});

// Генерируем комментарии
const generateComment = (length) => {
  const array = [];
  const randomArray = getArrayWithRandomNumbers(1, length);
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
  description: getRandomArrayElement(USER_DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: generateComment(getRandomPositiveInteger(1, 6))
});

// Генерируем массив фоток
const generatePhoto = (count) => {
  const array = [];
  const randomArray = getArrayWithRandomNumbers(1, count);
  const randomArrayForPhoto = getArrayWithRandomNumbers(1, count);
  let idPhoto;
  let pictureNumber;
  for (let i = 0; i < count; i++) {
    idPhoto = randomArray[i];
    pictureNumber = randomArrayForPhoto[i];
    array.push(generateObjectPhoto(idPhoto, pictureNumber));
  }

  return array;
};

const generatePhotos = () => generatePhoto(MAX_PHOTO_COUNT);

export { generatePhotos };
