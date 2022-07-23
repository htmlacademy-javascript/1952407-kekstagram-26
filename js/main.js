import { getData, allertMessage } from './api.js';
import { renderPhotos } from './generate-thumbnails.js';
import { showAlert } from './util.js';
import { getFilteredImages } from './sort-photos.js';
import './validate-form.js';
import './image-form.js';
import './preview.js';

getData((usersPhotosData) => {
  renderPhotos(usersPhotosData);
  getFilteredImages(usersPhotosData);
}, () => {
  showAlert(allertMessage);
});
