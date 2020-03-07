'use strict';

// Здесь мы отрисуем массив фоток

(function () {
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createComments = function (commentCount) {
    var comments = [];
    for (var i = 0; i < commentCount; i++) {
      comments.push({
        avatar: 'img/avatar-' + window.utils.getRandomNumber(window.utils.MIN_AVATAR_NUMBER, window.utils.MAX_AVATAR_NUMBER) + '.svg',
        message: window.utils.COMMENTS[window.utils.getRandomNumber(0, window.utils.COMMENTS.length)],
        name: window.utils.NAMES[window.utils.getRandomNumber(0, window.utils.NAMES.length)]
      });
    }
    return comments;
  };

  var getPhotos = function (amount) {
    var photos = [];
    for (var i = 0; i < amount; i++) {
      photos.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'Описание фотографии',
        likes: window.utils.getRandomNumber(window.utils.MIN_LIKES, window.utils.MAX_LIKES),
        comments: createComments(window.utils.COMMENTS_AMOUNT)
      });
    }
    return photos;
  };

  var collectedPhotos = getPhotos(window.utils.PHOTOS_AMOUNT);

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__img').alt = picture.description;

    return pictureElement;
  };

  var createPhoto = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    picturesList.appendChild(fragment);
  };

  createPhoto(collectedPhotos);

  window.gallery = {
    collectedPhotos: collectedPhotos
  };
})();
