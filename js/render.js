'use strict';

(function () {
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarItem = similarWizardTemplate.content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  window.render = function (wizard) {
    var SIMILAR_WIZARDS_NUMBER = wizard.length > 4 ? 4 : wizard.length;
    similarList.innerHTML = '';

    for (var i = 0; i < SIMILAR_WIZARDS_NUMBER; i++) {
      var wizardElement = similarItem.cloneNode(true);

      wizardElement.querySelector('.setup-similar-label').textContent = wizard[i].name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard[i].colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard[i].colorEyes;

      fragment.appendChild(wizardElement);
    }

    similarList.appendChild(fragment);
    similar.classList.remove('hidden');
  };
})();
