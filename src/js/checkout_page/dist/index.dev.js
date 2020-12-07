"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckoutPage = void 0;

var useCheckoutPage = function useCheckoutPage() {
  function openOne(cls) {
    var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    document.querySelectorAll(cls).forEach(function (elm) {
      elm.addEventListener('change', function (e) {
        var _this = this;

        document.querySelectorAll(cls).forEach(function (other) {
          if (_this !== other && other.checked) {
            other.checked = false;
            if (remove) other.closest('label').classList.remove('checked');
          }
        });
      });
    });
  }

  document.querySelectorAll('label').forEach(function (elm) {
    elm.addEventListener('change', function (e) {
      this.classList.toggle('checked');
    });
  }); //Contact page

  openOne('.checkout_page__checkbox input', true); //Main service

  openOne('.checkout_page__content__contact__manip__chekedbox__box input', true); //Bill page

  openOne('.checkout_page__content__contact__manip__payMethod__elm input', true);
  document.querySelectorAll('.accordion').forEach(function (accordion) {
    accordion.addEventListener('click', function () {
      this.classList.toggle('active');
      var panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
};

exports.useCheckoutPage = useCheckoutPage;