"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSignUpPage = void 0;

function selectorFunc() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var dropdown = _step.value;
      // const widthDropdownBlock=dropdown?.querySelector(".custom-options")?.getBoundingClientRect()?.width
      // dropdown.setAttribute("data-size",widthDropdownBlock);
      // dropdown.style.width=`${dropdown.getBoundingClientRect().width}px`
      // const initialWidth=dropdown.getBoundingClientRect()?.width
      dropdown.addEventListener('click', function () {
        var listOfAll = document.querySelectorAll(".custom-select-wrapper.open");
        if (listOfAll.length > 0 && !dropdown.classList.contains("open")) listOfAll.forEach(function (opened) {
          return opened.classList.toggle("open");
        });
        this.classList.toggle("open"); // if(dropdown.classList.contains("open"))
        //     dropdown.style.width=`${this.dataset.size}px`;
        // else dropdown.style.width=`${initialWidth}px`;
        // this.querySelector('.custom-select').classList.toggle('open');
      });
    };

    for (var _iterator = document.querySelectorAll(".custom-select-wrapper")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    for (var _iterator3 = document.querySelectorAll(".custom-option")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var option = _step3.value;
      option.addEventListener('click', function (event) {
        event.stopPropagation();

        if (!this.classList.contains('selected')) {
          //При выборе 1 элемента - закрыть текущий
          this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
          this.classList.add('selected'); //Подставить на место заголовка - выбранный элемент

          this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
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

var useSignUpPage = function useSignUpPage() {
  console.log("signup_page");
  selectorFunc();
};

exports.useSignUpPage = useSignUpPage;