'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupHandle = setup.querySelector('.upload');

  var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardCoatInput = setup.querySelector('input[name = coat-color]');

  var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardEyesInput = setup.querySelector('input[name = eyes-color]');

  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var setupFireballInput = setup.querySelector('input[name = fireball-color]');

  var changeWizardAttributes = function (evt) {
    var className = evt.target.classList;
    if (className.contains('wizard-coat')) {
      window.colorize.changingColor(setupWizardCoat, setupWizardCoatInput, 'fill', window.colorize.COAT_COLORS);
      window.debounce(window.dialog.updateWizards);
    } else if (className.contains('wizard-eyes')) {
      window.colorize.changingColor(setupWizardEyes, setupWizardEyesInput, 'fill', window.colorize.EYES_COLORS);
      window.debounce(window.dialog.updateWizards);
    } else if (className.contains('setup-fireball')) {
      window.colorize.changingColor(setupFireball, setupFireballInput, 'backgroundColor', window.colorize.FIREBALLS_COLORS);
      window.debounce(window.dialog.updateWizards);
    }
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    if (setup.classList.contains('hidden')) {
      setup.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);

      setupWizardCoat.addEventListener('click', changeWizardAttributes);
      setupWizardEyes.addEventListener('click', changeWizardAttributes);
      setupFireball.addEventListener('click', changeWizardAttributes);

      setupHandle.addEventListener('mousedown', onMouseDown);
    }
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);

    setupWizardCoat.removeEventListener('click', changeWizardAttributes);
    setupWizardEyes.removeEventListener('click', changeWizardAttributes);
    setupFireball.removeEventListener('click', changeWizardAttributes);

    setup.style = '';
    setupHandle.removeEventListener('mousedown', onMouseDown);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coords = setup.getBoundingClientRect();

      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
      setup.style.top = (setup.offsetTop - shift.y) + 'px';

      if (coords.x + pageXOffset < 0) {
        setup.style.left = '400px';
      } else if (coords.y + pageYOffset < 0) {
        setup.style.top = '0px';
      } else if (coords.x + coords.width + pageXOffset > document.body.clientWidth) {
        setup.style.left = (document.body.clientWidth - 401) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          setupHandle.removeEventListener('click', onClickPreventDefault);
        };
        setupHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupUserName.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  setupUserName.addEventListener('focusout', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });
})();
