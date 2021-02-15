import { cartAnim } from '../../additionfunctional/cartbuy';

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
  ).on('click', cartAnim());
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
