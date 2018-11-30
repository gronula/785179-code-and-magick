'use strict';

// массив имён
var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

// массив фамилий
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

// массив цветов плащей
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

// массив цветов глаз
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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// функция вовзращает случайный элемент из массива array
function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// функция возвращает массив, состоящий из arrayLength объектов
var getRandomArray = function (arrayLength) {
  var array = [];

  for (var i = 0; i < arrayLength; i++) {
    var object = {};

    object.name = getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES);
    object.coatColor = getRandomArrayElement(COAT_COLORS);
    object.eyesColor = getRandomArrayElement(EYES_COLORS);

    array.push(object);
  }

  return array;
};

var wizards = getRandomArray(4);

// функция возвращает элемент, который используется в качестве шаблона
var renderWizard = function (wizard) {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarItem = similarWizardTemplate.content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  // в цикле добавляем элементы в DocumentFragment, чтобы не перерисовывать страницу каждый раз
  for (var i = 0; i < wizard.length; i++) {
    var wizardElement = similarItem.cloneNode(true);

    // меняем имя волшебника, которое берётся из массива wizard
    wizardElement.querySelector('.setup-similar-label').textContent = wizard[i].name;
    // меняем цвет плаща волшебника
    wizardElement.querySelector('.wizard-coat').style.fill = wizard[i].coatColor;
    // меняем цвет глаз волшебника
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard[i].eyesColor;

    fragment.appendChild(wizardElement);
  }

  // выводим содержимое DocumentFragment в DOM
  similarListElement.appendChild(fragment);
};

renderWizard(wizards);

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

// удаляем класс hidden у блока "Похожие персонажи"
setup.querySelector('.setup-similar').classList.remove('hidden');

var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupWizardCoatInput = setup.querySelector('input[name = coat-color]');

var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupWizardEyesInput = setup.querySelector('input[name = eyes-color]');

var setupFireball = setup.querySelector('.setup-fireball-wrap');
var setupFireballInput = setup.querySelector('input[name = fireball-color]');

var changingColor = function (element, hideInput, cssProperty, colorsArray) {
  var color = getRandomArrayElement(colorsArray);
  element.style[cssProperty] = color;
  hideInput.value = color;
};

var changeWizardAttributes = function (evt) {
  var className = evt.target.classList;
  if (className.contains('wizard-coat')) {
    changingColor(setupWizardCoat, setupWizardCoatInput, 'fill', COAT_COLORS);
  } else if (className.contains('wizard-eyes')) {
    changingColor(setupWizardEyes, setupWizardEyesInput, 'fill', EYES_COLORS);
  } else if (className.contains('setup-fireball')) {
    changingColor(setupFireball, setupFireballInput, 'backgroundColor', FIREBALLS_COLORS);
  }
};

var addEvent = function (element) {
  element.addEventListener('click', changeWizardAttributes);
};

var removeEvent = function (element) {
  element.removeEventListener('click', changeWizardAttributes);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  if (setup.classList.contains('hidden')) {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);

    addEvent(setupWizardCoat);
    addEvent(setupWizardEyes);
    addEvent(setupFireball);
  }
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);

  removeEvent(setupWizardCoat);
  removeEvent(setupWizardEyes);
  removeEvent(setupFireball);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupUserName.addEventListener('focusin', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

setupUserName.addEventListener('focusout', function () {
  document.addEventListener('keydown', onPopupEscPress);
});
