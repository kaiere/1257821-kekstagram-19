'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var STEP_VALUES = ['25', '50', '75', '100'];
  var MAX_EFFECT_LEVEL = 100;
  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    STEP_VALUES: STEP_VALUES,
    MAX_EFFECT_LEVEL: MAX_EFFECT_LEVEL,
    getRandomNumber: getRandomNumber
  };
})();
