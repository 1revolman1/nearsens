export const useCartPage = function () {
  console.log('CART PAGE ');
  const scrollable = document.querySelector('section.cart__headersticky');
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
  const options = {
    root: null, //root
    rootMargin: '-100px',
    threshold: 0,
  };
  const observer = new IntersectionObserver(onScrollChange, options);
  const target = document.querySelector('section.cart__header');
  if (target) observer.observe(target);
  (function disableCheckout() {
    if (
      document.querySelectorAll(
        `.cart__productcontainer__container__element:not([style="display:none;"]):not([style="display: none;"])`
      ).length === 0 &&
      Number(
        document.querySelector('.price.total')?.textContent?.replace('€', '.')
      ) === 0
    ) {
      document
        .querySelectorAll(
          '.cart__header__wrap__second__containerbutton__btn,.cart__disqount__btn'
        )
        .forEach(function (elm) {
          elm.classList.add('disable-cart-btn');
        });
    }
    document
      .querySelectorAll('.cart__havegateway__information__btn.addtocart')
      .forEach((elm) => {
        elm.addEventListener('click', function () {
          document
            .querySelectorAll(
              '.cart__header__wrap__second__containerbutton__btn,.cart__disqount__btn'
            )
            .forEach(function (elm) {
              elm.classList.remove('disable-cart-btn');
            });
        });
      });
  })();

  // document
  //   .querySelectorAll('.cart__productcontainer__container__element__quantity')
  //   .forEach(function (elm) {
  //     const value = elm.querySelector('span').textContent;
  //     if (+value <= 1) {
  //       elm.querySelectorAll('.minus').forEach((e) => {
  //         e.setAttribute('disabled', 'disabled');
  //       });
  //     } else {
  //       elm.querySelectorAll('button').forEach((e) => {
  //         e.removeAttribute('disabled');
  //       });
  //     }
  //     // if (+value >= 1) {
  //     //   elm.querySelectorAll("button").forEach((e) => {
  //     //     e.removeAttribute("disabled");
  //     //   });
  //     // } else {
  //     //   elm.querySelectorAll(".minus").forEach((e) => {
  //     //     e.setAttribute("disabled", "disabled");
  //     //   });
  //     // }
  //   });
  // $('.cart__productcontainer__container__element__quantity .minus').on(
  //   'click',
  //   function () {
  //     const container = $(this).parents(
  //       '.cart__productcontainer__container__element__quantity'
  //     );
  //     const counter = container.find('span');
  //     let value = Number(counter.text());
  //     value -= 1;
  //     if (value === 1) {
  //       $(this).attr('disabled', true);
  //     }
  //     counter.text(value);
  //   }
  // );
  // $('.cart__productcontainer__container__element__quantity .plus').on(
  //   'click',
  //   function () {
  //     const container = $(this).parents(
  //       '.cart__productcontainer__container__element__quantity'
  //     );
  //     const counter = container.find('span');
  //     let value = Number(counter.text());
  //     value += 1;
  //     if (value >= 2) {
  //       container.find('.minus').attr('disabled', false);
  //     }
  //     counter.text(value);
  //   }
  // );
  $('.cart__productcontainer__container__element__remove i').on(
    'click',
    function () {
      const parent = this.parentElement;
      if (!parent.classList.contains('disabled')) {
        const container = $(this).parents(
          '.cart__productcontainer__container__element'
        );
        container.hide('slide', 500, function () {
          if (!container.hasClass('gateway')) {
            container.remove();
          }
          if (
            document.querySelectorAll(
              `.cart__productcontainer__container__element:not([style="display:none;"]):not([style="display: none;"])`
            ).length === 0 &&
            Number(
              document
                .querySelector('.price.total')
                .textContent.replace('€', '.')
            ) === 0
          ) {
            document
              .querySelectorAll(
                '.cart__header__wrap__second__containerbutton__btn,.cart__disqount__btn'
              )
              .forEach(function (elm) {
                elm.classList.add('disable-cart-btn');
              });
          }
        });
      } else {
        console.log('DISABLED');
      }
    }
  );
  // Show checked
  $('.cart__havegateway__information__btn.gotone').on('click', function (elm) {
    const manipulator = $(this).parents('.cart__havegateway__manipulator');
    const checkedBlock = $(this)
      .parents('.cart__havegateway')
      .find('.cart__havegateway__checked');
    animatedToggleShow(manipulator, checkedBlock);
  });
  // Show manipulator
  $('.cart__havegateway__checked .change_answer').on('click', function (elm) {
    const manipulator = $(this).parents('.cart__havegateway__checked');
    const checkedBlock = $(this)
      .parents('.cart__havegateway')
      .find('.cart__havegateway__manipulator');
    animatedToggleShow(manipulator, checkedBlock);
  });
};
