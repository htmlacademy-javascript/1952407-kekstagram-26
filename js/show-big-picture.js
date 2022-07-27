import { COMMENT_PICTURE_SIZE, SHOW_COMMENTS_STEP } from './constants.js';
import { makeElement, isEscapeKey, isEnterKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// переменные для подстановки данных к большой картинке
const bigPictureImageElement = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPicture.querySelector('.likes-count');
const bigPictureCommentsNumberElement = bigPicture.querySelector('.comments-count');
const bigPictureCommentsCountElement = bigPicture.querySelector('.social__comment-count');
const bigPictureLoaderElement = bigPicture.querySelector('.comments-loader');
const bigPictureCommentsListElement = bigPicture.querySelector('.social__comments');
const bigPictureDescriptionElement = bigPicture.querySelector('.social__caption');
const bigPictureCurrentCommentsCountElement = bigPicture.querySelector('.social__current-comments-count');
let bigPictureLoaderClickHandler;

// подстановка данных в большую картинку
const setDataToBigPicture = (photosData) => {
  bigPictureImageElement.src = photosData.url;
  bigPictureLikesElement.textContent = photosData.likes;
  bigPictureCommentsNumberElement.textContent = photosData.comments.length;
  bigPictureDescriptionElement.textContent = photosData.description;
};


const generateComments = (photosData, commentsStart, commentsCounter) => {
  const commentsFragment = document.createDocumentFragment();
  bigPictureCommentsListElement.innerHTML = '';

  const minificatedComments = photosData.comments.slice(commentsStart, commentsCounter);

  minificatedComments.forEach(({ message, name, avatar }) => {
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

  return bigPictureCommentsListElement.append(commentsFragment);
};

// отображение коментариев по 5 штук
const showComments = (photosData) => {
  const commentsStart = 0;
  let commentsCounter = SHOW_COMMENTS_STEP;

  if (photosData.comments.length <= SHOW_COMMENTS_STEP && photosData.comments.length !== 0) {
    bigPictureCommentsCountElement.classList.add('hidden');
    bigPictureLoaderElement.classList.add('hidden');
  }

  if (photosData.comments.length > SHOW_COMMENTS_STEP) {
    bigPictureCommentsCountElement.classList.remove('hidden');
    bigPictureLoaderElement.classList.remove('hidden');
    bigPictureCurrentCommentsCountElement.textContent = SHOW_COMMENTS_STEP;
  }


  generateComments(photosData, commentsStart, commentsCounter);

  bigPictureLoaderClickHandler = () => {
    commentsCounter += SHOW_COMMENTS_STEP;
    generateComments(photosData, commentsStart, commentsCounter);

    bigPictureCurrentCommentsCountElement.textContent = `${bigPictureCommentsListElement.children.length}`;

    if (photosData.comments.length === bigPictureCommentsListElement.children.length) {
      bigPictureLoaderElement.classList.add('hidden');
      bigPictureLoaderElement.removeEventListener('click', bigPictureLoaderClickHandler);
    }
  };

  bigPictureLoaderElement.addEventListener('click', bigPictureLoaderClickHandler);
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
  bigPictureLoaderElement.removeEventListener('click', bigPictureLoaderClickHandler);
}

const addPictureListener = (thumbnail, photosData, i) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    setDataToBigPicture(photosData[i]);
    showComments(photosData[i]);

    document.addEventListener('keydown', bigPictureEscKeydownHandler);
    closeButton.addEventListener('click', closeButtonClickHandler);
    closeButton.addEventListener('keydown', closeButtonEnterKeydownHandler);
  });
};

export { addPictureListener };

