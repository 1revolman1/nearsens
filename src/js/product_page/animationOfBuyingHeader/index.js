function cartHeaderAnim() {
  const isMobile = window.innerWidth <= 1023;
  const cart = isMobile
    ? $('.second-block-in-menu .cart-block')
    : $('.shop-cart');
  const infoSuccessHeader = cart.find('.droupup-block-info');

  const container = $(this).parents(
    '.productpage__pageheader-wrap-manipulator-container'
  );
  const textContainer = container.find(
    '.productpage__pageheader-wrap-manipulator-data span'
  );
  if (Number(textContainer.text()) <= 0) return null;
  const counter = container.find(
    '.productpage__pageheader-wrap-manipulator-data span.text'
  );
  const value = Number(counter.text());
  const finalAdd = container.find(
    '.productpage__pageheader-wrap-manipulator-successbuying'
  );
  finalAdd
    .find('p span')
    .text(finalAdd.find('.template').text().replace('1 ;', String(value)));
  //SHOW SUCCESS BUYING ICON
  $(this)
    .parents('.productpage__pageheader-wrap-manipulator-container')
    .addClass('show-success');
  infoSuccessHeader.removeClass('unshow');
  infoSuccessHeader
    .find('h3')
    .text(
      +value === 1
        ? infoSuccessHeader
            .find('.template.one')
            .text()
            .replace('1 ;', String(value))
        : infoSuccessHeader
            .find('.template.many')
            .text()
            .replace('1 ;', String(value))
    );
  const imgtodrag = $(this)
    .parents('.productpage__pageheader-wrap-container')
    .find('.productpage__pageheader-wrap-headblock img')
    .eq(0);
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
      const containerShown = $(this).parents(
        '.productpage__pageheader-wrap-manipulator-container'
      );
      containerShown.removeClass('show-success');
      textContainer.text('1');
      containerShown
        .find('.productpage__pageheader-wrap-manipulator-data .minus')
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

export const useBuyingAnimationHeader = function main() {
  document
    .querySelectorAll(
      '.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data'
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
      // if (+value >= 1) {
      //   elm.querySelectorAll('button').forEach((e) => {
      //     e.removeAttribute('disabled');
      //   });
      //   elm.parentNode
      //     .querySelector(
      //       '.productpage__pageheader-wrap-manipulator-withprice button'
      //     )
      //     .removeAttribute('disabled');
      // } else {
      //   elm.querySelectorAll('.minus').forEach((e) => {
      //     e.setAttribute('disabled', 'disabled');
      //   });
      //   elm.parentNode
      //     .querySelector(
      //       '.productpage__pageheader-wrap-manipulator-withprice button'
      //     )
      //     .setAttribute('disabled', 'disabled');
      // }
    });
  $(
    '.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-withprice'
  ).on('click', cartHeaderAnim);
  $(
    '.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data .minus'
  ).on('click', function () {
    const container = $(this).parents(
      '.productpage__pageheader-wrap-manipulator-data'
    );
    const counter = container.find('span');
    let value = Number(counter.text());
    value -= 1;
    if (value === 1) {
      $(this).attr('disabled', true);
    }
    counter.text(value);
  });
  $(
    '.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data .plus'
  ).on('click', function () {
    const container = $(this).parents(
      '.productpage__pageheader-wrap-manipulator-data'
    );
    const counter = container.find('span');
    let value = Number(counter.text());
    value += 1;
    if (value >= 2) {
      container.find('.minus').attr('disabled', false);
      $(this)
        .parents('.productpage__pageheader-wrap-manipulator-container')
        .find('.productpage__pageheader-wrap-manipulator-withprice button')
        .attr('disabled', false);
    }
    counter.text(value);
  });
};
