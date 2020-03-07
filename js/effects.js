'use strict';

// Работа с эффектами - фильтры

(function () {
var effectsList = document.querySelector('.effects__list');
var photoUpload = document.querySelector('.img-upload__preview').querySelector('img');
var levelLine = document.querySelector('.effect-level__line');
var effectsNoneBtn = document.querySelector('.effects__preview--none');
var effectLevelSlider = document.querySelector('.effect-level');

var object = {
  'effect-none': 'effects-preview--none',
  'effect-chrome': 'effects-preview--chrome',
  'effect-sepia': 'effects-preview--sepia',
  'effect-marvin': 'effects-preview--marvin',
  'effect-phobos': 'effects-preview--phobos',
  'effect-heat': 'effects-preview--heat'
};

effectLevelSlider.classList.add('hidden');

effectsList.addEventListener('click', function (evt) {
  if (evt.target.type === 'radio') {

    if (!photoUpload.className) {
      photoUpload.classList.add(object[evt.target.id]);
    }
    if (photoUpload.className !== evt.target.id) {
      photoUpload.className = '';
      photoUpload.classList.add(object[evt.target.id]);
    }
    if (photoUpload.className === object['effect-none']) {
      effectLevelSlider.classList.add('hidden');
    } else {
      effectLevelSlider.classList.remove('hidden');
    }

    if (photoUpload.className === object['effect-chrome']) {
      photoUpload.style.filter = 'grayscale(1)';
    }
    if (photoUpload.className === object['effect-sepia']) {
      photoUpload.style.filter = 'sepia(1)';
    }
    if (photoUpload.className === object['effect-marvin']) {
      photoUpload.style.filter = 'invert(100%)';
    }
    if (photoUpload.className === object['effect-phobos']) {
      photoUpload.style.filter = 'blur(3px)';
    }
    if (photoUpload.className === object['effect-heat']) {
      photoUpload.style.filter = 'brightness(3)';
    }
  }
});

effectsNoneBtn.addEventListener('click', function () {
  photoUpload.style = '';
});

levelLine.addEventListener('mouseup', function (evt) {
  var saturation = evt.offsetX / levelLine.offsetWidth * 100;
  var saturationBlur = evt.offsetX / levelLine.offsetWidth * 3;
  var saturationBrightness = (evt.offsetX / levelLine.offsetWidth * 2) + 1;

  if (photoUpload.className === object['effect-chrome']) {
    photoUpload.style.filter = 'grayscale(0.' + Math.floor(saturation) + ')';
  }
  if (photoUpload.className === object['effect-sepia']) {
    photoUpload.style.filter = 'sepia(0.' + Math.floor(saturation) + ')';
  }
  if (photoUpload.className === object['effect-marvin']) {
    photoUpload.style.filter = 'invert(' + Math.round(saturation) + '%)';
  }
  if (photoUpload.className === object['effect-phobos']) {
    photoUpload.style.filter = 'blur(' + saturationBlur + 'px)';
  }
  if (photoUpload.className === object['effect-heat']) {
    photoUpload.style.filter = 'brightness(' + saturationBrightness + ')';
  }
});

})();
