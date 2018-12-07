'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomArrayElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    sortArrayRandom: function (array) {
      return array.slice().sort(function () {
        return Math.random() - 0.5;
      });
    }
  };
})();
