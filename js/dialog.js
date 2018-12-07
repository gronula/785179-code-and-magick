'use strict';

(function () {
  var SIMILAR_WIZARDS_NUMBER = 4;

  var renderWizard = function (wizard) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var similarWizardTemplate = document.querySelector('#similar-wizard-template');
    var similarItem = similarWizardTemplate.content.querySelector('.setup-similar-item');
    var fragment = document.createDocumentFragment();
    var sortWizard = window.util.sortArrayRandom(wizard);

    for (var i = 0; i < SIMILAR_WIZARDS_NUMBER; i++) {
      var wizardElement = similarItem.cloneNode(true);

      wizardElement.querySelector('.setup-similar-label').textContent = sortWizard[i].name;
      wizardElement.querySelector('.wizard-coat').style.fill = sortWizard[i].colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = sortWizard[i].colorEyes;

      fragment.appendChild(wizardElement);
    }

    similarListElement.appendChild(fragment);
  };

  var successHandler = function (wizards) {
    renderWizard(wizards);
  };

  var errorHandler = function (errorMessage) {
    var error = document.querySelector('.error-message');
    if (!error) {
      var node = document.createElement('div');
      node.classList.add('error-message');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

  window.backend.load(successHandler, errorHandler);

  var setup = document.querySelector('.setup');

  setup.querySelector('.setup-similar').classList.remove('hidden');

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
      var error = document.querySelector('.error-message');
      if (error) {
        document.body.removeChild(error);
      }
    }, errorHandler);
    evt.preventDefault();
  });
})();
