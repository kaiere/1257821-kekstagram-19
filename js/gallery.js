'use strict';

// Здесь мы отрисуем массив фотографий

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var filter = document.querySelector('.img-filters');

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
    window.filtration.getRandomPhotos();
    window.filtration.getDefaultPhotos();
    window.filtration.getDiscussedPhotos();
  };

  window.load.loadData(successLoadHandler);

  window.gallery = {
    picturesContainer: picturesContainer,
    createPhotosArray: createPhotosArray
  };

})();
