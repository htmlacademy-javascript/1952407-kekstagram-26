import { usersPhotosData } from './constants.js';

const renderPhotos = () => {
  const pictures = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const usersPhotoFragment = document.createDocumentFragment();

  usersPhotosData.forEach((element) => {
    const userPicture = pictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = element.url;
    userPicture.querySelector('.picture__likes').textContent = element.likes;
    userPicture.querySelector('.picture__comments').textContent = element.comments.length;
    usersPhotoFragment.append(userPicture);
  });

  return pictures.append(usersPhotoFragment);
};

renderPhotos();
