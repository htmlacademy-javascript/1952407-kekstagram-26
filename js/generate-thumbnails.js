import { generatePhotos } from './data.js';
import { openBigPicture } from './show-big-picture.js';

const usersPhotosData = generatePhotos();

const renderPhotos = () => {
  const pictures = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const usersPhotoFragment = document.createDocumentFragment();

  usersPhotosData.forEach((element, i) => {
    const userPicture = pictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = element.url;
    userPicture.querySelector('.picture__likes').textContent = element.likes;
    userPicture.querySelector('.picture__comments').textContent = element.comments.length;

    openBigPicture(userPicture, usersPhotosData, i);

    usersPhotoFragment.append(userPicture);
  });

  return pictures.append(usersPhotoFragment);
};

renderPhotos();

