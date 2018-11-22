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

// функция вовзращает случайный элемент из массива array
function getRandomInt(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// функция возвращает массив, состоящий из arrayLength объектов
var getRandomArray = function (arrayLength) {
  var array = [];

  for (var i = 0; i < arrayLength; i++) {
    var object = {};

    object.name = getRandomInt(WIZARD_NAMES) + ' ' + getRandomInt(WIZARD_SURNAMES);
    object.coatColor = getRandomInt(COAT_COLORS);
    object.eyesColor = getRandomInt(EYES_COLORS);

    array.push(object);
  }

  return array;
};

var wizards = getRandomArray(4);

var userDialog = document.querySelector('.setup');
// удаляем класс hidden у элемента с классом setup
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template');var similarItem = similarWizardTemplate.content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

// функция возвращает элемент, который используется в качестве шаблона
var renderWizard = function (wizard) {
  var wizardElement = similarItem.cloneNode(true);

  // меняем имя волшебника, которое берётся из массива wizard
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  // меняем цвет плаща волшебника
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  // меняем цвет глаз волшебника
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// в цикле добавляем элементы в DocumentFragment, чтобы не перерисовывать страницу каждый раз
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// выводим содержимое DocumentFragment в DOM
similarListElement.appendChild(fragment);

// удаляем класс hidden у блока "Похожие персонажи"
userDialog.querySelector('.setup-similar').classList.remove('hidden');
