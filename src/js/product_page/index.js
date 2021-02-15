import { useBuyingAnimationHeader } from './animationOfBuyingHeader';
import { useBuyingAnimationStickyHeader } from './animationOfBuyingStickyHeader';
import {
  cartAnim,
  minusProduct,
  plusProduct,
} from '../additionfunctional/cartbuy';

const options = {
  root: null, //root
  rootMargin: '-100px',
  threshold: 0,
};

export const useProductPage = function main() {
  console.log('product_page');

  const isMobile = window.innerWidth <= 768;
  //Sticky Pop Up
  const popUp = document.querySelector(
    '.productpage__pageheader_sticky-wrap-manipulator-container.overlay'
  );
  const buttonToOpenBuy = document.querySelector(
    '.productpage__pageheader_sticky-wrap-manipulator-container.main-btn'
  );
  const scrollable = document.querySelector(
    'section.productpage__pageheader_sticky'
  );

  //Activate functionality of buying animation in header
  useBuyingAnimationHeader();
  //Activate functionality of buying animation in sticky header
  if (
    !document
      .querySelector('.productpage__pageheader_sticky')
      .classList.contains('product-out')
  )
    useBuyingAnimationStickyHeader(popUp);

  document
    .querySelectorAll(
      '.productlist__products-container-element:not(.product-out) .productlist__products-container-element-controllers-manipulator'
    )
    .forEach(function (elm) {
      const value = elm.querySelector(
        '.productlist__products-container-element-controllers-counter span'
      ).textContent;
      if (+value <= 1) {
        elm.querySelectorAll('.minus').forEach((e) => {
          e.setAttribute('disabled', 'disabled');
        });
      } else {
        elm.querySelectorAll('button').forEach((e) => {
          e.removeAttribute('disabled');
        });
      }
    });

  $('.productlist__products-container-element-controllers-shop button').on(
    'buyingLogic',
    cartAnim(0, { width: '70px', height: '70px' })
  );

  $('.productlist__products-container-element-controllers-counter .minus').on(
    'click',
    minusProduct
  );
  $('.productlist__products-container-element-controllers-counter .plus').on(
    'click',
    plusProduct
  );

  function onScrollChange(changes, observer) {
    changes.forEach((change) => {
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

  let event = null;
  if (isMobile) {
    window.addEventListener('scroll', function (e) {
      // print "false" if direction is down and "true" if up
      const toBottom = this.oldScroll < this.scrollY;
      if (toBottom) {
        scrollable.classList.add('scroll-to-bottom');
      } else {
        scrollable.classList.remove('scroll-to-bottom');
      }
      clearTimeout(event);
      event = setTimeout(() => {
        scrollable.classList.remove('scroll-to-bottom');
      }, 700);
      this.oldScroll = this.scrollY;
    });
    buttonToOpenBuy.addEventListener('click', function () {
      popUp.classList.add('isOpen');
    });
  }
  const observer = new IntersectionObserver(onScrollChange, options);
  const target = document.querySelector('section.productpage__pageheader');
  if (target) observer.observe(target);
  document.querySelectorAll('.accordion').forEach((elm) => {
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
