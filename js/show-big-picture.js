import { COMMENT_PICTURE_SIZE } from './constants.js';
import { makeElement } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
let countValue = 0;

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
  bigPictureCommentsCount.classList.add('hidden');
  bigPictureLoader.classList.add('hidden');
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


const addEscKeyHandler = (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  document.removeEventListener('keydown', addEscKeyHandler);
  closeButton.removeEventListener('click', addCloseClickHandler);
};

// декларативно тк вызывается в функции addEscKeyHandler
function addCloseClickHandler() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', addCloseClickHandler);
  document.removeEventListener('keydown', addEscKeyHandler);
}

const addPictureListener = (thumbnail, photosData, i) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    setDataToBigPicture(photosData[i]);
    generateComments(photosData[i]);

    document.addEventListener('keydown', addEscKeyHandler);
    closeButton.addEventListener('click', addCloseClickHandler);
  });
};

export { addPictureListener };

