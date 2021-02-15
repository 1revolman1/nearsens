import {
  cartAnim,
  minusProduct,
  plusProduct,
} from '../../additionfunctional/cartbuy';

export const useBuyingAnimationStickyHeader = function main(element) {
  element
    .querySelector('.productpage__pageheader_sticky-wrap-manipulator-withprice')
    .addEventListener('click', cartAnim(0, { width: '70px', height: '70px' }));
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
  ).on('click', minusProduct);
  $(
    '.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .plus'
  ).on('click', plusProduct);
};
