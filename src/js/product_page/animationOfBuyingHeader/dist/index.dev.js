"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBuyingAnimationHeader = void 0;

var _cartbuy = require("../../additionfunctional/cartbuy");

var useBuyingAnimationHeader = function main() {
  document.querySelectorAll('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data').forEach(function (elm) {
    var value = elm.querySelector('span').textContent;

    if (+value <= 1) {
      elm.querySelectorAll('.minus').forEach(function (e) {
        e.setAttribute('disabled', 'disabled');
      });
    } else {
      elm.querySelectorAll('button').forEach(function (e) {
        e.removeAttribute('disabled');
      });
    }
  });
  $('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-withprice').on('click', (0, _cartbuy.cartAnim)(0, {
    width: '70px',
    height: '70px'
  }));
  $('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data .minus').on('click', _cartbuy.minusProduct);
  $('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data .plus').on('click', _cartbuy.plusProduct);
};

exports.useBuyingAnimationHeader = useBuyingAnimationHeader;