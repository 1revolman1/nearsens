"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckoutPage = void 0;

var useCheckoutPage = function useCheckoutPage() {
  console.log('CHECKOUT');
  document.querySelectorAll('.checkout_page__content__contact__manip__chekedbox__box').forEach(function (elm) {
    elm.addEventListener('change', function (e) {
      this.classList.toggle('checked');
    });
  });
};

exports.useCheckoutPage = useCheckoutPage;