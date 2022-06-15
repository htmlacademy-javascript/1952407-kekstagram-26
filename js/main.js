// Функцию принес Кекс

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для проверки максимальной длины строки Кекстаграм

function checkStringLength(string, length) {
  return string.length <= length;
}

// eslint-disable-next-line no-console
// console.log(checkStringLength('Some comment', 140));


// Задание 4. Больше деталей

const userNames = [
  'Артемий',
  'Дарья',
  'Борис',
  'Анна',
  'Яна',
  'Алина',
  'Матвей',
  'Виктория',
  'Тимофей',
  'Тимур',
  'Эмилия',
  'Маргарита',
  'Илья',
  'Михаил',
  'Кристина',
  'Святослав',
  'Владислав',
  'Всеволод',
  'Егор',
  'Анатолий',
  'Александр',
  'Константин',
  'Иван',
  'Тихон',
  'Екатерина'
];

const userDescriptions = [
  'Я кушаю',
  'Я и мои друзья',
  'Моя будущая жена',
  'Круто потусили',
  'Я тут спал',
  'Говорят js это весело'
];

const userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// const getSentencesNumber = () => {}; придумать функцию получения 1 или 2 не повторяющихся предложений.

const generateComment = () => ({
  'id': '',
  'avatar': `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  'message': '',
  'name': getRandomArrayElement(userNames),
});

const generatePhoto = () => ({
  'id': '',
  'url': `photos/.jpg`,
  'description': getRandomArrayElement(userDescriptions),
  'likes': getRandomPositiveInteger(15, 200),
  'comments': ''
});

const objectsPhotos = Array.from({ length: 4 }, generatePhoto);

// eslint-disable-next-line no-console
// console.log(objectsPhotos);
// console.log(getRandomArrayElement(userNames));


// const maxArrayLength = 25;

const getRandomNumbersInArray = (minValue, maxArrayLength) => {
  const randomArray = [];
  let randomArrayValue;
  const foo = (currentValue) => currentValue === randomArrayValue;

  while (randomArray.length < maxArrayLength) {
    randomArrayValue = getRandomPositiveInteger(minValue, maxArrayLength);

    if (randomArray.find(foo) >= minValue) {
      getRandomPositiveInteger(minValue, maxArrayLength);
    } else {
      randomArray.push(randomArrayValue);
    }
  }

  return randomArray;
};

const randomArray = getRandomNumbersInArray(1, 25);

console.log(randomArray);


//тест с сортировкой
for (let i = 0; i <= randomArray.length - 2; i++) {
  let minValue = randomArray[i];

  for (let j = i + 1; j <= randomArray.length - 1; j++) {
    if (randomArray[j] < minValue) {
      minValue = randomArray[j];
      let swap = randomArray[i];
      randomArray[i] = minValue;
      randomArray[j] = swap;
    }
  }
}

console.log(randomArray);

