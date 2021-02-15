"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBuyingAnimationStickyHeader = void 0;

var _cartbuy = require("../../additionfunctional/cartbuy");

var useBuyingAnimationStickyHeader = function main(element) {
  element.querySelector('.productpage__pageheader_sticky-wrap-manipulator-withprice').addEventListener('click', (0, _cartbuy.cartAnim)(0, {
    width: '70px',
    height: '70px'
  }));
  document.querySelectorAll('.productpage__pageheader_sticky .productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-container.overlay').forEach(function (elm) {
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
  $('.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .minus').on('click', _cartbuy.minusProduct);
  $('.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .plus').on('click', _cartbuy.plusProduct);
};

exports.useBuyingAnimationStickyHeader = useBuyingAnimationStickyHeader;