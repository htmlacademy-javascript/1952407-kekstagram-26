import { usersPhotosData, COMMENT_PICTURE_SIZE } from './constants.js';
import { makeElement } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const thumbnails = document.querySelectorAll('.picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// переменные для подстановки данных к большой картинке
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsNumber = bigPicture.querySelector('.comments-count');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const openBigPicture = () => {
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();

      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');

      // подстановка данных в большую картинку
      bigPictureImage.src = usersPhotosData[i].url;
      bigPictureLikes.textContent = usersPhotosData[i].likes;
      bigPictureCommentsNumber.textContent = usersPhotosData[i].comments.length;
      bigPictureDescription.textContent = usersPhotosData[i].description;
      bigPictureCommentsCount.classList.add('hidden');
      bigPictureLoader.classList.add('hidden');

      // добавление коментов в большую картинку
      const commentsFragment = document.createDocumentFragment();
      bigPictureCommentsList.innerHTML = '';
      usersPhotosData[i].comments.forEach(({ message, name, avatar }) => {
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

      bigPictureCommentsList.append(commentsFragment);
    });
  });
};

const closeBigPicture = () => {
  const closeButtonClickHandler = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  closeButton.addEventListener('click', closeButtonClickHandler);
};

const pushEscKeyBigPicture = () => {
  const escKeydownHandler = (evt) => {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };

  document.addEventListener('keydown', escKeydownHandler);
};

openBigPicture();
closeBigPicture();
pushEscKeyBigPicture();
