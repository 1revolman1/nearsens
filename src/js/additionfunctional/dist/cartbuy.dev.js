"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = isMobile;
exports.cartAnim = cartAnim;
exports.minusProduct = minusProduct;
exports.plusProduct = plusProduct;
exports.debounce = exports.isTouchDevice = void 0;

var isTouchDevice = function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

exports.isTouchDevice = isTouchDevice;

var debounce = function debounce(func, wait, immediate) {
  var timeout;
  var cachedWidth = window.innerWidth;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;

      if (!immediate) {
        var newWidth = window.innerWidth;

        if (newWidth !== cachedWidth) {
          func.apply(context, args);
          cachedWidth = newWidth;
        }
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      var newWidth = window.innerWidth;

      if (newWidth !== cachedWidth) {
        func.apply(context, args);
        cachedWidth = newWidth;
      }
    }
  };
};

exports.debounce = debounce;

function isMobile() {
  return window.innerWidth <= 1023;
}

function minusProduct() {
  var container = $(this).parents('.manipulator-container');
  var counter = container.find('.price-container');
  var template = null;
  var value = Number(counter.text());
  value -= 1;

  if (value === 1) {
    $(this).attr('disabled', true);
    template = container.find('.template.one').text();
  } else {
    template = container.find('.template.many').text();
  }

  var finalAdd = container.find('.desktop'); // const template = container.find('.template').text();

  finalAdd.text(template.replace('1 ;', String(value)));
  counter.text(value);
}

function plusProduct() {
  console.log('TESAT');
  var container = $(this).parents('.manipulator-container');
  var counter = container.find('.price-container');
  var template = null;
  var value = Number(counter.text());
  value += 1;

  if (value >= 2) {
    container.find('.minus').attr('disabled', false);
    container.find('.buy-button').attr('disabled', false);
    template = container.find('.template.many').text();
  } else {
    template = container.find('.template.one').text();
  }

  var finalAdd = container.find('.desktop');
  finalAdd.text(template.replace('1 ;', String(value)));
  counter.text(value);
}

function cartAnim() {
  var intervalAnim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var scaledIMG = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    width: '150px',
    height: '150px'
  };
  var cartSelectors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    mobile: '.second-block-in-menu .cart-block',
    desktop: '.shop-cart'
  };
  var mainBlockContainer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.animation-container';
  var imgDraggable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '.img-draggable';
  var manipulatorContainer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '.manipulator-container';
  var priceContainer = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '.price-container';
  return function () {
    var ourMainBlock = $(this).parents(mainBlockContainer);
    var cart = isMobile() ? $(cartSelectors.mobile) : $(cartSelectors.desktop);
    var infoSuccessHeader = cart.find('.droupup-block-info');
    var imgtodrag = ourMainBlock.find(imgDraggable);
    var totalPrice = ourMainBlock.find(priceContainer);
    var manipulatorBlock = ourMainBlock.find(manipulatorContainer);
    var cachedPriceValue = totalPrice.text();
    if (+cachedPriceValue <= 0) return null;
    manipulatorBlock.addClass('show-success');
    infoSuccessHeader.removeClass('unshow');
    infoSuccessHeader.find('h3').text(+cachedPriceValue === 1 ? infoSuccessHeader.find('.template.one').text().replace('1 ;', String(cachedPriceValue)) : infoSuccessHeader.find('.template.many').text().replace('1 ;', String(cachedPriceValue)));

    if (imgtodrag.length) {
      var imgclone = imgtodrag.clone().offset({
        top: imgtodrag.offset().top,
        left: imgtodrag.offset().left
      }).css({
        opacity: '0.5',
        position: 'absolute',
        height: scaledIMG.height,
        width: scaledIMG.width,
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
    }

    setTimeout(function () {
      manipulatorBlock.removeClass('show-success');
      totalPrice.text('1');
      manipulatorBlock.find('.minus').attr('disabled', true);
      setTimeout(function () {
        var template = manipulatorBlock.find('.template.one').text();
        manipulatorBlock.find('.desktop').text(template.replace('1 ;', '1'));
      }, 500);
    }, 2000); //-------------------------------------------

    clearTimeout(intervalAnim);
    intervalAnim = setTimeout(function () {
      infoSuccessHeader.addClass('unshow');
    }, 2000);
  };
}