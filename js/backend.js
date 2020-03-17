'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var photosArray = [];

  var loadData = function (successHandler) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        throw new Error('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      throw new Error('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      throw new Error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.uploadData = function (data, successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.load.StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = {
    loadData: loadData,
    photosArray: photosArray,
    StatusCode: StatusCode
  };
})();
