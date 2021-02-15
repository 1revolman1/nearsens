import { cartAnim } from '../../additionfunctional/cartbuy';

export const useBuyingAnimationStickyHeader = function main(element) {
  element
    .querySelector('.productpage__pageheader_sticky-wrap-manipulator-withprice')
    .addEventListener('click', cartAnim());
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
