import { useBuyingAnimationHeader } from './animationOfBuyingHeader';
import { useBuyingAnimationStickyHeader } from './animationOfBuyingStickyHeader';

function cartAnim() {
  const isMobile = window.innerWidth <= 768;
  const cart = isMobile
    ? $('.second-block-in-menu .cart-block')
    : $('.shop-cart');
  const imgtodrag = $(this)
    .parents('.productlist__products-container-element')
    .find('img')
    .eq(0);
  const infoSuccessHeader = cart.find('.droupup-block-info');
  const container = $(this).parents(
    '.productlist__products-container-element-controllers-manipulator'
  );
  const textContainer = container.find(
    '.productlist__products-container-element-controllers-counter span'
  );
  if (Number(textContainer.text()) <= 0) return null;
  //SHOW SUCCESS BUYING ICON
  $(this)
    .parents('.productlist__products-container-element-controllers-manipulator')
    .addClass('show-success');
  infoSuccessHeader.removeClass('unshow');

  if (imgtodrag) {
    const imgclone = imgtodrag
      .clone()
      .offset({
        top: imgtodrag.offset().top,
        left: imgtodrag.offset().left,
      })
      .css({
        opacity: '0.5',
        position: 'absolute',
        height: '150px',
        width: '150px',
        'border-radius': '10px',
        'z-index': '100',
      })
      .appendTo($('body'))
      .animate(
        {
          top: cart.offset().top + 10,
          left: cart.offset().left + 10,
          width: 30,
          height: 30,
        },
        1000,
        'easeInOutExpo'
      );
    //SHAKE ANIM

    setTimeout(() => {
      const containerShown = $(this).parents(
        '.productlist__products-container-element-controllers-manipulator'
      );
      containerShown.removeClass('show-success');
      textContainer.text('1');
      containerShown
        .find(
          '.productlist__products-container-element-controllers-counter .minus'
        )
        .attr('disabled', true);
      setTimeout(() => {
        containerShown
          .find(
            '.productlist__products-container-element-controllers-successbuying .desktop'
          )
          .text('1 new added to cart');
      }, 500);
      infoSuccessHeader.addClass('unshow');
    }, 2000);

    // if(!isMobile)
    //     setTimeout(function () {
    //         cart.effect("shake", {
    //             times: 2
    //         }, 200);
    //     }, 1500);

    imgclone.animate(
      {
        width: 0,
        height: 0,
      },
      function () {
        $(this).detach();
      }
    );
  }
}
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
  useBuyingAnimationStickyHeader(popUp);

  document
    .querySelectorAll(
      '.productlist__products-container-element-controllers-manipulator'
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
      // if (+value >= 1) {
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

  $('.productlist__products-container-element-controllers-shop button').on(
    'click',
    cartAnim
  );

  $('.productlist__products-container-element-controllers-counter .minus').on(
    'click',
    function () {
      const container = $(this).parents(
        '.productlist__products-container-element-controllers-counter'
      );
      const counter = container.find('span');
      let value = Number(counter.text());
      value -= 1;
      if (value === 1) {
        $(this).attr('disabled', true);
        // $(this)
        //   .parents(
        //     '.productlist__products-container-element-controllers-manipulator'
        //   )
        //   .find(
        //     '.productlist__products-container-element-controllers-shop button'
        //   )
        //   .attr('disabled', true);
      }
      const finalAdd = container
        .parents(
          '.productlist__products-container-element-controllers-manipulator'
        )
        .find('.desktop');
      finalAdd.text(`${value} new added to cart`);
      counter.text(value);
    }
  );
  $('.productlist__products-container-element-controllers-counter .plus').on(
    'click',
    function () {
      const container = $(this).parents(
        '.productlist__products-container-element-controllers-counter'
      );
      const counter = container.find('span');
      let value = Number(counter.text());
      value += 1;
      if (value >= 2) {
        container.find('.minus').attr('disabled', false);
        $(this)
          .parents(
            '.productlist__products-container-element-controllers-manipulator'
          )
          .find(
            '.productlist__products-container-element-controllers-shop button'
          )
          .attr('disabled', false);
      }
      const finalAdd = container
        .parents(
          '.productlist__products-container-element-controllers-manipulator'
        )
        .find('.desktop');
      finalAdd.text(`${value} new added to cart`);
      counter.text(value);
    }
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
  // popUp.querySelector(".productpage__pageheader_sticky-wrap-manipulator-withprice").addEventListener("click",cartAnimInStickyHeader)
  const observer = new IntersectionObserver(onScrollChange, options);
  const target = document.querySelector('section.productpage__pageheader');
  if (target) observer.observe(target);

  //SLICk

  if (
    window.innerWidth >= 768 &&
    $(
      '.productlist__products-container .productlist__products-container-element'
    ).length > 3
  ) {
    $('.productlist__products-container').slick({
      slidesToShow: 3,
      speed: 500,
      dots: true,
      cssEase: 'linear',
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 768,
          settings: 'unslick',
        },
      ],
    });
  }
};
