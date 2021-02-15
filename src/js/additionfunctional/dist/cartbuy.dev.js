"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = isMobile;
exports.cartAnim = cartAnim;
exports.debounce = exports.isTouchDevice = void 0;

var isTouchDevice = function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

exports.isTouchDevice = isTouchDevice;

function isMobile() {
  return window.innerWidth <= 1023;
}

var debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

exports.debounce = debounce;

function cartAnim() {
  var intervalAnim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var cartSelectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    mobile: '.second-block-in-menu .cart-block',
    desktop: '.shop-cart'
  };
  var mainBlockContainer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.animation-container';
  var imgDraggable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.img-draggable';
  var manipulatorContainer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '.manipulator-container';
  var priceContainer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '.price-container';
  return function () {
    var ourMainBlock = $(this).parents(mainBlockContainer);
    var cart = isMobile() ? $(cartSelectors.mobile) : $(cartSelectors.desktop);
    var infoSuccessHeader = cart.find('.droupup-block-info');
    var imgtodrag = ourMainBlock.find(imgDraggable);
    var totalPrice = ourMainBlock.find(priceContainer);
    var manipulatorBlock = ourMainBlock.find(manipulatorContainer);
    if (Number(totalPrice.text()) <= 0) return null;
    manipulatorBlock.addClass('show-success');
    infoSuccessHeader.removeClass('unshow');
    infoSuccessHeader.find('h3').text(+totalPrice.text() === 1 ? infoSuccessHeader.find('.template.one').text().replace('1 ;', String(totalPrice.text())) : infoSuccessHeader.find('.template.many').text().replace('1 ;', String(totalPrice.text())));

    if (imgtodrag) {
      var imgclone = imgtodrag.clone().offset({
        top: imgtodrag.offset().top,
        left: imgtodrag.offset().left
      }).css({
        opacity: '0.5',
        position: 'absolute',
        height: '150px',
        width: '150px',
        'border-radius': '10px',
        'z-index': '100'
      }).appendTo($('body')).animate({
        top: cart.offset().top + 10,
        left: cart.offset().left + 10,
        width: 30,
        height: 30
      }, 1000, 'easeInOutExpo', function () {
        imgclone.animate({
          width: 0,
          height: 0
        }, function () {
          $(this).detach();
        });
      }); //-----------------SHAKE ANIM--------------------------------------

      setTimeout(function () {
        manipulatorBlock.removeClass('show-success');
        totalPrice.text('1');
        manipulatorBlock.find('.minus').attr('disabled', true);
        setTimeout(function () {
          var template = manipulatorBlock.find('.template').text();
          manipulatorBlock.find('.desktop').text(template.replace('1 ;', '1'));
        }, 500);
      }, 2000); //-------------------------------------------

      clearTimeout(intervalAnim);
      intervalAnim = setTimeout(function () {
        infoSuccessHeader.addClass('unshow');
      }, 2000);
    }
  };
}