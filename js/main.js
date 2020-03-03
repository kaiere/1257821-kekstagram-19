'use strict';

var PHOTOS_AMOUNT = 25;
var NAMES = ['Прометей', 'Такэда Сингэн', 'Чаплин', 'Аноним', 'Собака сутулая', 'Токугава Иэясу', 'Маки'];
var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var COMMENTS_AMOUNT = 3;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var STEP_VALUES = ['25', '50', '75', '100'];

var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var createComments = function (commentCount) {
  var comments = [];
  for (var i = 0; i < commentCount; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
      message: COMMENTS[getRandomNumber(0, COMMENTS.length)],
      name: NAMES[getRandomNumber(0, NAMES.length)]
    });
  }
  return comments;
};

var getPhotos = function (amount) {
  var photos = [];
  for (var i = 0; i < amount; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: createComments(COMMENTS_AMOUNT)
    });
  }
  return photos;
};

var collectedPhotos = getPhotos(PHOTOS_AMOUNT);

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var createPhoto = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }
  picturesList.appendChild(fragment);
};

createPhoto(collectedPhotos);

var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

var commentsList = document.querySelector('.social__comments');

var image = bigPicture.querySelector('.big-picture__img').querySelector('img');
image.src = collectedPhotos[0].url;

var description = bigPicture.querySelector('.social__caption');
description.textContent = collectedPhotos[0].description;

var likesCount = bigPicture.querySelector('.likes-count');
likesCount.textContent = collectedPhotos[0].likes;

var commentsCount = bigPicture.querySelector('.comments-count');
commentsCount.textContent = collectedPhotos[0].comments.length;

var createCommentTemplate = function (container) {
  container.insertAdjacentHTML('afterbegin',
      '<li class="social__comment">' +
        '<img class="social__picture" width="35" height="35">' +
        '<p class="social__text"></p>' +
      '</li>'
  );
};

for (var i = 0; i < collectedPhotos[0].comments.length; i++) {
  createCommentTemplate(commentsList);

  commentsList.querySelector('.social__comment').querySelector('.social__picture').src = collectedPhotos[0].comments[i].avatar;
  commentsList.querySelector('.social__comment').querySelector('.social__picture').alt = collectedPhotos[0].comments[i].name;
  commentsList.querySelector('.social__text').textContent = collectedPhotos[0].comments[i].message;
}

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

// document.querySelector('body').classList.add('modal-open');

var photoUploadInput = document.querySelector('.img-upload .img-upload__input');
var photoUploadCancel = document.querySelector('.img-upload .img-upload__cancel');
var photoUploadOverlay = document.querySelector('.img-upload .img-upload__overlay');

var openUploadWindow = function () {
  photoUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

var closeUploadWindow = function () {
  photoUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  photoUploadInput = '';
};

photoUploadInput.addEventListener('change', function () {
  openUploadWindow();
});

photoUploadCancel.addEventListener('click', function () {
  closeUploadWindow();
});

photoUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeUploadWindow();
  }
});

var onUploadPressEscape = function (evt) {
  if (evt.key === ESC_KEY) {
    closeUploadWindow();
  }
};

document.addEventListener('keydown', onUploadPressEscape);

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
    scaleControlInput.value = STEP_VALUES[stepValue] + '%';
    photoUploadDiv.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
  }
};

var bigScale = function () {
  if (scaleControlInput.value === '100%') {
    scaleControlInput.value = '100%';
  } else {
    stepValue++;
    scaleControlInput.value = STEP_VALUES[stepValue] + '%';
    if (STEP_VALUES[stepValue] === '100') {
      photoUploadDiv.style.transform = 'scale(1.0)';
    } else {
      photoUploadDiv.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
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
