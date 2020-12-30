"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCasesDetails = void 0;

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
  }; //counter price dynamicly

  var totalPrice = 0;
  var totalPricePlace = document.querySelector('.usecase_details__blockwithbuyabbility-wrap__manipulator .usecase_details__blockwithbuyabbility-wrap__manipulator__block p');

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
    curerentBlocks.attr('data-ammount', 1); // const counters = curerentBlocks.find('.counter');
    // const mimusBtn = curerentBlocks.find('.minus');
    // curerentBlocks.find('.minus').attr('disabled', true);
    // [...counters].forEach((elm, index) => {
    //   if (elm.textContent <= 1) {
    //     console.log(elm, mimusBtn, counters);
    //     mimusBtn.eq(index).attr('disabled', true);
    //   } else {
    //     mimusBtn.eq(index).attr('disabled', false);
    //   }
    // });
    //SHOW SUCCESS BUYING ICON

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
      }, 1000, 'easeInOutExpo', function () {// const curerentBlocks = $(
        //   '.usecase_details__blockwithbuyabbility-wrap__element .usecase_details__blockwithbuyabbility-wrap__element-content-manipulator'
        // );
        // const counters = curerentBlocks.find('.counter');
        // const mimusBtn = curerentBlocks.find('.minus');
        // [...counters].forEach((elm, index) => {
        //   if (elm.textContent <= 1) {
        //     console.log(elm, mimusBtn, counters);
        //     mimusBtn.eq(index).attr('disabled', true);
        //   } else {
        //     mimusBtn.eq(index).attr('disabled', false);
        //   }
        // });
      }); //SHAKE ANIM

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

  document.querySelectorAll('.usecase_details__blockwithbuyabbility-wrap__element-content-manipulator .usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons .counter').forEach(function (elm, index) {
    totalPrice = totalPrice + Number(elm.textContent);
    document.querySelectorAll('.usecase_details__blockwithbuyabbility-wrap__element-content-manipulator')[index].setAttribute('data-ammount', Number(elm.textContent));
  });
  if (totalPricePlace) totalPricePlace.textContent = "".concat(totalPrice, " items");
  $('.usecase_details__blockwithbuyabbility-wrap__manipulator__block .shop-cart').on('click', cartAnim);
  $('.usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons .minus').on('click', function () {
    var container = $(this).parents('.usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons');
    var counter = container.find('.counter');
    var value = Number(counter.text());
    value -= 1;

    if (value === 1) {
      $(this).attr('disabled', true);
    }

    counter.text(value);
  });
  $('.usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons .plus').on('click', function () {
    var container = $(this).parents('.usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons');
    var counter = container.find('.counter');
    var value = Number(counter.text());
    value += 1;

    if (value >= 2) {
      container.find('.minus').attr('disabled', false);
    }

    counter.text(value);
  });
  var observer = new IntersectionObserver(onScrollChange, options);
  var target = document.querySelector('.usecase_details__pageheader');
  if (target) observer.observe(target);
};

exports.useCasesDetails = useCasesDetails;