'use strict';

// Загрузка фотки и редактирование

(function () {
  var body = document.querySelector('body');
  var uploadForm = document.querySelector('.img-upload__form');
  var photoUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');
  var uploadFileInput = uploadForm.querySelector('#upload-file');
  var photoUploadCancel = uploadForm.querySelector('.img-upload__cancel');
  var descriptionInput = uploadForm.querySelector('.text__description');
  var effectsList = document.querySelector('.effects__list');
  var line = uploadForm.querySelector('.effect-level__line');
  var pin = line.querySelector('.effect-level__pin');
  var imagePreview = photoUploadOverlay.querySelector('.img-upload__preview');

  // МОДУЛЬ 6 ЗАДАНИЕ 3 Переменные

  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainContainer = document.querySelector('main');
  var errorButtonClose = errorMessageTemplate.querySelector('.error__button');
  var successButtonClose = successMessageTemplate.querySelector('.success__button');

  // Закончили объявление переменных

  uploadFileInput.addEventListener('change', function () {
    openUploadWindow();
  });

  var pinMouseDownHandler = function (evt) {
    window.slider.movePin(evt);
  };

  var effectListClickHandler = function (evt) {
    window.filter.changeFilter(evt);
  };

  var openUploadWindow = function () {
    photoUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    window.filter.setDefaultEffectLevel();
    window.filter.showSlider('effect-none');
    imagePreview.className = 'img-upload__preview';

    photoUploadCancel.addEventListener('click', onUploadCancelClick);
    document.addEventListener('keydown', uploadFormPressEscapeHandler);
    pin.addEventListener('mousedown', pinMouseDownHandler);
    effectsList.addEventListener('click', effectListClickHandler);
  };

  var closeUploadWindow = function () {
    photoUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    imagePreview.style.transform = '';
    photoUploadCancel.removeEventListener('click', onUploadCancelClick);
    document.removeEventListener('keydown', uploadFormPressEscapeHandler);
    pin.removeEventListener('mousedown', pinMouseDownHandler);
    effectsList.removeEventListener('click', effectListClickHandler);
  };

  var onUploadCancelClick = function () {
    closeUploadWindow();
  };

  var uploadFormPressEscapeHandler = function (evt) {
    if ((evt.key === window.util.ESC_KEY) && (evt.target !== hashtagsInput) && (evt.target !== descriptionInput)) {
      closeUploadWindow();
    }
  };

  // МОДУЛЬ 6 ЗАДАНИЕ 3 Функции

  var createUploadMessage = function (message) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    mainContainer.appendChild(fragment);
  };

  var closeUploadMessage = function (message) {
    message.remove();
  };

  var messageEscPressHandler = function (evt, message) {
    if (evt.key === window.util.ESC_KEY) {
      closeUploadMessage(message);
    }
  };

  var uploadHandler = function (message, button) {
    uploadFileInput.value = '';
    window.filter.setDefaultEffectLevel();
    imagePreview.style.transform = '';
    window.filter. setFilter('effect-none');
    uploadForm.reset();
    closeUploadWindow();
    createUploadMessage(message);
    document.addEventListener('keydown', function (evt) {
      messageEscPressHandler(evt, message);
    });
    button.addEventListener('click', function () {
      closeUploadMessage(message);
    });
    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target !== document.querySelector('.success__inner') && target !== document.querySelector('.error__inner')) {
        closeUploadMessage(message);
      }
    });
  };

  var successUploadHandler = function () {
    uploadHandler(successMessageTemplate, successButtonClose);
  };

  var errorUploadHandler = function () {
    uploadHandler(errorMessageTemplate, errorButtonClose);
  };

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.uploadData(new FormData(uploadForm), successUploadHandler, errorUploadHandler);
  });

})();
