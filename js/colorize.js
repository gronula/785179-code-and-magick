'use strict';

window.colorize = (function () {

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALLS_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  return {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALLS_COLORS: FIREBALLS_COLORS,
    changingColor: function (element, hideInput, cssProperty, colorsArray) {
      var color = window.util.getRandomArrayElement(colorsArray);
      element.style[cssProperty] = color;
      hideInput.value = color;
      return color;
    }
  };
})();
