'use strict';

// Открытие большой фотки

(function () {
  var bigPicture = document.querySelector('.big-picture');
var pictureUnit = document.querySelectorAll('.picture');
var bigPictureComment = bigPicture.querySelector('.social__footer-text');
var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
  document.querySelector('body').classList.remove('modal-open'); // При закрытии окна скролл возвращается - важно!
};

var onBigPictureEscPress = function (evt) {
  if (evt.key === window.utils.ESC_KEY && bigPictureComment !== document.activeElement) {
    closeBigPicture();
  }
};

closeBigPictureButton.addEventListener('click', closeBigPicture);

var openBigPicture = function (item, picture) {

  item.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.querySelector('body').classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');

    var socialText = bigPicture.querySelectorAll('.social__text');
    bigPicture.querySelector('.comments-count').textContent = socialText.length;
    for (var m = 0; m < socialText.length; m++) {
      socialText[m].textContent = picture.comments[m].message;
    }

    document.addEventListener('keydown', onBigPictureEscPress);
  });
};

for (var n = 0; n < pictureUnit.length; n++) {
  openBigPicture(pictureUnit[n], window.gallery.collectedPhotos[n]); // Подставляем в функцию наш массив с отрисованными фотографиями
}
})();
