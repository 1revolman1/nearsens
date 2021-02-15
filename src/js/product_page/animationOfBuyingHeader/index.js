import {
  cartAnim,
  minusProduct,
  plusProduct,
} from '../../additionfunctional/cartbuy';

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
    });
  $(
    '.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-withprice'
  ).on('click', cartAnim(0, { width: '70px', height: '70px' }));
  $(
    '.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data .minus'
  ).on('click', minusProduct);
  $(
    '.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-data .plus'
  ).on('click', plusProduct);
};
