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
  container.addClass('show-success');
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

export const useProductList = function main() {
  console.log(`PRODUCT LIST PAGE`);
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
      // if (+value >= 2) {
      // elm.querySelectorAll('button').forEach((e) => {
      //   e.removeAttribute('disabled');
      // });
      //   elm.parentNode
      //     .querySelector(
      //       '.productlist__products-container-element-controllers-shop button'
      //     )
      //     .removeAttribute('disabled');
      // } else {
      //   elm.querySelectorAll('.minus').forEach((e) => {
      //     e.setAttribute('disabled', 'disabled');
      //   });
      //   elm.parentNode
      //     .querySelector(
      //       '.productlist__products-container-element-controllers-shop button'
      //     )
      //     .setAttribute('disabled', 'disabled');
      // }
      //init ammount of preadded
      preInitAddList[index].textContent = `${value} new added to cart`;
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

  $('.productlist__products-container-element-controllers-shop button').on(
    'click',
    cartAnim
  );
  function settingsSlick() {
    const length = document.querySelectorAll(
      '.productlist__pageheader-wrapper__slider-container__slider-element'
    ).length;
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
    return {
      infinite: true,
      slidesToShow,
      slidesToScroll: 3,
      adaptiveHeight: true,
      // arrows: false,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 2,
          },
        },
      ],
    };
  }
  console.log(settingsSlick());
  $('.productlist__pageheader-wrapper__slider-container__slider').slick(
    settingsSlick()
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
