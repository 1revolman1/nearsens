"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProductPage = void 0;

var _animationOfBuyingHeader = require("./animationOfBuyingHeader");

var _animationOfBuyingStickyHeader = require("./animationOfBuyingStickyHeader");

function cartAnim() {
  var _this = this;

  var isMobile = window.innerWidth <= 768;
  var cart = isMobile ? $('.second-block-in-menu .cart-block') : $('.shop-cart');
  var imgtodrag = $(this).parents('.productlist__products-container-element').find('img').eq(0);
  var infoSuccessHeader = cart.find('.droupup-block-info');
  var container = $(this).parents('.productlist__products-container-element-controllers-manipulator');
  var textContainer = container.find('.productlist__products-container-element-controllers-counter span');
  if (Number(textContainer.text()) <= 0) return null; //SHOW SUCCESS BUYING ICON

  $(this).parents('.productlist__products-container-element-controllers-manipulator').addClass('show-success');
  infoSuccessHeader.removeClass('unshow');

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
    }, 1000, 'easeInOutExpo'); //SHAKE ANIM

    setTimeout(function () {
      var containerShown = $(_this).parents('.productlist__products-container-element-controllers-manipulator');
      containerShown.removeClass('show-success');
      textContainer.text('1');
      containerShown.find('.productlist__products-container-element-controllers-counter .minus').attr('disabled', true);
      setTimeout(function () {
        containerShown.find('.productlist__products-container-element-controllers-successbuying .desktop').text('1 new added to cart');
      }, 500);
      infoSuccessHeader.addClass('unshow');
    }, 2000); // if(!isMobile)
    //     setTimeout(function () {
    //         cart.effect("shake", {
    //             times: 2
    //         }, 200);
    //     }, 1500);

    imgclone.animate({
      width: 0,
      height: 0
    }, function () {
      $(this).detach();
    });
  }
}

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

  (0, _animationOfBuyingStickyHeader.useBuyingAnimationStickyHeader)(popUp);
  document.querySelectorAll('.productlist__products-container-element-controllers-manipulator').forEach(function (elm) {
    var value = elm.querySelector('.productlist__products-container-element-controllers-counter span').textContent;

    if (+value <= 1) {
      elm.querySelectorAll('.minus').forEach(function (e) {
        e.setAttribute('disabled', 'disabled');
      });
    } else {
      elm.querySelectorAll('button').forEach(function (e) {
        e.removeAttribute('disabled');
      });
    } // if (+value >= 1) {
    //   elm.querySelectorAll('button').forEach((e) => {
    //     e.removeAttribute('disabled');
    //   });
    //   elm
    //     .querySelector(
    //       '.productlist__products-container-element-controllers-shop button'
    //     )
    //     .removeAttribute('disabled');
    // } else {
    //   elm.querySelectorAll('.minus').forEach((e) => {
    //     e.setAttribute('disabled', 'disabled');
    //   });
    //   elm
    //     .querySelector(
    //       '.productlist__products-container-element-controllers-shop button'
    //     )
    //     .setAttribute('disabled', 'disabled');
    // }

  });
  $('.productlist__products-container-element-controllers-shop button').on('click', cartAnim);
  $('.productlist__products-container-element-controllers-counter .minus').on('click', function () {
    var container = $(this).parents('.productlist__products-container-element-controllers-counter');
    var counter = container.find('span');
    var value = Number(counter.text());
    value -= 1;

    if (value === 1) {
      $(this).attr('disabled', true); // $(this)
      //   .parents(
      //     '.productlist__products-container-element-controllers-manipulator'
      //   )
      //   .find(
      //     '.productlist__products-container-element-controllers-shop button'
      //   )
      //   .attr('disabled', true);
    }

    var finalAdd = container.parents('.productlist__products-container-element-controllers-manipulator').find('.desktop');
    finalAdd.text("".concat(value, " new added to cart"));
    counter.text(value);
  });
  $('.productlist__products-container-element-controllers-counter .plus').on('click', function () {
    var container = $(this).parents('.productlist__products-container-element-controllers-counter');
    var counter = container.find('span');
    var value = Number(counter.text());
    value += 1;

    if (value >= 2) {
      container.find('.minus').attr('disabled', false);
      $(this).parents('.productlist__products-container-element-controllers-manipulator').find('.productlist__products-container-element-controllers-shop button').attr('disabled', false);
    }

    var finalAdd = container.parents('.productlist__products-container-element-controllers-manipulator').find('.desktop');
    finalAdd.text("".concat(value, " new added to cart"));
    counter.text(value);
  });

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
  } // popUp.querySelector(".productpage__pageheader_sticky-wrap-manipulator-withprice").addEventListener("click",cartAnimInStickyHeader)


  var observer = new IntersectionObserver(onScrollChange, options);
  var target = document.querySelector('section.productpage__pageheader');
  if (target) observer.observe(target); //SLICk

  if (window.innerWidth >= 768 && $('.productlist__products-container .productlist__products-container-element').length > 3) {
    $('.productlist__products-container').slick({
      slidesToShow: 3,
      speed: 500,
      dots: true,
      cssEase: 'linear',
      swipeToSlide: true,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 850,
        settings: {
          slidesToShow: 1
        }
      }, {
        breakpoint: 769,
        settings: 'unslick'
      }]
    });
  }
};

exports.useProductPage = useProductPage;