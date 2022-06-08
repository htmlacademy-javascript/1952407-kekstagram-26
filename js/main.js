// Функция, возвращающая случайное целое число из переданного диапазона включительно
// Функция взята по ссылке https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max < 0 || min < 0) {
    return -1;
  }

  if (max <= min) {
    return null;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// eslint-disable-next-line no-console
console.log(getRandomIntInclusive(0, -11));


//Функция для проверки максимальной длины строки Кекстаграм

function checkCommentLength(checkComment, maxLength) {
  return checkComment.length <= maxLength;
}

// eslint-disable-next-line no-console
console.log(checkCommentLength('Some comment', 140));

