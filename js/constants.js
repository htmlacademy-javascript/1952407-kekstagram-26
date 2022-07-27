// размеры фото пользователя в комментариях
const COMMENT_PICTURE_SIZE = 35;

// для валидации хэштэгов и комментариев
const MAX_COMMENT_LENGTH = 140;
const MAX_NUMBER_OF_HASHTAGS = 5;

// шаг показа комментариев под фото
const SHOW_COMMENTS_STEP = 5;

//для сортировки фото
const IMAGE_QUANTITY = 10;

// время отображения сообщения об ошибке. в мс
const ALERT_SHOW_TIME = 5000;

// задержка для функции debounce. в мс
const DEFAULT_DELAY = 500;
const DELAY_DURATION = 500;

export {
  COMMENT_PICTURE_SIZE,
  MAX_COMMENT_LENGTH,
  MAX_NUMBER_OF_HASHTAGS,
  SHOW_COMMENTS_STEP,
  IMAGE_QUANTITY,
  DELAY_DURATION,
  ALERT_SHOW_TIME,
  DEFAULT_DELAY
};
