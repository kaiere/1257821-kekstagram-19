'use strict';

// Беда с отрисовкой больших фото после фильтрации
// После филтрации, при клике по маленьким фото, отображаются старые, неправильные
// Подскажи, пожалуйста, как это исправить (´；ω；`)ｳｩｩ
(function () {
  var pictureList = document.querySelector('.pictures');
  var closeBigPictureButton = document.querySelector('.big-picture__cancel');
  var bigPicture = document.querySelector('.big-picture');
  var commentCount = document.querySelector('.social__comment-count');
  var commentLoad = document.querySelector('.comments-loader');
  var commentList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var commentsAmount = 5;
  var step = 5;
  var commentsLoadHandler;

  // Собираем один комментарий по шаблону
  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  // Создаем список комментариев
  var createComments = function (element, sum) {
    var fragmentComment = document.createDocumentFragment();
    for (var i = 0; i < sum; i++) {
      fragmentComment.appendChild(renderComment(element[i]));
    }
    commentList.innerHTML = '';
    var amount;

    if (element.length <= commentsAmount) {
      amount = element.length;
    } else {
      amount = commentsAmount;
    }
    commentCount.innerHTML = amount + ' из <span class="comments-count">' + element.length + '</span> комментариев';
    commentList.appendChild(fragmentComment);
  };

  // Создаем "блок" одной большой фотографии
  var renderBigPicture = function (element) {
    var pic = window.load.photosArray[element];

    bigPicture.querySelector('.big-picture__img img').src = pic.url;
    bigPicture.querySelector('.likes-count').textContent = pic.likes;
    bigPicture.querySelector('.comments-count').textContent = pic.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pic.description;

    createComments(pic.comments);

    commentCount.classList.add('hidden');
    commentLoad.classList.add('hidden');
  };

  // Функции открытия и закрытия большой фотографии
  var openBigPicture = function (evt) {
    var target = evt.target;
    if (target.matches('a[data-id]') || target.parentNode.matches('a[data-id]')) {
      evt.preventDefault();
      var id = target.dataset.id || target.parentNode.dataset.id;
      renderBigPicture(id);
      bigPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onPictureEscPress);
      document.removeEventListener('keydown', onPictureEnterPress);
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPictureEscPress);
    document.addEventListener('keydown', onPictureEnterPress);
  };

  var keydownHandler = function (evt, key, func) {
    if (evt.key === key) {
      func(evt);
    }
  };

  var onPictureEnterPress = function (evt) {
    keydownHandler(evt, window.utils.ENTER_KEY, openBigPicture);
  };

  var onPictureEscPress = function (evt) {
    keydownHandler(evt, window.utils.ESC_KEY, closeBigPicture);
  };

  pictureList.addEventListener('click', function (evt) {
    openBigPicture(evt);
  });

  closeBigPictureButton.addEventListener('click', function () {
    closeBigPicture();
  });
})();
