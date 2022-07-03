import { generatePhotos } from './data.js';

// how many photos to take
const MAX_PHOTO_COUNT = 25;

// сохранение сгенерированных данных для фотографий
const usersPhotosData = generatePhotos();

// размеры фото пользователя в комментариях
const COMMENT_PICTURE_SIZE = 35;

export { MAX_PHOTO_COUNT, usersPhotosData, COMMENT_PICTURE_SIZE };
