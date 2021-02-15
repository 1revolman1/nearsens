export const isTouchDevice = function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};
function isMobile() {
  return window.innerWidth <= 1023;
}
export const debounce = function debounce(func, wait, immediate) {
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
};

function cartAnim(
  intervalAnim = 0,
  cartSelectors = {
    mobile: '.second-block-in-menu .cart-block',
    desktop: '.shop-cart',
  },
  mainBlockContainer = '.animation-container',
  imgDraggable = '.img-draggable',
  manipulatorContainer = '.manipulator-container',
  priceContainer = '.price-container',
  ...params
) {
  return function () {
    const ourMainBlock = $(this).parents(mainBlockContainer);
    const cart = isMobile()
      ? $(cartSelectors.mobile)
      : $(cartSelectors.desktop);
    const infoSuccessHeader = cart.find('.droupup-block-info');
    const imgtodrag = ourMainBlock.find(imgDraggable);
    const totalPrice = ourMainBlock.find(priceContainer);
    const manipulatorBlock = ourMainBlock.find(manipulatorContainer);

    if (Number(totalPrice.text()) <= 0) return null;
    manipulatorBlock.addClass('show-success');
    infoSuccessHeader.removeClass('unshow');
    infoSuccessHeader
      .find('h3')
      .text(
        +totalPrice.text() === 1
          ? infoSuccessHeader
              .find('.template.one')
              .text()
              .replace('1 ;', String(totalPrice.text()))
          : infoSuccessHeader
              .find('.template.many')
              .text()
              .replace('1 ;', String(totalPrice.text()))
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
      //-----------------SHAKE ANIM--------------------------------------
      setTimeout(() => {
        manipulatorBlock.removeClass('show-success');
        totalPrice.text('1');
        manipulatorBlock.find('.minus').attr('disabled', true);
        setTimeout(() => {
          const template = manipulatorBlock.find('.template').text();
          manipulatorBlock.find('.desktop').text(template.replace('1 ;', '1'));
        }, 500);
      }, 2000);
      //-------------------------------------------
      clearTimeout(intervalAnim);
      intervalAnim = setTimeout(() => {
        infoSuccessHeader.addClass('unshow');
      }, 2000);
    }
  };
}
export { isMobile, cartAnim };
