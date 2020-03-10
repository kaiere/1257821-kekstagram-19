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
})();
