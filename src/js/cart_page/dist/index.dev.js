"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCartPage = void 0;

var useCartPage = function useCartPage() {
  var scrollable = document.querySelector("section.cart__headersticky");

  function onScrollChange(changes, observer) {
    changes.forEach(function (change) {
      if (change.intersectionRatio === 0) {
        scrollable.classList.add("out-viewport");
        scrollable.style.opacity = "1";
        scrollable.style.visibility = "visible";
        console.log('Header is outside viewport');
      } else {
        scrollable.classList.remove("out-viewport");
        scrollable.style.opacity = "0";
        scrollable.style.visibility = "hidden";
        console.log('Header is IN THE viewport');
      }
    });
  }

  var options = {
    root: null,
    //root
    rootMargin: '-100px',
    threshold: 0
  };
  var observer = new IntersectionObserver(onScrollChange, options);
  var target = document.querySelector('section.cart__header');
  if (target) observer.observe(target);
};

exports.useCartPage = useCartPage;