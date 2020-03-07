'use strict';

// ВАЛИДАЦИЯ ХЭШТЕГОВ

(function () {
  var photoUploadSubmitButton = document.querySelector('.img-upload__submit');
var hashtagInput = document.querySelector('.text__hashtags');
var regex = /^#[a-zA-Z0-9]+$/;

var checkHashtag = function (tag) {
  if (tag.length > 20) {
    return false;
  }

  if (regex.test(tag)) {
    return true;
  }

  return false;
}; // Проверка формата хэштега

var fixTags = function (array) {
  var tagsArray = [];
  for (var j = 0; j < array.length; j++) {
    if (array[j] !== '') {
      tagsArray.push(array[j]);
    }
  }
  return tagsArray;
}; // Добавление пробелов

var checkAllHashtags = function (str) {
  var tags = str.split(' ');
  var tagsNoSpaces = fixTags(tags);

  if (tagsNoSpaces.length > 5) {
    return false;
  }
  for (var index = 0; index < tagsNoSpaces.length; index++) {
    for (var k = index + 1; k < tagsNoSpaces.length; k++) {
      if (tagsNoSpaces[index].toLowerCase() === tagsNoSpaces[k].toLowerCase()) {
        return false;
      }
    }
  }

  for (var l = 0; l < tagsNoSpaces.length; l++) {
    if (!checkHashtag(tagsNoSpaces[l])) {
      return false;
    }
  }
  return true;
};

photoUploadSubmitButton.addEventListener('click', function () {
  if (!checkAllHashtags(hashtagInput.value)) {
    hashtagInput.setCustomValidity('Неправильный формат хэштега');
  } else {
    hashtagInput.setCustomValidity('');
  }
});
})();
