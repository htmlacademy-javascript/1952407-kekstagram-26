import { getData, allertMessage } from './api.js';
import { renderPhotos } from './generate-thumbnails.js';
import { showAlert } from './util.js';
import { getFiltredImages } from './sort-photos.js';
import './validate-form.js';
import './image-form.js';

getData((usersPhotosData) => {
  renderPhotos(usersPhotosData);
  getFiltredImages(usersPhotosData);
}, () => {
  showAlert(allertMessage);
});
