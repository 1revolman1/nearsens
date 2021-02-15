"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBuyingAnimationStickyHeader = void 0;

var _cartbuy = require("../../additionfunctional/cartbuy");

var useBuyingAnimationStickyHeader = function main(element) {
  element.querySelector('.productpage__pageheader_sticky-wrap-manipulator-withprice').addEventListener('click', (0, _cartbuy.cartAnim)());
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
  $('.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .minus').on('click', function () {
    var container = $(this).parents('.productpage__pageheader_sticky-wrap-manipulator-data');
    var counter = container.find('span');
    var value = Number(counter.text());
    value -= 1;

    if (value === 1) {
      $(this).attr('disabled', true);
    }

    var finalAdd = container.parents('.productpage__pageheader_sticky-wrap-manipulator-container').find('.productpage__pageheader_sticky-wrap-manipulator-successbuying p span');
    var template = container.parents('.productpage__pageheader_sticky-wrap-manipulator-container').find('.productpage__pageheader_sticky-wrap-manipulator-successbuying .template').text();
    finalAdd.text(template.replace('1 ;', String(value)));
    counter.text(value);
  });
  $('.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .plus').on('click', function () {
    var container = $(this).parents('.productpage__pageheader_sticky-wrap-manipulator-data');
    var counter = container.find('span');
    var value = Number(counter.text());
    value += 1;

    if (value >= 2) {
      container.find('.minus').attr('disabled', false);
      $(this).parents('.productpage__pageheader_sticky-wrap-manipulator-container.overlay').find('.productpage__pageheader_sticky-wrap-manipulator-withprice button').attr('disabled', false);
    }

    var finalAdd = container.parents('.productpage__pageheader_sticky-wrap-manipulator-container').find('.productpage__pageheader_sticky-wrap-manipulator-successbuying p span');
    var template = container.parents('.productpage__pageheader_sticky-wrap-manipulator-container').find('.productpage__pageheader_sticky-wrap-manipulator-successbuying .template').text();
    finalAdd.text(template.replace('1 ;', String(value)));
    counter.text(value);
  });
};

exports.useBuyingAnimationStickyHeader = useBuyingAnimationStickyHeader;