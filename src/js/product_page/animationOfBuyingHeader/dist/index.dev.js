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
  $('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-withprice').on('click', (0, _cartbuy.cartAnim)());
  $('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data .minus').on('click', function () {
    var container = $(this).parents('.productpage__pageheader-wrap-manipulator-data');
    var counter = container.find('span');
    var value = Number(counter.text());
    value -= 1;

    if (value === 1) {
      $(this).attr('disabled', true);
    }

    counter.text(value);
  });
  $('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data .plus').on('click', function () {
    var container = $(this).parents('.productpage__pageheader-wrap-manipulator-data');
    var counter = container.find('span');
    var value = Number(counter.text());
    value += 1;

    if (value >= 2) {
      container.find('.minus').attr('disabled', false);
      $(this).parents('.productpage__pageheader-wrap-manipulator-container').find('.productpage__pageheader-wrap-manipulator-withprice button').attr('disabled', false);
    }

    counter.text(value);
  });
};

exports.useBuyingAnimationHeader = useBuyingAnimationHeader;