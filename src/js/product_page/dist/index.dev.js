"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProductPage = void 0;

var _animationOfBuyingHeader = require("./animationOfBuyingHeader");

var _animationOfBuyingStickyHeader = require("./animationOfBuyingStickyHeader");

var _cartbuy = require("../additionfunctional/cartbuy");

var options = {
  root: null,
  //root
  rootMargin: '-100px',
  threshold: 0
};

var useProductPage = function main() {
  console.log('product_page');
  var isMobile = window.innerWidth <= 768; //Sticky Pop Up

  var popUp = document.querySelector('.productpage__pageheader_sticky-wrap-manipulator-container.overlay');
  var buttonToOpenBuy = document.querySelector('.productpage__pageheader_sticky-wrap-manipulator-container.main-btn');
  var scrollable = document.querySelector('section.productpage__pageheader_sticky'); //Activate functionality of buying animation in header

  (0, _animationOfBuyingHeader.useBuyingAnimationHeader)(); //Activate functionality of buying animation in sticky header

  if (!document.querySelector('.productpage__pageheader_sticky').classList.contains('product-out')) (0, _animationOfBuyingStickyHeader.useBuyingAnimationStickyHeader)(popUp);
  document.querySelectorAll('.productlist__products-container-element:not(.product-out) .productlist__products-container-element-controllers-manipulator').forEach(function (elm) {
    var value = elm.querySelector('.productlist__products-container-element-controllers-counter span').textContent;

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
  $('.productlist__products-container-element-controllers-shop button').on('buyingLogic', (0, _cartbuy.cartAnim)(0, {
    width: '70px',
    height: '70px'
  }));
  $('.productlist__products-container-element-controllers-counter .minus').on('click', _cartbuy.minusProduct);
  $('.productlist__products-container-element-controllers-counter .plus').on('click', _cartbuy.plusProduct);

  function onScrollChange(changes, observer) {
    changes.forEach(function (change) {
      if (change.intersectionRatio === 0) {
        scrollable.classList.add('out-viewport');
        scrollable.style.opacity = '1';
        scrollable.style.visibility = 'visible';
        console.log('Header is outside viewport');
      } else {
        scrollable.classList.remove('out-viewport');
        scrollable.style.opacity = '0';
        scrollable.style.visibility = 'hidden';
        console.log('Header is IN THE viewport');
      }
    });
  }

  var event = null;

  if (isMobile) {
    window.addEventListener('scroll', function (e) {
      // print "false" if direction is down and "true" if up
      var toBottom = this.oldScroll < this.scrollY;

      if (toBottom) {
        scrollable.classList.add('scroll-to-bottom');
      } else {
        scrollable.classList.remove('scroll-to-bottom');
      }

      clearTimeout(event);
      event = setTimeout(function () {
        scrollable.classList.remove('scroll-to-bottom');
      }, 700);
      this.oldScroll = this.scrollY;
    });
    buttonToOpenBuy.addEventListener('click', function () {
      popUp.classList.add('isOpen');
    });
  }

  var observer = new IntersectionObserver(onScrollChange, options);
  var target = document.querySelector('section.productpage__pageheader');
  if (target) observer.observe(target);
  document.querySelectorAll('.accordion').forEach(function (elm) {
    elm.addEventListener('click', function () {
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

exports.useProductPage = useProductPage;