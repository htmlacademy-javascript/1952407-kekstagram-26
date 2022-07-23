import { getUniqueArray, debounce } from './util.js';
import { renderPhotos } from './generate-thumbnails.js';
import { IMAGE_QUANTITY, DELAY_DURATION } from './constants.js';

const imageFiltersElement = document.querySelector('.img-filters');
const defaultFilterButtonElement = imageFiltersElement.querySelector('#filter-default');
const randomFilterButtonElement = imageFiltersElement.querySelector('#filter-random');
const discussedFilterButtonElement = imageFiltersElement.querySelector('#filter-discussed');

const deleteImages = () => {
  const imagesElements = document.querySelectorAll('.picture');
  imagesElements.forEach((imageElement) => {
    imageElement.remove();
  });
};

const changeButtonsClass = (buttonElement) => {
  const filterButtonsElements = imageFiltersElement.querySelectorAll('.img-filters__button');
  filterButtonsElements.forEach((filterButtonElement) => {
    filterButtonElement.classList.remove('img-filters__button--active');
  });
  buttonElement.classList.add('img-filters__button--active');
};

const renderFilteredPhotos = (debounce(
  (usersPhotosData) => {
    deleteImages();
    renderPhotos(usersPhotosData);
  }, DELAY_DURATION
));

const defaultButtonClickHandler = (usersPhotosData) => {
  changeButtonsClass(defaultFilterButtonElement);

  renderFilteredPhotos(usersPhotosData);
};

const randomButtonClickHandler = (usersPhotosData) => {
  changeButtonsClass(randomFilterButtonElement);

  const randomUsersPhotosData = getUniqueArray(usersPhotosData, IMAGE_QUANTITY);
  renderFilteredPhotos(randomUsersPhotosData);
};

const discussedButtonClickHandler = (usersPhotosData) => {
  changeButtonsClass(discussedFilterButtonElement);

  const discussedUsersPhotosData = usersPhotosData.slice().sort((a, b) => a.comments < b.comments ? 1 : -1);
  renderFilteredPhotos(discussedUsersPhotosData);
};


const getFilteredImages = (usersPhotosData) => {
  imageFiltersElement.classList.remove('img-filters--inactive');

  defaultFilterButtonElement.addEventListener('click', defaultButtonClickHandler.bind(this, usersPhotosData));
  randomFilterButtonElement.addEventListener('click', randomButtonClickHandler.bind(this, usersPhotosData));
  discussedFilterButtonElement.addEventListener('click', discussedButtonClickHandler.bind(this, usersPhotosData));
};

export { getFilteredImages };
