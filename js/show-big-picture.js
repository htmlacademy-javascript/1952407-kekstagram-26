import { COMMENT_PICTURE_SIZE } from './constants.js';
import { makeElement, isEscapeKey, isEnterKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// переменные для подстановки данных к большой картинке
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsNumber = bigPicture.querySelector('.comments-count');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

// подстановка данных в большую картинку
const setDataToBigPicture = (photosData) => {
  bigPictureImage.src = photosData.url;
  bigPictureLikes.textContent = photosData.likes;
  bigPictureCommentsNumber.textContent = photosData.comments.length;
  bigPictureDescription.textContent = photosData.description;
  // bigPictureCommentsCount.classList.add('hidden');
  // bigPictureLoader.classList.add('hidden');
};

// добавление коментов в большую картинку
const generateComments = (photosData) => {
  const commentsFragment = document.createDocumentFragment();
  bigPictureCommentsList.innerHTML = '';
  photosData.comments.forEach(({ message, name, avatar }) => {
    const commentItem = makeElement('li', 'social__comment');
    const commentPicture = makeElement('img', 'social__picture');
    const commentText = makeElement('p', 'social__text', message);
    commentPicture.width = COMMENT_PICTURE_SIZE;
    commentPicture.height = COMMENT_PICTURE_SIZE;
    commentPicture.alt = name;
    commentPicture.src = avatar;
    commentItem.append(commentPicture);
    commentItem.append(commentText);
    commentsFragment.append(commentItem);
  });

  return bigPictureCommentsList.append(commentsFragment);
};

const showComments = () => {
  
};


const bigPictureEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeButtonClickHandler();
  }
};

const closeButtonEnterKeydownHandler = (evt) => {
  if (isEnterKey(evt)) {
    closeButtonClickHandler();
  }
};

// декларативно тк вызывается в функции bigPictureEscKeydownHandler и closeButtonEnterKeydownHandler
function closeButtonClickHandler() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', bigPictureEscKeydownHandler);
  closeButton.removeEventListener('keydown', closeButtonEnterKeydownHandler);
}

const addPictureListener = (thumbnail, photosData, i) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    setDataToBigPicture(photosData[i]);
    generateComments(photosData[i]);

    document.addEventListener('keydown', bigPictureEscKeydownHandler);
    closeButton.addEventListener('click', closeButtonClickHandler);
    closeButton.addEventListener('keydown', closeButtonEnterKeydownHandler);
  });
};

export { addPictureListener };

