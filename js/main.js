'use strict';

var smallScaleButton = document.querySelector('.scale__control--smaller');
var bigScaleButton = document.querySelector('.scale__control--bigger');
var scaleControlInput = document.querySelector('.scale__control--value');
var photoUploadDiv = document.querySelector('.img-upload__preview');
var stepValue = 3;
scaleControlInput.value = '100%';

var smallScale = function () {
  if (scaleControlInput.value === '25%') {
    scaleControlInput.value = '25%';
  } else {
    stepValue--;
    scaleControlInput.value = window.utils.STEP_VALUES[stepValue] + '%';
    photoUploadDiv.style.transform = 'scale(0.' + window.utils.STEP_VALUES[stepValue] + ')';
  }
};

var bigScale = function () {
  if (scaleControlInput.value === '100%') {
    scaleControlInput.value = '100%';
  } else {
    stepValue++;
    scaleControlInput.value = STEP_VALUES[stepValue] + '%';
    if (window.utils.STEP_VALUES[stepValue] === '100') {
      photoUploadDiv.style.transform = 'scale(1.0)';
    } else {
      photoUploadDiv.style.transform = 'scale(0.' + window.utils.STEP_VALUES[stepValue] + ')';
    }
  }
};

smallScaleButton.addEventListener('click', function () {
  smallScale();
});
bigScaleButton.addEventListener('click', function () {
  bigScale();
});

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

var photoUploadSubmitButton = document.querySelector('.img-upload__submit');
var hashtagInput = document.querySelector('.text__hashtags');
var regex = /^#[a-zA-Z0-9]+$/;

var checkHashtag = function (tag) {
  if (tag.length > 20) {
    return false;
  }

  if (regex.test(tag)) {
    return true;
  }

  return false;
};

var fixTags = function (array) {
  var tagsArray = [];
  for (var j = 0; j < array.length; j++) {
    if (array[j] !== '') {
      tagsArray.push(array[j]);
    }
  }
  return tagsArray;
};

var checkAllHashtags = function (str) {
  var tags = str.split(' ');
  var tagsNoSpaces = fixTags(tags);

  if (tagsNoSpaces.length > 5) {
    return false;
  }
  for (var index = 0; index < tagsNoSpaces.length; index++) {
    for (var k = index + 1; k < tagsNoSpaces.length; k++) {
      if (tagsNoSpaces[index].toLowerCase() === tagsNoSpaces[k].toLowerCase()) {
        return false;
      }
    }
  }

  for (var l = 0; l < tagsNoSpaces.length; l++) {
    if (!checkHashtag(tagsNoSpaces[l])) {
      return false;
    }
  }
  return true;
};

photoUploadSubmitButton.addEventListener('click', function () {
  if (!checkAllHashtags(hashtagInput.value)) {
    hashtagInput.setCustomValidity('Неправильный формат хэштега');
  } else {
    hashtagInput.setCustomValidity('');
  }
});
