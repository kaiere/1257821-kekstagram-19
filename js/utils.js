'use strict';

(function () {
  /* var PHOTOS_AMOUNT = 25;
  var NAMES = ['Прометей', 'Такэда Сингэн', 'Чаплин', 'Аноним', 'Собака сутулая', 'Токугава Иэясу', 'Маки'];
  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
    'Пожалуйста, никогда больше не снимай - треш какой-то...',
    'Надеюсь, никто из участников фото не пострадал',
    'Хороший ракурс!',
    'Ну это просто неприлично... Прикройся!',
    'Фигура класс! У меня такая же! Была. Лет 20 назад',
    'Вид огонь! Но на даче у дяди Васи все равно лучше',
    'Я понимаю, что ты в отпуске, но клиент тут поправки прислал - оторвись от фоток!',
    'Ещё немного - и можно в профессиональные фотографы! :3',
    'Тебе очень идёт, конечно, но больше так не одевайся...',
    'На фотке не хватает кота!',
    'Красиво! Хочу туда!',
    'Супер-камера, это новый яблофон?',
    'И сколько денег на это выкинуто???',
    'Жить надо проще, срамота!',
    'Никого не слушай, всё огонь :)',
    'Собрались диванные ценители искусства...',
    'Хокусай бы одобрил',
    'Клёво как, а это где? На Камчатке?',
    'Ой как круто, привезёшь мне сувенир какой-нибудь?)))',
    'Люди на фотке такие счастливые! Будто и не в России живут...'];
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var COMMENTS_AMOUNT = 2; */
  var ESC_KEY = 'Escape';
  var DEBOUNCE_INTERVAL = 500;
  var ENTER_KEY = 'Enter';
  var STEP_VALUES = ['25', '50', '75', '100'];
  var MAX_EFFECT_LEVEL = 100;
  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };
  var getRandomValueFromArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  var filterMenu = document.querySelector('.img-filters');
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    /* PHOTOS_AMOUNT: PHOTOS_AMOUNT,
    NAMES: NAMES,
    COMMENTS: COMMENTS,
    MIN_LIKES: MIN_LIKES,
    MAX_LIKES: MAX_LIKES,
    MIN_AVATAR_NUMBER: MIN_AVATAR_NUMBER,
    MAX_AVATAR_NUMBER: MAX_AVATAR_NUMBER,
    COMMENTS_AMOUNT: COMMENTS_AMOUNT, */
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    STEP_VALUES: STEP_VALUES,
    MAX_EFFECT_LEVEL: MAX_EFFECT_LEVEL,
    getRandomNumber: getRandomNumber,
    getRandomValueFromArray: getRandomValueFromArray,
    filterMenu: filterMenu,
    debounce: debounce
  };
})();
