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

  var onPinMouseDown = function (evt) {
    window.slider.movePin(evt);
  };

  var onEffectButtonClick = function (evt) {
    window.filter.changeFilter(evt);
  };

  var openUploadWindow = function () {
    photoUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    window.filter.setDefaultEffectLevel();
    window.filter.showSlider('effect-none');
    imagePreview.className = 'img-upload__preview';

    photoUploadCancel.addEventListener('click', onUploadCancelClick);
    document.addEventListener('keydown', onUploadPressEscape);
    pin.addEventListener('mousedown', onPinMouseDown);
    effectsList.addEventListener('click', onEffectButtonClick);
  };

  var closeUploadWindow = function () {
    photoUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');

    photoUploadCancel.removeEventListener('click', onUploadCancelClick);
    document.removeEventListener('keydown', onUploadPressEscape);
    pin.removeEventListener('mousedown', onPinMouseDown);
    effectsList.removeEventListener('click', onEffectButtonClick);
  };

  var onUploadCancelClick = function () {
    closeUploadWindow();
  };

  var onUploadPressEscape = function (evt) {
    if ((evt.key === window.utils.ESCAPE_KEY) && (evt.target !== hashtagsInput) && (evt.target !== descriptionInput)) {
      closeUploadWindow();
    }
  };

})();
