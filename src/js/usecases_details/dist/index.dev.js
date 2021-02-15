"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCasesDetails = void 0;

// import { cartAnim } from '../additionfunctional/cartbuy';
function cartAnim() {
  var _this = this;

  var isMobile = window.innerWidth <= 1023;
  var container = $(this).parents('.usecase_details__blockwithbuyabbility-wrap__manipulator');
  var cart = isMobile ? $('.second-block-in-menu .cart-block') : $('.shop-cart');
  var imgtodrag = container.find('img').eq(0);
  $(this).attr('disabled', 'disabled');
  var infoSuccessHeader = cart.find('.droupup-block-info');
  var parent = $(this).parents('.usecase_details__blockwithbuyabbility-wrap__manipulator__block');
  var currentValue = parent.find('p').text().replace(/[^\d;]/g, '');
  if (currentValue === 0) return null;
  var curerentBlocks = $('.usecase_details__blockwithbuyabbility-wrap__element .usecase_details__blockwithbuyabbility-wrap__element-content-manipulator');
  var totalPrice = container.find('.usecase_details__blockwithbuyabbility-wrap__manipulator__block .usecase_details__blockwithbuyabbility-wrap__manipulator__block__text p').text();
  curerentBlocks.attr('data-ammount', 1);
  infoSuccessHeader.find('h3').text(+totalPrice === 1 ? infoSuccessHeader.find('.template.one').text().replace('1 ;', String(totalPrice)) : infoSuccessHeader.find('.template.many').text().replace('1 ;', String(totalPrice)));
  parent.addClass('show-success');
  infoSuccessHeader.removeClass('unshow');

  if (imgtodrag) {
    var imgclone = imgtodrag.clone().offset({
      top: imgtodrag.offset().top,
      left: imgtodrag.offset().left
    }).css({
      opacity: '0.5',
      position: 'absolute',
      height: isMobile ? '40px' : '30px',
      width: isMobile ? '40px' : '30px',
      'border-radius': '10px',
      'z-index': '100'
    }).appendTo($('body')).animate({
      top: cart.offset().top + 10,
      left: cart.offset().left + 10,
      width: 30,
      height: 30
    }, 1000, 'easeInOutExpo'); //SHAKE ANIM

    setTimeout(function () {
      $(_this).parents('.usecase_details__blockwithbuyabbility-wrap__manipulator__block').removeClass('show-success');
      $(_this).removeAttr('disabled');
      infoSuccessHeader.addClass('unshow');
    }, 2000);
    imgclone.animate({
      width: 0,
      height: 0
    }, function () {
      $(this).detach();
    });
  }
}

var useCasesDetails = function main() {
  console.log("usecase_details");
  var scrollable = document.querySelector('section.usecase_details__pageheaderafterscroll');

  function onScrollChange(changes, observer) {
    changes.forEach(function (change) {
      if (change.intersectionRatio === 0) {
        scrollable.classList.add('out-viewport');
        scrollable.style.opacity = '1';
        scrollable.style.visibility = 'visible';
        console.log('Header is outside viewport');
      } else {
        scrollable.classList.remove('out-viewport'); // scrollable.style.display="none";

        scrollable.style.opacity = '0';
        scrollable.style.visibility = 'hidden';
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
  $('.usecase_details__blockwithbuyabbility-wrap__manipulator__block .shop-cart').on('buyInUseCase', cartAnim);
  var observer = new IntersectionObserver(onScrollChange, options);
  var target = document.querySelector('.usecase_details__pageheader');
  if (target) observer.observe(target);
};

exports.useCasesDetails = useCasesDetails;