import { addPictureListener } from './show-big-picture.js';

const renderPhotos = (usersPhotosData) => {
  const picturesElements = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const usersPhotoFragment = document.createDocumentFragment();

  usersPhotosData.forEach((element, i) => {
    const userPictureElement = pictureTemplate.cloneNode(true);
    userPictureElement.querySelector('.picture__img').src = element.url;
    userPictureElement.querySelector('.picture__likes').textContent = element.likes;
    userPictureElement.querySelector('.picture__comments').textContent = element.comments.length;

    addPictureListener(userPictureElement, usersPhotosData, i);

    usersPhotoFragment.append(userPictureElement);
  });

  return picturesElements.append(usersPhotoFragment);
};

export { renderPhotos };
