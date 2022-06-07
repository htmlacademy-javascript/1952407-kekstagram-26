// Функция, возвращающая случайное целое число из переданного диапазона включительно
// Функция взята по ссылке https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max < 0 || min < 0) {
    return 'Значения не могут быть меньше нуля';
  }

  if (max <= min) {
    return 'Значение [после] не может быть меньше или равно значению [до]';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// eslint-disable-next-line no-console
console.log(getRandomIntInclusive(0, -11));


//Функция для проверки максимальной длины строки Кекстаграм

function checkingCommentLength(chekingComment, maxLenght) {
  return chekingComment.length <= maxLenght;
}

checkingCommentLength('Some comment', 140);

