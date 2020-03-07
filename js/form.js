'use strict';

// Загрузка фотки и редактирование

(function () {
  var photoUploadInput = document.querySelector('.img-upload .img-upload__input');
  var photoUploadCancel = document.querySelector('.img-upload .img-upload__cancel');
  var photoUploadOverlay = document.querySelector('.img-upload .img-upload__overlay');

  var openUploadWindow = function () {
    photoUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  };

  var closeUploadWindow = function () {
    photoUploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    photoUploadInput = '';
  };

  photoUploadInput.addEventListener('change', function () {
    openUploadWindow();
  });

  photoUploadCancel.addEventListener('click', function () {
    closeUploadWindow();
  });

  photoUploadCancel.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      closeUploadWindow();
    }
  });

  var onUploadPressEscape = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      closeUploadWindow();
    }
  };

  document.addEventListener('keydown', onUploadPressEscape);
})();
