import { debounce, cartAnim } from '../additionfunctional/cartbuy';
function scrollToTargetAdjusted(element) {
  // const offset = 268.5;
  const offset = 158;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}
function headermoreover() {
  document
    .querySelectorAll('.page_gabarit__headermoreover')
    .forEach(function (elem) {
      const selected = elem.querySelector(
        '.page_gabarit__headermoreover__elem.selected'
      );
      const wrapper = elem.querySelector(
        '.page_gabarit__headermoreover__wrap.main'
      );
      const allHegiht = [
        ...elem.querySelectorAll('.page_gabarit__headermoreover__elem'),
      ].map((tipsElem) => tipsElem.getBoundingClientRect().height, 0);

      const allMaxHeight =
        allHegiht.reduce((accumulator, current) => accumulator + current) +
        (allHegiht.length - 1) * 3;
      const selectedHeight = selected.getBoundingClientRect().height;
      wrapper.style.cssText = `
      max-height: ${selectedHeight}px;
    `;
      selected.onclick = (event) => {
        event.preventDefault();
        if (wrapper.classList.contains('close')) {
          wrapper.style.cssText = `
            max-height: ${allMaxHeight}px;
          `;
        } else {
          wrapper.style.cssText = `
            max-height: ${selectedHeight}px;
          `;
        }
        wrapper.classList.toggle('close');
      };
    });
}

export const usePageGabarit = function main() {
  console.log('PAGE GABARIT');
  let intervalAnim;

  if (document.querySelectorAll('.custom-block').length > 0)
    document.querySelector('main').classList.add('custom-page');
  document
    .querySelectorAll('section.page_gabarit__fourblocks')
    .forEach(function (container) {
      container.setAttribute(
        'data-ammount',
        container.querySelectorAll('.page_gabarit__fourblocks__wrap__elemenet')
          .length
      );
    });

  headermoreover();
  window.addEventListener(
    'resize',
    debounce(function (event) {
      console.log('RESIZE');
      headermoreover();
    }, 200)
  );

  $('.page_gabarit__buyblock__btn button').on(
    'buyingLogic',
    cartAnim(intervalAnim)
  );

  document
    .querySelectorAll('.page_gabarit__recomendbl')
    .forEach((scrollerContainer) => {
      const scroller = scrollerContainer.querySelector(
        '.page_gabarit__recomendbl__scroll i'
      );
      const scrollTo = scrollerContainer.querySelector(
        '.page_gabarit__recomendbl__container'
      );
      if (scrollTo && scroller)
        scroller.addEventListener('click', () =>
          scrollToTargetAdjusted(scrollTo)
        );
    });
};
