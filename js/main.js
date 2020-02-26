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
bigPicture.classList.remove('hidden');

var commentsList = document.querySelector('.social__comments');

var image = bigPicture.querySelector('.big-picture__img').querySelector('img');
image.src = collectedPhotos[0].url;

var description = bigPicture.querySelector('.social__caption');
description.textContent = collectedPhotos[0].description;
