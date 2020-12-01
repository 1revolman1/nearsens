"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCartPage = void 0;

var useCartPage = function useCartPage() {
  var scrollable = document.querySelector('section.cart__headersticky');

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

  function animatedToggleShow(manipulator, checkedBlock) {
    if (manipulator && checkedBlock) {
      manipulator.hide('fade', function () {
        checkedBlock.show('fade');
        manipulator.addClass('unshow');
        manipulator.removeClass('flex-layout');
        checkedBlock.removeClass('unshow');
        checkedBlock.addClass('flex-layout');
      });
    } else {
      return null;
    }
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
  document.querySelectorAll('.cart__productcontainer__container__element__quantity').forEach(function (elm) {
    var value = elm.querySelector('span').textContent;

    if (+value <= 1) {
      elm.querySelectorAll('.minus').forEach(function (e) {
        e.setAttribute('disabled', 'disabled');
      });
    } else {
      elm.querySelectorAll('button').forEach(function (e) {
        e.removeAttribute('disabled');
      });
    } // if (+value >= 1) {
    //   elm.querySelectorAll("button").forEach((e) => {
    //     e.removeAttribute("disabled");
    //   });
    // } else {
    //   elm.querySelectorAll(".minus").forEach((e) => {
    //     e.setAttribute("disabled", "disabled");
    //   });
    // }

  });
  $('.cart__productcontainer__container__element__quantity .minus').on('click', function () {
    var container = $(this).parents('.cart__productcontainer__container__element__quantity');
    var counter = container.find('span');
    var value = Number(counter.text());
    value -= 1;

    if (value === 1) {
      $(this).attr('disabled', true);
    }

    counter.text(value);
  });
  $('.cart__productcontainer__container__element__quantity .plus').on('click', function () {
    var container = $(this).parents('.cart__productcontainer__container__element__quantity');
    var counter = container.find('span');
    var value = Number(counter.text());
    value += 1;

    if (value >= 2) {
      container.find('.minus').attr('disabled', false);
    }

    counter.text(value);
  });
  $('.cart__productcontainer__container__element__remove i').on('click', function () {
    var container = $(this).parents('.cart__productcontainer__container__element');
    container.hide('slide', function () {
      if (!container.hasClass('gateway')) {
        container.remove();
      }
    });
  }); // Show checked

  $('.cart__havegateway__information__btn.gotone').on('click', function (elm) {
    var manipulator = $(this).parents('.cart__havegateway__manipulator');
    var checkedBlock = $(this).parents('.cart__havegateway').find('.cart__havegateway__checked');
    animatedToggleShow(manipulator, checkedBlock);
  }); // Show manipulator

  $('.cart__havegateway__checked .change_answer').on('click', function (elm) {
    var manipulator = $(this).parents('.cart__havegateway__checked');
    var checkedBlock = $(this).parents('.cart__havegateway').find('.cart__havegateway__manipulator');
    animatedToggleShow(manipulator, checkedBlock);
  });
};

exports.useCartPage = useCartPage;