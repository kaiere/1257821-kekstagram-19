'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var effectLevelLine = uploadForm.querySelector('.effect-level__line');
  var pin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelInput = uploadForm.querySelector('.effect-level__value');
  var effectDepth = effectLevelLine.querySelector('.effect-level__depth');
  pin.style.cursor = 'pointer';

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var lineStart = effectLevelLine.offsetLeft - pin.offsetWidth;
      var lineEnd = effectLevelLine.offsetLeft + effectLevelLine.offsetWidth - pin.offsetWidth;
      var pinPosition = pin.offsetLeft + moveEvt.movementX;
      var limitMoveX = {
        min: lineStart,
        max: lineEnd
      };

      if (pinPosition < limitMoveX.min) {
        pinPosition = limitMoveX.min;
      }
      if (pinPosition > limitMoveX.max) {
        pinPosition = limitMoveX.max;
      }
      pin.style.left = pinPosition + 'px';
      var effectInPercent = Math.floor((pinPosition / limitMoveX.max) * 100);
      effectLevelInput.value = effectInPercent;
      effectDepth.style.width = effectInPercent + '%';

      var activeEffect = document.querySelector('input[name="effect"]:checked').id;
      window.filter.setFilter(activeEffect);
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  window.slider = {
    movePin: onPinMouseDown
  };

})();
