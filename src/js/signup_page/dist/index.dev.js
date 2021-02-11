"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSignUpPage = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function selectorFunc() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var dropdown = _step.value;
      dropdown.addEventListener('click', function () {
        var listOfAll = document.querySelectorAll('.custom-select-wrapper.open');
        if (listOfAll.length > 0 && !dropdown.classList.contains('open')) listOfAll.forEach(function (opened) {
          return opened.classList.toggle('open');
        });
        this.classList.toggle('open');
      });
    };

    for (var _iterator = document.querySelectorAll('.custom-select-wrapper')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  window.addEventListener('click', function (e) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = document.querySelectorAll('.custom-select-wrapper.open')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var select = _step2.value;

        if (!select.contains(e.target)) {
          select.classList.remove('open');
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = document.querySelectorAll('.custom-option')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var option = _step3.value;
      option.addEventListener('click', function (event) {
        event.stopPropagation();
        var inputHiddenValue = this.closest('.loginpage__container__block__manipulator').querySelector("input[type='hidden'][name='country']");

        if (!this.classList.contains('selected')) {
          //При выборе 1 элемента - закрыть текущий
          var countryTag = this.getAttribute('data-value');
          this.parentElement.querySelectorAll('.custom-option.selected').forEach(function (elm) {
            inputHiddenValue.value = '';
            elm.classList.remove('selected');
          }); // .classList.remove('selected');

          this.classList.add('selected');
          inputHiddenValue.value = countryTag; //Подставить на место заголовка - выбранный элемент

          this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
          this.closest('.custom-select-wrapper').classList.remove('open');
        }
      });
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function checkIfNotValid() {
  var scrollToThis = document.querySelector('.signuppage__container h2');
  var createAccountBtn = document.querySelector('.signuppage__container__block__email button');
  var inputs = {
    username: {
      selector: ".loginpage__container__block__manipulator input[name='username']",
      func: function ValidateName(name) {
        return /^([\d\w]{2,})$/.test(String(name.value));
      }
    },
    email: {
      selector: ".loginpage__container__block__manipulator input[name='email']",
      func: function ValidateEmail(mail) {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(String(mail.value));
      }
    },
    password: {
      selector: ".loginpage__container__block__manipulator input[name='password']",
      func: function ValidatePassword(password) {
        return /^([\d\w]{4,})$/.test(String(password.value));
      }
    },
    checkbox: {
      selector: ".signuppage__container__block__checkbox input[name='checkbox']",
      func: function ValidateCheckbox(elm) {
        return elm.checked;
      }
    }
  };
  var finalString = Object.keys(inputs).map(function (elm) {
    return inputs[elm].selector;
  }).join(',');

  var ourInputs = _toConsumableArray(document.querySelectorAll(finalString));

  var functionalArray = ourInputs.map(function (elm) {
    return inputs[elm.getAttribute('name')].func;
  }); //Make blur event on input

  ourInputs.forEach(function (elm, index) {
    var nameField = elm.getAttribute('name');
    var foundedErrorElement = document.querySelector(".loginpage__container__block__manipulator .hidden.".concat(nameField));
    elm.addEventListener('blur', function () {
      if (functionalArray[index](elm)) {
        foundedErrorElement.classList.add('hidden');
        elm.classList.remove('error-input');
        if (document.querySelectorAll('.error-input').length === 0) createAccountBtn.classList.remove('error-btn');
      } else {
        foundedErrorElement.classList.remove('hidden');
        elm.classList.add('error-input');
        createAccountBtn.classList.add('error-btn');
      }
    });
  }); //Make click event on btn

  document.querySelector(".signuppage__container__block__email button[type='submit']").addEventListener('click', function (event) {
    event.preventDefault();
    var erroredElements = ourInputs.filter(function (elm, index) {
      return !functionalArray[index](elm);
    });
    erroredElements.forEach(function (elm) {
      elm.classList.add('error-input');

      var listener = function listener() {
        elm.classList.remove('error-input');
        elm.oninput = null;
      };

      elm.oninput = listener;
    });

    if (erroredElements.length > 0) {
      setTimeout(function () {
        scrollToThis.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
      }, 200);
    }
  });
}

var useSignUpPage = function useSignUpPage() {
  console.log('signup_page');
  selectorFunc();
  checkIfNotValid();
};

exports.useSignUpPage = useSignUpPage;