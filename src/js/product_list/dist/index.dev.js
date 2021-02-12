"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProductList = void 0;

var _tinySlider = require("../../local_modules/tiny-slider/src/tiny-slider");

var _cartbuy = require("../additionfunctional/cartbuy");

function debounce(func, wait, immediate) {
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
}

function cartAnim(interval) {
  return function () {
    var _this = this;

    var isMobile = window.innerWidth <= 1023;
    var cart = isMobile ? $('.second-block-in-menu .cart-block') : $('.shop-cart');
    var imgtodrag = $(this).parents('.productlist__products-container-element').find('img').eq(0);
    var infoSuccessHeader = cart.find('.droupup-block-info');
    var container = $(this).parents('.productlist__products-container-element-controllers-manipulator');
    var textContainer = container.find('.productlist__products-container-element-controllers-counter span');
    if (Number(textContainer.text()) <= 0) return null;
    var totalPrice = container.find('.productlist__products-container-element-controllers-counter span').text();
    container.addClass('show-success');
    infoSuccessHeader.removeClass('unshow');
    infoSuccessHeader.find('h3').text(+totalPrice === 1 ? infoSuccessHeader.find('.template.one').text().replace('1 ;', String(totalPrice)) : infoSuccessHeader.find('.template.many').text().replace('1 ;', String(totalPrice)));

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
      }); //SHAKE ANIM

      setTimeout(function () {
        var containerShown = $(_this).parents('.productlist__products-container-element-controllers-manipulator');
        containerShown.removeClass('show-success');
        textContainer.text('1');
        containerShown.find('.productlist__products-container-element-controllers-counter .minus').attr('disabled', true);
        setTimeout(function () {
          var template = containerShown.find('.productlist__products-container-element-controllers-successbuying .template').text();
          containerShown.find('.productlist__products-container-element-controllers-successbuying .desktop').text(template.replace('1 ;', '1'));
        }, 500);
      }, 2000);
      clearTimeout(interval);
      interval = setTimeout(function () {
        infoSuccessHeader.addClass('unshow');
      }, 2000);
    }
  };
}

var useProductList = function main() {
  console.log("PRODUCT LIST PAGE");
  var intervalAnim;
  var cachedWidth = window.innerWidth;
  var len = document.querySelectorAll('.productlist__pageheader-wrapper__slider-container__slider-element').length;
  var isMobile = window.innerWidth <= 425,
      isTablet = window.innerWidth > 425 && window.innerWidth <= 1023,
      isDesktop = window.innerWidth > 1023 && window.innerWidth <= 1919,
      isWider = window.innerWidth > 1919;
  var slider;

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
  document.querySelectorAll('.productlist__products-container-element-controllers-counter').forEach(function (elm, index) {
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
  $('.productlist__products-container-element-controllers-counter .minus').on('click', function () {
    var container = $(this).parents('.productlist__products-container-element-controllers-counter');
    var counter = container.find('span');
    var value = Number(counter.text());
    value -= 1;

    if (value === 1) {
      $(this).attr('disabled', true);
    }

    var finalAdd = container.parents('.productlist__products-container-element-controllers-manipulator').find('.desktop');
    var template = container.parents('.productlist__products-container-element-controllers-manipulator').find('.template').text();
    finalAdd.text(template.replace('1 ;', String(value)));
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
    var template = container.parents('.productlist__products-container-element-controllers-manipulator').find('.template').text();
    finalAdd.text(template.replace('1 ;', String(value)));
    counter.text(value);
  });
  $('.productlist__products-container-element-controllers-shop button').on('buyingLogic', cartAnim(intervalAnim)); // $('.productlist__products-container-element-controllers-shop button').on(
  //   'click',
  //   cartAnim
  // );

  function settingsSlick(length) {
    var slidesToShow; // length < 15 ? length : 15

    if (length < 15) {
      slidesToShow = length - 1;

      if (length === 1) {
        slidesToShow = length;
      }
    } else {
      slidesToShow = 15;
    }

    document.querySelector('.productlist__pageheader-wrapper__slider-container').classList.add('active-slider');
    return {
      container: '.productlist__pageheader-wrapper__slider-container__slider',
      items: 4,
      loop: true,
      nav: false,
      autoplayButtonOutput: false,
      mouseDrag: true,
      lazyload: true,
      swipeAngle: false,
      prevButton: '.prev',
      nextButton: '.next',
      responsive: {
        1920: {
          items: slidesToShow
        },
        1024: {
          items: 9
        },
        426: {
          items: 5
        },
        425: {
          items: 4
        }
      }
    };
  }

  function destroySlider(sliderElm) {
    sliderElm.destroy();
    document.querySelector('.active-slider').classList.remove('active-slider');
    slider = undefined;
  }

  if ((isDesktop || isWider) && !(0, _cartbuy.isTouchDevice)()) $(document).tooltip({
    track: true,
    classes: {
      'ui-tooltip': 'ui-corner-all ui-widget-shadow slider-tooltip'
    },
    delay: 0,
    duration: 0,
    hide: {
      effect: 'none'
    },
    show: {
      effect: 'none'
    },
    position: {
      my: 'top+40px',
      at: 'right center'
    }
  });

  if (len > 4 && isMobile || len > 5 && isTablet || len > 9 && isDesktop || len > 15 && isWider) {
    slider = (0, _tinySlider.tns)(settingsSlick(len));
  }

  window.addEventListener('resize', debounce(function () {
    var newWidth = window.innerWidth;

    if (newWidth !== cachedWidth) {
      console.log('resize with new value', slider, len);

      if (slider) {
        destroySlider(slider);
      }

      isMobile = window.innerWidth <= 425;
      isTablet = window.innerWidth > 425 && window.innerWidth <= 1023;
      isDesktop = window.innerWidth > 1023 && window.innerWidth <= 1919;
      isWider = window.innerWidth > 1919;

      if (len > 4 && isMobile || len > 5 && isTablet || len > 9 && isDesktop || len > 15 && isWider) {
        // console.log('могу пересоздать');
        slider = (0, _tinySlider.tns)(settingsSlick(len));
      }

      if ((isWider || isDesktop) && !(0, _cartbuy.isTouchDevice)()) {
        console.log('Enable');
        $('[title]').each(function () {
          var $this = $(this);
          $.attr(this, 'title', $this.attr('title1'));
          $this.removeAttr('title1');
        });
        $(document).tooltip({
          track: true,
          classes: {
            'ui-tooltip': 'ui-corner-all ui-widget-shadow slider-tooltip'
          },
          delay: 0,
          duration: 0,
          hide: {
            effect: 'none'
          },
          show: {
            effect: 'none'
          },
          position: {
            my: 'top+40px',
            at: 'right center'
          }
        });
      } else {
        console.log('Destroy');
        $('[title]').each(function () {
          var $this = $(this);
          $.attr(this, 'title1', $this.attr('title'));
          $this.removeAttr('title');
        });
      }

      cachedWidth = newWidth;
    }
  }, 250));
  var scrollToThisBlock = document.querySelector('.productlist__pageheader');
  var scrollable = document.querySelector('section.productlist__scrollheader');
  if (scrollToThisBlock && scrollable) document.querySelector('.productlist__scrollheader-wrapper__text-container__picker').addEventListener('click', function (event) {
    scrollToThisBlock.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  });
  var observer = new IntersectionObserver(onScrollChange, options);
  var target = document.querySelector('.productlist__pageheader');
  if (target) observer.observe(target);
};

exports.useProductList = useProductList;