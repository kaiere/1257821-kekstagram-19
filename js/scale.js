'use strict';

// Масштаб фотографии

(function () {
  var smallScaleButton = document.querySelector('.scale__control--smaller');
  var bigScaleButton = document.querySelector('.scale__control--bigger');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var photoUploadDiv = document.querySelector('.img-upload__preview');
  var stepValue = 3;
  scaleControlInput.value = '100%';

  var getSmallScale = function () {
    if (scaleControlInput.value === '25%') {
      scaleControlInput.value = '25%';
    } else {
      stepValue--;
      scaleControlInput.value = window.util.STEP_VALUES[stepValue] + '%';
      photoUploadDiv.style.transform = 'scale(0.' + window.util.STEP_VALUES[stepValue] + ')';
    }
  };

  var getBigScale = function () {
    if (scaleControlInput.value === '100%') {
      scaleControlInput.value = '100%';
    } else {
      stepValue++;
      scaleControlInput.value = window.util.STEP_VALUES[stepValue] + '%';
      if (window.util.STEP_VALUES[stepValue] === '100') {
        photoUploadDiv.style.transform = 'scale(1.0)';
      } else {
        photoUploadDiv.style.transform = 'scale(0.' + window.util.STEP_VALUES[stepValue] + ')';
      }
    }
  };

  smallScaleButton.addEventListener('click', function () {
    getSmallScale();
  });
  bigScaleButton.addEventListener('click', function () {
    getBigScale();
  });
})();
