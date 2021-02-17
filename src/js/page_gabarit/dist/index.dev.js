"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePageGabarit = void 0;

var _cartbuy = require("../additionfunctional/cartbuy");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function headermoreover() {
  document.querySelectorAll('.page_gabarit__headermoreover').forEach(function (elem) {
    var selected = elem.querySelector('.page_gabarit__headermoreover__elem.selected');
    var wrapper = elem.querySelector('.page_gabarit__headermoreover__wrap.main');

    var allHegiht = _toConsumableArray(elem.querySelectorAll('.page_gabarit__headermoreover__elem')).map(function (tipsElem) {
      return tipsElem.getBoundingClientRect().height;
    }, 0);

    var allMaxHeight = allHegiht.reduce(function (accumulator, current) {
      return accumulator + current;
    }) + (allHegiht.length - 1) * 3;
    var selectedHeight = selected.getBoundingClientRect().height;
    wrapper.style.cssText = "\n      max-height: ".concat(selectedHeight, "px;\n    ");

    selected.onclick = function (event) {
      event.preventDefault();

      if (wrapper.classList.contains('close')) {
        wrapper.style.cssText = "\n            max-height: ".concat(allMaxHeight, "px;\n          ");
      } else {
        wrapper.style.cssText = "\n            max-height: ".concat(selectedHeight, "px;\n          ");
      }

      wrapper.classList.toggle('close');
    };
  });
}

var usePageGabarit = function main() {
  console.log('PAGE GABARIT');
  if (document.querySelectorAll('.custom-block').length > 0) document.querySelector('main').classList.add('custom-page');
  document.querySelectorAll('section.page_gabarit__fourblocks').forEach(function (container) {
    container.setAttribute('data-ammount', container.querySelectorAll('.page_gabarit__fourblocks__wrap__elemenet').length);
  });
  headermoreover();
  window.addEventListener('resize', (0, _cartbuy.debounce)(function (event) {
    console.log('RESIZE');
    headermoreover();
  }, 200));
};

exports.usePageGabarit = usePageGabarit;