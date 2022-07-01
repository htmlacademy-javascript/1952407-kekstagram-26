import { generatePhotos } from './data.js';

// eslint-disable-next-line no-console
console.log('модуль generate-picture.js работает'); //удалю попозже

// eslint-disable-next-line no-console
console.log(generatePhotos()); // удалю попозже

const pictures = document.querySelector('.pictures');
const usersPhoto = generatePhotos();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const usersPhotoFragment = document.createDocumentFragment();

usersPhoto.forEach((element) => {
  const userPicture = pictureTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = element.url;
  userPicture.querySelector('.picture__likes').textContent = element.likes;
  userPicture.querySelector('.picture__comments').textContent = element.comments.length;
  usersPhotoFragment.append(userPicture);
});

pictures.append(usersPhotoFragment);
