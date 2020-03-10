'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var effectLevelLine = uploadForm.querySelector('.effect-level__line');
  var pin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelInput = uploadForm.querySelector('.effect-level__value');
  var effectDepth = effectLevelLine.querySelector('.effect-level__depth');
  pin.style.cursor = 'pointer';
})();
