function cartHeaderAnim() {
  const isMobile = window.innerWidth <= 1023;
  const cart = isMobile
    ? $('.second-block-in-menu .cart-block')
    : $('.shop-cart');
  const infoSuccessHeader = cart.find('.droupup-block-info');
  const container = $(this).parents(
    '.productpage__pageheader-wrap-manipulator-container'
  );
  //SHOW SUCCESS BUYING ICON

  container.addClass('show-success');
  infoSuccessHeader.removeClass('unshow');
  const totalPrice = container
    .find('.productlist__products-container-element-controllers-counter span')
    .text();
  const imgtodrag = $(this)
    .parents('.productpage__pageheader-wrap-container')
    .find('.productpage__pageheader-wrap-headblock img')
    .eq(0);
  infoSuccessHeader
    .find('h3')
    .text(
      +totalPrice === 1
        ? `${totalPrice} product added to your cart`
        : `${totalPrice} products added to your cart`
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
        height: '70px',
        width: '70px',
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
      $(this)
        .parents('.productpage__pageheader-wrap-manipulator-container')
        .removeClass('show-success');
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
    // $(this).parents(".productpage__pageheader-wrap-manipulator-container").removeClass("show-success")
  }
}

function cartAnimInStickyHeader() {
  const isMobile = window.innerWidth <= 768;
  const cart = isMobile
    ? $('.second-block-in-menu .cart-block')
    : $('.shop-cart');
  const infoSuccessHeader = cart.find('.droupup-block-info');
  const container = $(this).parents(
    '.productpage__pageheader_sticky-wrap-manipulator-container.overlay'
  );
  const textContainer = container.find(
    '.productpage__pageheader_sticky-wrap-manipulator-data span'
  );
  if (Number(textContainer.text()) <= 0) return null;
  //SHOW SUCCESS BUYING ICON
  $(this)
    .parents('.productpage__pageheader_sticky-wrap-manipulator-data')
    .addClass('show-success');
  const totalPrice = textContainer.text();
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
  const imgtodrag = $('.productpage__pageheader_sticky-wrap-headblock > img');
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
        height: '70px',
        width: '70px',
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

    setTimeout(() => {
      const containerShown = $(this).parents(
        '.productpage__pageheader_sticky-wrap-manipulator-container'
      );
      containerShown.removeClass('show-success');
      textContainer.text('1');
      containerShown
        .find('.productpage__pageheader_sticky-wrap-manipulator-data .minus')
        .attr('disabled', true);
      setTimeout(() => {
        const template = containerShown
          .find(
            '.productpage__pageheader_sticky-wrap-manipulator-successbuying .template'
          )
          .text();
        containerShown
          .find(
            '.productpage__pageheader_sticky-wrap-manipulator-successbuying span'
          )
          .text(template.replace('1 ;', '1'));
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

export const useBuyingAnimationStickyHeader = function main(element) {
  element
    .querySelector('.productpage__pageheader_sticky-wrap-manipulator-withprice')
    .addEventListener('click', cartAnimInStickyHeader);
  document
    .querySelectorAll(
      '.productpage__pageheader_sticky .productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-container.overlay'
    )
    .forEach(function (elm) {
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
  $(
    '.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .minus'
  ).on('click', function () {
    const container = $(this).parents(
      '.productpage__pageheader_sticky-wrap-manipulator-data'
    );
    const counter = container.find('span');
    let value = Number(counter.text());
    value -= 1;
    if (value === 1) {
      $(this).attr('disabled', true);
    }
    const finalAdd = container
      .parents('.productpage__pageheader_sticky-wrap-manipulator-container')
      .find(
        '.productpage__pageheader_sticky-wrap-manipulator-successbuying p span'
      );
    const template = container
      .parents('.productpage__pageheader_sticky-wrap-manipulator-container')
      .find(
        '.productpage__pageheader_sticky-wrap-manipulator-successbuying .template'
      )
      .text();
    finalAdd.text(template.replace('1 ;', String(value)));
    counter.text(value);
  });
  $(
    '.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .plus'
  ).on('click', function () {
    const container = $(this).parents(
      '.productpage__pageheader_sticky-wrap-manipulator-data'
    );
    const counter = container.find('span');
    let value = Number(counter.text());
    value += 1;
    if (value >= 2) {
      container.find('.minus').attr('disabled', false);
      $(this)
        .parents(
          '.productpage__pageheader_sticky-wrap-manipulator-container.overlay'
        )
        .find(
          '.productpage__pageheader_sticky-wrap-manipulator-withprice button'
        )
        .attr('disabled', false);
    }
    const finalAdd = container
      .parents('.productpage__pageheader_sticky-wrap-manipulator-container')
      .find(
        '.productpage__pageheader_sticky-wrap-manipulator-successbuying p span'
      );
    const template = container
      .parents('.productpage__pageheader_sticky-wrap-manipulator-container')
      .find(
        '.productpage__pageheader_sticky-wrap-manipulator-successbuying .template'
      )
      .text();
    finalAdd.text(template.replace('1 ;', String(value)));
    counter.text(value);
  });
};
