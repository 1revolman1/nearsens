import { tns } from '../../local_modules/tiny-slider/src/tiny-slider';
import { isTouchDevice } from '../additionfunctional/cartbuy';
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
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
    const isMobile = window.innerWidth <= 1023;
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
    const totalPrice = container
      .find('.productlist__products-container-element-controllers-counter span')
      .text();
    container.addClass('show-success');
    infoSuccessHeader.removeClass('unshow');
    infoSuccessHeader
      .find('h3')
      .text(
        +totalPrice === 1
          ? infoSuccessHeader
              .find('.template.one')
              .text()
              .replace('1 ;', String(totalPrice))
          : infoSuccessHeader
              .find('.template.many')
              .text()
              .replace('1 ;', String(totalPrice))
      );
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
          'easeInOutExpo',
          function () {
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
          const template = containerShown
            .find(
              '.productlist__products-container-element-controllers-successbuying .template'
            )
            .text();
          containerShown
            .find(
              '.productlist__products-container-element-controllers-successbuying .desktop'
            )
            .text(template.replace('1 ;', '1'));
        }, 500);
      }, 2000);
      clearTimeout(interval);
      interval = setTimeout(() => {
        infoSuccessHeader.addClass('unshow');
      }, 2000);
    }
  };
}
export const useProductList = function main() {
  console.log(`PRODUCT LIST PAGE`);
  let intervalAnim;
  const len = document.querySelectorAll(
    '.productlist__pageheader-wrapper__slider-container__slider-element'
  ).length;
  let isMobile = window.innerWidth <= 425,
    isTablet = window.innerWidth > 425 && window.innerWidth <= 1023,
    isDesktop = window.innerWidth > 1023 && window.innerWidth <= 1919,
    isWider = window.innerWidth > 1919;
  let slider;
  function onScrollChange(changes, observer) {
    changes.forEach((change) => {
      if (change.intersectionRatio === 0) {
        scrollable.classList.add('out-viewport');
        scrollable.style.opacity = '1';
        scrollable.style.visibility = 'visible';
        console.log('Header is outside viewport');
      } else {
        scrollable.classList.remove('out-viewport');
        // scrollable.style.display="none";
        scrollable.style.opacity = '0';
        scrollable.style.visibility = 'hidden';
        console.log('Header is IN THE viewport');
      }
    });
  }
  const options = {
    root: null, //root
    rootMargin: '-100px',
    threshold: 0,
  };
  const preInitAddList = document.querySelectorAll(
    '.productlist__products-container-element-controllers-successbuying .desktop'
  );
  document
    .querySelectorAll(
      '.productlist__products-container-element-controllers-counter'
    )
    .forEach(function (elm, index) {
      const value = elm.querySelector('span').textContent;
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
      }
      const finalAdd = container
        .parents(
          '.productlist__products-container-element-controllers-manipulator'
        )
        .find('.desktop');
      const template = container
        .parents(
          '.productlist__products-container-element-controllers-manipulator'
        )
        .find('.template')
        .text();
      finalAdd.text(template.replace('1 ;', String(value)));
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
      const template = container
        .parents(
          '.productlist__products-container-element-controllers-manipulator'
        )
        .find('.template')
        .text();
      finalAdd.text(template.replace('1 ;', String(value)));
      counter.text(value);
    }
  );
  $('.productlist__products-container-element-controllers-shop button').on(
    'buyingLogic',
    cartAnim(intervalAnim)
  );
  // $('.productlist__products-container-element-controllers-shop button').on(
  //   'click',
  //   cartAnim
  // );

  function settingsSlick(length) {
    let slidesToShow;
    // length < 15 ? length : 15
    if (length < 15) {
      slidesToShow = length - 1;
      if (length === 1) {
        slidesToShow = length;
      }
    } else {
      slidesToShow = 15;
    }
    document
      .querySelector('.productlist__pageheader-wrapper__slider-container')
      .classList.add('active-slider');
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
          items: slidesToShow,
        },
        1024: {
          items: 9,
        },
        426: {
          items: 5,
        },
        425: {
          items: 4,
        },
      },
    };
  }
  function destroySlider(sliderElm) {
    sliderElm.destroy();
    document.querySelector('.active-slider').classList.remove('active-slider');
    slider = undefined;
  }
  if ((isDesktop || isWider) && !isTouchDevice())
    $(document).tooltip({
      track: true,
      classes: {
        'ui-tooltip': 'ui-corner-all ui-widget-shadow slider-tooltip',
      },
      delay: 0,
      duration: 0,
      hide: {
        effect: 'none',
      },
      show: { effect: 'none' },
      position: { my: 'top+40px', at: 'right center' },
    });

  if (
    (len > 4 && isMobile) ||
    (len > 5 && isTablet) ||
    (len > 9 && isDesktop) ||
    (len > 15 && isWider)
  ) {
    slider = tns(settingsSlick(len));
  }
  window.addEventListener(
    'resize',
    debounce(function () {
      console.log('resize', slider, len);
      if (slider) {
        destroySlider(slider);
      }
      isMobile = window.innerWidth <= 425;
      isTablet = window.innerWidth > 425 && window.innerWidth <= 1023;
      isDesktop = window.innerWidth > 1023 && window.innerWidth <= 1919;
      isWider = window.innerWidth > 1919;
      if (
        (len > 4 && isMobile) ||
        (len > 5 && isTablet) ||
        (len > 9 && isDesktop) ||
        (len > 15 && isWider)
      ) {
        // console.log('могу пересоздать');
        slider = tns(settingsSlick(len));
      }
      if ((isWider || isDesktop) && !isTouchDevice()) {
        console.log('Enable');
        $('[title]').each(function () {
          let $this = $(this);
          $.attr(this, 'title', $this.attr('title1'));
          $this.removeAttr('title1');
        });
        $(document).tooltip({
          track: true,
          classes: {
            'ui-tooltip': 'ui-corner-all ui-widget-shadow slider-tooltip',
          },
          delay: 0,
          duration: 0,
          hide: {
            effect: 'none',
          },
          show: { effect: 'none' },
          position: { my: 'top+40px', at: 'right center' },
        });
      } else {
        console.log('Destroy');
        $('[title]').each(function () {
          let $this = $(this);
          $.attr(this, 'title1', $this.attr('title'));
          $this.removeAttr('title');
        });
      }
    }, 250)
  );

  const scrollToThisBlock = document.querySelector('.productlist__pageheader');
  const scrollable = document.querySelector(
    'section.productlist__scrollheader'
  );
  if (scrollToThisBlock && scrollable)
    document
      .querySelector(
        '.productlist__scrollheader-wrapper__text-container__picker'
      )
      .addEventListener('click', function (event) {
        scrollToThisBlock.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      });

  const observer = new IntersectionObserver(onScrollChange, options);

  const target = document.querySelector('.productlist__pageheader');
  if (target) observer.observe(target);
};
