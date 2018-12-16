'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupWizardCoatInput = setup.querySelector('input[name = coat-color]');
  var setupWizardEyesInput = setup.querySelector('input[name = eyes-color]');

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    wizard.rank = rank;

    return rank;
  };

  var fireballColorsComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    coatColor = setupWizardCoatInput.value;
    eyesColor = setupWizardEyesInput.value;

    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = fireballColorsComparator(left.colorFireball, right.colorFireball);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
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

  var loadData = function () {
    if (!setup.querySelector('.setup-similar-item')) {
      window.backend.load(successHandler, errorHandler);
    }
    var error = document.querySelector('.error-message');
    if (error) {
      document.body.removeChild(error);
    }
  };

  setupOpen.addEventListener('click', loadData);

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

  window.dialog = {
    updateWizards: updateWizards
  };
})();
