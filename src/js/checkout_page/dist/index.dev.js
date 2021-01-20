"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckoutPage = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useCheckoutPage = function useCheckoutPage() {
  function openOne(cls) {
    var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    document.querySelectorAll(cls).forEach(function (elm) {
      elm.addEventListener('change', function (e) {
        var _this = this;

        this.parentNode.classList.toggle('checked');
        document.querySelectorAll(cls).forEach(function (other) {
          if (_this !== other) {
            other.checked = false;
            if (remove) other.closest('label').classList.remove('checked');
          }
        });
      });
    });
  } // document.querySelectorAll('label').forEach((elm) => {
  //   elm.addEventListener('change', function (e) {
  //     this.classList.toggle('checked');
  //   });
  // });
  //Contact page


  openOne('.checkout_page__checkbox input', true); //Main service

  openOne('.checkout_page__content__contact__manip__chekedbox__box input', true); //Pament methods

  openOne('.checkout_page__content__contact__manip__payMethod__elm input', true); //Bill checkc

  openOne('.checkout_page__content__contact__manip__chekedboxAccept input', true); // $('.ui.dropdown').dropdown({
  //   clearable: true,
  // });

  function accordionMaxHeight() {
    var padding = 10;

    var arrayOfElement = _toConsumableArray(document.querySelectorAll('.checkout_page__products__element')).splice(0, 5);

    var maxHeightWithoutGap = arrayOfElement.reduce(function (accumulator, currentValue) {
      return currentValue.offsetHeight + accumulator;
    }, 0);
    var maxHeight = maxHeightWithoutGap + (arrayOfElement.length * 20 - 20) + padding;
    return maxHeight;
  }

  var maxHeight = accordionMaxHeight();
  console.log(maxHeight); //new product page layout concept

  (function accoridon(isMobile) {
    var accordContainer = document.querySelector('.checkout_page__products');
    var panel = accordContainer.querySelector('.panel');
    var accordBtn = accordContainer.querySelector('.accordion');
    var isMoreThan5 = document.querySelectorAll('.checkout_page__products .checkout_page__products__element').length > 5;
    panel.setAttribute('data-biglist', isMoreThan5);

    if (!isMobile) {
      panel.classList.add('active');
      accordBtn.classList.add('active');
      console.log(!isMoreThan5);

      if (panel.classList.contains('active')) {
        panel.style.maxHeight = maxHeight + 'px';
      } else {
        panel.style.maxHeight = '0px';
      }
    }

    document.querySelectorAll('.accordion').forEach(function (accordion) {
      accordion.addEventListener('click', function () {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        panel.classList.toggle('active');
        console.log(!isMoreThan5);

        if (panel.classList.contains('active')) {
          panel.style.maxHeight = maxHeight + 'px';
        } else {
          panel.style.maxHeight = '0px';
        } // if (panel.style.maxHeight) {
        //   panel.classList.remove('active');
        //   // panel.style.maxHeight = null;
        // } else {
        //   panel.classList.add('active');
        //   // panel.style.maxHeight = panel.scrollHeight + 'px';
        // }

      });
    });
  })(window.innerWidth < 1024); //new custom payment methods


  document.querySelectorAll('.checkout_page__content__contact__manip__payMethod .input-radio').forEach(function (elm) {
    if (elm.checked) elm.parentNode.classList.add('checked');
  });
};

exports.useCheckoutPage = useCheckoutPage;