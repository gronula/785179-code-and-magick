'use strict';

(function () {
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

  var getRandomArray = function (arrayLength) {
    var array = [];

    for (var i = 0; i < arrayLength; i++) {
      var object = {};

      object.name = window.util.getRandomArrayElement(WIZARD_NAMES) + ' ' + window.util.getRandomArrayElement(WIZARD_SURNAMES);
      object.coatColor = window.util.getRandomArrayElement(window.colorize.COAT_COLORS);
      object.eyesColor = window.util.getRandomArrayElement(window.colorize.EYES_COLORS);

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

  var setup = document.querySelector('.setup');

  // удаляем класс hidden у блока "Похожие персонажи"
  setup.querySelector('.setup-similar').classList.remove('hidden');
})();
