'use strict';

// Работа с эффектами - фильтры

(function () {
  var editPhoto = document.querySelector('.img-upload__overlay');
  var photoUpload = editPhoto.querySelector('.img-upload__preview');
  var effectLevelInput = editPhoto.querySelector('.effect-level__value');
  var effectLevelSlider = editPhoto.querySelector('.img-upload__effect-level');
  var levelLine = effectLevelSlider.querySelector('.effect-level__line');
  var pin = levelLine.querySelector('.effect-level__pin');
  var effectDepth = levelLine.querySelector('.effect-level__depth');
  var effectListMap = {
    'effect-none': 'effects-preview--none',
    'effect-chrome': 'effects-preview--chrome',
    'effect-sepia': 'effects-preview--sepia',
    'effect-marvin': 'effects-preview--marvin',
    'effect-phobos': 'effects-preview--phobos',
    'effect-heat': 'effects-preview--heat'
  };

  var showSlider = function (effect) {
    return (effect === 'effect-none') ? effectLevelSlider.classList.add('hidden') : effectLevelSlider.classList.remove('hidden');
  };

  var setDefaultEffectLevel = function () {
    pin.style.left = window.utils.MAX_EFFECT_LEVEL + '%';
    effectDepth.style.width = window.utils.MAX_EFFECT_LEVEL + '%';
    effectLevelInput.value = window.utils.MAX_EFFECT_LEVEL;
  };

  var changeFilter = function (evt) {
    var target = evt.target.matches('input[name="effect"]');
    if (!target) {
      return;
    }
    var effectName = evt.target.id;
    photoUpload.className = 'img-upload__preview';
    photoUpload.classList.add(effectListMap[effectName]);
    photoUpload.style.filter = '';
    setDefaultEffectLevel();
    showSlider(effectName);
  };

  var chrome = {
    min: 0,
    max: 1
  };
  var sepia = {
    min: 0,
    max: 1
  };
  var marvin = {
    min: 0,
    max: 100
  };
  var phobos = {
    min: 0,
    max: 3
  };
  var heat = {
    min: 1,
    max: 3
  };

  var getEffectDepth = function (limit) {
    return ((effectLevelInput.value * (limit.max - limit.min)) / window.utils.MAX_EFFECT_LEVEL) + limit.min;
  };

  var setFilter = function (effect) {
    if (effect === 'effect-chrome') {
      photoUpload.style.filter = 'grayscale(' + getEffectDepth(chrome) + ')';
    }
    if (effect === 'effect-sepia') {
      photoUpload.style.filter = 'sepia(' + getEffectDepth(sepia) + ')';
    }
    if (effect === 'effect-marvin') {
      photoUpload.style.filter = 'invert(' + getEffectDepth(marvin) + '%)';
    }
    if (effect === 'effect-phobos') {
      photoUpload.style.filter = 'blur(' + getEffectDepth(phobos) + 'px)';
    }
    if (effect === 'effect-heat') {
      photoUpload.style.filter = 'brightness(' + getEffectDepth(heat) + ')';
    }
  };

  window.filter = {
    changeFilter: changeFilter,
    setFilter: setFilter,
    showSlider: showSlider,
    setDefaultEffectLevel: setDefaultEffectLevel
  };

})();
