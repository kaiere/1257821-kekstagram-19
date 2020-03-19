'use strict';

(function () {

  var IMG_AMOUNT = 10;

  var filter = document.querySelector('.img-filters');
  var filterButtons = filter.querySelectorAll('.img-filters__button');
  var filterRandomButton = filter.querySelector('#filter-random');
  var filterDefaultButton = filter.querySelector('#filter-default');
  var filterDiscussedButton = filter.querySelector('#filter-discussed');

  filter.classList.remove('img-filters--inactive');

  var getRandomPic = function (array, splice) {
    var number = Math.floor(Math.random() * array.length);
    var content = array[number];

    if (splice) {
      array.splice(number, 1);
    }

    return content;
  };

  var removeButtonActiveClass = function () {
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var cleanArrayPictures = function () {
    var pictures = window.gallery.picturesContainer.querySelectorAll('.picture');

    pictures.forEach(function (picture) {
      window.gallery.picturesContainer.removeChild(picture);
    });
  };

  var getDefaultPhotos = function () {
    filterDefaultButton.addEventListener('click', function () {
      window.debounce(function () {
        removeButtonActiveClass();
        filterDefaultButton.classList.add('img-filters__button--active');
        cleanArrayPictures();

        window.gallery.createPhotosArray(window.load.photosArray);
      })();
    });
  };

  var getRandomPhotos = function () {
    filterRandomButton.addEventListener('click', function () {
      window.debounce(function () {
        removeButtonActiveClass();
        filterRandomButton.classList.add('img-filters__button--active');
        cleanArrayPictures();

        var output = window.load.photosArray.slice();
        var randomPhotos = [];

        for (var i = 0; i < IMG_AMOUNT; i++) {
          var item = getRandomPic(output, true);
          randomPhotos.push(item);
        }

        window.gallery.createPhotosArray(randomPhotos);
      })();
    });
  };


  var getDiscussedPhotos = function () {
    filterDiscussedButton.addEventListener('click', function () {
      window.debounce(function () {
        removeButtonActiveClass();
        filterDiscussedButton.classList.add('img-filters__button--active');
        cleanArrayPictures();

        var output = window.load.photosArray.slice();

        output.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });

        window.gallery.createPhotosArray(output);
      })();
    });
  };

  window.filtration = {
    getRandomPhotos: getRandomPhotos,
    getDefaultPhotos: getDefaultPhotos,
    getDiscussedPhotos: getDiscussedPhotos
  };

})();
