'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Отрисуем весь массив с фотографиями
  var renderPicture = function (picture, id) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.dataset.id = id;
    return pictureElement;
  };

  var createPhotosArray = function (array) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < array.length; j++) {
      fragment.appendChild(renderPicture(array[j], j));
    }

    picturesContainer.appendChild(fragment);
  };

  var successLoadHandler = function (data) {
    window.load.photosArray = data;
    createPhotosArray(window.load.photosArray);
  };

  window.load.loadData(successLoadHandler);

  var removePictureElements = function () {
    picturesContainer.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  window.utils.filterMenu.addEventListener('mousedown', function (evt) {
    window.utils.debounce(filterUserPhotos(evt));
  });

  var filterUserPhotos = function (evt) {
    var target = evt.target.closest('.img-filters__button');
    if (!target) {
      return;
    }
    window.sorting.showCurrent(target);
    var userPhotos = window.load.photosArray;

    if (target.id === 'filter-default') {
      removePictureElements();
      createPhotosArray(userPhotos);
    }
    if (target.id === 'filter-discussed') {
      removePictureElements();
      createPhotosArray(window.sorting.getPopular(userPhotos));
    }
    if (target.id === 'filter-random') {
      removePictureElements();
      createPhotosArray(window.sorting.getRandom(userPhotos));
    }
  };

  window.createPhotosArray = createPhotosArray;
}());
